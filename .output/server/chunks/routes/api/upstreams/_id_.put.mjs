import { d as defineEventHandler, r as requireAuth, g as getRouterParam, c as createError, a as readBody } from '../../../nitro/nitro.mjs';
import { u as useUpstreamService } from '../../../_/upstream.mjs';
import { u as useAimodelService } from '../../../_/aimodel.mjs';
import { A as API_FORMATS, I as IMAGE_MODEL_TYPES } from '../../../_/constants.mjs';
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

const _id__put = defineEventHandler(async (event) => {
  const { user } = await requireAuth(event);
  const id = getRouterParam(event, "id");
  if (!id) {
    throw createError({ statusCode: 400, message: "\u914D\u7F6EID\u4E0D\u80FD\u4E3A\u7A7A" });
  }
  const upstreamId = parseInt(id, 10);
  if (isNaN(upstreamId)) {
    throw createError({ statusCode: 400, message: "\u65E0\u6548\u7684\u914D\u7F6EID" });
  }
  const body = await readBody(event);
  const { name, baseUrl, apiKey, apiKeys, aimodels, remark, sortOrder, upstreamPlatform, userApiKey } = body;
  const updateData = {};
  if (name !== void 0) {
    if (!name.trim()) {
      throw createError({ statusCode: 400, message: "\u914D\u7F6E\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A" });
    }
    updateData.name = name.trim();
  }
  if (baseUrl !== void 0) {
    if (!baseUrl.trim()) {
      throw createError({ statusCode: 400, message: "API\u5730\u5740\u4E0D\u80FD\u4E3A\u7A7A" });
    }
    updateData.baseUrl = baseUrl.trim();
  }
  if (apiKey !== void 0) {
    if (!apiKey.trim()) {
      throw createError({ statusCode: 400, message: "API\u5BC6\u94A5\u4E0D\u80FD\u4E3A\u7A7A" });
    }
    updateData.apiKey = apiKey.trim();
  }
  if (apiKeys !== void 0) {
    updateData.apiKeys = apiKeys;
  }
  if (remark !== void 0) {
    updateData.remark = (remark == null ? void 0 : remark.trim()) || null;
  }
  if (sortOrder !== void 0) {
    updateData.sortOrder = sortOrder;
  }
  if (upstreamPlatform !== void 0) {
    updateData.upstreamPlatform = upstreamPlatform;
  }
  if (userApiKey !== void 0) {
    updateData.userApiKey = userApiKey;
  }
  const upstreamService = useUpstreamService();
  const aimodelService = useAimodelService();
  const updated = await upstreamService.update(upstreamId, user.id, updateData);
  if (!updated) {
    throw createError({ statusCode: 404, message: "\u914D\u7F6E\u4E0D\u5B58\u5728\u6216\u65E0\u6743\u4FEE\u6539" });
  }
  if (aimodels !== void 0) {
    if (!Array.isArray(aimodels) || aimodels.length === 0) {
      throw createError({ statusCode: 400, message: "\u8BF7\u81F3\u5C11\u6DFB\u52A0\u4E00\u79CD\u6A21\u578B" });
    }
    for (const model of aimodels) {
      if (!API_FORMATS.includes(model.apiFormat)) {
        throw createError({ statusCode: 400, message: `\u4E0D\u652F\u6301\u7684API\u683C\u5F0F: ${model.apiFormat}` });
      }
      if (model.category === "image" && !IMAGE_MODEL_TYPES.includes(model.modelType)) {
        throw createError({ statusCode: 400, message: `\u4E0D\u652F\u6301\u7684\u7ED8\u56FE\u6A21\u578B\u7C7B\u578B: ${model.modelType}` });
      }
    }
    await aimodelService.syncByUpstream(
      upstreamId,
      aimodels.map((m) => ({
        id: m.id,
        // 传递 ID
        category: m.category,
        modelType: m.modelType,
        apiFormat: m.apiFormat,
        modelName: m.modelName,
        estimatedTime: m.estimatedTime,
        keyName: m.keyName
      }))
    );
  }
  return upstreamService.getById(upstreamId);
});

export { _id__put as default };
//# sourceMappingURL=_id_.put.mjs.map
