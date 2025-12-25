<script setup lang="ts">
import { USER_SETTING_KEYS } from '../../shared/constants'

const { settings, isLoading, isLoaded, loadSettings, updateSettings } = useUserSettings()
const { configs, loadConfigs } = useModelConfigs()
const toast = useToast()

// 表单状态
const form = reactive({
  blurByDefault: true,
  compressKeepCount: 4,
  titleMaxLength: 30,
  suggestionsCount: 5,
  // 绘图设置
  aiOptimizeConfigId: 0,
  aiOptimizeModelName: '',
  embeddedConfigId: 0,
  embeddedModelType: '',
})

// 保存状态
const isSaving = ref(false)

// 加载设置
onMounted(async () => {
  await Promise.all([
    !isLoaded.value ? loadSettings() : Promise.resolve(),
    loadConfigs(),
  ])
  syncFormFromSettings()
})

// 同步设置到表单
function syncFormFromSettings() {
  form.blurByDefault = settings.value[USER_SETTING_KEYS.GENERAL_BLUR_BY_DEFAULT] ?? true
  form.compressKeepCount = settings.value[USER_SETTING_KEYS.GENERAL_COMPRESS_KEEP_COUNT] ?? 4
  form.titleMaxLength = settings.value[USER_SETTING_KEYS.GENERAL_TITLE_MAX_LENGTH] ?? 30
  form.suggestionsCount = settings.value[USER_SETTING_KEYS.GENERAL_SUGGESTIONS_COUNT] ?? 5
  // 绘图设置
  form.aiOptimizeConfigId = settings.value[USER_SETTING_KEYS.DRAWING_AI_OPTIMIZE_CONFIG_ID] ?? 0
  form.aiOptimizeModelName = settings.value[USER_SETTING_KEYS.DRAWING_AI_OPTIMIZE_MODEL_NAME] ?? ''
  form.embeddedConfigId = settings.value[USER_SETTING_KEYS.DRAWING_EMBEDDED_CONFIG_ID] ?? 0
  form.embeddedModelType = settings.value[USER_SETTING_KEYS.DRAWING_EMBEDDED_MODEL_TYPE] ?? ''
}

// 保存设置
async function saveSettings() {
  isSaving.value = true
  try {
    await updateSettings({
      [USER_SETTING_KEYS.GENERAL_BLUR_BY_DEFAULT]: form.blurByDefault,
      [USER_SETTING_KEYS.GENERAL_COMPRESS_KEEP_COUNT]: form.compressKeepCount,
      [USER_SETTING_KEYS.GENERAL_TITLE_MAX_LENGTH]: form.titleMaxLength,
      [USER_SETTING_KEYS.GENERAL_SUGGESTIONS_COUNT]: form.suggestionsCount,
      // 绘图设置
      [USER_SETTING_KEYS.DRAWING_AI_OPTIMIZE_CONFIG_ID]: form.aiOptimizeConfigId,
      [USER_SETTING_KEYS.DRAWING_AI_OPTIMIZE_MODEL_NAME]: form.aiOptimizeModelName,
      [USER_SETTING_KEYS.DRAWING_EMBEDDED_CONFIG_ID]: form.embeddedConfigId,
      [USER_SETTING_KEYS.DRAWING_EMBEDDED_MODEL_TYPE]: form.embeddedModelType,
    })
    toast.add({ title: '设置已保存', color: 'success' })
  } catch (error: any) {
    toast.add({ title: '保存失败', description: error.message, color: 'error' })
  } finally {
    isSaving.value = false
  }
}

// ModelSelector 引用
const aiOptimizeSelectorRef = ref<{ selectedModelTypeConfig: any } | null>(null)
const embeddedSelectorRef = ref<{ selectedModelTypeConfig: any } | null>(null)

// AI 优化模型选择（对话模型）
const aiOptimizeConfigId = computed({
  get: () => form.aiOptimizeConfigId || null,
  set: (val: number | null) => { form.aiOptimizeConfigId = val || 0 },
})
const aiOptimizeModelName = computed({
  get: () => form.aiOptimizeModelName || null,
  set: (val: string | null) => { form.aiOptimizeModelName = val || '' },
})

// 嵌入式绘画模型选择（绘图模型）- 需要存储 modelType
const embeddedConfigId = computed({
  get: () => form.embeddedConfigId || null,
  set: (val: number | null) => { form.embeddedConfigId = val || 0 },
})
// 嵌入式绘画存储的是 modelType，但 ModelSelector 使用 modelName
// 需要根据 modelType 找到对应的 modelName
const embeddedModelName = computed({
  get: () => {
    if (!form.embeddedConfigId || !form.embeddedModelType) return null
    const config = configs.value.find(c => c.id === form.embeddedConfigId)
    const mtc = config?.modelTypeConfigs?.find((m: any) => m.modelType === form.embeddedModelType)
    return mtc?.modelName || null
  },
  set: (val: string | null) => {
    // 当选择模型时，从 ModelSelector 获取 modelType
    if (!val) {
      form.embeddedModelType = ''
    } else {
      const mtc = embeddedSelectorRef.value?.selectedModelTypeConfig
      form.embeddedModelType = mtc?.modelType || ''
    }
  },
})
</script>

<template>
  <SettingsLayout>
    <div class="mb-4 flex items-center justify-between">
      <h2 class="text-lg font-medium text-(--ui-text)">通用设置</h2>
      <UButton :loading="isSaving" @click="saveSettings">保存</UButton>
    </div>

    <div v-if="isLoading" class="text-center py-12">
      <UIcon name="i-heroicons-arrow-path" class="w-8 h-8 text-(--ui-text-dimmed) animate-spin" />
    </div>

    <div v-else class="space-y-4">
      <!-- 绘图设置 -->
      <div class="bg-(--ui-bg-elevated) rounded-xl p-4 border border-(--ui-border)">
        <h3 class="font-medium text-(--ui-text) mb-4">绘图</h3>
        <div class="space-y-4">
          <label class="flex items-center justify-between cursor-pointer">
            <div>
              <span class="text-(--ui-text)">生图默认模糊</span>
              <p class="text-xs text-(--ui-text-muted) mt-1">新生成的图片默认显示模糊效果</p>
            </div>
            <UCheckbox v-model="form.blurByDefault" />
          </label>

          <div class="flex items-center justify-between">
            <div>
              <span class="text-(--ui-text)">AI 优化提示词模型</span>
              <p class="text-xs text-(--ui-text-muted) mt-1">用于优化绘图提示词的对话模型</p>
            </div>
            <ModelSelector
              ref="aiOptimizeSelectorRef"
              :model-configs="configs"
              category="chat"
              list-layout
              no-auto-select
              align-right
              v-model:config-id="aiOptimizeConfigId"
              v-model:model-name="aiOptimizeModelName"
            />
          </div>

          <div class="flex items-center justify-between">
            <div>
              <span class="text-(--ui-text)">嵌入式绘画默认模型</span>
              <p class="text-xs text-(--ui-text-muted) mt-1">对话中嵌入式绘画的默认模型</p>
            </div>
            <ModelSelector
              ref="embeddedSelectorRef"
              :model-configs="configs"
              category="image"
              show-type-label
              no-auto-select
              align-right
              v-model:config-id="embeddedConfigId"
              v-model:model-name="embeddedModelName"
            />
          </div>
        </div>
      </div>

      <!-- 对话设置 -->
      <div class="bg-(--ui-bg-elevated) rounded-xl p-4 border border-(--ui-border)">
        <h3 class="font-medium text-(--ui-text) mb-4">对话</h3>
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <div>
              <span class="text-(--ui-text)">压缩保留消息数</span>
              <p class="text-xs text-(--ui-text-muted) mt-1">压缩时保留最近的消息条数</p>
            </div>
            <UInput v-model.number="form.compressKeepCount" type="number" min="2" max="10" class="w-20" />
          </div>

          <div class="flex items-center justify-between">
            <div>
              <span class="text-(--ui-text)">标题最大长度</span>
              <p class="text-xs text-(--ui-text-muted) mt-1">自动生成标题的最大字符数</p>
            </div>
            <UInput v-model.number="form.titleMaxLength" type="number" min="10" max="50" class="w-20" />
          </div>

          <div class="flex items-center justify-between">
            <div>
              <span class="text-(--ui-text)">开场白建议数量</span>
              <p class="text-xs text-(--ui-text-muted) mt-1">新对话时生成的建议条数</p>
            </div>
            <UInput v-model.number="form.suggestionsCount" type="number" min="3" max="10" class="w-20" />
          </div>
        </div>
      </div>
    </div>
  </SettingsLayout>
</template>
