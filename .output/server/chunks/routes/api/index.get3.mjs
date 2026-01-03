import { d as defineEventHandler, r as requireAuth } from '../../nitro/nitro.mjs';
import { u as useUserSettingsService } from '../../_/userSettings.mjs';
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
import '../../_/constants.mjs';

const index_get = defineEventHandler(async (event) => {
  const { user } = await requireAuth(event);
  const settingsService = useUserSettingsService();
  const settings = await settingsService.getAll(user.id);
  return settings;
});

export { index_get as default };
//# sourceMappingURL=index.get3.mjs.map
