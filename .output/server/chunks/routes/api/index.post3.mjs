import { d as defineEventHandler, r as requireAuth, a as readBody, c as createError } from '../../nitro/nitro.mjs';
import { u as useTaskService } from '../../_/task.mjs';
import { u as useUpstreamService } from '../../_/upstream.mjs';
import { u as useAimodelService } from '../../_/aimodel.mjs';
import { u as useUserSettingsService } from '../../_/userSettings.mjs';
import { e as emitToUser } from '../../_/globalEvents.mjs';
import { U as USER_SETTING_KEYS } from '../../_/constants.mjs';
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
import '../../_/file.mjs';

const index_post = defineEventHandler(async (event) => {
  var _a;
  const { user } = await requireAuth(event);
  const body = await readBody(event);
  const { uniqueId, prompt, model, negative } = body;
  const autostart = body.autostart === true;
  body.regenerate === true;
  if (!(uniqueId == null ? void 0 : uniqueId.trim())) {
    throw createError({
      statusCode: 400,
      message: "uniqueId \u662F\u5FC5\u586B\u53C2\u6570"
    });
  }
  if (!(prompt == null ? void 0 : prompt.trim())) {
    throw createError({
      statusCode: 400,
      message: "prompt \u662F\u5FC5\u586B\u53C2\u6570"
    });
  }
  const taskService = useTaskService();
  const existingTask = await taskService.findByUniqueId(uniqueId.trim(), user.id);
  if (existingTask) {
    return formatTaskResponse(existingTask);
  }
  if (!autostart) {
    return {
      taskId: null,
      status: "idle",
      progress: null,
      resourceUrl: null,
      error: null
    };
  }
  const upstreamService = useUpstreamService();
  const aimodelService = useAimodelService();
  const userSettingsService = useUserSettingsService();
  let upstream;
  let aimodel;
  const defaultUpstreamId = await userSettingsService.get(
    user.id,
    USER_SETTING_KEYS.DRAWING_EMBEDDED_UPSTREAM_ID
  );
  const defaultAimodelId = await userSettingsService.get(
    user.id,
    USER_SETTING_KEYS.DRAWING_EMBEDDED_AIMODEL_ID
  );
  if (defaultUpstreamId && defaultAimodelId) {
    const defaultUpstream = await upstreamService.getByIdSimple(defaultUpstreamId);
    const defaultAimodel = await aimodelService.getById(defaultAimodelId);
    if (defaultUpstream && defaultAimodel && defaultAimodel.upstreamId === defaultUpstreamId) {
      upstream = defaultUpstream;
      aimodel = defaultAimodel;
    }
  }
  if (!upstream || !aimodel) {
    const matchResult = await aimodelService.findByUserAndModelName(user.id, model, "image");
    if (!matchResult) {
      throw createError({
        statusCode: 400,
        message: model ? `\u672A\u627E\u5230\u5339\u914D\u7684\u7ED8\u56FE\u6A21\u578B\u914D\u7F6E: ${model}` : "\u672A\u627E\u5230\u53EF\u7528\u7684\u7ED8\u56FE\u6A21\u578B\u914D\u7F6E\uFF0C\u8BF7\u5148\u5728\u8BBE\u7F6E\u4E2D\u6DFB\u52A0"
      });
    }
    upstream = matchResult.upstream;
    aimodel = matchResult.aimodel;
  }
  const blurByDefault = await userSettingsService.get(user.id, USER_SETTING_KEYS.GENERAL_BLUR_BY_DEFAULT);
  const modelParams = (negative == null ? void 0 : negative.trim()) ? { negativePrompt: negative.trim() } : void 0;
  const task = await taskService.createTask({
    userId: user.id,
    upstreamId: upstream.id,
    aimodelId: aimodel.id,
    modelType: aimodel.modelType,
    apiFormat: aimodel.apiFormat,
    modelName: aimodel.modelName,
    prompt: prompt.trim(),
    modelParams,
    images: [],
    type: "imagine",
    isBlurred: blurByDefault != null ? blurByDefault : true,
    uniqueId: uniqueId.trim(),
    sourceType: "chat"
  });
  await emitToUser(user.id, "task.created", {
    task: {
      id: task.id,
      userId: task.userId,
      taskType: task.taskType,
      modelType: task.modelType,
      prompt: (_a = task.prompt) != null ? _a : "",
      status: task.status,
      createdAt: task.createdAt instanceof Date ? task.createdAt.toISOString() : task.createdAt
    }
  });
  taskService.submitTask(task.id).catch((err) => {
    console.error("[Illustration] \u63D0\u4EA4\u4EFB\u52A1\u5931\u8D25:", err);
  });
  return formatTaskResponse(task);
});
function formatTaskResponse(task) {
  return {
    taskId: task.id,
    status: task.status,
    progress: task.progress,
    resourceUrl: task.resourceUrl,
    error: task.error,
    isBlurred: task.isBlurred
  };
}

export { index_post as default };
//# sourceMappingURL=index.post3.mjs.map
