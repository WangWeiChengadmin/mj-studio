import { d as defineEventHandler, r as requireAuth, a as readBody, c as createError, b as db, u as users } from '../../nitro/nitro.mjs';
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

const index_put = defineEventHandler(async (event) => {
  const { user: sessionUser } = await requireAuth(event);
  const body = await readBody(event);
  const { name, avatar } = body;
  const updateData = {};
  if (name !== void 0) {
    updateData.name = (name == null ? void 0 : name.trim()) || null;
  }
  if (avatar !== void 0) {
    updateData.avatar = avatar || null;
  }
  if (Object.keys(updateData).length === 0) {
    throw createError({ statusCode: 400, message: "\u6CA1\u6709\u9700\u8981\u66F4\u65B0\u7684\u5B57\u6BB5" });
  }
  await db.update(users).set(updateData).where(eq(users.id, sessionUser.id));
  const [user] = await db.select({
    id: users.id,
    email: users.email,
    name: users.name,
    avatar: users.avatar,
    createdAt: users.createdAt
  }).from(users).where(eq(users.id, sessionUser.id)).limit(1);
  return user;
});

export { index_put as default };
//# sourceMappingURL=index.put2.mjs.map
