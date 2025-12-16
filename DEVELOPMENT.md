# 开发文档

> **重要**：开始开发前请先阅读本文档和 [README](README.md)。

核心概念（上游、模型配置）请参考 [README](README.md#核心概念)。

## 目录结构

```
├── app/
│   ├── pages/
│   │   ├── index.vue           # 主页（绘图工作台）
│   │   ├── login.vue           # 登录页
│   │   ├── register.vue        # 注册页
│   │   ├── settings.vue        # 模型配置管理
│   │   └── trash.vue           # 回收站
│   ├── components/
│   │   ├── DrawingPanel.vue    # 绘图面板（提示词、参考图、模型选择）
│   │   ├── TaskList.vue        # 任务列表（分页、批量操作）
│   │   ├── TaskCard.vue        # 任务卡片（状态、操作按钮、参考图查看）
│   │   └── TrashList.vue       # 回收站列表
│   ├── composables/
│   │   ├── useTasks.ts         # 任务状态管理
│   │   ├── useTrash.ts         # 回收站状态管理
│   │   └── useModelConfigs.ts  # 模型配置管理
│   ├── utils/
│   │   └── sqids.ts            # 任务ID编解码（短链接）
│   └── middleware/
│       └── auth.ts             # 认证中间件
├── server/
│   ├── api/
│   │   ├── auth/               # 认证 API
│   │   ├── tasks/              # 任务 API（CRUD、重试、批量模糊、回收站）
│   │   └── model-configs/      # 模型配置 API
│   ├── database/
│   │   ├── index.ts            # 数据库连接
│   │   └── schema.ts           # 表结构定义
│   └── services/
│       ├── task.ts             # 任务服务（调度、软删除、回收站）
│       ├── mj.ts               # MJ-Proxy 格式
│       ├── gemini.ts           # Gemini 格式
│       ├── dalle.ts            # DALL-E 格式（含豆包、Flux特殊处理）
│       ├── openaiChat.ts       # OpenAI Chat 格式
│       ├── logger.ts           # 请求/响应日志服务
│       ├── image.ts            # 图片下载/保存服务
│       ├── types.ts            # 统一类型定义
│       └── modelConfig.ts      # 模型配置服务
├── logs/                       # API 请求/响应日志（按日期/任务ID组织）
├── data/                       # SQLite 数据库文件
├── drizzle.config.ts           # Drizzle 配置
└── nuxt.config.ts              # Nuxt 配置
```

## API 格式详解

| 请求格式 | 文生图接口 | 垫图接口 | 参考图格式 | 返回图片 |
|---------|-----------|---------|-----------|---------|
| MJ-Proxy | `POST /mj/submit/imagine` | 同左 | Base64 数组 | URL |
| Gemini | `POST /v1beta/models/{model}:generateContent` | 同左 | Base64 (inlineData) | Base64 |
| DALL-E | `POST /v1/images/generations` | 同左 | 纯 Base64 | URL / Base64 |
| DALL-E (豆包) | `POST /v1/images/generations` | 同左 | Data URL (`data:image/...;base64,...`) | URL |
| DALL-E (Flux) | `POST /v1/images/edits` | 同左 | multipart/form-data 文件上传 | Base64 |
| OpenAI Chat | `POST /v1/chat/completions` | 同左 | Base64 Data URL | URL (从 Markdown 解析) |

### MJ-Proxy 格式

兼容 [midjourney-proxy](https://github.com/novicezk/midjourney-proxy) API：
- `POST /mj/submit/imagine` - 文生图/垫图，参考图通过 `base64Array` 字段上传
- `POST /mj/submit/blend` - 图片混合
- `POST /mj/submit/action` - 按钮操作 (U/V/🔄)
- `GET /mj/task/{id}/fetch` - 轮询任务状态，返回 `imageUrl`

### Gemini 格式

使用 Google Generative Language API：
- `POST /v1beta/models/{model}:generateContent` - 文生图/垫图
- 参考图通过 `inlineData` 字段上传 (Base64)
- 返回图片为 Base64 (`candidates[].content.parts[].inlineData.data`)

### DALL-E 格式

兼容 OpenAI Images API，但不同模型有特殊处理：

**标准 DALL-E**：
- `POST /v1/images/generations` - 文生图/垫图
- 垫图时参考图通过 `image` 字段传递（纯 Base64）
- 返回 `data[].url` 或 `data[].b64_json`

**豆包模型**（模型名含 `doubao`）：
- 同上端点，但 `image` 字段需要完整 Data URL 格式：`data:image/png;base64,...`
- 不发送 `size` 参数（部分上游不支持 `adaptive`）

**Flux 模型**（模型名含 `flux`）：
- `POST /v1/images/edits` - 使用编辑端点
- `multipart/form-data` 格式，图片作为文件上传
- 返回 `data[].b64_json`

### OpenAI Chat 格式

兼容 OpenAI Chat Completions API（支持图像生成的模型）：
- `POST /v1/chat/completions` - 文生图/垫图
- 垫图时参考图通过 `content[].image_url.url` 字段上传 (支持 Base64 Data URL)
- 返回图片 URL 从 `choices[].message.content` 中解析 (Markdown格式)

## 日志系统

所有 API 请求和响应会记录到 `logs/` 目录，便于排查问题：

```
logs/
└── 2025-12-16/           # 按日期分组
    └── 57/               # 按任务ID分组
        ├── request.json  # 请求数据（URL、headers、body）
        └── response.json # 响应数据（状态码、响应体、错误）
```

日志中敏感信息会自动处理：
- `Authorization` header 显示为 `[REDACTED]`
- Base64 图片数据显示为 `[base64 N chars]` 或 `[dataUrl N chars]`

## 任务生命周期

```
pending → submitting → processing → success
                   ↘           ↘
                    failed ←────┘
                       ↓
                   (软删除)
                       ↓
                    回收站 → 恢复 / 永久删除
```

## 参考链接

- [Nuxt 4 文档](https://nuxt.com/docs)
- [Nuxt UI 3 文档](https://ui.nuxt.com/)
- [Drizzle ORM 文档](https://orm.drizzle.team/)
- [midjourney-proxy API](https://github.com/novicezk/midjourney-proxy)
- [Gemini API 图像生成](https://ai.google.dev/gemini-api/docs/image-generation)
