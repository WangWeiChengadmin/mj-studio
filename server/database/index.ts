import Database from 'better-sqlite3'
import { drizzle } from 'drizzle-orm/better-sqlite3'
import * as schema from './schema'
import { existsSync, mkdirSync } from 'fs'
import { dirname, join } from 'path'

function getDbPath() {
  if (process.env.MJ_DATA_PATH) {
    return join(process.env.MJ_DATA_PATH, 'data', 'mj-studio.db')
  }
  return './data/mj-studio.db'
}

const dbPath = getDbPath()

// 确保数据目录存在
const dir = dirname(dbPath)
if (!existsSync(dir)) {
  mkdirSync(dir, { recursive: true })
}

const sqlite = new Database(dbPath)
export const db = drizzle(sqlite, { schema })
