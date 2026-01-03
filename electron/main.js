import { app, BrowserWindow, dialog, ipcMain } from 'electron'
import { spawn } from 'node:child_process'
import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { setTimeout as delay } from 'node:timers/promises'
import { fileURLToPath } from 'node:url'
import Database from 'better-sqlite3'

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

async function startNuxtNitroServer() {
  const host = '127.0.0.1'
  const port = Number(process.env.PORT || 3000)
  const url = `http://${host}:${port}`
  serverUrl = url

  if (!app.isPackaged) {
    return { url, stop: () => {} }
  }

  const serverEntry = join(app.getAppPath(), '.output', 'server', 'index.mjs')
  if (!existsSync(serverEntry)) {
    throw new Error(`Missing Nuxt server entry: ${serverEntry}`)
  }

  serverProcess = spawn(process.execPath, ['--run-as-node', serverEntry], {
    env: {
      ...process.env,
      HOST: host,
      NITRO_HOST: host,
      PORT: String(port),
      NITRO_PORT: String(port),
    },
    cwd: app.getAppPath(),
    stdio: 'inherit',
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

app.whenReady().then(async () => {
  const userDataPath = getUserDataPath()
  process.env.MJ_DATA_PATH = userDataPath
  process.env.MJ_UPLOADS_PATH = resolveUploadsPath(userDataPath)

  registerIpc()

  try {
    const { url, stop } = await startNuxtNitroServer()
    createMainWindow(url)

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
  if (BrowserWindow.getAllWindows().length === 0) {
    createMainWindow(serverUrl)
  }
})
