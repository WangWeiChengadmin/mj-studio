import { i as isImageMimeType, d as readFileAsBase64 } from './file.mjs';
import { u as useUpstreamService } from './upstream.mjs';
import { w as calcSize, x as logCompressRequest, y as logRequest, z as logError, A as logComplete, B as logResponse } from '../nitro/nitro.mjs';

function filesToClaudeContent(files) {
  const contents = [];
  for (const file of files) {
    if (isImageMimeType(file.mimeType)) {
      const base64 = readFileAsBase64(file.fileName);
      if (base64) {
        const match = base64.match(/^data:([^;]+);base64,(.+)$/);
        if (match) {
          contents.push({
            type: "image",
            source: {
              type: "base64",
              media_type: match[1],
              data: match[2]
            }
          });
        }
      }
    }
  }
  return contents;
}
function buildClaudeMessageContent(text, files) {
  if (!files || files.length === 0) {
    return text;
  }
  const contents = [];
  const fileContents = filesToClaudeContent(files);
  contents.push(...fileContents);
  if (text) {
    contents.push({ type: "text", text });
  }
  if (contents.length === 1 && contents[0].type === "text") {
    return text;
  }
  return contents;
}
function createClaudeChatService(upstream, keyName) {
  const upstreamService = useUpstreamService();
  const apiKey = upstreamService.getApiKey(upstream, keyName);
  const headers = {
    "Content-Type": "application/json",
    "anthropic-version": "2023-06-01"
  };
  if (apiKey.startsWith("sk-ant-")) {
    headers["x-api-key"] = apiKey;
  } else {
    headers["Authorization"] = `Bearer ${apiKey}`;
  }
  function buildMessages(historyMessages, userMessage, userFiles) {
    const messages = [];
    for (const msg of historyMessages) {
      messages.push({
        role: msg.role,
        content: buildClaudeMessageContent(msg.content, msg.files)
      });
    }
    messages.push({
      role: "user",
      content: buildClaudeMessageContent(userMessage, userFiles)
    });
    return messages;
  }
  async function chat(modelName, systemPrompt, historyMessages, userMessage, userFiles, signal, logContext) {
    var _a, _b;
    const url = `${upstream.baseUrl}/v1/messages`;
    const messages = buildMessages(historyMessages, userMessage, userFiles);
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
      max_tokens: 8192
    };
    if (systemPrompt) {
      body.system = systemPrompt;
    }
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
        return { success: false, error: errorMsg };
      }
      const data = await response.json();
      const content = ((_b = data.content) == null ? void 0 : _b.filter((block) => block.type === "text").map((block) => block.text).join("")) || "";
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
    var _a, _b, _c;
    const url = `${upstream.baseUrl}/v1/messages`;
    const messages = buildMessages(historyMessages, userMessage, userFiles);
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
      max_tokens: 8192,
      stream: true
    };
    if (systemPrompt) {
      body.system = systemPrompt;
    }
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
          if (!data || data === "[DONE]") continue;
          try {
            const parsed = JSON.parse(data);
            if (parsed.type === "content_block_delta") {
              const text = ((_c = parsed.delta) == null ? void 0 : _c.text) || "";
              if (text) {
                totalContent += text;
                yield { content: text, done: false };
              }
            } else if (parsed.type === "message_stop") {
              if (logContext) {
                const durationMs = Date.now() - startTime;
                logComplete({ ...logContext, configName: upstream.name, baseUrl: upstream.baseUrl, modelName }, calcSize(totalContent), durationMs);
              }
              yield { content: "", done: true };
              return;
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

export { createClaudeChatService as c };
//# sourceMappingURL=claude.mjs.map
