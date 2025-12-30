# 快速开始

## 简介

MJ-Studio 是一个多模型 AI 工作台，支持 AI 绘图、AI 视频生成和 AI 对话功能。

## 部署方式

### Docker 部署（推荐）

```bash
docker run -d \
  --name mj-studio \
  -p 3000:3000 \
  -v ./data:/app/data \
  your-registry/mj-studio:latest
```

### 手动部署

```bash
# 克隆项目
git clone https://github.com/your-org/mj-studio.git
cd mj-studio

# 安装依赖
pnpm install

# 构建
pnpm build

# 启动
node .output/server/index.mjs
```

## 首次配置

1. 访问 `http://localhost:3000`
2. 注册管理员账号
3. 进入设置页面配置 API 上游

详细配置说明请参考 [配置上游](./upstream.md)。
