import { _ as __nuxt_component_0 } from './Layout-BXExKpWc.mjs';
import { v as vueExports, g as useToast, h as useRouter, s as serverRenderer_cjs_prodExports, c as _sfc_main$8, b as _sfc_main$d } from './server.mjs';
import { u as useUpstreams } from './useUpstreams-CU2PuBUF.mjs';
import './Drawer-B6XEXTdS.mjs';
import './DialogTrigger-DZAnfNyf.mjs';
import './utils-DCnNb5Bf.mjs';
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
    const { upstreams, isLoading, moveToTop, queryBalance } = useUpstreams();
    const toast = useToast();
    const router = useRouter();
    const queryingBalanceIds = vueExports.ref(/* @__PURE__ */ new Set());
    const movingToTopIds = vueExports.ref(/* @__PURE__ */ new Set());
    async function handleMoveToTop(id) {
      movingToTopIds.value.add(id);
      try {
        await moveToTop(id);
      } catch (error) {
        toast.add({
          title: "操作失败",
          description: error.data?.message || error.message,
          color: "error"
        });
      } finally {
        movingToTopIds.value.delete(id);
      }
    }
    function getModelCounts(aimodels) {
      if (!aimodels) return { image: 0, chat: 0 };
      const image = aimodels.filter((m) => !m.category || m.category === "image").length;
      const chat = aimodels.filter((m) => m.category === "chat").length;
      return { image, chat };
    }
    async function handleQueryBalance(id) {
      queryingBalanceIds.value.add(id);
      try {
        const result = await queryBalance(id);
        if (result.success) {
          toast.add({ title: "余额查询成功", color: "success" });
        } else {
          toast.add({ title: "查询失败", description: result.error, color: "error" });
        }
      } catch (error) {
        toast.add({
          title: "查询失败",
          description: error.data?.message || error.message,
          color: "error"
        });
      } finally {
        queryingBalanceIds.value.delete(id);
      }
    }
    function formatQuota(quota) {
      if (quota === void 0 || quota === null) return "未查询";
      const amount = quota / 5e5;
      if (amount >= 1e3) {
        return `¥${(amount / 1e3).toFixed(1)}K`;
      }
      if (amount >= 1) {
        return `¥${amount.toFixed(2)}`;
      }
      return `¥${amount.toFixed(4)}`;
    }
    const platformLabels = {
      oneapi: "OneAPI",
      n1n: "n1n",
      yunwu: "云雾"
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_SettingsLayout = __nuxt_component_0;
      const _component_UButton = _sfc_main$8;
      const _component_UIcon = _sfc_main$d;
      _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_SettingsLayout, _attrs, {
        default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="mb-4 flex items-center justify-between"${_scopeId}><h2 class="text-lg font-medium text-(--ui-text)"${_scopeId}>上游配置</h2>`);
            _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UButton, {
              size: "sm",
              onClick: ($event) => vueExports.unref(router).push("/settings/upstreams/new")
            }, {
              default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UIcon, {
                    name: "i-heroicons-plus",
                    class: "w-4 h-4 mr-1"
                  }, null, _parent3, _scopeId2));
                  _push3(` 添加 `);
                } else {
                  return [
                    vueExports.createVNode(_component_UIcon, {
                      name: "i-heroicons-plus",
                      class: "w-4 h-4 mr-1"
                    }),
                    vueExports.createTextVNode(" 添加 ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
            if (vueExports.unref(isLoading)) {
              _push2(`<div class="text-center py-12"${_scopeId}>`);
              _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UIcon, {
                name: "i-heroicons-arrow-path",
                class: "w-8 h-8 text-(--ui-text-dimmed) animate-spin"
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
            } else if (vueExports.unref(upstreams).length === 0) {
              _push2(`<div class="text-center py-12"${_scopeId}>`);
              _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UIcon, {
                name: "i-heroicons-cpu-chip",
                class: "w-16 h-16 text-(--ui-text-dimmed)/50 mx-auto mb-4"
              }, null, _parent2, _scopeId));
              _push2(`<p class="text-(--ui-text-muted) mb-4"${_scopeId}>还没有上游配置</p>`);
              _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UButton, {
                onClick: ($event) => vueExports.unref(router).push("/settings/upstreams/new")
              }, {
                default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`添加第一个配置`);
                  } else {
                    return [
                      vueExports.createTextVNode("添加第一个配置")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"${_scopeId}><!--[-->`);
              serverRenderer_cjs_prodExports.ssrRenderList(vueExports.unref(upstreams), (upstream) => {
                _push2(`<div class="bg-(--ui-bg-elevated) rounded-lg p-6 border border-(--ui-border) hover:border-(--ui-border-accented) transition-colors cursor-pointer flex flex-col"${_scopeId}><div class="flex items-center justify-between mb-2"${_scopeId}><h3 class="text-(--ui-text) font-medium truncate min-w-0"${_scopeId}>${serverRenderer_cjs_prodExports.ssrInterpolate(upstream.name)}</h3><div class="flex gap-1 shrink-0"${_scopeId}>`);
                _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UButton, {
                  size: "xs",
                  variant: "ghost",
                  color: "neutral",
                  title: "置顶",
                  loading: vueExports.unref(movingToTopIds).has(upstream.id),
                  onClick: ($event) => handleMoveToTop(upstream.id)
                }, {
                  default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UIcon, {
                        name: "i-heroicons-arrow-up-circle",
                        class: "w-4 h-4"
                      }, null, _parent3, _scopeId2));
                    } else {
                      return [
                        vueExports.createVNode(_component_UIcon, {
                          name: "i-heroicons-arrow-up-circle",
                          class: "w-4 h-4"
                        })
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UButton, {
                  size: "xs",
                  variant: "ghost",
                  color: "neutral",
                  onClick: ($event) => vueExports.unref(router).push(`/settings/upstreams/${upstream.id}`)
                }, {
                  default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UIcon, {
                        name: "i-heroicons-pencil",
                        class: "w-4 h-4"
                      }, null, _parent3, _scopeId2));
                    } else {
                      return [
                        vueExports.createVNode(_component_UIcon, {
                          name: "i-heroicons-pencil",
                          class: "w-4 h-4"
                        })
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                _push2(`</div></div><p class="text-(--ui-text-dimmed) text-sm truncate"${_scopeId}>${serverRenderer_cjs_prodExports.ssrInterpolate(upstream.baseUrl)}</p><div class="mt-3 flex flex-wrap gap-2"${_scopeId}>`);
                if (getModelCounts(upstream.aimodels).image > 0) {
                  _push2(`<span class="text-xs px-2 py-1 rounded bg-(--ui-bg-muted) text-(--ui-text-muted)"${_scopeId}> 🎨 ${serverRenderer_cjs_prodExports.ssrInterpolate(getModelCounts(upstream.aimodels).image)}</span>`);
                } else {
                  _push2(`<!---->`);
                }
                if (getModelCounts(upstream.aimodels).chat > 0) {
                  _push2(`<span class="text-xs px-2 py-1 rounded bg-blue-500/10 text-blue-600 dark:text-blue-400"${_scopeId}> 💬 ${serverRenderer_cjs_prodExports.ssrInterpolate(getModelCounts(upstream.aimodels).chat)}</span>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div><div class="mt-3 pt-3 border-t border-(--ui-border) flex items-center justify-between"${_scopeId}><div class="flex items-center gap-2 text-sm"${_scopeId}>`);
                if (upstream.upstreamPlatform) {
                  _push2(`<!--[--><span class="text-(--ui-text-muted)"${_scopeId}>${serverRenderer_cjs_prodExports.ssrInterpolate(platformLabels[upstream.upstreamPlatform] || upstream.upstreamPlatform)}</span><span class="text-(--ui-text-dimmed)"${_scopeId}>·</span><span class="text-(--ui-text)"${_scopeId}>${serverRenderer_cjs_prodExports.ssrInterpolate(formatQuota(upstream.upstreamInfo?.quota))}</span><!--]-->`);
                } else {
                  _push2(`<span class="text-(--ui-text-dimmed)"${_scopeId}>未配置平台</span>`);
                }
                _push2(`</div>`);
                if (upstream.upstreamPlatform) {
                  _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UButton, {
                    size: "xs",
                    variant: "ghost",
                    color: "neutral",
                    loading: vueExports.unref(queryingBalanceIds).has(upstream.id),
                    onClick: ($event) => handleQueryBalance(upstream.id)
                  }, {
                    default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                      if (_push3) {
                        _push3(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UIcon, {
                          name: "i-heroicons-arrow-path",
                          class: "w-3.5 h-3.5"
                        }, null, _parent3, _scopeId2));
                      } else {
                        return [
                          vueExports.createVNode(_component_UIcon, {
                            name: "i-heroicons-arrow-path",
                            class: "w-3.5 h-3.5"
                          })
                        ];
                      }
                    }),
                    _: 2
                  }, _parent2, _scopeId));
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div></div>`);
              });
              _push2(`<!--]--></div>`);
            }
          } else {
            return [
              vueExports.createVNode("div", { class: "mb-4 flex items-center justify-between" }, [
                vueExports.createVNode("h2", { class: "text-lg font-medium text-(--ui-text)" }, "上游配置"),
                vueExports.createVNode(_component_UButton, {
                  size: "sm",
                  onClick: ($event) => vueExports.unref(router).push("/settings/upstreams/new")
                }, {
                  default: vueExports.withCtx(() => [
                    vueExports.createVNode(_component_UIcon, {
                      name: "i-heroicons-plus",
                      class: "w-4 h-4 mr-1"
                    }),
                    vueExports.createTextVNode(" 添加 ")
                  ]),
                  _: 1
                }, 8, ["onClick"])
              ]),
              vueExports.unref(isLoading) ? (vueExports.openBlock(), vueExports.createBlock("div", {
                key: 0,
                class: "text-center py-12"
              }, [
                vueExports.createVNode(_component_UIcon, {
                  name: "i-heroicons-arrow-path",
                  class: "w-8 h-8 text-(--ui-text-dimmed) animate-spin"
                })
              ])) : vueExports.unref(upstreams).length === 0 ? (vueExports.openBlock(), vueExports.createBlock("div", {
                key: 1,
                class: "text-center py-12"
              }, [
                vueExports.createVNode(_component_UIcon, {
                  name: "i-heroicons-cpu-chip",
                  class: "w-16 h-16 text-(--ui-text-dimmed)/50 mx-auto mb-4"
                }),
                vueExports.createVNode("p", { class: "text-(--ui-text-muted) mb-4" }, "还没有上游配置"),
                vueExports.createVNode(_component_UButton, {
                  onClick: ($event) => vueExports.unref(router).push("/settings/upstreams/new")
                }, {
                  default: vueExports.withCtx(() => [
                    vueExports.createTextVNode("添加第一个配置")
                  ]),
                  _: 1
                }, 8, ["onClick"])
              ])) : (vueExports.openBlock(), vueExports.createBlock("div", {
                key: 2,
                class: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"
              }, [
                (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(vueExports.unref(upstreams), (upstream) => {
                  return vueExports.openBlock(), vueExports.createBlock("div", {
                    key: upstream.id,
                    class: "bg-(--ui-bg-elevated) rounded-lg p-6 border border-(--ui-border) hover:border-(--ui-border-accented) transition-colors cursor-pointer flex flex-col",
                    onClick: ($event) => vueExports.unref(router).push(`/settings/upstreams/${upstream.id}`)
                  }, [
                    vueExports.createVNode("div", { class: "flex items-center justify-between mb-2" }, [
                      vueExports.createVNode("h3", { class: "text-(--ui-text) font-medium truncate min-w-0" }, vueExports.toDisplayString(upstream.name), 1),
                      vueExports.createVNode("div", {
                        class: "flex gap-1 shrink-0",
                        onClick: vueExports.withModifiers(() => {
                        }, ["stop"])
                      }, [
                        vueExports.createVNode(_component_UButton, {
                          size: "xs",
                          variant: "ghost",
                          color: "neutral",
                          title: "置顶",
                          loading: vueExports.unref(movingToTopIds).has(upstream.id),
                          onClick: ($event) => handleMoveToTop(upstream.id)
                        }, {
                          default: vueExports.withCtx(() => [
                            vueExports.createVNode(_component_UIcon, {
                              name: "i-heroicons-arrow-up-circle",
                              class: "w-4 h-4"
                            })
                          ]),
                          _: 1
                        }, 8, ["loading", "onClick"]),
                        vueExports.createVNode(_component_UButton, {
                          size: "xs",
                          variant: "ghost",
                          color: "neutral",
                          onClick: ($event) => vueExports.unref(router).push(`/settings/upstreams/${upstream.id}`)
                        }, {
                          default: vueExports.withCtx(() => [
                            vueExports.createVNode(_component_UIcon, {
                              name: "i-heroicons-pencil",
                              class: "w-4 h-4"
                            })
                          ]),
                          _: 1
                        }, 8, ["onClick"])
                      ], 8, ["onClick"])
                    ]),
                    vueExports.createVNode("p", { class: "text-(--ui-text-dimmed) text-sm truncate" }, vueExports.toDisplayString(upstream.baseUrl), 1),
                    vueExports.createVNode("div", { class: "mt-3 flex flex-wrap gap-2" }, [
                      getModelCounts(upstream.aimodels).image > 0 ? (vueExports.openBlock(), vueExports.createBlock("span", {
                        key: 0,
                        class: "text-xs px-2 py-1 rounded bg-(--ui-bg-muted) text-(--ui-text-muted)"
                      }, " 🎨 " + vueExports.toDisplayString(getModelCounts(upstream.aimodels).image), 1)) : vueExports.createCommentVNode("", true),
                      getModelCounts(upstream.aimodels).chat > 0 ? (vueExports.openBlock(), vueExports.createBlock("span", {
                        key: 1,
                        class: "text-xs px-2 py-1 rounded bg-blue-500/10 text-blue-600 dark:text-blue-400"
                      }, " 💬 " + vueExports.toDisplayString(getModelCounts(upstream.aimodels).chat), 1)) : vueExports.createCommentVNode("", true)
                    ]),
                    vueExports.createVNode("div", {
                      class: "mt-3 pt-3 border-t border-(--ui-border) flex items-center justify-between",
                      onClick: vueExports.withModifiers(() => {
                      }, ["stop"])
                    }, [
                      vueExports.createVNode("div", { class: "flex items-center gap-2 text-sm" }, [
                        upstream.upstreamPlatform ? (vueExports.openBlock(), vueExports.createBlock(vueExports.Fragment, { key: 0 }, [
                          vueExports.createVNode("span", { class: "text-(--ui-text-muted)" }, vueExports.toDisplayString(platformLabels[upstream.upstreamPlatform] || upstream.upstreamPlatform), 1),
                          vueExports.createVNode("span", { class: "text-(--ui-text-dimmed)" }, "·"),
                          vueExports.createVNode("span", { class: "text-(--ui-text)" }, vueExports.toDisplayString(formatQuota(upstream.upstreamInfo?.quota)), 1)
                        ], 64)) : (vueExports.openBlock(), vueExports.createBlock("span", {
                          key: 1,
                          class: "text-(--ui-text-dimmed)"
                        }, "未配置平台"))
                      ]),
                      upstream.upstreamPlatform ? (vueExports.openBlock(), vueExports.createBlock(_component_UButton, {
                        key: 0,
                        size: "xs",
                        variant: "ghost",
                        color: "neutral",
                        loading: vueExports.unref(queryingBalanceIds).has(upstream.id),
                        onClick: ($event) => handleQueryBalance(upstream.id)
                      }, {
                        default: vueExports.withCtx(() => [
                          vueExports.createVNode(_component_UIcon, {
                            name: "i-heroicons-arrow-path",
                            class: "w-3.5 h-3.5"
                          })
                        ]),
                        _: 1
                      }, 8, ["loading", "onClick"])) : vueExports.createCommentVNode("", true)
                    ], 8, ["onClick"])
                  ], 8, ["onClick"]);
                }), 128))
              ]))
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = vueExports.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/settings/upstreams/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-UzWf2Ys2.mjs.map
