import { v as vueExports, g as useToast, h as useRouter, i as useRoute$1, s as serverRenderer_cjs_prodExports, c as _sfc_main$8$1, b as _sfc_main$d, d as useState, _ as _export_sfc, e as useAppConfig, t as tv, f as fieldGroupInjectionKey, P as Primitive } from './server.mjs';
import { u as useGlobalEvents, s as setInterval, _ as __nuxt_component_3$1, a as __nuxt_component_0$1 } from './TimeAgo-CNFOo2Jq.mjs';
import { _ as _sfc_main$c } from './Modal-DTUEXzQH.mjs';
import { D as DEFAULT_CHAT_FALLBACK_ESTIMATED_TIME, a as DEFAULT_FALLBACK_ESTIMATED_TIME, P as PROGRESS_TIME_BUFFER_RATIO } from './constants-Bq60BfFZ.mjs';
import { _ as _sfc_main$b } from './DropdownMenu-D_kNtRd4.mjs';
import { Marked } from 'marked';
import { codeToHtml } from 'shiki';
import { u as useAuth } from './useAuth-xXrD8D6Y.mjs';
import { _ as __nuxt_component_4$1 } from './ModelSelector-BascUgGk.mjs';
import { _ as _sfc_main$a } from './Drawer-B6XEXTdS.mjs';
import { _ as _sfc_main$e } from './Form-CigZWYkv.mjs';
import { _ as _sfc_main$f } from './FormField-CGip9Bav.mjs';
import { _ as _sfc_main$g } from './Input-A_WPZx9s.mjs';
import { _ as _sfc_main$h } from './Textarea-Dhde2llm.mjs';
import { u as useAssistants } from './useAssistants-CglvJODb.mjs';
import { u as useUpstreams } from './useUpstreams-CU2PuBUF.mjs';
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
import './useTimeFormat-BGnNO3st.mjs';
import './DialogTrigger-DZAnfNyf.mjs';
import './utils-DCnNb5Bf.mjs';
import './index--6aaawBa.mjs';
import './PopperArrow-_X1u5CFX.mjs';
import './RovingFocusGroup-CN9Tim1l.mjs';
import './Label-CV5OSAkM.mjs';

const _sfc_main$9 = /* @__PURE__ */ vueExports.defineComponent({
  __name: "AssistantList",
  __ssrInlineRender: true,
  props: {
    assistants: {},
    currentAssistantId: {}
  },
  emits: ["select", "create"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const sortedAssistants = vueExports.computed(() => {
      return [...props.assistants].sort((a, b) => {
        if (a.isDefault && !b.isDefault) return -1;
        if (!a.isDefault && b.isDefault) return 1;
        return 0;
      });
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = _sfc_main$d;
      _push(`<div${serverRenderer_cjs_prodExports.ssrRenderAttrs(vueExports.mergeProps({ class: "h-full flex flex-col bg-(--ui-bg-elevated) border-r border-(--ui-border)" }, _attrs))}><div class="p-4 border-b border-(--ui-border)"><h3 class="font-medium text-base">助手列表</h3></div><div class="flex-1 overflow-y-auto p-2 space-y-2"><!--[-->`);
      serverRenderer_cjs_prodExports.ssrRenderList(vueExports.unref(sortedAssistants), (assistant) => {
        _push(`<button class="${serverRenderer_cjs_prodExports.ssrRenderClass([assistant.id === __props.currentAssistantId ? "bg-(--ui-primary)/10 ring-1 ring-(--ui-primary)/30" : "hover:bg-(--ui-bg) ring-1 ring-(--ui-border-accented)", "w-full p-3 text-left rounded-lg transition-colors"])}"><div class="flex items-center gap-3"><div class="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden ring-1 ring-(--ui-border)">`);
        if (assistant.avatar) {
          _push(`<img${serverRenderer_cjs_prodExports.ssrRenderAttr("src", assistant.avatar)} class="w-full h-full object-cover">`);
        } else {
          _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UIcon, {
            name: "i-heroicons-user-circle",
            class: "w-7 h-7 text-(--ui-text-muted)"
          }, null, _parent));
        }
        _push(`</div><div class="flex-1 min-w-0"><div class="text-base font-medium truncate flex items-center gap-1.5">${serverRenderer_cjs_prodExports.ssrInterpolate(assistant.name)} `);
        if (assistant.isDefault) {
          _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UIcon, {
            name: "i-heroicons-star-solid",
            class: "w-4 h-4 text-yellow-500"
          }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="text-sm text-(--ui-text-muted)">${serverRenderer_cjs_prodExports.ssrInterpolate(assistant.conversationCount)} 个对话 </div></div>`);
        if (assistant.id === __props.currentAssistantId) {
          _push(`<span class="w-2 h-2 rounded-full bg-(--ui-primary) flex-shrink-0"></span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></button>`);
      });
      _push(`<!--]--><button class="w-full p-3 rounded-lg border-2 border-dashed border-(--ui-border) hover:border-(--ui-primary) hover:bg-(--ui-primary)/5 transition-colors flex items-center justify-center gap-2 text-(--ui-text-muted) hover:text-(--ui-primary)">`);
      _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-plus",
        class: "w-5 h-5"
      }, null, _parent));
      _push(`<span>新建助手</span></button></div></div>`);
    };
  }
});
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = vueExports.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/chat/AssistantList.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
const __nuxt_component_2 = Object.assign(_sfc_main$9, { __name: "ChatAssistantList" });
const _sfc_main$8 = /* @__PURE__ */ vueExports.defineComponent({
  __name: "MjDrawingBlock",
  __ssrInlineRender: true,
  props: {
    params: {}
  },
  setup(__props) {
    const props = __props;
    useGlobalEvents();
    const status = vueExports.ref("idle");
    const progress = vueExports.ref(null);
    const resourceUrl = vueExports.ref(null);
    const taskId = vueExports.ref(null);
    const error = vueExports.ref(null);
    const createdAt = vueExports.ref(null);
    const isBlurred = vueExports.ref(true);
    const showPreview = vueExports.ref(false);
    const showDetail = vueExports.ref(false);
    const showActions = vueExports.ref(false);
    const now = vueExports.ref(Date.now());
    let progressTimer = null;
    const isLoading = vueExports.computed(() => ["pending", "submitting", "processing"].includes(status.value));
    const statusInfo = vueExports.computed(() => {
      switch (status.value) {
        case "idle":
          return { text: "等待提交", color: "text-(--ui-text-muted)", icon: "i-heroicons-sparkles", showBars: false };
        case "pending":
          return { text: "排队中...", color: "text-(--ui-warning)", icon: "i-heroicons-clock", showBars: false };
        case "submitting":
          return { text: "正在提交...", color: "text-(--ui-info)", icon: null, showBars: true };
        case "processing":
          return { text: progress.value || "正在创作中...", color: "text-(--ui-primary)", icon: null, showBars: true };
        case "success":
          return { text: "已完成", color: "text-(--ui-success)", icon: "i-heroicons-check-circle", showBars: false };
        case "failed":
          return { text: "生成失败", color: "text-(--ui-error)", icon: "i-heroicons-exclamation-triangle", showBars: false };
        default:
          return { text: "未知状态", color: "text-(--ui-text-muted)", icon: "i-heroicons-question-mark-circle", showBars: false };
      }
    });
    const progressPercent = vueExports.computed(() => {
      if (!isLoading.value || !createdAt.value) return 0;
      const start = createdAt.value.getTime();
      const elapsed = (now.value - start) / 1e3;
      const bufferedTime = DEFAULT_FALLBACK_ESTIMATED_TIME * PROGRESS_TIME_BUFFER_RATIO;
      return Math.min(elapsed / bufferedTime * 100, 100);
    });
    vueExports.watch(isLoading, (loading) => {
      if (loading) {
        now.value = Date.now();
        progressTimer = setInterval();
      } else if (progressTimer) {
        clearInterval(progressTimer);
        progressTimer = null;
      }
    }, { immediate: true });
    async function fetchOrCreateTask(startTask = false) {
      if (!props.params.uniqueId || !props.params.prompt) {
        error.value = "缺少必要参数";
        status.value = "failed";
        return;
      }
      status.value = "pending";
      error.value = null;
      createdAt.value = /* @__PURE__ */ new Date();
      try {
        const res = await $fetch("/api/illustrations", {
          method: "POST",
          body: {
            uniqueId: props.params.uniqueId,
            prompt: props.params.prompt,
            model: props.params.model,
            negative: props.params.negative,
            autostart: startTask
          }
        });
        taskId.value = res.taskId;
        updateFromResponse(res, startTask);
      } catch (e) {
        error.value = e.data?.message || e.message || "请求失败";
        status.value = "failed";
      }
    }
    function updateFromResponse(res, wasStarted = true) {
      progress.value = res.progress;
      resourceUrl.value = res.resourceUrl;
      error.value = res.error;
      if (res.isBlurred !== void 0) {
        isBlurred.value = res.isBlurred;
      }
      if (res.status === "success") {
        status.value = "success";
      } else if (res.status === "failed") {
        status.value = "failed";
      } else if (res.status === "submitting") {
        status.value = "submitting";
      } else if (res.status === "processing") {
        status.value = "processing";
      } else if (res.status === "pending") {
        status.value = wasStarted ? "pending" : "idle";
      } else {
        status.value = "idle";
      }
    }
    function downloadImage() {
      if (!resourceUrl.value) return;
      const a = (void 0).createElement("a");
      a.href = resourceUrl.value;
      a.download = `illustration-${props.params.uniqueId}.png`;
      a.target = "_blank";
      a.click();
    }
    async function regenerate() {
      if (!props.params.uniqueId || !props.params.prompt) {
        error.value = "缺少必要参数";
        status.value = "failed";
        return;
      }
      status.value = "pending";
      error.value = null;
      resourceUrl.value = null;
      createdAt.value = /* @__PURE__ */ new Date();
      try {
        const res = await $fetch("/api/illustrations/regenerate", {
          method: "POST",
          body: {
            uniqueId: props.params.uniqueId,
            prompt: props.params.prompt,
            model: props.params.model,
            negative: props.params.negative
          }
        });
        taskId.value = res.taskId;
        updateFromResponse(res, true);
      } catch (e) {
        error.value = e.data?.message || e.message || "重新生成失败";
        status.value = "failed";
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_StudioLoader = __nuxt_component_0$1;
      const _component_UIcon = _sfc_main$d;
      const _component_UButton = _sfc_main$8$1;
      const _component_UModal = _sfc_main$c;
      _push(`<div${serverRenderer_cjs_prodExports.ssrRenderAttrs(vueExports.mergeProps({ class: "mj-drawing-container my-3 bg-(--ui-bg-elevated) rounded-lg border border-(--ui-border) overflow-hidden max-w-md" }, _attrs))}><div class="aspect-[4/3] bg-black/10 relative group">`);
      if (vueExports.unref(status) === "success" && vueExports.unref(resourceUrl)) {
        _push(`<img${serverRenderer_cjs_prodExports.ssrRenderAttr("src", vueExports.unref(resourceUrl))}${serverRenderer_cjs_prodExports.ssrRenderAttr("alt", __props.params.prompt)} class="${serverRenderer_cjs_prodExports.ssrRenderClass([vueExports.unref(isBlurred) ? "blur-xl scale-105" : "hover:opacity-90", "w-full h-full object-contain cursor-pointer transition-all duration-300"])}">`);
      } else {
        _push(`<div class="w-full h-full flex flex-col p-5"><div class="flex-1 flex flex-col items-center justify-center">`);
        if (vueExports.unref(statusInfo).showBars) {
          _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_StudioLoader, {
            class: ["w-10 h-10", vueExports.unref(statusInfo).color]
          }, null, _parent));
        } else if (vueExports.unref(statusInfo).icon) {
          _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UIcon, {
            name: vueExports.unref(statusInfo).icon,
            class: ["w-10 h-10", vueExports.unref(statusInfo).color]
          }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`<p class="${serverRenderer_cjs_prodExports.ssrRenderClass(["text-sm font-medium mt-3", vueExports.unref(statusInfo).color])}">${serverRenderer_cjs_prodExports.ssrInterpolate(vueExports.unref(statusInfo).text)}</p>`);
        if (vueExports.unref(error) && vueExports.unref(status) === "failed") {
          _push(`<p class="text-(--ui-error) text-xs leading-relaxed line-clamp-2 mt-2 max-w-[90%] text-center">${serverRenderer_cjs_prodExports.ssrInterpolate(vueExports.unref(error))}</p>`);
        } else {
          _push(`<!---->`);
        }
        if (vueExports.unref(status) === "idle") {
          _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UButton, {
            size: "sm",
            class: "mt-4",
            onClick: ($event) => fetchOrCreateTask(true)
          }, {
            default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UIcon, {
                  name: "i-heroicons-sparkles",
                  class: "w-4 h-4 mr-1"
                }, null, _parent2, _scopeId));
                _push2(` 生成插图 `);
              } else {
                return [
                  vueExports.createVNode(_component_UIcon, {
                    name: "i-heroicons-sparkles",
                    class: "w-4 h-4 mr-1"
                  }),
                  vueExports.createTextVNode(" 生成插图 ")
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        if (vueExports.unref(status) === "failed") {
          _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UButton, {
            size: "sm",
            variant: "outline",
            class: "mt-3",
            onClick: regenerate
          }, {
            default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UIcon, {
                  name: "i-heroicons-arrow-path",
                  class: "w-4 h-4 mr-1"
                }, null, _parent2, _scopeId));
                _push2(` 重试 `);
              } else {
                return [
                  vueExports.createVNode(_component_UIcon, {
                    name: "i-heroicons-arrow-path",
                    class: "w-4 h-4 mr-1"
                  }),
                  vueExports.createTextVNode(" 重试 ")
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="pt-3 border-t border-(--ui-border-muted)"><p class="text-sm font-medium text-(--ui-text) truncate"${serverRenderer_cjs_prodExports.ssrRenderAttr("title", __props.params.uniqueId)}>${serverRenderer_cjs_prodExports.ssrInterpolate(__props.params.uniqueId)}</p><p class="text-xs text-(--ui-text-muted) line-clamp-2 leading-relaxed mt-1"${serverRenderer_cjs_prodExports.ssrRenderAttr("title", __props.params.prompt)}>${serverRenderer_cjs_prodExports.ssrInterpolate(__props.params.prompt)}</p></div></div>`);
      }
      if (vueExports.unref(status) === "success" && vueExports.unref(resourceUrl)) {
        _push(`<div class="${serverRenderer_cjs_prodExports.ssrRenderClass([vueExports.unref(showActions) ? "opacity-100" : "opacity-0 md:group-hover:opacity-100", "absolute top-2 left-2 flex gap-1 transition-opacity"])}"><button class="w-8 h-8 flex items-center justify-center rounded-full bg-black/50 backdrop-blur-sm hover:bg-black/70 transition-colors" title="下载图片">`);
        _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-arrow-down-tray",
          class: "w-4 h-4 text-white"
        }, null, _parent));
        _push(`</button><button class="w-8 h-8 flex items-center justify-center rounded-full bg-black/50 backdrop-blur-sm hover:bg-black/70 transition-colors" title="放大查看">`);
        _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-magnifying-glass-plus",
          class: "w-4 h-4 text-white"
        }, null, _parent));
        _push(`</button><button class="w-8 h-8 flex items-center justify-center rounded-full bg-black/50 backdrop-blur-sm hover:bg-black/70 transition-colors" title="重新生成">`);
        _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-arrow-path",
          class: "w-4 h-4 text-white"
        }, null, _parent));
        _push(`</button><button class="w-8 h-8 flex items-center justify-center rounded-full bg-black/50 backdrop-blur-sm hover:bg-black/70 transition-colors" title="查看详情">`);
        _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-information-circle",
          class: "w-4 h-4 text-white"
        }, null, _parent));
        _push(`</button></div>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.params.model) {
        _push(`<div class="absolute bottom-2 left-2 px-2 py-1 rounded-full text-xs text-white font-medium bg-indigo-500/80">${serverRenderer_cjs_prodExports.ssrInterpolate(__props.params.model)}</div>`);
      } else {
        _push(`<!---->`);
      }
      if (vueExports.unref(isLoading)) {
        _push(`<div class="absolute bottom-0 left-0 right-0 h-[3px] bg-black/20 overflow-hidden"><div class="h-full transition-all duration-500 ease-out animate-shimmer" style="${serverRenderer_cjs_prodExports.ssrRenderStyle({
          width: `${vueExports.unref(progressPercent)}%`,
          backgroundImage: "linear-gradient(90deg, #8b5cf6, #ec4899, #06b6d4, #8b5cf6)",
          backgroundSize: "200% 100%"
        })}"></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UModal, {
        open: vueExports.unref(showPreview),
        "onUpdate:open": ($event) => vueExports.isRef(showPreview) ? showPreview.value = $event : null,
        ui: { content: "sm:max-w-4xl" }
      }, {
        content: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="relative bg-(--ui-bg) flex items-center justify-center"${_scopeId}><img${serverRenderer_cjs_prodExports.ssrRenderAttr("src", vueExports.unref(resourceUrl))}${serverRenderer_cjs_prodExports.ssrRenderAttr("alt", __props.params.prompt)} class="max-h-[85vh] object-contain"${_scopeId}><button class="absolute top-3 right-3 w-9 h-9 flex items-center justify-center rounded-full bg-black/50 backdrop-blur-sm hover:bg-black/70 transition-colors"${_scopeId}>`);
            _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-x-mark",
              class: "w-5 h-5 text-white"
            }, null, _parent2, _scopeId));
            _push2(`</button><button class="absolute top-3 left-3 w-9 h-9 flex items-center justify-center rounded-full bg-black/50 backdrop-blur-sm hover:bg-black/70 transition-colors" title="下载图片"${_scopeId}>`);
            _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-arrow-down-tray",
              class: "w-5 h-5 text-white"
            }, null, _parent2, _scopeId));
            _push2(`</button></div>`);
          } else {
            return [
              vueExports.createVNode("div", { class: "relative bg-(--ui-bg) flex items-center justify-center" }, [
                vueExports.createVNode("img", {
                  src: vueExports.unref(resourceUrl),
                  alt: __props.params.prompt,
                  class: "max-h-[85vh] object-contain"
                }, null, 8, ["src", "alt"]),
                vueExports.createVNode("button", {
                  class: "absolute top-3 right-3 w-9 h-9 flex items-center justify-center rounded-full bg-black/50 backdrop-blur-sm hover:bg-black/70 transition-colors",
                  onClick: ($event) => showPreview.value = false
                }, [
                  vueExports.createVNode(_component_UIcon, {
                    name: "i-heroicons-x-mark",
                    class: "w-5 h-5 text-white"
                  })
                ], 8, ["onClick"]),
                vueExports.createVNode("button", {
                  class: "absolute top-3 left-3 w-9 h-9 flex items-center justify-center rounded-full bg-black/50 backdrop-blur-sm hover:bg-black/70 transition-colors",
                  title: "下载图片",
                  onClick: downloadImage
                }, [
                  vueExports.createVNode(_component_UIcon, {
                    name: "i-heroicons-arrow-down-tray",
                    class: "w-5 h-5 text-white"
                  })
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UModal, {
        open: vueExports.unref(showDetail),
        "onUpdate:open": ($event) => vueExports.isRef(showDetail) ? showDetail.value = $event : null,
        title: "插图详情"
      }, {
        body: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="space-y-3 text-sm"${_scopeId}><div${_scopeId}><span class="text-(--ui-text-muted) block mb-1"${_scopeId}>标识</span><p class="text-(--ui-text) font-mono text-xs"${_scopeId}>${serverRenderer_cjs_prodExports.ssrInterpolate(__props.params.uniqueId)}</p></div><div${_scopeId}><span class="text-(--ui-text-muted) block mb-1"${_scopeId}>提示词</span><p class="text-(--ui-text) bg-(--ui-bg-muted) rounded p-2 text-xs break-all"${_scopeId}>${serverRenderer_cjs_prodExports.ssrInterpolate(__props.params.prompt)}</p></div>`);
            if (__props.params.model) {
              _push2(`<div class="flex justify-between"${_scopeId}><span class="text-(--ui-text-muted)"${_scopeId}>模型</span><span class="text-(--ui-text) font-mono text-xs"${_scopeId}>${serverRenderer_cjs_prodExports.ssrInterpolate(__props.params.model)}</span></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.params.negative) {
              _push2(`<div${_scopeId}><span class="text-(--ui-text-muted) block mb-1"${_scopeId}>负面提示词</span><p class="text-(--ui-text) bg-(--ui-bg-muted) rounded p-2 text-xs break-all"${_scopeId}>${serverRenderer_cjs_prodExports.ssrInterpolate(__props.params.negative)}</p></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          } else {
            return [
              vueExports.createVNode("div", { class: "space-y-3 text-sm" }, [
                vueExports.createVNode("div", null, [
                  vueExports.createVNode("span", { class: "text-(--ui-text-muted) block mb-1" }, "标识"),
                  vueExports.createVNode("p", { class: "text-(--ui-text) font-mono text-xs" }, vueExports.toDisplayString(__props.params.uniqueId), 1)
                ]),
                vueExports.createVNode("div", null, [
                  vueExports.createVNode("span", { class: "text-(--ui-text-muted) block mb-1" }, "提示词"),
                  vueExports.createVNode("p", { class: "text-(--ui-text) bg-(--ui-bg-muted) rounded p-2 text-xs break-all" }, vueExports.toDisplayString(__props.params.prompt), 1)
                ]),
                __props.params.model ? (vueExports.openBlock(), vueExports.createBlock("div", {
                  key: 0,
                  class: "flex justify-between"
                }, [
                  vueExports.createVNode("span", { class: "text-(--ui-text-muted)" }, "模型"),
                  vueExports.createVNode("span", { class: "text-(--ui-text) font-mono text-xs" }, vueExports.toDisplayString(__props.params.model), 1)
                ])) : vueExports.createCommentVNode("", true),
                __props.params.negative ? (vueExports.openBlock(), vueExports.createBlock("div", { key: 1 }, [
                  vueExports.createVNode("span", { class: "text-(--ui-text-muted) block mb-1" }, "负面提示词"),
                  vueExports.createVNode("p", { class: "text-(--ui-text) bg-(--ui-bg-muted) rounded p-2 text-xs break-all" }, vueExports.toDisplayString(__props.params.negative), 1)
                ])) : vueExports.createCommentVNode("", true)
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = vueExports.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/chat/MjDrawingBlock.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const __nuxt_component_0 = Object.assign(_sfc_main$8, { __name: "ChatMjDrawingBlock" });
const _sfc_main$7 = /* @__PURE__ */ vueExports.defineComponent({
  __name: "MarkdownContent",
  __ssrInlineRender: true,
  props: {
    html: {}
  },
  setup(__props) {
    const props = __props;
    function decodeBase642(str) {
      return decodeURIComponent(escape(atob(str)));
    }
    const parts = vueExports.computed(() => {
      if (!props.html) return [];
      const result = [];
      const regex = /<div class="mj-drawing-block" data-mj-drawing="([^"]+)"><\/div>/g;
      let lastIndex = 0;
      let match;
      while ((match = regex.exec(props.html)) !== null) {
        if (match.index > lastIndex) {
          const htmlPart = props.html.slice(lastIndex, match.index);
          if (htmlPart.trim()) {
            result.push({ type: "html", content: htmlPart });
          }
        }
        result.push({ type: "drawing", content: match[1] });
        lastIndex = match.index + match[0].length;
      }
      if (lastIndex < props.html.length) {
        const htmlPart = props.html.slice(lastIndex);
        if (htmlPart.trim()) {
          result.push({ type: "html", content: htmlPart });
        }
      }
      if (result.length === 0 && props.html.trim()) {
        result.push({ type: "html", content: props.html });
      }
      return result;
    });
    function parseDrawingParams(base64Data) {
      try {
        return JSON.parse(decodeBase642(base64Data));
      } catch {
        return { uniqueId: "", prompt: "" };
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ChatMjDrawingBlock = __nuxt_component_0;
      _push(`<div${serverRenderer_cjs_prodExports.ssrRenderAttrs(vueExports.mergeProps({ class: "markdown-content-wrapper" }, _attrs))}><!--[-->`);
      serverRenderer_cjs_prodExports.ssrRenderList(vueExports.unref(parts), (part, index) => {
        _push(`<!--[-->`);
        if (part.type === "html") {
          _push(`<div class="markdown-content">${part.content ?? ""}</div>`);
        } else {
          _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_ChatMjDrawingBlock, {
            params: parseDrawingParams(part.content)
          }, null, _parent));
        }
        _push(`<!--]-->`);
      });
      _push(`<!--]--></div>`);
    };
  }
});
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = vueExports.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/chat/MarkdownContent.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const __nuxt_component_1 = Object.assign(_sfc_main$7, { __name: "ChatMarkdownContent" });
function parseMjDrawingParams(text) {
  const params = {
    uniqueId: "",
    prompt: "",
    autostart: false
  };
  const lines = text.trim().split("\n");
  for (const line of lines) {
    const colonIndex = line.indexOf(":");
    if (colonIndex === -1) continue;
    const key = line.slice(0, colonIndex).trim().toLowerCase();
    const value = line.slice(colonIndex + 1).trim();
    switch (key) {
      case "uniqueid":
        params.uniqueId = value;
        break;
      case "prompt":
        params.prompt = value;
        break;
      case "model":
        params.model = value;
        break;
      case "negative":
        params.negative = value;
        break;
      case "autostart":
        params.autostart = value.toLowerCase() === "true";
        break;
    }
  }
  return params;
}
function encodeBase64(str) {
  return btoa(unescape(encodeURIComponent(str)));
}
function decodeBase64(str) {
  return decodeURIComponent(escape(atob(str)));
}
const LANGUAGE_MAP = {
  js: "javascript",
  ts: "typescript",
  jsx: "jsx",
  tsx: "tsx",
  vue: "vue",
  html: "html",
  css: "css",
  scss: "scss",
  json: "json",
  md: "markdown",
  markdown: "markdown",
  py: "python",
  python: "python",
  rb: "ruby",
  ruby: "ruby",
  go: "go",
  rust: "rust",
  rs: "rust",
  java: "java",
  c: "c",
  cpp: "cpp",
  "c++": "cpp",
  cs: "csharp",
  csharp: "csharp",
  php: "php",
  swift: "swift",
  kotlin: "kotlin",
  sql: "sql",
  sh: "bash",
  bash: "bash",
  shell: "bash",
  zsh: "bash",
  yaml: "yaml",
  yml: "yaml",
  xml: "xml",
  dockerfile: "dockerfile",
  docker: "dockerfile"
};
const codeCache = /* @__PURE__ */ new Map();
async function highlightCode(code, lang) {
  const cacheKey = `${lang}:${code}`;
  if (codeCache.has(cacheKey)) {
    return codeCache.get(cacheKey);
  }
  const language = LANGUAGE_MAP[lang.toLowerCase()] || "text";
  try {
    const html = await codeToHtml(code, {
      lang: language,
      themes: {
        light: "github-light",
        dark: "github-dark"
      }
    });
    codeCache.set(cacheKey, html);
    return html;
  } catch {
    const html = await codeToHtml(code, {
      lang: "text",
      themes: {
        light: "github-light",
        dark: "github-dark"
      }
    });
    codeCache.set(cacheKey, html);
    return html;
  }
}
function createMarkedInstance() {
  const marked2 = new Marked();
  marked2.use({
    renderer: {
      // 代码块 - 返回占位符，稍后替换为高亮代码或绘图组件
      code({ text, lang }) {
        const language = lang || "text";
        if (language === "mj-drawing") {
          const params = parseMjDrawingParams(text);
          return `<!--MJ_DRAWING:${encodeBase64(JSON.stringify(params))}-->`;
        }
        const placeholder = `<!--CODE_BLOCK:${language}:${encodeBase64(text)}-->`;
        return placeholder;
      },
      // 行内代码
      codespan({ text }) {
        return `<code class="px-1.5 py-0.5 rounded bg-(--ui-bg-elevated) text-sm font-mono">${text}</code>`;
      },
      // 链接
      link({ href, title, tokens }) {
        const titleAttr = title ? ` title="${title}"` : "";
        return `<a href="${href}"${titleAttr} target="_blank" rel="noopener noreferrer" class="text-(--ui-primary) hover:underline">${this.parser.parseInline(tokens)}</a>`;
      },
      // 段落
      paragraph({ tokens }) {
        return `<p class="mb-2 last:mb-0">${this.parser.parseInline(tokens)}</p>`;
      },
      // 列表
      list({ items, ordered }) {
        const tag = ordered ? "ol" : "ul";
        const listClass = ordered ? "list-decimal" : "list-disc";
        const body = items.map((item) => {
          const content = item.tokens ? this.parser.parse(item.tokens) : item.text;
          return `<li>${content}</li>`;
        }).join("");
        return `<${tag} class="${listClass} pl-5 mb-2 space-y-1">${body}</${tag}>`;
      },
      // 引用块
      blockquote({ tokens }) {
        return `<blockquote class="border-l-4 border-(--ui-border-accented) pl-4 py-1 my-2 text-(--ui-text-muted) italic">${this.parser.parse(tokens)}</blockquote>`;
      },
      // 标题
      heading({ tokens, depth }) {
        const sizes = {
          1: "text-xl font-bold",
          2: "text-lg font-bold",
          3: "text-base font-semibold",
          4: "text-sm font-semibold",
          5: "text-sm font-medium",
          6: "text-xs font-medium"
        };
        return `<h${depth} class="${sizes[depth]} mb-2">${this.parser.parseInline(tokens)}</h${depth}>`;
      },
      // 分隔线
      hr() {
        return '<hr class="my-4 border-(--ui-border)" />';
      },
      // 表格
      table({ header, rows }) {
        const headerCells = header.map((cell) => {
          const content = cell.tokens ? this.parser.parseInline(cell.tokens) : cell.text;
          return `<th class="px-3 py-2 text-left border border-(--ui-border) bg-(--ui-bg-elevated)">${content}</th>`;
        }).join("");
        const bodyRows = rows.map((row) => {
          const cells = row.map((cell) => {
            const content = cell.tokens ? this.parser.parseInline(cell.tokens) : cell.text;
            return `<td class="px-3 py-2 border border-(--ui-border)">${content}</td>`;
          }).join("");
          return `<tr>${cells}</tr>`;
        }).join("");
        return `<div class="overflow-x-auto my-2"><table class="min-w-full border-collapse text-sm"><thead><tr>${headerCells}</tr></thead><tbody>${bodyRows}</tbody></table></div>`;
      },
      // 加粗
      strong({ tokens }) {
        return `<strong class="font-semibold">${this.parser.parseInline(tokens)}</strong>`;
      },
      // 斜体
      em({ tokens }) {
        return `<em class="italic">${this.parser.parseInline(tokens)}</em>`;
      },
      // 删除线
      del({ tokens }) {
        return `<del class="line-through text-(--ui-text-muted)">${this.parser.parseInline(tokens)}</del>`;
      }
    }
  });
  return marked2;
}
const marked = createMarkedInstance();
async function replaceCodeBlocks(html) {
  const codeBlockRegex = /<!--CODE_BLOCK:([^:]+):([^-]+)-->/g;
  const matches = [...html.matchAll(codeBlockRegex)];
  if (matches.length === 0) return html;
  const replacements = await Promise.all(
    matches.map(async (match) => {
      const [fullMatch, lang, base64Code] = match;
      const code = decodeBase64(base64Code);
      const highlighted = await highlightCode(code, lang);
      return {
        original: fullMatch,
        replacement: `<div class="my-2 rounded-lg overflow-hidden text-sm [&>pre]:p-4 [&>pre]:overflow-x-auto">${highlighted}</div>`
      };
    })
  );
  let result = html;
  for (const { original, replacement } of replacements) {
    result = result.replace(original, replacement);
  }
  return result;
}
function replaceMjDrawingBlocks(html) {
  const mjDrawingRegex = /<!--MJ_DRAWING:([^-]+)-->/g;
  return html.replace(mjDrawingRegex, (_, base64Data) => {
    return `<div class="mj-drawing-block" data-mj-drawing="${base64Data}"></div>`;
  });
}
function hasUnclosedMjDrawingBlock(content) {
  const openPattern = /```mj-drawing\s*\n/g;
  const completePattern = /```mj-drawing\s*\n[\s\S]*?\n```/g;
  const openMatches = content.match(openPattern) || [];
  const completeMatches = content.match(completePattern) || [];
  return openMatches.length > completeMatches.length;
}
function handleUnclosedMjDrawingBlock(content) {
  if (!hasUnclosedMjDrawingBlock(content)) {
    return content;
  }
  const lastOpenIndex = content.lastIndexOf("```mj-drawing");
  if (lastOpenIndex === -1) return content;
  const beforeBlock = content.slice(0, lastOpenIndex);
  content.slice(lastOpenIndex);
  return beforeBlock + "\n\n*正在生成插图参数...*\n\n";
}
async function renderMarkdown(content) {
  if (!content) return "";
  let cleanContent = content.replace(/[\u200B\u200C\u200D\uFEFF]/g, "");
  cleanContent = handleUnclosedMjDrawingBlock(cleanContent);
  const html = await marked.parse(cleanContent);
  const withCodeBlocks = await replaceCodeBlocks(html);
  return replaceMjDrawingBlocks(withCodeBlocks);
}
function useConversationSuggestions() {
  const { getAuthHeader } = useAuth();
  const suggestionsMap = useState("conversation-suggestions", () => ({}));
  const loadingMap = useState("conversation-suggestions-loading", () => ({}));
  function getSuggestions(assistantId) {
    return suggestionsMap.value[assistantId] || [];
  }
  function isLoading(assistantId) {
    return loadingMap.value[assistantId] || false;
  }
  async function loadSuggestions(assistantId, refresh = false) {
    if (!refresh && suggestionsMap.value[assistantId]?.length) {
      return;
    }
    if (loadingMap.value[assistantId]) {
      return;
    }
    loadingMap.value[assistantId] = true;
    try {
      const response = await $fetch(
        `/api/assistants/${assistantId}/suggestions`,
        {
          method: "POST",
          headers: getAuthHeader(),
          body: { refresh }
        }
      );
      suggestionsMap.value[assistantId] = response.suggestions;
    } catch (error) {
      console.error("加载开场白建议失败:", error);
    } finally {
      loadingMap.value[assistantId] = false;
    }
  }
  async function refreshSuggestions(assistantId) {
    await loadSuggestions(assistantId, true);
  }
  return {
    getSuggestions,
    isLoading,
    loadSuggestions,
    refreshSuggestions
  };
}
const _sfc_main$6 = /* @__PURE__ */ vueExports.defineComponent({
  __name: "MessageList",
  __ssrInlineRender: true,
  props: {
    messages: {},
    isStreaming: { type: Boolean },
    assistantId: {},
    estimatedTime: {}
  },
  emits: ["delete", "replay", "edit", "fork", "deleteUntil", "stop", "sendSuggestion"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const { getSuggestions, isLoading: isSuggestionsLoading, loadSuggestions } = useConversationSuggestions();
    const suggestions = vueExports.computed(() => {
      if (!props.assistantId) return [];
      return getSuggestions(props.assistantId);
    });
    const suggestionsLoading = vueExports.computed(() => {
      if (!props.assistantId) return false;
      return isSuggestionsLoading(props.assistantId);
    });
    const showSuggestions = vueExports.computed(() => {
      return props.messages.length === 0 && props.assistantId;
    });
    vueExports.watch(() => props.assistantId, (id) => {
      if (id && props.messages.length === 0) {
        loadSuggestions(id);
      }
    }, { immediate: true });
    const messagesContainer = vueExports.ref();
    const showImagePreview = vueExports.ref(false);
    const previewImageUrl = vueExports.ref("");
    function isImageMimeType(mimeType) {
      return mimeType.startsWith("image/");
    }
    function getFileIcon(mimeType) {
      if (mimeType.startsWith("image/")) return "i-heroicons-photo";
      if (mimeType.startsWith("video/")) return "i-heroicons-video-camera";
      if (mimeType.startsWith("audio/")) return "i-heroicons-musical-note";
      if (mimeType.includes("pdf")) return "i-heroicons-document-text";
      if (mimeType.includes("word") || mimeType.includes("document")) return "i-heroicons-document";
      if (mimeType.includes("sheet") || mimeType.includes("excel")) return "i-heroicons-table-cells";
      if (mimeType.includes("presentation") || mimeType.includes("powerpoint")) return "i-heroicons-presentation-chart-bar";
      if (mimeType.includes("zip") || mimeType.includes("rar") || mimeType.includes("7z")) return "i-heroicons-archive-box";
      return "i-heroicons-document";
    }
    function formatFileSize(bytes) {
      if (bytes < 1024) return `${bytes} B`;
      if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
      return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
    }
    function getFileUrl(fileName) {
      return `/api/files/${fileName}`;
    }
    const isAtBottom = vueExports.ref(true);
    const renderedMessages = vueExports.ref(/* @__PURE__ */ new Map());
    const renderingIds = vueExports.ref(/* @__PURE__ */ new Set());
    function forceScrollToBottom() {
      isAtBottom.value = true;
      vueExports.nextTick(() => {
        if (messagesContainer.value) {
          messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
        }
      });
    }
    function scrollToCompressRequest() {
      const compressRequestIndex = props.messages.findIndex((m) => m.mark === "compress-request");
      if (compressRequestIndex < 0 || !messagesContainer.value) return;
      vueExports.nextTick(() => {
        const messageElements = messagesContainer.value?.querySelectorAll("[data-message-id]");
        if (messageElements && messageElements[compressRequestIndex]) {
          messageElements[compressRequestIndex].scrollIntoView({ behavior: "smooth", block: "center" });
        }
      });
    }
    __expose({ scrollToBottom: forceScrollToBottom, scrollToCompressRequest });
    const lastRenderedLength = /* @__PURE__ */ new Map();
    const streamingRenderTimer = vueExports.ref(null);
    async function renderMessage(message, force = false) {
      if (!force && renderingIds.value.has(message.id)) return;
      const lastLength = lastRenderedLength.get(message.id) || 0;
      const currentLength = message.content?.length || 0;
      if (!force && lastLength === currentLength && renderedMessages.value.has(message.id)) {
        return;
      }
      renderingIds.value.add(message.id);
      try {
        const html = await renderMarkdown(message.content);
        renderedMessages.value.set(message.id, html);
        lastRenderedLength.set(message.id, currentLength);
      } finally {
        renderingIds.value.delete(message.id);
      }
    }
    function startStreamingRender() {
      if (streamingRenderTimer.value) return;
      streamingRenderTimer.value = setInterval();
    }
    function stopStreamingRender() {
      if (streamingRenderTimer.value) {
        clearInterval(streamingRenderTimer.value);
        streamingRenderTimer.value = null;
      }
    }
    function getRenderedContent(message) {
      return renderedMessages.value.get(message.id) || message.content;
    }
    function isMessageLoading(message) {
      return message.role === "assistant" && (message.status === "created" || message.status === "pending") && !message.content;
    }
    function isMessageStreaming(message) {
      return message.role === "assistant" && message.status === "streaming";
    }
    function isMessageStopped(message) {
      return message.role === "assistant" && message.status === "stopped";
    }
    const now = vueExports.ref(Date.now());
    let countdownTimer = null;
    const loadingMessageCreatedAt = vueExports.ref(null);
    const loadingMessage = vueExports.computed(() => {
      return props.messages.find((m) => isMessageLoading(m));
    });
    const estimatedSeconds = vueExports.computed(() => {
      return props.estimatedTime ?? DEFAULT_CHAT_FALLBACK_ESTIMATED_TIME;
    });
    const elapsedTime = vueExports.computed(() => {
      if (!loadingMessageCreatedAt.value) return 0;
      return (now.value - loadingMessageCreatedAt.value) / 1e3;
    });
    const remainingTime = vueExports.computed(() => {
      if (!loadingMessageCreatedAt.value) return null;
      const remaining = estimatedSeconds.value - elapsedTime.value;
      return remaining > 0 ? remaining.toFixed(2) : null;
    });
    const isOvertime = vueExports.computed(() => {
      if (!loadingMessageCreatedAt.value) return false;
      return elapsedTime.value > estimatedSeconds.value;
    });
    const overtimeDisplay = vueExports.computed(() => {
      if (!isOvertime.value) return null;
      return (elapsedTime.value - estimatedSeconds.value).toFixed(2);
    });
    vueExports.watch(loadingMessage, (newMsg, oldMsg) => {
      if (newMsg && !oldMsg) {
        loadingMessageCreatedAt.value = Date.now();
        now.value = Date.now();
        countdownTimer = setInterval();
      } else if (!newMsg && oldMsg) {
        if (countdownTimer) {
          clearInterval(countdownTimer);
          countdownTimer = null;
        }
        loadingMessageCreatedAt.value = null;
      }
    }, { immediate: true });
    function shouldShowRaw(message) {
      if (message.status === "streaming" && message.content) {
        return false;
      }
      if (!renderedMessages.value.has(message.id)) {
        return true;
      }
      return false;
    }
    vueExports.watch(() => props.messages.length, (newLen, oldLen) => {
      if (newLen > oldLen) {
        forceScrollToBottom();
      }
    });
    vueExports.watch(
      () => props.messages,
      async (newMessages, oldMessages) => {
        if (newMessages !== oldMessages) {
          renderedMessages.value.clear();
          lastRenderedLength.clear();
        }
        for (const msg of props.messages) {
          if (msg.content) {
            await renderMessage(msg);
          }
        }
      },
      { immediate: true }
    );
    vueExports.watch(
      () => props.isStreaming,
      async (streaming, prevStreaming) => {
        if (streaming) {
          startStreamingRender();
        } else {
          stopStreamingRender();
          if (prevStreaming) {
            for (const msg of props.messages) {
              if (msg.content) {
                await renderMessage(msg, true);
              }
            }
          }
        }
      },
      { immediate: true }
    );
    async function copyMessage(content) {
      try {
        await (void 0).clipboard.writeText(content);
      } catch (e) {
        console.error("复制失败:", e);
      }
    }
    const deleteConfirmId = vueExports.ref(null);
    const showDeleteConfirm = vueExports.ref(false);
    const activeMessageId = vueExports.ref(null);
    function isMessageActive(id) {
      return activeMessageId.value === id;
    }
    const expandedCompressResponses = vueExports.ref(/* @__PURE__ */ new Set());
    function isCompressResponseExpanded(message) {
      if (props.isStreaming && message.mark === "compress-response") {
        const compressResponseIndex = props.messages.findIndex((m) => m.mark === "compress-response");
        if (compressResponseIndex >= 0 && props.messages[compressResponseIndex].id === message.id) {
          return true;
        }
      }
      return expandedCompressResponses.value.has(message.id);
    }
    function confirmDelete() {
      if (deleteConfirmId.value) {
        emit("delete", deleteConfirmId.value);
      }
      showDeleteConfirm.value = false;
      deleteConfirmId.value = null;
    }
    function cancelDelete() {
      showDeleteConfirm.value = false;
      deleteConfirmId.value = null;
    }
    const deleteUntilConfirmId = vueExports.ref(null);
    const showDeleteUntilConfirm = vueExports.ref(false);
    const deleteUntilCount = vueExports.ref(0);
    function handleDeleteUntil(id) {
      const targetIndex = props.messages.findIndex((m) => m.id === id);
      if (targetIndex < 0) return;
      deleteUntilConfirmId.value = id;
      deleteUntilCount.value = targetIndex + 1;
      showDeleteUntilConfirm.value = true;
    }
    function confirmDeleteUntil() {
      if (deleteUntilConfirmId.value) {
        emit("deleteUntil", deleteUntilConfirmId.value);
      }
      showDeleteUntilConfirm.value = false;
      deleteUntilConfirmId.value = null;
      deleteUntilCount.value = 0;
    }
    function cancelDeleteUntil() {
      showDeleteUntilConfirm.value = false;
      deleteUntilConfirmId.value = null;
      deleteUntilCount.value = 0;
    }
    function getMessageSize(message) {
      let size = new TextEncoder().encode(message.content).length;
      if (message.files?.length) {
        for (const file of message.files) {
          if (file.mimeType.startsWith("image/")) {
            size += Math.ceil(file.size * 4 / 3);
          }
        }
      }
      return size;
    }
    function formatSize(size) {
      if (size < 1024) return `${size} B`;
      if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
      return `${(size / 1024 / 1024).toFixed(1)} MB`;
    }
    function getMessageMenuItems(message) {
      const items = [];
      const infoItems = [];
      if (message.modelName) {
        infoItems.push({
          label: message.modelName,
          icon: "i-heroicons-cpu-chip",
          disabled: true
        });
      }
      infoItems.push({
        label: formatSize(getMessageSize(message)),
        icon: "i-heroicons-document-text",
        disabled: true
      });
      items.push(infoItems);
      items.push([
        {
          label: "复制",
          icon: "i-heroicons-clipboard",
          onSelect: () => copyMessage(message.content)
        },
        {
          label: "分叉对话",
          icon: "i-lucide-split",
          onSelect: () => emit("fork", message.id)
        },
        {
          label: "删除此消息及以上",
          icon: "i-heroicons-fire",
          onSelect: () => handleDeleteUntil(message.id)
        }
      ]);
      return items;
    }
    const editingId = vueExports.ref(null);
    const editingContent = vueExports.ref("");
    function isEditing(messageId) {
      return editingId.value === messageId;
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = _sfc_main$d;
      const _component_ChatMarkdownContent = __nuxt_component_1;
      const _component_TimeAgo = __nuxt_component_3$1;
      const _component_UDropdownMenu = _sfc_main$b;
      const _component_UButton = _sfc_main$8$1;
      const _component_UModal = _sfc_main$c;
      _push(`<div${serverRenderer_cjs_prodExports.ssrRenderAttrs(vueExports.mergeProps({
        ref_key: "messagesContainer",
        ref: messagesContainer,
        class: "flex-1 overflow-y-auto p-4 space-y-4"
      }, _attrs))} data-v-3f657e47>`);
      if (vueExports.unref(showSuggestions)) {
        _push(`<div class="h-full flex items-center justify-center" data-v-3f657e47><div class="text-center max-w-md px-4" data-v-3f657e47>`);
        if (vueExports.unref(suggestionsLoading)) {
          _push(`<!--[--><div class="flex items-center justify-center gap-1 mb-2" data-v-3f657e47><span class="loading-dot w-2 h-2 rounded-full bg-(--ui-text-muted)" style="${serverRenderer_cjs_prodExports.ssrRenderStyle({ "animation-delay": "0s" })}" data-v-3f657e47></span><span class="loading-dot w-2 h-2 rounded-full bg-(--ui-text-muted)" style="${serverRenderer_cjs_prodExports.ssrRenderStyle({ "animation-delay": "0.2s" })}" data-v-3f657e47></span><span class="loading-dot w-2 h-2 rounded-full bg-(--ui-text-muted)" style="${serverRenderer_cjs_prodExports.ssrRenderStyle({ "animation-delay": "0.4s" })}" data-v-3f657e47></span></div><p class="text-sm text-(--ui-text-muted)" data-v-3f657e47>正在生成开场白...</p><!--]-->`);
        } else if (vueExports.unref(suggestions).length > 0) {
          _push(`<!--[-->`);
          _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UIcon, {
            name: "i-heroicons-light-bulb",
            class: "w-8 h-8 mx-auto mb-3 text-(--ui-text-muted) opacity-60"
          }, null, _parent));
          _push(`<p class="text-sm text-(--ui-text-muted) mb-4" data-v-3f657e47>试试这些话题开始对话</p><div class="space-y-2" data-v-3f657e47><!--[-->`);
          serverRenderer_cjs_prodExports.ssrRenderList(vueExports.unref(suggestions), (suggestion, idx) => {
            _push(`<button class="w-full px-4 py-2.5 text-sm text-left rounded-lg bg-(--ui-bg-elevated) hover:bg-(--ui-bg-accented) border border-(--ui-border) transition-colors" data-v-3f657e47>${serverRenderer_cjs_prodExports.ssrInterpolate(suggestion)}</button>`);
          });
          _push(`<!--]--></div><button class="mt-4 text-xs text-(--ui-text-muted) hover:text-(--ui-text) flex items-center gap-1 mx-auto transition-colors" data-v-3f657e47>`);
          _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UIcon, {
            name: "i-heroicons-arrow-path",
            class: "w-3 h-3"
          }, null, _parent));
          _push(` 换一批 </button><!--]-->`);
        } else {
          _push(`<!--[-->`);
          _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UIcon, {
            name: "i-heroicons-chat-bubble-left-right",
            class: "w-12 h-12 mx-auto mb-2 text-(--ui-text-muted) opacity-50"
          }, null, _parent));
          _push(`<p class="text-(--ui-text-muted)" data-v-3f657e47>开始新对话</p><!--]-->`);
        }
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!--[-->`);
      serverRenderer_cjs_prodExports.ssrRenderList(__props.messages, (message, index) => {
        _push(`<!--[-->`);
        if (message.mark === "compress-request") {
          _push(`<div class="flex items-center gap-4 py-4" data-v-3f657e47><div class="flex-1 h-px bg-(--ui-border)" data-v-3f657e47></div><span class="text-xs text-(--ui-text-muted) flex items-center gap-1" data-v-3f657e47>`);
          _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UIcon, {
            name: "i-heroicons-archive-box",
            class: "w-3 h-3"
          }, null, _parent));
          _push(` 以上内容已压缩 </span><div class="flex-1 h-px bg-(--ui-border)" data-v-3f657e47></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="${serverRenderer_cjs_prodExports.ssrRenderClass([message.role === "user" ? "flex-row-reverse" : "", "flex gap-3"])}"${serverRenderer_cjs_prodExports.ssrRenderAttr("data-message-id", message.id)} data-v-3f657e47><div class="${serverRenderer_cjs_prodExports.ssrRenderClass([[
          message.mark === "compress-request" ? "bg-blue-500" : message.role === "user" ? "bg-(--ui-primary)" : "bg-(--ui-bg-elevated)"
        ], "hidden md:flex w-8 h-8 rounded-full items-center justify-center flex-shrink-0"])}" data-v-3f657e47>`);
        _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UIcon, {
          name: message.mark === "compress-request" ? "i-heroicons-archive-box-arrow-down" : message.role === "user" ? "i-heroicons-user" : "i-heroicons-sparkles",
          class: ["w-4 h-4", [
            message.mark === "compress-request" ? "text-white" : message.role === "user" ? "text-white" : "text-(--ui-primary)"
          ]]
        }, null, _parent));
        _push(`</div><div class="${serverRenderer_cjs_prodExports.ssrRenderClass([[
          isEditing(message.id) ? "w-full md:w-[85%]" : "max-w-full md:max-w-[85%]",
          message.role === "user" ? "flex flex-col items-end" : ""
        ], "group min-w-0"])}" data-v-3f657e47><div class="${serverRenderer_cjs_prodExports.ssrRenderClass([
          "px-4 py-2 rounded-2xl max-w-full overflow-hidden cursor-pointer md:cursor-auto",
          isEditing(message.id) ? "block" : "inline-block",
          message.role === "user" && message.mark !== "compress-request" ? "bg-(--ui-primary) text-white rounded-tr-sm" : message.mark === "error" ? "bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 rounded-tl-sm" : message.mark === "compress-request" ? "bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-tl-sm" : message.mark === "compress-response" ? "bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-tl-sm" : "bg-(--ui-bg-elevated) rounded-tl-sm"
        ])}" data-v-3f657e47>`);
        if (message.mark === "compress-request") {
          _push(`<div class="text-sm" data-v-3f657e47><div class="flex items-center gap-2 text-blue-600 dark:text-blue-400" data-v-3f657e47>`);
          _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UIcon, {
            name: "i-heroicons-archive-box-arrow-down",
            class: "w-4 h-4"
          }, null, _parent));
          _push(`<span class="font-medium" data-v-3f657e47>压缩请求</span></div></div>`);
        } else if (message.mark === "compress-response") {
          _push(`<div class="text-sm" data-v-3f657e47><button class="flex items-center gap-2 text-amber-600 dark:text-amber-400 hover:opacity-80 transition-opacity w-full" data-v-3f657e47>`);
          _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UIcon, {
            name: isCompressResponseExpanded(message) ? "i-heroicons-chevron-down" : "i-heroicons-chevron-right",
            class: "w-4 h-4"
          }, null, _parent));
          _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UIcon, {
            name: "i-heroicons-document-text",
            class: "w-4 h-4"
          }, null, _parent));
          _push(`<span class="font-medium" data-v-3f657e47>对话摘要</span>`);
          if (!isCompressResponseExpanded(message)) {
            _push(`<span class="text-xs opacity-60" data-v-3f657e47>点击展开</span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</button>`);
          if (isCompressResponseExpanded(message)) {
            _push(`<div class="mt-2 text-(--ui-text)" data-v-3f657e47>`);
            if (!shouldShowRaw(message)) {
              _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_ChatMarkdownContent, {
                html: getRenderedContent(message)
              }, null, _parent));
            } else {
              _push(`<span class="whitespace-pre-wrap break-words" data-v-3f657e47>${serverRenderer_cjs_prodExports.ssrInterpolate(message.content)}</span>`);
            }
            _push(`</div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        } else if (message.role === "user") {
          _push(`<div class="text-sm user-message-content" data-v-3f657e47>`);
          if (message.files?.length) {
            _push(`<div class="flex flex-wrap gap-2 mb-2" data-v-3f657e47><!--[-->`);
            serverRenderer_cjs_prodExports.ssrRenderList(message.files, (file) => {
              _push(`<!--[-->`);
              if (isImageMimeType(file.mimeType)) {
                _push(`<div class="w-20 h-20 rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition-opacity" data-v-3f657e47><img${serverRenderer_cjs_prodExports.ssrRenderAttr("src", getFileUrl(file.fileName))}${serverRenderer_cjs_prodExports.ssrRenderAttr("alt", file.name)} class="w-full h-full object-cover" data-v-3f657e47></div>`);
              } else {
                _push(`<a${serverRenderer_cjs_prodExports.ssrRenderAttr("href", getFileUrl(file.fileName))} target="_blank" class="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors" data-v-3f657e47>`);
                _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UIcon, {
                  name: getFileIcon(file.mimeType),
                  class: "w-5 h-5"
                }, null, _parent));
                _push(`<div class="text-left" data-v-3f657e47><div class="text-xs font-medium truncate max-w-[120px]" data-v-3f657e47>${serverRenderer_cjs_prodExports.ssrInterpolate(file.name)}</div><div class="text-[10px] opacity-70" data-v-3f657e47>${serverRenderer_cjs_prodExports.ssrInterpolate(formatFileSize(file.size))}</div></div></a>`);
              }
              _push(`<!--]-->`);
            });
            _push(`<!--]--></div>`);
          } else {
            _push(`<!---->`);
          }
          if (isEditing(message.id)) {
            _push(`<!--[--><textarea class="w-full bg-transparent text-white resize-none outline-none whitespace-pre-wrap field-sizing-content" data-v-3f657e47>${serverRenderer_cjs_prodExports.ssrInterpolate(vueExports.unref(editingContent))}</textarea><div class="flex justify-end gap-2 mt-2 text-white/80" data-v-3f657e47><button class="px-2 py-0.5 text-xs hover:text-white" data-v-3f657e47> 取消 </button><button class="px-2 py-0.5 text-xs hover:text-white" data-v-3f657e47> 保存 </button></div><!--]-->`);
          } else if (message.content) {
            _push(`<!--[-->`);
            if (!shouldShowRaw(message)) {
              _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_ChatMarkdownContent, {
                html: getRenderedContent(message)
              }, null, _parent));
            } else {
              _push(`<span class="whitespace-pre-wrap break-words" data-v-3f657e47>${serverRenderer_cjs_prodExports.ssrInterpolate(message.content)}</span>`);
            }
            _push(`<!--]-->`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        } else if (message.mark === "error") {
          _push(`<div class="text-sm flex items-start gap-2" data-v-3f657e47>`);
          _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UIcon, {
            name: "i-heroicons-exclamation-circle",
            class: "w-4 h-4 flex-shrink-0 mt-0.5"
          }, null, _parent));
          _push(`<span class="whitespace-pre-wrap break-words" data-v-3f657e47>${serverRenderer_cjs_prodExports.ssrInterpolate(message.content)}</span></div>`);
        } else {
          _push(`<div class="text-sm" data-v-3f657e47>`);
          if (isEditing(message.id)) {
            _push(`<!--[--><textarea class="w-full bg-transparent text-(--ui-text) resize-none outline-none whitespace-pre-wrap field-sizing-content" data-v-3f657e47>${serverRenderer_cjs_prodExports.ssrInterpolate(vueExports.unref(editingContent))}</textarea><div class="flex justify-end gap-2 mt-2 text-(--ui-text-muted)" data-v-3f657e47><button class="px-2 py-0.5 text-xs hover:text-(--ui-text)" data-v-3f657e47> 取消 </button><button class="px-2 py-0.5 text-xs hover:text-(--ui-text)" data-v-3f657e47> 保存 </button></div><!--]-->`);
          } else if (isMessageLoading(message)) {
            _push(`<div class="flex items-center gap-1" data-v-3f657e47><span class="loading-dot w-2 h-2 rounded-full bg-current opacity-60" style="${serverRenderer_cjs_prodExports.ssrRenderStyle({ "animation-delay": "0s" })}" data-v-3f657e47></span><span class="loading-dot w-2 h-2 rounded-full bg-current opacity-60" style="${serverRenderer_cjs_prodExports.ssrRenderStyle({ "animation-delay": "0.2s" })}" data-v-3f657e47></span><span class="loading-dot w-2 h-2 rounded-full bg-current opacity-60" style="${serverRenderer_cjs_prodExports.ssrRenderStyle({ "animation-delay": "0.4s" })}" data-v-3f657e47></span>`);
            if (vueExports.unref(remainingTime)) {
              _push(`<span class="ml-1 text-xs text-(--ui-text-muted) tabular-nums" data-v-3f657e47>${serverRenderer_cjs_prodExports.ssrInterpolate(vueExports.unref(remainingTime))}s</span>`);
            } else if (vueExports.unref(isOvertime)) {
              _push(`<span class="ml-1 text-xs text-(--ui-text-muted) tabular-nums" data-v-3f657e47>+${serverRenderer_cjs_prodExports.ssrInterpolate(vueExports.unref(overtimeDisplay))}s</span>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</div>`);
          } else if (!shouldShowRaw(message)) {
            _push(`<!--[-->`);
            _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_ChatMarkdownContent, {
              html: getRenderedContent(message)
            }, null, _parent));
            if (isMessageStreaming(message)) {
              _push(`<span class="inline-block w-2 h-4 bg-current animate-pulse align-middle" data-v-3f657e47></span>`);
            } else {
              _push(`<!---->`);
            }
            _push(`<!--]-->`);
          } else {
            _push(`<!--[--><span class="whitespace-pre-wrap break-words" data-v-3f657e47>${serverRenderer_cjs_prodExports.ssrInterpolate(message.content)}</span>`);
            if (isMessageStreaming(message)) {
              _push(`<span class="inline-block w-2 h-4 bg-current animate-pulse ml-0.5" data-v-3f657e47></span>`);
            } else {
              _push(`<!---->`);
            }
            _push(`<!--]-->`);
          }
          if (isMessageStopped(message) && message.content && !isEditing(message.id)) {
            _push(`<div class="mt-2 text-xs text-(--ui-text-muted) flex items-center gap-1" data-v-3f657e47>`);
            _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-stop-circle",
              class: "w-3 h-3"
            }, null, _parent));
            _push(`<span data-v-3f657e47>已中断</span></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        }
        _push(`</div>`);
        if (!isMessageStreaming(message) && !isMessageLoading(message)) {
          _push(`<div class="${serverRenderer_cjs_prodExports.ssrRenderClass([
            "mt-1 text-xs text-(--ui-text-dimmed) flex items-center gap-2 transition-opacity",
            isMessageActive(message.id) ? "opacity-100" : "opacity-0 md:group-hover:opacity-100"
          ])}" data-v-3f657e47>`);
          _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_TimeAgo, {
            time: message.createdAt
          }, null, _parent));
          if (!__props.isStreaming && message.mark !== "compress-request" && message.mark !== "compress-response") {
            _push(`<button class="p-1 hover:bg-(--ui-bg-elevated) rounded" title="编辑" data-v-3f657e47>`);
            _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-pencil",
              class: "w-3 h-3"
            }, null, _parent));
            _push(`</button>`);
          } else {
            _push(`<!---->`);
          }
          if (!__props.isStreaming) {
            _push(`<button class="p-1 hover:bg-(--ui-bg-elevated) rounded"${serverRenderer_cjs_prodExports.ssrRenderAttr("title", message.role === "user" ? "重新发送" : "重新生成")} data-v-3f657e47>`);
            _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-arrow-path",
              class: "w-3 h-3"
            }, null, _parent));
            _push(`</button>`);
          } else {
            _push(`<!---->`);
          }
          if (!__props.isStreaming) {
            _push(`<button class="p-1 hover:bg-(--ui-bg-elevated) rounded" title="删除" data-v-3f657e47>`);
            _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-trash",
              class: "w-3 h-3"
            }, null, _parent));
            _push(`</button>`);
          } else {
            _push(`<!---->`);
          }
          if (!__props.isStreaming && message.mark !== "compress-request" && message.mark !== "compress-response") {
            _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UDropdownMenu, {
              items: getMessageMenuItems(message),
              "onUpdate:open": (open) => activeMessageId.value = open ? message.id : null
            }, {
              default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UButton, {
                    variant: "ghost",
                    size: "xs",
                    title: "更多操作"
                  }, {
                    default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                      if (_push3) {
                        _push3(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UIcon, {
                          name: "i-heroicons-ellipsis-vertical",
                          class: "w-3 h-3"
                        }, null, _parent3, _scopeId2));
                      } else {
                        return [
                          vueExports.createVNode(_component_UIcon, {
                            name: "i-heroicons-ellipsis-vertical",
                            class: "w-3 h-3"
                          })
                        ];
                      }
                    }),
                    _: 2
                  }, _parent2, _scopeId));
                } else {
                  return [
                    vueExports.createVNode(_component_UButton, {
                      variant: "ghost",
                      size: "xs",
                      title: "更多操作"
                    }, {
                      default: vueExports.withCtx(() => [
                        vueExports.createVNode(_component_UIcon, {
                          name: "i-heroicons-ellipsis-vertical",
                          class: "w-3 h-3"
                        })
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 2
            }, _parent));
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div><!--]-->`);
      });
      _push(`<!--]-->`);
      _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UModal, {
        open: vueExports.unref(showDeleteConfirm),
        "onUpdate:open": ($event) => vueExports.isRef(showDeleteConfirm) ? showDeleteConfirm.value = $event : null,
        title: "确认删除",
        description: "确定要删除这条消息吗？",
        close: false
      }, {
        footer: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex justify-end gap-3" data-v-3f657e47${_scopeId}>`);
            _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UButton, {
              color: "error",
              onClick: confirmDelete
            }, {
              default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`删除`);
                } else {
                  return [
                    vueExports.createTextVNode("删除")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UButton, {
              variant: "outline",
              color: "neutral",
              onClick: cancelDelete
            }, {
              default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`取消`);
                } else {
                  return [
                    vueExports.createTextVNode("取消")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              vueExports.createVNode("div", { class: "flex justify-end gap-3" }, [
                vueExports.createVNode(_component_UButton, {
                  color: "error",
                  onClick: confirmDelete
                }, {
                  default: vueExports.withCtx(() => [
                    vueExports.createTextVNode("删除")
                  ]),
                  _: 1
                }),
                vueExports.createVNode(_component_UButton, {
                  variant: "outline",
                  color: "neutral",
                  onClick: cancelDelete
                }, {
                  default: vueExports.withCtx(() => [
                    vueExports.createTextVNode("取消")
                  ]),
                  _: 1
                })
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UModal, {
        open: vueExports.unref(showDeleteUntilConfirm),
        "onUpdate:open": ($event) => vueExports.isRef(showDeleteUntilConfirm) ? showDeleteUntilConfirm.value = $event : null,
        title: "确认删除",
        close: false
      }, {
        body: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<p class="text-(--ui-text-muted)" data-v-3f657e47${_scopeId}> 确定要删除此消息及之前的共 <span class="font-medium text-(--ui-text)" data-v-3f657e47${_scopeId}>${serverRenderer_cjs_prodExports.ssrInterpolate(vueExports.unref(deleteUntilCount))}</span> 条消息吗？此操作不可撤销。 </p>`);
          } else {
            return [
              vueExports.createVNode("p", { class: "text-(--ui-text-muted)" }, [
                vueExports.createTextVNode(" 确定要删除此消息及之前的共 "),
                vueExports.createVNode("span", { class: "font-medium text-(--ui-text)" }, vueExports.toDisplayString(vueExports.unref(deleteUntilCount)), 1),
                vueExports.createTextVNode(" 条消息吗？此操作不可撤销。 ")
              ])
            ];
          }
        }),
        footer: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex justify-end gap-3" data-v-3f657e47${_scopeId}>`);
            _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UButton, {
              color: "error",
              onClick: confirmDeleteUntil
            }, {
              default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`删除`);
                } else {
                  return [
                    vueExports.createTextVNode("删除")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UButton, {
              variant: "outline",
              color: "neutral",
              onClick: cancelDeleteUntil
            }, {
              default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`取消`);
                } else {
                  return [
                    vueExports.createTextVNode("取消")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              vueExports.createVNode("div", { class: "flex justify-end gap-3" }, [
                vueExports.createVNode(_component_UButton, {
                  color: "error",
                  onClick: confirmDeleteUntil
                }, {
                  default: vueExports.withCtx(() => [
                    vueExports.createTextVNode("删除")
                  ]),
                  _: 1
                }),
                vueExports.createVNode(_component_UButton, {
                  variant: "outline",
                  color: "neutral",
                  onClick: cancelDeleteUntil
                }, {
                  default: vueExports.withCtx(() => [
                    vueExports.createTextVNode("取消")
                  ]),
                  _: 1
                })
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UModal, {
        open: vueExports.unref(showImagePreview),
        "onUpdate:open": ($event) => vueExports.isRef(showImagePreview) ? showImagePreview.value = $event : null,
        ui: { content: "sm:max-w-4xl" }
      }, {
        content: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="relative bg-(--ui-bg) flex items-center justify-center" data-v-3f657e47${_scopeId}><img${serverRenderer_cjs_prodExports.ssrRenderAttr("src", vueExports.unref(previewImageUrl))} class="max-h-[85vh] object-contain" data-v-3f657e47${_scopeId}></div>`);
          } else {
            return [
              vueExports.createVNode("div", { class: "relative bg-(--ui-bg) flex items-center justify-center" }, [
                vueExports.createVNode("img", {
                  src: vueExports.unref(previewImageUrl),
                  class: "max-h-[85vh] object-contain"
                }, null, 8, ["src"])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = vueExports.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/chat/MessageList.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const __nuxt_component_3 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$6, [["__scopeId", "data-v-3f657e47"]]), { __name: "ChatMessageList" });
const theme = {
  "base": "relative",
  "variants": {
    "size": {
      "xs": "",
      "sm": "",
      "md": "",
      "lg": "",
      "xl": ""
    },
    "orientation": {
      "horizontal": "inline-flex -space-x-px",
      "vertical": "flex flex-col -space-y-px"
    }
  }
};
const _sfc_main$5 = {
  __name: "UFieldGroup",
  __ssrInlineRender: true,
  props: {
    as: { type: null, required: false },
    size: { type: null, required: false },
    orientation: { type: null, required: false, default: "horizontal" },
    class: { type: null, required: false },
    ui: { type: null, required: false }
  },
  setup(__props) {
    const props = __props;
    const appConfig = useAppConfig();
    const ui = vueExports.computed(() => tv({ extend: tv(theme), ...appConfig.ui?.fieldGroup || {} }));
    vueExports.provide(fieldGroupInjectionKey, vueExports.computed(() => ({
      orientation: props.orientation,
      size: props.size
    })));
    return (_ctx, _push, _parent, _attrs) => {
      _push(serverRenderer_cjs_prodExports.ssrRenderComponent(vueExports.unref(Primitive), vueExports.mergeProps({
        as: __props.as,
        "data-orientation": __props.orientation,
        class: ui.value({ orientation: __props.orientation, class: props.class })
      }, _attrs), {
        default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            serverRenderer_cjs_prodExports.ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              vueExports.renderSlot(_ctx.$slots, "default")
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
};
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = vueExports.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/@nuxt+ui@4.2.1_@babel+parser@7.28.5_axios@1.13.2_db0@0.3.4_better-sqlite3@12.5.0_drizzl_dfa8f561a9d8983c7332d596b28eea3c/node_modules/@nuxt/ui/dist/runtime/components/FieldGroup.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const _sfc_main$4 = /* @__PURE__ */ vueExports.defineComponent({
  __name: "MessageInput",
  __ssrInlineRender: true,
  props: {
    upstreams: {},
    currentUpstreamId: {},
    currentAimodelId: {},
    disabled: { type: Boolean },
    isStreaming: { type: Boolean },
    messages: {},
    systemPrompt: {},
    content: {},
    uploadingFiles: {},
    showCompressHint: { type: Boolean }
  },
  emits: ["send", "addMessage", "updateModel", "stop", "compress", "scrollToCompress", "update:content", "update:uploadingFiles", "update:showCompressHint"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const textareaRef = vueExports.ref();
    const fileInputRef = vueExports.ref();
    const isDragging = vueExports.ref(false);
    const uploadedFiles = vueExports.computed(
      () => props.uploadingFiles.filter((f) => f.status === "done" && f.result).map((f) => f.result)
    );
    const isUploading = vueExports.computed(
      () => props.uploadingFiles.some((f) => f.status === "uploading")
    );
    function isImageMimeType(mimeType) {
      return mimeType.startsWith("image/");
    }
    function triggerFileSelect() {
      fileInputRef.value?.click();
    }
    function formatFileSize(bytes) {
      if (bytes < 1024) return `${bytes} B`;
      if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
      return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
    }
    function getFileIcon(mimeType) {
      if (mimeType.startsWith("image/")) return "i-heroicons-photo";
      if (mimeType.startsWith("video/")) return "i-heroicons-video-camera";
      if (mimeType.startsWith("audio/")) return "i-heroicons-musical-note";
      if (mimeType.includes("pdf")) return "i-heroicons-document-text";
      if (mimeType.includes("word") || mimeType.includes("document")) return "i-heroicons-document";
      if (mimeType.includes("sheet") || mimeType.includes("excel")) return "i-heroicons-table-cells";
      if (mimeType.includes("presentation") || mimeType.includes("powerpoint")) return "i-heroicons-presentation-chart-bar";
      if (mimeType.includes("zip") || mimeType.includes("rar") || mimeType.includes("7z")) return "i-heroicons-archive-box";
      return "i-heroicons-document";
    }
    const conversationStats = vueExports.computed(() => {
      const systemPromptSize = props.systemPrompt ? new TextEncoder().encode(props.systemPrompt).length : 0;
      if (!props.messages?.length) {
        return { size: systemPromptSize, messageCount: 0, hasCompressed: false, fileCount: 0 };
      }
      let startIndex = 0;
      for (let i = props.messages.length - 1; i >= 0; i--) {
        if (props.messages[i].mark === "compress-response") {
          startIndex = i;
          break;
        }
      }
      const relevantMessages = props.messages.slice(startIndex).filter((msg) => msg.mark !== "compress-request");
      let fileCount = 0;
      const messagesSize = relevantMessages.reduce((sum, msg) => {
        let msgSize = new TextEncoder().encode(msg.content).length;
        if (msg.files?.length) {
          fileCount += msg.files.length;
          for (const file of msg.files) {
            if (file.mimeType.startsWith("image/")) {
              msgSize += Math.ceil(file.size * 4 / 3);
            }
          }
        }
        return sum + msgSize;
      }, 0);
      return {
        size: systemPromptSize + messagesSize,
        messageCount: relevantMessages.length,
        hasCompressed: startIndex > 0,
        fileCount
      };
    });
    const sizeDisplay = vueExports.computed(() => {
      const { size } = conversationStats.value;
      if (size < 1024) return `${size} B`;
      if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
      return `${(size / 1024 / 1024).toFixed(2)} MB`;
    });
    const needsCompressHint = vueExports.computed(() => {
      return conversationStats.value.size >= 100 * 1024;
    });
    vueExports.watch(needsCompressHint, (needs) => {
      if (needs && !props.showCompressHint) {
        emit("update:showCompressHint", true);
      }
    });
    const modelSelectorRef = vueExports.ref(null);
    const selectedUpstreamId = vueExports.ref(props.currentUpstreamId);
    const selectedAimodelId = vueExports.ref(props.currentAimodelId);
    function handleUpstreamIdChange(id) {
      selectedUpstreamId.value = id;
      if (id !== null && selectedAimodelId.value !== null) {
        emit("updateModel", id, selectedAimodelId.value);
      }
    }
    function handleAimodelIdChange(id) {
      selectedAimodelId.value = id;
      if (selectedUpstreamId.value !== null && id !== null) {
        emit("updateModel", selectedUpstreamId.value, id);
      }
    }
    function handleSend() {
      const text = props.content.trim();
      const files = uploadedFiles.value;
      if (!text && files.length === 0) return;
      if (isUploading.value) return;
      emit("send", text, files.length > 0 ? files : void 0);
      clearInput();
    }
    function handleAddMessage(role) {
      const text = props.content.trim();
      if (!text || props.disabled) return;
      emit("addMessage", text, role);
      clearInput();
    }
    function handleStop() {
      emit("stop");
    }
    function clearInput() {
      emit("update:content", "");
      for (const file of props.uploadingFiles) {
        if (file.previewUrl) {
          URL.revokeObjectURL(file.previewUrl);
        }
      }
      emit("update:uploadingFiles", []);
      if (textareaRef.value) {
        textareaRef.value.style.height = "auto";
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = _sfc_main$d;
      const _component_UButton = _sfc_main$8$1;
      const _component_ModelSelector = __nuxt_component_4$1;
      const _component_UFieldGroup = _sfc_main$5;
      const _component_UDropdownMenu = _sfc_main$b;
      _push(`<div${serverRenderer_cjs_prodExports.ssrRenderAttrs(vueExports.mergeProps({ class: "border-t border-(--ui-border) p-4" }, _attrs))}>`);
      if (props.showCompressHint && vueExports.unref(needsCompressHint)) {
        _push(`<div class="mb-3 p-3 rounded-lg bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 flex items-center justify-between"><div class="flex items-center gap-2 text-amber-700 dark:text-amber-300 text-sm">`);
        _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-exclamation-triangle",
          class: "w-4 h-4"
        }, null, _parent));
        _push(`<span>对话内容较长（${serverRenderer_cjs_prodExports.ssrInterpolate(vueExports.unref(sizeDisplay))}），建议压缩以节省 Token</span></div><div class="flex items-center gap-2">`);
        _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UButton, {
          size: "xs",
          color: "warning",
          onClick: ($event) => emit("compress")
        }, {
          default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` 压缩对话 `);
            } else {
              return [
                vueExports.createTextVNode(" 压缩对话 ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<button class="text-amber-500 hover:text-amber-700">`);
        _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-x-mark",
          class: "w-4 h-4"
        }, null, _parent));
        _push(`</button></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="flex flex-wrap items-center gap-3 mb-3">`);
      _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_ModelSelector, {
        ref_key: "modelSelectorRef",
        ref: modelSelectorRef,
        upstreams: __props.upstreams,
        category: "chat",
        "list-layout": "",
        "upstream-id": __props.currentUpstreamId,
        "aimodel-id": __props.currentAimodelId,
        "onUpdate:upstreamId": handleUpstreamIdChange,
        "onUpdate:aimodelId": handleAimodelIdChange
      }, null, _parent));
      _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UButton, {
        variant: "ghost",
        size: "sm",
        disabled: __props.disabled || __props.isStreaming,
        onClick: triggerFileSelect
      }, {
        default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-paper-clip",
              class: "w-4 h-4"
            }, null, _parent2, _scopeId));
            _push2(`<span${_scopeId}>附件</span>`);
          } else {
            return [
              vueExports.createVNode(_component_UIcon, {
                name: "i-heroicons-paper-clip",
                class: "w-4 h-4"
              }),
              vueExports.createVNode("span", null, "附件")
            ];
          }
        }),
        _: 1
      }, _parent));
      if (__props.messages?.length) {
        _push(`<div class="flex items-center gap-3 text-xs text-(--ui-text-muted)"><span>${serverRenderer_cjs_prodExports.ssrInterpolate(vueExports.unref(conversationStats).messageCount)} 条消息</span><span>${serverRenderer_cjs_prodExports.ssrInterpolate(vueExports.unref(sizeDisplay))}</span>`);
        if (vueExports.unref(conversationStats).hasCompressed) {
          _push(`<button class="text-amber-600 dark:text-amber-400 hover:underline"> (已压缩) </button>`);
        } else {
          _push(`<!---->`);
        }
        if (vueExports.unref(conversationStats).messageCount >= 3) {
          _push(`<button class="text-(--ui-primary) hover:underline flex items-center gap-1">`);
          _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UIcon, {
            name: "i-heroicons-archive-box-arrow-down",
            class: "w-3 h-3"
          }, null, _parent));
          _push(` 压缩对话 </button>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (props.uploadingFiles.length > 0) {
        _push(`<div class="mb-3 flex flex-wrap gap-2 pb-5"><!--[-->`);
        serverRenderer_cjs_prodExports.ssrRenderList(props.uploadingFiles, (file) => {
          _push(`<div class="relative group">`);
          if (isImageMimeType(file.mimeType) && file.previewUrl) {
            _push(`<div class="w-16 h-16 rounded-lg overflow-hidden border border-(--ui-border) bg-(--ui-bg-elevated)"><img${serverRenderer_cjs_prodExports.ssrRenderAttr("src", file.previewUrl)}${serverRenderer_cjs_prodExports.ssrRenderAttr("alt", file.name)} class="w-full h-full object-cover"></div>`);
          } else {
            _push(`<div class="w-16 h-16 rounded-lg border border-(--ui-border) bg-(--ui-bg-elevated) flex flex-col items-center justify-center p-1">`);
            _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UIcon, {
              name: getFileIcon(file.mimeType),
              class: "w-6 h-6 text-(--ui-text-muted)"
            }, null, _parent));
            _push(`<span class="text-[10px] text-(--ui-text-muted) truncate w-full text-center mt-1">${serverRenderer_cjs_prodExports.ssrInterpolate(file.name.split(".").pop())}</span></div>`);
          }
          if (file.status === "uploading") {
            _push(`<div class="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">`);
            _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-arrow-path",
              class: "w-5 h-5 text-white animate-spin"
            }, null, _parent));
            _push(`</div>`);
          } else {
            _push(`<!---->`);
          }
          if (file.status === "error") {
            _push(`<div class="absolute inset-0 bg-red-500/50 rounded-lg flex items-center justify-center"${serverRenderer_cjs_prodExports.ssrRenderAttr("title", file.error)}>`);
            _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-exclamation-triangle",
              class: "w-5 h-5 text-white"
            }, null, _parent));
            _push(`</div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<button class="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">`);
          _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UIcon, {
            name: "i-heroicons-x-mark",
            class: "w-3 h-3"
          }, null, _parent));
          _push(`</button><div class="absolute -bottom-5 left-0 right-0 text-[10px] text-(--ui-text-muted) truncate text-center">${serverRenderer_cjs_prodExports.ssrInterpolate(formatFileSize(file.size))}</div></div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="${serverRenderer_cjs_prodExports.ssrRenderClass([{ "ring-2 ring-(--ui-primary) rounded-lg": vueExports.unref(isDragging) }, "flex gap-2 items-end"])}"><input type="file" multiple class="hidden"><textarea class="flex-1 resize-none bg-(--ui-bg-elevated) border border-(--ui-border) rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-(--ui-primary) min-h-[48px] max-h-[200px]"${serverRenderer_cjs_prodExports.ssrRenderAttr("placeholder", vueExports.unref(isDragging) ? "松开以上传文件" : "输入消息，Enter 发送，Shift+Enter 换行")} rows="1"${serverRenderer_cjs_prodExports.ssrIncludeBooleanAttr(__props.disabled || __props.isStreaming) ? " disabled" : ""}>${serverRenderer_cjs_prodExports.ssrInterpolate(props.content)}</textarea>`);
      if (__props.isStreaming) {
        _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UButton, {
          color: "error",
          class: "h-[48px] w-[48px] flex-shrink-0 flex items-center justify-center",
          onClick: handleStop
        }, {
          default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UIcon, {
                name: "i-heroicons-stop",
                class: "w-5 h-5"
              }, null, _parent2, _scopeId));
            } else {
              return [
                vueExports.createVNode(_component_UIcon, {
                  name: "i-heroicons-stop",
                  class: "w-5 h-5"
                })
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UFieldGroup, { class: "flex-shrink-0" }, {
          default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UButton, {
                color: "primary",
                class: "h-[48px] w-[56px]",
                disabled: !props.content.trim() && vueExports.unref(uploadedFiles).length === 0 || vueExports.unref(isUploading) || !vueExports.unref(selectedUpstreamId) || !vueExports.unref(selectedAimodelId),
                onClick: handleSend
              }, {
                default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UIcon, {
                      name: "i-heroicons-paper-airplane",
                      class: "w-5 h-5"
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      vueExports.createVNode(_component_UIcon, {
                        name: "i-heroicons-paper-airplane",
                        class: "w-5 h-5"
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UDropdownMenu, {
                items: [
                  [
                    { label: "添加用户消息", icon: "i-heroicons-user", onSelect: () => handleAddMessage("user") },
                    { label: "添加AI消息", icon: "i-heroicons-sparkles", onSelect: () => handleAddMessage("assistant") }
                  ]
                ]
              }, {
                default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UButton, {
                      color: "primary",
                      variant: "solid",
                      class: "h-[48px] !px-1.5 !min-w-0 border-l border-white/20",
                      disabled: !props.content.trim() || __props.disabled
                    }, {
                      default: vueExports.withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UIcon, {
                            name: "i-heroicons-chevron-down",
                            class: "w-4 h-4"
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            vueExports.createVNode(_component_UIcon, {
                              name: "i-heroicons-chevron-down",
                              class: "w-4 h-4"
                            })
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      vueExports.createVNode(_component_UButton, {
                        color: "primary",
                        variant: "solid",
                        class: "h-[48px] !px-1.5 !min-w-0 border-l border-white/20",
                        disabled: !props.content.trim() || __props.disabled
                      }, {
                        default: vueExports.withCtx(() => [
                          vueExports.createVNode(_component_UIcon, {
                            name: "i-heroicons-chevron-down",
                            class: "w-4 h-4"
                          })
                        ]),
                        _: 1
                      }, 8, ["disabled"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                vueExports.createVNode(_component_UButton, {
                  color: "primary",
                  class: "h-[48px] w-[56px]",
                  disabled: !props.content.trim() && vueExports.unref(uploadedFiles).length === 0 || vueExports.unref(isUploading) || !vueExports.unref(selectedUpstreamId) || !vueExports.unref(selectedAimodelId),
                  onClick: handleSend
                }, {
                  default: vueExports.withCtx(() => [
                    vueExports.createVNode(_component_UIcon, {
                      name: "i-heroicons-paper-airplane",
                      class: "w-5 h-5"
                    })
                  ]),
                  _: 1
                }, 8, ["disabled"]),
                vueExports.createVNode(_component_UDropdownMenu, {
                  items: [
                    [
                      { label: "添加用户消息", icon: "i-heroicons-user", onSelect: () => handleAddMessage("user") },
                      { label: "添加AI消息", icon: "i-heroicons-sparkles", onSelect: () => handleAddMessage("assistant") }
                    ]
                  ]
                }, {
                  default: vueExports.withCtx(() => [
                    vueExports.createVNode(_component_UButton, {
                      color: "primary",
                      variant: "solid",
                      class: "h-[48px] !px-1.5 !min-w-0 border-l border-white/20",
                      disabled: !props.content.trim() || __props.disabled
                    }, {
                      default: vueExports.withCtx(() => [
                        vueExports.createVNode(_component_UIcon, {
                          name: "i-heroicons-chevron-down",
                          class: "w-4 h-4"
                        })
                      ]),
                      _: 1
                    }, 8, ["disabled"])
                  ]),
                  _: 1
                }, 8, ["items"])
              ];
            }
          }),
          _: 1
        }, _parent));
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = vueExports.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/chat/MessageInput.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const __nuxt_component_4 = Object.assign(_sfc_main$4, { __name: "ChatMessageInput" });
const _sfc_main$3 = /* @__PURE__ */ vueExports.defineComponent({
  __name: "AssistantInfo",
  __ssrInlineRender: true,
  props: {
    assistant: {}
  },
  emits: ["edit"],
  setup(__props, { emit: __emit }) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = _sfc_main$d;
      if (__props.assistant) {
        _push(`<div${serverRenderer_cjs_prodExports.ssrRenderAttrs(vueExports.mergeProps({ class: "p-3 border-b border-(--ui-border)" }, _attrs))}><div class="flex items-start gap-3"><div class="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden">`);
        if (__props.assistant.avatar) {
          _push(`<img${serverRenderer_cjs_prodExports.ssrRenderAttr("src", __props.assistant.avatar)} class="w-full h-full object-cover">`);
        } else {
          _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UIcon, {
            name: "i-heroicons-user-circle",
            class: "w-8 h-8 text-(--ui-text-muted)"
          }, null, _parent));
        }
        _push(`</div><div class="flex-1 min-w-0"><div class="flex items-center gap-2"><span class="font-medium text-sm truncate">${serverRenderer_cjs_prodExports.ssrInterpolate(__props.assistant.name)}</span>`);
        if (__props.assistant.isDefault) {
          _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UIcon, {
            name: "i-heroicons-star-solid",
            class: "w-3 h-3 text-yellow-500 flex-shrink-0"
          }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="text-xs text-(--ui-text-muted) mt-0.5 line-clamp-2">${serverRenderer_cjs_prodExports.ssrInterpolate(__props.assistant.description || "暂无简介")}</div></div><button class="p-1.5 rounded hover:bg-(--ui-bg) transition-colors flex-shrink-0" title="编辑助手">`);
        _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-cog-6-tooth",
          class: "w-4 h-4 text-(--ui-text-muted)"
        }, null, _parent));
        _push(`</button></div>`);
        if (__props.assistant.modelName) {
          _push(`<div class="mt-2 text-xs text-(--ui-text-dimmed) flex items-center gap-1">`);
          _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UIcon, {
            name: "i-heroicons-cpu-chip",
            class: "w-3 h-3"
          }, null, _parent));
          _push(` ${serverRenderer_cjs_prodExports.ssrInterpolate(__props.assistant.modelName)}</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = vueExports.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/chat/AssistantInfo.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_5 = Object.assign(_sfc_main$3, { __name: "ChatAssistantInfo" });
const _sfc_main$2 = /* @__PURE__ */ vueExports.defineComponent({
  __name: "ConversationList",
  __ssrInlineRender: true,
  props: {
    conversations: {},
    currentConversationId: {}
  },
  emits: ["select", "create", "delete", "rename", "generateTitle"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const deleteConfirmId = vueExports.ref(null);
    const showDeleteConfirm = vueExports.ref(false);
    function handleDelete(id) {
      deleteConfirmId.value = id;
      showDeleteConfirm.value = true;
    }
    function confirmDelete() {
      if (deleteConfirmId.value) {
        emit("delete", deleteConfirmId.value);
      }
      showDeleteConfirm.value = false;
      deleteConfirmId.value = null;
    }
    function cancelDelete() {
      showDeleteConfirm.value = false;
      deleteConfirmId.value = null;
    }
    const editingId = vueExports.ref(null);
    const editingTitle = vueExports.ref("");
    const inputRef = vueExports.ref(null);
    function startEdit(conv) {
      editingId.value = conv.id;
      editingTitle.value = conv.title;
      vueExports.nextTick(() => {
        inputRef.value?.focus();
        inputRef.value?.select();
      });
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UButton = _sfc_main$8$1;
      const _component_UIcon = _sfc_main$d;
      const _component_TimeAgo = __nuxt_component_3$1;
      const _component_UDropdownMenu = _sfc_main$b;
      const _component_UModal = _sfc_main$c;
      _push(`<div${serverRenderer_cjs_prodExports.ssrRenderAttrs(vueExports.mergeProps({ class: "flex flex-col h-full" }, _attrs))}><div class="flex items-center justify-between p-3 border-b border-(--ui-border)"><h4 class="text-sm font-medium">对话列表</h4>`);
      _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UButton, {
        variant: "ghost",
        size: "xs",
        onClick: ($event) => emit("create")
      }, {
        default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-plus",
              class: "w-4 h-4"
            }, null, _parent2, _scopeId));
          } else {
            return [
              vueExports.createVNode(_component_UIcon, {
                name: "i-heroicons-plus",
                class: "w-4 h-4"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="flex-1 overflow-y-auto">`);
      if (__props.conversations.length === 0) {
        _push(`<div class="p-4 text-center text-(--ui-text-muted) text-sm"> 暂无对话 </div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!--[-->`);
      serverRenderer_cjs_prodExports.ssrRenderList(__props.conversations, (conv) => {
        _push(`<div class="${serverRenderer_cjs_prodExports.ssrRenderClass([conv.id === __props.currentConversationId ? "bg-(--ui-bg)" : "", "w-full p-3 text-left hover:bg-(--ui-bg) transition-colors group cursor-pointer"])}"><div class="relative flex items-start gap-2"><span class="${serverRenderer_cjs_prodExports.ssrRenderClass([conv.id === __props.currentConversationId ? "bg-(--ui-primary)" : "bg-transparent", "w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"])}"></span><div class="flex-1 min-w-0">`);
        if (vueExports.unref(editingId) === conv.id) {
          _push(`<div class="flex items-center gap-1"><input${serverRenderer_cjs_prodExports.ssrRenderAttr("value", vueExports.unref(editingTitle))} class="min-w-0 flex-1 text-sm px-2 py-1 rounded bg-(--ui-bg-elevated) border border-(--ui-border) focus:outline-none focus:border-(--ui-primary)"><button class="flex-shrink-0 p-1 rounded hover:bg-(--ui-success)/20 text-(--ui-success)" title="确认">`);
          _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UIcon, {
            name: "i-heroicons-check",
            class: "w-4 h-4"
          }, null, _parent));
          _push(`</button><button class="flex-shrink-0 p-1 rounded hover:bg-(--ui-error)/20 text-(--ui-error)" title="取消">`);
          _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UIcon, {
            name: "i-heroicons-x-mark",
            class: "w-4 h-4"
          }, null, _parent));
          _push(`</button></div>`);
        } else {
          _push(`<!--[--><div class="text-sm truncate pr-6">${serverRenderer_cjs_prodExports.ssrInterpolate(conv.title)}</div><div class="text-xs text-(--ui-text-dimmed) mt-0.5">`);
          _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_TimeAgo, {
            time: conv.updatedAt
          }, null, _parent));
          _push(`</div><!--]-->`);
        }
        _push(`</div>`);
        if (vueExports.unref(editingId) !== conv.id) {
          _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UDropdownMenu, {
            items: [
              [
                { label: "AI 智能重命名", icon: "i-heroicons-sparkles", onSelect: () => emit("generateTitle", conv.id) },
                { label: "重命名", icon: "i-heroicons-pencil", onSelect: () => startEdit(conv) }
              ],
              [
                { label: "删除", icon: "i-heroicons-trash", color: "error", onSelect: () => handleDelete(conv.id) }
              ]
            ]
          }, {
            default: vueExports.withCtx(({ open }, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UButton, {
                  variant: "ghost",
                  size: "xs",
                  class: ["absolute right-2 top-2 transition-opacity", open ? "opacity-100" : "opacity-100 md:opacity-0 md:group-hover:opacity-100"],
                  onClick: () => {
                  }
                }, {
                  default: vueExports.withCtx((_, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UIcon, {
                        name: "i-heroicons-ellipsis-vertical",
                        class: "w-4 h-4"
                      }, null, _parent3, _scopeId2));
                    } else {
                      return [
                        vueExports.createVNode(_component_UIcon, {
                          name: "i-heroicons-ellipsis-vertical",
                          class: "w-4 h-4"
                        })
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
              } else {
                return [
                  vueExports.createVNode(_component_UButton, {
                    variant: "ghost",
                    size: "xs",
                    class: ["absolute right-2 top-2 transition-opacity", open ? "opacity-100" : "opacity-100 md:opacity-0 md:group-hover:opacity-100"],
                    onClick: vueExports.withModifiers(() => {
                    }, ["stop"])
                  }, {
                    default: vueExports.withCtx(() => [
                      vueExports.createVNode(_component_UIcon, {
                        name: "i-heroicons-ellipsis-vertical",
                        class: "w-4 h-4"
                      })
                    ]),
                    _: 1
                  }, 8, ["class", "onClick"])
                ];
              }
            }),
            _: 2
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
      });
      _push(`<!--]--></div>`);
      _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UModal, {
        open: vueExports.unref(showDeleteConfirm),
        "onUpdate:open": ($event) => vueExports.isRef(showDeleteConfirm) ? showDeleteConfirm.value = $event : null,
        title: "确认删除",
        description: "确定要删除这个对话吗？此操作不可撤销。",
        close: false
      }, {
        footer: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex justify-end gap-3"${_scopeId}>`);
            _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UButton, {
              color: "error",
              onClick: confirmDelete
            }, {
              default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`删除`);
                } else {
                  return [
                    vueExports.createTextVNode("删除")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UButton, {
              variant: "outline",
              color: "neutral",
              onClick: cancelDelete
            }, {
              default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`取消`);
                } else {
                  return [
                    vueExports.createTextVNode("取消")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              vueExports.createVNode("div", { class: "flex justify-end gap-3" }, [
                vueExports.createVNode(_component_UButton, {
                  color: "error",
                  onClick: confirmDelete
                }, {
                  default: vueExports.withCtx(() => [
                    vueExports.createTextVNode("删除")
                  ]),
                  _: 1
                }),
                vueExports.createVNode(_component_UButton, {
                  variant: "outline",
                  color: "neutral",
                  onClick: cancelDelete
                }, {
                  default: vueExports.withCtx(() => [
                    vueExports.createTextVNode("取消")
                  ]),
                  _: 1
                })
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = vueExports.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/chat/ConversationList.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_6 = Object.assign(_sfc_main$2, { __name: "ChatConversationList" });
const _sfc_main$1 = /* @__PURE__ */ vueExports.defineComponent({
  __name: "AssistantEditor",
  __ssrInlineRender: true,
  props: {
    assistant: {},
    upstreams: {},
    open: { type: Boolean }
  },
  emits: ["update:open", "save", "delete"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const deleteConfirmOpen = vueExports.ref(false);
    const formData = vueExports.reactive({
      name: "",
      description: "",
      avatar: "",
      systemPrompt: "",
      upstreamId: null,
      aimodelId: null,
      modelName: null
    });
    function validate(state) {
      const errors = [];
      if (!state.name?.trim()) {
        errors.push({ name: "name", message: "请输入助手名称" });
      }
      return errors;
    }
    vueExports.watch(() => props.assistant, (assistant) => {
      if (assistant) {
        Object.assign(formData, {
          name: assistant.name,
          description: assistant.description || "",
          avatar: assistant.avatar || "",
          systemPrompt: assistant.systemPrompt || "",
          upstreamId: assistant.upstreamId,
          aimodelId: assistant.aimodelId,
          modelName: assistant.modelName
        });
      } else {
        Object.assign(formData, {
          name: "",
          description: "",
          avatar: "",
          systemPrompt: "",
          upstreamId: null,
          aimodelId: null,
          modelName: null
        });
      }
    }, { immediate: true });
    function isImageModel(modelType) {
      const imageModels = [
        "midjourney",
        "gemini",
        "flux",
        "dalle",
        "doubao",
        "gpt4o-image",
        "grok-image",
        "qwen-image"
      ];
      return imageModels.includes(modelType);
    }
    const allChatModels = vueExports.computed(() => {
      const result = [];
      for (const upstream of props.upstreams) {
        for (const aimodel of upstream.aimodels || []) {
          const isChat = aimodel.category === "chat" || !aimodel.category && aimodel.apiFormat === "openai-chat" && !isImageModel(aimodel.modelType);
          if (isChat) {
            result.push({
              upstreamId: upstream.id,
              upstreamName: upstream.name,
              aimodelId: aimodel.id,
              modelName: aimodel.modelName
            });
          }
        }
      }
      return result;
    });
    const currentDisplayText = vueExports.computed(() => {
      if (!formData.upstreamId || !formData.aimodelId) {
        return "选择模型";
      }
      const upstream = props.upstreams.find((u) => u.id === formData.upstreamId);
      if (!upstream) return "选择模型";
      return `${upstream.name} / ${formData.modelName || "未知模型"}`;
    });
    const modelDropdownItems = vueExports.computed(() => {
      const groups = [];
      const upstreamMap = /* @__PURE__ */ new Map();
      for (const item of allChatModels.value) {
        if (!upstreamMap.has(item.upstreamId)) {
          upstreamMap.set(item.upstreamId, { name: item.upstreamName, models: [] });
        }
        upstreamMap.get(item.upstreamId).models.push({ aimodelId: item.aimodelId, modelName: item.modelName });
      }
      for (const [upstreamId, { name, models }] of upstreamMap) {
        const group = [
          { label: name, type: "label" }
        ];
        for (const { aimodelId, modelName } of models) {
          group.push({
            label: modelName,
            onSelect: () => handleSelectModel(upstreamId, aimodelId, modelName)
          });
        }
        groups.push(group);
      }
      return groups;
    });
    function handleSelectModel(upstreamId, aimodelId, modelName) {
      formData.upstreamId = upstreamId;
      formData.aimodelId = aimodelId;
      formData.modelName = modelName;
    }
    async function handleAvatarUpload(e) {
      const target = e.target;
      const file = target.files?.[0];
      if (!file) return;
      if (file.size > 2 * 1024 * 1024) {
        useToast().add({ title: "图片大小不能超过 2MB", color: "error" });
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        formData.avatar = reader.result;
      };
      reader.readAsDataURL(file);
    }
    function onSubmit(event) {
      emit("save", {
        name: event.data.name.trim(),
        description: event.data.description?.trim() || null,
        avatar: event.data.avatar || null,
        systemPrompt: event.data.systemPrompt?.trim() || null,
        upstreamId: event.data.upstreamId,
        aimodelId: event.data.aimodelId,
        modelName: event.data.modelName
      });
    }
    function handleClose() {
      emit("update:open", false);
    }
    function handleDeleteConfirm() {
      if (props.assistant) {
        emit("delete", props.assistant.id);
        deleteConfirmOpen.value = false;
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UModal = _sfc_main$c;
      const _component_UForm = _sfc_main$e;
      const _component_UIcon = _sfc_main$d;
      const _component_UFormField = _sfc_main$f;
      const _component_UInput = _sfc_main$g;
      const _component_UDropdownMenu = _sfc_main$b;
      const _component_UButton = _sfc_main$8$1;
      const _component_UTextarea = _sfc_main$h;
      _push(`<!--[-->`);
      _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UModal, {
        open: __props.open,
        title: __props.assistant ? "编辑助手" : "新建助手",
        ui: { content: "sm:max-w-4xl" },
        "onUpdate:open": ($event) => emit("update:open", $event)
      }, {
        body: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UForm, {
              state: vueExports.unref(formData),
              validate,
              class: "space-y-5",
              onSubmit
            }, {
              default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex gap-4"${_scopeId2}><div class="relative w-30 h-30 shrink-0 rounded-full overflow-hidden group"${_scopeId2}>`);
                  if (vueExports.unref(formData).avatar) {
                    _push3(`<img${serverRenderer_cjs_prodExports.ssrRenderAttr("src", vueExports.unref(formData).avatar)} class="w-full h-full object-cover"${_scopeId2}>`);
                  } else {
                    _push3(`<label class="w-full h-full border-2 border-dashed border-(--ui-border-accented) hover:border-(--ui-primary) transition-colors flex flex-col items-center justify-center cursor-pointer rounded-full"${_scopeId2}>`);
                    _push3(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UIcon, {
                      name: "i-heroicons-cloud-arrow-up",
                      class: "w-6 h-6 text-(--ui-text-dimmed) mb-1"
                    }, null, _parent3, _scopeId2));
                    _push3(`<span class="text-(--ui-text-dimmed) text-xs"${_scopeId2}>上传</span><input type="file" accept="image/*" class="hidden"${_scopeId2}></label>`);
                  }
                  if (vueExports.unref(formData).avatar) {
                    _push3(`<button type="button" class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"${_scopeId2}>`);
                    _push3(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UIcon, {
                      name: "i-heroicons-x-mark",
                      class: "w-6 h-6 text-white"
                    }, null, _parent3, _scopeId2));
                    _push3(`</button>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div><div class="flex-1 space-y-3"${_scopeId2}>`);
                  _push3(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UFormField, {
                    label: "助手名称",
                    name: "name",
                    required: ""
                  }, {
                    default: vueExports.withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UInput, {
                          modelValue: vueExports.unref(formData).name,
                          "onUpdate:modelValue": ($event) => vueExports.unref(formData).name = $event,
                          placeholder: "如：代码助手",
                          class: "w-56"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          vueExports.createVNode(_component_UInput, {
                            modelValue: vueExports.unref(formData).name,
                            "onUpdate:modelValue": ($event) => vueExports.unref(formData).name = $event,
                            placeholder: "如：代码助手",
                            class: "w-56"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UFormField, {
                    label: "模型配置",
                    name: "modelConfig"
                  }, vueExports.createSlots({
                    default: vueExports.withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UDropdownMenu, { items: vueExports.unref(modelDropdownItems) }, {
                          default: vueExports.withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UButton, {
                                variant: "outline",
                                class: "justify-between",
                                disabled: vueExports.unref(allChatModels).length === 0
                              }, {
                                default: vueExports.withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`<span class="flex items-center gap-2"${_scopeId5}>`);
                                    _push6(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UIcon, {
                                      name: "i-heroicons-cpu-chip",
                                      class: "w-4 h-4"
                                    }, null, _parent6, _scopeId5));
                                    _push6(` ${serverRenderer_cjs_prodExports.ssrInterpolate(vueExports.unref(currentDisplayText))}</span>`);
                                    _push6(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UIcon, {
                                      name: "i-heroicons-chevron-down",
                                      class: "w-4 h-4"
                                    }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      vueExports.createVNode("span", { class: "flex items-center gap-2" }, [
                                        vueExports.createVNode(_component_UIcon, {
                                          name: "i-heroicons-cpu-chip",
                                          class: "w-4 h-4"
                                        }),
                                        vueExports.createTextVNode(" " + vueExports.toDisplayString(vueExports.unref(currentDisplayText)), 1)
                                      ]),
                                      vueExports.createVNode(_component_UIcon, {
                                        name: "i-heroicons-chevron-down",
                                        class: "w-4 h-4"
                                      })
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                vueExports.createVNode(_component_UButton, {
                                  variant: "outline",
                                  class: "justify-between",
                                  disabled: vueExports.unref(allChatModels).length === 0
                                }, {
                                  default: vueExports.withCtx(() => [
                                    vueExports.createVNode("span", { class: "flex items-center gap-2" }, [
                                      vueExports.createVNode(_component_UIcon, {
                                        name: "i-heroicons-cpu-chip",
                                        class: "w-4 h-4"
                                      }),
                                      vueExports.createTextVNode(" " + vueExports.toDisplayString(vueExports.unref(currentDisplayText)), 1)
                                    ]),
                                    vueExports.createVNode(_component_UIcon, {
                                      name: "i-heroicons-chevron-down",
                                      class: "w-4 h-4"
                                    })
                                  ]),
                                  _: 1
                                }, 8, ["disabled"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          vueExports.createVNode(_component_UDropdownMenu, { items: vueExports.unref(modelDropdownItems) }, {
                            default: vueExports.withCtx(() => [
                              vueExports.createVNode(_component_UButton, {
                                variant: "outline",
                                class: "justify-between",
                                disabled: vueExports.unref(allChatModels).length === 0
                              }, {
                                default: vueExports.withCtx(() => [
                                  vueExports.createVNode("span", { class: "flex items-center gap-2" }, [
                                    vueExports.createVNode(_component_UIcon, {
                                      name: "i-heroicons-cpu-chip",
                                      class: "w-4 h-4"
                                    }),
                                    vueExports.createTextVNode(" " + vueExports.toDisplayString(vueExports.unref(currentDisplayText)), 1)
                                  ]),
                                  vueExports.createVNode(_component_UIcon, {
                                    name: "i-heroicons-chevron-down",
                                    class: "w-4 h-4"
                                  })
                                ]),
                                _: 1
                              }, 8, ["disabled"])
                            ]),
                            _: 1
                          }, 8, ["items"])
                        ];
                      }
                    }),
                    _: 2
                  }, [
                    vueExports.unref(allChatModels).length === 0 ? {
                      name: "help",
                      fn: vueExports.withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(` 请先在设置中添加对话模型 `);
                        } else {
                          return [
                            vueExports.createTextVNode(" 请先在设置中添加对话模型 ")
                          ];
                        }
                      }),
                      key: "0"
                    } : void 0
                  ]), _parent3, _scopeId2));
                  _push3(`</div></div>`);
                  _push3(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UFormField, {
                    label: "助手简介",
                    name: "description"
                  }, {
                    default: vueExports.withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UTextarea, {
                          modelValue: vueExports.unref(formData).description,
                          "onUpdate:modelValue": ($event) => vueExports.unref(formData).description = $event,
                          placeholder: "简短描述助手的功能",
                          rows: 4,
                          class: "w-full"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          vueExports.createVNode(_component_UTextarea, {
                            modelValue: vueExports.unref(formData).description,
                            "onUpdate:modelValue": ($event) => vueExports.unref(formData).description = $event,
                            placeholder: "简短描述助手的功能",
                            rows: 4,
                            class: "w-full"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UFormField, {
                    label: "系统提示词",
                    name: "systemPrompt"
                  }, {
                    default: vueExports.withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UTextarea, {
                          modelValue: vueExports.unref(formData).systemPrompt,
                          "onUpdate:modelValue": ($event) => vueExports.unref(formData).systemPrompt = $event,
                          rows: 16,
                          placeholder: "设置助手的行为和角色，如：你是一个专业的编程助手...",
                          class: "w-full"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          vueExports.createVNode(_component_UTextarea, {
                            modelValue: vueExports.unref(formData).systemPrompt,
                            "onUpdate:modelValue": ($event) => vueExports.unref(formData).systemPrompt = $event,
                            rows: 16,
                            placeholder: "设置助手的行为和角色，如：你是一个专业的编程助手...",
                            class: "w-full"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<div class="flex justify-between pt-2"${_scopeId2}><div${_scopeId2}>`);
                  if (__props.assistant && !__props.assistant.isDefault) {
                    _push3(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UButton, {
                      color: "error",
                      variant: "ghost",
                      type: "button",
                      onClick: ($event) => deleteConfirmOpen.value = true
                    }, {
                      default: vueExports.withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(` 删除助手 `);
                        } else {
                          return [
                            vueExports.createTextVNode(" 删除助手 ")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div><div class="flex gap-2"${_scopeId2}>`);
                  _push3(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UButton, {
                    variant: "ghost",
                    type: "button",
                    onClick: handleClose
                  }, {
                    default: vueExports.withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` 取消 `);
                      } else {
                        return [
                          vueExports.createTextVNode(" 取消 ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UButton, {
                    color: "primary",
                    type: "submit"
                  }, {
                    default: vueExports.withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` 保存 `);
                      } else {
                        return [
                          vueExports.createTextVNode(" 保存 ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div></div>`);
                } else {
                  return [
                    vueExports.createVNode("div", { class: "flex gap-4" }, [
                      vueExports.createVNode("div", { class: "relative w-30 h-30 shrink-0 rounded-full overflow-hidden group" }, [
                        vueExports.unref(formData).avatar ? (vueExports.openBlock(), vueExports.createBlock("img", {
                          key: 0,
                          src: vueExports.unref(formData).avatar,
                          class: "w-full h-full object-cover"
                        }, null, 8, ["src"])) : (vueExports.openBlock(), vueExports.createBlock("label", {
                          key: 1,
                          class: "w-full h-full border-2 border-dashed border-(--ui-border-accented) hover:border-(--ui-primary) transition-colors flex flex-col items-center justify-center cursor-pointer rounded-full"
                        }, [
                          vueExports.createVNode(_component_UIcon, {
                            name: "i-heroicons-cloud-arrow-up",
                            class: "w-6 h-6 text-(--ui-text-dimmed) mb-1"
                          }),
                          vueExports.createVNode("span", { class: "text-(--ui-text-dimmed) text-xs" }, "上传"),
                          vueExports.createVNode("input", {
                            type: "file",
                            accept: "image/*",
                            class: "hidden",
                            onChange: handleAvatarUpload
                          }, null, 32)
                        ])),
                        vueExports.unref(formData).avatar ? (vueExports.openBlock(), vueExports.createBlock("button", {
                          key: 2,
                          type: "button",
                          class: "absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center",
                          onClick: ($event) => vueExports.unref(formData).avatar = ""
                        }, [
                          vueExports.createVNode(_component_UIcon, {
                            name: "i-heroicons-x-mark",
                            class: "w-6 h-6 text-white"
                          })
                        ], 8, ["onClick"])) : vueExports.createCommentVNode("", true)
                      ]),
                      vueExports.createVNode("div", { class: "flex-1 space-y-3" }, [
                        vueExports.createVNode(_component_UFormField, {
                          label: "助手名称",
                          name: "name",
                          required: ""
                        }, {
                          default: vueExports.withCtx(() => [
                            vueExports.createVNode(_component_UInput, {
                              modelValue: vueExports.unref(formData).name,
                              "onUpdate:modelValue": ($event) => vueExports.unref(formData).name = $event,
                              placeholder: "如：代码助手",
                              class: "w-56"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          _: 1
                        }),
                        vueExports.createVNode(_component_UFormField, {
                          label: "模型配置",
                          name: "modelConfig"
                        }, vueExports.createSlots({
                          default: vueExports.withCtx(() => [
                            vueExports.createVNode(_component_UDropdownMenu, { items: vueExports.unref(modelDropdownItems) }, {
                              default: vueExports.withCtx(() => [
                                vueExports.createVNode(_component_UButton, {
                                  variant: "outline",
                                  class: "justify-between",
                                  disabled: vueExports.unref(allChatModels).length === 0
                                }, {
                                  default: vueExports.withCtx(() => [
                                    vueExports.createVNode("span", { class: "flex items-center gap-2" }, [
                                      vueExports.createVNode(_component_UIcon, {
                                        name: "i-heroicons-cpu-chip",
                                        class: "w-4 h-4"
                                      }),
                                      vueExports.createTextVNode(" " + vueExports.toDisplayString(vueExports.unref(currentDisplayText)), 1)
                                    ]),
                                    vueExports.createVNode(_component_UIcon, {
                                      name: "i-heroicons-chevron-down",
                                      class: "w-4 h-4"
                                    })
                                  ]),
                                  _: 1
                                }, 8, ["disabled"])
                              ]),
                              _: 1
                            }, 8, ["items"])
                          ]),
                          _: 2
                        }, [
                          vueExports.unref(allChatModels).length === 0 ? {
                            name: "help",
                            fn: vueExports.withCtx(() => [
                              vueExports.createTextVNode(" 请先在设置中添加对话模型 ")
                            ]),
                            key: "0"
                          } : void 0
                        ]), 1024)
                      ])
                    ]),
                    vueExports.createVNode(_component_UFormField, {
                      label: "助手简介",
                      name: "description"
                    }, {
                      default: vueExports.withCtx(() => [
                        vueExports.createVNode(_component_UTextarea, {
                          modelValue: vueExports.unref(formData).description,
                          "onUpdate:modelValue": ($event) => vueExports.unref(formData).description = $event,
                          placeholder: "简短描述助手的功能",
                          rows: 4,
                          class: "w-full"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    vueExports.createVNode(_component_UFormField, {
                      label: "系统提示词",
                      name: "systemPrompt"
                    }, {
                      default: vueExports.withCtx(() => [
                        vueExports.createVNode(_component_UTextarea, {
                          modelValue: vueExports.unref(formData).systemPrompt,
                          "onUpdate:modelValue": ($event) => vueExports.unref(formData).systemPrompt = $event,
                          rows: 16,
                          placeholder: "设置助手的行为和角色，如：你是一个专业的编程助手...",
                          class: "w-full"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    vueExports.createVNode("div", { class: "flex justify-between pt-2" }, [
                      vueExports.createVNode("div", null, [
                        __props.assistant && !__props.assistant.isDefault ? (vueExports.openBlock(), vueExports.createBlock(_component_UButton, {
                          key: 0,
                          color: "error",
                          variant: "ghost",
                          type: "button",
                          onClick: ($event) => deleteConfirmOpen.value = true
                        }, {
                          default: vueExports.withCtx(() => [
                            vueExports.createTextVNode(" 删除助手 ")
                          ]),
                          _: 1
                        }, 8, ["onClick"])) : vueExports.createCommentVNode("", true)
                      ]),
                      vueExports.createVNode("div", { class: "flex gap-2" }, [
                        vueExports.createVNode(_component_UButton, {
                          variant: "ghost",
                          type: "button",
                          onClick: handleClose
                        }, {
                          default: vueExports.withCtx(() => [
                            vueExports.createTextVNode(" 取消 ")
                          ]),
                          _: 1
                        }),
                        vueExports.createVNode(_component_UButton, {
                          color: "primary",
                          type: "submit"
                        }, {
                          default: vueExports.withCtx(() => [
                            vueExports.createTextVNode(" 保存 ")
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              vueExports.createVNode(_component_UForm, {
                state: vueExports.unref(formData),
                validate,
                class: "space-y-5",
                onSubmit
              }, {
                default: vueExports.withCtx(() => [
                  vueExports.createVNode("div", { class: "flex gap-4" }, [
                    vueExports.createVNode("div", { class: "relative w-30 h-30 shrink-0 rounded-full overflow-hidden group" }, [
                      vueExports.unref(formData).avatar ? (vueExports.openBlock(), vueExports.createBlock("img", {
                        key: 0,
                        src: vueExports.unref(formData).avatar,
                        class: "w-full h-full object-cover"
                      }, null, 8, ["src"])) : (vueExports.openBlock(), vueExports.createBlock("label", {
                        key: 1,
                        class: "w-full h-full border-2 border-dashed border-(--ui-border-accented) hover:border-(--ui-primary) transition-colors flex flex-col items-center justify-center cursor-pointer rounded-full"
                      }, [
                        vueExports.createVNode(_component_UIcon, {
                          name: "i-heroicons-cloud-arrow-up",
                          class: "w-6 h-6 text-(--ui-text-dimmed) mb-1"
                        }),
                        vueExports.createVNode("span", { class: "text-(--ui-text-dimmed) text-xs" }, "上传"),
                        vueExports.createVNode("input", {
                          type: "file",
                          accept: "image/*",
                          class: "hidden",
                          onChange: handleAvatarUpload
                        }, null, 32)
                      ])),
                      vueExports.unref(formData).avatar ? (vueExports.openBlock(), vueExports.createBlock("button", {
                        key: 2,
                        type: "button",
                        class: "absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center",
                        onClick: ($event) => vueExports.unref(formData).avatar = ""
                      }, [
                        vueExports.createVNode(_component_UIcon, {
                          name: "i-heroicons-x-mark",
                          class: "w-6 h-6 text-white"
                        })
                      ], 8, ["onClick"])) : vueExports.createCommentVNode("", true)
                    ]),
                    vueExports.createVNode("div", { class: "flex-1 space-y-3" }, [
                      vueExports.createVNode(_component_UFormField, {
                        label: "助手名称",
                        name: "name",
                        required: ""
                      }, {
                        default: vueExports.withCtx(() => [
                          vueExports.createVNode(_component_UInput, {
                            modelValue: vueExports.unref(formData).name,
                            "onUpdate:modelValue": ($event) => vueExports.unref(formData).name = $event,
                            placeholder: "如：代码助手",
                            class: "w-56"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      }),
                      vueExports.createVNode(_component_UFormField, {
                        label: "模型配置",
                        name: "modelConfig"
                      }, vueExports.createSlots({
                        default: vueExports.withCtx(() => [
                          vueExports.createVNode(_component_UDropdownMenu, { items: vueExports.unref(modelDropdownItems) }, {
                            default: vueExports.withCtx(() => [
                              vueExports.createVNode(_component_UButton, {
                                variant: "outline",
                                class: "justify-between",
                                disabled: vueExports.unref(allChatModels).length === 0
                              }, {
                                default: vueExports.withCtx(() => [
                                  vueExports.createVNode("span", { class: "flex items-center gap-2" }, [
                                    vueExports.createVNode(_component_UIcon, {
                                      name: "i-heroicons-cpu-chip",
                                      class: "w-4 h-4"
                                    }),
                                    vueExports.createTextVNode(" " + vueExports.toDisplayString(vueExports.unref(currentDisplayText)), 1)
                                  ]),
                                  vueExports.createVNode(_component_UIcon, {
                                    name: "i-heroicons-chevron-down",
                                    class: "w-4 h-4"
                                  })
                                ]),
                                _: 1
                              }, 8, ["disabled"])
                            ]),
                            _: 1
                          }, 8, ["items"])
                        ]),
                        _: 2
                      }, [
                        vueExports.unref(allChatModels).length === 0 ? {
                          name: "help",
                          fn: vueExports.withCtx(() => [
                            vueExports.createTextVNode(" 请先在设置中添加对话模型 ")
                          ]),
                          key: "0"
                        } : void 0
                      ]), 1024)
                    ])
                  ]),
                  vueExports.createVNode(_component_UFormField, {
                    label: "助手简介",
                    name: "description"
                  }, {
                    default: vueExports.withCtx(() => [
                      vueExports.createVNode(_component_UTextarea, {
                        modelValue: vueExports.unref(formData).description,
                        "onUpdate:modelValue": ($event) => vueExports.unref(formData).description = $event,
                        placeholder: "简短描述助手的功能",
                        rows: 4,
                        class: "w-full"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  vueExports.createVNode(_component_UFormField, {
                    label: "系统提示词",
                    name: "systemPrompt"
                  }, {
                    default: vueExports.withCtx(() => [
                      vueExports.createVNode(_component_UTextarea, {
                        modelValue: vueExports.unref(formData).systemPrompt,
                        "onUpdate:modelValue": ($event) => vueExports.unref(formData).systemPrompt = $event,
                        rows: 16,
                        placeholder: "设置助手的行为和角色，如：你是一个专业的编程助手...",
                        class: "w-full"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  vueExports.createVNode("div", { class: "flex justify-between pt-2" }, [
                    vueExports.createVNode("div", null, [
                      __props.assistant && !__props.assistant.isDefault ? (vueExports.openBlock(), vueExports.createBlock(_component_UButton, {
                        key: 0,
                        color: "error",
                        variant: "ghost",
                        type: "button",
                        onClick: ($event) => deleteConfirmOpen.value = true
                      }, {
                        default: vueExports.withCtx(() => [
                          vueExports.createTextVNode(" 删除助手 ")
                        ]),
                        _: 1
                      }, 8, ["onClick"])) : vueExports.createCommentVNode("", true)
                    ]),
                    vueExports.createVNode("div", { class: "flex gap-2" }, [
                      vueExports.createVNode(_component_UButton, {
                        variant: "ghost",
                        type: "button",
                        onClick: handleClose
                      }, {
                        default: vueExports.withCtx(() => [
                          vueExports.createTextVNode(" 取消 ")
                        ]),
                        _: 1
                      }),
                      vueExports.createVNode(_component_UButton, {
                        color: "primary",
                        type: "submit"
                      }, {
                        default: vueExports.withCtx(() => [
                          vueExports.createTextVNode(" 保存 ")
                        ]),
                        _: 1
                      })
                    ])
                  ])
                ]),
                _: 1
              }, 8, ["state"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UModal, {
        open: vueExports.unref(deleteConfirmOpen),
        "onUpdate:open": ($event) => vueExports.isRef(deleteConfirmOpen) ? deleteConfirmOpen.value = $event : null,
        title: "确认删除",
        description: `确定要删除助手「${__props.assistant?.name}」吗？该助手下的所有对话也将被删除，此操作不可撤销。`,
        close: false
      }, {
        footer: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex justify-end gap-3"${_scopeId}>`);
            _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UButton, {
              color: "error",
              onClick: handleDeleteConfirm
            }, {
              default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`删除`);
                } else {
                  return [
                    vueExports.createTextVNode("删除")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UButton, {
              variant: "outline",
              color: "neutral",
              onClick: ($event) => deleteConfirmOpen.value = false
            }, {
              default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`取消`);
                } else {
                  return [
                    vueExports.createTextVNode("取消")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              vueExports.createVNode("div", { class: "flex justify-end gap-3" }, [
                vueExports.createVNode(_component_UButton, {
                  color: "error",
                  onClick: handleDeleteConfirm
                }, {
                  default: vueExports.withCtx(() => [
                    vueExports.createTextVNode("删除")
                  ]),
                  _: 1
                }),
                vueExports.createVNode(_component_UButton, {
                  variant: "outline",
                  color: "neutral",
                  onClick: ($event) => deleteConfirmOpen.value = false
                }, {
                  default: vueExports.withCtx(() => [
                    vueExports.createTextVNode("取消")
                  ]),
                  _: 1
                }, 8, ["onClick"])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = vueExports.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/chat/AssistantEditor.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_8 = Object.assign(_sfc_main$1, { __name: "ChatAssistantEditor" });
function useConversations() {
  useUpstreams();
  useGlobalEvents();
  const conversations = useState("conversations", () => []);
  const messages = useState("messages", () => []);
  const isLoading = useState("conversations-loading", () => false);
  const currentConversationId = useState("currentConversationId", () => null);
  const currentAssistantId = useState("currentAssistantId", () => null);
  const inputStates = useState("conversation-input-states", () => ({}));
  const streamingStates = useState("conversation-streaming-states", () => ({}));
  const streamingContent = useState("chat-streaming-content", () => "");
  const isStreaming = vueExports.computed(() => {
    if (!currentConversationId.value) return false;
    return streamingStates.value[currentConversationId.value]?.isStreaming ?? false;
  });
  const newConversationInputState = vueExports.ref({ content: "", uploadingFiles: [], showCompressHint: false });
  function getInputState(conversationId) {
    if (!conversationId) {
      return newConversationInputState.value;
    }
    if (!inputStates.value[conversationId]) {
      inputStates.value[conversationId] = { content: "", uploadingFiles: [], showCompressHint: false };
    }
    return inputStates.value[conversationId];
  }
  function updateInputContent(conversationId, content) {
    if (!conversationId) {
      newConversationInputState.value.content = content;
      return;
    }
    if (!inputStates.value[conversationId]) {
      inputStates.value[conversationId] = { content: "", uploadingFiles: [], showCompressHint: false };
    }
    inputStates.value[conversationId].content = content;
  }
  function updateUploadingFiles(conversationId, files) {
    if (!conversationId) {
      newConversationInputState.value.uploadingFiles = files;
      return;
    }
    if (!inputStates.value[conversationId]) {
      inputStates.value[conversationId] = { content: "", uploadingFiles: [], showCompressHint: false };
    }
    inputStates.value[conversationId].uploadingFiles = files;
  }
  function updateCompressHint(conversationId, show) {
    if (!conversationId) {
      newConversationInputState.value.showCompressHint = show;
      return;
    }
    if (!inputStates.value[conversationId]) {
      inputStates.value[conversationId] = { content: "", uploadingFiles: [], showCompressHint: false };
    }
    inputStates.value[conversationId].showCompressHint = show;
  }
  function clearInputState(conversationId) {
    if (!conversationId) return;
    if (inputStates.value[conversationId]) {
      for (const file of inputStates.value[conversationId].uploadingFiles) {
        if (file.previewUrl) {
          URL.revokeObjectURL(file.previewUrl);
        }
      }
      inputStates.value[conversationId] = { content: "", uploadingFiles: [], showCompressHint: false };
    }
  }
  let contentBuffer = "";
  let displayedContent = "";
  let streamingMessageId = -1;
  let streamingConversationId = null;
  function getStreamingMessage() {
    if (currentConversationId.value !== streamingConversationId) {
      return void 0;
    }
    return messages.value.find((m) => m.id === streamingMessageId);
  }
  function flushTyping() {
    displayedContent = contentBuffer;
    streamingContent.value = displayedContent;
    const targetMessage = getStreamingMessage();
    if (targetMessage?.role === "assistant" && targetMessage.mark !== "error") {
      targetMessage.content = displayedContent;
    }
  }
  function startStreamingState(messageId, conversationId, initialContent) {
    const existingContent = initialContent ?? "";
    streamingStates.value[conversationId] = {
      isStreaming: true,
      messageId,
      content: existingContent,
      contentBuffer: existingContent,
      displayedContent: existingContent
    };
    streamingMessageId = messageId;
    streamingConversationId = conversationId;
    contentBuffer = existingContent;
    displayedContent = existingContent;
    streamingContent.value = existingContent;
  }
  function endStreamingState(conversationId) {
    flushTyping();
    if (streamingStates.value[conversationId]) {
      streamingStates.value[conversationId].isStreaming = false;
    }
    streamingContent.value = "";
    contentBuffer = "";
    displayedContent = "";
    streamingMessageId = -1;
    streamingConversationId = null;
  }
  const currentConversation = vueExports.computed(() => {
    if (currentConversationId.value) {
      return conversations.value.find((c) => c.id === currentConversationId.value);
    }
    return null;
  });
  async function loadConversations(assistantId) {
    isLoading.value = true;
    currentAssistantId.value = assistantId;
    try {
      const result = await $fetch("/api/conversations", {
        query: { assistantId }
      });
      conversations.value = result;
      currentConversationId.value = null;
      messages.value = [];
    } catch (error) {
      console.error("加载对话列表失败:", error);
    } finally {
      isLoading.value = false;
    }
  }
  async function selectConversation(id) {
    currentConversationId.value = id;
    try {
      const result = await $fetch(`/api/conversations/${id}`);
      messages.value = result.messages;
      const streamingMsg = result.messages.find(
        (m) => m.role === "assistant" && (m.status === "created" || m.status === "pending" || m.status === "streaming")
      );
      if (streamingMsg) {
        startStreamingState(streamingMsg.id, id, streamingMsg.content || "");
      }
    } catch (error) {
      console.error("加载对话详情失败:", error);
      messages.value = [];
    }
  }
  async function createConversation(assistantId, title) {
    const conversation = await $fetch("/api/conversations", {
      method: "POST",
      body: { assistantId, title }
    });
    currentConversationId.value = conversation.id;
    messages.value = [];
    return conversation;
  }
  async function updateConversationTitle(id, title) {
    const updated = await $fetch(`/api/conversations/${id}`, {
      method: "PUT",
      body: { title }
    });
    return updated;
  }
  async function deleteConversation(id) {
    await $fetch(`/api/conversations/${id}`, {
      method: "DELETE"
    });
  }
  function startNewConversation() {
    currentConversationId.value = null;
    messages.value = [];
  }
  async function sendMessage(conversationId, content, files, modelName) {
    try {
      await $fetch(`/api/conversations/${conversationId}/messages`, {
        method: "POST",
        body: { content, files }
      });
      const conversation = conversations.value.find((c) => c.id === conversationId);
      if (conversation) {
        conversation.updatedAt = (/* @__PURE__ */ new Date()).toISOString();
      }
    } catch (error) {
      const errorMessage = {
        id: Date.now() + 1,
        conversationId,
        role: "assistant",
        content: error.message || "发送失败",
        upstreamId: null,
        aimodelId: null,
        modelName: null,
        createdAt: (/* @__PURE__ */ new Date()).toISOString(),
        mark: "error",
        status: "failed"
      };
      messages.value.push(errorMessage);
    }
  }
  async function deleteMessage(id) {
    await $fetch(`/api/messages/${id}`, {
      method: "DELETE"
    });
  }
  async function editMessage(id, content) {
    await $fetch(`/api/messages/${id}`, {
      method: "PATCH",
      body: { content }
    });
  }
  async function replayMessage(message) {
    try {
      await $fetch(`/api/messages/${message.id}/replay`, {
        method: "POST"
      });
    } catch (error) {
      const errorMessage = {
        id: Date.now(),
        conversationId: message.conversationId,
        role: "assistant",
        content: error.message || "重放失败",
        upstreamId: null,
        aimodelId: null,
        modelName: null,
        createdAt: (/* @__PURE__ */ new Date()).toISOString(),
        mark: "error",
        status: "failed"
      };
      messages.value.push(errorMessage);
    }
  }
  function cleanup() {
    stopStreaming();
    conversations.value = [];
    messages.value = [];
    currentConversationId.value = null;
    for (const convId in inputStates.value) {
      const state = inputStates.value[convId];
      for (const file of state.uploadingFiles) {
        if (file.previewUrl) {
          URL.revokeObjectURL(file.previewUrl);
        }
      }
    }
    inputStates.value = {};
    streamingStates.value = {};
    streamingContent.value = "";
    contentBuffer = "";
    displayedContent = "";
  }
  async function addManualMessage(conversationId, content, role) {
    const message = await $fetch(`/api/conversations/${conversationId}/messages-manual`, {
      method: "POST",
      body: { content, role }
    });
    const conversation = conversations.value.find((c) => c.id === conversationId);
    if (conversation) {
      conversation.updatedAt = (/* @__PURE__ */ new Date()).toISOString();
    }
    return message;
  }
  async function stopStreaming(conversationId) {
    const convId = conversationId ?? currentConversationId.value;
    if (streamingMessageId > 0) {
      try {
        await $fetch(`/api/messages/${streamingMessageId}/stop`, {
          method: "POST"
        });
      } catch (error) {
        console.error("停止生成失败:", error);
      }
    }
    flushTyping();
    const targetMessage = getStreamingMessage();
    if (targetMessage) {
      targetMessage.status = "stopped";
    }
    if (convId) {
      endStreamingState(convId);
    }
  }
  async function forkConversation(messageId) {
    const result = await $fetch(`/api/messages/${messageId}/fork`, {
      method: "POST"
    });
    return result.conversation;
  }
  async function deleteMessagesUntil(messageId) {
    const result = await $fetch(`/api/messages/${messageId}/delete-until`, {
      method: "POST"
    });
    return result.deletedCount;
  }
  async function compressConversation(conversationId, modelName, onStart) {
    const result = await $fetch(`/api/conversations/${conversationId}/compress`, {
      method: "POST"
    });
    const data = await $fetch(`/api/conversations/${conversationId}`);
    messages.value = data.messages;
    onStart?.();
    await $fetch(`/api/conversations/${conversationId}/messages`, {
      method: "POST",
      body: {
        content: result.compressRequest.content,
        isCompressRequest: true
      }
    });
    return result.stats;
  }
  return {
    conversations,
    messages,
    isLoading,
    currentConversationId,
    currentConversation,
    isStreaming,
    streamingContent,
    loadConversations,
    selectConversation,
    createConversation,
    startNewConversation,
    updateConversationTitle,
    deleteConversation,
    sendMessage,
    deleteMessage,
    editMessage,
    replayMessage,
    cleanup,
    addManualMessage,
    stopStreaming,
    forkConversation,
    deleteMessagesUntil,
    compressConversation,
    // 输入状态管理
    getInputState,
    updateInputContent,
    updateUploadingFiles,
    updateCompressHint,
    clearInputState
  };
}
const _sfc_main = /* @__PURE__ */ vueExports.defineComponent({
  __name: "chat",
  __ssrInlineRender: true,
  setup(__props) {
    const toast = useToast();
    const router = useRouter();
    useRoute$1();
    const showLeftDrawer = vueExports.ref(false);
    const showRightDrawer = vueExports.ref(false);
    const {
      assistants,
      currentAssistantId,
      currentAssistant,
      selectAssistant,
      createAssistant,
      updateAssistant,
      deleteAssistant,
      incrementConversationCount,
      decrementConversationCount
    } = useAssistants();
    const {
      conversations,
      messages,
      currentConversationId,
      currentConversation,
      isStreaming,
      loadConversations,
      selectConversation,
      createConversation,
      startNewConversation,
      deleteConversation,
      updateConversationTitle,
      sendMessage,
      deleteMessage,
      editMessage,
      replayMessage,
      addManualMessage,
      stopStreaming,
      forkConversation,
      deleteMessagesUntil,
      compressConversation,
      // 输入状态管理
      getInputState,
      updateInputContent,
      updateUploadingFiles,
      updateCompressHint
    } = useConversations();
    const currentInputState = vueExports.computed(() => getInputState(currentConversationId.value));
    const { upstreams } = useUpstreams();
    const currentEstimatedTime = vueExports.computed(() => {
      if (!currentAssistant.value?.upstreamId || !currentAssistant.value?.aimodelId) {
        return null;
      }
      const upstream = upstreams.value.find((u) => u.id === currentAssistant.value?.upstreamId);
      if (!upstream) return null;
      const aimodel = upstream.aimodels?.find((m) => m.id === currentAssistant.value?.aimodelId);
      return aimodel?.estimatedTime ?? null;
    });
    const showAssistantEditor = vueExports.ref(false);
    const editingAssistant = vueExports.ref(null);
    const messageListRef = vueExports.ref(null);
    function updateUrlParams(assistantId, conversationId) {
      const query = {};
      if (assistantId) query.a = String(assistantId);
      if (conversationId) query.c = String(conversationId);
      router.replace({ query });
    }
    const initialized = vueExports.ref(false);
    vueExports.watch(currentAssistantId, async (id, oldId) => {
      if (!initialized.value) return;
      if (id && id !== oldId) {
        await loadConversations(id);
      }
    });
    async function handleSelectAssistant(id) {
      selectAssistant(id);
      updateUrlParams(id, null);
      showLeftDrawer.value = false;
    }
    function handleCreateAssistant() {
      editingAssistant.value = null;
      showAssistantEditor.value = true;
    }
    function handleEditAssistant() {
      editingAssistant.value = currentAssistant.value || null;
      showAssistantEditor.value = true;
    }
    async function handleSaveAssistant(data) {
      try {
        if (editingAssistant.value) {
          await updateAssistant(editingAssistant.value.id, data);
          toast.add({ title: "助手已更新", color: "success" });
        } else {
          const assistant = await createAssistant(data);
          selectAssistant(assistant.id);
          updateUrlParams(assistant.id, null);
          toast.add({ title: "助手已创建", color: "success" });
        }
        showAssistantEditor.value = false;
      } catch (error) {
        toast.add({ title: error.message || "操作失败", color: "error" });
      }
    }
    async function handleDeleteAssistant(id) {
      try {
        await deleteAssistant(id);
        showAssistantEditor.value = false;
        toast.add({ title: "助手已删除", color: "success" });
        if (currentAssistantId.value) {
          updateUrlParams(currentAssistantId.value, null);
        }
      } catch (error) {
        toast.add({ title: error.message || "删除失败", color: "error" });
      }
    }
    function handleCreateConversation() {
      if (!currentAssistantId.value) return;
      startNewConversation();
      updateUrlParams(currentAssistantId.value, null);
    }
    async function handleSelectConversation(id) {
      await selectConversation(id);
      updateUrlParams(currentAssistantId.value, id);
      showRightDrawer.value = false;
    }
    async function handleDeleteConversation(id) {
      const conversation = conversations.value.find((c) => c.id === id);
      const assistantId = conversation?.assistantId;
      const isCurrentConversation = currentConversationId.value === id;
      try {
        await deleteConversation(id);
        toast.add({ title: "对话已删除", color: "success" });
        if (assistantId) {
          decrementConversationCount(assistantId);
        }
        if (isCurrentConversation) {
          updateUrlParams(currentAssistantId.value, null);
        }
      } catch (error) {
        toast.add({ title: error.message || "删除失败", color: "error" });
      }
    }
    async function handleRenameConversation(id, title) {
      try {
        await updateConversationTitle(id, title);
        toast.add({ title: "对话已重命名", color: "success" });
      } catch (error) {
        toast.add({ title: error.message || "重命名失败", color: "error" });
      }
    }
    async function handleGenerateTitle(id) {
      try {
        toast.add({ title: "正在生成标题...", color: "info" });
        const result = await $fetch(`/api/conversations/${id}/generate-title`, {
          method: "POST"
        });
        const conversation = conversations.value.find((c) => c.id === id);
        if (conversation) {
          conversation.title = result.title;
        }
        toast.add({ title: "标题已更新", color: "success" });
      } catch (error) {
        toast.add({ title: error.message || "生成标题失败", color: "error" });
      }
    }
    async function handleDeleteMessage(id) {
      try {
        await deleteMessage(id);
        toast.add({ title: "消息已删除", color: "success" });
      } catch (error) {
        toast.add({ title: error.message || "删除失败", color: "error" });
      }
    }
    async function handleReplayMessage(message) {
      try {
        await replayMessage(message);
      } catch (error) {
        toast.add({ title: error.message || "重放失败", color: "error" });
      }
    }
    async function handleEditMessage(id, content) {
      try {
        await editMessage(id, content);
      } catch (error) {
        toast.add({ title: error.message || "编辑失败", color: "error" });
      }
    }
    async function handleForkMessage(messageId) {
      try {
        const newConversation = await forkConversation(messageId);
        await selectConversation(newConversation.id);
        updateUrlParams(currentAssistantId.value, newConversation.id);
        toast.add({ title: "已创建分叉对话", color: "success" });
      } catch (error) {
        toast.add({ title: error.message || "分叉失败", color: "error" });
      }
    }
    async function handleDeleteUntilMessage(messageId) {
      try {
        const count = await deleteMessagesUntil(messageId);
        toast.add({ title: `已删除 ${count} 条消息`, color: "success" });
      } catch (error) {
        toast.add({ title: error.message || "删除失败", color: "error" });
      }
    }
    async function handleSendMessage(content, files) {
      let conversationId = currentConversationId.value;
      if (!conversationId && currentAssistantId.value) {
        try {
          const title = content?.slice(0, 20) || files?.[0]?.name?.slice(0, 20) || "新对话";
          const conversation = await createConversation(currentAssistantId.value, title);
          conversationId = conversation.id;
          incrementConversationCount(currentAssistantId.value);
          updateUrlParams(currentAssistantId.value, conversationId);
        } catch (error) {
          toast.add({ title: error.message || "创建对话失败", color: "error" });
          return;
        }
      }
      if (!conversationId) return;
      try {
        await sendMessage(conversationId, content, files, currentAssistant.value?.modelName);
      } catch (error) {
        toast.add({ title: error.message || "发送失败", color: "error" });
      }
    }
    async function handleAddMessage(content, role) {
      let conversationId = currentConversationId.value;
      if (!conversationId && currentAssistantId.value) {
        try {
          const conversation = await createConversation(currentAssistantId.value, content.slice(0, 20));
          conversationId = conversation.id;
          incrementConversationCount(currentAssistantId.value);
          updateUrlParams(currentAssistantId.value, conversationId);
        } catch (error) {
          toast.add({ title: error.message || "创建对话失败", color: "error" });
          return;
        }
      }
      if (!conversationId) return;
      try {
        await addManualMessage(conversationId, content, role);
        toast.add({ title: `已添加${role === "user" ? "用户" : "AI"}消息`, color: "success" });
      } catch (error) {
        toast.add({ title: error.message || "添加失败", color: "error" });
      }
    }
    function handleStop() {
      stopStreaming();
      toast.add({ title: "已停止生成", color: "info" });
    }
    async function handleCompress() {
      if (!currentConversationId.value) return;
      try {
        const stats = await compressConversation(
          currentConversationId.value,
          currentAssistant.value?.modelName,
          // 开始回调：跳转到压缩位置
          () => {
            vueExports.nextTick(() => {
              messageListRef.value?.scrollToCompressRequest();
            });
          }
        );
        if (stats) {
          toast.add({
            title: `已压缩 ${stats.messagesToCompressCount} 条消息`,
            color: "success"
          });
        }
      } catch (error) {
        toast.add({ title: error.message || "压缩失败", color: "error" });
      }
    }
    async function handleUpdateModel(upstreamId, aimodelId) {
      if (!currentAssistant.value) return;
      const upstream = upstreams.value.find((u) => u.id === upstreamId);
      const aimodel = upstream?.aimodels?.find((m) => m.id === aimodelId);
      const modelName = aimodel?.modelName || null;
      try {
        await updateAssistant(currentAssistant.value.id, {
          upstreamId,
          aimodelId,
          modelName
        });
      } catch (error) {
        toast.add({ title: error.message || "更新失败", color: "error" });
      }
    }
    function handleScrollToCompress() {
      messageListRef.value?.scrollToCompressRequest();
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UButton = _sfc_main$8$1;
      const _component_UIcon = _sfc_main$d;
      const _component_ChatAssistantList = __nuxt_component_2;
      const _component_ChatMessageList = __nuxt_component_3;
      const _component_ChatMessageInput = __nuxt_component_4;
      const _component_ChatAssistantInfo = __nuxt_component_5;
      const _component_ChatConversationList = __nuxt_component_6;
      const _component_UDrawer = _sfc_main$a;
      const _component_ChatAssistantEditor = __nuxt_component_8;
      _push(`<div${serverRenderer_cjs_prodExports.ssrRenderAttrs(vueExports.mergeProps({ class: "h-[calc(100vh-3.5rem)] flex flex-col overflow-hidden" }, _attrs))}><div class="h-12 flex items-center px-4 border-b border-(--ui-border) bg-(--ui-bg-elevated) flex-shrink-0 lg:hidden">`);
      _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UButton, {
        variant: "ghost",
        size: "sm",
        onClick: ($event) => showLeftDrawer.value = true
      }, {
        default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-bars-3",
              class: "w-5 h-5"
            }, null, _parent2, _scopeId));
            _push2(`<span class="ml-1"${_scopeId}>助手</span>`);
          } else {
            return [
              vueExports.createVNode(_component_UIcon, {
                name: "i-heroicons-bars-3",
                class: "w-5 h-5"
              }),
              vueExports.createVNode("span", { class: "ml-1" }, "助手")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<span class="flex-1 text-center truncate font-medium text-sm">${serverRenderer_cjs_prodExports.ssrInterpolate(vueExports.unref(currentConversation)?.title || vueExports.unref(currentAssistant)?.name || "选择助手")}</span>`);
      _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UButton, {
        variant: "ghost",
        size: "sm",
        onClick: ($event) => showRightDrawer.value = true
      }, {
        default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="mr-1"${_scopeId}>对话</span>`);
            _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-chat-bubble-left-right",
              class: "w-5 h-5"
            }, null, _parent2, _scopeId));
          } else {
            return [
              vueExports.createVNode("span", { class: "mr-1" }, "对话"),
              vueExports.createVNode(_component_UIcon, {
                name: "i-heroicons-chat-bubble-left-right",
                class: "w-5 h-5"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="flex-1 flex overflow-hidden min-h-0"><div class="w-[300px] flex-shrink-0 overflow-y-auto border-r border-(--ui-border) hidden lg:block">`);
      _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_ChatAssistantList, {
        assistants: vueExports.unref(assistants),
        "current-assistant-id": vueExports.unref(currentAssistantId),
        onSelect: handleSelectAssistant,
        onCreate: handleCreateAssistant
      }, null, _parent));
      _push(`</div><div class="flex-1 flex flex-col min-w-0 min-h-0">`);
      if (vueExports.unref(currentConversation)) {
        _push(`<div class="h-12 items-center px-4 border-b border-(--ui-border) bg-(--ui-bg-elevated) flex-shrink-0 hidden lg:flex"><span class="font-medium truncate">${serverRenderer_cjs_prodExports.ssrInterpolate(vueExports.unref(currentConversation).title)}</span></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_ChatMessageList, {
        ref_key: "messageListRef",
        ref: messageListRef,
        messages: vueExports.unref(messages),
        "is-streaming": vueExports.unref(isStreaming),
        "assistant-id": vueExports.unref(currentAssistantId),
        "estimated-time": vueExports.unref(currentEstimatedTime),
        class: "flex-1 min-h-0",
        onDelete: handleDeleteMessage,
        onEdit: handleEditMessage,
        onFork: handleForkMessage,
        onDeleteUntil: handleDeleteUntilMessage,
        onReplay: handleReplayMessage,
        onStop: handleStop,
        onSendSuggestion: handleSendMessage
      }, null, _parent));
      _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_ChatMessageInput, {
        upstreams: vueExports.unref(upstreams),
        "current-upstream-id": vueExports.unref(currentAssistant)?.upstreamId || null,
        "current-aimodel-id": vueExports.unref(currentAssistant)?.aimodelId || null,
        disabled: !vueExports.unref(currentAssistant),
        "is-streaming": vueExports.unref(isStreaming),
        messages: vueExports.unref(messages),
        "system-prompt": vueExports.unref(currentAssistant)?.systemPrompt,
        content: vueExports.unref(currentInputState).content,
        "uploading-files": vueExports.unref(currentInputState).uploadingFiles,
        "show-compress-hint": vueExports.unref(currentInputState).showCompressHint,
        onSend: handleSendMessage,
        onAddMessage: handleAddMessage,
        onStop: handleStop,
        onCompress: handleCompress,
        onUpdateModel: handleUpdateModel,
        onScrollToCompress: handleScrollToCompress,
        "onUpdate:content": ($event) => vueExports.unref(updateInputContent)(vueExports.unref(currentConversationId), $event),
        "onUpdate:uploadingFiles": ($event) => vueExports.unref(updateUploadingFiles)(vueExports.unref(currentConversationId), $event),
        "onUpdate:showCompressHint": ($event) => vueExports.unref(updateCompressHint)(vueExports.unref(currentConversationId), $event)
      }, null, _parent));
      _push(`</div><div class="w-[310px] flex-shrink-0 flex-col overflow-hidden bg-(--ui-bg-elevated) border-l border-(--ui-border) hidden lg:flex">`);
      _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_ChatAssistantInfo, {
        assistant: vueExports.unref(currentAssistant),
        onEdit: handleEditAssistant
      }, null, _parent));
      _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_ChatConversationList, {
        conversations: vueExports.unref(conversations),
        "current-conversation-id": vueExports.unref(currentConversationId),
        class: "flex-1 min-h-0",
        onSelect: handleSelectConversation,
        onCreate: handleCreateConversation,
        onDelete: handleDeleteConversation,
        onRename: handleRenameConversation,
        onGenerateTitle: handleGenerateTitle
      }, null, _parent));
      _push(`</div></div>`);
      _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UDrawer, {
        open: vueExports.unref(showLeftDrawer),
        "onUpdate:open": ($event) => vueExports.isRef(showLeftDrawer) ? showLeftDrawer.value = $event : null,
        direction: "left",
        title: "助手列表",
        ui: { content: "w-4/5" }
      }, {
        body: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_ChatAssistantList, {
              assistants: vueExports.unref(assistants),
              "current-assistant-id": vueExports.unref(currentAssistantId),
              class: "h-full",
              onSelect: handleSelectAssistant,
              onCreate: handleCreateAssistant
            }, null, _parent2, _scopeId));
          } else {
            return [
              vueExports.createVNode(_component_ChatAssistantList, {
                assistants: vueExports.unref(assistants),
                "current-assistant-id": vueExports.unref(currentAssistantId),
                class: "h-full",
                onSelect: handleSelectAssistant,
                onCreate: handleCreateAssistant
              }, null, 8, ["assistants", "current-assistant-id"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UDrawer, {
        open: vueExports.unref(showRightDrawer),
        "onUpdate:open": ($event) => vueExports.isRef(showRightDrawer) ? showRightDrawer.value = $event : null,
        direction: "right",
        title: "对话",
        ui: { content: "w-4/5" }
      }, {
        body: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex flex-col h-full"${_scopeId}>`);
            _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_ChatAssistantInfo, {
              assistant: vueExports.unref(currentAssistant),
              onEdit: handleEditAssistant
            }, null, _parent2, _scopeId));
            _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_ChatConversationList, {
              conversations: vueExports.unref(conversations),
              "current-conversation-id": vueExports.unref(currentConversationId),
              class: "flex-1 min-h-0",
              onSelect: handleSelectConversation,
              onCreate: handleCreateConversation,
              onDelete: handleDeleteConversation,
              onRename: handleRenameConversation,
              onGenerateTitle: handleGenerateTitle
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              vueExports.createVNode("div", { class: "flex flex-col h-full" }, [
                vueExports.createVNode(_component_ChatAssistantInfo, {
                  assistant: vueExports.unref(currentAssistant),
                  onEdit: handleEditAssistant
                }, null, 8, ["assistant"]),
                vueExports.createVNode(_component_ChatConversationList, {
                  conversations: vueExports.unref(conversations),
                  "current-conversation-id": vueExports.unref(currentConversationId),
                  class: "flex-1 min-h-0",
                  onSelect: handleSelectConversation,
                  onCreate: handleCreateConversation,
                  onDelete: handleDeleteConversation,
                  onRename: handleRenameConversation,
                  onGenerateTitle: handleGenerateTitle
                }, null, 8, ["conversations", "current-conversation-id"])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_ChatAssistantEditor, {
        open: vueExports.unref(showAssistantEditor),
        "onUpdate:open": ($event) => vueExports.isRef(showAssistantEditor) ? showAssistantEditor.value = $event : null,
        assistant: vueExports.unref(editingAssistant),
        upstreams: vueExports.unref(upstreams),
        onSave: handleSaveAssistant,
        onDelete: handleDeleteAssistant
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = vueExports.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/chat.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=chat-3pMqQju8.mjs.map
