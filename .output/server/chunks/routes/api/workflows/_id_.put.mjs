import { d as defineEventHandler, r as requireAuth, g as getRouterParam, a as readBody, c as createError, b as db, G as workflows } from '../../../nitro/nitro.mjs';
import { writeFile } from 'fs/promises';
import { join } from 'path';
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
import 'drizzle-orm/better-sqlite3/migrator';
import 'node:url';
import '@iconify/utils';
import 'consola';

const _id__put = defineEventHandler(async (event) => {
  var _a, _b, _c;
  const { user } = await requireAuth(event);
  const userId = user.id;
  const id = Number(getRouterParam(event, "id"));
  const body = await readBody(event);
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
  const filePath = join(process.cwd(), "data/workflows", workflow.filename);
  if (body.data) {
    const workflowData = {
      ...body.data,
      version: body.data.version || "1.0.0",
      name: body.name || workflow.name,
      description: (_b = (_a = body.description) != null ? _a : workflow.description) != null ? _b : void 0,
      metadata: {
        createdAt: ((_c = body.data.metadata) == null ? void 0 : _c.createdAt) || (/* @__PURE__ */ new Date()).toISOString(),
        updatedAt: (/* @__PURE__ */ new Date()).toISOString()
      }
    };
    await writeFile(filePath, JSON.stringify(workflowData, null, 2), "utf-8");
  }
  const updateData = {
    updatedAt: /* @__PURE__ */ new Date()
  };
  if (body.name !== void 0) updateData.name = body.name;
  if (body.description !== void 0) updateData.description = body.description;
  await db.update(workflows).set(updateData).where(eq(workflows.id, id));
  return {
    success: true,
    message: "\u5DE5\u4F5C\u6D41\u5DF2\u66F4\u65B0"
  };
});

export { _id__put as default };
//# sourceMappingURL=_id_.put.mjs.map
