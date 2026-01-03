import { d as defineEventHandler, r as requireAuth, g as getRouterParam, c as createError } from '../../../../nitro/nitro.mjs';
import { u as useTaskService } from '../../../../_/task.mjs';
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
import '../../../../_/constants.mjs';
import '../../../../_/upstream.mjs';
import '../../../../_/aimodel.mjs';
import '../../../../_/file.mjs';
import '../../../../_/globalEvents.mjs';

const cancel_post = defineEventHandler(async (event) => {
  const session = await requireAuth(event);
  const id = Number(getRouterParam(event, "id"));
  if (!id || isNaN(id)) {
    throw createError({
      statusCode: 400,
      message: "\u65E0\u6548\u7684\u4EFB\u52A1ID"
    });
  }
  const taskService = useTaskService();
  const task = await taskService.getTask(id);
  if (!task) {
    throw createError({
      statusCode: 404,
      message: "\u4EFB\u52A1\u4E0D\u5B58\u5728"
    });
  }
  if (task.userId !== session.user.id) {
    throw createError({
      statusCode: 403,
      message: "\u65E0\u6743\u64CD\u4F5C\u6B64\u4EFB\u52A1"
    });
  }
  if (!["pending", "submitting", "processing"].includes(task.status)) {
    throw createError({
      statusCode: 400,
      message: "\u53EA\u80FD\u53D6\u6D88\u8FDB\u884C\u4E2D\u7684\u4EFB\u52A1"
    });
  }
  const aborted = taskService.abortTask(id);
  await taskService.updateTask(id, {
    status: "cancelled",
    error: "\u7528\u6237\u53D6\u6D88"
  });
  return {
    success: true,
    message: aborted ? "\u4EFB\u52A1\u5DF2\u53D6\u6D88\uFF0C\u8BF7\u6C42\u5DF2\u4E2D\u6B62" : "\u4EFB\u52A1\u5DF2\u53D6\u6D88"
  };
});

export { cancel_post as default };
//# sourceMappingURL=cancel.post.mjs.map
