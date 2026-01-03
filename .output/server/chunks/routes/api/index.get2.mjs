import { d as defineEventHandler, r as requireAuth, e as getQuery, c as createError } from '../../nitro/nitro.mjs';
import { u as useConversationService } from '../../_/conversation.mjs';
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

const index_get = defineEventHandler(async (event) => {
  const { user } = await requireAuth(event);
  const query = getQuery(event);
  const assistantId = parseInt(query.assistantId, 10);
  if (!assistantId || isNaN(assistantId)) {
    throw createError({ statusCode: 400, message: "\u8BF7\u6307\u5B9A\u52A9\u624BID" });
  }
  const service = useConversationService();
  return service.listByAssistant(user.id, assistantId);
});

export { index_get as default };
//# sourceMappingURL=index.get2.mjs.map
