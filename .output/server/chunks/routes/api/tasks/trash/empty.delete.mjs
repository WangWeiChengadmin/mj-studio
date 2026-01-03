import { d as defineEventHandler, r as requireAuth } from '../../../../nitro/nitro.mjs';
import { u as useTaskService } from '../../../../_/task.mjs';
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
import '../../../../_/constants.mjs';
import '../../../../_/upstream.mjs';
import '../../../../_/aimodel.mjs';
import '../../../../_/file.mjs';
import '../../../../_/globalEvents.mjs';

const empty_delete = defineEventHandler(async (event) => {
  const { user } = await requireAuth(event);
  const taskService = useTaskService();
  const count = await taskService.emptyTrash(user.id);
  return { success: true, deleted: count };
});

export { empty_delete as default };
//# sourceMappingURL=empty.delete.mjs.map
