import { d as defineEventHandler, r as requireAuth, a as readBody, c as createError } from '../../nitro/nitro.mjs';
import { u as useUserSettingsService } from '../../_/userSettings.mjs';
import { U as USER_SETTING_KEYS } from '../../_/constants.mjs';
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

const index_put = defineEventHandler(async (event) => {
  const { user } = await requireAuth(event);
  const body = await readBody(event);
  if (!body || typeof body !== "object") {
    throw createError({ statusCode: 400, message: "\u8BF7\u6C42\u4F53\u683C\u5F0F\u9519\u8BEF" });
  }
  const validKeys = Object.values(USER_SETTING_KEYS);
  const updates = {};
  for (const [key, value] of Object.entries(body)) {
    if (validKeys.includes(key)) {
      updates[key] = value;
    }
  }
  if (Object.keys(updates).length === 0) {
    throw createError({ statusCode: 400, message: "\u6CA1\u6709\u6709\u6548\u7684\u8BBE\u7F6E\u9879" });
  }
  const settingsService = useUserSettingsService();
  await settingsService.setMany(user.id, updates);
  const settings = await settingsService.getAll(user.id);
  return settings;
});

export { index_put as default };
//# sourceMappingURL=index.put.mjs.map
