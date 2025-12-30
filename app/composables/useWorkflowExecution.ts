// 工作流节点执行管理（前端状态 + 后端执行）
import type { Task } from './useTasks'

// 节点执行状态
export type NodeExecutionStatus = 'idle' | 'pending' | 'processing' | 'success' | 'failed'

// 节点执行结果
export interface NodeExecutionResult {
  nodeId: string
  status: NodeExecutionStatus
  progress?: number
  resultUrl?: string
  error?: string
  taskId?: number
}

// 后端返回的执行结果
interface BackendExecutionResult {
  nodeId: string
  status: 'idle' | 'pending' | 'processing' | 'success' | 'failed'
  taskId?: number
  resultUrl?: string
  error?: string
}

export function useWorkflowExecution() {
  // 节点执行状态映射
  const nodeStates = ref<Map<string, NodeExecutionResult>>(new Map())

  // 正在轮询的任务
  const pollingTasks = ref<Map<number, ReturnType<typeof setTimeout>>>(new Map())

  // 是否正在执行
  const isExecuting = ref(false)

  // 获取节点状态
  function getNodeState(nodeId: string): NodeExecutionResult | undefined {
    return nodeStates.value.get(nodeId)
  }

  // 更新节点状态
  function updateNodeState(nodeId: string, state: Partial<NodeExecutionResult>) {
    const current = nodeStates.value.get(nodeId) || { nodeId, status: 'idle' as NodeExecutionStatus }
    nodeStates.value.set(nodeId, { ...current, ...state })
  }

  // 重置所有节点状态
  function resetAllStates() {
    nodeStates.value.clear()
    // 停止所有轮询
    pollingTasks.value.forEach((timeout) => clearTimeout(timeout))
    pollingTasks.value.clear()
    isExecuting.value = false
  }

  // 轮询任务状态
  async function pollTaskStatus(nodeId: string, taskId: number): Promise<void> {
    return new Promise((resolve) => {
      const poll = async () => {
        try {
          const task = await $fetch<Task>(`/api/tasks/${taskId}`)

          if (task.status === 'success') {
            updateNodeState(nodeId, {
              status: 'success',
              progress: 100,
              resultUrl: task.resourceUrl || undefined,
            })
            pollingTasks.value.delete(taskId)
            resolve()
            return
          }

          if (task.status === 'failed' || task.status === 'cancelled') {
            updateNodeState(nodeId, {
              status: 'failed',
              error: task.error || '任务失败',
            })
            pollingTasks.value.delete(taskId)
            resolve()
            return
          }

          // 更新进度
          if (task.progress) {
            const progress = parseInt(task.progress.replace('%', ''), 10) || 0
            updateNodeState(nodeId, { progress })
          }

          // 继续轮询
          const timeout = setTimeout(poll, 3000)
          pollingTasks.value.set(taskId, timeout)
        } catch (error) {
          console.error('轮询任务失败:', error)
          // 继续轮询
          const timeout = setTimeout(poll, 5000)
          pollingTasks.value.set(taskId, timeout)
        }
      }

      poll()
    })
  }

  // 执行单个节点（调用后端 API）
  async function executeSingleNode(workflowId: number, nodeId: string): Promise<void> {
    updateNodeState(nodeId, { status: 'pending' })

    try {
      const result = await $fetch<{
        success: boolean
        data: BackendExecutionResult
      }>(`/api/workflows/${workflowId}/run-node`, {
        method: 'POST',
        body: { nodeId },
      })

      if (!result.success) {
        updateNodeState(nodeId, {
          status: 'failed',
          error: '执行失败',
        })
        return
      }

      const { data } = result

      if (data.status === 'failed') {
        updateNodeState(nodeId, {
          status: 'failed',
          error: data.error || '执行失败',
        })
        return
      }

      if (data.taskId) {
        updateNodeState(nodeId, {
          status: 'processing',
          taskId: data.taskId,
        })
        // 开始轮询任务状态
        await pollTaskStatus(nodeId, data.taskId)
      }
    } catch (error: any) {
      updateNodeState(nodeId, {
        status: 'failed',
        error: error.data?.message || error.message || '执行失败',
      })
    }
  }

  // 执行整个工作流（调用后端 API）
  async function executeWorkflow(workflowId: number): Promise<void> {
    if (isExecuting.value) return

    isExecuting.value = true
    resetAllStates()

    try {
      const result = await $fetch<{
        success: boolean
        data: BackendExecutionResult[]
      }>(`/api/workflows/${workflowId}/run`, {
        method: 'POST',
      })

      if (!result.success) {
        throw new Error('工作流执行失败')
      }

      // 更新各节点状态并开始轮询
      const pollPromises: Promise<void>[] = []

      for (const nodeResult of result.data) {
        updateNodeState(nodeResult.nodeId, {
          status: nodeResult.status as NodeExecutionStatus,
          taskId: nodeResult.taskId,
          error: nodeResult.error,
        })

        // 如果有任务 ID，开始轮询
        if (nodeResult.taskId && nodeResult.status === 'processing') {
          pollPromises.push(pollTaskStatus(nodeResult.nodeId, nodeResult.taskId))
        }
      }

      // 等待所有任务完成
      await Promise.all(pollPromises)
    } catch (error: any) {
      console.error('工作流执行失败:', error)
    } finally {
      isExecuting.value = false
    }
  }

  // 清理
  function cleanup() {
    pollingTasks.value.forEach((timeout) => clearTimeout(timeout))
    pollingTasks.value.clear()
  }

  return {
    nodeStates,
    isExecuting,
    getNodeState,
    updateNodeState,
    resetAllStates,
    executeWorkflow,
    executeSingleNode,
    cleanup,
  }
}
