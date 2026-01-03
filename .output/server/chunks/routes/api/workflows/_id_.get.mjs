import { d as defineEventHandler, r as requireAuth, g as getRouterParam, c as createError, b as db, G as workflows } from '../../../nitro/nitro.mjs';
import { readFile } from 'fs/promises';
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

const _id__get = defineEventHandler(async (event) => {
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
  const filePath = join(process.cwd(), "data/workflows", workflow.filename);
  let data;
  try {
    const content = await readFile(filePath, "utf-8");
    data = JSON.parse(content);
  } catch (error) {
    throw createError({ statusCode: 500, message: "\u5DE5\u4F5C\u6D41\u6587\u4EF6\u8BFB\u53D6\u5931\u8D25" });
  }
  return {
    success: true,
    data: {
      id: workflow.id,
      name: workflow.name,
      description: workflow.description,
      thumbnail: workflow.thumbnail,
      createdAt: workflow.createdAt.toISOString(),
      updatedAt: workflow.updatedAt.toISOString(),
      workflow: data
    }
  };
});

export { _id__get as default };
//# sourceMappingURL=_id_.get.mjs.map
