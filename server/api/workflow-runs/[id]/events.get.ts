// GET /api/workflow-runs/:id/events - SSE 事件流
import { eq } from 'drizzle-orm'
import { addSSESubscriber, removeSSESubscriber } from '../../../services/workflowRun'
import { db } from '../../../database'
import { workflowRuns, workflowRunNodes } from '../../../database/schema'

export default defineEventHandler(async (event) => {
  const { user } = await requireAuth(event)
  const runId = Number(getRouterParam(event, 'id'))

  if (!runId || isNaN(runId)) {
    throw createError({ statusCode: 400, message: '无效的运行ID' })
  }

  // 验证运行记录属于当前用户
  const [run] = await db
    .select()
    .from(workflowRuns)
    .where(eq(workflowRuns.id, runId))
    .limit(1)

  if (!run || run.userId !== user.id) {
    throw createError({ statusCode: 404, message: '运行记录不存在' })
  }

  // 设置 SSE 响应头
  setHeader(event, 'Content-Type', 'text/event-stream')
  setHeader(event, 'Cache-Control', 'no-cache')
  setHeader(event, 'Connection', 'keep-alive')
  setHeader(event, 'X-Accel-Buffering', 'no')

  // 发送初始状态
  const initData = JSON.stringify({
    type: 'run_status',
    runId: run.id,
    status: run.status,
  })
  await event.node.res.write(`data: ${initData}\n\n`)

  // 发送当前所有节点状态
  const nodes = await db
    .select()
    .from(workflowRunNodes)
    .where(eq(workflowRunNodes.runId, runId))

  for (const node of nodes) {
    const nodeData = JSON.stringify({
      type: 'run_node_status',
      runId: run.id,
      nodeId: node.nodeId,
      status: node.status,
      outputs: node.outputs,
      error: node.error,
    })
    await event.node.res.write(`data: ${nodeData}\n\n`)
  }

  // 如果状态已完成，直接结束
  if (['completed', 'failed', 'cancelled'].includes(run.status)) {
    await event.node.res.end()
    return
  }

  // 添加为订阅者
  addSSESubscriber(runId, event, user.id)

  // 等待连接关闭
  return new Promise((resolve) => {
    event.node.req.on('close', () => {
      removeSSESubscriber(runId, event)
      resolve(undefined)
    })

    event.node.req.on('error', () => {
      removeSSESubscriber(runId, event)
      resolve(undefined)
    })
  })
})
