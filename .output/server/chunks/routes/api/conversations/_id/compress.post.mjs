import { d as defineEventHandler, r as requireAuth, g as getRouterParam, c as createError } from '../../../../nitro/nitro.mjs';
import { u as useConversationService } from '../../../../_/conversation.mjs';
import { u as useUserSettingsService } from '../../../../_/userSettings.mjs';
import { U as USER_SETTING_KEYS } from '../../../../_/constants.mjs';
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

const compress_post = defineEventHandler(async (event) => {
  const { user } = await requireAuth(event);
  const id = getRouterParam(event, "id");
  if (!id) {
    throw createError({ statusCode: 400, message: "\u5BF9\u8BDDID\u4E0D\u80FD\u4E3A\u7A7A" });
  }
  const conversationId = parseInt(id, 10);
  if (isNaN(conversationId)) {
    throw createError({ statusCode: 400, message: "\u65E0\u6548\u7684\u5BF9\u8BDDID" });
  }
  const settingsService = useUserSettingsService();
  const compressKeepCount = await settingsService.get(user.id, USER_SETTING_KEYS.GENERAL_COMPRESS_KEEP_COUNT);
  const compressPrompt = await settingsService.get(user.id, USER_SETTING_KEYS.PROMPT_COMPRESS);
  const conversationService = useConversationService();
  const result = await conversationService.getWithMessages(conversationId);
  if (!result) {
    throw createError({ statusCode: 404, message: "\u5BF9\u8BDD\u4E0D\u5B58\u5728" });
  }
  if (result.conversation.userId !== user.id) {
    throw createError({ statusCode: 403, message: "\u65E0\u6743\u8BBF\u95EE\u6B64\u5BF9\u8BDD" });
  }
  const { messages } = result;
  const validMessages = messages.filter((m) => m.mark !== "compress-request");
  if (validMessages.length < compressKeepCount + 2) {
    throw createError({ statusCode: 400, message: "\u5BF9\u8BDD\u6D88\u606F\u592A\u5C11\uFF0C\u65E0\u9700\u538B\u7F29" });
  }
  let lastCompressIndex = -1;
  for (let i = validMessages.length - 1; i >= 0; i--) {
    if (validMessages[i].mark === "compress-response") {
      lastCompressIndex = i;
      break;
    }
  }
  const startIndex = lastCompressIndex >= 0 ? lastCompressIndex : 0;
  const endIndex = validMessages.length - compressKeepCount;
  if (endIndex <= startIndex) {
    throw createError({ statusCode: 400, message: "\u53EF\u538B\u7F29\u7684\u6D88\u606F\u592A\u5C11" });
  }
  const messagesToCompress = validMessages.slice(startIndex, endIndex);
  const keepMessages = validMessages.slice(endIndex);
  if (messagesToCompress.length < 2) {
    throw createError({ statusCode: 400, message: "\u53EF\u538B\u7F29\u7684\u6D88\u606F\u592A\u5C11" });
  }
  const messagesContent = messagesToCompress.map((m) => `${m.role === "user" ? "\u7528\u6237" : "AI"}: ${m.content}`).join("\n\n");
  const finalPrompt = compressPrompt.replace("{messages}", messagesContent);
  const lastCompressMsg = messagesToCompress[messagesToCompress.length - 1];
  const compressRequestSortId = (lastCompressMsg.sortId || lastCompressMsg.id) + 1;
  const compressRequest = await conversationService.addMessage({
    conversationId,
    role: "user",
    content: finalPrompt,
    mark: "compress-request",
    sortId: compressRequestSortId
  });
  for (let i = 0; i < keepMessages.length; i++) {
    const newSortId = compressRequestSortId + 2 + i;
    await conversationService.updateMessageSortId(keepMessages[i].id, newSortId);
  }
  return {
    success: true,
    compressRequest,
    stats: {
      messagesToCompressCount: messagesToCompress.length,
      keepMessagesCount: keepMessages.length,
      compressRequestSortId
    }
  };
});

export { compress_post as default };
//# sourceMappingURL=compress.post.mjs.map
