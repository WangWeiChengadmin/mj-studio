// 任务日志服务 - 记录完整请求和响应数据
import { writeFileSync, mkdirSync, existsSync, readFileSync, readdirSync } from 'fs'
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

// 根据任务创建日期查找日志目录
function findLogDir(taskId: number, createdAt: Date): string | null {
  // 尝试任务创建日期
  const taskDate = createdAt.toISOString().split('T')[0]
  const primaryDir = join(LOGS_DIR, taskDate, String(taskId))
  if (existsSync(primaryDir)) {
    return primaryDir
  }

  // 如果找不到，遍历所有日期目录查找（兜底）
  if (!existsSync(LOGS_DIR)) return null

  const dateDirs = readdirSync(LOGS_DIR, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => d.name)
    .sort()
    .reverse() // 最新的在前

  for (const dateDir of dateDirs) {
    const taskDir = join(LOGS_DIR, dateDir, String(taskId))
    if (existsSync(taskDir)) {
      return taskDir
    }
  }

  return null
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

// 读取任务日志
export function readTaskLogs(taskId: number, createdAt: Date): {
  request: any
  response: any
} | null {
  const dir = findLogDir(taskId, createdAt)
  if (!dir) return null

  let request = null
  let response = null

  const requestPath = join(dir, 'request.json')
  const responsePath = join(dir, 'response.json')

  if (existsSync(requestPath)) {
    try {
      request = JSON.parse(readFileSync(requestPath, 'utf-8'))
    } catch (e) {
      console.error('[Logger] 读取请求日志失败:', e)
    }
  }

  if (existsSync(responsePath)) {
    try {
      response = JSON.parse(readFileSync(responsePath, 'utf-8'))
    } catch (e) {
      console.error('[Logger] 读取响应日志失败:', e)
    }
  }

  // 至少要有 response 才返回（没有响应的错误不显示详情按钮）
  if (!response) return null

  return { request, response }
}
