import { d as defineEventHandler, b as db, H as workflowTemplates } from '../../nitro/nitro.mjs';
import { desc } from 'drizzle-orm';
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

const index_get = defineEventHandler(async () => {
  const list = await db.select({
    id: workflowTemplates.id,
    name: workflowTemplates.name,
    description: workflowTemplates.description,
    category: workflowTemplates.category,
    thumbnail: workflowTemplates.thumbnail,
    isBuiltin: workflowTemplates.isBuiltin,
    usageCount: workflowTemplates.usageCount
  }).from(workflowTemplates).orderBy(desc(workflowTemplates.usageCount));
  return {
    success: true,
    data: list
  };
});

export { index_get as default };
//# sourceMappingURL=index.get7.mjs.map
