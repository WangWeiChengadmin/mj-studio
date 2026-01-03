import { d as defineEventHandler, r as requireAuth, a as readBody, c as createError, b as db, u as users, v as verifyPassword, o as conversations, C as messages, n as assistants, p as upstreams, q as aimodels, D as tasks, t as userSettings } from '../../../nitro/nitro.mjs';
import { eq, inArray } from 'drizzle-orm';
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

const delete_post = defineEventHandler(async (event) => {
  const { user: sessionUser } = await requireAuth(event);
  const body = await readBody(event);
  const { password } = body;
  if (!password) {
    throw createError({ statusCode: 400, message: "\u8BF7\u8F93\u5165\u5BC6\u7801\u786E\u8BA4\u5220\u9664" });
  }
  const [user] = await db.select({ id: users.id, password: users.password }).from(users).where(eq(users.id, sessionUser.id)).limit(1);
  if (!user) {
    throw createError({ statusCode: 404, message: "\u7528\u6237\u4E0D\u5B58\u5728" });
  }
  const isValid = await verifyPassword(user.password, password);
  if (!isValid) {
    throw createError({ statusCode: 400, message: "\u5BC6\u7801\u9519\u8BEF" });
  }
  const userId = sessionUser.id;
  const userConversations = await db.select({ id: conversations.id }).from(conversations).where(eq(conversations.userId, userId));
  const conversationIds = userConversations.map((c) => c.id);
  if (conversationIds.length > 0) {
    await db.delete(messages).where(inArray(messages.conversationId, conversationIds));
  }
  await db.delete(conversations).where(eq(conversations.userId, userId));
  await db.delete(assistants).where(eq(assistants.userId, userId));
  const userUpstreams = await db.select({ id: upstreams.id }).from(upstreams).where(eq(upstreams.userId, userId));
  const upstreamIds = userUpstreams.map((u) => u.id);
  if (upstreamIds.length > 0) {
    await db.delete(aimodels).where(inArray(aimodels.upstreamId, upstreamIds));
  }
  await db.delete(upstreams).where(eq(upstreams.userId, userId));
  await db.delete(tasks).where(eq(tasks.userId, userId));
  await db.delete(userSettings).where(eq(userSettings.userId, userId));
  await db.delete(users).where(eq(users.id, userId));
  return { success: true, message: "\u8D26\u53F7\u5DF2\u5220\u9664" };
});

export { delete_post as default };
//# sourceMappingURL=delete.post.mjs.map
