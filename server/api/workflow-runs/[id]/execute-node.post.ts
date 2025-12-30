// POST /api/workflow-runs/:id/execute-node - 执行单个节点
import { eq } from 'drizzle-orm'
import { useWorkflowRunService } from '../../../services/workflowRun'
import { db } from '../../../database'
import { workflowRuns } from '../../../database/schema'

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

  const body = await readBody<{ nodeId: string }>(event)

  if (!body.nodeId) {
    throw createError({ statusCode: 400, message: '请指定要执行的节点' })
  }

  const workflowRunService = useWorkflowRunService()

  try {
    // 异步执行节点（不阻塞响应）
    workflowRunService.executeNode(runId, body.nodeId).catch((err) => {
      console.error('节点执行失败:', err)
    })

    return {
      success: true,
    }
  } catch (error: any) {
    throw createError({
      statusCode: 400,
      message: error.message || '节点执行失败',
    })
  }
})
