import { v as vueExports, s as serverRenderer_cjs_prodExports, g as useToast, c as _sfc_main$8, b as _sfc_main$d, d as useState } from './server.mjs';
import { _ as _sfc_main$2 } from './Pagination-BNb8aU3s.mjs';
import { _ as _sfc_main$3 } from './Modal-DTUEXzQH.mjs';
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
import './DialogTrigger-DZAnfNyf.mjs';
import './utils-DCnNb5Bf.mjs';
import './index--6aaawBa.mjs';

function useTrash() {
  const tasks = useState("trash-tasks", () => []);
  const isLoading = useState("trash-loading", () => false);
  const currentPage = useState("trash-page", () => 1);
  const pageSize = useState("trash-pageSize", () => 20);
  const total = useState("trash-total", () => 0);
  async function loadTrash(page) {
    isLoading.value = true;
    if (page !== void 0) {
      currentPage.value = page;
    }
    try {
      const result = await $fetch("/api/tasks/trash", {
        query: {
          page: currentPage.value,
          pageSize: pageSize.value
        }
      });
      tasks.value = result.tasks;
      total.value = result.total;
    } catch (error) {
      console.error("加载回收站失败:", error);
    } finally {
      isLoading.value = false;
    }
  }
  async function restoreTask(taskId) {
    await $fetch(`/api/tasks/${taskId}/restore`, { method: "POST" });
    tasks.value = tasks.value.filter((t) => t.id !== taskId);
    total.value = Math.max(0, total.value - 1);
  }
  async function emptyTrash() {
    const result = await $fetch("/api/tasks/trash/empty", {
      method: "DELETE"
    });
    tasks.value = [];
    total.value = 0;
    return result.deleted;
  }
  return {
    tasks,
    isLoading,
    currentPage,
    pageSize,
    total,
    loadTrash,
    restoreTask,
    emptyTrash
  };
}
const _sfc_main$1 = /* @__PURE__ */ vueExports.defineComponent({
  __name: "Trash",
  __ssrInlineRender: true,
  setup(__props) {
    const { tasks, isLoading, currentPage, pageSize, total, loadTrash, restoreTask, emptyTrash } = useTrash();
    const toast = useToast();
    const totalPages = vueExports.computed(() => Math.ceil(total.value / pageSize.value));
    async function handleRestore(taskId) {
      try {
        await restoreTask(taskId);
        toast.add({
          title: "恢复成功",
          description: "任务已恢复到任务列表",
          color: "success"
        });
      } catch (error) {
        toast.add({
          title: "恢复失败",
          description: error.data?.message || error.message || "请稍后重试",
          color: "error"
        });
      }
    }
    const emptyConfirm = vueExports.ref(false);
    const emptyLoading = vueExports.ref(false);
    async function handleEmptyTrash() {
      emptyLoading.value = true;
      try {
        const count = await emptyTrash();
        emptyConfirm.value = false;
        toast.add({
          title: "清空成功",
          description: `已永久删除 ${count} 个任务`,
          color: "success"
        });
      } catch (error) {
        toast.add({
          title: "清空失败",
          description: error.data?.message || error.message || "请稍后重试",
          color: "error"
        });
      } finally {
        emptyLoading.value = false;
      }
    }
    function handlePageChange() {
      loadTrash();
    }
    function formatDeletedTime(deletedAt) {
      if (!deletedAt) return "";
      const date = new Date(deletedAt);
      return date.toLocaleString("zh-CN", {
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit"
      });
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UButton = _sfc_main$8;
      const _component_UIcon = _sfc_main$d;
      const _component_UPagination = _sfc_main$2;
      const _component_UModal = _sfc_main$3;
      _push(`<div${serverRenderer_cjs_prodExports.ssrRenderAttrs(vueExports.mergeProps({ class: "space-y-4" }, _attrs))}><div class="flex items-center justify-between"><h2 class="text-(--ui-text) text-lg font-medium">回收站</h2><div class="flex items-center gap-3">`);
      if (vueExports.unref(tasks).length > 0) {
        _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UButton, {
          size: "xs",
          variant: "ghost",
          color: "error",
          onClick: ($event) => emptyConfirm.value = true
        }, {
          default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UIcon, {
                name: "i-heroicons-trash",
                class: "w-4 h-4 mr-1"
              }, null, _parent2, _scopeId));
              _push2(` 清空回收站 `);
            } else {
              return [
                vueExports.createVNode(_component_UIcon, {
                  name: "i-heroicons-trash",
                  class: "w-4 h-4 mr-1"
                }),
                vueExports.createTextVNode(" 清空回收站 ")
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<span class="text-(--ui-text-dimmed) text-sm">共 ${serverRenderer_cjs_prodExports.ssrInterpolate(vueExports.unref(total))} 个任务</span></div></div>`);
      if (vueExports.unref(isLoading)) {
        _push(`<div class="text-center py-12">`);
        _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-arrow-path",
          class: "w-8 h-8 text-(--ui-text-dimmed) mx-auto mb-2 animate-spin"
        }, null, _parent));
        _push(`<p class="text-(--ui-text-dimmed)">加载中...</p></div>`);
      } else if (vueExports.unref(tasks).length === 0) {
        _push(`<div class="text-center py-12">`);
        _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-trash",
          class: "w-16 h-16 text-(--ui-text-dimmed)/50 mx-auto mb-4"
        }, null, _parent));
        _push(`<p class="text-(--ui-text-dimmed)">回收站是空的</p><p class="text-(--ui-text-dimmed)/70 text-sm mt-1">删除的任务会出现在这里</p></div>`);
      } else {
        _push(`<!--[--><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"><!--[-->`);
        serverRenderer_cjs_prodExports.ssrRenderList(vueExports.unref(tasks), (task) => {
          _push(`<div class="bg-(--ui-bg-elevated) rounded-lg p-4 border border-(--ui-border)"><div class="aspect-square rounded-lg overflow-hidden bg-(--ui-bg) mb-3">`);
          if (task.resourceUrl) {
            _push(`<img${serverRenderer_cjs_prodExports.ssrRenderAttr("src", task.resourceUrl)} alt="生成的图片" class="w-full h-full object-cover">`);
          } else if (task.status === "failed") {
            _push(`<div class="w-full h-full flex flex-col items-center justify-center p-4 bg-error/5">`);
            _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-exclamation-circle",
              class: "w-10 h-10 text-error mb-2"
            }, null, _parent));
            _push(`<p class="text-xs text-error text-center line-clamp-3">${serverRenderer_cjs_prodExports.ssrInterpolate(task.error || "生成失败")}</p></div>`);
          } else {
            _push(`<div class="w-full h-full flex items-center justify-center">`);
            _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-photo",
              class: "w-12 h-12 text-(--ui-text-dimmed)/30"
            }, null, _parent));
            _push(`</div>`);
          }
          _push(`</div><div class="space-y-2"><p class="text-(--ui-text) text-sm line-clamp-2">${serverRenderer_cjs_prodExports.ssrInterpolate(task.prompt || "(无提示词)")}</p><div class="flex items-center justify-between text-xs text-(--ui-text-dimmed)"><span>删除于 ${serverRenderer_cjs_prodExports.ssrInterpolate(formatDeletedTime(task.deletedAt))}</span>`);
          _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UButton, {
            size: "xs",
            variant: "soft",
            color: "primary",
            onClick: ($event) => handleRestore(task.id)
          }, {
            default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UIcon, {
                  name: "i-heroicons-arrow-uturn-left",
                  class: "w-3.5 h-3.5 mr-1"
                }, null, _parent2, _scopeId));
                _push2(` 恢复 `);
              } else {
                return [
                  vueExports.createVNode(_component_UIcon, {
                    name: "i-heroicons-arrow-uturn-left",
                    class: "w-3.5 h-3.5 mr-1"
                  }),
                  vueExports.createTextVNode(" 恢复 ")
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</div></div></div>`);
        });
        _push(`<!--]--></div>`);
        if (vueExports.unref(totalPages) > 1) {
          _push(`<div class="flex justify-center mt-6">`);
          _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UPagination, {
            page: vueExports.unref(currentPage),
            "onUpdate:page": [($event) => vueExports.isRef(currentPage) ? currentPage.value = $event : null, handlePageChange],
            total: vueExports.unref(total),
            "items-per-page": vueExports.unref(pageSize)
          }, null, _parent));
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--]-->`);
      }
      _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UModal, {
        open: vueExports.unref(emptyConfirm),
        "onUpdate:open": ($event) => vueExports.isRef(emptyConfirm) ? emptyConfirm.value = $event : null,
        title: "清空回收站",
        description: "此操作将永久删除回收站中的所有任务，无法恢复。确定要继续吗？"
      }, {
        footer: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex justify-end gap-3"${_scopeId}>`);
            _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UButton, {
              variant: "ghost",
              color: "neutral",
              onClick: ($event) => emptyConfirm.value = false
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
            _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UButton, {
              color: "error",
              loading: vueExports.unref(emptyLoading),
              onClick: handleEmptyTrash
            }, {
              default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`确认清空`);
                } else {
                  return [
                    vueExports.createTextVNode("确认清空")
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
                  variant: "ghost",
                  color: "neutral",
                  onClick: ($event) => emptyConfirm.value = false
                }, {
                  default: vueExports.withCtx(() => [
                    vueExports.createTextVNode("取消")
                  ]),
                  _: 1
                }, 8, ["onClick"]),
                vueExports.createVNode(_component_UButton, {
                  color: "error",
                  loading: vueExports.unref(emptyLoading),
                  onClick: handleEmptyTrash
                }, {
                  default: vueExports.withCtx(() => [
                    vueExports.createTextVNode("确认清空")
                  ]),
                  _: 1
                }, 8, ["loading"])
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
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = vueExports.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/studio/Trash.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_0 = Object.assign(_sfc_main$1, { __name: "StudioTrash" });
const _sfc_main = /* @__PURE__ */ vueExports.defineComponent({
  __name: "trash",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_StudioTrash = __nuxt_component_0;
      _push(`<div${serverRenderer_cjs_prodExports.ssrRenderAttrs(vueExports.mergeProps({ class: "p-6" }, _attrs))}><div class="max-w-7xl mx-auto">`);
      _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_StudioTrash, null, null, _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = vueExports.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/trash.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=trash-DiVk3cOT.mjs.map
