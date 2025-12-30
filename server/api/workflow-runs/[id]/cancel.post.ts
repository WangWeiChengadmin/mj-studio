// POST /api/workflow-runs/:id/cancel - 取消执行
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

  if (run.status !== 'running') {
    throw createError({ statusCode: 400, message: '只有运行中的任务才能取消' })
  }

  const workflowRunService = useWorkflowRunService()
  await workflowRunService.cancelRun(runId)

  return {
    success: true,
  }
})
