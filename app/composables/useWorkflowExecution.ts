// 工作流节点执行管理
import type { Node, Edge } from '@vue-flow/core'
import type { Task } from './useTasks'
import type { Upstream, Aimodel } from './useUpstreams'

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

// 节点数据中的执行配置
export interface NodeExecutionConfig {
  upstreamId?: number
  aimodelId?: number
  prompt?: string
  imageUrl?: string  // 输入图片
  text?: string      // 文本内容
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

  // 获取节点的输入数据（从上游节点）
  function getNodeInputs(nodeId: string, nodes: Node[], edges: Edge[]): {
    images: string[]
    texts: string[]
  } {
    const images: string[] = []
    const texts: string[] = []

    // 找到连接到此节点的边
    const incomingEdges = edges.filter(e => e.target === nodeId)

    for (const edge of incomingEdges) {
      const sourceNode = nodes.find(n => n.id === edge.source)
      if (!sourceNode) continue

      // 根据源节点类型获取数据
      if (sourceNode.type === 'input-image' && sourceNode.data.imageUrl) {
        images.push(sourceNode.data.imageUrl)
      } else if (sourceNode.type === 'text-node' && sourceNode.data.text) {
        texts.push(sourceNode.data.text)
      } else if ((sourceNode.type === 'gen-image' || sourceNode.type === 'gen-video')) {
        // 从上游生成节点获取结果
        const state = nodeStates.value.get(sourceNode.id)
        if (state?.resultUrl) {
          images.push(state.resultUrl)
        }
      }
    }

    return { images, texts }
  }

  // 执行单个生成节点
  async function executeGenNode(
    node: Node,
    nodes: Node[],
    edges: Edge[],
    taskType: 'image' | 'video'
  ): Promise<void> {
    const { upstreamId, aimodelId, prompt } = node.data as NodeExecutionConfig

    if (!upstreamId || !aimodelId) {
      updateNodeState(node.id, {
        status: 'failed',
        error: '请先选择模型',
      })
      return
    }

    // 获取输入
    const inputs = getNodeInputs(node.id, nodes, edges)
    const finalPrompt = inputs.texts.length > 0
      ? inputs.texts.join('\n') + (prompt ? '\n' + prompt : '')
      : prompt

    if (!finalPrompt && inputs.images.length === 0) {
      updateNodeState(node.id, {
        status: 'failed',
        error: '请输入提示词或连接输入节点',
      })
      return
    }

    updateNodeState(node.id, { status: 'pending' })

    try {
      // 创建任务
      const result = await $fetch<{ success: boolean; taskId: number }>('/api/tasks', {
        method: 'POST',
        body: {
          upstreamId,
          aimodelId,
          taskType,
          prompt: finalPrompt,
          images: inputs.images,
          type: 'imagine',
          sourceType: 'workbench',
        },
      })

      if (!result.success || !result.taskId) {
        updateNodeState(node.id, {
          status: 'failed',
          error: '创建任务失败',
        })
        return
      }

      updateNodeState(node.id, {
        status: 'processing',
        taskId: result.taskId,
      })

      // 开始轮询任务状态
      await pollTaskStatus(node.id, result.taskId)
    } catch (error: any) {
      updateNodeState(node.id, {
        status: 'failed',
        error: error.data?.message || error.message || '执行失败',
      })
    }
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

  // 更新预览节点（从上游获取结果）
  function updatePreviewNode(node: Node, nodes: Node[], edges: Edge[]): void {
    const inputs = getNodeInputs(node.id, nodes, edges)

    if (inputs.images.length > 0) {
      // 使用第一个图片作为预览
      node.data.previewUrl = inputs.images[0]
    }
  }

  // 执行整个工作流（拓扑排序后依次执行）
  async function executeWorkflow(nodes: Node[], edges: Edge[]): Promise<void> {
    if (isExecuting.value) return

    isExecuting.value = true
    resetAllStates()

    try {
      // 拓扑排序
      const sortedNodes = topologicalSort(nodes, edges)

      for (const node of sortedNodes) {
        if (node.type === 'gen-image') {
          await executeGenNode(node, nodes, edges, 'image')
        } else if (node.type === 'gen-video') {
          await executeGenNode(node, nodes, edges, 'video')
        } else if (node.type === 'preview') {
          updatePreviewNode(node, nodes, edges)
        }
        // input-image 和 text-node 不需要执行，数据已在节点中
      }
    } finally {
      isExecuting.value = false
    }
  }

  // 执行单个节点（不执行上下游）
  async function executeSingleNode(
    node: Node,
    nodes: Node[],
    edges: Edge[]
  ): Promise<void> {
    if (node.type === 'gen-image') {
      await executeGenNode(node, nodes, edges, 'image')
    } else if (node.type === 'gen-video') {
      await executeGenNode(node, nodes, edges, 'video')
    }
  }

  // 拓扑排序
  function topologicalSort(nodes: Node[], edges: Edge[]): Node[] {
    const inDegree = new Map<string, number>()
    const adjacency = new Map<string, string[]>()

    // 初始化
    for (const node of nodes) {
      inDegree.set(node.id, 0)
      adjacency.set(node.id, [])
    }

    // 构建图
    for (const edge of edges) {
      const targets = adjacency.get(edge.source) || []
      targets.push(edge.target)
      adjacency.set(edge.source, targets)

      inDegree.set(edge.target, (inDegree.get(edge.target) || 0) + 1)
    }

    // BFS
    const queue: string[] = []
    const result: Node[] = []

    for (const [nodeId, degree] of inDegree) {
      if (degree === 0) {
        queue.push(nodeId)
      }
    }

    while (queue.length > 0) {
      const nodeId = queue.shift()!
      const node = nodes.find(n => n.id === nodeId)
      if (node) {
        result.push(node)
      }

      for (const targetId of adjacency.get(nodeId) || []) {
        const newDegree = (inDegree.get(targetId) || 1) - 1
        inDegree.set(targetId, newDegree)
        if (newDegree === 0) {
          queue.push(targetId)
        }
      }
    }

    return result
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
    getNodeInputs,
    cleanup,
  }
}
