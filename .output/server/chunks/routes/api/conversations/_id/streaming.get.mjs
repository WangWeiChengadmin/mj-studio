import { d as defineEventHandler, r as requireAuth, g as getRouterParam, c as createError } from '../../../../nitro/nitro.mjs';
import { f as findActiveSession } from '../../../../_/streamingCache.mjs';
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

const streaming_get = defineEventHandler(async (event) => {
  const { user } = await requireAuth(event);
  const id = getRouterParam(event, "id");
  if (!id) {
    throw createError({ statusCode: 400, message: "\u5BF9\u8BDDID\u4E0D\u80FD\u4E3A\u7A7A" });
  }
  const conversationId = parseInt(id, 10);
  if (isNaN(conversationId)) {
    throw createError({ statusCode: 400, message: "\u65E0\u6548\u7684\u5BF9\u8BDDID" });
  }
  const session = findActiveSession(conversationId, user.id);
  if (!session) {
    return { streaming: false, content: "" };
  }
  return {
    streaming: true,
    content: session.content,
    startedAt: session.startedAt,
    messageId: session.messageId
  };
});

export { streaming_get as default };
//# sourceMappingURL=streaming.get.mjs.map
