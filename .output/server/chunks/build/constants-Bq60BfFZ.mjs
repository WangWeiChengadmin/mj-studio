const IMAGE_MODEL_TYPES = [
  "midjourney",
  "gemini",
  "flux",
  "dalle",
  "doubao",
  "gpt4o-image",
  "gpt-image",
  "sora-image",
  "grok-image",
  "qwen-image",
  "z-image",
  "koukoutu"
];
const CHAT_MODEL_TYPES = [
  "gpt",
  "claude",
  "gemini-chat",
  "deepseek",
  "qwen-chat",
  "grok",
  "llama",
  "moonshot",
  "glm",
  "doubao-chat",
  "minimax",
  "hunyuan",
  "mixtral",
  "phi"
];
const VIDEO_MODEL_TYPES = [
  "jimeng-video",
  "veo",
  "sora",
  "grok-video"
];
[...IMAGE_MODEL_TYPES, ...CHAT_MODEL_TYPES, ...VIDEO_MODEL_TYPES];
const MODEL_API_FORMAT_OPTIONS = {
  // 绘图模型
  "midjourney": ["mj-proxy"],
  "gemini": ["gemini", "openai-chat"],
  "flux": ["dalle"],
  "dalle": ["dalle"],
  "doubao": ["dalle"],
  "gpt4o-image": ["openai-chat"],
  "gpt-image": ["openai-chat"],
  "sora-image": ["openai-chat"],
  "grok-image": ["openai-chat"],
  "qwen-image": ["openai-chat"],
  "z-image": ["dalle"],
  "koukoutu": ["koukoutu"],
  // 对话模型（支持 OpenAI Chat 和 Claude 格式）
  "gpt": ["openai-chat", "claude"],
  "claude": ["openai-chat", "claude"],
  "gemini-chat": ["openai-chat", "claude"],
  "deepseek": ["openai-chat", "claude"],
  "qwen-chat": ["openai-chat", "claude"],
  "grok": ["openai-chat", "claude"],
  "llama": ["openai-chat", "claude"],
  "moonshot": ["openai-chat", "claude"],
  "glm": ["openai-chat", "claude"],
  "doubao-chat": ["openai-chat", "claude"],
  "minimax": ["openai-chat", "claude"],
  "hunyuan": ["openai-chat", "claude"],
  "mixtral": ["openai-chat", "claude"],
  "phi": ["openai-chat", "claude"],
  // 视频模型
  "jimeng-video": ["video-unified"],
  "veo": ["video-unified"],
  "sora": ["video-unified"],
  "grok-video": ["video-unified"]
};
const DEFAULT_MODEL_NAMES = {
  // 绘图模型
  "midjourney": "midjourney",
  // MJ 实际不需要模型名，但需要一个默认值用于显示和判断
  "gemini": "gemini-2.5-flash-image",
  "flux": "flux-dev",
  "dalle": "dall-e-3",
  "doubao": "doubao-seedream-3-0-t2i-250415",
  "gpt4o-image": "gpt-4o",
  "gpt-image": "gpt-image-1.5-all",
  "sora-image": "sora_image",
  "grok-image": "grok-4",
  "qwen-image": "qwen-image",
  "z-image": "z-image-turbo",
  "koukoutu": "background-removal",
  // 对话模型
  "gpt": "gpt-4o",
  "claude": "claude-sonnet-4-20250514",
  "gemini-chat": "gemini-2.5-flash",
  "deepseek": "deepseek-chat",
  "qwen-chat": "qwen-max",
  "grok": "grok-3",
  "llama": "llama-3.3-70b-instruct-fp8-fast",
  "moonshot": "moonshot-v1-128k",
  "glm": "glm-4.5",
  "doubao-chat": "doubao-1-5-pro-256k-250115",
  "minimax": "minimax-m1-80k",
  "hunyuan": "hunyuan-t1",
  "mixtral": "mixtral-8x22b",
  "phi": "phi-4",
  // 视频模型
  "jimeng-video": "jimeng-video-3.0",
  "veo": "veo3.1-fast",
  "sora": "sora-2",
  "grok-video": "grok-video-3"
};
const DEFAULT_ESTIMATED_TIMES = {
  "midjourney": 60,
  "gemini": 15,
  "flux": 20,
  "dalle": 15,
  "doubao": 15,
  "gpt4o-image": 30,
  "gpt-image": 30,
  "sora-image": 30,
  "grok-image": 30,
  "qwen-image": 30,
  "z-image": 15,
  "koukoutu": 10
};
const DEFAULT_FALLBACK_ESTIMATED_TIME = 60;
const DEFAULT_VIDEO_ESTIMATED_TIMES = {
  "jimeng-video": 120,
  "veo": 180,
  "sora": 180,
  "grok-video": 120
};
const DEFAULT_CHAT_FALLBACK_ESTIMATED_TIME = 3;
const MODEL_TYPE_LABELS = {
  // 绘图模型
  "midjourney": "Midjourney",
  "gemini": "Gemini 绘图",
  "flux": "Flux",
  "dalle": "DALL-E",
  "doubao": "豆包绘图",
  "gpt4o-image": "GPT-4o 绘图",
  "gpt-image": "GPT Image",
  "sora-image": "Sora 绘图",
  "grok-image": "Grok 绘图",
  "qwen-image": "通义万相",
  "z-image": "Z-Image",
  "koukoutu": "抠抠图",
  // 对话模型
  "gpt": "GPT",
  "claude": "Claude",
  "gemini-chat": "Gemini",
  "deepseek": "DeepSeek",
  "qwen-chat": "通义千问",
  "grok": "Grok",
  "llama": "LLaMA",
  "moonshot": "Kimi",
  "glm": "智谱GLM",
  "doubao-chat": "豆包",
  "minimax": "MiniMax",
  "hunyuan": "混元",
  "mixtral": "Mixtral",
  "phi": "Phi",
  // 视频模型
  "jimeng-video": "即梦视频",
  "veo": "Veo",
  "sora": "Sora",
  "grok-video": "Grok 视频"
};
const API_FORMAT_LABELS = {
  "mj-proxy": "MJ-Proxy",
  "gemini": "Gemini API",
  "dalle": "DALL-E API",
  "openai-chat": "OpenAI Chat",
  "claude": "Claude API",
  "koukoutu": "抠抠图 API",
  "video-unified": "视频统一格式"
};
const MODEL_TYPE_ICONS = {
  "midjourney": "i-heroicons-sparkles",
  "gemini": "i-heroicons-cpu-chip",
  "flux": "i-heroicons-bolt",
  "dalle": "i-heroicons-photo",
  "doubao": "i-heroicons-fire",
  "gpt4o-image": "i-heroicons-chat-bubble-left-right",
  "gpt-image": "i-heroicons-photo",
  "sora-image": "i-heroicons-film",
  "grok-image": "i-heroicons-rocket-launch",
  "qwen-image": "i-heroicons-cloud",
  "z-image": "i-heroicons-cube",
  "koukoutu": "i-heroicons-scissors"
};
const TASK_CARD_MODEL_DISPLAY = {
  // 图片模型
  "midjourney": { label: "MJ", color: "bg-purple-500/80" },
  "gemini": { label: "Gemini", color: "bg-blue-500/80" },
  "flux": { label: "Flux", color: "bg-orange-500/80" },
  "dalle": { label: "DALL-E", color: "bg-green-500/80" },
  "doubao": { label: "豆包", color: "bg-cyan-500/80" },
  "gpt4o-image": { label: "GPT-4o", color: "bg-emerald-500/80" },
  "gpt-image": { label: "GPT", color: "bg-lime-500/80" },
  "sora-image": { label: "Sora", color: "bg-amber-500/80" },
  "grok-image": { label: "Grok", color: "bg-red-500/80" },
  "qwen-image": { label: "通义", color: "bg-violet-500/80" },
  "z-image": { label: "Z-Image", color: "bg-indigo-500/80" },
  "koukoutu": { label: "抠图", color: "bg-pink-500/80" },
  // 视频模型
  "jimeng-video": { label: "即梦", color: "bg-teal-500/80" },
  "veo": { label: "Veo", color: "bg-rose-500/80" },
  "sora": { label: "Sora", color: "bg-amber-500/80" },
  "grok-video": { label: "Grok", color: "bg-red-500/80" }
};
const MODELS_WITHOUT_REFERENCE_IMAGE = ["dalle", "z-image"];
const MODELS_WITH_NEGATIVE_PROMPT = ["flux", "doubao", "z-image"];
const MODELS_WITH_SIZE = ["dalle", "doubao", "gpt4o-image"];
const MODELS_WITH_QUALITY = ["dalle", "gpt4o-image"];
const MODELS_WITH_STYLE = ["dalle"];
const MODELS_WITH_ASPECT_RATIO = ["flux"];
const MODELS_WITH_SEED = ["doubao"];
const MODELS_WITH_GUIDANCE = ["doubao"];
const MODELS_WITH_WATERMARK = ["doubao"];
const MODELS_WITH_BACKGROUND = ["gpt4o-image"];
const MAX_REFERENCE_IMAGE_SIZE_BYTES = 10 * 1024 * 1024;
const MAX_REFERENCE_IMAGE_COUNT = 3;
const PROGRESS_TIME_BUFFER_RATIO = 1.1;
const CHAT_MODEL_MATCH_RULES = [
  {
    type: "gpt",
    patterns: [
      /^gpt/i,
      /^chatgpt/i,
      /^o[134]-/i,
      // o1-preview, o3-mini, o4-mini 等
      /^o[134]$/i
      // 纯 o1, o3, o4
    ]
  },
  {
    type: "claude",
    patterns: [
      /claude/i
    ]
  },
  {
    type: "gemini-chat",
    patterns: [
      /^gemini/i
    ]
  },
  {
    type: "deepseek",
    patterns: [
      /deepseek/i
    ]
  },
  {
    type: "qwen-chat",
    patterns: [
      /^qwen/i,
      /^qwq/i,
      // QWQ 推理模型
      /tongyi/i,
      /通义/
    ]
  },
  {
    type: "grok",
    patterns: [
      /^grok/i
    ]
  },
  {
    type: "llama",
    patterns: [
      /^llama/i
    ]
  },
  {
    type: "moonshot",
    patterns: [
      /^moonshot/i,
      /^kimi/i
    ]
  },
  {
    type: "glm",
    patterns: [
      /^glm/i
    ]
  },
  {
    type: "doubao-chat",
    patterns: [
      /^doubao/i
    ]
  },
  {
    type: "minimax",
    patterns: [
      /^minimax/i,
      /^MiniMax/
    ]
  },
  {
    type: "hunyuan",
    patterns: [
      /^hunyuan/i,
      /混元/
    ]
  },
  {
    type: "mixtral",
    patterns: [
      /^mixtral/i
    ]
  },
  {
    type: "phi",
    patterns: [
      /^phi/i,
      /^Phi/
    ]
  }
];
function inferChatModelType(modelName) {
  if (!modelName?.trim()) return null;
  const name = modelName.trim();
  for (const rule of CHAT_MODEL_MATCH_RULES) {
    if (rule.patterns.some((pattern) => pattern.test(name))) {
      return rule.type;
    }
  }
  return null;
}
const USER_SETTING_KEYS = {
  // Prompt 设置
  PROMPT_COMPRESS: "prompt.compress",
  PROMPT_GENERATE_TITLE: "prompt.generateTitle",
  PROMPT_SUGGESTIONS: "prompt.suggestions",
  // 通用设置
  GENERAL_BLUR_BY_DEFAULT: "general.blurByDefault",
  GENERAL_COMPRESS_KEEP_COUNT: "general.compressKeepCount",
  GENERAL_TITLE_MAX_LENGTH: "general.titleMaxLength",
  GENERAL_SUGGESTIONS_COUNT: "general.suggestionsCount",
  GENERAL_IMAGE_SAVE_PATH: "general.imageSavePath",
  // 绘图设置（AI 优化）
  DRAWING_AI_OPTIMIZE_UPSTREAM_ID: "drawing.aiOptimizeUpstreamId",
  DRAWING_AI_OPTIMIZE_AIMODEL_ID: "drawing.aiOptimizeAimodelId",
  DRAWING_AI_OPTIMIZE_MODEL_NAME: "drawing.aiOptimizeModelName",
  // 绘图设置（嵌入式绘画）
  DRAWING_EMBEDDED_UPSTREAM_ID: "drawing.embeddedUpstreamId",
  DRAWING_EMBEDDED_AIMODEL_ID: "drawing.embeddedAimodelId",
  // 绘图设置（工作台默认模型）
  DRAWING_WORKBENCH_UPSTREAM_ID: "drawing.workbenchUpstreamId",
  DRAWING_WORKBENCH_AIMODEL_ID: "drawing.workbenchAimodelId"
};
const DEFAULT_COMPRESS_PROMPT = `请将以下对话内容压缩为一份详细的摘要（约500-1000字），需要保留：
1. 讨论的主要话题和结论
2. 重要的技术细节、代码片段或配置信息
3. 用户的关键需求和偏好
4. 待解决的问题或后续任务

{messages}

直接输出摘要内容，不要加标题或格式说明。`;
const DEFAULT_GENERATE_TITLE_PROMPT = `请根据以下对话内容，生成一个简洁的对话标题（10-20个字），直接输出标题，不要加引号或其他格式。

{context}`;
const DEFAULT_SUGGESTIONS_PROMPT = `现在用户开始了一次新对话，当前时间是 {time}。请根据你的角色定位，为用户提供开场白建议，帮助用户快速开始对话。
要求：
1. 每条建议简洁明了，10-30 字
2. 建议应该多样化，覆盖不同场景
3. 以 JSON 数组格式返回，例如：["问题1", "问题2", "问题3"]
4. 直接输出 JSON，不要加其他说明`;
const USER_SETTING_DEFAULTS = {
  [USER_SETTING_KEYS.PROMPT_COMPRESS]: DEFAULT_COMPRESS_PROMPT,
  [USER_SETTING_KEYS.PROMPT_GENERATE_TITLE]: DEFAULT_GENERATE_TITLE_PROMPT,
  [USER_SETTING_KEYS.PROMPT_SUGGESTIONS]: DEFAULT_SUGGESTIONS_PROMPT,
  [USER_SETTING_KEYS.GENERAL_BLUR_BY_DEFAULT]: true,
  [USER_SETTING_KEYS.GENERAL_COMPRESS_KEEP_COUNT]: 4,
  [USER_SETTING_KEYS.GENERAL_TITLE_MAX_LENGTH]: 30,
  [USER_SETTING_KEYS.GENERAL_SUGGESTIONS_COUNT]: 5,
  [USER_SETTING_KEYS.GENERAL_IMAGE_SAVE_PATH]: "",
  // 绘图设置默认值（0 表示未设置，使用系统默认）
  [USER_SETTING_KEYS.DRAWING_AI_OPTIMIZE_UPSTREAM_ID]: 0,
  [USER_SETTING_KEYS.DRAWING_AI_OPTIMIZE_AIMODEL_ID]: 0,
  [USER_SETTING_KEYS.DRAWING_AI_OPTIMIZE_MODEL_NAME]: "",
  [USER_SETTING_KEYS.DRAWING_EMBEDDED_UPSTREAM_ID]: 0,
  [USER_SETTING_KEYS.DRAWING_EMBEDDED_AIMODEL_ID]: 0,
  // 绘图工作台默认模型（0 表示未设置，使用系统默认）
  [USER_SETTING_KEYS.DRAWING_WORKBENCH_UPSTREAM_ID]: 0,
  [USER_SETTING_KEYS.DRAWING_WORKBENCH_AIMODEL_ID]: 0
};

export { API_FORMAT_LABELS as A, DEFAULT_CHAT_FALLBACK_ESTIMATED_TIME as D, IMAGE_MODEL_TYPES as I, MODEL_TYPE_LABELS as M, PROGRESS_TIME_BUFFER_RATIO as P, TASK_CARD_MODEL_DISPLAY as T, USER_SETTING_KEYS as U, VIDEO_MODEL_TYPES as V, DEFAULT_FALLBACK_ESTIMATED_TIME as a, MODEL_TYPE_ICONS as b, MODELS_WITHOUT_REFERENCE_IMAGE as c, MODELS_WITH_NEGATIVE_PROMPT as d, MODELS_WITH_SIZE as e, MODELS_WITH_QUALITY as f, MODELS_WITH_STYLE as g, MODELS_WITH_ASPECT_RATIO as h, MODELS_WITH_SEED as i, MODELS_WITH_GUIDANCE as j, MODELS_WITH_WATERMARK as k, MODELS_WITH_BACKGROUND as l, MAX_REFERENCE_IMAGE_COUNT as m, DEFAULT_VIDEO_ESTIMATED_TIMES as n, MAX_REFERENCE_IMAGE_SIZE_BYTES as o, USER_SETTING_DEFAULTS as p, DEFAULT_SUGGESTIONS_PROMPT as q, DEFAULT_GENERATE_TITLE_PROMPT as r, DEFAULT_COMPRESS_PROMPT as s, DEFAULT_MODEL_NAMES as t, inferChatModelType as u, MODEL_API_FORMAT_OPTIONS as v, DEFAULT_ESTIMATED_TIMES as w };
//# sourceMappingURL=constants-Bq60BfFZ.mjs.map
