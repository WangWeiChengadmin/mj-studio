import { _ as __nuxt_component_0 } from './Layout-BXExKpWc.mjs';
import { v as vueExports, g as useToast, s as serverRenderer_cjs_prodExports, c as _sfc_main$8, b as _sfc_main$d } from './server.mjs';
import { _ as _sfc_main$1 } from './Checkbox-CaJjtXbf.mjs';
import { _ as __nuxt_component_4 } from './ModelSelector-BascUgGk.mjs';
import { _ as _sfc_main$2 } from './Input-A_WPZx9s.mjs';
import { U as USER_SETTING_KEYS } from './constants-Bq60BfFZ.mjs';
import { u as useUserSettings } from './useUserSettings-CJnqQPxm.mjs';
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
import './VisuallyHiddenInput-y7wD6Rzm.mjs';
import './RovingFocusItem-BmQWMeQk.mjs';
import './RovingFocusGroup-CN9Tim1l.mjs';
import './Label-CV5OSAkM.mjs';
import './index--6aaawBa.mjs';
import './useAuth-xXrD8D6Y.mjs';

const _sfc_main = /* @__PURE__ */ vueExports.defineComponent({
  __name: "general",
  __ssrInlineRender: true,
  setup(__props) {
    const { isLoading, updateSettings } = useUserSettings();
    const { upstreams } = useUpstreams();
    const toast = useToast();
    const form = vueExports.reactive({
      blurByDefault: true,
      compressKeepCount: 4,
      titleMaxLength: 30,
      suggestionsCount: 5,
      imageSavePath: "",
      // 绘图设置
      aiOptimizeUpstreamId: 0,
      aiOptimizeAimodelId: 0,
      aiOptimizeModelName: "",
      embeddedUpstreamId: 0,
      embeddedAimodelId: 0,
      workbenchUpstreamId: 0,
      workbenchAimodelId: 0
    });
    const isSaving = vueExports.ref(false);
    const isStorageSaving = vueExports.ref(false);
    const electronPaths = vueExports.ref(null);
    const isElectron = vueExports.computed(() => false);
    async function saveSettings() {
      isSaving.value = true;
      try {
        await updateSettings({
          [USER_SETTING_KEYS.GENERAL_BLUR_BY_DEFAULT]: form.blurByDefault,
          [USER_SETTING_KEYS.GENERAL_COMPRESS_KEEP_COUNT]: form.compressKeepCount,
          [USER_SETTING_KEYS.GENERAL_TITLE_MAX_LENGTH]: form.titleMaxLength,
          [USER_SETTING_KEYS.GENERAL_SUGGESTIONS_COUNT]: form.suggestionsCount,
          [USER_SETTING_KEYS.GENERAL_IMAGE_SAVE_PATH]: form.imageSavePath,
          // 绘图设置
          [USER_SETTING_KEYS.DRAWING_AI_OPTIMIZE_UPSTREAM_ID]: form.aiOptimizeUpstreamId,
          [USER_SETTING_KEYS.DRAWING_AI_OPTIMIZE_AIMODEL_ID]: form.aiOptimizeAimodelId,
          [USER_SETTING_KEYS.DRAWING_AI_OPTIMIZE_MODEL_NAME]: form.aiOptimizeModelName,
          [USER_SETTING_KEYS.DRAWING_EMBEDDED_UPSTREAM_ID]: form.embeddedUpstreamId,
          [USER_SETTING_KEYS.DRAWING_EMBEDDED_AIMODEL_ID]: form.embeddedAimodelId,
          [USER_SETTING_KEYS.DRAWING_WORKBENCH_UPSTREAM_ID]: form.workbenchUpstreamId,
          [USER_SETTING_KEYS.DRAWING_WORKBENCH_AIMODEL_ID]: form.workbenchAimodelId
        });
        toast.add({ title: "设置已保存", color: "success" });
      } catch (error) {
        toast.add({ title: "保存失败", description: error.message, color: "error" });
      } finally {
        isSaving.value = false;
      }
    }
    async function selectImageSavePath() {
      if (!(void 0).electronAPI?.selectFolder) return;
      isStorageSaving.value = true;
      try {
        const selected = await (void 0).electronAPI.selectFolder();
        if (!selected) return;
        form.imageSavePath = selected;
        await updateSettings({ [USER_SETTING_KEYS.GENERAL_IMAGE_SAVE_PATH]: selected });
        toast.add({ title: "已保存", description: "重启应用后生效", color: "success" });
      } catch (error) {
        toast.add({ title: "设置失败", description: error.message, color: "error" });
      } finally {
        isStorageSaving.value = false;
      }
    }
    async function resetImageSavePath() {
      if (!(void 0).electronAPI) return;
      isStorageSaving.value = true;
      try {
        form.imageSavePath = "";
        await updateSettings({ [USER_SETTING_KEYS.GENERAL_IMAGE_SAVE_PATH]: "" });
        toast.add({ title: "已重置", description: "重启应用后生效", color: "success" });
      } catch (error) {
        toast.add({ title: "重置失败", description: error.message, color: "error" });
      } finally {
        isStorageSaving.value = false;
      }
    }
    const aiOptimizeUpstreamId = vueExports.computed({
      get: () => form.aiOptimizeUpstreamId || null,
      set: (val) => {
        form.aiOptimizeUpstreamId = val || 0;
      }
    });
    const aiOptimizeAimodelId = vueExports.computed({
      get: () => form.aiOptimizeAimodelId || null,
      set: (val) => {
        form.aiOptimizeAimodelId = val || 0;
        if (val && form.aiOptimizeUpstreamId) {
          const upstream = upstreams.value.find((u) => u.id === form.aiOptimizeUpstreamId);
          const aimodel = upstream?.aimodels?.find((m) => m.id === val);
          form.aiOptimizeModelName = aimodel?.modelName || "";
        } else {
          form.aiOptimizeModelName = "";
        }
      }
    });
    const embeddedUpstreamId = vueExports.computed({
      get: () => form.embeddedUpstreamId || null,
      set: (val) => {
        form.embeddedUpstreamId = val || 0;
      }
    });
    const embeddedAimodelId = vueExports.computed({
      get: () => form.embeddedAimodelId || null,
      set: (val) => {
        form.embeddedAimodelId = val || 0;
      }
    });
    const workbenchUpstreamId = vueExports.computed({
      get: () => form.workbenchUpstreamId || null,
      set: (val) => {
        form.workbenchUpstreamId = val || 0;
      }
    });
    const workbenchAimodelId = vueExports.computed({
      get: () => form.workbenchAimodelId || null,
      set: (val) => {
        form.workbenchAimodelId = val || 0;
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_SettingsLayout = __nuxt_component_0;
      const _component_UButton = _sfc_main$8;
      const _component_UIcon = _sfc_main$d;
      const _component_UCheckbox = _sfc_main$1;
      const _component_ModelSelector = __nuxt_component_4;
      const _component_UInput = _sfc_main$2;
      _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_SettingsLayout, _attrs, {
        default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="mb-4 flex items-center justify-between"${_scopeId}><h2 class="text-lg font-medium text-(--ui-text)"${_scopeId}>通用设置</h2>`);
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
              _push2(`<div class="space-y-4"${_scopeId}><div class="bg-(--ui-bg-elevated) rounded-lg p-6 border border-(--ui-border)"${_scopeId}><h3 class="text-base font-medium text-(--ui-text) mb-4"${_scopeId}>绘图</h3><div class="space-y-4"${_scopeId}><label class="flex items-center justify-between cursor-pointer"${_scopeId}><div${_scopeId}><span class="text-(--ui-text)"${_scopeId}>生图默认模糊</span><p class="text-xs text-(--ui-text-muted) mt-1"${_scopeId}>新生成的图片默认显示模糊效果</p></div>`);
              _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UCheckbox, {
                modelValue: vueExports.unref(form).blurByDefault,
                "onUpdate:modelValue": ($event) => vueExports.unref(form).blurByDefault = $event
              }, null, _parent2, _scopeId));
              _push2(`</label><div class="flex items-center justify-between"${_scopeId}><div${_scopeId}><span class="text-(--ui-text)"${_scopeId}>AI 优化提示词模型</span><p class="text-xs text-(--ui-text-muted) mt-1"${_scopeId}>用于优化绘图提示词的对话模型</p></div>`);
              _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_ModelSelector, {
                upstreams: vueExports.unref(upstreams),
                category: "chat",
                "list-layout": "",
                "no-auto-select": "",
                "align-right": "",
                "upstream-id": vueExports.unref(aiOptimizeUpstreamId),
                "onUpdate:upstreamId": ($event) => vueExports.isRef(aiOptimizeUpstreamId) ? aiOptimizeUpstreamId.value = $event : null,
                "aimodel-id": vueExports.unref(aiOptimizeAimodelId),
                "onUpdate:aimodelId": ($event) => vueExports.isRef(aiOptimizeAimodelId) ? aiOptimizeAimodelId.value = $event : null
              }, null, _parent2, _scopeId));
              _push2(`</div><div class="flex items-center justify-between"${_scopeId}><div${_scopeId}><span class="text-(--ui-text)"${_scopeId}>嵌入式绘画默认模型</span><p class="text-xs text-(--ui-text-muted) mt-1"${_scopeId}>对话中嵌入式绘画的默认模型</p></div>`);
              _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_ModelSelector, {
                upstreams: vueExports.unref(upstreams),
                category: "image",
                "show-type-label": "",
                "no-auto-select": "",
                "align-right": "",
                "upstream-id": vueExports.unref(embeddedUpstreamId),
                "onUpdate:upstreamId": ($event) => vueExports.isRef(embeddedUpstreamId) ? embeddedUpstreamId.value = $event : null,
                "aimodel-id": vueExports.unref(embeddedAimodelId),
                "onUpdate:aimodelId": ($event) => vueExports.isRef(embeddedAimodelId) ? embeddedAimodelId.value = $event : null
              }, null, _parent2, _scopeId));
              _push2(`</div><div class="flex items-center justify-between"${_scopeId}><div${_scopeId}><span class="text-(--ui-text)"${_scopeId}>工作台默认模型</span><p class="text-xs text-(--ui-text-muted) mt-1"${_scopeId}>绘图工作台的默认选择</p></div>`);
              _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_ModelSelector, {
                upstreams: vueExports.unref(upstreams),
                category: "image",
                "show-type-label": "",
                "no-auto-select": "",
                "align-right": "",
                "upstream-id": vueExports.unref(workbenchUpstreamId),
                "onUpdate:upstreamId": ($event) => vueExports.isRef(workbenchUpstreamId) ? workbenchUpstreamId.value = $event : null,
                "aimodel-id": vueExports.unref(workbenchAimodelId),
                "onUpdate:aimodelId": ($event) => vueExports.isRef(workbenchAimodelId) ? workbenchAimodelId.value = $event : null
              }, null, _parent2, _scopeId));
              _push2(`</div></div></div><div class="bg-(--ui-bg-elevated) rounded-lg p-6 border border-(--ui-border)"${_scopeId}><h3 class="text-base font-medium text-(--ui-text) mb-4"${_scopeId}>存储</h3><div class="space-y-3"${_scopeId}><div class="flex items-center justify-between gap-4"${_scopeId}><div class="min-w-0"${_scopeId}><span class="text-(--ui-text)"${_scopeId}>图片保存路径</span><p class="text-xs text-(--ui-text-muted) mt-1 break-all"${_scopeId}>`);
              if (vueExports.unref(form).imageSavePath) {
                _push2(`<!--[-->${serverRenderer_cjs_prodExports.ssrInterpolate(vueExports.unref(form).imageSavePath)}<!--]-->`);
              } else if (vueExports.unref(electronPaths)?.uploads) {
                _push2(`<!--[-->${serverRenderer_cjs_prodExports.ssrInterpolate(vueExports.unref(electronPaths).uploads)}（默认） <!--]-->`);
              } else {
                _push2(`<!--[--> （默认） <!--]-->`);
              }
              _push2(`</p></div><div class="flex items-center gap-2"${_scopeId}>`);
              _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UButton, {
                size: "xs",
                variant: "outline",
                loading: vueExports.unref(isStorageSaving),
                disabled: !vueExports.unref(isElectron),
                onClick: selectImageSavePath
              }, {
                default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` 选择路径 `);
                  } else {
                    return [
                      vueExports.createTextVNode(" 选择路径 ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UButton, {
                size: "xs",
                variant: "outline",
                color: "neutral",
                loading: vueExports.unref(isStorageSaving),
                disabled: !vueExports.unref(isElectron) || !vueExports.unref(form).imageSavePath,
                onClick: resetImageSavePath
              }, {
                default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` 重置 `);
                  } else {
                    return [
                      vueExports.createTextVNode(" 重置 ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div></div><p class="text-xs text-(--ui-text-muted)"${_scopeId}> 修改后需重启应用生效 </p></div></div><div class="bg-(--ui-bg-elevated) rounded-lg p-4 border border-(--ui-border)"${_scopeId}><h3 class="font-medium text-(--ui-text) mb-4"${_scopeId}>对话</h3><div class="space-y-4"${_scopeId}><div class="flex items-center justify-between"${_scopeId}><div${_scopeId}><span class="text-(--ui-text)"${_scopeId}>压缩保留消息数</span><p class="text-xs text-(--ui-text-muted) mt-1"${_scopeId}>压缩时保留最近的消息条数</p></div>`);
              _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UInput, {
                modelValue: vueExports.unref(form).compressKeepCount,
                "onUpdate:modelValue": ($event) => vueExports.unref(form).compressKeepCount = $event,
                modelModifiers: { number: true },
                type: "number",
                min: "2",
                max: "10",
                class: "w-20"
              }, null, _parent2, _scopeId));
              _push2(`</div><div class="flex items-center justify-between"${_scopeId}><div${_scopeId}><span class="text-(--ui-text)"${_scopeId}>标题最大长度</span><p class="text-xs text-(--ui-text-muted) mt-1"${_scopeId}>自动生成标题的最大字符数</p></div>`);
              _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UInput, {
                modelValue: vueExports.unref(form).titleMaxLength,
                "onUpdate:modelValue": ($event) => vueExports.unref(form).titleMaxLength = $event,
                modelModifiers: { number: true },
                type: "number",
                min: "10",
                max: "50",
                class: "w-20"
              }, null, _parent2, _scopeId));
              _push2(`</div><div class="flex items-center justify-between"${_scopeId}><div${_scopeId}><span class="text-(--ui-text)"${_scopeId}>开场白建议数量</span><p class="text-xs text-(--ui-text-muted) mt-1"${_scopeId}>新对话时生成的建议条数</p></div>`);
              _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UInput, {
                modelValue: vueExports.unref(form).suggestionsCount,
                "onUpdate:modelValue": ($event) => vueExports.unref(form).suggestionsCount = $event,
                modelModifiers: { number: true },
                type: "number",
                min: "3",
                max: "10",
                class: "w-20"
              }, null, _parent2, _scopeId));
              _push2(`</div></div></div></div>`);
            }
          } else {
            return [
              vueExports.createVNode("div", { class: "mb-4 flex items-center justify-between" }, [
                vueExports.createVNode("h2", { class: "text-lg font-medium text-(--ui-text)" }, "通用设置"),
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
                class: "space-y-4"
              }, [
                vueExports.createVNode("div", { class: "bg-(--ui-bg-elevated) rounded-lg p-6 border border-(--ui-border)" }, [
                  vueExports.createVNode("h3", { class: "text-base font-medium text-(--ui-text) mb-4" }, "绘图"),
                  vueExports.createVNode("div", { class: "space-y-4" }, [
                    vueExports.createVNode("label", { class: "flex items-center justify-between cursor-pointer" }, [
                      vueExports.createVNode("div", null, [
                        vueExports.createVNode("span", { class: "text-(--ui-text)" }, "生图默认模糊"),
                        vueExports.createVNode("p", { class: "text-xs text-(--ui-text-muted) mt-1" }, "新生成的图片默认显示模糊效果")
                      ]),
                      vueExports.createVNode(_component_UCheckbox, {
                        modelValue: vueExports.unref(form).blurByDefault,
                        "onUpdate:modelValue": ($event) => vueExports.unref(form).blurByDefault = $event
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    vueExports.createVNode("div", { class: "flex items-center justify-between" }, [
                      vueExports.createVNode("div", null, [
                        vueExports.createVNode("span", { class: "text-(--ui-text)" }, "AI 优化提示词模型"),
                        vueExports.createVNode("p", { class: "text-xs text-(--ui-text-muted) mt-1" }, "用于优化绘图提示词的对话模型")
                      ]),
                      vueExports.createVNode(_component_ModelSelector, {
                        upstreams: vueExports.unref(upstreams),
                        category: "chat",
                        "list-layout": "",
                        "no-auto-select": "",
                        "align-right": "",
                        "upstream-id": vueExports.unref(aiOptimizeUpstreamId),
                        "onUpdate:upstreamId": ($event) => vueExports.isRef(aiOptimizeUpstreamId) ? aiOptimizeUpstreamId.value = $event : null,
                        "aimodel-id": vueExports.unref(aiOptimizeAimodelId),
                        "onUpdate:aimodelId": ($event) => vueExports.isRef(aiOptimizeAimodelId) ? aiOptimizeAimodelId.value = $event : null
                      }, null, 8, ["upstreams", "upstream-id", "onUpdate:upstreamId", "aimodel-id", "onUpdate:aimodelId"])
                    ]),
                    vueExports.createVNode("div", { class: "flex items-center justify-between" }, [
                      vueExports.createVNode("div", null, [
                        vueExports.createVNode("span", { class: "text-(--ui-text)" }, "嵌入式绘画默认模型"),
                        vueExports.createVNode("p", { class: "text-xs text-(--ui-text-muted) mt-1" }, "对话中嵌入式绘画的默认模型")
                      ]),
                      vueExports.createVNode(_component_ModelSelector, {
                        upstreams: vueExports.unref(upstreams),
                        category: "image",
                        "show-type-label": "",
                        "no-auto-select": "",
                        "align-right": "",
                        "upstream-id": vueExports.unref(embeddedUpstreamId),
                        "onUpdate:upstreamId": ($event) => vueExports.isRef(embeddedUpstreamId) ? embeddedUpstreamId.value = $event : null,
                        "aimodel-id": vueExports.unref(embeddedAimodelId),
                        "onUpdate:aimodelId": ($event) => vueExports.isRef(embeddedAimodelId) ? embeddedAimodelId.value = $event : null
                      }, null, 8, ["upstreams", "upstream-id", "onUpdate:upstreamId", "aimodel-id", "onUpdate:aimodelId"])
                    ]),
                    vueExports.createVNode("div", { class: "flex items-center justify-between" }, [
                      vueExports.createVNode("div", null, [
                        vueExports.createVNode("span", { class: "text-(--ui-text)" }, "工作台默认模型"),
                        vueExports.createVNode("p", { class: "text-xs text-(--ui-text-muted) mt-1" }, "绘图工作台的默认选择")
                      ]),
                      vueExports.createVNode(_component_ModelSelector, {
                        upstreams: vueExports.unref(upstreams),
                        category: "image",
                        "show-type-label": "",
                        "no-auto-select": "",
                        "align-right": "",
                        "upstream-id": vueExports.unref(workbenchUpstreamId),
                        "onUpdate:upstreamId": ($event) => vueExports.isRef(workbenchUpstreamId) ? workbenchUpstreamId.value = $event : null,
                        "aimodel-id": vueExports.unref(workbenchAimodelId),
                        "onUpdate:aimodelId": ($event) => vueExports.isRef(workbenchAimodelId) ? workbenchAimodelId.value = $event : null
                      }, null, 8, ["upstreams", "upstream-id", "onUpdate:upstreamId", "aimodel-id", "onUpdate:aimodelId"])
                    ])
                  ])
                ]),
                vueExports.createVNode("div", { class: "bg-(--ui-bg-elevated) rounded-lg p-6 border border-(--ui-border)" }, [
                  vueExports.createVNode("h3", { class: "text-base font-medium text-(--ui-text) mb-4" }, "存储"),
                  vueExports.createVNode("div", { class: "space-y-3" }, [
                    vueExports.createVNode("div", { class: "flex items-center justify-between gap-4" }, [
                      vueExports.createVNode("div", { class: "min-w-0" }, [
                        vueExports.createVNode("span", { class: "text-(--ui-text)" }, "图片保存路径"),
                        vueExports.createVNode("p", { class: "text-xs text-(--ui-text-muted) mt-1 break-all" }, [
                          vueExports.unref(form).imageSavePath ? (vueExports.openBlock(), vueExports.createBlock(vueExports.Fragment, { key: 0 }, [
                            vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(form).imageSavePath), 1)
                          ], 64)) : vueExports.unref(electronPaths)?.uploads ? (vueExports.openBlock(), vueExports.createBlock(vueExports.Fragment, { key: 1 }, [
                            vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(electronPaths).uploads) + "（默认） ", 1)
                          ], 64)) : (vueExports.openBlock(), vueExports.createBlock(vueExports.Fragment, { key: 2 }, [
                            vueExports.createTextVNode(" （默认） ")
                          ], 64))
                        ])
                      ]),
                      vueExports.createVNode("div", { class: "flex items-center gap-2" }, [
                        vueExports.createVNode(_component_UButton, {
                          size: "xs",
                          variant: "outline",
                          loading: vueExports.unref(isStorageSaving),
                          disabled: !vueExports.unref(isElectron),
                          onClick: selectImageSavePath
                        }, {
                          default: vueExports.withCtx(() => [
                            vueExports.createTextVNode(" 选择路径 ")
                          ]),
                          _: 1
                        }, 8, ["loading", "disabled"]),
                        vueExports.createVNode(_component_UButton, {
                          size: "xs",
                          variant: "outline",
                          color: "neutral",
                          loading: vueExports.unref(isStorageSaving),
                          disabled: !vueExports.unref(isElectron) || !vueExports.unref(form).imageSavePath,
                          onClick: resetImageSavePath
                        }, {
                          default: vueExports.withCtx(() => [
                            vueExports.createTextVNode(" 重置 ")
                          ]),
                          _: 1
                        }, 8, ["loading", "disabled"])
                      ])
                    ]),
                    vueExports.createVNode("p", { class: "text-xs text-(--ui-text-muted)" }, " 修改后需重启应用生效 ")
                  ])
                ]),
                vueExports.createVNode("div", { class: "bg-(--ui-bg-elevated) rounded-lg p-4 border border-(--ui-border)" }, [
                  vueExports.createVNode("h3", { class: "font-medium text-(--ui-text) mb-4" }, "对话"),
                  vueExports.createVNode("div", { class: "space-y-4" }, [
                    vueExports.createVNode("div", { class: "flex items-center justify-between" }, [
                      vueExports.createVNode("div", null, [
                        vueExports.createVNode("span", { class: "text-(--ui-text)" }, "压缩保留消息数"),
                        vueExports.createVNode("p", { class: "text-xs text-(--ui-text-muted) mt-1" }, "压缩时保留最近的消息条数")
                      ]),
                      vueExports.createVNode(_component_UInput, {
                        modelValue: vueExports.unref(form).compressKeepCount,
                        "onUpdate:modelValue": ($event) => vueExports.unref(form).compressKeepCount = $event,
                        modelModifiers: { number: true },
                        type: "number",
                        min: "2",
                        max: "10",
                        class: "w-20"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    vueExports.createVNode("div", { class: "flex items-center justify-between" }, [
                      vueExports.createVNode("div", null, [
                        vueExports.createVNode("span", { class: "text-(--ui-text)" }, "标题最大长度"),
                        vueExports.createVNode("p", { class: "text-xs text-(--ui-text-muted) mt-1" }, "自动生成标题的最大字符数")
                      ]),
                      vueExports.createVNode(_component_UInput, {
                        modelValue: vueExports.unref(form).titleMaxLength,
                        "onUpdate:modelValue": ($event) => vueExports.unref(form).titleMaxLength = $event,
                        modelModifiers: { number: true },
                        type: "number",
                        min: "10",
                        max: "50",
                        class: "w-20"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    vueExports.createVNode("div", { class: "flex items-center justify-between" }, [
                      vueExports.createVNode("div", null, [
                        vueExports.createVNode("span", { class: "text-(--ui-text)" }, "开场白建议数量"),
                        vueExports.createVNode("p", { class: "text-xs text-(--ui-text-muted) mt-1" }, "新对话时生成的建议条数")
                      ]),
                      vueExports.createVNode(_component_UInput, {
                        modelValue: vueExports.unref(form).suggestionsCount,
                        "onUpdate:modelValue": ($event) => vueExports.unref(form).suggestionsCount = $event,
                        modelModifiers: { number: true },
                        type: "number",
                        min: "3",
                        max: "10",
                        class: "w-20"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/settings/general.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=general-6CECbt0X.mjs.map
