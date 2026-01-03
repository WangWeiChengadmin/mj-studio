import { i as isImageMimeType, d as readFileAsBase64 } from './file.mjs';
import { u as useUpstreamService } from './upstream.mjs';
import { w as calcSize, x as logCompressRequest, y as logRequest, z as logError, A as logComplete, B as logResponse } from '../nitro/nitro.mjs';

function filesToContent(files) {
  const contents = [];
  for (const file of files) {
    if (isImageMimeType(file.mimeType)) {
      const base64 = readFileAsBase64(file.fileName);
      if (base64) {
        contents.push({
          type: "image_url",
          image_url: { url: base64, detail: "auto" }
        });
      }
    }
  }
  return contents;
}
function buildMessageContent(text, files) {
  if (!files || files.length === 0) {
    return text;
  }
  const contents = [];
  if (text) {
    contents.push({ type: "text", text });
  }
  const fileContents = filesToContent(files);
  contents.push(...fileContents);
  if (contents.length === 1 && contents[0].type === "text") {
    return text;
  }
  return contents;
}
function createChatService(upstream, keyName) {
  const upstreamService = useUpstreamService();
  const apiKey = upstreamService.getApiKey(upstream, keyName);
  const headers = {
    "Authorization": `Bearer ${apiKey}`,
    "Content-Type": "application/json"
  };
  function buildMessages(systemPrompt, historyMessages, userMessage, userFiles) {
    const messages = [];
    if (systemPrompt) {
      messages.push({ role: "system", content: systemPrompt });
    }
    for (const msg of historyMessages) {
      messages.push({
        role: msg.role,
        content: buildMessageContent(msg.content, msg.files)
      });
    }
    messages.push({
      role: "user",
      content: buildMessageContent(userMessage, userFiles)
    });
    return messages;
  }
  async function chat(modelName, systemPrompt, historyMessages, userMessage, userFiles, signal, logContext) {
    var _a, _b, _c, _d;
    const url = `${upstream.baseUrl}/v1/chat/completions`;
    const messages = buildMessages(systemPrompt, historyMessages, userMessage, userFiles);
    const startTime = Date.now();
    if (logContext) {
      const ctx = { ...logContext, configName: upstream.name, baseUrl: upstream.baseUrl, modelName };
      const systemPromptSize = systemPrompt ? calcSize(systemPrompt) : 0;
      const historySize = historyMessages.reduce((sum, m) => sum + calcSize(m.content), 0);
      const currentSize = calcSize(userMessage);
      if (logContext.type === "\u538B\u7F29") {
        logCompressRequest(ctx, historyMessages.length, historySize, systemPromptSize);
      } else {
        logRequest(ctx, {
          systemPromptSize,
          historyCount: historyMessages.length,
          historySize,
          currentSize
        });
      }
    }
    const body = {
      model: modelName,
      messages,
      stream: false
    };
    try {
      const response = await fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify(body),
        signal
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMsg = ((_a = errorData.error) == null ? void 0 : _a.message) || `HTTP ${response.status}: ${response.statusText}`;
        if (logContext) {
          logError({ ...logContext, configName: upstream.name, baseUrl: upstream.baseUrl, modelName }, errorMsg);
        }
        return {
          success: false,
          error: errorMsg
        };
      }
      const data = await response.json();
      const content = ((_d = (_c = (_b = data.choices) == null ? void 0 : _b[0]) == null ? void 0 : _c.message) == null ? void 0 : _d.content) || "";
      const durationMs = Date.now() - startTime;
      if (logContext) {
        logResponse({ ...logContext, configName: upstream.name, baseUrl: upstream.baseUrl, modelName }, calcSize(content), durationMs);
      }
      return { success: true, content };
    } catch (error) {
      if (error.name === "AbortError") {
        return { success: false, error: "\u8BF7\u6C42\u5DF2\u53D6\u6D88" };
      }
      if (logContext) {
        logError({ ...logContext, configName: upstream.name, baseUrl: upstream.baseUrl, modelName }, error.message || "\u8BF7\u6C42\u5931\u8D25");
      }
      return { success: false, error: error.message || "\u8BF7\u6C42\u5931\u8D25" };
    }
  }
  async function* chatStream(modelName, systemPrompt, historyMessages, userMessage, userFiles, signal, logContext) {
    var _a, _b, _c, _d, _e;
    const url = `${upstream.baseUrl}/v1/chat/completions`;
    const messages = buildMessages(systemPrompt, historyMessages, userMessage, userFiles);
    const startTime = Date.now();
    if (logContext) {
      const ctx = { ...logContext, configName: upstream.name, baseUrl: upstream.baseUrl, modelName };
      const systemPromptSize = systemPrompt ? calcSize(systemPrompt) : 0;
      const historySize = historyMessages.reduce((sum, m) => sum + calcSize(m.content), 0);
      const currentSize = calcSize(userMessage);
      if (logContext.type === "\u538B\u7F29") {
        logCompressRequest(ctx, historyMessages.length, historySize, systemPromptSize);
      } else {
        logRequest(ctx, {
          systemPromptSize,
          historyCount: historyMessages.length,
          historySize,
          currentSize
        });
      }
    }
    const body = {
      model: modelName,
      messages,
      stream: true
    };
    let totalContent = "";
    try {
      const response = await fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify(body),
        signal
      });
      if (!response.ok) {
        const errorText = await response.text();
        let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
        try {
          const errorData = JSON.parse(errorText);
          errorMessage = ((_a = errorData.error) == null ? void 0 : _a.message) || errorMessage;
        } catch {
        }
        if (logContext) {
          logError({ ...logContext, configName: upstream.name, baseUrl: upstream.baseUrl, modelName }, errorMessage);
        }
        throw new Error(errorMessage);
      }
      const reader = (_b = response.body) == null ? void 0 : _b.getReader();
      if (!reader) {
        yield { content: "", done: true };
        return;
      }
      const decoder = new TextDecoder();
      let buffer = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";
        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed || !trimmed.startsWith("data:")) continue;
          const data = trimmed.slice(5).trim();
          if (data === "[DONE]") {
            if (logContext) {
              const durationMs = Date.now() - startTime;
              logComplete({ ...logContext, configName: upstream.name, baseUrl: upstream.baseUrl, modelName }, calcSize(totalContent), durationMs);
            }
            yield { content: "", done: true };
            return;
          }
          try {
            const parsed = JSON.parse(data);
            const content = ((_e = (_d = (_c = parsed.choices) == null ? void 0 : _c[0]) == null ? void 0 : _d.delta) == null ? void 0 : _e.content) || "";
            if (content) {
              totalContent += content;
              yield { content, done: false };
            }
          } catch {
          }
        }
      }
      if (logContext) {
        const durationMs = Date.now() - startTime;
        logComplete({ ...logContext, configName: upstream.name, baseUrl: upstream.baseUrl, modelName }, calcSize(totalContent), durationMs);
      }
      yield { content: "", done: true };
    } catch (error) {
      if (error.name === "AbortError") {
        yield { content: "", done: true };
        return;
      }
      if (logContext) {
        logError({ ...logContext, configName: upstream.name, baseUrl: upstream.baseUrl, modelName }, error.message || "\u8BF7\u6C42\u5931\u8D25");
      }
      throw error;
    }
  }
  return {
    chat,
    chatStream,
    buildMessages
  };
}

export { createChatService as c };
//# sourceMappingURL=chat.mjs.map
