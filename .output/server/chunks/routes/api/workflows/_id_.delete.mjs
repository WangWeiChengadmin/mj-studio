import { d as defineEventHandler, r as requireAuth, g as getRouterParam, c as createError, b as db, G as workflows } from '../../../nitro/nitro.mjs';
import { and, eq, isNull } from 'drizzle-orm';
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
  const userId = user.id;
  const id = Number(getRouterParam(event, "id"));
  if (!id || isNaN(id)) {
    throw createError({ statusCode: 400, message: "\u65E0\u6548\u7684\u5DE5\u4F5C\u6D41ID" });
  }
  const [workflow] = await db.select().from(workflows).where(and(
    eq(workflows.id, id),
    eq(workflows.userId, userId),
    isNull(workflows.deletedAt)
  )).limit(1);
  if (!workflow) {
    throw createError({ statusCode: 404, message: "\u5DE5\u4F5C\u6D41\u4E0D\u5B58\u5728" });
  }
  await db.update(workflows).set({ deletedAt: /* @__PURE__ */ new Date() }).where(eq(workflows.id, id));
  return {
    success: true,
    message: "\u5DE5\u4F5C\u6D41\u5DF2\u5220\u9664"
  };
});

export { _id__delete as default };
//# sourceMappingURL=_id_.delete.mjs.map
