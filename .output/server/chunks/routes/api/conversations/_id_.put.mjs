import { d as defineEventHandler, r as requireAuth, g as getRouterParam, c as createError, a as readBody } from '../../../nitro/nitro.mjs';
import { u as useConversationService } from '../../../_/conversation.mjs';
import { e as emitToUser } from '../../../_/globalEvents.mjs';
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
    throw createError({ statusCode: 400, message: "\u5BF9\u8BDDID\u4E0D\u80FD\u4E3A\u7A7A" });
  }
  const conversationId = parseInt(id, 10);
  if (isNaN(conversationId)) {
    throw createError({ statusCode: 400, message: "\u65E0\u6548\u7684\u5BF9\u8BDDID" });
  }
  const body = await readBody(event);
  const { title } = body;
  if (!(title == null ? void 0 : title.trim())) {
    throw createError({ statusCode: 400, message: "\u5BF9\u8BDD\u6807\u9898\u4E0D\u80FD\u4E3A\u7A7A" });
  }
  const service = useConversationService();
  const updated = await service.updateTitle(conversationId, user.id, title.trim());
  if (!updated) {
    throw createError({ statusCode: 404, message: "\u5BF9\u8BDD\u4E0D\u5B58\u5728\u6216\u65E0\u6743\u4FEE\u6539" });
  }
  await emitToUser(user.id, "chat.conversation.updated", {
    conversation: {
      id: updated.id,
      title: updated.title,
      updatedAt: updated.updatedAt instanceof Date ? updated.updatedAt.toISOString() : updated.updatedAt
    }
  });
  return updated;
});

export { _id__put as default };
//# sourceMappingURL=_id_.put.mjs.map
