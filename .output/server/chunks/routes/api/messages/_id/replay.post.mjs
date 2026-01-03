import { d as defineEventHandler, r as requireAuth, g as getRouterParam, c as createError } from '../../../../nitro/nitro.mjs';
import { u as useConversationService } from '../../../../_/conversation.mjs';
import { s as startStreamingTask } from '../../../../_/streamingTask.mjs';
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
import '../../../../_/assistant.mjs';
import '../../../../_/upstream.mjs';
import '../../../../_/aimodel.mjs';
import '../../../../_/chat.mjs';
import '../../../../_/file.mjs';
import '../../../../_/claude.mjs';
import '../../../../_/streamingCache.mjs';

const replay_post = defineEventHandler(async (event) => {
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
  const result = await conversationService.getWithMessages(message.conversationId);
  if (!result) {
    throw createError({ statusCode: 404, message: "\u5BF9\u8BDD\u4E0D\u5B58\u5728" });
  }
  if (result.conversation.userId !== user.id) {
    throw createError({ statusCode: 403, message: "\u65E0\u6743\u8BBF\u95EE\u6B64\u5BF9\u8BDD" });
  }
  let userMessageContent;
  if (message.role === "user") {
    userMessageContent = message.content;
  } else {
    const msgIndex = result.messages.findIndex((m) => m.id === messageId);
    const previousMessages = result.messages.slice(0, msgIndex);
    const lastUserMsg = [...previousMessages].reverse().find((m) => m.role === "user");
    if (!lastUserMsg) {
      throw createError({ statusCode: 400, message: "\u627E\u4E0D\u5230\u5BF9\u5E94\u7684\u7528\u6237\u6D88\u606F" });
    }
    userMessageContent = lastUserMsg.content;
    await conversationService.removeMessage(messageId, user.id);
    await emitToUser(user.id, "chat.message.deleted", {
      conversationId: message.conversationId,
      messageId
    });
  }
  const assistantMessage = await conversationService.addMessage({
    conversationId: message.conversationId,
    role: "assistant",
    content: "",
    status: "created"
  });
  await emitToUser(user.id, "chat.message.created", {
    conversationId: message.conversationId,
    message: {
      id: assistantMessage.id,
      conversationId: message.conversationId,
      role: "assistant",
      content: "",
      files: null,
      status: "created",
      mark: null,
      sortId: null,
      createdAt: assistantMessage.createdAt,
      updatedAt: assistantMessage.updatedAt
    }
  });
  setImmediate(() => {
    startStreamingTask({
      messageId: assistantMessage.id,
      conversationId: message.conversationId,
      userId: user.id,
      userContent: userMessageContent
    }).catch((err) => {
      console.error("\u91CD\u653E\u6D41\u5F0F\u751F\u6210\u4EFB\u52A1\u5931\u8D25:", err);
    });
  });
  return {
    assistantMessageId: assistantMessage.id
  };
});

export { replay_post as default };
//# sourceMappingURL=replay.post.mjs.map
