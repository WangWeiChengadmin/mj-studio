import { d as defineEventHandler, r as requireAuth, g as getRouterParam, c as createError, a as readBody, b as db, D as tasks } from '../../../../nitro/nitro.mjs';
import { and, eq } from 'drizzle-orm';
import { e as emitToUser } from '../../../../_/globalEvents.mjs';
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

const blur_patch = defineEventHandler(async (event) => {
  const session = await requireAuth(event);
  const id = Number(getRouterParam(event, "id"));
  if (!id || isNaN(id)) {
    throw createError({
      statusCode: 400,
      message: "\u65E0\u6548\u7684\u4EFB\u52A1ID"
    });
  }
  const body = await readBody(event);
  const { isBlurred } = body;
  if (typeof isBlurred !== "boolean") {
    throw createError({
      statusCode: 400,
      message: "\u7F3A\u5C11 isBlurred \u53C2\u6570"
    });
  }
  const [updated] = await db.update(tasks).set({ isBlurred, updatedAt: /* @__PURE__ */ new Date() }).where(and(
    eq(tasks.id, id),
    eq(tasks.userId, session.user.id)
  )).returning();
  if (!updated) {
    throw createError({
      statusCode: 404,
      message: "\u4EFB\u52A1\u4E0D\u5B58\u5728"
    });
  }
  await emitToUser(session.user.id, "task.blur.updated", {
    taskId: id,
    isBlurred: updated.isBlurred
  });
  return { success: true, isBlurred: updated.isBlurred };
});

export { blur_patch as default };
//# sourceMappingURL=blur.patch.mjs.map
