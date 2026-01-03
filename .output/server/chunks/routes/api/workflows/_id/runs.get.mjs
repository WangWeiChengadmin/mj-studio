import { d as defineEventHandler, r as requireAuth, g as getRouterParam, c as createError, b as db, G as workflows, E as workflowRuns } from '../../../../nitro/nitro.mjs';
import { and, eq, desc } from 'drizzle-orm';
import 'jose';
import 'crypto';
import 'util';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'better-sqlite3';
import 'drizzle-orm/better-sqlite3';
import 'drizzle-orm/sqlite-core';
import 'fs';
import 'path';
import 'drizzle-orm/better-sqlite3/migrator';
import 'node:url';
import '@iconify/utils';
import 'consola';

const runs_get = defineEventHandler(async (event) => {
  const { user } = await requireAuth(event);
  const workflowId = Number(getRouterParam(event, "id"));
  if (!workflowId || isNaN(workflowId)) {
    throw createError({ statusCode: 400, message: "\u65E0\u6548\u7684\u5DE5\u4F5C\u6D41ID" });
  }
  const [workflow] = await db.select().from(workflows).where(and(
    eq(workflows.id, workflowId),
    eq(workflows.userId, user.id)
  )).limit(1);
  if (!workflow) {
    throw createError({ statusCode: 404, message: "\u5DE5\u4F5C\u6D41\u4E0D\u5B58\u5728" });
  }
  const runs = await db.select().from(workflowRuns).where(eq(workflowRuns.workflowId, workflowId)).orderBy(desc(workflowRuns.createdAt)).limit(50);
  return {
    success: true,
    data: runs
  };
});

export { runs_get as default };
//# sourceMappingURL=runs.get.mjs.map
