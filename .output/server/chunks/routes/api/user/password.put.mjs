import { d as defineEventHandler, r as requireAuth, a as readBody, c as createError, b as db, u as users, v as verifyPassword, h as hashPassword } from '../../../nitro/nitro.mjs';
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

const password_put = defineEventHandler(async (event) => {
  const { user: sessionUser } = await requireAuth(event);
  const body = await readBody(event);
  const { currentPassword, newPassword } = body;
  if (!currentPassword || !newPassword) {
    throw createError({ statusCode: 400, message: "\u8BF7\u586B\u5199\u5F53\u524D\u5BC6\u7801\u548C\u65B0\u5BC6\u7801" });
  }
  if (newPassword.length < 6) {
    throw createError({ statusCode: 400, message: "\u65B0\u5BC6\u7801\u957F\u5EA6\u4E0D\u80FD\u5C11\u4E8E6\u4F4D" });
  }
  const [user] = await db.select({
    id: users.id,
    password: users.password
  }).from(users).where(eq(users.id, sessionUser.id)).limit(1);
  if (!user) {
    throw createError({ statusCode: 404, message: "\u7528\u6237\u4E0D\u5B58\u5728" });
  }
  const isValid = await verifyPassword(user.password, currentPassword);
  if (!isValid) {
    throw createError({ statusCode: 400, message: "\u5F53\u524D\u5BC6\u7801\u9519\u8BEF" });
  }
  const hashedPassword = await hashPassword(newPassword);
  await db.update(users).set({ password: hashedPassword }).where(eq(users.id, sessionUser.id));
  return { success: true, message: "\u5BC6\u7801\u4FEE\u6539\u6210\u529F" };
});

export { password_put as default };
//# sourceMappingURL=password.put.mjs.map
