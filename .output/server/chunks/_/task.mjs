import { b as db, D as tasks, p as upstreams, q as aimodels } from '../nitro/nitro.mjs';
import { and, eq, isNull, inArray, isNotNull, sql, desc, or, like } from 'drizzle-orm';
import { existsSync, readFileSync, readdirSync, appendFileSync, mkdirSync } from 'fs';
import { join } from 'path';
import { D as DEFAULT_MODEL_NAMES } from './constants.mjs';
import { u as useUpstreamService } from './upstream.mjs';
import { u as useAimodelService } from './aimodel.mjs';
import { e as downloadFile, a as getFileUrl, d as readFileAsBase64, f as saveBase64Image } from './file.mjs';
import { e as emitToUser } from './globalEvents.mjs';

const LOGS_DIR = "logs";
function getLogDir(taskId) {
  const date = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
  const dir = join(LOGS_DIR, date, String(taskId));
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
  return dir;
}
function findLogDir(taskId, createdAt) {
  const taskDate = createdAt.toISOString().split("T")[0];
  const primaryDir = join(LOGS_DIR, taskDate, String(taskId));
  if (existsSync(primaryDir)) {
    return primaryDir;
  }
  if (!existsSync(LOGS_DIR)) return null;
  const dateDirs = readdirSync(LOGS_DIR, { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => d.name).sort().reverse();
  for (const dateDir of dateDirs) {
    const taskDir = join(LOGS_DIR, dateDir, String(taskId));
    if (existsSync(taskDir)) {
      return taskDir;
    }
  }
  return null;
}
function logRequest(taskId, data) {
  try {
    const dir = getLogDir(taskId);
    const timestamp = (/* @__PURE__ */ new Date()).toISOString();
    const logData = {
      timestamp,
      ...data,
      // 隐藏敏感信息
      headers: data.headers ? {
        ...data.headers,
        Authorization: data.headers.Authorization ? "[REDACTED]" : void 0
      } : void 0
    };
    appendFileSync(join(dir, "requests.jsonl"), JSON.stringify(logData) + "\n");
  } catch (e) {
    console.error("[Logger] \u5199\u5165\u8BF7\u6C42\u65E5\u5FD7\u5931\u8D25:", e);
  }
}
function logResponse(taskId, data) {
  try {
    const dir = getLogDir(taskId);
    const timestamp = (/* @__PURE__ */ new Date()).toISOString();
    const logData = {
      timestamp,
      ...data
    };
    appendFileSync(join(dir, "responses.jsonl"), JSON.stringify(logData) + "\n");
  } catch (e) {
    console.error("[Logger] \u5199\u5165\u54CD\u5E94\u65E5\u5FD7\u5931\u8D25:", e);
  }
}
function readTaskLogs(taskId, createdAt) {
  const dir = findLogDir(taskId, createdAt);
  if (!dir) return null;
  let requests = [];
  let responses = [];
  const requestsPath = join(dir, "requests.jsonl");
  const responsesPath = join(dir, "responses.jsonl");
  const legacyRequestPath = join(dir, "request.json");
  const legacyResponsePath = join(dir, "response.json");
  if (existsSync(requestsPath)) {
    try {
      const lines = readFileSync(requestsPath, "utf-8").trim().split("\n");
      requests = lines.filter((l) => l).map((l) => JSON.parse(l));
    } catch (e) {
      console.error("[Logger] \u8BFB\u53D6\u8BF7\u6C42\u65E5\u5FD7\u5931\u8D25:", e);
    }
  } else if (existsSync(legacyRequestPath)) {
    try {
      requests = [JSON.parse(readFileSync(legacyRequestPath, "utf-8"))];
    } catch (e) {
      console.error("[Logger] \u8BFB\u53D6\u8BF7\u6C42\u65E5\u5FD7\u5931\u8D25:", e);
    }
  }
  if (existsSync(responsesPath)) {
    try {
      const lines = readFileSync(responsesPath, "utf-8").trim().split("\n");
      responses = lines.filter((l) => l).map((l) => JSON.parse(l));
    } catch (e) {
      console.error("[Logger] \u8BFB\u53D6\u54CD\u5E94\u65E5\u5FD7\u5931\u8D25:", e);
    }
  } else if (existsSync(legacyResponsePath)) {
    try {
      responses = [JSON.parse(readFileSync(legacyResponsePath, "utf-8"))];
    } catch (e) {
      console.error("[Logger] \u8BFB\u53D6\u54CD\u5E94\u65E5\u5FD7\u5931\u8D25:", e);
    }
  }
  if (responses.length === 0) return null;
  return { requests, responses };
}

function createMJService(baseUrl, apiKey) {
  const headers = {
    "Authorization": `Bearer ${apiKey}`,
    "Content-Type": "application/json"
  };
  async function imagine(prompt, base64Array = [], taskId) {
    const url = `${baseUrl}/mj/submit/imagine`;
    const body = { prompt, base64Array };
    if (taskId) {
      logRequest(taskId, {
        url,
        method: "POST",
        headers,
        body: {
          prompt,
          base64Array: base64Array.map((b) => `[base64 ${b.length} chars]`)
        }
      });
    }
    try {
      const response = await $fetch(url, {
        method: "POST",
        headers,
        body
      });
      const result = typeof response === "string" ? JSON.parse(response) : response;
      if (taskId) {
        logResponse(taskId, { status: 200, data: result });
      }
      return result;
    } catch (error) {
      if (taskId) {
        logResponse(taskId, {
          status: error.status || error.statusCode,
          statusText: error.statusText || error.statusMessage,
          error: error.message,
          data: error.data
        });
      }
      throw error;
    }
  }
  async function blend(base64Array, dimensions = "SQUARE", taskId) {
    const url = `${baseUrl}/mj/submit/blend`;
    const body = { base64Array, dimensions };
    if (taskId) {
      logRequest(taskId, {
        url,
        method: "POST",
        headers,
        body: {
          base64Array: base64Array.map((b) => `[base64 ${b.length} chars]`),
          dimensions
        }
      });
    }
    try {
      const response = await $fetch(url, {
        method: "POST",
        headers,
        body
      });
      const result = typeof response === "string" ? JSON.parse(response) : response;
      if (taskId) {
        logResponse(taskId, { status: 200, data: result });
      }
      return result;
    } catch (error) {
      if (taskId) {
        logResponse(taskId, {
          status: error.status || error.statusCode,
          statusText: error.statusText || error.statusMessage,
          error: error.message,
          data: error.data
        });
      }
      throw error;
    }
  }
  async function action(parentTaskId, customId, taskId) {
    const url = `${baseUrl}/mj/submit/action`;
    const body = { taskId: parentTaskId, customId };
    if (taskId) {
      logRequest(taskId, { url, method: "POST", headers, body });
    }
    try {
      const response = await $fetch(url, {
        method: "POST",
        headers,
        body
      });
      const result = typeof response === "string" ? JSON.parse(response) : response;
      if (taskId) {
        logResponse(taskId, { status: 200, data: result });
      }
      return result;
    } catch (error) {
      if (taskId) {
        logResponse(taskId, {
          status: error.status || error.statusCode,
          statusText: error.statusText || error.statusMessage,
          error: error.message,
          data: error.data
        });
      }
      throw error;
    }
  }
  async function fetchTask(mjTaskId) {
    const response = await $fetch(`${baseUrl}/mj/task/${mjTaskId}/fetch`, {
      method: "GET",
      headers
    });
    return response;
  }
  return {
    imagine,
    blend,
    action,
    fetchTask
  };
}

const ERROR_MESSAGES = {
  CONTENT_FILTERED: "\u5185\u5BB9\u88AB\u5B89\u5168\u8FC7\u6EE4\u5668\u62D2\u7EDD",
  QUOTA_EXCEEDED: "API \u914D\u989D\u5DF2\u7528\u5C3D",
  RATE_LIMITED: "\u8BF7\u6C42\u8FC7\u4E8E\u9891\u7E41\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5",
  AUTH_FAILED: "API \u5BC6\u94A5\u65E0\u6548\u6216\u5DF2\u8FC7\u671F",
  MODEL_UNAVAILABLE: "\u6A21\u578B\u6682\u4E0D\u53EF\u7528",
  INVALID_PARAMS: "\u8BF7\u6C42\u53C2\u6570\u65E0\u6548",
  UPSTREAM_TIMEOUT: "\u4E0A\u6E38\u670D\u52A1\u54CD\u5E94\u8D85\u65F6",
  NETWORK_ERROR: "\u7F51\u7EDC\u8FDE\u63A5\u5931\u8D25",
  EMPTY_RESPONSE: "\u672A\u6536\u5230\u6709\u6548\u54CD\u5E94",
  PARSE_ERROR: "\u54CD\u5E94\u683C\u5F0F\u5F02\u5E38",
  SAVE_FAILED: "\u56FE\u7247\u4FDD\u5B58\u5931\u8D25",
  UNKNOWN: "\u751F\u6210\u5931\u8D25"
};
function containsAny(str, keywords) {
  if (!str) return false;
  const lower = str.toLowerCase();
  return keywords.some((kw) => lower.includes(kw.toLowerCase()));
}
function classifyError(input) {
  const { status, message, code, type, data, errorName } = input;
  const allText = [
    message,
    code,
    type,
    typeof data === "string" ? data : JSON.stringify(data || "")
  ].join(" ");
  if (containsAny(allText, ["safety", "blocked", "filtered", "content_policy", "moderation", "moderated", "violat", "nsfw", "inappropriate", "sensitive"])) {
    return ERROR_MESSAGES.CONTENT_FILTERED;
  }
  if (containsAny(allText, ["empty response", "empty_response", "no response", "\u672A\u6536\u5230", "no meaningful content"])) {
    return ERROR_MESSAGES.EMPTY_RESPONSE;
  }
  if (containsAny(allText, ["quota", "balance", "insufficient", "billing", "exceeded your"])) {
    return ERROR_MESSAGES.QUOTA_EXCEEDED;
  }
  if (containsAny(allText, ["rate limit", "rate_limit", "too many requests"])) {
    return ERROR_MESSAGES.RATE_LIMITED;
  }
  if (containsAny(allText, ["unauthorized", "invalid key", "invalid_api_key", "authentication failed"])) {
    return ERROR_MESSAGES.AUTH_FAILED;
  }
  if (containsAny(allText, ["model not found", "does not exist", "model_not_found"])) {
    return ERROR_MESSAGES.MODEL_UNAVAILABLE;
  }
  if (containsAny(allText, ["timeout", "timed out"]) || errorName === "TimeoutError") {
    return ERROR_MESSAGES.UPSTREAM_TIMEOUT;
  }
  if (errorName === "FetchError" || errorName === "NetworkError" || containsAny(allText, ["ECONNREFUSED", "ENOTFOUND", "ETIMEDOUT", "network error", "connection error", "connection refused"])) {
    return ERROR_MESSAGES.NETWORK_ERROR;
  }
  if (status === 401 || status === 403) {
    return ERROR_MESSAGES.AUTH_FAILED;
  }
  if (status === 402) {
    return ERROR_MESSAGES.QUOTA_EXCEEDED;
  }
  if (status === 404) {
    return ERROR_MESSAGES.MODEL_UNAVAILABLE;
  }
  if (status === 429) {
    return ERROR_MESSAGES.RATE_LIMITED;
  }
  if (status === 400) {
    return ERROR_MESSAGES.INVALID_PARAMS;
  }
  if (status === 504 || status === 408) {
    return ERROR_MESSAGES.UPSTREAM_TIMEOUT;
  }
  return ERROR_MESSAGES.UNKNOWN;
}
function classifyFetchError(error) {
  var _a, _b, _c, _d;
  return classifyError({
    status: error.status || error.statusCode,
    statusText: error.statusText || error.statusMessage,
    message: error.message,
    code: ((_b = (_a = error.data) == null ? void 0 : _a.error) == null ? void 0 : _b.code) || error.code,
    type: ((_d = (_c = error.data) == null ? void 0 : _c.error) == null ? void 0 : _d.type) || error.type,
    data: error.data,
    errorName: error.name
  });
}

function createGeminiService(baseUrl, apiKey) {
  async function generateImage(prompt, modelName = DEFAULT_MODEL_NAMES.gemini, taskId, signal) {
    var _a, _b, _c, _d, _e, _f;
    if (!apiKey) {
      return { success: false, error: "Gemini API Key \u672A\u914D\u7F6E" };
    }
    const url = `${baseUrl}/v1beta/models/${modelName}:generateContent?key=${apiKey}`;
    const body = {
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { responseModalities: ["Text", "Image"] }
    };
    if (taskId) {
      logRequest(taskId, {
        url: url.replace(apiKey, "[REDACTED]"),
        method: "POST",
        body
      });
    }
    try {
      const response = await $fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
        signal
      });
      if (taskId) {
        const logData = JSON.parse(JSON.stringify(response));
        (_a = logData.candidates) == null ? void 0 : _a.forEach((c) => {
          var _a2, _b2;
          (_b2 = (_a2 = c.content) == null ? void 0 : _a2.parts) == null ? void 0 : _b2.forEach((p) => {
            var _a3;
            if ((_a3 = p.inlineData) == null ? void 0 : _a3.data) {
              p.inlineData.data = `[base64 ${p.inlineData.data.length} chars]`;
            }
          });
        });
        logResponse(taskId, { status: 200, data: logData });
      }
      const candidate = (_b = response.candidates) == null ? void 0 : _b[0];
      if (!candidate) {
        return { success: false, error: "\u672A\u6536\u5230\u54CD\u5E94" };
      }
      const imagePart = (_d = (_c = candidate.content) == null ? void 0 : _c.parts) == null ? void 0 : _d.find((part) => part.inlineData);
      if (imagePart == null ? void 0 : imagePart.inlineData) {
        return {
          success: true,
          imageBase64: imagePart.inlineData.data,
          mimeType: imagePart.inlineData.mimeType
        };
      }
      const textPart = (_f = (_e = candidate.content) == null ? void 0 : _e.parts) == null ? void 0 : _f.find((part) => part.text);
      return { success: false, error: (textPart == null ? void 0 : textPart.text) || ERROR_MESSAGES.EMPTY_RESPONSE };
    } catch (error) {
      if (taskId) {
        logResponse(taskId, {
          status: error.status || error.statusCode,
          statusText: error.statusText || error.statusMessage,
          error: error.message,
          data: error.data
        });
      }
      return { success: false, error: classifyFetchError(error) };
    }
  }
  async function generateImageWithRef(prompt, images, modelName = DEFAULT_MODEL_NAMES.gemini, taskId, signal) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i;
    if (!apiKey) {
      return { success: false, error: "Gemini API Key \u672A\u914D\u7F6E" };
    }
    if (images.length === 0) {
      return generateImage(prompt, modelName, taskId, signal);
    }
    const url = `${baseUrl}/v1beta/models/${modelName}:generateContent?key=${apiKey}`;
    const parts = [];
    for (const img of images) {
      const match = img.match(/^data:(image\/[^;]+);base64,(.+)$/);
      if (match) {
        parts.push({ inlineData: { mimeType: match[1], data: match[2] } });
      }
    }
    parts.push({ text: prompt });
    const body = {
      contents: [{ parts }],
      generationConfig: { responseModalities: ["Text", "Image"] }
    };
    if (taskId) {
      const logBody = JSON.parse(JSON.stringify(body));
      (_c = (_b = (_a = logBody.contents) == null ? void 0 : _a[0]) == null ? void 0 : _b.parts) == null ? void 0 : _c.forEach((p) => {
        var _a2;
        if ((_a2 = p.inlineData) == null ? void 0 : _a2.data) {
          p.inlineData.data = `[base64 ${p.inlineData.data.length} chars]`;
        }
      });
      logRequest(taskId, {
        url: url.replace(apiKey, "[REDACTED]"),
        method: "POST",
        body: logBody
      });
    }
    try {
      const response = await $fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
        signal
      });
      if (taskId) {
        const logData = JSON.parse(JSON.stringify(response));
        (_d = logData.candidates) == null ? void 0 : _d.forEach((c) => {
          var _a2, _b2;
          (_b2 = (_a2 = c.content) == null ? void 0 : _a2.parts) == null ? void 0 : _b2.forEach((p) => {
            var _a3;
            if ((_a3 = p.inlineData) == null ? void 0 : _a3.data) {
              p.inlineData.data = `[base64 ${p.inlineData.data.length} chars]`;
            }
          });
        });
        logResponse(taskId, { status: 200, data: logData });
      }
      const candidate = (_e = response.candidates) == null ? void 0 : _e[0];
      if (!candidate) {
        return { success: false, error: "\u672A\u6536\u5230\u54CD\u5E94" };
      }
      const imagePart = (_g = (_f = candidate.content) == null ? void 0 : _f.parts) == null ? void 0 : _g.find((part) => part.inlineData);
      if (imagePart == null ? void 0 : imagePart.inlineData) {
        return {
          success: true,
          imageBase64: imagePart.inlineData.data,
          mimeType: imagePart.inlineData.mimeType
        };
      }
      const textPart = (_i = (_h = candidate.content) == null ? void 0 : _h.parts) == null ? void 0 : _i.find((part) => part.text);
      return { success: false, error: (textPart == null ? void 0 : textPart.text) || ERROR_MESSAGES.EMPTY_RESPONSE };
    } catch (error) {
      if (taskId) {
        logResponse(taskId, {
          status: error.status || error.statusCode,
          statusText: error.statusText || error.statusMessage,
          error: error.message,
          data: error.data
        });
      }
      return { success: false, error: classifyFetchError(error) };
    }
  }
  return {
    generateImage,
    generateImageWithRef
  };
}

function isDoubaoModel(modelName) {
  return modelName.toLowerCase().includes("doubao");
}
function isFluxModel(modelName) {
  return modelName.toLowerCase().includes("flux");
}
function dataUrlToBlob(dataUrl) {
  const match = dataUrl.match(/^data:(.+);base64,(.+)$/);
  if (!match) {
    throw new Error("Invalid data URL format");
  }
  const mimeType = match[1];
  const base64Data = match[2];
  const binaryString = atob(base64Data);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return new Blob([bytes], { type: mimeType });
}
function createDalleService(baseUrl, apiKey) {
  const headers = {
    "Authorization": `Bearer ${apiKey}`,
    "Content-Type": "application/json"
  };
  function isGptImageModel(modelName) {
    return modelName.toLowerCase().includes("gpt-image");
  }
  async function generateImage(prompt, modelName = DEFAULT_MODEL_NAMES.dalle, taskId, signal, modelParams) {
    var _a;
    const url = `${baseUrl}/v1/images/generations`;
    const body = {
      model: modelName,
      prompt,
      n: (modelParams == null ? void 0 : modelParams.n) || 1,
      response_format: "url"
    };
    if (!isDoubaoModel(modelName)) {
      body.size = (modelParams == null ? void 0 : modelParams.size) || "1024x1024";
    } else if (modelParams == null ? void 0 : modelParams.size) {
      body.size = modelParams.size;
    }
    if (modelParams == null ? void 0 : modelParams.negativePrompt) {
      body.negative_prompt = modelParams.negativePrompt;
    }
    if (modelName.includes("dall-e-3")) {
      if (modelParams == null ? void 0 : modelParams.quality) body.quality = modelParams.quality;
      if (modelParams == null ? void 0 : modelParams.style) body.style = modelParams.style;
    }
    if (isDoubaoModel(modelName)) {
      if ((modelParams == null ? void 0 : modelParams.seed) !== void 0 && modelParams.seed !== -1) {
        body.seed = modelParams.seed;
      }
      if ((modelParams == null ? void 0 : modelParams.guidanceScale) !== void 0) {
        body.guidance_scale = modelParams.guidanceScale;
      }
      if ((modelParams == null ? void 0 : modelParams.watermark) !== void 0) {
        body.watermark = modelParams.watermark;
      }
    }
    if (isFluxModel(modelName)) {
      if (modelParams == null ? void 0 : modelParams.aspectRatio) body.aspect_ratio = modelParams.aspectRatio;
    }
    if (isGptImageModel(modelName)) {
      if (modelParams == null ? void 0 : modelParams.quality) body.quality = modelParams.quality;
      if ((modelParams == null ? void 0 : modelParams.background) && modelParams.background !== "auto") {
        body.background = modelParams.background;
      }
    }
    if (taskId) {
      logRequest(taskId, { url, method: "POST", headers, body });
    }
    try {
      const response = await $fetch(url, {
        method: "POST",
        headers,
        body,
        signal
      });
      if (taskId) {
        logResponse(taskId, { status: 200, data: response });
      }
      const imageData = (_a = response.data) == null ? void 0 : _a[0];
      if (!imageData) {
        return { success: false, error: ERROR_MESSAGES.EMPTY_RESPONSE };
      }
      return {
        success: true,
        resourceUrl: imageData.url,
        imageBase64: imageData.b64_json
      };
    } catch (error) {
      if (taskId) {
        logResponse(taskId, {
          status: error.status || error.statusCode,
          statusText: error.statusText || error.statusMessage,
          error: error.message,
          data: error.data
        });
      }
      return { success: false, error: classifyFetchError(error) };
    }
  }
  async function generateImageWithRef(prompt, images, modelName = DEFAULT_MODEL_NAMES.dalle, taskId, signal, modelParams) {
    var _a;
    if (images.length === 0) {
      return generateImage(prompt, modelName, taskId, signal, modelParams);
    }
    const imageDataUrl = images[0];
    if (isFluxModel(modelName)) {
      return generateImageWithRefFlux(prompt, imageDataUrl, modelName, taskId, signal, modelParams);
    }
    const url = `${baseUrl}/v1/images/generations`;
    let imageValue;
    if (isDoubaoModel(modelName)) {
      imageValue = imageDataUrl;
    } else {
      const base64Match = imageDataUrl.match(/^data:image\/\w+;base64,(.+)$/);
      imageValue = base64Match ? base64Match[1] : imageDataUrl;
    }
    const body = {
      model: modelName,
      prompt,
      image: imageValue,
      n: (modelParams == null ? void 0 : modelParams.n) || 1,
      response_format: "url"
    };
    if (!isDoubaoModel(modelName)) {
      body.size = (modelParams == null ? void 0 : modelParams.size) || "1024x1024";
    } else if (modelParams == null ? void 0 : modelParams.size) {
      body.size = modelParams.size;
    }
    if (modelParams == null ? void 0 : modelParams.negativePrompt) {
      body.negative_prompt = modelParams.negativePrompt;
    }
    if (modelName.includes("dall-e-3")) {
      if (modelParams == null ? void 0 : modelParams.quality) body.quality = modelParams.quality;
      if (modelParams == null ? void 0 : modelParams.style) body.style = modelParams.style;
    }
    if (isDoubaoModel(modelName)) {
      if ((modelParams == null ? void 0 : modelParams.seed) !== void 0 && modelParams.seed !== -1) {
        body.seed = modelParams.seed;
      }
      if ((modelParams == null ? void 0 : modelParams.guidanceScale) !== void 0) {
        body.guidance_scale = modelParams.guidanceScale;
      }
      if ((modelParams == null ? void 0 : modelParams.watermark) !== void 0) {
        body.watermark = modelParams.watermark;
      }
    }
    if (isGptImageModel(modelName)) {
      if (modelParams == null ? void 0 : modelParams.quality) body.quality = modelParams.quality;
      if ((modelParams == null ? void 0 : modelParams.background) && modelParams.background !== "auto") {
        body.background = modelParams.background;
      }
    }
    if (taskId) {
      logRequest(taskId, {
        url,
        method: "POST",
        headers,
        body: { ...body, image: `[${isDoubaoModel(modelName) ? "dataUrl" : "base64"} ${imageValue.length} chars]` }
      });
    }
    try {
      const response = await $fetch(url, {
        method: "POST",
        headers,
        body,
        signal
      });
      if (taskId) {
        logResponse(taskId, { status: 200, data: response });
      }
      const imageData = (_a = response.data) == null ? void 0 : _a[0];
      if (!imageData) {
        return { success: false, error: ERROR_MESSAGES.EMPTY_RESPONSE };
      }
      return {
        success: true,
        resourceUrl: imageData.url,
        imageBase64: imageData.b64_json
      };
    } catch (error) {
      if (taskId) {
        logResponse(taskId, {
          status: error.status || error.statusCode,
          statusText: error.statusText || error.statusMessage,
          error: error.message,
          data: error.data
        });
      }
      return { success: false, error: classifyFetchError(error) };
    }
  }
  async function generateImageWithRefFlux(prompt, imageDataUrl, modelName, taskId, signal, modelParams) {
    var _a;
    const url = `${baseUrl}/v1/images/edits`;
    const formData = new FormData();
    formData.append("model", modelName);
    formData.append("prompt", prompt);
    formData.append("n", String((modelParams == null ? void 0 : modelParams.n) || 1));
    formData.append("response_format", "b64_json");
    if (modelParams == null ? void 0 : modelParams.negativePrompt) {
      formData.append("negative_prompt", modelParams.negativePrompt);
    }
    if (modelParams == null ? void 0 : modelParams.aspectRatio) {
      formData.append("aspect_ratio", modelParams.aspectRatio);
    }
    const blob = dataUrlToBlob(imageDataUrl);
    formData.append("image", blob, "image.png");
    if (taskId) {
      logRequest(taskId, {
        url,
        method: "POST",
        headers: { "Authorization": "[REDACTED]" },
        body: { model: modelName, prompt, negative_prompt: modelParams == null ? void 0 : modelParams.negativePrompt, n: 1, response_format: "b64_json", image: `[file ${blob.size} bytes]` }
      });
    }
    try {
      const response = await $fetch(url, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`
          // 不设置 Content-Type，让浏览器自动设置 multipart/form-data
        },
        body: formData,
        signal
      });
      if (taskId) {
        logResponse(taskId, { status: 200, data: response });
      }
      const imageData = (_a = response.data) == null ? void 0 : _a[0];
      if (!imageData) {
        return { success: false, error: ERROR_MESSAGES.EMPTY_RESPONSE };
      }
      return {
        success: true,
        resourceUrl: imageData.url,
        imageBase64: imageData.b64_json
      };
    } catch (error) {
      if (taskId) {
        logResponse(taskId, {
          status: error.status || error.statusCode,
          statusText: error.statusText || error.statusMessage,
          error: error.message,
          data: error.data
        });
      }
      return { success: false, error: classifyFetchError(error) };
    }
  }
  return {
    generateImage,
    generateImageWithRef
  };
}

function extractImageUrl(content) {
  const markdownMatch = content.match(/!\[.*?\]\((https?:\/\/[^\s)]+)\)/);
  if (markdownMatch) return markdownMatch[1];
  const dataUrlMatch = content.match(/(data:image\/[^;]+;base64,[A-Za-z0-9+/=]+)/);
  if (dataUrlMatch) return dataUrlMatch[1];
  const urlMatch = content.match(/(https?:\/\/[^\s"'<>]+\.(?:png|jpg|jpeg|gif|webp))/i);
  if (urlMatch) return urlMatch[1];
  return void 0;
}
function createOpenAIChatService(baseUrl, apiKey) {
  const headers = {
    "Authorization": `Bearer ${apiKey}`,
    "Content-Type": "application/json"
  };
  async function generateImage(prompt, modelName = DEFAULT_MODEL_NAMES["gpt4o-image"], taskId, signal) {
    var _a, _b, _c;
    const url = `${baseUrl}/v1/chat/completions`;
    const body = {
      model: modelName,
      messages: [{ role: "user", content: prompt }],
      stream: false
    };
    if (taskId) {
      logRequest(taskId, { url, method: "POST", headers, body });
    }
    try {
      const response = await $fetch(url, {
        method: "POST",
        headers,
        body,
        signal
      });
      if (taskId) {
        logResponse(taskId, { status: 200, data: response });
      }
      const content = ((_c = (_b = (_a = response.choices) == null ? void 0 : _a[0]) == null ? void 0 : _b.message) == null ? void 0 : _c.content) || "";
      const imageUrl = extractImageUrl(content);
      if (!imageUrl) {
        return { success: false, error: ERROR_MESSAGES.PARSE_ERROR };
      }
      if (imageUrl.startsWith("data:image/")) {
        const match = imageUrl.match(/data:(image\/[^;]+);base64,(.+)/);
        if (match) {
          return { success: true, imageBase64: match[2], mimeType: match[1] };
        }
      }
      return { success: true, resourceUrl: imageUrl };
    } catch (error) {
      if (taskId) {
        logResponse(taskId, {
          status: error.status || error.statusCode,
          statusText: error.statusText || error.statusMessage,
          error: error.message,
          data: error.data
        });
      }
      return { success: false, error: classifyFetchError(error) };
    }
  }
  async function generateImageWithRef(prompt, images, modelName = DEFAULT_MODEL_NAMES["gpt4o-image"], taskId, signal) {
    var _a, _b, _c, _d, _e, _f;
    if (images.length === 0) {
      return generateImage(prompt, modelName, taskId, signal);
    }
    const url = `${baseUrl}/v1/chat/completions`;
    const contentParts = [];
    for (const img of images) {
      contentParts.push({ type: "image_url", image_url: { url: img } });
    }
    contentParts.push({ type: "text", text: prompt });
    const body = {
      model: modelName,
      messages: [{ role: "user", content: contentParts }],
      stream: false
    };
    if (taskId) {
      const logBody = JSON.parse(JSON.stringify(body));
      (_c = (_b = (_a = logBody.messages) == null ? void 0 : _a[0]) == null ? void 0 : _b.content) == null ? void 0 : _c.forEach((p) => {
        var _a2, _b2;
        if ((_b2 = (_a2 = p.image_url) == null ? void 0 : _a2.url) == null ? void 0 : _b2.startsWith("data:")) {
          p.image_url.url = `[base64 ${p.image_url.url.length} chars]`;
        }
      });
      logRequest(taskId, { url, method: "POST", headers, body: logBody });
    }
    try {
      const response = await $fetch(url, {
        method: "POST",
        headers,
        body,
        signal
      });
      if (taskId) {
        logResponse(taskId, { status: 200, data: response });
      }
      const content = ((_f = (_e = (_d = response.choices) == null ? void 0 : _d[0]) == null ? void 0 : _e.message) == null ? void 0 : _f.content) || "";
      const imageUrl = extractImageUrl(content);
      if (!imageUrl) {
        return { success: false, error: ERROR_MESSAGES.PARSE_ERROR };
      }
      if (imageUrl.startsWith("data:image/")) {
        const match = imageUrl.match(/data:(image\/[^;]+);base64,(.+)/);
        if (match) {
          return { success: true, imageBase64: match[2], mimeType: match[1] };
        }
      }
      return { success: true, resourceUrl: imageUrl };
    } catch (error) {
      if (taskId) {
        logResponse(taskId, {
          status: error.status || error.statusCode,
          statusText: error.statusText || error.statusMessage,
          error: error.message,
          data: error.data
        });
      }
      return { success: false, error: classifyFetchError(error) };
    }
  }
  return {
    generateImage,
    generateImageWithRef
  };
}

function createKoukoutuService(baseUrl, apiKey) {
  async function create(imageBase64, modelKey = "background-removal", taskId) {
    const url = `${baseUrl}/v1/create`;
    const base64Data = imageBase64.replace(/^data:image\/\w+;base64,/, "");
    const binaryData = Buffer.from(base64Data, "base64");
    const boundary = "----FormBoundary" + Math.random().toString(36).slice(2);
    const parts = [];
    const textFields = {
      model_key: modelKey,
      output_format: "webp",
      crop: "0",
      border: "0",
      stamp_crop: "0"
    };
    for (const [key, value] of Object.entries(textFields)) {
      parts.push(`--${boundary}\r
`);
      parts.push(`Content-Disposition: form-data; name="${key}"\r
\r
`);
      parts.push(`${value}\r
`);
    }
    parts.push(`--${boundary}\r
`);
    parts.push(`Content-Disposition: form-data; name="image_file"; filename="image.png"\r
`);
    parts.push(`Content-Type: image/png\r
\r
`);
    const textPart = Buffer.from(parts.join(""), "utf-8");
    const endPart = Buffer.from(`\r
--${boundary}--\r
`, "utf-8");
    const body = Buffer.concat([textPart, binaryData, endPart]);
    if (taskId) {
      logRequest(taskId, {
        url,
        method: "POST",
        headers: { Authorization: "[REDACTED]" },
        body: {
          model_key: modelKey,
          output_format: "webp",
          image_file: `[base64 ${imageBase64.length} chars]`
        }
      });
    }
    try {
      const response = await $fetch(url, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": `multipart/form-data; boundary=${boundary}`
        },
        body
      });
      if (taskId) {
        logResponse(taskId, { status: 200, data: response });
      }
      return response;
    } catch (error) {
      if (taskId) {
        logResponse(taskId, {
          status: error.status || error.statusCode,
          statusText: error.statusText || error.statusMessage,
          error: error.message,
          data: error.data
        });
      }
      throw error;
    }
  }
  async function query(upstreamTaskId) {
    const url = `${baseUrl}/v1/query`;
    const boundary = "----FormBoundary" + Math.random().toString(36).slice(2);
    const parts = [
      `--${boundary}\r
`,
      `Content-Disposition: form-data; name="task_id"\r
\r
`,
      `${upstreamTaskId}\r
`,
      `--${boundary}\r
`,
      `Content-Disposition: form-data; name="response"\r
\r
`,
      `url\r
`,
      `--${boundary}--\r
`
    ];
    const body = Buffer.from(parts.join(""), "utf-8");
    const response = await $fetch(url, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": `multipart/form-data; boundary=${boundary}`
      },
      body
    });
    return response;
  }
  return {
    create,
    query
  };
}

const STATUS_NORMALIZATION = {
  // ============ 处理中状态 ============
  // 通用状态
  "pending": "processing",
  // 排队等待
  "processing": "processing",
  // 标准处理中
  "generating": "processing",
  // 生成中
  // Veo 特有状态
  "image_downloading": "processing",
  // 下载参考图中
  "video_generating": "processing",
  // 视频生成中
  "video_upsampling": "processing",
  // 超分处理中
  "video_generation_completed": "processing",
  // 视频生成完成，等待后续处理（如超分）
  // 即梦官方格式状态（转为小写后匹配）
  "not_start": "processing",
  // NOT_START
  "submitted": "processing",
  // SUBMITTED
  "queued": "processing",
  // QUEUED
  "in_progress": "processing",
  // IN_PROGRESS
  // ============ 成功状态 ============
  "success": "success",
  "completed": "success",
  // 即梦/Veo: 完成
  "video_upsampling_completed": "success",
  // Veo: 超分完成（最终成功）
  // ============ 失败状态 ============
  "failed": "failed",
  "failure": "failed",
  // 即梦官方格式: FAILURE
  "error": "failed",
  // Veo: 错误
  "video_generation_failed": "failed",
  // Veo: 视频生成失败
  "video_upsampling_failed": "failed"
  // Veo: 超分失败
};
function normalizeStatus(upstreamStatus) {
  let normalized = STATUS_NORMALIZATION[upstreamStatus];
  if (normalized) {
    return normalized;
  }
  normalized = STATUS_NORMALIZATION[upstreamStatus.toLowerCase()];
  if (normalized) {
    return normalized;
  }
  console.warn(`[VideoUnified] \u672A\u77E5\u4E0A\u6E38\u72B6\u6001: "${upstreamStatus}"\uFF0C\u6620\u5C04\u4E3A processing`);
  return "processing";
}
function createVideoUnifiedService(baseUrl, apiKey) {
  const headers = {
    "Authorization": `Bearer ${apiKey}`,
    "Content-Type": "application/json"
  };
  async function create(params, taskId) {
    const url = `${baseUrl}/v1/video/create`;
    const body = {
      model: params.model,
      prompt: params.prompt
    };
    if (params.aspect_ratio) body.aspect_ratio = params.aspect_ratio;
    if (params.size) body.size = params.size;
    if (params.enhance_prompt !== void 0) body.enhance_prompt = params.enhance_prompt;
    if (params.enable_upsample !== void 0) body.enable_upsample = params.enable_upsample;
    if (params.images && params.images.length > 0) body.images = params.images;
    if (params.orientation) body.orientation = params.orientation;
    if (params.duration) body.duration = params.duration;
    if (params.watermark !== void 0) body.watermark = params.watermark;
    if (params.private !== void 0) body.private = params.private;
    if (taskId) {
      logRequest(taskId, { url, method: "POST", headers, body });
    }
    try {
      const response = await $fetch(url, {
        method: "POST",
        headers,
        body
      });
      if (taskId) {
        logResponse(taskId, { status: 200, data: response });
      }
      return response;
    } catch (error) {
      if (taskId) {
        logResponse(taskId, {
          status: error.status || error.statusCode,
          statusText: error.statusText || error.statusMessage,
          error: error.message,
          data: error.data
        });
      }
      throw error;
    }
  }
  async function query(upstreamTaskId, taskId) {
    var _a;
    const url = `${baseUrl}/v1/video/query?id=${encodeURIComponent(upstreamTaskId)}`;
    if (taskId) {
      logRequest(taskId, { url, method: "GET", headers });
    }
    try {
      const response = await $fetch(url, {
        method: "GET",
        headers
      });
      if (taskId) {
        logResponse(taskId, { status: 200, data: response });
      }
      const normalizedError = typeof response.error === "object" ? ((_a = response.error) == null ? void 0 : _a.message) || JSON.stringify(response.error) : response.error;
      return {
        ...response,
        status: normalizeStatus(response.status),
        error: normalizedError
      };
    } catch (error) {
      if (taskId) {
        logResponse(taskId, {
          status: error.status || error.statusCode,
          statusText: error.statusText || error.statusMessage,
          error: error.message,
          data: error.data
        });
      }
      throw error;
    }
  }
  return { create, query };
}

const taskAbortControllers = /* @__PURE__ */ new Map();
function isAbortError(error) {
  var _a, _b, _c;
  return (error == null ? void 0 : error.name) === "AbortError" || ((_a = error == null ? void 0 : error.cause) == null ? void 0 : _a.name) === "AbortError" || ((_b = error == null ? void 0 : error.message) == null ? void 0 : _b.includes("aborted")) || ((_c = error == null ? void 0 : error.message) == null ? void 0 : _c.includes("abort"));
}
function useTaskService() {
  const upstreamService = useUpstreamService();
  const aimodelService = useAimodelService();
  function getApiKey(upstream, aimodel) {
    return upstreamService.getApiKey(upstream, aimodel == null ? void 0 : aimodel.keyName);
  }
  function convertImagesToBase64(images) {
    return images.map((url) => {
      if (url.startsWith("data:")) return url;
      const fileName = url.replace(/^\/api\/files\//, "");
      return readFileAsBase64(fileName) || url;
    }).filter(Boolean);
  }
  async function createTask(data) {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    const taskType = (_a = data.taskType) != null ? _a : "image";
    const [task] = await db.insert(tasks).values({
      userId: data.userId,
      upstreamId: data.upstreamId,
      aimodelId: data.aimodelId,
      taskType,
      modelType: data.modelType,
      apiFormat: data.apiFormat,
      modelName: data.modelName,
      prompt: (_b = data.prompt) != null ? _b : null,
      modelParams: (_c = data.modelParams) != null ? _c : null,
      images: (_d = data.images) != null ? _d : [],
      type: (_e = data.type) != null ? _e : "imagine",
      status: "pending",
      isBlurred: (_f = data.isBlurred) != null ? _f : true,
      uniqueId: (_g = data.uniqueId) != null ? _g : null,
      sourceType: (_h = data.sourceType) != null ? _h : "workbench"
    }).returning();
    return task;
  }
  async function findByUniqueId(uniqueId, userId) {
    return db.query.tasks.findFirst({
      where: and(eq(tasks.uniqueId, uniqueId), eq(tasks.userId, userId), isNull(tasks.deletedAt))
    });
  }
  async function updateTask(id, data) {
    const [updated] = await db.update(tasks).set({ ...data, updatedAt: /* @__PURE__ */ new Date() }).where(eq(tasks.id, id)).returning();
    if (updated && data.status !== void 0) {
      await emitToUser(updated.userId, "task.status.updated", {
        taskId: updated.id,
        status: updated.status,
        progress: updated.progress ? parseInt(updated.progress) : void 0,
        resourceUrl: updated.resourceUrl,
        error: updated.error,
        buttons: updated.buttons,
        updatedAt: updated.updatedAt instanceof Date ? updated.updatedAt.toISOString() : updated.updatedAt
      });
    }
    return updated;
  }
  async function getTask(id) {
    return db.query.tasks.findFirst({
      where: eq(tasks.id, id)
    });
  }
  async function getTaskWithConfig(id) {
    const task = await getTask(id);
    if (!task) return void 0;
    const upstream = await db.query.upstreams.findFirst({
      where: eq(upstreams.id, task.upstreamId)
    });
    if (!upstream) return void 0;
    const aimodel = await db.query.aimodels.findFirst({
      where: eq(aimodels.id, task.aimodelId)
    });
    if (!aimodel) return void 0;
    return { task, upstream, aimodel };
  }
  async function getTaskWithSummary(id) {
    const result = await getTaskWithConfig(id);
    if (!result) return void 0;
    return {
      task: result.task,
      upstream: getUpstreamSummary(result.upstream, result.aimodel)
    };
  }
  function getUpstreamSummary(upstream, aimodel) {
    var _a;
    return {
      name: upstream.name,
      estimatedTime: (_a = aimodel == null ? void 0 : aimodel.estimatedTime) != null ? _a : null
    };
  }
  async function listTasks(userId, options = {}) {
    var _a, _b, _c, _d, _e;
    const page = (_a = options.page) != null ? _a : 1;
    const pageSize = (_b = options.pageSize) != null ? _b : 20;
    const sourceType = (_c = options.sourceType) != null ? _c : "workbench";
    const taskTypeFilter = (_d = options.taskType) != null ? _d : "all";
    const keyword = options.keyword;
    const conditions = [eq(tasks.userId, userId), isNull(tasks.deletedAt)];
    if (sourceType !== "all") {
      conditions.push(eq(tasks.sourceType, sourceType));
    }
    if (taskTypeFilter !== "all") {
      conditions.push(eq(tasks.taskType, taskTypeFilter));
    }
    if (keyword) {
      const keywordPattern = `%${keyword}%`;
      conditions.push(
        or(
          like(tasks.prompt, keywordPattern),
          like(tasks.uniqueId, keywordPattern)
        )
      );
    }
    const whereClause = and(...conditions);
    const [countResult] = await db.select({ count: sql`count(*)` }).from(tasks).where(whereClause);
    const total = (_e = countResult == null ? void 0 : countResult.count) != null ? _e : 0;
    const taskList = await db.query.tasks.findMany({
      where: whereClause,
      orderBy: [desc(tasks.createdAt)],
      limit: pageSize,
      offset: (page - 1) * pageSize
    });
    const upstreamIds = [...new Set(taskList.map((t) => t.upstreamId))];
    const aimodelIds = [...new Set(taskList.map((t) => t.aimodelId))];
    const upstreamMap = /* @__PURE__ */ new Map();
    const aimodelMap = /* @__PURE__ */ new Map();
    for (const id of upstreamIds) {
      const upstream = await db.query.upstreams.findFirst({
        where: eq(upstreams.id, id)
      });
      if (upstream) upstreamMap.set(id, upstream);
    }
    for (const id of aimodelIds) {
      const aimodel = await db.query.aimodels.findFirst({
        where: eq(aimodels.id, id)
      });
      if (aimodel) aimodelMap.set(id, aimodel);
    }
    return {
      tasks: taskList.map((task) => {
        const upstream = upstreamMap.get(task.upstreamId);
        const aimodel = aimodelMap.get(task.aimodelId);
        return {
          ...task,
          upstream: upstream && aimodel ? getUpstreamSummary(upstream, aimodel) : void 0
        };
      }),
      total,
      page,
      pageSize
    };
  }
  async function deleteTask(id, userId) {
    const [updated] = await db.update(tasks).set({ deletedAt: /* @__PURE__ */ new Date(), updatedAt: /* @__PURE__ */ new Date() }).where(and(eq(tasks.id, id), eq(tasks.userId, userId), isNull(tasks.deletedAt))).returning();
    return !!updated;
  }
  async function listTrashTasks(userId, options = {}) {
    var _a, _b, _c;
    const page = (_a = options.page) != null ? _a : 1;
    const pageSize = (_b = options.pageSize) != null ? _b : 20;
    const [countResult] = await db.select({ count: sql`count(*)` }).from(tasks).where(and(eq(tasks.userId, userId), isNotNull(tasks.deletedAt)));
    const total = (_c = countResult == null ? void 0 : countResult.count) != null ? _c : 0;
    const taskList = await db.query.tasks.findMany({
      where: and(eq(tasks.userId, userId), isNotNull(tasks.deletedAt)),
      orderBy: [desc(tasks.deletedAt)],
      limit: pageSize,
      offset: (page - 1) * pageSize
    });
    const upstreamIds = [...new Set(taskList.map((t) => t.upstreamId))];
    const aimodelIds = [...new Set(taskList.map((t) => t.aimodelId))];
    const upstreamMap = /* @__PURE__ */ new Map();
    const aimodelMap = /* @__PURE__ */ new Map();
    for (const id of upstreamIds) {
      const upstream = await db.query.upstreams.findFirst({
        where: eq(upstreams.id, id)
      });
      if (upstream) upstreamMap.set(id, upstream);
    }
    for (const id of aimodelIds) {
      const aimodel = await db.query.aimodels.findFirst({
        where: eq(aimodels.id, id)
      });
      if (aimodel) aimodelMap.set(id, aimodel);
    }
    return {
      tasks: taskList.map((task) => {
        const upstream = upstreamMap.get(task.upstreamId);
        const aimodel = aimodelMap.get(task.aimodelId);
        return {
          ...task,
          upstream: upstream && aimodel ? getUpstreamSummary(upstream, aimodel) : void 0
        };
      }),
      total,
      page,
      pageSize
    };
  }
  async function restoreTask(id, userId) {
    const [updated] = await db.update(tasks).set({ deletedAt: null, updatedAt: /* @__PURE__ */ new Date() }).where(and(eq(tasks.id, id), eq(tasks.userId, userId), isNotNull(tasks.deletedAt))).returning();
    return !!updated;
  }
  async function emptyTrash(userId) {
    const deleted = await db.delete(tasks).where(and(eq(tasks.userId, userId), isNotNull(tasks.deletedAt))).returning();
    return deleted.length;
  }
  async function batchBlur(userId, isBlurred, taskIds) {
    let condition = and(eq(tasks.userId, userId), isNull(tasks.deletedAt));
    if (taskIds && taskIds.length > 0) {
      condition = and(condition, inArray(tasks.id, taskIds));
    }
    await db.update(tasks).set({ isBlurred, updatedAt: /* @__PURE__ */ new Date() }).where(condition);
  }
  async function submitTask(taskId) {
    const data = await getTaskWithConfig(taskId);
    if (!data) {
      throw new Error("\u4EFB\u52A1\u6216\u4E0A\u6E38\u914D\u7F6E\u4E0D\u5B58\u5728");
    }
    const { task, upstream, aimodel } = data;
    const promptPreview = task.prompt ? task.prompt.length > 30 ? task.prompt.slice(0, 30) + "..." : task.prompt : "(\u65E0\u63D0\u793A\u8BCD)";
    console.log(`[Task] \u63D0\u4EA4 | #${taskId} ${task.modelType}/${task.apiFormat} | \u4E0A\u6E38:${upstream.name} \u6A21\u578B:${task.modelName} Key:${aimodel.keyName} | ${promptPreview}`);
    await updateTask(taskId, { status: "submitting" });
    const controller = new AbortController();
    taskAbortControllers.set(taskId, controller);
    try {
      switch (task.apiFormat) {
        case "mj-proxy":
          await submitToMJ(task, upstream, aimodel);
          break;
        case "gemini":
          await submitToGemini(task, upstream, aimodel, controller.signal);
          break;
        case "dalle":
          await submitToDalle(task, upstream, aimodel, controller.signal);
          break;
        case "openai-chat":
          await submitToOpenAIChat(task, upstream, aimodel, controller.signal);
          break;
        case "koukoutu":
          await submitToKoukoutu(task, upstream, aimodel);
          break;
        case "video-unified":
          await submitToVideoUnified(task, upstream, aimodel);
          break;
        default:
          await updateTask(taskId, {
            status: "failed",
            error: `\u4E0D\u652F\u6301\u7684API\u683C\u5F0F: ${task.apiFormat}`
          });
      }
    } finally {
      taskAbortControllers.delete(taskId);
    }
  }
  async function handleSyncResult(task, upstream, aimodel, result) {
    if (!result.success) {
      await updateTask(task.id, {
        status: "failed",
        error: result.error || "\u751F\u6210\u5931\u8D25"
      });
      return;
    }
    let fileName = null;
    const logPrefix = `[Task] #${task.id}`;
    if (result.imageBase64) {
      const dataUrl = `data:${result.mimeType || "image/png"};base64,${result.imageBase64}`;
      fileName = saveBase64Image(dataUrl);
    } else if (result.resourceUrl) {
      fileName = await downloadFile(result.resourceUrl, logPrefix);
    }
    if (!fileName) {
      await updateTask(task.id, {
        status: "failed",
        error: "\u4FDD\u5B58\u56FE\u7247\u5230\u672C\u5730\u5931\u8D25"
      });
      return;
    }
    await updateTask(task.id, {
      status: "success",
      progress: "100%",
      resourceUrl: getFileUrl(fileName)
    });
    await updateEstimatedTime(upstream, aimodel, task, task.createdAt);
  }
  async function submitToGemini(task, upstream, aimodel, signal) {
    var _a, _b;
    const gemini = createGeminiService(upstream.baseUrl, getApiKey(upstream, aimodel));
    const modelName = task.modelName || DEFAULT_MODEL_NAMES.gemini;
    try {
      let result;
      if (task.images && task.images.length > 0) {
        const base64Images = convertImagesToBase64(task.images);
        result = await gemini.generateImageWithRef((_a = task.prompt) != null ? _a : "", base64Images, modelName, task.id, signal);
      } else {
        result = await gemini.generateImage((_b = task.prompt) != null ? _b : "", modelName, task.id, signal);
      }
      await handleSyncResult(task, upstream, aimodel, result);
    } catch (error) {
      if (isAbortError(error)) {
        console.log(`[Task ${task.id}] \u8BF7\u6C42\u5DF2\u88AB\u53D6\u6D88`);
        return;
      }
      await updateTask(task.id, {
        status: "failed",
        error: error.message || "Gemini\u751F\u6210\u5931\u8D25"
      });
    }
  }
  async function submitToDalle(task, upstream, aimodel, signal) {
    var _a, _b, _c;
    const dalle = createDalleService(upstream.baseUrl, getApiKey(upstream, aimodel));
    const modelName = task.modelName || DEFAULT_MODEL_NAMES.dalle;
    const modelParams = (_a = task.modelParams) != null ? _a : {};
    try {
      let result;
      if (task.images && task.images.length > 0) {
        const base64Images = convertImagesToBase64(task.images);
        result = await dalle.generateImageWithRef((_b = task.prompt) != null ? _b : "", base64Images, modelName, task.id, signal, modelParams);
      } else {
        result = await dalle.generateImage((_c = task.prompt) != null ? _c : "", modelName, task.id, signal, modelParams);
      }
      await handleSyncResult(task, upstream, aimodel, result);
    } catch (error) {
      if (isAbortError(error)) {
        console.log(`[Task ${task.id}] \u8BF7\u6C42\u5DF2\u88AB\u53D6\u6D88`);
        return;
      }
      await updateTask(task.id, {
        status: "failed",
        error: error.message || "DALL-E\u751F\u6210\u5931\u8D25"
      });
    }
  }
  async function submitToOpenAIChat(task, upstream, aimodel, signal) {
    var _a, _b;
    const openai = createOpenAIChatService(upstream.baseUrl, getApiKey(upstream, aimodel));
    const modelName = task.modelName || DEFAULT_MODEL_NAMES["gpt4o-image"];
    try {
      let result;
      if (task.images && task.images.length > 0) {
        const base64Images = convertImagesToBase64(task.images);
        result = await openai.generateImageWithRef((_a = task.prompt) != null ? _a : "", base64Images, modelName, task.id, signal);
      } else {
        result = await openai.generateImage((_b = task.prompt) != null ? _b : "", modelName, task.id, signal);
      }
      await handleSyncResult(task, upstream, aimodel, result);
    } catch (error) {
      if (isAbortError(error)) {
        console.log(`[Task ${task.id}] \u8BF7\u6C42\u5DF2\u88AB\u53D6\u6D88`);
        return;
      }
      await updateTask(task.id, {
        status: "failed",
        error: error.message || "OpenAI Chat\u751F\u6210\u5931\u8D25"
      });
    }
  }
  async function submitToKoukoutu(task, upstream, aimodel) {
    if (!task.images || task.images.length === 0) {
      await updateTask(task.id, {
        status: "failed",
        error: "\u62A0\u62A0\u56FE\u9700\u8981\u4E0A\u4F20\u56FE\u7247"
      });
      return;
    }
    const koukoutu = createKoukoutuService(upstream.baseUrl, getApiKey(upstream, aimodel));
    const modelKey = task.modelName || "background-removal";
    try {
      const base64Images = convertImagesToBase64(task.images);
      const result = await koukoutu.create(base64Images[0], modelKey, task.id);
      if (result.code !== 200) {
        await updateTask(task.id, {
          status: "failed",
          error: result.message || ERROR_MESSAGES.UNKNOWN
        });
        return;
      }
      await updateTask(task.id, {
        status: "processing",
        upstreamTaskId: String(result.data.task_id)
      });
    } catch (error) {
      await updateTask(task.id, {
        status: "failed",
        error: classifyFetchError(error)
      });
    }
  }
  async function submitToMJ(task, upstream, aimodel) {
    var _a;
    const mj = createMJService(upstream.baseUrl, getApiKey(upstream, aimodel));
    try {
      let result;
      const base64Images = task.images ? convertImagesToBase64(task.images) : [];
      if (task.type === "blend") {
        result = await mj.blend(base64Images, "SQUARE", task.id);
      } else {
        result = await mj.imagine((_a = task.prompt) != null ? _a : "", base64Images, task.id);
      }
      if (result.code !== 1) {
        await updateTask(task.id, {
          status: "failed",
          error: result.description || ERROR_MESSAGES.UNKNOWN
        });
        return;
      }
      await updateTask(task.id, {
        status: "processing",
        upstreamTaskId: result.result
      });
    } catch (error) {
      await updateTask(task.id, {
        status: "failed",
        error: classifyFetchError(error)
      });
    }
  }
  async function submitToVideoUnified(task, upstream, aimodel) {
    var _a, _b;
    const videoService = createVideoUnifiedService(upstream.baseUrl, getApiKey(upstream, aimodel));
    try {
      const modelParams = (_a = task.modelParams) != null ? _a : {};
      const params = {
        model: task.modelName,
        prompt: (_b = task.prompt) != null ? _b : ""
      };
      const modelType = aimodel.modelType;
      if (modelType === "jimeng-video") {
        if (modelParams.aspectRatio) params.aspect_ratio = modelParams.aspectRatio;
        if (modelParams.size) params.size = modelParams.size;
      } else if (modelType === "veo") {
        if (modelParams.aspectRatio) params.aspect_ratio = modelParams.aspectRatio;
        if (modelParams.enhancePrompt !== void 0) params.enhance_prompt = modelParams.enhancePrompt;
        if (modelParams.enableUpsample !== void 0) params.enable_upsample = modelParams.enableUpsample;
      } else if (modelType === "sora") {
        if (modelParams.orientation) params.orientation = modelParams.orientation;
        if (modelParams.size) params.size = modelParams.size;
        if (modelParams.duration) params.duration = modelParams.duration;
        if (modelParams.watermark !== void 0) params.watermark = modelParams.watermark;
        if (modelParams.private !== void 0) params.private = modelParams.private;
      } else if (modelType === "grok-video") {
        if (modelParams.aspectRatio) params.aspect_ratio = modelParams.aspectRatio;
        if (modelParams.size) params.size = modelParams.size;
      }
      if (task.images && task.images.length > 0) {
        params.images = convertImagesToBase64(task.images);
      }
      const result = await videoService.create(params, task.id);
      await updateTask(task.id, {
        status: "processing",
        upstreamTaskId: result.id
      });
    } catch (error) {
      await updateTask(task.id, {
        status: "failed",
        error: classifyFetchError(error)
      });
    }
  }
  async function syncTaskStatus(taskId) {
    const data = await getTaskWithConfig(taskId);
    if (!data) return void 0;
    const { task, upstream, aimodel } = data;
    if (task.apiFormat === "koukoutu") {
      return await syncKoukoutuStatus(task, upstream, aimodel);
    } else if (task.apiFormat === "mj-proxy") {
      return await syncMJStatus(task, upstream, aimodel);
    } else if (task.apiFormat === "video-unified") {
      return await syncVideoUnifiedStatus(task, upstream, aimodel);
    }
    return task;
  }
  async function syncKoukoutuStatus(task, upstream, aimodel) {
    if (!task.upstreamTaskId) {
      return task;
    }
    const koukoutu = createKoukoutuService(upstream.baseUrl, getApiKey(upstream, aimodel));
    const logPrefix = `[Task] #${task.id}`;
    try {
      const result = await koukoutu.query(task.upstreamTaskId);
      let status = task.status;
      let resourceUrl = null;
      if (result.data.state === 1) {
        status = "success";
        if (result.data.result_file) {
          const fileName = await downloadFile(result.data.result_file, logPrefix);
          if (fileName) {
            resourceUrl = getFileUrl(fileName);
          }
          await updateEstimatedTime(upstream, aimodel, task, task.createdAt);
        }
      } else if (result.data.state === -1) {
        status = "failed";
      }
      return await updateTask(task.id, {
        status,
        progress: status === "success" ? "100%" : null,
        resourceUrl,
        error: status === "failed" ? "\u62A0\u56FE\u5904\u7406\u5931\u8D25" : null
      });
    } catch (error) {
      console.error("\u540C\u6B65\u62A0\u62A0\u56FE\u4EFB\u52A1\u72B6\u6001\u5931\u8D25:", error.message);
      return task;
    }
  }
  async function syncMJStatus(task, upstream, aimodel) {
    if (!task.upstreamTaskId) {
      return task;
    }
    const mj = createMJService(upstream.baseUrl, getApiKey(upstream, aimodel));
    const logPrefix = `[Task] #${task.id}`;
    try {
      const mjTask = await mj.fetchTask(task.upstreamTaskId);
      let status = task.status;
      if (mjTask.status === "SUCCESS") {
        status = "success";
      } else if (mjTask.status === "FAILURE") {
        status = "failed";
      } else if (["IN_PROGRESS", "SUBMITTED", "MODAL"].includes(mjTask.status)) {
        status = "processing";
      }
      let resourceUrl = mjTask.imageUrl || null;
      if (status === "success" && resourceUrl && !resourceUrl.startsWith("/api/images/")) {
        const fileName = await downloadFile(resourceUrl, logPrefix);
        if (fileName) {
          resourceUrl = getFileUrl(fileName);
        }
        await updateEstimatedTime(upstream, aimodel, task, task.createdAt);
      }
      let error = null;
      if (mjTask.failReason) {
        error = classifyError({ message: mjTask.failReason });
        logResponse(task.id, {
          status: 200,
          statusText: "OK (Poll)",
          data: {
            status: mjTask.status,
            failReason: mjTask.failReason,
            progress: mjTask.progress
          }
        });
      }
      return await updateTask(task.id, {
        status,
        progress: mjTask.progress || null,
        resourceUrl,
        error,
        buttons: mjTask.buttons || null
      });
    } catch (error) {
      console.error("\u540C\u6B65\u4EFB\u52A1\u72B6\u6001\u5931\u8D25:", error.message);
      return task;
    }
  }
  async function syncVideoUnifiedStatus(task, upstream, aimodel) {
    if (!task.upstreamTaskId) {
      return task;
    }
    const videoService = createVideoUnifiedService(upstream.baseUrl, getApiKey(upstream, aimodel));
    const logPrefix = `[Task] #${task.id}`;
    try {
      const result = await videoService.query(task.upstreamTaskId, task.id);
      const status = result.status;
      let resourceUrl = result.video_url || null;
      if (status === "success" && resourceUrl && !resourceUrl.startsWith("/api/files/")) {
        const fileName = await downloadFile(resourceUrl, logPrefix);
        if (fileName) {
          resourceUrl = getFileUrl(fileName);
        }
        await updateEstimatedTime(upstream, aimodel, task, task.createdAt);
      }
      let progress = null;
      if (status === "success") {
        progress = "100%";
      } else if (result.progress !== void 0 && result.progress > 0) {
        progress = `${Math.round(result.progress)}%`;
      }
      return await updateTask(task.id, {
        status,
        progress,
        resourceUrl,
        error: result.error || (status === "failed" ? "\u89C6\u9891\u751F\u6210\u5931\u8D25" : null)
      });
    } catch (error) {
      console.error("\u540C\u6B65\u89C6\u9891\u4EFB\u52A1\u72B6\u6001\u5931\u8D25:", error.message, error.stack);
      return task;
    }
  }
  async function updateEstimatedTime(upstream, aimodel, task, startTime) {
    try {
      const endTime = /* @__PURE__ */ new Date();
      const actualTime = Math.round((endTime.getTime() - startTime.getTime()) / 1e3);
      await aimodelService.updateEstimatedTime(upstream.id, task.modelName, actualTime);
      console.log(`[Task] #${task.id} \u66F4\u65B0\u9884\u8BA1\u65F6\u95F4 | ${upstream.name}/${task.modelName}: ${actualTime}s`);
    } catch (error) {
      console.error("\u66F4\u65B0\u9884\u8BA1\u65F6\u95F4\u5931\u8D25:", error);
    }
  }
  async function executeAction(parentTaskId, customId, userId) {
    const data = await getTaskWithConfig(parentTaskId);
    if (!data) {
      throw new Error("\u7236\u4EFB\u52A1\u4E0D\u5B58\u5728");
    }
    const { task: parentTask, upstream, aimodel } = data;
    if (parentTask.apiFormat !== "mj-proxy") {
      throw new Error("\u4EC5MJ-Proxy\u683C\u5F0F\u652F\u6301\u6309\u94AE\u52A8\u4F5C");
    }
    if (!parentTask.upstreamTaskId) {
      throw new Error("\u7236\u4EFB\u52A1\u672A\u63D0\u4EA4");
    }
    const [newTask] = await db.insert(tasks).values({
      userId,
      upstreamId: parentTask.upstreamId,
      aimodelId: parentTask.aimodelId,
      modelType: parentTask.modelType,
      apiFormat: parentTask.apiFormat,
      modelName: parentTask.modelName,
      prompt: parentTask.prompt,
      images: parentTask.images,
      type: "imagine",
      status: "submitting"
    }).returning();
    const mj = createMJService(upstream.baseUrl, getApiKey(upstream, aimodel));
    try {
      const result = await mj.action(parentTask.upstreamTaskId, customId, newTask.id);
      if (result.code !== 1) {
        await updateTask(newTask.id, {
          status: "failed",
          error: result.description || ERROR_MESSAGES.UNKNOWN
        });
        return await getTask(newTask.id);
      }
      await updateTask(newTask.id, {
        status: "processing",
        upstreamTaskId: result.result
      });
      return await getTask(newTask.id);
    } catch (error) {
      await updateTask(newTask.id, {
        status: "failed",
        error: classifyFetchError(error)
      });
      return await getTask(newTask.id);
    }
  }
  function abortTask(taskId) {
    const controller = taskAbortControllers.get(taskId);
    if (controller) {
      controller.abort();
      taskAbortControllers.delete(taskId);
      console.log(`[Task ${taskId}] AbortController.abort() \u5DF2\u8C03\u7528`);
      return true;
    }
    return false;
  }
  return {
    createTask,
    updateTask,
    getTask,
    getTaskWithConfig,
    getTaskWithSummary,
    findByUniqueId,
    listTasks,
    deleteTask,
    listTrashTasks,
    restoreTask,
    emptyTrash,
    batchBlur,
    submitTask,
    syncTaskStatus,
    executeAction,
    abortTask
  };
}

export { readTaskLogs as r, useTaskService as u };
//# sourceMappingURL=task.mjs.map
