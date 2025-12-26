// POST /api/tasks - 创建生图任务
import { useTaskService } from '../../services/task'
import { useUpstreamService } from '../../services/upstream'
import { useAimodelService } from '../../services/aimodel'
import { useUserSettingsService } from '../../services/userSettings'
import type { ModelType, ApiFormat } from '../../database/schema'
import { IMAGE_MODEL_TYPES, API_FORMATS, USER_SETTING_KEYS } from '../../../app/shared/constants'

export default defineEventHandler(async (event) => {
  // 需要登录
  const { user } = await requireAuth(event)

  const body = await readBody(event)
  const { prompt, negativePrompt, images = [], type = 'imagine', upstreamId, aimodelId, modelType, apiFormat, modelName } = body

  // 验证上游配置
  if (!upstreamId) {
    throw createError({
      statusCode: 400,
      message: '请选择上游配置',
    })
  }

  // 验证 AI 模型
  if (!aimodelId) {
    throw createError({
      statusCode: 400,
      message: '请选择模型',
    })
  }

  // 验证模型类型（使用共享常量 IMAGE_MODEL_TYPES）
  if (!modelType || !IMAGE_MODEL_TYPES.includes(modelType)) {
    throw createError({
      statusCode: 400,
      message: '请选择模型类型',
    })
  }

  // 验证API格式（使用共享常量 API_FORMATS）
  if (!apiFormat || !API_FORMATS.includes(apiFormat)) {
    throw createError({
      statusCode: 400,
      message: '请选择API格式',
    })
  }

  // 验证上游配置属于当前用户
  const upstreamService = useUpstreamService()
  const upstream = await upstreamService.getByIdSimple(upstreamId)

  if (!upstream || upstream.userId !== user.id) {
    throw createError({
      statusCode: 400,
      message: '无效的上游配置',
    })
  }

  // 验证 AI 模型属于该上游配置
  const aimodelService = useAimodelService()
  const aimodel = await aimodelService.getById(aimodelId)

  if (!aimodel || aimodel.upstreamId !== upstreamId) {
    throw createError({
      statusCode: 400,
      message: '无效的模型配置',
    })
  }

  // 抠抠图必须有图片，不需要提示词
  if (apiFormat === 'koukoutu') {
    if (images.length === 0) {
      throw createError({
        statusCode: 400,
        message: '抠抠图需要上传图片',
      })
    }
  } else if (!prompt && type === 'imagine') {
    throw createError({
      statusCode: 400,
      message: '请输入提示词',
    })
  }

  // blend模式仅支持mj-proxy格式
  if (type === 'blend' && apiFormat !== 'mj-proxy') {
    throw createError({
      statusCode: 400,
      message: '混合模式仅支持MJ-Proxy格式',
    })
  }

  if (type === 'blend' && images.length < 2) {
    throw createError({
      statusCode: 400,
      message: '混合模式至少需要2张图片',
    })
  }

  const taskService = useTaskService()
  const userSettingsService = useUserSettingsService()

  // 获取用户的 blurByDefault 设置
  const blurByDefault = await userSettingsService.get<boolean>(user.id, USER_SETTING_KEYS.GENERAL_BLUR_BY_DEFAULT)

  // 1. 先保存到数据库
  const task = await taskService.createTask({
    userId: user.id,
    upstreamId,
    aimodelId,
    modelType,
    apiFormat,
    modelName: modelName || aimodel.modelName,
    prompt,
    negativePrompt,
    images: images,
    type,
    isBlurred: blurByDefault,
  })

  // 2. 异步提交到对应的生成服务（不阻塞响应）
  taskService.submitTask(task.id).catch((err) => {
    console.error('异步提交任务失败:', err)
  })

  // 3. 立即返回任务ID
  return {
    success: true,
    taskId: task.id,
    message: '任务已创建，正在提交到生成服务',
  }
})
