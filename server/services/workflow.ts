// 工作流执行服务
import { readFile } from 'fs/promises'
import { join } from 'path'
import { eq, and, isNull } from 'drizzle-orm'
import { db } from '../database'
import { workflows, tasks } from '../database/schema'
import { useTaskService } from './task'
import { useAimodelService } from './aimodel'
import { useUpstreamService } from './upstream'
import { useUserSettingsService } from './userSettings'
import { USER_SETTING_KEYS } from '../../app/shared/constants'
import type { WorkflowData, WorkflowNode, WorkflowEdge } from '../../app/shared/workflow-types'

// 节点执行结果
export interface NodeExecutionResult {
  nodeId: string
  status: 'idle' | 'pending' | 'processing' | 'success' | 'failed'
  taskId?: number
  resultUrl?: string
  error?: string
}

// 执行上下文
interface ExecutionContext {
  userId: number
  workflowId: number
  nodes: WorkflowNode[]
  edges: WorkflowEdge[]
  // 节点执行结果缓存（用于获取上游结果）
  nodeResults: Map<string, NodeExecutionResult>
}

export function useWorkflowService() {
  const taskService = useTaskService()
  const aimodelService = useAimodelService()
  const upstreamService = useUpstreamService()
  const userSettingsService = useUserSettingsService()

  // 加载工作流数据
  async function loadWorkflowData(workflowId: number, userId: number): Promise<{
    workflow: typeof workflows.$inferSelect
    data: WorkflowData
  }> {
    const [workflow] = await db
      .select()
      .from(workflows)
      .where(and(
        eq(workflows.id, workflowId),
        eq(workflows.userId, userId),
        isNull(workflows.deletedAt),
      ))
      .limit(1)

    if (!workflow) {
      throw new Error('工作流不存在')
    }

    const filePath = join(process.cwd(), 'data/workflows', workflow.filename)
    const content = await readFile(filePath, 'utf-8')
    const data: WorkflowData = JSON.parse(content)

    return { workflow, data }
  }

  // 获取节点的上游输入
  function getNodeInputs(
    nodeId: string,
    ctx: ExecutionContext
  ): { images: string[]; texts: string[] } {
    const images: string[] = []
    const texts: string[] = []

    // 找到连接到此节点的边
    const incomingEdges = ctx.edges.filter(e => e.target === nodeId)

    for (const edge of incomingEdges) {
      const sourceNode = ctx.nodes.find(n => n.id === edge.source)
      if (!sourceNode) continue

      // 根据源节点类型获取数据
      if (sourceNode.type === 'input-image' && sourceNode.data.imageUrl) {
        images.push(sourceNode.data.imageUrl)
      } else if (sourceNode.type === 'text-node' && sourceNode.data.text) {
        texts.push(sourceNode.data.text)
      } else if (sourceNode.type === 'gen-image' || sourceNode.type === 'gen-video') {
        // 从上游生成节点获取结果
        const result = ctx.nodeResults.get(sourceNode.id)
        if (result?.resultUrl) {
          images.push(result.resultUrl)
        }
      }
    }

    return { images, texts }
  }

  // 执行单个生成节点
  async function executeGenNode(
    node: WorkflowNode,
    ctx: ExecutionContext,
    taskType: 'image' | 'video'
  ): Promise<NodeExecutionResult> {
    const { upstreamId, aimodelId, prompt } = node.data as {
      upstreamId?: number
      aimodelId?: number
      prompt?: string
    }

    if (!upstreamId || !aimodelId) {
      return {
        nodeId: node.id,
        status: 'failed',
        error: '请先选择模型',
      }
    }

    // 验证上游配置属于当前用户
    const upstream = await upstreamService.getByIdSimple(upstreamId)
    if (!upstream || upstream.userId !== ctx.userId) {
      return {
        nodeId: node.id,
        status: 'failed',
        error: '无效的上游配置',
      }
    }

    // 验证 AI 模型属于该上游配置
    const aimodel = await aimodelService.getById(aimodelId)
    if (!aimodel || aimodel.upstreamId !== upstreamId) {
      return {
        nodeId: node.id,
        status: 'failed',
        error: '无效的模型配置',
      }
    }

    // 获取上游输入
    const inputs = getNodeInputs(node.id, ctx)
    const finalPrompt = inputs.texts.length > 0
      ? inputs.texts.join('\n') + (prompt ? '\n' + prompt : '')
      : prompt

    if (!finalPrompt && inputs.images.length === 0) {
      return {
        nodeId: node.id,
        status: 'failed',
        error: '请输入提示词或连接输入节点',
      }
    }

    // 获取用户的 blurByDefault 设置
    const blurByDefault = taskType === 'image'
      ? await userSettingsService.get<boolean>(ctx.userId, USER_SETTING_KEYS.GENERAL_BLUR_BY_DEFAULT)
      : false

    try {
      // 创建任务
      const task = await taskService.createTask({
        userId: ctx.userId,
        upstreamId,
        aimodelId,
        taskType,
        modelType: aimodel.modelType,
        apiFormat: aimodel.apiFormat,
        modelName: aimodel.modelName,
        prompt: finalPrompt || '',
        images: inputs.images,
        type: 'imagine',
        isBlurred: blurByDefault ?? true,
        sourceType: 'workbench',
      })

      // 异步提交任务
      taskService.submitTask(task.id).catch((err) => {
        console.error('工作流节点任务提交失败:', err)
      })

      return {
        nodeId: node.id,
        status: 'processing',
        taskId: task.id,
      }
    } catch (error: any) {
      return {
        nodeId: node.id,
        status: 'failed',
        error: error.message || '创建任务失败',
      }
    }
  }

  // 执行单个节点
  async function runNode(
    workflowId: number,
    nodeId: string,
    userId: number
  ): Promise<NodeExecutionResult> {
    // 加载工作流
    const { data } = await loadWorkflowData(workflowId, userId)

    // 找到目标节点
    const node = data.nodes.find(n => n.id === nodeId)
    if (!node) {
      throw new Error('节点不存在')
    }

    // 创建执行上下文
    const ctx: ExecutionContext = {
      userId,
      workflowId,
      nodes: data.nodes,
      edges: data.edges,
      nodeResults: new Map(),
    }

    // 根据节点类型执行
    if (node.type === 'gen-image') {
      return executeGenNode(node, ctx, 'image')
    } else if (node.type === 'gen-video') {
      return executeGenNode(node, ctx, 'video')
    } else {
      throw new Error('该节点类型不支持执行')
    }
  }

  // 拓扑排序
  function topologicalSort(nodes: WorkflowNode[], edges: WorkflowEdge[]): WorkflowNode[] {
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
    const result: WorkflowNode[] = []

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

  // 执行整个工作流
  async function runWorkflow(
    workflowId: number,
    userId: number
  ): Promise<NodeExecutionResult[]> {
    // 加载工作流
    const { data } = await loadWorkflowData(workflowId, userId)

    // 创建执行上下文
    const ctx: ExecutionContext = {
      userId,
      workflowId,
      nodes: data.nodes,
      edges: data.edges,
      nodeResults: new Map(),
    }

    // 拓扑排序
    const sortedNodes = topologicalSort(data.nodes, data.edges)

    const results: NodeExecutionResult[] = []

    // 依次执行需要执行的节点
    for (const node of sortedNodes) {
      let result: NodeExecutionResult | null = null

      if (node.type === 'gen-image') {
        result = await executeGenNode(node, ctx, 'image')
      } else if (node.type === 'gen-video') {
        result = await executeGenNode(node, ctx, 'video')
      }

      if (result) {
        results.push(result)
        ctx.nodeResults.set(node.id, result)
      }
    }

    return results
  }

  // 获取节点关联的任务状态
  async function getNodeTaskStatus(taskId: number): Promise<{
    status: 'pending' | 'submitting' | 'processing' | 'success' | 'failed' | 'cancelled'
    progress?: string
    resourceUrl?: string
    error?: string
  } | null> {
    const task = await db.query.tasks.findFirst({
      where: eq(tasks.id, taskId),
    })

    if (!task) return null

    return {
      status: task.status,
      progress: task.progress || undefined,
      resourceUrl: task.resourceUrl || undefined,
      error: task.error || undefined,
    }
  }

  return {
    loadWorkflowData,
    runNode,
    runWorkflow,
    getNodeTaskStatus,
    getNodeInputs,
    topologicalSort,
  }
}
