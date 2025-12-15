// 获取图片文件
import { readImage } from '../../services/image'

export default defineEventHandler(async (event) => {
  const name = getRouterParam(event, 'name')

  if (!name) {
    throw createError({
      statusCode: 400,
      message: '缺少图片名称',
    })
  }

  const result = readImage(name)
  if (!result) {
    throw createError({
      statusCode: 404,
      message: '图片不存在',
    })
  }

  // 设置缓存头
  setHeader(event, 'Content-Type', result.mimeType)
  setHeader(event, 'Cache-Control', 'public, max-age=31536000, immutable')

  return result.buffer
})
