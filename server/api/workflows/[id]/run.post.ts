// POST /api/workflows/:id/run - 创建新的工作流运行
import { useWorkflowRunService } from '../../../services/workflowRun'
import type { WorkflowRunMode } from '../../../database/schema'

export default defineEventHandler(async (event) => {
  const { user } = await requireAuth(event)
  const workflowId = Number(getRouterParam(event, 'id'))

  if (!workflowId || isNaN(workflowId)) {
    throw createError({ statusCode: 400, message: '无效的工作流ID' })
  }

  const body = await readBody<{ runMode?: WorkflowRunMode }>(event)
  const runMode = body?.runMode || 'normal'

  const workflowRunService = useWorkflowRunService()

  try {
    const run = await workflowRunService.createRun(workflowId, user.id, runMode)

    // 异步开始执行（不阻塞响应）
    workflowRunService.startExecution(run.id).catch((err) => {
      console.error('工作流执行启动失败:', err)
    })

    return {
      success: true,
      runId: run.id,
    }
  } catch (error: any) {
    throw createError({
      statusCode: 400,
      message: error.message || '创建运行失败',
    })
  }
})
