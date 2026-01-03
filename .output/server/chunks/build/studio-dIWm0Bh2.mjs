import { v as vueExports, g as useToast, s as serverRenderer_cjs_prodExports, d as useState, a as __nuxt_component_0$1, b as _sfc_main$d, c as _sfc_main$8$1, _ as _export_sfc, e as useAppConfig, q as useForwardPropsEmits, r as reactivePick, t as tv, w as useForwardProps, x as useFormField, P as Primitive, k as useVModel, l as createContext, m as useForwardExpose, o as useEventListener, p as Presence_default } from './server.mjs';
import { _ as _sfc_main$g } from './FormField-CGip9Bav.mjs';
import { _ as __nuxt_component_4 } from './ModelSelector-BascUgGk.mjs';
import { _ as _sfc_main$h } from './Modal-DTUEXzQH.mjs';
import { _ as _sfc_main$i } from './Textarea-Dhde2llm.mjs';
import { u as useId } from './utils-DCnNb5Bf.mjs';
import { _ as _sfc_main$c, a as _sfc_main$1$1 } from './SelectMenu-BgHNqFCX.mjs';
import { _ as _sfc_main$e } from './Input-A_WPZx9s.mjs';
import { L as Label_default } from './Label-CV5OSAkM.mjs';
import { u as useFormControl, V as VisuallyHiddenInput_default } from './VisuallyHiddenInput-y7wD6Rzm.mjs';
import { U as USER_SETTING_KEYS, c as MODELS_WITHOUT_REFERENCE_IMAGE, d as MODELS_WITH_NEGATIVE_PROMPT, e as MODELS_WITH_SIZE, f as MODELS_WITH_QUALITY, g as MODELS_WITH_STYLE, h as MODELS_WITH_ASPECT_RATIO, i as MODELS_WITH_SEED, j as MODELS_WITH_GUIDANCE, k as MODELS_WITH_WATERMARK, l as MODELS_WITH_BACKGROUND, A as API_FORMAT_LABELS, m as MAX_REFERENCE_IMAGE_COUNT, T as TASK_CARD_MODEL_DISPLAY, n as DEFAULT_VIDEO_ESTIMATED_TIMES, a as DEFAULT_FALLBACK_ESTIMATED_TIME, P as PROGRESS_TIME_BUFFER_RATIO, o as MAX_REFERENCE_IMAGE_SIZE_BYTES } from './constants-Bq60BfFZ.mjs';
import { u as useAuth } from './useAuth-xXrD8D6Y.mjs';
import { u as useUserSettings } from './useUserSettings-CJnqQPxm.mjs';
import { u as useGlobalEvents, s as setInterval, a as __nuxt_component_0$2, _ as __nuxt_component_3$1 } from './TimeAgo-CNFOo2Jq.mjs';
import { _ as _sfc_main$j } from './DropdownMenu-D_kNtRd4.mjs';
import { _ as _sfc_main$f } from './Pagination-BNb8aU3s.mjs';
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
import './index--6aaawBa.mjs';
import './DialogTrigger-DZAnfNyf.mjs';
import './RovingFocusGroup-CN9Tim1l.mjs';
import './PopperArrow-_X1u5CFX.mjs';
import './useTimeFormat-BGnNO3st.mjs';

const [injectCollapsibleRootContext, provideCollapsibleRootContext] = createContext("CollapsibleRoot");
var CollapsibleRoot_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
  __name: "CollapsibleRoot",
  props: {
    defaultOpen: {
      type: Boolean,
      required: false,
      default: false
    },
    open: {
      type: Boolean,
      required: false,
      default: void 0
    },
    disabled: {
      type: Boolean,
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
  emits: ["update:open"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const open = useVModel(props, "open", emit, {
      defaultValue: props.defaultOpen,
      passive: props.open === void 0
    });
    const { disabled, unmountOnHide } = vueExports.toRefs(props);
    provideCollapsibleRootContext({
      contentId: "",
      disabled,
      open,
      unmountOnHide,
      onOpenToggle: () => {
        if (disabled.value) return;
        open.value = !open.value;
      }
    });
    __expose({ open });
    useForwardExpose();
    return (_ctx, _cache) => {
      return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(Primitive), {
        as: _ctx.as,
        "as-child": props.asChild,
        "data-state": vueExports.unref(open) ? "open" : "closed",
        "data-disabled": vueExports.unref(disabled) ? "" : void 0
      }, {
        default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default", { open: vueExports.unref(open) })]),
        _: 3
      }, 8, [
        "as",
        "as-child",
        "data-state",
        "data-disabled"
      ]);
    };
  }
});
var CollapsibleRoot_default = CollapsibleRoot_vue_vue_type_script_setup_true_lang_default;
var CollapsibleContent_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
  inheritAttrs: false,
  __name: "CollapsibleContent",
  props: {
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
  emits: ["contentFound"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const rootContext = injectCollapsibleRootContext();
    rootContext.contentId ||= useId(void 0, "reka-collapsible-content");
    const presentRef = vueExports.ref();
    const { forwardRef, currentElement } = useForwardExpose();
    const width = vueExports.ref(0);
    const height = vueExports.ref(0);
    const isOpen = vueExports.computed(() => rootContext.open.value);
    const isMountAnimationPrevented = vueExports.ref(isOpen.value);
    const currentStyle = vueExports.ref();
    vueExports.watch(() => [isOpen.value, presentRef.value?.present], async () => {
      await vueExports.nextTick();
      const node = currentElement.value;
      if (!node) return;
      currentStyle.value = currentStyle.value || {
        transitionDuration: node.style.transitionDuration,
        animationName: node.style.animationName
      };
      node.style.transitionDuration = "0s";
      node.style.animationName = "none";
      const rect = node.getBoundingClientRect();
      height.value = rect.height;
      width.value = rect.width;
      if (!isMountAnimationPrevented.value) {
        node.style.transitionDuration = currentStyle.value.transitionDuration;
        node.style.animationName = currentStyle.value.animationName;
      }
    }, { immediate: true });
    const skipAnimation = vueExports.computed(() => isMountAnimationPrevented.value && rootContext.open.value);
    useEventListener(currentElement, "beforematch", (ev) => {
      requestAnimationFrame(() => {
        rootContext.onOpenToggle();
        emits("contentFound");
      });
    });
    return (_ctx, _cache) => {
      return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(Presence_default), {
        ref_key: "presentRef",
        ref: presentRef,
        present: _ctx.forceMount || vueExports.unref(rootContext).open.value,
        "force-mount": true
      }, {
        default: vueExports.withCtx(({ present }) => [vueExports.createVNode(vueExports.unref(Primitive), vueExports.mergeProps(_ctx.$attrs, {
          id: vueExports.unref(rootContext).contentId,
          ref: vueExports.unref(forwardRef),
          "as-child": props.asChild,
          as: _ctx.as,
          hidden: !present ? vueExports.unref(rootContext).unmountOnHide.value ? "" : "until-found" : void 0,
          "data-state": skipAnimation.value ? void 0 : vueExports.unref(rootContext).open.value ? "open" : "closed",
          "data-disabled": vueExports.unref(rootContext).disabled?.value ? "" : void 0,
          style: {
            [`--reka-collapsible-content-height`]: `${height.value}px`,
            [`--reka-collapsible-content-width`]: `${width.value}px`
          }
        }), {
          default: vueExports.withCtx(() => [(vueExports.unref(rootContext).unmountOnHide.value ? present : true) ? vueExports.renderSlot(_ctx.$slots, "default", { key: 0 }) : vueExports.createCommentVNode("v-if", true)]),
          _: 2
        }, 1040, [
          "id",
          "as-child",
          "as",
          "hidden",
          "data-state",
          "data-disabled",
          "style"
        ])]),
        _: 3
      }, 8, ["present"]);
    };
  }
});
var CollapsibleContent_default = CollapsibleContent_vue_vue_type_script_setup_true_lang_default;
var CollapsibleTrigger_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
  __name: "CollapsibleTrigger",
  props: {
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
    useForwardExpose();
    const rootContext = injectCollapsibleRootContext();
    return (_ctx, _cache) => {
      return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(Primitive), {
        type: _ctx.as === "button" ? "button" : void 0,
        as: _ctx.as,
        "as-child": props.asChild,
        "aria-controls": vueExports.unref(rootContext).contentId,
        "aria-expanded": vueExports.unref(rootContext).open.value,
        "data-state": vueExports.unref(rootContext).open.value ? "open" : "closed",
        "data-disabled": vueExports.unref(rootContext).disabled?.value ? "" : void 0,
        disabled: vueExports.unref(rootContext).disabled?.value,
        onClick: vueExports.unref(rootContext).onOpenToggle
      }, {
        default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
        _: 3
      }, 8, [
        "type",
        "as",
        "as-child",
        "aria-controls",
        "aria-expanded",
        "data-state",
        "data-disabled",
        "disabled",
        "onClick"
      ]);
    };
  }
});
var CollapsibleTrigger_default = CollapsibleTrigger_vue_vue_type_script_setup_true_lang_default;
const [injectSwitchRootContext, provideSwitchRootContext] = createContext("SwitchRoot");
var SwitchRoot_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
  __name: "SwitchRoot",
  props: {
    defaultValue: {
      type: Boolean,
      required: false
    },
    modelValue: {
      type: [Boolean, null],
      required: false,
      default: void 0
    },
    disabled: {
      type: Boolean,
      required: false
    },
    id: {
      type: String,
      required: false
    },
    value: {
      type: String,
      required: false,
      default: "on"
    },
    asChild: {
      type: Boolean,
      required: false
    },
    as: {
      type: null,
      required: false,
      default: "button"
    },
    name: {
      type: String,
      required: false
    },
    required: {
      type: Boolean,
      required: false
    }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const { disabled } = vueExports.toRefs(props);
    const modelValue = useVModel(props, "modelValue", emit, {
      defaultValue: props.defaultValue,
      passive: props.modelValue === void 0
    });
    function toggleCheck() {
      if (disabled.value) return;
      modelValue.value = !modelValue.value;
    }
    const { forwardRef, currentElement } = useForwardExpose();
    const isFormControl = useFormControl(currentElement);
    const ariaLabel = vueExports.computed(() => props.id && currentElement.value ? (void 0).querySelector(`[for="${props.id}"]`)?.innerText : void 0);
    provideSwitchRootContext({
      modelValue,
      toggleCheck,
      disabled
    });
    return (_ctx, _cache) => {
      return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(Primitive), vueExports.mergeProps(_ctx.$attrs, {
        id: _ctx.id,
        ref: vueExports.unref(forwardRef),
        role: "switch",
        type: _ctx.as === "button" ? "button" : void 0,
        value: _ctx.value,
        "aria-label": _ctx.$attrs["aria-label"] || ariaLabel.value,
        "aria-checked": vueExports.unref(modelValue),
        "aria-required": _ctx.required,
        "data-state": vueExports.unref(modelValue) ? "checked" : "unchecked",
        "data-disabled": vueExports.unref(disabled) ? "" : void 0,
        "as-child": _ctx.asChild,
        as: _ctx.as,
        disabled: vueExports.unref(disabled),
        onClick: toggleCheck,
        onKeydown: vueExports.withKeys(vueExports.withModifiers(toggleCheck, ["prevent"]), ["enter"])
      }), {
        default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default", { modelValue: vueExports.unref(modelValue) }), vueExports.unref(isFormControl) && _ctx.name ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(VisuallyHiddenInput_default), {
          key: 0,
          type: "checkbox",
          name: _ctx.name,
          disabled: vueExports.unref(disabled),
          required: _ctx.required,
          value: _ctx.value,
          checked: !!vueExports.unref(modelValue)
        }, null, 8, [
          "name",
          "disabled",
          "required",
          "value",
          "checked"
        ])) : vueExports.createCommentVNode("v-if", true)]),
        _: 3
      }, 16, [
        "id",
        "type",
        "value",
        "aria-label",
        "aria-checked",
        "aria-required",
        "data-state",
        "data-disabled",
        "as-child",
        "as",
        "disabled",
        "onKeydown"
      ]);
    };
  }
});
var SwitchRoot_default = SwitchRoot_vue_vue_type_script_setup_true_lang_default;
var SwitchThumb_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
  __name: "SwitchThumb",
  props: {
    asChild: {
      type: Boolean,
      required: false
    },
    as: {
      type: null,
      required: false,
      default: "span"
    }
  },
  setup(__props) {
    const rootContext = injectSwitchRootContext();
    useForwardExpose();
    return (_ctx, _cache) => {
      return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(Primitive), {
        "data-state": vueExports.unref(rootContext).modelValue?.value ? "checked" : "unchecked",
        "data-disabled": vueExports.unref(rootContext).disabled.value ? "" : void 0,
        "as-child": _ctx.asChild,
        as: _ctx.as
      }, {
        default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
        _: 3
      }, 8, [
        "data-state",
        "data-disabled",
        "as-child",
        "as"
      ]);
    };
  }
});
var SwitchThumb_default = SwitchThumb_vue_vue_type_script_setup_true_lang_default;
const theme$1 = {
  "slots": {
    "root": "",
    "content": "data-[state=open]:animate-[collapsible-down_200ms_ease-out] data-[state=closed]:animate-[collapsible-up_200ms_ease-out] overflow-hidden"
  }
};
const _sfc_main$b = {
  __name: "UCollapsible",
  __ssrInlineRender: true,
  props: {
    as: { type: null, required: false },
    class: { type: null, required: false },
    ui: { type: null, required: false },
    defaultOpen: { type: Boolean, required: false },
    open: { type: Boolean, required: false },
    disabled: { type: Boolean, required: false },
    unmountOnHide: { type: Boolean, required: false, default: true }
  },
  emits: ["update:open"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const slots = vueExports.useSlots();
    const appConfig = useAppConfig();
    const rootProps = useForwardPropsEmits(reactivePick(props, "as", "defaultOpen", "open", "disabled", "unmountOnHide"), emits);
    const ui = vueExports.computed(() => tv({ extend: tv(theme$1), ...appConfig.ui?.collapsible || {} })());
    return (_ctx, _push, _parent, _attrs) => {
      _push(serverRenderer_cjs_prodExports.ssrRenderComponent(vueExports.unref(CollapsibleRoot_default), vueExports.mergeProps(vueExports.unref(rootProps), {
        "data-slot": "root",
        class: ui.value.root({ class: [props.ui?.root, props.class] })
      }, _attrs), {
        default: vueExports.withCtx(({ open }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (!!slots.default) {
              _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(vueExports.unref(CollapsibleTrigger_default), { "as-child": "" }, {
                default: vueExports.withCtx((_, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    serverRenderer_cjs_prodExports.ssrRenderSlot(_ctx.$slots, "default", { open }, null, _push3, _parent3, _scopeId2);
                  } else {
                    return [
                      vueExports.renderSlot(_ctx.$slots, "default", { open })
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(vueExports.unref(CollapsibleContent_default), {
              "data-slot": "content",
              class: ui.value.content({ class: props.ui?.content })
            }, {
              default: vueExports.withCtx((_, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  serverRenderer_cjs_prodExports.ssrRenderSlot(_ctx.$slots, "content", {}, null, _push3, _parent3, _scopeId2);
                } else {
                  return [
                    vueExports.renderSlot(_ctx.$slots, "content")
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
          } else {
            return [
              !!slots.default ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(CollapsibleTrigger_default), {
                key: 0,
                "as-child": ""
              }, {
                default: vueExports.withCtx(() => [
                  vueExports.renderSlot(_ctx.$slots, "default", { open })
                ]),
                _: 2
              }, 1024)) : vueExports.createCommentVNode("", true),
              vueExports.createVNode(vueExports.unref(CollapsibleContent_default), {
                "data-slot": "content",
                class: ui.value.content({ class: props.ui?.content })
              }, {
                default: vueExports.withCtx(() => [
                  vueExports.renderSlot(_ctx.$slots, "content")
                ]),
                _: 3
              }, 8, ["class"])
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
};
const _sfc_setup$b = _sfc_main$b.setup;
_sfc_main$b.setup = (props, ctx) => {
  const ssrContext = vueExports.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/@nuxt+ui@4.2.1_@babel+parser@7.28.5_axios@1.13.2_db0@0.3.4_better-sqlite3@12.5.0_drizzl_dfa8f561a9d8983c7332d596b28eea3c/node_modules/@nuxt/ui/dist/runtime/components/Collapsible.vue");
  return _sfc_setup$b ? _sfc_setup$b(props, ctx) : void 0;
};
const theme = {
  "slots": {
    "root": "relative flex items-start",
    "base": [
      "inline-flex items-center shrink-0 rounded-full border-2 border-transparent focus-visible:outline-2 focus-visible:outline-offset-2 data-[state=unchecked]:bg-accented",
      "transition-[background] duration-200"
    ],
    "container": "flex items-center",
    "thumb": "group pointer-events-none rounded-full bg-default shadow-lg ring-0 transition-transform duration-200 data-[state=unchecked]:translate-x-0 data-[state=unchecked]:rtl:-translate-x-0 flex items-center justify-center",
    "icon": [
      "absolute shrink-0 group-data-[state=unchecked]:text-dimmed opacity-0 size-10/12",
      "transition-[color,opacity] duration-200"
    ],
    "wrapper": "ms-2",
    "label": "block font-medium text-default",
    "description": "text-muted"
  },
  "variants": {
    "color": {
      "primary": {
        "base": "data-[state=checked]:bg-primary focus-visible:outline-primary",
        "icon": "group-data-[state=checked]:text-primary"
      },
      "secondary": {
        "base": "data-[state=checked]:bg-secondary focus-visible:outline-secondary",
        "icon": "group-data-[state=checked]:text-secondary"
      },
      "success": {
        "base": "data-[state=checked]:bg-success focus-visible:outline-success",
        "icon": "group-data-[state=checked]:text-success"
      },
      "info": {
        "base": "data-[state=checked]:bg-info focus-visible:outline-info",
        "icon": "group-data-[state=checked]:text-info"
      },
      "warning": {
        "base": "data-[state=checked]:bg-warning focus-visible:outline-warning",
        "icon": "group-data-[state=checked]:text-warning"
      },
      "error": {
        "base": "data-[state=checked]:bg-error focus-visible:outline-error",
        "icon": "group-data-[state=checked]:text-error"
      },
      "neutral": {
        "base": "data-[state=checked]:bg-inverted focus-visible:outline-inverted",
        "icon": "group-data-[state=checked]:text-highlighted"
      }
    },
    "size": {
      "xs": {
        "base": "w-7",
        "container": "h-4",
        "thumb": "size-3 data-[state=checked]:translate-x-3 data-[state=checked]:rtl:-translate-x-3",
        "wrapper": "text-xs"
      },
      "sm": {
        "base": "w-8",
        "container": "h-4",
        "thumb": "size-3.5 data-[state=checked]:translate-x-3.5 data-[state=checked]:rtl:-translate-x-3.5",
        "wrapper": "text-xs"
      },
      "md": {
        "base": "w-9",
        "container": "h-5",
        "thumb": "size-4 data-[state=checked]:translate-x-4 data-[state=checked]:rtl:-translate-x-4",
        "wrapper": "text-sm"
      },
      "lg": {
        "base": "w-10",
        "container": "h-5",
        "thumb": "size-4.5 data-[state=checked]:translate-x-4.5 data-[state=checked]:rtl:-translate-x-4.5",
        "wrapper": "text-sm"
      },
      "xl": {
        "base": "w-11",
        "container": "h-6",
        "thumb": "size-5 data-[state=checked]:translate-x-5 data-[state=checked]:rtl:-translate-x-5",
        "wrapper": "text-base"
      }
    },
    "checked": {
      "true": {
        "icon": "group-data-[state=checked]:opacity-100"
      }
    },
    "unchecked": {
      "true": {
        "icon": "group-data-[state=unchecked]:opacity-100"
      }
    },
    "loading": {
      "true": {
        "icon": "animate-spin"
      }
    },
    "required": {
      "true": {
        "label": "after:content-['*'] after:ms-0.5 after:text-error"
      }
    },
    "disabled": {
      "true": {
        "root": "opacity-75",
        "base": "cursor-not-allowed",
        "label": "cursor-not-allowed",
        "description": "cursor-not-allowed"
      }
    }
  },
  "defaultVariants": {
    "color": "primary",
    "size": "md"
  }
};
const _sfc_main$a = /* @__PURE__ */ Object.assign({ inheritAttrs: false }, {
  __name: "USwitch",
  __ssrInlineRender: true,
  props: /* @__PURE__ */ vueExports.mergeModels({
    as: { type: null, required: false },
    color: { type: null, required: false },
    size: { type: null, required: false },
    loading: { type: Boolean, required: false },
    loadingIcon: { type: null, required: false },
    checkedIcon: { type: null, required: false },
    uncheckedIcon: { type: null, required: false },
    label: { type: String, required: false },
    description: { type: String, required: false },
    class: { type: null, required: false },
    ui: { type: null, required: false },
    disabled: { type: Boolean, required: false },
    id: { type: String, required: false },
    name: { type: String, required: false },
    required: { type: Boolean, required: false },
    value: { type: String, required: false },
    defaultValue: { type: Boolean, required: false }
  }, {
    "modelValue": { type: Boolean, ...{ default: void 0 } },
    "modelModifiers": {}
  }),
  emits: /* @__PURE__ */ vueExports.mergeModels(["change"], ["update:modelValue"]),
  setup(__props, { emit: __emit }) {
    const props = __props;
    const slots = vueExports.useSlots();
    const emits = __emit;
    const modelValue = vueExports.useModel(__props, "modelValue", { type: Boolean, ...{ default: void 0 } });
    const appConfig = useAppConfig();
    const rootProps = useForwardProps(reactivePick(props, "required", "value", "defaultValue"));
    const { id: _id, emitFormChange, emitFormInput, size, color, name, disabled, ariaAttrs } = useFormField(props);
    const id = _id.value ?? vueExports.useId();
    const ui = vueExports.computed(() => tv({ extend: tv(theme), ...appConfig.ui?.switch || {} })({
      size: size.value,
      color: color.value,
      required: props.required,
      loading: props.loading,
      disabled: disabled.value || props.loading
    }));
    function onUpdate(value) {
      const event = new Event("change", { target: { value } });
      emits("change", event);
      emitFormChange();
      emitFormInput();
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(serverRenderer_cjs_prodExports.ssrRenderComponent(vueExports.unref(Primitive), vueExports.mergeProps({
        as: __props.as,
        "data-slot": "root",
        class: ui.value.root({ class: [props.ui?.root, props.class] })
      }, _attrs), {
        default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div data-slot="container" class="${serverRenderer_cjs_prodExports.ssrRenderClass(ui.value.container({ class: props.ui?.container }))}"${_scopeId}>`);
            _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(vueExports.unref(SwitchRoot_default), vueExports.mergeProps({ id: vueExports.unref(id) }, { ...vueExports.unref(rootProps), ..._ctx.$attrs, ...vueExports.unref(ariaAttrs) }, {
              modelValue: modelValue.value,
              "onUpdate:modelValue": [($event) => modelValue.value = $event, onUpdate],
              name: vueExports.unref(name),
              disabled: vueExports.unref(disabled) || __props.loading,
              "data-slot": "base",
              class: ui.value.base({ class: props.ui?.base })
            }), {
              default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(serverRenderer_cjs_prodExports.ssrRenderComponent(vueExports.unref(SwitchThumb_default), {
                    "data-slot": "thumb",
                    class: ui.value.thumb({ class: props.ui?.thumb })
                  }, {
                    default: vueExports.withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        if (__props.loading) {
                          _push4(serverRenderer_cjs_prodExports.ssrRenderComponent(_sfc_main$d, {
                            name: __props.loadingIcon || vueExports.unref(appConfig).ui.icons.loading,
                            "data-slot": "icon",
                            class: ui.value.icon({ class: props.ui?.icon, checked: true, unchecked: true })
                          }, null, _parent4, _scopeId3));
                        } else {
                          _push4(`<!--[-->`);
                          if (__props.checkedIcon) {
                            _push4(serverRenderer_cjs_prodExports.ssrRenderComponent(_sfc_main$d, {
                              name: __props.checkedIcon,
                              "data-slot": "icon",
                              class: ui.value.icon({ class: props.ui?.icon, checked: true })
                            }, null, _parent4, _scopeId3));
                          } else {
                            _push4(`<!---->`);
                          }
                          if (__props.uncheckedIcon) {
                            _push4(serverRenderer_cjs_prodExports.ssrRenderComponent(_sfc_main$d, {
                              name: __props.uncheckedIcon,
                              "data-slot": "icon",
                              class: ui.value.icon({ class: props.ui?.icon, unchecked: true })
                            }, null, _parent4, _scopeId3));
                          } else {
                            _push4(`<!---->`);
                          }
                          _push4(`<!--]-->`);
                        }
                      } else {
                        return [
                          __props.loading ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$d, {
                            key: 0,
                            name: __props.loadingIcon || vueExports.unref(appConfig).ui.icons.loading,
                            "data-slot": "icon",
                            class: ui.value.icon({ class: props.ui?.icon, checked: true, unchecked: true })
                          }, null, 8, ["name", "class"])) : (vueExports.openBlock(), vueExports.createBlock(vueExports.Fragment, { key: 1 }, [
                            __props.checkedIcon ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$d, {
                              key: 0,
                              name: __props.checkedIcon,
                              "data-slot": "icon",
                              class: ui.value.icon({ class: props.ui?.icon, checked: true })
                            }, null, 8, ["name", "class"])) : vueExports.createCommentVNode("", true),
                            __props.uncheckedIcon ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$d, {
                              key: 1,
                              name: __props.uncheckedIcon,
                              "data-slot": "icon",
                              class: ui.value.icon({ class: props.ui?.icon, unchecked: true })
                            }, null, 8, ["name", "class"])) : vueExports.createCommentVNode("", true)
                          ], 64))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    vueExports.createVNode(vueExports.unref(SwitchThumb_default), {
                      "data-slot": "thumb",
                      class: ui.value.thumb({ class: props.ui?.thumb })
                    }, {
                      default: vueExports.withCtx(() => [
                        __props.loading ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$d, {
                          key: 0,
                          name: __props.loadingIcon || vueExports.unref(appConfig).ui.icons.loading,
                          "data-slot": "icon",
                          class: ui.value.icon({ class: props.ui?.icon, checked: true, unchecked: true })
                        }, null, 8, ["name", "class"])) : (vueExports.openBlock(), vueExports.createBlock(vueExports.Fragment, { key: 1 }, [
                          __props.checkedIcon ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$d, {
                            key: 0,
                            name: __props.checkedIcon,
                            "data-slot": "icon",
                            class: ui.value.icon({ class: props.ui?.icon, checked: true })
                          }, null, 8, ["name", "class"])) : vueExports.createCommentVNode("", true),
                          __props.uncheckedIcon ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$d, {
                            key: 1,
                            name: __props.uncheckedIcon,
                            "data-slot": "icon",
                            class: ui.value.icon({ class: props.ui?.icon, unchecked: true })
                          }, null, 8, ["name", "class"])) : vueExports.createCommentVNode("", true)
                        ], 64))
                      ]),
                      _: 1
                    }, 8, ["class"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
            if (__props.label || !!slots.label || (__props.description || !!slots.description)) {
              _push2(`<div data-slot="wrapper" class="${serverRenderer_cjs_prodExports.ssrRenderClass(ui.value.wrapper({ class: props.ui?.wrapper }))}"${_scopeId}>`);
              if (__props.label || !!slots.label) {
                _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(vueExports.unref(Label_default), {
                  for: vueExports.unref(id),
                  "data-slot": "label",
                  class: ui.value.label({ class: props.ui?.label })
                }, {
                  default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      serverRenderer_cjs_prodExports.ssrRenderSlot(_ctx.$slots, "label", { label: __props.label }, () => {
                        _push3(`${serverRenderer_cjs_prodExports.ssrInterpolate(__props.label)}`);
                      }, _push3, _parent3, _scopeId2);
                    } else {
                      return [
                        vueExports.renderSlot(_ctx.$slots, "label", { label: __props.label }, () => [
                          vueExports.createTextVNode(vueExports.toDisplayString(__props.label), 1)
                        ])
                      ];
                    }
                  }),
                  _: 3
                }, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              if (__props.description || !!slots.description) {
                _push2(`<p data-slot="description" class="${serverRenderer_cjs_prodExports.ssrRenderClass(ui.value.description({ class: props.ui?.description }))}"${_scopeId}>`);
                serverRenderer_cjs_prodExports.ssrRenderSlot(_ctx.$slots, "description", { description: __props.description }, () => {
                  _push2(`${serverRenderer_cjs_prodExports.ssrInterpolate(__props.description)}`);
                }, _push2, _parent2, _scopeId);
                _push2(`</p>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              vueExports.createVNode("div", {
                "data-slot": "container",
                class: ui.value.container({ class: props.ui?.container })
              }, [
                vueExports.createVNode(vueExports.unref(SwitchRoot_default), vueExports.mergeProps({ id: vueExports.unref(id) }, { ...vueExports.unref(rootProps), ..._ctx.$attrs, ...vueExports.unref(ariaAttrs) }, {
                  modelValue: modelValue.value,
                  "onUpdate:modelValue": [($event) => modelValue.value = $event, onUpdate],
                  name: vueExports.unref(name),
                  disabled: vueExports.unref(disabled) || __props.loading,
                  "data-slot": "base",
                  class: ui.value.base({ class: props.ui?.base })
                }), {
                  default: vueExports.withCtx(() => [
                    vueExports.createVNode(vueExports.unref(SwitchThumb_default), {
                      "data-slot": "thumb",
                      class: ui.value.thumb({ class: props.ui?.thumb })
                    }, {
                      default: vueExports.withCtx(() => [
                        __props.loading ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$d, {
                          key: 0,
                          name: __props.loadingIcon || vueExports.unref(appConfig).ui.icons.loading,
                          "data-slot": "icon",
                          class: ui.value.icon({ class: props.ui?.icon, checked: true, unchecked: true })
                        }, null, 8, ["name", "class"])) : (vueExports.openBlock(), vueExports.createBlock(vueExports.Fragment, { key: 1 }, [
                          __props.checkedIcon ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$d, {
                            key: 0,
                            name: __props.checkedIcon,
                            "data-slot": "icon",
                            class: ui.value.icon({ class: props.ui?.icon, checked: true })
                          }, null, 8, ["name", "class"])) : vueExports.createCommentVNode("", true),
                          __props.uncheckedIcon ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$d, {
                            key: 1,
                            name: __props.uncheckedIcon,
                            "data-slot": "icon",
                            class: ui.value.icon({ class: props.ui?.icon, unchecked: true })
                          }, null, 8, ["name", "class"])) : vueExports.createCommentVNode("", true)
                        ], 64))
                      ]),
                      _: 1
                    }, 8, ["class"])
                  ]),
                  _: 1
                }, 16, ["id", "modelValue", "onUpdate:modelValue", "name", "disabled", "class"])
              ], 2),
              __props.label || !!slots.label || (__props.description || !!slots.description) ? (vueExports.openBlock(), vueExports.createBlock("div", {
                key: 0,
                "data-slot": "wrapper",
                class: ui.value.wrapper({ class: props.ui?.wrapper })
              }, [
                __props.label || !!slots.label ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(Label_default), {
                  key: 0,
                  for: vueExports.unref(id),
                  "data-slot": "label",
                  class: ui.value.label({ class: props.ui?.label })
                }, {
                  default: vueExports.withCtx(() => [
                    vueExports.renderSlot(_ctx.$slots, "label", { label: __props.label }, () => [
                      vueExports.createTextVNode(vueExports.toDisplayString(__props.label), 1)
                    ])
                  ]),
                  _: 3
                }, 8, ["for", "class"])) : vueExports.createCommentVNode("", true),
                __props.description || !!slots.description ? (vueExports.openBlock(), vueExports.createBlock("p", {
                  key: 1,
                  "data-slot": "description",
                  class: ui.value.description({ class: props.ui?.description })
                }, [
                  vueExports.renderSlot(_ctx.$slots, "description", { description: __props.description }, () => [
                    vueExports.createTextVNode(vueExports.toDisplayString(__props.description), 1)
                  ])
                ], 2)) : vueExports.createCommentVNode("", true)
              ], 2)) : vueExports.createCommentVNode("", true)
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$a = _sfc_main$a.setup;
_sfc_main$a.setup = (props, ctx) => {
  const ssrContext = vueExports.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/@nuxt+ui@4.2.1_@babel+parser@7.28.5_axios@1.13.2_db0@0.3.4_better-sqlite3@12.5.0_drizzl_dfa8f561a9d8983c7332d596b28eea3c/node_modules/@nuxt/ui/dist/runtime/components/Switch.vue");
  return _sfc_setup$a ? _sfc_setup$a(props, ctx) : void 0;
};
const _sfc_main$9 = /* @__PURE__ */ vueExports.defineComponent({
  __name: "ImageForm",
  __ssrInlineRender: true,
  props: {
    upstreams: {}
  },
  emits: ["submit"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const emit = __emit;
    const toast = useToast();
    const { getAuthHeader } = useAuth();
    const { settings, isLoaded: settingsLoaded } = useUserSettings();
    const prompt = vueExports.ref("");
    const negativePrompt = vueExports.ref("");
    const referenceImages = vueExports.ref([]);
    const isSubmitting = vueExports.ref(false);
    const selectedUpstreamId = vueExports.ref(null);
    const selectedAimodelId = vueExports.ref(null);
    const size = vueExports.ref("1024x1024");
    const quality = vueExports.ref("standard");
    const style = vueExports.ref("vivid");
    const aspectRatio = vueExports.ref("1:1");
    const seed = vueExports.ref(-1);
    const guidanceScale = vueExports.ref(2.5);
    const watermark = vueExports.ref(true);
    const background = vueExports.ref("auto");
    const dalleSizeOptions = [
      { label: "1024x1024 (方形)", value: "1024x1024" },
      { label: "1792x1024 (横版)", value: "1792x1024" },
      { label: "1024x1792 (竖版)", value: "1024x1792" }
    ];
    const doubaoSizeOptions = [
      { label: "1024x1024 (1:1)", value: "1024x1024" },
      { label: "1152x864 (4:3)", value: "1152x864" },
      { label: "864x1152 (3:4)", value: "864x1152" },
      { label: "1280x720 (16:9)", value: "1280x720" },
      { label: "720x1280 (9:16)", value: "720x1280" },
      { label: "1248x832 (3:2)", value: "1248x832" },
      { label: "832x1248 (2:3)", value: "832x1248" }
    ];
    const gptImageSizeOptions = [
      { label: "自动", value: "auto" },
      { label: "1024x1024 (方形)", value: "1024x1024" },
      { label: "1536x1024 (横版)", value: "1536x1024" },
      { label: "1024x1536 (竖版)", value: "1024x1536" }
    ];
    const dalleQualityOptions = [
      { label: "标准", value: "standard" },
      { label: "高清", value: "hd" }
    ];
    const gptImageQualityOptions = [
      { label: "高", value: "high" },
      { label: "中", value: "medium" },
      { label: "低", value: "low" }
    ];
    const styleOptions = [
      { label: "生动 (超现实)", value: "vivid" },
      { label: "自然", value: "natural" }
    ];
    const fluxAspectRatioOptions = [
      { label: "1:1 (方形)", value: "1:1" },
      { label: "16:9 (横屏)", value: "16:9" },
      { label: "9:16 (竖屏)", value: "9:16" },
      { label: "4:3", value: "4:3" },
      { label: "3:4", value: "3:4" },
      { label: "3:2", value: "3:2" },
      { label: "2:3", value: "2:3" },
      { label: "21:9 (超宽)", value: "21:9" }
    ];
    const backgroundOptions = [
      { label: "自动", value: "auto" },
      { label: "透明", value: "transparent" },
      { label: "不透明", value: "opaque" }
    ];
    const isOptimizing = vueExports.ref(false);
    vueExports.watch(settingsLoaded, (loaded) => {
      if (loaded && !selectedUpstreamId.value && !selectedAimodelId.value) {
        const workbenchUpstreamId = settings.value[USER_SETTING_KEYS.DRAWING_WORKBENCH_UPSTREAM_ID];
        const workbenchAimodelId = settings.value[USER_SETTING_KEYS.DRAWING_WORKBENCH_AIMODEL_ID];
        if (workbenchUpstreamId && workbenchAimodelId) {
          selectedUpstreamId.value = workbenchUpstreamId;
          selectedAimodelId.value = workbenchAimodelId;
        }
      }
    }, { immediate: true });
    const hasAiOptimizeConfig = vueExports.computed(() => {
      const upstreamId = settings.value[USER_SETTING_KEYS.DRAWING_AI_OPTIMIZE_UPSTREAM_ID];
      const aimodelId = settings.value[USER_SETTING_KEYS.DRAWING_AI_OPTIMIZE_AIMODEL_ID];
      return upstreamId && aimodelId;
    });
    async function handleOptimize() {
      if (!prompt.value.trim()) {
        toast.add({ title: "请先输入提示词", color: "warning" });
        return;
      }
      if (!hasAiOptimizeConfig.value) {
        toast.add({ title: "请先在设置中配置 AI 优化模型", color: "warning" });
        return;
      }
      isOptimizing.value = true;
      try {
        const result = await $fetch("/api/prompts/optimize", {
          method: "POST",
          headers: getAuthHeader(),
          body: {
            prompt: prompt.value,
            upstreamId: settings.value[USER_SETTING_KEYS.DRAWING_AI_OPTIMIZE_UPSTREAM_ID],
            aimodelId: settings.value[USER_SETTING_KEYS.DRAWING_AI_OPTIMIZE_AIMODEL_ID],
            modelName: settings.value[USER_SETTING_KEYS.DRAWING_AI_OPTIMIZE_MODEL_NAME],
            targetModelType: selectedAimodel.value?.modelType,
            targetModelName: selectedAimodel.value?.modelName
          }
        });
        if (result.success && result.optimizedPrompt) {
          prompt.value = result.optimizedPrompt;
          if (result.negativePrompt && supportsNegativePrompt.value) {
            negativePrompt.value = result.negativePrompt;
            toast.add({ title: "提示词已优化", description: "已填充负面提示词", color: "success" });
          } else {
            toast.add({ title: "提示词已优化", color: "success" });
          }
        }
      } catch (error) {
        toast.add({ title: "优化失败", description: error.data?.message || error.message, color: "error" });
      } finally {
        isOptimizing.value = false;
      }
    }
    const modelSelectorRef = vueExports.ref(null);
    const selectedAimodel = vueExports.computed(() => {
      return modelSelectorRef.value?.selectedAimodel;
    });
    const supportsReferenceImages = vueExports.computed(() => {
      if (!selectedAimodel.value?.apiFormat) return false;
      if (MODELS_WITHOUT_REFERENCE_IMAGE.includes(selectedAimodel.value.modelType)) return false;
      return true;
    });
    const supportsNegativePrompt = vueExports.computed(() => {
      if (!selectedAimodel.value) return false;
      return MODELS_WITH_NEGATIVE_PROMPT.includes(selectedAimodel.value.modelType);
    });
    const isDalleModel = vueExports.computed(() => selectedAimodel.value?.modelType === "dalle");
    const isDoubaoModel = vueExports.computed(() => selectedAimodel.value?.modelType === "doubao");
    vueExports.computed(() => selectedAimodel.value?.modelType === "flux");
    const isGpt4oImageModel = vueExports.computed(() => selectedAimodel.value?.modelType === "gpt4o-image");
    const supportsSize = vueExports.computed(() => {
      if (!selectedAimodel.value) return false;
      return MODELS_WITH_SIZE.includes(selectedAimodel.value.modelType);
    });
    const supportsQuality = vueExports.computed(() => {
      if (!selectedAimodel.value) return false;
      return MODELS_WITH_QUALITY.includes(selectedAimodel.value.modelType);
    });
    const supportsStyle = vueExports.computed(() => {
      if (!selectedAimodel.value) return false;
      return MODELS_WITH_STYLE.includes(selectedAimodel.value.modelType);
    });
    const supportsAspectRatio = vueExports.computed(() => {
      if (!selectedAimodel.value) return false;
      return MODELS_WITH_ASPECT_RATIO.includes(selectedAimodel.value.modelType);
    });
    const supportsSeed = vueExports.computed(() => {
      if (!selectedAimodel.value) return false;
      return MODELS_WITH_SEED.includes(selectedAimodel.value.modelType);
    });
    const supportsGuidance = vueExports.computed(() => {
      if (!selectedAimodel.value) return false;
      return MODELS_WITH_GUIDANCE.includes(selectedAimodel.value.modelType);
    });
    const supportsWatermark = vueExports.computed(() => {
      if (!selectedAimodel.value) return false;
      return MODELS_WITH_WATERMARK.includes(selectedAimodel.value.modelType);
    });
    const supportsBackground = vueExports.computed(() => {
      if (!selectedAimodel.value) return false;
      return MODELS_WITH_BACKGROUND.includes(selectedAimodel.value.modelType);
    });
    const currentSizeOptions = vueExports.computed(() => {
      if (isDalleModel.value) return dalleSizeOptions;
      if (isDoubaoModel.value) return doubaoSizeOptions;
      if (isGpt4oImageModel.value) return gptImageSizeOptions;
      return dalleSizeOptions;
    });
    const currentQualityOptions = vueExports.computed(() => {
      if (isGpt4oImageModel.value) return gptImageQualityOptions;
      return dalleQualityOptions;
    });
    const advancedOptionsCount = vueExports.computed(() => {
      let count = 0;
      if (supportsNegativePrompt.value) count++;
      if (supportsSize.value) count++;
      if (supportsQuality.value) count++;
      if (supportsStyle.value) count++;
      if (supportsAspectRatio.value) count++;
      if (supportsSeed.value) count++;
      if (supportsGuidance.value) count++;
      if (supportsWatermark.value) count++;
      if (supportsBackground.value) count++;
      return count;
    });
    const showModelInfoModal = vueExports.ref(false);
    const isUploading = vueExports.ref(false);
    async function handleFileChange(event) {
      const input = event.target;
      if (!input.files?.length) return;
      const files = Array.from(input.files).slice(0, MAX_REFERENCE_IMAGE_COUNT - referenceImages.value.length);
      for (const file of files) {
        if (file.size > MAX_REFERENCE_IMAGE_SIZE_BYTES) {
          toast.add({ title: "图片大小不能超过10MB", color: "error" });
          continue;
        }
        isUploading.value = true;
        try {
          const formData = new FormData();
          formData.append("file", file);
          const result = await $fetch("/api/images/upload", {
            method: "POST",
            body: formData
          });
          if (result.success && referenceImages.value.length < MAX_REFERENCE_IMAGE_COUNT) {
            referenceImages.value.push(result.url);
          }
        } catch (error) {
          toast.add({ title: "图片上传失败", description: error.message, color: "error" });
        } finally {
          isUploading.value = false;
        }
      }
      input.value = "";
    }
    function removeImage(index) {
      referenceImages.value.splice(index, 1);
    }
    async function handleSubmit() {
      if (!prompt.value.trim() && referenceImages.value.length === 0) {
        return;
      }
      if (!selectedUpstreamId.value || selectedAimodelId.value === null || !selectedAimodel.value) {
        toast.add({ title: "请先选择模型配置", color: "warning" });
        return;
      }
      if (!supportsReferenceImages.value && referenceImages.value.length > 0 && !prompt.value.trim()) {
        toast.add({ title: "当前模型需要输入提示词", color: "warning" });
        return;
      }
      isSubmitting.value = true;
      try {
        const imagesToSubmit = supportsReferenceImages.value ? referenceImages.value : [];
        const modelParams = {};
        if (supportsNegativePrompt.value && negativePrompt.value) {
          modelParams.negativePrompt = negativePrompt.value;
        }
        if (supportsSize.value && size.value) {
          modelParams.size = size.value;
        }
        if (supportsQuality.value && quality.value) {
          modelParams.quality = quality.value;
        }
        if (supportsStyle.value && style.value) {
          modelParams.style = style.value;
        }
        if (supportsAspectRatio.value && aspectRatio.value) {
          modelParams.aspectRatio = aspectRatio.value;
        }
        if (supportsSeed.value && seed.value !== -1) {
          modelParams.seed = seed.value;
        }
        if (supportsGuidance.value) {
          modelParams.guidanceScale = guidanceScale.value;
        }
        if (supportsWatermark.value) {
          modelParams.watermark = watermark.value;
        }
        if (supportsBackground.value && background.value !== "auto") {
          modelParams.background = background.value;
        }
        emit("submit", {
          prompt: prompt.value,
          images: imagesToSubmit,
          upstreamId: selectedUpstreamId.value,
          aimodelId: selectedAimodelId.value,
          modelType: selectedAimodel.value.modelType,
          apiFormat: selectedAimodel.value.apiFormat,
          modelName: selectedAimodel.value.modelName,
          modelParams
        });
      } finally {
        isSubmitting.value = false;
      }
    }
    function setContent(newPrompt, modelParams, images) {
      prompt.value = newPrompt || "";
      negativePrompt.value = modelParams?.negativePrompt || "";
      referenceImages.value = images.slice(0, MAX_REFERENCE_IMAGE_COUNT);
      if (modelParams) {
        if (modelParams.size) size.value = modelParams.size;
        if (modelParams.quality) quality.value = modelParams.quality;
        if (modelParams.style) style.value = modelParams.style;
        if (modelParams.aspectRatio) aspectRatio.value = modelParams.aspectRatio;
        if (modelParams.seed !== void 0) seed.value = modelParams.seed;
        if (modelParams.guidanceScale !== void 0) guidanceScale.value = modelParams.guidanceScale;
        if (modelParams.watermark !== void 0) watermark.value = modelParams.watermark;
        if (modelParams.background) background.value = modelParams.background;
      }
    }
    __expose({
      setContent
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UFormField = _sfc_main$g;
      const _component_UIcon = _sfc_main$d;
      const _component_ModelSelector = __nuxt_component_4;
      const _component_UModal = _sfc_main$h;
      const _component_UButton = _sfc_main$8$1;
      const _component_UTextarea = _sfc_main$i;
      const _component_UCollapsible = _sfc_main$b;
      const _component_USelect = _sfc_main$1$1;
      const _component_UInput = _sfc_main$e;
      const _component_USwitch = _sfc_main$a;
      _push(`<div${serverRenderer_cjs_prodExports.ssrRenderAttrs(vueExports.mergeProps({ class: "space-y-4" }, _attrs))}>`);
      _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UFormField, { label: "选择模型" }, {
        label: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="inline-flex items-center gap-1.5"${_scopeId}> 选择模型 `);
            if (vueExports.unref(selectedAimodel)) {
              _push2(`<button type="button" class="inline-flex items-center text-(--ui-text-muted) hover:text-(--ui-text) transition-colors"${_scopeId}>`);
              _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UIcon, {
                name: "i-heroicons-information-circle",
                class: "w-3.5 h-3.5"
              }, null, _parent2, _scopeId));
              _push2(`</button>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</span>`);
          } else {
            return [
              vueExports.createVNode("span", { class: "inline-flex items-center gap-1.5" }, [
                vueExports.createTextVNode(" 选择模型 "),
                vueExports.unref(selectedAimodel) ? (vueExports.openBlock(), vueExports.createBlock("button", {
                  key: 0,
                  type: "button",
                  class: "inline-flex items-center text-(--ui-text-muted) hover:text-(--ui-text) transition-colors",
                  onClick: ($event) => showModelInfoModal.value = true
                }, [
                  vueExports.createVNode(_component_UIcon, {
                    name: "i-heroicons-information-circle",
                    class: "w-3.5 h-3.5"
                  })
                ], 8, ["onClick"])) : vueExports.createCommentVNode("", true)
              ])
            ];
          }
        }),
        default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_ModelSelector, {
              ref_key: "modelSelectorRef",
              ref: modelSelectorRef,
              upstreams: __props.upstreams,
              category: "image",
              "show-type-label": "",
              "upstream-id": vueExports.unref(selectedUpstreamId),
              "onUpdate:upstreamId": ($event) => vueExports.isRef(selectedUpstreamId) ? selectedUpstreamId.value = $event : null,
              "aimodel-id": vueExports.unref(selectedAimodelId),
              "onUpdate:aimodelId": ($event) => vueExports.isRef(selectedAimodelId) ? selectedAimodelId.value = $event : null
            }, null, _parent2, _scopeId));
          } else {
            return [
              vueExports.createVNode(_component_ModelSelector, {
                ref_key: "modelSelectorRef",
                ref: modelSelectorRef,
                upstreams: __props.upstreams,
                category: "image",
                "show-type-label": "",
                "upstream-id": vueExports.unref(selectedUpstreamId),
                "onUpdate:upstreamId": ($event) => vueExports.isRef(selectedUpstreamId) ? selectedUpstreamId.value = $event : null,
                "aimodel-id": vueExports.unref(selectedAimodelId),
                "onUpdate:aimodelId": ($event) => vueExports.isRef(selectedAimodelId) ? selectedAimodelId.value = $event : null
              }, null, 8, ["upstreams", "upstream-id", "onUpdate:upstreamId", "aimodel-id", "onUpdate:aimodelId"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UModal, {
        open: vueExports.unref(showModelInfoModal),
        "onUpdate:open": ($event) => vueExports.isRef(showModelInfoModal) ? showModelInfoModal.value = $event : null,
        title: "模型信息"
      }, {
        body: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (vueExports.unref(selectedAimodel)) {
              _push2(`<div class="space-y-3"${_scopeId}><div class="flex items-center gap-2 text-sm"${_scopeId}><span class="text-(--ui-text-muted)"${_scopeId}>请求格式：</span><span class="text-(--ui-text)"${_scopeId}>${serverRenderer_cjs_prodExports.ssrInterpolate(vueExports.unref(API_FORMAT_LABELS)[vueExports.unref(selectedAimodel).apiFormat] || vueExports.unref(selectedAimodel).apiFormat)}</span></div><div class="flex items-center gap-2 text-sm"${_scopeId}><span class="text-(--ui-text-muted)"${_scopeId}>模型名称：</span><span class="text-(--ui-text) font-mono"${_scopeId}>${serverRenderer_cjs_prodExports.ssrInterpolate(vueExports.unref(selectedAimodel).modelName)}</span></div></div>`);
            } else {
              _push2(`<p class="text-(--ui-text-muted) text-sm"${_scopeId}>请先选择一个模型</p>`);
            }
          } else {
            return [
              vueExports.unref(selectedAimodel) ? (vueExports.openBlock(), vueExports.createBlock("div", {
                key: 0,
                class: "space-y-3"
              }, [
                vueExports.createVNode("div", { class: "flex items-center gap-2 text-sm" }, [
                  vueExports.createVNode("span", { class: "text-(--ui-text-muted)" }, "请求格式："),
                  vueExports.createVNode("span", { class: "text-(--ui-text)" }, vueExports.toDisplayString(vueExports.unref(API_FORMAT_LABELS)[vueExports.unref(selectedAimodel).apiFormat] || vueExports.unref(selectedAimodel).apiFormat), 1)
                ]),
                vueExports.createVNode("div", { class: "flex items-center gap-2 text-sm" }, [
                  vueExports.createVNode("span", { class: "text-(--ui-text-muted)" }, "模型名称："),
                  vueExports.createVNode("span", { class: "text-(--ui-text) font-mono" }, vueExports.toDisplayString(vueExports.unref(selectedAimodel).modelName), 1)
                ])
              ])) : (vueExports.openBlock(), vueExports.createBlock("p", {
                key: 1,
                class: "text-(--ui-text-muted) text-sm"
              }, "请先选择一个模型"))
            ];
          }
        }),
        footer: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UButton, {
              variant: "ghost",
              onClick: ($event) => showModelInfoModal.value = false
            }, {
              default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`关闭`);
                } else {
                  return [
                    vueExports.createTextVNode("关闭")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              vueExports.createVNode(_component_UButton, {
                variant: "ghost",
                onClick: ($event) => showModelInfoModal.value = false
              }, {
                default: vueExports.withCtx(() => [
                  vueExports.createTextVNode("关闭")
                ]),
                _: 1
              }, 8, ["onClick"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="border-t border-(--ui-border)"></div>`);
      if (vueExports.unref(supportsReferenceImages)) {
        _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UFormField, { label: "参考图 (可选)" }, {
          hint: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span class="text-(--ui-text-dimmed) text-xs"${_scopeId}>支持 JPG、PNG，单张最大10MB</span>`);
            } else {
              return [
                vueExports.createVNode("span", { class: "text-(--ui-text-dimmed) text-xs" }, "支持 JPG、PNG，单张最大10MB")
              ];
            }
          }),
          default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="flex gap-3 flex-wrap"${_scopeId}><!--[-->`);
              serverRenderer_cjs_prodExports.ssrRenderList(vueExports.unref(referenceImages), (img, index) => {
                _push2(`<div class="relative w-24 h-24 rounded-lg overflow-hidden group"${_scopeId}><img${serverRenderer_cjs_prodExports.ssrRenderAttr("src", img)} class="w-full h-full object-cover"${_scopeId}><button type="button" class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"${_scopeId}>`);
                _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UIcon, {
                  name: "i-heroicons-x-mark",
                  class: "w-6 h-6 text-white"
                }, null, _parent2, _scopeId));
                _push2(`</button></div>`);
              });
              _push2(`<!--]-->`);
              if (vueExports.unref(referenceImages).length < vueExports.unref(MAX_REFERENCE_IMAGE_COUNT)) {
                _push2(`<label class="w-24 h-24 rounded-lg border-2 border-dashed border-(--ui-border-accented) hover:border-(--ui-primary) transition-colors flex flex-col items-center justify-center cursor-pointer"${_scopeId}>`);
                _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UIcon, {
                  name: "i-heroicons-cloud-arrow-up",
                  class: "w-8 h-8 text-(--ui-text-dimmed) mb-1"
                }, null, _parent2, _scopeId));
                _push2(`<span class="text-(--ui-text-dimmed) text-xs"${_scopeId}>上传</span><input type="file" accept="image/png,image/jpeg" multiple class="hidden"${_scopeId}></label>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            } else {
              return [
                vueExports.createVNode("div", { class: "flex gap-3 flex-wrap" }, [
                  (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(vueExports.unref(referenceImages), (img, index) => {
                    return vueExports.openBlock(), vueExports.createBlock("div", {
                      key: index,
                      class: "relative w-24 h-24 rounded-lg overflow-hidden group"
                    }, [
                      vueExports.createVNode("img", {
                        src: img,
                        class: "w-full h-full object-cover"
                      }, null, 8, ["src"]),
                      vueExports.createVNode("button", {
                        type: "button",
                        class: "absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center",
                        onClick: ($event) => removeImage(index)
                      }, [
                        vueExports.createVNode(_component_UIcon, {
                          name: "i-heroicons-x-mark",
                          class: "w-6 h-6 text-white"
                        })
                      ], 8, ["onClick"])
                    ]);
                  }), 128)),
                  vueExports.unref(referenceImages).length < vueExports.unref(MAX_REFERENCE_IMAGE_COUNT) ? (vueExports.openBlock(), vueExports.createBlock("label", {
                    key: 0,
                    class: "w-24 h-24 rounded-lg border-2 border-dashed border-(--ui-border-accented) hover:border-(--ui-primary) transition-colors flex flex-col items-center justify-center cursor-pointer"
                  }, [
                    vueExports.createVNode(_component_UIcon, {
                      name: "i-heroicons-cloud-arrow-up",
                      class: "w-8 h-8 text-(--ui-text-dimmed) mb-1"
                    }),
                    vueExports.createVNode("span", { class: "text-(--ui-text-dimmed) text-xs" }, "上传"),
                    vueExports.createVNode("input", {
                      type: "file",
                      accept: "image/png,image/jpeg",
                      multiple: "",
                      class: "hidden",
                      onChange: handleFileChange
                    }, null, 32)
                  ])) : vueExports.createCommentVNode("", true)
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UFormField, { label: "描述你想要的图片" }, {
        label: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="inline-flex items-center gap-2"${_scopeId}> 描述你想要的图片 `);
            _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UButton, {
              size: "xs",
              variant: "soft",
              loading: vueExports.unref(isOptimizing),
              disabled: !vueExports.unref(prompt).trim() || !vueExports.unref(hasAiOptimizeConfig),
              onClick: handleOptimize
            }, {
              default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UIcon, {
                    name: "i-heroicons-sparkles",
                    class: "w-3.5 h-3.5 mr-1"
                  }, null, _parent3, _scopeId2));
                  _push3(` AI 优化 `);
                } else {
                  return [
                    vueExports.createVNode(_component_UIcon, {
                      name: "i-heroicons-sparkles",
                      class: "w-3.5 h-3.5 mr-1"
                    }),
                    vueExports.createTextVNode(" AI 优化 ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</span>`);
          } else {
            return [
              vueExports.createVNode("span", { class: "inline-flex items-center gap-2" }, [
                vueExports.createTextVNode(" 描述你想要的图片 "),
                vueExports.createVNode(_component_UButton, {
                  size: "xs",
                  variant: "soft",
                  loading: vueExports.unref(isOptimizing),
                  disabled: !vueExports.unref(prompt).trim() || !vueExports.unref(hasAiOptimizeConfig),
                  onClick: handleOptimize
                }, {
                  default: vueExports.withCtx(() => [
                    vueExports.createVNode(_component_UIcon, {
                      name: "i-heroicons-sparkles",
                      class: "w-3.5 h-3.5 mr-1"
                    }),
                    vueExports.createTextVNode(" AI 优化 ")
                  ]),
                  _: 1
                }, 8, ["loading", "disabled"])
              ])
            ];
          }
        }),
        default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UTextarea, {
              modelValue: vueExports.unref(prompt),
              "onUpdate:modelValue": ($event) => vueExports.isRef(prompt) ? prompt.value = $event : null,
              placeholder: "例如：一只可爱的小猫咪坐在花园里，油画风格，高清，细节丰富",
              rows: 8,
              class: "w-full"
            }, null, _parent2, _scopeId));
          } else {
            return [
              vueExports.createVNode(_component_UTextarea, {
                modelValue: vueExports.unref(prompt),
                "onUpdate:modelValue": ($event) => vueExports.isRef(prompt) ? prompt.value = $event : null,
                placeholder: "例如：一只可爱的小猫咪坐在花园里，油画风格，高清，细节丰富",
                rows: 8,
                class: "w-full"
              }, null, 8, ["modelValue", "onUpdate:modelValue"])
            ];
          }
        }),
        _: 1
      }, _parent));
      if (vueExports.unref(selectedAimodel)) {
        _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UCollapsible, null, {
          content: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="pt-4 space-y-4"${_scopeId}>`);
              if (vueExports.unref(advancedOptionsCount) === 0) {
                _push2(`<div class="text-center py-4 text-(--ui-text-muted) text-sm"${_scopeId}> 该模型没有高级选项 </div>`);
              } else {
                _push2(`<!---->`);
              }
              if (vueExports.unref(supportsNegativePrompt)) {
                _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UFormField, { label: "负面提示词" }, {
                  hint: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<span class="text-(--ui-text-dimmed) text-xs"${_scopeId2}>描述不希望出现的内容</span>`);
                    } else {
                      return [
                        vueExports.createVNode("span", { class: "text-(--ui-text-dimmed) text-xs" }, "描述不希望出现的内容")
                      ];
                    }
                  }),
                  default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UTextarea, {
                        modelValue: vueExports.unref(negativePrompt),
                        "onUpdate:modelValue": ($event) => vueExports.isRef(negativePrompt) ? negativePrompt.value = $event : null,
                        placeholder: "例如：模糊、低质量、变形、水印",
                        rows: 3,
                        class: "w-full"
                      }, null, _parent3, _scopeId2));
                    } else {
                      return [
                        vueExports.createVNode(_component_UTextarea, {
                          modelValue: vueExports.unref(negativePrompt),
                          "onUpdate:modelValue": ($event) => vueExports.isRef(negativePrompt) ? negativePrompt.value = $event : null,
                          placeholder: "例如：模糊、低质量、变形、水印",
                          rows: 3,
                          class: "w-full"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              if (vueExports.unref(supportsSize)) {
                _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UFormField, { label: "尺寸" }, {
                  default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_USelect, {
                        modelValue: vueExports.unref(size),
                        "onUpdate:modelValue": ($event) => vueExports.isRef(size) ? size.value = $event : null,
                        items: vueExports.unref(currentSizeOptions),
                        "value-key": "value",
                        "label-key": "label",
                        class: "w-full"
                      }, null, _parent3, _scopeId2));
                    } else {
                      return [
                        vueExports.createVNode(_component_USelect, {
                          modelValue: vueExports.unref(size),
                          "onUpdate:modelValue": ($event) => vueExports.isRef(size) ? size.value = $event : null,
                          items: vueExports.unref(currentSizeOptions),
                          "value-key": "value",
                          "label-key": "label",
                          class: "w-full"
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              if (vueExports.unref(supportsAspectRatio)) {
                _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UFormField, { label: "宽高比" }, {
                  default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_USelect, {
                        modelValue: vueExports.unref(aspectRatio),
                        "onUpdate:modelValue": ($event) => vueExports.isRef(aspectRatio) ? aspectRatio.value = $event : null,
                        items: fluxAspectRatioOptions,
                        "value-key": "value",
                        "label-key": "label",
                        class: "w-full"
                      }, null, _parent3, _scopeId2));
                    } else {
                      return [
                        vueExports.createVNode(_component_USelect, {
                          modelValue: vueExports.unref(aspectRatio),
                          "onUpdate:modelValue": ($event) => vueExports.isRef(aspectRatio) ? aspectRatio.value = $event : null,
                          items: fluxAspectRatioOptions,
                          "value-key": "value",
                          "label-key": "label",
                          class: "w-full"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              if (vueExports.unref(supportsQuality)) {
                _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UFormField, { label: "质量" }, {
                  default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_USelect, {
                        modelValue: vueExports.unref(quality),
                        "onUpdate:modelValue": ($event) => vueExports.isRef(quality) ? quality.value = $event : null,
                        items: vueExports.unref(currentQualityOptions),
                        "value-key": "value",
                        "label-key": "label",
                        class: "w-full"
                      }, null, _parent3, _scopeId2));
                    } else {
                      return [
                        vueExports.createVNode(_component_USelect, {
                          modelValue: vueExports.unref(quality),
                          "onUpdate:modelValue": ($event) => vueExports.isRef(quality) ? quality.value = $event : null,
                          items: vueExports.unref(currentQualityOptions),
                          "value-key": "value",
                          "label-key": "label",
                          class: "w-full"
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              if (vueExports.unref(supportsStyle)) {
                _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UFormField, { label: "风格" }, {
                  default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_USelect, {
                        modelValue: vueExports.unref(style),
                        "onUpdate:modelValue": ($event) => vueExports.isRef(style) ? style.value = $event : null,
                        items: styleOptions,
                        "value-key": "value",
                        "label-key": "label",
                        class: "w-full"
                      }, null, _parent3, _scopeId2));
                    } else {
                      return [
                        vueExports.createVNode(_component_USelect, {
                          modelValue: vueExports.unref(style),
                          "onUpdate:modelValue": ($event) => vueExports.isRef(style) ? style.value = $event : null,
                          items: styleOptions,
                          "value-key": "value",
                          "label-key": "label",
                          class: "w-full"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              if (vueExports.unref(supportsBackground)) {
                _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UFormField, { label: "背景" }, {
                  default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_USelect, {
                        modelValue: vueExports.unref(background),
                        "onUpdate:modelValue": ($event) => vueExports.isRef(background) ? background.value = $event : null,
                        items: backgroundOptions,
                        "value-key": "value",
                        "label-key": "label",
                        class: "w-full"
                      }, null, _parent3, _scopeId2));
                    } else {
                      return [
                        vueExports.createVNode(_component_USelect, {
                          modelValue: vueExports.unref(background),
                          "onUpdate:modelValue": ($event) => vueExports.isRef(background) ? background.value = $event : null,
                          items: backgroundOptions,
                          "value-key": "value",
                          "label-key": "label",
                          class: "w-full"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              if (vueExports.unref(supportsGuidance)) {
                _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UFormField, { label: "提示词相关度" }, {
                  hint: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<span class="text-(--ui-text-dimmed) text-xs"${_scopeId2}>值越大与提示词相关性越强 (1-10)</span>`);
                    } else {
                      return [
                        vueExports.createVNode("span", { class: "text-(--ui-text-dimmed) text-xs" }, "值越大与提示词相关性越强 (1-10)")
                      ];
                    }
                  }),
                  default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UInput, {
                        modelValue: vueExports.unref(guidanceScale),
                        "onUpdate:modelValue": ($event) => vueExports.isRef(guidanceScale) ? guidanceScale.value = $event : null,
                        modelModifiers: { number: true },
                        type: "number",
                        min: 1,
                        max: 10,
                        step: 0.5,
                        class: "w-full"
                      }, null, _parent3, _scopeId2));
                    } else {
                      return [
                        vueExports.createVNode(_component_UInput, {
                          modelValue: vueExports.unref(guidanceScale),
                          "onUpdate:modelValue": ($event) => vueExports.isRef(guidanceScale) ? guidanceScale.value = $event : null,
                          modelModifiers: { number: true },
                          type: "number",
                          min: 1,
                          max: 10,
                          step: 0.5,
                          class: "w-full"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              if (vueExports.unref(supportsSeed)) {
                _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UFormField, { label: "随机种子" }, {
                  hint: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<span class="text-(--ui-text-dimmed) text-xs"${_scopeId2}>-1 表示自动生成</span>`);
                    } else {
                      return [
                        vueExports.createVNode("span", { class: "text-(--ui-text-dimmed) text-xs" }, "-1 表示自动生成")
                      ];
                    }
                  }),
                  default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UInput, {
                        modelValue: vueExports.unref(seed),
                        "onUpdate:modelValue": ($event) => vueExports.isRef(seed) ? seed.value = $event : null,
                        modelModifiers: { number: true },
                        type: "number",
                        min: -1,
                        max: 2147483647,
                        class: "w-full"
                      }, null, _parent3, _scopeId2));
                    } else {
                      return [
                        vueExports.createVNode(_component_UInput, {
                          modelValue: vueExports.unref(seed),
                          "onUpdate:modelValue": ($event) => vueExports.isRef(seed) ? seed.value = $event : null,
                          modelModifiers: { number: true },
                          type: "number",
                          min: -1,
                          max: 2147483647,
                          class: "w-full"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              if (vueExports.unref(supportsWatermark)) {
                _push2(`<div class="flex items-center justify-between"${_scopeId}><div class="flex flex-col"${_scopeId}><span class="text-sm text-(--ui-text)"${_scopeId}>添加水印</span><span class="text-xs text-(--ui-text-dimmed)"${_scopeId}>在图片右下角添加&quot;AI生成&quot;水印</span></div>`);
                _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_USwitch, {
                  modelValue: vueExports.unref(watermark),
                  "onUpdate:modelValue": ($event) => vueExports.isRef(watermark) ? watermark.value = $event : null
                }, null, _parent2, _scopeId));
                _push2(`</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            } else {
              return [
                vueExports.createVNode("div", { class: "pt-4 space-y-4" }, [
                  vueExports.unref(advancedOptionsCount) === 0 ? (vueExports.openBlock(), vueExports.createBlock("div", {
                    key: 0,
                    class: "text-center py-4 text-(--ui-text-muted) text-sm"
                  }, " 该模型没有高级选项 ")) : vueExports.createCommentVNode("", true),
                  vueExports.unref(supportsNegativePrompt) ? (vueExports.openBlock(), vueExports.createBlock(_component_UFormField, {
                    key: 1,
                    label: "负面提示词"
                  }, {
                    hint: vueExports.withCtx(() => [
                      vueExports.createVNode("span", { class: "text-(--ui-text-dimmed) text-xs" }, "描述不希望出现的内容")
                    ]),
                    default: vueExports.withCtx(() => [
                      vueExports.createVNode(_component_UTextarea, {
                        modelValue: vueExports.unref(negativePrompt),
                        "onUpdate:modelValue": ($event) => vueExports.isRef(negativePrompt) ? negativePrompt.value = $event : null,
                        placeholder: "例如：模糊、低质量、变形、水印",
                        rows: 3,
                        class: "w-full"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  })) : vueExports.createCommentVNode("", true),
                  vueExports.unref(supportsSize) ? (vueExports.openBlock(), vueExports.createBlock(_component_UFormField, {
                    key: 2,
                    label: "尺寸"
                  }, {
                    default: vueExports.withCtx(() => [
                      vueExports.createVNode(_component_USelect, {
                        modelValue: vueExports.unref(size),
                        "onUpdate:modelValue": ($event) => vueExports.isRef(size) ? size.value = $event : null,
                        items: vueExports.unref(currentSizeOptions),
                        "value-key": "value",
                        "label-key": "label",
                        class: "w-full"
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                    ]),
                    _: 1
                  })) : vueExports.createCommentVNode("", true),
                  vueExports.unref(supportsAspectRatio) ? (vueExports.openBlock(), vueExports.createBlock(_component_UFormField, {
                    key: 3,
                    label: "宽高比"
                  }, {
                    default: vueExports.withCtx(() => [
                      vueExports.createVNode(_component_USelect, {
                        modelValue: vueExports.unref(aspectRatio),
                        "onUpdate:modelValue": ($event) => vueExports.isRef(aspectRatio) ? aspectRatio.value = $event : null,
                        items: fluxAspectRatioOptions,
                        "value-key": "value",
                        "label-key": "label",
                        class: "w-full"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  })) : vueExports.createCommentVNode("", true),
                  vueExports.unref(supportsQuality) ? (vueExports.openBlock(), vueExports.createBlock(_component_UFormField, {
                    key: 4,
                    label: "质量"
                  }, {
                    default: vueExports.withCtx(() => [
                      vueExports.createVNode(_component_USelect, {
                        modelValue: vueExports.unref(quality),
                        "onUpdate:modelValue": ($event) => vueExports.isRef(quality) ? quality.value = $event : null,
                        items: vueExports.unref(currentQualityOptions),
                        "value-key": "value",
                        "label-key": "label",
                        class: "w-full"
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                    ]),
                    _: 1
                  })) : vueExports.createCommentVNode("", true),
                  vueExports.unref(supportsStyle) ? (vueExports.openBlock(), vueExports.createBlock(_component_UFormField, {
                    key: 5,
                    label: "风格"
                  }, {
                    default: vueExports.withCtx(() => [
                      vueExports.createVNode(_component_USelect, {
                        modelValue: vueExports.unref(style),
                        "onUpdate:modelValue": ($event) => vueExports.isRef(style) ? style.value = $event : null,
                        items: styleOptions,
                        "value-key": "value",
                        "label-key": "label",
                        class: "w-full"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  })) : vueExports.createCommentVNode("", true),
                  vueExports.unref(supportsBackground) ? (vueExports.openBlock(), vueExports.createBlock(_component_UFormField, {
                    key: 6,
                    label: "背景"
                  }, {
                    default: vueExports.withCtx(() => [
                      vueExports.createVNode(_component_USelect, {
                        modelValue: vueExports.unref(background),
                        "onUpdate:modelValue": ($event) => vueExports.isRef(background) ? background.value = $event : null,
                        items: backgroundOptions,
                        "value-key": "value",
                        "label-key": "label",
                        class: "w-full"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  })) : vueExports.createCommentVNode("", true),
                  vueExports.unref(supportsGuidance) ? (vueExports.openBlock(), vueExports.createBlock(_component_UFormField, {
                    key: 7,
                    label: "提示词相关度"
                  }, {
                    hint: vueExports.withCtx(() => [
                      vueExports.createVNode("span", { class: "text-(--ui-text-dimmed) text-xs" }, "值越大与提示词相关性越强 (1-10)")
                    ]),
                    default: vueExports.withCtx(() => [
                      vueExports.createVNode(_component_UInput, {
                        modelValue: vueExports.unref(guidanceScale),
                        "onUpdate:modelValue": ($event) => vueExports.isRef(guidanceScale) ? guidanceScale.value = $event : null,
                        modelModifiers: { number: true },
                        type: "number",
                        min: 1,
                        max: 10,
                        step: 0.5,
                        class: "w-full"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  })) : vueExports.createCommentVNode("", true),
                  vueExports.unref(supportsSeed) ? (vueExports.openBlock(), vueExports.createBlock(_component_UFormField, {
                    key: 8,
                    label: "随机种子"
                  }, {
                    hint: vueExports.withCtx(() => [
                      vueExports.createVNode("span", { class: "text-(--ui-text-dimmed) text-xs" }, "-1 表示自动生成")
                    ]),
                    default: vueExports.withCtx(() => [
                      vueExports.createVNode(_component_UInput, {
                        modelValue: vueExports.unref(seed),
                        "onUpdate:modelValue": ($event) => vueExports.isRef(seed) ? seed.value = $event : null,
                        modelModifiers: { number: true },
                        type: "number",
                        min: -1,
                        max: 2147483647,
                        class: "w-full"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  })) : vueExports.createCommentVNode("", true),
                  vueExports.unref(supportsWatermark) ? (vueExports.openBlock(), vueExports.createBlock("div", {
                    key: 9,
                    class: "flex items-center justify-between"
                  }, [
                    vueExports.createVNode("div", { class: "flex flex-col" }, [
                      vueExports.createVNode("span", { class: "text-sm text-(--ui-text)" }, "添加水印"),
                      vueExports.createVNode("span", { class: "text-xs text-(--ui-text-dimmed)" }, '在图片右下角添加"AI生成"水印')
                    ]),
                    vueExports.createVNode(_component_USwitch, {
                      modelValue: vueExports.unref(watermark),
                      "onUpdate:modelValue": ($event) => vueExports.isRef(watermark) ? watermark.value = $event : null
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ])) : vueExports.createCommentVNode("", true)
                ])
              ];
            }
          }),
          default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UButton, {
                variant: "ghost",
                block: "",
                class: "justify-between",
                ui: { trailingIconLeadingClass: "ms-auto" }
              }, {
                trailing: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UIcon, {
                      name: "i-heroicons-chevron-down",
                      class: "w-4 h-4 transition-transform group-data-[state=open]:rotate-180"
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      vueExports.createVNode(_component_UIcon, {
                        name: "i-heroicons-chevron-down",
                        class: "w-4 h-4 transition-transform group-data-[state=open]:rotate-180"
                      })
                    ];
                  }
                }),
                default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<span class="text-sm text-(--ui-text-muted)"${_scopeId2}> 高级选项 `);
                    if (vueExports.unref(advancedOptionsCount) > 0) {
                      _push3(`<span class="ml-1 text-(--ui-primary)"${_scopeId2}>+${serverRenderer_cjs_prodExports.ssrInterpolate(vueExports.unref(advancedOptionsCount))}</span>`);
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(`</span>`);
                  } else {
                    return [
                      vueExports.createVNode("span", { class: "text-sm text-(--ui-text-muted)" }, [
                        vueExports.createTextVNode(" 高级选项 "),
                        vueExports.unref(advancedOptionsCount) > 0 ? (vueExports.openBlock(), vueExports.createBlock("span", {
                          key: 0,
                          class: "ml-1 text-(--ui-primary)"
                        }, "+" + vueExports.toDisplayString(vueExports.unref(advancedOptionsCount)), 1)) : vueExports.createCommentVNode("", true)
                      ])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                vueExports.createVNode(_component_UButton, {
                  variant: "ghost",
                  block: "",
                  class: "justify-between",
                  ui: { trailingIconLeadingClass: "ms-auto" }
                }, {
                  trailing: vueExports.withCtx(() => [
                    vueExports.createVNode(_component_UIcon, {
                      name: "i-heroicons-chevron-down",
                      class: "w-4 h-4 transition-transform group-data-[state=open]:rotate-180"
                    })
                  ]),
                  default: vueExports.withCtx(() => [
                    vueExports.createVNode("span", { class: "text-sm text-(--ui-text-muted)" }, [
                      vueExports.createTextVNode(" 高级选项 "),
                      vueExports.unref(advancedOptionsCount) > 0 ? (vueExports.openBlock(), vueExports.createBlock("span", {
                        key: 0,
                        class: "ml-1 text-(--ui-primary)"
                      }, "+" + vueExports.toDisplayString(vueExports.unref(advancedOptionsCount)), 1)) : vueExports.createCommentVNode("", true)
                    ])
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UButton, {
        block: "",
        size: "lg",
        loading: vueExports.unref(isSubmitting),
        disabled: !vueExports.unref(prompt).trim() && vueExports.unref(referenceImages).length === 0 || !vueExports.unref(selectedUpstreamId) || vueExports.unref(selectedAimodelId) === null || __props.upstreams.length === 0,
        class: "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600",
        onClick: handleSubmit
      }, {
        default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-sparkles",
              class: "w-5 h-5 mr-2"
            }, null, _parent2, _scopeId));
            _push2(` 开始生成 `);
          } else {
            return [
              vueExports.createVNode(_component_UIcon, {
                name: "i-heroicons-sparkles",
                class: "w-5 h-5 mr-2"
              }),
              vueExports.createTextVNode(" 开始生成 ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = vueExports.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/studio/ImageForm.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
const __nuxt_component_2 = Object.assign(_sfc_main$9, { __name: "StudioImageForm" });
const _sfc_main$8 = /* @__PURE__ */ vueExports.defineComponent({
  __name: "VideoForm",
  __ssrInlineRender: true,
  props: {
    upstreams: {}
  },
  emits: ["submit"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const emit = __emit;
    const toast = useToast();
    useUserSettings();
    const prompt = vueExports.ref("");
    const referenceImages = vueExports.ref([]);
    const isSubmitting = vueExports.ref(false);
    const selectedUpstreamId = vueExports.ref(null);
    const selectedAimodelId = vueExports.ref(null);
    const aspectRatio = vueExports.ref("16:9");
    const size = vueExports.ref("1080P");
    const enhancePrompt = vueExports.ref(true);
    const enableUpsample = vueExports.ref(false);
    const orientation = vueExports.ref("landscape");
    const soraSize = vueExports.ref("small");
    const duration = vueExports.ref(10);
    const watermark = vueExports.ref(false);
    const soraPrivate = vueExports.ref(false);
    const aspectRatioOptions = [
      { label: "16:9 (横屏)", value: "16:9" },
      { label: "9:16 (竖屏)", value: "9:16" },
      { label: "4:3", value: "4:3" },
      { label: "3:4", value: "3:4" },
      { label: "1:1 (方形)", value: "1:1" },
      { label: "21:9 (超宽)", value: "21:9" }
    ];
    const sizeOptions = [
      { label: "1080P", value: "1080P" },
      { label: "1280x720", value: "1280x720" },
      { label: "720x1280", value: "720x1280" }
    ];
    const soraOrientationOptions = [
      { label: "横屏", value: "landscape" },
      { label: "竖屏", value: "portrait" }
    ];
    const soraSizeOptions = [
      { label: "标准 (720p)", value: "small" },
      { label: "高清", value: "large" }
    ];
    const soraDurationOptions = [
      { label: "10 秒", value: 10 },
      { label: "15 秒", value: 15 }
    ];
    const grokAspectRatioOptions = [
      { label: "3:2 (横屏)", value: "3:2" },
      { label: "2:3 (竖屏)", value: "2:3" },
      { label: "1:1 (方形)", value: "1:1" }
    ];
    const modelSelectorRef = vueExports.ref(null);
    const selectedAimodel = vueExports.computed(() => {
      return modelSelectorRef.value?.selectedAimodel;
    });
    const isJimengModel = vueExports.computed(() => selectedAimodel.value?.modelType === "jimeng-video");
    const isVeoModel = vueExports.computed(() => selectedAimodel.value?.modelType === "veo");
    const isSoraModel = vueExports.computed(() => selectedAimodel.value?.modelType === "sora");
    const isGrokVideoModel = vueExports.computed(() => selectedAimodel.value?.modelType === "grok-video");
    const veoAspectRatioOptions = aspectRatioOptions.filter((o) => ["16:9", "9:16"].includes(o.value));
    const showModelInfoModal = vueExports.ref(false);
    const isUploading = vueExports.ref(false);
    async function handleFileChange(event) {
      const input = event.target;
      if (!input.files?.length) return;
      const file = input.files[0];
      if (file.size > MAX_REFERENCE_IMAGE_SIZE_BYTES) {
        toast.add({ title: "图片大小不能超过10MB", color: "error" });
        input.value = "";
        return;
      }
      isUploading.value = true;
      try {
        const formData = new FormData();
        formData.append("file", file);
        const result = await $fetch("/api/images/upload", {
          method: "POST",
          body: formData
        });
        if (result.success) {
          referenceImages.value = [result.url];
        }
      } catch (error) {
        toast.add({ title: "图片上传失败", description: error.message, color: "error" });
      } finally {
        isUploading.value = false;
      }
      input.value = "";
    }
    function removeImage() {
      referenceImages.value = [];
    }
    async function handleSubmit() {
      if (!prompt.value.trim()) {
        toast.add({ title: "请输入提示词", color: "warning" });
        return;
      }
      if (!selectedUpstreamId.value || selectedAimodelId.value === null || !selectedAimodel.value) {
        toast.add({ title: "请先选择模型配置", color: "warning" });
        return;
      }
      isSubmitting.value = true;
      try {
        let modelParams = {};
        if (isJimengModel.value) {
          modelParams = {
            aspectRatio: aspectRatio.value,
            size: size.value
          };
        } else if (isVeoModel.value) {
          modelParams = {
            aspectRatio: veoAspectRatioOptions.some((o) => o.value === aspectRatio.value) ? aspectRatio.value : "16:9",
            enhancePrompt: enhancePrompt.value,
            enableUpsample: enableUpsample.value
          };
        } else if (isSoraModel.value) {
          modelParams = {
            orientation: orientation.value,
            size: soraSize.value,
            duration: duration.value,
            watermark: watermark.value,
            private: soraPrivate.value
          };
        } else if (isGrokVideoModel.value) {
          modelParams = {
            aspectRatio: grokAspectRatioOptions.some((o) => o.value === aspectRatio.value) ? aspectRatio.value : "3:2",
            size: "720P"
          };
        }
        emit("submit", {
          prompt: prompt.value,
          images: referenceImages.value,
          upstreamId: selectedUpstreamId.value,
          aimodelId: selectedAimodelId.value,
          modelType: selectedAimodel.value.modelType,
          apiFormat: selectedAimodel.value.apiFormat,
          modelName: selectedAimodel.value.modelName,
          modelParams
        });
      } finally {
        isSubmitting.value = false;
      }
    }
    function setContent(newPrompt, images) {
      prompt.value = newPrompt || "";
      referenceImages.value = images.slice(0, 1);
    }
    __expose({
      setContent
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UFormField = _sfc_main$g;
      const _component_UIcon = _sfc_main$d;
      const _component_ModelSelector = __nuxt_component_4;
      const _component_UModal = _sfc_main$h;
      const _component_UButton = _sfc_main$8$1;
      const _component_UTextarea = _sfc_main$i;
      const _component_USelect = _sfc_main$1$1;
      const _component_USwitch = _sfc_main$a;
      const _component_UInput = _sfc_main$e;
      _push(`<div${serverRenderer_cjs_prodExports.ssrRenderAttrs(vueExports.mergeProps({ class: "space-y-4" }, _attrs))}>`);
      _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UFormField, { label: "选择模型" }, {
        label: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="inline-flex items-center gap-1.5"${_scopeId}> 选择模型 `);
            if (vueExports.unref(selectedAimodel)) {
              _push2(`<button type="button" class="inline-flex items-center text-(--ui-text-muted) hover:text-(--ui-text) transition-colors"${_scopeId}>`);
              _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UIcon, {
                name: "i-heroicons-information-circle",
                class: "w-3.5 h-3.5"
              }, null, _parent2, _scopeId));
              _push2(`</button>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</span>`);
          } else {
            return [
              vueExports.createVNode("span", { class: "inline-flex items-center gap-1.5" }, [
                vueExports.createTextVNode(" 选择模型 "),
                vueExports.unref(selectedAimodel) ? (vueExports.openBlock(), vueExports.createBlock("button", {
                  key: 0,
                  type: "button",
                  class: "inline-flex items-center text-(--ui-text-muted) hover:text-(--ui-text) transition-colors",
                  onClick: ($event) => showModelInfoModal.value = true
                }, [
                  vueExports.createVNode(_component_UIcon, {
                    name: "i-heroicons-information-circle",
                    class: "w-3.5 h-3.5"
                  })
                ], 8, ["onClick"])) : vueExports.createCommentVNode("", true)
              ])
            ];
          }
        }),
        default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_ModelSelector, {
              ref_key: "modelSelectorRef",
              ref: modelSelectorRef,
              upstreams: __props.upstreams,
              category: "video",
              "show-type-label": "",
              "upstream-id": vueExports.unref(selectedUpstreamId),
              "onUpdate:upstreamId": ($event) => vueExports.isRef(selectedUpstreamId) ? selectedUpstreamId.value = $event : null,
              "aimodel-id": vueExports.unref(selectedAimodelId),
              "onUpdate:aimodelId": ($event) => vueExports.isRef(selectedAimodelId) ? selectedAimodelId.value = $event : null
            }, null, _parent2, _scopeId));
          } else {
            return [
              vueExports.createVNode(_component_ModelSelector, {
                ref_key: "modelSelectorRef",
                ref: modelSelectorRef,
                upstreams: __props.upstreams,
                category: "video",
                "show-type-label": "",
                "upstream-id": vueExports.unref(selectedUpstreamId),
                "onUpdate:upstreamId": ($event) => vueExports.isRef(selectedUpstreamId) ? selectedUpstreamId.value = $event : null,
                "aimodel-id": vueExports.unref(selectedAimodelId),
                "onUpdate:aimodelId": ($event) => vueExports.isRef(selectedAimodelId) ? selectedAimodelId.value = $event : null
              }, null, 8, ["upstreams", "upstream-id", "onUpdate:upstreamId", "aimodel-id", "onUpdate:aimodelId"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UModal, {
        open: vueExports.unref(showModelInfoModal),
        "onUpdate:open": ($event) => vueExports.isRef(showModelInfoModal) ? showModelInfoModal.value = $event : null,
        title: "模型信息"
      }, {
        body: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (vueExports.unref(selectedAimodel)) {
              _push2(`<div class="space-y-3"${_scopeId}><div class="flex items-center gap-2 text-sm"${_scopeId}><span class="text-(--ui-text-muted)"${_scopeId}>请求格式：</span><span class="text-(--ui-text)"${_scopeId}>${serverRenderer_cjs_prodExports.ssrInterpolate(vueExports.unref(API_FORMAT_LABELS)[vueExports.unref(selectedAimodel).apiFormat] || vueExports.unref(selectedAimodel).apiFormat)}</span></div><div class="flex items-center gap-2 text-sm"${_scopeId}><span class="text-(--ui-text-muted)"${_scopeId}>模型名称：</span><span class="text-(--ui-text) font-mono"${_scopeId}>${serverRenderer_cjs_prodExports.ssrInterpolate(vueExports.unref(selectedAimodel).modelName)}</span></div></div>`);
            } else {
              _push2(`<p class="text-(--ui-text-muted) text-sm"${_scopeId}>请先选择一个模型</p>`);
            }
          } else {
            return [
              vueExports.unref(selectedAimodel) ? (vueExports.openBlock(), vueExports.createBlock("div", {
                key: 0,
                class: "space-y-3"
              }, [
                vueExports.createVNode("div", { class: "flex items-center gap-2 text-sm" }, [
                  vueExports.createVNode("span", { class: "text-(--ui-text-muted)" }, "请求格式："),
                  vueExports.createVNode("span", { class: "text-(--ui-text)" }, vueExports.toDisplayString(vueExports.unref(API_FORMAT_LABELS)[vueExports.unref(selectedAimodel).apiFormat] || vueExports.unref(selectedAimodel).apiFormat), 1)
                ]),
                vueExports.createVNode("div", { class: "flex items-center gap-2 text-sm" }, [
                  vueExports.createVNode("span", { class: "text-(--ui-text-muted)" }, "模型名称："),
                  vueExports.createVNode("span", { class: "text-(--ui-text) font-mono" }, vueExports.toDisplayString(vueExports.unref(selectedAimodel).modelName), 1)
                ])
              ])) : (vueExports.openBlock(), vueExports.createBlock("p", {
                key: 1,
                class: "text-(--ui-text-muted) text-sm"
              }, "请先选择一个模型"))
            ];
          }
        }),
        footer: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UButton, {
              variant: "ghost",
              onClick: ($event) => showModelInfoModal.value = false
            }, {
              default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`关闭`);
                } else {
                  return [
                    vueExports.createTextVNode("关闭")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              vueExports.createVNode(_component_UButton, {
                variant: "ghost",
                onClick: ($event) => showModelInfoModal.value = false
              }, {
                default: vueExports.withCtx(() => [
                  vueExports.createTextVNode("关闭")
                ]),
                _: 1
              }, 8, ["onClick"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="border-t border-(--ui-border)"></div>`);
      if (vueExports.unref(selectedAimodel)) {
        _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UFormField, { label: "参考图 (可选)" }, {
          hint: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span class="text-(--ui-text-dimmed) text-xs"${_scopeId}>支持 JPG、PNG，最大10MB</span>`);
            } else {
              return [
                vueExports.createVNode("span", { class: "text-(--ui-text-dimmed) text-xs" }, "支持 JPG、PNG，最大10MB")
              ];
            }
          }),
          default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="flex gap-3 flex-wrap"${_scopeId}>`);
              if (vueExports.unref(referenceImages).length > 0) {
                _push2(`<div class="relative w-24 h-24 rounded-lg overflow-hidden group"${_scopeId}><img${serverRenderer_cjs_prodExports.ssrRenderAttr("src", vueExports.unref(referenceImages)[0])} class="w-full h-full object-cover"${_scopeId}><button type="button" class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"${_scopeId}>`);
                _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UIcon, {
                  name: "i-heroicons-x-mark",
                  class: "w-6 h-6 text-white"
                }, null, _parent2, _scopeId));
                _push2(`</button></div>`);
              } else {
                _push2(`<!---->`);
              }
              if (vueExports.unref(referenceImages).length === 0) {
                _push2(`<label class="w-24 h-24 rounded-lg border-2 border-dashed border-(--ui-border-accented) hover:border-(--ui-primary) transition-colors flex flex-col items-center justify-center cursor-pointer"${_scopeId}>`);
                _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UIcon, {
                  name: "i-heroicons-cloud-arrow-up",
                  class: "w-8 h-8 text-(--ui-text-dimmed) mb-1"
                }, null, _parent2, _scopeId));
                _push2(`<span class="text-(--ui-text-dimmed) text-xs"${_scopeId}>上传</span><input type="file" accept="image/png,image/jpeg" class="hidden"${_scopeId}></label>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            } else {
              return [
                vueExports.createVNode("div", { class: "flex gap-3 flex-wrap" }, [
                  vueExports.unref(referenceImages).length > 0 ? (vueExports.openBlock(), vueExports.createBlock("div", {
                    key: 0,
                    class: "relative w-24 h-24 rounded-lg overflow-hidden group"
                  }, [
                    vueExports.createVNode("img", {
                      src: vueExports.unref(referenceImages)[0],
                      class: "w-full h-full object-cover"
                    }, null, 8, ["src"]),
                    vueExports.createVNode("button", {
                      type: "button",
                      class: "absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center",
                      onClick: removeImage
                    }, [
                      vueExports.createVNode(_component_UIcon, {
                        name: "i-heroicons-x-mark",
                        class: "w-6 h-6 text-white"
                      })
                    ])
                  ])) : vueExports.createCommentVNode("", true),
                  vueExports.unref(referenceImages).length === 0 ? (vueExports.openBlock(), vueExports.createBlock("label", {
                    key: 1,
                    class: "w-24 h-24 rounded-lg border-2 border-dashed border-(--ui-border-accented) hover:border-(--ui-primary) transition-colors flex flex-col items-center justify-center cursor-pointer"
                  }, [
                    vueExports.createVNode(_component_UIcon, {
                      name: "i-heroicons-cloud-arrow-up",
                      class: "w-8 h-8 text-(--ui-text-dimmed) mb-1"
                    }),
                    vueExports.createVNode("span", { class: "text-(--ui-text-dimmed) text-xs" }, "上传"),
                    vueExports.createVNode("input", {
                      type: "file",
                      accept: "image/png,image/jpeg",
                      class: "hidden",
                      onChange: handleFileChange
                    }, null, 32)
                  ])) : vueExports.createCommentVNode("", true)
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UFormField, { label: "描述你想要的视频" }, {
        default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UTextarea, {
              modelValue: vueExports.unref(prompt),
              "onUpdate:modelValue": ($event) => vueExports.isRef(prompt) ? prompt.value = $event : null,
              placeholder: "例如：一只猫在草地上奔跑，慢动作，电影感",
              rows: 6,
              class: "w-full"
            }, null, _parent2, _scopeId));
          } else {
            return [
              vueExports.createVNode(_component_UTextarea, {
                modelValue: vueExports.unref(prompt),
                "onUpdate:modelValue": ($event) => vueExports.isRef(prompt) ? prompt.value = $event : null,
                placeholder: "例如：一只猫在草地上奔跑，慢动作，电影感",
                rows: 6,
                class: "w-full"
              }, null, 8, ["modelValue", "onUpdate:modelValue"])
            ];
          }
        }),
        _: 1
      }, _parent));
      if (vueExports.unref(isJimengModel)) {
        _push(`<!--[-->`);
        _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UFormField, { label: "宽高比" }, {
          default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_USelect, {
                modelValue: vueExports.unref(aspectRatio),
                "onUpdate:modelValue": ($event) => vueExports.isRef(aspectRatio) ? aspectRatio.value = $event : null,
                items: aspectRatioOptions,
                "value-key": "value",
                "label-key": "label",
                class: "w-full"
              }, null, _parent2, _scopeId));
            } else {
              return [
                vueExports.createVNode(_component_USelect, {
                  modelValue: vueExports.unref(aspectRatio),
                  "onUpdate:modelValue": ($event) => vueExports.isRef(aspectRatio) ? aspectRatio.value = $event : null,
                  items: aspectRatioOptions,
                  "value-key": "value",
                  "label-key": "label",
                  class: "w-full"
                }, null, 8, ["modelValue", "onUpdate:modelValue"])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UFormField, { label: "分辨率" }, {
          default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_USelect, {
                modelValue: vueExports.unref(size),
                "onUpdate:modelValue": ($event) => vueExports.isRef(size) ? size.value = $event : null,
                items: sizeOptions,
                "value-key": "value",
                "label-key": "label",
                class: "w-full"
              }, null, _parent2, _scopeId));
            } else {
              return [
                vueExports.createVNode(_component_USelect, {
                  modelValue: vueExports.unref(size),
                  "onUpdate:modelValue": ($event) => vueExports.isRef(size) ? size.value = $event : null,
                  items: sizeOptions,
                  "value-key": "value",
                  "label-key": "label",
                  class: "w-full"
                }, null, 8, ["modelValue", "onUpdate:modelValue"])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<!--]-->`);
      } else {
        _push(`<!---->`);
      }
      if (vueExports.unref(isVeoModel)) {
        _push(`<!--[-->`);
        _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UFormField, { label: "宽高比" }, {
          default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_USelect, {
                modelValue: vueExports.unref(aspectRatio),
                "onUpdate:modelValue": ($event) => vueExports.isRef(aspectRatio) ? aspectRatio.value = $event : null,
                items: vueExports.unref(veoAspectRatioOptions),
                "value-key": "value",
                "label-key": "label",
                class: "w-full"
              }, null, _parent2, _scopeId));
            } else {
              return [
                vueExports.createVNode(_component_USelect, {
                  modelValue: vueExports.unref(aspectRatio),
                  "onUpdate:modelValue": ($event) => vueExports.isRef(aspectRatio) ? aspectRatio.value = $event : null,
                  items: vueExports.unref(veoAspectRatioOptions),
                  "value-key": "value",
                  "label-key": "label",
                  class: "w-full"
                }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<div class="space-y-4"><div class="flex items-center justify-between"><div class="flex flex-col"><span class="text-sm text-(--ui-text)">提示词增强</span><span class="text-xs text-(--ui-text-dimmed)">自动优化和翻译提示词</span></div>`);
        _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_USwitch, {
          modelValue: vueExports.unref(enhancePrompt),
          "onUpdate:modelValue": ($event) => vueExports.isRef(enhancePrompt) ? enhancePrompt.value = $event : null
        }, null, _parent));
        _push(`</div><div class="flex items-center justify-between"><div class="flex flex-col"><span class="text-sm text-(--ui-text)">超分辨率</span><span class="text-xs text-(--ui-text-dimmed)">提升视频画质（耗时更长）</span></div>`);
        _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_USwitch, {
          modelValue: vueExports.unref(enableUpsample),
          "onUpdate:modelValue": ($event) => vueExports.isRef(enableUpsample) ? enableUpsample.value = $event : null
        }, null, _parent));
        _push(`</div></div><!--]-->`);
      } else {
        _push(`<!---->`);
      }
      if (vueExports.unref(isSoraModel)) {
        _push(`<!--[-->`);
        _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UFormField, { label: "方向" }, {
          default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_USelect, {
                modelValue: vueExports.unref(orientation),
                "onUpdate:modelValue": ($event) => vueExports.isRef(orientation) ? orientation.value = $event : null,
                items: soraOrientationOptions,
                "value-key": "value",
                "label-key": "label",
                class: "w-full"
              }, null, _parent2, _scopeId));
            } else {
              return [
                vueExports.createVNode(_component_USelect, {
                  modelValue: vueExports.unref(orientation),
                  "onUpdate:modelValue": ($event) => vueExports.isRef(orientation) ? orientation.value = $event : null,
                  items: soraOrientationOptions,
                  "value-key": "value",
                  "label-key": "label",
                  class: "w-full"
                }, null, 8, ["modelValue", "onUpdate:modelValue"])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UFormField, { label: "分辨率" }, {
          default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_USelect, {
                modelValue: vueExports.unref(soraSize),
                "onUpdate:modelValue": ($event) => vueExports.isRef(soraSize) ? soraSize.value = $event : null,
                items: soraSizeOptions,
                "value-key": "value",
                "label-key": "label",
                class: "w-full"
              }, null, _parent2, _scopeId));
            } else {
              return [
                vueExports.createVNode(_component_USelect, {
                  modelValue: vueExports.unref(soraSize),
                  "onUpdate:modelValue": ($event) => vueExports.isRef(soraSize) ? soraSize.value = $event : null,
                  items: soraSizeOptions,
                  "value-key": "value",
                  "label-key": "label",
                  class: "w-full"
                }, null, 8, ["modelValue", "onUpdate:modelValue"])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UFormField, { label: "时长" }, {
          default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_USelect, {
                modelValue: vueExports.unref(duration),
                "onUpdate:modelValue": ($event) => vueExports.isRef(duration) ? duration.value = $event : null,
                items: soraDurationOptions,
                "value-key": "value",
                "label-key": "label",
                class: "w-full"
              }, null, _parent2, _scopeId));
            } else {
              return [
                vueExports.createVNode(_component_USelect, {
                  modelValue: vueExports.unref(duration),
                  "onUpdate:modelValue": ($event) => vueExports.isRef(duration) ? duration.value = $event : null,
                  items: soraDurationOptions,
                  "value-key": "value",
                  "label-key": "label",
                  class: "w-full"
                }, null, 8, ["modelValue", "onUpdate:modelValue"])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<div class="space-y-4"><div class="flex items-center justify-between"><div class="flex flex-col"><span class="text-sm text-(--ui-text)">添加水印</span><span class="text-xs text-(--ui-text-dimmed)">在视频上添加水印</span></div>`);
        _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_USwitch, {
          modelValue: vueExports.unref(watermark),
          "onUpdate:modelValue": ($event) => vueExports.isRef(watermark) ? watermark.value = $event : null
        }, null, _parent));
        _push(`</div><div class="flex items-center justify-between"><div class="flex flex-col"><span class="text-sm text-(--ui-text)">隐私模式</span><span class="text-xs text-(--ui-text-dimmed)">视频不公开</span></div>`);
        _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_USwitch, {
          modelValue: vueExports.unref(soraPrivate),
          "onUpdate:modelValue": ($event) => vueExports.isRef(soraPrivate) ? soraPrivate.value = $event : null
        }, null, _parent));
        _push(`</div></div><!--]-->`);
      } else {
        _push(`<!---->`);
      }
      if (vueExports.unref(isGrokVideoModel)) {
        _push(`<!--[-->`);
        _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UFormField, { label: "宽高比" }, {
          default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_USelect, {
                modelValue: vueExports.unref(aspectRatio),
                "onUpdate:modelValue": ($event) => vueExports.isRef(aspectRatio) ? aspectRatio.value = $event : null,
                items: grokAspectRatioOptions,
                "value-key": "value",
                "label-key": "label",
                class: "w-full"
              }, null, _parent2, _scopeId));
            } else {
              return [
                vueExports.createVNode(_component_USelect, {
                  modelValue: vueExports.unref(aspectRatio),
                  "onUpdate:modelValue": ($event) => vueExports.isRef(aspectRatio) ? aspectRatio.value = $event : null,
                  items: grokAspectRatioOptions,
                  "value-key": "value",
                  "label-key": "label",
                  class: "w-full"
                }, null, 8, ["modelValue", "onUpdate:modelValue"])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UFormField, { label: "分辨率" }, {
          default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UInput, {
                value: "720P",
                disabled: "",
                class: "w-full"
              }, null, _parent2, _scopeId));
            } else {
              return [
                vueExports.createVNode(_component_UInput, {
                  value: "720P",
                  disabled: "",
                  class: "w-full"
                })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<!--]-->`);
      } else {
        _push(`<!---->`);
      }
      _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UButton, {
        block: "",
        size: "lg",
        loading: vueExports.unref(isSubmitting),
        disabled: !vueExports.unref(prompt).trim() || !vueExports.unref(selectedUpstreamId) || vueExports.unref(selectedAimodelId) === null || __props.upstreams.length === 0,
        class: "bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600",
        onClick: handleSubmit
      }, {
        default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-video-camera",
              class: "w-5 h-5 mr-2"
            }, null, _parent2, _scopeId));
            _push2(` 开始生成 `);
          } else {
            return [
              vueExports.createVNode(_component_UIcon, {
                name: "i-heroicons-video-camera",
                class: "w-5 h-5 mr-2"
              }),
              vueExports.createTextVNode(" 开始生成 ")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/studio/VideoForm.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const __nuxt_component_3 = Object.assign(_sfc_main$8, { __name: "StudioVideoForm" });
const _sfc_main$7 = /* @__PURE__ */ vueExports.defineComponent({
  __name: "Workbench",
  __ssrInlineRender: true,
  props: {
    upstreams: {}
  },
  emits: ["submitImage", "submitVideo"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const activeTab = vueExports.ref("image");
    const tabs = [
      { label: "图片", value: "image", icon: "i-heroicons-photo" },
      { label: "视频", value: "video", icon: "i-heroicons-video-camera" }
    ];
    const hasVideoModels = vueExports.computed(() => {
      return props.upstreams.some(
        (u) => u.aimodels?.some((m) => m.category === "video" && !m.deletedAt)
      );
    });
    const imageFormRef = vueExports.ref(null);
    const videoFormRef = vueExports.ref(null);
    function handleImageSubmit(data) {
      emit("submitImage", data);
    }
    function handleVideoSubmit(data) {
      emit("submitVideo", data);
    }
    function setContent(newPrompt, modelParams, images) {
      if (activeTab.value === "video" && videoFormRef.value) {
        videoFormRef.value.setContent(newPrompt, images);
      } else if (imageFormRef.value) {
        imageFormRef.value.setContent(newPrompt, modelParams, images);
      }
    }
    __expose({
      setContent
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      const _component_UIcon = _sfc_main$d;
      const _component_StudioImageForm = __nuxt_component_2;
      const _component_StudioVideoForm = __nuxt_component_3;
      const _component_UButton = _sfc_main$8$1;
      _push(`<div${serverRenderer_cjs_prodExports.ssrRenderAttrs(vueExports.mergeProps({ class: "space-y-4" }, _attrs))}><div class="flex items-center justify-between"><h2 class="text-(--ui-text) text-lg font-medium">创作工作台</h2><div class="flex items-center gap-2">`);
      _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_NuxtLink, {
        to: "/workflow",
        class: "text-(--ui-text-muted) hover:text-(--ui-primary) transition-colors",
        title: "工作流编排"
      }, {
        default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-square-3-stack-3d",
              class: "w-5 h-5"
            }, null, _parent2, _scopeId));
          } else {
            return [
              vueExports.createVNode(_component_UIcon, {
                name: "i-heroicons-square-3-stack-3d",
                class: "w-5 h-5"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<a href="/help/" class="text-(--ui-text-muted) hover:text-(--ui-text) transition-colors" title="帮助中心">`);
      _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-question-mark-circle",
        class: "w-5 h-5"
      }, null, _parent));
      _push(`</a></div></div><div class="flex border-b border-(--ui-border)"><!--[-->`);
      serverRenderer_cjs_prodExports.ssrRenderList(tabs, (tab) => {
        _push(`<button class="${serverRenderer_cjs_prodExports.ssrRenderClass([
          "flex items-center gap-1.5 px-4 py-2 text-sm font-medium transition-colors border-b-2 -mb-px",
          vueExports.unref(activeTab) === tab.value ? "border-(--ui-primary) text-(--ui-primary)" : "border-transparent text-(--ui-text-muted) hover:text-(--ui-text)",
          tab.value === "video" && !vueExports.unref(hasVideoModels) ? "opacity-50 cursor-not-allowed" : ""
        ])}"${serverRenderer_cjs_prodExports.ssrIncludeBooleanAttr(tab.value === "video" && !vueExports.unref(hasVideoModels)) ? " disabled" : ""}>`);
        _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UIcon, {
          name: tab.icon,
          class: "w-4 h-4"
        }, null, _parent));
        _push(` ${serverRenderer_cjs_prodExports.ssrInterpolate(tab.label)}</button>`);
      });
      _push(`<!--]--></div>`);
      if (vueExports.unref(activeTab) === "image") {
        _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_StudioImageForm, {
          ref_key: "imageFormRef",
          ref: imageFormRef,
          upstreams: __props.upstreams,
          onSubmit: handleImageSubmit
        }, null, _parent));
      } else if (vueExports.unref(activeTab) === "video") {
        _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_StudioVideoForm, {
          ref_key: "videoFormRef",
          ref: videoFormRef,
          upstreams: __props.upstreams,
          onSubmit: handleVideoSubmit
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (vueExports.unref(activeTab) === "video" && !vueExports.unref(hasVideoModels)) {
        _push(`<div class="bg-(--ui-bg-elevated) rounded-lg p-8 border border-(--ui-border) text-center">`);
        _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-video-camera",
          class: "w-12 h-12 text-(--ui-text-dimmed) mx-auto mb-3"
        }, null, _parent));
        _push(`<p class="text-(--ui-text-muted) mb-4">暂无视频模型配置</p>`);
        _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_NuxtLink, { to: "/settings/upstreams" }, {
          default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UButton, { variant: "soft" }, {
                default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UIcon, {
                      name: "i-heroicons-plus",
                      class: "w-4 h-4 mr-1"
                    }, null, _parent3, _scopeId2));
                    _push3(` 添加视频模型 `);
                  } else {
                    return [
                      vueExports.createVNode(_component_UIcon, {
                        name: "i-heroicons-plus",
                        class: "w-4 h-4 mr-1"
                      }),
                      vueExports.createTextVNode(" 添加视频模型 ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                vueExports.createVNode(_component_UButton, { variant: "soft" }, {
                  default: vueExports.withCtx(() => [
                    vueExports.createVNode(_component_UIcon, {
                      name: "i-heroicons-plus",
                      class: "w-4 h-4 mr-1"
                    }),
                    vueExports.createTextVNode(" 添加视频模型 ")
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = vueExports.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/studio/Workbench.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const __nuxt_component_0 = Object.assign(_sfc_main$7, { __name: "StudioWorkbench" });
const _sfc_main$6 = /* @__PURE__ */ vueExports.defineComponent({
  __name: "TaskDetailModal",
  __ssrInlineRender: true,
  props: /* @__PURE__ */ vueExports.mergeModels({
    task: {}
  }, {
    "open": { type: Boolean, ...{ default: false } },
    "openModifiers": {}
  }),
  emits: ["update:open"],
  setup(__props) {
    const props = __props;
    const open = vueExports.useModel(__props, "open");
    const modelInfo = vueExports.computed(() => {
      const modelType = props.task.modelType;
      const display = TASK_CARD_MODEL_DISPLAY[modelType] || { label: modelType || "未知", color: "bg-gray-500/80" };
      return {
        label: display.label,
        type: modelType,
        color: display.color
      };
    });
    const statusInfo = vueExports.computed(() => {
      switch (props.task.status) {
        case "pending":
          return { text: "等待中", color: "text-(--ui-warning)" };
        case "submitting":
          return { text: "提交中", color: "text-(--ui-info)" };
        case "processing":
          return { text: props.task.progress || "生成中", color: "text-(--ui-primary)" };
        case "success":
          return { text: "已完成", color: "text-(--ui-success)" };
        case "failed":
          return { text: "失败", color: "text-(--ui-error)" };
        case "cancelled":
          return { text: "已取消", color: "text-(--ui-text-muted)" };
        default:
          return { text: "未知", color: "text-(--ui-text-muted)" };
      }
    });
    const duration = vueExports.computed(() => {
      if (!props.task.createdAt) return null;
      const start = new Date(props.task.createdAt).getTime();
      const end = props.task.status === "success" || props.task.status === "failed" ? new Date(props.task.updatedAt).getTime() : Date.now();
      const seconds = Math.floor((end - start) / 1e3);
      if (seconds < 60) return `${seconds}秒`;
      const minutes = Math.floor(seconds / 60);
      const remainSeconds = seconds % 60;
      return `${minutes}分${remainSeconds}秒`;
    });
    const taskTypeLabel = vueExports.computed(() => {
      if (props.task.taskType === "video") {
        return "视频生成";
      }
      return props.task.type === "blend" ? "图片混合" : "文生图";
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UModal = _sfc_main$h;
      _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UModal, vueExports.mergeProps({
        open: open.value,
        "onUpdate:open": ($event) => open.value = $event,
        title: "任务详情"
      }, _attrs), {
        body: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="space-y-3 text-sm"${_scopeId}><div class="flex justify-between"${_scopeId}><span class="text-(--ui-text-muted)"${_scopeId}>任务ID</span><span class="font-mono text-(--ui-text)"${_scopeId}>${serverRenderer_cjs_prodExports.ssrInterpolate(__props.task.id)}</span></div><div class="flex justify-between"${_scopeId}><span class="text-(--ui-text-muted)"${_scopeId}>任务类型</span><span class="text-(--ui-text)"${_scopeId}>${serverRenderer_cjs_prodExports.ssrInterpolate(vueExports.unref(taskTypeLabel))}</span></div><div class="flex justify-between"${_scopeId}><span class="text-(--ui-text-muted)"${_scopeId}>上游</span><span class="text-(--ui-text)"${_scopeId}>${serverRenderer_cjs_prodExports.ssrInterpolate(__props.task.upstream?.name || "未知")}</span></div><div class="flex justify-between"${_scopeId}><span class="text-(--ui-text-muted)"${_scopeId}>模型类型</span><span class="text-(--ui-text)"${_scopeId}>${serverRenderer_cjs_prodExports.ssrInterpolate(vueExports.unref(modelInfo).label)}</span></div><div class="flex justify-between"${_scopeId}><span class="text-(--ui-text-muted)"${_scopeId}>请求格式</span><span class="text-(--ui-text)"${_scopeId}>${serverRenderer_cjs_prodExports.ssrInterpolate(vueExports.unref(API_FORMAT_LABELS)[__props.task.apiFormat] || __props.task.apiFormat)}</span></div>`);
            if (__props.task.modelName) {
              _push2(`<div class="flex justify-between"${_scopeId}><span class="text-(--ui-text-muted)"${_scopeId}>模型名称</span><span class="text-(--ui-text) font-mono text-xs"${_scopeId}>${serverRenderer_cjs_prodExports.ssrInterpolate(__props.task.modelName)}</span></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="flex justify-between"${_scopeId}><span class="text-(--ui-text-muted)"${_scopeId}>状态</span><span class="${serverRenderer_cjs_prodExports.ssrRenderClass(vueExports.unref(statusInfo).color)}"${_scopeId}>${serverRenderer_cjs_prodExports.ssrInterpolate(vueExports.unref(statusInfo).text)}</span></div><div class="flex justify-between"${_scopeId}><span class="text-(--ui-text-muted)"${_scopeId}>创建时间</span><span class="text-(--ui-text)"${_scopeId}>${serverRenderer_cjs_prodExports.ssrInterpolate(new Date(__props.task.createdAt).toLocaleString("zh-CN"))}</span></div>`);
            if (vueExports.unref(duration)) {
              _push2(`<div class="flex justify-between"${_scopeId}><span class="text-(--ui-text-muted)"${_scopeId}>耗时</span><span class="text-(--ui-text)"${_scopeId}>${serverRenderer_cjs_prodExports.ssrInterpolate(vueExports.unref(duration))}</span></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.task.upstreamTaskId) {
              _push2(`<div class="flex justify-between"${_scopeId}><span class="text-(--ui-text-muted)"${_scopeId}>上游任务ID</span><span class="font-mono text-xs text-(--ui-text)"${_scopeId}>${serverRenderer_cjs_prodExports.ssrInterpolate(__props.task.upstreamTaskId)}</span></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.task.prompt) {
              _push2(`<div${_scopeId}><span class="text-(--ui-text-muted) block mb-1"${_scopeId}>提示词</span><p class="text-(--ui-text) bg-(--ui-bg-muted) rounded p-2 text-xs break-all"${_scopeId}>${serverRenderer_cjs_prodExports.ssrInterpolate(__props.task.prompt)}</p></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.task.modelParams) {
              _push2(`<div${_scopeId}><span class="text-(--ui-text-muted) block mb-1"${_scopeId}>模型参数</span><p class="text-(--ui-text) bg-(--ui-bg-muted) rounded p-2 text-xs break-all"${_scopeId}>${serverRenderer_cjs_prodExports.ssrInterpolate(JSON.stringify(__props.task.modelParams))}</p></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.task.error) {
              _push2(`<div${_scopeId}><span class="text-(--ui-text-muted) block mb-1"${_scopeId}>错误信息</span><p class="text-(--ui-error) bg-(--ui-error)/10 rounded p-2 text-xs break-all"${_scopeId}>${serverRenderer_cjs_prodExports.ssrInterpolate(__props.task.error)}</p></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          } else {
            return [
              vueExports.createVNode("div", { class: "space-y-3 text-sm" }, [
                vueExports.createVNode("div", { class: "flex justify-between" }, [
                  vueExports.createVNode("span", { class: "text-(--ui-text-muted)" }, "任务ID"),
                  vueExports.createVNode("span", { class: "font-mono text-(--ui-text)" }, vueExports.toDisplayString(__props.task.id), 1)
                ]),
                vueExports.createVNode("div", { class: "flex justify-between" }, [
                  vueExports.createVNode("span", { class: "text-(--ui-text-muted)" }, "任务类型"),
                  vueExports.createVNode("span", { class: "text-(--ui-text)" }, vueExports.toDisplayString(vueExports.unref(taskTypeLabel)), 1)
                ]),
                vueExports.createVNode("div", { class: "flex justify-between" }, [
                  vueExports.createVNode("span", { class: "text-(--ui-text-muted)" }, "上游"),
                  vueExports.createVNode("span", { class: "text-(--ui-text)" }, vueExports.toDisplayString(__props.task.upstream?.name || "未知"), 1)
                ]),
                vueExports.createVNode("div", { class: "flex justify-between" }, [
                  vueExports.createVNode("span", { class: "text-(--ui-text-muted)" }, "模型类型"),
                  vueExports.createVNode("span", { class: "text-(--ui-text)" }, vueExports.toDisplayString(vueExports.unref(modelInfo).label), 1)
                ]),
                vueExports.createVNode("div", { class: "flex justify-between" }, [
                  vueExports.createVNode("span", { class: "text-(--ui-text-muted)" }, "请求格式"),
                  vueExports.createVNode("span", { class: "text-(--ui-text)" }, vueExports.toDisplayString(vueExports.unref(API_FORMAT_LABELS)[__props.task.apiFormat] || __props.task.apiFormat), 1)
                ]),
                __props.task.modelName ? (vueExports.openBlock(), vueExports.createBlock("div", {
                  key: 0,
                  class: "flex justify-between"
                }, [
                  vueExports.createVNode("span", { class: "text-(--ui-text-muted)" }, "模型名称"),
                  vueExports.createVNode("span", { class: "text-(--ui-text) font-mono text-xs" }, vueExports.toDisplayString(__props.task.modelName), 1)
                ])) : vueExports.createCommentVNode("", true),
                vueExports.createVNode("div", { class: "flex justify-between" }, [
                  vueExports.createVNode("span", { class: "text-(--ui-text-muted)" }, "状态"),
                  vueExports.createVNode("span", {
                    class: vueExports.unref(statusInfo).color
                  }, vueExports.toDisplayString(vueExports.unref(statusInfo).text), 3)
                ]),
                vueExports.createVNode("div", { class: "flex justify-between" }, [
                  vueExports.createVNode("span", { class: "text-(--ui-text-muted)" }, "创建时间"),
                  vueExports.createVNode("span", { class: "text-(--ui-text)" }, vueExports.toDisplayString(new Date(__props.task.createdAt).toLocaleString("zh-CN")), 1)
                ]),
                vueExports.unref(duration) ? (vueExports.openBlock(), vueExports.createBlock("div", {
                  key: 1,
                  class: "flex justify-between"
                }, [
                  vueExports.createVNode("span", { class: "text-(--ui-text-muted)" }, "耗时"),
                  vueExports.createVNode("span", { class: "text-(--ui-text)" }, vueExports.toDisplayString(vueExports.unref(duration)), 1)
                ])) : vueExports.createCommentVNode("", true),
                __props.task.upstreamTaskId ? (vueExports.openBlock(), vueExports.createBlock("div", {
                  key: 2,
                  class: "flex justify-between"
                }, [
                  vueExports.createVNode("span", { class: "text-(--ui-text-muted)" }, "上游任务ID"),
                  vueExports.createVNode("span", { class: "font-mono text-xs text-(--ui-text)" }, vueExports.toDisplayString(__props.task.upstreamTaskId), 1)
                ])) : vueExports.createCommentVNode("", true),
                __props.task.prompt ? (vueExports.openBlock(), vueExports.createBlock("div", { key: 3 }, [
                  vueExports.createVNode("span", { class: "text-(--ui-text-muted) block mb-1" }, "提示词"),
                  vueExports.createVNode("p", { class: "text-(--ui-text) bg-(--ui-bg-muted) rounded p-2 text-xs break-all" }, vueExports.toDisplayString(__props.task.prompt), 1)
                ])) : vueExports.createCommentVNode("", true),
                __props.task.modelParams ? (vueExports.openBlock(), vueExports.createBlock("div", { key: 4 }, [
                  vueExports.createVNode("span", { class: "text-(--ui-text-muted) block mb-1" }, "模型参数"),
                  vueExports.createVNode("p", { class: "text-(--ui-text) bg-(--ui-bg-muted) rounded p-2 text-xs break-all" }, vueExports.toDisplayString(JSON.stringify(__props.task.modelParams)), 1)
                ])) : vueExports.createCommentVNode("", true),
                __props.task.error ? (vueExports.openBlock(), vueExports.createBlock("div", { key: 5 }, [
                  vueExports.createVNode("span", { class: "text-(--ui-text-muted) block mb-1" }, "错误信息"),
                  vueExports.createVNode("p", { class: "text-(--ui-error) bg-(--ui-error)/10 rounded p-2 text-xs break-all" }, vueExports.toDisplayString(__props.task.error), 1)
                ])) : vueExports.createCommentVNode("", true)
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = vueExports.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/studio/TaskDetailModal.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const __nuxt_component_6$1 = Object.assign(_sfc_main$6, { __name: "StudioTaskDetailModal" });
const _sfc_main$5 = /* @__PURE__ */ vueExports.defineComponent({
  __name: "RefImagesModal",
  __ssrInlineRender: true,
  props: /* @__PURE__ */ vueExports.mergeModels({
    images: {}
  }, {
    "open": { type: Boolean, ...{ default: false } },
    "openModifiers": {}
  }),
  emits: ["update:open"],
  setup(__props) {
    const open = vueExports.useModel(__props, "open");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UModal = _sfc_main$h;
      _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UModal, vueExports.mergeProps({
        open: open.value,
        "onUpdate:open": ($event) => open.value = $event,
        title: "参考图",
        ui: { content: "sm:max-w-3xl" }
      }, _attrs), {
        body: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="${serverRenderer_cjs_prodExports.ssrRenderClass([__props.images.length === 1 ? "grid-cols-1" : "grid-cols-2", "grid gap-4"])}"${_scopeId}><!--[-->`);
            serverRenderer_cjs_prodExports.ssrRenderList(__props.images, (img, index) => {
              _push2(`<div class="relative bg-(--ui-bg-muted) rounded-lg overflow-hidden"${_scopeId}><img${serverRenderer_cjs_prodExports.ssrRenderAttr("src", img)}${serverRenderer_cjs_prodExports.ssrRenderAttr("alt", `参考图 ${index + 1}`)} class="w-full h-auto max-h-[60vh] object-contain"${_scopeId}><div class="absolute bottom-2 left-2 px-2 py-1 rounded-full bg-black/50 backdrop-blur-sm text-xs text-white"${_scopeId}>${serverRenderer_cjs_prodExports.ssrInterpolate(index + 1)} / ${serverRenderer_cjs_prodExports.ssrInterpolate(__props.images.length)}</div></div>`);
            });
            _push2(`<!--]--></div>`);
          } else {
            return [
              vueExports.createVNode("div", {
                class: ["grid gap-4", __props.images.length === 1 ? "grid-cols-1" : "grid-cols-2"]
              }, [
                (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(__props.images, (img, index) => {
                  return vueExports.openBlock(), vueExports.createBlock("div", {
                    key: index,
                    class: "relative bg-(--ui-bg-muted) rounded-lg overflow-hidden"
                  }, [
                    vueExports.createVNode("img", {
                      src: img,
                      alt: `参考图 ${index + 1}`,
                      class: "w-full h-auto max-h-[60vh] object-contain"
                    }, null, 8, ["src", "alt"]),
                    vueExports.createVNode("div", { class: "absolute bottom-2 left-2 px-2 py-1 rounded-full bg-black/50 backdrop-blur-sm text-xs text-white" }, vueExports.toDisplayString(index + 1) + " / " + vueExports.toDisplayString(__props.images.length), 1)
                  ]);
                }), 128))
              ], 2)
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = vueExports.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/studio/RefImagesModal.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const __nuxt_component_7 = Object.assign(_sfc_main$5, { __name: "StudioRefImagesModal" });
const _sfc_main$4 = /* @__PURE__ */ vueExports.defineComponent({
  __name: "ErrorLogsModal",
  __ssrInlineRender: true,
  props: /* @__PURE__ */ vueExports.mergeModels({
    taskId: {}
  }, {
    "open": { type: Boolean, ...{ default: false } },
    "openModifiers": {}
  }),
  emits: ["update:open"],
  setup(__props) {
    const props = __props;
    const open = vueExports.useModel(__props, "open");
    const toast = useToast();
    const errorLogs = vueExports.ref(null);
    const loading = vueExports.ref(false);
    vueExports.watch(open, async (isOpen) => {
      if (isOpen && !errorLogs.value) {
        loading.value = true;
        try {
          const logs = await $fetch(`/api/tasks/${props.taskId}/logs`);
          errorLogs.value = logs;
        } catch (error) {
          if (error?.statusCode === 404) {
            errorLogs.value = null;
            toast.add({ title: "无详情", description: "此错误无响应日志", color: "warning" });
            open.value = false;
          }
        } finally {
          loading.value = false;
        }
      }
    });
    vueExports.watch(() => props.taskId, () => {
      errorLogs.value = null;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UModal = _sfc_main$h;
      const _component_StudioLoader = __nuxt_component_0$2;
      const _component_UIcon = _sfc_main$d;
      _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UModal, vueExports.mergeProps({
        open: open.value,
        "onUpdate:open": ($event) => open.value = $event,
        title: "错误详情",
        ui: { content: "sm:max-w-2xl" }
      }, _attrs), {
        body: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (vueExports.unref(loading)) {
              _push2(`<div class="text-center py-8"${_scopeId}>`);
              _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_StudioLoader, { class: "w-8 h-8 mx-auto mb-2 text-(--ui-primary)" }, null, _parent2, _scopeId));
              _push2(`<p class="text-(--ui-text-muted) text-sm"${_scopeId}>加载中...</p></div>`);
            } else if (vueExports.unref(errorLogs)) {
              _push2(`<div class="space-y-4 max-h-[70vh] overflow-y-auto"${_scopeId}><!--[-->`);
              serverRenderer_cjs_prodExports.ssrRenderList(vueExports.unref(errorLogs).responses, (response, index) => {
                _push2(`<div class="space-y-3"${_scopeId}><h4 class="text-sm font-medium text-(--ui-text-muted)"${_scopeId}> 请求 ${serverRenderer_cjs_prodExports.ssrInterpolate(index + 1)} / ${serverRenderer_cjs_prodExports.ssrInterpolate(vueExports.unref(errorLogs).responses.length)} <span class="text-xs text-(--ui-text-dimmed) ml-2"${_scopeId}>${serverRenderer_cjs_prodExports.ssrInterpolate(response.timestamp)}</span></h4>`);
                if (vueExports.unref(errorLogs).requests[index]) {
                  _push2(`<div class="bg-(--ui-bg-muted) rounded-lg p-3 space-y-2"${_scopeId}><div class="flex items-center gap-2 text-sm"${_scopeId}><span class="font-mono text-(--ui-info)"${_scopeId}>${serverRenderer_cjs_prodExports.ssrInterpolate(vueExports.unref(errorLogs).requests[index].method)}</span><span class="font-mono text-(--ui-text) text-xs break-all"${_scopeId}>${serverRenderer_cjs_prodExports.ssrInterpolate(vueExports.unref(errorLogs).requests[index].url)}</span></div></div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`<div class="bg-(--ui-bg-muted) rounded-lg p-3 space-y-3"${_scopeId}><div class="flex items-center gap-2 text-sm"${_scopeId}><span class="text-(--ui-text-muted)"${_scopeId}>状态码</span><span class="${serverRenderer_cjs_prodExports.ssrRenderClass([response.status >= 400 ? "text-(--ui-error)" : "text-(--ui-success)", "font-mono font-medium"])}"${_scopeId}>${serverRenderer_cjs_prodExports.ssrInterpolate(response.status)} ${serverRenderer_cjs_prodExports.ssrInterpolate(response.statusText)}</span></div><div${_scopeId}><span class="text-(--ui-text-muted) text-sm block mb-1"${_scopeId}>响应内容</span><pre class="bg-(--ui-bg) rounded p-2 text-xs overflow-x-auto max-h-48 text-(--ui-text)"${_scopeId}>${serverRenderer_cjs_prodExports.ssrInterpolate(JSON.stringify(response.data, null, 2))}</pre></div></div>`);
                if (index < vueExports.unref(errorLogs).responses.length - 1) {
                  _push2(`<hr class="border-(--ui-border)"${_scopeId}>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div>`);
              });
              _push2(`<!--]--></div>`);
            } else {
              _push2(`<div class="text-center py-8"${_scopeId}>`);
              _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UIcon, {
                name: "i-heroicons-document-magnifying-glass",
                class: "w-12 h-12 mx-auto mb-2 text-(--ui-text-dimmed)"
              }, null, _parent2, _scopeId));
              _push2(`<p class="text-(--ui-text-muted) text-sm"${_scopeId}>无日志记录</p></div>`);
            }
          } else {
            return [
              vueExports.unref(loading) ? (vueExports.openBlock(), vueExports.createBlock("div", {
                key: 0,
                class: "text-center py-8"
              }, [
                vueExports.createVNode(_component_StudioLoader, { class: "w-8 h-8 mx-auto mb-2 text-(--ui-primary)" }),
                vueExports.createVNode("p", { class: "text-(--ui-text-muted) text-sm" }, "加载中...")
              ])) : vueExports.unref(errorLogs) ? (vueExports.openBlock(), vueExports.createBlock("div", {
                key: 1,
                class: "space-y-4 max-h-[70vh] overflow-y-auto"
              }, [
                (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(vueExports.unref(errorLogs).responses, (response, index) => {
                  return vueExports.openBlock(), vueExports.createBlock("div", {
                    key: index,
                    class: "space-y-3"
                  }, [
                    vueExports.createVNode("h4", { class: "text-sm font-medium text-(--ui-text-muted)" }, [
                      vueExports.createTextVNode(" 请求 " + vueExports.toDisplayString(index + 1) + " / " + vueExports.toDisplayString(vueExports.unref(errorLogs).responses.length) + " ", 1),
                      vueExports.createVNode("span", { class: "text-xs text-(--ui-text-dimmed) ml-2" }, vueExports.toDisplayString(response.timestamp), 1)
                    ]),
                    vueExports.unref(errorLogs).requests[index] ? (vueExports.openBlock(), vueExports.createBlock("div", {
                      key: 0,
                      class: "bg-(--ui-bg-muted) rounded-lg p-3 space-y-2"
                    }, [
                      vueExports.createVNode("div", { class: "flex items-center gap-2 text-sm" }, [
                        vueExports.createVNode("span", { class: "font-mono text-(--ui-info)" }, vueExports.toDisplayString(vueExports.unref(errorLogs).requests[index].method), 1),
                        vueExports.createVNode("span", { class: "font-mono text-(--ui-text) text-xs break-all" }, vueExports.toDisplayString(vueExports.unref(errorLogs).requests[index].url), 1)
                      ])
                    ])) : vueExports.createCommentVNode("", true),
                    vueExports.createVNode("div", { class: "bg-(--ui-bg-muted) rounded-lg p-3 space-y-3" }, [
                      vueExports.createVNode("div", { class: "flex items-center gap-2 text-sm" }, [
                        vueExports.createVNode("span", { class: "text-(--ui-text-muted)" }, "状态码"),
                        vueExports.createVNode("span", {
                          class: ["font-mono font-medium", response.status >= 400 ? "text-(--ui-error)" : "text-(--ui-success)"]
                        }, vueExports.toDisplayString(response.status) + " " + vueExports.toDisplayString(response.statusText), 3)
                      ]),
                      vueExports.createVNode("div", null, [
                        vueExports.createVNode("span", { class: "text-(--ui-text-muted) text-sm block mb-1" }, "响应内容"),
                        vueExports.createVNode("pre", { class: "bg-(--ui-bg) rounded p-2 text-xs overflow-x-auto max-h-48 text-(--ui-text)" }, vueExports.toDisplayString(JSON.stringify(response.data, null, 2)), 1)
                      ])
                    ]),
                    index < vueExports.unref(errorLogs).responses.length - 1 ? (vueExports.openBlock(), vueExports.createBlock("hr", {
                      key: 1,
                      class: "border-(--ui-border)"
                    })) : vueExports.createCommentVNode("", true)
                  ]);
                }), 128))
              ])) : (vueExports.openBlock(), vueExports.createBlock("div", {
                key: 2,
                class: "text-center py-8"
              }, [
                vueExports.createVNode(_component_UIcon, {
                  name: "i-heroicons-document-magnifying-glass",
                  class: "w-12 h-12 mx-auto mb-2 text-(--ui-text-dimmed)"
                }),
                vueExports.createVNode("p", { class: "text-(--ui-text-muted) text-sm" }, "无日志记录")
              ]))
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = vueExports.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/studio/ErrorLogsModal.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const __nuxt_component_8 = Object.assign(_sfc_main$4, { __name: "StudioErrorLogsModal" });
const _sfc_main$3 = /* @__PURE__ */ vueExports.defineComponent({
  __name: "VideoCard",
  __ssrInlineRender: true,
  props: {
    task: {}
  },
  emits: ["remove", "retry", "cancel", "blur", "copyToPanel"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    useToast();
    const isBlurred = vueExports.ref(props.task.isBlurred ?? true);
    vueExports.watch(() => props.task.isBlurred, (newVal) => {
      if (newVal !== void 0) {
        isBlurred.value = newVal;
      }
    });
    const statusInfo = vueExports.computed(() => {
      switch (props.task.status) {
        case "pending":
          return { text: "等待中", color: "text-(--ui-warning)", icon: "i-heroicons-clock", showBars: false };
        case "submitting":
          return { text: "提交中", color: "text-(--ui-info)", icon: null, showBars: true };
        case "processing":
          return { text: props.task.progress || "生成中", color: "text-(--ui-primary)", icon: null, showBars: true };
        case "success":
          return { text: "已完成", color: "text-(--ui-success)", icon: "i-heroicons-check-circle", showBars: false };
        case "failed":
          return { text: "失败", color: "text-(--ui-error)", icon: "i-heroicons-x-circle", showBars: false };
        case "cancelled":
          return { text: "已取消", color: "text-(--ui-text-muted)", icon: "i-heroicons-no-symbol", showBars: false };
        default:
          return { text: "未知", color: "text-(--ui-text-muted)", icon: "i-heroicons-question-mark-circle", showBars: false };
      }
    });
    const modelInfo = vueExports.computed(() => {
      const modelType = props.task.modelType;
      const display = TASK_CARD_MODEL_DISPLAY[modelType] || { label: modelType || "未知", color: "bg-gray-500/80" };
      return {
        label: display.label,
        type: modelType,
        color: display.color
      };
    });
    const isLoading = vueExports.computed(() => ["pending", "submitting", "processing"].includes(props.task.status));
    const estimatedTime = vueExports.computed(() => {
      const modelType = props.task.modelType;
      return props.task.upstream?.estimatedTime ?? DEFAULT_VIDEO_ESTIMATED_TIMES[modelType] ?? DEFAULT_FALLBACK_ESTIMATED_TIME;
    });
    const now = vueExports.ref(Date.now());
    let progressTimer = null;
    vueExports.watch(isLoading, (loading) => {
      if (loading) {
        now.value = Date.now();
        progressTimer = setInterval();
      } else if (progressTimer) {
        clearInterval(progressTimer);
        progressTimer = null;
      }
    }, { immediate: true });
    const progressPercent = vueExports.computed(() => {
      if (!isLoading.value) return 0;
      const start = new Date(props.task.createdAt).getTime();
      const elapsed = (now.value - start) / 1e3;
      const bufferedTime = estimatedTime.value * PROGRESS_TIME_BUFFER_RATIO;
      return Math.min(elapsed / bufferedTime * 100, 100);
    });
    const duration = vueExports.computed(() => {
      if (!props.task.createdAt) return null;
      const start = new Date(props.task.createdAt).getTime();
      const end = props.task.status === "success" || props.task.status === "failed" ? new Date(props.task.updatedAt).getTime() : Date.now();
      const seconds = Math.floor((end - start) / 1e3);
      if (seconds < 60) return `${seconds}秒`;
      const minutes = Math.floor(seconds / 60);
      const remainSeconds = seconds % 60;
      return `${minutes}分${remainSeconds}秒`;
    });
    const showDeleteConfirm = vueExports.ref(false);
    function confirmDelete() {
      showDeleteConfirm.value = false;
      emit("remove");
    }
    const showVideoPreview = vueExports.ref(false);
    vueExports.ref(null);
    const hasRefImages = vueExports.computed(() => props.task.images && props.task.images.length > 0);
    const showTaskDetail = vueExports.ref(false);
    const showErrorLogs = vueExports.ref(false);
    const showRefImages = vueExports.ref(false);
    function downloadVideo() {
      if (!props.task.resourceUrl) return;
      const a = (void 0).createElement("a");
      a.href = props.task.resourceUrl;
      a.download = `video-${props.task.id}.mp4`;
      a.target = "_blank";
      a.click();
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_StudioLoader = __nuxt_component_0$2;
      const _component_UIcon = _sfc_main$d;
      const _component_TimeAgo = __nuxt_component_3$1;
      const _component_UModal = _sfc_main$h;
      const _component_UButton = _sfc_main$8$1;
      const _component_StudioTaskDetailModal = __nuxt_component_6$1;
      const _component_StudioRefImagesModal = __nuxt_component_7;
      const _component_StudioErrorLogsModal = __nuxt_component_8;
      _push(`<div${serverRenderer_cjs_prodExports.ssrRenderAttrs(vueExports.mergeProps({ class: "bg-(--ui-bg-elevated) backdrop-blur-sm rounded-lg border border-(--ui-border) overflow-hidden" }, _attrs))}><div class="aspect-square relative bg-(--ui-bg-muted)">`);
      if (__props.task.resourceUrl) {
        _push(`<video${serverRenderer_cjs_prodExports.ssrRenderAttr("src", __props.task.resourceUrl)} class="${serverRenderer_cjs_prodExports.ssrRenderClass([vueExports.unref(isBlurred) ? "blur-xl scale-105" : "", "w-full h-full object-contain cursor-pointer transition-all duration-300"])}" controls preload="metadata"></video>`);
      } else {
        _push(`<div class="w-full h-full flex items-center justify-center p-4"><div class="text-center">`);
        if (vueExports.unref(statusInfo).showBars) {
          _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_StudioLoader, {
            class: ["w-12 h-12 mb-2", vueExports.unref(statusInfo).color]
          }, null, _parent));
        } else if (vueExports.unref(statusInfo).icon) {
          _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UIcon, {
            name: vueExports.unref(statusInfo).icon,
            class: ["w-12 h-12 mb-2", vueExports.unref(statusInfo).color]
          }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`<p class="${serverRenderer_cjs_prodExports.ssrRenderClass(["text-sm mb-2", vueExports.unref(statusInfo).color])}">${serverRenderer_cjs_prodExports.ssrInterpolate(vueExports.unref(statusInfo).text)}</p>`);
        if (__props.task.error) {
          _push(`<p class="text-(--ui-error) text-xs leading-relaxed line-clamp-3 px-2 mb-2">${serverRenderer_cjs_prodExports.ssrInterpolate(__props.task.error)}</p>`);
        } else {
          _push(`<!---->`);
        }
        if (__props.task.error && __props.task.status === "failed") {
          _push(`<button class="text-xs text-(--ui-text-muted) hover:text-(--ui-text) underline underline-offset-2"> 查看详情 </button>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
      }
      if (["pending", "submitting", "processing"].includes(__props.task.status)) {
        _push(`<div class="absolute bottom-12 left-0 right-0 flex justify-center"><button class="bg-black/50 backdrop-blur-sm rounded-lg px-4 py-2 text-white/80 text-sm hover:bg-(--ui-warning)/70 transition-colors">`);
        _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-stop",
          class: "w-4 h-4 inline mr-1"
        }, null, _parent));
        _push(` 取消任务 </button></div>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.task.resourceUrl && __props.task.status !== "success") {
        _push(`<div class="absolute top-2 right-2 px-2 py-1 rounded-full bg-black/50 backdrop-blur-sm"><span class="${serverRenderer_cjs_prodExports.ssrRenderClass(["text-xs", vueExports.unref(statusInfo).color])}">${serverRenderer_cjs_prodExports.ssrInterpolate(vueExports.unref(statusInfo).text)}</span></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="absolute top-2 left-2 flex gap-1">`);
      if (__props.task.resourceUrl) {
        _push(`<button class="w-8 h-8 flex items-center justify-center rounded-full bg-black/50 backdrop-blur-sm hover:bg-black/70 transition-colors" title="下载视频">`);
        _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-arrow-down-tray",
          class: "w-4 h-4 text-white"
        }, null, _parent));
        _push(`</button>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.task.resourceUrl) {
        _push(`<button class="w-8 h-8 flex items-center justify-center rounded-full bg-black/50 backdrop-blur-sm hover:bg-black/70 transition-colors" title="全屏查看">`);
        _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-arrows-pointing-out",
          class: "w-4 h-4 text-white"
        }, null, _parent));
        _push(`</button>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.task.status === "failed" || __props.task.status === "cancelled") {
        _push(`<button class="w-8 h-8 flex items-center justify-center rounded-full bg-black/50 backdrop-blur-sm hover:bg-black/70 transition-colors" title="重试">`);
        _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-arrow-path",
          class: "w-4 h-4 text-white"
        }, null, _parent));
        _push(`</button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<button class="w-8 h-8 flex items-center justify-center rounded-full bg-black/50 backdrop-blur-sm hover:bg-black/70 transition-colors" title="详情">`);
      _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-information-circle",
        class: "w-4 h-4 text-white"
      }, null, _parent));
      _push(`</button><button class="w-8 h-8 flex items-center justify-center rounded-full bg-black/50 backdrop-blur-sm hover:bg-black/70 transition-colors" title="复制到工作台">`);
      _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-document-duplicate",
        class: "w-4 h-4 text-white"
      }, null, _parent));
      _push(`</button><button class="w-8 h-8 flex items-center justify-center rounded-full bg-black/50 backdrop-blur-sm hover:bg-(--ui-error)/70 transition-colors" title="删除">`);
      _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-trash",
        class: "w-4 h-4 text-white"
      }, null, _parent));
      _push(`</button></div><div class="absolute bottom-2 left-2 flex gap-1.5"><div class="${serverRenderer_cjs_prodExports.ssrRenderClass([vueExports.unref(modelInfo).color, "px-2 py-1 rounded-full text-xs text-white font-medium"])}">${serverRenderer_cjs_prodExports.ssrInterpolate(vueExports.unref(modelInfo).label)}</div><div class="px-2 py-1 rounded-full text-xs text-white font-medium bg-indigo-500/80">`);
      _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-video-camera",
        class: "w-3 h-3 inline mr-0.5"
      }, null, _parent));
      _push(` 视频 </div></div>`);
      if (vueExports.unref(hasRefImages)) {
        _push(`<button class="absolute bottom-2 right-2 px-2 py-1 rounded-full text-xs text-white font-medium bg-black/60 backdrop-blur-sm hover:bg-black/80 transition-colors flex items-center gap-1" title="查看参考图">`);
        _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-photo",
          class: "w-3.5 h-3.5"
        }, null, _parent));
        _push(`<span>参考图</span></button>`);
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
      _push(`</div><div class="p-4"><div class="flex items-center justify-between text-(--ui-text-dimmed) text-xs mb-2"><div class="flex items-center gap-2"><span class="font-mono bg-(--ui-bg-accented) px-1.5 py-0.5 rounded cursor-pointer hover:bg-(--ui-bg-inverted)/20 select-none" title="点击复制">ID:${serverRenderer_cjs_prodExports.ssrInterpolate(__props.task.id)}</span>`);
      _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_TimeAgo, {
        time: __props.task.createdAt
      }, null, _parent));
      _push(`</div>`);
      if (vueExports.unref(duration)) {
        _push(`<span>耗时 ${serverRenderer_cjs_prodExports.ssrInterpolate(vueExports.unref(duration))}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><p class="text-(--ui-text-muted) text-sm line-clamp-2"${serverRenderer_cjs_prodExports.ssrRenderAttr("title", __props.task.prompt ?? "")}><span class="text-(--ui-text-dimmed)">提示词：</span>${serverRenderer_cjs_prodExports.ssrInterpolate(__props.task.prompt || "无")}</p></div>`);
      _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UModal, {
        open: vueExports.unref(showDeleteConfirm),
        "onUpdate:open": ($event) => vueExports.isRef(showDeleteConfirm) ? showDeleteConfirm.value = $event : null,
        title: "确认删除",
        description: "确定要删除这个任务吗？此操作不可撤销。",
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
              onClick: ($event) => showDeleteConfirm.value = false
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
      }, _parent));
      _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_StudioTaskDetailModal, {
        open: vueExports.unref(showTaskDetail),
        "onUpdate:open": ($event) => vueExports.isRef(showTaskDetail) ? showTaskDetail.value = $event : null,
        task: __props.task
      }, null, _parent));
      _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UModal, {
        open: vueExports.unref(showVideoPreview),
        "onUpdate:open": ($event) => vueExports.isRef(showVideoPreview) ? showVideoPreview.value = $event : null,
        ui: { content: "sm:max-w-4xl" }
      }, {
        content: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="relative bg-black flex items-center justify-center"${_scopeId}>`);
            if (__props.task.resourceUrl) {
              _push2(`<video${serverRenderer_cjs_prodExports.ssrRenderAttr("src", __props.task.resourceUrl)} class="max-h-[85vh] w-full" controls autoplay${_scopeId}></video>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<button class="absolute top-3 right-3 w-9 h-9 flex items-center justify-center rounded-full bg-black/50 backdrop-blur-sm hover:bg-black/70 transition-colors"${_scopeId}>`);
            _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-x-mark",
              class: "w-5 h-5 text-white"
            }, null, _parent2, _scopeId));
            _push2(`</button><button class="absolute top-3 left-3 w-9 h-9 flex items-center justify-center rounded-full bg-black/50 backdrop-blur-sm hover:bg-black/70 transition-colors" title="下载视频"${_scopeId}>`);
            _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-arrow-down-tray",
              class: "w-5 h-5 text-white"
            }, null, _parent2, _scopeId));
            _push2(`</button></div>`);
          } else {
            return [
              vueExports.createVNode("div", { class: "relative bg-black flex items-center justify-center" }, [
                __props.task.resourceUrl ? (vueExports.openBlock(), vueExports.createBlock("video", {
                  key: 0,
                  src: __props.task.resourceUrl,
                  class: "max-h-[85vh] w-full",
                  controls: "",
                  autoplay: ""
                }, null, 8, ["src"])) : vueExports.createCommentVNode("", true),
                vueExports.createVNode("button", {
                  class: "absolute top-3 right-3 w-9 h-9 flex items-center justify-center rounded-full bg-black/50 backdrop-blur-sm hover:bg-black/70 transition-colors",
                  onClick: ($event) => showVideoPreview.value = false
                }, [
                  vueExports.createVNode(_component_UIcon, {
                    name: "i-heroicons-x-mark",
                    class: "w-5 h-5 text-white"
                  })
                ], 8, ["onClick"]),
                vueExports.createVNode("button", {
                  class: "absolute top-3 left-3 w-9 h-9 flex items-center justify-center rounded-full bg-black/50 backdrop-blur-sm hover:bg-black/70 transition-colors",
                  title: "下载视频",
                  onClick: downloadVideo
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
      _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_StudioRefImagesModal, {
        open: vueExports.unref(showRefImages),
        "onUpdate:open": ($event) => vueExports.isRef(showRefImages) ? showRefImages.value = $event : null,
        images: __props.task.images
      }, null, _parent));
      _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_StudioErrorLogsModal, {
        open: vueExports.unref(showErrorLogs),
        "onUpdate:open": ($event) => vueExports.isRef(showErrorLogs) ? showErrorLogs.value = $event : null,
        "task-id": __props.task.id
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = vueExports.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/studio/VideoCard.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_5 = Object.assign(_sfc_main$3, { __name: "StudioVideoCard" });
const _sfc_main$2 = /* @__PURE__ */ vueExports.defineComponent({
  __name: "Card",
  __ssrInlineRender: true,
  props: {
    task: {}
  },
  emits: ["action", "remove", "retry", "cancel", "blur", "copyToPanel"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const isActioning = vueExports.ref(false);
    useToast();
    const isBlurred = vueExports.ref(props.task.isBlurred ?? true);
    vueExports.watch(() => props.task.isBlurred, (newVal) => {
      if (newVal !== void 0) {
        isBlurred.value = newVal;
      }
    });
    const statusInfo = vueExports.computed(() => {
      switch (props.task.status) {
        case "pending":
          return { text: "等待中", color: "text-(--ui-warning)", icon: "i-heroicons-clock", showBars: false };
        case "submitting":
          return { text: "提交中", color: "text-(--ui-info)", icon: null, showBars: true };
        case "processing":
          return { text: props.task.progress || "生成中", color: "text-(--ui-primary)", icon: null, showBars: true };
        case "success":
          return { text: "已完成", color: "text-(--ui-success)", icon: "i-heroicons-check-circle", showBars: false };
        case "failed":
          return { text: "失败", color: "text-(--ui-error)", icon: "i-heroicons-x-circle", showBars: false };
        case "cancelled":
          return { text: "已取消", color: "text-(--ui-text-muted)", icon: "i-heroicons-no-symbol", showBars: false };
        default:
          return { text: "未知", color: "text-(--ui-text-muted)", icon: "i-heroicons-question-mark-circle", showBars: false };
      }
    });
    const modelInfo = vueExports.computed(() => {
      const modelType = props.task.modelType;
      const display = TASK_CARD_MODEL_DISPLAY[modelType] || { label: modelType || "未知", color: "bg-gray-500/80" };
      return {
        label: display.label,
        type: modelType,
        color: display.color
      };
    });
    const isLoading = vueExports.computed(() => ["pending", "submitting", "processing"].includes(props.task.status));
    const estimatedTime = vueExports.computed(() => {
      return props.task.upstream?.estimatedTime ?? DEFAULT_FALLBACK_ESTIMATED_TIME;
    });
    const now = vueExports.ref(Date.now());
    let progressTimer = null;
    vueExports.watch(isLoading, (loading) => {
      if (loading) {
        now.value = Date.now();
        progressTimer = setInterval();
      } else if (progressTimer) {
        clearInterval(progressTimer);
        progressTimer = null;
      }
    }, { immediate: true });
    const progressPercent = vueExports.computed(() => {
      if (!isLoading.value) return 0;
      const start = new Date(props.task.createdAt).getTime();
      const elapsed = (now.value - start) / 1e3;
      const bufferedTime = estimatedTime.value * PROGRESS_TIME_BUFFER_RATIO;
      return Math.min(elapsed / bufferedTime * 100, 100);
    });
    const duration = vueExports.computed(() => {
      if (!props.task.createdAt) return null;
      const start = new Date(props.task.createdAt).getTime();
      const end = props.task.status === "success" || props.task.status === "failed" ? new Date(props.task.updatedAt).getTime() : Date.now();
      const seconds = Math.floor((end - start) / 1e3);
      if (seconds < 60) return `${seconds}秒`;
      const minutes = Math.floor(seconds / 60);
      const remainSeconds = seconds % 60;
      return `${minutes}分${remainSeconds}秒`;
    });
    const buttons = vueExports.computed(() => props.task.buttons ?? []);
    const dropdownItems = vueExports.computed(() => {
      const items = [];
      const upscaleButtons = buttons.value.filter((btn) => btn.label.startsWith("U"));
      if (upscaleButtons.length > 0) {
        items.push([
          { label: "放大", type: "label" },
          ...upscaleButtons.map((btn) => ({
            label: btn.label,
            icon: "i-heroicons-arrows-pointing-out",
            onSelect: () => handleAction(btn.customId)
          }))
        ]);
      }
      const variationButtons = buttons.value.filter((btn) => btn.label.startsWith("V"));
      if (variationButtons.length > 0) {
        items.push([
          { label: "变体", type: "label" },
          ...variationButtons.map((btn) => ({
            label: btn.label,
            icon: "i-heroicons-sparkles",
            onSelect: () => handleAction(btn.customId)
          }))
        ]);
      }
      const rerollButton = buttons.value.find((btn) => btn.emoji === "🔄");
      if (rerollButton) {
        items.push([
          {
            label: "重绘",
            icon: "i-heroicons-arrow-path",
            onSelect: () => handleAction(rerollButton.customId)
          }
        ]);
      }
      return items;
    });
    async function handleAction(customId) {
      isActioning.value = true;
      try {
        emit("action", customId);
      } finally {
        isActioning.value = false;
      }
    }
    const showDeleteConfirm = vueExports.ref(false);
    function confirmDelete() {
      showDeleteConfirm.value = false;
      emit("remove");
    }
    const showImagePreview = vueExports.ref(false);
    const hasRefImages = vueExports.computed(() => props.task.images && props.task.images.length > 0);
    const showTaskDetail = vueExports.ref(false);
    const showErrorLogs = vueExports.ref(false);
    const showRefImages = vueExports.ref(false);
    function downloadImage() {
      if (!props.task.resourceUrl) return;
      const a = (void 0).createElement("a");
      a.href = props.task.resourceUrl;
      a.download = `mj-${props.task.id}.png`;
      a.target = "_blank";
      a.click();
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_StudioLoader = __nuxt_component_0$2;
      const _component_UIcon = _sfc_main$d;
      const _component_UDropdownMenu = _sfc_main$j;
      const _component_TimeAgo = __nuxt_component_3$1;
      const _component_UModal = _sfc_main$h;
      const _component_UButton = _sfc_main$8$1;
      const _component_StudioTaskDetailModal = __nuxt_component_6$1;
      const _component_StudioRefImagesModal = __nuxt_component_7;
      const _component_StudioErrorLogsModal = __nuxt_component_8;
      _push(`<div${serverRenderer_cjs_prodExports.ssrRenderAttrs(vueExports.mergeProps({ class: "bg-(--ui-bg-elevated) backdrop-blur-sm rounded-lg border border-(--ui-border) overflow-hidden" }, _attrs))} data-v-f4b536ad><div class="${serverRenderer_cjs_prodExports.ssrRenderClass([__props.task.resourceUrl && !vueExports.unref(isBlurred) ? "checkerboard-bg" : "bg-(--ui-bg-muted)", "aspect-square relative"])}" data-v-f4b536ad>`);
      if (__props.task.resourceUrl) {
        _push(`<img${serverRenderer_cjs_prodExports.ssrRenderAttr("src", __props.task.resourceUrl)}${serverRenderer_cjs_prodExports.ssrRenderAttr("alt", __props.task.prompt ?? "")} class="${serverRenderer_cjs_prodExports.ssrRenderClass([vueExports.unref(isBlurred) ? "blur-xl scale-105" : "", "w-full h-full object-contain cursor-pointer transition-all duration-300"])}" data-v-f4b536ad>`);
      } else {
        _push(`<div class="w-full h-full flex items-center justify-center p-4" data-v-f4b536ad><div class="text-center" data-v-f4b536ad>`);
        if (vueExports.unref(statusInfo).showBars) {
          _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_StudioLoader, {
            class: ["w-12 h-12 mb-2", vueExports.unref(statusInfo).color]
          }, null, _parent));
        } else if (vueExports.unref(statusInfo).icon) {
          _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UIcon, {
            name: vueExports.unref(statusInfo).icon,
            class: ["w-12 h-12 mb-2", vueExports.unref(statusInfo).color]
          }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`<p class="${serverRenderer_cjs_prodExports.ssrRenderClass(["text-sm mb-2", vueExports.unref(statusInfo).color])}" data-v-f4b536ad>${serverRenderer_cjs_prodExports.ssrInterpolate(vueExports.unref(statusInfo).text)}</p>`);
        if (__props.task.error) {
          _push(`<p class="text-(--ui-error) text-xs leading-relaxed line-clamp-3 px-2 mb-2" data-v-f4b536ad>${serverRenderer_cjs_prodExports.ssrInterpolate(__props.task.error)}</p>`);
        } else {
          _push(`<!---->`);
        }
        if (__props.task.error && __props.task.status === "failed") {
          _push(`<button class="text-xs text-(--ui-text-muted) hover:text-(--ui-text) underline underline-offset-2" data-v-f4b536ad> 查看详情 </button>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
      }
      if (["pending", "submitting", "processing"].includes(__props.task.status)) {
        _push(`<div class="absolute bottom-16 left-0 right-0 flex justify-center" data-v-f4b536ad><button class="bg-black/50 backdrop-blur-sm rounded-lg px-4 py-2 text-white/80 text-sm hover:bg-(--ui-warning)/70 transition-colors" data-v-f4b536ad>`);
        _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-stop",
          class: "w-4 h-4 inline mr-1"
        }, null, _parent));
        _push(` 取消任务 </button></div>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.task.resourceUrl && __props.task.status !== "success") {
        _push(`<div class="absolute top-2 right-2 px-2 py-1 rounded-full bg-black/50 backdrop-blur-sm" data-v-f4b536ad><span class="${serverRenderer_cjs_prodExports.ssrRenderClass(["text-xs", vueExports.unref(statusInfo).color])}" data-v-f4b536ad>${serverRenderer_cjs_prodExports.ssrInterpolate(vueExports.unref(statusInfo).text)}</span></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="absolute top-2 left-2 flex gap-1" data-v-f4b536ad>`);
      if (__props.task.resourceUrl) {
        _push(`<button class="w-8 h-8 flex items-center justify-center rounded-full bg-black/50 backdrop-blur-sm hover:bg-black/70 transition-colors" title="下载图片" data-v-f4b536ad>`);
        _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-arrow-down-tray",
          class: "w-4 h-4 text-white"
        }, null, _parent));
        _push(`</button>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.task.resourceUrl) {
        _push(`<button class="w-8 h-8 flex items-center justify-center rounded-full bg-black/50 backdrop-blur-sm hover:bg-black/70 transition-colors" title="放大查看" data-v-f4b536ad>`);
        _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-magnifying-glass-plus",
          class: "w-4 h-4 text-white"
        }, null, _parent));
        _push(`</button>`);
      } else {
        _push(`<!---->`);
      }
      if (vueExports.unref(modelInfo).type === "midjourney" && vueExports.unref(buttons).length > 0) {
        _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UDropdownMenu, { items: vueExports.unref(dropdownItems) }, {
          default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<button class="w-8 h-8 flex items-center justify-center rounded-full bg-black/50 backdrop-blur-sm hover:bg-black/70 transition-colors" title="MJ操作"${serverRenderer_cjs_prodExports.ssrIncludeBooleanAttr(vueExports.unref(isActioning)) ? " disabled" : ""} data-v-f4b536ad${_scopeId}>`);
              _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UIcon, {
                name: "i-heroicons-squares-plus",
                class: "w-4 h-4 text-white"
              }, null, _parent2, _scopeId));
              _push2(`</button>`);
            } else {
              return [
                vueExports.createVNode("button", {
                  class: "w-8 h-8 flex items-center justify-center rounded-full bg-black/50 backdrop-blur-sm hover:bg-black/70 transition-colors",
                  title: "MJ操作",
                  disabled: vueExports.unref(isActioning)
                }, [
                  vueExports.createVNode(_component_UIcon, {
                    name: "i-heroicons-squares-plus",
                    class: "w-4 h-4 text-white"
                  })
                ], 8, ["disabled"])
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      if (__props.task.status === "failed" || __props.task.status === "cancelled") {
        _push(`<button class="w-8 h-8 flex items-center justify-center rounded-full bg-black/50 backdrop-blur-sm hover:bg-black/70 transition-colors" title="重试" data-v-f4b536ad>`);
        _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-arrow-path",
          class: "w-4 h-4 text-white"
        }, null, _parent));
        _push(`</button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<button class="w-8 h-8 flex items-center justify-center rounded-full bg-black/50 backdrop-blur-sm hover:bg-black/70 transition-colors" title="详情" data-v-f4b536ad>`);
      _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-information-circle",
        class: "w-4 h-4 text-white"
      }, null, _parent));
      _push(`</button><button class="w-8 h-8 flex items-center justify-center rounded-full bg-black/50 backdrop-blur-sm hover:bg-black/70 transition-colors" title="复制到工作台" data-v-f4b536ad>`);
      _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-document-duplicate",
        class: "w-4 h-4 text-white"
      }, null, _parent));
      _push(`</button><button class="w-8 h-8 flex items-center justify-center rounded-full bg-black/50 backdrop-blur-sm hover:bg-(--ui-error)/70 transition-colors" title="删除" data-v-f4b536ad>`);
      _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-trash",
        class: "w-4 h-4 text-white"
      }, null, _parent));
      _push(`</button></div><div class="${serverRenderer_cjs_prodExports.ssrRenderClass([vueExports.unref(modelInfo).color, "absolute bottom-2 left-2 px-2 py-1 rounded-full text-xs text-white font-medium"])}" data-v-f4b536ad>${serverRenderer_cjs_prodExports.ssrInterpolate(vueExports.unref(modelInfo).label)}</div>`);
      if (vueExports.unref(hasRefImages)) {
        _push(`<button class="absolute bottom-2 right-2 px-2 py-1 rounded-full text-xs text-white font-medium bg-black/60 backdrop-blur-sm hover:bg-black/80 transition-colors flex items-center gap-1" title="查看参考图" data-v-f4b536ad>`);
        _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-photo",
          class: "w-3.5 h-3.5"
        }, null, _parent));
        _push(`<span data-v-f4b536ad>参考图 ${serverRenderer_cjs_prodExports.ssrInterpolate(__props.task.images.length)}</span></button>`);
      } else {
        _push(`<!---->`);
      }
      if (vueExports.unref(isLoading)) {
        _push(`<div class="absolute bottom-0 left-0 right-0 h-[3px] bg-black/20 overflow-hidden" data-v-f4b536ad><div class="h-full transition-all duration-500 ease-out animate-shimmer" style="${serverRenderer_cjs_prodExports.ssrRenderStyle({
          width: `${vueExports.unref(progressPercent)}%`,
          backgroundImage: "linear-gradient(90deg, #8b5cf6, #ec4899, #06b6d4, #8b5cf6)",
          backgroundSize: "200% 100%"
        })}" data-v-f4b536ad></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="p-4" data-v-f4b536ad><div class="flex items-center justify-between text-(--ui-text-dimmed) text-xs mb-2" data-v-f4b536ad><div class="flex items-center gap-2" data-v-f4b536ad><span class="font-mono bg-(--ui-bg-accented) px-1.5 py-0.5 rounded cursor-pointer hover:bg-(--ui-bg-inverted)/20 select-none" title="点击复制" data-v-f4b536ad>ID:${serverRenderer_cjs_prodExports.ssrInterpolate(__props.task.id)}</span>`);
      _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_TimeAgo, {
        time: __props.task.createdAt
      }, null, _parent));
      _push(`</div>`);
      if (vueExports.unref(duration)) {
        _push(`<span data-v-f4b536ad>耗时 ${serverRenderer_cjs_prodExports.ssrInterpolate(vueExports.unref(duration))}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><p class="text-(--ui-text-muted) text-sm line-clamp-2 mb-3"${serverRenderer_cjs_prodExports.ssrRenderAttr("title", __props.task.prompt ?? "")} data-v-f4b536ad><span class="text-(--ui-text-dimmed)" data-v-f4b536ad>提示词：</span>${serverRenderer_cjs_prodExports.ssrInterpolate(__props.task.prompt || "图片混合")}</p></div>`);
      _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UModal, {
        open: vueExports.unref(showDeleteConfirm),
        "onUpdate:open": ($event) => vueExports.isRef(showDeleteConfirm) ? showDeleteConfirm.value = $event : null,
        title: "确认删除",
        description: "确定要删除这个任务吗？此操作不可撤销。",
        close: false
      }, {
        footer: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex justify-end gap-3" data-v-f4b536ad${_scopeId}>`);
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
              onClick: ($event) => showDeleteConfirm.value = false
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
      }, _parent));
      _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_StudioTaskDetailModal, {
        open: vueExports.unref(showTaskDetail),
        "onUpdate:open": ($event) => vueExports.isRef(showTaskDetail) ? showTaskDetail.value = $event : null,
        task: __props.task
      }, null, _parent));
      _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UModal, {
        open: vueExports.unref(showImagePreview),
        "onUpdate:open": ($event) => vueExports.isRef(showImagePreview) ? showImagePreview.value = $event : null,
        ui: { content: "sm:max-w-4xl" }
      }, {
        content: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="relative bg-(--ui-bg) flex items-center justify-center" data-v-f4b536ad${_scopeId}>`);
            if (__props.task.resourceUrl) {
              _push2(`<img${serverRenderer_cjs_prodExports.ssrRenderAttr("src", __props.task.resourceUrl)}${serverRenderer_cjs_prodExports.ssrRenderAttr("alt", __props.task.prompt ?? "")} class="max-h-[85vh]" data-v-f4b536ad${_scopeId}>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<button class="absolute top-3 right-3 w-9 h-9 flex items-center justify-center rounded-full bg-black/50 backdrop-blur-sm hover:bg-black/70 transition-colors" data-v-f4b536ad${_scopeId}>`);
            _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-x-mark",
              class: "w-5 h-5 text-white"
            }, null, _parent2, _scopeId));
            _push2(`</button><button class="absolute top-3 left-3 w-9 h-9 flex items-center justify-center rounded-full bg-black/50 backdrop-blur-sm hover:bg-black/70 transition-colors" title="下载图片" data-v-f4b536ad${_scopeId}>`);
            _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-arrow-down-tray",
              class: "w-5 h-5 text-white"
            }, null, _parent2, _scopeId));
            _push2(`</button></div>`);
          } else {
            return [
              vueExports.createVNode("div", { class: "relative bg-(--ui-bg) flex items-center justify-center" }, [
                __props.task.resourceUrl ? (vueExports.openBlock(), vueExports.createBlock("img", {
                  key: 0,
                  src: __props.task.resourceUrl,
                  alt: __props.task.prompt ?? "",
                  class: "max-h-[85vh]"
                }, null, 8, ["src", "alt"])) : vueExports.createCommentVNode("", true),
                vueExports.createVNode("button", {
                  class: "absolute top-3 right-3 w-9 h-9 flex items-center justify-center rounded-full bg-black/50 backdrop-blur-sm hover:bg-black/70 transition-colors",
                  onClick: ($event) => showImagePreview.value = false
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
      _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_StudioRefImagesModal, {
        open: vueExports.unref(showRefImages),
        "onUpdate:open": ($event) => vueExports.isRef(showRefImages) ? showRefImages.value = $event : null,
        images: __props.task.images
      }, null, _parent));
      _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_StudioErrorLogsModal, {
        open: vueExports.unref(showErrorLogs),
        "onUpdate:open": ($event) => vueExports.isRef(showErrorLogs) ? showErrorLogs.value = $event : null,
        "task-id": __props.task.id
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = vueExports.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/studio/Card.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_6 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$2, [["__scopeId", "data-v-f4b536ad"]]), { __name: "StudioCard" });
function useTasks() {
  const tasks = useState("tasks", () => []);
  const isLoading = useState("tasks-loading", () => false);
  const currentPage = useState("tasks-page", () => 1);
  const pageSize = useState("tasks-pageSize", () => 20);
  const total = useState("tasks-total", () => 0);
  const sourceType = useState("tasks-sourceType", () => "workbench");
  const taskType = useState("tasks-taskType", () => "all");
  const keyword = useState("tasks-keyword", () => "");
  useGlobalEvents();
  async function loadTasks(page) {
    isLoading.value = true;
    if (page !== void 0) {
      currentPage.value = page;
    }
    try {
      const result = await $fetch("/api/tasks", {
        query: {
          page: currentPage.value,
          pageSize: pageSize.value,
          sourceType: sourceType.value,
          taskType: taskType.value !== "all" ? taskType.value : void 0,
          keyword: keyword.value || void 0
        }
      });
      tasks.value = result.tasks;
      total.value = result.total;
    } catch (error) {
      console.error("加载任务列表失败:", error);
    } finally {
      isLoading.value = false;
    }
  }
  async function executeAction(task, customId) {
    try {
      await $fetch("/api/tasks/action", {
        method: "POST",
        body: { taskId: task.id, customId }
      });
    } catch (error) {
      console.error("执行动作失败:", error);
      throw error;
    }
  }
  async function deleteTask(taskId) {
    await $fetch(`/api/tasks/${taskId}`, { method: "DELETE" });
  }
  async function batchBlur(isBlurred, taskIds) {
    await $fetch("/api/tasks/blur-batch", {
      method: "PATCH",
      body: { isBlurred, taskIds }
    });
  }
  async function retryTask(taskId) {
    try {
      await $fetch(`/api/tasks/${taskId}/retry`, { method: "POST" });
    } catch (error) {
      console.error("重试任务失败:", error);
      throw error;
    }
  }
  async function cancelTask(taskId) {
    try {
      await $fetch(`/api/tasks/${taskId}/cancel`, { method: "POST" });
    } catch (error) {
      console.error("取消任务失败:", error);
      throw error;
    }
  }
  return {
    tasks,
    isLoading,
    currentPage,
    pageSize,
    total,
    sourceType,
    taskType,
    keyword,
    loadTasks,
    executeAction,
    deleteTask,
    batchBlur,
    retryTask,
    cancelTask
  };
}
const _sfc_main$1 = /* @__PURE__ */ vueExports.defineComponent({
  __name: "List",
  __ssrInlineRender: true,
  emits: ["copyToPanel"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const toast = useToast();
    const { tasks, isLoading, currentPage, pageSize, total, sourceType, taskType, keyword, executeAction, deleteTask, batchBlur, retryTask, cancelTask, loadTasks } = useTasks();
    const blurLoading = vueExports.ref(false);
    const sourceOptions = [
      { label: "绘图工作台", value: "workbench" },
      { label: "对话插图", value: "chat" },
      { label: "全部", value: "all" }
    ];
    const taskTypeOptions = [
      { label: "全部", value: "all" },
      { label: "图片", value: "image" },
      { label: "视频", value: "video" }
    ];
    const searchInput = vueExports.ref(keyword.value);
    let searchTimeout = null;
    function handleSearchInput() {
      if (searchTimeout) clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        keyword.value = searchInput.value;
        currentPage.value = 1;
        loadTasks();
      }, 300);
    }
    function handleSourceChange() {
      currentPage.value = 1;
      loadTasks();
    }
    function handleTaskTypeChange() {
      currentPage.value = 1;
      loadTasks();
    }
    const totalPages = vueExports.computed(() => Math.ceil(total.value / pageSize.value));
    async function handleAction(taskId, customId) {
      const task = tasks.value.find((t) => t.id === taskId);
      if (!task) return;
      try {
        await executeAction(task, customId);
      } catch (error) {
        toast.add({ title: error.message || "执行失败", color: "error" });
      }
    }
    async function handleRetry(taskId) {
      try {
        await retryTask(taskId);
      } catch (error) {
        toast.add({ title: error.data?.message || error.message || "重试失败", color: "error" });
      }
    }
    async function handleCancel(taskId) {
      try {
        await cancelTask(taskId);
      } catch (error) {
        toast.add({ title: error.data?.message || error.message || "取消失败", color: "error" });
      }
    }
    async function handleDelete(taskId) {
      try {
        await deleteTask(taskId);
      } catch (error) {
        toast.add({ title: error.data?.message || error.message || "删除失败", color: "error" });
      }
    }
    function handleBlur(taskId, isBlurred) {
      const index = tasks.value.findIndex((t) => t.id === taskId);
      if (index >= 0) {
        tasks.value[index] = { ...tasks.value[index], isBlurred };
      }
    }
    function getCurrentPageTaskIds() {
      return tasks.value.filter((t) => t.resourceUrl).map((t) => t.id);
    }
    async function blurAll() {
      blurLoading.value = true;
      try {
        await batchBlur(true, getCurrentPageTaskIds());
      } catch (error) {
        toast.add({ title: error.data?.message || error.message || "操作失败", color: "error" });
      } finally {
        blurLoading.value = false;
      }
    }
    async function unblurAll() {
      blurLoading.value = true;
      try {
        await batchBlur(false, getCurrentPageTaskIds());
      } catch (error) {
        toast.add({ title: error.data?.message || error.message || "操作失败", color: "error" });
      } finally {
        blurLoading.value = false;
      }
    }
    function handlePageChange() {
      loadTasks();
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UButton = _sfc_main$8$1;
      const _component_UIcon = _sfc_main$d;
      const _component_NuxtLink = __nuxt_component_0$1;
      const _component_USelectMenu = _sfc_main$c;
      const _component_UInput = _sfc_main$e;
      const _component_StudioVideoCard = __nuxt_component_5;
      const _component_StudioCard = __nuxt_component_6;
      const _component_UPagination = _sfc_main$f;
      _push(`<div${serverRenderer_cjs_prodExports.ssrRenderAttrs(vueExports.mergeProps({ class: "space-y-4" }, _attrs))}><div class="flex items-center justify-between"><h2 class="text-(--ui-text) text-lg font-medium">生成任务</h2><div class="flex items-center gap-3">`);
      if (vueExports.unref(tasks).some((t) => t.resourceUrl)) {
        _push(`<div class="flex items-center gap-1">`);
        _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UButton, {
          size: "xs",
          variant: "ghost",
          color: "neutral",
          loading: vueExports.unref(blurLoading),
          disabled: vueExports.unref(blurLoading),
          onClick: blurAll
        }, {
          default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UIcon, {
                name: "i-heroicons-eye-slash",
                class: "w-4 h-4 lg:mr-1"
              }, null, _parent2, _scopeId));
              _push2(`<span class="hidden lg:inline"${_scopeId}>模糊本页</span>`);
            } else {
              return [
                vueExports.createVNode(_component_UIcon, {
                  name: "i-heroicons-eye-slash",
                  class: "w-4 h-4 lg:mr-1"
                }),
                vueExports.createVNode("span", { class: "hidden lg:inline" }, "模糊本页")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UButton, {
          size: "xs",
          variant: "ghost",
          color: "neutral",
          loading: vueExports.unref(blurLoading),
          disabled: vueExports.unref(blurLoading),
          onClick: unblurAll
        }, {
          default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UIcon, {
                name: "i-heroicons-eye",
                class: "w-4 h-4 lg:mr-1"
              }, null, _parent2, _scopeId));
              _push2(`<span class="hidden lg:inline"${_scopeId}>显示本页</span>`);
            } else {
              return [
                vueExports.createVNode(_component_UIcon, {
                  name: "i-heroicons-eye",
                  class: "w-4 h-4 lg:mr-1"
                }),
                vueExports.createVNode("span", { class: "hidden lg:inline" }, "显示本页")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_NuxtLink, { to: "/trash" }, {
        default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UButton, {
              size: "xs",
              variant: "ghost",
              color: "neutral"
            }, {
              default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UIcon, {
                    name: "i-heroicons-trash",
                    class: "w-4 h-4 lg:mr-1"
                  }, null, _parent3, _scopeId2));
                  _push3(`<span class="hidden lg:inline"${_scopeId2}>回收站</span>`);
                } else {
                  return [
                    vueExports.createVNode(_component_UIcon, {
                      name: "i-heroicons-trash",
                      class: "w-4 h-4 lg:mr-1"
                    }),
                    vueExports.createVNode("span", { class: "hidden lg:inline" }, "回收站")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              vueExports.createVNode(_component_UButton, {
                size: "xs",
                variant: "ghost",
                color: "neutral"
              }, {
                default: vueExports.withCtx(() => [
                  vueExports.createVNode(_component_UIcon, {
                    name: "i-heroicons-trash",
                    class: "w-4 h-4 lg:mr-1"
                  }),
                  vueExports.createVNode("span", { class: "hidden lg:inline" }, "回收站")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<span class="text-(--ui-text-dimmed) text-sm">共 ${serverRenderer_cjs_prodExports.ssrInterpolate(vueExports.unref(total))} 个任务</span></div></div><div class="flex flex-wrap items-center gap-3">`);
      _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_USelectMenu, {
        modelValue: vueExports.unref(sourceType),
        "onUpdate:modelValue": [($event) => vueExports.isRef(sourceType) ? sourceType.value = $event : null, handleSourceChange],
        items: sourceOptions,
        "value-key": "value",
        class: "w-32",
        size: "sm"
      }, null, _parent));
      _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_USelectMenu, {
        modelValue: vueExports.unref(taskType),
        "onUpdate:modelValue": [($event) => vueExports.isRef(taskType) ? taskType.value = $event : null, handleTaskTypeChange],
        items: taskTypeOptions,
        "value-key": "value",
        class: "w-24",
        size: "sm"
      }, null, _parent));
      _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UInput, {
        modelValue: vueExports.unref(searchInput),
        "onUpdate:modelValue": ($event) => vueExports.isRef(searchInput) ? searchInput.value = $event : null,
        placeholder: "搜索提示词...",
        size: "sm",
        class: "w-48",
        ui: { leading: "pl-2.5" },
        onInput: handleSearchInput
      }, {
        leading: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-magnifying-glass",
              class: "w-4 h-4 text-(--ui-text-muted)"
            }, null, _parent2, _scopeId));
          } else {
            return [
              vueExports.createVNode(_component_UIcon, {
                name: "i-heroicons-magnifying-glass",
                class: "w-4 h-4 text-(--ui-text-muted)"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
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
          name: "i-heroicons-photo",
          class: "w-16 h-16 text-(--ui-text-dimmed)/50 mx-auto mb-4"
        }, null, _parent));
        _push(`<p class="text-(--ui-text-dimmed)">还没有生成任务</p><p class="text-(--ui-text-dimmed)/70 text-sm mt-1">输入提示词开始创作</p></div>`);
      } else {
        _push(`<!--[--><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"><!--[-->`);
        serverRenderer_cjs_prodExports.ssrRenderList(vueExports.unref(tasks), (task) => {
          _push(`<!--[-->`);
          if (task.taskType === "video") {
            _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_StudioVideoCard, {
              task,
              onRemove: ($event) => handleDelete(task.id),
              onRetry: ($event) => handleRetry(task.id),
              onCancel: ($event) => handleCancel(task.id),
              onBlur: ($event) => handleBlur(task.id, $event),
              onCopyToPanel: (prompt, images) => emit("copyToPanel", prompt, null, images)
            }, null, _parent));
          } else {
            _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_StudioCard, {
              task,
              onAction: ($event) => handleAction(task.id, $event),
              onRemove: ($event) => handleDelete(task.id),
              onRetry: ($event) => handleRetry(task.id),
              onCancel: ($event) => handleCancel(task.id),
              onBlur: ($event) => handleBlur(task.id, $event),
              onCopyToPanel: (prompt, modelParams, images) => emit("copyToPanel", prompt, modelParams, images)
            }, null, _parent));
          }
          _push(`<!--]-->`);
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
      _push(`</div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = vueExports.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/studio/List.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_1 = Object.assign(_sfc_main$1, { __name: "StudioList" });
const _sfc_main = /* @__PURE__ */ vueExports.defineComponent({
  __name: "studio",
  __ssrInlineRender: true,
  setup(__props) {
    useTasks();
    const { upstreams } = useUpstreams();
    const toast = useToast();
    const workbenchRef = vueExports.ref(null);
    async function handleImageSubmit(data) {
      try {
        const result = await $fetch("/api/tasks", {
          method: "POST",
          body: {
            taskType: "image",
            prompt: data.prompt,
            modelParams: data.modelParams,
            images: data.images,
            type: data.apiFormat === "mj-proxy" && data.images.length > 0 && !data.prompt ? "blend" : "imagine",
            upstreamId: data.upstreamId,
            aimodelId: data.aimodelId,
            modelType: data.modelType,
            apiFormat: data.apiFormat,
            modelName: data.modelName
          }
        });
        if (result.success) {
          toast.add({
            title: "任务已创建",
            description: result.message,
            color: "success"
          });
        }
      } catch (error) {
        toast.add({
          title: "提交失败",
          description: error.data?.message || error.message || "请稍后重试",
          color: "error"
        });
      }
    }
    async function handleVideoSubmit(data) {
      try {
        const result = await $fetch("/api/tasks", {
          method: "POST",
          body: {
            taskType: "video",
            prompt: data.prompt,
            modelParams: data.modelParams,
            images: data.images,
            upstreamId: data.upstreamId,
            aimodelId: data.aimodelId,
            modelType: data.modelType,
            apiFormat: data.apiFormat,
            modelName: data.modelName
          }
        });
        if (result.success) {
          toast.add({
            title: "视频任务已创建",
            description: result.message,
            color: "success"
          });
        }
      } catch (error) {
        toast.add({
          title: "提交失败",
          description: error.data?.message || error.message || "请稍后重试",
          color: "error"
        });
      }
    }
    function handleCopyToPanel(prompt, modelParams, images) {
      workbenchRef.value?.setContent(prompt, modelParams, images);
      toast.add({
        title: "已复制到工作台",
        color: "success"
      });
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_StudioWorkbench = __nuxt_component_0;
      const _component_StudioList = __nuxt_component_1;
      _push(`<div${serverRenderer_cjs_prodExports.ssrRenderAttrs(vueExports.mergeProps({ class: "h-[calc(100vh-3.5rem)] flex flex-col overflow-y-auto lg:flex-row lg:overflow-hidden" }, _attrs))}><div class="flex-shrink-0 border-b lg:border-b-0 lg:border-r border-(--ui-border) bg-(--ui-bg-elevated) p-4 lg:w-[340px] lg:overflow-y-auto">`);
      _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_StudioWorkbench, {
        ref_key: "workbenchRef",
        ref: workbenchRef,
        upstreams: vueExports.unref(upstreams),
        onSubmitImage: handleImageSubmit,
        onSubmitVideo: handleVideoSubmit
      }, null, _parent));
      _push(`</div><div class="flex-1 p-4 lg:overflow-y-auto">`);
      _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_StudioList, { onCopyToPanel: handleCopyToPanel }, null, _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = vueExports.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/studio.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=studio-dIWm0Bh2.mjs.map
