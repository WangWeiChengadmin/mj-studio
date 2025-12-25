// 启动时自动执行数据库迁移
import { migrate } from 'drizzle-orm/better-sqlite3/migrator'
import { db } from '../database'
import { existsSync } from 'fs'
import { modelConfigs } from '../database/schema'
import { isNull, eq } from 'drizzle-orm'

export default defineNitroPlugin(async () => {
  // 生产环境迁移文件在 /app/server/database/migrations
  // 开发环境迁移文件在 ./server/database/migrations
  const migrationsFolder = existsSync('/app/server/database/migrations')
    ? '/app/server/database/migrations'
    : './server/database/migrations'

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

  // 数据迁移：将 apiKey 迁移到 apiKeys 数组
  await migrateApiKeys()
})

/**
 * 将现有的 apiKey 迁移到 apiKeys 数组结构
 * 仅对 apiKeys 为空的记录执行迁移
 */
async function migrateApiKeys() {
  try {
    const configs = db.select().from(modelConfigs).where(isNull(modelConfigs.apiKeys)).all()

    if (configs.length === 0) {
      return
    }

    console.log(`[DB] 开始迁移 ${configs.length} 条模型配置的 apiKey 到 apiKeys`)

    for (const config of configs) {
      const apiKeys = [{ name: 'default', key: config.apiKey }]
      db.update(modelConfigs)
        .set({ apiKeys })
        .where(eq(modelConfigs.id, config.id))
        .run()
    }

    console.log('[DB] apiKey 迁移完成')
  } catch (error) {
    console.error('[DB] apiKey 迁移失败:', error)
  }
}
