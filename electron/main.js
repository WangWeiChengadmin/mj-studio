import { app, BrowserWindow, dialog, ipcMain } from 'electron'
import { spawn } from 'node:child_process'
import { copyFileSync, existsSync, mkdirSync, readdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { setTimeout as delay } from 'node:timers/promises'
import { fileURLToPath } from 'node:url'
import Database from 'better-sqlite3'

// 单实例锁定 - 防止多个实例同时运行
const gotTheLock = app.requestSingleInstanceLock()

if (!gotTheLock) {
  // 另一个实例已经在运行，退出当前实例
  app.quit()
  // 立即退出，避免继续执行后续代码
  process.exit(0)
}

function getUserDataPath() {
  return app.getPath('userData')
}

function getDbPath(userDataPath) {
  return join(userDataPath, 'data', 'mj-studio.db')
}

function resolveUploadsPath(userDataPath) {
  const defaultUploads = join(userDataPath, 'uploads')
  const dbPath = getDbPath(userDataPath)

  if (!existsSync(dbPath)) return defaultUploads

  let db = null
  try {
    db = new Database(dbPath, { readonly: true })
    const row = db.prepare(
      "SELECT value FROM user_settings WHERE key = 'general.imageSavePath' ORDER BY updated_at DESC LIMIT 1",
    ).get()

    const parsed = row?.value ? JSON.parse(row.value) : ''
    if (typeof parsed === 'string' && parsed.trim()) return parsed.trim()
  } catch {
    // ignore and fallback to default
  } finally {
    if (db) {
      try { db.close() } catch { /* ignore */ }
    }
  }

  return defaultUploads
}

async function waitForServer(url, timeoutMs = 30_000) {
  const start = Date.now()
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(url, { method: 'GET' })
      // 接受任意响应（包括 302/401/404/500），只要服务器有响应就说明已启动
      if (res.status > 0) return
    } catch {
      // ignore - 连接失败继续重试
    }
    await delay(250)
  }
  throw new Error(`Nuxt server not ready: ${url}`)
}

let serverProcess = null
let serverUrl = 'http://127.0.0.1:3000'
let mainWindow = null

function resolveAppNodeModulesPath() {
  const appPath = app.getAppPath()
  const candidates = [
    join(appPath, 'node_modules'),
    join(process.resourcesPath, 'app', 'node_modules'),
    join(process.resourcesPath, 'app.asar.unpacked', 'node_modules'),
  ]
  return candidates.find(p => existsSync(p)) || candidates[0]
}

function syncNativeAddonFromAppToNitroServer(addonName) {
  if (!app.isPackaged) return

  const resourcesPath = process.resourcesPath
  const appNodeModules = resolveAppNodeModulesPath()
  const serverNodeModules = join(resourcesPath, 'nuxt-output', 'server', 'node_modules')

  const fromReleaseDir = join(appNodeModules, addonName, 'build', 'Release')
  const toReleaseDir = join(serverNodeModules, addonName, 'build', 'Release')

  if (!existsSync(fromReleaseDir) || !existsSync(toReleaseDir)) return

  const nodeBinaries = readdirSync(fromReleaseDir).filter(name => name.endsWith('.node'))
  if (!nodeBinaries.length) return

  try {
    for (const fileName of nodeBinaries) {
      const from = join(fromReleaseDir, fileName)
      const to = join(toReleaseDir, fileName)
      mkdirSync(dirname(to), { recursive: true })
      copyFileSync(from, to)
    }
    console.log(`[Main] Synced native addon for Nitro: ${addonName} (${nodeBinaries.join(', ')})`)
  } catch (error) {
    console.warn(`[Main] Failed to sync native addon for Nitro: ${addonName}`, error)
  }
}

async function startNuxtNitroServer() {
  const host = '127.0.0.1'
  const port = Number(process.env.PORT || 3000)
  const url = `http://${host}:${port}`
  serverUrl = url

  // 调试信息
  console.log('[Main] app.isPackaged:', app.isPackaged)
  console.log('[Main] process.resourcesPath:', process.resourcesPath)

  if (!app.isPackaged) {
    console.log('[Main] Development mode, using external server')
    return { url, stop: () => {} }
  }

  // nuxt-output 在 extraResources 配置中，会被放到 Resources/nuxt-output 目录下
  const resourcesPath = process.resourcesPath
  const serverEntry = join(resourcesPath, 'nuxt-output', 'server', 'index.mjs')

  console.log('[Main] Looking for server entry:', serverEntry)
  console.log('[Main] Server entry exists:', existsSync(serverEntry))

  if (!existsSync(serverEntry)) {
    throw new Error(`Missing Nuxt server entry: ${serverEntry}`)
  }

  // Nitro 的输出目录自带 server/node_modules，但其中的原生模块（如 better-sqlite3）
  // 通常是按 “Node.js” ABI 编译的；而这里我们用 Electron 的 Node 运行 Nitro，
  // 会导致子进程启动即崩（常见表现是控制台刷 `node:electron/js2c/node_init`）。
  // 这里把已被 electron-builder rebuild 的原生二进制同步到 Nitro 的 node_modules。
  syncNativeAddonFromAppToNitroServer('better-sqlite3')

  // 迁移文件在 Resources/migrations 目录
  const migrationsPath = join(resourcesPath, 'migrations')
  console.log('[Main] Migrations path:', migrationsPath)
  console.log('[Main] Migrations exists:', existsSync(migrationsPath))

  // 主项目 node_modules 路径（包含已 rebuild 的原生模块如 better-sqlite3）
  // 打包后位于 app.asar 同级目录或 app 目录
  const appPath = app.getAppPath()
  const mainNodeModules = resolveAppNodeModulesPath()
  console.log('[Main] App path:', appPath)
  console.log('[Main] Main node_modules:', mainNodeModules)

  serverProcess = spawn(process.execPath, [serverEntry], {
    env: {
      ...process.env,
      ELECTRON_RUN_AS_NODE: '1',  // 使用环境变量而非命令行参数，更可靠
      ELECTRON_NO_ASAR: '1',  // 禁用 ASAR 模块，避免警告和冲突
      // 设置 NODE_PATH 让子进程优先使用主项目的 node_modules（包含已 rebuild 的原生模块）
      NODE_PATH: mainNodeModules,
      HOST: host,
      NITRO_HOST: host,
      PORT: String(port),
      NITRO_PORT: String(port),
      MJ_MIGRATIONS_PATH: migrationsPath,  // 告诉 Nitro 迁移文件路径
      MJ_DATA_PATH: process.env.MJ_DATA_PATH,  // 传递数据目录
    },
    cwd: resourcesPath,
    stdio: ['ignore', 'pipe', 'pipe'],  // stdin 忽略，stdout/stderr 管道
    detached: false,
    windowsHide: true,  // Windows 上隐藏控制台窗口
  })

  // 捕获输出用于调试
  let stderr = ''
  serverProcess.stdout?.on('data', (data) => {
    console.log('[Nitro]', data.toString())
  })
  serverProcess.stderr?.on('data', (data) => {
    stderr += data.toString()
    console.error('[Nitro]', data.toString())
  })

  serverProcess.on('error', (err) => {
    console.error('[Nitro] Process error:', err)
  })

  serverProcess.on('exit', (code) => {
    if (code !== 0 && code !== null) {
      console.error(`[Nitro] Process exited with code ${code}`)
      dialog.showErrorBox('服务器启动失败', stderr || `Exit code: ${code}`)
    }
  })

  await waitForServer(url)

  const stop = () => {
    if (serverProcess && !serverProcess.killed) {
      serverProcess.kill()
      serverProcess = null
    }
  }

  return { url, stop }
}

function registerIpc() {
  ipcMain.handle('dialog:selectFolder', async () => {
    const result = await dialog.showOpenDialog({
      properties: ['openDirectory', 'createDirectory'],
    })
    if (result.canceled) return undefined
    return result.filePaths?.[0]
  })

  ipcMain.handle('app:getPaths', async () => {
    const userData = getUserDataPath()
    return {
      userData,
      uploads: process.env.MJ_UPLOADS_PATH || join(userData, 'uploads'),
    }
  })
}

function createMainWindow(url) {
  const preload = fileURLToPath(new URL('./preload.js', import.meta.url))

  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload,
      contextIsolation: true,
      nodeIntegration: false,
    },
  })

  win.loadURL(url)

  if (!app.isPackaged) {
    win.webContents.openDevTools({ mode: 'detach' })
  }

  return win
}

// 处理第二实例尝试启动时的情况
app.on('second-instance', () => {
  // 聚焦到已有窗口
  if (mainWindow) {
    if (mainWindow.isMinimized()) mainWindow.restore()
    mainWindow.focus()
  }
})

app.whenReady().then(async () => {
  // 如果没有获得锁，前面已经调用 app.quit()，这里不会执行
  if (!gotTheLock) return

  const userDataPath = getUserDataPath()
  process.env.MJ_DATA_PATH = userDataPath
  process.env.MJ_UPLOADS_PATH = resolveUploadsPath(userDataPath)

  registerIpc()

  try {
    const { url, stop } = await startNuxtNitroServer()
    mainWindow = createMainWindow(url)

    // 窗口关闭时清理引用
    mainWindow.on('closed', () => {
      mainWindow = null
    })

    app.on('before-quit', () => stop())
  } catch (error) {
    console.error(error)
    // 清理可能残留的子进程
    if (serverProcess && !serverProcess.killed) {
      serverProcess.kill()
      serverProcess = null
    }
    dialog.showErrorBox('MJ-Studio 启动失败', String(error?.message || error))
    app.quit()
  }
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', () => {
  if (mainWindow === null) {
    mainWindow = createMainWindow(serverUrl)
    mainWindow.on('closed', () => {
      mainWindow = null
    })
  }
})
