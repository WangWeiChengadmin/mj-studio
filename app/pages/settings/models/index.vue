<script setup lang="ts">
import type { Aimodel } from '../../../composables/useUpstreams'

const { upstreams, isLoading, loadUpstreams, updateUpstream, queryBalance } = useUpstreams()
const toast = useToast()
const router = useRouter()

// 余额查询中的配置 ID
const queryingBalanceIds = ref<Set<number>>(new Set())

onMounted(() => {
  loadUpstreams()
})

async function handleSetDefault(id: number) {
  try {
    await updateUpstream(id, { isDefault: true })
    toast.add({ title: '已设为默认', color: 'success' })
  } catch (error: any) {
    toast.add({
      title: '操作失败',
      description: error.data?.message || error.message,
      color: 'error',
    })
  }
}

// 统计绘图/对话模型数量
function getModelCounts(aimodels: Aimodel[]) {
  if (!aimodels) return { image: 0, chat: 0 }
  const image = aimodels.filter(m => !m.category || m.category === 'image').length
  const chat = aimodels.filter(m => m.category === 'chat').length
  return { image, chat }
}

// 查询余额
async function handleQueryBalance(id: number) {
  queryingBalanceIds.value.add(id)
  try {
    const result = await queryBalance(id)
    if (result.success) {
      toast.add({ title: '余额查询成功', color: 'success' })
    } else {
      toast.add({ title: '查询失败', description: result.error, color: 'error' })
    }
  } catch (error: any) {
    toast.add({
      title: '查询失败',
      description: error.data?.message || error.message,
      color: 'error',
    })
  } finally {
    queryingBalanceIds.value.delete(id)
  }
}

// 格式化配额
function formatQuota(quota?: number): string {
  if (quota === undefined || quota === null) return '未查询'
  if (quota >= 1000000) {
    return `${(quota / 1000000).toFixed(1)}M`
  }
  if (quota >= 1000) {
    return `${(quota / 1000).toFixed(1)}K`
  }
  return quota.toString()
}

// 平台类型标签
const platformLabels: Record<string, string> = {
  oneapi: 'OneAPI',
  n1n: 'n1n',
  yunwu: '云雾',
}
</script>

<template>
  <SettingsLayout>
    <!-- 操作栏 -->
    <div class="mb-4 flex items-center justify-between">
      <h2 class="text-lg font-medium text-(--ui-text)">上游配置</h2>
      <UButton size="sm" @click="router.push('/settings/models/new')">
        <UIcon name="i-heroicons-plus" class="w-4 h-4 mr-1" />
        添加
      </UButton>
    </div>

    <!-- 加载状态 -->
    <div v-if="isLoading" class="text-center py-12">
      <UIcon name="i-heroicons-arrow-path" class="w-8 h-8 text-(--ui-text-dimmed) animate-spin" />
    </div>

    <!-- 空状态 -->
    <div v-else-if="upstreams.length === 0" class="text-center py-12">
      <UIcon name="i-heroicons-cpu-chip" class="w-16 h-16 text-(--ui-text-dimmed)/50 mx-auto mb-4" />
      <p class="text-(--ui-text-muted) mb-4">还没有上游配置</p>
      <UButton @click="router.push('/settings/models/new')">添加第一个配置</UButton>
    </div>

    <!-- 配置列表 -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      <div
        v-for="upstream in upstreams"
        :key="upstream.id"
        class="bg-(--ui-bg-elevated) rounded-xl p-6 border border-(--ui-border) hover:border-(--ui-border-accented) transition-colors cursor-pointer flex flex-col"
        @click="router.push(`/settings/models/${upstream.id}`)"
      >
        <!-- 标题行 -->
        <div class="flex items-center justify-between mb-2">
          <div class="flex items-center gap-2 min-w-0">
            <h3 class="text-(--ui-text) font-medium truncate">{{ upstream.name }}</h3>
            <span
              v-if="upstream.isDefault"
              class="px-2 py-0.5 rounded-full text-xs font-medium bg-(--ui-success)/20 text-(--ui-success) shrink-0"
            >
              默认
            </span>
          </div>
          <div class="flex gap-1 shrink-0" @click.stop>
            <UButton
              v-if="!upstream.isDefault"
              size="xs"
              variant="ghost"
              color="neutral"
              title="设为默认"
              @click="handleSetDefault(upstream.id)"
            >
              <UIcon name="i-heroicons-star" class="w-4 h-4" />
            </UButton>
            <UButton size="xs" variant="ghost" color="neutral" @click="router.push(`/settings/models/${upstream.id}`)">
              <UIcon name="i-heroicons-pencil" class="w-4 h-4" />
            </UButton>
          </div>
        </div>

        <!-- API 信息 -->
        <p class="text-(--ui-text-dimmed) text-sm truncate">{{ upstream.baseUrl }}</p>

        <!-- 模型数量统计 -->
        <div class="mt-3 flex flex-wrap gap-2">
          <span v-if="getModelCounts(upstream.aimodels).image > 0" class="text-xs px-2 py-1 rounded bg-(--ui-bg-muted) text-(--ui-text-muted)">
            🎨 {{ getModelCounts(upstream.aimodels).image }}
          </span>
          <span v-if="getModelCounts(upstream.aimodels).chat > 0" class="text-xs px-2 py-1 rounded bg-blue-500/10 text-blue-600 dark:text-blue-400">
            💬 {{ getModelCounts(upstream.aimodels).chat }}
          </span>
        </div>

        <!-- 平台和余额信息（单行） -->
        <div class="mt-3 pt-3 border-t border-(--ui-border) flex items-center justify-between" @click.stop>
          <div class="flex items-center gap-2 text-sm">
            <template v-if="upstream.upstreamPlatform">
              <span class="text-(--ui-text-muted)">{{ platformLabels[upstream.upstreamPlatform] || upstream.upstreamPlatform }}</span>
              <span class="text-(--ui-text-dimmed)">·</span>
              <span class="text-(--ui-text)">{{ formatQuota(upstream.upstreamInfo?.quota) }}</span>
            </template>
            <span v-else class="text-(--ui-text-dimmed)">未配置平台</span>
          </div>
          <UButton
            v-if="upstream.upstreamPlatform"
            size="xs"
            variant="ghost"
            color="neutral"
            :loading="queryingBalanceIds.has(upstream.id)"
            @click="handleQueryBalance(upstream.id)"
          >
            <UIcon name="i-heroicons-arrow-path" class="w-3.5 h-3.5" />
          </UButton>
        </div>
      </div>
    </div>
  </SettingsLayout>
</template>
