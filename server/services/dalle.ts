// DALL-E Images API 格式服务
// 文生图: POST /v1/images/generations
// 垫图:   POST /v1/images/edits (需中转站支持)

import type { GenerateResult } from './types'

interface DalleResponse {
  created: number
  data: Array<{
    url?: string
    b64_json?: string
    revised_prompt?: string
  }>
}

// 工厂函数：根据配置创建DALL-E服务实例
export function createDalleService(baseUrl: string, apiKey: string) {
  const headers = {
    'Authorization': `Bearer ${apiKey}`,
    'Content-Type': 'application/json',
  }

  // 文生图
  async function generateImage(prompt: string, modelName: string = 'dall-e-3'): Promise<GenerateResult> {
    try {
      console.log('[DALL-E] 请求URL:', `${baseUrl}/v1/images/generations`)
      console.log('[DALL-E] 模型:', modelName)

      const response = await $fetch<DalleResponse>(`${baseUrl}/v1/images/generations`, {
        method: 'POST',
        headers,
        body: {
          model: modelName,
          prompt,
          n: 1,
          size: '1024x1024',
          response_format: 'url',
        },
      })

      console.log('[DALL-E] 响应:', JSON.stringify(response, null, 2).slice(0, 500))

      const imageData = response.data?.[0]
      if (!imageData) {
        return {
          success: false,
          error: '未收到图片数据',
        }
      }

      return {
        success: true,
        imageUrl: imageData.url,
        imageBase64: imageData.b64_json,
      }
    } catch (error: any) {
      console.error('[DALL-E] API错误:', error)
      const errorMessage = error.data?.error?.message || error.message || '调用DALL-E API失败'
      return {
        success: false,
        error: errorMessage,
      }
    }
  }

  // 垫图（图片编辑）- 使用 multipart/form-data 格式
  // POST /v1/images/edits
  async function generateImageWithRef(prompt: string, images: string[], modelName: string = 'dall-e-3'): Promise<GenerateResult> {
    if (images.length === 0) {
      return generateImage(prompt, modelName)
    }

    try {
      console.log('[DALL-E] 垫图请求URL:', `${baseUrl}/v1/images/edits`)
      console.log('[DALL-E] 模型:', modelName)

      // 取第一张参考图，转换 base64 为 Blob
      const imageDataUrl = images[0]
      const base64Match = imageDataUrl.match(/^data:image\/(\w+);base64,(.+)$/)

      let imageBlob: Blob
      let mimeType = 'image/png'

      if (base64Match) {
        mimeType = `image/${base64Match[1]}`
        const base64Data = base64Match[2]
        const binaryData = Buffer.from(base64Data, 'base64')
        imageBlob = new Blob([binaryData], { type: mimeType })
      } else {
        // 假设是纯 base64
        const binaryData = Buffer.from(imageDataUrl, 'base64')
        imageBlob = new Blob([binaryData], { type: mimeType })
      }

      // 构建 FormData
      const formData = new FormData()
      const ext = mimeType.split('/')[1] || 'png'
      formData.append('image', imageBlob, `image.${ext}`)
      formData.append('prompt', prompt)
      formData.append('model', modelName)
      formData.append('n', '1')
      formData.append('response_format', 'b64_json')

      const response = await $fetch<DalleResponse>(`${baseUrl}/v1/images/edits`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          // 不设置 Content-Type，让 fetch 自动设置 multipart/form-data boundary
        },
        body: formData,
      })

      console.log('[DALL-E] 垫图响应:', JSON.stringify(response, null, 2).slice(0, 500))

      const imageData = response.data?.[0]
      if (!imageData) {
        return {
          success: false,
          error: '未收到图片数据',
        }
      }

      return {
        success: true,
        imageUrl: imageData.url,
        imageBase64: imageData.b64_json,
      }
    } catch (error: any) {
      console.error('[DALL-E] 垫图API错误:', error)
      const errorMessage = error.data?.error?.message || error.message || '调用DALL-E编辑API失败'
      // 如果垫图失败，降级为普通文生图
      console.log('[DALL-E] 垫图失败，降级为普通文生图，错误:', errorMessage)
      return generateImage(prompt, modelName)
    }
  }

  return {
    generateImage,
    generateImageWithRef,
  }
}
