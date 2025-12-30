// POST /api/workflow-runs/:id/retry - 重试整个运行
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

  if (!['failed', 'cancelled', 'completed'].includes(run.status)) {
    throw createError({ statusCode: 400, message: '只有失败、取消或完成状态的运行才能重试' })
  }

  const workflowRunService = useWorkflowRunService()

  // 异步重试（不阻塞响应）
  workflowRunService.retryRun(runId).catch((err) => {
    console.error('重试失败:', err)
  })

  return {
    success: true,
  }
})
