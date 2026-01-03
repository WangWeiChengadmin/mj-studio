import { d as defineEventHandler, g as getRouterParam, c as createError, i as getHeader, f as setHeader, j as setResponseStatus, k as sendStream } from '../../../nitro/nitro.mjs';
import { g as getFileInfo, c as createFileStream, r as readFile } from '../../../_/file.mjs';
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
      message: "\u7F3A\u5C11\u6587\u4EF6\u540D\u79F0"
    });
  }
  const fileInfo = getFileInfo(name);
  if (!fileInfo) {
    throw createError({
      statusCode: 404,
      message: "\u6587\u4EF6\u4E0D\u5B58\u5728"
    });
  }
  const { mimeType, size } = fileInfo;
  const rangeHeader = getHeader(event, "range");
  if (rangeHeader) {
    const match = rangeHeader.match(/bytes=(\d*)-(\d*)/);
    if (!match) {
      throw createError({
        statusCode: 416,
        message: "Invalid Range header"
      });
    }
    const startStr = match[1];
    const endStr = match[2];
    let start = startStr ? parseInt(startStr, 10) : 0;
    let end = endStr ? parseInt(endStr, 10) : size - 1;
    if (start >= size || end >= size) {
      setHeader(event, "Content-Range", `bytes */${size}`);
      throw createError({
        statusCode: 416,
        message: "Range Not Satisfiable"
      });
    }
    if (end > size - 1) {
      end = size - 1;
    }
    const chunkSize = end - start + 1;
    setResponseStatus(event, 206);
    setHeader(event, "Content-Type", mimeType);
    setHeader(event, "Content-Length", chunkSize.toString());
    setHeader(event, "Content-Range", `bytes ${start}-${end}/${size}`);
    setHeader(event, "Accept-Ranges", "bytes");
    setHeader(event, "Cache-Control", "public, max-age=31536000, immutable");
    const stream = createFileStream(name, start, end);
    if (!stream) {
      throw createError({
        statusCode: 500,
        message: "\u65E0\u6CD5\u521B\u5EFA\u6587\u4EF6\u6D41"
      });
    }
    return sendStream(event, stream);
  }
  const isLargeFile = size > 10 * 1024 * 1024;
  setHeader(event, "Content-Type", mimeType);
  setHeader(event, "Content-Length", size.toString());
  setHeader(event, "Accept-Ranges", "bytes");
  setHeader(event, "Cache-Control", "public, max-age=31536000, immutable");
  if (isLargeFile) {
    const stream = createFileStream(name);
    if (!stream) {
      throw createError({
        statusCode: 500,
        message: "\u65E0\u6CD5\u521B\u5EFA\u6587\u4EF6\u6D41"
      });
    }
    return sendStream(event, stream);
  } else {
    const result = readFile(name);
    if (!result) {
      throw createError({
        statusCode: 500,
        message: "\u8BFB\u53D6\u6587\u4EF6\u5931\u8D25"
      });
    }
    return result.buffer;
  }
});

export { _name__get as default };
//# sourceMappingURL=_name_.get.mjs.map
