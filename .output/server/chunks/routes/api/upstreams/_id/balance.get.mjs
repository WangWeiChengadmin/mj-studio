import { d as defineEventHandler, r as requireAuth, g as getRouterParam, c as createError } from '../../../../nitro/nitro.mjs';
import { u as useUpstreamService } from '../../../../_/upstream.mjs';
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

function parseUserApiKey(userApiKey) {
  const colonIndex = userApiKey.indexOf(":");
  if (colonIndex > 0) {
    return {
      userId: userApiKey.slice(0, colonIndex),
      apiKey: userApiKey.slice(colonIndex + 1)
    };
  }
  return { apiKey: userApiKey };
}
async function queryBalance(baseUrl, userApiKey, platform) {
  try {
    const { userId, apiKey } = parseUserApiKey(userApiKey);
    switch (platform) {
      case "oneapi":
        return await queryOneApiBalance(baseUrl, apiKey, userId, "New-Api-User");
      case "n1n":
        return await queryOneApiBalance(baseUrl, apiKey, userId, "Rix-Api-User");
      case "yunwu":
        return { success: false, error: "\u4E91\u96FE\u6682\u4E0D\u652F\u6301 API \u4F59\u989D\u67E5\u8BE2" };
      default:
        return { success: false, error: "\u4E0D\u652F\u6301\u7684\u4F59\u989D\u67E5\u8BE2\u7C7B\u578B" };
    }
  } catch (error) {
    return { success: false, error: error.message || "\u67E5\u8BE2\u5931\u8D25" };
  }
}
async function queryOneApiBalance(baseUrl, apiKey, userId, userIdHeader) {
  const url = `${baseUrl.replace(/\/$/, "")}/api/user/self`;
  const headers = {
    "Authorization": `Bearer ${apiKey}`,
    "Content-Type": "application/json"
  };
  if (userId && userIdHeader) {
    headers[userIdHeader] = userId;
  }
  const response = await fetch(url, {
    method: "GET",
    headers
  });
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }
  const data = await response.json();
  if (data.success && data.data) {
    const d = data.data;
    const quota = d.quota || 0;
    const usedQuota = d.used_quota || 0;
    const upstreamInfo = {
      userId: d.id,
      username: d.username,
      displayName: d.display_name,
      email: d.email,
      quota,
      usedQuota,
      group: d.group,
      queriedAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    return {
      success: true,
      upstreamInfo
    };
  }
  return { success: false, error: data.message || "\u67E5\u8BE2\u5931\u8D25" };
}

const balance_get = defineEventHandler(async (event) => {
  const { user } = await requireAuth(event);
  const id = Number(getRouterParam(event, "id"));
  if (!id || isNaN(id)) {
    throw createError({ statusCode: 400, message: "\u65E0\u6548\u7684\u914D\u7F6EID" });
  }
  const upstreamService = useUpstreamService();
  const upstream = await upstreamService.getByIdSimple(id);
  if (!upstream || upstream.userId !== user.id) {
    throw createError({ statusCode: 404, message: "\u914D\u7F6E\u4E0D\u5B58\u5728" });
  }
  if (!upstream.upstreamPlatform) {
    return { success: false, error: "\u8BE5\u914D\u7F6E\u672A\u8BBE\u7F6E\u4F59\u989D\u67E5\u8BE2\u7C7B\u578B" };
  }
  if (!upstream.userApiKey) {
    return { success: false, error: "\u672A\u914D\u7F6E\u7528\u4E8E\u67E5\u8BE2\u4F59\u989D\u7684 API Key" };
  }
  const result = await queryBalance(
    upstream.baseUrl,
    upstream.userApiKey,
    upstream.upstreamPlatform
  );
  if (result.success && result.upstreamInfo) {
    await upstreamService.updateUpstreamInfo(id, result.upstreamInfo);
  }
  return result;
});

export { balance_get as default };
//# sourceMappingURL=balance.get.mjs.map
