// 工作流运行服务
import { readFile, writeFile, copyFile } from 'fs/promises'
import { join } from 'path'
import { eq, and, isNull } from 'drizzle-orm'
import { db } from '../database'
import {
  workflows,
  workflowRuns,
  workflowRunNodes,
  tasks,
  type WorkflowRun,
  type WorkflowRunNode,
  type WorkflowRunMode,
  type WorkflowRunStatus,
  type WorkflowRunNodeStatus,
} from '../database/schema'
import { useTaskService } from './task'
import { useAimodelService } from './aimodel'
import { useUpstreamService } from './upstream'
import { useUserSettingsService } from './userSettings'
import { USER_SETTING_KEYS } from '../../app/shared/constants'
import type { WorkflowData, WorkflowNode, WorkflowEdge } from '../../app/shared/workflow-types'

import type { H3Event } from 'h3'

// SSE 事件类型
export interface SSEEvent {
  type: 'run_status' | 'run_mode_changed' | 'run_node_status' | 'run_node_progress'
  runId: number
  [key: string]: any
}

// SSE 订阅者
interface SSESubscriber {
  runId: number
  event: H3Event
  userId: number
}

// 订阅者列表：以 runId 为 key
const subscribers = new Map<number, Set<SSESubscriber>>()

// 发送 SSE 事件给所有订阅者
async function emitSSE(runId: number, sseEvent: SSEEvent) {
  const subs = subscribers.get(runId)
  if (!subs || subs.size === 0) return

  const message = `data: ${JSON.stringify(sseEvent)}\n\n`

  for (const sub of subs) {
    try {
      await sub.event.node.res.write(message)
    } catch {
      // 连接已断开，移除订阅者
      subs.delete(sub)
    }
  }
}

// 添加订阅者
export function addSSESubscriber(runId: number, event: H3Event, userId: number): void {
  if (!subscribers.has(runId)) {
    subscribers.set(runId, new Set())
  }
  subscribers.get(runId)!.add({ runId, event, userId })
}

// 移除订阅者
export function removeSSESubscriber(runId: number, event: H3Event): void {
  const subs = subscribers.get(runId)
  if (subs) {
    for (const sub of subs) {
      if (sub.event === event) {
        subs.delete(sub)
        break
      }
    }
    if (subs.size === 0) {
      subscribers.delete(runId)
    }
  }
}

export function useWorkflowRunService() {
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

  // 加载快照数据
  async function loadSnapshotData(snapshotFilename: string): Promise<WorkflowData> {
    const filePath = join(process.cwd(), 'data/workflows', snapshotFilename)
    const content = await readFile(filePath, 'utf-8')
    return JSON.parse(content)
  }

  // 创建快照
  async function createSnapshot(workflowFilename: string): Promise<string> {
    const timestamp = Date.now()
    const snapshotFilename = `snapshot-${timestamp}.json`
    const srcPath = join(process.cwd(), 'data/workflows', workflowFilename)
    const destPath = join(process.cwd(), 'data/workflows', snapshotFilename)

    await copyFile(srcPath, destPath)
    return snapshotFilename
  }

  // 创建新的运行
  async function createRun(
    workflowId: number,
    userId: number,
    runMode: WorkflowRunMode = 'normal'
  ): Promise<WorkflowRun> {
    // 加载工作流
    const { workflow, data } = await loadWorkflowData(workflowId, userId)

    // 创建快照
    const snapshotFilename = await createSnapshot(workflow.filename)

    // 创建运行记录
    const [run] = await db
      .insert(workflowRuns)
      .values({
        workflowId,
        userId,
        status: 'pending',
        runMode,
        snapshotFilename,
        createdAt: new Date(),
      })
      .returning()

    // 为所有节点创建初始状态记录
    const nodeRecords = data.nodes.map(node => ({
      runId: run.id,
      nodeId: node.id,
      status: 'idle' as WorkflowRunNodeStatus,
      createdAt: new Date(),
    }))

    if (nodeRecords.length > 0) {
      await db.insert(workflowRunNodes).values(nodeRecords)
    }

    return run
  }

  // 获取运行详情
  async function getRun(runId: number): Promise<{
    run: WorkflowRun
    nodes: WorkflowRunNode[]
    snapshot: WorkflowData
  } | null> {
    const [run] = await db
      .select()
      .from(workflowRuns)
      .where(eq(workflowRuns.id, runId))
      .limit(1)

    if (!run) return null

    const nodes = await db
      .select()
      .from(workflowRunNodes)
      .where(eq(workflowRunNodes.runId, runId))

    const snapshot = await loadSnapshotData(run.snapshotFilename)

    return { run, nodes, snapshot }
  }

  // 更新运行状态
  async function updateRunStatus(runId: number, status: WorkflowRunStatus, error?: string) {
    const updates: Partial<WorkflowRun> = { status }
    if (error) updates.error = error
    if (status === 'running' && !updates.startedAt) {
      updates.startedAt = new Date()
    }
    if (['completed', 'failed', 'cancelled'].includes(status)) {
      updates.completedAt = new Date()
    }

    await db
      .update(workflowRuns)
      .set(updates)
      .where(eq(workflowRuns.id, runId))

    emitSSE(runId, { type: 'run_status', runId, status })
  }

  // 更新运行模式
  async function updateRunMode(runId: number, runMode: WorkflowRunMode) {
    await db
      .update(workflowRuns)
      .set({ runMode })
      .where(eq(workflowRuns.id, runId))

    emitSSE(runId, { type: 'run_mode_changed', runId, runMode })
  }

  // 更新节点状态
  async function updateNodeStatus(
    runId: number,
    nodeId: string,
    status: WorkflowRunNodeStatus,
    outputs?: Record<string, any>,
    error?: string
  ) {
    const updates: Partial<WorkflowRunNode> = { status }
    if (outputs) updates.outputs = outputs
    if (error) updates.error = error
    if (status === 'processing') {
      updates.startedAt = new Date()
    }
    if (['success', 'failed'].includes(status)) {
      updates.completedAt = new Date()
    }

    await db
      .update(workflowRunNodes)
      .set(updates)
      .where(and(
        eq(workflowRunNodes.runId, runId),
        eq(workflowRunNodes.nodeId, nodeId),
      ))

    emitSSE(runId, {
      type: 'run_node_status',
      runId,
      nodeId,
      status,
      outputs,
      error,
    })
  }

  // 拓扑排序
  function topologicalSort(nodes: WorkflowNode[], edges: WorkflowEdge[]): WorkflowNode[] {
    const inDegree = new Map<string, number>()
    const adjacency = new Map<string, string[]>()

    for (const node of nodes) {
      inDegree.set(node.id, 0)
      adjacency.set(node.id, [])
    }

    for (const edge of edges) {
      const targets = adjacency.get(edge.source) || []
      targets.push(edge.target)
      adjacency.set(edge.source, targets)
      inDegree.set(edge.target, (inDegree.get(edge.target) || 0) + 1)
    }

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

  // 获取节点输入
  function getNodeInputs(
    nodeId: string,
    nodes: WorkflowNode[],
    edges: WorkflowEdge[],
    nodeResults: Map<string, { resourceUrl?: string }>
  ): { images: string[]; texts: string[] } {
    const images: string[] = []
    const texts: string[] = []

    const incomingEdges = edges.filter(e => e.target === nodeId)

    for (const edge of incomingEdges) {
      const sourceNode = nodes.find(n => n.id === edge.source)
      if (!sourceNode) continue

      if (sourceNode.type === 'input-image' && sourceNode.data.imageUrl) {
        images.push(sourceNode.data.imageUrl)
      } else if (sourceNode.type === 'text-node' && sourceNode.data.text) {
        texts.push(sourceNode.data.text)
      } else if (sourceNode.type === 'gen-image' || sourceNode.type === 'gen-video') {
        const result = nodeResults.get(sourceNode.id)
        if (result?.resourceUrl) {
          images.push(result.resourceUrl)
        }
      }
    }

    return { images, texts }
  }

  // 执行单个生成节点
  async function executeGenNode(
    runId: number,
    node: WorkflowNode,
    userId: number,
    nodes: WorkflowNode[],
    edges: WorkflowEdge[],
    nodeResults: Map<string, { resourceUrl?: string }>,
    taskType: 'image' | 'video'
  ): Promise<{ taskId?: number; resourceUrl?: string; error?: string }> {
    const { upstreamId, aimodelId, prompt } = node.data as {
      upstreamId?: number
      aimodelId?: number
      prompt?: string
    }

    if (!upstreamId || !aimodelId) {
      return { error: '请先选择模型' }
    }

    // 验证上游配置
    const upstream = await upstreamService.getByIdSimple(upstreamId)
    if (!upstream || upstream.userId !== userId) {
      return { error: '无效的上游配置' }
    }

    // 验证 AI 模型
    const aimodel = await aimodelService.getById(aimodelId)
    if (!aimodel || aimodel.upstreamId !== upstreamId) {
      return { error: '无效的模型配置' }
    }

    // 获取上游输入
    const inputs = getNodeInputs(node.id, nodes, edges, nodeResults)
    const finalPrompt = inputs.texts.length > 0
      ? inputs.texts.join('\n') + (prompt ? '\n' + prompt : '')
      : prompt

    if (!finalPrompt && inputs.images.length === 0) {
      return { error: '请输入提示词或连接输入节点' }
    }

    // 获取用户设置
    const blurByDefault = taskType === 'image'
      ? await userSettingsService.get<boolean>(userId, USER_SETTING_KEYS.GENERAL_BLUR_BY_DEFAULT)
      : false

    try {
      // 创建任务
      const task = await taskService.createTask({
        userId,
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

      return { taskId: task.id }
    } catch (error: any) {
      return { error: error.message || '创建任务失败' }
    }
  }

  // 等待任务完成
  async function waitForTask(taskId: number, runId: number, nodeId: string): Promise<{
    resourceUrl?: string
    error?: string
  }> {
    const maxWaitTime = 10 * 60 * 1000 // 10 分钟
    const pollInterval = 2000 // 2 秒
    const startTime = Date.now()

    while (Date.now() - startTime < maxWaitTime) {
      const task = await db.query.tasks.findFirst({
        where: eq(tasks.id, taskId),
      })

      if (!task) {
        return { error: '任务不存在' }
      }

      // 发送进度更新
      if (task.progress) {
        emitSSE(runId, {
          type: 'run_node_progress',
          runId,
          nodeId,
          progress: parseInt(task.progress) || 0,
          taskId,
        })
      }

      if (task.status === 'success') {
        return { resourceUrl: task.resourceUrl || undefined }
      }

      if (task.status === 'failed' || task.status === 'cancelled') {
        return { error: task.error || '任务失败' }
      }

      await new Promise(resolve => setTimeout(resolve, pollInterval))
    }

    return { error: '任务超时' }
  }

  // 开始执行工作流
  async function startExecution(runId: number) {
    const runData = await getRun(runId)
    if (!runData) {
      throw new Error('运行记录不存在')
    }

    const { run, snapshot } = runData
    const { nodes, edges } = snapshot

    // 更新状态为运行中
    await updateRunStatus(runId, 'running')

    // 拓扑排序
    const sortedNodes = topologicalSort(nodes, edges)

    // 节点结果缓存
    const nodeResults = new Map<string, { resourceUrl?: string }>()

    // 依次执行节点
    for (const node of sortedNodes) {
      // 检查运行是否被取消
      const [currentRun] = await db
        .select()
        .from(workflowRuns)
        .where(eq(workflowRuns.id, runId))
        .limit(1)

      if (!currentRun || currentRun.status === 'cancelled') {
        return
      }

      // 只执行生成节点
      if (node.type !== 'gen-image' && node.type !== 'gen-video') {
        continue
      }

      const taskType = node.type === 'gen-image' ? 'image' : 'video'

      // 标记为 pending
      await updateNodeStatus(runId, node.id, 'pending')

      // 标记为 processing
      await updateNodeStatus(runId, node.id, 'processing')

      // 执行节点
      const result = await executeGenNode(
        runId,
        node,
        run.userId,
        nodes,
        edges,
        nodeResults,
        taskType
      )

      if (result.error) {
        await updateNodeStatus(runId, node.id, 'failed', undefined, result.error)
        await updateRunStatus(runId, 'failed', `节点 ${node.id} 执行失败: ${result.error}`)
        return
      }

      if (result.taskId) {
        // 提交任务
        await taskService.submitTask(result.taskId)

        // 等待任务完成
        const taskResult = await waitForTask(result.taskId, runId, node.id)

        if (taskResult.error) {
          await updateNodeStatus(runId, node.id, 'failed', { taskId: result.taskId }, taskResult.error)
          await updateRunStatus(runId, 'failed', `节点 ${node.id} 执行失败: ${taskResult.error}`)
          return
        }

        // 成功
        await updateNodeStatus(runId, node.id, 'success', {
          taskId: result.taskId,
          resourceUrl: taskResult.resourceUrl,
        })

        nodeResults.set(node.id, { resourceUrl: taskResult.resourceUrl })

        // 检查是否是单步模式
        if (currentRun.runMode === 'step') {
          await updateRunStatus(runId, 'paused')
          return
        }
      }
    }

    // 所有节点执行完成
    await updateRunStatus(runId, 'completed')
  }

  // 执行单个节点（在运行模式下）
  async function executeNode(runId: number, nodeId: string) {
    const runData = await getRun(runId)
    if (!runData) {
      throw new Error('运行记录不存在')
    }

    const { run, nodes: runNodes, snapshot } = runData

    // 找到节点
    const node = snapshot.nodes.find(n => n.id === nodeId)
    if (!node) {
      throw new Error('节点不存在')
    }

    if (node.type !== 'gen-image' && node.type !== 'gen-video') {
      throw new Error('该节点类型不支持执行')
    }

    // 如果是 running 状态，不允许执行
    if (run.status === 'running') {
      throw new Error('工作流正在运行中')
    }

    // 收集已完成节点的结果
    const nodeResults = new Map<string, { resourceUrl?: string }>()
    for (const rn of runNodes) {
      if (rn.status === 'success' && rn.outputs?.resourceUrl) {
        nodeResults.set(rn.nodeId, { resourceUrl: rn.outputs.resourceUrl })
      }
    }

    const taskType = node.type === 'gen-image' ? 'image' : 'video'

    // 更新运行状态
    await updateRunStatus(runId, 'running')

    // 标记节点为 processing
    await updateNodeStatus(runId, nodeId, 'processing')

    // 执行节点
    const result = await executeGenNode(
      runId,
      node,
      run.userId,
      snapshot.nodes,
      snapshot.edges,
      nodeResults,
      taskType
    )

    if (result.error) {
      await updateNodeStatus(runId, nodeId, 'failed', undefined, result.error)
      await updateRunStatus(runId, 'failed', `节点 ${nodeId} 执行失败: ${result.error}`)
      return
    }

    if (result.taskId) {
      // 提交任务
      await taskService.submitTask(result.taskId)

      // 等待任务完成
      const taskResult = await waitForTask(result.taskId, runId, nodeId)

      if (taskResult.error) {
        await updateNodeStatus(runId, nodeId, 'failed', { taskId: result.taskId }, taskResult.error)
        await updateRunStatus(runId, 'failed', `节点 ${nodeId} 执行失败: ${taskResult.error}`)
        return
      }

      // 成功
      await updateNodeStatus(runId, nodeId, 'success', {
        taskId: result.taskId,
        resourceUrl: taskResult.resourceUrl,
      })

      // 检查当前运行模式
      const [currentRun] = await db
        .select()
        .from(workflowRuns)
        .where(eq(workflowRuns.id, runId))
        .limit(1)

      if (currentRun?.runMode === 'step') {
        await updateRunStatus(runId, 'paused')
      } else {
        // 普通模式，继续执行后续节点
        await continueExecution(runId)
      }
    }
  }

  // 继续执行
  async function continueExecution(runId: number) {
    const runData = await getRun(runId)
    if (!runData) {
      throw new Error('运行记录不存在')
    }

    const { run, nodes: runNodes, snapshot } = runData
    const { nodes, edges } = snapshot

    // 更新状态为运行中
    await updateRunStatus(runId, 'running')

    // 拓扑排序
    const sortedNodes = topologicalSort(nodes, edges)

    // 收集已完成节点的结果
    const nodeResults = new Map<string, { resourceUrl?: string }>()
    const completedNodeIds = new Set<string>()
    for (const rn of runNodes) {
      if (rn.status === 'success') {
        completedNodeIds.add(rn.nodeId)
        if (rn.outputs?.resourceUrl) {
          nodeResults.set(rn.nodeId, { resourceUrl: rn.outputs.resourceUrl })
        }
      }
    }

    // 继续执行未完成的节点
    for (const node of sortedNodes) {
      if (completedNodeIds.has(node.id)) {
        continue
      }

      // 检查运行是否被取消
      const [currentRun] = await db
        .select()
        .from(workflowRuns)
        .where(eq(workflowRuns.id, runId))
        .limit(1)

      if (!currentRun || currentRun.status === 'cancelled') {
        return
      }

      if (node.type !== 'gen-image' && node.type !== 'gen-video') {
        continue
      }

      const taskType = node.type === 'gen-image' ? 'image' : 'video'

      await updateNodeStatus(runId, node.id, 'pending')
      await updateNodeStatus(runId, node.id, 'processing')

      const result = await executeGenNode(
        runId,
        node,
        run.userId,
        nodes,
        edges,
        nodeResults,
        taskType
      )

      if (result.error) {
        await updateNodeStatus(runId, node.id, 'failed', undefined, result.error)
        await updateRunStatus(runId, 'failed', `节点 ${node.id} 执行失败: ${result.error}`)
        return
      }

      if (result.taskId) {
        await taskService.submitTask(result.taskId)

        const taskResult = await waitForTask(result.taskId, runId, node.id)

        if (taskResult.error) {
          await updateNodeStatus(runId, node.id, 'failed', { taskId: result.taskId }, taskResult.error)
          await updateRunStatus(runId, 'failed', `节点 ${node.id} 执行失败: ${taskResult.error}`)
          return
        }

        await updateNodeStatus(runId, node.id, 'success', {
          taskId: result.taskId,
          resourceUrl: taskResult.resourceUrl,
        })

        nodeResults.set(node.id, { resourceUrl: taskResult.resourceUrl })

        if (currentRun.runMode === 'step') {
          await updateRunStatus(runId, 'paused')
          return
        }
      }
    }

    await updateRunStatus(runId, 'completed')
  }

  // 重试整个 Run
  async function retryRun(runId: number) {
    const runData = await getRun(runId)
    if (!runData) {
      throw new Error('运行记录不存在')
    }

    // 重置所有节点状态
    await db
      .update(workflowRunNodes)
      .set({
        status: 'idle',
        outputs: null,
        error: null,
        startedAt: null,
        completedAt: null,
      })
      .where(eq(workflowRunNodes.runId, runId))

    // 重置 run 状态
    await db
      .update(workflowRuns)
      .set({
        status: 'pending',
        error: null,
        startedAt: null,
        completedAt: null,
      })
      .where(eq(workflowRuns.id, runId))

    emitSSE(runId, { type: 'run_status', runId, status: 'pending' })

    // 重新开始执行
    await startExecution(runId)
  }

  // 取消执行
  async function cancelRun(runId: number) {
    await updateRunStatus(runId, 'cancelled')
  }

  return {
    createRun,
    getRun,
    updateRunStatus,
    updateRunMode,
    updateNodeStatus,
    startExecution,
    executeNode,
    continueExecution,
    retryRun,
    cancelRun,
  }
}
