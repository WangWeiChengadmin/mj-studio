import { d as defineEventHandler, r as requireAuth, a as readBody, c as createError } from '../../../nitro/nitro.mjs';
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

const blurBatch_patch = defineEventHandler(async (event) => {
  const { user } = await requireAuth(event);
  const body = await readBody(event);
  const { isBlurred, taskIds } = body;
  if (typeof isBlurred !== "boolean") {
    throw createError({
      statusCode: 400,
      message: "\u7F3A\u5C11 isBlurred \u53C2\u6570"
    });
  }
  if (taskIds !== void 0 && !Array.isArray(taskIds)) {
    throw createError({
      statusCode: 400,
      message: "taskIds \u5FC5\u987B\u662F\u6570\u7EC4"
    });
  }
  const taskService = useTaskService();
  await taskService.batchBlur(user.id, isBlurred, taskIds);
  await emitToUser(user.id, "tasks.blur.updated", {
    taskIds: taskIds != null ? taskIds : [],
    // 空数组表示所有任务
    isBlurred
  });
  return { success: true };
});

export { blurBatch_patch as default };
//# sourceMappingURL=blur-batch.patch.mjs.map
