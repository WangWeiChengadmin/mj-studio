import { d as defineEventHandler, r as requireAuth, m as readMultipartFormData, c as createError } from '../../../nitro/nitro.mjs';
import { s as saveFile, a as getFileUrl } from '../../../_/file.mjs';
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

const upload_post = defineEventHandler(async (event) => {
  await requireAuth(event);
  const formData = await readMultipartFormData(event);
  if (!formData || formData.length === 0) {
    throw createError({
      statusCode: 400,
      message: "\u7F3A\u5C11\u6587\u4EF6\u6570\u636E"
    });
  }
  const fileField = formData.find((f) => f.name === "file");
  if (!fileField || !fileField.data) {
    throw createError({
      statusCode: 400,
      message: "\u7F3A\u5C11\u6587\u4EF6\u6570\u636E"
    });
  }
  const result = saveFile(fileField.data, fileField.filename || "unknown", fileField.type || "application/octet-stream");
  if (!result) {
    throw createError({
      statusCode: 500,
      message: "\u4FDD\u5B58\u6587\u4EF6\u5931\u8D25"
    });
  }
  return {
    success: true,
    fileName: result.fileName,
    url: getFileUrl(result.fileName),
    mimeType: result.mimeType,
    size: result.size
  };
});

export { upload_post as default };
//# sourceMappingURL=upload.post.mjs.map
