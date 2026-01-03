import { d as defineEventHandler, r as requireAuth, g as getRouterParam, c as createError, b as db, E as workflowRuns } from '../../../nitro/nitro.mjs';
import { eq } from 'drizzle-orm';
import { u as useWorkflowRunService } from '../../../_/workflowRun.mjs';
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
import 'fs/promises';
import '../../../_/task.mjs';
import '../../../_/constants.mjs';
import '../../../_/upstream.mjs';
import '../../../_/aimodel.mjs';
import '../../../_/file.mjs';
import '../../../_/globalEvents.mjs';
import '../../../_/userSettings.mjs';

const _id__get = defineEventHandler(async (event) => {
  const { user } = await requireAuth(event);
  const runId = Number(getRouterParam(event, "id"));
  if (!runId || isNaN(runId)) {
    throw createError({ statusCode: 400, message: "\u65E0\u6548\u7684\u8FD0\u884CID" });
  }
  const [run] = await db.select().from(workflowRuns).where(eq(workflowRuns.id, runId)).limit(1);
  if (!run || run.userId !== user.id) {
    throw createError({ statusCode: 404, message: "\u8FD0\u884C\u8BB0\u5F55\u4E0D\u5B58\u5728" });
  }
  const workflowRunService = useWorkflowRunService();
  const runData = await workflowRunService.getRun(runId);
  if (!runData) {
    throw createError({ statusCode: 404, message: "\u8FD0\u884C\u8BB0\u5F55\u4E0D\u5B58\u5728" });
  }
  return {
    success: true,
    data: runData
  };
});

export { _id__get as default };
//# sourceMappingURL=_id_.get.mjs.map
