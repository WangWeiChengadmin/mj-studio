import { d as defineEventHandler, r as requireAuth, g as getRouterParam, c as createError, a as readBody } from '../../../../nitro/nitro.mjs';
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

const messages_post = defineEventHandler(async (event) => {
  var _a, _b, _c;
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
  const { content, files, isCompressRequest = false } = body;
  console.log("[Messages] \u6536\u5230\u8BF7\u6C42 | content:", content == null ? void 0 : content.slice(0, 30), "| files:", (_a = files == null ? void 0 : files.length) != null ? _a : 0, "\u4E2A\u6587\u4EF6");
  if (files == null ? void 0 : files.length) {
    console.log("[Messages] \u6587\u4EF6\u8BE6\u60C5:", files.map((f) => `${f.name} (${f.mimeType})`).join(", "));
  }
  if (!(content == null ? void 0 : content.trim()) && (!files || files.length === 0)) {
    throw createError({ statusCode: 400, message: "\u6D88\u606F\u5185\u5BB9\u4E0D\u80FD\u4E3A\u7A7A" });
  }
  const conversationService = useConversationService();
  const result = await conversationService.getWithMessages(conversationId);
  if (!result) {
    throw createError({ statusCode: 404, message: "\u5BF9\u8BDD\u4E0D\u5B58\u5728" });
  }
  if (result.conversation.userId !== user.id) {
    throw createError({ statusCode: 403, message: "\u65E0\u6743\u8BBF\u95EE\u6B64\u5BF9\u8BDD" });
  }
  let userMessage = null;
  let responseMark = void 0;
  let responseSortId = void 0;
  if (isCompressRequest) {
    const compressRequestMsg = result.messages.find((m) => m.mark === "compress-request" && m.content === content.trim());
    if (compressRequestMsg) {
      responseSortId = (compressRequestMsg.sortId || compressRequestMsg.id) + 1;
      responseMark = "compress-response";
    }
  } else {
    userMessage = await conversationService.addMessage({
      conversationId,
      role: "user",
      content: (content == null ? void 0 : content.trim()) || "",
      files: files && files.length > 0 ? files : void 0
    });
    await emitToUser(user.id, "chat.message.created", {
      conversationId,
      message: {
        id: userMessage.id,
        conversationId,
        role: "user",
        content: userMessage.content,
        files: userMessage.files || null,
        status: null,
        mark: userMessage.mark || null,
        sortId: userMessage.sortId || null,
        createdAt: userMessage.createdAt,
        updatedAt: userMessage.updatedAt
      }
    });
    if (result.messages.length === 0) {
      const title = conversationService.generateTitle((content == null ? void 0 : content.trim()) || (((_b = files == null ? void 0 : files[0]) == null ? void 0 : _b.name) || "\u65B0\u5BF9\u8BDD"));
      await conversationService.updateTitle(conversationId, user.id, title);
    }
  }
  const assistantMessage = await conversationService.addMessage({
    conversationId,
    role: "assistant",
    content: "",
    // 初始内容为空
    status: "created",
    mark: responseMark,
    sortId: responseSortId
  });
  await emitToUser(user.id, "chat.message.created", {
    conversationId,
    message: {
      id: assistantMessage.id,
      conversationId,
      role: "assistant",
      content: "",
      files: null,
      status: "created",
      mark: assistantMessage.mark || null,
      sortId: assistantMessage.sortId || null,
      createdAt: assistantMessage.createdAt,
      updatedAt: assistantMessage.updatedAt
    }
  });
  setImmediate(() => {
    startStreamingTask({
      messageId: assistantMessage.id,
      conversationId,
      userId: user.id,
      userContent: (content == null ? void 0 : content.trim()) || "",
      userFiles: files,
      isCompressRequest,
      responseMark,
      responseSortId
    }).catch((err) => {
      console.error("\u6D41\u5F0F\u751F\u6210\u4EFB\u52A1\u5931\u8D25:", err);
    });
  });
  return {
    userMessageId: (_c = userMessage == null ? void 0 : userMessage.id) != null ? _c : null,
    assistantMessageId: assistantMessage.id
  };
});

export { messages_post as default };
//# sourceMappingURL=messages.post.mjs.map
