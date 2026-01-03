import { d as defineEventHandler, r as requireAuth, g as getRouterParam, c as createError } from '../../../nitro/nitro.mjs';
import { u as useUpstreamService } from '../../../_/upstream.mjs';
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

const _id__delete = defineEventHandler(async (event) => {
  const { user } = await requireAuth(event);
  const id = getRouterParam(event, "id");
  if (!id) {
    throw createError({ statusCode: 400, message: "\u914D\u7F6EID\u4E0D\u80FD\u4E3A\u7A7A" });
  }
  const upstreamId = parseInt(id, 10);
  if (isNaN(upstreamId)) {
    throw createError({ statusCode: 400, message: "\u65E0\u6548\u7684\u914D\u7F6EID" });
  }
  const service = useUpstreamService();
  const deleted = await service.remove(upstreamId, user.id);
  if (!deleted) {
    throw createError({ statusCode: 404, message: "\u914D\u7F6E\u4E0D\u5B58\u5728\u6216\u65E0\u6743\u5220\u9664" });
  }
  return { success: true };
});

export { _id__delete as default };
//# sourceMappingURL=_id_.delete.mjs.map
