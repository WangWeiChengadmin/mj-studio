import { v as vueExports, g as useToast, h as useRouter, s as serverRenderer_cjs_prodExports, c as _sfc_main$8, b as _sfc_main$d, y as useLocale, e as useAppConfig, t as tv, P as Primitive, z as _sfc_main$b } from './server.mjs';
import { _ as _sfc_main$3 } from './DropdownMenu-D_kNtRd4.mjs';
import { _ as _sfc_main$4 } from './Modal-DTUEXzQH.mjs';
import { _ as _sfc_main$5 } from './FormField-CGip9Bav.mjs';
import { _ as _sfc_main$6 } from './Input-A_WPZx9s.mjs';
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
import './DialogTrigger-DZAnfNyf.mjs';
import './Label-CV5OSAkM.mjs';

const theme$1 = {
  "slots": {
    "root": "relative overflow-hidden w-full rounded-lg p-4 flex gap-2.5",
    "wrapper": "min-w-0 flex-1 flex flex-col",
    "title": "text-sm font-medium",
    "description": "text-sm opacity-90",
    "icon": "shrink-0 size-5",
    "avatar": "shrink-0",
    "avatarSize": "2xl",
    "actions": "flex flex-wrap gap-1.5 shrink-0",
    "close": "p-0"
  },
  "variants": {
    "color": {
      "primary": "",
      "secondary": "",
      "success": "",
      "info": "",
      "warning": "",
      "error": "",
      "neutral": ""
    },
    "variant": {
      "solid": "",
      "outline": "",
      "soft": "",
      "subtle": ""
    },
    "orientation": {
      "horizontal": {
        "root": "items-center",
        "actions": "items-center"
      },
      "vertical": {
        "root": "items-start",
        "actions": "items-start mt-2.5"
      }
    },
    "title": {
      "true": {
        "description": "mt-1"
      }
    }
  },
  "compoundVariants": [
    {
      "color": "primary",
      "variant": "solid",
      "class": {
        "root": "bg-primary text-inverted"
      }
    },
    {
      "color": "secondary",
      "variant": "solid",
      "class": {
        "root": "bg-secondary text-inverted"
      }
    },
    {
      "color": "success",
      "variant": "solid",
      "class": {
        "root": "bg-success text-inverted"
      }
    },
    {
      "color": "info",
      "variant": "solid",
      "class": {
        "root": "bg-info text-inverted"
      }
    },
    {
      "color": "warning",
      "variant": "solid",
      "class": {
        "root": "bg-warning text-inverted"
      }
    },
    {
      "color": "error",
      "variant": "solid",
      "class": {
        "root": "bg-error text-inverted"
      }
    },
    {
      "color": "primary",
      "variant": "outline",
      "class": {
        "root": "text-primary ring ring-inset ring-primary/25"
      }
    },
    {
      "color": "secondary",
      "variant": "outline",
      "class": {
        "root": "text-secondary ring ring-inset ring-secondary/25"
      }
    },
    {
      "color": "success",
      "variant": "outline",
      "class": {
        "root": "text-success ring ring-inset ring-success/25"
      }
    },
    {
      "color": "info",
      "variant": "outline",
      "class": {
        "root": "text-info ring ring-inset ring-info/25"
      }
    },
    {
      "color": "warning",
      "variant": "outline",
      "class": {
        "root": "text-warning ring ring-inset ring-warning/25"
      }
    },
    {
      "color": "error",
      "variant": "outline",
      "class": {
        "root": "text-error ring ring-inset ring-error/25"
      }
    },
    {
      "color": "primary",
      "variant": "soft",
      "class": {
        "root": "bg-primary/10 text-primary"
      }
    },
    {
      "color": "secondary",
      "variant": "soft",
      "class": {
        "root": "bg-secondary/10 text-secondary"
      }
    },
    {
      "color": "success",
      "variant": "soft",
      "class": {
        "root": "bg-success/10 text-success"
      }
    },
    {
      "color": "info",
      "variant": "soft",
      "class": {
        "root": "bg-info/10 text-info"
      }
    },
    {
      "color": "warning",
      "variant": "soft",
      "class": {
        "root": "bg-warning/10 text-warning"
      }
    },
    {
      "color": "error",
      "variant": "soft",
      "class": {
        "root": "bg-error/10 text-error"
      }
    },
    {
      "color": "primary",
      "variant": "subtle",
      "class": {
        "root": "bg-primary/10 text-primary ring ring-inset ring-primary/25"
      }
    },
    {
      "color": "secondary",
      "variant": "subtle",
      "class": {
        "root": "bg-secondary/10 text-secondary ring ring-inset ring-secondary/25"
      }
    },
    {
      "color": "success",
      "variant": "subtle",
      "class": {
        "root": "bg-success/10 text-success ring ring-inset ring-success/25"
      }
    },
    {
      "color": "info",
      "variant": "subtle",
      "class": {
        "root": "bg-info/10 text-info ring ring-inset ring-info/25"
      }
    },
    {
      "color": "warning",
      "variant": "subtle",
      "class": {
        "root": "bg-warning/10 text-warning ring ring-inset ring-warning/25"
      }
    },
    {
      "color": "error",
      "variant": "subtle",
      "class": {
        "root": "bg-error/10 text-error ring ring-inset ring-error/25"
      }
    },
    {
      "color": "neutral",
      "variant": "solid",
      "class": {
        "root": "text-inverted bg-inverted"
      }
    },
    {
      "color": "neutral",
      "variant": "outline",
      "class": {
        "root": "text-highlighted bg-default ring ring-inset ring-default"
      }
    },
    {
      "color": "neutral",
      "variant": "soft",
      "class": {
        "root": "text-highlighted bg-elevated/50"
      }
    },
    {
      "color": "neutral",
      "variant": "subtle",
      "class": {
        "root": "text-highlighted bg-elevated/50 ring ring-inset ring-accented"
      }
    }
  ],
  "defaultVariants": {
    "color": "primary",
    "variant": "solid"
  }
};
const _sfc_main$2 = {
  __name: "UAlert",
  __ssrInlineRender: true,
  props: {
    as: { type: null, required: false },
    title: { type: String, required: false },
    description: { type: String, required: false },
    icon: { type: null, required: false },
    avatar: { type: Object, required: false },
    color: { type: null, required: false },
    variant: { type: null, required: false },
    orientation: { type: null, required: false, default: "vertical" },
    actions: { type: Array, required: false },
    close: { type: [Boolean, Object], required: false },
    closeIcon: { type: null, required: false },
    class: { type: null, required: false },
    ui: { type: null, required: false }
  },
  emits: ["update:open"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const slots = vueExports.useSlots();
    const { t } = useLocale();
    const appConfig = useAppConfig();
    const ui = vueExports.computed(() => tv({ extend: tv(theme$1), ...appConfig.ui?.alert || {} })({
      color: props.color,
      variant: props.variant,
      orientation: props.orientation,
      title: !!props.title || !!slots.title
    }));
    return (_ctx, _push, _parent, _attrs) => {
      _push(serverRenderer_cjs_prodExports.ssrRenderComponent(vueExports.unref(Primitive), vueExports.mergeProps({
        as: __props.as,
        "data-orientation": __props.orientation,
        "data-slot": "root",
        class: ui.value.root({ class: [props.ui?.root, props.class] })
      }, _attrs), {
        default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            serverRenderer_cjs_prodExports.ssrRenderSlot(_ctx.$slots, "leading", { ui: ui.value }, () => {
              if (__props.avatar) {
                _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_sfc_main$b, vueExports.mergeProps({
                  size: props.ui?.avatarSize || ui.value.avatarSize()
                }, __props.avatar, {
                  "data-slot": "avatar",
                  class: ui.value.avatar({ class: props.ui?.avatar })
                }), null, _parent2, _scopeId));
              } else if (__props.icon) {
                _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_sfc_main$d, {
                  name: __props.icon,
                  "data-slot": "icon",
                  class: ui.value.icon({ class: props.ui?.icon })
                }, null, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
            }, _push2, _parent2, _scopeId);
            _push2(`<div data-slot="wrapper" class="${serverRenderer_cjs_prodExports.ssrRenderClass(ui.value.wrapper({ class: props.ui?.wrapper }))}"${_scopeId}>`);
            if (__props.title || !!slots.title) {
              _push2(`<div data-slot="title" class="${serverRenderer_cjs_prodExports.ssrRenderClass(ui.value.title({ class: props.ui?.title }))}"${_scopeId}>`);
              serverRenderer_cjs_prodExports.ssrRenderSlot(_ctx.$slots, "title", {}, () => {
                _push2(`${serverRenderer_cjs_prodExports.ssrInterpolate(__props.title)}`);
              }, _push2, _parent2, _scopeId);
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.description || !!slots.description) {
              _push2(`<div data-slot="description" class="${serverRenderer_cjs_prodExports.ssrRenderClass(ui.value.description({ class: props.ui?.description }))}"${_scopeId}>`);
              serverRenderer_cjs_prodExports.ssrRenderSlot(_ctx.$slots, "description", {}, () => {
                _push2(`${serverRenderer_cjs_prodExports.ssrInterpolate(__props.description)}`);
              }, _push2, _parent2, _scopeId);
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.orientation === "vertical" && (__props.actions?.length || !!slots.actions)) {
              _push2(`<div data-slot="actions" class="${serverRenderer_cjs_prodExports.ssrRenderClass(ui.value.actions({ class: props.ui?.actions }))}"${_scopeId}>`);
              serverRenderer_cjs_prodExports.ssrRenderSlot(_ctx.$slots, "actions", {}, () => {
                _push2(`<!--[-->`);
                serverRenderer_cjs_prodExports.ssrRenderList(__props.actions, (action, index) => {
                  _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_sfc_main$8, vueExports.mergeProps({
                    key: index,
                    size: "xs"
                  }, { ref_for: true }, action), null, _parent2, _scopeId));
                });
                _push2(`<!--]-->`);
              }, _push2, _parent2, _scopeId);
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
            if (__props.orientation === "horizontal" && (__props.actions?.length || !!slots.actions) || __props.close) {
              _push2(`<div data-slot="actions" class="${serverRenderer_cjs_prodExports.ssrRenderClass(ui.value.actions({ class: props.ui?.actions, orientation: "horizontal" }))}"${_scopeId}>`);
              if (__props.orientation === "horizontal" && (__props.actions?.length || !!slots.actions)) {
                serverRenderer_cjs_prodExports.ssrRenderSlot(_ctx.$slots, "actions", {}, () => {
                  _push2(`<!--[-->`);
                  serverRenderer_cjs_prodExports.ssrRenderList(__props.actions, (action, index) => {
                    _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_sfc_main$8, vueExports.mergeProps({
                      key: index,
                      size: "xs"
                    }, { ref_for: true }, action), null, _parent2, _scopeId));
                  });
                  _push2(`<!--]-->`);
                }, _push2, _parent2, _scopeId);
              } else {
                _push2(`<!---->`);
              }
              serverRenderer_cjs_prodExports.ssrRenderSlot(_ctx.$slots, "close", { ui: ui.value }, () => {
                if (__props.close) {
                  _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_sfc_main$8, vueExports.mergeProps({
                    icon: __props.closeIcon || vueExports.unref(appConfig).ui.icons.close,
                    color: "neutral",
                    variant: "link",
                    "aria-label": vueExports.unref(t)("alert.close")
                  }, typeof __props.close === "object" ? __props.close : {}, {
                    "data-slot": "close",
                    class: ui.value.close({ class: props.ui?.close }),
                    onClick: ($event) => emits("update:open", false)
                  }), null, _parent2, _scopeId));
                } else {
                  _push2(`<!---->`);
                }
              }, _push2, _parent2, _scopeId);
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              vueExports.renderSlot(_ctx.$slots, "leading", { ui: ui.value }, () => [
                __props.avatar ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$b, vueExports.mergeProps({
                  key: 0,
                  size: props.ui?.avatarSize || ui.value.avatarSize()
                }, __props.avatar, {
                  "data-slot": "avatar",
                  class: ui.value.avatar({ class: props.ui?.avatar })
                }), null, 16, ["size", "class"])) : __props.icon ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$d, {
                  key: 1,
                  name: __props.icon,
                  "data-slot": "icon",
                  class: ui.value.icon({ class: props.ui?.icon })
                }, null, 8, ["name", "class"])) : vueExports.createCommentVNode("", true)
              ]),
              vueExports.createVNode("div", {
                "data-slot": "wrapper",
                class: ui.value.wrapper({ class: props.ui?.wrapper })
              }, [
                __props.title || !!slots.title ? (vueExports.openBlock(), vueExports.createBlock("div", {
                  key: 0,
                  "data-slot": "title",
                  class: ui.value.title({ class: props.ui?.title })
                }, [
                  vueExports.renderSlot(_ctx.$slots, "title", {}, () => [
                    vueExports.createTextVNode(vueExports.toDisplayString(__props.title), 1)
                  ])
                ], 2)) : vueExports.createCommentVNode("", true),
                __props.description || !!slots.description ? (vueExports.openBlock(), vueExports.createBlock("div", {
                  key: 1,
                  "data-slot": "description",
                  class: ui.value.description({ class: props.ui?.description })
                }, [
                  vueExports.renderSlot(_ctx.$slots, "description", {}, () => [
                    vueExports.createTextVNode(vueExports.toDisplayString(__props.description), 1)
                  ])
                ], 2)) : vueExports.createCommentVNode("", true),
                __props.orientation === "vertical" && (__props.actions?.length || !!slots.actions) ? (vueExports.openBlock(), vueExports.createBlock("div", {
                  key: 2,
                  "data-slot": "actions",
                  class: ui.value.actions({ class: props.ui?.actions })
                }, [
                  vueExports.renderSlot(_ctx.$slots, "actions", {}, () => [
                    (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(__props.actions, (action, index) => {
                      return vueExports.openBlock(), vueExports.createBlock(_sfc_main$8, vueExports.mergeProps({
                        key: index,
                        size: "xs"
                      }, { ref_for: true }, action), null, 16);
                    }), 128))
                  ])
                ], 2)) : vueExports.createCommentVNode("", true)
              ], 2),
              __props.orientation === "horizontal" && (__props.actions?.length || !!slots.actions) || __props.close ? (vueExports.openBlock(), vueExports.createBlock("div", {
                key: 0,
                "data-slot": "actions",
                class: ui.value.actions({ class: props.ui?.actions, orientation: "horizontal" })
              }, [
                __props.orientation === "horizontal" && (__props.actions?.length || !!slots.actions) ? vueExports.renderSlot(_ctx.$slots, "actions", { key: 0 }, () => [
                  (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(__props.actions, (action, index) => {
                    return vueExports.openBlock(), vueExports.createBlock(_sfc_main$8, vueExports.mergeProps({
                      key: index,
                      size: "xs"
                    }, { ref_for: true }, action), null, 16);
                  }), 128))
                ]) : vueExports.createCommentVNode("", true),
                vueExports.renderSlot(_ctx.$slots, "close", { ui: ui.value }, () => [
                  __props.close ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$8, vueExports.mergeProps({
                    key: 0,
                    icon: __props.closeIcon || vueExports.unref(appConfig).ui.icons.close,
                    color: "neutral",
                    variant: "link",
                    "aria-label": vueExports.unref(t)("alert.close")
                  }, typeof __props.close === "object" ? __props.close : {}, {
                    "data-slot": "close",
                    class: ui.value.close({ class: props.ui?.close }),
                    onClick: ($event) => emits("update:open", false)
                  }), null, 16, ["icon", "aria-label", "class", "onClick"])) : vueExports.createCommentVNode("", true)
                ])
              ], 2)) : vueExports.createCommentVNode("", true)
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = vueExports.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/@nuxt+ui@4.2.1_@babel+parser@7.28.5_axios@1.13.2_db0@0.3.4_better-sqlite3@12.5.0_drizzl_dfa8f561a9d8983c7332d596b28eea3c/node_modules/@nuxt/ui/dist/runtime/components/Alert.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const theme = {
  "slots": {
    "root": "rounded-lg overflow-hidden",
    "header": "p-4 sm:px-6",
    "body": "p-4 sm:p-6",
    "footer": "p-4 sm:px-6"
  },
  "variants": {
    "variant": {
      "solid": {
        "root": "bg-inverted text-inverted"
      },
      "outline": {
        "root": "bg-default ring ring-default divide-y divide-default"
      },
      "soft": {
        "root": "bg-elevated/50 divide-y divide-default"
      },
      "subtle": {
        "root": "bg-elevated/50 ring ring-default divide-y divide-default"
      }
    }
  },
  "defaultVariants": {
    "variant": "outline"
  }
};
const _sfc_main$1 = {
  __name: "UCard",
  __ssrInlineRender: true,
  props: {
    as: { type: null, required: false },
    variant: { type: null, required: false },
    class: { type: null, required: false },
    ui: { type: null, required: false }
  },
  setup(__props) {
    const props = __props;
    const slots = vueExports.useSlots();
    const appConfig = useAppConfig();
    const ui = vueExports.computed(() => tv({ extend: tv(theme), ...appConfig.ui?.card || {} })({
      variant: props.variant
    }));
    return (_ctx, _push, _parent, _attrs) => {
      _push(serverRenderer_cjs_prodExports.ssrRenderComponent(vueExports.unref(Primitive), vueExports.mergeProps({
        as: __props.as,
        "data-slot": "root",
        class: ui.value.root({ class: [props.ui?.root, props.class] })
      }, _attrs), {
        default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (!!slots.header) {
              _push2(`<div data-slot="header" class="${serverRenderer_cjs_prodExports.ssrRenderClass(ui.value.header({ class: props.ui?.header }))}"${_scopeId}>`);
              serverRenderer_cjs_prodExports.ssrRenderSlot(_ctx.$slots, "header", {}, null, _push2, _parent2, _scopeId);
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            if (!!slots.default) {
              _push2(`<div data-slot="body" class="${serverRenderer_cjs_prodExports.ssrRenderClass(ui.value.body({ class: props.ui?.body }))}"${_scopeId}>`);
              serverRenderer_cjs_prodExports.ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            if (!!slots.footer) {
              _push2(`<div data-slot="footer" class="${serverRenderer_cjs_prodExports.ssrRenderClass(ui.value.footer({ class: props.ui?.footer }))}"${_scopeId}>`);
              serverRenderer_cjs_prodExports.ssrRenderSlot(_ctx.$slots, "footer", {}, null, _push2, _parent2, _scopeId);
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              !!slots.header ? (vueExports.openBlock(), vueExports.createBlock("div", {
                key: 0,
                "data-slot": "header",
                class: ui.value.header({ class: props.ui?.header })
              }, [
                vueExports.renderSlot(_ctx.$slots, "header")
              ], 2)) : vueExports.createCommentVNode("", true),
              !!slots.default ? (vueExports.openBlock(), vueExports.createBlock("div", {
                key: 1,
                "data-slot": "body",
                class: ui.value.body({ class: props.ui?.body })
              }, [
                vueExports.renderSlot(_ctx.$slots, "default")
              ], 2)) : vueExports.createCommentVNode("", true),
              !!slots.footer ? (vueExports.openBlock(), vueExports.createBlock("div", {
                key: 2,
                "data-slot": "footer",
                class: ui.value.footer({ class: props.ui?.footer })
              }, [
                vueExports.renderSlot(_ctx.$slots, "footer")
              ], 2)) : vueExports.createCommentVNode("", true)
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = vueExports.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/@nuxt+ui@4.2.1_@babel+parser@7.28.5_axios@1.13.2_db0@0.3.4_better-sqlite3@12.5.0_drizzl_dfa8f561a9d8983c7332d596b28eea3c/node_modules/@nuxt/ui/dist/runtime/components/Card.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ vueExports.defineComponent({
  __name: "workflows",
  __ssrInlineRender: true,
  setup(__props) {
    const toast = useToast();
    const router = useRouter();
    const workflows = vueExports.ref([]);
    const templates = vueExports.ref([]);
    const isLoading = vueExports.ref(true);
    async function refreshWorkflows() {
      try {
        const res = await $fetch("/api/workflows");
        workflows.value = res.data || [];
      } catch (error) {
        console.error("刷新失败:", error);
      }
    }
    const showNewModal = vueExports.ref(false);
    const newWorkflowName = vueExports.ref("");
    const isCreating = vueExports.ref(false);
    const showDeleteModal = vueExports.ref(false);
    const deleteTarget = vueExports.ref(null);
    const isDeleting = vueExports.ref(false);
    async function createBlankWorkflow() {
      if (!newWorkflowName.value.trim()) {
        toast.add({ title: "请输入工作流名称", color: "error" });
        return;
      }
      isCreating.value = true;
      try {
        const result = await $fetch("/api/workflows", {
          method: "POST",
          body: {
            name: newWorkflowName.value.trim(),
            data: {
              version: "1.0.0",
              name: newWorkflowName.value.trim(),
              nodes: [],
              edges: [],
              viewport: { x: 0, y: 0, zoom: 1 }
            }
          }
        });
        if (result.success) {
          toast.add({ title: "工作流已创建", color: "success" });
          showNewModal.value = false;
          newWorkflowName.value = "";
          router.push(`/workflow/${result.data.id}`);
        }
      } catch (error) {
        toast.add({ title: "创建失败", description: error.data?.message, color: "error" });
      } finally {
        isCreating.value = false;
      }
    }
    function openWorkflow(workflow) {
      router.push(`/workflow/${workflow.id}`);
    }
    function confirmDelete(workflow) {
      deleteTarget.value = workflow;
      showDeleteModal.value = true;
    }
    async function deleteWorkflow() {
      if (!deleteTarget.value) return;
      isDeleting.value = true;
      try {
        await $fetch(`/api/workflows/${deleteTarget.value.id}`, {
          method: "DELETE"
        });
        toast.add({ title: "工作流已删除", color: "success" });
        showDeleteModal.value = false;
        deleteTarget.value = null;
        await refreshWorkflows();
      } catch (error) {
        toast.add({ title: "删除失败", description: error.data?.message, color: "error" });
      } finally {
        isDeleting.value = false;
      }
    }
    function formatTime(dateStr) {
      const date = new Date(dateStr);
      return date.toLocaleDateString("zh-CN", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit"
      });
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UAlert = _sfc_main$2;
      const _component_UButton = _sfc_main$8;
      const _component_UIcon = _sfc_main$d;
      const _component_UDropdownMenu = _sfc_main$3;
      const _component_UModal = _sfc_main$4;
      const _component_UCard = _sfc_main$1;
      const _component_UFormField = _sfc_main$5;
      const _component_UInput = _sfc_main$6;
      _push(`<div${serverRenderer_cjs_prodExports.ssrRenderAttrs(vueExports.mergeProps({ class: "max-w-6xl mx-auto px-6 py-8" }, _attrs))}>`);
      _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UAlert, {
        class: "mb-6",
        color: "warning",
        variant: "subtle",
        icon: "i-heroicons-exclamation-triangle",
        title: "功能预览",
        description: "工作流功能处于预览阶段，暂停开发中。如有好的想法或建议，欢迎反馈！"
      }, null, _parent));
      _push(`<div class="flex items-center justify-between mb-8"><div><h1 class="text-2xl font-bold text-(--ui-text)">工作流</h1><p class="text-(--ui-text-muted) mt-1">管理你的 AI 工作流</p></div>`);
      _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UButton, {
        color: "primary",
        onClick: ($event) => showNewModal.value = true
      }, {
        default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-plus",
              class: "w-4 h-4 mr-1"
            }, null, _parent2, _scopeId));
            _push2(` 新建工作流 `);
          } else {
            return [
              vueExports.createVNode(_component_UIcon, {
                name: "i-heroicons-plus",
                class: "w-4 h-4 mr-1"
              }),
              vueExports.createTextVNode(" 新建工作流 ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      if (vueExports.unref(isLoading)) {
        _push(`<div class="flex items-center justify-center py-20">`);
        _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-arrow-path",
          class: "w-6 h-6 animate-spin text-(--ui-text-muted)"
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (!vueExports.unref(isLoading) && vueExports.unref(templates).length > 0) {
        _push(`<div class="mb-8"><h2 class="text-lg font-medium text-(--ui-text) mb-4">从模板开始</h2><div class="grid grid-cols-1 md:grid-cols-3 gap-4"><!--[-->`);
        serverRenderer_cjs_prodExports.ssrRenderList(vueExports.unref(templates), (template) => {
          _push(`<div class="border border-(--ui-border) rounded-lg p-4 hover:border-(--ui-primary) cursor-pointer transition-colors bg-(--ui-bg-elevated)"><div class="flex items-start gap-3"><div class="w-10 h-10 rounded-lg bg-(--ui-bg-accented) flex items-center justify-center flex-shrink-0">`);
          _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UIcon, {
            name: template.category === "video" ? "i-heroicons-film" : "i-heroicons-photo",
            class: "w-5 h-5 text-(--ui-primary)"
          }, null, _parent));
          _push(`</div><div class="flex-1 min-w-0"><h3 class="font-medium text-(--ui-text) truncate">${serverRenderer_cjs_prodExports.ssrInterpolate(template.name)}</h3><p class="text-sm text-(--ui-text-muted) mt-0.5 line-clamp-2">${serverRenderer_cjs_prodExports.ssrInterpolate(template.description)}</p><div class="flex items-center gap-2 mt-2 text-xs text-(--ui-text-dimmed)">`);
          if (template.isBuiltin) {
            _push(`<span class="px-1.5 py-0.5 rounded bg-(--ui-bg-accented)">内置</span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<span>${serverRenderer_cjs_prodExports.ssrInterpolate(template.usageCount)} 次使用</span></div></div></div></div>`);
        });
        _push(`<!--]--></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (!vueExports.unref(isLoading)) {
        _push(`<div><h2 class="text-lg font-medium text-(--ui-text) mb-4">我的工作流</h2>`);
        if (vueExports.unref(workflows).length === 0) {
          _push(`<div class="text-center py-16 border border-dashed border-(--ui-border) rounded-lg">`);
          _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UIcon, {
            name: "i-heroicons-square-3-stack-3d",
            class: "w-12 h-12 text-(--ui-text-dimmed) mx-auto mb-3"
          }, null, _parent));
          _push(`<p class="text-(--ui-text-muted)">还没有工作流</p><p class="text-sm text-(--ui-text-dimmed) mt-1">创建一个新工作流或从模板开始</p></div>`);
        } else {
          _push(`<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"><!--[-->`);
          serverRenderer_cjs_prodExports.ssrRenderList(vueExports.unref(workflows), (workflow) => {
            _push(`<div class="border border-(--ui-border) rounded-lg overflow-hidden hover:border-(--ui-primary) transition-colors bg-(--ui-bg-elevated) group"><div class="h-32 bg-(--ui-bg-accented) flex items-center justify-center cursor-pointer">`);
            if (workflow.thumbnail) {
              _push(`<img${serverRenderer_cjs_prodExports.ssrRenderAttr("src", workflow.thumbnail)} class="w-full h-full object-cover">`);
            } else {
              _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UIcon, {
                name: "i-heroicons-square-3-stack-3d",
                class: "w-10 h-10 text-(--ui-text-dimmed)"
              }, null, _parent));
            }
            _push(`</div><div class="p-4"><div class="flex items-start justify-between"><div class="flex-1 min-w-0 cursor-pointer"><h3 class="font-medium text-(--ui-text) truncate">${serverRenderer_cjs_prodExports.ssrInterpolate(workflow.name)}</h3>`);
            if (workflow.description) {
              _push(`<p class="text-sm text-(--ui-text-muted) mt-0.5 line-clamp-1">${serverRenderer_cjs_prodExports.ssrInterpolate(workflow.description)}</p>`);
            } else {
              _push(`<!---->`);
            }
            _push(`<p class="text-xs text-(--ui-text-dimmed) mt-2"> 更新于 ${serverRenderer_cjs_prodExports.ssrInterpolate(formatTime(workflow.updatedAt))}</p></div>`);
            _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UDropdownMenu, {
              items: [
                { label: "打开", icon: "i-heroicons-arrow-top-right-on-square", onSelect: () => openWorkflow(workflow) },
                { label: "删除", icon: "i-heroicons-trash", onSelect: () => confirmDelete(workflow) }
              ]
            }, {
              default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UButton, {
                    variant: "ghost",
                    size: "xs",
                    class: "opacity-0 group-hover:opacity-100 transition-opacity"
                  }, {
                    default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
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
                      class: "opacity-0 group-hover:opacity-100 transition-opacity"
                    }, {
                      default: vueExports.withCtx(() => [
                        vueExports.createVNode(_component_UIcon, {
                          name: "i-heroicons-ellipsis-vertical",
                          class: "w-4 h-4"
                        })
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 2
            }, _parent));
            _push(`</div></div></div>`);
          });
          _push(`<!--]--></div>`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UModal, {
        open: vueExports.unref(showNewModal),
        "onUpdate:open": ($event) => vueExports.isRef(showNewModal) ? showNewModal.value = $event : null
      }, {
        content: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UCard, null, {
              header: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex items-center justify-between"${_scopeId2}><h3 class="text-lg font-medium"${_scopeId2}>新建工作流</h3>`);
                  _push3(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UButton, {
                    variant: "ghost",
                    size: "xs",
                    onClick: ($event) => showNewModal.value = false
                  }, {
                    default: vueExports.withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UIcon, {
                          name: "i-heroicons-x-mark",
                          class: "w-5 h-5"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          vueExports.createVNode(_component_UIcon, {
                            name: "i-heroicons-x-mark",
                            class: "w-5 h-5"
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    vueExports.createVNode("div", { class: "flex items-center justify-between" }, [
                      vueExports.createVNode("h3", { class: "text-lg font-medium" }, "新建工作流"),
                      vueExports.createVNode(_component_UButton, {
                        variant: "ghost",
                        size: "xs",
                        onClick: ($event) => showNewModal.value = false
                      }, {
                        default: vueExports.withCtx(() => [
                          vueExports.createVNode(_component_UIcon, {
                            name: "i-heroicons-x-mark",
                            class: "w-5 h-5"
                          })
                        ]),
                        _: 1
                      }, 8, ["onClick"])
                    ])
                  ];
                }
              }),
              footer: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex justify-end gap-2"${_scopeId2}>`);
                  _push3(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UButton, {
                    variant: "ghost",
                    onClick: ($event) => showNewModal.value = false
                  }, {
                    default: vueExports.withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`取消`);
                      } else {
                        return [
                          vueExports.createTextVNode("取消")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UButton, {
                    color: "primary",
                    loading: vueExports.unref(isCreating),
                    onClick: createBlankWorkflow
                  }, {
                    default: vueExports.withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` 创建 `);
                      } else {
                        return [
                          vueExports.createTextVNode(" 创建 ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    vueExports.createVNode("div", { class: "flex justify-end gap-2" }, [
                      vueExports.createVNode(_component_UButton, {
                        variant: "ghost",
                        onClick: ($event) => showNewModal.value = false
                      }, {
                        default: vueExports.withCtx(() => [
                          vueExports.createTextVNode("取消")
                        ]),
                        _: 1
                      }, 8, ["onClick"]),
                      vueExports.createVNode(_component_UButton, {
                        color: "primary",
                        loading: vueExports.unref(isCreating),
                        onClick: createBlankWorkflow
                      }, {
                        default: vueExports.withCtx(() => [
                          vueExports.createTextVNode(" 创建 ")
                        ]),
                        _: 1
                      }, 8, ["loading"])
                    ])
                  ];
                }
              }),
              default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="space-y-4"${_scopeId2}>`);
                  _push3(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UFormField, { label: "工作流名称" }, {
                    default: vueExports.withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UInput, {
                          modelValue: vueExports.unref(newWorkflowName),
                          "onUpdate:modelValue": ($event) => vueExports.isRef(newWorkflowName) ? newWorkflowName.value = $event : null,
                          placeholder: "输入工作流名称",
                          onKeyup: createBlankWorkflow
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          vueExports.createVNode(_component_UInput, {
                            modelValue: vueExports.unref(newWorkflowName),
                            "onUpdate:modelValue": ($event) => vueExports.isRef(newWorkflowName) ? newWorkflowName.value = $event : null,
                            placeholder: "输入工作流名称",
                            onKeyup: vueExports.withKeys(createBlankWorkflow, ["enter"])
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    vueExports.createVNode("div", { class: "space-y-4" }, [
                      vueExports.createVNode(_component_UFormField, { label: "工作流名称" }, {
                        default: vueExports.withCtx(() => [
                          vueExports.createVNode(_component_UInput, {
                            modelValue: vueExports.unref(newWorkflowName),
                            "onUpdate:modelValue": ($event) => vueExports.isRef(newWorkflowName) ? newWorkflowName.value = $event : null,
                            placeholder: "输入工作流名称",
                            onKeyup: vueExports.withKeys(createBlankWorkflow, ["enter"])
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      })
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              vueExports.createVNode(_component_UCard, null, {
                header: vueExports.withCtx(() => [
                  vueExports.createVNode("div", { class: "flex items-center justify-between" }, [
                    vueExports.createVNode("h3", { class: "text-lg font-medium" }, "新建工作流"),
                    vueExports.createVNode(_component_UButton, {
                      variant: "ghost",
                      size: "xs",
                      onClick: ($event) => showNewModal.value = false
                    }, {
                      default: vueExports.withCtx(() => [
                        vueExports.createVNode(_component_UIcon, {
                          name: "i-heroicons-x-mark",
                          class: "w-5 h-5"
                        })
                      ]),
                      _: 1
                    }, 8, ["onClick"])
                  ])
                ]),
                footer: vueExports.withCtx(() => [
                  vueExports.createVNode("div", { class: "flex justify-end gap-2" }, [
                    vueExports.createVNode(_component_UButton, {
                      variant: "ghost",
                      onClick: ($event) => showNewModal.value = false
                    }, {
                      default: vueExports.withCtx(() => [
                        vueExports.createTextVNode("取消")
                      ]),
                      _: 1
                    }, 8, ["onClick"]),
                    vueExports.createVNode(_component_UButton, {
                      color: "primary",
                      loading: vueExports.unref(isCreating),
                      onClick: createBlankWorkflow
                    }, {
                      default: vueExports.withCtx(() => [
                        vueExports.createTextVNode(" 创建 ")
                      ]),
                      _: 1
                    }, 8, ["loading"])
                  ])
                ]),
                default: vueExports.withCtx(() => [
                  vueExports.createVNode("div", { class: "space-y-4" }, [
                    vueExports.createVNode(_component_UFormField, { label: "工作流名称" }, {
                      default: vueExports.withCtx(() => [
                        vueExports.createVNode(_component_UInput, {
                          modelValue: vueExports.unref(newWorkflowName),
                          "onUpdate:modelValue": ($event) => vueExports.isRef(newWorkflowName) ? newWorkflowName.value = $event : null,
                          placeholder: "输入工作流名称",
                          onKeyup: vueExports.withKeys(createBlankWorkflow, ["enter"])
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    })
                  ])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UModal, {
        open: vueExports.unref(showDeleteModal),
        "onUpdate:open": ($event) => vueExports.isRef(showDeleteModal) ? showDeleteModal.value = $event : null
      }, {
        content: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UCard, null, {
              header: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<h3 class="text-lg font-medium"${_scopeId2}>确认删除</h3>`);
                } else {
                  return [
                    vueExports.createVNode("h3", { class: "text-lg font-medium" }, "确认删除")
                  ];
                }
              }),
              footer: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex justify-end gap-2"${_scopeId2}>`);
                  _push3(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UButton, {
                    variant: "ghost",
                    onClick: ($event) => showDeleteModal.value = false
                  }, {
                    default: vueExports.withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`取消`);
                      } else {
                        return [
                          vueExports.createTextVNode("取消")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UButton, {
                    color: "error",
                    loading: vueExports.unref(isDeleting),
                    onClick: deleteWorkflow
                  }, {
                    default: vueExports.withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` 删除 `);
                      } else {
                        return [
                          vueExports.createTextVNode(" 删除 ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    vueExports.createVNode("div", { class: "flex justify-end gap-2" }, [
                      vueExports.createVNode(_component_UButton, {
                        variant: "ghost",
                        onClick: ($event) => showDeleteModal.value = false
                      }, {
                        default: vueExports.withCtx(() => [
                          vueExports.createTextVNode("取消")
                        ]),
                        _: 1
                      }, 8, ["onClick"]),
                      vueExports.createVNode(_component_UButton, {
                        color: "error",
                        loading: vueExports.unref(isDeleting),
                        onClick: deleteWorkflow
                      }, {
                        default: vueExports.withCtx(() => [
                          vueExports.createTextVNode(" 删除 ")
                        ]),
                        _: 1
                      }, 8, ["loading"])
                    ])
                  ];
                }
              }),
              default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p class="text-(--ui-text-muted)"${_scopeId2}> 确定要删除工作流「${serverRenderer_cjs_prodExports.ssrInterpolate(vueExports.unref(deleteTarget)?.name)}」吗？此操作不可恢复。 </p>`);
                } else {
                  return [
                    vueExports.createVNode("p", { class: "text-(--ui-text-muted)" }, " 确定要删除工作流「" + vueExports.toDisplayString(vueExports.unref(deleteTarget)?.name) + "」吗？此操作不可恢复。 ", 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              vueExports.createVNode(_component_UCard, null, {
                header: vueExports.withCtx(() => [
                  vueExports.createVNode("h3", { class: "text-lg font-medium" }, "确认删除")
                ]),
                footer: vueExports.withCtx(() => [
                  vueExports.createVNode("div", { class: "flex justify-end gap-2" }, [
                    vueExports.createVNode(_component_UButton, {
                      variant: "ghost",
                      onClick: ($event) => showDeleteModal.value = false
                    }, {
                      default: vueExports.withCtx(() => [
                        vueExports.createTextVNode("取消")
                      ]),
                      _: 1
                    }, 8, ["onClick"]),
                    vueExports.createVNode(_component_UButton, {
                      color: "error",
                      loading: vueExports.unref(isDeleting),
                      onClick: deleteWorkflow
                    }, {
                      default: vueExports.withCtx(() => [
                        vueExports.createTextVNode(" 删除 ")
                      ]),
                      _: 1
                    }, 8, ["loading"])
                  ])
                ]),
                default: vueExports.withCtx(() => [
                  vueExports.createVNode("p", { class: "text-(--ui-text-muted)" }, " 确定要删除工作流「" + vueExports.toDisplayString(vueExports.unref(deleteTarget)?.name) + "」吗？此操作不可恢复。 ", 1)
                ]),
                _: 1
              })
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/workflows.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=workflows-69qa7R18.mjs.map
