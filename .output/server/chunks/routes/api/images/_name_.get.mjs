import { d as defineEventHandler, g as getRouterParam, c as createError, f as setHeader } from '../../../nitro/nitro.mjs';
import { r as readFile } from '../../../_/file.mjs';
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

const _name__get = defineEventHandler(async (event) => {
  const name = getRouterParam(event, "name");
  if (!name) {
    throw createError({
      statusCode: 400,
      message: "\u7F3A\u5C11\u56FE\u7247\u540D\u79F0"
    });
  }
  const result = readFile(name);
  if (!result) {
    throw createError({
      statusCode: 404,
      message: "\u56FE\u7247\u4E0D\u5B58\u5728"
    });
  }
  setHeader(event, "Content-Type", result.mimeType);
  setHeader(event, "Cache-Control", "public, max-age=31536000, immutable");
  return result.buffer;
});

export { _name__get as default };
//# sourceMappingURL=_name_.get.mjs.map
