// Gemini Image Generation 服务封装
// 使用 Google Gemini 2.0 Flash 进行图像生成

import type { GenerateResult } from './types'

interface GeminiResponse {
  candidates: Array<{
    content: {
      parts: Array<{
        text?: string
        inlineData?: {
          mimeType: string
          data: string // base64
        }
      }>
      role: string
    }
    finishReason: string
  }>
  usageMetadata?: {
    promptTokenCount: number
    candidatesTokenCount: number
    totalTokenCount: number
  }
}

// 工厂函数：根据配置创建Gemini服务实例
export function createGeminiService(baseUrl: string, apiKey: string) {
  // 生成图像
  async function generateImage(prompt: string, modelName: string = 'gemini-2.5-flash-image'): Promise<GenerateResult> {
    if (!apiKey) {
      return {
        success: false,
        error: 'Gemini API Key 未配置',
      }
    }

    try {
      const url = `${baseUrl}/v1beta/models/${modelName}:generateContent?key=${apiKey}`
      console.log('[Gemini] 请求URL:', url.replace(apiKey, '***'))

      const response = await $fetch<GeminiResponse>(
        url,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: {
            contents: [
              {
                parts: [
                  {
                    text: prompt,
                  },
                ],
              },
            ],
            generationConfig: {
              responseModalities: ['Text', 'Image'],
            },
          },
        }
      )

      console.log('[Gemini] 响应:', JSON.stringify(response, null, 2).slice(0, 1000))

      // 解析响应，查找图像数据
      const candidate = response.candidates?.[0]
      if (!candidate) {
        return {
          success: false,
          error: '未收到响应',
        }
      }

      // 查找图像部分
      const imagePart = candidate.content?.parts?.find(part => part.inlineData)
      if (imagePart?.inlineData) {
        return {
          success: true,
          imageBase64: imagePart.inlineData.data,
          mimeType: imagePart.inlineData.mimeType,
        }
      }

      // 如果没有图像，返回文本（可能是错误信息）
      const textPart = candidate.content?.parts?.find(part => part.text)
      return {
        success: false,
        error: textPart?.text || '未生成图像',
      }
    } catch (error: any) {
      // 处理API错误
      console.error('[Gemini] API错误:', error)
      console.error('[Gemini] 错误详情:', JSON.stringify(error.data || error.response || {}, null, 2))
      const errorMessage = error.data?.error?.message || error.message || '调用Gemini API失败'
      return {
        success: false,
        error: errorMessage,
      }
    }
  }

  // 垫图（带参考图）- 使用multimodal输入
  async function generateImageWithRef(prompt: string, images: string[], modelName: string = 'gemini-2.5-flash-image'): Promise<GenerateResult> {
    if (!apiKey) {
      return {
        success: false,
        error: 'Gemini API Key 未配置',
      }
    }

    if (images.length === 0) {
      return generateImage(prompt, modelName)
    }

    try {
      const url = `${baseUrl}/v1beta/models/${modelName}:generateContent?key=${apiKey}`
      console.log('[Gemini] 垫图请求URL:', url.replace(apiKey, '***'))
      console.log('[Gemini] 参考图数量:', images.length)

      // 构建parts数组，包含参考图和文本提示
      const parts: Array<{text?: string, inlineData?: {mimeType: string, data: string}}> = []

      // 添加参考图
      for (const img of images) {
        // 解析base64图片
        const match = img.match(/^data:(image\/[^;]+);base64,(.+)$/)
        if (match) {
          parts.push({
            inlineData: {
              mimeType: match[1],
              data: match[2],
            },
          })
        }
      }

      // 添加文本提示
      parts.push({
        text: prompt,
      })

      const response = await $fetch<GeminiResponse>(
        url,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: {
            contents: [
              {
                parts,
              },
            ],
            generationConfig: {
              responseModalities: ['Text', 'Image'],
            },
          },
        }
      )

      console.log('[Gemini] 垫图响应:', JSON.stringify(response, null, 2).slice(0, 1000))

      const candidate = response.candidates?.[0]
      if (!candidate) {
        return {
          success: false,
          error: '未收到响应',
        }
      }

      const imagePart = candidate.content?.parts?.find(part => part.inlineData)
      if (imagePart?.inlineData) {
        return {
          success: true,
          imageBase64: imagePart.inlineData.data,
          mimeType: imagePart.inlineData.mimeType,
        }
      }

      const textPart = candidate.content?.parts?.find(part => part.text)
      return {
        success: false,
        error: textPart?.text || '未生成图像',
      }
    } catch (error: any) {
      console.error('[Gemini] 垫图API错误:', error)
      const errorMessage = error.data?.error?.message || error.message || '调用Gemini API失败'
      return {
        success: false,
        error: errorMessage,
      }
    }
  }

  return {
    generateImage,
    generateImageWithRef,
  }
}

export type { GenerateResult as GeminiGenerateResult }
