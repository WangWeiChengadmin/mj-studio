import { d as defineEventHandler, r as requireAuth, g as getRouterParam, c as createError } from '../../../nitro/nitro.mjs';
import { u as useTaskService } from '../../../_/task.mjs';
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
import '../../../_/constants.mjs';
import '../../../_/upstream.mjs';
import '../../../_/aimodel.mjs';
import '../../../_/file.mjs';
import '../../../_/globalEvents.mjs';

const _id__get = defineEventHandler(async (event) => {
  var _a;
  const { user } = await requireAuth(event);
  const id = getRouterParam(event, "id");
  if (!id) {
    throw createError({
      statusCode: 400,
      message: "\u4EFB\u52A1ID\u4E0D\u80FD\u4E3A\u7A7A"
    });
  }
  const taskId = parseInt(id, 10);
  if (isNaN(taskId)) {
    throw createError({
      statusCode: 400,
      message: "\u65E0\u6548\u7684\u4EFB\u52A1ID"
    });
  }
  const taskService = useTaskService();
  let result = await taskService.getTaskWithSummary(taskId);
  if (!result) {
    throw createError({
      statusCode: 404,
      message: "\u4EFB\u52A1\u4E0D\u5B58\u5728"
    });
  }
  let { task, upstream } = result;
  if (task.userId !== user.id) {
    throw createError({
      statusCode: 403,
      message: "\u65E0\u6743\u8BBF\u95EE\u6B64\u4EFB\u52A1"
    });
  }
  if (task.status === "processing") {
    task = (_a = await taskService.syncTaskStatus(taskId)) != null ? _a : task;
  }
  return {
    ...task,
    upstream
  };
});

export { _id__get as default };
//# sourceMappingURL=_id_.get.mjs.map
