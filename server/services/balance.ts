// 余额查询服务
import type { BalanceApiType } from '../database/schema'

export interface BalanceResult {
  success: boolean
  balance?: number
  used?: number
  total?: number
  currency?: string
  error?: string
}

/**
 * 查询 API Key 余额
 * @param baseUrl API 基础地址
 * @param apiKey API Key
 * @param apiType 余额查询 API 类型
 */
export async function queryBalance(
  baseUrl: string,
  apiKey: string,
  apiType: BalanceApiType
): Promise<BalanceResult> {
  try {
    switch (apiType) {
      case 'oneapi':
      case 'n1n':
        return await queryOneApiBalance(baseUrl, apiKey)
      case 'yunwu':
        return { success: false, error: '云雾暂不支持 API 余额查询' }
      default:
        return { success: false, error: '不支持的余额查询类型' }
    }
  } catch (error: any) {
    return { success: false, error: error.message || '查询失败' }
  }
}

/**
 * OneAPI/NewAPI 格式余额查询
 * 端点: GET /api/user/self
 */
async function queryOneApiBalance(baseUrl: string, apiKey: string): Promise<BalanceResult> {
  const url = `${baseUrl.replace(/\/$/, '')}/api/user/self`

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`)
  }

  const data = await response.json()

  // OneAPI 返回格式: { success: true, data: { quota: number, used_quota: number } }
  if (data.success && data.data) {
    const quota = data.data.quota || 0
    const usedQuota = data.data.used_quota || 0
    // quota 单位通常是 1/500000 美元
    const balance = quota / 500000
    const used = usedQuota / 500000

    return {
      success: true,
      balance,
      used,
      total: balance + used,
      currency: 'USD',
    }
  }

  return { success: false, error: data.message || '查询失败' }
}

