import { app, BrowserWindow, dialog, ipcMain } from 'electron'
import { spawn } from 'node:child_process'
import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { setTimeout as delay } from 'node:timers/promises'
import { fileURLToPath } from 'node:url'
import Database from 'better-sqlite3'

// 单实例锁定 - 防止多个实例同时运行
const gotTheLock = app.requestSingleInstanceLock()

if (!gotTheLock) {
  // 另一个实例已经在运行，退出当前实例
  app.quit()
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
      if (res.ok) return
    } catch {
      // ignore
    }
    await delay(250)
  }
  throw new Error(`Nuxt server not ready: ${url}`)
}

let serverProcess = null
let serverUrl = 'http://127.0.0.1:3000'
let mainWindow = null

async function startNuxtNitroServer() {
  const host = '127.0.0.1'
  const port = Number(process.env.PORT || 3000)
  const url = `http://${host}:${port}`
  serverUrl = url

  if (!app.isPackaged) {
    return { url, stop: () => {} }
  }

  // nuxt-output 在 extraResources 配置中，会被放到 Resources/nuxt-output 目录下
  const resourcesPath = process.resourcesPath
  const serverEntry = join(resourcesPath, 'nuxt-output', 'server', 'index.mjs')
  if (!existsSync(serverEntry)) {
    throw new Error(`Missing Nuxt server entry: ${serverEntry}`)
  }

  serverProcess = spawn(process.execPath, [serverEntry], {
    env: {
      ...process.env,
      ELECTRON_RUN_AS_NODE: '1',  // 使用环境变量而非命令行参数，更可靠
      HOST: host,
      NITRO_HOST: host,
      PORT: String(port),
      NITRO_PORT: String(port),
    },
    cwd: resourcesPath,
    stdio: ['ignore', 'pipe', 'pipe'],  // stdin 忽略，stdout/stderr 管道
    detached: false,
    windowsHide: true,  // Windows 上隐藏控制台窗口
  })

  // 捕获错误输出用于调试
  let stderr = ''
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
