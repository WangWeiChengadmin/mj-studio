// 启动时自动执行数据库迁移
import { migrate } from 'drizzle-orm/better-sqlite3/migrator'
import { db } from '../database'
import { existsSync } from 'fs'
import { upstreams, aimodels, tasks, assistants, messages } from '../database/schema'
import { isNull, eq, and, sql } from 'drizzle-orm'
import type { ModelTypeConfig, ModelCategory } from '../../app/shared/types'

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

  // 数据迁移
  await migrateApiKeys()
  await migrateModelTypeConfigsToAimodels()
  await migrateTaskAimodelIds()
  await migrateAssistantAimodelIds()
  await migrateMessageAimodelIds()

  // 清理：删除已废弃的 model_type_configs 列（数据已迁移到 aimodels 表）
  await dropModelTypeConfigsColumn()
})

/**
 * 将现有的 apiKey 迁移到 apiKeys 数组结构
 * 仅对 apiKeys 为空的记录执行迁移
 */
async function migrateApiKeys() {
  try {
    const configs = db.select().from(upstreams).where(isNull(upstreams.apiKeys)).all()

    if (configs.length === 0) {
      return
    }

    console.log(`[DB] 开始迁移 ${configs.length} 条上游配置的 apiKey 到 apiKeys`)

    for (const config of configs) {
      const apiKeys = [{ name: 'default', key: config.apiKey }]
      db.update(upstreams)
        .set({ apiKeys })
        .where(eq(upstreams.id, config.id))
        .run()
    }

    console.log('[DB] apiKey 迁移完成')
  } catch (error) {
    console.error('[DB] apiKey 迁移失败:', error)
  }
}

/**
 * 将 model_type_configs JSON 字段数据迁移到 aimodels 子表
 */
async function migrateModelTypeConfigsToAimodels() {
  try {
    // 检查 aimodels 表是否已有数据
    const existingAimodels = db.select().from(aimodels).limit(1).all()
    if (existingAimodels.length > 0) {
      return // 已有数据，跳过迁移
    }

    // 查询包含 model_type_configs 的记录（使用原始 SQL 因为 schema 已移除该字段）
    const upstreamRecords = db.all<{
      id: number
      model_type_configs: string | null
    }>(sql`SELECT id, model_type_configs FROM upstreams WHERE model_type_configs IS NOT NULL`)

    if (upstreamRecords.length === 0) {
      return
    }

    console.log(`[DB] 开始迁移 ${upstreamRecords.length} 条上游配置的 modelTypeConfigs 到 aimodels 表`)

    let totalModels = 0
    for (const upstream of upstreamRecords) {
      if (!upstream.model_type_configs) continue

      let configs: ModelTypeConfig[]
      try {
        configs = JSON.parse(upstream.model_type_configs)
      } catch {
        console.error(`[DB] 解析 upstream ${upstream.id} 的 modelTypeConfigs 失败`)
        continue
      }

      for (const mtc of configs) {
        // 确定 category：优先使用配置中的值，否则根据 modelType 推断
        const category: ModelCategory = mtc.category || inferCategory(mtc.modelType)

        db.insert(aimodels).values({
          upstreamId: upstream.id,
          category,
          modelType: mtc.modelType,
          apiFormat: mtc.apiFormat,
          modelName: mtc.modelName,
          estimatedTime: mtc.estimatedTime || 60,
          keyName: mtc.keyName || 'default',
          createdAt: new Date(),
        }).run()
        totalModels++
      }
    }

    console.log(`[DB] modelTypeConfigs 迁移完成，共迁移 ${totalModels} 个模型配置`)
  } catch (error) {
    console.error('[DB] modelTypeConfigs 迁移失败:', error)
  }
}

/**
 * 根据 modelType 推断 category
 */
function inferCategory(modelType: string): ModelCategory {
  const imageModelTypes = [
    'midjourney', 'gemini', 'flux', 'dalle', 'doubao',
    'gpt4o-image', 'grok-image', 'qwen-image', 'z-image', 'koukoutu',
  ]
  return imageModelTypes.includes(modelType) ? 'image' : 'chat'
}

/**
 * 为 tasks 表填充 aimodel_id
 */
async function migrateTaskAimodelIds() {
  try {
    // 查找 aimodel_id 为 0 的任务
    const tasksToUpdate = db.select().from(tasks).where(eq(tasks.aimodelId, 0)).all()

    if (tasksToUpdate.length === 0) {
      return
    }

    console.log(`[DB] 开始为 ${tasksToUpdate.length} 条任务填充 aimodelId`)

    let updated = 0
    for (const task of tasksToUpdate) {
      // 根据 upstreamId 和 modelName 查找对应的 aimodel
      const aimodel = db.select().from(aimodels).where(
        and(
          eq(aimodels.upstreamId, task.upstreamId),
          eq(aimodels.modelName, task.modelName || ''),
        ),
      ).get()

      if (aimodel) {
        db.update(tasks)
          .set({ aimodelId: aimodel.id })
          .where(eq(tasks.id, task.id))
          .run()
        updated++
      } else {
        // 如果找不到匹配的 aimodel，尝试按 modelType 匹配
        const aimodelByType = db.select().from(aimodels).where(
          and(
            eq(aimodels.upstreamId, task.upstreamId),
            eq(aimodels.modelType, task.modelType),
          ),
        ).get()

        if (aimodelByType) {
          db.update(tasks)
            .set({ aimodelId: aimodelByType.id })
            .where(eq(tasks.id, task.id))
            .run()
          updated++
        } else {
          console.warn(`[DB] 任务 ${task.id} 找不到匹配的 aimodel (upstreamId=${task.upstreamId}, modelName=${task.modelName})`)
        }
      }
    }

    console.log(`[DB] tasks.aimodelId 迁移完成，更新了 ${updated} 条记录`)
  } catch (error) {
    console.error('[DB] tasks.aimodelId 迁移失败:', error)
  }
}

/**
 * 为 assistants 表填充 aimodel_id
 */
async function migrateAssistantAimodelIds() {
  try {
    // 查找有 upstreamId 但没有 aimodelId 的助手
    const assistantsToUpdate = db.select().from(assistants).where(
      and(
        sql`${assistants.upstreamId} IS NOT NULL`,
        isNull(assistants.aimodelId),
      ),
    ).all()

    if (assistantsToUpdate.length === 0) {
      return
    }

    console.log(`[DB] 开始为 ${assistantsToUpdate.length} 条助手填充 aimodelId`)

    let updated = 0
    for (const assistant of assistantsToUpdate) {
      if (!assistant.upstreamId) continue

      // 根据 upstreamId 和 modelName 查找对应的 aimodel
      const aimodel = db.select().from(aimodels).where(
        and(
          eq(aimodels.upstreamId, assistant.upstreamId),
          eq(aimodels.modelName, assistant.modelName || ''),
        ),
      ).get()

      if (aimodel) {
        db.update(assistants)
          .set({ aimodelId: aimodel.id })
          .where(eq(assistants.id, assistant.id))
          .run()
        updated++
      }
    }

    console.log(`[DB] assistants.aimodelId 迁移完成，更新了 ${updated} 条记录`)
  } catch (error) {
    console.error('[DB] assistants.aimodelId 迁移失败:', error)
  }
}

/**
 * 为 messages 表填充 aimodel_id
 */
async function migrateMessageAimodelIds() {
  try {
    // 查找有 upstreamId 但没有 aimodelId 的消息
    const messagesToUpdate = db.select().from(messages).where(
      and(
        sql`${messages.upstreamId} IS NOT NULL`,
        isNull(messages.aimodelId),
      ),
    ).all()

    if (messagesToUpdate.length === 0) {
      return
    }

    console.log(`[DB] 开始为 ${messagesToUpdate.length} 条消息填充 aimodelId`)

    let updated = 0
    for (const message of messagesToUpdate) {
      if (!message.upstreamId) continue

      // 根据 upstreamId 和 modelName 查找对应的 aimodel
      const aimodel = db.select().from(aimodels).where(
        and(
          eq(aimodels.upstreamId, message.upstreamId),
          eq(aimodels.modelName, message.modelName || ''),
        ),
      ).get()

      if (aimodel) {
        db.update(messages)
          .set({ aimodelId: aimodel.id })
          .where(eq(messages.id, message.id))
          .run()
        updated++
      }
    }

    console.log(`[DB] messages.aimodelId 迁移完成，更新了 ${updated} 条记录`)
  } catch (error) {
    console.error('[DB] messages.aimodelId 迁移失败:', error)
  }
}

/**
 * 删除已废弃的 model_type_configs 列
 * 该列数据已迁移到 aimodels 表，此函数确保列被正确删除
 */
async function dropModelTypeConfigsColumn() {
  try {
    // 检查列是否存在
    const tableInfo = db.all<{ name: string }>(sql`PRAGMA table_info(upstreams)`)
    const hasColumn = tableInfo.some(col => col.name === 'model_type_configs')

    if (!hasColumn) {
      return // 列已删除，跳过
    }

    console.log('[DB] 删除已废弃的 model_type_configs 列')

    // SQLite 不支持直接 DROP COLUMN（3.35.0 之前），需要重建表
    // 但 SQLite 3.35.0+ 支持 ALTER TABLE DROP COLUMN
    // 先尝试直接删除，失败则跳过（等待下次升级）
    try {
      db.run(sql`ALTER TABLE upstreams DROP COLUMN model_type_configs`)
      console.log('[DB] model_type_configs 列删除完成')
    } catch (dropError: any) {
      // 如果 SQLite 版本不支持 DROP COLUMN，记录警告但不阻塞启动
      console.warn('[DB] 无法删除 model_type_configs 列（SQLite 版本可能不支持），该列将保留')
    }
  } catch (error) {
    console.error('[DB] 检查/删除 model_type_configs 列失败:', error)
  }
}
