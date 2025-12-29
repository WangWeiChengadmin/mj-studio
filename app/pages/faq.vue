<script setup lang="ts">
import { Marked } from 'marked'
import { MODEL_TYPE_LABELS, IMAGE_MODEL_TYPES, VIDEO_MODEL_TYPES, MODEL_USAGE_HINTS } from '~/shared/constants'
import type { VideoModelType } from '~/shared/types'
import faqContent from '~/../../docs/faq.md?raw'

// FAQ 页面无需登录
const marked = new Marked()

// 视频模型提示信息
const VIDEO_MODEL_HINTS: Record<VideoModelType, { text: string }> = {
  'jimeng-video': { text: '字节即梦视频生成，支持文生视频和图生视频，支持宽高比、分辨率参数' },
  'veo': { text: 'Google Veo 视频生成，支持首帧/尾帧参考图，支持提示词增强和超分辨率参数' },
  'sora': { text: 'OpenAI Sora 视频生成，审查严格，不支持任何包含人像的内容，支持方向、分辨率、时长参数' },
  'grok-video': { text: 'xAI Grok 视频生成，响应快速，支持宽高比参数' },
}

// 解析 markdown 内容为 FAQ 列表
function parseFaqContent(content: string) {
  const sections: { id: string; question: string; answer: string }[] = []
  const lines = content.split('\n')

  let currentQuestion = ''
  let currentAnswer: string[] = []
  let inSection = false

  for (const line of lines) {
    // 跳过一级标题
    if (line.startsWith('# ')) continue

    // 二级标题是问题
    if (line.startsWith('## ')) {
      // 保存上一个问题
      if (currentQuestion && currentAnswer.length > 0) {
        sections.push({
          id: currentQuestion.replace(/[^a-zA-Z0-9\u4e00-\u9fa5]/g, '-').toLowerCase(),
          question: currentQuestion,
          answer: currentAnswer.join('\n').trim(),
        })
      }
      currentQuestion = line.slice(3).trim()
      currentAnswer = []
      inSection = true
    } else if (inSection) {
      currentAnswer.push(line)
    }
  }

  // 保存最后一个问题
  if (currentQuestion && currentAnswer.length > 0) {
    sections.push({
      id: currentQuestion.replace(/[^a-zA-Z0-9\u4e00-\u9fa5]/g, '-').toLowerCase(),
      question: currentQuestion,
      answer: currentAnswer.join('\n').trim(),
    })
  }

  return sections
}

const faqs = parseFaqContent(faqContent)

// 当前展开的 FAQ
const expandedIds = ref<string[]>([faqs[0]?.id].filter(Boolean))

function toggleFaq(id: string) {
  const index = expandedIds.value.indexOf(id)
  if (index === -1) {
    expandedIds.value.push(id)
  } else {
    expandedIds.value.splice(index, 1)
  }
}

function isExpanded(id: string) {
  return expandedIds.value.includes(id)
}
</script>

<template>
  <div class="max-w-4xl mx-auto px-6 py-12">
    <!-- 标题 -->
    <div class="text-center mb-12">
      <UIcon name="i-heroicons-question-mark-circle" class="w-12 h-12 text-(--ui-primary) mx-auto mb-4" />
      <h1 class="text-3xl font-bold text-(--ui-text) mb-2">帮助中心</h1>
      <p class="text-(--ui-text-muted)">常见问题解答</p>
    </div>

    <!-- FAQ 列表 -->
    <div class="space-y-4">
      <div
        v-for="faq in faqs"
        :key="faq.id"
        class="rounded-lg border border-(--ui-border) bg-(--ui-bg-elevated) overflow-hidden"
      >
        <!-- 问题标题 -->
        <button
          class="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-(--ui-bg-accented) transition-colors"
          @click="toggleFaq(faq.id)"
        >
          <span class="font-medium text-(--ui-text)">{{ faq.question }}</span>
          <UIcon
            :name="isExpanded(faq.id) ? 'i-heroicons-chevron-up' : 'i-heroicons-chevron-down'"
            class="w-5 h-5 text-(--ui-text-muted) flex-shrink-0"
          />
        </button>

        <!-- 答案内容 -->
        <div v-if="isExpanded(faq.id)" class="px-6 pb-6 border-t border-(--ui-border)">
          <div class="pt-4 prose prose-sm dark:prose-invert max-w-none text-(--ui-text-muted)">
            <div v-html="marked.parse(faq.answer)" />
          </div>
        </div>
      </div>
    </div>

    <!-- 模型提示一览 -->
    <div class="mt-12 space-y-8">
      <!-- 图片生成模型 -->
      <div>
        <h2 class="text-xl font-semibold text-(--ui-text) mb-4">图片生成模型</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            v-for="modelType in IMAGE_MODEL_TYPES"
            :key="modelType"
            class="p-4 rounded-lg border border-(--ui-border) bg-(--ui-bg-elevated)"
          >
            <div class="font-medium text-(--ui-text) mb-1">{{ MODEL_TYPE_LABELS[modelType] }}</div>
            <div class="text-sm text-(--ui-text-muted)">{{ MODEL_USAGE_HINTS[modelType]?.text }}</div>
          </div>
        </div>
      </div>

      <!-- 视频生成模型 -->
      <div>
        <h2 class="text-xl font-semibold text-(--ui-text) mb-4">视频生成模型</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            v-for="modelType in VIDEO_MODEL_TYPES"
            :key="modelType"
            class="p-4 rounded-lg border border-(--ui-border) bg-(--ui-bg-elevated)"
          >
            <div class="font-medium text-(--ui-text) mb-1">{{ MODEL_TYPE_LABELS[modelType] }}</div>
            <div class="text-sm text-(--ui-text-muted)">{{ VIDEO_MODEL_HINTS[modelType]?.text }}</div>
          </div>
        </div>
      </div>
    </div>

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
