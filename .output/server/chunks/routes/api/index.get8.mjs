import { d as defineEventHandler, r as requireAuth, b as db, G as workflows } from '../../nitro/nitro.mjs';
import { eq, isNull, desc } from 'drizzle-orm';
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
  const { user } = await requireAuth(event);
  const userId = user.id;
  const list = await db.select({
    id: workflows.id,
    name: workflows.name,
    description: workflows.description,
    thumbnail: workflows.thumbnail,
    createdAt: workflows.createdAt,
    updatedAt: workflows.updatedAt
  }).from(workflows).where(eq(workflows.userId, userId)).where(isNull(workflows.deletedAt)).orderBy(desc(workflows.updatedAt));
  return {
    success: true,
    data: list.map((item) => ({
      ...item,
      createdAt: item.createdAt.toISOString(),
      updatedAt: item.updatedAt.toISOString()
    }))
  };
});

export { index_get as default };
//# sourceMappingURL=index.get8.mjs.map
