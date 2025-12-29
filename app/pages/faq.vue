<script setup lang="ts">
import { Marked } from 'marked'

// FAQ 页面无需登录
const marked = new Marked()

// 使用 useFetch 在服务端获取 markdown 并解析
const { data: htmlContent } = await useAsyncData('faq-content', async () => {
  // 服务端直接读取文件
  if (import.meta.server) {
    const fs = await import('fs/promises')
    const path = await import('path')
    const faqPath = path.resolve(process.cwd(), 'docs/faq.md')
    const content = await fs.readFile(faqPath, 'utf-8')
    return marked.parse(content) as string
  }
  return ''
})
</script>

<template>
  <div class="max-w-4xl mx-auto px-6 py-12">
    <!-- Markdown 内容 - 使用 ClientOnly 避免 hydration mismatch -->
    <ClientOnly>
      <div class="prose prose-sm dark:prose-invert max-w-none" v-html="htmlContent" />
      <template #fallback>
        <div class="prose prose-sm dark:prose-invert max-w-none" v-html="htmlContent" />
      </template>
    </ClientOnly>

    <!-- 返回按钮 -->
    <div class="mt-12 text-center">
      <NuxtLink to="/">
        <UButton variant="outline">
          <UIcon name="i-heroicons-arrow-left" class="w-4 h-4 mr-2" />
          返回首页
        </UButton>
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped>
.prose :deep(h1) {
  text-align: center;
  margin-bottom: 2rem;
}
.prose :deep(details) {
  margin: 1rem 0;
  border: 1px solid var(--ui-border);
  border-radius: 0.5rem;
  background-color: var(--ui-bg-elevated);
  overflow: hidden;
}
.prose :deep(summary) {
  padding: 1rem 1.5rem;
  cursor: pointer;
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.prose :deep(summary::-webkit-details-marker) {
  display: none;
}
.prose :deep(summary::after) {
  content: '▶';
  font-size: 0.75rem;
  color: var(--ui-text-muted);
  transition: transform 0.2s;
}
.prose :deep(details[open] > summary::after) {
  transform: rotate(90deg);
}
.prose :deep(summary:hover) {
  background-color: var(--ui-bg-accented);
}
.prose :deep(details > *:not(summary)) {
  padding: 0 1.5rem;
}
.prose :deep(details > *:last-child) {
  padding-bottom: 1rem;
}
.prose :deep(table) {
  width: 100%;
  border-collapse: collapse;
}
.prose :deep(th),
.prose :deep(td) {
  border: 1px solid var(--ui-border);
  padding: 0.5rem 0.75rem;
  text-align: left;
}
.prose :deep(th) {
  background-color: var(--ui-bg-accented);
  font-weight: 500;
}
.prose :deep(code) {
  background-color: var(--ui-bg-accented);
  padding: 0.125rem 0.375rem;
  border-radius: 0.25rem;
  font-size: 0.875rem;
}
.prose :deep(strong) {
  color: var(--ui-text);
  font-weight: 600;
}
</style>
