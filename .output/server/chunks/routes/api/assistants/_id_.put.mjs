import { d as defineEventHandler, r as requireAuth, g as getRouterParam, c as createError, a as readBody } from '../../../nitro/nitro.mjs';
import { u as useAssistantService } from '../../../_/assistant.mjs';
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
    throw createError({ statusCode: 400, message: "\u52A9\u624BID\u4E0D\u80FD\u4E3A\u7A7A" });
  }
  const assistantId = parseInt(id, 10);
  if (isNaN(assistantId)) {
    throw createError({ statusCode: 400, message: "\u65E0\u6548\u7684\u52A9\u624BID" });
  }
  const body = await readBody(event);
  const { name, description, avatar, systemPrompt, upstreamId, aimodelId, modelName, isDefault } = body;
  const updateData = {};
  if (name !== void 0) {
    if (!name.trim()) {
      throw createError({ statusCode: 400, message: "\u52A9\u624B\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A" });
    }
    updateData.name = name.trim();
  }
  if (description !== void 0) {
    updateData.description = (description == null ? void 0 : description.trim()) || null;
  }
  if (avatar !== void 0) {
    updateData.avatar = avatar || null;
  }
  if (systemPrompt !== void 0) {
    updateData.systemPrompt = (systemPrompt == null ? void 0 : systemPrompt.trim()) || null;
  }
  if (upstreamId !== void 0) {
    updateData.upstreamId = upstreamId || null;
  }
  if (aimodelId !== void 0) {
    updateData.aimodelId = aimodelId || null;
  }
  if (modelName !== void 0) {
    updateData.modelName = modelName || null;
  }
  if (isDefault !== void 0) {
    updateData.isDefault = isDefault;
  }
  const service = useAssistantService();
  const updated = await service.update(assistantId, user.id, updateData);
  if (!updated) {
    throw createError({ statusCode: 404, message: "\u52A9\u624B\u4E0D\u5B58\u5728\u6216\u65E0\u6743\u4FEE\u6539" });
  }
  return updated;
});

export { _id__put as default };
//# sourceMappingURL=_id_.put.mjs.map
