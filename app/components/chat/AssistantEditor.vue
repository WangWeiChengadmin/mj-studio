<script setup lang="ts">
import type { Assistant } from '~/composables/useAssistants'
import type { ModelConfig } from '~/composables/useTasks'

const props = defineProps<{
  assistant: Assistant | null
  modelConfigs: ModelConfig[]
  open: boolean
}>()

const emit = defineEmits<{
  'update:open': [value: boolean]
  save: [data: Partial<Assistant>]
}>()

// 表单数据
const formData = ref({
  name: '',
  description: '',
  avatar: '',
  systemPrompt: '',
  modelConfigId: null as number | null,
  modelName: null as string | null,
})

// 监听 assistant 变化，初始化表单
watch(() => props.assistant, (assistant) => {
  if (assistant) {
    formData.value = {
      name: assistant.name,
      description: assistant.description || '',
      avatar: assistant.avatar || '',
      systemPrompt: assistant.systemPrompt || '',
      modelConfigId: assistant.modelConfigId,
      modelName: assistant.modelName,
    }
  } else {
    formData.value = {
      name: '',
      description: '',
      avatar: '',
      systemPrompt: '',
      modelConfigId: null,
      modelName: null,
    }
  }
}, { immediate: true })

// 判断是否是绘图模型
function isImageModel(modelType: string): boolean {
  const imageModels = [
    'midjourney', 'gemini', 'flux', 'dalle', 'doubao',
    'gpt4o-image', 'grok-image', 'qwen-image'
  ]
  return imageModels.includes(modelType)
}

// 获取所有对话模型（扁平化：上游 + 模型）
const allChatModels = computed(() => {
  const result: Array<{
    configId: number
    configName: string
    modelName: string
  }> = []

  for (const config of props.modelConfigs) {
    for (const model of config.modelTypeConfigs || []) {
      const isChat = model.category === 'chat' ||
        (!model.category && model.apiFormat === 'openai-chat' && !isImageModel(model.modelType))

      if (isChat) {
        result.push({
          configId: config.id,
          configName: config.name,
          modelName: model.modelName
        })
      }
    }
  }

  return result
})

// 当前选中的显示文本
const currentDisplayText = computed(() => {
  if (!formData.value.modelConfigId || !formData.value.modelName) {
    return '选择模型'
  }
  const config = props.modelConfigs.find(c => c.id === formData.value.modelConfigId)
  if (!config) return '选择模型'
  return `${config.name} / ${formData.value.modelName}`
})

// 下拉菜单项（按上游分组）
const modelDropdownItems = computed(() => {
  const groups: any[][] = []

  // 按上游分组
  const configMap = new Map<number, { name: string, models: string[] }>()
  for (const item of allChatModels.value) {
    if (!configMap.has(item.configId)) {
      configMap.set(item.configId, { name: item.configName, models: [] })
    }
    configMap.get(item.configId)!.models.push(item.modelName)
  }

  // 构建分组菜单
  for (const [configId, { name, models }] of configMap) {
    const group: any[] = [
      { label: name, type: 'label' }
    ]
    for (const modelName of models) {
      group.push({
        label: modelName,
        onSelect: () => handleSelectModel(configId, modelName)
      })
    }
    groups.push(group)
  }

  return groups
})

// 选择模型
function handleSelectModel(configId: number, modelName: string) {
  formData.value.modelConfigId = configId
  formData.value.modelName = modelName
}

// 处理头像上传
async function handleAvatarUpload(e: Event) {
  const target = e.target as HTMLInputElement
  const file = target.files?.[0]
  if (!file) return

  // 限制大小 2MB
  if (file.size > 2 * 1024 * 1024) {
    alert('图片大小不能超过 2MB')
    return
  }

  // 转换为 base64
  const reader = new FileReader()
  reader.onload = () => {
    formData.value.avatar = reader.result as string
  }
  reader.readAsDataURL(file)
}

// 保存
function handleSave() {
  if (!formData.value.name.trim()) {
    alert('请输入助手名称')
    return
  }

  emit('save', {
    name: formData.value.name.trim(),
    description: formData.value.description.trim() || null,
    avatar: formData.value.avatar || null,
    systemPrompt: formData.value.systemPrompt.trim() || null,
    modelConfigId: formData.value.modelConfigId,
    modelName: formData.value.modelName,
  })
}

// 关闭弹窗
function handleClose() {
  emit('update:open', false)
}
</script>

<template>
  <UModal
    :open="open"
    :title="assistant ? '编辑助手' : '新建助手'"
    :ui="{ content: 'sm:max-w-4xl' }"
    @update:open="emit('update:open', $event)"
  >
    <template #body>
      <div class="space-y-5">
        <!-- 头像 + 名称 + 简介 同一行 -->
        <div class="flex gap-4">
          <!-- 头像（参考图样式） -->
          <div class="relative w-20 h-20 shrink-0 rounded-lg overflow-hidden group">
            <img
              v-if="formData.avatar"
              :src="formData.avatar"
              class="w-full h-full object-cover"
            />
            <label
              v-else
              class="w-full h-full border-2 border-dashed border-(--ui-border-accented) hover:border-(--ui-primary) transition-colors flex flex-col items-center justify-center cursor-pointer rounded-lg"
            >
              <UIcon name="i-heroicons-cloud-arrow-up" class="w-6 h-6 text-(--ui-text-dimmed) mb-1" />
              <span class="text-(--ui-text-dimmed) text-xs">上传</span>
              <input
                type="file"
                accept="image/*"
                class="hidden"
                @change="handleAvatarUpload"
              />
            </label>
            <!-- 已有头像时的删除遮罩 -->
            <button
              v-if="formData.avatar"
              class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
              @click="formData.avatar = ''"
            >
              <UIcon name="i-heroicons-x-mark" class="w-6 h-6 text-white" />
            </button>
          </div>

          <!-- 名称 + 简介 -->
          <div class="flex-1 space-y-3">
            <div>
              <label class="block text-(--ui-text-muted) text-xs mb-1">助手名称 *</label>
              <UInput
                v-model="formData.name"
                placeholder="如：代码助手"
                class="w-full"
              />
            </div>
            <div>
              <label class="block text-(--ui-text-muted) text-xs mb-1">助手简介</label>
              <UInput
                v-model="formData.description"
                placeholder="简短描述助手的功能"
                class="w-full"
              />
            </div>
          </div>
        </div>

        <!-- 系统提示词 -->
        <div>
          <label class="block text-(--ui-text-muted) text-sm mb-2">系统提示词</label>
          <UTextarea
            v-model="formData.systemPrompt"
            :rows="8"
            placeholder="设置助手的行为和角色，如：你是一个专业的编程助手..."
            class="w-full"
          />
        </div>

        <!-- 模型选择（下拉菜单样式） -->
        <div>
          <label class="block text-(--ui-text-muted) text-sm mb-2">模型配置</label>
          <UDropdownMenu :items="modelDropdownItems">
            <UButton
              variant="outline"
              class="w-full justify-between"
              :disabled="allChatModels.length === 0"
            >
              <span class="flex items-center gap-2">
                <UIcon name="i-heroicons-cpu-chip" class="w-4 h-4" />
                {{ currentDisplayText }}
              </span>
              <UIcon name="i-heroicons-chevron-down" class="w-4 h-4" />
            </UButton>
          </UDropdownMenu>
          <p v-if="allChatModels.length === 0" class="text-xs text-(--ui-text-muted) mt-1">
            请先在设置中添加对话模型
          </p>
        </div>
      </div>
    </template>

    <template #footer>
      <div class="flex justify-end gap-2">
        <UButton variant="ghost" @click="handleClose">
          取消
        </UButton>
        <UButton color="primary" @click="handleSave">
          保存
        </UButton>
      </div>
    </template>
  </UModal>
</template>
