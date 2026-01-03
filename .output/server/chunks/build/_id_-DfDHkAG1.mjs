import { _ as _export_sfc, v as vueExports, i as useRoute$1, h as useRouter, g as useToast, s as serverRenderer_cjs_prodExports, b as _sfc_main$d, A as __nuxt_component_1$1, c as _sfc_main$8 } from './server.mjs';
import { u as useTimeFormat } from './useTimeFormat-BGnNO3st.mjs';
import { useVueFlow } from '@vue-flow/core';
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

const _sfc_main$1 = /* @__PURE__ */ vueExports.defineComponent({
  __name: "Sidebar",
  __ssrInlineRender: true,
  props: {
    workflowName: {},
    runs: { default: () => [] },
    currentRunId: { default: null },
    hasChanges: { type: Boolean, default: false },
    isSaving: { type: Boolean, default: false },
    isCollapsed: { type: Boolean, default: false }
  },
  emits: ["run", "save", "select-run", "toggle-collapse"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    function getRunStatusIcon(status) {
      switch (status) {
        case "running":
          return "i-heroicons-arrow-path";
        case "paused":
          return "i-heroicons-pause-circle";
        case "completed":
          return "i-heroicons-check-circle";
        case "failed":
          return "i-heroicons-x-circle";
        case "cancelled":
          return "i-heroicons-stop-circle";
        default:
          return "i-heroicons-clock";
      }
    }
    function getRunStatusColor(status) {
      switch (status) {
        case "running":
          return "text-blue-500";
        case "paused":
          return "text-yellow-500";
        case "completed":
          return "text-green-500";
        case "failed":
          return "text-red-500";
        case "cancelled":
          return "text-gray-500";
        default:
          return "text-(--ui-text-muted)";
      }
    }
    const { formatTimeAgo } = useTimeFormat();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UButton = _sfc_main$8;
      const _component_UIcon = _sfc_main$d;
      _push(`<div${serverRenderer_cjs_prodExports.ssrRenderAttrs(vueExports.mergeProps({
        class: ["workflow-sidebar h-full flex flex-col border-r border-(--ui-border) bg-(--ui-bg-elevated) transition-all duration-200", __props.isCollapsed ? "w-12" : "w-[280px]"]
      }, _attrs))} data-v-6577234c>`);
      if (__props.isCollapsed) {
        _push(`<!--[--><div class="p-2" data-v-6577234c>`);
        _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UButton, {
          variant: "ghost",
          size: "sm",
          class: "w-full",
          onClick: ($event) => emit("toggle-collapse")
        }, {
          default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UIcon, {
                name: "i-heroicons-bars-3",
                class: "w-5 h-5"
              }, null, _parent2, _scopeId));
            } else {
              return [
                vueExports.createVNode(_component_UIcon, {
                  name: "i-heroicons-bars-3",
                  class: "w-5 h-5"
                })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div><div class="flex-1 flex items-center justify-center" data-v-6577234c><span class="text-xs font-medium text-(--ui-text-muted) writing-vertical-lr transform rotate-180 truncate max-h-32"${serverRenderer_cjs_prodExports.ssrRenderAttr("title", __props.workflowName)} data-v-6577234c>${serverRenderer_cjs_prodExports.ssrInterpolate(__props.workflowName)}</span></div><div class="p-2 space-y-2" data-v-6577234c>`);
        _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UButton, {
          color: "primary",
          size: "sm",
          class: "w-full",
          onClick: ($event) => emit("run")
        }, {
          default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UIcon, {
                name: "i-heroicons-play",
                class: "w-4 h-4"
              }, null, _parent2, _scopeId));
            } else {
              return [
                vueExports.createVNode(_component_UIcon, {
                  name: "i-heroicons-play",
                  class: "w-4 h-4"
                })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UButton, {
          variant: "outline",
          size: "sm",
          class: "w-full",
          loading: __props.isSaving,
          disabled: !__props.hasChanges,
          onClick: ($event) => emit("save")
        }, {
          default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UIcon, {
                name: "i-heroicons-cloud-arrow-up",
                class: "w-4 h-4"
              }, null, _parent2, _scopeId));
            } else {
              return [
                vueExports.createVNode(_component_UIcon, {
                  name: "i-heroicons-cloud-arrow-up",
                  class: "w-4 h-4"
                })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div><!--]-->`);
      } else {
        _push(`<!--[--><div class="p-3 border-b border-(--ui-border) flex items-center gap-2" data-v-6577234c><h2 class="flex-1 font-medium text-sm truncate"${serverRenderer_cjs_prodExports.ssrRenderAttr("title", __props.workflowName)} data-v-6577234c>${serverRenderer_cjs_prodExports.ssrInterpolate(__props.workflowName)}</h2>`);
        if (__props.hasChanges) {
          _push(`<span class="text-yellow-500 text-sm" data-v-6577234c>*</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UButton, {
          variant: "ghost",
          size: "xs",
          onClick: ($event) => emit("toggle-collapse")
        }, {
          default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UIcon, {
                name: "i-heroicons-chevron-left",
                class: "w-4 h-4"
              }, null, _parent2, _scopeId));
            } else {
              return [
                vueExports.createVNode(_component_UIcon, {
                  name: "i-heroicons-chevron-left",
                  class: "w-4 h-4"
                })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div><div class="p-3 border-b border-(--ui-border) flex gap-2" data-v-6577234c>`);
        _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UButton, {
          color: "primary",
          size: "sm",
          class: "flex-1",
          onClick: ($event) => emit("run")
        }, {
          default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UIcon, {
                name: "i-heroicons-play",
                class: "w-4 h-4 mr-1"
              }, null, _parent2, _scopeId));
              _push2(` 运行 `);
            } else {
              return [
                vueExports.createVNode(_component_UIcon, {
                  name: "i-heroicons-play",
                  class: "w-4 h-4 mr-1"
                }),
                vueExports.createTextVNode(" 运行 ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UButton, {
          variant: "outline",
          size: "sm",
          loading: __props.isSaving,
          disabled: !__props.hasChanges,
          onClick: ($event) => emit("save")
        }, {
          default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UIcon, {
                name: "i-heroicons-cloud-arrow-up",
                class: "w-4 h-4 mr-1"
              }, null, _parent2, _scopeId));
              _push2(` 保存 `);
            } else {
              return [
                vueExports.createVNode(_component_UIcon, {
                  name: "i-heroicons-cloud-arrow-up",
                  class: "w-4 h-4 mr-1"
                }),
                vueExports.createTextVNode(" 保存 ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div><div class="flex-1 overflow-hidden flex flex-col" data-v-6577234c><div class="px-3 py-2 text-xs font-medium text-(--ui-text-muted)" data-v-6577234c> 运行历史 </div><div class="flex-1 overflow-y-auto" data-v-6577234c>`);
        if (__props.runs.length === 0) {
          _push(`<div class="px-3 py-4 text-center text-sm text-(--ui-text-dimmed)" data-v-6577234c> 暂无运行记录 </div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--[-->`);
        serverRenderer_cjs_prodExports.ssrRenderList(__props.runs, (run) => {
          _push(`<div class="${serverRenderer_cjs_prodExports.ssrRenderClass([{ "bg-(--ui-bg-accented)": run.id === __props.currentRunId }, "px-3 py-2 cursor-pointer hover:bg-(--ui-bg-accented) transition-colors flex items-center gap-2"])}" data-v-6577234c>`);
          _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UIcon, {
            name: getRunStatusIcon(run.status),
            class: ["w-4 h-4 flex-shrink-0", [getRunStatusColor(run.status), run.status === "running" && "animate-spin"]]
          }, null, _parent));
          _push(`<span class="flex-1 text-sm truncate" data-v-6577234c> #${serverRenderer_cjs_prodExports.ssrInterpolate(run.id)}</span><span class="text-xs text-(--ui-text-dimmed)" data-v-6577234c>${serverRenderer_cjs_prodExports.ssrInterpolate(vueExports.unref(formatTimeAgo)(run.createdAt))}</span></div>`);
        });
        _push(`<!--]--></div></div><!--]-->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = vueExports.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/workflow/Sidebar.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$1, [["__scopeId", "data-v-6577234c"]]), { __name: "WorkflowSidebar" });
function useWorkflowExecution() {
  const nodeStates = vueExports.ref(/* @__PURE__ */ new Map());
  const pollingTasks = vueExports.ref(/* @__PURE__ */ new Map());
  const isExecuting = vueExports.ref(false);
  function getNodeState(nodeId) {
    return nodeStates.value.get(nodeId);
  }
  function updateNodeState(nodeId, state) {
    const current = nodeStates.value.get(nodeId) || { nodeId, status: "idle" };
    nodeStates.value.set(nodeId, { ...current, ...state });
  }
  function resetAllStates() {
    nodeStates.value.clear();
    pollingTasks.value.forEach((timeout) => clearTimeout(timeout));
    pollingTasks.value.clear();
    isExecuting.value = false;
  }
  async function pollTaskStatus(nodeId, taskId) {
    return new Promise((resolve) => {
      const poll = async () => {
        try {
          const task = await $fetch(`/api/tasks/${taskId}`);
          if (task.status === "success") {
            updateNodeState(nodeId, {
              status: "success",
              progress: 100,
              resultUrl: task.resourceUrl || void 0
            });
            pollingTasks.value.delete(taskId);
            resolve();
            return;
          }
          if (task.status === "failed" || task.status === "cancelled") {
            updateNodeState(nodeId, {
              status: "failed",
              error: task.error || "任务失败"
            });
            pollingTasks.value.delete(taskId);
            resolve();
            return;
          }
          if (task.progress) {
            const progress = parseInt(task.progress.replace("%", ""), 10) || 0;
            updateNodeState(nodeId, { progress });
          }
          const timeout = setTimeout(poll, 3e3);
          pollingTasks.value.set(taskId, timeout);
        } catch (error) {
          console.error("轮询任务失败:", error);
          const timeout = setTimeout(poll, 5e3);
          pollingTasks.value.set(taskId, timeout);
        }
      };
      poll();
    });
  }
  async function executeSingleNode(workflowId, nodeId) {
    updateNodeState(nodeId, { status: "pending" });
    try {
      const result = await $fetch(`/api/workflows/${workflowId}/run-node`, {
        method: "POST",
        body: { nodeId }
      });
      if (!result.success) {
        updateNodeState(nodeId, {
          status: "failed",
          error: "执行失败"
        });
        return;
      }
      const { data } = result;
      if (data.status === "failed") {
        updateNodeState(nodeId, {
          status: "failed",
          error: data.error || "执行失败"
        });
        return;
      }
      if (data.taskId) {
        updateNodeState(nodeId, {
          status: "processing",
          taskId: data.taskId
        });
        await pollTaskStatus(nodeId, data.taskId);
      }
    } catch (error) {
      updateNodeState(nodeId, {
        status: "failed",
        error: error.data?.message || error.message || "执行失败"
      });
    }
  }
  async function executeWorkflow(workflowId) {
    if (isExecuting.value) return;
    isExecuting.value = true;
    resetAllStates();
    try {
      const result = await $fetch(`/api/workflows/${workflowId}/run`, {
        method: "POST"
      });
      if (!result.success) {
        throw new Error("工作流执行失败");
      }
      const pollPromises = [];
      for (const nodeResult of result.data) {
        updateNodeState(nodeResult.nodeId, {
          status: nodeResult.status,
          taskId: nodeResult.taskId,
          error: nodeResult.error
        });
        if (nodeResult.taskId && nodeResult.status === "processing") {
          pollPromises.push(pollTaskStatus(nodeResult.nodeId, nodeResult.taskId));
        }
      }
      await Promise.all(pollPromises);
    } catch (error) {
      console.error("工作流执行失败:", error);
    } finally {
      isExecuting.value = false;
    }
  }
  function cleanup() {
    pollingTasks.value.forEach((timeout) => clearTimeout(timeout));
    pollingTasks.value.clear();
  }
  return {
    nodeStates,
    isExecuting,
    getNodeState,
    updateNodeState,
    resetAllStates,
    executeWorkflow,
    executeSingleNode,
    cleanup
  };
}
const _sfc_main = /* @__PURE__ */ vueExports.defineComponent({
  __name: "[id]",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute$1();
    const router = useRouter();
    const toast = useToast();
    useUpstreams();
    useWorkflowExecution();
    const workflowId = vueExports.computed(() => Number(route.params.id));
    const workflowInfo = vueExports.ref(null);
    const isLoading = vueExports.ref(true);
    const workflowData = vueExports.computed(() => workflowInfo.value?.workflow);
    const runs = vueExports.ref([]);
    const sidebarCollapsed = vueExports.ref(false);
    function toggleSidebar() {
      sidebarCollapsed.value = !sidebarCollapsed.value;
    }
    function handleSelectRun(runId) {
      router.push(`/workflow-run/${runId}`);
    }
    async function handleRun() {
      if (!workflowInfo.value) return;
      if (hasChanges.value) {
        await saveWorkflow();
      }
      try {
        const res = await $fetch(
          `/api/workflows/${workflowId.value}/run`,
          { method: "POST" }
        );
        router.push(`/workflow-run/${res.runId}`);
      } catch (error) {
        toast.add({ title: "运行失败", description: error.data?.message, color: "error" });
      }
    }
    const nodes = vueExports.ref([]);
    const edges = vueExports.ref([]);
    const { project, fitView, getViewport } = useVueFlow();
    vueExports.watch(workflowData, (data) => {
      if (data) {
        nodes.value = data.nodes.map((n) => ({
          ...n,
          data: { ...n.data }
        }));
        edges.value = data.edges.map((e) => ({
          ...e,
          animated: true,
          style: { stroke: "#60a5fa" }
        }));
        vueExports.nextTick(() => {
          setTimeout(() => fitView({ padding: 0.2 }), 100);
        });
      }
    }, { immediate: true });
    const isSaving = vueExports.ref(false);
    const hasChanges = vueExports.ref(false);
    const autoSave = vueExports.ref(false);
    let autoSaveTimer = null;
    vueExports.watch([nodes, edges], () => {
      hasChanges.value = true;
      if (autoSave.value && !isSaving.value) {
        if (autoSaveTimer) clearTimeout(autoSaveTimer);
        autoSaveTimer = setTimeout(() => {
          saveWorkflow();
        }, 2e3);
      }
    }, { deep: true });
    async function saveWorkflow() {
      if (!workflowInfo.value) return;
      isSaving.value = true;
      try {
        const viewport = getViewport();
        const data = {
          version: "1.0.0",
          name: workflowInfo.value.name,
          description: workflowInfo.value.description,
          nodes: nodes.value.map((n) => ({
            id: n.id,
            type: n.type,
            position: n.position,
            data: n.data
          })),
          edges: edges.value.map((e) => ({
            id: e.id,
            source: e.source,
            target: e.target,
            sourceHandle: e.sourceHandle,
            targetHandle: e.targetHandle
          })),
          viewport: {
            x: viewport.x,
            y: viewport.y,
            zoom: viewport.zoom
          }
        };
        await $fetch(`/api/workflows/${workflowId.value}`, {
          method: "PUT",
          body: { data }
        });
        hasChanges.value = false;
        toast.add({ title: "已保存", color: "success" });
      } catch (error) {
        toast.add({ title: "保存失败", description: error.data?.message, color: "error" });
      } finally {
        isSaving.value = false;
      }
    }
    const contextMenu = vueExports.ref({
      show: false,
      x: 0,
      y: 0,
      worldX: 0,
      worldY: 0
    });
    const nodeTypeOptions = [
      { type: "input-image", label: "图片输入", icon: "i-heroicons-photo" },
      { type: "gen-image", label: "AI 图像生成", icon: "i-heroicons-sparkles" },
      { type: "gen-video", label: "AI 视频生成", icon: "i-heroicons-film" },
      { type: "text-node", label: "文本节点", icon: "i-heroicons-document-text" },
      { type: "preview", label: "预览节点", icon: "i-heroicons-eye" }
    ];
    vueExports.ref(null);
    vueExports.ref(null);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_WorkflowSidebar = __nuxt_component_0;
      const _component_UIcon = _sfc_main$d;
      const _component_ClientOnly = __nuxt_component_1$1;
      _push(`<div${serverRenderer_cjs_prodExports.ssrRenderAttrs(vueExports.mergeProps({ class: "workflow-page flex h-[calc(100vh-56px)] bg-(--ui-bg) overflow-hidden" }, _attrs))} data-v-95d1d79f><input type="file" accept="image/*" class="hidden" data-v-95d1d79f>`);
      _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_WorkflowSidebar, {
        "workflow-name": vueExports.unref(workflowInfo)?.name || "工作流",
        runs: vueExports.unref(runs),
        "has-changes": vueExports.unref(hasChanges),
        "is-saving": vueExports.unref(isSaving),
        "is-collapsed": vueExports.unref(sidebarCollapsed),
        onRun: handleRun,
        onSave: saveWorkflow,
        onSelectRun: handleSelectRun,
        onToggleCollapse: toggleSidebar
      }, null, _parent));
      _push(`<div class="flex-1 flex flex-col min-w-0" data-v-95d1d79f>`);
      if (vueExports.unref(isLoading)) {
        _push(`<div class="flex-1 flex items-center justify-center" data-v-95d1d79f>`);
        _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-arrow-path",
          class: "w-8 h-8 animate-spin text-(--ui-text-muted)"
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_ClientOnly, null, {
          fallback: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="h-full w-full flex items-center justify-center" data-v-95d1d79f${_scopeId}>`);
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
      _push(`</div>`);
      serverRenderer_cjs_prodExports.ssrRenderTeleport(_push, (_push2) => {
        if (vueExports.unref(contextMenu).show) {
          _push2(`<div class="context-menu" style="${serverRenderer_cjs_prodExports.ssrRenderStyle({ left: `${vueExports.unref(contextMenu).x}px`, top: `${vueExports.unref(contextMenu).y}px` })}" data-v-95d1d79f><div class="context-menu-header" data-v-95d1d79f>添加节点</div><!--[-->`);
          serverRenderer_cjs_prodExports.ssrRenderList(nodeTypeOptions, (opt) => {
            _push2(`<button class="context-menu-item" data-v-95d1d79f>`);
            _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UIcon, {
              name: opt.icon,
              class: "w-4 h-4"
            }, null, _parent));
            _push2(`<span data-v-95d1d79f>${serverRenderer_cjs_prodExports.ssrInterpolate(opt.label)}</span></button>`);
          });
          _push2(`<!--]--></div>`);
        } else {
          _push2(`<!---->`);
        }
      }, "body", false, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = vueExports.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/workflow/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _id_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-95d1d79f"]]);

export { _id_ as default };
//# sourceMappingURL=_id_-DfDHkAG1.mjs.map
