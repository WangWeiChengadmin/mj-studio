import { d as defineEventHandler, r as requireAuth, a as readBody, c as createError } from '../../nitro/nitro.mjs';
import { u as useConversationService } from '../../_/conversation.mjs';
import { u as useAssistantService } from '../../_/assistant.mjs';
import { e as emitToUser } from '../../_/globalEvents.mjs';
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
  const { assistantId, title } = body;
  if (!assistantId) {
    throw createError({ statusCode: 400, message: "\u8BF7\u6307\u5B9A\u52A9\u624B" });
  }
  const assistantService = useAssistantService();
  const assistant = await assistantService.getById(assistantId);
  if (!assistant || assistant.userId !== user.id) {
    throw createError({ statusCode: 400, message: "\u65E0\u6548\u7684\u52A9\u624B" });
  }
  const service = useConversationService();
  const conversation = await service.create({
    userId: user.id,
    assistantId,
    title: (title == null ? void 0 : title.trim()) || "\u65B0\u5BF9\u8BDD"
  });
  await emitToUser(user.id, "chat.conversation.created", {
    conversation: {
      id: conversation.id,
      userId: conversation.userId,
      assistantId: conversation.assistantId,
      title: conversation.title,
      createdAt: conversation.createdAt instanceof Date ? conversation.createdAt.toISOString() : conversation.createdAt,
      updatedAt: conversation.updatedAt instanceof Date ? conversation.updatedAt.toISOString() : conversation.updatedAt
    }
  });
  return conversation;
});

export { index_post as default };
//# sourceMappingURL=index.post2.mjs.map
