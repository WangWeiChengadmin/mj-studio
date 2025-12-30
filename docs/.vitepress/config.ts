import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'MJ-Studio 文档',
  description: '多模型 AI 工作台文档中心',
  base: '/help/',
  lang: 'zh-CN',

  // 输出到 .vitepress/dist 目录（Nuxt 通过 publicAssets 引用）
  outDir: '.vitepress/dist',

  // 忽略死链接
  ignoreDeadLinks: true,

  head: [
    ['link', { rel: 'icon', href: '/logo.png' }],
  ],

  themeConfig: {
    logo: '/logo.png',
    siteTitle: 'MJ-Studio',

    nav: [
      { text: '首页', link: '/' },
      { text: '常见问题', link: '/常见问题' },
      { text: '返回应用', link: 'javascript:window.location.href="/"' },
    ],

    sidebar: [
      {
        text: '帮助中心',
        items: [
          { text: '常见问题', link: '/常见问题' },
        ],
      },
      {
        text: '功能模块',
        items: [
          { text: '对话功能', link: '/对话功能需求文档' },
          { text: '嵌入式绘图', link: '/嵌入式绘图组件设计' },
          { text: '流式输出', link: '/流式输出系统设计和实现规范' },
        ],
      },
      {
        text: '视频模块',
        items: [
          { text: '视频模型开发指南', link: '/视频模型开发指南' },
          { text: '视频模型调研', link: '/视频模型集成需求调研' },
        ],
      },
      {
        text: '工作流',
        items: [
          { text: '画布工作流设计', link: '/画布工作流设计' },
          { text: '节点类型系统', link: '/工作流节点类型系统' },
          { text: '执行系统', link: '/工作流执行系统' },
          { text: 'ComfyUI 集成', link: '/ComfyUI集成指南' },
        ],
      },
      {
        text: '设计规范',
        items: [
          { text: '设计系统', link: '/设计系统规范' },
          { text: '任务卡片组件', link: '/任务卡片组件设计文档' },
          { text: '模型选择器', link: '/模型选择器组件设计文档' },
          { text: '日志规范', link: '/日志规范需求' },
          { text: '错误规范', link: '/绘图任务错误规范' },
        ],
      },
      {
        text: '架构文档',
        items: [
          { text: '模型参数架构 RFC', link: '/RFC-模型参数架构重构' },
          { text: 'ImageForm 参数方案', link: '/ImageForm模型参数开发方案' },
          { text: '任务多图支持', link: '/任务多图支持设计' },
          { text: '对话压缩逻辑', link: '/对话压缩逻辑' },
        ],
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/your-org/mj-studio' },
    ],

    footer: {
      message: 'MJ-Studio - 多模型 AI 工作台',
    },

    search: {
      provider: 'local',
    },

    outline: {
      label: '页面导航',
    },

    docFooter: {
      prev: '上一页',
      next: '下一页',
    },

    lastUpdated: {
      text: '最后更新于',
    },

    returnToTopLabel: '返回顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '主题',
  },
})
