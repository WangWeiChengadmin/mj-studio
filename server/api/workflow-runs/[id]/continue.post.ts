// POST /api/workflow-runs/:id/continue - 继续执行
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

  if (run.status !== 'paused') {
    throw createError({ statusCode: 400, message: '只有暂停状态的运行才能继续' })
  }

  const workflowRunService = useWorkflowRunService()

  // 异步继续执行（不阻塞响应）
  workflowRunService.continueExecution(runId).catch((err) => {
    console.error('继续执行失败:', err)
  })

  return {
    success: true,
  }
})
