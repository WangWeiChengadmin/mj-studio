// GET /api/workflow-runs/:id - 获取运行详情
import { eq } from 'drizzle-orm'
import { useWorkflowRunService } from '../../services/workflowRun'
import { db } from '../../database'
import { workflowRuns } from '../../database/schema'

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

  const workflowRunService = useWorkflowRunService()
  const runData = await workflowRunService.getRun(runId)

  if (!runData) {
    throw createError({ statusCode: 404, message: '运行记录不存在' })
  }

  return {
    success: true,
    data: runData,
  }
})
