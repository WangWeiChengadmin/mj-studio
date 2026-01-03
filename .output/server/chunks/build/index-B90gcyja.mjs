import { v as vueExports, s as serverRenderer_cjs_prodExports, b as _sfc_main$d, a as __nuxt_component_0$1, c as _sfc_main$8 } from './server.mjs';
import { u as useAuth } from './useAuth-xXrD8D6Y.mjs';
import '../nitro/nitro.mjs';
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
import 'tailwindcss/colors';
import 'node:stream';
import 'perfect-debounce';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'vue/server-renderer';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'vue';

const _sfc_main = /* @__PURE__ */ vueExports.defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const { loggedIn } = useAuth();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = _sfc_main$d;
      const _component_NuxtLink = __nuxt_component_0$1;
      const _component_UButton = _sfc_main$8;
      _push(`<div${serverRenderer_cjs_prodExports.ssrRenderAttrs(vueExports.mergeProps({ class: "flex-1 flex flex-col" }, _attrs))}><section class="flex-1 flex items-center justify-center px-6 py-20"><div class="max-w-4xl mx-auto text-center"><div class="mb-8">`);
      _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-sparkles",
        class: "w-16 h-16 text-(--ui-primary) mx-auto mb-4"
      }, null, _parent));
      _push(`<h1 class="text-5xl font-bold mb-4"><span class="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"> MJ Studio </span></h1><p class="text-xl text-(--ui-text-muted)">多模型 AI 绘图工作台</p></div><div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"><div class="p-6 rounded-lg bg-(--ui-bg-elevated) border border-(--ui-border)">`);
      _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-paint-brush",
        class: "w-10 h-10 text-purple-500 mx-auto mb-4"
      }, null, _parent));
      _push(`<h3 class="text-lg font-medium text-(--ui-text) mb-2">AI 绘图</h3><p class="text-sm text-(--ui-text-muted)"> 支持 Midjourney、DALL-E、Flux、Gemini 等多种 AI 绘图模型 </p></div><div class="p-6 rounded-lg bg-(--ui-bg-elevated) border border-(--ui-border)">`);
      _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-chat-bubble-left-right",
        class: "w-10 h-10 text-blue-500 mx-auto mb-4"
      }, null, _parent));
      _push(`<h3 class="text-lg font-medium text-(--ui-text) mb-2">AI 对话</h3><p class="text-sm text-(--ui-text-muted)"> 创建专属 AI 助手，支持自定义系统提示词和对话管理 </p></div><div class="p-6 rounded-lg bg-(--ui-bg-elevated) border border-(--ui-border)">`);
      _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-server",
        class: "w-10 h-10 text-green-500 mx-auto mb-4"
      }, null, _parent));
      _push(`<h3 class="text-lg font-medium text-(--ui-text) mb-2">多上游支持</h3><p class="text-sm text-(--ui-text-muted)"> 灵活配置多个 API 上游，轻松切换不同服务提供商 </p></div></div><div class="flex flex-wrap justify-center gap-4">`);
      if (vueExports.unref(loggedIn)) {
        _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_NuxtLink, { to: "/studio" }, {
          default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UButton, {
                size: "lg",
                class: "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              }, {
                default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UIcon, {
                      name: "i-heroicons-paint-brush",
                      class: "w-5 h-5 mr-2"
                    }, null, _parent3, _scopeId2));
                    _push3(` 开始创作 `);
                  } else {
                    return [
                      vueExports.createVNode(_component_UIcon, {
                        name: "i-heroicons-paint-brush",
                        class: "w-5 h-5 mr-2"
                      }),
                      vueExports.createTextVNode(" 开始创作 ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                vueExports.createVNode(_component_UButton, {
                  size: "lg",
                  class: "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                }, {
                  default: vueExports.withCtx(() => [
                    vueExports.createVNode(_component_UIcon, {
                      name: "i-heroicons-paint-brush",
                      class: "w-5 h-5 mr-2"
                    }),
                    vueExports.createTextVNode(" 开始创作 ")
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_NuxtLink, { to: "/login" }, {
          default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UButton, {
                size: "lg",
                class: "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              }, {
                default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UIcon, {
                      name: "i-heroicons-arrow-right-end-on-rectangle",
                      class: "w-5 h-5 mr-2"
                    }, null, _parent3, _scopeId2));
                    _push3(` 登录开始 `);
                  } else {
                    return [
                      vueExports.createVNode(_component_UIcon, {
                        name: "i-heroicons-arrow-right-end-on-rectangle",
                        class: "w-5 h-5 mr-2"
                      }),
                      vueExports.createTextVNode(" 登录开始 ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                vueExports.createVNode(_component_UButton, {
                  size: "lg",
                  class: "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                }, {
                  default: vueExports.withCtx(() => [
                    vueExports.createVNode(_component_UIcon, {
                      name: "i-heroicons-arrow-right-end-on-rectangle",
                      class: "w-5 h-5 mr-2"
                    }),
                    vueExports.createTextVNode(" 登录开始 ")
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent));
      }
      if (vueExports.unref(loggedIn)) {
        _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_NuxtLink, { to: "/chat" }, {
          default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UButton, {
                size: "lg",
                variant: "outline"
              }, {
                default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UIcon, {
                      name: "i-heroicons-chat-bubble-left-right",
                      class: "w-5 h-5 mr-2"
                    }, null, _parent3, _scopeId2));
                    _push3(` AI 对话 `);
                  } else {
                    return [
                      vueExports.createVNode(_component_UIcon, {
                        name: "i-heroicons-chat-bubble-left-right",
                        class: "w-5 h-5 mr-2"
                      }),
                      vueExports.createTextVNode(" AI 对话 ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                vueExports.createVNode(_component_UButton, {
                  size: "lg",
                  variant: "outline"
                }, {
                  default: vueExports.withCtx(() => [
                    vueExports.createVNode(_component_UIcon, {
                      name: "i-heroicons-chat-bubble-left-right",
                      class: "w-5 h-5 mr-2"
                    }),
                    vueExports.createTextVNode(" AI 对话 ")
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<a href="/help/">`);
      _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UButton, {
        size: "lg",
        variant: "soft",
        color: "neutral"
      }, {
        default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-question-mark-circle",
              class: "w-5 h-5 mr-2"
            }, null, _parent2, _scopeId));
            _push2(` 帮助中心 `);
          } else {
            return [
              vueExports.createVNode(_component_UIcon, {
                name: "i-heroicons-question-mark-circle",
                class: "w-5 h-5 mr-2"
              }),
              vueExports.createTextVNode(" 帮助中心 ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</a></div></div></section><footer class="py-6 border-t border-(--ui-border)"><div class="max-w-7xl mx-auto px-6 text-center text-sm text-(--ui-text-dimmed)"> MJ Studio - 多模型 AI 创作平台 </div></footer></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = vueExports.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-B90gcyja.mjs.map
