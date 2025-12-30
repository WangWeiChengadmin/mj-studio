<script setup lang="ts">
import type { WorkflowRun } from '~/server/database/schema'

interface Props {
  workflowName: string
  runs?: WorkflowRun[]
  currentRunId?: number | null
  hasChanges?: boolean
  isSaving?: boolean
  isCollapsed?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  runs: () => [],
  currentRunId: null,
  hasChanges: false,
  isSaving: false,
  isCollapsed: false,
})

const emit = defineEmits<{
  run: []
  save: []
  'select-run': [runId: number]
  'toggle-collapse': []
}>()

// 运行状态图标和颜色
function getRunStatusIcon(status: string): string {
  switch (status) {
    case 'running':
      return 'i-heroicons-arrow-path'
    case 'paused':
      return 'i-heroicons-pause-circle'
    case 'completed':
      return 'i-heroicons-check-circle'
    case 'failed':
      return 'i-heroicons-x-circle'
    case 'cancelled':
      return 'i-heroicons-stop-circle'
    default:
      return 'i-heroicons-clock'
  }
}

function getRunStatusColor(status: string): string {
  switch (status) {
    case 'running':
      return 'text-blue-500'
    case 'paused':
      return 'text-yellow-500'
    case 'completed':
      return 'text-green-500'
    case 'failed':
      return 'text-red-500'
    case 'cancelled':
      return 'text-gray-500'
    default:
      return 'text-(--ui-text-muted)'
  }
}

// 格式化时间
const { formatTimeAgo } = useTimeFormat()
</script>

<template>
  <div
    class="workflow-sidebar h-full flex flex-col border-r border-(--ui-border) bg-(--ui-bg-elevated) transition-all duration-200"
    :class="isCollapsed ? 'w-12' : 'w-[280px]'"
  >
    <!-- 收缩状态 -->
    <template v-if="isCollapsed">
      <!-- 展开按钮 -->
      <div class="p-2">
        <UButton
          variant="ghost"
          size="sm"
          class="w-full"
          @click="emit('toggle-collapse')"
        >
          <UIcon name="i-heroicons-bars-3" class="w-5 h-5" />
        </UButton>
      </div>

      <!-- 标题（纵向） -->
      <div class="flex-1 flex items-center justify-center">
        <span
          class="text-xs font-medium text-(--ui-text-muted) writing-vertical-lr transform rotate-180 truncate max-h-32"
          :title="workflowName"
        >
          {{ workflowName }}
        </span>
      </div>

      <!-- 操作按钮 -->
      <div class="p-2 space-y-2">
        <UButton
          color="primary"
          size="sm"
          class="w-full"
          @click="emit('run')"
        >
          <UIcon name="i-heroicons-play" class="w-4 h-4" />
        </UButton>
        <UButton
          variant="outline"
          size="sm"
          class="w-full"
          :loading="isSaving"
          :disabled="!hasChanges"
          @click="emit('save')"
        >
          <UIcon name="i-heroicons-cloud-arrow-up" class="w-4 h-4" />
        </UButton>
      </div>
    </template>

    <!-- 展开状态 -->
    <template v-else>
      <!-- 标题栏 -->
      <div class="p-3 border-b border-(--ui-border) flex items-center gap-2">
        <h2 class="flex-1 font-medium text-sm truncate" :title="workflowName">
          {{ workflowName }}
        </h2>
        <span v-if="hasChanges" class="text-yellow-500 text-sm">*</span>
        <UButton
          variant="ghost"
          size="xs"
          @click="emit('toggle-collapse')"
        >
          <UIcon name="i-heroicons-chevron-left" class="w-4 h-4" />
        </UButton>
      </div>

      <!-- 操作按钮 -->
      <div class="p-3 border-b border-(--ui-border) flex gap-2">
        <UButton
          color="primary"
          size="sm"
          class="flex-1"
          @click="emit('run')"
        >
          <UIcon name="i-heroicons-play" class="w-4 h-4 mr-1" />
          运行
        </UButton>
        <UButton
          variant="outline"
          size="sm"
          :loading="isSaving"
          :disabled="!hasChanges"
          @click="emit('save')"
        >
          <UIcon name="i-heroicons-cloud-arrow-up" class="w-4 h-4 mr-1" />
          保存
        </UButton>
      </div>

      <!-- 运行历史 -->
      <div class="flex-1 overflow-hidden flex flex-col">
        <div class="px-3 py-2 text-xs font-medium text-(--ui-text-muted)">
          运行历史
        </div>
        <div class="flex-1 overflow-y-auto">
          <div v-if="runs.length === 0" class="px-3 py-4 text-center text-sm text-(--ui-text-dimmed)">
            暂无运行记录
          </div>
          <div
            v-for="run in runs"
            :key="run.id"
            class="px-3 py-2 cursor-pointer hover:bg-(--ui-bg-accented) transition-colors flex items-center gap-2"
            :class="{ 'bg-(--ui-bg-accented)': run.id === currentRunId }"
            @click="emit('select-run', run.id)"
          >
            <UIcon
              :name="getRunStatusIcon(run.status)"
              class="w-4 h-4 flex-shrink-0"
              :class="[getRunStatusColor(run.status), run.status === 'running' && 'animate-spin']"
            />
            <span class="flex-1 text-sm truncate">
              #{{ run.id }}
            </span>
            <span class="text-xs text-(--ui-text-dimmed)">
              {{ formatTimeAgo(run.createdAt) }}
            </span>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped>
.writing-vertical-lr {
  writing-mode: vertical-lr;
}
</style>
