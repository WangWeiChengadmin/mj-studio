import { d as defineEventHandler, r as requireAuth, a as readBody, c as createError } from '../../nitro/nitro.mjs';
import { u as useAssistantService } from '../../_/assistant.mjs';
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
  const { name, description, avatar, systemPrompt, upstreamId, aimodelId, modelName, isDefault } = body;
  if (!(name == null ? void 0 : name.trim())) {
    throw createError({ statusCode: 400, message: "\u8BF7\u8F93\u5165\u52A9\u624B\u540D\u79F0" });
  }
  const service = useAssistantService();
  const assistant = await service.create({
    userId: user.id,
    name: name.trim(),
    description: (description == null ? void 0 : description.trim()) || void 0,
    avatar: avatar || void 0,
    systemPrompt: (systemPrompt == null ? void 0 : systemPrompt.trim()) || void 0,
    upstreamId: upstreamId || void 0,
    aimodelId: aimodelId || void 0,
    modelName: modelName || void 0,
    isDefault: isDefault != null ? isDefault : false
  });
  return assistant;
});

export { index_post as default };
//# sourceMappingURL=index.post.mjs.map
