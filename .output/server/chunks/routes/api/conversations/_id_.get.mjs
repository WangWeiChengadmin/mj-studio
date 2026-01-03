import { d as defineEventHandler, r as requireAuth, g as getRouterParam, c as createError } from '../../../nitro/nitro.mjs';
import { u as useConversationService } from '../../../_/conversation.mjs';
import { g as getStreamingSession } from '../../../_/streamingCache.mjs';
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
    throw createError({ statusCode: 400, message: "\u5BF9\u8BDDID\u4E0D\u80FD\u4E3A\u7A7A" });
  }
  const conversationId = parseInt(id, 10);
  if (isNaN(conversationId)) {
    throw createError({ statusCode: 400, message: "\u65E0\u6548\u7684\u5BF9\u8BDDID" });
  }
  const service = useConversationService();
  const result = await service.getWithMessages(conversationId);
  if (!result) {
    throw createError({ statusCode: 404, message: "\u5BF9\u8BDD\u4E0D\u5B58\u5728" });
  }
  if (result.conversation.userId !== user.id) {
    throw createError({ statusCode: 403, message: "\u65E0\u6743\u8BBF\u95EE\u6B64\u5BF9\u8BDD" });
  }
  for (const msg of result.messages) {
    if (msg.role === "assistant" && (msg.status === "created" || msg.status === "pending" || msg.status === "streaming") && !msg.content) {
      const session = getStreamingSession(msg.id);
      if (session == null ? void 0 : session.content) {
        msg.content = session.content;
      }
    }
  }
  return result;
});

export { _id__get as default };
//# sourceMappingURL=_id_.get.mjs.map
