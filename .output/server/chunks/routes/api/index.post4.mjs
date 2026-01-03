import { d as defineEventHandler, r as requireAuth, a as readBody, c as createError } from '../../nitro/nitro.mjs';
import { u as useTaskService } from '../../_/task.mjs';
import { u as useUpstreamService } from '../../_/upstream.mjs';
import { u as useAimodelService } from '../../_/aimodel.mjs';
import { u as useUserSettingsService } from '../../_/userSettings.mjs';
import { e as emitToUser } from '../../_/globalEvents.mjs';
import { V as VIDEO_MODEL_TYPES, I as IMAGE_MODEL_TYPES, A as API_FORMATS, U as USER_SETTING_KEYS } from '../../_/constants.mjs';
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
  const {
    taskType = "image",
    // 任务类型：image | video
    prompt,
    modelParams,
    // 模型专用参数（JSON）
    images = [],
    type = "imagine",
    upstreamId,
    aimodelId,
    modelType,
    apiFormat,
    modelName
  } = body;
  if (!upstreamId) {
    throw createError({
      statusCode: 400,
      message: "\u8BF7\u9009\u62E9\u4E0A\u6E38\u914D\u7F6E"
    });
  }
  if (!aimodelId) {
    throw createError({
      statusCode: 400,
      message: "\u8BF7\u9009\u62E9\u6A21\u578B"
    });
  }
  const validModelTypes = taskType === "video" ? VIDEO_MODEL_TYPES : IMAGE_MODEL_TYPES;
  if (!modelType || !validModelTypes.includes(modelType)) {
    throw createError({
      statusCode: 400,
      message: "\u8BF7\u9009\u62E9\u6709\u6548\u7684\u6A21\u578B\u7C7B\u578B"
    });
  }
  if (!apiFormat || !API_FORMATS.includes(apiFormat)) {
    throw createError({
      statusCode: 400,
      message: "\u8BF7\u9009\u62E9API\u683C\u5F0F"
    });
  }
  if (taskType === "video" && apiFormat !== "video-unified") {
    throw createError({
      statusCode: 400,
      message: "\u89C6\u9891\u4EFB\u52A1\u4EC5\u652F\u6301 video-unified \u683C\u5F0F"
    });
  }
  const upstreamService = useUpstreamService();
  const upstream = await upstreamService.getByIdSimple(upstreamId);
  if (!upstream || upstream.userId !== user.id) {
    throw createError({
      statusCode: 400,
      message: "\u65E0\u6548\u7684\u4E0A\u6E38\u914D\u7F6E"
    });
  }
  const aimodelService = useAimodelService();
  const aimodel = await aimodelService.getById(aimodelId);
  if (!aimodel || aimodel.upstreamId !== upstreamId) {
    throw createError({
      statusCode: 400,
      message: "\u65E0\u6548\u7684\u6A21\u578B\u914D\u7F6E"
    });
  }
  if (apiFormat === "koukoutu") {
    if (images.length === 0) {
      throw createError({
        statusCode: 400,
        message: "\u62A0\u62A0\u56FE\u9700\u8981\u4E0A\u4F20\u56FE\u7247"
      });
    }
  } else if (!prompt && type === "imagine" && taskType === "image") {
    throw createError({
      statusCode: 400,
      message: "\u8BF7\u8F93\u5165\u63D0\u793A\u8BCD"
    });
  }
  if (taskType === "video" && !prompt) {
    throw createError({
      statusCode: 400,
      message: "\u89C6\u9891\u4EFB\u52A1\u9700\u8981\u8F93\u5165\u63D0\u793A\u8BCD"
    });
  }
  if (type === "blend" && apiFormat !== "mj-proxy") {
    throw createError({
      statusCode: 400,
      message: "\u6DF7\u5408\u6A21\u5F0F\u4EC5\u652F\u6301MJ-Proxy\u683C\u5F0F"
    });
  }
  if (type === "blend" && images.length < 2) {
    throw createError({
      statusCode: 400,
      message: "\u6DF7\u5408\u6A21\u5F0F\u81F3\u5C11\u9700\u89812\u5F20\u56FE\u7247"
    });
  }
  const taskService = useTaskService();
  const userSettingsService = useUserSettingsService();
  const blurByDefault = taskType === "image" ? await userSettingsService.get(user.id, USER_SETTING_KEYS.GENERAL_BLUR_BY_DEFAULT) : false;
  const task = await taskService.createTask({
    userId: user.id,
    upstreamId,
    aimodelId,
    taskType,
    modelType,
    apiFormat,
    modelName: modelName || aimodel.modelName,
    prompt,
    modelParams,
    images,
    type,
    isBlurred: blurByDefault != null ? blurByDefault : true
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
    console.error("\u5F02\u6B65\u63D0\u4EA4\u4EFB\u52A1\u5931\u8D25:", err);
  });
  return {
    success: true,
    taskId: task.id,
    message: taskType === "video" ? "\u89C6\u9891\u4EFB\u52A1\u5DF2\u521B\u5EFA\uFF0C\u6B63\u5728\u63D0\u4EA4\u5230\u751F\u6210\u670D\u52A1" : "\u4EFB\u52A1\u5DF2\u521B\u5EFA\uFF0C\u6B63\u5728\u63D0\u4EA4\u5230\u751F\u6210\u670D\u52A1"
  };
});

export { index_post as default };
//# sourceMappingURL=index.post4.mjs.map
