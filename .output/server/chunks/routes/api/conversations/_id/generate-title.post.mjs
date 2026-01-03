import { d as defineEventHandler, r as requireAuth, g as getRouterParam, c as createError, l as logTitleResponse } from '../../../../nitro/nitro.mjs';
import { u as useConversationService } from '../../../../_/conversation.mjs';
import { u as useAssistantService } from '../../../../_/assistant.mjs';
import { u as useUpstreamService } from '../../../../_/upstream.mjs';
import { u as useAimodelService } from '../../../../_/aimodel.mjs';
import { u as useUserSettingsService } from '../../../../_/userSettings.mjs';
import { c as createChatService } from '../../../../_/chat.mjs';
import { c as createClaudeChatService } from '../../../../_/claude.mjs';
import { e as emitToUser } from '../../../../_/globalEvents.mjs';
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
import '../../../../_/file.mjs';

const generateTitle_post = defineEventHandler(async (event) => {
  const { user } = await requireAuth(event);
  const id = getRouterParam(event, "id");
  if (!id) {
    throw createError({ statusCode: 400, message: "\u5BF9\u8BDDID\u4E0D\u80FD\u4E3A\u7A7A" });
  }
  const conversationId = parseInt(id, 10);
  if (isNaN(conversationId)) {
    throw createError({ statusCode: 400, message: "\u65E0\u6548\u7684\u5BF9\u8BDDID" });
  }
  const conversationService = useConversationService();
  const result = await conversationService.getWithMessages(conversationId);
  if (!result) {
    throw createError({ statusCode: 404, message: "\u5BF9\u8BDD\u4E0D\u5B58\u5728" });
  }
  if (result.conversation.userId !== user.id) {
    throw createError({ statusCode: 403, message: "\u65E0\u6743\u8BBF\u95EE\u6B64\u5BF9\u8BDD" });
  }
  const { messages } = result;
  if (messages.length === 0) {
    throw createError({ statusCode: 400, message: "\u5BF9\u8BDD\u6CA1\u6709\u6D88\u606F" });
  }
  const assistantService = useAssistantService();
  const assistant = await assistantService.getById(result.conversation.assistantId);
  if (!assistant || !assistant.upstreamId || !assistant.aimodelId || !assistant.modelName) {
    throw createError({ statusCode: 400, message: "\u8BF7\u5148\u4E3A\u52A9\u624B\u914D\u7F6E\u6A21\u578B" });
  }
  const upstreamService = useUpstreamService();
  const upstream = await upstreamService.getByIdSimple(assistant.upstreamId);
  if (!upstream) {
    throw createError({ statusCode: 404, message: "\u4E0A\u6E38\u914D\u7F6E\u4E0D\u5B58\u5728" });
  }
  const aimodelService = useAimodelService();
  const aimodel = await aimodelService.getById(assistant.aimodelId);
  if (!aimodel) {
    throw createError({ statusCode: 404, message: "\u6A21\u578B\u914D\u7F6E\u4E0D\u5B58\u5728" });
  }
  const settingsService = useUserSettingsService();
  const titlePrompt = await settingsService.get(user.id, USER_SETTING_KEYS.PROMPT_GENERATE_TITLE);
  const titleMaxLength = await settingsService.get(user.id, USER_SETTING_KEYS.GENERAL_TITLE_MAX_LENGTH);
  const contextMessages = [];
  for (let i = 0; i < Math.min(2, messages.length); i++) {
    const msg = messages[i];
    contextMessages.push(`${msg.role === "user" ? "\u7528\u6237" : "AI"}: ${msg.content.slice(0, 200)}`);
  }
  if (messages.length > 2) {
    const startIdx = Math.max(messages.length - 2, 2);
    for (let i = startIdx; i < messages.length; i++) {
      const msg = messages[i];
      contextMessages.push(`${msg.role === "user" ? "\u7528\u6237" : "AI"}: ${msg.content.slice(0, 200)}`);
    }
  }
  const contextContent = contextMessages.join("\n\n");
  const prompt = titlePrompt.replace("{context}", contextContent);
  const apiFormat = aimodel.apiFormat;
  const keyName = aimodel.keyName;
  const chatService = apiFormat === "claude" ? createClaudeChatService(upstream, keyName) : createChatService(upstream, keyName);
  const logContext = {
    type: "\u6807\u9898",
    conversationId,
    conversationTitle: result.conversation.title,
    keyName
  };
  const startTime = Date.now();
  try {
    const response = await chatService.chat(
      assistant.modelName,
      "\u4F60\u662F\u4E00\u4E2A\u6807\u9898\u751F\u6210\u52A9\u624B\uFF0C\u64C5\u957F\u6839\u636E\u5BF9\u8BDD\u5185\u5BB9\u751F\u6210\u7B80\u6D01\u51C6\u786E\u7684\u6807\u9898\u3002",
      [],
      prompt,
      void 0,
      // userFiles
      void 0,
      // signal
      logContext
    );
    if (!response.success || !response.content) {
      throw new Error(response.error || "\u751F\u6210\u5931\u8D25");
    }
    let title = response.content.replace(/^["'"「『【]|["'"」』】]$/g, "").replace(/\n/g, "").trim();
    if (title.length > titleMaxLength) {
      title = title.slice(0, titleMaxLength) + "...";
    }
    const updated = await conversationService.updateTitle(conversationId, user.id, title);
    logTitleResponse(logContext, title, Date.now() - startTime);
    if (updated) {
      await emitToUser(user.id, "chat.conversation.updated", {
        conversation: {
          id: updated.id,
          title: updated.title,
          updatedAt: updated.updatedAt instanceof Date ? updated.updatedAt.toISOString() : updated.updatedAt
        }
      });
    }
    return { title };
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: error.message || "\u751F\u6210\u6807\u9898\u5931\u8D25"
    });
  }
});

export { generateTitle_post as default };
//# sourceMappingURL=generate-title.post.mjs.map
