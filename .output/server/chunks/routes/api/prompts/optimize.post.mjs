import { d as defineEventHandler, r as requireAuth, a as readBody, c as createError } from '../../../nitro/nitro.mjs';
import { c as createChatService } from '../../../_/chat.mjs';
import { u as useUpstreamService } from '../../../_/upstream.mjs';
import { u as useAimodelService } from '../../../_/aimodel.mjs';
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
import '../../../_/file.mjs';

function buildSystemPrompt(targetModelType, targetModelName) {
  const modelInfo = targetModelType || targetModelName ? `

\u76EE\u6807\u7ED8\u56FE\u6A21\u578B\u4FE1\u606F\uFF1A
- \u6A21\u578B\u7C7B\u578B: ${targetModelType || "\u672A\u6307\u5B9A"}
- \u6A21\u578B\u540D\u79F0: ${targetModelName || "\u672A\u6307\u5B9A"}

\u8BF7\u6839\u636E\u76EE\u6807\u6A21\u578B\u7684\u7279\u70B9\u4F18\u5316\u63D0\u793A\u8BCD\u3002\u4F8B\u5982\uFF1A
- Midjourney: \u652F\u6301 --ar, --v, --style \u7B49\u53C2\u6570
- DALL-E: \u504F\u597D\u8BE6\u7EC6\u7684\u573A\u666F\u63CF\u8FF0
- Flux: \u64C5\u957F\u771F\u5B9E\u611F\u56FE\u7247
- Stable Diffusion: \u652F\u6301\u8D1F\u9762\u63D0\u793A\u8BCD` : "";
  return `\u4F60\u662F\u4E00\u4E2A\u4E13\u4E1A\u7684 AI \u7ED8\u56FE\u63D0\u793A\u8BCD\u4F18\u5316\u4E13\u5BB6\u3002\u4F60\u7684\u4EFB\u52A1\u662F\u5C06\u7528\u6237\u63D0\u4F9B\u7684\u7B80\u5355\u63CF\u8FF0\u4F18\u5316\u4E3A\u66F4\u8BE6\u7EC6\u3001\u66F4\u4E13\u4E1A\u7684\u7ED8\u56FE\u63D0\u793A\u8BCD\u3002
${modelInfo}
\u4F18\u5316\u89C4\u5219\uFF1A
1. \u4FDD\u6301\u539F\u59CB\u63CF\u8FF0\u7684\u6838\u5FC3\u610F\u56FE
2. \u6DFB\u52A0\u9002\u5F53\u7684\u827A\u672F\u98CE\u683C\u63CF\u8FF0\uFF08\u5982\uFF1A\u6CB9\u753B\u3001\u6C34\u5F69\u3001\u6570\u5B57\u827A\u672F\u7B49\uFF09
3. \u6DFB\u52A0\u5149\u5F71\u3001\u6784\u56FE\u3001\u8272\u5F69\u7B49\u4E13\u4E1A\u63CF\u8FF0
4. \u6DFB\u52A0\u8D28\u91CF\u76F8\u5173\u7684\u5173\u952E\u8BCD\uFF08\u5982\uFF1A\u9AD8\u6E05\u3001\u7EC6\u8282\u4E30\u5BCC\u30018K\u7B49\uFF09
5. \u4F7F\u7528\u82F1\u6587\u8F93\u51FA\uFF0C\u56E0\u4E3A\u5927\u591A\u6570 AI \u7ED8\u56FE\u6A21\u578B\u5BF9\u82F1\u6587\u63D0\u793A\u8BCD\u6548\u679C\u66F4\u597D
6. \u4FDD\u6301\u63D0\u793A\u8BCD\u7B80\u6D01\uFF0C\u907F\u514D\u8FC7\u4E8E\u5197\u957F\uFF08\u5EFA\u8BAE 50-150 \u8BCD\uFF09
7. \u5982\u679C\u76EE\u6807\u6A21\u578B\u652F\u6301\u8D1F\u9762\u63D0\u793A\u8BCD\uFF08\u5982 Flux\u3001Stable Diffusion\uFF09\uFF0C\u53EF\u4EE5\u63D0\u4F9B\u8D1F\u9762\u63D0\u793A\u8BCD

\u8F93\u51FA\u683C\u5F0F\uFF08JSON\uFF09\uFF1A
{
  "prompt": "\u4F18\u5316\u540E\u7684\u6B63\u5411\u63D0\u793A\u8BCD",
  "negativePrompt": "\u8D1F\u9762\u63D0\u793A\u8BCD\uFF08\u53EF\u9009\uFF0C\u4EC5\u5F53\u6A21\u578B\u652F\u6301\u65F6\u63D0\u4F9B\uFF09"
}

\u53EA\u8F93\u51FA JSON\uFF0C\u4E0D\u8981\u52A0\u4EFB\u4F55\u89E3\u91CA\u6216 markdown \u4EE3\u7801\u5757\u6807\u8BB0\u3002`;
}
const optimize_post = defineEventHandler(async (event) => {
  var _a;
  await requireAuth(event);
  const body = await readBody(event);
  const { prompt, upstreamId, aimodelId, modelName, targetModelType, targetModelName } = body;
  if (!(prompt == null ? void 0 : prompt.trim())) {
    throw createError({
      statusCode: 400,
      message: "\u8BF7\u63D0\u4F9B\u9700\u8981\u4F18\u5316\u7684\u63D0\u793A\u8BCD"
    });
  }
  if (!upstreamId || !aimodelId || !modelName) {
    throw createError({
      statusCode: 400,
      message: "\u8BF7\u5148\u5728\u8BBE\u7F6E\u4E2D\u914D\u7F6E AI \u4F18\u5316\u6A21\u578B"
    });
  }
  const upstreamService = useUpstreamService();
  const aimodelService = useAimodelService();
  const upstream = await upstreamService.getByIdSimple(upstreamId);
  if (!upstream) {
    throw createError({
      statusCode: 404,
      message: "\u4E0A\u6E38\u914D\u7F6E\u4E0D\u5B58\u5728"
    });
  }
  const aimodel = await aimodelService.getById(aimodelId);
  if (!aimodel) {
    throw createError({
      statusCode: 404,
      message: "\u6A21\u578B\u914D\u7F6E\u4E0D\u5B58\u5728"
    });
  }
  try {
    const keyName = aimodel.keyName;
    const chatService = createChatService(upstream, keyName);
    const systemPrompt = buildSystemPrompt(targetModelType, targetModelName);
    const result = await chatService.chat(
      modelName,
      systemPrompt,
      [],
      prompt.trim()
    );
    if (!result.success) {
      throw createError({
        statusCode: 500,
        message: result.error || "\u4F18\u5316\u5931\u8D25"
      });
    }
    const content = ((_a = result.content) == null ? void 0 : _a.trim()) || "";
    let optimizedPrompt = content;
    let negativePrompt = "";
    try {
      const parsed = JSON.parse(content);
      if (parsed.prompt) {
        optimizedPrompt = parsed.prompt;
        negativePrompt = parsed.negativePrompt || "";
      }
    } catch {
      optimizedPrompt = content;
    }
    return {
      success: true,
      optimizedPrompt,
      negativePrompt
    };
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: error.message || "\u4F18\u5316\u63D0\u793A\u8BCD\u5931\u8D25"
    });
  }
});

export { optimize_post as default };
//# sourceMappingURL=optimize.post.mjs.map
