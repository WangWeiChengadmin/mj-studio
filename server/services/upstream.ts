// 上游配置服务层
import { db } from '../database'
import { upstreams, aimodels, type Upstream, type NewUpstream, type Aimodel, type ApiKeyConfig, type UpstreamInfo } from '../database/schema'
import { eq, and } from 'drizzle-orm'

// 包含 aimodels 的上游配置类型
export interface UpstreamWithModels extends Upstream {
  aimodels: Aimodel[]
}

export function useUpstreamService() {
  // 获取用户的所有上游配置（包含 aimodels）
  async function listByUser(userId: number): Promise<UpstreamWithModels[]> {
    const upstreamList = await db.query.upstreams.findMany({
      where: eq(upstreams.userId, userId),
    })

    // 关联查询每个 upstream 的 aimodels
    const result: UpstreamWithModels[] = []
    for (const upstream of upstreamList) {
      const models = await db.query.aimodels.findMany({
        where: eq(aimodels.upstreamId, upstream.id),
      })
      result.push({ ...upstream, aimodels: models })
    }
    return result
  }

  // 获取单个配置（包含 aimodels）
  async function getById(id: number): Promise<UpstreamWithModels | undefined> {
    const upstream = await db.query.upstreams.findFirst({
      where: eq(upstreams.id, id),
    })
    if (!upstream) return undefined

    const models = await db.query.aimodels.findMany({
      where: eq(aimodels.upstreamId, id),
    })
    return { ...upstream, aimodels: models }
  }

  // 获取单个配置（不含 aimodels，用于简单查询）
  async function getByIdSimple(id: number): Promise<Upstream | undefined> {
    return db.query.upstreams.findFirst({
      where: eq(upstreams.id, id),
    })
  }

  // 获取用户的默认配置（包含 aimodels）
  async function getDefault(userId: number): Promise<UpstreamWithModels | undefined> {
    const upstream = await db.query.upstreams.findFirst({
      where: and(eq(upstreams.userId, userId), eq(upstreams.isDefault, true)),
    })
    if (!upstream) return undefined

    const models = await db.query.aimodels.findMany({
      where: eq(aimodels.upstreamId, upstream.id),
    })
    return { ...upstream, aimodels: models }
  }

  // 创建配置
  async function create(data: {
    userId: number
    name: string
    baseUrl: string
    apiKey: string
    apiKeys?: ApiKeyConfig[]
    remark?: string
    isDefault?: boolean
    upstreamPlatform?: string
    userApiKey?: string
  }): Promise<Upstream> {
    // 如果设为默认，先取消其他默认
    if (data.isDefault) {
      await db.update(upstreams)
        .set({ isDefault: false })
        .where(eq(upstreams.userId, data.userId))
    }

    // 如果没有提供 apiKeys，从 apiKey 创建默认的
    const apiKeys = data.apiKeys || [{ name: 'default', key: data.apiKey }]

    const [upstream] = await db.insert(upstreams).values({
      userId: data.userId,
      name: data.name,
      baseUrl: data.baseUrl,
      apiKey: data.apiKey,
      apiKeys,
      remark: data.remark ?? null,
      isDefault: data.isDefault ?? false,
      upstreamPlatform: data.upstreamPlatform as any,
      userApiKey: data.userApiKey ?? null,
    }).returning()

    return upstream
  }

  // 更新配置
  async function update(id: number, userId: number, data: Partial<{
    name: string
    baseUrl: string
    apiKey: string
    apiKeys: ApiKeyConfig[]
    remark: string | null
    isDefault: boolean
    upstreamPlatform: string | null
    userApiKey: string | null
  }>): Promise<Upstream | undefined> {
    // 如果设为默认，先取消其他默认
    if (data.isDefault) {
      await db.update(upstreams)
        .set({ isDefault: false })
        .where(eq(upstreams.userId, userId))
    }

    const [updated] = await db.update(upstreams)
      .set(data as any)
      .where(and(eq(upstreams.id, id), eq(upstreams.userId, userId)))
      .returning()

    return updated
  }

  // 删除配置（级联删除 aimodels）
  async function remove(id: number, userId: number): Promise<boolean> {
    // 先删除关联的 aimodels
    await db.delete(aimodels).where(eq(aimodels.upstreamId, id))

    const result = await db.delete(upstreams)
      .where(and(eq(upstreams.id, id), eq(upstreams.userId, userId)))
      .returning()

    return result.length > 0
  }

  /**
   * 获取指定配置的 API Key
   * @param upstream 上游配置
   * @param keyName Key 名称，默认 "default"
   * @returns API Key 字符串
   */
  function getApiKey(upstream: Upstream, keyName?: string): string {
    const targetName = keyName || 'default'

    // 优先从 apiKeys 数组获取
    if (upstream.apiKeys && upstream.apiKeys.length > 0) {
      const found = upstream.apiKeys.find(k => k.name === targetName)
      if (found) return found.key
      // 如果找不到指定的 key，返回第一个
      return upstream.apiKeys[0].key
    }

    // 兼容旧数据：使用 apiKey 字段
    return upstream.apiKey
  }

  /**
   * 更新上游信息缓存
   * @param id 上游配置 ID
   * @param upstreamInfo 上游信息
   */
  async function updateUpstreamInfo(id: number, upstreamInfo: UpstreamInfo): Promise<void> {
    await db.update(upstreams)
      .set({ upstreamInfo })
      .where(eq(upstreams.id, id))
  }

  return {
    listByUser,
    getById,
    getByIdSimple,
    getDefault,
    create,
    update,
    remove,
    getApiKey,
    updateUpstreamInfo,
  }
}
