import { _ as __nuxt_component_0 } from './Layout-BXExKpWc.mjs';
import { v as vueExports, i as useRoute$1, h as useRouter, g as useToast, s as serverRenderer_cjs_prodExports, c as _sfc_main$8, b as _sfc_main$d, e as useAppConfig, q as useForwardPropsEmits, r as reactivePick, t as tv, z as _sfc_main$b, L as get, m as useForwardExpose, k as useVModel, l as createContext, P as Primitive, R as useResizeObserver, p as Presence_default } from './server.mjs';
import { _ as _sfc_main$2 } from './Form-CigZWYkv.mjs';
import { _ as _sfc_main$3 } from './FormField-CGip9Bav.mjs';
import { _ as _sfc_main$4 } from './Input-A_WPZx9s.mjs';
import { a as _sfc_main$1$1, _ as _sfc_main$6 } from './SelectMenu-BgHNqFCX.mjs';
import { _ as _sfc_main$5 } from './Textarea-Dhde2llm.mjs';
import { u as useDirection, R as RovingFocusGroup_default } from './RovingFocusGroup-CN9Tim1l.mjs';
import { u as useId } from './utils-DCnNb5Bf.mjs';
import { R as RovingFocusItem_default } from './RovingFocusItem-BmQWMeQk.mjs';
import { _ as _sfc_main$9 } from './Badge-DaygVYHa.mjs';
import { _ as _sfc_main$7 } from './Modal-DTUEXzQH.mjs';
import { A as API_FORMAT_LABELS, M as MODEL_TYPE_LABELS, V as VIDEO_MODEL_TYPES, t as DEFAULT_MODEL_NAMES, I as IMAGE_MODEL_TYPES, u as inferChatModelType, v as MODEL_API_FORMAT_OPTIONS, n as DEFAULT_VIDEO_ESTIMATED_TIMES, w as DEFAULT_ESTIMATED_TIMES } from './constants-Bq60BfFZ.mjs';
import { u as useUpstreams } from './useUpstreams-CU2PuBUF.mjs';
import './Drawer-B6XEXTdS.mjs';
import './DialogTrigger-DZAnfNyf.mjs';
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
import './Label-CV5OSAkM.mjs';
import './VisuallyHiddenInput-y7wD6Rzm.mjs';
import './PopperArrow-_X1u5CFX.mjs';

const [injectTabsRootContext, provideTabsRootContext] = createContext("TabsRoot");
var TabsRoot_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
  __name: "TabsRoot",
  props: {
    defaultValue: {
      type: null,
      required: false
    },
    orientation: {
      type: String,
      required: false,
      default: "horizontal"
    },
    dir: {
      type: String,
      required: false
    },
    activationMode: {
      type: String,
      required: false,
      default: "automatic"
    },
    modelValue: {
      type: null,
      required: false
    },
    unmountOnHide: {
      type: Boolean,
      required: false,
      default: true
    },
    asChild: {
      type: Boolean,
      required: false
    },
    as: {
      type: null,
      required: false
    }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const { orientation, unmountOnHide, dir: propDir } = vueExports.toRefs(props);
    const dir = useDirection(propDir);
    useForwardExpose();
    const modelValue = useVModel(props, "modelValue", emits, {
      defaultValue: props.defaultValue,
      passive: props.modelValue === void 0
    });
    const tabsList = vueExports.ref();
    provideTabsRootContext({
      modelValue,
      changeModelValue: (value) => {
        modelValue.value = value;
      },
      orientation,
      dir,
      unmountOnHide,
      activationMode: props.activationMode,
      baseId: useId(void 0, "reka-tabs"),
      tabsList
    });
    return (_ctx, _cache) => {
      return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(Primitive), {
        dir: vueExports.unref(dir),
        "data-orientation": vueExports.unref(orientation),
        "as-child": _ctx.asChild,
        as: _ctx.as
      }, {
        default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default", { modelValue: vueExports.unref(modelValue) })]),
        _: 3
      }, 8, [
        "dir",
        "data-orientation",
        "as-child",
        "as"
      ]);
    };
  }
});
var TabsRoot_default = TabsRoot_vue_vue_type_script_setup_true_lang_default;
function makeTriggerId(baseId, value) {
  return `${baseId}-trigger-${value}`;
}
function makeContentId(baseId, value) {
  return `${baseId}-content-${value}`;
}
var TabsContent_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
  __name: "TabsContent",
  props: {
    value: {
      type: [String, Number],
      required: true
    },
    forceMount: {
      type: Boolean,
      required: false
    },
    asChild: {
      type: Boolean,
      required: false
    },
    as: {
      type: null,
      required: false
    }
  },
  setup(__props) {
    const props = __props;
    const { forwardRef } = useForwardExpose();
    const rootContext = injectTabsRootContext();
    const triggerId = vueExports.computed(() => makeTriggerId(rootContext.baseId, props.value));
    const contentId = vueExports.computed(() => makeContentId(rootContext.baseId, props.value));
    const isSelected = vueExports.computed(() => props.value === rootContext.modelValue.value);
    const isMountAnimationPreventedRef = vueExports.ref(isSelected.value);
    return (_ctx, _cache) => {
      return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(Presence_default), {
        present: _ctx.forceMount || isSelected.value,
        "force-mount": ""
      }, {
        default: vueExports.withCtx(({ present }) => [vueExports.createVNode(vueExports.unref(Primitive), {
          id: contentId.value,
          ref: vueExports.unref(forwardRef),
          "as-child": _ctx.asChild,
          as: _ctx.as,
          role: "tabpanel",
          "data-state": isSelected.value ? "active" : "inactive",
          "data-orientation": vueExports.unref(rootContext).orientation.value,
          "aria-labelledby": triggerId.value,
          hidden: !present,
          tabindex: "0",
          style: vueExports.normalizeStyle({ animationDuration: isMountAnimationPreventedRef.value ? "0s" : void 0 })
        }, {
          default: vueExports.withCtx(() => [(vueExports.unref(rootContext).unmountOnHide.value ? present : true) ? vueExports.renderSlot(_ctx.$slots, "default", { key: 0 }) : vueExports.createCommentVNode("v-if", true)]),
          _: 2
        }, 1032, [
          "id",
          "as-child",
          "as",
          "data-state",
          "data-orientation",
          "aria-labelledby",
          "hidden",
          "style"
        ])]),
        _: 3
      }, 8, ["present"]);
    };
  }
});
var TabsContent_default = TabsContent_vue_vue_type_script_setup_true_lang_default;
var TabsIndicator_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
  __name: "TabsIndicator",
  props: {
    asChild: {
      type: Boolean,
      required: false
    },
    as: {
      type: null,
      required: false
    }
  },
  setup(__props) {
    const props = __props;
    const context = injectTabsRootContext();
    useForwardExpose();
    const activeTab = vueExports.ref();
    const indicatorStyle = vueExports.ref({
      size: null,
      position: null
    });
    vueExports.watch(() => [context.modelValue.value, context?.dir.value], async () => {
      await vueExports.nextTick();
      updateIndicatorStyle();
    }, { immediate: true });
    useResizeObserver([context.tabsList, activeTab], updateIndicatorStyle);
    function updateIndicatorStyle() {
      activeTab.value = context.tabsList.value?.querySelector('[role="tab"][data-state="active"]');
      if (!activeTab.value) return;
      if (context.orientation.value === "horizontal") indicatorStyle.value = {
        size: activeTab.value.offsetWidth,
        position: activeTab.value.offsetLeft
      };
      else indicatorStyle.value = {
        size: activeTab.value.offsetHeight,
        position: activeTab.value.offsetTop
      };
    }
    return (_ctx, _cache) => {
      return typeof indicatorStyle.value.size === "number" ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(Primitive), vueExports.mergeProps({ key: 0 }, props, { style: {
        "--reka-tabs-indicator-size": `${indicatorStyle.value.size}px`,
        "--reka-tabs-indicator-position": `${indicatorStyle.value.position}px`
      } }), {
        default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
        _: 3
      }, 16, ["style"])) : vueExports.createCommentVNode("v-if", true);
    };
  }
});
var TabsIndicator_default = TabsIndicator_vue_vue_type_script_setup_true_lang_default;
var TabsList_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
  __name: "TabsList",
  props: {
    loop: {
      type: Boolean,
      required: false,
      default: true
    },
    asChild: {
      type: Boolean,
      required: false
    },
    as: {
      type: null,
      required: false
    }
  },
  setup(__props) {
    const props = __props;
    const { loop } = vueExports.toRefs(props);
    const { forwardRef, currentElement } = useForwardExpose();
    const context = injectTabsRootContext();
    context.tabsList = currentElement;
    return (_ctx, _cache) => {
      return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(RovingFocusGroup_default), {
        "as-child": "",
        orientation: vueExports.unref(context).orientation.value,
        dir: vueExports.unref(context).dir.value,
        loop: vueExports.unref(loop)
      }, {
        default: vueExports.withCtx(() => [vueExports.createVNode(vueExports.unref(Primitive), {
          ref: vueExports.unref(forwardRef),
          role: "tablist",
          "as-child": _ctx.asChild,
          as: _ctx.as,
          "aria-orientation": vueExports.unref(context).orientation.value
        }, {
          default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
          _: 3
        }, 8, [
          "as-child",
          "as",
          "aria-orientation"
        ])]),
        _: 3
      }, 8, [
        "orientation",
        "dir",
        "loop"
      ]);
    };
  }
});
var TabsList_default = TabsList_vue_vue_type_script_setup_true_lang_default;
var TabsTrigger_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
  __name: "TabsTrigger",
  props: {
    value: {
      type: [String, Number],
      required: true
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false
    },
    asChild: {
      type: Boolean,
      required: false
    },
    as: {
      type: null,
      required: false,
      default: "button"
    }
  },
  setup(__props) {
    const props = __props;
    const { forwardRef } = useForwardExpose();
    const rootContext = injectTabsRootContext();
    const triggerId = vueExports.computed(() => makeTriggerId(rootContext.baseId, props.value));
    const contentId = vueExports.computed(() => makeContentId(rootContext.baseId, props.value));
    const isSelected = vueExports.computed(() => props.value === rootContext.modelValue.value);
    return (_ctx, _cache) => {
      return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(RovingFocusItem_default), {
        "as-child": "",
        focusable: !_ctx.disabled,
        active: isSelected.value
      }, {
        default: vueExports.withCtx(() => [vueExports.createVNode(vueExports.unref(Primitive), {
          id: triggerId.value,
          ref: vueExports.unref(forwardRef),
          role: "tab",
          type: _ctx.as === "button" ? "button" : void 0,
          as: _ctx.as,
          "as-child": _ctx.asChild,
          "aria-selected": isSelected.value ? "true" : "false",
          "aria-controls": contentId.value,
          "data-state": isSelected.value ? "active" : "inactive",
          disabled: _ctx.disabled,
          "data-disabled": _ctx.disabled ? "" : void 0,
          "data-orientation": vueExports.unref(rootContext).orientation.value,
          onMousedown: _cache[0] || (_cache[0] = vueExports.withModifiers((event) => {
            if (!_ctx.disabled && event.ctrlKey === false) vueExports.unref(rootContext).changeModelValue(_ctx.value);
            else event.preventDefault();
          }, ["left"])),
          onKeydown: _cache[1] || (_cache[1] = vueExports.withKeys(($event) => vueExports.unref(rootContext).changeModelValue(_ctx.value), ["enter", "space"])),
          onFocus: _cache[2] || (_cache[2] = () => {
            const isAutomaticActivation = vueExports.unref(rootContext).activationMode !== "manual";
            if (!isSelected.value && !_ctx.disabled && isAutomaticActivation) vueExports.unref(rootContext).changeModelValue(_ctx.value);
          })
        }, {
          default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
          _: 3
        }, 8, [
          "id",
          "type",
          "as",
          "as-child",
          "aria-selected",
          "aria-controls",
          "data-state",
          "disabled",
          "data-disabled",
          "data-orientation"
        ])]),
        _: 3
      }, 8, ["focusable", "active"]);
    };
  }
});
var TabsTrigger_default = TabsTrigger_vue_vue_type_script_setup_true_lang_default;
const theme = {
  "slots": {
    "root": "flex items-center gap-2",
    "list": "relative flex p-1 group",
    "indicator": "absolute transition-[translate,width] duration-200",
    "trigger": [
      "group relative inline-flex items-center min-w-0 data-[state=inactive]:text-muted hover:data-[state=inactive]:not-disabled:text-default font-medium rounded-md disabled:cursor-not-allowed disabled:opacity-75",
      "transition-colors"
    ],
    "leadingIcon": "shrink-0",
    "leadingAvatar": "shrink-0",
    "leadingAvatarSize": "",
    "label": "truncate",
    "trailingBadge": "shrink-0",
    "trailingBadgeSize": "sm",
    "content": "focus:outline-none w-full"
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
      "pill": {
        "list": "bg-elevated rounded-lg",
        "trigger": "grow",
        "indicator": "rounded-md shadow-xs"
      },
      "link": {
        "list": "border-default",
        "indicator": "rounded-full",
        "trigger": "focus:outline-none"
      }
    },
    "orientation": {
      "horizontal": {
        "root": "flex-col",
        "list": "w-full",
        "indicator": "left-0 w-(--reka-tabs-indicator-size) translate-x-(--reka-tabs-indicator-position)",
        "trigger": "justify-center"
      },
      "vertical": {
        "list": "flex-col",
        "indicator": "top-0 h-(--reka-tabs-indicator-size) translate-y-(--reka-tabs-indicator-position)"
      }
    },
    "size": {
      "xs": {
        "trigger": "px-2 py-1 text-xs gap-1",
        "leadingIcon": "size-4",
        "leadingAvatarSize": "3xs"
      },
      "sm": {
        "trigger": "px-2.5 py-1.5 text-xs gap-1.5",
        "leadingIcon": "size-4",
        "leadingAvatarSize": "3xs"
      },
      "md": {
        "trigger": "px-3 py-1.5 text-sm gap-1.5",
        "leadingIcon": "size-5",
        "leadingAvatarSize": "2xs"
      },
      "lg": {
        "trigger": "px-3 py-2 text-sm gap-2",
        "leadingIcon": "size-5",
        "leadingAvatarSize": "2xs"
      },
      "xl": {
        "trigger": "px-3 py-2 text-base gap-2",
        "leadingIcon": "size-6",
        "leadingAvatarSize": "xs"
      }
    }
  },
  "compoundVariants": [
    {
      "orientation": "horizontal",
      "variant": "pill",
      "class": {
        "indicator": "inset-y-1"
      }
    },
    {
      "orientation": "horizontal",
      "variant": "link",
      "class": {
        "list": "border-b -mb-px",
        "indicator": "-bottom-px h-px"
      }
    },
    {
      "orientation": "vertical",
      "variant": "pill",
      "class": {
        "indicator": "inset-x-1",
        "list": "items-center"
      }
    },
    {
      "orientation": "vertical",
      "variant": "link",
      "class": {
        "list": "border-s -ms-px",
        "indicator": "-start-px w-px"
      }
    },
    {
      "color": "primary",
      "variant": "pill",
      "class": {
        "indicator": "bg-primary",
        "trigger": "data-[state=active]:text-inverted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      }
    },
    {
      "color": "secondary",
      "variant": "pill",
      "class": {
        "indicator": "bg-secondary",
        "trigger": "data-[state=active]:text-inverted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
      }
    },
    {
      "color": "success",
      "variant": "pill",
      "class": {
        "indicator": "bg-success",
        "trigger": "data-[state=active]:text-inverted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-success"
      }
    },
    {
      "color": "info",
      "variant": "pill",
      "class": {
        "indicator": "bg-info",
        "trigger": "data-[state=active]:text-inverted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-info"
      }
    },
    {
      "color": "warning",
      "variant": "pill",
      "class": {
        "indicator": "bg-warning",
        "trigger": "data-[state=active]:text-inverted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-warning"
      }
    },
    {
      "color": "error",
      "variant": "pill",
      "class": {
        "indicator": "bg-error",
        "trigger": "data-[state=active]:text-inverted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-error"
      }
    },
    {
      "color": "neutral",
      "variant": "pill",
      "class": {
        "indicator": "bg-inverted",
        "trigger": "data-[state=active]:text-inverted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-inverted"
      }
    },
    {
      "color": "primary",
      "variant": "link",
      "class": {
        "indicator": "bg-primary",
        "trigger": "data-[state=active]:text-primary focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"
      }
    },
    {
      "color": "secondary",
      "variant": "link",
      "class": {
        "indicator": "bg-secondary",
        "trigger": "data-[state=active]:text-secondary focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-secondary"
      }
    },
    {
      "color": "success",
      "variant": "link",
      "class": {
        "indicator": "bg-success",
        "trigger": "data-[state=active]:text-success focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-success"
      }
    },
    {
      "color": "info",
      "variant": "link",
      "class": {
        "indicator": "bg-info",
        "trigger": "data-[state=active]:text-info focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-info"
      }
    },
    {
      "color": "warning",
      "variant": "link",
      "class": {
        "indicator": "bg-warning",
        "trigger": "data-[state=active]:text-warning focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-warning"
      }
    },
    {
      "color": "error",
      "variant": "link",
      "class": {
        "indicator": "bg-error",
        "trigger": "data-[state=active]:text-error focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-error"
      }
    },
    {
      "color": "neutral",
      "variant": "link",
      "class": {
        "indicator": "bg-inverted",
        "trigger": "data-[state=active]:text-highlighted focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-inverted"
      }
    }
  ],
  "defaultVariants": {
    "color": "primary",
    "variant": "pill",
    "size": "md"
  }
};
const _sfc_main$1 = {
  __name: "UTabs",
  __ssrInlineRender: true,
  props: {
    as: { type: null, required: false },
    items: { type: Array, required: false },
    color: { type: null, required: false },
    variant: { type: null, required: false },
    size: { type: null, required: false },
    orientation: { type: null, required: false, default: "horizontal" },
    content: { type: Boolean, required: false, default: true },
    labelKey: { type: null, required: false, default: "label" },
    class: { type: null, required: false },
    ui: { type: null, required: false },
    defaultValue: { type: null, required: false, default: "0" },
    modelValue: { type: null, required: false },
    activationMode: { type: String, required: false },
    unmountOnHide: { type: Boolean, required: false, default: true }
  },
  emits: ["update:modelValue"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const slots = vueExports.useSlots();
    const appConfig = useAppConfig();
    const rootProps = useForwardPropsEmits(reactivePick(props, "as", "unmountOnHide"), emits);
    const ui = vueExports.computed(() => tv({ extend: tv(theme), ...appConfig.ui?.tabs || {} })({
      color: props.color,
      variant: props.variant,
      size: props.size,
      orientation: props.orientation
    }));
    const triggersRef = vueExports.ref([]);
    __expose({
      triggersRef
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(serverRenderer_cjs_prodExports.ssrRenderComponent(vueExports.unref(TabsRoot_default), vueExports.mergeProps(vueExports.unref(rootProps), {
        "model-value": __props.modelValue,
        "default-value": __props.defaultValue,
        orientation: __props.orientation,
        "activation-mode": __props.activationMode,
        "data-slot": "root",
        class: ui.value.root({ class: [props.ui?.root, props.class] })
      }, _attrs), {
        default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(vueExports.unref(TabsList_default), {
              "data-slot": "list",
              class: ui.value.list({ class: props.ui?.list })
            }, {
              default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(serverRenderer_cjs_prodExports.ssrRenderComponent(vueExports.unref(TabsIndicator_default), {
                    "data-slot": "indicator",
                    class: ui.value.indicator({ class: props.ui?.indicator })
                  }, null, _parent3, _scopeId2));
                  serverRenderer_cjs_prodExports.ssrRenderSlot(_ctx.$slots, "list-leading", {}, null, _push3, _parent3, _scopeId2);
                  _push3(`<!--[-->`);
                  serverRenderer_cjs_prodExports.ssrRenderList(__props.items, (item, index) => {
                    _push3(serverRenderer_cjs_prodExports.ssrRenderComponent(vueExports.unref(TabsTrigger_default), {
                      key: index,
                      ref_for: true,
                      ref: (el) => triggersRef.value[index] = el,
                      value: item.value ?? String(index),
                      disabled: item.disabled,
                      "data-slot": "trigger",
                      class: ui.value.trigger({ class: [props.ui?.trigger, item.ui?.trigger] })
                    }, {
                      default: vueExports.withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          serverRenderer_cjs_prodExports.ssrRenderSlot(_ctx.$slots, "leading", {
                            item,
                            index,
                            ui: ui.value
                          }, () => {
                            if (item.icon) {
                              _push4(serverRenderer_cjs_prodExports.ssrRenderComponent(_sfc_main$d, {
                                name: item.icon,
                                "data-slot": "leadingIcon",
                                class: ui.value.leadingIcon({ class: [props.ui?.leadingIcon, item.ui?.leadingIcon] })
                              }, null, _parent4, _scopeId3));
                            } else if (item.avatar) {
                              _push4(serverRenderer_cjs_prodExports.ssrRenderComponent(_sfc_main$b, vueExports.mergeProps({
                                size: item.ui?.leadingAvatarSize || props.ui?.leadingAvatarSize || ui.value.leadingAvatarSize()
                              }, { ref_for: true }, item.avatar, {
                                "data-slot": "leadingAvatar",
                                class: ui.value.leadingAvatar({ class: [props.ui?.leadingAvatar, item.ui?.leadingAvatar] })
                              }), null, _parent4, _scopeId3));
                            } else {
                              _push4(`<!---->`);
                            }
                          }, _push4, _parent4, _scopeId3);
                          if (vueExports.unref(get)(item, props.labelKey) || !!slots.default) {
                            _push4(`<span data-slot="label" class="${serverRenderer_cjs_prodExports.ssrRenderClass(ui.value.label({ class: [props.ui?.label, item.ui?.label] }))}"${_scopeId3}>`);
                            serverRenderer_cjs_prodExports.ssrRenderSlot(_ctx.$slots, "default", {
                              item,
                              index
                            }, () => {
                              _push4(`${serverRenderer_cjs_prodExports.ssrInterpolate(vueExports.unref(get)(item, props.labelKey))}`);
                            }, _push4, _parent4, _scopeId3);
                            _push4(`</span>`);
                          } else {
                            _push4(`<!---->`);
                          }
                          serverRenderer_cjs_prodExports.ssrRenderSlot(_ctx.$slots, "trailing", {
                            item,
                            index,
                            ui: ui.value
                          }, () => {
                            if (item.badge || item.badge === 0) {
                              _push4(serverRenderer_cjs_prodExports.ssrRenderComponent(_sfc_main$9, vueExports.mergeProps({
                                color: "neutral",
                                variant: "outline",
                                size: item.ui?.trailingBadgeSize || props.ui?.trailingBadgeSize || ui.value.trailingBadgeSize()
                              }, { ref_for: true }, typeof item.badge === "string" || typeof item.badge === "number" ? { label: item.badge } : item.badge, {
                                "data-slot": "trailingBadge",
                                class: ui.value.trailingBadge({ class: [props.ui?.trailingBadge, item.ui?.trailingBadge] })
                              }), null, _parent4, _scopeId3));
                            } else {
                              _push4(`<!---->`);
                            }
                          }, _push4, _parent4, _scopeId3);
                        } else {
                          return [
                            vueExports.renderSlot(_ctx.$slots, "leading", {
                              item,
                              index,
                              ui: ui.value
                            }, () => [
                              item.icon ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$d, {
                                key: 0,
                                name: item.icon,
                                "data-slot": "leadingIcon",
                                class: ui.value.leadingIcon({ class: [props.ui?.leadingIcon, item.ui?.leadingIcon] })
                              }, null, 8, ["name", "class"])) : item.avatar ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$b, vueExports.mergeProps({
                                key: 1,
                                size: item.ui?.leadingAvatarSize || props.ui?.leadingAvatarSize || ui.value.leadingAvatarSize()
                              }, { ref_for: true }, item.avatar, {
                                "data-slot": "leadingAvatar",
                                class: ui.value.leadingAvatar({ class: [props.ui?.leadingAvatar, item.ui?.leadingAvatar] })
                              }), null, 16, ["size", "class"])) : vueExports.createCommentVNode("", true)
                            ]),
                            vueExports.unref(get)(item, props.labelKey) || !!slots.default ? (vueExports.openBlock(), vueExports.createBlock("span", {
                              key: 0,
                              "data-slot": "label",
                              class: ui.value.label({ class: [props.ui?.label, item.ui?.label] })
                            }, [
                              vueExports.renderSlot(_ctx.$slots, "default", {
                                item,
                                index
                              }, () => [
                                vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(get)(item, props.labelKey)), 1)
                              ])
                            ], 2)) : vueExports.createCommentVNode("", true),
                            vueExports.renderSlot(_ctx.$slots, "trailing", {
                              item,
                              index,
                              ui: ui.value
                            }, () => [
                              item.badge || item.badge === 0 ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$9, vueExports.mergeProps({
                                key: 0,
                                color: "neutral",
                                variant: "outline",
                                size: item.ui?.trailingBadgeSize || props.ui?.trailingBadgeSize || ui.value.trailingBadgeSize()
                              }, { ref_for: true }, typeof item.badge === "string" || typeof item.badge === "number" ? { label: item.badge } : item.badge, {
                                "data-slot": "trailingBadge",
                                class: ui.value.trailingBadge({ class: [props.ui?.trailingBadge, item.ui?.trailingBadge] })
                              }), null, 16, ["size", "class"])) : vueExports.createCommentVNode("", true)
                            ])
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  });
                  _push3(`<!--]-->`);
                  serverRenderer_cjs_prodExports.ssrRenderSlot(_ctx.$slots, "list-trailing", {}, null, _push3, _parent3, _scopeId2);
                } else {
                  return [
                    vueExports.createVNode(vueExports.unref(TabsIndicator_default), {
                      "data-slot": "indicator",
                      class: ui.value.indicator({ class: props.ui?.indicator })
                    }, null, 8, ["class"]),
                    vueExports.renderSlot(_ctx.$slots, "list-leading"),
                    (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(__props.items, (item, index) => {
                      return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(TabsTrigger_default), {
                        key: index,
                        ref_for: true,
                        ref: (el) => triggersRef.value[index] = el,
                        value: item.value ?? String(index),
                        disabled: item.disabled,
                        "data-slot": "trigger",
                        class: ui.value.trigger({ class: [props.ui?.trigger, item.ui?.trigger] })
                      }, {
                        default: vueExports.withCtx(() => [
                          vueExports.renderSlot(_ctx.$slots, "leading", {
                            item,
                            index,
                            ui: ui.value
                          }, () => [
                            item.icon ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$d, {
                              key: 0,
                              name: item.icon,
                              "data-slot": "leadingIcon",
                              class: ui.value.leadingIcon({ class: [props.ui?.leadingIcon, item.ui?.leadingIcon] })
                            }, null, 8, ["name", "class"])) : item.avatar ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$b, vueExports.mergeProps({
                              key: 1,
                              size: item.ui?.leadingAvatarSize || props.ui?.leadingAvatarSize || ui.value.leadingAvatarSize()
                            }, { ref_for: true }, item.avatar, {
                              "data-slot": "leadingAvatar",
                              class: ui.value.leadingAvatar({ class: [props.ui?.leadingAvatar, item.ui?.leadingAvatar] })
                            }), null, 16, ["size", "class"])) : vueExports.createCommentVNode("", true)
                          ]),
                          vueExports.unref(get)(item, props.labelKey) || !!slots.default ? (vueExports.openBlock(), vueExports.createBlock("span", {
                            key: 0,
                            "data-slot": "label",
                            class: ui.value.label({ class: [props.ui?.label, item.ui?.label] })
                          }, [
                            vueExports.renderSlot(_ctx.$slots, "default", {
                              item,
                              index
                            }, () => [
                              vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(get)(item, props.labelKey)), 1)
                            ])
                          ], 2)) : vueExports.createCommentVNode("", true),
                          vueExports.renderSlot(_ctx.$slots, "trailing", {
                            item,
                            index,
                            ui: ui.value
                          }, () => [
                            item.badge || item.badge === 0 ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$9, vueExports.mergeProps({
                              key: 0,
                              color: "neutral",
                              variant: "outline",
                              size: item.ui?.trailingBadgeSize || props.ui?.trailingBadgeSize || ui.value.trailingBadgeSize()
                            }, { ref_for: true }, typeof item.badge === "string" || typeof item.badge === "number" ? { label: item.badge } : item.badge, {
                              "data-slot": "trailingBadge",
                              class: ui.value.trailingBadge({ class: [props.ui?.trailingBadge, item.ui?.trailingBadge] })
                            }), null, 16, ["size", "class"])) : vueExports.createCommentVNode("", true)
                          ])
                        ]),
                        _: 2
                      }, 1032, ["value", "disabled", "class"]);
                    }), 128)),
                    vueExports.renderSlot(_ctx.$slots, "list-trailing")
                  ];
                }
              }),
              _: 3
            }, _parent2, _scopeId));
            if (!!__props.content) {
              _push2(`<!--[-->`);
              serverRenderer_cjs_prodExports.ssrRenderList(__props.items, (item, index) => {
                _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(vueExports.unref(TabsContent_default), {
                  key: index,
                  value: item.value ?? String(index),
                  "data-slot": "content",
                  class: ui.value.content({ class: [props.ui?.content, item.ui?.content, item.class] })
                }, {
                  default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      serverRenderer_cjs_prodExports.ssrRenderSlot(_ctx.$slots, item.slot || "content", {
                        item,
                        index,
                        ui: ui.value
                      }, () => {
                        _push3(`${serverRenderer_cjs_prodExports.ssrInterpolate(item.content)}`);
                      }, _push3, _parent3, _scopeId2);
                    } else {
                      return [
                        vueExports.renderSlot(_ctx.$slots, item.slot || "content", {
                          item,
                          index,
                          ui: ui.value
                        }, () => [
                          vueExports.createTextVNode(vueExports.toDisplayString(item.content), 1)
                        ])
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
              });
              _push2(`<!--]-->`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              vueExports.createVNode(vueExports.unref(TabsList_default), {
                "data-slot": "list",
                class: ui.value.list({ class: props.ui?.list })
              }, {
                default: vueExports.withCtx(() => [
                  vueExports.createVNode(vueExports.unref(TabsIndicator_default), {
                    "data-slot": "indicator",
                    class: ui.value.indicator({ class: props.ui?.indicator })
                  }, null, 8, ["class"]),
                  vueExports.renderSlot(_ctx.$slots, "list-leading"),
                  (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(__props.items, (item, index) => {
                    return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(TabsTrigger_default), {
                      key: index,
                      ref_for: true,
                      ref: (el) => triggersRef.value[index] = el,
                      value: item.value ?? String(index),
                      disabled: item.disabled,
                      "data-slot": "trigger",
                      class: ui.value.trigger({ class: [props.ui?.trigger, item.ui?.trigger] })
                    }, {
                      default: vueExports.withCtx(() => [
                        vueExports.renderSlot(_ctx.$slots, "leading", {
                          item,
                          index,
                          ui: ui.value
                        }, () => [
                          item.icon ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$d, {
                            key: 0,
                            name: item.icon,
                            "data-slot": "leadingIcon",
                            class: ui.value.leadingIcon({ class: [props.ui?.leadingIcon, item.ui?.leadingIcon] })
                          }, null, 8, ["name", "class"])) : item.avatar ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$b, vueExports.mergeProps({
                            key: 1,
                            size: item.ui?.leadingAvatarSize || props.ui?.leadingAvatarSize || ui.value.leadingAvatarSize()
                          }, { ref_for: true }, item.avatar, {
                            "data-slot": "leadingAvatar",
                            class: ui.value.leadingAvatar({ class: [props.ui?.leadingAvatar, item.ui?.leadingAvatar] })
                          }), null, 16, ["size", "class"])) : vueExports.createCommentVNode("", true)
                        ]),
                        vueExports.unref(get)(item, props.labelKey) || !!slots.default ? (vueExports.openBlock(), vueExports.createBlock("span", {
                          key: 0,
                          "data-slot": "label",
                          class: ui.value.label({ class: [props.ui?.label, item.ui?.label] })
                        }, [
                          vueExports.renderSlot(_ctx.$slots, "default", {
                            item,
                            index
                          }, () => [
                            vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(get)(item, props.labelKey)), 1)
                          ])
                        ], 2)) : vueExports.createCommentVNode("", true),
                        vueExports.renderSlot(_ctx.$slots, "trailing", {
                          item,
                          index,
                          ui: ui.value
                        }, () => [
                          item.badge || item.badge === 0 ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$9, vueExports.mergeProps({
                            key: 0,
                            color: "neutral",
                            variant: "outline",
                            size: item.ui?.trailingBadgeSize || props.ui?.trailingBadgeSize || ui.value.trailingBadgeSize()
                          }, { ref_for: true }, typeof item.badge === "string" || typeof item.badge === "number" ? { label: item.badge } : item.badge, {
                            "data-slot": "trailingBadge",
                            class: ui.value.trailingBadge({ class: [props.ui?.trailingBadge, item.ui?.trailingBadge] })
                          }), null, 16, ["size", "class"])) : vueExports.createCommentVNode("", true)
                        ])
                      ]),
                      _: 2
                    }, 1032, ["value", "disabled", "class"]);
                  }), 128)),
                  vueExports.renderSlot(_ctx.$slots, "list-trailing")
                ]),
                _: 3
              }, 8, ["class"]),
              !!__props.content ? (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, { key: 0 }, vueExports.renderList(__props.items, (item, index) => {
                return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(TabsContent_default), {
                  key: index,
                  value: item.value ?? String(index),
                  "data-slot": "content",
                  class: ui.value.content({ class: [props.ui?.content, item.ui?.content, item.class] })
                }, {
                  default: vueExports.withCtx(() => [
                    vueExports.renderSlot(_ctx.$slots, item.slot || "content", {
                      item,
                      index,
                      ui: ui.value
                    }, () => [
                      vueExports.createTextVNode(vueExports.toDisplayString(item.content), 1)
                    ])
                  ]),
                  _: 2
                }, 1032, ["value", "class"]);
              }), 128)) : vueExports.createCommentVNode("", true)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/@nuxt+ui@4.2.1_@babel+parser@7.28.5_axios@1.13.2_db0@0.3.4_better-sqlite3@12.5.0_drizzl_dfa8f561a9d8983c7332d596b28eea3c/node_modules/@nuxt/ui/dist/runtime/components/Tabs.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ vueExports.defineComponent({
  __name: "[id]",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute$1();
    const router = useRouter();
    const toast = useToast();
    const { createUpstream, updateUpstream, deleteUpstream } = useUpstreams();
    const isNew = vueExports.computed(() => route.params.id === "new");
    const upstreamId = vueExports.computed(() => isNew.value ? null : Number(route.params.id));
    const pageTitle = vueExports.computed(() => isNew.value ? "添加上游配置" : "编辑上游配置");
    const form = vueExports.reactive({
      name: "",
      baseUrl: "",
      apiKey: "",
      // 保留用于兼容，实际使用 apiKeys
      remark: "",
      upstreamPlatform: void 0,
      userApiKey: ""
    });
    const apiKeys = vueExports.ref([{ name: "default", key: "" }]);
    const imageAimodels = vueExports.ref([]);
    const chatAimodels = vueExports.ref([]);
    const videoAimodels = vueExports.ref([]);
    const activeTab = vueExports.ref("image");
    const tabItems = [
      {
        label: "绘图模型",
        value: "image",
        icon: "i-heroicons-paint-brush",
        slot: "image"
      },
      {
        label: "视频模型",
        value: "video",
        icon: "i-heroicons-video-camera",
        slot: "video"
      },
      {
        label: "对话模型",
        value: "chat",
        icon: "i-heroicons-chat-bubble-left-right",
        slot: "chat"
      }
    ];
    function validate(state) {
      const errors = [];
      if (!state.name?.trim()) {
        errors.push({ name: "name", message: "请输入配置名称" });
      }
      if (!state.baseUrl?.trim()) {
        errors.push({ name: "baseUrl", message: "请输入API地址" });
      }
      const hasValidKey = apiKeys.value.some((k) => k.key?.trim());
      if (!hasValidKey) {
        errors.push({ name: "apiKey", message: "请至少添加一个API密钥" });
      }
      if (state.upstreamPlatform && !state.userApiKey?.trim()) {
        errors.push({ name: "upstreamPlatform", message: "请输入用于查询余额的 API Key" });
      }
      return errors;
    }
    function getAvailableFormats(modelType) {
      return MODEL_API_FORMAT_OPTIONS[modelType] || [];
    }
    function addImageModel() {
      imageAimodels.value.push({
        category: "image",
        modelType: "",
        apiFormat: "",
        modelName: "",
        estimatedTime: 60
      });
    }
    function addChatModel() {
      chatAimodels.value.push({
        category: "chat",
        modelType: "gpt",
        // 保留字段但使用默认值
        apiFormat: "openai-chat",
        modelName: "",
        estimatedTime: 5
        // 默认5秒
      });
    }
    function addVideoModel() {
      videoAimodels.value.push({
        category: "video",
        modelType: "",
        apiFormat: "",
        modelName: "",
        estimatedTime: 120
      });
    }
    function removeImageModel(index) {
      imageAimodels.value.splice(index, 1);
    }
    function removeChatModel(index) {
      chatAimodels.value.splice(index, 1);
    }
    function removeVideoModel(index) {
      videoAimodels.value.splice(index, 1);
    }
    function onImageModelTypeChange(index) {
      const aimodel = imageAimodels.value[index];
      if (!aimodel) return;
      const availableFormats = getAvailableFormats(aimodel.modelType);
      if (!availableFormats.includes(aimodel.apiFormat)) {
        aimodel.apiFormat = availableFormats[0] || "mj-proxy";
      }
      aimodel.modelName = DEFAULT_MODEL_NAMES[aimodel.modelType] || "";
      aimodel.estimatedTime = DEFAULT_ESTIMATED_TIMES[aimodel.modelType] || 60;
    }
    function onVideoModelTypeChange(index) {
      const aimodel = videoAimodels.value[index];
      if (!aimodel) return;
      const availableFormats = getAvailableFormats(aimodel.modelType);
      if (!availableFormats.includes(aimodel.apiFormat)) {
        aimodel.apiFormat = availableFormats[0] || "video-unified";
      }
      aimodel.modelName = DEFAULT_MODEL_NAMES[aimodel.modelType] || "";
      aimodel.estimatedTime = DEFAULT_VIDEO_ESTIMATED_TIMES[aimodel.modelType] || 120;
    }
    function getInferredModelType(modelName) {
      const inferred = inferChatModelType(modelName);
      if (inferred) {
        return { type: inferred, label: MODEL_TYPE_LABELS[inferred] };
      }
      return { type: null, label: "自定义" };
    }
    function onChatModelNameChange(index) {
      const aimodel = chatAimodels.value[index];
      if (!aimodel) return;
      const inferred = inferChatModelType(aimodel.modelName);
      if (inferred) {
        aimodel.modelType = inferred;
        const availableFormats = getAvailableFormats(inferred);
        if (!availableFormats.includes(aimodel.apiFormat)) {
          aimodel.apiFormat = availableFormats[0] || "openai-chat";
        }
      }
    }
    function addApiKey() {
      const newName = `key-${apiKeys.value.length}`;
      apiKeys.value.push({ name: newName, key: "" });
    }
    function removeApiKey(index) {
      if (apiKeys.value.length <= 1) {
        toast.add({ title: "至少保留一个 Key", color: "warning" });
        return;
      }
      apiKeys.value.splice(index, 1);
    }
    const upstreamPlatformOptions = [
      { label: "不查询", value: void 0 },
      { label: "OneAPI/NewAPI", value: "oneapi" }
    ];
    const availableKeyNames = vueExports.computed(() => {
      return apiKeys.value.map((k) => ({ label: k.name, value: k.name }));
    });
    async function onSubmit(event) {
      const validApiKeys = apiKeys.value.filter((k) => k.key?.trim());
      if (validApiKeys.length === 0) {
        toast.add({ title: "请至少添加一个有效的 API 密钥", color: "error" });
        return;
      }
      const allAimodels = [
        ...imageAimodels.value.map((m) => ({ ...m, category: "image" })),
        ...videoAimodels.value.map((m) => ({ ...m, category: "video" })),
        ...chatAimodels.value.map((m) => ({ ...m, category: "chat" }))
      ];
      if (allAimodels.length === 0) {
        toast.add({ title: "请至少添加一种模型", color: "error" });
        return;
      }
      const primaryApiKey = validApiKeys[0].key;
      try {
        if (isNew.value) {
          await createUpstream({
            name: form.name,
            baseUrl: form.baseUrl,
            apiKey: primaryApiKey,
            apiKeys: validApiKeys,
            aimodels: allAimodels,
            remark: form.remark,
            upstreamPlatform: form.upstreamPlatform,
            userApiKey: form.userApiKey || void 0
          });
          toast.add({ title: "配置已创建", color: "success" });
        } else {
          await updateUpstream(upstreamId.value, {
            name: form.name,
            baseUrl: form.baseUrl,
            apiKey: primaryApiKey,
            apiKeys: validApiKeys,
            aimodels: allAimodels,
            remark: form.remark || null,
            upstreamPlatform: form.upstreamPlatform || null,
            userApiKey: form.userApiKey || null
          });
          toast.add({ title: "配置已更新", color: "success" });
        }
        router.back();
      } catch (error) {
        toast.add({
          title: "操作失败",
          description: error.data?.message || error.message,
          color: "error"
        });
      }
    }
    const showDeleteConfirm = vueExports.ref(false);
    async function confirmDelete() {
      if (!upstreamId.value) return;
      try {
        await deleteUpstream(upstreamId.value);
        toast.add({ title: "配置已删除", color: "success" });
        router.push("/settings/upstreams");
      } catch (error) {
        toast.add({
          title: "删除失败",
          description: error.data?.message || error.message,
          color: "error"
        });
      }
      showDeleteConfirm.value = false;
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_SettingsLayout = __nuxt_component_0;
      const _component_UButton = _sfc_main$8;
      const _component_UIcon = _sfc_main$d;
      const _component_UForm = _sfc_main$2;
      const _component_UFormField = _sfc_main$3;
      const _component_UInput = _sfc_main$4;
      const _component_USelect = _sfc_main$1$1;
      const _component_UTextarea = _sfc_main$5;
      const _component_UTabs = _sfc_main$1;
      const _component_USelectMenu = _sfc_main$6;
      const _component_UModal = _sfc_main$7;
      _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_SettingsLayout, _attrs, {
        default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="mb-6 flex items-center justify-between"${_scopeId}><div${_scopeId}><h1 class="text-2xl font-bold text-(--ui-text)"${_scopeId}>${serverRenderer_cjs_prodExports.ssrInterpolate(vueExports.unref(pageTitle))}</h1><p class="text-(--ui-text-muted) text-sm mt-1"${_scopeId}>配置 AI 服务的连接信息和支持的模型</p></div><div class="flex gap-2"${_scopeId}>`);
            _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UButton, {
              variant: "outline",
              color: "neutral",
              onClick: ($event) => vueExports.unref(router).back()
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
              type: "submit",
              form: "upstream-form"
            }, {
              default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${serverRenderer_cjs_prodExports.ssrInterpolate(vueExports.unref(isNew) ? "创建" : "保存")}`);
                } else {
                  return [
                    vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(isNew) ? "创建" : "保存"), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div>`);
            if (!vueExports.unref(isNew)) {
              _push2(`<div class="mb-4 p-3 rounded-lg bg-(--ui-warning)/10 border border-(--ui-warning)/20"${_scopeId}><div class="flex items-start gap-2"${_scopeId}>`);
              _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UIcon, {
                name: "i-heroicons-information-circle",
                class: "w-5 h-5 text-(--ui-warning) shrink-0 mt-0.5"
              }, null, _parent2, _scopeId));
              _push2(`<p class="text-sm text-(--ui-text-muted)"${_scopeId}> 模型 ID 用于关联到任务和消息记录。删除模型采用软删除，不会导致历史关联失效。 </p></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UForm, {
              id: "upstream-form",
              state: vueExports.unref(form),
              validate,
              class: "space-y-6",
              autocomplete: "off",
              onSubmit
            }, {
              default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<input type="text" style="${serverRenderer_cjs_prodExports.ssrRenderStyle({ "display": "none" })}"${_scopeId2}><input type="password" style="${serverRenderer_cjs_prodExports.ssrRenderStyle({ "display": "none" })}"${_scopeId2}><div class="max-w-2xl bg-(--ui-bg-elevated) rounded-lg p-6 border border-(--ui-border) space-y-4"${_scopeId2}><h2 class="text-lg font-medium text-(--ui-text) mb-4"${_scopeId2}>基本信息</h2>`);
                  _push3(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UFormField, {
                    label: "配置名称",
                    name: "name",
                    required: ""
                  }, {
                    default: vueExports.withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UInput, {
                          modelValue: vueExports.unref(form).name,
                          "onUpdate:modelValue": ($event) => vueExports.unref(form).name = $event,
                          placeholder: "例如：我的MJ账号",
                          class: "w-60"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          vueExports.createVNode(_component_UInput, {
                            modelValue: vueExports.unref(form).name,
                            "onUpdate:modelValue": ($event) => vueExports.unref(form).name = $event,
                            placeholder: "例如：我的MJ账号",
                            class: "w-60"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UFormField, {
                    label: "API地址",
                    name: "baseUrl",
                    required: "",
                    hint: "无需添加 /v1 后缀，MJ 绘图使用 /mj，视频接口使用 /v1/video 等路径"
                  }, {
                    default: vueExports.withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UInput, {
                          modelValue: vueExports.unref(form).baseUrl,
                          "onUpdate:modelValue": ($event) => vueExports.unref(form).baseUrl = $event,
                          type: "url",
                          placeholder: "https://api.example.com",
                          class: "w-120"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          vueExports.createVNode(_component_UInput, {
                            modelValue: vueExports.unref(form).baseUrl,
                            "onUpdate:modelValue": ($event) => vueExports.unref(form).baseUrl = $event,
                            type: "url",
                            placeholder: "https://api.example.com",
                            class: "w-120"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<div class="space-y-3"${_scopeId2}><div class="flex items-center justify-between"${_scopeId2}><label class="text-sm font-medium text-(--ui-text)"${_scopeId2}>API 密钥 <span class="text-red-500"${_scopeId2}>*</span></label>`);
                  _push3(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UButton, {
                    size: "xs",
                    variant: "ghost",
                    icon: "i-heroicons-plus",
                    onClick: addApiKey
                  }, {
                    default: vueExports.withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`添加 Key`);
                      } else {
                        return [
                          vueExports.createTextVNode("添加 Key")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div><!--[-->`);
                  serverRenderer_cjs_prodExports.ssrRenderList(vueExports.unref(apiKeys), (keyConfig, index) => {
                    _push3(`<div class="flex items-center gap-2 p-3 rounded-lg bg-(--ui-bg-muted) border border-(--ui-border)"${_scopeId2}>`);
                    _push3(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UInput, {
                      modelValue: keyConfig.name,
                      "onUpdate:modelValue": ($event) => keyConfig.name = $event,
                      placeholder: "Key 名称",
                      class: "w-32",
                      size: "sm"
                    }, null, _parent3, _scopeId2));
                    _push3(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UInput, {
                      modelValue: keyConfig.key,
                      "onUpdate:modelValue": ($event) => keyConfig.key = $event,
                      placeholder: "sk-xxx...",
                      class: "flex-1",
                      size: "sm"
                    }, null, _parent3, _scopeId2));
                    if (vueExports.unref(apiKeys).length > 1) {
                      _push3(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UButton, {
                        size: "xs",
                        variant: "ghost",
                        color: "error",
                        icon: "i-heroicons-trash",
                        onClick: ($event) => removeApiKey(index)
                      }, null, _parent3, _scopeId2));
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(`</div>`);
                  });
                  _push3(`<!--]--></div>`);
                  _push3(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UFormField, {
                    label: "余额查询",
                    name: "upstreamPlatform"
                  }, vueExports.createSlots({
                    default: vueExports.withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="flex items-center gap-3"${_scopeId3}>`);
                        _push4(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_USelect, {
                          modelValue: vueExports.unref(form).upstreamPlatform,
                          "onUpdate:modelValue": ($event) => vueExports.unref(form).upstreamPlatform = $event,
                          items: upstreamPlatformOptions,
                          class: "w-40",
                          placeholder: "选择类型"
                        }, null, _parent4, _scopeId3));
                        if (vueExports.unref(form).upstreamPlatform) {
                          _push4(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UInput, {
                            modelValue: vueExports.unref(form).userApiKey,
                            "onUpdate:modelValue": ($event) => vueExports.unref(form).userApiKey = $event,
                            placeholder: "格式：用户ID:令牌",
                            class: "w-80",
                            required: ""
                          }, null, _parent4, _scopeId3));
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(`</div>`);
                      } else {
                        return [
                          vueExports.createVNode("div", { class: "flex items-center gap-3" }, [
                            vueExports.createVNode(_component_USelect, {
                              modelValue: vueExports.unref(form).upstreamPlatform,
                              "onUpdate:modelValue": ($event) => vueExports.unref(form).upstreamPlatform = $event,
                              items: upstreamPlatformOptions,
                              class: "w-40",
                              placeholder: "选择类型"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                            vueExports.unref(form).upstreamPlatform ? (vueExports.openBlock(), vueExports.createBlock(_component_UInput, {
                              key: 0,
                              modelValue: vueExports.unref(form).userApiKey,
                              "onUpdate:modelValue": ($event) => vueExports.unref(form).userApiKey = $event,
                              placeholder: "格式：用户ID:令牌",
                              class: "w-80",
                              required: ""
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])) : vueExports.createCommentVNode("", true)
                          ])
                        ];
                      }
                    }),
                    _: 2
                  }, [
                    vueExports.unref(form).upstreamPlatform ? {
                      name: "hint",
                      fn: vueExports.withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<span class="text-xs text-(--ui-text-muted)"${_scopeId3}>格式：用户ID:系统访问令牌（在平台个人中心获取）</span>`);
                        } else {
                          return [
                            vueExports.createVNode("span", { class: "text-xs text-(--ui-text-muted)" }, "格式：用户ID:系统访问令牌（在平台个人中心获取）")
                          ];
                        }
                      }),
                      key: "0"
                    } : void 0
                  ]), _parent3, _scopeId2));
                  _push3(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UFormField, {
                    label: "备注",
                    name: "remark"
                  }, {
                    default: vueExports.withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UTextarea, {
                          modelValue: vueExports.unref(form).remark,
                          "onUpdate:modelValue": ($event) => vueExports.unref(form).remark = $event,
                          placeholder: "添加一些说明...",
                          rows: 2,
                          class: "w-full"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          vueExports.createVNode(_component_UTextarea, {
                            modelValue: vueExports.unref(form).remark,
                            "onUpdate:modelValue": ($event) => vueExports.unref(form).remark = $event,
                            placeholder: "添加一些说明...",
                            rows: 2,
                            class: "w-full"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div><div class="bg-(--ui-bg-elevated) rounded-lg p-6 border border-(--ui-border)"${_scopeId2}><h2 class="text-lg font-medium text-(--ui-text) mb-4"${_scopeId2}>模型配置</h2>`);
                  _push3(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UTabs, {
                    modelValue: vueExports.unref(activeTab),
                    "onUpdate:modelValue": ($event) => vueExports.isRef(activeTab) ? activeTab.value = $event : null,
                    items: tabItems,
                    variant: "pill",
                    color: "neutral",
                    ui: { root: "items-start", list: "w-auto" }
                  }, {
                    image: vueExports.withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="pt-4"${_scopeId3}><div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3"${_scopeId3}><!--[-->`);
                        serverRenderer_cjs_prodExports.ssrRenderList(vueExports.unref(imageAimodels), (aimodel, index) => {
                          _push4(`<div class="p-3 rounded-lg bg-(--ui-bg-muted) border border-(--ui-border)"${_scopeId3}><div class="flex items-center justify-between mb-2"${_scopeId3}><div class="flex items-center gap-2"${_scopeId3}><span class="text-sm font-medium text-(--ui-text) truncate"${_scopeId3}> 🎨 ${serverRenderer_cjs_prodExports.ssrInterpolate(vueExports.unref(MODEL_TYPE_LABELS)[aimodel.modelType] || "未选择")}</span>`);
                          if (aimodel.id) {
                            _push4(`<span class="text-xs text-(--ui-text-dimmed) font-mono bg-(--ui-bg-accented) px-1.5 py-0.5 rounded"${_scopeId3}> ID:${serverRenderer_cjs_prodExports.ssrInterpolate(aimodel.id)}</span>`);
                          } else {
                            _push4(`<!---->`);
                          }
                          _push4(`</div>`);
                          _push4(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UButton, {
                            size: "xs",
                            variant: "ghost",
                            color: "error",
                            type: "button",
                            onClick: ($event) => removeImageModel(index)
                          }, {
                            default: vueExports.withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UIcon, {
                                  name: "i-heroicons-trash",
                                  class: "w-4 h-4"
                                }, null, _parent5, _scopeId4));
                              } else {
                                return [
                                  vueExports.createVNode(_component_UIcon, {
                                    name: "i-heroicons-trash",
                                    class: "w-4 h-4"
                                  })
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                          _push4(`</div><div class="space-y-2"${_scopeId3}>`);
                          _push4(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UFormField, { label: "模型类型" }, {
                            default: vueExports.withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_USelectMenu, {
                                  modelValue: aimodel.modelType,
                                  "onUpdate:modelValue": [($event) => aimodel.modelType = $event, ($event) => onImageModelTypeChange(index)],
                                  items: vueExports.unref(IMAGE_MODEL_TYPES).map((t) => ({ label: vueExports.unref(MODEL_TYPE_LABELS)[t], value: t })),
                                  "value-key": "value",
                                  class: "w-40"
                                }, null, _parent5, _scopeId4));
                              } else {
                                return [
                                  vueExports.createVNode(_component_USelectMenu, {
                                    modelValue: aimodel.modelType,
                                    "onUpdate:modelValue": [($event) => aimodel.modelType = $event, ($event) => onImageModelTypeChange(index)],
                                    items: vueExports.unref(IMAGE_MODEL_TYPES).map((t) => ({ label: vueExports.unref(MODEL_TYPE_LABELS)[t], value: t })),
                                    "value-key": "value",
                                    class: "w-40"
                                  }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                          _push4(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UFormField, { label: "请求格式" }, {
                            default: vueExports.withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`<div class="flex flex-wrap gap-1.5"${_scopeId4}><!--[-->`);
                                serverRenderer_cjs_prodExports.ssrRenderList(getAvailableFormats(aimodel.modelType), (f) => {
                                  _push5(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UButton, {
                                    key: f,
                                    size: "xs",
                                    variant: aimodel.apiFormat === f ? "solid" : "outline",
                                    color: aimodel.apiFormat === f ? "primary" : "neutral",
                                    type: "button",
                                    onClick: ($event) => aimodel.apiFormat = f
                                  }, {
                                    default: vueExports.withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(`${serverRenderer_cjs_prodExports.ssrInterpolate(vueExports.unref(API_FORMAT_LABELS)[f])}`);
                                      } else {
                                        return [
                                          vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(API_FORMAT_LABELS)[f]), 1)
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                });
                                _push5(`<!--]--></div>`);
                              } else {
                                return [
                                  vueExports.createVNode("div", { class: "flex flex-wrap gap-1.5" }, [
                                    (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(getAvailableFormats(aimodel.modelType), (f) => {
                                      return vueExports.openBlock(), vueExports.createBlock(_component_UButton, {
                                        key: f,
                                        size: "xs",
                                        variant: aimodel.apiFormat === f ? "solid" : "outline",
                                        color: aimodel.apiFormat === f ? "primary" : "neutral",
                                        type: "button",
                                        onClick: ($event) => aimodel.apiFormat = f
                                      }, {
                                        default: vueExports.withCtx(() => [
                                          vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(API_FORMAT_LABELS)[f]), 1)
                                        ]),
                                        _: 2
                                      }, 1032, ["variant", "color", "onClick"]);
                                    }), 128))
                                  ])
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                          _push4(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UFormField, { label: "模型名称" }, {
                            default: vueExports.withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UInput, {
                                  modelValue: aimodel.modelName,
                                  "onUpdate:modelValue": ($event) => aimodel.modelName = $event,
                                  placeholder: vueExports.unref(DEFAULT_MODEL_NAMES)[aimodel.modelType] || "可选",
                                  class: "w-60"
                                }, null, _parent5, _scopeId4));
                              } else {
                                return [
                                  vueExports.createVNode(_component_UInput, {
                                    modelValue: aimodel.modelName,
                                    "onUpdate:modelValue": ($event) => aimodel.modelName = $event,
                                    placeholder: vueExports.unref(DEFAULT_MODEL_NAMES)[aimodel.modelType] || "可选",
                                    class: "w-60"
                                  }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"])
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                          _push4(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UFormField, { label: "预计时间(秒)" }, {
                            default: vueExports.withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UInput, {
                                  modelValue: aimodel.estimatedTime,
                                  "onUpdate:modelValue": ($event) => aimodel.estimatedTime = $event,
                                  modelModifiers: { number: true },
                                  type: "number",
                                  min: "1",
                                  class: "w-24"
                                }, null, _parent5, _scopeId4));
                              } else {
                                return [
                                  vueExports.createVNode(_component_UInput, {
                                    modelValue: aimodel.estimatedTime,
                                    "onUpdate:modelValue": ($event) => aimodel.estimatedTime = $event,
                                    modelModifiers: { number: true },
                                    type: "number",
                                    min: "1",
                                    class: "w-24"
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                          if (vueExports.unref(apiKeys).length > 1) {
                            _push4(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UFormField, { label: "使用 Key" }, {
                              default: vueExports.withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_USelectMenu, {
                                    modelValue: aimodel.keyName,
                                    "onUpdate:modelValue": ($event) => aimodel.keyName = $event,
                                    items: vueExports.unref(availableKeyNames),
                                    "value-key": "value",
                                    placeholder: "default",
                                    class: "w-32"
                                  }, null, _parent5, _scopeId4));
                                } else {
                                  return [
                                    vueExports.createVNode(_component_USelectMenu, {
                                      modelValue: aimodel.keyName,
                                      "onUpdate:modelValue": ($event) => aimodel.keyName = $event,
                                      items: vueExports.unref(availableKeyNames),
                                      "value-key": "value",
                                      placeholder: "default",
                                      class: "w-32"
                                    }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                          } else {
                            _push4(`<!---->`);
                          }
                          _push4(`</div></div>`);
                        });
                        _push4(`<!--]--><button type="button" class="p-3 rounded-lg border-2 border-dashed border-(--ui-border) hover:border-(--ui-primary) hover:bg-(--ui-primary)/5 transition-colors flex flex-col items-center justify-center min-h-32 cursor-pointer"${_scopeId3}>`);
                        _push4(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UIcon, {
                          name: "i-heroicons-plus",
                          class: "w-8 h-8 text-(--ui-text-muted) mb-2"
                        }, null, _parent4, _scopeId3));
                        _push4(`<span class="text-sm text-(--ui-text-muted)"${_scopeId3}>添加绘图模型</span></button></div></div>`);
                      } else {
                        return [
                          vueExports.createVNode("div", { class: "pt-4" }, [
                            vueExports.createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3" }, [
                              (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(vueExports.unref(imageAimodels), (aimodel, index) => {
                                return vueExports.openBlock(), vueExports.createBlock("div", {
                                  key: aimodel.id || index,
                                  class: "p-3 rounded-lg bg-(--ui-bg-muted) border border-(--ui-border)"
                                }, [
                                  vueExports.createVNode("div", { class: "flex items-center justify-between mb-2" }, [
                                    vueExports.createVNode("div", { class: "flex items-center gap-2" }, [
                                      vueExports.createVNode("span", { class: "text-sm font-medium text-(--ui-text) truncate" }, " 🎨 " + vueExports.toDisplayString(vueExports.unref(MODEL_TYPE_LABELS)[aimodel.modelType] || "未选择"), 1),
                                      aimodel.id ? (vueExports.openBlock(), vueExports.createBlock("span", {
                                        key: 0,
                                        class: "text-xs text-(--ui-text-dimmed) font-mono bg-(--ui-bg-accented) px-1.5 py-0.5 rounded"
                                      }, " ID:" + vueExports.toDisplayString(aimodel.id), 1)) : vueExports.createCommentVNode("", true)
                                    ]),
                                    vueExports.createVNode(_component_UButton, {
                                      size: "xs",
                                      variant: "ghost",
                                      color: "error",
                                      type: "button",
                                      onClick: ($event) => removeImageModel(index)
                                    }, {
                                      default: vueExports.withCtx(() => [
                                        vueExports.createVNode(_component_UIcon, {
                                          name: "i-heroicons-trash",
                                          class: "w-4 h-4"
                                        })
                                      ]),
                                      _: 1
                                    }, 8, ["onClick"])
                                  ]),
                                  vueExports.createVNode("div", { class: "space-y-2" }, [
                                    vueExports.createVNode(_component_UFormField, { label: "模型类型" }, {
                                      default: vueExports.withCtx(() => [
                                        vueExports.createVNode(_component_USelectMenu, {
                                          modelValue: aimodel.modelType,
                                          "onUpdate:modelValue": [($event) => aimodel.modelType = $event, ($event) => onImageModelTypeChange(index)],
                                          items: vueExports.unref(IMAGE_MODEL_TYPES).map((t) => ({ label: vueExports.unref(MODEL_TYPE_LABELS)[t], value: t })),
                                          "value-key": "value",
                                          class: "w-40"
                                        }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                                      ]),
                                      _: 2
                                    }, 1024),
                                    vueExports.createVNode(_component_UFormField, { label: "请求格式" }, {
                                      default: vueExports.withCtx(() => [
                                        vueExports.createVNode("div", { class: "flex flex-wrap gap-1.5" }, [
                                          (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(getAvailableFormats(aimodel.modelType), (f) => {
                                            return vueExports.openBlock(), vueExports.createBlock(_component_UButton, {
                                              key: f,
                                              size: "xs",
                                              variant: aimodel.apiFormat === f ? "solid" : "outline",
                                              color: aimodel.apiFormat === f ? "primary" : "neutral",
                                              type: "button",
                                              onClick: ($event) => aimodel.apiFormat = f
                                            }, {
                                              default: vueExports.withCtx(() => [
                                                vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(API_FORMAT_LABELS)[f]), 1)
                                              ]),
                                              _: 2
                                            }, 1032, ["variant", "color", "onClick"]);
                                          }), 128))
                                        ])
                                      ]),
                                      _: 2
                                    }, 1024),
                                    vueExports.createVNode(_component_UFormField, { label: "模型名称" }, {
                                      default: vueExports.withCtx(() => [
                                        vueExports.createVNode(_component_UInput, {
                                          modelValue: aimodel.modelName,
                                          "onUpdate:modelValue": ($event) => aimodel.modelName = $event,
                                          placeholder: vueExports.unref(DEFAULT_MODEL_NAMES)[aimodel.modelType] || "可选",
                                          class: "w-60"
                                        }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"])
                                      ]),
                                      _: 2
                                    }, 1024),
                                    vueExports.createVNode(_component_UFormField, { label: "预计时间(秒)" }, {
                                      default: vueExports.withCtx(() => [
                                        vueExports.createVNode(_component_UInput, {
                                          modelValue: aimodel.estimatedTime,
                                          "onUpdate:modelValue": ($event) => aimodel.estimatedTime = $event,
                                          modelModifiers: { number: true },
                                          type: "number",
                                          min: "1",
                                          class: "w-24"
                                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                      ]),
                                      _: 2
                                    }, 1024),
                                    vueExports.unref(apiKeys).length > 1 ? (vueExports.openBlock(), vueExports.createBlock(_component_UFormField, {
                                      key: 0,
                                      label: "使用 Key"
                                    }, {
                                      default: vueExports.withCtx(() => [
                                        vueExports.createVNode(_component_USelectMenu, {
                                          modelValue: aimodel.keyName,
                                          "onUpdate:modelValue": ($event) => aimodel.keyName = $event,
                                          items: vueExports.unref(availableKeyNames),
                                          "value-key": "value",
                                          placeholder: "default",
                                          class: "w-32"
                                        }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                                      ]),
                                      _: 2
                                    }, 1024)) : vueExports.createCommentVNode("", true)
                                  ])
                                ]);
                              }), 128)),
                              vueExports.createVNode("button", {
                                type: "button",
                                class: "p-3 rounded-lg border-2 border-dashed border-(--ui-border) hover:border-(--ui-primary) hover:bg-(--ui-primary)/5 transition-colors flex flex-col items-center justify-center min-h-32 cursor-pointer",
                                onClick: addImageModel
                              }, [
                                vueExports.createVNode(_component_UIcon, {
                                  name: "i-heroicons-plus",
                                  class: "w-8 h-8 text-(--ui-text-muted) mb-2"
                                }),
                                vueExports.createVNode("span", { class: "text-sm text-(--ui-text-muted)" }, "添加绘图模型")
                              ])
                            ])
                          ])
                        ];
                      }
                    }),
                    video: vueExports.withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="pt-4"${_scopeId3}><div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3"${_scopeId3}><!--[-->`);
                        serverRenderer_cjs_prodExports.ssrRenderList(vueExports.unref(videoAimodels), (aimodel, index) => {
                          _push4(`<div class="p-3 rounded-lg bg-(--ui-bg-muted) border border-(--ui-border)"${_scopeId3}><div class="flex items-center justify-between mb-2"${_scopeId3}><div class="flex items-center gap-2"${_scopeId3}><span class="text-sm font-medium text-(--ui-text) truncate"${_scopeId3}> 🎬 ${serverRenderer_cjs_prodExports.ssrInterpolate(vueExports.unref(MODEL_TYPE_LABELS)[aimodel.modelType] || "未选择")}</span>`);
                          if (aimodel.id) {
                            _push4(`<span class="text-xs text-(--ui-text-dimmed) font-mono bg-(--ui-bg-accented) px-1.5 py-0.5 rounded"${_scopeId3}> ID:${serverRenderer_cjs_prodExports.ssrInterpolate(aimodel.id)}</span>`);
                          } else {
                            _push4(`<!---->`);
                          }
                          _push4(`</div>`);
                          _push4(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UButton, {
                            size: "xs",
                            variant: "ghost",
                            color: "error",
                            type: "button",
                            onClick: ($event) => removeVideoModel(index)
                          }, {
                            default: vueExports.withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UIcon, {
                                  name: "i-heroicons-trash",
                                  class: "w-4 h-4"
                                }, null, _parent5, _scopeId4));
                              } else {
                                return [
                                  vueExports.createVNode(_component_UIcon, {
                                    name: "i-heroicons-trash",
                                    class: "w-4 h-4"
                                  })
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                          _push4(`</div><div class="space-y-2"${_scopeId3}>`);
                          _push4(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UFormField, { label: "模型类型" }, {
                            default: vueExports.withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_USelectMenu, {
                                  modelValue: aimodel.modelType,
                                  "onUpdate:modelValue": [($event) => aimodel.modelType = $event, ($event) => onVideoModelTypeChange(index)],
                                  items: vueExports.unref(VIDEO_MODEL_TYPES).map((t) => ({ label: vueExports.unref(MODEL_TYPE_LABELS)[t], value: t })),
                                  "value-key": "value",
                                  class: "w-40"
                                }, null, _parent5, _scopeId4));
                              } else {
                                return [
                                  vueExports.createVNode(_component_USelectMenu, {
                                    modelValue: aimodel.modelType,
                                    "onUpdate:modelValue": [($event) => aimodel.modelType = $event, ($event) => onVideoModelTypeChange(index)],
                                    items: vueExports.unref(VIDEO_MODEL_TYPES).map((t) => ({ label: vueExports.unref(MODEL_TYPE_LABELS)[t], value: t })),
                                    "value-key": "value",
                                    class: "w-40"
                                  }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                          _push4(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UFormField, { label: "请求格式" }, {
                            default: vueExports.withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`<div class="flex flex-wrap gap-1.5"${_scopeId4}><!--[-->`);
                                serverRenderer_cjs_prodExports.ssrRenderList(getAvailableFormats(aimodel.modelType), (f) => {
                                  _push5(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UButton, {
                                    key: f,
                                    size: "xs",
                                    variant: aimodel.apiFormat === f ? "solid" : "outline",
                                    color: aimodel.apiFormat === f ? "primary" : "neutral",
                                    type: "button",
                                    onClick: ($event) => aimodel.apiFormat = f
                                  }, {
                                    default: vueExports.withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(`${serverRenderer_cjs_prodExports.ssrInterpolate(vueExports.unref(API_FORMAT_LABELS)[f])}`);
                                      } else {
                                        return [
                                          vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(API_FORMAT_LABELS)[f]), 1)
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                });
                                _push5(`<!--]--></div>`);
                              } else {
                                return [
                                  vueExports.createVNode("div", { class: "flex flex-wrap gap-1.5" }, [
                                    (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(getAvailableFormats(aimodel.modelType), (f) => {
                                      return vueExports.openBlock(), vueExports.createBlock(_component_UButton, {
                                        key: f,
                                        size: "xs",
                                        variant: aimodel.apiFormat === f ? "solid" : "outline",
                                        color: aimodel.apiFormat === f ? "primary" : "neutral",
                                        type: "button",
                                        onClick: ($event) => aimodel.apiFormat = f
                                      }, {
                                        default: vueExports.withCtx(() => [
                                          vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(API_FORMAT_LABELS)[f]), 1)
                                        ]),
                                        _: 2
                                      }, 1032, ["variant", "color", "onClick"]);
                                    }), 128))
                                  ])
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                          _push4(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UFormField, { label: "模型名称" }, {
                            default: vueExports.withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UInput, {
                                  modelValue: aimodel.modelName,
                                  "onUpdate:modelValue": ($event) => aimodel.modelName = $event,
                                  placeholder: vueExports.unref(DEFAULT_MODEL_NAMES)[aimodel.modelType] || "可选",
                                  class: "w-60"
                                }, null, _parent5, _scopeId4));
                              } else {
                                return [
                                  vueExports.createVNode(_component_UInput, {
                                    modelValue: aimodel.modelName,
                                    "onUpdate:modelValue": ($event) => aimodel.modelName = $event,
                                    placeholder: vueExports.unref(DEFAULT_MODEL_NAMES)[aimodel.modelType] || "可选",
                                    class: "w-60"
                                  }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"])
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                          _push4(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UFormField, { label: "预计时间(秒)" }, {
                            default: vueExports.withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UInput, {
                                  modelValue: aimodel.estimatedTime,
                                  "onUpdate:modelValue": ($event) => aimodel.estimatedTime = $event,
                                  modelModifiers: { number: true },
                                  type: "number",
                                  min: "1",
                                  class: "w-24"
                                }, null, _parent5, _scopeId4));
                              } else {
                                return [
                                  vueExports.createVNode(_component_UInput, {
                                    modelValue: aimodel.estimatedTime,
                                    "onUpdate:modelValue": ($event) => aimodel.estimatedTime = $event,
                                    modelModifiers: { number: true },
                                    type: "number",
                                    min: "1",
                                    class: "w-24"
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                          if (vueExports.unref(apiKeys).length > 1) {
                            _push4(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UFormField, { label: "使用 Key" }, {
                              default: vueExports.withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_USelectMenu, {
                                    modelValue: aimodel.keyName,
                                    "onUpdate:modelValue": ($event) => aimodel.keyName = $event,
                                    items: vueExports.unref(availableKeyNames),
                                    "value-key": "value",
                                    placeholder: "default",
                                    class: "w-32"
                                  }, null, _parent5, _scopeId4));
                                } else {
                                  return [
                                    vueExports.createVNode(_component_USelectMenu, {
                                      modelValue: aimodel.keyName,
                                      "onUpdate:modelValue": ($event) => aimodel.keyName = $event,
                                      items: vueExports.unref(availableKeyNames),
                                      "value-key": "value",
                                      placeholder: "default",
                                      class: "w-32"
                                    }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                          } else {
                            _push4(`<!---->`);
                          }
                          _push4(`</div></div>`);
                        });
                        _push4(`<!--]--><button type="button" class="p-3 rounded-lg border-2 border-dashed border-(--ui-border) hover:border-(--ui-primary) hover:bg-(--ui-primary)/5 transition-colors flex flex-col items-center justify-center min-h-32 cursor-pointer"${_scopeId3}>`);
                        _push4(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UIcon, {
                          name: "i-heroicons-plus",
                          class: "w-8 h-8 text-(--ui-text-muted) mb-2"
                        }, null, _parent4, _scopeId3));
                        _push4(`<span class="text-sm text-(--ui-text-muted)"${_scopeId3}>添加视频模型</span></button></div></div>`);
                      } else {
                        return [
                          vueExports.createVNode("div", { class: "pt-4" }, [
                            vueExports.createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3" }, [
                              (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(vueExports.unref(videoAimodels), (aimodel, index) => {
                                return vueExports.openBlock(), vueExports.createBlock("div", {
                                  key: aimodel.id || index,
                                  class: "p-3 rounded-lg bg-(--ui-bg-muted) border border-(--ui-border)"
                                }, [
                                  vueExports.createVNode("div", { class: "flex items-center justify-between mb-2" }, [
                                    vueExports.createVNode("div", { class: "flex items-center gap-2" }, [
                                      vueExports.createVNode("span", { class: "text-sm font-medium text-(--ui-text) truncate" }, " 🎬 " + vueExports.toDisplayString(vueExports.unref(MODEL_TYPE_LABELS)[aimodel.modelType] || "未选择"), 1),
                                      aimodel.id ? (vueExports.openBlock(), vueExports.createBlock("span", {
                                        key: 0,
                                        class: "text-xs text-(--ui-text-dimmed) font-mono bg-(--ui-bg-accented) px-1.5 py-0.5 rounded"
                                      }, " ID:" + vueExports.toDisplayString(aimodel.id), 1)) : vueExports.createCommentVNode("", true)
                                    ]),
                                    vueExports.createVNode(_component_UButton, {
                                      size: "xs",
                                      variant: "ghost",
                                      color: "error",
                                      type: "button",
                                      onClick: ($event) => removeVideoModel(index)
                                    }, {
                                      default: vueExports.withCtx(() => [
                                        vueExports.createVNode(_component_UIcon, {
                                          name: "i-heroicons-trash",
                                          class: "w-4 h-4"
                                        })
                                      ]),
                                      _: 1
                                    }, 8, ["onClick"])
                                  ]),
                                  vueExports.createVNode("div", { class: "space-y-2" }, [
                                    vueExports.createVNode(_component_UFormField, { label: "模型类型" }, {
                                      default: vueExports.withCtx(() => [
                                        vueExports.createVNode(_component_USelectMenu, {
                                          modelValue: aimodel.modelType,
                                          "onUpdate:modelValue": [($event) => aimodel.modelType = $event, ($event) => onVideoModelTypeChange(index)],
                                          items: vueExports.unref(VIDEO_MODEL_TYPES).map((t) => ({ label: vueExports.unref(MODEL_TYPE_LABELS)[t], value: t })),
                                          "value-key": "value",
                                          class: "w-40"
                                        }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                                      ]),
                                      _: 2
                                    }, 1024),
                                    vueExports.createVNode(_component_UFormField, { label: "请求格式" }, {
                                      default: vueExports.withCtx(() => [
                                        vueExports.createVNode("div", { class: "flex flex-wrap gap-1.5" }, [
                                          (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(getAvailableFormats(aimodel.modelType), (f) => {
                                            return vueExports.openBlock(), vueExports.createBlock(_component_UButton, {
                                              key: f,
                                              size: "xs",
                                              variant: aimodel.apiFormat === f ? "solid" : "outline",
                                              color: aimodel.apiFormat === f ? "primary" : "neutral",
                                              type: "button",
                                              onClick: ($event) => aimodel.apiFormat = f
                                            }, {
                                              default: vueExports.withCtx(() => [
                                                vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(API_FORMAT_LABELS)[f]), 1)
                                              ]),
                                              _: 2
                                            }, 1032, ["variant", "color", "onClick"]);
                                          }), 128))
                                        ])
                                      ]),
                                      _: 2
                                    }, 1024),
                                    vueExports.createVNode(_component_UFormField, { label: "模型名称" }, {
                                      default: vueExports.withCtx(() => [
                                        vueExports.createVNode(_component_UInput, {
                                          modelValue: aimodel.modelName,
                                          "onUpdate:modelValue": ($event) => aimodel.modelName = $event,
                                          placeholder: vueExports.unref(DEFAULT_MODEL_NAMES)[aimodel.modelType] || "可选",
                                          class: "w-60"
                                        }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"])
                                      ]),
                                      _: 2
                                    }, 1024),
                                    vueExports.createVNode(_component_UFormField, { label: "预计时间(秒)" }, {
                                      default: vueExports.withCtx(() => [
                                        vueExports.createVNode(_component_UInput, {
                                          modelValue: aimodel.estimatedTime,
                                          "onUpdate:modelValue": ($event) => aimodel.estimatedTime = $event,
                                          modelModifiers: { number: true },
                                          type: "number",
                                          min: "1",
                                          class: "w-24"
                                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                      ]),
                                      _: 2
                                    }, 1024),
                                    vueExports.unref(apiKeys).length > 1 ? (vueExports.openBlock(), vueExports.createBlock(_component_UFormField, {
                                      key: 0,
                                      label: "使用 Key"
                                    }, {
                                      default: vueExports.withCtx(() => [
                                        vueExports.createVNode(_component_USelectMenu, {
                                          modelValue: aimodel.keyName,
                                          "onUpdate:modelValue": ($event) => aimodel.keyName = $event,
                                          items: vueExports.unref(availableKeyNames),
                                          "value-key": "value",
                                          placeholder: "default",
                                          class: "w-32"
                                        }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                                      ]),
                                      _: 2
                                    }, 1024)) : vueExports.createCommentVNode("", true)
                                  ])
                                ]);
                              }), 128)),
                              vueExports.createVNode("button", {
                                type: "button",
                                class: "p-3 rounded-lg border-2 border-dashed border-(--ui-border) hover:border-(--ui-primary) hover:bg-(--ui-primary)/5 transition-colors flex flex-col items-center justify-center min-h-32 cursor-pointer",
                                onClick: addVideoModel
                              }, [
                                vueExports.createVNode(_component_UIcon, {
                                  name: "i-heroicons-plus",
                                  class: "w-8 h-8 text-(--ui-text-muted) mb-2"
                                }),
                                vueExports.createVNode("span", { class: "text-sm text-(--ui-text-muted)" }, "添加视频模型")
                              ])
                            ])
                          ])
                        ];
                      }
                    }),
                    chat: vueExports.withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="pt-4"${_scopeId3}><div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3"${_scopeId3}><!--[-->`);
                        serverRenderer_cjs_prodExports.ssrRenderList(vueExports.unref(chatAimodels), (aimodel, index) => {
                          _push4(`<div class="p-3 rounded-lg bg-(--ui-bg-muted) border border-(--ui-border)"${_scopeId3}><div class="flex items-center justify-between mb-2"${_scopeId3}><div class="flex items-center gap-2"${_scopeId3}><span class="text-sm font-medium text-(--ui-text)"${_scopeId3}>💬</span><span class="${serverRenderer_cjs_prodExports.ssrRenderClass([getInferredModelType(aimodel.modelName).type ? "bg-(--ui-primary)/10 text-(--ui-primary)" : "bg-(--ui-bg-accented) text-(--ui-text-muted)", "text-xs px-2 py-0.5 rounded-full"])}"${_scopeId3}>${serverRenderer_cjs_prodExports.ssrInterpolate(getInferredModelType(aimodel.modelName).label)}</span>`);
                          if (aimodel.id) {
                            _push4(`<span class="text-xs text-(--ui-text-dimmed) font-mono bg-(--ui-bg-accented) px-1.5 py-0.5 rounded"${_scopeId3}> ID:${serverRenderer_cjs_prodExports.ssrInterpolate(aimodel.id)}</span>`);
                          } else {
                            _push4(`<!---->`);
                          }
                          _push4(`</div>`);
                          _push4(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UButton, {
                            size: "xs",
                            variant: "ghost",
                            color: "error",
                            type: "button",
                            onClick: ($event) => removeChatModel(index)
                          }, {
                            default: vueExports.withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UIcon, {
                                  name: "i-heroicons-trash",
                                  class: "w-4 h-4"
                                }, null, _parent5, _scopeId4));
                              } else {
                                return [
                                  vueExports.createVNode(_component_UIcon, {
                                    name: "i-heroicons-trash",
                                    class: "w-4 h-4"
                                  })
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                          _push4(`</div><div class="space-y-2"${_scopeId3}>`);
                          _push4(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UFormField, { label: "请求格式" }, {
                            default: vueExports.withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`<div class="flex flex-wrap gap-1.5"${_scopeId4}><!--[-->`);
                                serverRenderer_cjs_prodExports.ssrRenderList(getAvailableFormats(aimodel.modelType), (f) => {
                                  _push5(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UButton, {
                                    key: f,
                                    size: "xs",
                                    variant: aimodel.apiFormat === f ? "solid" : "outline",
                                    color: aimodel.apiFormat === f ? "primary" : "neutral",
                                    type: "button",
                                    onClick: ($event) => aimodel.apiFormat = f
                                  }, {
                                    default: vueExports.withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(`${serverRenderer_cjs_prodExports.ssrInterpolate(vueExports.unref(API_FORMAT_LABELS)[f])}`);
                                      } else {
                                        return [
                                          vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(API_FORMAT_LABELS)[f]), 1)
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                });
                                _push5(`<!--]--></div>`);
                              } else {
                                return [
                                  vueExports.createVNode("div", { class: "flex flex-wrap gap-1.5" }, [
                                    (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(getAvailableFormats(aimodel.modelType), (f) => {
                                      return vueExports.openBlock(), vueExports.createBlock(_component_UButton, {
                                        key: f,
                                        size: "xs",
                                        variant: aimodel.apiFormat === f ? "solid" : "outline",
                                        color: aimodel.apiFormat === f ? "primary" : "neutral",
                                        type: "button",
                                        onClick: ($event) => aimodel.apiFormat = f
                                      }, {
                                        default: vueExports.withCtx(() => [
                                          vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(API_FORMAT_LABELS)[f]), 1)
                                        ]),
                                        _: 2
                                      }, 1032, ["variant", "color", "onClick"]);
                                    }), 128))
                                  ])
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                          _push4(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UFormField, { label: "模型名称" }, {
                            default: vueExports.withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UInput, {
                                  modelValue: aimodel.modelName,
                                  "onUpdate:modelValue": ($event) => aimodel.modelName = $event,
                                  placeholder: "输入模型名称，如 gpt-4o、claude-3-opus...",
                                  class: "w-60",
                                  onInput: ($event) => onChatModelNameChange(index)
                                }, null, _parent5, _scopeId4));
                              } else {
                                return [
                                  vueExports.createVNode(_component_UInput, {
                                    modelValue: aimodel.modelName,
                                    "onUpdate:modelValue": ($event) => aimodel.modelName = $event,
                                    placeholder: "输入模型名称，如 gpt-4o、claude-3-opus...",
                                    class: "w-60",
                                    onInput: ($event) => onChatModelNameChange(index)
                                  }, null, 8, ["modelValue", "onUpdate:modelValue", "onInput"])
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                          _push4(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UFormField, { label: "预计时间(秒)" }, {
                            default: vueExports.withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UInput, {
                                  modelValue: aimodel.estimatedTime,
                                  "onUpdate:modelValue": ($event) => aimodel.estimatedTime = $event,
                                  modelModifiers: { number: true },
                                  type: "number",
                                  min: "1",
                                  class: "w-24"
                                }, null, _parent5, _scopeId4));
                              } else {
                                return [
                                  vueExports.createVNode(_component_UInput, {
                                    modelValue: aimodel.estimatedTime,
                                    "onUpdate:modelValue": ($event) => aimodel.estimatedTime = $event,
                                    modelModifiers: { number: true },
                                    type: "number",
                                    min: "1",
                                    class: "w-24"
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                          if (vueExports.unref(apiKeys).length > 1) {
                            _push4(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UFormField, { label: "使用 Key" }, {
                              default: vueExports.withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_USelectMenu, {
                                    modelValue: aimodel.keyName,
                                    "onUpdate:modelValue": ($event) => aimodel.keyName = $event,
                                    items: vueExports.unref(availableKeyNames),
                                    "value-key": "value",
                                    placeholder: "default",
                                    class: "w-32"
                                  }, null, _parent5, _scopeId4));
                                } else {
                                  return [
                                    vueExports.createVNode(_component_USelectMenu, {
                                      modelValue: aimodel.keyName,
                                      "onUpdate:modelValue": ($event) => aimodel.keyName = $event,
                                      items: vueExports.unref(availableKeyNames),
                                      "value-key": "value",
                                      placeholder: "default",
                                      class: "w-32"
                                    }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                          } else {
                            _push4(`<!---->`);
                          }
                          _push4(`</div></div>`);
                        });
                        _push4(`<!--]--><button type="button" class="p-3 rounded-lg border-2 border-dashed border-(--ui-border) hover:border-(--ui-primary) hover:bg-(--ui-primary)/5 transition-colors flex flex-col items-center justify-center min-h-32 cursor-pointer"${_scopeId3}>`);
                        _push4(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UIcon, {
                          name: "i-heroicons-plus",
                          class: "w-8 h-8 text-(--ui-text-muted) mb-2"
                        }, null, _parent4, _scopeId3));
                        _push4(`<span class="text-sm text-(--ui-text-muted)"${_scopeId3}>添加对话模型</span></button></div></div>`);
                      } else {
                        return [
                          vueExports.createVNode("div", { class: "pt-4" }, [
                            vueExports.createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3" }, [
                              (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(vueExports.unref(chatAimodels), (aimodel, index) => {
                                return vueExports.openBlock(), vueExports.createBlock("div", {
                                  key: aimodel.id || index,
                                  class: "p-3 rounded-lg bg-(--ui-bg-muted) border border-(--ui-border)"
                                }, [
                                  vueExports.createVNode("div", { class: "flex items-center justify-between mb-2" }, [
                                    vueExports.createVNode("div", { class: "flex items-center gap-2" }, [
                                      vueExports.createVNode("span", { class: "text-sm font-medium text-(--ui-text)" }, "💬"),
                                      vueExports.createVNode("span", {
                                        class: ["text-xs px-2 py-0.5 rounded-full", getInferredModelType(aimodel.modelName).type ? "bg-(--ui-primary)/10 text-(--ui-primary)" : "bg-(--ui-bg-accented) text-(--ui-text-muted)"]
                                      }, vueExports.toDisplayString(getInferredModelType(aimodel.modelName).label), 3),
                                      aimodel.id ? (vueExports.openBlock(), vueExports.createBlock("span", {
                                        key: 0,
                                        class: "text-xs text-(--ui-text-dimmed) font-mono bg-(--ui-bg-accented) px-1.5 py-0.5 rounded"
                                      }, " ID:" + vueExports.toDisplayString(aimodel.id), 1)) : vueExports.createCommentVNode("", true)
                                    ]),
                                    vueExports.createVNode(_component_UButton, {
                                      size: "xs",
                                      variant: "ghost",
                                      color: "error",
                                      type: "button",
                                      onClick: ($event) => removeChatModel(index)
                                    }, {
                                      default: vueExports.withCtx(() => [
                                        vueExports.createVNode(_component_UIcon, {
                                          name: "i-heroicons-trash",
                                          class: "w-4 h-4"
                                        })
                                      ]),
                                      _: 1
                                    }, 8, ["onClick"])
                                  ]),
                                  vueExports.createVNode("div", { class: "space-y-2" }, [
                                    vueExports.createVNode(_component_UFormField, { label: "请求格式" }, {
                                      default: vueExports.withCtx(() => [
                                        vueExports.createVNode("div", { class: "flex flex-wrap gap-1.5" }, [
                                          (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(getAvailableFormats(aimodel.modelType), (f) => {
                                            return vueExports.openBlock(), vueExports.createBlock(_component_UButton, {
                                              key: f,
                                              size: "xs",
                                              variant: aimodel.apiFormat === f ? "solid" : "outline",
                                              color: aimodel.apiFormat === f ? "primary" : "neutral",
                                              type: "button",
                                              onClick: ($event) => aimodel.apiFormat = f
                                            }, {
                                              default: vueExports.withCtx(() => [
                                                vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(API_FORMAT_LABELS)[f]), 1)
                                              ]),
                                              _: 2
                                            }, 1032, ["variant", "color", "onClick"]);
                                          }), 128))
                                        ])
                                      ]),
                                      _: 2
                                    }, 1024),
                                    vueExports.createVNode(_component_UFormField, { label: "模型名称" }, {
                                      default: vueExports.withCtx(() => [
                                        vueExports.createVNode(_component_UInput, {
                                          modelValue: aimodel.modelName,
                                          "onUpdate:modelValue": ($event) => aimodel.modelName = $event,
                                          placeholder: "输入模型名称，如 gpt-4o、claude-3-opus...",
                                          class: "w-60",
                                          onInput: ($event) => onChatModelNameChange(index)
                                        }, null, 8, ["modelValue", "onUpdate:modelValue", "onInput"])
                                      ]),
                                      _: 2
                                    }, 1024),
                                    vueExports.createVNode(_component_UFormField, { label: "预计时间(秒)" }, {
                                      default: vueExports.withCtx(() => [
                                        vueExports.createVNode(_component_UInput, {
                                          modelValue: aimodel.estimatedTime,
                                          "onUpdate:modelValue": ($event) => aimodel.estimatedTime = $event,
                                          modelModifiers: { number: true },
                                          type: "number",
                                          min: "1",
                                          class: "w-24"
                                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                      ]),
                                      _: 2
                                    }, 1024),
                                    vueExports.unref(apiKeys).length > 1 ? (vueExports.openBlock(), vueExports.createBlock(_component_UFormField, {
                                      key: 0,
                                      label: "使用 Key"
                                    }, {
                                      default: vueExports.withCtx(() => [
                                        vueExports.createVNode(_component_USelectMenu, {
                                          modelValue: aimodel.keyName,
                                          "onUpdate:modelValue": ($event) => aimodel.keyName = $event,
                                          items: vueExports.unref(availableKeyNames),
                                          "value-key": "value",
                                          placeholder: "default",
                                          class: "w-32"
                                        }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                                      ]),
                                      _: 2
                                    }, 1024)) : vueExports.createCommentVNode("", true)
                                  ])
                                ]);
                              }), 128)),
                              vueExports.createVNode("button", {
                                type: "button",
                                class: "p-3 rounded-lg border-2 border-dashed border-(--ui-border) hover:border-(--ui-primary) hover:bg-(--ui-primary)/5 transition-colors flex flex-col items-center justify-center min-h-32 cursor-pointer",
                                onClick: addChatModel
                              }, [
                                vueExports.createVNode(_component_UIcon, {
                                  name: "i-heroicons-plus",
                                  class: "w-8 h-8 text-(--ui-text-muted) mb-2"
                                }),
                                vueExports.createVNode("span", { class: "text-sm text-(--ui-text-muted)" }, "添加对话模型")
                              ])
                            ])
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                  if (!vueExports.unref(isNew)) {
                    _push3(`<div class="mt-8 pt-6 border-t border-(--ui-border)"${_scopeId2}>`);
                    _push3(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UButton, {
                      color: "error",
                      variant: "ghost",
                      type: "button",
                      onClick: ($event) => showDeleteConfirm.value = true
                    }, {
                      default: vueExports.withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(` 删除上游配置 `);
                        } else {
                          return [
                            vueExports.createTextVNode(" 删除上游配置 ")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(`</div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                } else {
                  return [
                    vueExports.createVNode("input", {
                      type: "text",
                      style: { "display": "none" }
                    }),
                    vueExports.createVNode("input", {
                      type: "password",
                      style: { "display": "none" }
                    }),
                    vueExports.createVNode("div", { class: "max-w-2xl bg-(--ui-bg-elevated) rounded-lg p-6 border border-(--ui-border) space-y-4" }, [
                      vueExports.createVNode("h2", { class: "text-lg font-medium text-(--ui-text) mb-4" }, "基本信息"),
                      vueExports.createVNode(_component_UFormField, {
                        label: "配置名称",
                        name: "name",
                        required: ""
                      }, {
                        default: vueExports.withCtx(() => [
                          vueExports.createVNode(_component_UInput, {
                            modelValue: vueExports.unref(form).name,
                            "onUpdate:modelValue": ($event) => vueExports.unref(form).name = $event,
                            placeholder: "例如：我的MJ账号",
                            class: "w-60"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      }),
                      vueExports.createVNode(_component_UFormField, {
                        label: "API地址",
                        name: "baseUrl",
                        required: "",
                        hint: "无需添加 /v1 后缀，MJ 绘图使用 /mj，视频接口使用 /v1/video 等路径"
                      }, {
                        default: vueExports.withCtx(() => [
                          vueExports.createVNode(_component_UInput, {
                            modelValue: vueExports.unref(form).baseUrl,
                            "onUpdate:modelValue": ($event) => vueExports.unref(form).baseUrl = $event,
                            type: "url",
                            placeholder: "https://api.example.com",
                            class: "w-120"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      }),
                      vueExports.createVNode("div", { class: "space-y-3" }, [
                        vueExports.createVNode("div", { class: "flex items-center justify-between" }, [
                          vueExports.createVNode("label", { class: "text-sm font-medium text-(--ui-text)" }, [
                            vueExports.createTextVNode("API 密钥 "),
                            vueExports.createVNode("span", { class: "text-red-500" }, "*")
                          ]),
                          vueExports.createVNode(_component_UButton, {
                            size: "xs",
                            variant: "ghost",
                            icon: "i-heroicons-plus",
                            onClick: addApiKey
                          }, {
                            default: vueExports.withCtx(() => [
                              vueExports.createTextVNode("添加 Key")
                            ]),
                            _: 1
                          })
                        ]),
                        (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(vueExports.unref(apiKeys), (keyConfig, index) => {
                          return vueExports.openBlock(), vueExports.createBlock("div", {
                            key: index,
                            class: "flex items-center gap-2 p-3 rounded-lg bg-(--ui-bg-muted) border border-(--ui-border)"
                          }, [
                            vueExports.createVNode(_component_UInput, {
                              modelValue: keyConfig.name,
                              "onUpdate:modelValue": ($event) => keyConfig.name = $event,
                              placeholder: "Key 名称",
                              class: "w-32",
                              size: "sm"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                            vueExports.createVNode(_component_UInput, {
                              modelValue: keyConfig.key,
                              "onUpdate:modelValue": ($event) => keyConfig.key = $event,
                              placeholder: "sk-xxx...",
                              class: "flex-1",
                              size: "sm"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                            vueExports.unref(apiKeys).length > 1 ? (vueExports.openBlock(), vueExports.createBlock(_component_UButton, {
                              key: 0,
                              size: "xs",
                              variant: "ghost",
                              color: "error",
                              icon: "i-heroicons-trash",
                              onClick: ($event) => removeApiKey(index)
                            }, null, 8, ["onClick"])) : vueExports.createCommentVNode("", true)
                          ]);
                        }), 128))
                      ]),
                      vueExports.createVNode(_component_UFormField, {
                        label: "余额查询",
                        name: "upstreamPlatform"
                      }, vueExports.createSlots({
                        default: vueExports.withCtx(() => [
                          vueExports.createVNode("div", { class: "flex items-center gap-3" }, [
                            vueExports.createVNode(_component_USelect, {
                              modelValue: vueExports.unref(form).upstreamPlatform,
                              "onUpdate:modelValue": ($event) => vueExports.unref(form).upstreamPlatform = $event,
                              items: upstreamPlatformOptions,
                              class: "w-40",
                              placeholder: "选择类型"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                            vueExports.unref(form).upstreamPlatform ? (vueExports.openBlock(), vueExports.createBlock(_component_UInput, {
                              key: 0,
                              modelValue: vueExports.unref(form).userApiKey,
                              "onUpdate:modelValue": ($event) => vueExports.unref(form).userApiKey = $event,
                              placeholder: "格式：用户ID:令牌",
                              class: "w-80",
                              required: ""
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])) : vueExports.createCommentVNode("", true)
                          ])
                        ]),
                        _: 2
                      }, [
                        vueExports.unref(form).upstreamPlatform ? {
                          name: "hint",
                          fn: vueExports.withCtx(() => [
                            vueExports.createVNode("span", { class: "text-xs text-(--ui-text-muted)" }, "格式：用户ID:系统访问令牌（在平台个人中心获取）")
                          ]),
                          key: "0"
                        } : void 0
                      ]), 1024),
                      vueExports.createVNode(_component_UFormField, {
                        label: "备注",
                        name: "remark"
                      }, {
                        default: vueExports.withCtx(() => [
                          vueExports.createVNode(_component_UTextarea, {
                            modelValue: vueExports.unref(form).remark,
                            "onUpdate:modelValue": ($event) => vueExports.unref(form).remark = $event,
                            placeholder: "添加一些说明...",
                            rows: 2,
                            class: "w-full"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      })
                    ]),
                    vueExports.createVNode("div", { class: "bg-(--ui-bg-elevated) rounded-lg p-6 border border-(--ui-border)" }, [
                      vueExports.createVNode("h2", { class: "text-lg font-medium text-(--ui-text) mb-4" }, "模型配置"),
                      vueExports.createVNode(_component_UTabs, {
                        modelValue: vueExports.unref(activeTab),
                        "onUpdate:modelValue": ($event) => vueExports.isRef(activeTab) ? activeTab.value = $event : null,
                        items: tabItems,
                        variant: "pill",
                        color: "neutral",
                        ui: { root: "items-start", list: "w-auto" }
                      }, {
                        image: vueExports.withCtx(() => [
                          vueExports.createVNode("div", { class: "pt-4" }, [
                            vueExports.createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3" }, [
                              (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(vueExports.unref(imageAimodels), (aimodel, index) => {
                                return vueExports.openBlock(), vueExports.createBlock("div", {
                                  key: aimodel.id || index,
                                  class: "p-3 rounded-lg bg-(--ui-bg-muted) border border-(--ui-border)"
                                }, [
                                  vueExports.createVNode("div", { class: "flex items-center justify-between mb-2" }, [
                                    vueExports.createVNode("div", { class: "flex items-center gap-2" }, [
                                      vueExports.createVNode("span", { class: "text-sm font-medium text-(--ui-text) truncate" }, " 🎨 " + vueExports.toDisplayString(vueExports.unref(MODEL_TYPE_LABELS)[aimodel.modelType] || "未选择"), 1),
                                      aimodel.id ? (vueExports.openBlock(), vueExports.createBlock("span", {
                                        key: 0,
                                        class: "text-xs text-(--ui-text-dimmed) font-mono bg-(--ui-bg-accented) px-1.5 py-0.5 rounded"
                                      }, " ID:" + vueExports.toDisplayString(aimodel.id), 1)) : vueExports.createCommentVNode("", true)
                                    ]),
                                    vueExports.createVNode(_component_UButton, {
                                      size: "xs",
                                      variant: "ghost",
                                      color: "error",
                                      type: "button",
                                      onClick: ($event) => removeImageModel(index)
                                    }, {
                                      default: vueExports.withCtx(() => [
                                        vueExports.createVNode(_component_UIcon, {
                                          name: "i-heroicons-trash",
                                          class: "w-4 h-4"
                                        })
                                      ]),
                                      _: 1
                                    }, 8, ["onClick"])
                                  ]),
                                  vueExports.createVNode("div", { class: "space-y-2" }, [
                                    vueExports.createVNode(_component_UFormField, { label: "模型类型" }, {
                                      default: vueExports.withCtx(() => [
                                        vueExports.createVNode(_component_USelectMenu, {
                                          modelValue: aimodel.modelType,
                                          "onUpdate:modelValue": [($event) => aimodel.modelType = $event, ($event) => onImageModelTypeChange(index)],
                                          items: vueExports.unref(IMAGE_MODEL_TYPES).map((t) => ({ label: vueExports.unref(MODEL_TYPE_LABELS)[t], value: t })),
                                          "value-key": "value",
                                          class: "w-40"
                                        }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                                      ]),
                                      _: 2
                                    }, 1024),
                                    vueExports.createVNode(_component_UFormField, { label: "请求格式" }, {
                                      default: vueExports.withCtx(() => [
                                        vueExports.createVNode("div", { class: "flex flex-wrap gap-1.5" }, [
                                          (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(getAvailableFormats(aimodel.modelType), (f) => {
                                            return vueExports.openBlock(), vueExports.createBlock(_component_UButton, {
                                              key: f,
                                              size: "xs",
                                              variant: aimodel.apiFormat === f ? "solid" : "outline",
                                              color: aimodel.apiFormat === f ? "primary" : "neutral",
                                              type: "button",
                                              onClick: ($event) => aimodel.apiFormat = f
                                            }, {
                                              default: vueExports.withCtx(() => [
                                                vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(API_FORMAT_LABELS)[f]), 1)
                                              ]),
                                              _: 2
                                            }, 1032, ["variant", "color", "onClick"]);
                                          }), 128))
                                        ])
                                      ]),
                                      _: 2
                                    }, 1024),
                                    vueExports.createVNode(_component_UFormField, { label: "模型名称" }, {
                                      default: vueExports.withCtx(() => [
                                        vueExports.createVNode(_component_UInput, {
                                          modelValue: aimodel.modelName,
                                          "onUpdate:modelValue": ($event) => aimodel.modelName = $event,
                                          placeholder: vueExports.unref(DEFAULT_MODEL_NAMES)[aimodel.modelType] || "可选",
                                          class: "w-60"
                                        }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"])
                                      ]),
                                      _: 2
                                    }, 1024),
                                    vueExports.createVNode(_component_UFormField, { label: "预计时间(秒)" }, {
                                      default: vueExports.withCtx(() => [
                                        vueExports.createVNode(_component_UInput, {
                                          modelValue: aimodel.estimatedTime,
                                          "onUpdate:modelValue": ($event) => aimodel.estimatedTime = $event,
                                          modelModifiers: { number: true },
                                          type: "number",
                                          min: "1",
                                          class: "w-24"
                                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                      ]),
                                      _: 2
                                    }, 1024),
                                    vueExports.unref(apiKeys).length > 1 ? (vueExports.openBlock(), vueExports.createBlock(_component_UFormField, {
                                      key: 0,
                                      label: "使用 Key"
                                    }, {
                                      default: vueExports.withCtx(() => [
                                        vueExports.createVNode(_component_USelectMenu, {
                                          modelValue: aimodel.keyName,
                                          "onUpdate:modelValue": ($event) => aimodel.keyName = $event,
                                          items: vueExports.unref(availableKeyNames),
                                          "value-key": "value",
                                          placeholder: "default",
                                          class: "w-32"
                                        }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                                      ]),
                                      _: 2
                                    }, 1024)) : vueExports.createCommentVNode("", true)
                                  ])
                                ]);
                              }), 128)),
                              vueExports.createVNode("button", {
                                type: "button",
                                class: "p-3 rounded-lg border-2 border-dashed border-(--ui-border) hover:border-(--ui-primary) hover:bg-(--ui-primary)/5 transition-colors flex flex-col items-center justify-center min-h-32 cursor-pointer",
                                onClick: addImageModel
                              }, [
                                vueExports.createVNode(_component_UIcon, {
                                  name: "i-heroicons-plus",
                                  class: "w-8 h-8 text-(--ui-text-muted) mb-2"
                                }),
                                vueExports.createVNode("span", { class: "text-sm text-(--ui-text-muted)" }, "添加绘图模型")
                              ])
                            ])
                          ])
                        ]),
                        video: vueExports.withCtx(() => [
                          vueExports.createVNode("div", { class: "pt-4" }, [
                            vueExports.createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3" }, [
                              (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(vueExports.unref(videoAimodels), (aimodel, index) => {
                                return vueExports.openBlock(), vueExports.createBlock("div", {
                                  key: aimodel.id || index,
                                  class: "p-3 rounded-lg bg-(--ui-bg-muted) border border-(--ui-border)"
                                }, [
                                  vueExports.createVNode("div", { class: "flex items-center justify-between mb-2" }, [
                                    vueExports.createVNode("div", { class: "flex items-center gap-2" }, [
                                      vueExports.createVNode("span", { class: "text-sm font-medium text-(--ui-text) truncate" }, " 🎬 " + vueExports.toDisplayString(vueExports.unref(MODEL_TYPE_LABELS)[aimodel.modelType] || "未选择"), 1),
                                      aimodel.id ? (vueExports.openBlock(), vueExports.createBlock("span", {
                                        key: 0,
                                        class: "text-xs text-(--ui-text-dimmed) font-mono bg-(--ui-bg-accented) px-1.5 py-0.5 rounded"
                                      }, " ID:" + vueExports.toDisplayString(aimodel.id), 1)) : vueExports.createCommentVNode("", true)
                                    ]),
                                    vueExports.createVNode(_component_UButton, {
                                      size: "xs",
                                      variant: "ghost",
                                      color: "error",
                                      type: "button",
                                      onClick: ($event) => removeVideoModel(index)
                                    }, {
                                      default: vueExports.withCtx(() => [
                                        vueExports.createVNode(_component_UIcon, {
                                          name: "i-heroicons-trash",
                                          class: "w-4 h-4"
                                        })
                                      ]),
                                      _: 1
                                    }, 8, ["onClick"])
                                  ]),
                                  vueExports.createVNode("div", { class: "space-y-2" }, [
                                    vueExports.createVNode(_component_UFormField, { label: "模型类型" }, {
                                      default: vueExports.withCtx(() => [
                                        vueExports.createVNode(_component_USelectMenu, {
                                          modelValue: aimodel.modelType,
                                          "onUpdate:modelValue": [($event) => aimodel.modelType = $event, ($event) => onVideoModelTypeChange(index)],
                                          items: vueExports.unref(VIDEO_MODEL_TYPES).map((t) => ({ label: vueExports.unref(MODEL_TYPE_LABELS)[t], value: t })),
                                          "value-key": "value",
                                          class: "w-40"
                                        }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                                      ]),
                                      _: 2
                                    }, 1024),
                                    vueExports.createVNode(_component_UFormField, { label: "请求格式" }, {
                                      default: vueExports.withCtx(() => [
                                        vueExports.createVNode("div", { class: "flex flex-wrap gap-1.5" }, [
                                          (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(getAvailableFormats(aimodel.modelType), (f) => {
                                            return vueExports.openBlock(), vueExports.createBlock(_component_UButton, {
                                              key: f,
                                              size: "xs",
                                              variant: aimodel.apiFormat === f ? "solid" : "outline",
                                              color: aimodel.apiFormat === f ? "primary" : "neutral",
                                              type: "button",
                                              onClick: ($event) => aimodel.apiFormat = f
                                            }, {
                                              default: vueExports.withCtx(() => [
                                                vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(API_FORMAT_LABELS)[f]), 1)
                                              ]),
                                              _: 2
                                            }, 1032, ["variant", "color", "onClick"]);
                                          }), 128))
                                        ])
                                      ]),
                                      _: 2
                                    }, 1024),
                                    vueExports.createVNode(_component_UFormField, { label: "模型名称" }, {
                                      default: vueExports.withCtx(() => [
                                        vueExports.createVNode(_component_UInput, {
                                          modelValue: aimodel.modelName,
                                          "onUpdate:modelValue": ($event) => aimodel.modelName = $event,
                                          placeholder: vueExports.unref(DEFAULT_MODEL_NAMES)[aimodel.modelType] || "可选",
                                          class: "w-60"
                                        }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"])
                                      ]),
                                      _: 2
                                    }, 1024),
                                    vueExports.createVNode(_component_UFormField, { label: "预计时间(秒)" }, {
                                      default: vueExports.withCtx(() => [
                                        vueExports.createVNode(_component_UInput, {
                                          modelValue: aimodel.estimatedTime,
                                          "onUpdate:modelValue": ($event) => aimodel.estimatedTime = $event,
                                          modelModifiers: { number: true },
                                          type: "number",
                                          min: "1",
                                          class: "w-24"
                                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                      ]),
                                      _: 2
                                    }, 1024),
                                    vueExports.unref(apiKeys).length > 1 ? (vueExports.openBlock(), vueExports.createBlock(_component_UFormField, {
                                      key: 0,
                                      label: "使用 Key"
                                    }, {
                                      default: vueExports.withCtx(() => [
                                        vueExports.createVNode(_component_USelectMenu, {
                                          modelValue: aimodel.keyName,
                                          "onUpdate:modelValue": ($event) => aimodel.keyName = $event,
                                          items: vueExports.unref(availableKeyNames),
                                          "value-key": "value",
                                          placeholder: "default",
                                          class: "w-32"
                                        }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                                      ]),
                                      _: 2
                                    }, 1024)) : vueExports.createCommentVNode("", true)
                                  ])
                                ]);
                              }), 128)),
                              vueExports.createVNode("button", {
                                type: "button",
                                class: "p-3 rounded-lg border-2 border-dashed border-(--ui-border) hover:border-(--ui-primary) hover:bg-(--ui-primary)/5 transition-colors flex flex-col items-center justify-center min-h-32 cursor-pointer",
                                onClick: addVideoModel
                              }, [
                                vueExports.createVNode(_component_UIcon, {
                                  name: "i-heroicons-plus",
                                  class: "w-8 h-8 text-(--ui-text-muted) mb-2"
                                }),
                                vueExports.createVNode("span", { class: "text-sm text-(--ui-text-muted)" }, "添加视频模型")
                              ])
                            ])
                          ])
                        ]),
                        chat: vueExports.withCtx(() => [
                          vueExports.createVNode("div", { class: "pt-4" }, [
                            vueExports.createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3" }, [
                              (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(vueExports.unref(chatAimodels), (aimodel, index) => {
                                return vueExports.openBlock(), vueExports.createBlock("div", {
                                  key: aimodel.id || index,
                                  class: "p-3 rounded-lg bg-(--ui-bg-muted) border border-(--ui-border)"
                                }, [
                                  vueExports.createVNode("div", { class: "flex items-center justify-between mb-2" }, [
                                    vueExports.createVNode("div", { class: "flex items-center gap-2" }, [
                                      vueExports.createVNode("span", { class: "text-sm font-medium text-(--ui-text)" }, "💬"),
                                      vueExports.createVNode("span", {
                                        class: ["text-xs px-2 py-0.5 rounded-full", getInferredModelType(aimodel.modelName).type ? "bg-(--ui-primary)/10 text-(--ui-primary)" : "bg-(--ui-bg-accented) text-(--ui-text-muted)"]
                                      }, vueExports.toDisplayString(getInferredModelType(aimodel.modelName).label), 3),
                                      aimodel.id ? (vueExports.openBlock(), vueExports.createBlock("span", {
                                        key: 0,
                                        class: "text-xs text-(--ui-text-dimmed) font-mono bg-(--ui-bg-accented) px-1.5 py-0.5 rounded"
                                      }, " ID:" + vueExports.toDisplayString(aimodel.id), 1)) : vueExports.createCommentVNode("", true)
                                    ]),
                                    vueExports.createVNode(_component_UButton, {
                                      size: "xs",
                                      variant: "ghost",
                                      color: "error",
                                      type: "button",
                                      onClick: ($event) => removeChatModel(index)
                                    }, {
                                      default: vueExports.withCtx(() => [
                                        vueExports.createVNode(_component_UIcon, {
                                          name: "i-heroicons-trash",
                                          class: "w-4 h-4"
                                        })
                                      ]),
                                      _: 1
                                    }, 8, ["onClick"])
                                  ]),
                                  vueExports.createVNode("div", { class: "space-y-2" }, [
                                    vueExports.createVNode(_component_UFormField, { label: "请求格式" }, {
                                      default: vueExports.withCtx(() => [
                                        vueExports.createVNode("div", { class: "flex flex-wrap gap-1.5" }, [
                                          (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(getAvailableFormats(aimodel.modelType), (f) => {
                                            return vueExports.openBlock(), vueExports.createBlock(_component_UButton, {
                                              key: f,
                                              size: "xs",
                                              variant: aimodel.apiFormat === f ? "solid" : "outline",
                                              color: aimodel.apiFormat === f ? "primary" : "neutral",
                                              type: "button",
                                              onClick: ($event) => aimodel.apiFormat = f
                                            }, {
                                              default: vueExports.withCtx(() => [
                                                vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(API_FORMAT_LABELS)[f]), 1)
                                              ]),
                                              _: 2
                                            }, 1032, ["variant", "color", "onClick"]);
                                          }), 128))
                                        ])
                                      ]),
                                      _: 2
                                    }, 1024),
                                    vueExports.createVNode(_component_UFormField, { label: "模型名称" }, {
                                      default: vueExports.withCtx(() => [
                                        vueExports.createVNode(_component_UInput, {
                                          modelValue: aimodel.modelName,
                                          "onUpdate:modelValue": ($event) => aimodel.modelName = $event,
                                          placeholder: "输入模型名称，如 gpt-4o、claude-3-opus...",
                                          class: "w-60",
                                          onInput: ($event) => onChatModelNameChange(index)
                                        }, null, 8, ["modelValue", "onUpdate:modelValue", "onInput"])
                                      ]),
                                      _: 2
                                    }, 1024),
                                    vueExports.createVNode(_component_UFormField, { label: "预计时间(秒)" }, {
                                      default: vueExports.withCtx(() => [
                                        vueExports.createVNode(_component_UInput, {
                                          modelValue: aimodel.estimatedTime,
                                          "onUpdate:modelValue": ($event) => aimodel.estimatedTime = $event,
                                          modelModifiers: { number: true },
                                          type: "number",
                                          min: "1",
                                          class: "w-24"
                                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                      ]),
                                      _: 2
                                    }, 1024),
                                    vueExports.unref(apiKeys).length > 1 ? (vueExports.openBlock(), vueExports.createBlock(_component_UFormField, {
                                      key: 0,
                                      label: "使用 Key"
                                    }, {
                                      default: vueExports.withCtx(() => [
                                        vueExports.createVNode(_component_USelectMenu, {
                                          modelValue: aimodel.keyName,
                                          "onUpdate:modelValue": ($event) => aimodel.keyName = $event,
                                          items: vueExports.unref(availableKeyNames),
                                          "value-key": "value",
                                          placeholder: "default",
                                          class: "w-32"
                                        }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                                      ]),
                                      _: 2
                                    }, 1024)) : vueExports.createCommentVNode("", true)
                                  ])
                                ]);
                              }), 128)),
                              vueExports.createVNode("button", {
                                type: "button",
                                class: "p-3 rounded-lg border-2 border-dashed border-(--ui-border) hover:border-(--ui-primary) hover:bg-(--ui-primary)/5 transition-colors flex flex-col items-center justify-center min-h-32 cursor-pointer",
                                onClick: addChatModel
                              }, [
                                vueExports.createVNode(_component_UIcon, {
                                  name: "i-heroicons-plus",
                                  class: "w-8 h-8 text-(--ui-text-muted) mb-2"
                                }),
                                vueExports.createVNode("span", { class: "text-sm text-(--ui-text-muted)" }, "添加对话模型")
                              ])
                            ])
                          ])
                        ]),
                        _: 1
                      }, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    !vueExports.unref(isNew) ? (vueExports.openBlock(), vueExports.createBlock("div", {
                      key: 0,
                      class: "mt-8 pt-6 border-t border-(--ui-border)"
                    }, [
                      vueExports.createVNode(_component_UButton, {
                        color: "error",
                        variant: "ghost",
                        type: "button",
                        onClick: ($event) => showDeleteConfirm.value = true
                      }, {
                        default: vueExports.withCtx(() => [
                          vueExports.createTextVNode(" 删除上游配置 ")
                        ]),
                        _: 1
                      }, 8, ["onClick"])
                    ])) : vueExports.createCommentVNode("", true)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UModal, {
              open: vueExports.unref(showDeleteConfirm),
              "onUpdate:open": ($event) => vueExports.isRef(showDeleteConfirm) ? showDeleteConfirm.value = $event : null,
              title: "确认删除",
              description: "确定要删除这个上游配置吗？此操作不可撤销。",
              close: false
            }, {
              footer: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex justify-end gap-3"${_scopeId2}>`);
                  _push3(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UButton, {
                    color: "error",
                    onClick: confirmDelete
                  }, {
                    default: vueExports.withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`删除`);
                      } else {
                        return [
                          vueExports.createTextVNode("删除")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UButton, {
                    variant: "outline",
                    color: "neutral",
                    onClick: ($event) => showDeleteConfirm.value = false
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
                  _push3(`</div>`);
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
                        onClick: ($event) => showDeleteConfirm.value = false
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
            }, _parent2, _scopeId));
          } else {
            return [
              vueExports.createVNode("div", { class: "mb-6 flex items-center justify-between" }, [
                vueExports.createVNode("div", null, [
                  vueExports.createVNode("h1", { class: "text-2xl font-bold text-(--ui-text)" }, vueExports.toDisplayString(vueExports.unref(pageTitle)), 1),
                  vueExports.createVNode("p", { class: "text-(--ui-text-muted) text-sm mt-1" }, "配置 AI 服务的连接信息和支持的模型")
                ]),
                vueExports.createVNode("div", { class: "flex gap-2" }, [
                  vueExports.createVNode(_component_UButton, {
                    variant: "outline",
                    color: "neutral",
                    onClick: ($event) => vueExports.unref(router).back()
                  }, {
                    default: vueExports.withCtx(() => [
                      vueExports.createTextVNode("取消")
                    ]),
                    _: 1
                  }, 8, ["onClick"]),
                  vueExports.createVNode(_component_UButton, {
                    type: "submit",
                    form: "upstream-form"
                  }, {
                    default: vueExports.withCtx(() => [
                      vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(isNew) ? "创建" : "保存"), 1)
                    ]),
                    _: 1
                  })
                ])
              ]),
              !vueExports.unref(isNew) ? (vueExports.openBlock(), vueExports.createBlock("div", {
                key: 0,
                class: "mb-4 p-3 rounded-lg bg-(--ui-warning)/10 border border-(--ui-warning)/20"
              }, [
                vueExports.createVNode("div", { class: "flex items-start gap-2" }, [
                  vueExports.createVNode(_component_UIcon, {
                    name: "i-heroicons-information-circle",
                    class: "w-5 h-5 text-(--ui-warning) shrink-0 mt-0.5"
                  }),
                  vueExports.createVNode("p", { class: "text-sm text-(--ui-text-muted)" }, " 模型 ID 用于关联到任务和消息记录。删除模型采用软删除，不会导致历史关联失效。 ")
                ])
              ])) : vueExports.createCommentVNode("", true),
              vueExports.createVNode(_component_UForm, {
                id: "upstream-form",
                state: vueExports.unref(form),
                validate,
                class: "space-y-6",
                autocomplete: "off",
                onSubmit
              }, {
                default: vueExports.withCtx(() => [
                  vueExports.createVNode("input", {
                    type: "text",
                    style: { "display": "none" }
                  }),
                  vueExports.createVNode("input", {
                    type: "password",
                    style: { "display": "none" }
                  }),
                  vueExports.createVNode("div", { class: "max-w-2xl bg-(--ui-bg-elevated) rounded-lg p-6 border border-(--ui-border) space-y-4" }, [
                    vueExports.createVNode("h2", { class: "text-lg font-medium text-(--ui-text) mb-4" }, "基本信息"),
                    vueExports.createVNode(_component_UFormField, {
                      label: "配置名称",
                      name: "name",
                      required: ""
                    }, {
                      default: vueExports.withCtx(() => [
                        vueExports.createVNode(_component_UInput, {
                          modelValue: vueExports.unref(form).name,
                          "onUpdate:modelValue": ($event) => vueExports.unref(form).name = $event,
                          placeholder: "例如：我的MJ账号",
                          class: "w-60"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    vueExports.createVNode(_component_UFormField, {
                      label: "API地址",
                      name: "baseUrl",
                      required: "",
                      hint: "无需添加 /v1 后缀，MJ 绘图使用 /mj，视频接口使用 /v1/video 等路径"
                    }, {
                      default: vueExports.withCtx(() => [
                        vueExports.createVNode(_component_UInput, {
                          modelValue: vueExports.unref(form).baseUrl,
                          "onUpdate:modelValue": ($event) => vueExports.unref(form).baseUrl = $event,
                          type: "url",
                          placeholder: "https://api.example.com",
                          class: "w-120"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    vueExports.createVNode("div", { class: "space-y-3" }, [
                      vueExports.createVNode("div", { class: "flex items-center justify-between" }, [
                        vueExports.createVNode("label", { class: "text-sm font-medium text-(--ui-text)" }, [
                          vueExports.createTextVNode("API 密钥 "),
                          vueExports.createVNode("span", { class: "text-red-500" }, "*")
                        ]),
                        vueExports.createVNode(_component_UButton, {
                          size: "xs",
                          variant: "ghost",
                          icon: "i-heroicons-plus",
                          onClick: addApiKey
                        }, {
                          default: vueExports.withCtx(() => [
                            vueExports.createTextVNode("添加 Key")
                          ]),
                          _: 1
                        })
                      ]),
                      (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(vueExports.unref(apiKeys), (keyConfig, index) => {
                        return vueExports.openBlock(), vueExports.createBlock("div", {
                          key: index,
                          class: "flex items-center gap-2 p-3 rounded-lg bg-(--ui-bg-muted) border border-(--ui-border)"
                        }, [
                          vueExports.createVNode(_component_UInput, {
                            modelValue: keyConfig.name,
                            "onUpdate:modelValue": ($event) => keyConfig.name = $event,
                            placeholder: "Key 名称",
                            class: "w-32",
                            size: "sm"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          vueExports.createVNode(_component_UInput, {
                            modelValue: keyConfig.key,
                            "onUpdate:modelValue": ($event) => keyConfig.key = $event,
                            placeholder: "sk-xxx...",
                            class: "flex-1",
                            size: "sm"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          vueExports.unref(apiKeys).length > 1 ? (vueExports.openBlock(), vueExports.createBlock(_component_UButton, {
                            key: 0,
                            size: "xs",
                            variant: "ghost",
                            color: "error",
                            icon: "i-heroicons-trash",
                            onClick: ($event) => removeApiKey(index)
                          }, null, 8, ["onClick"])) : vueExports.createCommentVNode("", true)
                        ]);
                      }), 128))
                    ]),
                    vueExports.createVNode(_component_UFormField, {
                      label: "余额查询",
                      name: "upstreamPlatform"
                    }, vueExports.createSlots({
                      default: vueExports.withCtx(() => [
                        vueExports.createVNode("div", { class: "flex items-center gap-3" }, [
                          vueExports.createVNode(_component_USelect, {
                            modelValue: vueExports.unref(form).upstreamPlatform,
                            "onUpdate:modelValue": ($event) => vueExports.unref(form).upstreamPlatform = $event,
                            items: upstreamPlatformOptions,
                            class: "w-40",
                            placeholder: "选择类型"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          vueExports.unref(form).upstreamPlatform ? (vueExports.openBlock(), vueExports.createBlock(_component_UInput, {
                            key: 0,
                            modelValue: vueExports.unref(form).userApiKey,
                            "onUpdate:modelValue": ($event) => vueExports.unref(form).userApiKey = $event,
                            placeholder: "格式：用户ID:令牌",
                            class: "w-80",
                            required: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])) : vueExports.createCommentVNode("", true)
                        ])
                      ]),
                      _: 2
                    }, [
                      vueExports.unref(form).upstreamPlatform ? {
                        name: "hint",
                        fn: vueExports.withCtx(() => [
                          vueExports.createVNode("span", { class: "text-xs text-(--ui-text-muted)" }, "格式：用户ID:系统访问令牌（在平台个人中心获取）")
                        ]),
                        key: "0"
                      } : void 0
                    ]), 1024),
                    vueExports.createVNode(_component_UFormField, {
                      label: "备注",
                      name: "remark"
                    }, {
                      default: vueExports.withCtx(() => [
                        vueExports.createVNode(_component_UTextarea, {
                          modelValue: vueExports.unref(form).remark,
                          "onUpdate:modelValue": ($event) => vueExports.unref(form).remark = $event,
                          placeholder: "添加一些说明...",
                          rows: 2,
                          class: "w-full"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    })
                  ]),
                  vueExports.createVNode("div", { class: "bg-(--ui-bg-elevated) rounded-lg p-6 border border-(--ui-border)" }, [
                    vueExports.createVNode("h2", { class: "text-lg font-medium text-(--ui-text) mb-4" }, "模型配置"),
                    vueExports.createVNode(_component_UTabs, {
                      modelValue: vueExports.unref(activeTab),
                      "onUpdate:modelValue": ($event) => vueExports.isRef(activeTab) ? activeTab.value = $event : null,
                      items: tabItems,
                      variant: "pill",
                      color: "neutral",
                      ui: { root: "items-start", list: "w-auto" }
                    }, {
                      image: vueExports.withCtx(() => [
                        vueExports.createVNode("div", { class: "pt-4" }, [
                          vueExports.createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3" }, [
                            (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(vueExports.unref(imageAimodels), (aimodel, index) => {
                              return vueExports.openBlock(), vueExports.createBlock("div", {
                                key: aimodel.id || index,
                                class: "p-3 rounded-lg bg-(--ui-bg-muted) border border-(--ui-border)"
                              }, [
                                vueExports.createVNode("div", { class: "flex items-center justify-between mb-2" }, [
                                  vueExports.createVNode("div", { class: "flex items-center gap-2" }, [
                                    vueExports.createVNode("span", { class: "text-sm font-medium text-(--ui-text) truncate" }, " 🎨 " + vueExports.toDisplayString(vueExports.unref(MODEL_TYPE_LABELS)[aimodel.modelType] || "未选择"), 1),
                                    aimodel.id ? (vueExports.openBlock(), vueExports.createBlock("span", {
                                      key: 0,
                                      class: "text-xs text-(--ui-text-dimmed) font-mono bg-(--ui-bg-accented) px-1.5 py-0.5 rounded"
                                    }, " ID:" + vueExports.toDisplayString(aimodel.id), 1)) : vueExports.createCommentVNode("", true)
                                  ]),
                                  vueExports.createVNode(_component_UButton, {
                                    size: "xs",
                                    variant: "ghost",
                                    color: "error",
                                    type: "button",
                                    onClick: ($event) => removeImageModel(index)
                                  }, {
                                    default: vueExports.withCtx(() => [
                                      vueExports.createVNode(_component_UIcon, {
                                        name: "i-heroicons-trash",
                                        class: "w-4 h-4"
                                      })
                                    ]),
                                    _: 1
                                  }, 8, ["onClick"])
                                ]),
                                vueExports.createVNode("div", { class: "space-y-2" }, [
                                  vueExports.createVNode(_component_UFormField, { label: "模型类型" }, {
                                    default: vueExports.withCtx(() => [
                                      vueExports.createVNode(_component_USelectMenu, {
                                        modelValue: aimodel.modelType,
                                        "onUpdate:modelValue": [($event) => aimodel.modelType = $event, ($event) => onImageModelTypeChange(index)],
                                        items: vueExports.unref(IMAGE_MODEL_TYPES).map((t) => ({ label: vueExports.unref(MODEL_TYPE_LABELS)[t], value: t })),
                                        "value-key": "value",
                                        class: "w-40"
                                      }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                                    ]),
                                    _: 2
                                  }, 1024),
                                  vueExports.createVNode(_component_UFormField, { label: "请求格式" }, {
                                    default: vueExports.withCtx(() => [
                                      vueExports.createVNode("div", { class: "flex flex-wrap gap-1.5" }, [
                                        (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(getAvailableFormats(aimodel.modelType), (f) => {
                                          return vueExports.openBlock(), vueExports.createBlock(_component_UButton, {
                                            key: f,
                                            size: "xs",
                                            variant: aimodel.apiFormat === f ? "solid" : "outline",
                                            color: aimodel.apiFormat === f ? "primary" : "neutral",
                                            type: "button",
                                            onClick: ($event) => aimodel.apiFormat = f
                                          }, {
                                            default: vueExports.withCtx(() => [
                                              vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(API_FORMAT_LABELS)[f]), 1)
                                            ]),
                                            _: 2
                                          }, 1032, ["variant", "color", "onClick"]);
                                        }), 128))
                                      ])
                                    ]),
                                    _: 2
                                  }, 1024),
                                  vueExports.createVNode(_component_UFormField, { label: "模型名称" }, {
                                    default: vueExports.withCtx(() => [
                                      vueExports.createVNode(_component_UInput, {
                                        modelValue: aimodel.modelName,
                                        "onUpdate:modelValue": ($event) => aimodel.modelName = $event,
                                        placeholder: vueExports.unref(DEFAULT_MODEL_NAMES)[aimodel.modelType] || "可选",
                                        class: "w-60"
                                      }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"])
                                    ]),
                                    _: 2
                                  }, 1024),
                                  vueExports.createVNode(_component_UFormField, { label: "预计时间(秒)" }, {
                                    default: vueExports.withCtx(() => [
                                      vueExports.createVNode(_component_UInput, {
                                        modelValue: aimodel.estimatedTime,
                                        "onUpdate:modelValue": ($event) => aimodel.estimatedTime = $event,
                                        modelModifiers: { number: true },
                                        type: "number",
                                        min: "1",
                                        class: "w-24"
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                    ]),
                                    _: 2
                                  }, 1024),
                                  vueExports.unref(apiKeys).length > 1 ? (vueExports.openBlock(), vueExports.createBlock(_component_UFormField, {
                                    key: 0,
                                    label: "使用 Key"
                                  }, {
                                    default: vueExports.withCtx(() => [
                                      vueExports.createVNode(_component_USelectMenu, {
                                        modelValue: aimodel.keyName,
                                        "onUpdate:modelValue": ($event) => aimodel.keyName = $event,
                                        items: vueExports.unref(availableKeyNames),
                                        "value-key": "value",
                                        placeholder: "default",
                                        class: "w-32"
                                      }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                                    ]),
                                    _: 2
                                  }, 1024)) : vueExports.createCommentVNode("", true)
                                ])
                              ]);
                            }), 128)),
                            vueExports.createVNode("button", {
                              type: "button",
                              class: "p-3 rounded-lg border-2 border-dashed border-(--ui-border) hover:border-(--ui-primary) hover:bg-(--ui-primary)/5 transition-colors flex flex-col items-center justify-center min-h-32 cursor-pointer",
                              onClick: addImageModel
                            }, [
                              vueExports.createVNode(_component_UIcon, {
                                name: "i-heroicons-plus",
                                class: "w-8 h-8 text-(--ui-text-muted) mb-2"
                              }),
                              vueExports.createVNode("span", { class: "text-sm text-(--ui-text-muted)" }, "添加绘图模型")
                            ])
                          ])
                        ])
                      ]),
                      video: vueExports.withCtx(() => [
                        vueExports.createVNode("div", { class: "pt-4" }, [
                          vueExports.createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3" }, [
                            (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(vueExports.unref(videoAimodels), (aimodel, index) => {
                              return vueExports.openBlock(), vueExports.createBlock("div", {
                                key: aimodel.id || index,
                                class: "p-3 rounded-lg bg-(--ui-bg-muted) border border-(--ui-border)"
                              }, [
                                vueExports.createVNode("div", { class: "flex items-center justify-between mb-2" }, [
                                  vueExports.createVNode("div", { class: "flex items-center gap-2" }, [
                                    vueExports.createVNode("span", { class: "text-sm font-medium text-(--ui-text) truncate" }, " 🎬 " + vueExports.toDisplayString(vueExports.unref(MODEL_TYPE_LABELS)[aimodel.modelType] || "未选择"), 1),
                                    aimodel.id ? (vueExports.openBlock(), vueExports.createBlock("span", {
                                      key: 0,
                                      class: "text-xs text-(--ui-text-dimmed) font-mono bg-(--ui-bg-accented) px-1.5 py-0.5 rounded"
                                    }, " ID:" + vueExports.toDisplayString(aimodel.id), 1)) : vueExports.createCommentVNode("", true)
                                  ]),
                                  vueExports.createVNode(_component_UButton, {
                                    size: "xs",
                                    variant: "ghost",
                                    color: "error",
                                    type: "button",
                                    onClick: ($event) => removeVideoModel(index)
                                  }, {
                                    default: vueExports.withCtx(() => [
                                      vueExports.createVNode(_component_UIcon, {
                                        name: "i-heroicons-trash",
                                        class: "w-4 h-4"
                                      })
                                    ]),
                                    _: 1
                                  }, 8, ["onClick"])
                                ]),
                                vueExports.createVNode("div", { class: "space-y-2" }, [
                                  vueExports.createVNode(_component_UFormField, { label: "模型类型" }, {
                                    default: vueExports.withCtx(() => [
                                      vueExports.createVNode(_component_USelectMenu, {
                                        modelValue: aimodel.modelType,
                                        "onUpdate:modelValue": [($event) => aimodel.modelType = $event, ($event) => onVideoModelTypeChange(index)],
                                        items: vueExports.unref(VIDEO_MODEL_TYPES).map((t) => ({ label: vueExports.unref(MODEL_TYPE_LABELS)[t], value: t })),
                                        "value-key": "value",
                                        class: "w-40"
                                      }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                                    ]),
                                    _: 2
                                  }, 1024),
                                  vueExports.createVNode(_component_UFormField, { label: "请求格式" }, {
                                    default: vueExports.withCtx(() => [
                                      vueExports.createVNode("div", { class: "flex flex-wrap gap-1.5" }, [
                                        (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(getAvailableFormats(aimodel.modelType), (f) => {
                                          return vueExports.openBlock(), vueExports.createBlock(_component_UButton, {
                                            key: f,
                                            size: "xs",
                                            variant: aimodel.apiFormat === f ? "solid" : "outline",
                                            color: aimodel.apiFormat === f ? "primary" : "neutral",
                                            type: "button",
                                            onClick: ($event) => aimodel.apiFormat = f
                                          }, {
                                            default: vueExports.withCtx(() => [
                                              vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(API_FORMAT_LABELS)[f]), 1)
                                            ]),
                                            _: 2
                                          }, 1032, ["variant", "color", "onClick"]);
                                        }), 128))
                                      ])
                                    ]),
                                    _: 2
                                  }, 1024),
                                  vueExports.createVNode(_component_UFormField, { label: "模型名称" }, {
                                    default: vueExports.withCtx(() => [
                                      vueExports.createVNode(_component_UInput, {
                                        modelValue: aimodel.modelName,
                                        "onUpdate:modelValue": ($event) => aimodel.modelName = $event,
                                        placeholder: vueExports.unref(DEFAULT_MODEL_NAMES)[aimodel.modelType] || "可选",
                                        class: "w-60"
                                      }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"])
                                    ]),
                                    _: 2
                                  }, 1024),
                                  vueExports.createVNode(_component_UFormField, { label: "预计时间(秒)" }, {
                                    default: vueExports.withCtx(() => [
                                      vueExports.createVNode(_component_UInput, {
                                        modelValue: aimodel.estimatedTime,
                                        "onUpdate:modelValue": ($event) => aimodel.estimatedTime = $event,
                                        modelModifiers: { number: true },
                                        type: "number",
                                        min: "1",
                                        class: "w-24"
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                    ]),
                                    _: 2
                                  }, 1024),
                                  vueExports.unref(apiKeys).length > 1 ? (vueExports.openBlock(), vueExports.createBlock(_component_UFormField, {
                                    key: 0,
                                    label: "使用 Key"
                                  }, {
                                    default: vueExports.withCtx(() => [
                                      vueExports.createVNode(_component_USelectMenu, {
                                        modelValue: aimodel.keyName,
                                        "onUpdate:modelValue": ($event) => aimodel.keyName = $event,
                                        items: vueExports.unref(availableKeyNames),
                                        "value-key": "value",
                                        placeholder: "default",
                                        class: "w-32"
                                      }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                                    ]),
                                    _: 2
                                  }, 1024)) : vueExports.createCommentVNode("", true)
                                ])
                              ]);
                            }), 128)),
                            vueExports.createVNode("button", {
                              type: "button",
                              class: "p-3 rounded-lg border-2 border-dashed border-(--ui-border) hover:border-(--ui-primary) hover:bg-(--ui-primary)/5 transition-colors flex flex-col items-center justify-center min-h-32 cursor-pointer",
                              onClick: addVideoModel
                            }, [
                              vueExports.createVNode(_component_UIcon, {
                                name: "i-heroicons-plus",
                                class: "w-8 h-8 text-(--ui-text-muted) mb-2"
                              }),
                              vueExports.createVNode("span", { class: "text-sm text-(--ui-text-muted)" }, "添加视频模型")
                            ])
                          ])
                        ])
                      ]),
                      chat: vueExports.withCtx(() => [
                        vueExports.createVNode("div", { class: "pt-4" }, [
                          vueExports.createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3" }, [
                            (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(vueExports.unref(chatAimodels), (aimodel, index) => {
                              return vueExports.openBlock(), vueExports.createBlock("div", {
                                key: aimodel.id || index,
                                class: "p-3 rounded-lg bg-(--ui-bg-muted) border border-(--ui-border)"
                              }, [
                                vueExports.createVNode("div", { class: "flex items-center justify-between mb-2" }, [
                                  vueExports.createVNode("div", { class: "flex items-center gap-2" }, [
                                    vueExports.createVNode("span", { class: "text-sm font-medium text-(--ui-text)" }, "💬"),
                                    vueExports.createVNode("span", {
                                      class: ["text-xs px-2 py-0.5 rounded-full", getInferredModelType(aimodel.modelName).type ? "bg-(--ui-primary)/10 text-(--ui-primary)" : "bg-(--ui-bg-accented) text-(--ui-text-muted)"]
                                    }, vueExports.toDisplayString(getInferredModelType(aimodel.modelName).label), 3),
                                    aimodel.id ? (vueExports.openBlock(), vueExports.createBlock("span", {
                                      key: 0,
                                      class: "text-xs text-(--ui-text-dimmed) font-mono bg-(--ui-bg-accented) px-1.5 py-0.5 rounded"
                                    }, " ID:" + vueExports.toDisplayString(aimodel.id), 1)) : vueExports.createCommentVNode("", true)
                                  ]),
                                  vueExports.createVNode(_component_UButton, {
                                    size: "xs",
                                    variant: "ghost",
                                    color: "error",
                                    type: "button",
                                    onClick: ($event) => removeChatModel(index)
                                  }, {
                                    default: vueExports.withCtx(() => [
                                      vueExports.createVNode(_component_UIcon, {
                                        name: "i-heroicons-trash",
                                        class: "w-4 h-4"
                                      })
                                    ]),
                                    _: 1
                                  }, 8, ["onClick"])
                                ]),
                                vueExports.createVNode("div", { class: "space-y-2" }, [
                                  vueExports.createVNode(_component_UFormField, { label: "请求格式" }, {
                                    default: vueExports.withCtx(() => [
                                      vueExports.createVNode("div", { class: "flex flex-wrap gap-1.5" }, [
                                        (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(getAvailableFormats(aimodel.modelType), (f) => {
                                          return vueExports.openBlock(), vueExports.createBlock(_component_UButton, {
                                            key: f,
                                            size: "xs",
                                            variant: aimodel.apiFormat === f ? "solid" : "outline",
                                            color: aimodel.apiFormat === f ? "primary" : "neutral",
                                            type: "button",
                                            onClick: ($event) => aimodel.apiFormat = f
                                          }, {
                                            default: vueExports.withCtx(() => [
                                              vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(API_FORMAT_LABELS)[f]), 1)
                                            ]),
                                            _: 2
                                          }, 1032, ["variant", "color", "onClick"]);
                                        }), 128))
                                      ])
                                    ]),
                                    _: 2
                                  }, 1024),
                                  vueExports.createVNode(_component_UFormField, { label: "模型名称" }, {
                                    default: vueExports.withCtx(() => [
                                      vueExports.createVNode(_component_UInput, {
                                        modelValue: aimodel.modelName,
                                        "onUpdate:modelValue": ($event) => aimodel.modelName = $event,
                                        placeholder: "输入模型名称，如 gpt-4o、claude-3-opus...",
                                        class: "w-60",
                                        onInput: ($event) => onChatModelNameChange(index)
                                      }, null, 8, ["modelValue", "onUpdate:modelValue", "onInput"])
                                    ]),
                                    _: 2
                                  }, 1024),
                                  vueExports.createVNode(_component_UFormField, { label: "预计时间(秒)" }, {
                                    default: vueExports.withCtx(() => [
                                      vueExports.createVNode(_component_UInput, {
                                        modelValue: aimodel.estimatedTime,
                                        "onUpdate:modelValue": ($event) => aimodel.estimatedTime = $event,
                                        modelModifiers: { number: true },
                                        type: "number",
                                        min: "1",
                                        class: "w-24"
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                    ]),
                                    _: 2
                                  }, 1024),
                                  vueExports.unref(apiKeys).length > 1 ? (vueExports.openBlock(), vueExports.createBlock(_component_UFormField, {
                                    key: 0,
                                    label: "使用 Key"
                                  }, {
                                    default: vueExports.withCtx(() => [
                                      vueExports.createVNode(_component_USelectMenu, {
                                        modelValue: aimodel.keyName,
                                        "onUpdate:modelValue": ($event) => aimodel.keyName = $event,
                                        items: vueExports.unref(availableKeyNames),
                                        "value-key": "value",
                                        placeholder: "default",
                                        class: "w-32"
                                      }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                                    ]),
                                    _: 2
                                  }, 1024)) : vueExports.createCommentVNode("", true)
                                ])
                              ]);
                            }), 128)),
                            vueExports.createVNode("button", {
                              type: "button",
                              class: "p-3 rounded-lg border-2 border-dashed border-(--ui-border) hover:border-(--ui-primary) hover:bg-(--ui-primary)/5 transition-colors flex flex-col items-center justify-center min-h-32 cursor-pointer",
                              onClick: addChatModel
                            }, [
                              vueExports.createVNode(_component_UIcon, {
                                name: "i-heroicons-plus",
                                class: "w-8 h-8 text-(--ui-text-muted) mb-2"
                              }),
                              vueExports.createVNode("span", { class: "text-sm text-(--ui-text-muted)" }, "添加对话模型")
                            ])
                          ])
                        ])
                      ]),
                      _: 1
                    }, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  !vueExports.unref(isNew) ? (vueExports.openBlock(), vueExports.createBlock("div", {
                    key: 0,
                    class: "mt-8 pt-6 border-t border-(--ui-border)"
                  }, [
                    vueExports.createVNode(_component_UButton, {
                      color: "error",
                      variant: "ghost",
                      type: "button",
                      onClick: ($event) => showDeleteConfirm.value = true
                    }, {
                      default: vueExports.withCtx(() => [
                        vueExports.createTextVNode(" 删除上游配置 ")
                      ]),
                      _: 1
                    }, 8, ["onClick"])
                  ])) : vueExports.createCommentVNode("", true)
                ]),
                _: 1
              }, 8, ["state"]),
              vueExports.createVNode(_component_UModal, {
                open: vueExports.unref(showDeleteConfirm),
                "onUpdate:open": ($event) => vueExports.isRef(showDeleteConfirm) ? showDeleteConfirm.value = $event : null,
                title: "确认删除",
                description: "确定要删除这个上游配置吗？此操作不可撤销。",
                close: false
              }, {
                footer: vueExports.withCtx(() => [
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
                      onClick: ($event) => showDeleteConfirm.value = false
                    }, {
                      default: vueExports.withCtx(() => [
                        vueExports.createTextVNode("取消")
                      ]),
                      _: 1
                    }, 8, ["onClick"])
                  ])
                ]),
                _: 1
              }, 8, ["open", "onUpdate:open"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/settings/upstreams/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_id_-Di3V_qW6.mjs.map
