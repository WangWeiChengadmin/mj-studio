import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'MJ-Studio 帮助中心',
  description: '多模型 AI 工作台使用指南',
  base: '/help/',
  lang: 'zh-CN',

  // 输出到 .vitepress/dist 目录（Nuxt 通过 publicAssets 引用）
  outDir: '.vitepress/dist',

  // 忽略死链接（旧文档中可能有过时的链接）
  ignoreDeadLinks: true,

  head: [
    ['link', { rel: 'icon', href: '/logo.png' }],
  ],

  themeConfig: {
    logo: '/logo.png',
    siteTitle: 'MJ-Studio',

    nav: [
      { text: '首页', link: '/' },
      { text: '快速开始', link: '/guide/getting-started' },
      { text: '返回应用', link: 'javascript:window.location.href="/"' },
    ],

    sidebar: [
      {
        text: '入门',
        items: [
          { text: '快速开始', link: '/guide/getting-started' },
          { text: '配置上游', link: '/guide/upstream' },
        ],
      },
      {
        text: '绘图模块',
        items: [
          { text: '基本使用', link: '/studio/basic' },
          { text: '支持的模型', link: '/studio/models' },
          { text: '参考图功能', link: '/studio/reference-image' },
        ],
      },
      {
        text: '视频模块',
        items: [
          { text: '基本使用', link: '/video/basic' },
          { text: '支持的模型', link: '/video/models' },
        ],
      },
      {
        text: '对话模块',
        items: [
          { text: '基本使用', link: '/chat/basic' },
          { text: '助手管理', link: '/chat/assistants' },
          { text: '嵌入式绘图', link: '/chat/embedded-drawing' },
        ],
      },
      {
        text: '常见问题',
        items: [
          { text: 'FAQ', link: '/faq' },
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
