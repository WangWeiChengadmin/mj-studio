// 任务日志服务 - 记录完整请求和响应数据
import { writeFileSync, mkdirSync, existsSync } from 'fs'
import { join } from 'path'

const LOGS_DIR = 'logs'

function getLogDir(taskId: number): string {
  const date = new Date().toISOString().split('T')[0] // YYYY-MM-DD
  const dir = join(LOGS_DIR, date, String(taskId))
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true })
  }
  return dir
}

export function logRequest(taskId: number, data: {
  url: string
  method: string
  headers?: Record<string, string>
  body?: any
}) {
  try {
    const dir = getLogDir(taskId)
    const timestamp = new Date().toISOString()
    const logData = {
      timestamp,
      ...data,
      // 隐藏敏感信息
      headers: data.headers ? {
        ...data.headers,
        Authorization: data.headers.Authorization ? '[REDACTED]' : undefined,
      } : undefined,
    }
    writeFileSync(join(dir, 'request.json'), JSON.stringify(logData, null, 2))
  } catch (e) {
    console.error('[Logger] 写入请求日志失败:', e)
  }
}

export function logResponse(taskId: number, data: {
  status?: number
  statusText?: string
  data?: any
  error?: any
}) {
  try {
    const dir = getLogDir(taskId)
    const timestamp = new Date().toISOString()
    const logData = {
      timestamp,
      ...data,
    }
    writeFileSync(join(dir, 'response.json'), JSON.stringify(logData, null, 2))
  } catch (e) {
    console.error('[Logger] 写入响应日志失败:', e)
  }
}
