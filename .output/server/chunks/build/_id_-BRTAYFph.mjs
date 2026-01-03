import { _ as _export_sfc, v as vueExports, i as useRoute$1, h as useRouter, g as useToast, s as serverRenderer_cjs_prodExports, c as _sfc_main$8, b as _sfc_main$d, A as __nuxt_component_1$1 } from './server.mjs';
import { _ as _sfc_main$1 } from './DropdownMenu-D_kNtRd4.mjs';
import { useVueFlow } from '@vue-flow/core';
import { u as useAuth } from './useAuth-xXrD8D6Y.mjs';
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
import './PopperArrow-_X1u5CFX.mjs';
import './RovingFocusGroup-CN9Tim1l.mjs';
import './utils-DCnNb5Bf.mjs';
import './index--6aaawBa.mjs';

const _sfc_main = /* @__PURE__ */ vueExports.defineComponent({
  __name: "[id]",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute$1();
    const router = useRouter();
    const toast = useToast();
    const { getAuthHeader } = useAuth();
    useUpstreams();
    const runId = vueExports.computed(() => Number(route.params.id));
    const run = vueExports.ref(null);
    const runNodes = vueExports.ref(/* @__PURE__ */ new Map());
    vueExports.ref(null);
    const isLoading = vueExports.ref(true);
    vueExports.ref([]);
    vueExports.ref([]);
    const { fitView } = useVueFlow();
    const runModeOptions = [
      { value: "normal", label: "普通模式", description: "自动执行所有节点" },
      { value: "step", label: "单步模式", description: "每个节点执行后暂停" }
    ];
    async function changeRunMode(mode) {
      if (!run.value || run.value.runMode === mode) return;
      try {
        await $fetch(`/api/workflow-runs/${runId.value}`, {
          method: "PATCH",
          body: { runMode: mode }
        });
        run.value.runMode = mode;
        toast.add({ title: `已切换到${mode === "normal" ? "普通" : "单步"}模式`, color: "success" });
      } catch (error) {
        toast.add({ title: "切换模式失败", description: error.data?.message, color: "error" });
      }
    }
    async function continueRun() {
      try {
        await $fetch(`/api/workflow-runs/${runId.value}/continue`, {
          method: "POST"
        });
        toast.add({ title: "继续执行中", color: "info" });
      } catch (error) {
        toast.add({ title: "继续执行失败", description: error.data?.message, color: "error" });
      }
    }
    async function retryRun() {
      try {
        await $fetch(`/api/workflow-runs/${runId.value}/retry`, {
          method: "POST"
        });
        toast.add({ title: "重新执行中", color: "info" });
      } catch (error) {
        toast.add({ title: "重试失败", description: error.data?.message, color: "error" });
      }
    }
    async function cancelRun() {
      try {
        await $fetch(`/api/workflow-runs/${runId.value}/cancel`, {
          method: "POST"
        });
        toast.add({ title: "已取消执行", color: "warning" });
      } catch (error) {
        toast.add({ title: "取消失败", description: error.data?.message, color: "error" });
      }
    }
    function goToEdit() {
      if (run.value?.workflowId) {
        router.push(`/workflow/${run.value.workflowId}`);
      }
    }
    const statusLabels = {
      pending: "等待中",
      running: "运行中",
      paused: "已暂停",
      completed: "已完成",
      failed: "失败",
      cancelled: "已取消"
    };
    const statusColors = {
      pending: "text-(--ui-text-muted)",
      running: "text-blue-500",
      paused: "text-yellow-500",
      completed: "text-green-500",
      failed: "text-red-500",
      cancelled: "text-gray-500"
    };
    const statusIcons = {
      pending: "i-heroicons-clock",
      running: "i-heroicons-arrow-path",
      paused: "i-heroicons-pause-circle",
      completed: "i-heroicons-check-circle",
      failed: "i-heroicons-x-circle",
      cancelled: "i-heroicons-stop-circle"
    };
    const canContinue = vueExports.computed(() => run.value?.status === "paused");
    const canCancel = vueExports.computed(() => run.value?.status === "running");
    const canRetry = vueExports.computed(() => ["failed", "cancelled", "completed"].includes(run.value?.status || ""));
    const canExecuteNode = vueExports.computed(() => ["paused", "failed", "cancelled", "completed"].includes(run.value?.status || ""));
    let abortController = null;
    async function subscribeSSE() {
      if (abortController) {
        abortController.abort();
      }
      abortController = new AbortController();
      try {
        const response = await fetch(`/api/workflow-runs/${runId.value}/events`, {
          signal: abortController.signal,
          headers: getAuthHeader()
        });
        if (!response.ok) {
          throw new Error("订阅失败");
        }
        const reader = response.body?.getReader();
        if (!reader) throw new Error("无法读取响应");
        const decoder = new TextDecoder();
        let buffer = "";
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() || "";
          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed || !trimmed.startsWith("data:")) continue;
            const data = trimmed.slice(5).trim();
            try {
              const parsed = JSON.parse(data);
              handleSSEEvent(parsed);
            } catch {
            }
          }
        }
      } catch (error) {
        if (error.name === "AbortError") {
          return;
        }
        console.error("SSE 订阅错误:", error);
        setTimeout(() => {
          if (run.value?.status === "running" || run.value?.status === "pending") {
            subscribeSSE();
          }
        }, 5e3);
      }
    }
    function handleSSEEvent(data) {
      switch (data.type) {
        case "run_status":
          if (run.value) {
            run.value.status = data.status;
          }
          break;
        case "run_mode_changed":
          if (run.value) {
            run.value.runMode = data.runMode;
          }
          break;
        case "run_node_status": {
          const existing = runNodes.value.get(data.nodeId);
          if (existing) {
            existing.status = data.status;
            if (data.outputs) existing.outputs = data.outputs;
            if (data.error) existing.error = data.error;
          } else {
            runNodes.value.set(data.nodeId, {
              id: 0,
              runId: runId.value,
              nodeId: data.nodeId,
              status: data.status,
              outputs: data.outputs,
              error: data.error,
              inputs: null,
              startedAt: null,
              completedAt: null,
              createdAt: /* @__PURE__ */ new Date()
            });
          }
          break;
        }
      }
    }
    function cleanupSSE() {
      if (abortController) {
        abortController.abort();
        abortController = null;
      }
    }
    vueExports.watch(() => run.value?.status, (status, oldStatus) => {
      if (status === "running" || status === "pending") {
        subscribeSSE();
      } else if (oldStatus === "running" || oldStatus === "pending") {
        setTimeout(() => {
          if (run.value?.status !== "running" && run.value?.status !== "pending") {
            cleanupSSE();
          }
        }, 2e3);
      }
    }, { immediate: true });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UButton = _sfc_main$8;
      const _component_UIcon = _sfc_main$d;
      const _component_UDropdownMenu = _sfc_main$1;
      const _component_ClientOnly = __nuxt_component_1$1;
      _push(`<div${serverRenderer_cjs_prodExports.ssrRenderAttrs(vueExports.mergeProps({ class: "workflow-run-page flex flex-col h-[calc(100vh-56px)] bg-(--ui-bg) overflow-hidden" }, _attrs))} data-v-f7a92467><div class="toolbar flex items-center gap-3 px-4 py-2 border-b border-(--ui-border) bg-(--ui-bg-elevated)" data-v-f7a92467>`);
      _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UButton, {
        variant: "ghost",
        size: "sm",
        onClick: goToEdit
      }, {
        default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-arrow-left",
              class: "w-4 h-4 mr-1"
            }, null, _parent2, _scopeId));
            _push2(` 返回编辑 `);
          } else {
            return [
              vueExports.createVNode(_component_UIcon, {
                name: "i-heroicons-arrow-left",
                class: "w-4 h-4 mr-1"
              }),
              vueExports.createTextVNode(" 返回编辑 ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="h-4 w-px bg-(--ui-border)" data-v-f7a92467></div>`);
      if (vueExports.unref(canExecuteNode)) {
        _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UButton, {
          variant: "outline",
          size: "sm",
          onClick: continueRun,
          disabled: !vueExports.unref(canContinue)
        }, {
          default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UIcon, {
                name: "i-heroicons-play",
                class: "w-4 h-4 mr-1"
              }, null, _parent2, _scopeId));
              _push2(` 继续运行 `);
            } else {
              return [
                vueExports.createVNode(_component_UIcon, {
                  name: "i-heroicons-play",
                  class: "w-4 h-4 mr-1"
                }),
                vueExports.createTextVNode(" 继续运行 ")
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      if (vueExports.unref(canCancel)) {
        _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UButton, {
          variant: "outline",
          size: "sm",
          color: "warning",
          onClick: cancelRun
        }, {
          default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UIcon, {
                name: "i-heroicons-stop",
                class: "w-4 h-4 mr-1"
              }, null, _parent2, _scopeId));
              _push2(` 中止 `);
            } else {
              return [
                vueExports.createVNode(_component_UIcon, {
                  name: "i-heroicons-stop",
                  class: "w-4 h-4 mr-1"
                }),
                vueExports.createTextVNode(" 中止 ")
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      if (vueExports.unref(canRetry)) {
        _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UButton, {
          variant: "outline",
          size: "sm",
          onClick: retryRun
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
      _push(`<div class="flex-1" data-v-f7a92467></div>`);
      _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UDropdownMenu, {
        items: runModeOptions.map((opt) => ({
          label: opt.label,
          click: () => changeRunMode(opt.value),
          active: vueExports.unref(run)?.runMode === opt.value
        }))
      }, {
        default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UButton, {
              variant: "ghost",
              size: "sm"
            }, {
              default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${serverRenderer_cjs_prodExports.ssrInterpolate(vueExports.unref(run)?.runMode === "step" ? "单步模式" : "普通模式")} `);
                  _push3(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UIcon, {
                    name: "i-heroicons-chevron-down",
                    class: "w-4 h-4 ml-1"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(run)?.runMode === "step" ? "单步模式" : "普通模式") + " ", 1),
                    vueExports.createVNode(_component_UIcon, {
                      name: "i-heroicons-chevron-down",
                      class: "w-4 h-4 ml-1"
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              vueExports.createVNode(_component_UButton, {
                variant: "ghost",
                size: "sm"
              }, {
                default: vueExports.withCtx(() => [
                  vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(run)?.runMode === "step" ? "单步模式" : "普通模式") + " ", 1),
                  vueExports.createVNode(_component_UIcon, {
                    name: "i-heroicons-chevron-down",
                    class: "w-4 h-4 ml-1"
                  })
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="h-4 w-px bg-(--ui-border)" data-v-f7a92467></div><div class="flex items-center gap-2 text-sm" data-v-f7a92467><span class="text-(--ui-text-muted)" data-v-f7a92467>Run #${serverRenderer_cjs_prodExports.ssrInterpolate(vueExports.unref(run)?.id)}</span>`);
      if (vueExports.unref(run)) {
        _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UIcon, {
          name: statusIcons[vueExports.unref(run).status],
          class: ["w-4 h-4", [statusColors[vueExports.unref(run).status], vueExports.unref(run).status === "running" && "animate-spin"]]
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (vueExports.unref(run)) {
        _push(`<span class="${serverRenderer_cjs_prodExports.ssrRenderClass(statusColors[vueExports.unref(run).status])}" data-v-f7a92467>${serverRenderer_cjs_prodExports.ssrInterpolate(statusLabels[vueExports.unref(run).status])}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div class="flex-1 flex min-h-0" data-v-f7a92467>`);
      if (vueExports.unref(isLoading)) {
        _push(`<div class="flex-1 flex items-center justify-center" data-v-f7a92467>`);
        _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-arrow-path",
          class: "w-8 h-8 animate-spin text-(--ui-text-muted)"
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_ClientOnly, null, {
          fallback: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="h-full w-full flex items-center justify-center" data-v-f7a92467${_scopeId}>`);
              _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UIcon, {
                name: "i-heroicons-arrow-path",
                class: "w-8 h-8 animate-spin text-zinc-500"
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              return [
                vueExports.createVNode("div", { class: "h-full w-full flex items-center justify-center" }, [
                  vueExports.createVNode(_component_UIcon, {
                    name: "i-heroicons-arrow-path",
                    class: "w-8 h-8 animate-spin text-zinc-500"
                  })
                ])
              ];
            }
          })
        }, _parent));
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = vueExports.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/workflow-run/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _id_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-f7a92467"]]);

export { _id_ as default };
//# sourceMappingURL=_id_-BRTAYFph.mjs.map
