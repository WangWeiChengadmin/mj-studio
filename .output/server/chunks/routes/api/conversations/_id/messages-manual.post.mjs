import { d as defineEventHandler, r as requireAuth, g as getRouterParam, c as createError, a as readBody } from '../../../../nitro/nitro.mjs';
import { u as useConversationService } from '../../../../_/conversation.mjs';
import { e as emitToUser } from '../../../../_/globalEvents.mjs';
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

const messagesManual_post = defineEventHandler(async (event) => {
  const { user } = await requireAuth(event);
  const id = getRouterParam(event, "id");
  if (!id) {
    throw createError({ statusCode: 400, message: "\u5BF9\u8BDDID\u4E0D\u80FD\u4E3A\u7A7A" });
  }
  const conversationId = parseInt(id, 10);
  if (isNaN(conversationId)) {
    throw createError({ statusCode: 400, message: "\u65E0\u6548\u7684\u5BF9\u8BDDID" });
  }
  const body = await readBody(event);
  const { content, role } = body;
  if (!(content == null ? void 0 : content.trim())) {
    throw createError({ statusCode: 400, message: "\u6D88\u606F\u5185\u5BB9\u4E0D\u80FD\u4E3A\u7A7A" });
  }
  if (!["user", "assistant"].includes(role)) {
    throw createError({ statusCode: 400, message: "\u65E0\u6548\u7684\u6D88\u606F\u89D2\u8272" });
  }
  const conversationService = useConversationService();
  const result = await conversationService.getById(conversationId);
  if (!result) {
    throw createError({ statusCode: 404, message: "\u5BF9\u8BDD\u4E0D\u5B58\u5728" });
  }
  if (result.userId !== user.id) {
    throw createError({ statusCode: 403, message: "\u65E0\u6743\u8BBF\u95EE\u6B64\u5BF9\u8BDD" });
  }
  const message = await conversationService.addMessage({
    conversationId,
    role,
    content: content.trim()
  });
  await emitToUser(user.id, "chat.message.created", {
    conversationId,
    message: {
      id: message.id,
      conversationId: message.conversationId,
      role: message.role,
      content: message.content,
      files: message.files,
      status: message.status,
      mark: message.mark,
      sortId: message.sortId,
      createdAt: message.createdAt instanceof Date ? message.createdAt.toISOString() : message.createdAt
    }
  });
  return message;
});

export { messagesManual_post as default };
//# sourceMappingURL=messages-manual.post.mjs.map
