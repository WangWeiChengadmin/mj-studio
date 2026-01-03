import { _ as __nuxt_component_0 } from './Layout-BXExKpWc.mjs';
import { v as vueExports, g as useToast, s as serverRenderer_cjs_prodExports, c as _sfc_main$8, b as _sfc_main$d } from './server.mjs';
import { _ as _sfc_main$1 } from './Checkbox-CaJjtXbf.mjs';
import { _ as _sfc_main$2 } from './Badge-DaygVYHa.mjs';
import { u as useAssistants } from './useAssistants-CglvJODb.mjs';
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

const _sfc_main = /* @__PURE__ */ vueExports.defineComponent({
  __name: "export",
  __ssrInlineRender: true,
  setup(__props) {
    const { assistants, createAssistant } = useAssistants();
    const { upstreams, createUpstream } = useUpstreams();
    const toast = useToast();
    const isLoading = vueExports.ref(true);
    const fileInputRef = vueExports.ref(null);
    const selectedAssistantIds = vueExports.ref(/* @__PURE__ */ new Set());
    const selectedUpstreamIds = vueExports.ref(/* @__PURE__ */ new Set());
    const isAllAssistantsSelected = vueExports.computed(
      () => assistants.value.length > 0 && selectedAssistantIds.value.size === assistants.value.length
    );
    vueExports.computed(
      () => selectedAssistantIds.value.size > 0 && selectedAssistantIds.value.size < assistants.value.length
    );
    function toggleAssistant(id) {
      if (selectedAssistantIds.value.has(id)) {
        selectedAssistantIds.value.delete(id);
      } else {
        selectedAssistantIds.value.add(id);
      }
      selectedAssistantIds.value = new Set(selectedAssistantIds.value);
    }
    function toggleAllAssistants() {
      if (isAllAssistantsSelected.value) {
        selectedAssistantIds.value = /* @__PURE__ */ new Set();
      } else {
        selectedAssistantIds.value = new Set(assistants.value.map((a) => a.id));
      }
    }
    const isAllUpstreamsSelected = vueExports.computed(
      () => upstreams.value.length > 0 && selectedUpstreamIds.value.size === upstreams.value.length
    );
    vueExports.computed(
      () => selectedUpstreamIds.value.size > 0 && selectedUpstreamIds.value.size < upstreams.value.length
    );
    function toggleUpstream(id) {
      if (selectedUpstreamIds.value.has(id)) {
        selectedUpstreamIds.value.delete(id);
      } else {
        selectedUpstreamIds.value.add(id);
      }
      selectedUpstreamIds.value = new Set(selectedUpstreamIds.value);
    }
    function toggleAllUpstreams() {
      if (isAllUpstreamsSelected.value) {
        selectedUpstreamIds.value = /* @__PURE__ */ new Set();
      } else {
        selectedUpstreamIds.value = new Set(upstreams.value.map((u) => u.id));
      }
    }
    function handleExport() {
      const selectedAssistants = assistants.value.filter((a2) => selectedAssistantIds.value.has(a2.id));
      const selectedUpstreamsData = upstreams.value.filter((u) => selectedUpstreamIds.value.has(u.id));
      if (selectedAssistants.length === 0 && selectedUpstreamsData.length === 0) {
        toast.add({ title: "请先选择要导出的项目", color: "warning" });
        return;
      }
      const exportData = {
        version: 2,
        // 版本号升级，以区分新格式
        exportedAt: (/* @__PURE__ */ new Date()).toISOString(),
        assistants: selectedAssistants.map((a2) => ({
          name: a2.name,
          description: a2.description,
          avatar: a2.avatar,
          systemPrompt: a2.systemPrompt,
          isDefault: a2.isDefault
        })),
        upstreams: selectedUpstreamsData.map((u) => ({
          name: u.name,
          baseUrl: u.baseUrl,
          apiKey: u.apiKey,
          apiKeys: u.apiKeys,
          remark: u.remark,
          isDefault: u.isDefault,
          upstreamPlatform: u.upstreamPlatform,
          userApiKey: u.userApiKey,
          aimodels: u.aimodels?.map((m) => ({
            category: m.category,
            modelType: m.modelType,
            apiFormat: m.apiFormat,
            modelName: m.modelName,
            estimatedTime: m.estimatedTime,
            keyName: m.keyName
          }))
        }))
      };
      const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = (void 0).createElement("a");
      a.href = url;
      a.download = `mj-studio-export-${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.json`;
      a.click();
      URL.revokeObjectURL(url);
      const parts = [];
      if (selectedAssistants.length > 0) parts.push(`${selectedAssistants.length} 个助手`);
      if (selectedUpstreamsData.length > 0) parts.push(`${selectedUpstreamsData.length} 个上游配置`);
      toast.add({ title: `已导出 ${parts.join("、")}`, color: "success" });
    }
    function triggerImport() {
      fileInputRef.value?.click();
    }
    async function handleImport(event) {
      const target = event.target;
      const file = target.files?.[0];
      if (!file) return;
      try {
        const text = await file.text();
        const data = JSON.parse(text);
        if (!data.version) {
          throw new Error("无效的导入文件格式");
        }
        let assistantCount = 0;
        let upstreamCount = 0;
        if (Array.isArray(data.assistants)) {
          for (const item of data.assistants) {
            try {
              await createAssistant({
                name: item.name,
                description: item.description || void 0,
                avatar: item.avatar || void 0,
                systemPrompt: item.systemPrompt || void 0,
                isDefault: false
              });
              assistantCount++;
            } catch (e) {
              console.error("导入助手失败:", item.name, e);
            }
          }
        }
        if (Array.isArray(data.upstreams)) {
          for (const item of data.upstreams) {
            if (!item.name || !item.baseUrl || !item.apiKey) continue;
            const exists = upstreams.value.some((u) => u.name === item.name);
            if (exists) continue;
            try {
              await createUpstream({
                name: item.name,
                baseUrl: item.baseUrl,
                apiKey: item.apiKey,
                apiKeys: item.apiKeys,
                aimodels: item.aimodels || [],
                remark: item.remark,
                isDefault: false,
                upstreamPlatform: item.upstreamPlatform,
                userApiKey: item.userApiKey
              });
              upstreamCount++;
            } catch (e) {
              console.error("导入上游配置失败:", item.name, e);
            }
          }
        }
        if (Array.isArray(data.modelConfigs)) {
          for (const item of data.modelConfigs) {
            if (!item.name || !item.baseUrl || !item.apiKey) continue;
            const exists = upstreams.value.some((u) => u.name === item.name);
            if (exists) continue;
            try {
              const aimodels = (item.modelTypeConfigs || []).map((mtc) => ({
                category: mtc.category || "image",
                modelType: mtc.modelType,
                apiFormat: mtc.apiFormat,
                modelName: mtc.modelName,
                estimatedTime: mtc.estimatedTime,
                keyName: mtc.keyName
              }));
              await createUpstream({
                name: item.name,
                baseUrl: item.baseUrl,
                apiKey: item.apiKey,
                aimodels,
                remark: item.remark,
                isDefault: false
              });
              upstreamCount++;
            } catch (e) {
              console.error("导入模型配置失败:", item.name, e);
            }
          }
        }
        const parts = [];
        if (assistantCount > 0) parts.push(`${assistantCount} 个助手`);
        if (upstreamCount > 0) parts.push(`${upstreamCount} 个上游配置`);
        if (parts.length > 0) {
          toast.add({ title: `成功导入 ${parts.join("、")}`, color: "success" });
        } else {
          toast.add({ title: "没有导入任何数据", color: "warning" });
        }
      } catch (error) {
        toast.add({ title: "导入失败", description: error.message, color: "error" });
      }
      target.value = "";
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_SettingsLayout = __nuxt_component_0;
      const _component_UButton = _sfc_main$8;
      const _component_UIcon = _sfc_main$d;
      const _component_UCheckbox = _sfc_main$1;
      const _component_UBadge = _sfc_main$2;
      _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_SettingsLayout, _attrs, {
        default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="mb-4 flex items-center justify-between"${_scopeId}><h2 class="text-lg font-medium text-(--ui-text)"${_scopeId}>导入/导出</h2><div class="flex gap-2"${_scopeId}>`);
            _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UButton, {
              variant: "outline",
              onClick: triggerImport
            }, {
              default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UIcon, {
                    name: "i-heroicons-arrow-up-tray",
                    class: "w-4 h-4 mr-1"
                  }, null, _parent3, _scopeId2));
                  _push3(` 导入 `);
                } else {
                  return [
                    vueExports.createVNode(_component_UIcon, {
                      name: "i-heroicons-arrow-up-tray",
                      class: "w-4 h-4 mr-1"
                    }),
                    vueExports.createTextVNode(" 导入 ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UButton, { onClick: handleExport }, {
              default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UIcon, {
                    name: "i-heroicons-arrow-down-tray",
                    class: "w-4 h-4 mr-1"
                  }, null, _parent3, _scopeId2));
                  _push3(` 导出选中 `);
                } else {
                  return [
                    vueExports.createVNode(_component_UIcon, {
                      name: "i-heroicons-arrow-down-tray",
                      class: "w-4 h-4 mr-1"
                    }),
                    vueExports.createTextVNode(" 导出选中 ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><input type="file" accept=".json" class="hidden"${_scopeId}></div>`);
            if (vueExports.unref(isLoading)) {
              _push2(`<div class="text-center py-12"${_scopeId}>`);
              _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UIcon, {
                name: "i-heroicons-arrow-path",
                class: "w-8 h-8 text-(--ui-text-dimmed) animate-spin"
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<div class="space-y-6"${_scopeId}><div class="bg-(--ui-bg-elevated) rounded-lg p-6 border border-(--ui-border)"${_scopeId}><div class="flex items-center justify-between mb-3"${_scopeId}><h3 class="text-base font-medium text-(--ui-text)"${_scopeId}>助手</h3>`);
              if (vueExports.unref(assistants).length > 0) {
                _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UButton, {
                  size: "xs",
                  variant: "ghost",
                  onClick: toggleAllAssistants
                }, {
                  default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`${serverRenderer_cjs_prodExports.ssrInterpolate(vueExports.unref(isAllAssistantsSelected) ? "取消全选" : "全选")}`);
                    } else {
                      return [
                        vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(isAllAssistantsSelected) ? "取消全选" : "全选"), 1)
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
              if (vueExports.unref(assistants).length === 0) {
                _push2(`<div class="text-center py-6 text-(--ui-text-muted) text-sm"${_scopeId}> 暂无助手，可在对话页面创建 </div>`);
              } else {
                _push2(`<div class="space-y-2"${_scopeId}><!--[-->`);
                serverRenderer_cjs_prodExports.ssrRenderList(vueExports.unref(assistants), (assistant) => {
                  _push2(`<div class="${serverRenderer_cjs_prodExports.ssrRenderClass([vueExports.unref(selectedAssistantIds).has(assistant.id) ? "bg-(--ui-primary)/10" : "hover:bg-(--ui-bg)", "flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-colors"])}"${_scopeId}>`);
                  _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UCheckbox, {
                    "model-value": vueExports.unref(selectedAssistantIds).has(assistant.id)
                  }, null, _parent2, _scopeId));
                  _push2(`<div class="w-8 h-8 rounded-full flex-shrink-0 overflow-hidden ring-1 ring-(--ui-border)"${_scopeId}>`);
                  if (assistant.avatar) {
                    _push2(`<img${serverRenderer_cjs_prodExports.ssrRenderAttr("src", assistant.avatar)} class="w-full h-full object-cover"${_scopeId}>`);
                  } else {
                    _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UIcon, {
                      name: "i-heroicons-user-circle",
                      class: "w-full h-full text-(--ui-text-muted)"
                    }, null, _parent2, _scopeId));
                  }
                  _push2(`</div><div class="flex-1 min-w-0"${_scopeId}><div class="text-sm font-medium truncate"${_scopeId}>${serverRenderer_cjs_prodExports.ssrInterpolate(assistant.name)}</div><div class="text-xs text-(--ui-text-dimmed) truncate"${_scopeId}>${serverRenderer_cjs_prodExports.ssrInterpolate(assistant.description || "无描述")}</div></div>`);
                  if (assistant.isDefault) {
                    _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UBadge, {
                      size: "xs",
                      color: "primary",
                      variant: "soft"
                    }, {
                      default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                        if (_push3) {
                          _push3(`默认`);
                        } else {
                          return [
                            vueExports.createTextVNode("默认")
                          ];
                        }
                      }),
                      _: 2
                    }, _parent2, _scopeId));
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`</div>`);
                });
                _push2(`<!--]--></div>`);
              }
              _push2(`</div><div class="bg-(--ui-bg-elevated) rounded-lg p-4 border border-(--ui-border)"${_scopeId}><div class="flex items-center justify-between mb-3"${_scopeId}><h3 class="font-medium text-(--ui-text)"${_scopeId}>上游配置</h3>`);
              if (vueExports.unref(upstreams).length > 0) {
                _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UButton, {
                  size: "xs",
                  variant: "ghost",
                  onClick: toggleAllUpstreams
                }, {
                  default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`${serverRenderer_cjs_prodExports.ssrInterpolate(vueExports.unref(isAllUpstreamsSelected) ? "取消全选" : "全选")}`);
                    } else {
                      return [
                        vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(isAllUpstreamsSelected) ? "取消全选" : "全选"), 1)
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
              if (vueExports.unref(upstreams).length === 0) {
                _push2(`<div class="text-center py-6 text-(--ui-text-muted) text-sm"${_scopeId}> 暂无上游配置 </div>`);
              } else {
                _push2(`<div class="space-y-2"${_scopeId}><!--[-->`);
                serverRenderer_cjs_prodExports.ssrRenderList(vueExports.unref(upstreams), (upstream) => {
                  _push2(`<div class="${serverRenderer_cjs_prodExports.ssrRenderClass([vueExports.unref(selectedUpstreamIds).has(upstream.id) ? "bg-(--ui-primary)/10" : "hover:bg-(--ui-bg)", "flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-colors"])}"${_scopeId}>`);
                  _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UCheckbox, {
                    "model-value": vueExports.unref(selectedUpstreamIds).has(upstream.id)
                  }, null, _parent2, _scopeId));
                  _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UIcon, {
                    name: "i-heroicons-cpu-chip",
                    class: "w-5 h-5 text-(--ui-text-muted)"
                  }, null, _parent2, _scopeId));
                  _push2(`<div class="flex-1 min-w-0"${_scopeId}><div class="text-sm font-medium truncate"${_scopeId}>${serverRenderer_cjs_prodExports.ssrInterpolate(upstream.name)}</div><div class="text-xs text-(--ui-text-dimmed) truncate"${_scopeId}>${serverRenderer_cjs_prodExports.ssrInterpolate(upstream.baseUrl)}</div></div>`);
                  if (upstream.isDefault) {
                    _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UBadge, {
                      size: "xs",
                      color: "primary",
                      variant: "soft"
                    }, {
                      default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                        if (_push3) {
                          _push3(`默认`);
                        } else {
                          return [
                            vueExports.createTextVNode("默认")
                          ];
                        }
                      }),
                      _: 2
                    }, _parent2, _scopeId));
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`</div>`);
                });
                _push2(`<!--]--></div>`);
              }
              _push2(`</div></div>`);
            }
            _push2(`<div class="mt-6 p-4 bg-(--ui-bg-elevated) rounded-lg border border-(--ui-border)"${_scopeId}><h3 class="text-sm font-medium text-(--ui-text) mb-2"${_scopeId}>说明</h3><ul class="text-xs text-(--ui-text-muted) space-y-1"${_scopeId}><li${_scopeId}>• 选择要导出的项目后点击&quot;导出选中&quot;</li><li${_scopeId}>• 助手导出包含名称、描述、头像（Base64）和系统提示词</li><li${_scopeId}>• 上游配置导出包含名称、API 地址、密钥和模型列表</li><li${_scopeId}>• 导入时会创建新项目，同名上游配置会跳过</li><li${_scopeId}>• 支持导入旧版本（v1）的配置文件</li></ul></div>`);
          } else {
            return [
              vueExports.createVNode("div", { class: "mb-4 flex items-center justify-between" }, [
                vueExports.createVNode("h2", { class: "text-lg font-medium text-(--ui-text)" }, "导入/导出"),
                vueExports.createVNode("div", { class: "flex gap-2" }, [
                  vueExports.createVNode(_component_UButton, {
                    variant: "outline",
                    onClick: triggerImport
                  }, {
                    default: vueExports.withCtx(() => [
                      vueExports.createVNode(_component_UIcon, {
                        name: "i-heroicons-arrow-up-tray",
                        class: "w-4 h-4 mr-1"
                      }),
                      vueExports.createTextVNode(" 导入 ")
                    ]),
                    _: 1
                  }),
                  vueExports.createVNode(_component_UButton, { onClick: handleExport }, {
                    default: vueExports.withCtx(() => [
                      vueExports.createVNode(_component_UIcon, {
                        name: "i-heroicons-arrow-down-tray",
                        class: "w-4 h-4 mr-1"
                      }),
                      vueExports.createTextVNode(" 导出选中 ")
                    ]),
                    _: 1
                  })
                ]),
                vueExports.createVNode("input", {
                  ref_key: "fileInputRef",
                  ref: fileInputRef,
                  type: "file",
                  accept: ".json",
                  class: "hidden",
                  onChange: handleImport
                }, null, 544)
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
                    vueExports.createVNode("h3", { class: "text-base font-medium text-(--ui-text)" }, "助手"),
                    vueExports.unref(assistants).length > 0 ? (vueExports.openBlock(), vueExports.createBlock(_component_UButton, {
                      key: 0,
                      size: "xs",
                      variant: "ghost",
                      onClick: toggleAllAssistants
                    }, {
                      default: vueExports.withCtx(() => [
                        vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(isAllAssistantsSelected) ? "取消全选" : "全选"), 1)
                      ]),
                      _: 1
                    })) : vueExports.createCommentVNode("", true)
                  ]),
                  vueExports.unref(assistants).length === 0 ? (vueExports.openBlock(), vueExports.createBlock("div", {
                    key: 0,
                    class: "text-center py-6 text-(--ui-text-muted) text-sm"
                  }, " 暂无助手，可在对话页面创建 ")) : (vueExports.openBlock(), vueExports.createBlock("div", {
                    key: 1,
                    class: "space-y-2"
                  }, [
                    (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(vueExports.unref(assistants), (assistant) => {
                      return vueExports.openBlock(), vueExports.createBlock("div", {
                        key: assistant.id,
                        class: ["flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-colors", vueExports.unref(selectedAssistantIds).has(assistant.id) ? "bg-(--ui-primary)/10" : "hover:bg-(--ui-bg)"],
                        onClick: ($event) => toggleAssistant(assistant.id)
                      }, [
                        vueExports.createVNode(_component_UCheckbox, {
                          "model-value": vueExports.unref(selectedAssistantIds).has(assistant.id)
                        }, null, 8, ["model-value"]),
                        vueExports.createVNode("div", { class: "w-8 h-8 rounded-full flex-shrink-0 overflow-hidden ring-1 ring-(--ui-border)" }, [
                          assistant.avatar ? (vueExports.openBlock(), vueExports.createBlock("img", {
                            key: 0,
                            src: assistant.avatar,
                            class: "w-full h-full object-cover"
                          }, null, 8, ["src"])) : (vueExports.openBlock(), vueExports.createBlock(_component_UIcon, {
                            key: 1,
                            name: "i-heroicons-user-circle",
                            class: "w-full h-full text-(--ui-text-muted)"
                          }))
                        ]),
                        vueExports.createVNode("div", { class: "flex-1 min-w-0" }, [
                          vueExports.createVNode("div", { class: "text-sm font-medium truncate" }, vueExports.toDisplayString(assistant.name), 1),
                          vueExports.createVNode("div", { class: "text-xs text-(--ui-text-dimmed) truncate" }, vueExports.toDisplayString(assistant.description || "无描述"), 1)
                        ]),
                        assistant.isDefault ? (vueExports.openBlock(), vueExports.createBlock(_component_UBadge, {
                          key: 0,
                          size: "xs",
                          color: "primary",
                          variant: "soft"
                        }, {
                          default: vueExports.withCtx(() => [
                            vueExports.createTextVNode("默认")
                          ]),
                          _: 1
                        })) : vueExports.createCommentVNode("", true)
                      ], 10, ["onClick"]);
                    }), 128))
                  ]))
                ]),
                vueExports.createVNode("div", { class: "bg-(--ui-bg-elevated) rounded-lg p-4 border border-(--ui-border)" }, [
                  vueExports.createVNode("div", { class: "flex items-center justify-between mb-3" }, [
                    vueExports.createVNode("h3", { class: "font-medium text-(--ui-text)" }, "上游配置"),
                    vueExports.unref(upstreams).length > 0 ? (vueExports.openBlock(), vueExports.createBlock(_component_UButton, {
                      key: 0,
                      size: "xs",
                      variant: "ghost",
                      onClick: toggleAllUpstreams
                    }, {
                      default: vueExports.withCtx(() => [
                        vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(isAllUpstreamsSelected) ? "取消全选" : "全选"), 1)
                      ]),
                      _: 1
                    })) : vueExports.createCommentVNode("", true)
                  ]),
                  vueExports.unref(upstreams).length === 0 ? (vueExports.openBlock(), vueExports.createBlock("div", {
                    key: 0,
                    class: "text-center py-6 text-(--ui-text-muted) text-sm"
                  }, " 暂无上游配置 ")) : (vueExports.openBlock(), vueExports.createBlock("div", {
                    key: 1,
                    class: "space-y-2"
                  }, [
                    (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(vueExports.unref(upstreams), (upstream) => {
                      return vueExports.openBlock(), vueExports.createBlock("div", {
                        key: upstream.id,
                        class: ["flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-colors", vueExports.unref(selectedUpstreamIds).has(upstream.id) ? "bg-(--ui-primary)/10" : "hover:bg-(--ui-bg)"],
                        onClick: ($event) => toggleUpstream(upstream.id)
                      }, [
                        vueExports.createVNode(_component_UCheckbox, {
                          "model-value": vueExports.unref(selectedUpstreamIds).has(upstream.id)
                        }, null, 8, ["model-value"]),
                        vueExports.createVNode(_component_UIcon, {
                          name: "i-heroicons-cpu-chip",
                          class: "w-5 h-5 text-(--ui-text-muted)"
                        }),
                        vueExports.createVNode("div", { class: "flex-1 min-w-0" }, [
                          vueExports.createVNode("div", { class: "text-sm font-medium truncate" }, vueExports.toDisplayString(upstream.name), 1),
                          vueExports.createVNode("div", { class: "text-xs text-(--ui-text-dimmed) truncate" }, vueExports.toDisplayString(upstream.baseUrl), 1)
                        ]),
                        upstream.isDefault ? (vueExports.openBlock(), vueExports.createBlock(_component_UBadge, {
                          key: 0,
                          size: "xs",
                          color: "primary",
                          variant: "soft"
                        }, {
                          default: vueExports.withCtx(() => [
                            vueExports.createTextVNode("默认")
                          ]),
                          _: 1
                        })) : vueExports.createCommentVNode("", true)
                      ], 10, ["onClick"]);
                    }), 128))
                  ]))
                ])
              ])),
              vueExports.createVNode("div", { class: "mt-6 p-4 bg-(--ui-bg-elevated) rounded-lg border border-(--ui-border)" }, [
                vueExports.createVNode("h3", { class: "text-sm font-medium text-(--ui-text) mb-2" }, "说明"),
                vueExports.createVNode("ul", { class: "text-xs text-(--ui-text-muted) space-y-1" }, [
                  vueExports.createVNode("li", null, '• 选择要导出的项目后点击"导出选中"'),
                  vueExports.createVNode("li", null, "• 助手导出包含名称、描述、头像（Base64）和系统提示词"),
                  vueExports.createVNode("li", null, "• 上游配置导出包含名称、API 地址、密钥和模型列表"),
                  vueExports.createVNode("li", null, "• 导入时会创建新项目，同名上游配置会跳过"),
                  vueExports.createVNode("li", null, "• 支持导入旧版本（v1）的配置文件")
                ])
              ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/settings/export.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=export-CfmuBWTl.mjs.map
