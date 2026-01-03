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

const blur_patch = defineEventHandler(async (event) => {
  const { user } = await requireAuth(event);
  const body = await readBody(event);
  const { uniqueId, isBlurred } = body;
  if (!(uniqueId == null ? void 0 : uniqueId.trim())) {
    throw createError({
      statusCode: 400,
      message: "uniqueId \u662F\u5FC5\u586B\u53C2\u6570"
    });
  }
  if (typeof isBlurred !== "boolean") {
    throw createError({
      statusCode: 400,
      message: "isBlurred \u5FC5\u987B\u662F\u5E03\u5C14\u503C"
    });
  }
  const taskService = useTaskService();
  const task = await taskService.findByUniqueId(uniqueId.trim(), user.id);
  if (!task) {
    throw createError({
      statusCode: 404,
      message: "\u4EFB\u52A1\u4E0D\u5B58\u5728"
    });
  }
  await taskService.updateTask(task.id, { isBlurred });
  await emitToUser(user.id, "task.blur.updated", {
    taskId: task.id,
    isBlurred
  });
  return {
    success: true,
    isBlurred
  };
});

export { blur_patch as default };
//# sourceMappingURL=blur.patch.mjs.map
