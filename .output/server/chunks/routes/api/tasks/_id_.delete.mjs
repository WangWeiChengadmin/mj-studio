import { d as defineEventHandler, r as requireAuth, g as getRouterParam, c as createError } from '../../../nitro/nitro.mjs';
import { u as useTaskService } from '../../../_/task.mjs';
import { e as emitToUser } from '../../../_/globalEvents.mjs';
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

const _id__delete = defineEventHandler(async (event) => {
  const { user } = await requireAuth(event);
  const id = Number(getRouterParam(event, "id"));
  if (!id || isNaN(id)) {
    throw createError({
      statusCode: 400,
      message: "\u65E0\u6548\u7684\u4EFB\u52A1ID"
    });
  }
  const taskService = useTaskService();
  const success = await taskService.deleteTask(id, user.id);
  if (!success) {
    throw createError({
      statusCode: 404,
      message: "\u4EFB\u52A1\u4E0D\u5B58\u5728\u6216\u5DF2\u5220\u9664"
    });
  }
  await emitToUser(user.id, "task.deleted", { taskId: id });
  return { success: true };
});

export { _id__delete as default };
//# sourceMappingURL=_id_.delete.mjs.map
