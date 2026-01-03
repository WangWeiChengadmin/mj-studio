import { _ as __nuxt_component_0 } from './Layout-BXExKpWc.mjs';
import { v as vueExports, g as useToast, s as serverRenderer_cjs_prodExports, c as _sfc_main$8, b as _sfc_main$d } from './server.mjs';
import { _ as _sfc_main$1 } from './Textarea-Dhde2llm.mjs';
import { U as USER_SETTING_KEYS, q as DEFAULT_SUGGESTIONS_PROMPT, r as DEFAULT_GENERATE_TITLE_PROMPT, s as DEFAULT_COMPRESS_PROMPT } from './constants-Bq60BfFZ.mjs';
import { u as useUserSettings } from './useUserSettings-CJnqQPxm.mjs';
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
import './index--6aaawBa.mjs';
import './useAuth-xXrD8D6Y.mjs';

const _sfc_main = /* @__PURE__ */ vueExports.defineComponent({
  __name: "prompts",
  __ssrInlineRender: true,
  setup(__props) {
    const { isLoading, updateSettings } = useUserSettings();
    const toast = useToast();
    const form = vueExports.reactive({
      compressPrompt: "",
      generateTitlePrompt: "",
      suggestionsPrompt: ""
    });
    const isSaving = vueExports.ref(false);
    async function saveSettings() {
      isSaving.value = true;
      try {
        await updateSettings({
          [USER_SETTING_KEYS.PROMPT_COMPRESS]: form.compressPrompt,
          [USER_SETTING_KEYS.PROMPT_GENERATE_TITLE]: form.generateTitlePrompt,
          [USER_SETTING_KEYS.PROMPT_SUGGESTIONS]: form.suggestionsPrompt
        });
        toast.add({ title: "设置已保存", color: "success" });
      } catch (error) {
        toast.add({ title: "保存失败", description: error.message, color: "error" });
      } finally {
        isSaving.value = false;
      }
    }
    function resetToDefault(field) {
      switch (field) {
        case "compress":
          form.compressPrompt = DEFAULT_COMPRESS_PROMPT;
          break;
        case "title":
          form.generateTitlePrompt = DEFAULT_GENERATE_TITLE_PROMPT;
          break;
        case "suggestions":
          form.suggestionsPrompt = DEFAULT_SUGGESTIONS_PROMPT;
          break;
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_SettingsLayout = __nuxt_component_0;
      const _component_UButton = _sfc_main$8;
      const _component_UIcon = _sfc_main$d;
      const _component_UTextarea = _sfc_main$1;
      _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_SettingsLayout, _attrs, {
        default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="mb-4 flex items-center justify-between"${_scopeId}><h2 class="text-lg font-medium text-(--ui-text)"${_scopeId}>Prompt 设置</h2>`);
            _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UButton, {
              loading: vueExports.unref(isSaving),
              onClick: saveSettings
            }, {
              default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`保存`);
                } else {
                  return [
                    vueExports.createTextVNode("保存")
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
            } else {
              _push2(`<div class="space-y-6"${_scopeId}><div class="bg-(--ui-bg-elevated) rounded-lg p-6 border border-(--ui-border)"${_scopeId}><div class="flex items-center justify-between mb-3"${_scopeId}><div${_scopeId}><h3 class="text-base font-medium text-(--ui-text)"${_scopeId}>对话压缩</h3><p class="text-xs text-(--ui-text-muted) mt-1"${_scopeId}>当对话过长时，用于压缩历史消息为摘要</p></div>`);
              _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UButton, {
                size: "xs",
                variant: "ghost",
                color: "neutral",
                onClick: ($event) => resetToDefault("compress")
              }, {
                default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` 恢复默认 `);
                  } else {
                    return [
                      vueExports.createTextVNode(" 恢复默认 ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div>`);
              _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UTextarea, {
                modelValue: vueExports.unref(form).compressPrompt,
                "onUpdate:modelValue": ($event) => vueExports.unref(form).compressPrompt = $event,
                rows: 8,
                class: "w-full"
              }, null, _parent2, _scopeId));
              _push2(`<div class="mt-2 p-2 rounded bg-(--ui-bg-muted) text-xs text-(--ui-text-muted)"${_scopeId}><p class="font-medium mb-1"${_scopeId}>可用占位符：</p><p${_scopeId}><code class="px-1 py-0.5 rounded bg-(--ui-bg-accented)"${_scopeId}>{messages}</code> - 待压缩的历史消息内容</p></div></div><div class="bg-(--ui-bg-elevated) rounded-lg p-4 border border-(--ui-border)"${_scopeId}><div class="flex items-center justify-between mb-3"${_scopeId}><div${_scopeId}><h3 class="font-medium text-(--ui-text)"${_scopeId}>标题生成</h3><p class="text-xs text-(--ui-text-muted) mt-1"${_scopeId}>用于自动生成对话标题</p></div>`);
              _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UButton, {
                size: "xs",
                variant: "ghost",
                color: "neutral",
                onClick: ($event) => resetToDefault("title")
              }, {
                default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` 恢复默认 `);
                  } else {
                    return [
                      vueExports.createTextVNode(" 恢复默认 ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div>`);
              _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UTextarea, {
                modelValue: vueExports.unref(form).generateTitlePrompt,
                "onUpdate:modelValue": ($event) => vueExports.unref(form).generateTitlePrompt = $event,
                rows: 3,
                class: "w-full"
              }, null, _parent2, _scopeId));
              _push2(`<div class="mt-2 p-2 rounded bg-(--ui-bg-muted) text-xs text-(--ui-text-muted)"${_scopeId}><p class="font-medium mb-1"${_scopeId}>可用占位符：</p><p${_scopeId}><code class="px-1 py-0.5 rounded bg-(--ui-bg-accented)"${_scopeId}>{context}</code> - 对话上下文（前2条+后2条消息）</p></div></div><div class="bg-(--ui-bg-elevated) rounded-lg p-4 border border-(--ui-border)"${_scopeId}><div class="flex items-center justify-between mb-3"${_scopeId}><div${_scopeId}><h3 class="font-medium text-(--ui-text)"${_scopeId}>开场白建议</h3><p class="text-xs text-(--ui-text-muted) mt-1"${_scopeId}>新对话时生成开场白建议</p></div>`);
              _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UButton, {
                size: "xs",
                variant: "ghost",
                color: "neutral",
                onClick: ($event) => resetToDefault("suggestions")
              }, {
                default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` 恢复默认 `);
                  } else {
                    return [
                      vueExports.createTextVNode(" 恢复默认 ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div>`);
              _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UTextarea, {
                modelValue: vueExports.unref(form).suggestionsPrompt,
                "onUpdate:modelValue": ($event) => vueExports.unref(form).suggestionsPrompt = $event,
                rows: 8,
                class: "w-full"
              }, null, _parent2, _scopeId));
              _push2(`<div class="mt-2 p-2 rounded bg-(--ui-bg-muted) text-xs text-(--ui-text-muted)"${_scopeId}><p class="font-medium mb-1"${_scopeId}>可用占位符：</p><p${_scopeId}><code class="px-1 py-0.5 rounded bg-(--ui-bg-accented)"${_scopeId}>{time}</code> - 当前时间（格式：2025年12月26日星期四 15:30）</p></div></div></div>`);
            }
          } else {
            return [
              vueExports.createVNode("div", { class: "mb-4 flex items-center justify-between" }, [
                vueExports.createVNode("h2", { class: "text-lg font-medium text-(--ui-text)" }, "Prompt 设置"),
                vueExports.createVNode(_component_UButton, {
                  loading: vueExports.unref(isSaving),
                  onClick: saveSettings
                }, {
                  default: vueExports.withCtx(() => [
                    vueExports.createTextVNode("保存")
                  ]),
                  _: 1
                }, 8, ["loading"])
              ]),
              vueExports.unref(isLoading) ? (vueExports.openBlock(), vueExports.createBlock("div", {
                key: 0,
                class: "text-center py-12"
              }, [
                vueExports.createVNode(_component_UIcon, {
                  name: "i-heroicons-arrow-path",
                  class: "w-8 h-8 text-(--ui-text-dimmed) animate-spin"
                })
              ])) : (vueExports.openBlock(), vueExports.createBlock("div", {
                key: 1,
                class: "space-y-6"
              }, [
                vueExports.createVNode("div", { class: "bg-(--ui-bg-elevated) rounded-lg p-6 border border-(--ui-border)" }, [
                  vueExports.createVNode("div", { class: "flex items-center justify-between mb-3" }, [
                    vueExports.createVNode("div", null, [
                      vueExports.createVNode("h3", { class: "text-base font-medium text-(--ui-text)" }, "对话压缩"),
                      vueExports.createVNode("p", { class: "text-xs text-(--ui-text-muted) mt-1" }, "当对话过长时，用于压缩历史消息为摘要")
                    ]),
                    vueExports.createVNode(_component_UButton, {
                      size: "xs",
                      variant: "ghost",
                      color: "neutral",
                      onClick: ($event) => resetToDefault("compress")
                    }, {
                      default: vueExports.withCtx(() => [
                        vueExports.createTextVNode(" 恢复默认 ")
                      ]),
                      _: 1
                    }, 8, ["onClick"])
                  ]),
                  vueExports.createVNode(_component_UTextarea, {
                    modelValue: vueExports.unref(form).compressPrompt,
                    "onUpdate:modelValue": ($event) => vueExports.unref(form).compressPrompt = $event,
                    rows: 8,
                    class: "w-full"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                  vueExports.createVNode("div", { class: "mt-2 p-2 rounded bg-(--ui-bg-muted) text-xs text-(--ui-text-muted)" }, [
                    vueExports.createVNode("p", { class: "font-medium mb-1" }, "可用占位符："),
                    vueExports.createVNode("p", null, [
                      vueExports.createVNode("code", { class: "px-1 py-0.5 rounded bg-(--ui-bg-accented)" }, "{messages}"),
                      vueExports.createTextVNode(" - 待压缩的历史消息内容")
                    ])
                  ])
                ]),
                vueExports.createVNode("div", { class: "bg-(--ui-bg-elevated) rounded-lg p-4 border border-(--ui-border)" }, [
                  vueExports.createVNode("div", { class: "flex items-center justify-between mb-3" }, [
                    vueExports.createVNode("div", null, [
                      vueExports.createVNode("h3", { class: "font-medium text-(--ui-text)" }, "标题生成"),
                      vueExports.createVNode("p", { class: "text-xs text-(--ui-text-muted) mt-1" }, "用于自动生成对话标题")
                    ]),
                    vueExports.createVNode(_component_UButton, {
                      size: "xs",
                      variant: "ghost",
                      color: "neutral",
                      onClick: ($event) => resetToDefault("title")
                    }, {
                      default: vueExports.withCtx(() => [
                        vueExports.createTextVNode(" 恢复默认 ")
                      ]),
                      _: 1
                    }, 8, ["onClick"])
                  ]),
                  vueExports.createVNode(_component_UTextarea, {
                    modelValue: vueExports.unref(form).generateTitlePrompt,
                    "onUpdate:modelValue": ($event) => vueExports.unref(form).generateTitlePrompt = $event,
                    rows: 3,
                    class: "w-full"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                  vueExports.createVNode("div", { class: "mt-2 p-2 rounded bg-(--ui-bg-muted) text-xs text-(--ui-text-muted)" }, [
                    vueExports.createVNode("p", { class: "font-medium mb-1" }, "可用占位符："),
                    vueExports.createVNode("p", null, [
                      vueExports.createVNode("code", { class: "px-1 py-0.5 rounded bg-(--ui-bg-accented)" }, "{context}"),
                      vueExports.createTextVNode(" - 对话上下文（前2条+后2条消息）")
                    ])
                  ])
                ]),
                vueExports.createVNode("div", { class: "bg-(--ui-bg-elevated) rounded-lg p-4 border border-(--ui-border)" }, [
                  vueExports.createVNode("div", { class: "flex items-center justify-between mb-3" }, [
                    vueExports.createVNode("div", null, [
                      vueExports.createVNode("h3", { class: "font-medium text-(--ui-text)" }, "开场白建议"),
                      vueExports.createVNode("p", { class: "text-xs text-(--ui-text-muted) mt-1" }, "新对话时生成开场白建议")
                    ]),
                    vueExports.createVNode(_component_UButton, {
                      size: "xs",
                      variant: "ghost",
                      color: "neutral",
                      onClick: ($event) => resetToDefault("suggestions")
                    }, {
                      default: vueExports.withCtx(() => [
                        vueExports.createTextVNode(" 恢复默认 ")
                      ]),
                      _: 1
                    }, 8, ["onClick"])
                  ]),
                  vueExports.createVNode(_component_UTextarea, {
                    modelValue: vueExports.unref(form).suggestionsPrompt,
                    "onUpdate:modelValue": ($event) => vueExports.unref(form).suggestionsPrompt = $event,
                    rows: 8,
                    class: "w-full"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                  vueExports.createVNode("div", { class: "mt-2 p-2 rounded bg-(--ui-bg-muted) text-xs text-(--ui-text-muted)" }, [
                    vueExports.createVNode("p", { class: "font-medium mb-1" }, "可用占位符："),
                    vueExports.createVNode("p", null, [
                      vueExports.createVNode("code", { class: "px-1 py-0.5 rounded bg-(--ui-bg-accented)" }, "{time}"),
                      vueExports.createTextVNode(" - 当前时间（格式：2025年12月26日星期四 15:30）")
                    ])
                  ])
                ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/settings/prompts.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=prompts-BAS8H7eA.mjs.map
