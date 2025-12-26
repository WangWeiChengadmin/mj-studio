// GET /api/upstreams/[id]/balance - 查询指定配置的 API Key 余额
import { useUpstreamService } from '../../../services/upstream'
import { queryBalance } from '../../../services/balance'
import type { UpstreamPlatform } from '../../../database/schema'

export default defineEventHandler(async (event) => {
  const { user } = await requireAuth(event)

  const id = Number(getRouterParam(event, 'id'))
  if (!id || isNaN(id)) {
    throw createError({ statusCode: 400, message: '无效的配置ID' })
  }

  const upstreamService = useUpstreamService()
  const upstream = await upstreamService.getByIdSimple(id)

  if (!upstream || upstream.userId !== user.id) {
    throw createError({ statusCode: 404, message: '配置不存在' })
  }

  // 检查是否配置了余额查询类型
  if (!upstream.upstreamPlatform) {
    return { success: false, error: '该配置未设置余额查询类型' }
  }

  // userApiKey 必须配置
  if (!upstream.userApiKey) {
    return { success: false, error: '未配置用于查询余额的 API Key' }
  }

  const result = await queryBalance(
    upstream.baseUrl,
    upstream.userApiKey,
    upstream.upstreamPlatform as UpstreamPlatform
  )

  // 查询成功后保存 upstreamInfo 到数据库
  if (result.success && result.upstreamInfo) {
    await upstreamService.updateUpstreamInfo(id, result.upstreamInfo)
  }

  return result
})
