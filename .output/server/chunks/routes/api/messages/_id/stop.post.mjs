import { d as defineEventHandler, r as requireAuth, g as getRouterParam, c as createError } from '../../../../nitro/nitro.mjs';
import { u as useConversationService } from '../../../../_/conversation.mjs';
import { a as stopStreamingTask } from '../../../../_/streamingTask.mjs';
import { g as getStreamingSession } from '../../../../_/streamingCache.mjs';
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
import '../../../../_/assistant.mjs';
import '../../../../_/upstream.mjs';
import '../../../../_/aimodel.mjs';
import '../../../../_/chat.mjs';
import '../../../../_/file.mjs';
import '../../../../_/claude.mjs';
import '../../../../_/globalEvents.mjs';

const stop_post = defineEventHandler(async (event) => {
  const { user } = await requireAuth(event);
  const id = getRouterParam(event, "id");
  if (!id) {
    throw createError({ statusCode: 400, message: "\u6D88\u606FID\u4E0D\u80FD\u4E3A\u7A7A" });
  }
  const messageId = parseInt(id, 10);
  if (isNaN(messageId)) {
    throw createError({ statusCode: 400, message: "\u65E0\u6548\u7684\u6D88\u606FID" });
  }
  const conversationService = useConversationService();
  const message = await conversationService.getMessageById(messageId);
  if (!message) {
    throw createError({ statusCode: 404, message: "\u6D88\u606F\u4E0D\u5B58\u5728" });
  }
  const conversation = await conversationService.getById(message.conversationId);
  if (!conversation || conversation.userId !== user.id) {
    throw createError({ statusCode: 403, message: "\u65E0\u6743\u64CD\u4F5C\u6B64\u6D88\u606F" });
  }
  if (message.role !== "assistant") {
    throw createError({ statusCode: 400, message: "\u53EA\u80FD\u505C\u6B62 AI \u6D88\u606F" });
  }
  const status = message.status;
  if (status === "completed" || status === "stopped" || status === "failed") {
    return { success: true };
  }
  const session = getStreamingSession(messageId);
  if (!session) {
    if (status === "created" || status === "pending") {
      await conversationService.updateMessageContentAndStatus(messageId, "", "stopped");
    }
    return { success: true };
  }
  await stopStreamingTask(messageId);
  return { success: true };
});

export { stop_post as default };
//# sourceMappingURL=stop.post.mjs.map
