import { d as defineEventHandler, r as requireAuth, g as getRouterParam, c as createError } from '../../../nitro/nitro.mjs';
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

const _id__get = defineEventHandler(async (event) => {
  const { user } = await requireAuth(event);
  const id = getRouterParam(event, "id");
  if (!id) {
    throw createError({ statusCode: 400, message: "\u52A9\u624BID\u4E0D\u80FD\u4E3A\u7A7A" });
  }
  const assistantId = parseInt(id, 10);
  if (isNaN(assistantId)) {
    throw createError({ statusCode: 400, message: "\u65E0\u6548\u7684\u52A9\u624BID" });
  }
  const service = useAssistantService();
  const assistant = await service.getById(assistantId);
  if (!assistant) {
    throw createError({ statusCode: 404, message: "\u52A9\u624B\u4E0D\u5B58\u5728" });
  }
  if (assistant.userId !== user.id) {
    throw createError({ statusCode: 403, message: "\u65E0\u6743\u8BBF\u95EE\u6B64\u52A9\u624B" });
  }
  return assistant;
});

export { _id__get as default };
//# sourceMappingURL=_id_.get.mjs.map
