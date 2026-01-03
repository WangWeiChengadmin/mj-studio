import { d as defineEventHandler, r as requireAuth, b as db, u as users, c as createError } from '../../nitro/nitro.mjs';
import { eq } from 'drizzle-orm';
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

const index_get = defineEventHandler(async (event) => {
  const { user: sessionUser } = await requireAuth(event);
  const [user] = await db.select({
    id: users.id,
    email: users.email,
    name: users.name,
    avatar: users.avatar,
    createdAt: users.createdAt
  }).from(users).where(eq(users.id, sessionUser.id)).limit(1);
  if (!user) {
    throw createError({ statusCode: 404, message: "\u7528\u6237\u4E0D\u5B58\u5728" });
  }
  return user;
});

export { index_get as default };
//# sourceMappingURL=index.get6.mjs.map
