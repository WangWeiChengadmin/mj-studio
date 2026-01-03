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

const retry_post = defineEventHandler(async (event) => {
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
  if (task.status !== "failed" && task.status !== "cancelled") {
    throw createError({
      statusCode: 400,
      message: "\u53EA\u80FD\u91CD\u8BD5\u5931\u8D25\u6216\u5DF2\u53D6\u6D88\u7684\u4EFB\u52A1"
    });
  }
  await taskService.updateTask(id, {
    status: "pending",
    error: null,
    upstreamTaskId: null,
    progress: null,
    createdAt: /* @__PURE__ */ new Date()
  });
  taskService.submitTask(id).catch((err) => {
    console.error("\u91CD\u8BD5\u4EFB\u52A1\u5931\u8D25:", err);
  });
  return {
    success: true,
    message: "\u4EFB\u52A1\u5DF2\u91CD\u65B0\u63D0\u4EA4"
  };
});

export { retry_post as default };
//# sourceMappingURL=retry.post.mjs.map
