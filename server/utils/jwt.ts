// JWT 工具函数
import { SignJWT, jwtVerify } from 'jose'
import type { H3Event } from 'h3'
import { randomBytes } from 'crypto'
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs'
import { dirname, join } from 'path'

export interface JwtPayload {
  userId: number
  email: string
  name: string | null
}

function resolveJwtSecretFilePath(): string | null {
  const dataRoot = process.env.MJ_DATA_PATH
  if (!dataRoot) return null
  return join(dataRoot, 'data', 'jwt-secret.txt')
}

function isValidSecret(secret: string | undefined | null): secret is string {
  return typeof secret === 'string' && secret.length >= 32
}

function getOrCreateLocalJwtSecret(): string | null {
  const secretPath = resolveJwtSecretFilePath()
  if (!secretPath) return null

  try {
    if (existsSync(secretPath)) {
      const secret = readFileSync(secretPath, 'utf-8').trim()
      if (isValidSecret(secret)) return secret
    }

    mkdirSync(dirname(secretPath), { recursive: true })
    const generated = randomBytes(32).toString('hex') // 64 chars
    writeFileSync(secretPath, generated, { encoding: 'utf-8', mode: 0o600 })
    return generated
  } catch {
    return null
  }
}

// 获取 JWT 密钥（从环境变量读取）
function getJwtSecret(): Uint8Array {
  const envSecret = process.env.NUXT_JWT_SECRET || process.env.NUXT_SESSION_PASSWORD
  const secret = isValidSecret(envSecret) ? envSecret : getOrCreateLocalJwtSecret()
  if (!secret) throw new Error('JWT 密钥不可用：请设置 NUXT_JWT_SECRET（>=32位）或确保 MJ_DATA_PATH 可写')
  return new TextEncoder().encode(secret)
}

// 生成 JWT token
export async function signJwt(payload: JwtPayload): Promise<string> {
  const secret = getJwtSecret()

  const token = await new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('30d') // 30天过期
    .sign(secret)

  return token
}

// 验证 JWT token
export async function verifyJwt(token: string): Promise<JwtPayload | null> {
  try {
    const secret = getJwtSecret()
    const { payload } = await jwtVerify(token, secret)

    return {
      userId: payload.userId as number,
      email: payload.email as string,
      name: payload.name as string | null,
    }
  } catch {
    return null
  }
}

// 从请求头获取 token
export function getTokenFromHeader(event: H3Event): string | null {
  const authHeader = getHeader(event, 'authorization')
  if (!authHeader?.startsWith('Bearer ')) {
    return null
  }
  return authHeader.slice(7)
}

// 从 query 参数获取 token（用于 SSE 等不支持 header 的场景）
export function getTokenFromQuery(event: H3Event): string | null {
  const query = getQuery(event)
  return (query.token as string) || null
}

// 从请求中获取用户信息
export async function getUserFromEvent(event: H3Event): Promise<JwtPayload | null> {
  // 优先从 header 获取，其次从 query 参数获取（用于 SSE）
  const token = getTokenFromHeader(event) || getTokenFromQuery(event)
  if (!token) {
    return null
  }
  return verifyJwt(token)
}

// 用户信息（兼容原 nuxt-auth-utils 格式）
export interface AuthUser {
  id: number
  email: string
  name: string | null
}

// 要求认证（验证失败抛出 401 错误）
// 返回 { user } 格式，兼容原 requireUserSession
export async function requireAuth(event: H3Event): Promise<{ user: AuthUser }> {
  const payload = await getUserFromEvent(event)
  if (!payload) {
    throw createError({
      statusCode: 401,
      message: '未登录或登录已过期',
    })
  }
  return {
    user: {
      id: payload.userId,
      email: payload.email,
      name: payload.name,
    },
  }
}
