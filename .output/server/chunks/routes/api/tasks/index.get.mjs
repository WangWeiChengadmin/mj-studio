import { d as defineEventHandler, r as requireAuth, e as getQuery } from '../../../nitro/nitro.mjs';
import { u as useTaskService } from '../../../_/task.mjs';
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
import 'path';
import 'drizzle-orm/better-sqlite3/migrator';
import 'node:url';
import '@iconify/utils';
import 'consola';
import '../../../_/constants.mjs';
import '../../../_/upstream.mjs';
import '../../../_/aimodel.mjs';
import '../../../_/file.mjs';
import '../../../_/globalEvents.mjs';

const index_get = defineEventHandler(async (event) => {
  const { user } = await requireAuth(event);
  const query = getQuery(event);
  const page = parseInt(query.page, 10) || 1;
  const pageSize = parseInt(query.pageSize, 10) || 20;
  const taskService = useTaskService();
  const result = await taskService.listTrashTasks(user.id, { page, pageSize });
  return result;
});

export { index_get as default };
//# sourceMappingURL=index.get.mjs.map
