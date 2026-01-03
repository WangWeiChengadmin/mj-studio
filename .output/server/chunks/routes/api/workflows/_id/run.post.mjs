import { d as defineEventHandler, r as requireAuth, g as getRouterParam, c as createError, a as readBody } from '../../../../nitro/nitro.mjs';
import { u as useWorkflowRunService } from '../../../../_/workflowRun.mjs';
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
import 'drizzle-orm';
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
import '../../../../_/task.mjs';
import '../../../../_/constants.mjs';
import '../../../../_/upstream.mjs';
import '../../../../_/aimodel.mjs';
import '../../../../_/file.mjs';
import '../../../../_/globalEvents.mjs';
import '../../../../_/userSettings.mjs';

const run_post = defineEventHandler(async (event) => {
  const { user } = await requireAuth(event);
  const workflowId = Number(getRouterParam(event, "id"));
  if (!workflowId || isNaN(workflowId)) {
    throw createError({ statusCode: 400, message: "\u65E0\u6548\u7684\u5DE5\u4F5C\u6D41ID" });
  }
  const body = await readBody(event);
  const runMode = (body == null ? void 0 : body.runMode) || "normal";
  const workflowRunService = useWorkflowRunService();
  try {
    const run = await workflowRunService.createRun(workflowId, user.id, runMode);
    workflowRunService.startExecution(run.id).catch((err) => {
      console.error("\u5DE5\u4F5C\u6D41\u6267\u884C\u542F\u52A8\u5931\u8D25:", err);
    });
    return {
      success: true,
      runId: run.id
    };
  } catch (error) {
    throw createError({
      statusCode: 400,
      message: error.message || "\u521B\u5EFA\u8FD0\u884C\u5931\u8D25"
    });
  }
});

export { run_post as default };
//# sourceMappingURL=run.post.mjs.map
