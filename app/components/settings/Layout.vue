<script setup lang="ts">
defineProps<{
  title: string
  description?: string
}>()
</script>

<template>
  <div class="p-6">
    <!-- 页面标题 -->
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-(--ui-text)">设置</h1>
      <p class="text-(--ui-text-muted) text-sm mt-1">管理你的 AI 服务配置</p>
    </div>

    <!-- 布局：侧边栏 + 内容区 -->
    <div class="flex gap-6">
      <SettingsSidebar />
      <div class="flex-1 min-w-0">
        <slot />
      </div>
    </div>
  </div>
</template>
