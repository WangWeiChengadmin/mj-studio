// 查询指定配置的 API Key 余额
import { useModelConfigService } from '../../../services/modelConfig'
import { queryBalance } from '../../../services/balance'
import type { BalanceApiType } from '../../../database/schema'

export default defineEventHandler(async (event) => {
  const user = event.context.user
  if (!user) {
    throw createError({ statusCode: 401, message: '未登录' })
  }

  const id = Number(getRouterParam(event, 'id'))
  if (!id || isNaN(id)) {
    throw createError({ statusCode: 400, message: '无效的配置ID' })
  }

  const query = getQuery(event)
  const keyName = query.keyName as string | undefined

  const modelConfigService = useModelConfigService()
  const config = await modelConfigService.getById(id)

  if (!config || config.userId !== user.id) {
    throw createError({ statusCode: 404, message: '配置不存在' })
  }

  // 查找指定的 Key
  const targetKeyName = keyName || 'default'
  const keyConfig = config.apiKeys?.find(k => k.name === targetKeyName)

  if (!keyConfig) {
    throw createError({ statusCode: 404, message: `Key "${targetKeyName}" 不存在` })
  }

  if (!keyConfig.balanceApiType) {
    return { success: false, error: '该 Key 未配置余额查询类型' }
  }

  const result = await queryBalance(
    config.baseUrl,
    keyConfig.key,
    keyConfig.balanceApiType as BalanceApiType
  )

  return result
})
