// GET /api/workflows/:id/runs - 获取工作流的运行历史
import { eq, desc, and } from 'drizzle-orm'
import { db } from '../../../database'
import { workflowRuns, workflows } from '../../../database/schema'

export default defineEventHandler(async (event) => {
  const { user } = await requireAuth(event)
  const workflowId = Number(getRouterParam(event, 'id'))

  if (!workflowId || isNaN(workflowId)) {
    throw createError({ statusCode: 400, message: '无效的工作流ID' })
  }

  // 验证工作流属于当前用户
  const [workflow] = await db
    .select()
    .from(workflows)
    .where(and(
      eq(workflows.id, workflowId),
      eq(workflows.userId, user.id),
    ))
    .limit(1)

  if (!workflow) {
    throw createError({ statusCode: 404, message: '工作流不存在' })
  }

  // 获取运行历史，按创建时间倒序
  const runs = await db
    .select()
    .from(workflowRuns)
    .where(eq(workflowRuns.workflowId, workflowId))
    .orderBy(desc(workflowRuns.createdAt))
    .limit(50)

  return {
    success: true,
    data: runs,
  }
})
