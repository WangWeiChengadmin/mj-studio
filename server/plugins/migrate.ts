// 启动时自动执行数据库迁移
import { migrate } from 'drizzle-orm/better-sqlite3/migrator'
import { db } from '../database'
import { existsSync } from 'fs'

export default defineNitroPlugin(async () => {
  // Electron 打包环境通过 MJ_MIGRATIONS_PATH 环境变量指定迁移路径
  // 生产环境迁移文件在 /app/server/database/migrations
  // 开发环境迁移文件在 ./server/database/migrations
  let migrationsFolder = './server/database/migrations'

  if (process.env.MJ_MIGRATIONS_PATH && existsSync(process.env.MJ_MIGRATIONS_PATH)) {
    migrationsFolder = process.env.MJ_MIGRATIONS_PATH
  } else if (existsSync('/app/server/database/migrations')) {
    migrationsFolder = '/app/server/database/migrations'
  }

  try {
    migrate(db, { migrationsFolder })
    console.log('[DB] 数据库迁移完成')
  } catch (error) {
    console.error('[DB] 数据库迁移失败:', error)
    throw error
  }
})
