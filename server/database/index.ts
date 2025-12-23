import Database from 'better-sqlite3'
import { drizzle } from 'drizzle-orm/better-sqlite3'
import { migrate } from 'drizzle-orm/better-sqlite3/migrator'
import * as schema from './schema'
import { existsSync, mkdirSync } from 'fs'
import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

const dbPath = './data/mj-studio.db'

// 确保数据目录存在
const dir = dirname(dbPath)
if (!existsSync(dir)) {
  mkdirSync(dir, { recursive: true })
}

const sqlite = new Database(dbPath)
export const db = drizzle(sqlite, { schema })

// 启动时自动执行迁移
// 使用 __dirname 确保生产环境路径正确
const migrationsFolder = resolve(__dirname, 'migrations')
try {
  migrate(db, { migrationsFolder })
  console.log('[DB] 数据库迁移完成')
} catch (error: any) {
  // 忽略 "table already exists" 错误（首次从旧迁移系统切换时）
  if (error?.cause?.code === 'SQLITE_ERROR' && error?.cause?.message?.includes('already exists')) {
    console.log('[DB] 数据库表已存在，跳过初始迁移')
  } else {
    console.error('[DB] 数据库迁移失败:', error)
    throw error
  }
}
