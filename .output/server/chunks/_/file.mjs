import { createHash } from 'crypto';
import { existsSync, statSync, createReadStream, readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join, resolve, basename } from 'path';

function getUploadDir() {
  if (process.env.MJ_UPLOADS_PATH) {
    return process.env.MJ_UPLOADS_PATH;
  }
  return join(process.cwd(), "uploads");
}
const UPLOAD_DIR = getUploadDir();
function validateFileName(fileName) {
  if (!fileName || fileName.includes("..") || fileName.includes("/") || fileName.includes("\\")) {
    return null;
  }
  const safeName = basename(fileName);
  if (!safeName || safeName !== fileName) {
    return null;
  }
  return safeName;
}
function getSafeFilePath(fileName) {
  const safeName = validateFileName(fileName);
  if (!safeName) return null;
  const filePath = join(UPLOAD_DIR, safeName);
  const resolved = resolve(filePath);
  if (!resolved.startsWith(resolve(UPLOAD_DIR))) {
    return null;
  }
  return filePath;
}
function ensureUploadDir() {
  if (!existsSync(UPLOAD_DIR)) {
    mkdirSync(UPLOAD_DIR, { recursive: true });
  }
}
function sanitizeExtension(ext) {
  const cleaned = ext.toLowerCase().replace(/[^a-z0-9]/g, "");
  if (!cleaned || cleaned.length > 10) {
    return "bin";
  }
  return cleaned;
}
function generateFileName(data, ext) {
  const safeExt = sanitizeExtension(ext);
  const hash = createHash("md5").update(typeof data === "string" ? data : data).digest("hex").slice(0, 16);
  const timestamp = Date.now().toString(36);
  return `${timestamp}-${hash}.${safeExt}`;
}
function getMimeType(fileName) {
  var _a;
  const ext = ((_a = fileName.split(".").pop()) == null ? void 0 : _a.toLowerCase()) || "";
  const mimeTypes = {
    // 图片
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    png: "image/png",
    gif: "image/gif",
    webp: "image/webp",
    svg: "image/svg+xml",
    ico: "image/x-icon",
    bmp: "image/bmp",
    // 文档
    pdf: "application/pdf",
    doc: "application/msword",
    docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    xls: "application/vnd.ms-excel",
    xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ppt: "application/vnd.ms-powerpoint",
    pptx: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    txt: "text/plain",
    csv: "text/csv",
    md: "text/markdown",
    // 音频
    mp3: "audio/mpeg",
    wav: "audio/wav",
    ogg: "audio/ogg",
    m4a: "audio/mp4",
    flac: "audio/flac",
    // 视频
    mp4: "video/mp4",
    webm: "video/webm",
    avi: "video/x-msvideo",
    mov: "video/quicktime",
    mkv: "video/x-matroska",
    // 代码
    js: "text/javascript",
    ts: "text/typescript",
    json: "application/json",
    html: "text/html",
    css: "text/css",
    xml: "application/xml",
    // 压缩包
    zip: "application/zip",
    rar: "application/vnd.rar",
    "7z": "application/x-7z-compressed",
    tar: "application/x-tar",
    gz: "application/gzip"
  };
  return mimeTypes[ext] || "application/octet-stream";
}
function getExtFromMimeType(mimeType) {
  const extMap = {
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/gif": "gif",
    "image/webp": "webp",
    "image/svg+xml": "svg",
    "application/pdf": "pdf",
    "audio/mpeg": "mp3",
    "audio/wav": "wav",
    "video/mp4": "mp4",
    "video/webm": "webm",
    "text/plain": "txt",
    "application/json": "json"
  };
  return extMap[mimeType] || "bin";
}
async function downloadFile(url, logPrefix) {
  try {
    ensureUploadDir();
    const response = await fetch(url);
    if (!response.ok) {
      console.error(`${logPrefix || "[File]"} \u4E0B\u8F7D\u5931\u8D25:`, response.status, url);
      return null;
    }
    const contentType = response.headers.get("content-type") || "application/octet-stream";
    const ext = getExtFromMimeType(contentType.split(";")[0]);
    const buffer = Buffer.from(await response.arrayBuffer());
    const fileName = generateFileName(buffer, ext);
    const filePath = join(UPLOAD_DIR, fileName);
    writeFileSync(filePath, buffer);
    console.log(`${logPrefix || "[File]"} \u5DF2\u4E0B\u8F7D: ${fileName}`);
    return fileName;
  } catch (error) {
    console.error("[File] \u4E0B\u8F7D\u6587\u4EF6\u5931\u8D25:", error);
    return null;
  }
}
function saveFile(data, originalName, mimeType) {
  try {
    ensureUploadDir();
    let ext = "bin";
    const nameParts = originalName.split(".");
    if (nameParts.length > 1) {
      ext = nameParts.pop().toLowerCase();
    } else {
      ext = getExtFromMimeType(mimeType);
    }
    const fileName = generateFileName(data, ext);
    const filePath = join(UPLOAD_DIR, fileName);
    writeFileSync(filePath, data);
    console.log("[File] \u5DF2\u4FDD\u5B58:", fileName);
    return {
      fileName,
      mimeType,
      size: data.length
    };
  } catch (error) {
    console.error("[File] \u4FDD\u5B58\u6587\u4EF6\u5931\u8D25:", error);
    return null;
  }
}
function saveBase64File(base64Data, originalName) {
  try {
    ensureUploadDir();
    const matches = base64Data.match(/^data:([^;,]+)(?:;base64)?,(.+)$/);
    if (!matches) {
      console.error("[File] \u65E0\u6548\u7684 base64 \u683C\u5F0F");
      return null;
    }
    const mimeType = matches[1];
    const data = matches[2];
    const buffer = Buffer.from(data, "base64");
    let ext = "bin";
    if (originalName) ; else {
      ext = getExtFromMimeType(mimeType);
    }
    const fileName = generateFileName(buffer, ext);
    const filePath = join(UPLOAD_DIR, fileName);
    writeFileSync(filePath, buffer);
    console.log("[File] \u5DF2\u4FDD\u5B58:", fileName);
    return {
      fileName,
      mimeType,
      size: buffer.length
    };
  } catch (error) {
    console.error("[File] \u4FDD\u5B58\u6587\u4EF6\u5931\u8D25:", error);
    return null;
  }
}
function readFile(fileName) {
  try {
    const filePath = getSafeFilePath(fileName);
    if (!filePath || !existsSync(filePath)) {
      return null;
    }
    const buffer = readFileSync(filePath);
    const mimeType = getMimeType(fileName);
    const stats = statSync(filePath);
    return { buffer, mimeType, size: stats.size };
  } catch (error) {
    console.error("[File] \u8BFB\u53D6\u6587\u4EF6\u5931\u8D25:", error);
    return null;
  }
}
function getFileInfo(fileName) {
  try {
    const filePath = getSafeFilePath(fileName);
    if (!filePath || !existsSync(filePath)) {
      return null;
    }
    const mimeType = getMimeType(fileName);
    const stats = statSync(filePath);
    return { mimeType, size: stats.size, path: filePath };
  } catch (error) {
    console.error("[File] \u83B7\u53D6\u6587\u4EF6\u4FE1\u606F\u5931\u8D25:", error);
    return null;
  }
}
function createFileStream(fileName, start, end) {
  try {
    const filePath = getSafeFilePath(fileName);
    if (!filePath || !existsSync(filePath)) {
      return null;
    }
    const options = {};
    if (start !== void 0) options.start = start;
    if (end !== void 0) options.end = end;
    return createReadStream(filePath, options);
  } catch (error) {
    console.error("[File] \u521B\u5EFA\u6587\u4EF6\u6D41\u5931\u8D25:", error);
    return null;
  }
}
function readFileAsBase64(fileName) {
  const result = readFile(fileName);
  if (!result) return null;
  return `data:${result.mimeType};base64,${result.buffer.toString("base64")}`;
}
function getFileUrl(fileName) {
  return `/api/files/${fileName}`;
}
function isImageMimeType(mimeType) {
  return mimeType.startsWith("image/");
}
function saveBase64Image(base64Data) {
  const result = saveBase64File(base64Data);
  return (result == null ? void 0 : result.fileName) || null;
}

export { getFileUrl as a, saveBase64File as b, createFileStream as c, readFileAsBase64 as d, downloadFile as e, saveBase64Image as f, getFileInfo as g, isImageMimeType as i, readFile as r, saveFile as s };
//# sourceMappingURL=file.mjs.map
