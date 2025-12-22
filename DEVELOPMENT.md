# 开发文档

> **重要**：开始开发前请先阅读本文档和 [README](README.md)。

核心概念（上游、模型配置）请参考 [README](README.md#核心概念)。

## 目录结构

```
├── app/
│   ├── pages/
│   │   ├── index.vue           # 主页（功能入口）
│   │   ├── drawing.vue         # 绘图工作台
│   │   ├── chat.vue            # AI 对话
│   │   ├── login.vue           # 登录页
│   │   ├── settings/           # 设置页面
│   │   ├── trash.vue           # 回收站
│   │   └── user.vue            # 用户设置
│   ├── components/
│   │   ├── AppHeader.vue       # 全局头部导航
│   │   ├── drawing/            # 绘图相关组件
│   │   └── chat/               # 对话相关组件
│   │       ├── MessageList.vue # 消息列表（流式渲染）
│   │       └── MessageInput.vue# 消息输入框
│   ├── composables/
│   │   ├── useAuth.ts          # JWT 认证
│   │   ├── useTasks.ts         # 绘图任务管理
│   │   ├── useTrash.ts         # 回收站管理
│   │   ├── useModelConfigs.ts  # 模型配置管理
│   │   ├── useAssistants.ts    # 助手管理
│   │   ├── useConversations.ts # 对话管理（含流式输出）
│   │   ├── useChatModels.ts    # 对话模型选择
│   │   └── useMarkdown.ts      # Markdown 渲染
│   ├── shared/
│   │   └── types.ts            # 前后端共享类型
│   └── middleware/
│       └── auth.ts             # 认证中间件
├── server/
│   ├── api/
│   │   ├── auth/               # 认证 API
│   │   ├── tasks/              # 绘图任务 API
│   │   ├── model-configs/      # 模型配置 API
│   │   ├── assistants/         # 助手 API
│   │   ├── conversations/      # 对话 API
│   │   ├── messages/           # 消息 API（含 SSE 流）
│   │   └── images/             # 图片上传/获取
│   ├── database/
│   │   ├── index.ts            # 数据库连接
│   │   ├── schema.ts           # 表结构定义
│   │   └── migrations/         # 数据库迁移文件
│   └── services/
│       ├── task.ts             # 绘图任务服务
│       ├── mj.ts               # MJ-Proxy 格式
│       ├── gemini.ts           # Gemini 格式
│       ├── dalle.ts            # DALL-E 格式
│       ├── openaiChat.ts       # OpenAI Chat 格式
│       ├── assistant.ts        # 助手服务
│       ├── conversation.ts     # 对话服务
│       ├── chat.ts             # 对话生成服务
│       ├── streamingTask.ts    # 流式任务管理
│       ├── streamingCache.ts   # 流式内容缓存
│       ├── logger.ts           # 请求日志服务
│       └── image.ts            # 图片处理服务
├── logs/                       # API 请求/响应日志
├── data/                       # SQLite 数据库文件（mj-studio.db）
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

## UI 组件规范

本项目使用 **Nuxt UI 3**，遵循以下规范以保持一致性，避免过度自定义样式。

### 表单组件

**必须使用 `UForm` + `UFormField` 组合**，而非手动写 `<label>` 标签：

```vue
<!-- ✅ 正确 -->
<UForm :state="formData" :validate="validate" @submit="onSubmit">
  <UFormField label="用户名" name="username" required>
    <UInput v-model="formData.username" placeholder="请输入" />
  </UFormField>

  <UFormField label="描述" name="description">
    <UTextarea v-model="formData.description" :rows="4" />
  </UFormField>

  <UButton type="submit">保存</UButton>
</UForm>

<!-- ❌ 错误：手动写 label -->
<label class="block text-sm mb-2">用户名</label>
<UInput v-model="formData.username" />
```

**表单验证**使用 `validate` 函数：

```typescript
import type { FormSubmitEvent, FormError } from '@nuxt/ui'

function validate(state: typeof formData): FormError[] {
  const errors: FormError[] = []
  if (!state.username?.trim()) {
    errors.push({ name: 'username', message: '请输入用户名' })
  }
  return errors
}

function onSubmit(event: FormSubmitEvent<typeof formData>) {
  // event.data 包含验证通过的表单数据
}
```

### 模态框

使用 `UModal` 组件，通过 `:ui` 属性调整宽度：

```vue
<UModal
  v-model:open="showModal"
  title="标题"
  description="可选描述"
  :ui="{ content: 'sm:max-w-xl' }"
>
  <template #body>
    <!-- 内容 -->
  </template>

  <template #footer>
    <UButton variant="ghost" @click="showModal = false">取消</UButton>
    <UButton color="primary" @click="handleSave">保存</UButton>
  </template>
</UModal>
```

常用宽度：`sm:max-w-lg`（默认）、`sm:max-w-xl`、`sm:max-w-2xl`、`sm:max-w-4xl`

### 下拉菜单

选择列表使用 `UDropdownMenu`，支持分组：

```vue
<UDropdownMenu :items="menuItems">
  <UButton variant="outline">
    {{ displayText }}
    <UIcon name="i-heroicons-chevron-down" />
  </UButton>
</UDropdownMenu>

<script setup>
const menuItems = computed(() => [
  [
    { label: '分组标题', type: 'label' },
    { label: '选项1', onSelect: () => handleSelect(1) },
    { label: '选项2', onSelect: () => handleSelect(2) },
  ],
  [
    { label: '另一分组', type: 'label' },
    { label: '选项3', onSelect: () => handleSelect(3) },
  ],
])
</script>
```

### Toast 通知

使用 `useToast()` 替代 `alert()`：

```typescript
const toast = useToast()

// 成功
toast.add({ title: '保存成功', color: 'success' })

// 错误
toast.add({ title: '操作失败', description: '详细信息', color: 'error' })

// 警告
toast.add({ title: '请注意', color: 'warning' })
```

### 按钮

```vue
<!-- 主要操作 -->
<UButton color="primary">保存</UButton>

<!-- 次要操作 -->
<UButton variant="outline" color="neutral">编辑</UButton>

<!-- 文字按钮 -->
<UButton variant="ghost">取消</UButton>

<!-- 危险操作 -->
<UButton color="error">删除</UButton>

<!-- 带图标 -->
<UButton>
  <UIcon name="i-heroicons-plus" class="w-4 h-4 mr-1" />
  添加
</UButton>
```

### 样式原则

1. **优先使用组件 props**：如 `color`、`variant`、`size`，而非自定义 class
2. **使用 CSS 变量**：如 `text-(--ui-text-muted)`、`bg-(--ui-bg-elevated)`
3. **避免硬编码颜色**：使用主题变量确保深色模式兼容
4. **间距使用 Tailwind**：`space-y-4`、`gap-2`、`p-4` 等
5. **响应式优先**：移动端优先，必要时使用 `sm:`、`md:` 前缀

### 图标

使用 Heroicons，通过 `UIcon` 组件：

```vue
<UIcon name="i-heroicons-plus" class="w-4 h-4" />
<UIcon name="i-heroicons-trash" class="w-5 h-5" />
<UIcon name="i-heroicons-chevron-down" class="w-4 h-4" />
```

常用图标：`plus`、`trash`、`pencil`、`x-mark`、`chevron-down`、`cpu-chip`、`user-circle`、`cloud-arrow-up`

## 数据库迁移

本项目使用 Drizzle ORM 管理数据库迁移。

### 迁移命令

```bash
# 生成迁移文件（根据 schema.ts 变更）
pnpm db:generate

# 执行迁移
pnpm db:migrate
```

### 迁移文件结构

```
server/database/migrations/
├── meta/
│   └── _journal.json           # 迁移记录索引
├── 0000_last_proemial_gods.sql # 初始表结构
├── 0001_productive_prima.sql
├── ...
└── 0006_add_message_status.sql # 最新迁移
```

### 添加新迁移

1. 修改 `server/database/schema.ts` 中的表结构
2. 运行 `pnpm db:generate` 生成迁移文件
3. 检查生成的 SQL 文件是否正确
4. 运行 `pnpm db:migrate` 执行迁移
5. 提交 schema.ts 和迁移文件

### 注意事项

- 数据库文件位于 `data/mj-studio.db`
- 迁移记录存储在 `__drizzle_migrations` 表中
- 生产环境部署时需要执行 `pnpm db:migrate`

## 流式输出系统

对话模块采用后端独立状态机模式实现流式输出，详细设计见 [流式输出系统设计和实现规范](docs/流式输出系统设计和实现规范.md)。

### 架构概览

```
前端                          后端
  │                            │
  ├─ POST /messages ──────────►│ 创建消息，返回 messageId
  │                            │
  ├─ GET /messages/:id/stream ►│ SSE 订阅
  │◄─────── data: {content} ───│ 流式推送内容
  │◄─────── data: {done} ──────│ 完成信号
  │                            │
  ├─ POST /messages/:id/stop ─►│ 中止生成
```

### 消息状态流转

```
created → pending → streaming → completed
                            ↘ stopped
                            ↘ failed
```

### 关键文件

- `server/services/streamingTask.ts` - 流式任务管理
- `server/services/streamingCache.ts` - 内容缓存（支持断线重连）
- `app/composables/useConversations.ts` - 前端 SSE 订阅和打字机效果

## 认证系统

使用 JWT + localStorage 实现认证：

- 登录成功后返回 JWT token，前端存储在 localStorage
- 请求时通过 `Authorization: Bearer <token>` 头传递
- SSE 流式请求也需要携带认证头

### 关键文件

- `server/api/auth/login.post.ts` - 登录接口
- `app/composables/useAuth.ts` - 前端认证状态管理

## 环境变量

必需的环境变量（存放在 `.env` 文件）：

```bash
# JWT 密钥（必需）
JWT_SECRET=your-secret-key

# 数据库文件路径（可选，默认 data/mj-studio.db）
DATABASE_URL=data/mj-studio.db

# HMR 端口（可选，用于 Docker 环境）
NUXT_HMR_PORT=24678
```
