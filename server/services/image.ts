// 图片存储服务 - 管理图片的下载、存储和访问
import { createHash } from 'crypto'
import { existsSync, mkdirSync, writeFileSync, readFileSync } from 'fs'
import { join } from 'path'

// 图片存储目录
const UPLOAD_DIR = join(process.cwd(), 'uploads')

// 确保上传目录存在
function ensureUploadDir() {
  if (!existsSync(UPLOAD_DIR)) {
    mkdirSync(UPLOAD_DIR, { recursive: true })
  }
}

// 生成唯一文件名
function generateFileName(data: Buffer | string, ext: string): string {
  const hash = createHash('md5')
    .update(typeof data === 'string' ? data : data)
    .digest('hex')
    .slice(0, 16)
  const timestamp = Date.now().toString(36)
  return `${timestamp}-${hash}.${ext}`
}

// 从 URL 下载图片并保存到本地
export async function downloadImage(url: string): Promise<string | null> {
  try {
    ensureUploadDir()

    const response = await fetch(url)
    if (!response.ok) {
      console.error('[Image] 下载失败:', response.status, url)
      return null
    }

    const contentType = response.headers.get('content-type') || 'image/png'
    const ext = contentType.includes('jpeg') || contentType.includes('jpg') ? 'jpg'
      : contentType.includes('webp') ? 'webp'
      : contentType.includes('gif') ? 'gif'
      : 'png'

    const buffer = Buffer.from(await response.arrayBuffer())
    const fileName = generateFileName(buffer, ext)
    const filePath = join(UPLOAD_DIR, fileName)

    writeFileSync(filePath, buffer)
    console.log('[Image] 已下载:', fileName)

    return fileName
  } catch (error) {
    console.error('[Image] 下载图片失败:', error)
    return null
  }
}

// 从 base64 保存图片
export function saveBase64Image(base64Data: string): string | null {
  try {
    ensureUploadDir()

    // 解析 data URL
    const matches = base64Data.match(/^data:image\/(\w+);base64,(.+)$/)
    if (!matches) {
      console.error('[Image] 无效的 base64 格式')
      return null
    }

    const ext = matches[1] === 'jpeg' ? 'jpg' : matches[1]
    const data = matches[2]
    const buffer = Buffer.from(data, 'base64')

    const fileName = generateFileName(buffer, ext)
    const filePath = join(UPLOAD_DIR, fileName)

    writeFileSync(filePath, buffer)
    console.log('[Image] 已保存:', fileName)

    return fileName
  } catch (error) {
    console.error('[Image] 保存图片失败:', error)
    return null
  }
}

// 读取图片文件
export function readImage(fileName: string): { buffer: Buffer; mimeType: string } | null {
  try {
    const filePath = join(UPLOAD_DIR, fileName)
    if (!existsSync(filePath)) {
      return null
    }

    const buffer = readFileSync(filePath)
    const ext = fileName.split('.').pop()?.toLowerCase()
    const mimeType = ext === 'jpg' || ext === 'jpeg' ? 'image/jpeg'
      : ext === 'webp' ? 'image/webp'
      : ext === 'gif' ? 'image/gif'
      : 'image/png'

    return { buffer, mimeType }
  } catch (error) {
    console.error('[Image] 读取图片失败:', error)
    return null
  }
}

// 读取图片为 base64
export function readImageAsBase64(fileName: string): string | null {
  const result = readImage(fileName)
  if (!result) return null

  return `data:${result.mimeType};base64,${result.buffer.toString('base64')}`
}

// 检查图片是否存在
export function imageExists(fileName: string): boolean {
  return existsSync(join(UPLOAD_DIR, fileName))
}

// 获取图片的本地 URL 路径
export function getImageUrl(fileName: string): string {
  return `/api/images/${fileName}`
}
