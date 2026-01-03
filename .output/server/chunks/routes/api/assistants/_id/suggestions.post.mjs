import { d as defineEventHandler, r as requireAuth, g as getRouterParam, c as createError, a as readBody } from '../../../../nitro/nitro.mjs';
import { u as useAssistantService } from '../../../../_/assistant.mjs';
import { u as useUpstreamService } from '../../../../_/upstream.mjs';
import { u as useAimodelService } from '../../../../_/aimodel.mjs';
import { u as useUserSettingsService } from '../../../../_/userSettings.mjs';
import { c as createChatService } from '../../../../_/chat.mjs';
import { c as createClaudeChatService } from '../../../../_/claude.mjs';
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

const suggestions_post = defineEventHandler(async (event) => {
  const { user } = await requireAuth(event);
  const id = getRouterParam(event, "id");
  if (!id) {
    throw createError({ statusCode: 400, message: "\u52A9\u624BID\u4E0D\u80FD\u4E3A\u7A7A" });
  }
  const assistantId = parseInt(id, 10);
  if (isNaN(assistantId)) {
    throw createError({ statusCode: 400, message: "\u65E0\u6548\u7684\u52A9\u624BID" });
  }
  const body = await readBody(event);
  const refresh = (body == null ? void 0 : body.refresh) === true;
  const assistantService = useAssistantService();
  const assistant = await assistantService.getById(assistantId);
  if (!assistant) {
    throw createError({ statusCode: 404, message: "\u52A9\u624B\u4E0D\u5B58\u5728" });
  }
  if (assistant.userId !== user.id) {
    throw createError({ statusCode: 403, message: "\u65E0\u6743\u8BBF\u95EE\u6B64\u52A9\u624B" });
  }
  if (!assistant.upstreamId || !assistant.aimodelId || !assistant.modelName) {
    return { suggestions: [] };
  }
  if (!refresh && assistant.suggestions && assistant.suggestions.length > 0) {
    return { suggestions: assistant.suggestions };
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
  const suggestionsPrompt = await settingsService.get(user.id, USER_SETTING_KEYS.PROMPT_SUGGESTIONS);
  const suggestionsCount = await settingsService.get(user.id, USER_SETTING_KEYS.GENERAL_SUGGESTIONS_COUNT);
  const now = /* @__PURE__ */ new Date();
  const timeStr = now.toLocaleString("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    weekday: "long"
  });
  const prompt = suggestionsPrompt.replace("{time}", timeStr);
  const apiFormat = aimodel.apiFormat;
  const keyName = aimodel.keyName;
  const chatService = apiFormat === "claude" ? createClaudeChatService(upstream, keyName) : createChatService(upstream, keyName);
  const logContext = {
    type: "\u5F00\u573A\u767D",
    assistantId,
    assistantName: assistant.name,
    keyName
  };
  try {
    const response = await chatService.chat(
      assistant.modelName,
      assistant.systemPrompt || "\u4F60\u662F\u4E00\u4E2A\u667A\u80FD\u52A9\u624B\u3002",
      [],
      prompt,
      void 0,
      void 0,
      logContext
    );
    if (!response.success || !response.content) {
      throw new Error(response.error || "\u751F\u6210\u5931\u8D25");
    }
    let suggestions = [];
    try {
      const content = response.content.trim();
      const jsonMatch = content.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        suggestions = JSON.parse(jsonMatch[0]);
      }
    } catch {
      console.error("\u89E3\u6790\u5F00\u573A\u767D JSON \u5931\u8D25:", response.content);
    }
    suggestions = suggestions.filter((s) => typeof s === "string" && s.trim().length > 0).slice(0, suggestionsCount);
    if (suggestions.length > 0) {
      await assistantService.update(assistantId, user.id, { suggestions });
    }
    return { suggestions };
  } catch (error) {
    console.error("\u751F\u6210\u5F00\u573A\u767D\u5931\u8D25:", error);
    return { suggestions: [] };
  }
});

export { suggestions_post as default };
//# sourceMappingURL=suggestions.post.mjs.map
