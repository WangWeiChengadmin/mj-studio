<script setup lang="ts">
import type { FormSubmitEvent, FormError } from '@nuxt/ui'

definePageMeta({
  middleware: 'auth',
})

const toast = useToast()

// 用户数据
const isLoading = ref(true)
const isSaving = ref(false)

const formData = reactive({
  name: '',
  avatar: '',
})

// 加载用户信息
async function loadUser() {
  isLoading.value = true
  try {
    const user = await $fetch('/api/user')
    formData.name = user.name || ''
    formData.avatar = user.avatar || ''
  } catch (error: any) {
    toast.add({
      title: '加载失败',
      description: error.data?.message || error.message,
      color: 'error',
    })
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  loadUser()
})

// 表单验证
function validate(state: typeof formData): FormError[] {
  return []
}

// 处理头像上传
async function handleAvatarUpload(e: Event) {
  const target = e.target as HTMLInputElement
  const file = target.files?.[0]
  if (!file) return

  // 限制大小 2MB
  if (file.size > 2 * 1024 * 1024) {
    toast.add({ title: '图片大小不能超过 2MB', color: 'error' })
    return
  }

  // 转换为 base64
  const reader = new FileReader()
  reader.onload = () => {
    formData.avatar = reader.result as string
  }
  reader.readAsDataURL(file)
}

// 清除头像
function clearAvatar() {
  formData.avatar = ''
}

// 保存设置
async function onSubmit(event: FormSubmitEvent<typeof formData>) {
  isSaving.value = true
  try {
    await $fetch('/api/user', {
      method: 'PUT',
      body: {
        name: event.data.name?.trim() || null,
        avatar: event.data.avatar || null,
      },
    })
    toast.add({ title: '设置已保存', color: 'success' })
  } catch (error: any) {
    toast.add({
      title: '保存失败',
      description: error.data?.message || error.message,
      color: 'error',
    })
  } finally {
    isSaving.value = false
  }
}
</script>

<template>
  <div class="p-6">
    <div class="max-w-2xl mx-auto">
      <!-- 页面标题 -->
      <div class="mb-6">
        <h1 class="text-2xl font-bold text-(--ui-text)">用户设置</h1>
        <p class="text-(--ui-text-muted) text-sm mt-1">管理你的个人信息和偏好设置</p>
      </div>

      <!-- 加载状态 -->
      <div v-if="isLoading" class="text-center py-12">
        <UIcon name="i-heroicons-arrow-path" class="w-8 h-8 text-(--ui-text-dimmed) animate-spin" />
      </div>

      <!-- 设置表单 -->
      <UForm v-else :state="formData" :validate="validate" class="space-y-6" @submit="onSubmit">
        <!-- 个人信息卡片 -->
        <div class="bg-(--ui-bg-elevated) rounded-xl p-6 border border-(--ui-border) space-y-5">
          <h2 class="text-lg font-medium text-(--ui-text)">个人信息</h2>

          <!-- 头像 -->
          <UFormField label="头像" name="avatar">
            <div class="flex items-center gap-4">
              <div class="relative w-20 h-20 rounded-full overflow-hidden group">
                <img
                  v-if="formData.avatar"
                  :src="formData.avatar"
                  class="w-full h-full object-cover"
                />
                <label
                  v-else
                  class="w-full h-full border-2 border-dashed border-(--ui-border-accented) hover:border-(--ui-primary) transition-colors flex flex-col items-center justify-center cursor-pointer rounded-full bg-(--ui-bg-muted)"
                >
                  <UIcon name="i-heroicons-user" class="w-8 h-8 text-(--ui-text-dimmed)" />
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
                  type="button"
                  class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-full"
                  @click="clearAvatar"
                >
                  <UIcon name="i-heroicons-x-mark" class="w-6 h-6 text-white" />
                </button>
              </div>
              <div class="text-sm text-(--ui-text-muted)">
                <p>点击上传头像</p>
                <p class="text-xs">支持 JPG、PNG，最大 2MB</p>
              </div>
            </div>
          </UFormField>

          <!-- 昵称 -->
          <UFormField label="昵称" name="name">
            <UInput
              v-model="formData.name"
              placeholder="输入你的昵称"
              class="w-full max-w-xs"
            />
          </UFormField>
        </div>

        <!-- 保存按钮 -->
        <div class="flex justify-end">
          <UButton type="submit" :loading="isSaving" size="lg">
            保存设置
          </UButton>
        </div>
      </UForm>
    </div>
  </div>
</template>
