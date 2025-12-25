// POST /api/illustrations/regenerate - 重新生成插图（删除旧任务，创建新任务）
import { useTaskService } from '../../services/task'
import { useModelConfigService } from '../../services/modelConfig'
import { useUserSettingsService } from '../../services/userSettings'
import { USER_SETTING_KEYS } from '~~/app/shared/constants'

export default defineEventHandler(async (event) => {
  const { user } = await requireAuth(event)

  const body = await readBody(event)
  const { uniqueId, prompt, model, negative } = body

  // 验证必填参数
  if (!uniqueId?.trim()) {
    throw createError({
      statusCode: 400,
      message: 'uniqueId 是必填参数',
    })
  }

  if (!prompt?.trim()) {
    throw createError({
      statusCode: 400,
      message: 'prompt 是必填参数',
    })
  }

  const taskService = useTaskService()

  // 1. 查找并删除旧任务
  const existingTask = await taskService.findByUniqueId(uniqueId.trim(), user.id)
  if (existingTask) {
    await taskService.deleteTask(existingTask.id, user.id)
  }

  // 2. 获取模型配置
  const modelConfigService = useModelConfigService()
  const userSettingsService = useUserSettingsService()

  let config: any
  let modelTypeConfig: any

  // 优先使用用户设置的默认嵌入式绘画配置
  const defaultConfigId = await userSettingsService.get<number>(
    user.id,
    USER_SETTING_KEYS.DRAWING_EMBEDDED_CONFIG_ID
  )
  const defaultModelType = await userSettingsService.get<string>(
    user.id,
    USER_SETTING_KEYS.DRAWING_EMBEDDED_MODEL_TYPE
  )

  if (defaultConfigId && defaultModelType) {
    const defaultConfig = await modelConfigService.getById(defaultConfigId)
    if (defaultConfig) {
      const mtc = defaultConfig.modelTypeConfigs?.find(
        (m: any) => m.modelType === defaultModelType
      )
      if (mtc) {
        config = defaultConfig
        modelTypeConfig = mtc
      }
    }
  }

  // 如果没有默认配置，则根据 model 参数匹配
  if (!config || !modelTypeConfig) {
    const matchResult = await modelConfigService.findByModelName(user.id, model, 'image')
    if (!matchResult) {
      throw createError({
        statusCode: 400,
        message: model
          ? `未找到匹配的绘图模型配置: ${model}`
          : '未找到可用的绘图模型配置，请先在设置中添加',
      })
    }
    config = matchResult.config
    modelTypeConfig = matchResult.modelTypeConfig
  }

  // 获取用户的 blurByDefault 设置
  const blurByDefault = await userSettingsService.get<boolean>(
    user.id,
    USER_SETTING_KEYS.GENERAL_BLUR_BY_DEFAULT
  )

  // 3. 创建新任务
  const task = await taskService.createTask({
    userId: user.id,
    modelConfigId: config.id,
    modelType: modelTypeConfig.modelType,
    apiFormat: modelTypeConfig.apiFormat,
    modelName: modelTypeConfig.modelName,
    prompt: prompt.trim(),
    negativePrompt: negative?.trim() || null,
    images: [],
    type: 'imagine',
    isBlurred: blurByDefault ?? true,
    uniqueId: uniqueId.trim(),
    sourceType: 'chat',
  })

  // 4. 提交任务
  taskService.submitTask(task.id).catch((err) => {
    console.error('[Illustration] 重新生成任务失败:', err)
  })

  return {
    taskId: task.id,
    status: task.status,
    progress: task.progress,
    imageUrl: task.imageUrl,
    error: task.error,
  }
})
