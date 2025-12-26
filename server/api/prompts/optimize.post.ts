// POST /api/prompts/optimize - AI 优化绘图提示词
import { createChatService } from '../../services/chat'
import { useModelConfigService } from '../../services/modelConfig'

const OPTIMIZE_SYSTEM_PROMPT = `你是一个专业的 AI 绘图提示词优化专家。你的任务是将用户提供的简单描述优化为更详细、更专业的绘图提示词。

优化规则：
1. 保持原始描述的核心意图
2. 添加适当的艺术风格描述（如：油画、水彩、数字艺术等）
3. 添加光影、构图、色彩等专业描述
4. 添加质量相关的关键词（如：高清、细节丰富、8K等）
5. 使用英文输出，因为大多数 AI 绘图模型对英文提示词效果更好
6. 保持提示词简洁，避免过于冗长（建议 50-150 词）

直接输出优化后的提示词，不要加任何解释或前缀。`

export default defineEventHandler(async (event) => {
  // 需要登录
  await requireAuth(event)

  const body = await readBody(event)
  const { prompt, configId, modelName } = body

  if (!prompt?.trim()) {
    throw createError({
      statusCode: 400,
      message: '请提供需要优化的提示词',
    })
  }

  if (!configId || !modelName) {
    throw createError({
      statusCode: 400,
      message: '请先在设置中配置 AI 优化模型',
    })
  }

  const modelConfigService = useModelConfigService()

  // 获取模型配置
  const config = await modelConfigService.getById(configId)
  if (!config) {
    throw createError({
      statusCode: 404,
      message: '模型配置不存在',
    })
  }

  try {
    // 从 modelTypeConfigs 中查找对应模型的 keyName
    const modelTypeConfig = config.modelTypeConfigs?.find(
      mtc => mtc.modelName === modelName && mtc.category === 'chat'
    )
    const keyName = modelTypeConfig?.keyName

    const chatService = createChatService(config, keyName)
    const result = await chatService.chat(
      modelName,
      OPTIMIZE_SYSTEM_PROMPT,
      [],
      prompt.trim()
    )

    if (!result.success) {
      throw createError({
        statusCode: 500,
        message: result.error || '优化失败',
      })
    }

    return {
      success: true,
      optimizedPrompt: result.content?.trim() || '',
    }
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      message: error.message || '优化提示词失败',
    })
  }
})
