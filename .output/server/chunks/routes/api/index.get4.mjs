import { d as defineEventHandler, r as requireAuth, e as getQuery } from '../../nitro/nitro.mjs';
import { u as useTaskService } from '../../_/task.mjs';
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
import '../../_/constants.mjs';
import '../../_/upstream.mjs';
import '../../_/aimodel.mjs';
import '../../_/file.mjs';
import '../../_/globalEvents.mjs';

const index_get = defineEventHandler(async (event) => {
  const { user } = await requireAuth(event);
  const query = getQuery(event);
  const page = parseInt(query.page, 10) || 1;
  const pageSize = parseInt(query.pageSize, 10) || 20;
  const sourceType = query.sourceType;
  const taskType = query.taskType;
  const keyword = query.keyword;
  const taskService = useTaskService();
  const result = await taskService.listTasks(user.id, {
    page,
    pageSize,
    sourceType: sourceType || "workbench",
    taskType: taskType || "all",
    keyword: (keyword == null ? void 0 : keyword.trim()) || void 0
  });
  return result;
});

export { index_get as default };
//# sourceMappingURL=index.get4.mjs.map
