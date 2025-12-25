// 上传图片（支持 FormData 文件上传）
import { saveFile, saveBase64File, getFileUrl } from '../../services/file'

export default defineEventHandler(async (event) => {
  await requireAuth(event)

  const contentType = getHeader(event, 'content-type') || ''

  // 支持 FormData 文件上传
  if (contentType.includes('multipart/form-data')) {
    const formData = await readMultipartFormData(event)
    if (!formData || formData.length === 0) {
      throw createError({
        statusCode: 400,
        message: '缺少图片文件',
      })
    }

    const file = formData.find(f => f.name === 'file')
    if (!file || !file.data) {
      throw createError({
        statusCode: 400,
        message: '缺少图片文件',
      })
    }

    const result = saveFile(file.data, file.filename || 'image.png', file.type || 'image/png')
    if (!result) {
      throw createError({
        statusCode: 500,
        message: '保存图片失败',
      })
    }

    return {
      success: true,
      fileName: result.fileName,
      url: getFileUrl(result.fileName),
    }
  }

  // 向后兼容：支持 JSON body 中的 base64
  const body = await readBody(event)
  const { base64 } = body

  if (!base64) {
    throw createError({
      statusCode: 400,
      message: '缺少图片数据',
    })
  }

  const result = saveBase64File(base64)
  if (!result) {
    throw createError({
      statusCode: 500,
      message: '保存图片失败',
    })
  }

  return {
    success: true,
    fileName: result.fileName,
    url: getFileUrl(result.fileName),
  }
})
