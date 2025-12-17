// 错误分类器 - 根据 API 响应识别错误类型并生成标准消息
// 参考: docs/ERROR_SPEC.md

// 错误类型定义
export type ErrorCode =
  | 'CONTENT_FILTERED'   // 内容审核
  | 'QUOTA_EXCEEDED'     // 配额耗尽
  | 'RATE_LIMITED'       // 请求过频
  | 'AUTH_FAILED'        // 认证失败
  | 'MODEL_UNAVAILABLE'  // 模型不可用
  | 'INVALID_PARAMS'     // 参数错误
  | 'UPSTREAM_TIMEOUT'   // 上游超时
  | 'NETWORK_ERROR'      // 网络错误
  | 'EMPTY_RESPONSE'     // 空响应
  | 'PARSE_ERROR'        // 解析失败
  | 'SAVE_FAILED'        // 保存失败
  | 'UNKNOWN'            // 未知错误

// 错误类型对应的标准消息
const ERROR_MESSAGES: Record<ErrorCode, string> = {
  CONTENT_FILTERED: '内容被安全过滤器拒绝',
  QUOTA_EXCEEDED: 'API 配额已用尽',
  RATE_LIMITED: '请求过于频繁，请稍后重试',
  AUTH_FAILED: 'API 密钥无效或已过期',
  MODEL_UNAVAILABLE: '模型暂不可用',
  INVALID_PARAMS: '请求参数无效',
  UPSTREAM_TIMEOUT: '上游服务响应超时',
  NETWORK_ERROR: '网络连接失败',
  EMPTY_RESPONSE: '未收到有效响应',
  PARSE_ERROR: '响应格式异常',
  SAVE_FAILED: '图片保存失败',
  UNKNOWN: '生成失败',
}

// 错误分类输入
interface ErrorInput {
  status?: number
  statusText?: string
  message?: string
  code?: string
  type?: string
  data?: any
  errorName?: string  // error.name，如 'FetchError', 'AbortError'
}

// 检查字符串是否包含任意关键词（不区分大小写）
function containsAny(str: string | undefined, keywords: string[]): boolean {
  if (!str) return false
  const lower = str.toLowerCase()
  return keywords.some(kw => lower.includes(kw.toLowerCase()))
}

// 分类错误并返回标准消息
export function classifyError(input: ErrorInput): string {
  const { status, message, code, type, data, errorName } = input

  // 合并所有文本用于关键词匹配
  const allText = [
    message,
    code,
    type,
    typeof data === 'string' ? data : JSON.stringify(data || ''),
  ].join(' ')

  // === 第一优先级：根据错误消息/错误码内容判断 ===

  // 1. 内容审核 (CONTENT_FILTERED)
  if (
    containsAny(allText, ['safety', 'blocked', 'filtered', 'content_policy', 'moderation', 'moderated', 'violat', 'nsfw', 'inappropriate', 'sensitive'])
  ) {
    return ERROR_MESSAGES.CONTENT_FILTERED
  }

  // 2. 空响应 (EMPTY_RESPONSE) - 优先于状态码检查
  if (
    containsAny(allText, ['empty response', 'empty_response', 'no response', '未收到', 'no meaningful content'])
  ) {
    return ERROR_MESSAGES.EMPTY_RESPONSE
  }

  // 3. 配额耗尽 (QUOTA_EXCEEDED)
  if (
    containsAny(allText, ['quota', 'balance', 'insufficient', 'billing', 'exceeded your'])
  ) {
    return ERROR_MESSAGES.QUOTA_EXCEEDED
  }

  // 4. 请求过频 (RATE_LIMITED) - 仅根据消息内容
  if (
    containsAny(allText, ['rate limit', 'rate_limit', 'too many requests'])
  ) {
    return ERROR_MESSAGES.RATE_LIMITED
  }

  // 5. 认证失败 (AUTH_FAILED)
  if (
    containsAny(allText, ['unauthorized', 'invalid key', 'invalid_api_key', 'authentication failed'])
  ) {
    return ERROR_MESSAGES.AUTH_FAILED
  }

  // 6. 模型不可用 (MODEL_UNAVAILABLE)
  if (
    containsAny(allText, ['model not found', 'does not exist', 'model_not_found'])
  ) {
    return ERROR_MESSAGES.MODEL_UNAVAILABLE
  }

  // 7. 上游超时 (UPSTREAM_TIMEOUT)
  if (
    containsAny(allText, ['timeout', 'timed out']) ||
    errorName === 'TimeoutError'
  ) {
    return ERROR_MESSAGES.UPSTREAM_TIMEOUT
  }

  // 8. 网络错误 (NETWORK_ERROR)
  if (
    errorName === 'FetchError' || errorName === 'NetworkError' ||
    containsAny(allText, ['ECONNREFUSED', 'ENOTFOUND', 'ETIMEDOUT', 'network error', 'connection error', 'connection refused'])
  ) {
    return ERROR_MESSAGES.NETWORK_ERROR
  }

  // === 第二优先级：根据 HTTP 状态码判断（兜底） ===

  if (status === 401 || status === 403) {
    return ERROR_MESSAGES.AUTH_FAILED
  }
  if (status === 402) {
    return ERROR_MESSAGES.QUOTA_EXCEEDED
  }
  if (status === 404) {
    return ERROR_MESSAGES.MODEL_UNAVAILABLE
  }
  if (status === 429) {
    return ERROR_MESSAGES.RATE_LIMITED
  }
  if (status === 400) {
    return ERROR_MESSAGES.INVALID_PARAMS
  }
  if (status === 504 || status === 408) {
    return ERROR_MESSAGES.UPSTREAM_TIMEOUT
  }

  // 10. 未知错误
  return ERROR_MESSAGES.UNKNOWN
}

// 从 ofetch 错误中提取信息并分类
export function classifyFetchError(error: any): string {
  return classifyError({
    status: error.status || error.statusCode,
    statusText: error.statusText || error.statusMessage,
    message: error.message,
    code: error.data?.error?.code || error.code,
    type: error.data?.error?.type || error.type,
    data: error.data,
    errorName: error.name,
  })
}

// 导出错误消息常量供其他模块使用
export { ERROR_MESSAGES }
