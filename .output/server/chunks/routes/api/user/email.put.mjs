import { d as defineEventHandler, r as requireAuth, a as readBody, c as createError, b as db, u as users, v as verifyPassword } from '../../../nitro/nitro.mjs';
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

const email_put = defineEventHandler(async (event) => {
  const { user: sessionUser } = await requireAuth(event);
  const body = await readBody(event);
  const { newEmail, password } = body;
  if (!newEmail || !password) {
    throw createError({ statusCode: 400, message: "\u8BF7\u586B\u5199\u65B0\u90AE\u7BB1\u548C\u5BC6\u7801" });
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(newEmail)) {
    throw createError({ statusCode: 400, message: "\u90AE\u7BB1\u683C\u5F0F\u4E0D\u6B63\u786E" });
  }
  const [existingUser] = await db.select({ id: users.id }).from(users).where(eq(users.email, newEmail)).limit(1);
  if (existingUser && existingUser.id !== sessionUser.id) {
    throw createError({ statusCode: 400, message: "\u8BE5\u90AE\u7BB1\u5DF2\u88AB\u5176\u4ED6\u7528\u6237\u4F7F\u7528" });
  }
  const [user] = await db.select({
    id: users.id,
    password: users.password
  }).from(users).where(eq(users.id, sessionUser.id)).limit(1);
  if (!user) {
    throw createError({ statusCode: 404, message: "\u7528\u6237\u4E0D\u5B58\u5728" });
  }
  const isValid = await verifyPassword(user.password, password);
  if (!isValid) {
    throw createError({ statusCode: 400, message: "\u5BC6\u7801\u9519\u8BEF" });
  }
  await db.update(users).set({ email: newEmail }).where(eq(users.id, sessionUser.id));
  return { success: true, message: "\u90AE\u7BB1\u4FEE\u6539\u6210\u529F", email: newEmail };
});

export { email_put as default };
//# sourceMappingURL=email.put.mjs.map
