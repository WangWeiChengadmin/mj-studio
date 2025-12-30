// PATCH /api/workflow-runs/:id - 更新运行模式
import { eq } from 'drizzle-orm'
import { useWorkflowRunService } from '../../services/workflowRun'
import { db } from '../../database'
import { workflowRuns, type WorkflowRunMode } from '../../database/schema'

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

  const body = await readBody<{ runMode?: WorkflowRunMode }>(event)

  if (!body.runMode || !['normal', 'step'].includes(body.runMode)) {
    throw createError({ statusCode: 400, message: '无效的运行模式' })
  }

  const workflowRunService = useWorkflowRunService()
  await workflowRunService.updateRunMode(runId, body.runMode)

  return {
    success: true,
  }
})
