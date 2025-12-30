// POST /api/workflows/:id/run-node - 执行工作流单个节点
import { useWorkflowService } from '../../../services/workflow'

export default defineEventHandler(async (event) => {
  const { user } = await requireAuth(event)
  const workflowId = Number(getRouterParam(event, 'id'))

  if (!workflowId || isNaN(workflowId)) {
    throw createError({ statusCode: 400, message: '无效的工作流ID' })
  }

  const body = await readBody<{ nodeId: string }>(event)

  if (!body.nodeId) {
    throw createError({ statusCode: 400, message: '请指定要执行的节点' })
  }

  const workflowService = useWorkflowService()

  try {
    const result = await workflowService.runNode(workflowId, body.nodeId, user.id)

    return {
      success: true,
      data: result,
    }
  } catch (error: any) {
    throw createError({
      statusCode: 400,
      message: error.message || '节点执行失败',
    })
  }
})
