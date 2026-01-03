import { d as defineEventHandler, r as requireAuth, i as getHeader, m as readMultipartFormData, c as createError, a as readBody } from '../../../nitro/nitro.mjs';
import { s as saveFile, a as getFileUrl, b as saveBase64File } from '../../../_/file.mjs';
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
  const contentType = getHeader(event, "content-type") || "";
  if (contentType.includes("multipart/form-data")) {
    const formData = await readMultipartFormData(event);
    if (!formData || formData.length === 0) {
      throw createError({
        statusCode: 400,
        message: "\u7F3A\u5C11\u56FE\u7247\u6587\u4EF6"
      });
    }
    const file = formData.find((f) => f.name === "file");
    if (!file || !file.data) {
      throw createError({
        statusCode: 400,
        message: "\u7F3A\u5C11\u56FE\u7247\u6587\u4EF6"
      });
    }
    const result2 = saveFile(file.data, file.filename || "image.png", file.type || "image/png");
    if (!result2) {
      throw createError({
        statusCode: 500,
        message: "\u4FDD\u5B58\u56FE\u7247\u5931\u8D25"
      });
    }
    return {
      success: true,
      fileName: result2.fileName,
      url: getFileUrl(result2.fileName)
    };
  }
  const body = await readBody(event);
  const { base64 } = body;
  if (!base64) {
    throw createError({
      statusCode: 400,
      message: "\u7F3A\u5C11\u56FE\u7247\u6570\u636E"
    });
  }
  const result = saveBase64File(base64);
  if (!result) {
    throw createError({
      statusCode: 500,
      message: "\u4FDD\u5B58\u56FE\u7247\u5931\u8D25"
    });
  }
  return {
    success: true,
    fileName: result.fileName,
    url: getFileUrl(result.fileName)
  };
});

export { upload_post as default };
//# sourceMappingURL=upload.post.mjs.map
