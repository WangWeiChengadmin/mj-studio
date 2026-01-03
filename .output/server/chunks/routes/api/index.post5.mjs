import { d as defineEventHandler, r as requireAuth, a as readBody, c as createError } from '../../nitro/nitro.mjs';
import { u as useUpstreamService } from '../../_/upstream.mjs';
import { u as useAimodelService } from '../../_/aimodel.mjs';
import { A as API_FORMATS, I as IMAGE_MODEL_TYPES } from '../../_/constants.mjs';
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

const index_post = defineEventHandler(async (event) => {
  const { user } = await requireAuth(event);
  const body = await readBody(event);
  const { name, baseUrl, apiKey, apiKeys, aimodels, remark, sortOrder, upstreamPlatform, userApiKey } = body;
  if (!(name == null ? void 0 : name.trim())) {
    throw createError({ statusCode: 400, message: "\u8BF7\u8F93\u5165\u914D\u7F6E\u540D\u79F0" });
  }
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
  if (!(baseUrl == null ? void 0 : baseUrl.trim())) {
    throw createError({ statusCode: 400, message: "\u8BF7\u8F93\u5165API\u5730\u5740" });
  }
  if (!(apiKey == null ? void 0 : apiKey.trim())) {
    throw createError({ statusCode: 400, message: "\u8BF7\u8F93\u5165API\u5BC6\u94A5" });
  }
  const upstreamService = useUpstreamService();
  const aimodelService = useAimodelService();
  const upstream = await upstreamService.create({
    userId: user.id,
    name: name.trim(),
    baseUrl: baseUrl.trim(),
    apiKey: apiKey.trim(),
    apiKeys,
    remark: (remark == null ? void 0 : remark.trim()) || void 0,
    sortOrder,
    upstreamPlatform,
    userApiKey
  });
  const createdModels = await aimodelService.createMany(
    aimodels.map((m) => ({
      upstreamId: upstream.id,
      category: m.category,
      modelType: m.modelType,
      apiFormat: m.apiFormat,
      modelName: m.modelName,
      estimatedTime: m.estimatedTime,
      keyName: m.keyName
    }))
  );
  return { ...upstream, aimodels: createdModels };
});

export { index_post as default };
//# sourceMappingURL=index.post5.mjs.map
