import { d as defineEventHandler, r as requireAuth, a as readBody, c as createError, b as db, G as workflows } from '../../nitro/nitro.mjs';
import { writeFile } from 'fs/promises';
import { join } from 'path';
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
import 'drizzle-orm/better-sqlite3/migrator';
import 'node:url';
import '@iconify/utils';
import 'consola';

const index_post = defineEventHandler(async (event) => {
  const { user } = await requireAuth(event);
  const userId = user.id;
  const body = await readBody(event);
  if (!body.name) {
    throw createError({ statusCode: 400, message: "\u5DE5\u4F5C\u6D41\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A" });
  }
  if (!body.data) {
    throw createError({ statusCode: 400, message: "\u5DE5\u4F5C\u6D41\u6570\u636E\u4E0D\u80FD\u4E3A\u7A7A" });
  }
  const filename = `wf-${Date.now()}.json`;
  const filePath = join(process.cwd(), "data/workflows", filename);
  const workflowData = {
    ...body.data,
    version: "1.0.0",
    name: body.name,
    description: body.description,
    metadata: {
      createdAt: (/* @__PURE__ */ new Date()).toISOString(),
      updatedAt: (/* @__PURE__ */ new Date()).toISOString()
    }
  };
  await writeFile(filePath, JSON.stringify(workflowData, null, 2), "utf-8");
  const [result] = await db.insert(workflows).values({
    userId,
    name: body.name,
    description: body.description,
    filename
  }).returning();
  return {
    success: true,
    data: {
      id: result.id,
      name: result.name,
      filename: result.filename
    }
  };
});

export { index_post as default };
//# sourceMappingURL=index.post6.mjs.map
