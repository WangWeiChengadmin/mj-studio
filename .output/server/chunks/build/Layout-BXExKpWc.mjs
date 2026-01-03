import { v as vueExports, s as serverRenderer_cjs_prodExports, c as _sfc_main$8, b as _sfc_main$d, i as useRoute$1, a as __nuxt_component_0$1 } from './server.mjs';
import { _ as _sfc_main$2 } from './Drawer-B6XEXTdS.mjs';

const _sfc_main$1 = /* @__PURE__ */ vueExports.defineComponent({
  __name: "Sidebar",
  __ssrInlineRender: true,
  props: {
    mobile: { type: Boolean }
  },
  setup(__props) {
    const route = useRoute$1();
    const closeDrawer = vueExports.inject("closeSettingsDrawer", () => {
    });
    const menuItems = [
      {
        label: "上游配置",
        icon: "i-heroicons-cpu-chip",
        to: "/settings/upstreams"
      },
      {
        label: "导入/导出",
        icon: "i-heroicons-arrow-path-rounded-square",
        to: "/settings/export"
      },
      {
        label: "Prompt 设置",
        icon: "i-heroicons-chat-bubble-bottom-center-text",
        to: "/settings/prompts"
      },
      {
        label: "通用设置",
        icon: "i-heroicons-cog-6-tooth",
        to: "/settings/general"
      }
    ];
    function isActive(to) {
      return route.path.startsWith(to);
    }
    function handleClick() {
      closeDrawer();
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      const _component_UIcon = _sfc_main$d;
      _push(`<nav${serverRenderer_cjs_prodExports.ssrRenderAttrs(vueExports.mergeProps({ class: "w-48 shrink-0 space-y-1" }, _attrs))}><!--[-->`);
      serverRenderer_cjs_prodExports.ssrRenderList(menuItems, (item) => {
        _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_NuxtLink, {
          key: item.to,
          to: item.to,
          class: ["flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors", isActive(item.to) ? "bg-(--ui-primary)/10 text-(--ui-primary)" : "text-(--ui-text-muted) hover:bg-(--ui-bg-elevated) hover:text-(--ui-text)"],
          onClick: ($event) => __props.mobile && handleClick()
        }, {
          default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UIcon, {
                name: item.icon,
                class: "w-5 h-5"
              }, null, _parent2, _scopeId));
              _push2(`<span${_scopeId}>${serverRenderer_cjs_prodExports.ssrInterpolate(item.label)}</span>`);
            } else {
              return [
                vueExports.createVNode(_component_UIcon, {
                  name: item.icon,
                  class: "w-5 h-5"
                }, null, 8, ["name"]),
                vueExports.createVNode("span", null, vueExports.toDisplayString(item.label), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></nav>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = vueExports.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/settings/Sidebar.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_2 = Object.assign(_sfc_main$1, { __name: "SettingsSidebar" });
const _sfc_main = /* @__PURE__ */ vueExports.defineComponent({
  __name: "Layout",
  __ssrInlineRender: true,
  setup(__props) {
    const showDrawer = vueExports.ref(false);
    vueExports.provide("closeSettingsDrawer", () => {
      showDrawer.value = false;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UButton = _sfc_main$8;
      const _component_UIcon = _sfc_main$d;
      const _component_SettingsSidebar = __nuxt_component_2;
      const _component_UDrawer = _sfc_main$2;
      _push(`<div${serverRenderer_cjs_prodExports.ssrRenderAttrs(vueExports.mergeProps({ class: "p-4 lg:p-6" }, _attrs))}><div class="mb-4 lg:mb-6 flex items-center gap-3">`);
      _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UButton, {
        variant: "ghost",
        size: "sm",
        class: "lg:hidden",
        onClick: ($event) => showDrawer.value = true
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
      _push(`<div><h1 class="text-xl lg:text-2xl font-bold text-(--ui-text)">设置</h1><p class="text-(--ui-text-muted) text-sm mt-1 hidden lg:block">管理你的 AI 服务配置</p></div></div><div class="flex gap-6">`);
      _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_SettingsSidebar, { class: "hidden lg:block" }, null, _parent));
      _push(`<div class="flex-1 min-w-0">`);
      serverRenderer_cjs_prodExports.ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div></div>`);
      _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UDrawer, {
        open: vueExports.unref(showDrawer),
        "onUpdate:open": ($event) => vueExports.isRef(showDrawer) ? showDrawer.value = $event : null,
        direction: "left",
        title: "设置",
        ui: { content: "w-64" }
      }, {
        body: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_SettingsSidebar, { mobile: "" }, null, _parent2, _scopeId));
          } else {
            return [
              vueExports.createVNode(_component_SettingsSidebar, { mobile: "" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = vueExports.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/settings/Layout.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_0 = Object.assign(_sfc_main, { __name: "SettingsLayout" });

export { __nuxt_component_0 as _ };
//# sourceMappingURL=Layout-BXExKpWc.mjs.map
