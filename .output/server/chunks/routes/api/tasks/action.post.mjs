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

const action_post = defineEventHandler(async (event) => {
  var _a;
  const { user } = await requireAuth(event);
  const body = await readBody(event);
  const { taskId, customId } = body;
  if (!taskId || !customId) {
    throw createError({
      statusCode: 400,
      message: "\u7F3A\u5C11\u5FC5\u8981\u53C2\u6570"
    });
  }
  const taskService = useTaskService();
  const task = await taskService.getTask(taskId);
  if (!task) {
    throw createError({
      statusCode: 404,
      message: "\u4EFB\u52A1\u4E0D\u5B58\u5728"
    });
  }
  if (task.userId !== user.id) {
    throw createError({
      statusCode: 403,
      message: "\u65E0\u6743\u64CD\u4F5C\u6B64\u4EFB\u52A1"
    });
  }
  try {
    const newTask = await taskService.executeAction(taskId, customId, user.id);
    await emitToUser(user.id, "task.created", {
      task: {
        id: newTask.id,
        userId: newTask.userId,
        taskType: newTask.taskType,
        modelType: newTask.modelType,
        prompt: (_a = newTask.prompt) != null ? _a : "",
        status: newTask.status,
        createdAt: newTask.createdAt instanceof Date ? newTask.createdAt.toISOString() : newTask.createdAt
      }
    });
    return {
      success: true,
      taskId: newTask.id,
      message: "\u52A8\u4F5C\u5DF2\u6267\u884C"
    };
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: error.message || "\u6267\u884C\u52A8\u4F5C\u5931\u8D25"
    });
  }
});

export { action_post as default };
//# sourceMappingURL=action.post.mjs.map
