import { v as vueExports, e as useAppConfig, q as useForwardPropsEmits, r as reactivePick, I as usePortal, x as useFormField, a4 as useFieldGroup, a5 as useComponentIcons, t as tv, K as isArrayOfArray, s as serverRenderer_cjs_prodExports, b as _sfc_main$d, z as _sfc_main$b, L as get, a6 as _sfc_main$c, y as useLocale, a8 as compare$2, k as useVModel, B as isNullish, E as useCollection, l as createContext, m as useForwardExpose, P as Primitive, a7 as getDisplayValue, T as Teleport_default, p as Presence_default, Z as usePrimitiveElement, $ as createEventHook, a2 as VisuallyHidden_default, w as useForwardProps, a3 as unrefElement, D as getActiveElement, a1 as useParentElement, a0 as refAutoReset, R as useResizeObserver } from './server.mjs';
import { u as useDirection, M as MAP_KEY_TO_FOCUS_INTENT, g as getFocusIntent } from './RovingFocusGroup-CN9Tim1l.mjs';
import { u as useFormControl, V as VisuallyHiddenInput_default } from './VisuallyHiddenInput-y7wD6Rzm.mjs';
import { P as PopperRoot_default, c as useTypeahead, a as PopperAnchor_default, b as PopperArrow_default, u as useFocusGuards, d as PopperContent_default, g as getNextMatch } from './PopperArrow-_X1u5CFX.mjs';
import { F as FocusScope_default, u as useId, e as useBodyScrollLock, f as useHideOthers, D as DismissableLayer_default, k as focusFirst } from './utils-DCnNb5Bf.mjs';
import { R as defu, a7 as isEqual } from '../nitro/nitro.mjs';
import { c as createReusableTemplate } from './index--6aaawBa.mjs';
import { _ as _sfc_main$2 } from './Input-A_WPZx9s.mjs';

function findValuesBetween(array, start, end) {
  const startIndex = array.findIndex((i) => isEqual(i, start));
  const endIndex = array.findIndex((i) => isEqual(i, end));
  if (startIndex === -1 || endIndex === -1) return [];
  const [minIndex, maxIndex] = [startIndex, endIndex].sort((a, b) => a - b);
  return array.slice(minIndex, maxIndex + 1);
}
function clamp(value, min = Number.NEGATIVE_INFINITY, max = Number.POSITIVE_INFINITY) {
  return Math.min(max, Math.max(min, value));
}
function handleAndDispatchCustomEvent(name, handler, detail) {
  const target = detail.originalEvent.target;
  const event = new CustomEvent(name, {
    bubbles: false,
    cancelable: true,
    detail
  });
  if (handler) target.addEventListener(name, handler, { once: true });
  target.dispatchEvent(event);
}
function useFilter(options) {
  const computedOptions = vueExports.computed(() => vueExports.unref(options));
  const collator = vueExports.computed(() => new Intl.Collator("en", {
    usage: "search",
    ...computedOptions.value
  }));
  const startsWith = (string, substring) => {
    if (substring.length === 0) return true;
    string = string.normalize("NFC");
    substring = substring.normalize("NFC");
    return collator.value.compare(string.slice(0, substring.length), substring) === 0;
  };
  const endsWith = (string, substring) => {
    if (substring.length === 0) return true;
    string = string.normalize("NFC");
    substring = substring.normalize("NFC");
    return collator.value.compare(string.slice(-substring.length), substring) === 0;
  };
  const contains = (string, substring) => {
    if (substring.length === 0) return true;
    string = string.normalize("NFC");
    substring = substring.normalize("NFC");
    let scan = 0;
    const sliceLen = substring.length;
    for (; scan + sliceLen <= string.length; scan++) {
      const slice = string.slice(scan, scan + sliceLen);
      if (collator.value.compare(substring, slice) === 0) return true;
    }
    return false;
  };
  return {
    startsWith,
    endsWith,
    contains
  };
}
function useKbd() {
  return {
    ALT: "Alt",
    ARROW_DOWN: "ArrowDown",
    ARROW_LEFT: "ArrowLeft",
    ARROW_RIGHT: "ArrowRight",
    ARROW_UP: "ArrowUp",
    BACKSPACE: "Backspace",
    CAPS_LOCK: "CapsLock",
    CONTROL: "Control",
    DELETE: "Delete",
    END: "End",
    ENTER: "Enter",
    ESCAPE: "Escape",
    F1: "F1",
    F10: "F10",
    F11: "F11",
    F12: "F12",
    F2: "F2",
    F3: "F3",
    F4: "F4",
    F5: "F5",
    F6: "F6",
    F7: "F7",
    F8: "F8",
    F9: "F9",
    HOME: "Home",
    META: "Meta",
    PAGE_DOWN: "PageDown",
    PAGE_UP: "PageUp",
    SHIFT: "Shift",
    SPACE: " ",
    TAB: "Tab",
    CTRL: "Control",
    ASTERISK: "*",
    SPACE_CODE: "Space"
  };
}
var ComboboxAnchor_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
  __name: "ComboboxAnchor",
  props: {
    reference: {
      type: null,
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
    const { forwardRef } = useForwardExpose();
    return (_ctx, _cache) => {
      return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(PopperAnchor_default), {
        "as-child": "",
        reference: _ctx.reference
      }, {
        default: vueExports.withCtx(() => [vueExports.createVNode(vueExports.unref(Primitive), vueExports.mergeProps({
          ref: vueExports.unref(forwardRef),
          "as-child": _ctx.asChild,
          as: _ctx.as
        }, _ctx.$attrs), {
          default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
          _: 3
        }, 16, ["as-child", "as"])]),
        _: 3
      }, 8, ["reference"]);
    };
  }
});
var ComboboxAnchor_default = ComboboxAnchor_vue_vue_type_script_setup_true_lang_default;
function queryCheckedElement(parentEl) {
  return parentEl?.querySelector("[data-state=checked]");
}
function valueComparator$1(value, currentValue, comparator) {
  if (value === void 0) return false;
  else if (Array.isArray(value)) return value.some((val) => compare$1(val, currentValue, comparator));
  else return compare$1(value, currentValue, comparator);
}
function compare$1(value, currentValue, comparator) {
  if (value === void 0 || currentValue === void 0) return false;
  if (typeof value === "string") return value === currentValue;
  if (typeof comparator === "function") return comparator(value, currentValue);
  if (typeof comparator === "string") return value?.[comparator] === currentValue?.[comparator];
  return isEqual(value, currentValue);
}
const [injectListboxRootContext, provideListboxRootContext] = createContext("ListboxRoot");
var ListboxRoot_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
  __name: "ListboxRoot",
  props: {
    modelValue: {
      type: null,
      required: false
    },
    defaultValue: {
      type: null,
      required: false
    },
    multiple: {
      type: Boolean,
      required: false
    },
    orientation: {
      type: String,
      required: false,
      default: "vertical"
    },
    dir: {
      type: String,
      required: false
    },
    disabled: {
      type: Boolean,
      required: false
    },
    selectionBehavior: {
      type: String,
      required: false,
      default: "toggle"
    },
    highlightOnHover: {
      type: Boolean,
      required: false
    },
    by: {
      type: [String, Function],
      required: false
    },
    asChild: {
      type: Boolean,
      required: false
    },
    as: {
      type: null,
      required: false
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
  emits: [
    "update:modelValue",
    "highlight",
    "entryFocus",
    "leave"
  ],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const { multiple, highlightOnHover, orientation, disabled, selectionBehavior, dir: propDir } = vueExports.toRefs(props);
    const { getItems } = useCollection({ isProvider: true });
    const { handleTypeaheadSearch } = useTypeahead();
    const { primitiveElement, currentElement } = usePrimitiveElement();
    const kbd = useKbd();
    const dir = useDirection(propDir);
    const isFormControl = useFormControl(currentElement);
    const firstValue = vueExports.ref();
    const isUserAction = vueExports.ref(false);
    const focusable = vueExports.ref(true);
    const modelValue = useVModel(props, "modelValue", emits, {
      defaultValue: props.defaultValue ?? (multiple.value ? [] : void 0),
      passive: props.modelValue === void 0,
      deep: true
    });
    function onValueChange(val) {
      isUserAction.value = true;
      if (props.multiple) {
        const modelArray = Array.isArray(modelValue.value) ? [...modelValue.value] : [];
        const index = modelArray.findIndex((i) => compare$1(i, val, props.by));
        if (props.selectionBehavior === "toggle") {
          index === -1 ? modelArray.push(val) : modelArray.splice(index, 1);
          modelValue.value = modelArray;
        } else {
          modelValue.value = [val];
          firstValue.value = val;
        }
      } else if (props.selectionBehavior === "toggle") if (compare$1(modelValue.value, val, props.by)) modelValue.value = void 0;
      else modelValue.value = val;
      else modelValue.value = val;
      setTimeout(() => {
        isUserAction.value = false;
      }, 1);
    }
    const highlightedElement = vueExports.ref(null);
    const previousElement = vueExports.ref(null);
    const isVirtual = vueExports.ref(false);
    const isComposing = vueExports.ref(false);
    const virtualFocusHook = createEventHook();
    const virtualKeydownHook = createEventHook();
    const virtualHighlightHook = createEventHook();
    function getCollectionItem() {
      return getItems().map((i) => i.ref).filter((i) => i.dataset.disabled !== "");
    }
    function changeHighlight(el, scrollIntoView = true) {
      if (!el) return;
      highlightedElement.value = el;
      if (focusable.value) highlightedElement.value.focus();
      if (scrollIntoView) highlightedElement.value.scrollIntoView({ block: "nearest" });
      const highlightedItem = getItems().find((i) => i.ref === el);
      emits("highlight", highlightedItem);
    }
    function highlightItem(value) {
      if (isVirtual.value) virtualHighlightHook.trigger(value);
      else {
        const item = getItems().find((i) => compare$1(i.value, value, props.by));
        if (item) {
          highlightedElement.value = item.ref;
          changeHighlight(item.ref);
        }
      }
    }
    function onKeydownEnter(event) {
      if (highlightedElement.value && highlightedElement.value.isConnected) {
        event.preventDefault();
        event.stopPropagation();
        if (!isComposing.value) highlightedElement.value.click();
      }
    }
    function onKeydownTypeAhead(event) {
      if (!focusable.value) return;
      isUserAction.value = true;
      if (isVirtual.value) virtualKeydownHook.trigger(event);
      else {
        const isMetaKey = event.altKey || event.ctrlKey || event.metaKey;
        if (isMetaKey && event.key === "a" && multiple.value) {
          const collection = getItems();
          const values = collection.map((i) => i.value);
          modelValue.value = [...values];
          event.preventDefault();
          changeHighlight(collection[collection.length - 1].ref);
        } else if (!isMetaKey) {
          const el = handleTypeaheadSearch(event.key, getItems());
          if (el) changeHighlight(el);
        }
      }
      setTimeout(() => {
        isUserAction.value = false;
      }, 1);
    }
    function onCompositionStart() {
      isComposing.value = true;
    }
    function onCompositionEnd() {
      vueExports.nextTick(() => {
        isComposing.value = false;
      });
    }
    function highlightFirstItem() {
      vueExports.nextTick(() => {
        const event = new KeyboardEvent("keydown", { key: "PageUp" });
        onKeydownNavigation(event);
      });
    }
    function onLeave(event) {
      const el = highlightedElement.value;
      if (el?.isConnected) previousElement.value = el;
      highlightedElement.value = null;
      emits("leave", event);
    }
    function onEnter(event) {
      const entryFocusEvent = new CustomEvent("listbox.entryFocus", {
        bubbles: false,
        cancelable: true
      });
      event.currentTarget?.dispatchEvent(entryFocusEvent);
      emits("entryFocus", entryFocusEvent);
      if (entryFocusEvent.defaultPrevented) return;
      if (previousElement.value) changeHighlight(previousElement.value);
      else {
        const el = getCollectionItem()?.[0];
        changeHighlight(el);
      }
    }
    function onKeydownNavigation(event) {
      const intent = getFocusIntent(event, orientation.value, dir.value);
      if (!intent) return;
      let collection = getCollectionItem();
      if (highlightedElement.value) {
        if (intent === "last") collection.reverse();
        else if (intent === "prev" || intent === "next") {
          if (intent === "prev") collection.reverse();
          const currentIndex = collection.indexOf(highlightedElement.value);
          collection = collection.slice(currentIndex + 1);
        }
        handleMultipleReplace(event, collection[0]);
      }
      if (collection.length) {
        const index = !highlightedElement.value && intent === "prev" ? collection.length - 1 : 0;
        changeHighlight(collection[index]);
      }
      if (isVirtual.value) return virtualKeydownHook.trigger(event);
    }
    function handleMultipleReplace(event, targetEl) {
      if (isVirtual.value || props.selectionBehavior !== "replace" || !multiple.value || !Array.isArray(modelValue.value)) return;
      const isMetaKey = event.altKey || event.ctrlKey || event.metaKey;
      if (isMetaKey && !event.shiftKey) return;
      if (event.shiftKey) {
        const collection = getItems().filter((i) => i.ref.dataset.disabled !== "");
        let lastValue = collection.find((i) => i.ref === targetEl)?.value;
        if (event.key === kbd.END) lastValue = collection[collection.length - 1].value;
        else if (event.key === kbd.HOME) lastValue = collection[0].value;
        if (!lastValue || !firstValue.value) return;
        const values = findValuesBetween(collection.map((i) => i.value), firstValue.value, lastValue);
        modelValue.value = values;
      }
    }
    async function highlightSelected(event) {
      await vueExports.nextTick();
      if (isVirtual.value) virtualFocusHook.trigger(event);
      else {
        const collection = getCollectionItem();
        const item = collection.find((i) => i.dataset.state === "checked");
        if (item) changeHighlight(item);
        else if (collection.length) changeHighlight(collection[0]);
      }
    }
    vueExports.watch(modelValue, () => {
      if (!isUserAction.value) vueExports.nextTick(() => {
        highlightSelected();
      });
    }, {
      immediate: true,
      deep: true
    });
    __expose({
      highlightedElement,
      highlightItem,
      highlightFirstItem,
      highlightSelected,
      getItems
    });
    provideListboxRootContext({
      modelValue,
      onValueChange,
      multiple,
      orientation,
      dir,
      disabled,
      highlightOnHover,
      highlightedElement,
      isVirtual,
      virtualFocusHook,
      virtualKeydownHook,
      virtualHighlightHook,
      by: props.by,
      firstValue,
      selectionBehavior,
      focusable,
      onLeave,
      onEnter,
      changeHighlight,
      onKeydownEnter,
      onKeydownNavigation,
      onKeydownTypeAhead,
      onCompositionStart,
      onCompositionEnd,
      highlightFirstItem
    });
    return (_ctx, _cache) => {
      return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(Primitive), {
        ref_key: "primitiveElement",
        ref: primitiveElement,
        as: _ctx.as,
        "as-child": _ctx.asChild,
        dir: vueExports.unref(dir),
        "data-disabled": vueExports.unref(disabled) ? "" : void 0,
        onPointerleave: onLeave,
        onFocusout: _cache[0] || (_cache[0] = async (event) => {
          const target = event.relatedTarget || event.target;
          await vueExports.nextTick();
          if (highlightedElement.value && vueExports.unref(currentElement) && !vueExports.unref(currentElement).contains(target)) onLeave(event);
        })
      }, {
        default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default", { modelValue: vueExports.unref(modelValue) }), vueExports.unref(isFormControl) && _ctx.name ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(VisuallyHiddenInput_default), {
          key: 0,
          name: _ctx.name,
          value: vueExports.unref(modelValue),
          disabled: vueExports.unref(disabled),
          required: _ctx.required
        }, null, 8, [
          "name",
          "value",
          "disabled",
          "required"
        ])) : vueExports.createCommentVNode("v-if", true)]),
        _: 3
      }, 8, [
        "as",
        "as-child",
        "dir",
        "data-disabled"
      ]);
    };
  }
});
var ListboxRoot_default = ListboxRoot_vue_vue_type_script_setup_true_lang_default;
var ListboxContent_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
  __name: "ListboxContent",
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
    const { CollectionSlot } = useCollection();
    const rootContext = injectListboxRootContext();
    const isClickFocus = refAutoReset(false, 10);
    return (_ctx, _cache) => {
      return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(CollectionSlot), null, {
        default: vueExports.withCtx(() => [vueExports.createVNode(vueExports.unref(Primitive), {
          role: "listbox",
          as: _ctx.as,
          "as-child": _ctx.asChild,
          tabindex: vueExports.unref(rootContext).focusable.value ? vueExports.unref(rootContext).highlightedElement.value ? "-1" : "0" : "-1",
          "aria-orientation": vueExports.unref(rootContext).orientation.value,
          "aria-multiselectable": !!vueExports.unref(rootContext).multiple.value,
          "data-orientation": vueExports.unref(rootContext).orientation.value,
          onMousedown: _cache[0] || (_cache[0] = vueExports.withModifiers(($event) => isClickFocus.value = true, ["left"])),
          onFocus: _cache[1] || (_cache[1] = (ev) => {
            if (vueExports.unref(isClickFocus)) return;
            vueExports.unref(rootContext).onEnter(ev);
          }),
          onKeydown: [
            _cache[2] || (_cache[2] = vueExports.withKeys((event) => {
              if (vueExports.unref(rootContext).orientation.value === "vertical" && (event.key === "ArrowLeft" || event.key === "ArrowRight") || vueExports.unref(rootContext).orientation.value === "horizontal" && (event.key === "ArrowUp" || event.key === "ArrowDown")) return;
              event.preventDefault();
              vueExports.unref(rootContext).focusable.value && vueExports.unref(rootContext).onKeydownNavigation(event);
            }, [
              "down",
              "up",
              "left",
              "right",
              "home",
              "end"
            ])),
            vueExports.withKeys(vueExports.unref(rootContext).onKeydownEnter, ["enter"]),
            vueExports.unref(rootContext).onKeydownTypeAhead
          ]
        }, {
          default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
          _: 3
        }, 8, [
          "as",
          "as-child",
          "tabindex",
          "aria-orientation",
          "aria-multiselectable",
          "data-orientation",
          "onKeydown"
        ])]),
        _: 3
      });
    };
  }
});
var ListboxContent_default = ListboxContent_vue_vue_type_script_setup_true_lang_default;
var ListboxFilter_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
  __name: "ListboxFilter",
  props: {
    modelValue: {
      type: String,
      required: false
    },
    autoFocus: {
      type: Boolean,
      required: false
    },
    disabled: {
      type: Boolean,
      required: false
    },
    asChild: {
      type: Boolean,
      required: false
    },
    as: {
      type: null,
      required: false,
      default: "input"
    }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const modelValue = useVModel(props, "modelValue", emits, {
      defaultValue: "",
      passive: props.modelValue === void 0
    });
    const rootContext = injectListboxRootContext();
    const { primitiveElement } = usePrimitiveElement();
    const disabled = vueExports.computed(() => props.disabled || rootContext.disabled.value || false);
    const activedescendant = vueExports.ref();
    vueExports.watchSyncEffect(() => activedescendant.value = rootContext.highlightedElement.value?.id);
    return (_ctx, _cache) => {
      return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(Primitive), {
        ref_key: "primitiveElement",
        ref: primitiveElement,
        as: _ctx.as,
        "as-child": _ctx.asChild,
        value: vueExports.unref(modelValue),
        disabled: disabled.value ? "" : void 0,
        "data-disabled": disabled.value ? "" : void 0,
        "aria-disabled": disabled.value ?? void 0,
        "aria-activedescendant": activedescendant.value,
        type: "text",
        onKeydown: [vueExports.withKeys(vueExports.withModifiers(vueExports.unref(rootContext).onKeydownNavigation, ["prevent"]), [
          "down",
          "up",
          "home",
          "end"
        ]), vueExports.withKeys(vueExports.unref(rootContext).onKeydownEnter, ["enter"])],
        onInput: _cache[0] || (_cache[0] = (event) => {
          modelValue.value = event.target.value;
          vueExports.unref(rootContext).highlightFirstItem();
        }),
        onCompositionstart: vueExports.unref(rootContext).onCompositionStart,
        onCompositionend: vueExports.unref(rootContext).onCompositionEnd
      }, {
        default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default", { modelValue: vueExports.unref(modelValue) })]),
        _: 3
      }, 8, [
        "as",
        "as-child",
        "value",
        "disabled",
        "data-disabled",
        "aria-disabled",
        "aria-activedescendant",
        "onKeydown",
        "onCompositionstart",
        "onCompositionend"
      ]);
    };
  }
});
var ListboxFilter_default = ListboxFilter_vue_vue_type_script_setup_true_lang_default;
const [injectListboxGroupContext, provideListboxGroupContext] = createContext("ListboxGroup");
var ListboxGroup_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
  __name: "ListboxGroup",
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
    const id = useId(void 0, "reka-listbox-group");
    provideListboxGroupContext({ id });
    return (_ctx, _cache) => {
      return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(Primitive), vueExports.mergeProps({ role: "group" }, props, { "aria-labelledby": vueExports.unref(id) }), {
        default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
        _: 3
      }, 16, ["aria-labelledby"]);
    };
  }
});
var ListboxGroup_default = ListboxGroup_vue_vue_type_script_setup_true_lang_default;
const LISTBOX_SELECT = "listbox.select";
const [injectListboxItemContext, provideListboxItemContext] = createContext("ListboxItem");
var ListboxItem_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
  __name: "ListboxItem",
  props: {
    value: {
      type: null,
      required: true
    },
    disabled: {
      type: Boolean,
      required: false
    },
    asChild: {
      type: Boolean,
      required: false
    },
    as: {
      type: null,
      required: false,
      default: "div"
    }
  },
  emits: ["select"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const id = useId(void 0, "reka-listbox-item");
    const { CollectionItem } = useCollection();
    const { forwardRef, currentElement } = useForwardExpose();
    const rootContext = injectListboxRootContext();
    const isHighlighted = vueExports.computed(() => currentElement.value === rootContext.highlightedElement.value);
    const isSelected = vueExports.computed(() => valueComparator$1(rootContext.modelValue.value, props.value, rootContext.by));
    const disabled = vueExports.computed(() => rootContext.disabled.value || props.disabled);
    async function handleSelect(ev) {
      emits("select", ev);
      if (ev?.defaultPrevented) return;
      if (!disabled.value && ev) {
        rootContext.onValueChange(props.value);
        rootContext.changeHighlight(currentElement.value);
      }
    }
    function handleSelectCustomEvent(ev) {
      const eventDetail = {
        originalEvent: ev,
        value: props.value
      };
      handleAndDispatchCustomEvent(LISTBOX_SELECT, handleSelect, eventDetail);
    }
    provideListboxItemContext({ isSelected });
    return (_ctx, _cache) => {
      return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(CollectionItem), { value: _ctx.value }, {
        default: vueExports.withCtx(() => [vueExports.withMemo([isHighlighted.value, isSelected.value], () => vueExports.createVNode(vueExports.unref(Primitive), vueExports.mergeProps({ id: vueExports.unref(id) }, _ctx.$attrs, {
          ref: vueExports.unref(forwardRef),
          role: "option",
          tabindex: vueExports.unref(rootContext).focusable.value ? isHighlighted.value ? "0" : "-1" : -1,
          "aria-selected": isSelected.value,
          as: _ctx.as,
          "as-child": _ctx.asChild,
          disabled: disabled.value ? "" : void 0,
          "data-disabled": disabled.value ? "" : void 0,
          "data-highlighted": isHighlighted.value ? "" : void 0,
          "data-state": isSelected.value ? "checked" : "unchecked",
          onClick: handleSelectCustomEvent,
          onKeydown: vueExports.withKeys(vueExports.withModifiers(handleSelectCustomEvent, ["prevent"]), ["space"]),
          onPointermove: _cache[0] || (_cache[0] = () => {
            if (vueExports.unref(rootContext).highlightedElement.value === vueExports.unref(currentElement)) return;
            if (vueExports.unref(rootContext).highlightOnHover.value && !vueExports.unref(rootContext).focusable.value) vueExports.unref(rootContext).changeHighlight(vueExports.unref(currentElement), false);
          })
        }), {
          default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
          _: 3
        }, 16, [
          "id",
          "tabindex",
          "aria-selected",
          "as",
          "as-child",
          "disabled",
          "data-disabled",
          "data-highlighted",
          "data-state",
          "onKeydown"
        ]), _cache, 1)]),
        _: 3
      }, 8, ["value"]);
    };
  }
});
var ListboxItem_default = ListboxItem_vue_vue_type_script_setup_true_lang_default;
var ListboxItemIndicator_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
  __name: "ListboxItemIndicator",
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
    const props = __props;
    useForwardExpose();
    const itemContext = injectListboxItemContext();
    return (_ctx, _cache) => {
      return vueExports.unref(itemContext).isSelected.value ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(Primitive), vueExports.mergeProps({
        key: 0,
        "aria-hidden": "true"
      }, props), {
        default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
        _: 3
      }, 16)) : vueExports.createCommentVNode("v-if", true);
    };
  }
});
var ListboxItemIndicator_default = ListboxItemIndicator_vue_vue_type_script_setup_true_lang_default;
function memo(getDeps, fn, opts) {
  let deps = opts.initialDeps ?? [];
  let result;
  let isInitial = true;
  function memoizedFunction() {
    var _a, _b, _c;
    let depTime;
    if (opts.key && ((_a = opts.debug) == null ? void 0 : _a.call(opts))) depTime = Date.now();
    const newDeps = getDeps();
    const depsChanged = newDeps.length !== deps.length || newDeps.some((dep, index) => deps[index] !== dep);
    if (!depsChanged) {
      return result;
    }
    deps = newDeps;
    let resultTime;
    if (opts.key && ((_b = opts.debug) == null ? void 0 : _b.call(opts))) resultTime = Date.now();
    result = fn(...newDeps);
    if (opts.key && ((_c = opts.debug) == null ? void 0 : _c.call(opts))) {
      const depEndTime = Math.round((Date.now() - depTime) * 100) / 100;
      const resultEndTime = Math.round((Date.now() - resultTime) * 100) / 100;
      const resultFpsPercentage = resultEndTime / 16;
      const pad = (str, num) => {
        str = String(str);
        while (str.length < num) {
          str = " " + str;
        }
        return str;
      };
      console.info(
        `%c⏱ ${pad(resultEndTime, 5)} /${pad(depEndTime, 5)} ms`,
        `
            font-size: .6rem;
            font-weight: bold;
            color: hsl(${Math.max(
          0,
          Math.min(120 - 120 * resultFpsPercentage, 120)
        )}deg 100% 31%);`,
        opts == null ? void 0 : opts.key
      );
    }
    if ((opts == null ? void 0 : opts.onChange) && !(isInitial && opts.skipInitialOnChange)) {
      opts.onChange(result);
    }
    isInitial = false;
    return result;
  }
  memoizedFunction.updateDeps = (newDeps) => {
    deps = newDeps;
  };
  return memoizedFunction;
}
function notUndefined(value, msg) {
  if (value === void 0) {
    throw new Error(`Unexpected undefined${""}`);
  } else {
    return value;
  }
}
const approxEqual = (a, b) => Math.abs(a - b) < 1.01;
const debounce = (targetWindow, fn, ms) => {
  let timeoutId;
  return function(...args) {
    targetWindow.clearTimeout(timeoutId);
    timeoutId = targetWindow.setTimeout(() => fn.apply(this, args), ms);
  };
};
const getRect = (element) => {
  const { offsetWidth, offsetHeight } = element;
  return { width: offsetWidth, height: offsetHeight };
};
const defaultKeyExtractor = (index) => index;
const defaultRangeExtractor = (range) => {
  const start = Math.max(range.startIndex - range.overscan, 0);
  const end = Math.min(range.endIndex + range.overscan, range.count - 1);
  const arr = [];
  for (let i = start; i <= end; i++) {
    arr.push(i);
  }
  return arr;
};
const observeElementRect = (instance, cb) => {
  const element = instance.scrollElement;
  if (!element) {
    return;
  }
  const targetWindow = instance.targetWindow;
  if (!targetWindow) {
    return;
  }
  const handler = (rect) => {
    const { width, height } = rect;
    cb({ width: Math.round(width), height: Math.round(height) });
  };
  handler(getRect(element));
  if (!targetWindow.ResizeObserver) {
    return () => {
    };
  }
  const observer = new targetWindow.ResizeObserver((entries) => {
    const run = () => {
      const entry = entries[0];
      if (entry == null ? void 0 : entry.borderBoxSize) {
        const box = entry.borderBoxSize[0];
        if (box) {
          handler({ width: box.inlineSize, height: box.blockSize });
          return;
        }
      }
      handler(getRect(element));
    };
    instance.options.useAnimationFrameWithResizeObserver ? requestAnimationFrame(run) : run();
  });
  observer.observe(element, { box: "border-box" });
  return () => {
    observer.unobserve(element);
  };
};
const addEventListenerOptions = {
  passive: true
};
const supportsScrollend = true;
const observeElementOffset = (instance, cb) => {
  const element = instance.scrollElement;
  if (!element) {
    return;
  }
  const targetWindow = instance.targetWindow;
  if (!targetWindow) {
    return;
  }
  let offset = 0;
  const fallback = instance.options.useScrollendEvent && supportsScrollend ? () => void 0 : debounce(
    targetWindow,
    () => {
      cb(offset, false);
    },
    instance.options.isScrollingResetDelay
  );
  const createHandler = (isScrolling) => () => {
    const { horizontal, isRtl } = instance.options;
    offset = horizontal ? element["scrollLeft"] * (isRtl && -1 || 1) : element["scrollTop"];
    fallback();
    cb(offset, isScrolling);
  };
  const handler = createHandler(true);
  const endHandler = createHandler(false);
  endHandler();
  element.addEventListener("scroll", handler, addEventListenerOptions);
  const registerScrollendEvent = instance.options.useScrollendEvent && supportsScrollend;
  if (registerScrollendEvent) {
    element.addEventListener("scrollend", endHandler, addEventListenerOptions);
  }
  return () => {
    element.removeEventListener("scroll", handler);
    if (registerScrollendEvent) {
      element.removeEventListener("scrollend", endHandler);
    }
  };
};
const measureElement = (element, entry, instance) => {
  if (entry == null ? void 0 : entry.borderBoxSize) {
    const box = entry.borderBoxSize[0];
    if (box) {
      const size = Math.round(
        box[instance.options.horizontal ? "inlineSize" : "blockSize"]
      );
      return size;
    }
  }
  return element[instance.options.horizontal ? "offsetWidth" : "offsetHeight"];
};
const elementScroll = (offset, {
  adjustments = 0,
  behavior
}, instance) => {
  var _a, _b;
  const toOffset = offset + adjustments;
  (_b = (_a = instance.scrollElement) == null ? void 0 : _a.scrollTo) == null ? void 0 : _b.call(_a, {
    [instance.options.horizontal ? "left" : "top"]: toOffset,
    behavior
  });
};
class Virtualizer {
  constructor(opts) {
    this.unsubs = [];
    this.scrollElement = null;
    this.targetWindow = null;
    this.isScrolling = false;
    this.measurementsCache = [];
    this.itemSizeCache = /* @__PURE__ */ new Map();
    this.laneAssignments = /* @__PURE__ */ new Map();
    this.pendingMeasuredCacheIndexes = [];
    this.prevLanes = void 0;
    this.lanesChangedFlag = false;
    this.lanesSettling = false;
    this.scrollRect = null;
    this.scrollOffset = null;
    this.scrollDirection = null;
    this.scrollAdjustments = 0;
    this.elementsCache = /* @__PURE__ */ new Map();
    this.observer = /* @__PURE__ */ (() => {
      let _ro = null;
      const get2 = () => {
        if (_ro) {
          return _ro;
        }
        if (!this.targetWindow || !this.targetWindow.ResizeObserver) {
          return null;
        }
        return _ro = new this.targetWindow.ResizeObserver((entries) => {
          entries.forEach((entry) => {
            const run = () => {
              this._measureElement(entry.target, entry);
            };
            this.options.useAnimationFrameWithResizeObserver ? requestAnimationFrame(run) : run();
          });
        });
      };
      return {
        disconnect: () => {
          var _a;
          (_a = get2()) == null ? void 0 : _a.disconnect();
          _ro = null;
        },
        observe: (target) => {
          var _a;
          return (_a = get2()) == null ? void 0 : _a.observe(target, { box: "border-box" });
        },
        unobserve: (target) => {
          var _a;
          return (_a = get2()) == null ? void 0 : _a.unobserve(target);
        }
      };
    })();
    this.range = null;
    this.setOptions = (opts2) => {
      Object.entries(opts2).forEach(([key, value]) => {
        if (typeof value === "undefined") delete opts2[key];
      });
      this.options = {
        debug: false,
        initialOffset: 0,
        overscan: 1,
        paddingStart: 0,
        paddingEnd: 0,
        scrollPaddingStart: 0,
        scrollPaddingEnd: 0,
        horizontal: false,
        getItemKey: defaultKeyExtractor,
        rangeExtractor: defaultRangeExtractor,
        onChange: () => {
        },
        measureElement,
        initialRect: { width: 0, height: 0 },
        scrollMargin: 0,
        gap: 0,
        indexAttribute: "data-index",
        initialMeasurementsCache: [],
        lanes: 1,
        isScrollingResetDelay: 150,
        enabled: true,
        isRtl: false,
        useScrollendEvent: false,
        useAnimationFrameWithResizeObserver: false,
        ...opts2
      };
    };
    this.notify = (sync) => {
      var _a, _b;
      (_b = (_a = this.options).onChange) == null ? void 0 : _b.call(_a, this, sync);
    };
    this.maybeNotify = memo(
      () => {
        this.calculateRange();
        return [
          this.isScrolling,
          this.range ? this.range.startIndex : null,
          this.range ? this.range.endIndex : null
        ];
      },
      (isScrolling) => {
        this.notify(isScrolling);
      },
      {
        key: "production" !== "production",
        debug: () => this.options.debug,
        initialDeps: [
          this.isScrolling,
          this.range ? this.range.startIndex : null,
          this.range ? this.range.endIndex : null
        ]
      }
    );
    this.cleanup = () => {
      this.unsubs.filter(Boolean).forEach((d) => d());
      this.unsubs = [];
      this.observer.disconnect();
      this.scrollElement = null;
      this.targetWindow = null;
    };
    this._didMount = () => {
      return () => {
        this.cleanup();
      };
    };
    this._willUpdate = () => {
      var _a;
      const scrollElement = this.options.enabled ? this.options.getScrollElement() : null;
      if (this.scrollElement !== scrollElement) {
        this.cleanup();
        if (!scrollElement) {
          this.maybeNotify();
          return;
        }
        this.scrollElement = scrollElement;
        if (this.scrollElement && "ownerDocument" in this.scrollElement) {
          this.targetWindow = this.scrollElement.ownerDocument.defaultView;
        } else {
          this.targetWindow = ((_a = this.scrollElement) == null ? void 0 : _a.window) ?? null;
        }
        this.elementsCache.forEach((cached) => {
          this.observer.observe(cached);
        });
        this._scrollToOffset(this.getScrollOffset(), {
          adjustments: void 0,
          behavior: void 0
        });
        this.unsubs.push(
          this.options.observeElementRect(this, (rect) => {
            this.scrollRect = rect;
            this.maybeNotify();
          })
        );
        this.unsubs.push(
          this.options.observeElementOffset(this, (offset, isScrolling) => {
            this.scrollAdjustments = 0;
            this.scrollDirection = isScrolling ? this.getScrollOffset() < offset ? "forward" : "backward" : null;
            this.scrollOffset = offset;
            this.isScrolling = isScrolling;
            this.maybeNotify();
          })
        );
      }
    };
    this.getSize = () => {
      if (!this.options.enabled) {
        this.scrollRect = null;
        return 0;
      }
      this.scrollRect = this.scrollRect ?? this.options.initialRect;
      return this.scrollRect[this.options.horizontal ? "width" : "height"];
    };
    this.getScrollOffset = () => {
      if (!this.options.enabled) {
        this.scrollOffset = null;
        return 0;
      }
      this.scrollOffset = this.scrollOffset ?? (typeof this.options.initialOffset === "function" ? this.options.initialOffset() : this.options.initialOffset);
      return this.scrollOffset;
    };
    this.getFurthestMeasurement = (measurements, index) => {
      const furthestMeasurementsFound = /* @__PURE__ */ new Map();
      const furthestMeasurements = /* @__PURE__ */ new Map();
      for (let m = index - 1; m >= 0; m--) {
        const measurement = measurements[m];
        if (furthestMeasurementsFound.has(measurement.lane)) {
          continue;
        }
        const previousFurthestMeasurement = furthestMeasurements.get(
          measurement.lane
        );
        if (previousFurthestMeasurement == null || measurement.end > previousFurthestMeasurement.end) {
          furthestMeasurements.set(measurement.lane, measurement);
        } else if (measurement.end < previousFurthestMeasurement.end) {
          furthestMeasurementsFound.set(measurement.lane, true);
        }
        if (furthestMeasurementsFound.size === this.options.lanes) {
          break;
        }
      }
      return furthestMeasurements.size === this.options.lanes ? Array.from(furthestMeasurements.values()).sort((a, b) => {
        if (a.end === b.end) {
          return a.index - b.index;
        }
        return a.end - b.end;
      })[0] : void 0;
    };
    this.getMeasurementOptions = memo(
      () => [
        this.options.count,
        this.options.paddingStart,
        this.options.scrollMargin,
        this.options.getItemKey,
        this.options.enabled,
        this.options.lanes
      ],
      (count, paddingStart, scrollMargin, getItemKey, enabled, lanes) => {
        const lanesChanged = this.prevLanes !== void 0 && this.prevLanes !== lanes;
        if (lanesChanged) {
          this.lanesChangedFlag = true;
        }
        this.prevLanes = lanes;
        this.pendingMeasuredCacheIndexes = [];
        return {
          count,
          paddingStart,
          scrollMargin,
          getItemKey,
          enabled,
          lanes
        };
      },
      {
        key: false,
        skipInitialOnChange: true,
        onChange: () => {
          this.notify(this.isScrolling);
        }
      }
    );
    this.getMeasurements = memo(
      () => [this.getMeasurementOptions(), this.itemSizeCache],
      ({ count, paddingStart, scrollMargin, getItemKey, enabled, lanes }, itemSizeCache) => {
        if (!enabled) {
          this.measurementsCache = [];
          this.itemSizeCache.clear();
          this.laneAssignments.clear();
          return [];
        }
        if (this.laneAssignments.size > count) {
          for (const index of this.laneAssignments.keys()) {
            if (index >= count) {
              this.laneAssignments.delete(index);
            }
          }
        }
        if (this.lanesChangedFlag) {
          this.lanesChangedFlag = false;
          this.lanesSettling = true;
          this.measurementsCache = [];
          this.itemSizeCache.clear();
          this.laneAssignments.clear();
          this.pendingMeasuredCacheIndexes = [];
        }
        if (this.measurementsCache.length === 0) {
          this.measurementsCache = this.options.initialMeasurementsCache;
          this.measurementsCache.forEach((item) => {
            this.itemSizeCache.set(item.key, item.size);
          });
        }
        const min = this.lanesSettling ? 0 : this.pendingMeasuredCacheIndexes.length > 0 ? Math.min(...this.pendingMeasuredCacheIndexes) : 0;
        this.pendingMeasuredCacheIndexes = [];
        if (this.lanesSettling && this.measurementsCache.length === count) {
          this.lanesSettling = false;
        }
        const measurements = this.measurementsCache.slice(0, min);
        const laneLastIndex = new Array(lanes).fill(
          void 0
        );
        for (let m = 0; m < min; m++) {
          const item = measurements[m];
          if (item) {
            laneLastIndex[item.lane] = m;
          }
        }
        for (let i = min; i < count; i++) {
          const key = getItemKey(i);
          const cachedLane = this.laneAssignments.get(i);
          let lane;
          let start;
          if (cachedLane !== void 0 && this.options.lanes > 1) {
            lane = cachedLane;
            const prevIndex = laneLastIndex[lane];
            const prevInLane = prevIndex !== void 0 ? measurements[prevIndex] : void 0;
            start = prevInLane ? prevInLane.end + this.options.gap : paddingStart + scrollMargin;
          } else {
            const furthestMeasurement = this.options.lanes === 1 ? measurements[i - 1] : this.getFurthestMeasurement(measurements, i);
            start = furthestMeasurement ? furthestMeasurement.end + this.options.gap : paddingStart + scrollMargin;
            lane = furthestMeasurement ? furthestMeasurement.lane : i % this.options.lanes;
            if (this.options.lanes > 1) {
              this.laneAssignments.set(i, lane);
            }
          }
          const measuredSize = itemSizeCache.get(key);
          const size = typeof measuredSize === "number" ? measuredSize : this.options.estimateSize(i);
          const end = start + size;
          measurements[i] = {
            index: i,
            start,
            size,
            end,
            key,
            lane
          };
          laneLastIndex[lane] = i;
        }
        this.measurementsCache = measurements;
        return measurements;
      },
      {
        key: "production" !== "production",
        debug: () => this.options.debug
      }
    );
    this.calculateRange = memo(
      () => [
        this.getMeasurements(),
        this.getSize(),
        this.getScrollOffset(),
        this.options.lanes
      ],
      (measurements, outerSize, scrollOffset, lanes) => {
        return this.range = measurements.length > 0 && outerSize > 0 ? calculateRange({
          measurements,
          outerSize,
          scrollOffset,
          lanes
        }) : null;
      },
      {
        key: "production" !== "production",
        debug: () => this.options.debug
      }
    );
    this.getVirtualIndexes = memo(
      () => {
        let startIndex = null;
        let endIndex = null;
        const range = this.calculateRange();
        if (range) {
          startIndex = range.startIndex;
          endIndex = range.endIndex;
        }
        this.maybeNotify.updateDeps([this.isScrolling, startIndex, endIndex]);
        return [
          this.options.rangeExtractor,
          this.options.overscan,
          this.options.count,
          startIndex,
          endIndex
        ];
      },
      (rangeExtractor, overscan, count, startIndex, endIndex) => {
        return startIndex === null || endIndex === null ? [] : rangeExtractor({
          startIndex,
          endIndex,
          overscan,
          count
        });
      },
      {
        key: "production" !== "production",
        debug: () => this.options.debug
      }
    );
    this.indexFromElement = (node) => {
      const attributeName = this.options.indexAttribute;
      const indexStr = node.getAttribute(attributeName);
      if (!indexStr) {
        console.warn(
          `Missing attribute name '${attributeName}={index}' on measured element.`
        );
        return -1;
      }
      return parseInt(indexStr, 10);
    };
    this._measureElement = (node, entry) => {
      const index = this.indexFromElement(node);
      const item = this.measurementsCache[index];
      if (!item) {
        return;
      }
      const key = item.key;
      const prevNode = this.elementsCache.get(key);
      if (prevNode !== node) {
        if (prevNode) {
          this.observer.unobserve(prevNode);
        }
        this.observer.observe(node);
        this.elementsCache.set(key, node);
      }
      if (node.isConnected) {
        this.resizeItem(index, this.options.measureElement(node, entry, this));
      }
    };
    this.resizeItem = (index, size) => {
      const item = this.measurementsCache[index];
      if (!item) {
        return;
      }
      const itemSize = this.itemSizeCache.get(item.key) ?? item.size;
      const delta = size - itemSize;
      if (delta !== 0) {
        if (this.shouldAdjustScrollPositionOnItemSizeChange !== void 0 ? this.shouldAdjustScrollPositionOnItemSizeChange(item, delta, this) : item.start < this.getScrollOffset() + this.scrollAdjustments) {
          this._scrollToOffset(this.getScrollOffset(), {
            adjustments: this.scrollAdjustments += delta,
            behavior: void 0
          });
        }
        this.pendingMeasuredCacheIndexes.push(item.index);
        this.itemSizeCache = new Map(this.itemSizeCache.set(item.key, size));
        this.notify(false);
      }
    };
    this.measureElement = (node) => {
      if (!node) {
        this.elementsCache.forEach((cached, key) => {
          if (!cached.isConnected) {
            this.observer.unobserve(cached);
            this.elementsCache.delete(key);
          }
        });
        return;
      }
      this._measureElement(node, void 0);
    };
    this.getVirtualItems = memo(
      () => [this.getVirtualIndexes(), this.getMeasurements()],
      (indexes, measurements) => {
        const virtualItems = [];
        for (let k = 0, len = indexes.length; k < len; k++) {
          const i = indexes[k];
          const measurement = measurements[i];
          virtualItems.push(measurement);
        }
        return virtualItems;
      },
      {
        key: "production" !== "production",
        debug: () => this.options.debug
      }
    );
    this.getVirtualItemForOffset = (offset) => {
      const measurements = this.getMeasurements();
      if (measurements.length === 0) {
        return void 0;
      }
      return notUndefined(
        measurements[findNearestBinarySearch(
          0,
          measurements.length - 1,
          (index) => notUndefined(measurements[index]).start,
          offset
        )]
      );
    };
    this.getOffsetForAlignment = (toOffset, align, itemSize = 0) => {
      const size = this.getSize();
      const scrollOffset = this.getScrollOffset();
      if (align === "auto") {
        align = toOffset >= scrollOffset + size ? "end" : "start";
      }
      if (align === "center") {
        toOffset += (itemSize - size) / 2;
      } else if (align === "end") {
        toOffset -= size;
      }
      const maxOffset = this.getTotalSize() + this.options.scrollMargin - size;
      return Math.max(Math.min(maxOffset, toOffset), 0);
    };
    this.getOffsetForIndex = (index, align = "auto") => {
      index = Math.max(0, Math.min(index, this.options.count - 1));
      const item = this.measurementsCache[index];
      if (!item) {
        return void 0;
      }
      const size = this.getSize();
      const scrollOffset = this.getScrollOffset();
      if (align === "auto") {
        if (item.end >= scrollOffset + size - this.options.scrollPaddingEnd) {
          align = "end";
        } else if (item.start <= scrollOffset + this.options.scrollPaddingStart) {
          align = "start";
        } else {
          return [scrollOffset, align];
        }
      }
      const toOffset = align === "end" ? item.end + this.options.scrollPaddingEnd : item.start - this.options.scrollPaddingStart;
      return [
        this.getOffsetForAlignment(toOffset, align, item.size),
        align
      ];
    };
    this.isDynamicMode = () => this.elementsCache.size > 0;
    this.scrollToOffset = (toOffset, { align = "start", behavior } = {}) => {
      if (behavior === "smooth" && this.isDynamicMode()) {
        console.warn(
          "The `smooth` scroll behavior is not fully supported with dynamic size."
        );
      }
      this._scrollToOffset(this.getOffsetForAlignment(toOffset, align), {
        adjustments: void 0,
        behavior
      });
    };
    this.scrollToIndex = (index, { align: initialAlign = "auto", behavior } = {}) => {
      if (behavior === "smooth" && this.isDynamicMode()) {
        console.warn(
          "The `smooth` scroll behavior is not fully supported with dynamic size."
        );
      }
      index = Math.max(0, Math.min(index, this.options.count - 1));
      let attempts = 0;
      const maxAttempts = 10;
      const tryScroll = (currentAlign) => {
        if (!this.targetWindow) return;
        const offsetInfo = this.getOffsetForIndex(index, currentAlign);
        if (!offsetInfo) {
          console.warn("Failed to get offset for index:", index);
          return;
        }
        const [offset, align] = offsetInfo;
        this._scrollToOffset(offset, { adjustments: void 0, behavior });
        this.targetWindow.requestAnimationFrame(() => {
          const currentOffset = this.getScrollOffset();
          const afterInfo = this.getOffsetForIndex(index, align);
          if (!afterInfo) {
            console.warn("Failed to get offset for index:", index);
            return;
          }
          if (!approxEqual(afterInfo[0], currentOffset)) {
            scheduleRetry(align);
          }
        });
      };
      const scheduleRetry = (align) => {
        if (!this.targetWindow) return;
        attempts++;
        if (attempts < maxAttempts) {
          this.targetWindow.requestAnimationFrame(() => tryScroll(align));
        } else {
          console.warn(
            `Failed to scroll to index ${index} after ${maxAttempts} attempts.`
          );
        }
      };
      tryScroll(initialAlign);
    };
    this.scrollBy = (delta, { behavior } = {}) => {
      if (behavior === "smooth" && this.isDynamicMode()) {
        console.warn(
          "The `smooth` scroll behavior is not fully supported with dynamic size."
        );
      }
      this._scrollToOffset(this.getScrollOffset() + delta, {
        adjustments: void 0,
        behavior
      });
    };
    this.getTotalSize = () => {
      var _a;
      const measurements = this.getMeasurements();
      let end;
      if (measurements.length === 0) {
        end = this.options.paddingStart;
      } else if (this.options.lanes === 1) {
        end = ((_a = measurements[measurements.length - 1]) == null ? void 0 : _a.end) ?? 0;
      } else {
        const endByLane = Array(this.options.lanes).fill(null);
        let endIndex = measurements.length - 1;
        while (endIndex >= 0 && endByLane.some((val) => val === null)) {
          const item = measurements[endIndex];
          if (endByLane[item.lane] === null) {
            endByLane[item.lane] = item.end;
          }
          endIndex--;
        }
        end = Math.max(...endByLane.filter((val) => val !== null));
      }
      return Math.max(
        end - this.options.scrollMargin + this.options.paddingEnd,
        0
      );
    };
    this._scrollToOffset = (offset, {
      adjustments,
      behavior
    }) => {
      this.options.scrollToFn(offset, { behavior, adjustments }, this);
    };
    this.measure = () => {
      this.itemSizeCache = /* @__PURE__ */ new Map();
      this.laneAssignments = /* @__PURE__ */ new Map();
      this.notify(false);
    };
    this.setOptions(opts);
  }
}
const findNearestBinarySearch = (low, high, getCurrentValue, value) => {
  while (low <= high) {
    const middle = (low + high) / 2 | 0;
    const currentValue = getCurrentValue(middle);
    if (currentValue < value) {
      low = middle + 1;
    } else if (currentValue > value) {
      high = middle - 1;
    } else {
      return middle;
    }
  }
  if (low > 0) {
    return low - 1;
  } else {
    return 0;
  }
};
function calculateRange({
  measurements,
  outerSize,
  scrollOffset,
  lanes
}) {
  const lastIndex = measurements.length - 1;
  const getOffset = (index) => measurements[index].start;
  if (measurements.length <= lanes) {
    return {
      startIndex: 0,
      endIndex: lastIndex
    };
  }
  let startIndex = findNearestBinarySearch(
    0,
    lastIndex,
    getOffset,
    scrollOffset
  );
  let endIndex = startIndex;
  if (lanes === 1) {
    while (endIndex < lastIndex && measurements[endIndex].end < scrollOffset + outerSize) {
      endIndex++;
    }
  } else if (lanes > 1) {
    const endPerLane = Array(lanes).fill(0);
    while (endIndex < lastIndex && endPerLane.some((pos) => pos < scrollOffset + outerSize)) {
      const item = measurements[endIndex];
      endPerLane[item.lane] = item.end;
      endIndex++;
    }
    const startPerLane = Array(lanes).fill(scrollOffset + outerSize);
    while (startIndex >= 0 && startPerLane.some((pos) => pos >= scrollOffset)) {
      const item = measurements[startIndex];
      startPerLane[item.lane] = item.start;
      startIndex--;
    }
    startIndex = Math.max(0, startIndex - startIndex % lanes);
    endIndex = Math.min(lastIndex, endIndex + (lanes - 1 - endIndex % lanes));
  }
  return { startIndex, endIndex };
}
function useVirtualizerBase(options) {
  const virtualizer = new Virtualizer(vueExports.unref(options));
  const state = vueExports.shallowRef(virtualizer);
  const cleanup = virtualizer._didMount();
  vueExports.watch(
    () => vueExports.unref(options).getScrollElement(),
    (el) => {
      if (el) {
        virtualizer._willUpdate();
      }
    },
    {
      immediate: true
    }
  );
  vueExports.watch(
    () => vueExports.unref(options),
    (options2) => {
      virtualizer.setOptions({
        ...options2,
        onChange: (instance, sync) => {
          var _a;
          vueExports.triggerRef(state);
          (_a = options2.onChange) == null ? void 0 : _a.call(options2, instance, sync);
        }
      });
      virtualizer._willUpdate();
      vueExports.triggerRef(state);
    },
    {
      immediate: true
    }
  );
  vueExports.onScopeDispose(cleanup);
  return state;
}
function useVirtualizer(options) {
  return useVirtualizerBase(
    vueExports.computed(() => ({
      observeElementRect,
      observeElementOffset,
      scrollToFn: elementScroll,
      ...vueExports.unref(options)
    }))
  );
}
var ListboxVirtualizer_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
  __name: "ListboxVirtualizer",
  props: {
    options: {
      type: Array,
      required: true
    },
    overscan: {
      type: Number,
      required: false
    },
    estimateSize: {
      type: Number,
      required: false
    },
    textContent: {
      type: Function,
      required: false
    }
  },
  setup(__props) {
    const props = __props;
    const slots = vueExports.useSlots();
    const rootContext = injectListboxRootContext();
    const parentEl = useParentElement();
    const { getItems } = useCollection();
    rootContext.isVirtual.value = true;
    const padding = vueExports.computed(() => {
      const el = parentEl.value;
      if (!el) return {
        start: 0,
        end: 0
      };
      else {
        const styles = (void 0).getComputedStyle(el);
        return {
          start: Number.parseFloat(styles.paddingBlockStart || styles.paddingTop),
          end: Number.parseFloat(styles.paddingBlockEnd || styles.paddingBottom)
        };
      }
    });
    const virtualizer = useVirtualizer({
      get scrollPaddingStart() {
        return padding.value.start;
      },
      get scrollPaddingEnd() {
        return padding.value.end;
      },
      get count() {
        return props.options.length;
      },
      get horizontal() {
        return rootContext.orientation.value === "horizontal";
      },
      estimateSize() {
        return props.estimateSize ?? 28;
      },
      getScrollElement() {
        return parentEl.value;
      },
      overscan: props.overscan ?? 12
    });
    const virtualizedItems = vueExports.computed(() => virtualizer.value.getVirtualItems().map((item) => {
      const defaultNode = slots.default({
        option: props.options[item.index],
        virtualizer: virtualizer.value,
        virtualItem: item
      })[0];
      const targetNode = defaultNode.type === vueExports.Fragment && Array.isArray(defaultNode.children) ? defaultNode.children[0] : defaultNode;
      return {
        item,
        is: vueExports.cloneVNode(targetNode, {
          "key": `${item.key}`,
          "data-index": item.index,
          "aria-setsize": props.options.length,
          "aria-posinset": item.index + 1,
          "style": {
            position: "absolute",
            top: 0,
            left: 0,
            transform: `translateY(${item.start}px)`,
            overflowAnchor: "none"
          }
        })
      };
    }));
    rootContext.virtualFocusHook.on((event) => {
      const index = props.options.findIndex((option) => {
        if (Array.isArray(rootContext.modelValue.value)) return compare$1(option, rootContext.modelValue.value[0], rootContext.by);
        else return compare$1(option, rootContext.modelValue.value, rootContext.by);
      });
      if (index !== -1) {
        event?.preventDefault();
        virtualizer.value.scrollToIndex(index, { align: "start" });
        requestAnimationFrame(() => {
          const item = queryCheckedElement(parentEl.value);
          if (item) {
            rootContext.changeHighlight(item);
            if (event) item?.focus();
          }
        });
      } else rootContext.highlightFirstItem();
    });
    rootContext.virtualHighlightHook.on((value) => {
      const index = props.options.findIndex((option) => {
        return compare$1(option, value, rootContext.by);
      });
      virtualizer.value.scrollToIndex(index, { align: "start" });
      requestAnimationFrame(() => {
        const item = queryCheckedElement(parentEl.value);
        if (item) rootContext.changeHighlight(item);
      });
    });
    const search = refAutoReset("", 1e3);
    const optionsWithMetadata = vueExports.computed(() => {
      const parseTextContent = (option) => {
        if (props.textContent) return props.textContent(option);
        else return option?.toString().toLowerCase();
      };
      return props.options.map((option, index) => ({
        index,
        textContent: parseTextContent(option)
      }));
    });
    function handleMultipleReplace(event, intent) {
      if (!rootContext.firstValue?.value || !rootContext.multiple.value || !Array.isArray(rootContext.modelValue.value)) return;
      const collection = getItems().filter((i) => i.ref.dataset.disabled !== "");
      const lastValue = collection.find((i) => i.ref === rootContext.highlightedElement.value)?.value;
      if (!lastValue) return;
      let value = null;
      switch (intent) {
        case "prev":
        case "next": {
          value = findValuesBetween(props.options, rootContext.firstValue.value, lastValue);
          break;
        }
        case "first": {
          value = findValuesBetween(props.options, rootContext.firstValue.value, props.options?.[0]);
          break;
        }
        case "last": {
          value = findValuesBetween(props.options, rootContext.firstValue.value, props.options?.[props.options.length - 1]);
          break;
        }
      }
      rootContext.modelValue.value = value;
    }
    rootContext.virtualKeydownHook.on((event) => {
      const isMetaKey = event.altKey || event.ctrlKey || event.metaKey;
      const isTabKey = event.key === "Tab" && !isMetaKey;
      if (isTabKey) return;
      let intent = MAP_KEY_TO_FOCUS_INTENT[event.key];
      if (isMetaKey && event.key === "a" && rootContext.multiple.value) {
        event.preventDefault();
        rootContext.modelValue.value = [...props.options];
        intent = "last";
      } else if (event.shiftKey && intent) handleMultipleReplace(event, intent);
      if (["first", "last"].includes(intent)) {
        event.preventDefault();
        const index = intent === "first" ? 0 : props.options.length - 1;
        virtualizer.value.scrollToIndex(index);
        requestAnimationFrame(() => {
          const items = getItems();
          const item = intent === "first" ? items[0] : items[items.length - 1];
          if (item) rootContext.changeHighlight(item.ref);
        });
      } else if (!intent && !isMetaKey) {
        search.value += event.key;
        const currentIndex = Number(getActiveElement()?.getAttribute("data-index"));
        const currentMatch = optionsWithMetadata.value[currentIndex].textContent;
        const filteredOptions = optionsWithMetadata.value.map((i) => i.textContent ?? "");
        const next = getNextMatch(filteredOptions, search.value, currentMatch);
        const nextMatch = optionsWithMetadata.value.find((option) => option.textContent === next);
        if (nextMatch) {
          virtualizer.value.scrollToIndex(nextMatch.index, { align: "start" });
          requestAnimationFrame(() => {
            const item = parentEl.value.querySelector(`[data-index="${nextMatch.index}"]`);
            if (item instanceof HTMLElement) rootContext.changeHighlight(item);
          });
        }
      }
    });
    return (_ctx, _cache) => {
      return vueExports.openBlock(), vueExports.createElementBlock("div", {
        "data-reka-virtualizer": "",
        style: vueExports.normalizeStyle({
          position: "relative",
          width: "100%",
          height: `${vueExports.unref(virtualizer).getTotalSize()}px`
        })
      }, [(vueExports.openBlock(true), vueExports.createElementBlock(vueExports.Fragment, null, vueExports.renderList(virtualizedItems.value, ({ is, item }) => {
        return vueExports.openBlock(), vueExports.createBlock(vueExports.resolveDynamicComponent(is), { key: item.index });
      }), 128))], 4);
    };
  }
});
var ListboxVirtualizer_default = ListboxVirtualizer_vue_vue_type_script_setup_true_lang_default;
const [injectComboboxRootContext, provideComboboxRootContext] = createContext("ComboboxRoot");
var ComboboxRoot_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
  __name: "ComboboxRoot",
  props: {
    open: {
      type: Boolean,
      required: false,
      default: void 0
    },
    defaultOpen: {
      type: Boolean,
      required: false
    },
    resetSearchTermOnBlur: {
      type: Boolean,
      required: false,
      default: true
    },
    resetSearchTermOnSelect: {
      type: Boolean,
      required: false,
      default: true
    },
    openOnFocus: {
      type: Boolean,
      required: false,
      default: false
    },
    openOnClick: {
      type: Boolean,
      required: false,
      default: false
    },
    ignoreFilter: {
      type: Boolean,
      required: false
    },
    resetModelValueOnClear: {
      type: Boolean,
      required: false,
      default: false
    },
    modelValue: {
      type: null,
      required: false
    },
    defaultValue: {
      type: null,
      required: false
    },
    multiple: {
      type: Boolean,
      required: false
    },
    dir: {
      type: String,
      required: false
    },
    disabled: {
      type: Boolean,
      required: false
    },
    highlightOnHover: {
      type: Boolean,
      required: false,
      default: true
    },
    by: {
      type: [String, Function],
      required: false
    },
    asChild: {
      type: Boolean,
      required: false
    },
    as: {
      type: null,
      required: false
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
  emits: [
    "update:modelValue",
    "highlight",
    "update:open"
  ],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const { primitiveElement, currentElement: parentElement } = usePrimitiveElement();
    const { multiple, disabled, ignoreFilter, resetSearchTermOnSelect, openOnFocus, openOnClick, dir: propDir, resetModelValueOnClear, highlightOnHover } = vueExports.toRefs(props);
    const dir = useDirection(propDir);
    const modelValue = useVModel(props, "modelValue", emits, {
      defaultValue: props.defaultValue ?? (multiple.value ? [] : void 0),
      passive: props.modelValue === void 0,
      deep: true
    });
    const open = useVModel(props, "open", emits, {
      defaultValue: props.defaultOpen,
      passive: props.open === void 0
    });
    async function onOpenChange(val) {
      open.value = val;
      filterSearch.value = "";
      if (val) {
        await vueExports.nextTick();
        primitiveElement.value?.highlightSelected();
        isUserInputted.value = true;
      } else isUserInputted.value = false;
      inputElement.value?.focus();
      setTimeout(() => {
        if (!val && props.resetSearchTermOnBlur) resetSearchTerm.trigger();
      }, 1);
    }
    const resetSearchTerm = createEventHook();
    const isUserInputted = vueExports.ref(false);
    const isVirtual = vueExports.ref(false);
    const inputElement = vueExports.ref();
    const triggerElement = vueExports.ref();
    const highlightedElement = vueExports.computed(() => primitiveElement.value?.highlightedElement ?? void 0);
    const allItems = vueExports.ref(/* @__PURE__ */ new Map());
    const allGroups = vueExports.ref(/* @__PURE__ */ new Map());
    const { contains } = useFilter({ sensitivity: "base" });
    const filterSearch = vueExports.ref("");
    const filterState = vueExports.computed((oldValue) => {
      if (!filterSearch.value || props.ignoreFilter || isVirtual.value) return {
        count: allItems.value.size,
        items: oldValue?.items ?? /* @__PURE__ */ new Map(),
        groups: oldValue?.groups ?? new Set(allGroups.value.keys())
      };
      let itemCount = 0;
      const filteredItems = /* @__PURE__ */ new Map();
      const filteredGroups = /* @__PURE__ */ new Set();
      for (const [id, value] of allItems.value) {
        const score = contains(value, filterSearch.value);
        filteredItems.set(id, score ? 1 : 0);
        if (score) itemCount++;
      }
      for (const [groupId, group] of allGroups.value) for (const itemId of group) if (filteredItems.get(itemId) > 0) {
        filteredGroups.add(groupId);
        break;
      }
      return {
        count: itemCount,
        items: filteredItems,
        groups: filteredGroups
      };
    });
    vueExports.getCurrentInstance();
    __expose({
      filtered: filterState,
      highlightedElement,
      highlightItem: primitiveElement.value?.highlightItem,
      highlightFirstItem: primitiveElement.value?.highlightFirstItem,
      highlightSelected: primitiveElement.value?.highlightSelected
    });
    provideComboboxRootContext({
      modelValue,
      multiple,
      disabled,
      open,
      onOpenChange,
      contentId: "",
      isUserInputted,
      isVirtual,
      inputElement,
      highlightedElement,
      onInputElementChange: (val) => inputElement.value = val,
      triggerElement,
      onTriggerElementChange: (val) => triggerElement.value = val,
      parentElement,
      resetSearchTermOnSelect,
      onResetSearchTerm: resetSearchTerm.on,
      allItems,
      allGroups,
      filterSearch,
      filterState,
      ignoreFilter,
      openOnFocus,
      openOnClick,
      resetModelValueOnClear
    });
    return (_ctx, _cache) => {
      return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(PopperRoot_default), null, {
        default: vueExports.withCtx(() => [vueExports.createVNode(vueExports.unref(ListboxRoot_default), vueExports.mergeProps({
          ref_key: "primitiveElement",
          ref: primitiveElement
        }, _ctx.$attrs, {
          modelValue: vueExports.unref(modelValue),
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => vueExports.isRef(modelValue) ? modelValue.value = $event : null),
          style: { pointerEvents: vueExports.unref(open) ? "auto" : void 0 },
          as: _ctx.as,
          "as-child": _ctx.asChild,
          dir: vueExports.unref(dir),
          multiple: vueExports.unref(multiple),
          name: _ctx.name,
          required: _ctx.required,
          disabled: vueExports.unref(disabled),
          "highlight-on-hover": vueExports.unref(highlightOnHover),
          by: props.by,
          onHighlight: _cache[1] || (_cache[1] = ($event) => emits("highlight", $event))
        }), {
          default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default", {
            open: vueExports.unref(open),
            modelValue: vueExports.unref(modelValue)
          })]),
          _: 3
        }, 16, [
          "modelValue",
          "style",
          "as",
          "as-child",
          "dir",
          "multiple",
          "name",
          "required",
          "disabled",
          "highlight-on-hover",
          "by"
        ])]),
        _: 3
      });
    };
  }
});
var ComboboxRoot_default = ComboboxRoot_vue_vue_type_script_setup_true_lang_default;
const [injectComboboxContentContext, provideComboboxContentContext] = createContext("ComboboxContent");
var ComboboxContentImpl_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
  __name: "ComboboxContentImpl",
  props: {
    position: {
      type: String,
      required: false,
      default: "inline"
    },
    bodyLock: {
      type: Boolean,
      required: false
    },
    side: {
      type: null,
      required: false
    },
    sideOffset: {
      type: Number,
      required: false
    },
    sideFlip: {
      type: Boolean,
      required: false
    },
    align: {
      type: null,
      required: false
    },
    alignOffset: {
      type: Number,
      required: false
    },
    alignFlip: {
      type: Boolean,
      required: false
    },
    avoidCollisions: {
      type: Boolean,
      required: false
    },
    collisionBoundary: {
      type: null,
      required: false
    },
    collisionPadding: {
      type: [Number, Object],
      required: false
    },
    arrowPadding: {
      type: Number,
      required: false
    },
    sticky: {
      type: String,
      required: false
    },
    hideWhenDetached: {
      type: Boolean,
      required: false
    },
    positionStrategy: {
      type: String,
      required: false
    },
    updatePositionStrategy: {
      type: String,
      required: false
    },
    disableUpdateOnLayoutShift: {
      type: Boolean,
      required: false
    },
    prioritizePosition: {
      type: Boolean,
      required: false
    },
    reference: {
      type: null,
      required: false
    },
    asChild: {
      type: Boolean,
      required: false
    },
    as: {
      type: null,
      required: false
    },
    disableOutsidePointerEvents: {
      type: Boolean,
      required: false
    }
  },
  emits: [
    "escapeKeyDown",
    "pointerDownOutside",
    "focusOutside",
    "interactOutside"
  ],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const { position } = vueExports.toRefs(props);
    const rootContext = injectComboboxRootContext();
    const { forwardRef } = useForwardExpose();
    useBodyScrollLock(props.bodyLock);
    useHideOthers(rootContext.parentElement);
    const pickedProps = vueExports.computed(() => {
      if (props.position === "popper") return props;
      else return {};
    });
    const forwardedProps = useForwardProps(pickedProps.value);
    const popperStyle = {
      "boxSizing": "border-box",
      "--reka-combobox-content-transform-origin": "var(--reka-popper-transform-origin)",
      "--reka-combobox-content-available-width": "var(--reka-popper-available-width)",
      "--reka-combobox-content-available-height": "var(--reka-popper-available-height)",
      "--reka-combobox-trigger-width": "var(--reka-popper-anchor-width)",
      "--reka-combobox-trigger-height": "var(--reka-popper-anchor-height)"
    };
    provideComboboxContentContext({ position });
    vueExports.ref(false);
    return (_ctx, _cache) => {
      return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(ListboxContent_default), { "as-child": "" }, {
        default: vueExports.withCtx(() => [vueExports.createVNode(vueExports.unref(DismissableLayer_default), {
          "as-child": "",
          "disable-outside-pointer-events": _ctx.disableOutsidePointerEvents,
          onDismiss: _cache[0] || (_cache[0] = ($event) => vueExports.unref(rootContext).onOpenChange(false)),
          onFocusOutside: _cache[1] || (_cache[1] = (ev) => {
            if (vueExports.unref(rootContext).parentElement.value?.contains(ev.target)) ev.preventDefault();
            emits("focusOutside", ev);
          }),
          onInteractOutside: _cache[2] || (_cache[2] = ($event) => emits("interactOutside", $event)),
          onEscapeKeyDown: _cache[3] || (_cache[3] = ($event) => emits("escapeKeyDown", $event)),
          onPointerDownOutside: _cache[4] || (_cache[4] = (ev) => {
            if (vueExports.unref(rootContext).parentElement.value?.contains(ev.target)) ev.preventDefault();
            emits("pointerDownOutside", ev);
          })
        }, {
          default: vueExports.withCtx(() => [(vueExports.openBlock(), vueExports.createBlock(vueExports.resolveDynamicComponent(vueExports.unref(position) === "popper" ? vueExports.unref(PopperContent_default) : vueExports.unref(Primitive)), vueExports.mergeProps({
            ..._ctx.$attrs,
            ...vueExports.unref(forwardedProps)
          }, {
            id: vueExports.unref(rootContext).contentId,
            ref: vueExports.unref(forwardRef),
            "data-state": vueExports.unref(rootContext).open.value ? "open" : "closed",
            style: {
              display: "flex",
              flexDirection: "column",
              outline: "none",
              ...vueExports.unref(position) === "popper" ? popperStyle : {}
            }
          }), {
            default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
            _: 3
          }, 16, [
            "id",
            "data-state",
            "style"
          ]))]),
          _: 3
        }, 8, ["disable-outside-pointer-events"])]),
        _: 3
      });
    };
  }
});
var ComboboxContentImpl_default = ComboboxContentImpl_vue_vue_type_script_setup_true_lang_default;
var ComboboxArrow_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
  __name: "ComboboxArrow",
  props: {
    width: {
      type: Number,
      required: false,
      default: 10
    },
    height: {
      type: Number,
      required: false,
      default: 5
    },
    rounded: {
      type: Boolean,
      required: false
    },
    asChild: {
      type: Boolean,
      required: false
    },
    as: {
      type: null,
      required: false,
      default: "svg"
    }
  },
  setup(__props) {
    const props = __props;
    const rootContext = injectComboboxRootContext();
    const contentContext = injectComboboxContentContext();
    useForwardExpose();
    return (_ctx, _cache) => {
      return vueExports.unref(rootContext).open.value && vueExports.unref(contentContext).position.value === "popper" ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(PopperArrow_default), vueExports.normalizeProps(vueExports.mergeProps({ key: 0 }, props)), {
        default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
        _: 3
      }, 16)) : vueExports.createCommentVNode("v-if", true);
    };
  }
});
var ComboboxArrow_default = ComboboxArrow_vue_vue_type_script_setup_true_lang_default;
var ComboboxContent_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
  __name: "ComboboxContent",
  props: {
    forceMount: {
      type: Boolean,
      required: false
    },
    position: {
      type: String,
      required: false
    },
    bodyLock: {
      type: Boolean,
      required: false
    },
    side: {
      type: null,
      required: false
    },
    sideOffset: {
      type: Number,
      required: false
    },
    sideFlip: {
      type: Boolean,
      required: false
    },
    align: {
      type: null,
      required: false
    },
    alignOffset: {
      type: Number,
      required: false
    },
    alignFlip: {
      type: Boolean,
      required: false
    },
    avoidCollisions: {
      type: Boolean,
      required: false
    },
    collisionBoundary: {
      type: null,
      required: false
    },
    collisionPadding: {
      type: [Number, Object],
      required: false
    },
    arrowPadding: {
      type: Number,
      required: false
    },
    sticky: {
      type: String,
      required: false
    },
    hideWhenDetached: {
      type: Boolean,
      required: false
    },
    positionStrategy: {
      type: String,
      required: false
    },
    updatePositionStrategy: {
      type: String,
      required: false
    },
    disableUpdateOnLayoutShift: {
      type: Boolean,
      required: false
    },
    prioritizePosition: {
      type: Boolean,
      required: false
    },
    reference: {
      type: null,
      required: false
    },
    asChild: {
      type: Boolean,
      required: false
    },
    as: {
      type: null,
      required: false
    },
    disableOutsidePointerEvents: {
      type: Boolean,
      required: false
    }
  },
  emits: [
    "escapeKeyDown",
    "pointerDownOutside",
    "focusOutside",
    "interactOutside"
  ],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const forwarded = useForwardPropsEmits(props, emits);
    const { forwardRef } = useForwardExpose();
    const rootContext = injectComboboxRootContext();
    rootContext.contentId ||= useId(void 0, "reka-combobox-content");
    return (_ctx, _cache) => {
      return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(Presence_default), { present: _ctx.forceMount || vueExports.unref(rootContext).open.value }, {
        default: vueExports.withCtx(() => [vueExports.createVNode(ComboboxContentImpl_default, vueExports.mergeProps({
          ...vueExports.unref(forwarded),
          ..._ctx.$attrs
        }, { ref: vueExports.unref(forwardRef) }), {
          default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
          _: 3
        }, 16)]),
        _: 3
      }, 8, ["present"]);
    };
  }
});
var ComboboxContent_default = ComboboxContent_vue_vue_type_script_setup_true_lang_default;
var ComboboxEmpty_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
  __name: "ComboboxEmpty",
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
    const rootContext = injectComboboxRootContext();
    const isRender = vueExports.computed(() => rootContext.ignoreFilter.value ? rootContext.allItems.value.size === 0 : rootContext.filterState.value.count === 0);
    return (_ctx, _cache) => {
      return isRender.value ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(Primitive), vueExports.normalizeProps(vueExports.mergeProps({ key: 0 }, props)), {
        default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default", {}, () => [_cache[0] || (_cache[0] = vueExports.createTextVNode("No options"))])]),
        _: 3
      }, 16)) : vueExports.createCommentVNode("v-if", true);
    };
  }
});
var ComboboxEmpty_default = ComboboxEmpty_vue_vue_type_script_setup_true_lang_default;
const [injectComboboxGroupContext, provideComboboxGroupContext] = createContext("ComboboxGroup");
var ComboboxGroup_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
  __name: "ComboboxGroup",
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
    const id = useId(void 0, "reka-combobox-group");
    const rootContext = injectComboboxRootContext();
    const isRender = vueExports.computed(() => rootContext.ignoreFilter.value ? true : !rootContext.filterSearch.value ? true : rootContext.filterState.value.groups.has(id));
    const context = provideComboboxGroupContext({
      id,
      labelId: ""
    });
    return (_ctx, _cache) => {
      return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(ListboxGroup_default), vueExports.mergeProps({
        id: vueExports.unref(id),
        "aria-labelledby": vueExports.unref(context).labelId
      }, props, { hidden: isRender.value ? void 0 : true }), {
        default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
        _: 3
      }, 16, [
        "id",
        "aria-labelledby",
        "hidden"
      ]);
    };
  }
});
var ComboboxGroup_default = ComboboxGroup_vue_vue_type_script_setup_true_lang_default;
var ComboboxInput_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
  __name: "ComboboxInput",
  props: {
    displayValue: {
      type: Function,
      required: false
    },
    modelValue: {
      type: String,
      required: false
    },
    autoFocus: {
      type: Boolean,
      required: false
    },
    disabled: {
      type: Boolean,
      required: false
    },
    asChild: {
      type: Boolean,
      required: false
    },
    as: {
      type: null,
      required: false,
      default: "input"
    }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const rootContext = injectComboboxRootContext();
    const listboxContext = injectListboxRootContext();
    const { primitiveElement } = usePrimitiveElement();
    const modelValue = useVModel(props, "modelValue", emits, { passive: props.modelValue === void 0 });
    function handleKeyDown(ev) {
      if (!rootContext.open.value) rootContext.onOpenChange(true);
    }
    function handleInput(event) {
      const target = event.target;
      if (!rootContext.open.value) {
        rootContext.onOpenChange(true);
        vueExports.nextTick(() => {
          if (target.value) {
            rootContext.filterSearch.value = target.value;
            listboxContext.highlightFirstItem();
          }
        });
      } else rootContext.filterSearch.value = target.value;
    }
    function handleFocus() {
      if (rootContext.openOnFocus.value && !rootContext.open.value) rootContext.onOpenChange(true);
    }
    function handleClick() {
      if (rootContext.openOnClick.value && !rootContext.open.value) rootContext.onOpenChange(true);
    }
    function resetSearchTerm() {
      const rootModelValue = rootContext.modelValue.value;
      if (props.displayValue) modelValue.value = props.displayValue(rootModelValue);
      else if (!rootContext.multiple.value && rootModelValue && !Array.isArray(rootModelValue)) if (typeof rootModelValue !== "object") modelValue.value = rootModelValue.toString();
      else modelValue.value = "";
      else modelValue.value = "";
      vueExports.nextTick(() => {
        modelValue.value = modelValue.value;
      });
    }
    rootContext.onResetSearchTerm(() => {
      resetSearchTerm();
    });
    vueExports.watch(rootContext.modelValue, async () => {
      if (!rootContext.isUserInputted.value && rootContext.resetSearchTermOnSelect.value) resetSearchTerm();
    }, {
      immediate: true,
      deep: true
    });
    vueExports.watch(rootContext.filterState, () => {
      if (!rootContext.isVirtual.value && !rootContext.highlightedElement.value) listboxContext.highlightFirstItem();
    });
    return (_ctx, _cache) => {
      return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(ListboxFilter_default), {
        ref_key: "primitiveElement",
        ref: primitiveElement,
        modelValue: vueExports.unref(modelValue),
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => vueExports.isRef(modelValue) ? modelValue.value = $event : null),
        as: _ctx.as,
        "as-child": _ctx.asChild,
        "auto-focus": _ctx.autoFocus,
        disabled: _ctx.disabled,
        "aria-expanded": vueExports.unref(rootContext).open.value,
        "aria-controls": vueExports.unref(rootContext).contentId,
        "aria-autocomplete": "list",
        role: "combobox",
        autocomplete: "off",
        onClick: handleClick,
        onInput: handleInput,
        onKeydown: vueExports.withKeys(vueExports.withModifiers(handleKeyDown, ["prevent"]), ["down", "up"]),
        onFocus: handleFocus
      }, {
        default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
        _: 3
      }, 8, [
        "modelValue",
        "as",
        "as-child",
        "auto-focus",
        "disabled",
        "aria-expanded",
        "aria-controls",
        "onKeydown"
      ]);
    };
  }
});
var ComboboxInput_default = ComboboxInput_vue_vue_type_script_setup_true_lang_default;
var ComboboxItem_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
  __name: "ComboboxItem",
  props: {
    textValue: {
      type: String,
      required: false
    },
    value: {
      type: null,
      required: true
    },
    disabled: {
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
  emits: ["select"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const id = useId(void 0, "reka-combobox-item");
    const rootContext = injectComboboxRootContext();
    injectComboboxGroupContext(null);
    const { primitiveElement } = usePrimitiveElement();
    if (props.value === "") throw new Error("A <ComboboxItem /> must have a value prop that is not an empty string. This is because the Combobox value can be set to an empty string to clear the selection and show the placeholder.");
    const isRender = vueExports.computed(() => {
      if (rootContext.isVirtual.value || rootContext.ignoreFilter.value || !rootContext.filterSearch.value) return true;
      else {
        const filteredCurrentItem = rootContext.filterState.value.items.get(id);
        if (filteredCurrentItem === void 0) return true;
        return filteredCurrentItem > 0;
      }
    });
    return (_ctx, _cache) => {
      return isRender.value ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(ListboxItem_default), vueExports.mergeProps({ key: 0 }, props, {
        id: vueExports.unref(id),
        ref_key: "primitiveElement",
        ref: primitiveElement,
        disabled: vueExports.unref(rootContext).disabled.value || _ctx.disabled,
        onSelect: _cache[0] || (_cache[0] = (event) => {
          emits("select", event);
          if (event.defaultPrevented) return;
          if (!vueExports.unref(rootContext).multiple.value && !_ctx.disabled && !vueExports.unref(rootContext).disabled.value) {
            event.preventDefault();
            vueExports.unref(rootContext).onOpenChange(false);
            vueExports.unref(rootContext).modelValue.value = props.value;
          }
        })
      }), {
        default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default", {}, () => [vueExports.createTextVNode(vueExports.toDisplayString(_ctx.value), 1)])]),
        _: 3
      }, 16, ["id", "disabled"])) : vueExports.createCommentVNode("v-if", true);
    };
  }
});
var ComboboxItem_default = ComboboxItem_vue_vue_type_script_setup_true_lang_default;
var ComboboxItemIndicator_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
  __name: "ComboboxItemIndicator",
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
    const props = __props;
    return (_ctx, _cache) => {
      return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(ListboxItemIndicator_default), vueExports.normalizeProps(vueExports.guardReactiveProps(props)), {
        default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
        _: 3
      }, 16);
    };
  }
});
var ComboboxItemIndicator_default = ComboboxItemIndicator_vue_vue_type_script_setup_true_lang_default;
var ComboboxLabel_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
  __name: "ComboboxLabel",
  props: {
    for: {
      type: String,
      required: false
    },
    asChild: {
      type: Boolean,
      required: false
    },
    as: {
      type: null,
      required: false,
      default: "div"
    }
  },
  setup(__props) {
    const props = __props;
    useForwardExpose();
    const groupContext = injectComboboxGroupContext({
      id: "",
      labelId: ""
    });
    groupContext.labelId ||= useId(void 0, "reka-combobox-group-label");
    return (_ctx, _cache) => {
      return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(Primitive), vueExports.mergeProps(props, { id: vueExports.unref(groupContext).labelId }), {
        default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
        _: 3
      }, 16, ["id"]);
    };
  }
});
var ComboboxLabel_default = ComboboxLabel_vue_vue_type_script_setup_true_lang_default;
var ComboboxPortal_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
  __name: "ComboboxPortal",
  props: {
    to: {
      type: null,
      required: false
    },
    disabled: {
      type: Boolean,
      required: false
    },
    defer: {
      type: Boolean,
      required: false
    },
    forceMount: {
      type: Boolean,
      required: false
    }
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _cache) => {
      return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(Teleport_default), vueExports.normalizeProps(vueExports.guardReactiveProps(props)), {
        default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
        _: 3
      }, 16);
    };
  }
});
var ComboboxPortal_default = ComboboxPortal_vue_vue_type_script_setup_true_lang_default;
var ComboboxSeparator_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
  __name: "ComboboxSeparator",
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
    useForwardExpose();
    return (_ctx, _cache) => {
      return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(Primitive), vueExports.mergeProps(props, { "aria-hidden": "true" }), {
        default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
        _: 3
      }, 16);
    };
  }
});
var ComboboxSeparator_default = ComboboxSeparator_vue_vue_type_script_setup_true_lang_default;
var ComboboxTrigger_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
  __name: "ComboboxTrigger",
  props: {
    disabled: {
      type: Boolean,
      required: false
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
    const rootContext = injectComboboxRootContext();
    const disabled = vueExports.computed(() => props.disabled || rootContext.disabled.value || false);
    return (_ctx, _cache) => {
      return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(Primitive), vueExports.mergeProps(props, {
        ref: vueExports.unref(forwardRef),
        type: _ctx.as === "button" ? "button" : void 0,
        tabindex: "-1",
        "aria-label": "Show popup",
        "aria-haspopup": "listbox",
        "aria-expanded": vueExports.unref(rootContext).open.value,
        "aria-controls": vueExports.unref(rootContext).contentId,
        "data-state": vueExports.unref(rootContext).open.value ? "open" : "closed",
        disabled: disabled.value,
        "data-disabled": disabled.value ? "" : void 0,
        "aria-disabled": disabled.value ?? void 0,
        onClick: _cache[0] || (_cache[0] = ($event) => vueExports.unref(rootContext).onOpenChange(!vueExports.unref(rootContext).open.value))
      }), {
        default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
        _: 3
      }, 16, [
        "type",
        "aria-expanded",
        "aria-controls",
        "data-state",
        "disabled",
        "data-disabled",
        "aria-disabled"
      ]);
    };
  }
});
var ComboboxTrigger_default = ComboboxTrigger_vue_vue_type_script_setup_true_lang_default;
var ComboboxVirtualizer_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
  __name: "ComboboxVirtualizer",
  props: {
    options: {
      type: Array,
      required: true
    },
    overscan: {
      type: Number,
      required: false
    },
    estimateSize: {
      type: Number,
      required: false
    },
    textContent: {
      type: Function,
      required: false
    }
  },
  setup(__props) {
    const props = __props;
    const rootContext = injectComboboxRootContext();
    rootContext.isVirtual.value = true;
    return (_ctx, _cache) => {
      return vueExports.openBlock(), vueExports.createBlock(ListboxVirtualizer_default, vueExports.normalizeProps(vueExports.guardReactiveProps(props)), {
        default: vueExports.withCtx((slotProps) => [vueExports.renderSlot(_ctx.$slots, "default", vueExports.normalizeProps(vueExports.guardReactiveProps(slotProps)))]),
        _: 3
      }, 16);
    };
  }
});
var ComboboxVirtualizer_default = ComboboxVirtualizer_vue_vue_type_script_setup_true_lang_default;
const OPEN_KEYS = [
  " ",
  "Enter",
  "ArrowUp",
  "ArrowDown"
];
const SELECTION_KEYS = [" ", "Enter"];
const CONTENT_MARGIN = 10;
function valueComparator(value, currentValue, comparator) {
  if (value === void 0) return false;
  else if (Array.isArray(value)) return value.some((val) => compare(val, currentValue, comparator));
  else return compare(value, currentValue, comparator);
}
function compare(value, currentValue, comparator) {
  if (value === void 0 || currentValue === void 0) return false;
  if (typeof value === "string") return value === currentValue;
  if (typeof comparator === "function") return comparator(value, currentValue);
  if (typeof comparator === "string") return value?.[comparator] === currentValue?.[comparator];
  return isEqual(value, currentValue);
}
function shouldShowPlaceholder(value) {
  return value === void 0 || value === null || value === "" || Array.isArray(value) && value.length === 0;
}
const _hoisted_1$1 = {
  key: 0,
  value: ""
};
const [injectSelectRootContext, provideSelectRootContext] = createContext("SelectRoot");
var SelectRoot_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
  inheritAttrs: false,
  __name: "SelectRoot",
  props: {
    open: {
      type: Boolean,
      required: false,
      default: void 0
    },
    defaultOpen: {
      type: Boolean,
      required: false
    },
    defaultValue: {
      type: null,
      required: false
    },
    modelValue: {
      type: null,
      required: false,
      default: void 0
    },
    by: {
      type: [String, Function],
      required: false
    },
    dir: {
      type: String,
      required: false
    },
    multiple: {
      type: Boolean,
      required: false
    },
    autocomplete: {
      type: String,
      required: false
    },
    disabled: {
      type: Boolean,
      required: false
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
  emits: ["update:modelValue", "update:open"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const { required, disabled, multiple, dir: propDir } = vueExports.toRefs(props);
    const modelValue = useVModel(props, "modelValue", emits, {
      defaultValue: props.defaultValue ?? (multiple.value ? [] : void 0),
      passive: props.modelValue === void 0,
      deep: true
    });
    const open = useVModel(props, "open", emits, {
      defaultValue: props.defaultOpen,
      passive: props.open === void 0
    });
    const triggerElement = vueExports.ref();
    const valueElement = vueExports.ref();
    const triggerPointerDownPosRef = vueExports.ref({
      x: 0,
      y: 0
    });
    const isEmptyModelValue = vueExports.computed(() => {
      if (multiple.value && Array.isArray(modelValue.value)) return modelValue.value?.length === 0;
      else return isNullish(modelValue.value);
    });
    useCollection({ isProvider: true });
    const dir = useDirection(propDir);
    const isFormControl = useFormControl(triggerElement);
    const optionsSet = vueExports.ref(/* @__PURE__ */ new Set());
    const nativeSelectKey = vueExports.computed(() => {
      return Array.from(optionsSet.value).map((option) => option.value).join(";");
    });
    function handleValueChange(value) {
      if (multiple.value) {
        const array = Array.isArray(modelValue.value) ? [...modelValue.value] : [];
        const index = array.findIndex((i) => compare(i, value, props.by));
        index === -1 ? array.push(value) : array.splice(index, 1);
        modelValue.value = [...array];
      } else modelValue.value = value;
    }
    function getOption(value) {
      return Array.from(optionsSet.value).find((option) => valueComparator(value, option.value, props.by));
    }
    provideSelectRootContext({
      triggerElement,
      onTriggerChange: (node) => {
        triggerElement.value = node;
      },
      valueElement,
      onValueElementChange: (node) => {
        valueElement.value = node;
      },
      contentId: "",
      modelValue,
      onValueChange: handleValueChange,
      by: props.by,
      open,
      multiple,
      required,
      onOpenChange: (value) => {
        open.value = value;
      },
      dir,
      triggerPointerDownPosRef,
      disabled,
      isEmptyModelValue,
      optionsSet,
      onOptionAdd: (option) => {
        const existingOption = getOption(option.value);
        if (existingOption) optionsSet.value.delete(existingOption);
        optionsSet.value.add(option);
      },
      onOptionRemove: (option) => {
        const existingOption = getOption(option.value);
        if (existingOption) optionsSet.value.delete(existingOption);
      }
    });
    return (_ctx, _cache) => {
      return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(PopperRoot_default), null, {
        default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default", {
          modelValue: vueExports.unref(modelValue),
          open: vueExports.unref(open)
        }), vueExports.unref(isFormControl) ? (vueExports.openBlock(), vueExports.createBlock(BubbleSelect_default, {
          key: nativeSelectKey.value,
          "aria-hidden": "true",
          tabindex: "-1",
          multiple: vueExports.unref(multiple),
          required: vueExports.unref(required),
          name: _ctx.name,
          autocomplete: _ctx.autocomplete,
          disabled: vueExports.unref(disabled),
          value: vueExports.unref(modelValue)
        }, {
          default: vueExports.withCtx(() => [vueExports.unref(isNullish)(vueExports.unref(modelValue)) ? (vueExports.openBlock(), vueExports.createElementBlock("option", _hoisted_1$1)) : vueExports.createCommentVNode("v-if", true), (vueExports.openBlock(true), vueExports.createElementBlock(vueExports.Fragment, null, vueExports.renderList(Array.from(optionsSet.value), (option) => {
            return vueExports.openBlock(), vueExports.createElementBlock("option", vueExports.mergeProps({ key: option.value ?? "" }, { ref_for: true }, option), null, 16);
          }), 128))]),
          _: 1
        }, 8, [
          "multiple",
          "required",
          "name",
          "autocomplete",
          "disabled",
          "value"
        ])) : vueExports.createCommentVNode("v-if", true)]),
        _: 3
      });
    };
  }
});
var SelectRoot_default = SelectRoot_vue_vue_type_script_setup_true_lang_default;
var BubbleSelect_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
  __name: "BubbleSelect",
  props: {
    autocomplete: {
      type: String,
      required: false
    },
    autofocus: {
      type: Boolean,
      required: false
    },
    disabled: {
      type: Boolean,
      required: false
    },
    form: {
      type: String,
      required: false
    },
    multiple: {
      type: Boolean,
      required: false
    },
    name: {
      type: String,
      required: false
    },
    required: {
      type: Boolean,
      required: false
    },
    size: {
      type: Number,
      required: false
    },
    value: {
      type: null,
      required: false
    }
  },
  setup(__props) {
    const props = __props;
    const selectElement = vueExports.ref();
    const rootContext = injectSelectRootContext();
    vueExports.watch(() => props.value, (cur, prev) => {
      const selectProto = (void 0).HTMLSelectElement.prototype;
      const descriptor = Object.getOwnPropertyDescriptor(selectProto, "value");
      const setValue = descriptor.set;
      if (cur !== prev && setValue && selectElement.value) {
        const event = new Event("change", { bubbles: true });
        setValue.call(selectElement.value, cur);
        selectElement.value.dispatchEvent(event);
      }
    });
    function handleInput(event) {
      rootContext.onValueChange(event.target.value);
    }
    return (_ctx, _cache) => {
      return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(VisuallyHidden_default), { "as-child": "" }, {
        default: vueExports.withCtx(() => [vueExports.createElementVNode("select", vueExports.mergeProps({
          ref_key: "selectElement",
          ref: selectElement
        }, props, { onInput: handleInput }), [vueExports.renderSlot(_ctx.$slots, "default")], 16)]),
        _: 3
      });
    };
  }
});
var BubbleSelect_default = BubbleSelect_vue_vue_type_script_setup_true_lang_default;
var SelectPopperPosition_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
  __name: "SelectPopperPosition",
  props: {
    side: {
      type: null,
      required: false
    },
    sideOffset: {
      type: Number,
      required: false
    },
    sideFlip: {
      type: Boolean,
      required: false
    },
    align: {
      type: null,
      required: false,
      default: "start"
    },
    alignOffset: {
      type: Number,
      required: false
    },
    alignFlip: {
      type: Boolean,
      required: false
    },
    avoidCollisions: {
      type: Boolean,
      required: false
    },
    collisionBoundary: {
      type: null,
      required: false
    },
    collisionPadding: {
      type: [Number, Object],
      required: false,
      default: CONTENT_MARGIN
    },
    arrowPadding: {
      type: Number,
      required: false
    },
    sticky: {
      type: String,
      required: false
    },
    hideWhenDetached: {
      type: Boolean,
      required: false
    },
    positionStrategy: {
      type: String,
      required: false
    },
    updatePositionStrategy: {
      type: String,
      required: false
    },
    disableUpdateOnLayoutShift: {
      type: Boolean,
      required: false
    },
    prioritizePosition: {
      type: Boolean,
      required: false
    },
    reference: {
      type: null,
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
    const forwarded = useForwardProps(props);
    return (_ctx, _cache) => {
      return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(PopperContent_default), vueExports.mergeProps(vueExports.unref(forwarded), { style: {
        "boxSizing": "border-box",
        "--reka-select-content-transform-origin": "var(--reka-popper-transform-origin)",
        "--reka-select-content-available-width": "var(--reka-popper-available-width)",
        "--reka-select-content-available-height": "var(--reka-popper-available-height)",
        "--reka-select-trigger-width": "var(--reka-popper-anchor-width)",
        "--reka-select-trigger-height": "var(--reka-popper-anchor-height)"
      } }), {
        default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
        _: 3
      }, 16);
    };
  }
});
var SelectPopperPosition_default = SelectPopperPosition_vue_vue_type_script_setup_true_lang_default;
const SelectContentDefaultContextValue = {
  onViewportChange: () => {
  },
  itemTextRefCallback: () => {
  },
  itemRefCallback: () => {
  }
};
const [injectSelectContentContext, provideSelectContentContext] = createContext("SelectContent");
var SelectContentImpl_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
  __name: "SelectContentImpl",
  props: {
    position: {
      type: String,
      required: false,
      default: "item-aligned"
    },
    bodyLock: {
      type: Boolean,
      required: false,
      default: true
    },
    side: {
      type: null,
      required: false
    },
    sideOffset: {
      type: Number,
      required: false
    },
    sideFlip: {
      type: Boolean,
      required: false
    },
    align: {
      type: null,
      required: false,
      default: "start"
    },
    alignOffset: {
      type: Number,
      required: false
    },
    alignFlip: {
      type: Boolean,
      required: false
    },
    avoidCollisions: {
      type: Boolean,
      required: false
    },
    collisionBoundary: {
      type: null,
      required: false
    },
    collisionPadding: {
      type: [Number, Object],
      required: false
    },
    arrowPadding: {
      type: Number,
      required: false
    },
    sticky: {
      type: String,
      required: false
    },
    hideWhenDetached: {
      type: Boolean,
      required: false
    },
    positionStrategy: {
      type: String,
      required: false
    },
    updatePositionStrategy: {
      type: String,
      required: false
    },
    disableUpdateOnLayoutShift: {
      type: Boolean,
      required: false
    },
    prioritizePosition: {
      type: Boolean,
      required: false
    },
    reference: {
      type: null,
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
  emits: [
    "closeAutoFocus",
    "escapeKeyDown",
    "pointerDownOutside"
  ],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const rootContext = injectSelectRootContext();
    useFocusGuards();
    useBodyScrollLock(props.bodyLock);
    const { CollectionSlot, getItems } = useCollection();
    const content = vueExports.ref();
    useHideOthers(content);
    const { search, handleTypeaheadSearch } = useTypeahead();
    const viewport = vueExports.ref();
    const selectedItem = vueExports.ref();
    const selectedItemText = vueExports.ref();
    const isPositioned = vueExports.ref(false);
    const firstValidItemFoundRef = vueExports.ref(false);
    const firstSelectedItemInArrayFoundRef = vueExports.ref(false);
    function focusSelectedItem() {
      if (selectedItem.value && content.value) focusFirst([selectedItem.value, content.value]);
    }
    vueExports.watch(isPositioned, () => {
      focusSelectedItem();
    });
    const { onOpenChange, triggerPointerDownPosRef } = rootContext;
    vueExports.watchEffect((cleanupFn) => {
      if (!content.value) return;
      let pointerMoveDelta = {
        x: 0,
        y: 0
      };
      const handlePointerMove = (event) => {
        pointerMoveDelta = {
          x: Math.abs(Math.round(event.pageX) - (triggerPointerDownPosRef.value?.x ?? 0)),
          y: Math.abs(Math.round(event.pageY) - (triggerPointerDownPosRef.value?.y ?? 0))
        };
      };
      const handlePointerUp = (event) => {
        if (event.pointerType === "touch") return;
        if (pointerMoveDelta.x <= 10 && pointerMoveDelta.y <= 10) event.preventDefault();
        else if (!content.value?.contains(event.target)) onOpenChange(false);
        (void 0).removeEventListener("pointermove", handlePointerMove);
        triggerPointerDownPosRef.value = null;
      };
      if (triggerPointerDownPosRef.value !== null) {
        (void 0).addEventListener("pointermove", handlePointerMove);
        (void 0).addEventListener("pointerup", handlePointerUp, {
          capture: true,
          once: true
        });
      }
      cleanupFn(() => {
        (void 0).removeEventListener("pointermove", handlePointerMove);
        (void 0).removeEventListener("pointerup", handlePointerUp, { capture: true });
      });
    });
    function handleKeyDown(event) {
      const isModifierKey = event.ctrlKey || event.altKey || event.metaKey;
      if (event.key === "Tab") event.preventDefault();
      if (!isModifierKey && event.key.length === 1) handleTypeaheadSearch(event.key, getItems());
      if ([
        "ArrowUp",
        "ArrowDown",
        "Home",
        "End"
      ].includes(event.key)) {
        const collectionItems = getItems().map((i) => i.ref);
        let candidateNodes = [...collectionItems];
        if (["ArrowUp", "End"].includes(event.key)) candidateNodes = candidateNodes.slice().reverse();
        if (["ArrowUp", "ArrowDown"].includes(event.key)) {
          const currentElement = event.target;
          const currentIndex = candidateNodes.indexOf(currentElement);
          candidateNodes = candidateNodes.slice(currentIndex + 1);
        }
        setTimeout(() => focusFirst(candidateNodes));
        event.preventDefault();
      }
    }
    const pickedProps = vueExports.computed(() => {
      if (props.position === "popper") return props;
      else return {};
    });
    const forwardedProps = useForwardProps(pickedProps.value);
    provideSelectContentContext({
      content,
      viewport,
      onViewportChange: (node) => {
        viewport.value = node;
      },
      itemRefCallback: (node, value, disabled) => {
        const isFirstValidItem = !firstValidItemFoundRef.value && !disabled;
        const isSelectedItem = valueComparator(rootContext.modelValue.value, value, rootContext.by);
        if (rootContext.multiple.value) {
          if (firstSelectedItemInArrayFoundRef.value) return;
          if (isSelectedItem || isFirstValidItem) {
            selectedItem.value = node;
            if (isSelectedItem) firstSelectedItemInArrayFoundRef.value = true;
          }
        } else if (isSelectedItem || isFirstValidItem) selectedItem.value = node;
        if (isFirstValidItem) firstValidItemFoundRef.value = true;
      },
      selectedItem,
      selectedItemText,
      onItemLeave: () => {
        content.value?.focus();
      },
      itemTextRefCallback: (node, value, disabled) => {
        const isFirstValidItem = !firstValidItemFoundRef.value && !disabled;
        const isSelectedItem = valueComparator(rootContext.modelValue.value, value, rootContext.by);
        if (isSelectedItem || isFirstValidItem) selectedItemText.value = node;
      },
      focusSelectedItem,
      position: props.position,
      isPositioned,
      searchRef: search
    });
    return (_ctx, _cache) => {
      return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(CollectionSlot), null, {
        default: vueExports.withCtx(() => [vueExports.createVNode(vueExports.unref(FocusScope_default), {
          "as-child": "",
          onMountAutoFocus: _cache[6] || (_cache[6] = vueExports.withModifiers(() => {
          }, ["prevent"])),
          onUnmountAutoFocus: _cache[7] || (_cache[7] = (event) => {
            emits("closeAutoFocus", event);
            if (event.defaultPrevented) return;
            vueExports.unref(rootContext).triggerElement.value?.focus({ preventScroll: true });
            event.preventDefault();
          })
        }, {
          default: vueExports.withCtx(() => [vueExports.createVNode(vueExports.unref(DismissableLayer_default), {
            "as-child": "",
            "disable-outside-pointer-events": "",
            onFocusOutside: _cache[2] || (_cache[2] = vueExports.withModifiers(() => {
            }, ["prevent"])),
            onDismiss: _cache[3] || (_cache[3] = ($event) => vueExports.unref(rootContext).onOpenChange(false)),
            onEscapeKeyDown: _cache[4] || (_cache[4] = ($event) => emits("escapeKeyDown", $event)),
            onPointerDownOutside: _cache[5] || (_cache[5] = ($event) => emits("pointerDownOutside", $event))
          }, {
            default: vueExports.withCtx(() => [(vueExports.openBlock(), vueExports.createBlock(vueExports.resolveDynamicComponent(_ctx.position === "popper" ? SelectPopperPosition_default : SelectItemAlignedPosition_default), vueExports.mergeProps({
              ..._ctx.$attrs,
              ...vueExports.unref(forwardedProps)
            }, {
              id: vueExports.unref(rootContext).contentId,
              ref: (vnode) => {
                const el = vueExports.unref(unrefElement)(vnode);
                if (el?.hasAttribute("data-reka-popper-content-wrapper")) content.value = el.firstElementChild;
                else content.value = el;
                return void 0;
              },
              role: "listbox",
              "data-state": vueExports.unref(rootContext).open.value ? "open" : "closed",
              dir: vueExports.unref(rootContext).dir.value,
              style: {
                display: "flex",
                flexDirection: "column",
                outline: "none"
              },
              onContextmenu: _cache[0] || (_cache[0] = vueExports.withModifiers(() => {
              }, ["prevent"])),
              onPlaced: _cache[1] || (_cache[1] = ($event) => isPositioned.value = true),
              onKeydown: handleKeyDown
            }), {
              default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
              _: 3
            }, 16, [
              "id",
              "data-state",
              "dir",
              "onKeydown"
            ]))]),
            _: 3
          })]),
          _: 3
        })]),
        _: 3
      });
    };
  }
});
var SelectContentImpl_default = SelectContentImpl_vue_vue_type_script_setup_true_lang_default;
const [injectSelectItemAlignedPositionContext, provideSelectItemAlignedPositionContext] = createContext("SelectItemAlignedPosition");
var SelectItemAlignedPosition_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
  inheritAttrs: false,
  __name: "SelectItemAlignedPosition",
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
  emits: ["placed"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const { getItems } = useCollection();
    const rootContext = injectSelectRootContext();
    const contentContext = injectSelectContentContext();
    const shouldExpandOnScrollRef = vueExports.ref(false);
    const shouldRepositionRef = vueExports.ref(true);
    const contentWrapperElement = vueExports.ref();
    const { forwardRef, currentElement: contentElement } = useForwardExpose();
    const { viewport, selectedItem, selectedItemText, focusSelectedItem } = contentContext;
    function position() {
      if (rootContext.triggerElement.value && rootContext.valueElement.value && contentWrapperElement.value && contentElement.value && viewport?.value && selectedItem?.value && selectedItemText?.value) {
        const triggerRect = rootContext.triggerElement.value.getBoundingClientRect();
        const contentRect = contentElement.value.getBoundingClientRect();
        const valueNodeRect = rootContext.valueElement.value.getBoundingClientRect();
        const itemTextRect = selectedItemText.value.getBoundingClientRect();
        if (rootContext.dir.value !== "rtl") {
          const itemTextOffset = itemTextRect.left - contentRect.left;
          const left = valueNodeRect.left - itemTextOffset;
          const leftDelta = triggerRect.left - left;
          const minContentWidth = triggerRect.width + leftDelta;
          const contentWidth = Math.max(minContentWidth, contentRect.width);
          const rightEdge = (void 0).innerWidth - CONTENT_MARGIN;
          const clampedLeft = clamp(left, CONTENT_MARGIN, Math.max(CONTENT_MARGIN, rightEdge - contentWidth));
          contentWrapperElement.value.style.minWidth = `${minContentWidth}px`;
          contentWrapperElement.value.style.left = `${clampedLeft}px`;
        } else {
          const itemTextOffset = contentRect.right - itemTextRect.right;
          const right = (void 0).innerWidth - valueNodeRect.right - itemTextOffset;
          const rightDelta = (void 0).innerWidth - triggerRect.right - right;
          const minContentWidth = triggerRect.width + rightDelta;
          const contentWidth = Math.max(minContentWidth, contentRect.width);
          const leftEdge = (void 0).innerWidth - CONTENT_MARGIN;
          const clampedRight = clamp(right, CONTENT_MARGIN, Math.max(CONTENT_MARGIN, leftEdge - contentWidth));
          contentWrapperElement.value.style.minWidth = `${minContentWidth}px`;
          contentWrapperElement.value.style.right = `${clampedRight}px`;
        }
        const items = getItems().map((i) => i.ref);
        const availableHeight = (void 0).innerHeight - CONTENT_MARGIN * 2;
        const itemsHeight = viewport.value.scrollHeight;
        const contentStyles = (void 0).getComputedStyle(contentElement.value);
        const contentBorderTopWidth = Number.parseInt(contentStyles.borderTopWidth, 10);
        const contentPaddingTop = Number.parseInt(contentStyles.paddingTop, 10);
        const contentBorderBottomWidth = Number.parseInt(contentStyles.borderBottomWidth, 10);
        const contentPaddingBottom = Number.parseInt(contentStyles.paddingBottom, 10);
        const fullContentHeight = contentBorderTopWidth + contentPaddingTop + itemsHeight + contentPaddingBottom + contentBorderBottomWidth;
        const minContentHeight = Math.min(selectedItem.value.offsetHeight * 5, fullContentHeight);
        const viewportStyles = (void 0).getComputedStyle(viewport.value);
        const viewportPaddingTop = Number.parseInt(viewportStyles.paddingTop, 10);
        const viewportPaddingBottom = Number.parseInt(viewportStyles.paddingBottom, 10);
        const topEdgeToTriggerMiddle = triggerRect.top + triggerRect.height / 2 - CONTENT_MARGIN;
        const triggerMiddleToBottomEdge = availableHeight - topEdgeToTriggerMiddle;
        const selectedItemHalfHeight = selectedItem.value.offsetHeight / 2;
        const itemOffsetMiddle = selectedItem.value.offsetTop + selectedItemHalfHeight;
        const contentTopToItemMiddle = contentBorderTopWidth + contentPaddingTop + itemOffsetMiddle;
        const itemMiddleToContentBottom = fullContentHeight - contentTopToItemMiddle;
        const willAlignWithoutTopOverflow = contentTopToItemMiddle <= topEdgeToTriggerMiddle;
        if (willAlignWithoutTopOverflow) {
          const isLastItem = selectedItem.value === items[items.length - 1];
          contentWrapperElement.value.style.bottom = `0px`;
          const viewportOffsetBottom = contentElement.value.clientHeight - viewport.value.offsetTop - viewport.value.offsetHeight;
          const clampedTriggerMiddleToBottomEdge = Math.max(triggerMiddleToBottomEdge, selectedItemHalfHeight + (isLastItem ? viewportPaddingBottom : 0) + viewportOffsetBottom + contentBorderBottomWidth);
          const height = contentTopToItemMiddle + clampedTriggerMiddleToBottomEdge;
          contentWrapperElement.value.style.height = `${height}px`;
        } else {
          const isFirstItem = selectedItem.value === items[0];
          contentWrapperElement.value.style.top = `0px`;
          const clampedTopEdgeToTriggerMiddle = Math.max(topEdgeToTriggerMiddle, contentBorderTopWidth + viewport.value.offsetTop + (isFirstItem ? viewportPaddingTop : 0) + selectedItemHalfHeight);
          const height = clampedTopEdgeToTriggerMiddle + itemMiddleToContentBottom;
          contentWrapperElement.value.style.height = `${height}px`;
          viewport.value.scrollTop = contentTopToItemMiddle - topEdgeToTriggerMiddle + viewport.value.offsetTop;
        }
        contentWrapperElement.value.style.margin = `${CONTENT_MARGIN}px 0`;
        contentWrapperElement.value.style.minHeight = `${minContentHeight}px`;
        contentWrapperElement.value.style.maxHeight = `${availableHeight}px`;
        emits("placed");
        requestAnimationFrame(() => shouldExpandOnScrollRef.value = true);
      }
    }
    const contentZIndex = vueExports.ref("");
    function handleScrollButtonChange(node) {
      if (node && shouldRepositionRef.value === true) {
        position();
        focusSelectedItem?.();
        shouldRepositionRef.value = false;
      }
    }
    useResizeObserver(rootContext.triggerElement, () => {
      position();
    });
    provideSelectItemAlignedPositionContext({
      contentWrapper: contentWrapperElement,
      shouldExpandOnScrollRef,
      onScrollButtonChange: handleScrollButtonChange
    });
    return (_ctx, _cache) => {
      return vueExports.openBlock(), vueExports.createElementBlock("div", {
        ref_key: "contentWrapperElement",
        ref: contentWrapperElement,
        style: vueExports.normalizeStyle({
          display: "flex",
          flexDirection: "column",
          position: "fixed",
          zIndex: contentZIndex.value
        })
      }, [vueExports.createVNode(vueExports.unref(Primitive), vueExports.mergeProps({
        ref: vueExports.unref(forwardRef),
        style: {
          boxSizing: "border-box",
          maxHeight: "100%"
        }
      }, {
        ..._ctx.$attrs,
        ...props
      }), {
        default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
        _: 3
      }, 16)], 4);
    };
  }
});
var SelectItemAlignedPosition_default = SelectItemAlignedPosition_vue_vue_type_script_setup_true_lang_default;
var SelectArrow_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
  __name: "SelectArrow",
  props: {
    width: {
      type: Number,
      required: false,
      default: 10
    },
    height: {
      type: Number,
      required: false,
      default: 5
    },
    rounded: {
      type: Boolean,
      required: false
    },
    asChild: {
      type: Boolean,
      required: false
    },
    as: {
      type: null,
      required: false,
      default: "svg"
    }
  },
  setup(__props) {
    const props = __props;
    const rootContext = injectSelectRootContext();
    const contentContext = injectSelectContentContext(SelectContentDefaultContextValue);
    return (_ctx, _cache) => {
      return vueExports.unref(rootContext).open.value && vueExports.unref(contentContext).position === "popper" ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(PopperArrow_default), vueExports.normalizeProps(vueExports.mergeProps({ key: 0 }, props)), {
        default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
        _: 3
      }, 16)) : vueExports.createCommentVNode("v-if", true);
    };
  }
});
var SelectArrow_default = SelectArrow_vue_vue_type_script_setup_true_lang_default;
var SelectProvider_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
  inheritAttrs: false,
  __name: "SelectProvider",
  props: { context: {
    type: Object,
    required: true
  } },
  setup(__props) {
    const props = __props;
    provideSelectRootContext(props.context);
    provideSelectContentContext(SelectContentDefaultContextValue);
    return (_ctx, _cache) => {
      return vueExports.renderSlot(_ctx.$slots, "default");
    };
  }
});
var SelectProvider_default = SelectProvider_vue_vue_type_script_setup_true_lang_default;
const _hoisted_1 = { key: 1 };
var SelectContent_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
  inheritAttrs: false,
  __name: "SelectContent",
  props: {
    forceMount: {
      type: Boolean,
      required: false
    },
    position: {
      type: String,
      required: false
    },
    bodyLock: {
      type: Boolean,
      required: false
    },
    side: {
      type: null,
      required: false
    },
    sideOffset: {
      type: Number,
      required: false
    },
    sideFlip: {
      type: Boolean,
      required: false
    },
    align: {
      type: null,
      required: false
    },
    alignOffset: {
      type: Number,
      required: false
    },
    alignFlip: {
      type: Boolean,
      required: false
    },
    avoidCollisions: {
      type: Boolean,
      required: false
    },
    collisionBoundary: {
      type: null,
      required: false
    },
    collisionPadding: {
      type: [Number, Object],
      required: false
    },
    arrowPadding: {
      type: Number,
      required: false
    },
    sticky: {
      type: String,
      required: false
    },
    hideWhenDetached: {
      type: Boolean,
      required: false
    },
    positionStrategy: {
      type: String,
      required: false
    },
    updatePositionStrategy: {
      type: String,
      required: false
    },
    disableUpdateOnLayoutShift: {
      type: Boolean,
      required: false
    },
    prioritizePosition: {
      type: Boolean,
      required: false
    },
    reference: {
      type: null,
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
  emits: [
    "closeAutoFocus",
    "escapeKeyDown",
    "pointerDownOutside"
  ],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const forwarded = useForwardPropsEmits(props, emits);
    const rootContext = injectSelectRootContext();
    const fragment = vueExports.ref();
    const presenceRef = vueExports.ref();
    const present = vueExports.computed(() => props.forceMount || rootContext.open.value);
    const renderPresence = vueExports.ref(present.value);
    vueExports.watch(present, () => {
      setTimeout(() => renderPresence.value = present.value);
    });
    return (_ctx, _cache) => {
      return present.value || renderPresence.value || presenceRef.value?.present ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(Presence_default), {
        key: 0,
        ref_key: "presenceRef",
        ref: presenceRef,
        present: present.value
      }, {
        default: vueExports.withCtx(() => [vueExports.createVNode(SelectContentImpl_default, vueExports.normalizeProps(vueExports.guardReactiveProps({
          ...vueExports.unref(forwarded),
          ..._ctx.$attrs
        })), {
          default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
          _: 3
        }, 16)]),
        _: 3
      }, 8, ["present"])) : fragment.value ? (vueExports.openBlock(), vueExports.createElementBlock("div", _hoisted_1, [(vueExports.openBlock(), vueExports.createBlock(vueExports.Teleport, { to: fragment.value }, [vueExports.createVNode(SelectProvider_default, { context: vueExports.unref(rootContext) }, {
        default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
        _: 3
      }, 8, ["context"])], 8, ["to"]))])) : vueExports.createCommentVNode("v-if", true);
    };
  }
});
var SelectContent_default = SelectContent_vue_vue_type_script_setup_true_lang_default;
const [injectSelectGroupContext, provideSelectGroupContext] = createContext("SelectGroup");
var SelectGroup_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
  __name: "SelectGroup",
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
    const id = useId(void 0, "reka-select-group");
    provideSelectGroupContext({ id });
    return (_ctx, _cache) => {
      return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(Primitive), vueExports.mergeProps({ role: "group" }, props, { "aria-labelledby": vueExports.unref(id) }), {
        default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
        _: 3
      }, 16, ["aria-labelledby"]);
    };
  }
});
var SelectGroup_default = SelectGroup_vue_vue_type_script_setup_true_lang_default;
const [injectSelectItemContext, provideSelectItemContext] = createContext("SelectItem");
var SelectItem_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
  __name: "SelectItem",
  props: {
    value: {
      type: null,
      required: true
    },
    disabled: {
      type: Boolean,
      required: false
    },
    textValue: {
      type: String,
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
  emits: ["select"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const { disabled } = vueExports.toRefs(props);
    const rootContext = injectSelectRootContext();
    const contentContext = injectSelectContentContext();
    const { forwardRef } = useForwardExpose();
    const { CollectionItem } = useCollection();
    const isSelected = vueExports.computed(() => valueComparator(rootContext.modelValue?.value, props.value, rootContext.by));
    const isFocused = vueExports.ref(false);
    const textValue = vueExports.ref(props.textValue ?? "");
    const textId = useId(void 0, "reka-select-item-text");
    const SELECT_SELECT = "select.select";
    async function handleSelectCustomEvent(ev) {
      if (ev.defaultPrevented) return;
      const eventDetail = {
        originalEvent: ev,
        value: props.value
      };
      handleAndDispatchCustomEvent(SELECT_SELECT, handleSelect, eventDetail);
    }
    async function handleSelect(ev) {
      await vueExports.nextTick();
      emits("select", ev);
      if (ev.defaultPrevented) return;
      if (!disabled.value) {
        rootContext.onValueChange(props.value);
        if (!rootContext.multiple.value) rootContext.onOpenChange(false);
      }
    }
    async function handlePointerMove(event) {
      await vueExports.nextTick();
      if (event.defaultPrevented) return;
      if (disabled.value) contentContext.onItemLeave?.();
      else event.currentTarget?.focus({ preventScroll: true });
    }
    async function handlePointerLeave(event) {
      await vueExports.nextTick();
      if (event.defaultPrevented) return;
      if (event.currentTarget === getActiveElement()) contentContext.onItemLeave?.();
    }
    async function handleKeyDown(event) {
      await vueExports.nextTick();
      if (event.defaultPrevented) return;
      const isTypingAhead = contentContext.searchRef?.value !== "";
      if (isTypingAhead && event.key === " ") return;
      if (SELECTION_KEYS.includes(event.key)) handleSelectCustomEvent(event);
      if (event.key === " ") event.preventDefault();
    }
    if (props.value === "") throw new Error("A <SelectItem /> must have a value prop that is not an empty string. This is because the Select value can be set to an empty string to clear the selection and show the placeholder.");
    provideSelectItemContext({
      value: props.value,
      disabled,
      textId,
      isSelected,
      onItemTextChange: (node) => {
        textValue.value = ((textValue.value || node?.textContent) ?? "").trim();
      }
    });
    return (_ctx, _cache) => {
      return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(CollectionItem), { value: { textValue: textValue.value } }, {
        default: vueExports.withCtx(() => [vueExports.createVNode(vueExports.unref(Primitive), {
          ref: vueExports.unref(forwardRef),
          role: "option",
          "aria-labelledby": vueExports.unref(textId),
          "data-highlighted": isFocused.value ? "" : void 0,
          "aria-selected": isSelected.value,
          "data-state": isSelected.value ? "checked" : "unchecked",
          "aria-disabled": vueExports.unref(disabled) || void 0,
          "data-disabled": vueExports.unref(disabled) ? "" : void 0,
          tabindex: vueExports.unref(disabled) ? void 0 : -1,
          as: _ctx.as,
          "as-child": _ctx.asChild,
          onFocus: _cache[0] || (_cache[0] = ($event) => isFocused.value = true),
          onBlur: _cache[1] || (_cache[1] = ($event) => isFocused.value = false),
          onPointerup: handleSelectCustomEvent,
          onPointerdown: _cache[2] || (_cache[2] = (event) => {
            event.currentTarget.focus({ preventScroll: true });
          }),
          onTouchend: _cache[3] || (_cache[3] = vueExports.withModifiers(() => {
          }, ["prevent", "stop"])),
          onPointermove: handlePointerMove,
          onPointerleave: handlePointerLeave,
          onKeydown: handleKeyDown
        }, {
          default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
          _: 3
        }, 8, [
          "aria-labelledby",
          "data-highlighted",
          "aria-selected",
          "data-state",
          "aria-disabled",
          "data-disabled",
          "tabindex",
          "as",
          "as-child"
        ])]),
        _: 3
      }, 8, ["value"]);
    };
  }
});
var SelectItem_default = SelectItem_vue_vue_type_script_setup_true_lang_default;
var SelectItemIndicator_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
  __name: "SelectItemIndicator",
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
    const props = __props;
    const itemContext = injectSelectItemContext();
    return (_ctx, _cache) => {
      return vueExports.unref(itemContext).isSelected.value ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(Primitive), vueExports.mergeProps({
        key: 0,
        "aria-hidden": "true"
      }, props), {
        default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
        _: 3
      }, 16)) : vueExports.createCommentVNode("v-if", true);
    };
  }
});
var SelectItemIndicator_default = SelectItemIndicator_vue_vue_type_script_setup_true_lang_default;
var SelectItemText_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
  inheritAttrs: false,
  __name: "SelectItemText",
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
    const props = __props;
    injectSelectRootContext();
    injectSelectContentContext();
    const itemContext = injectSelectItemContext();
    const { forwardRef, currentElement: itemTextElement } = useForwardExpose();
    vueExports.computed(() => {
      return {
        value: itemContext.value,
        disabled: itemContext.disabled.value,
        textContent: itemTextElement.value?.textContent ?? itemContext.value?.toString() ?? ""
      };
    });
    return (_ctx, _cache) => {
      return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(Primitive), vueExports.mergeProps({
        id: vueExports.unref(itemContext).textId,
        ref: vueExports.unref(forwardRef)
      }, {
        ...props,
        ..._ctx.$attrs
      }), {
        default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
        _: 3
      }, 16, ["id"]);
    };
  }
});
var SelectItemText_default = SelectItemText_vue_vue_type_script_setup_true_lang_default;
var SelectLabel_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
  __name: "SelectLabel",
  props: {
    for: {
      type: String,
      required: false
    },
    asChild: {
      type: Boolean,
      required: false
    },
    as: {
      type: null,
      required: false,
      default: "div"
    }
  },
  setup(__props) {
    const props = __props;
    const groupContext = injectSelectGroupContext({ id: "" });
    return (_ctx, _cache) => {
      return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(Primitive), vueExports.mergeProps(props, { id: vueExports.unref(groupContext).id }), {
        default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
        _: 3
      }, 16, ["id"]);
    };
  }
});
var SelectLabel_default = SelectLabel_vue_vue_type_script_setup_true_lang_default;
var SelectPortal_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
  __name: "SelectPortal",
  props: {
    to: {
      type: null,
      required: false
    },
    disabled: {
      type: Boolean,
      required: false
    },
    defer: {
      type: Boolean,
      required: false
    },
    forceMount: {
      type: Boolean,
      required: false
    }
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _cache) => {
      return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(Teleport_default), vueExports.normalizeProps(vueExports.guardReactiveProps(props)), {
        default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
        _: 3
      }, 16);
    };
  }
});
var SelectPortal_default = SelectPortal_vue_vue_type_script_setup_true_lang_default;
var SelectSeparator_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
  __name: "SelectSeparator",
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
    return (_ctx, _cache) => {
      return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(Primitive), vueExports.mergeProps({ "aria-hidden": "true" }, props), {
        default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
        _: 3
      }, 16);
    };
  }
});
var SelectSeparator_default = SelectSeparator_vue_vue_type_script_setup_true_lang_default;
var SelectTrigger_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
  __name: "SelectTrigger",
  props: {
    disabled: {
      type: Boolean,
      required: false
    },
    reference: {
      type: null,
      required: false
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
    const rootContext = injectSelectRootContext();
    const { forwardRef } = useForwardExpose();
    const isDisabled = vueExports.computed(() => rootContext.disabled?.value || props.disabled);
    rootContext.contentId ||= useId(void 0, "reka-select-content");
    const { getItems } = useCollection();
    const { search, handleTypeaheadSearch, resetTypeahead } = useTypeahead();
    function handleOpen() {
      if (!isDisabled.value) {
        rootContext.onOpenChange(true);
        resetTypeahead();
      }
    }
    function handlePointerOpen(event) {
      handleOpen();
      rootContext.triggerPointerDownPosRef.value = {
        x: Math.round(event.pageX),
        y: Math.round(event.pageY)
      };
    }
    return (_ctx, _cache) => {
      return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(PopperAnchor_default), {
        "as-child": "",
        reference: _ctx.reference
      }, {
        default: vueExports.withCtx(() => [vueExports.createVNode(vueExports.unref(Primitive), {
          ref: vueExports.unref(forwardRef),
          role: "combobox",
          type: _ctx.as === "button" ? "button" : void 0,
          "aria-controls": vueExports.unref(rootContext).contentId,
          "aria-expanded": vueExports.unref(rootContext).open.value || false,
          "aria-required": vueExports.unref(rootContext).required?.value,
          "aria-autocomplete": "none",
          disabled: isDisabled.value,
          dir: vueExports.unref(rootContext)?.dir.value,
          "data-state": vueExports.unref(rootContext)?.open.value ? "open" : "closed",
          "data-disabled": isDisabled.value ? "" : void 0,
          "data-placeholder": vueExports.unref(shouldShowPlaceholder)(vueExports.unref(rootContext).modelValue?.value) ? "" : void 0,
          "as-child": _ctx.asChild,
          as: _ctx.as,
          onClick: _cache[0] || (_cache[0] = (event) => {
            event?.currentTarget?.focus();
          }),
          onPointerdown: _cache[1] || (_cache[1] = (event) => {
            if (event.pointerType === "touch") return event.preventDefault();
            const target = event.target;
            if (target.hasPointerCapture(event.pointerId)) target.releasePointerCapture(event.pointerId);
            if (event.button === 0 && event.ctrlKey === false) {
              handlePointerOpen(event);
              event.preventDefault();
            }
          }),
          onPointerup: _cache[2] || (_cache[2] = vueExports.withModifiers((event) => {
            if (event.pointerType === "touch") handlePointerOpen(event);
          }, ["prevent"])),
          onKeydown: _cache[3] || (_cache[3] = (event) => {
            const isTypingAhead = vueExports.unref(search) !== "";
            const isModifierKey = event.ctrlKey || event.altKey || event.metaKey;
            if (!isModifierKey && event.key.length === 1) {
              if (isTypingAhead && event.key === " ") return;
            }
            vueExports.unref(handleTypeaheadSearch)(event.key, vueExports.unref(getItems)());
            if (vueExports.unref(OPEN_KEYS).includes(event.key)) {
              handleOpen();
              event.preventDefault();
            }
          })
        }, {
          default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
          _: 3
        }, 8, [
          "type",
          "aria-controls",
          "aria-expanded",
          "aria-required",
          "disabled",
          "dir",
          "data-state",
          "data-disabled",
          "data-placeholder",
          "as-child",
          "as"
        ])]),
        _: 3
      }, 8, ["reference"]);
    };
  }
});
var SelectTrigger_default = SelectTrigger_vue_vue_type_script_setup_true_lang_default;
const theme$1 = {
  "slots": {
    "base": [
      "relative group rounded-md inline-flex items-center focus:outline-none disabled:cursor-not-allowed disabled:opacity-75",
      "transition-colors"
    ],
    "leading": "absolute inset-y-0 start-0 flex items-center",
    "leadingIcon": "shrink-0 text-dimmed",
    "leadingAvatar": "shrink-0",
    "leadingAvatarSize": "",
    "trailing": "absolute inset-y-0 end-0 flex items-center",
    "trailingIcon": "shrink-0 text-dimmed",
    "value": "truncate pointer-events-none",
    "placeholder": "truncate text-dimmed",
    "arrow": "fill-default",
    "content": "max-h-60 w-(--reka-select-trigger-width) bg-default shadow-lg rounded-md ring ring-default overflow-hidden data-[state=open]:animate-[scale-in_100ms_ease-out] data-[state=closed]:animate-[scale-out_100ms_ease-in] origin-(--reka-select-content-transform-origin) pointer-events-auto flex flex-col",
    "viewport": "relative divide-y divide-default scroll-py-1 overflow-y-auto flex-1",
    "group": "p-1 isolate",
    "empty": "text-center text-muted",
    "label": "font-semibold text-highlighted",
    "separator": "-mx-1 my-1 h-px bg-border",
    "item": [
      "group relative w-full flex items-start select-none outline-none before:absolute before:z-[-1] before:inset-px before:rounded-md data-disabled:cursor-not-allowed data-disabled:opacity-75 text-default data-highlighted:not-data-disabled:text-highlighted data-highlighted:not-data-disabled:before:bg-elevated/50",
      "transition-colors before:transition-colors"
    ],
    "itemLeadingIcon": [
      "shrink-0 text-dimmed group-data-highlighted:not-group-data-disabled:text-default",
      "transition-colors"
    ],
    "itemLeadingAvatar": "shrink-0",
    "itemLeadingAvatarSize": "",
    "itemLeadingChip": "shrink-0",
    "itemLeadingChipSize": "",
    "itemTrailing": "ms-auto inline-flex gap-1.5 items-center",
    "itemTrailingIcon": "shrink-0",
    "itemWrapper": "flex-1 flex flex-col min-w-0",
    "itemLabel": "truncate",
    "itemDescription": "truncate text-muted"
  },
  "variants": {
    "fieldGroup": {
      "horizontal": "not-only:first:rounded-e-none not-only:last:rounded-s-none not-last:not-first:rounded-none focus-visible:z-[1]",
      "vertical": "not-only:first:rounded-b-none not-only:last:rounded-t-none not-last:not-first:rounded-none focus-visible:z-[1]"
    },
    "size": {
      "xs": {
        "base": "px-2 py-1 text-xs gap-1",
        "leading": "ps-2",
        "trailing": "pe-2",
        "leadingIcon": "size-4",
        "leadingAvatarSize": "3xs",
        "trailingIcon": "size-4",
        "label": "p-1 text-[10px]/3 gap-1",
        "item": "p-1 text-xs gap-1",
        "itemLeadingIcon": "size-4",
        "itemLeadingAvatarSize": "3xs",
        "itemLeadingChip": "size-4",
        "itemLeadingChipSize": "sm",
        "itemTrailingIcon": "size-4",
        "empty": "p-1 text-xs"
      },
      "sm": {
        "base": "px-2.5 py-1.5 text-xs gap-1.5",
        "leading": "ps-2.5",
        "trailing": "pe-2.5",
        "leadingIcon": "size-4",
        "leadingAvatarSize": "3xs",
        "trailingIcon": "size-4",
        "label": "p-1.5 text-[10px]/3 gap-1.5",
        "item": "p-1.5 text-xs gap-1.5",
        "itemLeadingIcon": "size-4",
        "itemLeadingAvatarSize": "3xs",
        "itemLeadingChip": "size-4",
        "itemLeadingChipSize": "sm",
        "itemTrailingIcon": "size-4",
        "empty": "p-1.5 text-xs"
      },
      "md": {
        "base": "px-2.5 py-1.5 text-sm gap-1.5",
        "leading": "ps-2.5",
        "trailing": "pe-2.5",
        "leadingIcon": "size-5",
        "leadingAvatarSize": "2xs",
        "trailingIcon": "size-5",
        "label": "p-1.5 text-xs gap-1.5",
        "item": "p-1.5 text-sm gap-1.5",
        "itemLeadingIcon": "size-5",
        "itemLeadingAvatarSize": "2xs",
        "itemLeadingChip": "size-5",
        "itemLeadingChipSize": "md",
        "itemTrailingIcon": "size-5",
        "empty": "p-1.5 text-sm"
      },
      "lg": {
        "base": "px-3 py-2 text-sm gap-2",
        "leading": "ps-3",
        "trailing": "pe-3",
        "leadingIcon": "size-5",
        "leadingAvatarSize": "2xs",
        "trailingIcon": "size-5",
        "label": "p-2 text-xs gap-2",
        "item": "p-2 text-sm gap-2",
        "itemLeadingIcon": "size-5",
        "itemLeadingAvatarSize": "2xs",
        "itemLeadingChip": "size-5",
        "itemLeadingChipSize": "md",
        "itemTrailingIcon": "size-5",
        "empty": "p-2 text-sm"
      },
      "xl": {
        "base": "px-3 py-2 text-base gap-2",
        "leading": "ps-3",
        "trailing": "pe-3",
        "leadingIcon": "size-6",
        "leadingAvatarSize": "xs",
        "trailingIcon": "size-6",
        "label": "p-2 text-sm gap-2",
        "item": "p-2 text-base gap-2",
        "itemLeadingIcon": "size-6",
        "itemLeadingAvatarSize": "xs",
        "itemLeadingChip": "size-6",
        "itemLeadingChipSize": "lg",
        "itemTrailingIcon": "size-6",
        "empty": "p-2 text-base"
      }
    },
    "variant": {
      "outline": "text-highlighted bg-default ring ring-inset ring-accented",
      "soft": "text-highlighted bg-elevated/50 hover:bg-elevated focus:bg-elevated disabled:bg-elevated/50",
      "subtle": "text-highlighted bg-elevated ring ring-inset ring-accented",
      "ghost": "text-highlighted bg-transparent hover:bg-elevated focus:bg-elevated disabled:bg-transparent dark:disabled:bg-transparent",
      "none": "text-highlighted bg-transparent"
    },
    "color": {
      "primary": "",
      "secondary": "",
      "success": "",
      "info": "",
      "warning": "",
      "error": "",
      "neutral": ""
    },
    "leading": {
      "true": ""
    },
    "trailing": {
      "true": ""
    },
    "loading": {
      "true": ""
    },
    "highlight": {
      "true": ""
    },
    "type": {
      "file": "file:me-1.5 file:font-medium file:text-muted file:outline-none"
    }
  },
  "compoundVariants": [
    {
      "color": "primary",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus:ring-2 focus:ring-inset focus:ring-primary"
    },
    {
      "color": "secondary",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus:ring-2 focus:ring-inset focus:ring-secondary"
    },
    {
      "color": "success",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus:ring-2 focus:ring-inset focus:ring-success"
    },
    {
      "color": "info",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus:ring-2 focus:ring-inset focus:ring-info"
    },
    {
      "color": "warning",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus:ring-2 focus:ring-inset focus:ring-warning"
    },
    {
      "color": "error",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus:ring-2 focus:ring-inset focus:ring-error"
    },
    {
      "color": "primary",
      "highlight": true,
      "class": "ring ring-inset ring-primary"
    },
    {
      "color": "secondary",
      "highlight": true,
      "class": "ring ring-inset ring-secondary"
    },
    {
      "color": "success",
      "highlight": true,
      "class": "ring ring-inset ring-success"
    },
    {
      "color": "info",
      "highlight": true,
      "class": "ring ring-inset ring-info"
    },
    {
      "color": "warning",
      "highlight": true,
      "class": "ring ring-inset ring-warning"
    },
    {
      "color": "error",
      "highlight": true,
      "class": "ring ring-inset ring-error"
    },
    {
      "color": "neutral",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus:ring-2 focus:ring-inset focus:ring-inverted"
    },
    {
      "color": "neutral",
      "highlight": true,
      "class": "ring ring-inset ring-inverted"
    },
    {
      "leading": true,
      "size": "xs",
      "class": "ps-7"
    },
    {
      "leading": true,
      "size": "sm",
      "class": "ps-8"
    },
    {
      "leading": true,
      "size": "md",
      "class": "ps-9"
    },
    {
      "leading": true,
      "size": "lg",
      "class": "ps-10"
    },
    {
      "leading": true,
      "size": "xl",
      "class": "ps-11"
    },
    {
      "trailing": true,
      "size": "xs",
      "class": "pe-7"
    },
    {
      "trailing": true,
      "size": "sm",
      "class": "pe-8"
    },
    {
      "trailing": true,
      "size": "md",
      "class": "pe-9"
    },
    {
      "trailing": true,
      "size": "lg",
      "class": "pe-10"
    },
    {
      "trailing": true,
      "size": "xl",
      "class": "pe-11"
    },
    {
      "loading": true,
      "leading": true,
      "class": {
        "leadingIcon": "animate-spin"
      }
    },
    {
      "loading": true,
      "leading": false,
      "trailing": true,
      "class": {
        "trailingIcon": "animate-spin"
      }
    }
  ],
  "defaultVariants": {
    "size": "md",
    "color": "primary",
    "variant": "outline"
  }
};
const _sfc_main$1 = /* @__PURE__ */ Object.assign({ inheritAttrs: false }, {
  __name: "USelect",
  __ssrInlineRender: true,
  props: {
    id: { type: String, required: false },
    placeholder: { type: String, required: false },
    color: { type: null, required: false },
    variant: { type: null, required: false },
    size: { type: null, required: false },
    trailingIcon: { type: null, required: false },
    selectedIcon: { type: null, required: false },
    content: { type: Object, required: false },
    arrow: { type: [Boolean, Object], required: false },
    portal: { type: [Boolean, String], required: false, skipCheck: true, default: true },
    valueKey: { type: null, required: false, default: "value" },
    labelKey: { type: null, required: false, default: "label" },
    descriptionKey: { type: null, required: false, default: "description" },
    items: { type: null, required: false },
    defaultValue: { type: null, required: false },
    modelValue: { type: null, required: false },
    multiple: { type: Boolean, required: false },
    highlight: { type: Boolean, required: false },
    autofocus: { type: Boolean, required: false },
    autofocusDelay: { type: Number, required: false, default: 0 },
    class: { type: null, required: false },
    ui: { type: null, required: false },
    open: { type: Boolean, required: false },
    defaultOpen: { type: Boolean, required: false },
    autocomplete: { type: String, required: false },
    disabled: { type: Boolean, required: false },
    name: { type: String, required: false },
    required: { type: Boolean, required: false },
    icon: { type: null, required: false },
    avatar: { type: Object, required: false },
    leading: { type: Boolean, required: false },
    leadingIcon: { type: null, required: false },
    trailing: { type: Boolean, required: false },
    loading: { type: Boolean, required: false },
    loadingIcon: { type: null, required: false }
  },
  emits: ["update:open", "change", "blur", "focus", "update:modelValue"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const slots = vueExports.useSlots();
    const appConfig = useAppConfig();
    const rootProps = useForwardPropsEmits(reactivePick(props, "open", "defaultOpen", "disabled", "autocomplete", "required", "multiple"), emits);
    const portalProps = usePortal(vueExports.toRef(() => props.portal));
    const contentProps = vueExports.toRef(() => defu(props.content, { side: "bottom", sideOffset: 8, collisionPadding: 8, position: "popper" }));
    const arrowProps = vueExports.toRef(() => props.arrow);
    const { emitFormChange, emitFormInput, emitFormBlur, emitFormFocus, size: formGroupSize, color, id, name, highlight, disabled, ariaAttrs } = useFormField(props);
    const { orientation, size: fieldGroupSize } = useFieldGroup(props);
    const { isLeading, isTrailing, leadingIconName, trailingIconName } = useComponentIcons(vueExports.toRef(() => defu(props, { trailingIcon: appConfig.ui.icons.chevronDown })));
    const selectSize = vueExports.computed(() => fieldGroupSize.value || formGroupSize.value);
    const ui = vueExports.computed(() => tv({ extend: tv(theme$1), ...appConfig.ui?.select || {} })({
      color: color.value,
      variant: props.variant,
      size: selectSize?.value,
      loading: props.loading,
      highlight: highlight.value,
      leading: isLeading.value || !!props.avatar || !!slots.leading,
      trailing: isTrailing.value || !!slots.trailing,
      fieldGroup: orientation.value
    }));
    const groups = vueExports.computed(
      () => props.items?.length ? isArrayOfArray(props.items) ? props.items : [props.items] : []
    );
    const items = vueExports.computed(() => groups.value.flatMap((group) => group));
    function displayValue(value) {
      if (props.multiple && Array.isArray(value)) {
        const displayedValues = value.map((item) => getDisplayValue(items.value, item, {
          labelKey: props.labelKey,
          valueKey: props.valueKey
        })).filter((v) => v != null && v !== "");
        return displayedValues.length > 0 ? displayedValues.join(", ") : void 0;
      }
      return getDisplayValue(items.value, value, {
        labelKey: props.labelKey,
        valueKey: props.valueKey
      });
    }
    const triggerRef = vueExports.useTemplateRef("triggerRef");
    function onUpdate(value) {
      const event = new Event("change", { target: { value } });
      emits("change", event);
      emitFormChange();
      emitFormInput();
    }
    function onUpdateOpen(value) {
      if (!value) {
        const event = new FocusEvent("blur");
        emits("blur", event);
        emitFormBlur();
      } else {
        const event = new FocusEvent("focus");
        emits("focus", event);
        emitFormFocus();
      }
    }
    function isSelectItem(item) {
      return typeof item === "object" && item !== null;
    }
    __expose({
      triggerRef: vueExports.toRef(() => triggerRef.value?.$el)
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(serverRenderer_cjs_prodExports.ssrRenderComponent(vueExports.unref(SelectRoot_default), vueExports.mergeProps({ name: vueExports.unref(name) }, vueExports.unref(rootProps), {
        autocomplete: __props.autocomplete,
        disabled: vueExports.unref(disabled),
        "default-value": __props.defaultValue,
        "model-value": __props.modelValue,
        "onUpdate:modelValue": onUpdate,
        "onUpdate:open": onUpdateOpen
      }, _attrs), {
        default: vueExports.withCtx(({ modelValue, open }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(vueExports.unref(SelectTrigger_default), vueExports.mergeProps({
              id: vueExports.unref(id),
              ref_key: "triggerRef",
              ref: triggerRef,
              "data-slot": "base",
              class: ui.value.base({ class: [props.ui?.base, props.class] })
            }, { ..._ctx.$attrs, ...vueExports.unref(ariaAttrs) }), {
              default: vueExports.withCtx((_, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (vueExports.unref(isLeading) || !!__props.avatar || !!slots.leading) {
                    _push3(`<span data-slot="leading" class="${serverRenderer_cjs_prodExports.ssrRenderClass(ui.value.leading({ class: props.ui?.leading }))}"${_scopeId2}>`);
                    serverRenderer_cjs_prodExports.ssrRenderSlot(_ctx.$slots, "leading", {
                      modelValue,
                      open,
                      ui: ui.value
                    }, () => {
                      if (vueExports.unref(isLeading) && vueExports.unref(leadingIconName)) {
                        _push3(serverRenderer_cjs_prodExports.ssrRenderComponent(_sfc_main$d, {
                          name: vueExports.unref(leadingIconName),
                          "data-slot": "leadingIcon",
                          class: ui.value.leadingIcon({ class: props.ui?.leadingIcon })
                        }, null, _parent3, _scopeId2));
                      } else if (!!__props.avatar) {
                        _push3(serverRenderer_cjs_prodExports.ssrRenderComponent(_sfc_main$b, vueExports.mergeProps({
                          size: props.ui?.itemLeadingAvatarSize || ui.value.itemLeadingAvatarSize()
                        }, __props.avatar, {
                          "data-slot": "itemLeadingAvatar",
                          class: ui.value.itemLeadingAvatar({ class: props.ui?.itemLeadingAvatar })
                        }), null, _parent3, _scopeId2));
                      } else {
                        _push3(`<!---->`);
                      }
                    }, _push3, _parent3, _scopeId2);
                    _push3(`</span>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  serverRenderer_cjs_prodExports.ssrRenderSlot(_ctx.$slots, "default", {
                    modelValue,
                    open,
                    ui: ui.value
                  }, () => {
                    _push3(`<!--[-->`);
                    serverRenderer_cjs_prodExports.ssrRenderList([displayValue(modelValue)], (displayedModelValue) => {
                      _push3(`<!--[-->`);
                      if (displayedModelValue !== void 0 && displayedModelValue !== null) {
                        _push3(`<span data-slot="value" class="${serverRenderer_cjs_prodExports.ssrRenderClass(ui.value.value({ class: props.ui?.value }))}"${_scopeId2}>${serverRenderer_cjs_prodExports.ssrInterpolate(displayedModelValue)}</span>`);
                      } else {
                        _push3(`<span data-slot="placeholder" class="${serverRenderer_cjs_prodExports.ssrRenderClass(ui.value.placeholder({ class: props.ui?.placeholder }))}"${_scopeId2}>${serverRenderer_cjs_prodExports.ssrInterpolate(__props.placeholder ?? " ")}</span>`);
                      }
                      _push3(`<!--]-->`);
                    });
                    _push3(`<!--]-->`);
                  }, _push3, _parent3, _scopeId2);
                  if (vueExports.unref(isTrailing) || !!slots.trailing) {
                    _push3(`<span data-slot="trailing" class="${serverRenderer_cjs_prodExports.ssrRenderClass(ui.value.trailing({ class: props.ui?.trailing }))}"${_scopeId2}>`);
                    serverRenderer_cjs_prodExports.ssrRenderSlot(_ctx.$slots, "trailing", {
                      modelValue,
                      open,
                      ui: ui.value
                    }, () => {
                      if (vueExports.unref(trailingIconName)) {
                        _push3(serverRenderer_cjs_prodExports.ssrRenderComponent(_sfc_main$d, {
                          name: vueExports.unref(trailingIconName),
                          "data-slot": "trailingIcon",
                          class: ui.value.trailingIcon({ class: props.ui?.trailingIcon })
                        }, null, _parent3, _scopeId2));
                      } else {
                        _push3(`<!---->`);
                      }
                    }, _push3, _parent3, _scopeId2);
                    _push3(`</span>`);
                  } else {
                    _push3(`<!---->`);
                  }
                } else {
                  return [
                    vueExports.unref(isLeading) || !!__props.avatar || !!slots.leading ? (vueExports.openBlock(), vueExports.createBlock("span", {
                      key: 0,
                      "data-slot": "leading",
                      class: ui.value.leading({ class: props.ui?.leading })
                    }, [
                      vueExports.renderSlot(_ctx.$slots, "leading", {
                        modelValue,
                        open,
                        ui: ui.value
                      }, () => [
                        vueExports.unref(isLeading) && vueExports.unref(leadingIconName) ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$d, {
                          key: 0,
                          name: vueExports.unref(leadingIconName),
                          "data-slot": "leadingIcon",
                          class: ui.value.leadingIcon({ class: props.ui?.leadingIcon })
                        }, null, 8, ["name", "class"])) : !!__props.avatar ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$b, vueExports.mergeProps({
                          key: 1,
                          size: props.ui?.itemLeadingAvatarSize || ui.value.itemLeadingAvatarSize()
                        }, __props.avatar, {
                          "data-slot": "itemLeadingAvatar",
                          class: ui.value.itemLeadingAvatar({ class: props.ui?.itemLeadingAvatar })
                        }), null, 16, ["size", "class"])) : vueExports.createCommentVNode("", true)
                      ])
                    ], 2)) : vueExports.createCommentVNode("", true),
                    vueExports.renderSlot(_ctx.$slots, "default", {
                      modelValue,
                      open,
                      ui: ui.value
                    }, () => [
                      (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList([displayValue(modelValue)], (displayedModelValue) => {
                        return vueExports.openBlock(), vueExports.createBlock(vueExports.Fragment, { key: displayedModelValue }, [
                          displayedModelValue !== void 0 && displayedModelValue !== null ? (vueExports.openBlock(), vueExports.createBlock("span", {
                            key: 0,
                            "data-slot": "value",
                            class: ui.value.value({ class: props.ui?.value })
                          }, vueExports.toDisplayString(displayedModelValue), 3)) : (vueExports.openBlock(), vueExports.createBlock("span", {
                            key: 1,
                            "data-slot": "placeholder",
                            class: ui.value.placeholder({ class: props.ui?.placeholder })
                          }, vueExports.toDisplayString(__props.placeholder ?? " "), 3))
                        ], 64);
                      }), 128))
                    ]),
                    vueExports.unref(isTrailing) || !!slots.trailing ? (vueExports.openBlock(), vueExports.createBlock("span", {
                      key: 1,
                      "data-slot": "trailing",
                      class: ui.value.trailing({ class: props.ui?.trailing })
                    }, [
                      vueExports.renderSlot(_ctx.$slots, "trailing", {
                        modelValue,
                        open,
                        ui: ui.value
                      }, () => [
                        vueExports.unref(trailingIconName) ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$d, {
                          key: 0,
                          name: vueExports.unref(trailingIconName),
                          "data-slot": "trailingIcon",
                          class: ui.value.trailingIcon({ class: props.ui?.trailingIcon })
                        }, null, 8, ["name", "class"])) : vueExports.createCommentVNode("", true)
                      ])
                    ], 2)) : vueExports.createCommentVNode("", true)
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
            _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(vueExports.unref(SelectPortal_default), vueExports.unref(portalProps), {
              default: vueExports.withCtx((_, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(serverRenderer_cjs_prodExports.ssrRenderComponent(vueExports.unref(SelectContent_default), vueExports.mergeProps({
                    "data-slot": "content",
                    class: ui.value.content({ class: props.ui?.content })
                  }, contentProps.value), {
                    default: vueExports.withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        serverRenderer_cjs_prodExports.ssrRenderSlot(_ctx.$slots, "content-top", {}, null, _push4, _parent4, _scopeId3);
                        _push4(`<div role="presentation" data-slot="viewport" class="${serverRenderer_cjs_prodExports.ssrRenderClass(ui.value.viewport({ class: props.ui?.viewport }))}"${_scopeId3}><!--[-->`);
                        serverRenderer_cjs_prodExports.ssrRenderList(groups.value, (group, groupIndex) => {
                          _push4(serverRenderer_cjs_prodExports.ssrRenderComponent(vueExports.unref(SelectGroup_default), {
                            key: `group-${groupIndex}`,
                            "data-slot": "group",
                            class: ui.value.group({ class: props.ui?.group })
                          }, {
                            default: vueExports.withCtx((_3, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`<!--[-->`);
                                serverRenderer_cjs_prodExports.ssrRenderList(group, (item, index) => {
                                  _push5(`<!--[-->`);
                                  if (isSelectItem(item) && item.type === "label") {
                                    _push5(serverRenderer_cjs_prodExports.ssrRenderComponent(vueExports.unref(SelectLabel_default), {
                                      "data-slot": "label",
                                      class: ui.value.label({ class: [props.ui?.label, item.ui?.label, item.class] })
                                    }, {
                                      default: vueExports.withCtx((_4, _push6, _parent6, _scopeId5) => {
                                        if (_push6) {
                                          _push6(`${serverRenderer_cjs_prodExports.ssrInterpolate(vueExports.unref(get)(item, props.labelKey))}`);
                                        } else {
                                          return [
                                            vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(get)(item, props.labelKey)), 1)
                                          ];
                                        }
                                      }),
                                      _: 2
                                    }, _parent5, _scopeId4));
                                  } else if (isSelectItem(item) && item.type === "separator") {
                                    _push5(serverRenderer_cjs_prodExports.ssrRenderComponent(vueExports.unref(SelectSeparator_default), {
                                      "data-slot": "separator",
                                      class: ui.value.separator({ class: [props.ui?.separator, item.ui?.separator, item.class] })
                                    }, null, _parent5, _scopeId4));
                                  } else {
                                    _push5(serverRenderer_cjs_prodExports.ssrRenderComponent(vueExports.unref(SelectItem_default), {
                                      "data-slot": "item",
                                      class: ui.value.item({ class: [props.ui?.item, isSelectItem(item) && item.ui?.item, isSelectItem(item) && item.class] }),
                                      disabled: isSelectItem(item) && item.disabled,
                                      value: isSelectItem(item) ? vueExports.unref(get)(item, props.valueKey) : item,
                                      onSelect: ($event) => isSelectItem(item) && item.onSelect?.($event)
                                    }, {
                                      default: vueExports.withCtx((_4, _push6, _parent6, _scopeId5) => {
                                        if (_push6) {
                                          serverRenderer_cjs_prodExports.ssrRenderSlot(_ctx.$slots, "item", {
                                            item,
                                            index,
                                            ui: ui.value
                                          }, () => {
                                            serverRenderer_cjs_prodExports.ssrRenderSlot(_ctx.$slots, "item-leading", {
                                              item,
                                              index,
                                              ui: ui.value
                                            }, () => {
                                              if (isSelectItem(item) && item.icon) {
                                                _push6(serverRenderer_cjs_prodExports.ssrRenderComponent(_sfc_main$d, {
                                                  name: item.icon,
                                                  "data-slot": "itemLeadingIcon",
                                                  class: ui.value.itemLeadingIcon({ class: [props.ui?.itemLeadingIcon, item.ui?.itemLeadingIcon] })
                                                }, null, _parent6, _scopeId5));
                                              } else if (isSelectItem(item) && item.avatar) {
                                                _push6(serverRenderer_cjs_prodExports.ssrRenderComponent(_sfc_main$b, vueExports.mergeProps({
                                                  size: item.ui?.itemLeadingAvatarSize || props.ui?.itemLeadingAvatarSize || ui.value.itemLeadingAvatarSize()
                                                }, { ref_for: true }, item.avatar, {
                                                  "data-slot": "itemLeadingAvatar",
                                                  class: ui.value.itemLeadingAvatar({ class: [props.ui?.itemLeadingAvatar, item.ui?.itemLeadingAvatar] })
                                                }), null, _parent6, _scopeId5));
                                              } else if (isSelectItem(item) && item.chip) {
                                                _push6(serverRenderer_cjs_prodExports.ssrRenderComponent(_sfc_main$c, vueExports.mergeProps({
                                                  size: item.ui?.itemLeadingChipSize || props.ui?.itemLeadingChipSize || ui.value.itemLeadingChipSize(),
                                                  inset: "",
                                                  standalone: ""
                                                }, { ref_for: true }, item.chip, {
                                                  "data-slot": "itemLeadingChip",
                                                  class: ui.value.itemLeadingChip({ class: [props.ui?.itemLeadingChip, item.ui?.itemLeadingChip] })
                                                }), null, _parent6, _scopeId5));
                                              } else {
                                                _push6(`<!---->`);
                                              }
                                            }, _push6, _parent6, _scopeId5);
                                            _push6(`<span data-slot="itemWrapper" class="${serverRenderer_cjs_prodExports.ssrRenderClass(ui.value.itemWrapper({ class: [props.ui?.itemWrapper, isSelectItem(item) && item.ui?.itemWrapper] }))}"${_scopeId5}>`);
                                            _push6(serverRenderer_cjs_prodExports.ssrRenderComponent(vueExports.unref(SelectItemText_default), {
                                              "data-slot": "itemLabel",
                                              class: ui.value.itemLabel({ class: [props.ui?.itemLabel, isSelectItem(item) && item.ui?.itemLabel] })
                                            }, {
                                              default: vueExports.withCtx((_5, _push7, _parent7, _scopeId6) => {
                                                if (_push7) {
                                                  serverRenderer_cjs_prodExports.ssrRenderSlot(_ctx.$slots, "item-label", {
                                                    item,
                                                    index
                                                  }, () => {
                                                    _push7(`${serverRenderer_cjs_prodExports.ssrInterpolate(isSelectItem(item) ? vueExports.unref(get)(item, props.labelKey) : item)}`);
                                                  }, _push7, _parent7, _scopeId6);
                                                } else {
                                                  return [
                                                    vueExports.renderSlot(_ctx.$slots, "item-label", {
                                                      item,
                                                      index
                                                    }, () => [
                                                      vueExports.createTextVNode(vueExports.toDisplayString(isSelectItem(item) ? vueExports.unref(get)(item, props.labelKey) : item), 1)
                                                    ])
                                                  ];
                                                }
                                              }),
                                              _: 2
                                            }, _parent6, _scopeId5));
                                            if (isSelectItem(item) && (vueExports.unref(get)(item, props.descriptionKey) || !!slots["item-description"])) {
                                              _push6(`<span data-slot="itemDescription" class="${serverRenderer_cjs_prodExports.ssrRenderClass(ui.value.itemDescription({ class: [props.ui?.itemDescription, isSelectItem(item) && item.ui?.itemDescription] }))}"${_scopeId5}>`);
                                              serverRenderer_cjs_prodExports.ssrRenderSlot(_ctx.$slots, "item-description", {
                                                item,
                                                index
                                              }, () => {
                                                _push6(`${serverRenderer_cjs_prodExports.ssrInterpolate(vueExports.unref(get)(item, props.descriptionKey))}`);
                                              }, _push6, _parent6, _scopeId5);
                                              _push6(`</span>`);
                                            } else {
                                              _push6(`<!---->`);
                                            }
                                            _push6(`</span><span data-slot="itemTrailing" class="${serverRenderer_cjs_prodExports.ssrRenderClass(ui.value.itemTrailing({ class: [props.ui?.itemTrailing, isSelectItem(item) && item.ui?.itemTrailing] }))}"${_scopeId5}>`);
                                            serverRenderer_cjs_prodExports.ssrRenderSlot(_ctx.$slots, "item-trailing", {
                                              item,
                                              index,
                                              ui: ui.value
                                            }, null, _push6, _parent6, _scopeId5);
                                            _push6(serverRenderer_cjs_prodExports.ssrRenderComponent(vueExports.unref(SelectItemIndicator_default), { "as-child": "" }, {
                                              default: vueExports.withCtx((_5, _push7, _parent7, _scopeId6) => {
                                                if (_push7) {
                                                  _push7(serverRenderer_cjs_prodExports.ssrRenderComponent(_sfc_main$d, {
                                                    name: __props.selectedIcon || vueExports.unref(appConfig).ui.icons.check,
                                                    "data-slot": "itemTrailingIcon",
                                                    class: ui.value.itemTrailingIcon({ class: [props.ui?.itemTrailingIcon, isSelectItem(item) && item.ui?.itemTrailingIcon] })
                                                  }, null, _parent7, _scopeId6));
                                                } else {
                                                  return [
                                                    vueExports.createVNode(_sfc_main$d, {
                                                      name: __props.selectedIcon || vueExports.unref(appConfig).ui.icons.check,
                                                      "data-slot": "itemTrailingIcon",
                                                      class: ui.value.itemTrailingIcon({ class: [props.ui?.itemTrailingIcon, isSelectItem(item) && item.ui?.itemTrailingIcon] })
                                                    }, null, 8, ["name", "class"])
                                                  ];
                                                }
                                              }),
                                              _: 2
                                            }, _parent6, _scopeId5));
                                            _push6(`</span>`);
                                          }, _push6, _parent6, _scopeId5);
                                        } else {
                                          return [
                                            vueExports.renderSlot(_ctx.$slots, "item", {
                                              item,
                                              index,
                                              ui: ui.value
                                            }, () => [
                                              vueExports.renderSlot(_ctx.$slots, "item-leading", {
                                                item,
                                                index,
                                                ui: ui.value
                                              }, () => [
                                                isSelectItem(item) && item.icon ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$d, {
                                                  key: 0,
                                                  name: item.icon,
                                                  "data-slot": "itemLeadingIcon",
                                                  class: ui.value.itemLeadingIcon({ class: [props.ui?.itemLeadingIcon, item.ui?.itemLeadingIcon] })
                                                }, null, 8, ["name", "class"])) : isSelectItem(item) && item.avatar ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$b, vueExports.mergeProps({
                                                  key: 1,
                                                  size: item.ui?.itemLeadingAvatarSize || props.ui?.itemLeadingAvatarSize || ui.value.itemLeadingAvatarSize()
                                                }, { ref_for: true }, item.avatar, {
                                                  "data-slot": "itemLeadingAvatar",
                                                  class: ui.value.itemLeadingAvatar({ class: [props.ui?.itemLeadingAvatar, item.ui?.itemLeadingAvatar] })
                                                }), null, 16, ["size", "class"])) : isSelectItem(item) && item.chip ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$c, vueExports.mergeProps({
                                                  key: 2,
                                                  size: item.ui?.itemLeadingChipSize || props.ui?.itemLeadingChipSize || ui.value.itemLeadingChipSize(),
                                                  inset: "",
                                                  standalone: ""
                                                }, { ref_for: true }, item.chip, {
                                                  "data-slot": "itemLeadingChip",
                                                  class: ui.value.itemLeadingChip({ class: [props.ui?.itemLeadingChip, item.ui?.itemLeadingChip] })
                                                }), null, 16, ["size", "class"])) : vueExports.createCommentVNode("", true)
                                              ]),
                                              vueExports.createVNode("span", {
                                                "data-slot": "itemWrapper",
                                                class: ui.value.itemWrapper({ class: [props.ui?.itemWrapper, isSelectItem(item) && item.ui?.itemWrapper] })
                                              }, [
                                                vueExports.createVNode(vueExports.unref(SelectItemText_default), {
                                                  "data-slot": "itemLabel",
                                                  class: ui.value.itemLabel({ class: [props.ui?.itemLabel, isSelectItem(item) && item.ui?.itemLabel] })
                                                }, {
                                                  default: vueExports.withCtx(() => [
                                                    vueExports.renderSlot(_ctx.$slots, "item-label", {
                                                      item,
                                                      index
                                                    }, () => [
                                                      vueExports.createTextVNode(vueExports.toDisplayString(isSelectItem(item) ? vueExports.unref(get)(item, props.labelKey) : item), 1)
                                                    ])
                                                  ]),
                                                  _: 2
                                                }, 1032, ["class"]),
                                                isSelectItem(item) && (vueExports.unref(get)(item, props.descriptionKey) || !!slots["item-description"]) ? (vueExports.openBlock(), vueExports.createBlock("span", {
                                                  key: 0,
                                                  "data-slot": "itemDescription",
                                                  class: ui.value.itemDescription({ class: [props.ui?.itemDescription, isSelectItem(item) && item.ui?.itemDescription] })
                                                }, [
                                                  vueExports.renderSlot(_ctx.$slots, "item-description", {
                                                    item,
                                                    index
                                                  }, () => [
                                                    vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(get)(item, props.descriptionKey)), 1)
                                                  ])
                                                ], 2)) : vueExports.createCommentVNode("", true)
                                              ], 2),
                                              vueExports.createVNode("span", {
                                                "data-slot": "itemTrailing",
                                                class: ui.value.itemTrailing({ class: [props.ui?.itemTrailing, isSelectItem(item) && item.ui?.itemTrailing] })
                                              }, [
                                                vueExports.renderSlot(_ctx.$slots, "item-trailing", {
                                                  item,
                                                  index,
                                                  ui: ui.value
                                                }),
                                                vueExports.createVNode(vueExports.unref(SelectItemIndicator_default), { "as-child": "" }, {
                                                  default: vueExports.withCtx(() => [
                                                    vueExports.createVNode(_sfc_main$d, {
                                                      name: __props.selectedIcon || vueExports.unref(appConfig).ui.icons.check,
                                                      "data-slot": "itemTrailingIcon",
                                                      class: ui.value.itemTrailingIcon({ class: [props.ui?.itemTrailingIcon, isSelectItem(item) && item.ui?.itemTrailingIcon] })
                                                    }, null, 8, ["name", "class"])
                                                  ]),
                                                  _: 2
                                                }, 1024)
                                              ], 2)
                                            ])
                                          ];
                                        }
                                      }),
                                      _: 2
                                    }, _parent5, _scopeId4));
                                  }
                                  _push5(`<!--]-->`);
                                });
                                _push5(`<!--]-->`);
                              } else {
                                return [
                                  (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(group, (item, index) => {
                                    return vueExports.openBlock(), vueExports.createBlock(vueExports.Fragment, {
                                      key: `group-${groupIndex}-${index}`
                                    }, [
                                      isSelectItem(item) && item.type === "label" ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(SelectLabel_default), {
                                        key: 0,
                                        "data-slot": "label",
                                        class: ui.value.label({ class: [props.ui?.label, item.ui?.label, item.class] })
                                      }, {
                                        default: vueExports.withCtx(() => [
                                          vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(get)(item, props.labelKey)), 1)
                                        ]),
                                        _: 2
                                      }, 1032, ["class"])) : isSelectItem(item) && item.type === "separator" ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(SelectSeparator_default), {
                                        key: 1,
                                        "data-slot": "separator",
                                        class: ui.value.separator({ class: [props.ui?.separator, item.ui?.separator, item.class] })
                                      }, null, 8, ["class"])) : (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(SelectItem_default), {
                                        key: 2,
                                        "data-slot": "item",
                                        class: ui.value.item({ class: [props.ui?.item, isSelectItem(item) && item.ui?.item, isSelectItem(item) && item.class] }),
                                        disabled: isSelectItem(item) && item.disabled,
                                        value: isSelectItem(item) ? vueExports.unref(get)(item, props.valueKey) : item,
                                        onSelect: ($event) => isSelectItem(item) && item.onSelect?.($event)
                                      }, {
                                        default: vueExports.withCtx(() => [
                                          vueExports.renderSlot(_ctx.$slots, "item", {
                                            item,
                                            index,
                                            ui: ui.value
                                          }, () => [
                                            vueExports.renderSlot(_ctx.$slots, "item-leading", {
                                              item,
                                              index,
                                              ui: ui.value
                                            }, () => [
                                              isSelectItem(item) && item.icon ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$d, {
                                                key: 0,
                                                name: item.icon,
                                                "data-slot": "itemLeadingIcon",
                                                class: ui.value.itemLeadingIcon({ class: [props.ui?.itemLeadingIcon, item.ui?.itemLeadingIcon] })
                                              }, null, 8, ["name", "class"])) : isSelectItem(item) && item.avatar ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$b, vueExports.mergeProps({
                                                key: 1,
                                                size: item.ui?.itemLeadingAvatarSize || props.ui?.itemLeadingAvatarSize || ui.value.itemLeadingAvatarSize()
                                              }, { ref_for: true }, item.avatar, {
                                                "data-slot": "itemLeadingAvatar",
                                                class: ui.value.itemLeadingAvatar({ class: [props.ui?.itemLeadingAvatar, item.ui?.itemLeadingAvatar] })
                                              }), null, 16, ["size", "class"])) : isSelectItem(item) && item.chip ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$c, vueExports.mergeProps({
                                                key: 2,
                                                size: item.ui?.itemLeadingChipSize || props.ui?.itemLeadingChipSize || ui.value.itemLeadingChipSize(),
                                                inset: "",
                                                standalone: ""
                                              }, { ref_for: true }, item.chip, {
                                                "data-slot": "itemLeadingChip",
                                                class: ui.value.itemLeadingChip({ class: [props.ui?.itemLeadingChip, item.ui?.itemLeadingChip] })
                                              }), null, 16, ["size", "class"])) : vueExports.createCommentVNode("", true)
                                            ]),
                                            vueExports.createVNode("span", {
                                              "data-slot": "itemWrapper",
                                              class: ui.value.itemWrapper({ class: [props.ui?.itemWrapper, isSelectItem(item) && item.ui?.itemWrapper] })
                                            }, [
                                              vueExports.createVNode(vueExports.unref(SelectItemText_default), {
                                                "data-slot": "itemLabel",
                                                class: ui.value.itemLabel({ class: [props.ui?.itemLabel, isSelectItem(item) && item.ui?.itemLabel] })
                                              }, {
                                                default: vueExports.withCtx(() => [
                                                  vueExports.renderSlot(_ctx.$slots, "item-label", {
                                                    item,
                                                    index
                                                  }, () => [
                                                    vueExports.createTextVNode(vueExports.toDisplayString(isSelectItem(item) ? vueExports.unref(get)(item, props.labelKey) : item), 1)
                                                  ])
                                                ]),
                                                _: 2
                                              }, 1032, ["class"]),
                                              isSelectItem(item) && (vueExports.unref(get)(item, props.descriptionKey) || !!slots["item-description"]) ? (vueExports.openBlock(), vueExports.createBlock("span", {
                                                key: 0,
                                                "data-slot": "itemDescription",
                                                class: ui.value.itemDescription({ class: [props.ui?.itemDescription, isSelectItem(item) && item.ui?.itemDescription] })
                                              }, [
                                                vueExports.renderSlot(_ctx.$slots, "item-description", {
                                                  item,
                                                  index
                                                }, () => [
                                                  vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(get)(item, props.descriptionKey)), 1)
                                                ])
                                              ], 2)) : vueExports.createCommentVNode("", true)
                                            ], 2),
                                            vueExports.createVNode("span", {
                                              "data-slot": "itemTrailing",
                                              class: ui.value.itemTrailing({ class: [props.ui?.itemTrailing, isSelectItem(item) && item.ui?.itemTrailing] })
                                            }, [
                                              vueExports.renderSlot(_ctx.$slots, "item-trailing", {
                                                item,
                                                index,
                                                ui: ui.value
                                              }),
                                              vueExports.createVNode(vueExports.unref(SelectItemIndicator_default), { "as-child": "" }, {
                                                default: vueExports.withCtx(() => [
                                                  vueExports.createVNode(_sfc_main$d, {
                                                    name: __props.selectedIcon || vueExports.unref(appConfig).ui.icons.check,
                                                    "data-slot": "itemTrailingIcon",
                                                    class: ui.value.itemTrailingIcon({ class: [props.ui?.itemTrailingIcon, isSelectItem(item) && item.ui?.itemTrailingIcon] })
                                                  }, null, 8, ["name", "class"])
                                                ]),
                                                _: 2
                                              }, 1024)
                                            ], 2)
                                          ])
                                        ]),
                                        _: 2
                                      }, 1032, ["class", "disabled", "value", "onSelect"]))
                                    ], 64);
                                  }), 128))
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                        });
                        _push4(`<!--]--></div>`);
                        serverRenderer_cjs_prodExports.ssrRenderSlot(_ctx.$slots, "content-bottom", {}, null, _push4, _parent4, _scopeId3);
                        if (!!__props.arrow) {
                          _push4(serverRenderer_cjs_prodExports.ssrRenderComponent(vueExports.unref(SelectArrow_default), vueExports.mergeProps(arrowProps.value, {
                            "data-slot": "arrow",
                            class: ui.value.arrow({ class: props.ui?.arrow })
                          }), null, _parent4, _scopeId3));
                        } else {
                          _push4(`<!---->`);
                        }
                      } else {
                        return [
                          vueExports.renderSlot(_ctx.$slots, "content-top"),
                          vueExports.createVNode("div", {
                            role: "presentation",
                            "data-slot": "viewport",
                            class: ui.value.viewport({ class: props.ui?.viewport })
                          }, [
                            (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(groups.value, (group, groupIndex) => {
                              return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(SelectGroup_default), {
                                key: `group-${groupIndex}`,
                                "data-slot": "group",
                                class: ui.value.group({ class: props.ui?.group })
                              }, {
                                default: vueExports.withCtx(() => [
                                  (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(group, (item, index) => {
                                    return vueExports.openBlock(), vueExports.createBlock(vueExports.Fragment, {
                                      key: `group-${groupIndex}-${index}`
                                    }, [
                                      isSelectItem(item) && item.type === "label" ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(SelectLabel_default), {
                                        key: 0,
                                        "data-slot": "label",
                                        class: ui.value.label({ class: [props.ui?.label, item.ui?.label, item.class] })
                                      }, {
                                        default: vueExports.withCtx(() => [
                                          vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(get)(item, props.labelKey)), 1)
                                        ]),
                                        _: 2
                                      }, 1032, ["class"])) : isSelectItem(item) && item.type === "separator" ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(SelectSeparator_default), {
                                        key: 1,
                                        "data-slot": "separator",
                                        class: ui.value.separator({ class: [props.ui?.separator, item.ui?.separator, item.class] })
                                      }, null, 8, ["class"])) : (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(SelectItem_default), {
                                        key: 2,
                                        "data-slot": "item",
                                        class: ui.value.item({ class: [props.ui?.item, isSelectItem(item) && item.ui?.item, isSelectItem(item) && item.class] }),
                                        disabled: isSelectItem(item) && item.disabled,
                                        value: isSelectItem(item) ? vueExports.unref(get)(item, props.valueKey) : item,
                                        onSelect: ($event) => isSelectItem(item) && item.onSelect?.($event)
                                      }, {
                                        default: vueExports.withCtx(() => [
                                          vueExports.renderSlot(_ctx.$slots, "item", {
                                            item,
                                            index,
                                            ui: ui.value
                                          }, () => [
                                            vueExports.renderSlot(_ctx.$slots, "item-leading", {
                                              item,
                                              index,
                                              ui: ui.value
                                            }, () => [
                                              isSelectItem(item) && item.icon ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$d, {
                                                key: 0,
                                                name: item.icon,
                                                "data-slot": "itemLeadingIcon",
                                                class: ui.value.itemLeadingIcon({ class: [props.ui?.itemLeadingIcon, item.ui?.itemLeadingIcon] })
                                              }, null, 8, ["name", "class"])) : isSelectItem(item) && item.avatar ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$b, vueExports.mergeProps({
                                                key: 1,
                                                size: item.ui?.itemLeadingAvatarSize || props.ui?.itemLeadingAvatarSize || ui.value.itemLeadingAvatarSize()
                                              }, { ref_for: true }, item.avatar, {
                                                "data-slot": "itemLeadingAvatar",
                                                class: ui.value.itemLeadingAvatar({ class: [props.ui?.itemLeadingAvatar, item.ui?.itemLeadingAvatar] })
                                              }), null, 16, ["size", "class"])) : isSelectItem(item) && item.chip ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$c, vueExports.mergeProps({
                                                key: 2,
                                                size: item.ui?.itemLeadingChipSize || props.ui?.itemLeadingChipSize || ui.value.itemLeadingChipSize(),
                                                inset: "",
                                                standalone: ""
                                              }, { ref_for: true }, item.chip, {
                                                "data-slot": "itemLeadingChip",
                                                class: ui.value.itemLeadingChip({ class: [props.ui?.itemLeadingChip, item.ui?.itemLeadingChip] })
                                              }), null, 16, ["size", "class"])) : vueExports.createCommentVNode("", true)
                                            ]),
                                            vueExports.createVNode("span", {
                                              "data-slot": "itemWrapper",
                                              class: ui.value.itemWrapper({ class: [props.ui?.itemWrapper, isSelectItem(item) && item.ui?.itemWrapper] })
                                            }, [
                                              vueExports.createVNode(vueExports.unref(SelectItemText_default), {
                                                "data-slot": "itemLabel",
                                                class: ui.value.itemLabel({ class: [props.ui?.itemLabel, isSelectItem(item) && item.ui?.itemLabel] })
                                              }, {
                                                default: vueExports.withCtx(() => [
                                                  vueExports.renderSlot(_ctx.$slots, "item-label", {
                                                    item,
                                                    index
                                                  }, () => [
                                                    vueExports.createTextVNode(vueExports.toDisplayString(isSelectItem(item) ? vueExports.unref(get)(item, props.labelKey) : item), 1)
                                                  ])
                                                ]),
                                                _: 2
                                              }, 1032, ["class"]),
                                              isSelectItem(item) && (vueExports.unref(get)(item, props.descriptionKey) || !!slots["item-description"]) ? (vueExports.openBlock(), vueExports.createBlock("span", {
                                                key: 0,
                                                "data-slot": "itemDescription",
                                                class: ui.value.itemDescription({ class: [props.ui?.itemDescription, isSelectItem(item) && item.ui?.itemDescription] })
                                              }, [
                                                vueExports.renderSlot(_ctx.$slots, "item-description", {
                                                  item,
                                                  index
                                                }, () => [
                                                  vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(get)(item, props.descriptionKey)), 1)
                                                ])
                                              ], 2)) : vueExports.createCommentVNode("", true)
                                            ], 2),
                                            vueExports.createVNode("span", {
                                              "data-slot": "itemTrailing",
                                              class: ui.value.itemTrailing({ class: [props.ui?.itemTrailing, isSelectItem(item) && item.ui?.itemTrailing] })
                                            }, [
                                              vueExports.renderSlot(_ctx.$slots, "item-trailing", {
                                                item,
                                                index,
                                                ui: ui.value
                                              }),
                                              vueExports.createVNode(vueExports.unref(SelectItemIndicator_default), { "as-child": "" }, {
                                                default: vueExports.withCtx(() => [
                                                  vueExports.createVNode(_sfc_main$d, {
                                                    name: __props.selectedIcon || vueExports.unref(appConfig).ui.icons.check,
                                                    "data-slot": "itemTrailingIcon",
                                                    class: ui.value.itemTrailingIcon({ class: [props.ui?.itemTrailingIcon, isSelectItem(item) && item.ui?.itemTrailingIcon] })
                                                  }, null, 8, ["name", "class"])
                                                ]),
                                                _: 2
                                              }, 1024)
                                            ], 2)
                                          ])
                                        ]),
                                        _: 2
                                      }, 1032, ["class", "disabled", "value", "onSelect"]))
                                    ], 64);
                                  }), 128))
                                ]),
                                _: 2
                              }, 1032, ["class"]);
                            }), 128))
                          ], 2),
                          vueExports.renderSlot(_ctx.$slots, "content-bottom"),
                          !!__props.arrow ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(SelectArrow_default), vueExports.mergeProps({ key: 0 }, arrowProps.value, {
                            "data-slot": "arrow",
                            class: ui.value.arrow({ class: props.ui?.arrow })
                          }), null, 16, ["class"])) : vueExports.createCommentVNode("", true)
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    vueExports.createVNode(vueExports.unref(SelectContent_default), vueExports.mergeProps({
                      "data-slot": "content",
                      class: ui.value.content({ class: props.ui?.content })
                    }, contentProps.value), {
                      default: vueExports.withCtx(() => [
                        vueExports.renderSlot(_ctx.$slots, "content-top"),
                        vueExports.createVNode("div", {
                          role: "presentation",
                          "data-slot": "viewport",
                          class: ui.value.viewport({ class: props.ui?.viewport })
                        }, [
                          (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(groups.value, (group, groupIndex) => {
                            return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(SelectGroup_default), {
                              key: `group-${groupIndex}`,
                              "data-slot": "group",
                              class: ui.value.group({ class: props.ui?.group })
                            }, {
                              default: vueExports.withCtx(() => [
                                (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(group, (item, index) => {
                                  return vueExports.openBlock(), vueExports.createBlock(vueExports.Fragment, {
                                    key: `group-${groupIndex}-${index}`
                                  }, [
                                    isSelectItem(item) && item.type === "label" ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(SelectLabel_default), {
                                      key: 0,
                                      "data-slot": "label",
                                      class: ui.value.label({ class: [props.ui?.label, item.ui?.label, item.class] })
                                    }, {
                                      default: vueExports.withCtx(() => [
                                        vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(get)(item, props.labelKey)), 1)
                                      ]),
                                      _: 2
                                    }, 1032, ["class"])) : isSelectItem(item) && item.type === "separator" ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(SelectSeparator_default), {
                                      key: 1,
                                      "data-slot": "separator",
                                      class: ui.value.separator({ class: [props.ui?.separator, item.ui?.separator, item.class] })
                                    }, null, 8, ["class"])) : (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(SelectItem_default), {
                                      key: 2,
                                      "data-slot": "item",
                                      class: ui.value.item({ class: [props.ui?.item, isSelectItem(item) && item.ui?.item, isSelectItem(item) && item.class] }),
                                      disabled: isSelectItem(item) && item.disabled,
                                      value: isSelectItem(item) ? vueExports.unref(get)(item, props.valueKey) : item,
                                      onSelect: ($event) => isSelectItem(item) && item.onSelect?.($event)
                                    }, {
                                      default: vueExports.withCtx(() => [
                                        vueExports.renderSlot(_ctx.$slots, "item", {
                                          item,
                                          index,
                                          ui: ui.value
                                        }, () => [
                                          vueExports.renderSlot(_ctx.$slots, "item-leading", {
                                            item,
                                            index,
                                            ui: ui.value
                                          }, () => [
                                            isSelectItem(item) && item.icon ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$d, {
                                              key: 0,
                                              name: item.icon,
                                              "data-slot": "itemLeadingIcon",
                                              class: ui.value.itemLeadingIcon({ class: [props.ui?.itemLeadingIcon, item.ui?.itemLeadingIcon] })
                                            }, null, 8, ["name", "class"])) : isSelectItem(item) && item.avatar ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$b, vueExports.mergeProps({
                                              key: 1,
                                              size: item.ui?.itemLeadingAvatarSize || props.ui?.itemLeadingAvatarSize || ui.value.itemLeadingAvatarSize()
                                            }, { ref_for: true }, item.avatar, {
                                              "data-slot": "itemLeadingAvatar",
                                              class: ui.value.itemLeadingAvatar({ class: [props.ui?.itemLeadingAvatar, item.ui?.itemLeadingAvatar] })
                                            }), null, 16, ["size", "class"])) : isSelectItem(item) && item.chip ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$c, vueExports.mergeProps({
                                              key: 2,
                                              size: item.ui?.itemLeadingChipSize || props.ui?.itemLeadingChipSize || ui.value.itemLeadingChipSize(),
                                              inset: "",
                                              standalone: ""
                                            }, { ref_for: true }, item.chip, {
                                              "data-slot": "itemLeadingChip",
                                              class: ui.value.itemLeadingChip({ class: [props.ui?.itemLeadingChip, item.ui?.itemLeadingChip] })
                                            }), null, 16, ["size", "class"])) : vueExports.createCommentVNode("", true)
                                          ]),
                                          vueExports.createVNode("span", {
                                            "data-slot": "itemWrapper",
                                            class: ui.value.itemWrapper({ class: [props.ui?.itemWrapper, isSelectItem(item) && item.ui?.itemWrapper] })
                                          }, [
                                            vueExports.createVNode(vueExports.unref(SelectItemText_default), {
                                              "data-slot": "itemLabel",
                                              class: ui.value.itemLabel({ class: [props.ui?.itemLabel, isSelectItem(item) && item.ui?.itemLabel] })
                                            }, {
                                              default: vueExports.withCtx(() => [
                                                vueExports.renderSlot(_ctx.$slots, "item-label", {
                                                  item,
                                                  index
                                                }, () => [
                                                  vueExports.createTextVNode(vueExports.toDisplayString(isSelectItem(item) ? vueExports.unref(get)(item, props.labelKey) : item), 1)
                                                ])
                                              ]),
                                              _: 2
                                            }, 1032, ["class"]),
                                            isSelectItem(item) && (vueExports.unref(get)(item, props.descriptionKey) || !!slots["item-description"]) ? (vueExports.openBlock(), vueExports.createBlock("span", {
                                              key: 0,
                                              "data-slot": "itemDescription",
                                              class: ui.value.itemDescription({ class: [props.ui?.itemDescription, isSelectItem(item) && item.ui?.itemDescription] })
                                            }, [
                                              vueExports.renderSlot(_ctx.$slots, "item-description", {
                                                item,
                                                index
                                              }, () => [
                                                vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(get)(item, props.descriptionKey)), 1)
                                              ])
                                            ], 2)) : vueExports.createCommentVNode("", true)
                                          ], 2),
                                          vueExports.createVNode("span", {
                                            "data-slot": "itemTrailing",
                                            class: ui.value.itemTrailing({ class: [props.ui?.itemTrailing, isSelectItem(item) && item.ui?.itemTrailing] })
                                          }, [
                                            vueExports.renderSlot(_ctx.$slots, "item-trailing", {
                                              item,
                                              index,
                                              ui: ui.value
                                            }),
                                            vueExports.createVNode(vueExports.unref(SelectItemIndicator_default), { "as-child": "" }, {
                                              default: vueExports.withCtx(() => [
                                                vueExports.createVNode(_sfc_main$d, {
                                                  name: __props.selectedIcon || vueExports.unref(appConfig).ui.icons.check,
                                                  "data-slot": "itemTrailingIcon",
                                                  class: ui.value.itemTrailingIcon({ class: [props.ui?.itemTrailingIcon, isSelectItem(item) && item.ui?.itemTrailingIcon] })
                                                }, null, 8, ["name", "class"])
                                              ]),
                                              _: 2
                                            }, 1024)
                                          ], 2)
                                        ])
                                      ]),
                                      _: 2
                                    }, 1032, ["class", "disabled", "value", "onSelect"]))
                                  ], 64);
                                }), 128))
                              ]),
                              _: 2
                            }, 1032, ["class"]);
                          }), 128))
                        ], 2),
                        vueExports.renderSlot(_ctx.$slots, "content-bottom"),
                        !!__props.arrow ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(SelectArrow_default), vueExports.mergeProps({ key: 0 }, arrowProps.value, {
                          "data-slot": "arrow",
                          class: ui.value.arrow({ class: props.ui?.arrow })
                        }), null, 16, ["class"])) : vueExports.createCommentVNode("", true)
                      ]),
                      _: 3
                    }, 16, ["class"])
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
          } else {
            return [
              vueExports.createVNode(vueExports.unref(SelectTrigger_default), vueExports.mergeProps({
                id: vueExports.unref(id),
                ref_key: "triggerRef",
                ref: triggerRef,
                "data-slot": "base",
                class: ui.value.base({ class: [props.ui?.base, props.class] })
              }, { ..._ctx.$attrs, ...vueExports.unref(ariaAttrs) }), {
                default: vueExports.withCtx(() => [
                  vueExports.unref(isLeading) || !!__props.avatar || !!slots.leading ? (vueExports.openBlock(), vueExports.createBlock("span", {
                    key: 0,
                    "data-slot": "leading",
                    class: ui.value.leading({ class: props.ui?.leading })
                  }, [
                    vueExports.renderSlot(_ctx.$slots, "leading", {
                      modelValue,
                      open,
                      ui: ui.value
                    }, () => [
                      vueExports.unref(isLeading) && vueExports.unref(leadingIconName) ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$d, {
                        key: 0,
                        name: vueExports.unref(leadingIconName),
                        "data-slot": "leadingIcon",
                        class: ui.value.leadingIcon({ class: props.ui?.leadingIcon })
                      }, null, 8, ["name", "class"])) : !!__props.avatar ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$b, vueExports.mergeProps({
                        key: 1,
                        size: props.ui?.itemLeadingAvatarSize || ui.value.itemLeadingAvatarSize()
                      }, __props.avatar, {
                        "data-slot": "itemLeadingAvatar",
                        class: ui.value.itemLeadingAvatar({ class: props.ui?.itemLeadingAvatar })
                      }), null, 16, ["size", "class"])) : vueExports.createCommentVNode("", true)
                    ])
                  ], 2)) : vueExports.createCommentVNode("", true),
                  vueExports.renderSlot(_ctx.$slots, "default", {
                    modelValue,
                    open,
                    ui: ui.value
                  }, () => [
                    (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList([displayValue(modelValue)], (displayedModelValue) => {
                      return vueExports.openBlock(), vueExports.createBlock(vueExports.Fragment, { key: displayedModelValue }, [
                        displayedModelValue !== void 0 && displayedModelValue !== null ? (vueExports.openBlock(), vueExports.createBlock("span", {
                          key: 0,
                          "data-slot": "value",
                          class: ui.value.value({ class: props.ui?.value })
                        }, vueExports.toDisplayString(displayedModelValue), 3)) : (vueExports.openBlock(), vueExports.createBlock("span", {
                          key: 1,
                          "data-slot": "placeholder",
                          class: ui.value.placeholder({ class: props.ui?.placeholder })
                        }, vueExports.toDisplayString(__props.placeholder ?? " "), 3))
                      ], 64);
                    }), 128))
                  ]),
                  vueExports.unref(isTrailing) || !!slots.trailing ? (vueExports.openBlock(), vueExports.createBlock("span", {
                    key: 1,
                    "data-slot": "trailing",
                    class: ui.value.trailing({ class: props.ui?.trailing })
                  }, [
                    vueExports.renderSlot(_ctx.$slots, "trailing", {
                      modelValue,
                      open,
                      ui: ui.value
                    }, () => [
                      vueExports.unref(trailingIconName) ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$d, {
                        key: 0,
                        name: vueExports.unref(trailingIconName),
                        "data-slot": "trailingIcon",
                        class: ui.value.trailingIcon({ class: props.ui?.trailingIcon })
                      }, null, 8, ["name", "class"])) : vueExports.createCommentVNode("", true)
                    ])
                  ], 2)) : vueExports.createCommentVNode("", true)
                ]),
                _: 2
              }, 1040, ["id", "class"]),
              vueExports.createVNode(vueExports.unref(SelectPortal_default), vueExports.unref(portalProps), {
                default: vueExports.withCtx(() => [
                  vueExports.createVNode(vueExports.unref(SelectContent_default), vueExports.mergeProps({
                    "data-slot": "content",
                    class: ui.value.content({ class: props.ui?.content })
                  }, contentProps.value), {
                    default: vueExports.withCtx(() => [
                      vueExports.renderSlot(_ctx.$slots, "content-top"),
                      vueExports.createVNode("div", {
                        role: "presentation",
                        "data-slot": "viewport",
                        class: ui.value.viewport({ class: props.ui?.viewport })
                      }, [
                        (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(groups.value, (group, groupIndex) => {
                          return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(SelectGroup_default), {
                            key: `group-${groupIndex}`,
                            "data-slot": "group",
                            class: ui.value.group({ class: props.ui?.group })
                          }, {
                            default: vueExports.withCtx(() => [
                              (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(group, (item, index) => {
                                return vueExports.openBlock(), vueExports.createBlock(vueExports.Fragment, {
                                  key: `group-${groupIndex}-${index}`
                                }, [
                                  isSelectItem(item) && item.type === "label" ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(SelectLabel_default), {
                                    key: 0,
                                    "data-slot": "label",
                                    class: ui.value.label({ class: [props.ui?.label, item.ui?.label, item.class] })
                                  }, {
                                    default: vueExports.withCtx(() => [
                                      vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(get)(item, props.labelKey)), 1)
                                    ]),
                                    _: 2
                                  }, 1032, ["class"])) : isSelectItem(item) && item.type === "separator" ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(SelectSeparator_default), {
                                    key: 1,
                                    "data-slot": "separator",
                                    class: ui.value.separator({ class: [props.ui?.separator, item.ui?.separator, item.class] })
                                  }, null, 8, ["class"])) : (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(SelectItem_default), {
                                    key: 2,
                                    "data-slot": "item",
                                    class: ui.value.item({ class: [props.ui?.item, isSelectItem(item) && item.ui?.item, isSelectItem(item) && item.class] }),
                                    disabled: isSelectItem(item) && item.disabled,
                                    value: isSelectItem(item) ? vueExports.unref(get)(item, props.valueKey) : item,
                                    onSelect: ($event) => isSelectItem(item) && item.onSelect?.($event)
                                  }, {
                                    default: vueExports.withCtx(() => [
                                      vueExports.renderSlot(_ctx.$slots, "item", {
                                        item,
                                        index,
                                        ui: ui.value
                                      }, () => [
                                        vueExports.renderSlot(_ctx.$slots, "item-leading", {
                                          item,
                                          index,
                                          ui: ui.value
                                        }, () => [
                                          isSelectItem(item) && item.icon ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$d, {
                                            key: 0,
                                            name: item.icon,
                                            "data-slot": "itemLeadingIcon",
                                            class: ui.value.itemLeadingIcon({ class: [props.ui?.itemLeadingIcon, item.ui?.itemLeadingIcon] })
                                          }, null, 8, ["name", "class"])) : isSelectItem(item) && item.avatar ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$b, vueExports.mergeProps({
                                            key: 1,
                                            size: item.ui?.itemLeadingAvatarSize || props.ui?.itemLeadingAvatarSize || ui.value.itemLeadingAvatarSize()
                                          }, { ref_for: true }, item.avatar, {
                                            "data-slot": "itemLeadingAvatar",
                                            class: ui.value.itemLeadingAvatar({ class: [props.ui?.itemLeadingAvatar, item.ui?.itemLeadingAvatar] })
                                          }), null, 16, ["size", "class"])) : isSelectItem(item) && item.chip ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$c, vueExports.mergeProps({
                                            key: 2,
                                            size: item.ui?.itemLeadingChipSize || props.ui?.itemLeadingChipSize || ui.value.itemLeadingChipSize(),
                                            inset: "",
                                            standalone: ""
                                          }, { ref_for: true }, item.chip, {
                                            "data-slot": "itemLeadingChip",
                                            class: ui.value.itemLeadingChip({ class: [props.ui?.itemLeadingChip, item.ui?.itemLeadingChip] })
                                          }), null, 16, ["size", "class"])) : vueExports.createCommentVNode("", true)
                                        ]),
                                        vueExports.createVNode("span", {
                                          "data-slot": "itemWrapper",
                                          class: ui.value.itemWrapper({ class: [props.ui?.itemWrapper, isSelectItem(item) && item.ui?.itemWrapper] })
                                        }, [
                                          vueExports.createVNode(vueExports.unref(SelectItemText_default), {
                                            "data-slot": "itemLabel",
                                            class: ui.value.itemLabel({ class: [props.ui?.itemLabel, isSelectItem(item) && item.ui?.itemLabel] })
                                          }, {
                                            default: vueExports.withCtx(() => [
                                              vueExports.renderSlot(_ctx.$slots, "item-label", {
                                                item,
                                                index
                                              }, () => [
                                                vueExports.createTextVNode(vueExports.toDisplayString(isSelectItem(item) ? vueExports.unref(get)(item, props.labelKey) : item), 1)
                                              ])
                                            ]),
                                            _: 2
                                          }, 1032, ["class"]),
                                          isSelectItem(item) && (vueExports.unref(get)(item, props.descriptionKey) || !!slots["item-description"]) ? (vueExports.openBlock(), vueExports.createBlock("span", {
                                            key: 0,
                                            "data-slot": "itemDescription",
                                            class: ui.value.itemDescription({ class: [props.ui?.itemDescription, isSelectItem(item) && item.ui?.itemDescription] })
                                          }, [
                                            vueExports.renderSlot(_ctx.$slots, "item-description", {
                                              item,
                                              index
                                            }, () => [
                                              vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(get)(item, props.descriptionKey)), 1)
                                            ])
                                          ], 2)) : vueExports.createCommentVNode("", true)
                                        ], 2),
                                        vueExports.createVNode("span", {
                                          "data-slot": "itemTrailing",
                                          class: ui.value.itemTrailing({ class: [props.ui?.itemTrailing, isSelectItem(item) && item.ui?.itemTrailing] })
                                        }, [
                                          vueExports.renderSlot(_ctx.$slots, "item-trailing", {
                                            item,
                                            index,
                                            ui: ui.value
                                          }),
                                          vueExports.createVNode(vueExports.unref(SelectItemIndicator_default), { "as-child": "" }, {
                                            default: vueExports.withCtx(() => [
                                              vueExports.createVNode(_sfc_main$d, {
                                                name: __props.selectedIcon || vueExports.unref(appConfig).ui.icons.check,
                                                "data-slot": "itemTrailingIcon",
                                                class: ui.value.itemTrailingIcon({ class: [props.ui?.itemTrailingIcon, isSelectItem(item) && item.ui?.itemTrailingIcon] })
                                              }, null, 8, ["name", "class"])
                                            ]),
                                            _: 2
                                          }, 1024)
                                        ], 2)
                                      ])
                                    ]),
                                    _: 2
                                  }, 1032, ["class", "disabled", "value", "onSelect"]))
                                ], 64);
                              }), 128))
                            ]),
                            _: 2
                          }, 1032, ["class"]);
                        }), 128))
                      ], 2),
                      vueExports.renderSlot(_ctx.$slots, "content-bottom"),
                      !!__props.arrow ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(SelectArrow_default), vueExports.mergeProps({ key: 0 }, arrowProps.value, {
                        "data-slot": "arrow",
                        class: ui.value.arrow({ class: props.ui?.arrow })
                      }), null, 16, ["class"])) : vueExports.createCommentVNode("", true)
                    ]),
                    _: 3
                  }, 16, ["class"])
                ]),
                _: 3
              }, 16)
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = vueExports.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/@nuxt+ui@4.2.1_@babel+parser@7.28.5_axios@1.13.2_db0@0.3.4_better-sqlite3@12.5.0_drizzl_dfa8f561a9d8983c7332d596b28eea3c/node_modules/@nuxt/ui/dist/runtime/components/Select.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
function hasDescription(item, descriptionKey) {
  if (typeof item !== "object" || item === null) {
    return false;
  }
  const value = get(item, descriptionKey);
  return value !== void 0 && value !== null && value !== "";
}
function getSize(size, hasDescription2) {
  if (hasDescription2) {
    return {
      xs: 44,
      sm: 48,
      md: 52,
      lg: 56,
      xl: 60
    }[size];
  }
  return {
    xs: 24,
    sm: 28,
    md: 32,
    lg: 36,
    xl: 40
  }[size];
}
function getEstimateSize(items, size, descriptionKey) {
  const anyHasDescription = descriptionKey ? items.some((item) => hasDescription(item, descriptionKey)) : false;
  return getSize(size, anyHasDescription);
}
const theme = {
  "slots": {
    "base": [
      "relative group rounded-md inline-flex items-center focus:outline-none disabled:cursor-not-allowed disabled:opacity-75",
      "transition-colors"
    ],
    "leading": "absolute inset-y-0 start-0 flex items-center",
    "leadingIcon": "shrink-0 text-dimmed",
    "leadingAvatar": "shrink-0",
    "leadingAvatarSize": "",
    "trailing": "absolute inset-y-0 end-0 flex items-center",
    "trailingIcon": "shrink-0 text-dimmed",
    "value": "truncate pointer-events-none",
    "placeholder": "truncate text-dimmed",
    "arrow": "fill-default",
    "content": [
      "max-h-60 w-(--reka-select-trigger-width) bg-default shadow-lg rounded-md ring ring-default overflow-hidden data-[state=open]:animate-[scale-in_100ms_ease-out] data-[state=closed]:animate-[scale-out_100ms_ease-in] origin-(--reka-select-content-transform-origin) pointer-events-auto flex flex-col",
      "origin-(--reka-combobox-content-transform-origin) w-(--reka-combobox-trigger-width)"
    ],
    "viewport": "relative scroll-py-1 overflow-y-auto flex-1",
    "group": "p-1 isolate",
    "empty": "text-center text-muted",
    "label": "font-semibold text-highlighted",
    "separator": "-mx-1 my-1 h-px bg-border",
    "item": [
      "group relative w-full flex items-start select-none outline-none before:absolute before:z-[-1] before:inset-px before:rounded-md data-disabled:cursor-not-allowed data-disabled:opacity-75 text-default data-highlighted:not-data-disabled:text-highlighted data-highlighted:not-data-disabled:before:bg-elevated/50",
      "transition-colors before:transition-colors"
    ],
    "itemLeadingIcon": [
      "shrink-0 text-dimmed group-data-highlighted:not-group-data-disabled:text-default",
      "transition-colors"
    ],
    "itemLeadingAvatar": "shrink-0",
    "itemLeadingAvatarSize": "",
    "itemLeadingChip": "shrink-0",
    "itemLeadingChipSize": "",
    "itemTrailing": "ms-auto inline-flex gap-1.5 items-center",
    "itemTrailingIcon": "shrink-0",
    "itemWrapper": "flex-1 flex flex-col min-w-0",
    "itemLabel": "truncate",
    "itemDescription": "truncate text-muted",
    "input": "border-b border-default",
    "focusScope": "flex flex-col min-h-0"
  },
  "variants": {
    "fieldGroup": {
      "horizontal": "not-only:first:rounded-e-none not-only:last:rounded-s-none not-last:not-first:rounded-none focus-visible:z-[1]",
      "vertical": "not-only:first:rounded-b-none not-only:last:rounded-t-none not-last:not-first:rounded-none focus-visible:z-[1]"
    },
    "size": {
      "xs": {
        "base": "px-2 py-1 text-xs gap-1",
        "leading": "ps-2",
        "trailing": "pe-2",
        "leadingIcon": "size-4",
        "leadingAvatarSize": "3xs",
        "trailingIcon": "size-4",
        "label": "p-1 text-[10px]/3 gap-1",
        "item": "p-1 text-xs gap-1",
        "itemLeadingIcon": "size-4",
        "itemLeadingAvatarSize": "3xs",
        "itemLeadingChip": "size-4",
        "itemLeadingChipSize": "sm",
        "itemTrailingIcon": "size-4",
        "empty": "p-1 text-xs"
      },
      "sm": {
        "base": "px-2.5 py-1.5 text-xs gap-1.5",
        "leading": "ps-2.5",
        "trailing": "pe-2.5",
        "leadingIcon": "size-4",
        "leadingAvatarSize": "3xs",
        "trailingIcon": "size-4",
        "label": "p-1.5 text-[10px]/3 gap-1.5",
        "item": "p-1.5 text-xs gap-1.5",
        "itemLeadingIcon": "size-4",
        "itemLeadingAvatarSize": "3xs",
        "itemLeadingChip": "size-4",
        "itemLeadingChipSize": "sm",
        "itemTrailingIcon": "size-4",
        "empty": "p-1.5 text-xs"
      },
      "md": {
        "base": "px-2.5 py-1.5 text-sm gap-1.5",
        "leading": "ps-2.5",
        "trailing": "pe-2.5",
        "leadingIcon": "size-5",
        "leadingAvatarSize": "2xs",
        "trailingIcon": "size-5",
        "label": "p-1.5 text-xs gap-1.5",
        "item": "p-1.5 text-sm gap-1.5",
        "itemLeadingIcon": "size-5",
        "itemLeadingAvatarSize": "2xs",
        "itemLeadingChip": "size-5",
        "itemLeadingChipSize": "md",
        "itemTrailingIcon": "size-5",
        "empty": "p-1.5 text-sm"
      },
      "lg": {
        "base": "px-3 py-2 text-sm gap-2",
        "leading": "ps-3",
        "trailing": "pe-3",
        "leadingIcon": "size-5",
        "leadingAvatarSize": "2xs",
        "trailingIcon": "size-5",
        "label": "p-2 text-xs gap-2",
        "item": "p-2 text-sm gap-2",
        "itemLeadingIcon": "size-5",
        "itemLeadingAvatarSize": "2xs",
        "itemLeadingChip": "size-5",
        "itemLeadingChipSize": "md",
        "itemTrailingIcon": "size-5",
        "empty": "p-2 text-sm"
      },
      "xl": {
        "base": "px-3 py-2 text-base gap-2",
        "leading": "ps-3",
        "trailing": "pe-3",
        "leadingIcon": "size-6",
        "leadingAvatarSize": "xs",
        "trailingIcon": "size-6",
        "label": "p-2 text-sm gap-2",
        "item": "p-2 text-base gap-2",
        "itemLeadingIcon": "size-6",
        "itemLeadingAvatarSize": "xs",
        "itemLeadingChip": "size-6",
        "itemLeadingChipSize": "lg",
        "itemTrailingIcon": "size-6",
        "empty": "p-2 text-base"
      }
    },
    "variant": {
      "outline": "text-highlighted bg-default ring ring-inset ring-accented",
      "soft": "text-highlighted bg-elevated/50 hover:bg-elevated focus:bg-elevated disabled:bg-elevated/50",
      "subtle": "text-highlighted bg-elevated ring ring-inset ring-accented",
      "ghost": "text-highlighted bg-transparent hover:bg-elevated focus:bg-elevated disabled:bg-transparent dark:disabled:bg-transparent",
      "none": "text-highlighted bg-transparent"
    },
    "color": {
      "primary": "",
      "secondary": "",
      "success": "",
      "info": "",
      "warning": "",
      "error": "",
      "neutral": ""
    },
    "leading": {
      "true": ""
    },
    "trailing": {
      "true": ""
    },
    "loading": {
      "true": ""
    },
    "highlight": {
      "true": ""
    },
    "type": {
      "file": "file:me-1.5 file:font-medium file:text-muted file:outline-none"
    },
    "virtualize": {
      "true": {
        "viewport": "p-1 isolate"
      },
      "false": {
        "viewport": "divide-y divide-default"
      }
    }
  },
  "compoundVariants": [
    {
      "color": "primary",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"
    },
    {
      "color": "secondary",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-secondary"
    },
    {
      "color": "success",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-success"
    },
    {
      "color": "info",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-info"
    },
    {
      "color": "warning",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-warning"
    },
    {
      "color": "error",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-error"
    },
    {
      "color": "primary",
      "highlight": true,
      "class": "ring ring-inset ring-primary"
    },
    {
      "color": "secondary",
      "highlight": true,
      "class": "ring ring-inset ring-secondary"
    },
    {
      "color": "success",
      "highlight": true,
      "class": "ring ring-inset ring-success"
    },
    {
      "color": "info",
      "highlight": true,
      "class": "ring ring-inset ring-info"
    },
    {
      "color": "warning",
      "highlight": true,
      "class": "ring ring-inset ring-warning"
    },
    {
      "color": "error",
      "highlight": true,
      "class": "ring ring-inset ring-error"
    },
    {
      "color": "neutral",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-inverted"
    },
    {
      "color": "neutral",
      "highlight": true,
      "class": "ring ring-inset ring-inverted"
    },
    {
      "leading": true,
      "size": "xs",
      "class": "ps-7"
    },
    {
      "leading": true,
      "size": "sm",
      "class": "ps-8"
    },
    {
      "leading": true,
      "size": "md",
      "class": "ps-9"
    },
    {
      "leading": true,
      "size": "lg",
      "class": "ps-10"
    },
    {
      "leading": true,
      "size": "xl",
      "class": "ps-11"
    },
    {
      "trailing": true,
      "size": "xs",
      "class": "pe-7"
    },
    {
      "trailing": true,
      "size": "sm",
      "class": "pe-8"
    },
    {
      "trailing": true,
      "size": "md",
      "class": "pe-9"
    },
    {
      "trailing": true,
      "size": "lg",
      "class": "pe-10"
    },
    {
      "trailing": true,
      "size": "xl",
      "class": "pe-11"
    },
    {
      "loading": true,
      "leading": true,
      "class": {
        "leadingIcon": "animate-spin"
      }
    },
    {
      "loading": true,
      "leading": false,
      "trailing": true,
      "class": {
        "trailingIcon": "animate-spin"
      }
    }
  ],
  "defaultVariants": {
    "size": "md",
    "color": "primary",
    "variant": "outline"
  }
};
const _sfc_main = /* @__PURE__ */ Object.assign({ inheritAttrs: false }, {
  __name: "USelectMenu",
  __ssrInlineRender: true,
  props: /* @__PURE__ */ vueExports.mergeModels({
    id: { type: String, required: false },
    placeholder: { type: String, required: false },
    searchInput: { type: [Boolean, Object], required: false, default: true },
    color: { type: null, required: false },
    variant: { type: null, required: false },
    size: { type: null, required: false },
    required: { type: Boolean, required: false },
    trailingIcon: { type: null, required: false },
    selectedIcon: { type: null, required: false },
    content: { type: Object, required: false },
    arrow: { type: [Boolean, Object], required: false },
    portal: { type: [Boolean, String], required: false, skipCheck: true, default: true },
    virtualize: { type: [Boolean, Object], required: false, default: false },
    valueKey: { type: null, required: false },
    labelKey: { type: null, required: false, default: "label" },
    descriptionKey: { type: null, required: false, default: "description" },
    items: { type: null, required: false },
    defaultValue: { type: null, required: false },
    modelValue: { type: null, required: false },
    multiple: { type: Boolean, required: false },
    highlight: { type: Boolean, required: false },
    createItem: { type: [Boolean, String, Object], required: false },
    filterFields: { type: Array, required: false },
    ignoreFilter: { type: Boolean, required: false },
    autofocus: { type: Boolean, required: false },
    autofocusDelay: { type: Number, required: false, default: 0 },
    class: { type: null, required: false },
    ui: { type: null, required: false },
    open: { type: Boolean, required: false },
    defaultOpen: { type: Boolean, required: false },
    disabled: { type: Boolean, required: false },
    name: { type: String, required: false },
    resetSearchTermOnBlur: { type: Boolean, required: false, default: true },
    resetSearchTermOnSelect: { type: Boolean, required: false, default: true },
    highlightOnHover: { type: Boolean, required: false },
    icon: { type: null, required: false },
    avatar: { type: Object, required: false },
    leading: { type: Boolean, required: false },
    leadingIcon: { type: null, required: false },
    trailing: { type: Boolean, required: false },
    loading: { type: Boolean, required: false },
    loadingIcon: { type: null, required: false }
  }, {
    "searchTerm": { type: String, ...{ default: "" } },
    "searchTermModifiers": {}
  }),
  emits: /* @__PURE__ */ vueExports.mergeModels(["update:open", "change", "blur", "focus", "create", "highlight", "update:modelValue"], ["update:searchTerm"]),
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const slots = vueExports.useSlots();
    const searchTerm = vueExports.useModel(__props, "searchTerm", { type: String, ...{ default: "" } });
    const { t } = useLocale();
    const appConfig = useAppConfig();
    const { contains } = useFilter({ sensitivity: "base" });
    const rootProps = useForwardPropsEmits(reactivePick(props, "modelValue", "defaultValue", "open", "defaultOpen", "required", "multiple", "resetSearchTermOnBlur", "resetSearchTermOnSelect", "highlightOnHover"), emits);
    const portalProps = usePortal(vueExports.toRef(() => props.portal));
    const contentProps = vueExports.toRef(() => defu(props.content, { side: "bottom", sideOffset: 8, collisionPadding: 8, position: "popper" }));
    const arrowProps = vueExports.toRef(() => props.arrow);
    const virtualizerProps = vueExports.toRef(() => {
      if (!props.virtualize) return false;
      return defu(typeof props.virtualize === "boolean" ? {} : props.virtualize, {
        estimateSize: getEstimateSize(items.value, props.size || "md", props.descriptionKey)
      });
    });
    const searchInputProps = vueExports.toRef(() => defu(props.searchInput, { placeholder: t("selectMenu.search"), variant: "none" }));
    const { emitFormBlur, emitFormFocus, emitFormInput, emitFormChange, size: formGroupSize, color, id, name, highlight, disabled, ariaAttrs } = useFormField(props);
    const { orientation, size: fieldGroupSize } = useFieldGroup(props);
    const { isLeading, isTrailing, leadingIconName, trailingIconName } = useComponentIcons(vueExports.toRef(() => defu(props, { trailingIcon: appConfig.ui.icons.chevronDown })));
    const selectSize = vueExports.computed(() => fieldGroupSize.value || formGroupSize.value);
    const [DefineCreateItemTemplate, ReuseCreateItemTemplate] = createReusableTemplate();
    const [DefineItemTemplate, ReuseItemTemplate] = createReusableTemplate({
      props: {
        item: {
          type: [Object, String, Number, Boolean],
          required: true
        },
        index: {
          type: Number,
          required: false
        }
      }
    });
    const ui = vueExports.computed(() => tv({ extend: tv(theme), ...appConfig.ui?.selectMenu || {} })({
      color: color.value,
      variant: props.variant,
      size: selectSize?.value,
      loading: props.loading,
      highlight: highlight.value,
      leading: isLeading.value || !!props.avatar || !!slots.leading,
      trailing: isTrailing.value || !!slots.trailing,
      fieldGroup: orientation.value,
      virtualize: !!props.virtualize
    }));
    function displayValue(value) {
      if (props.multiple && Array.isArray(value)) {
        const displayedValues = value.map((item) => getDisplayValue(items.value, item, {
          labelKey: props.labelKey,
          valueKey: props.valueKey
        })).filter((v) => v != null && v !== "");
        return displayedValues.length > 0 ? displayedValues.join(", ") : void 0;
      }
      return getDisplayValue(items.value, value, {
        labelKey: props.labelKey,
        valueKey: props.valueKey
      });
    }
    const groups = vueExports.computed(
      () => props.items?.length ? isArrayOfArray(props.items) ? props.items : [props.items] : []
    );
    const items = vueExports.computed(() => groups.value.flatMap((group) => group));
    const filteredGroups = vueExports.computed(() => {
      if (props.ignoreFilter || !searchTerm.value) {
        return groups.value;
      }
      const fields = Array.isArray(props.filterFields) ? props.filterFields : [props.labelKey];
      return groups.value.map((items2) => items2.filter((item) => {
        if (item === void 0 || item === null) {
          return false;
        }
        if (typeof item !== "object") {
          return contains(String(item), searchTerm.value);
        }
        if (item.type && ["label", "separator"].includes(item.type)) {
          return true;
        }
        return fields.some((field) => {
          const value = get(item, field);
          return value !== void 0 && value !== null && contains(String(value), searchTerm.value);
        });
      })).filter((group) => group.filter(
        (item) => !isSelectItem(item) || (!item.type || !["label", "separator"].includes(item.type))
      ).length > 0);
    });
    const filteredItems = vueExports.computed(() => filteredGroups.value.flatMap((group) => group));
    const createItem = vueExports.computed(() => {
      if (!props.createItem || !searchTerm.value) {
        return false;
      }
      const newItem = props.valueKey ? { [props.valueKey]: searchTerm.value } : searchTerm.value;
      if (typeof props.createItem === "object" && props.createItem.when === "always" || props.createItem === "always") {
        return !filteredItems.value.find((item) => compare$2(item, newItem, props.valueKey));
      }
      return !filteredItems.value.length;
    });
    const createItemPosition = vueExports.computed(() => typeof props.createItem === "object" ? props.createItem.position : "bottom");
    const triggerRef = vueExports.useTemplateRef("triggerRef");
    function onUpdate(value) {
      if (vueExports.toRaw(props.modelValue) === value) {
        return;
      }
      const event = new Event("change", { target: { value } });
      emits("change", event);
      emitFormChange();
      emitFormInput();
      if (props.resetSearchTermOnSelect) {
        searchTerm.value = "";
      }
    }
    function onUpdateOpen(value) {
      let timeoutId;
      if (!value) {
        const event = new FocusEvent("blur");
        emits("blur", event);
        emitFormBlur();
        if (props.resetSearchTermOnBlur) {
          const STATE_ANIMATION_DELAY_MS = 100;
          timeoutId = setTimeout(() => {
            searchTerm.value = "";
          }, STATE_ANIMATION_DELAY_MS);
        }
      } else {
        const event = new FocusEvent("focus");
        emits("focus", event);
        emitFormFocus();
        clearTimeout(timeoutId);
      }
    }
    function onCreate(e) {
      e.preventDefault();
      e.stopPropagation();
      emits("create", searchTerm.value);
    }
    function onSelect(e, item) {
      if (!isSelectItem(item)) {
        return;
      }
      if (item.disabled) {
        e.preventDefault();
        return;
      }
      item.onSelect?.(e);
    }
    function isSelectItem(item) {
      return typeof item === "object" && item !== null;
    }
    __expose({
      triggerRef: vueExports.toRef(() => triggerRef.value?.$el)
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(serverRenderer_cjs_prodExports.ssrRenderComponent(vueExports.unref(DefineCreateItemTemplate), null, {
        default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(vueExports.unref(ComboboxItem_default), {
              "data-slot": "item",
              class: ui.value.item({ class: props.ui?.item }),
              value: searchTerm.value,
              onSelect: onCreate
            }, {
              default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span data-slot="itemLabel" class="${serverRenderer_cjs_prodExports.ssrRenderClass(ui.value.itemLabel({ class: props.ui?.itemLabel }))}"${_scopeId2}>`);
                  serverRenderer_cjs_prodExports.ssrRenderSlot(_ctx.$slots, "create-item-label", { item: searchTerm.value }, () => {
                    _push3(`${serverRenderer_cjs_prodExports.ssrInterpolate(vueExports.unref(t)("selectMenu.create", { label: searchTerm.value }))}`);
                  }, _push3, _parent3, _scopeId2);
                  _push3(`</span>`);
                } else {
                  return [
                    vueExports.createVNode("span", {
                      "data-slot": "itemLabel",
                      class: ui.value.itemLabel({ class: props.ui?.itemLabel })
                    }, [
                      vueExports.renderSlot(_ctx.$slots, "create-item-label", { item: searchTerm.value }, () => [
                        vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(t)("selectMenu.create", { label: searchTerm.value })), 1)
                      ])
                    ], 2)
                  ];
                }
              }),
              _: 3
            }, _parent2, _scopeId));
          } else {
            return [
              vueExports.createVNode(vueExports.unref(ComboboxItem_default), {
                "data-slot": "item",
                class: ui.value.item({ class: props.ui?.item }),
                value: searchTerm.value,
                onSelect: onCreate
              }, {
                default: vueExports.withCtx(() => [
                  vueExports.createVNode("span", {
                    "data-slot": "itemLabel",
                    class: ui.value.itemLabel({ class: props.ui?.itemLabel })
                  }, [
                    vueExports.renderSlot(_ctx.$slots, "create-item-label", { item: searchTerm.value }, () => [
                      vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(t)("selectMenu.create", { label: searchTerm.value })), 1)
                    ])
                  ], 2)
                ]),
                _: 3
              }, 8, ["class", "value"])
            ];
          }
        }),
        _: 3
      }, _parent));
      _push(serverRenderer_cjs_prodExports.ssrRenderComponent(vueExports.unref(DefineItemTemplate), null, {
        default: vueExports.withCtx(({ item, index }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (isSelectItem(item) && item.type === "label") {
              _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(vueExports.unref(ComboboxLabel_default), {
                "data-slot": "label",
                class: ui.value.label({ class: [props.ui?.label, item.ui?.label, item.class] })
              }, {
                default: vueExports.withCtx((_, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${serverRenderer_cjs_prodExports.ssrInterpolate(vueExports.unref(get)(item, props.labelKey))}`);
                  } else {
                    return [
                      vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(get)(item, props.labelKey)), 1)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            } else if (isSelectItem(item) && item.type === "separator") {
              _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(vueExports.unref(ComboboxSeparator_default), {
                "data-slot": "separator",
                class: ui.value.separator({ class: [props.ui?.separator, item.ui?.separator, item.class] })
              }, null, _parent2, _scopeId));
            } else {
              _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(vueExports.unref(ComboboxItem_default), {
                "data-slot": "item",
                class: ui.value.item({ class: [props.ui?.item, isSelectItem(item) && item.ui?.item, isSelectItem(item) && item.class] }),
                disabled: isSelectItem(item) && item.disabled,
                value: props.valueKey && isSelectItem(item) ? vueExports.unref(get)(item, props.valueKey) : item,
                onSelect: ($event) => onSelect($event, item)
              }, {
                default: vueExports.withCtx((_, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    serverRenderer_cjs_prodExports.ssrRenderSlot(_ctx.$slots, "item", {
                      item,
                      index,
                      ui: ui.value
                    }, () => {
                      serverRenderer_cjs_prodExports.ssrRenderSlot(_ctx.$slots, "item-leading", {
                        item,
                        index,
                        ui: ui.value
                      }, () => {
                        if (isSelectItem(item) && item.icon) {
                          _push3(serverRenderer_cjs_prodExports.ssrRenderComponent(_sfc_main$d, {
                            name: item.icon,
                            "data-slot": "itemLeadingIcon",
                            class: ui.value.itemLeadingIcon({ class: [props.ui?.itemLeadingIcon, item.ui?.itemLeadingIcon] })
                          }, null, _parent3, _scopeId2));
                        } else if (isSelectItem(item) && item.avatar) {
                          _push3(serverRenderer_cjs_prodExports.ssrRenderComponent(_sfc_main$b, vueExports.mergeProps({
                            size: item.ui?.itemLeadingAvatarSize || props.ui?.itemLeadingAvatarSize || ui.value.itemLeadingAvatarSize()
                          }, item.avatar, {
                            "data-slot": "itemLeadingAvatar",
                            class: ui.value.itemLeadingAvatar({ class: [props.ui?.itemLeadingAvatar, item.ui?.itemLeadingAvatar] })
                          }), null, _parent3, _scopeId2));
                        } else if (isSelectItem(item) && item.chip) {
                          _push3(serverRenderer_cjs_prodExports.ssrRenderComponent(_sfc_main$c, vueExports.mergeProps({
                            size: props.ui?.itemLeadingChipSize || ui.value.itemLeadingChipSize(),
                            inset: "",
                            standalone: ""
                          }, item.chip, {
                            "data-slot": "itemLeadingChip",
                            class: ui.value.itemLeadingChip({ class: [props.ui?.itemLeadingChip, item.ui?.itemLeadingChip] })
                          }), null, _parent3, _scopeId2));
                        } else {
                          _push3(`<!---->`);
                        }
                      }, _push3, _parent3, _scopeId2);
                      _push3(`<span data-slot="itemWrapper" class="${serverRenderer_cjs_prodExports.ssrRenderClass(ui.value.itemWrapper({ class: [props.ui?.itemWrapper, isSelectItem(item) && item.ui?.itemWrapper] }))}"${_scopeId2}><span data-slot="itemLabel" class="${serverRenderer_cjs_prodExports.ssrRenderClass(ui.value.itemLabel({ class: [props.ui?.itemLabel, isSelectItem(item) && item.ui?.itemLabel] }))}"${_scopeId2}>`);
                      serverRenderer_cjs_prodExports.ssrRenderSlot(_ctx.$slots, "item-label", {
                        item,
                        index
                      }, () => {
                        _push3(`${serverRenderer_cjs_prodExports.ssrInterpolate(isSelectItem(item) ? vueExports.unref(get)(item, props.labelKey) : item)}`);
                      }, _push3, _parent3, _scopeId2);
                      _push3(`</span>`);
                      if (isSelectItem(item) && (vueExports.unref(get)(item, props.descriptionKey) || !!slots["item-description"])) {
                        _push3(`<span data-slot="itemDescription" class="${serverRenderer_cjs_prodExports.ssrRenderClass(ui.value.itemDescription({ class: [props.ui?.itemDescription, isSelectItem(item) && item.ui?.itemDescription] }))}"${_scopeId2}>`);
                        serverRenderer_cjs_prodExports.ssrRenderSlot(_ctx.$slots, "item-description", {
                          item,
                          index
                        }, () => {
                          _push3(`${serverRenderer_cjs_prodExports.ssrInterpolate(vueExports.unref(get)(item, props.descriptionKey))}`);
                        }, _push3, _parent3, _scopeId2);
                        _push3(`</span>`);
                      } else {
                        _push3(`<!---->`);
                      }
                      _push3(`</span><span data-slot="itemTrailing" class="${serverRenderer_cjs_prodExports.ssrRenderClass(ui.value.itemTrailing({ class: [props.ui?.itemTrailing, isSelectItem(item) && item.ui?.itemTrailing] }))}"${_scopeId2}>`);
                      serverRenderer_cjs_prodExports.ssrRenderSlot(_ctx.$slots, "item-trailing", {
                        item,
                        index,
                        ui: ui.value
                      }, null, _push3, _parent3, _scopeId2);
                      _push3(serverRenderer_cjs_prodExports.ssrRenderComponent(vueExports.unref(ComboboxItemIndicator_default), { "as-child": "" }, {
                        default: vueExports.withCtx((_2, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(serverRenderer_cjs_prodExports.ssrRenderComponent(_sfc_main$d, {
                              name: __props.selectedIcon || vueExports.unref(appConfig).ui.icons.check,
                              "data-slot": "itemTrailingIcon",
                              class: ui.value.itemTrailingIcon({ class: [props.ui?.itemTrailingIcon, isSelectItem(item) && item.ui?.itemTrailingIcon] })
                            }, null, _parent4, _scopeId3));
                          } else {
                            return [
                              vueExports.createVNode(_sfc_main$d, {
                                name: __props.selectedIcon || vueExports.unref(appConfig).ui.icons.check,
                                "data-slot": "itemTrailingIcon",
                                class: ui.value.itemTrailingIcon({ class: [props.ui?.itemTrailingIcon, isSelectItem(item) && item.ui?.itemTrailingIcon] })
                              }, null, 8, ["name", "class"])
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                      _push3(`</span>`);
                    }, _push3, _parent3, _scopeId2);
                  } else {
                    return [
                      vueExports.renderSlot(_ctx.$slots, "item", {
                        item,
                        index,
                        ui: ui.value
                      }, () => [
                        vueExports.renderSlot(_ctx.$slots, "item-leading", {
                          item,
                          index,
                          ui: ui.value
                        }, () => [
                          isSelectItem(item) && item.icon ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$d, {
                            key: 0,
                            name: item.icon,
                            "data-slot": "itemLeadingIcon",
                            class: ui.value.itemLeadingIcon({ class: [props.ui?.itemLeadingIcon, item.ui?.itemLeadingIcon] })
                          }, null, 8, ["name", "class"])) : isSelectItem(item) && item.avatar ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$b, vueExports.mergeProps({
                            key: 1,
                            size: item.ui?.itemLeadingAvatarSize || props.ui?.itemLeadingAvatarSize || ui.value.itemLeadingAvatarSize()
                          }, item.avatar, {
                            "data-slot": "itemLeadingAvatar",
                            class: ui.value.itemLeadingAvatar({ class: [props.ui?.itemLeadingAvatar, item.ui?.itemLeadingAvatar] })
                          }), null, 16, ["size", "class"])) : isSelectItem(item) && item.chip ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$c, vueExports.mergeProps({
                            key: 2,
                            size: props.ui?.itemLeadingChipSize || ui.value.itemLeadingChipSize(),
                            inset: "",
                            standalone: ""
                          }, item.chip, {
                            "data-slot": "itemLeadingChip",
                            class: ui.value.itemLeadingChip({ class: [props.ui?.itemLeadingChip, item.ui?.itemLeadingChip] })
                          }), null, 16, ["size", "class"])) : vueExports.createCommentVNode("", true)
                        ]),
                        vueExports.createVNode("span", {
                          "data-slot": "itemWrapper",
                          class: ui.value.itemWrapper({ class: [props.ui?.itemWrapper, isSelectItem(item) && item.ui?.itemWrapper] })
                        }, [
                          vueExports.createVNode("span", {
                            "data-slot": "itemLabel",
                            class: ui.value.itemLabel({ class: [props.ui?.itemLabel, isSelectItem(item) && item.ui?.itemLabel] })
                          }, [
                            vueExports.renderSlot(_ctx.$slots, "item-label", {
                              item,
                              index
                            }, () => [
                              vueExports.createTextVNode(vueExports.toDisplayString(isSelectItem(item) ? vueExports.unref(get)(item, props.labelKey) : item), 1)
                            ])
                          ], 2),
                          isSelectItem(item) && (vueExports.unref(get)(item, props.descriptionKey) || !!slots["item-description"]) ? (vueExports.openBlock(), vueExports.createBlock("span", {
                            key: 0,
                            "data-slot": "itemDescription",
                            class: ui.value.itemDescription({ class: [props.ui?.itemDescription, isSelectItem(item) && item.ui?.itemDescription] })
                          }, [
                            vueExports.renderSlot(_ctx.$slots, "item-description", {
                              item,
                              index
                            }, () => [
                              vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(get)(item, props.descriptionKey)), 1)
                            ])
                          ], 2)) : vueExports.createCommentVNode("", true)
                        ], 2),
                        vueExports.createVNode("span", {
                          "data-slot": "itemTrailing",
                          class: ui.value.itemTrailing({ class: [props.ui?.itemTrailing, isSelectItem(item) && item.ui?.itemTrailing] })
                        }, [
                          vueExports.renderSlot(_ctx.$slots, "item-trailing", {
                            item,
                            index,
                            ui: ui.value
                          }),
                          vueExports.createVNode(vueExports.unref(ComboboxItemIndicator_default), { "as-child": "" }, {
                            default: vueExports.withCtx(() => [
                              vueExports.createVNode(_sfc_main$d, {
                                name: __props.selectedIcon || vueExports.unref(appConfig).ui.icons.check,
                                "data-slot": "itemTrailingIcon",
                                class: ui.value.itemTrailingIcon({ class: [props.ui?.itemTrailingIcon, isSelectItem(item) && item.ui?.itemTrailingIcon] })
                              }, null, 8, ["name", "class"])
                            ]),
                            _: 2
                          }, 1024)
                        ], 2)
                      ])
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            }
          } else {
            return [
              isSelectItem(item) && item.type === "label" ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(ComboboxLabel_default), {
                key: 0,
                "data-slot": "label",
                class: ui.value.label({ class: [props.ui?.label, item.ui?.label, item.class] })
              }, {
                default: vueExports.withCtx(() => [
                  vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(get)(item, props.labelKey)), 1)
                ]),
                _: 2
              }, 1032, ["class"])) : isSelectItem(item) && item.type === "separator" ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(ComboboxSeparator_default), {
                key: 1,
                "data-slot": "separator",
                class: ui.value.separator({ class: [props.ui?.separator, item.ui?.separator, item.class] })
              }, null, 8, ["class"])) : (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(ComboboxItem_default), {
                key: 2,
                "data-slot": "item",
                class: ui.value.item({ class: [props.ui?.item, isSelectItem(item) && item.ui?.item, isSelectItem(item) && item.class] }),
                disabled: isSelectItem(item) && item.disabled,
                value: props.valueKey && isSelectItem(item) ? vueExports.unref(get)(item, props.valueKey) : item,
                onSelect: ($event) => onSelect($event, item)
              }, {
                default: vueExports.withCtx(() => [
                  vueExports.renderSlot(_ctx.$slots, "item", {
                    item,
                    index,
                    ui: ui.value
                  }, () => [
                    vueExports.renderSlot(_ctx.$slots, "item-leading", {
                      item,
                      index,
                      ui: ui.value
                    }, () => [
                      isSelectItem(item) && item.icon ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$d, {
                        key: 0,
                        name: item.icon,
                        "data-slot": "itemLeadingIcon",
                        class: ui.value.itemLeadingIcon({ class: [props.ui?.itemLeadingIcon, item.ui?.itemLeadingIcon] })
                      }, null, 8, ["name", "class"])) : isSelectItem(item) && item.avatar ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$b, vueExports.mergeProps({
                        key: 1,
                        size: item.ui?.itemLeadingAvatarSize || props.ui?.itemLeadingAvatarSize || ui.value.itemLeadingAvatarSize()
                      }, item.avatar, {
                        "data-slot": "itemLeadingAvatar",
                        class: ui.value.itemLeadingAvatar({ class: [props.ui?.itemLeadingAvatar, item.ui?.itemLeadingAvatar] })
                      }), null, 16, ["size", "class"])) : isSelectItem(item) && item.chip ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$c, vueExports.mergeProps({
                        key: 2,
                        size: props.ui?.itemLeadingChipSize || ui.value.itemLeadingChipSize(),
                        inset: "",
                        standalone: ""
                      }, item.chip, {
                        "data-slot": "itemLeadingChip",
                        class: ui.value.itemLeadingChip({ class: [props.ui?.itemLeadingChip, item.ui?.itemLeadingChip] })
                      }), null, 16, ["size", "class"])) : vueExports.createCommentVNode("", true)
                    ]),
                    vueExports.createVNode("span", {
                      "data-slot": "itemWrapper",
                      class: ui.value.itemWrapper({ class: [props.ui?.itemWrapper, isSelectItem(item) && item.ui?.itemWrapper] })
                    }, [
                      vueExports.createVNode("span", {
                        "data-slot": "itemLabel",
                        class: ui.value.itemLabel({ class: [props.ui?.itemLabel, isSelectItem(item) && item.ui?.itemLabel] })
                      }, [
                        vueExports.renderSlot(_ctx.$slots, "item-label", {
                          item,
                          index
                        }, () => [
                          vueExports.createTextVNode(vueExports.toDisplayString(isSelectItem(item) ? vueExports.unref(get)(item, props.labelKey) : item), 1)
                        ])
                      ], 2),
                      isSelectItem(item) && (vueExports.unref(get)(item, props.descriptionKey) || !!slots["item-description"]) ? (vueExports.openBlock(), vueExports.createBlock("span", {
                        key: 0,
                        "data-slot": "itemDescription",
                        class: ui.value.itemDescription({ class: [props.ui?.itemDescription, isSelectItem(item) && item.ui?.itemDescription] })
                      }, [
                        vueExports.renderSlot(_ctx.$slots, "item-description", {
                          item,
                          index
                        }, () => [
                          vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(get)(item, props.descriptionKey)), 1)
                        ])
                      ], 2)) : vueExports.createCommentVNode("", true)
                    ], 2),
                    vueExports.createVNode("span", {
                      "data-slot": "itemTrailing",
                      class: ui.value.itemTrailing({ class: [props.ui?.itemTrailing, isSelectItem(item) && item.ui?.itemTrailing] })
                    }, [
                      vueExports.renderSlot(_ctx.$slots, "item-trailing", {
                        item,
                        index,
                        ui: ui.value
                      }),
                      vueExports.createVNode(vueExports.unref(ComboboxItemIndicator_default), { "as-child": "" }, {
                        default: vueExports.withCtx(() => [
                          vueExports.createVNode(_sfc_main$d, {
                            name: __props.selectedIcon || vueExports.unref(appConfig).ui.icons.check,
                            "data-slot": "itemTrailingIcon",
                            class: ui.value.itemTrailingIcon({ class: [props.ui?.itemTrailingIcon, isSelectItem(item) && item.ui?.itemTrailingIcon] })
                          }, null, 8, ["name", "class"])
                        ]),
                        _: 2
                      }, 1024)
                    ], 2)
                  ])
                ]),
                _: 2
              }, 1032, ["class", "disabled", "value", "onSelect"]))
            ];
          }
        }),
        _: 3
      }, _parent));
      _push(serverRenderer_cjs_prodExports.ssrRenderComponent(vueExports.unref(ComboboxRoot_default), vueExports.mergeProps({ id: vueExports.unref(id) }, { ...vueExports.unref(rootProps), ..._ctx.$attrs, ...vueExports.unref(ariaAttrs) }, {
        "ignore-filter": "",
        "as-child": "",
        name: vueExports.unref(name),
        disabled: vueExports.unref(disabled),
        "onUpdate:modelValue": onUpdate,
        "onUpdate:open": onUpdateOpen
      }), {
        default: vueExports.withCtx(({ modelValue, open }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(vueExports.unref(ComboboxAnchor_default), { "as-child": "" }, {
              default: vueExports.withCtx((_, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(serverRenderer_cjs_prodExports.ssrRenderComponent(vueExports.unref(ComboboxTrigger_default), {
                    ref_key: "triggerRef",
                    ref: triggerRef,
                    "data-slot": "base",
                    class: ui.value.base({ class: [props.ui?.base, props.class] }),
                    tabindex: "0"
                  }, {
                    default: vueExports.withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        if (vueExports.unref(isLeading) || !!__props.avatar || !!slots.leading) {
                          _push4(`<span data-slot="leading" class="${serverRenderer_cjs_prodExports.ssrRenderClass(ui.value.leading({ class: props.ui?.leading }))}"${_scopeId3}>`);
                          serverRenderer_cjs_prodExports.ssrRenderSlot(_ctx.$slots, "leading", {
                            modelValue,
                            open,
                            ui: ui.value
                          }, () => {
                            if (vueExports.unref(isLeading) && vueExports.unref(leadingIconName)) {
                              _push4(serverRenderer_cjs_prodExports.ssrRenderComponent(_sfc_main$d, {
                                name: vueExports.unref(leadingIconName),
                                "data-slot": "leadingIcon",
                                class: ui.value.leadingIcon({ class: props.ui?.leadingIcon })
                              }, null, _parent4, _scopeId3));
                            } else if (!!__props.avatar) {
                              _push4(serverRenderer_cjs_prodExports.ssrRenderComponent(_sfc_main$b, vueExports.mergeProps({
                                size: props.ui?.itemLeadingAvatarSize || ui.value.itemLeadingAvatarSize()
                              }, __props.avatar, {
                                "data-slot": "itemLeadingAvatar",
                                class: ui.value.itemLeadingAvatar({ class: props.ui?.itemLeadingAvatar })
                              }), null, _parent4, _scopeId3));
                            } else {
                              _push4(`<!---->`);
                            }
                          }, _push4, _parent4, _scopeId3);
                          _push4(`</span>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        serverRenderer_cjs_prodExports.ssrRenderSlot(_ctx.$slots, "default", {
                          modelValue,
                          open,
                          ui: ui.value
                        }, () => {
                          _push4(`<!--[-->`);
                          serverRenderer_cjs_prodExports.ssrRenderList([displayValue(modelValue)], (displayedModelValue) => {
                            _push4(`<!--[-->`);
                            if (displayedModelValue !== void 0 && displayedModelValue !== null) {
                              _push4(`<span data-slot="value" class="${serverRenderer_cjs_prodExports.ssrRenderClass(ui.value.value({ class: props.ui?.value }))}"${_scopeId3}>${serverRenderer_cjs_prodExports.ssrInterpolate(displayedModelValue)}</span>`);
                            } else {
                              _push4(`<span data-slot="placeholder" class="${serverRenderer_cjs_prodExports.ssrRenderClass(ui.value.placeholder({ class: props.ui?.placeholder }))}"${_scopeId3}>${serverRenderer_cjs_prodExports.ssrInterpolate(__props.placeholder ?? " ")}</span>`);
                            }
                            _push4(`<!--]-->`);
                          });
                          _push4(`<!--]-->`);
                        }, _push4, _parent4, _scopeId3);
                        if (vueExports.unref(isTrailing) || !!slots.trailing) {
                          _push4(`<span data-slot="trailing" class="${serverRenderer_cjs_prodExports.ssrRenderClass(ui.value.trailing({ class: props.ui?.trailing }))}"${_scopeId3}>`);
                          serverRenderer_cjs_prodExports.ssrRenderSlot(_ctx.$slots, "trailing", {
                            modelValue,
                            open,
                            ui: ui.value
                          }, () => {
                            if (vueExports.unref(trailingIconName)) {
                              _push4(serverRenderer_cjs_prodExports.ssrRenderComponent(_sfc_main$d, {
                                name: vueExports.unref(trailingIconName),
                                "data-slot": "trailingIcon",
                                class: ui.value.trailingIcon({ class: props.ui?.trailingIcon })
                              }, null, _parent4, _scopeId3));
                            } else {
                              _push4(`<!---->`);
                            }
                          }, _push4, _parent4, _scopeId3);
                          _push4(`</span>`);
                        } else {
                          _push4(`<!---->`);
                        }
                      } else {
                        return [
                          vueExports.unref(isLeading) || !!__props.avatar || !!slots.leading ? (vueExports.openBlock(), vueExports.createBlock("span", {
                            key: 0,
                            "data-slot": "leading",
                            class: ui.value.leading({ class: props.ui?.leading })
                          }, [
                            vueExports.renderSlot(_ctx.$slots, "leading", {
                              modelValue,
                              open,
                              ui: ui.value
                            }, () => [
                              vueExports.unref(isLeading) && vueExports.unref(leadingIconName) ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$d, {
                                key: 0,
                                name: vueExports.unref(leadingIconName),
                                "data-slot": "leadingIcon",
                                class: ui.value.leadingIcon({ class: props.ui?.leadingIcon })
                              }, null, 8, ["name", "class"])) : !!__props.avatar ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$b, vueExports.mergeProps({
                                key: 1,
                                size: props.ui?.itemLeadingAvatarSize || ui.value.itemLeadingAvatarSize()
                              }, __props.avatar, {
                                "data-slot": "itemLeadingAvatar",
                                class: ui.value.itemLeadingAvatar({ class: props.ui?.itemLeadingAvatar })
                              }), null, 16, ["size", "class"])) : vueExports.createCommentVNode("", true)
                            ])
                          ], 2)) : vueExports.createCommentVNode("", true),
                          vueExports.renderSlot(_ctx.$slots, "default", {
                            modelValue,
                            open,
                            ui: ui.value
                          }, () => [
                            (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList([displayValue(modelValue)], (displayedModelValue) => {
                              return vueExports.openBlock(), vueExports.createBlock(vueExports.Fragment, { key: displayedModelValue }, [
                                displayedModelValue !== void 0 && displayedModelValue !== null ? (vueExports.openBlock(), vueExports.createBlock("span", {
                                  key: 0,
                                  "data-slot": "value",
                                  class: ui.value.value({ class: props.ui?.value })
                                }, vueExports.toDisplayString(displayedModelValue), 3)) : (vueExports.openBlock(), vueExports.createBlock("span", {
                                  key: 1,
                                  "data-slot": "placeholder",
                                  class: ui.value.placeholder({ class: props.ui?.placeholder })
                                }, vueExports.toDisplayString(__props.placeholder ?? " "), 3))
                              ], 64);
                            }), 128))
                          ]),
                          vueExports.unref(isTrailing) || !!slots.trailing ? (vueExports.openBlock(), vueExports.createBlock("span", {
                            key: 1,
                            "data-slot": "trailing",
                            class: ui.value.trailing({ class: props.ui?.trailing })
                          }, [
                            vueExports.renderSlot(_ctx.$slots, "trailing", {
                              modelValue,
                              open,
                              ui: ui.value
                            }, () => [
                              vueExports.unref(trailingIconName) ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$d, {
                                key: 0,
                                name: vueExports.unref(trailingIconName),
                                "data-slot": "trailingIcon",
                                class: ui.value.trailingIcon({ class: props.ui?.trailingIcon })
                              }, null, 8, ["name", "class"])) : vueExports.createCommentVNode("", true)
                            ])
                          ], 2)) : vueExports.createCommentVNode("", true)
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    vueExports.createVNode(vueExports.unref(ComboboxTrigger_default), {
                      ref_key: "triggerRef",
                      ref: triggerRef,
                      "data-slot": "base",
                      class: ui.value.base({ class: [props.ui?.base, props.class] }),
                      tabindex: "0"
                    }, {
                      default: vueExports.withCtx(() => [
                        vueExports.unref(isLeading) || !!__props.avatar || !!slots.leading ? (vueExports.openBlock(), vueExports.createBlock("span", {
                          key: 0,
                          "data-slot": "leading",
                          class: ui.value.leading({ class: props.ui?.leading })
                        }, [
                          vueExports.renderSlot(_ctx.$slots, "leading", {
                            modelValue,
                            open,
                            ui: ui.value
                          }, () => [
                            vueExports.unref(isLeading) && vueExports.unref(leadingIconName) ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$d, {
                              key: 0,
                              name: vueExports.unref(leadingIconName),
                              "data-slot": "leadingIcon",
                              class: ui.value.leadingIcon({ class: props.ui?.leadingIcon })
                            }, null, 8, ["name", "class"])) : !!__props.avatar ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$b, vueExports.mergeProps({
                              key: 1,
                              size: props.ui?.itemLeadingAvatarSize || ui.value.itemLeadingAvatarSize()
                            }, __props.avatar, {
                              "data-slot": "itemLeadingAvatar",
                              class: ui.value.itemLeadingAvatar({ class: props.ui?.itemLeadingAvatar })
                            }), null, 16, ["size", "class"])) : vueExports.createCommentVNode("", true)
                          ])
                        ], 2)) : vueExports.createCommentVNode("", true),
                        vueExports.renderSlot(_ctx.$slots, "default", {
                          modelValue,
                          open,
                          ui: ui.value
                        }, () => [
                          (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList([displayValue(modelValue)], (displayedModelValue) => {
                            return vueExports.openBlock(), vueExports.createBlock(vueExports.Fragment, { key: displayedModelValue }, [
                              displayedModelValue !== void 0 && displayedModelValue !== null ? (vueExports.openBlock(), vueExports.createBlock("span", {
                                key: 0,
                                "data-slot": "value",
                                class: ui.value.value({ class: props.ui?.value })
                              }, vueExports.toDisplayString(displayedModelValue), 3)) : (vueExports.openBlock(), vueExports.createBlock("span", {
                                key: 1,
                                "data-slot": "placeholder",
                                class: ui.value.placeholder({ class: props.ui?.placeholder })
                              }, vueExports.toDisplayString(__props.placeholder ?? " "), 3))
                            ], 64);
                          }), 128))
                        ]),
                        vueExports.unref(isTrailing) || !!slots.trailing ? (vueExports.openBlock(), vueExports.createBlock("span", {
                          key: 1,
                          "data-slot": "trailing",
                          class: ui.value.trailing({ class: props.ui?.trailing })
                        }, [
                          vueExports.renderSlot(_ctx.$slots, "trailing", {
                            modelValue,
                            open,
                            ui: ui.value
                          }, () => [
                            vueExports.unref(trailingIconName) ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$d, {
                              key: 0,
                              name: vueExports.unref(trailingIconName),
                              "data-slot": "trailingIcon",
                              class: ui.value.trailingIcon({ class: props.ui?.trailingIcon })
                            }, null, 8, ["name", "class"])) : vueExports.createCommentVNode("", true)
                          ])
                        ], 2)) : vueExports.createCommentVNode("", true)
                      ]),
                      _: 2
                    }, 1032, ["class"])
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
            _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(vueExports.unref(ComboboxPortal_default), vueExports.unref(portalProps), {
              default: vueExports.withCtx((_, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(serverRenderer_cjs_prodExports.ssrRenderComponent(vueExports.unref(ComboboxContent_default), vueExports.mergeProps({
                    "data-slot": "content",
                    class: ui.value.content({ class: props.ui?.content })
                  }, contentProps.value), {
                    default: vueExports.withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(serverRenderer_cjs_prodExports.ssrRenderComponent(vueExports.unref(FocusScope_default), {
                          trapped: "",
                          "data-slot": "focusScope",
                          class: ui.value.focusScope({ class: props.ui?.focusScope })
                        }, {
                          default: vueExports.withCtx((_3, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              serverRenderer_cjs_prodExports.ssrRenderSlot(_ctx.$slots, "content-top", {}, null, _push5, _parent5, _scopeId4);
                              if (!!__props.searchInput) {
                                _push5(serverRenderer_cjs_prodExports.ssrRenderComponent(vueExports.unref(ComboboxInput_default), {
                                  modelValue: searchTerm.value,
                                  "onUpdate:modelValue": ($event) => searchTerm.value = $event,
                                  "display-value": () => searchTerm.value,
                                  "as-child": ""
                                }, {
                                  default: vueExports.withCtx((_4, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(serverRenderer_cjs_prodExports.ssrRenderComponent(_sfc_main$2, vueExports.mergeProps({
                                        autofocus: "",
                                        autocomplete: "off",
                                        size: __props.size
                                      }, searchInputProps.value, {
                                        "data-slot": "input",
                                        class: ui.value.input({ class: props.ui?.input }),
                                        onChange: () => {
                                        }
                                      }), null, _parent6, _scopeId5));
                                    } else {
                                      return [
                                        vueExports.createVNode(_sfc_main$2, vueExports.mergeProps({
                                          autofocus: "",
                                          autocomplete: "off",
                                          size: __props.size
                                        }, searchInputProps.value, {
                                          "data-slot": "input",
                                          class: ui.value.input({ class: props.ui?.input }),
                                          onChange: vueExports.withModifiers(() => {
                                          }, ["stop"])
                                        }), null, 16, ["size", "class", "onChange"])
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                              } else {
                                _push5(`<!---->`);
                              }
                              _push5(serverRenderer_cjs_prodExports.ssrRenderComponent(vueExports.unref(ComboboxEmpty_default), {
                                "data-slot": "empty",
                                class: ui.value.empty({ class: props.ui?.empty })
                              }, {
                                default: vueExports.withCtx((_4, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    serverRenderer_cjs_prodExports.ssrRenderSlot(_ctx.$slots, "empty", { searchTerm: searchTerm.value }, () => {
                                      _push6(`${serverRenderer_cjs_prodExports.ssrInterpolate(searchTerm.value ? vueExports.unref(t)("selectMenu.noMatch", { searchTerm: searchTerm.value }) : vueExports.unref(t)("selectMenu.noData"))}`);
                                    }, _push6, _parent6, _scopeId5);
                                  } else {
                                    return [
                                      vueExports.renderSlot(_ctx.$slots, "empty", { searchTerm: searchTerm.value }, () => [
                                        vueExports.createTextVNode(vueExports.toDisplayString(searchTerm.value ? vueExports.unref(t)("selectMenu.noMatch", { searchTerm: searchTerm.value }) : vueExports.unref(t)("selectMenu.noData")), 1)
                                      ])
                                    ];
                                  }
                                }),
                                _: 2
                              }, _parent5, _scopeId4));
                              _push5(`<div role="presentation" data-slot="viewport" class="${serverRenderer_cjs_prodExports.ssrRenderClass(ui.value.viewport({ class: props.ui?.viewport }))}"${_scopeId4}>`);
                              if (!!__props.virtualize) {
                                _push5(`<!--[-->`);
                                if (createItem.value && createItemPosition.value === "top") {
                                  _push5(serverRenderer_cjs_prodExports.ssrRenderComponent(vueExports.unref(ReuseCreateItemTemplate), null, null, _parent5, _scopeId4));
                                } else {
                                  _push5(`<!---->`);
                                }
                                _push5(serverRenderer_cjs_prodExports.ssrRenderComponent(vueExports.unref(ComboboxVirtualizer_default), vueExports.mergeProps({
                                  options: filteredItems.value,
                                  "text-content": (item2) => isSelectItem(item2) ? vueExports.unref(get)(item2, props.labelKey) : String(item2)
                                }, virtualizerProps.value), {
                                  default: vueExports.withCtx(({ option: item, virtualItem }, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(serverRenderer_cjs_prodExports.ssrRenderComponent(vueExports.unref(ReuseItemTemplate), {
                                        item,
                                        index: virtualItem.index
                                      }, null, _parent6, _scopeId5));
                                    } else {
                                      return [
                                        vueExports.createVNode(vueExports.unref(ReuseItemTemplate), {
                                          item,
                                          index: virtualItem.index
                                        }, null, 8, ["item", "index"])
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                                if (createItem.value && createItemPosition.value === "bottom") {
                                  _push5(serverRenderer_cjs_prodExports.ssrRenderComponent(vueExports.unref(ReuseCreateItemTemplate), null, null, _parent5, _scopeId4));
                                } else {
                                  _push5(`<!---->`);
                                }
                                _push5(`<!--]-->`);
                              } else {
                                _push5(`<!--[-->`);
                                if (createItem.value && createItemPosition.value === "top") {
                                  _push5(serverRenderer_cjs_prodExports.ssrRenderComponent(vueExports.unref(ComboboxGroup_default), {
                                    "data-slot": "group",
                                    class: ui.value.group({ class: props.ui?.group })
                                  }, {
                                    default: vueExports.withCtx((_4, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(serverRenderer_cjs_prodExports.ssrRenderComponent(vueExports.unref(ReuseCreateItemTemplate), null, null, _parent6, _scopeId5));
                                      } else {
                                        return [
                                          vueExports.createVNode(vueExports.unref(ReuseCreateItemTemplate))
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                } else {
                                  _push5(`<!---->`);
                                }
                                _push5(`<!--[-->`);
                                serverRenderer_cjs_prodExports.ssrRenderList(filteredGroups.value, (group, groupIndex) => {
                                  _push5(serverRenderer_cjs_prodExports.ssrRenderComponent(vueExports.unref(ComboboxGroup_default), {
                                    key: `group-${groupIndex}`,
                                    "data-slot": "group",
                                    class: ui.value.group({ class: props.ui?.group })
                                  }, {
                                    default: vueExports.withCtx((_4, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(`<!--[-->`);
                                        serverRenderer_cjs_prodExports.ssrRenderList(group, (item, index) => {
                                          _push6(serverRenderer_cjs_prodExports.ssrRenderComponent(vueExports.unref(ReuseItemTemplate), {
                                            key: `group-${groupIndex}-${index}`,
                                            item,
                                            index
                                          }, null, _parent6, _scopeId5));
                                        });
                                        _push6(`<!--]-->`);
                                      } else {
                                        return [
                                          (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(group, (item, index) => {
                                            return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(ReuseItemTemplate), {
                                              key: `group-${groupIndex}-${index}`,
                                              item,
                                              index
                                            }, null, 8, ["item", "index"]);
                                          }), 128))
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                });
                                _push5(`<!--]-->`);
                                if (createItem.value && createItemPosition.value === "bottom") {
                                  _push5(serverRenderer_cjs_prodExports.ssrRenderComponent(vueExports.unref(ComboboxGroup_default), {
                                    "data-slot": "group",
                                    class: ui.value.group({ class: props.ui?.group })
                                  }, {
                                    default: vueExports.withCtx((_4, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(serverRenderer_cjs_prodExports.ssrRenderComponent(vueExports.unref(ReuseCreateItemTemplate), null, null, _parent6, _scopeId5));
                                      } else {
                                        return [
                                          vueExports.createVNode(vueExports.unref(ReuseCreateItemTemplate))
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                } else {
                                  _push5(`<!---->`);
                                }
                                _push5(`<!--]-->`);
                              }
                              _push5(`</div>`);
                              serverRenderer_cjs_prodExports.ssrRenderSlot(_ctx.$slots, "content-bottom", {}, null, _push5, _parent5, _scopeId4);
                            } else {
                              return [
                                vueExports.renderSlot(_ctx.$slots, "content-top"),
                                !!__props.searchInput ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(ComboboxInput_default), {
                                  key: 0,
                                  modelValue: searchTerm.value,
                                  "onUpdate:modelValue": ($event) => searchTerm.value = $event,
                                  "display-value": () => searchTerm.value,
                                  "as-child": ""
                                }, {
                                  default: vueExports.withCtx(() => [
                                    vueExports.createVNode(_sfc_main$2, vueExports.mergeProps({
                                      autofocus: "",
                                      autocomplete: "off",
                                      size: __props.size
                                    }, searchInputProps.value, {
                                      "data-slot": "input",
                                      class: ui.value.input({ class: props.ui?.input }),
                                      onChange: vueExports.withModifiers(() => {
                                      }, ["stop"])
                                    }), null, 16, ["size", "class", "onChange"])
                                  ]),
                                  _: 1
                                }, 8, ["modelValue", "onUpdate:modelValue", "display-value"])) : vueExports.createCommentVNode("", true),
                                vueExports.createVNode(vueExports.unref(ComboboxEmpty_default), {
                                  "data-slot": "empty",
                                  class: ui.value.empty({ class: props.ui?.empty })
                                }, {
                                  default: vueExports.withCtx(() => [
                                    vueExports.renderSlot(_ctx.$slots, "empty", { searchTerm: searchTerm.value }, () => [
                                      vueExports.createTextVNode(vueExports.toDisplayString(searchTerm.value ? vueExports.unref(t)("selectMenu.noMatch", { searchTerm: searchTerm.value }) : vueExports.unref(t)("selectMenu.noData")), 1)
                                    ])
                                  ]),
                                  _: 3
                                }, 8, ["class"]),
                                vueExports.createVNode("div", {
                                  role: "presentation",
                                  "data-slot": "viewport",
                                  class: ui.value.viewport({ class: props.ui?.viewport })
                                }, [
                                  !!__props.virtualize ? (vueExports.openBlock(), vueExports.createBlock(vueExports.Fragment, { key: 0 }, [
                                    createItem.value && createItemPosition.value === "top" ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(ReuseCreateItemTemplate), { key: 0 })) : vueExports.createCommentVNode("", true),
                                    vueExports.createVNode(vueExports.unref(ComboboxVirtualizer_default), vueExports.mergeProps({
                                      options: filteredItems.value,
                                      "text-content": (item2) => isSelectItem(item2) ? vueExports.unref(get)(item2, props.labelKey) : String(item2)
                                    }, virtualizerProps.value), {
                                      default: vueExports.withCtx(({ option: item, virtualItem }) => [
                                        vueExports.createVNode(vueExports.unref(ReuseItemTemplate), {
                                          item,
                                          index: virtualItem.index
                                        }, null, 8, ["item", "index"])
                                      ]),
                                      _: 1
                                    }, 16, ["options", "text-content"]),
                                    createItem.value && createItemPosition.value === "bottom" ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(ReuseCreateItemTemplate), { key: 1 })) : vueExports.createCommentVNode("", true)
                                  ], 64)) : (vueExports.openBlock(), vueExports.createBlock(vueExports.Fragment, { key: 1 }, [
                                    createItem.value && createItemPosition.value === "top" ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(ComboboxGroup_default), {
                                      key: 0,
                                      "data-slot": "group",
                                      class: ui.value.group({ class: props.ui?.group })
                                    }, {
                                      default: vueExports.withCtx(() => [
                                        vueExports.createVNode(vueExports.unref(ReuseCreateItemTemplate))
                                      ]),
                                      _: 1
                                    }, 8, ["class"])) : vueExports.createCommentVNode("", true),
                                    (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(filteredGroups.value, (group, groupIndex) => {
                                      return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(ComboboxGroup_default), {
                                        key: `group-${groupIndex}`,
                                        "data-slot": "group",
                                        class: ui.value.group({ class: props.ui?.group })
                                      }, {
                                        default: vueExports.withCtx(() => [
                                          (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(group, (item, index) => {
                                            return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(ReuseItemTemplate), {
                                              key: `group-${groupIndex}-${index}`,
                                              item,
                                              index
                                            }, null, 8, ["item", "index"]);
                                          }), 128))
                                        ]),
                                        _: 2
                                      }, 1032, ["class"]);
                                    }), 128)),
                                    createItem.value && createItemPosition.value === "bottom" ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(ComboboxGroup_default), {
                                      key: 1,
                                      "data-slot": "group",
                                      class: ui.value.group({ class: props.ui?.group })
                                    }, {
                                      default: vueExports.withCtx(() => [
                                        vueExports.createVNode(vueExports.unref(ReuseCreateItemTemplate))
                                      ]),
                                      _: 1
                                    }, 8, ["class"])) : vueExports.createCommentVNode("", true)
                                  ], 64))
                                ], 2),
                                vueExports.renderSlot(_ctx.$slots, "content-bottom")
                              ];
                            }
                          }),
                          _: 2
                        }, _parent4, _scopeId3));
                        if (!!__props.arrow) {
                          _push4(serverRenderer_cjs_prodExports.ssrRenderComponent(vueExports.unref(ComboboxArrow_default), vueExports.mergeProps(arrowProps.value, {
                            "data-slot": "arrow",
                            class: ui.value.arrow({ class: props.ui?.arrow })
                          }), null, _parent4, _scopeId3));
                        } else {
                          _push4(`<!---->`);
                        }
                      } else {
                        return [
                          vueExports.createVNode(vueExports.unref(FocusScope_default), {
                            trapped: "",
                            "data-slot": "focusScope",
                            class: ui.value.focusScope({ class: props.ui?.focusScope })
                          }, {
                            default: vueExports.withCtx(() => [
                              vueExports.renderSlot(_ctx.$slots, "content-top"),
                              !!__props.searchInput ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(ComboboxInput_default), {
                                key: 0,
                                modelValue: searchTerm.value,
                                "onUpdate:modelValue": ($event) => searchTerm.value = $event,
                                "display-value": () => searchTerm.value,
                                "as-child": ""
                              }, {
                                default: vueExports.withCtx(() => [
                                  vueExports.createVNode(_sfc_main$2, vueExports.mergeProps({
                                    autofocus: "",
                                    autocomplete: "off",
                                    size: __props.size
                                  }, searchInputProps.value, {
                                    "data-slot": "input",
                                    class: ui.value.input({ class: props.ui?.input }),
                                    onChange: vueExports.withModifiers(() => {
                                    }, ["stop"])
                                  }), null, 16, ["size", "class", "onChange"])
                                ]),
                                _: 1
                              }, 8, ["modelValue", "onUpdate:modelValue", "display-value"])) : vueExports.createCommentVNode("", true),
                              vueExports.createVNode(vueExports.unref(ComboboxEmpty_default), {
                                "data-slot": "empty",
                                class: ui.value.empty({ class: props.ui?.empty })
                              }, {
                                default: vueExports.withCtx(() => [
                                  vueExports.renderSlot(_ctx.$slots, "empty", { searchTerm: searchTerm.value }, () => [
                                    vueExports.createTextVNode(vueExports.toDisplayString(searchTerm.value ? vueExports.unref(t)("selectMenu.noMatch", { searchTerm: searchTerm.value }) : vueExports.unref(t)("selectMenu.noData")), 1)
                                  ])
                                ]),
                                _: 3
                              }, 8, ["class"]),
                              vueExports.createVNode("div", {
                                role: "presentation",
                                "data-slot": "viewport",
                                class: ui.value.viewport({ class: props.ui?.viewport })
                              }, [
                                !!__props.virtualize ? (vueExports.openBlock(), vueExports.createBlock(vueExports.Fragment, { key: 0 }, [
                                  createItem.value && createItemPosition.value === "top" ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(ReuseCreateItemTemplate), { key: 0 })) : vueExports.createCommentVNode("", true),
                                  vueExports.createVNode(vueExports.unref(ComboboxVirtualizer_default), vueExports.mergeProps({
                                    options: filteredItems.value,
                                    "text-content": (item2) => isSelectItem(item2) ? vueExports.unref(get)(item2, props.labelKey) : String(item2)
                                  }, virtualizerProps.value), {
                                    default: vueExports.withCtx(({ option: item, virtualItem }) => [
                                      vueExports.createVNode(vueExports.unref(ReuseItemTemplate), {
                                        item,
                                        index: virtualItem.index
                                      }, null, 8, ["item", "index"])
                                    ]),
                                    _: 1
                                  }, 16, ["options", "text-content"]),
                                  createItem.value && createItemPosition.value === "bottom" ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(ReuseCreateItemTemplate), { key: 1 })) : vueExports.createCommentVNode("", true)
                                ], 64)) : (vueExports.openBlock(), vueExports.createBlock(vueExports.Fragment, { key: 1 }, [
                                  createItem.value && createItemPosition.value === "top" ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(ComboboxGroup_default), {
                                    key: 0,
                                    "data-slot": "group",
                                    class: ui.value.group({ class: props.ui?.group })
                                  }, {
                                    default: vueExports.withCtx(() => [
                                      vueExports.createVNode(vueExports.unref(ReuseCreateItemTemplate))
                                    ]),
                                    _: 1
                                  }, 8, ["class"])) : vueExports.createCommentVNode("", true),
                                  (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(filteredGroups.value, (group, groupIndex) => {
                                    return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(ComboboxGroup_default), {
                                      key: `group-${groupIndex}`,
                                      "data-slot": "group",
                                      class: ui.value.group({ class: props.ui?.group })
                                    }, {
                                      default: vueExports.withCtx(() => [
                                        (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(group, (item, index) => {
                                          return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(ReuseItemTemplate), {
                                            key: `group-${groupIndex}-${index}`,
                                            item,
                                            index
                                          }, null, 8, ["item", "index"]);
                                        }), 128))
                                      ]),
                                      _: 2
                                    }, 1032, ["class"]);
                                  }), 128)),
                                  createItem.value && createItemPosition.value === "bottom" ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(ComboboxGroup_default), {
                                    key: 1,
                                    "data-slot": "group",
                                    class: ui.value.group({ class: props.ui?.group })
                                  }, {
                                    default: vueExports.withCtx(() => [
                                      vueExports.createVNode(vueExports.unref(ReuseCreateItemTemplate))
                                    ]),
                                    _: 1
                                  }, 8, ["class"])) : vueExports.createCommentVNode("", true)
                                ], 64))
                              ], 2),
                              vueExports.renderSlot(_ctx.$slots, "content-bottom")
                            ]),
                            _: 3
                          }, 8, ["class"]),
                          !!__props.arrow ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(ComboboxArrow_default), vueExports.mergeProps({ key: 0 }, arrowProps.value, {
                            "data-slot": "arrow",
                            class: ui.value.arrow({ class: props.ui?.arrow })
                          }), null, 16, ["class"])) : vueExports.createCommentVNode("", true)
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    vueExports.createVNode(vueExports.unref(ComboboxContent_default), vueExports.mergeProps({
                      "data-slot": "content",
                      class: ui.value.content({ class: props.ui?.content })
                    }, contentProps.value), {
                      default: vueExports.withCtx(() => [
                        vueExports.createVNode(vueExports.unref(FocusScope_default), {
                          trapped: "",
                          "data-slot": "focusScope",
                          class: ui.value.focusScope({ class: props.ui?.focusScope })
                        }, {
                          default: vueExports.withCtx(() => [
                            vueExports.renderSlot(_ctx.$slots, "content-top"),
                            !!__props.searchInput ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(ComboboxInput_default), {
                              key: 0,
                              modelValue: searchTerm.value,
                              "onUpdate:modelValue": ($event) => searchTerm.value = $event,
                              "display-value": () => searchTerm.value,
                              "as-child": ""
                            }, {
                              default: vueExports.withCtx(() => [
                                vueExports.createVNode(_sfc_main$2, vueExports.mergeProps({
                                  autofocus: "",
                                  autocomplete: "off",
                                  size: __props.size
                                }, searchInputProps.value, {
                                  "data-slot": "input",
                                  class: ui.value.input({ class: props.ui?.input }),
                                  onChange: vueExports.withModifiers(() => {
                                  }, ["stop"])
                                }), null, 16, ["size", "class", "onChange"])
                              ]),
                              _: 1
                            }, 8, ["modelValue", "onUpdate:modelValue", "display-value"])) : vueExports.createCommentVNode("", true),
                            vueExports.createVNode(vueExports.unref(ComboboxEmpty_default), {
                              "data-slot": "empty",
                              class: ui.value.empty({ class: props.ui?.empty })
                            }, {
                              default: vueExports.withCtx(() => [
                                vueExports.renderSlot(_ctx.$slots, "empty", { searchTerm: searchTerm.value }, () => [
                                  vueExports.createTextVNode(vueExports.toDisplayString(searchTerm.value ? vueExports.unref(t)("selectMenu.noMatch", { searchTerm: searchTerm.value }) : vueExports.unref(t)("selectMenu.noData")), 1)
                                ])
                              ]),
                              _: 3
                            }, 8, ["class"]),
                            vueExports.createVNode("div", {
                              role: "presentation",
                              "data-slot": "viewport",
                              class: ui.value.viewport({ class: props.ui?.viewport })
                            }, [
                              !!__props.virtualize ? (vueExports.openBlock(), vueExports.createBlock(vueExports.Fragment, { key: 0 }, [
                                createItem.value && createItemPosition.value === "top" ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(ReuseCreateItemTemplate), { key: 0 })) : vueExports.createCommentVNode("", true),
                                vueExports.createVNode(vueExports.unref(ComboboxVirtualizer_default), vueExports.mergeProps({
                                  options: filteredItems.value,
                                  "text-content": (item2) => isSelectItem(item2) ? vueExports.unref(get)(item2, props.labelKey) : String(item2)
                                }, virtualizerProps.value), {
                                  default: vueExports.withCtx(({ option: item, virtualItem }) => [
                                    vueExports.createVNode(vueExports.unref(ReuseItemTemplate), {
                                      item,
                                      index: virtualItem.index
                                    }, null, 8, ["item", "index"])
                                  ]),
                                  _: 1
                                }, 16, ["options", "text-content"]),
                                createItem.value && createItemPosition.value === "bottom" ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(ReuseCreateItemTemplate), { key: 1 })) : vueExports.createCommentVNode("", true)
                              ], 64)) : (vueExports.openBlock(), vueExports.createBlock(vueExports.Fragment, { key: 1 }, [
                                createItem.value && createItemPosition.value === "top" ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(ComboboxGroup_default), {
                                  key: 0,
                                  "data-slot": "group",
                                  class: ui.value.group({ class: props.ui?.group })
                                }, {
                                  default: vueExports.withCtx(() => [
                                    vueExports.createVNode(vueExports.unref(ReuseCreateItemTemplate))
                                  ]),
                                  _: 1
                                }, 8, ["class"])) : vueExports.createCommentVNode("", true),
                                (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(filteredGroups.value, (group, groupIndex) => {
                                  return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(ComboboxGroup_default), {
                                    key: `group-${groupIndex}`,
                                    "data-slot": "group",
                                    class: ui.value.group({ class: props.ui?.group })
                                  }, {
                                    default: vueExports.withCtx(() => [
                                      (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(group, (item, index) => {
                                        return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(ReuseItemTemplate), {
                                          key: `group-${groupIndex}-${index}`,
                                          item,
                                          index
                                        }, null, 8, ["item", "index"]);
                                      }), 128))
                                    ]),
                                    _: 2
                                  }, 1032, ["class"]);
                                }), 128)),
                                createItem.value && createItemPosition.value === "bottom" ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(ComboboxGroup_default), {
                                  key: 1,
                                  "data-slot": "group",
                                  class: ui.value.group({ class: props.ui?.group })
                                }, {
                                  default: vueExports.withCtx(() => [
                                    vueExports.createVNode(vueExports.unref(ReuseCreateItemTemplate))
                                  ]),
                                  _: 1
                                }, 8, ["class"])) : vueExports.createCommentVNode("", true)
                              ], 64))
                            ], 2),
                            vueExports.renderSlot(_ctx.$slots, "content-bottom")
                          ]),
                          _: 3
                        }, 8, ["class"]),
                        !!__props.arrow ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(ComboboxArrow_default), vueExports.mergeProps({ key: 0 }, arrowProps.value, {
                          "data-slot": "arrow",
                          class: ui.value.arrow({ class: props.ui?.arrow })
                        }), null, 16, ["class"])) : vueExports.createCommentVNode("", true)
                      ]),
                      _: 3
                    }, 16, ["class"])
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
          } else {
            return [
              vueExports.createVNode(vueExports.unref(ComboboxAnchor_default), { "as-child": "" }, {
                default: vueExports.withCtx(() => [
                  vueExports.createVNode(vueExports.unref(ComboboxTrigger_default), {
                    ref_key: "triggerRef",
                    ref: triggerRef,
                    "data-slot": "base",
                    class: ui.value.base({ class: [props.ui?.base, props.class] }),
                    tabindex: "0"
                  }, {
                    default: vueExports.withCtx(() => [
                      vueExports.unref(isLeading) || !!__props.avatar || !!slots.leading ? (vueExports.openBlock(), vueExports.createBlock("span", {
                        key: 0,
                        "data-slot": "leading",
                        class: ui.value.leading({ class: props.ui?.leading })
                      }, [
                        vueExports.renderSlot(_ctx.$slots, "leading", {
                          modelValue,
                          open,
                          ui: ui.value
                        }, () => [
                          vueExports.unref(isLeading) && vueExports.unref(leadingIconName) ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$d, {
                            key: 0,
                            name: vueExports.unref(leadingIconName),
                            "data-slot": "leadingIcon",
                            class: ui.value.leadingIcon({ class: props.ui?.leadingIcon })
                          }, null, 8, ["name", "class"])) : !!__props.avatar ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$b, vueExports.mergeProps({
                            key: 1,
                            size: props.ui?.itemLeadingAvatarSize || ui.value.itemLeadingAvatarSize()
                          }, __props.avatar, {
                            "data-slot": "itemLeadingAvatar",
                            class: ui.value.itemLeadingAvatar({ class: props.ui?.itemLeadingAvatar })
                          }), null, 16, ["size", "class"])) : vueExports.createCommentVNode("", true)
                        ])
                      ], 2)) : vueExports.createCommentVNode("", true),
                      vueExports.renderSlot(_ctx.$slots, "default", {
                        modelValue,
                        open,
                        ui: ui.value
                      }, () => [
                        (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList([displayValue(modelValue)], (displayedModelValue) => {
                          return vueExports.openBlock(), vueExports.createBlock(vueExports.Fragment, { key: displayedModelValue }, [
                            displayedModelValue !== void 0 && displayedModelValue !== null ? (vueExports.openBlock(), vueExports.createBlock("span", {
                              key: 0,
                              "data-slot": "value",
                              class: ui.value.value({ class: props.ui?.value })
                            }, vueExports.toDisplayString(displayedModelValue), 3)) : (vueExports.openBlock(), vueExports.createBlock("span", {
                              key: 1,
                              "data-slot": "placeholder",
                              class: ui.value.placeholder({ class: props.ui?.placeholder })
                            }, vueExports.toDisplayString(__props.placeholder ?? " "), 3))
                          ], 64);
                        }), 128))
                      ]),
                      vueExports.unref(isTrailing) || !!slots.trailing ? (vueExports.openBlock(), vueExports.createBlock("span", {
                        key: 1,
                        "data-slot": "trailing",
                        class: ui.value.trailing({ class: props.ui?.trailing })
                      }, [
                        vueExports.renderSlot(_ctx.$slots, "trailing", {
                          modelValue,
                          open,
                          ui: ui.value
                        }, () => [
                          vueExports.unref(trailingIconName) ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$d, {
                            key: 0,
                            name: vueExports.unref(trailingIconName),
                            "data-slot": "trailingIcon",
                            class: ui.value.trailingIcon({ class: props.ui?.trailingIcon })
                          }, null, 8, ["name", "class"])) : vueExports.createCommentVNode("", true)
                        ])
                      ], 2)) : vueExports.createCommentVNode("", true)
                    ]),
                    _: 2
                  }, 1032, ["class"])
                ]),
                _: 2
              }, 1024),
              vueExports.createVNode(vueExports.unref(ComboboxPortal_default), vueExports.unref(portalProps), {
                default: vueExports.withCtx(() => [
                  vueExports.createVNode(vueExports.unref(ComboboxContent_default), vueExports.mergeProps({
                    "data-slot": "content",
                    class: ui.value.content({ class: props.ui?.content })
                  }, contentProps.value), {
                    default: vueExports.withCtx(() => [
                      vueExports.createVNode(vueExports.unref(FocusScope_default), {
                        trapped: "",
                        "data-slot": "focusScope",
                        class: ui.value.focusScope({ class: props.ui?.focusScope })
                      }, {
                        default: vueExports.withCtx(() => [
                          vueExports.renderSlot(_ctx.$slots, "content-top"),
                          !!__props.searchInput ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(ComboboxInput_default), {
                            key: 0,
                            modelValue: searchTerm.value,
                            "onUpdate:modelValue": ($event) => searchTerm.value = $event,
                            "display-value": () => searchTerm.value,
                            "as-child": ""
                          }, {
                            default: vueExports.withCtx(() => [
                              vueExports.createVNode(_sfc_main$2, vueExports.mergeProps({
                                autofocus: "",
                                autocomplete: "off",
                                size: __props.size
                              }, searchInputProps.value, {
                                "data-slot": "input",
                                class: ui.value.input({ class: props.ui?.input }),
                                onChange: vueExports.withModifiers(() => {
                                }, ["stop"])
                              }), null, 16, ["size", "class", "onChange"])
                            ]),
                            _: 1
                          }, 8, ["modelValue", "onUpdate:modelValue", "display-value"])) : vueExports.createCommentVNode("", true),
                          vueExports.createVNode(vueExports.unref(ComboboxEmpty_default), {
                            "data-slot": "empty",
                            class: ui.value.empty({ class: props.ui?.empty })
                          }, {
                            default: vueExports.withCtx(() => [
                              vueExports.renderSlot(_ctx.$slots, "empty", { searchTerm: searchTerm.value }, () => [
                                vueExports.createTextVNode(vueExports.toDisplayString(searchTerm.value ? vueExports.unref(t)("selectMenu.noMatch", { searchTerm: searchTerm.value }) : vueExports.unref(t)("selectMenu.noData")), 1)
                              ])
                            ]),
                            _: 3
                          }, 8, ["class"]),
                          vueExports.createVNode("div", {
                            role: "presentation",
                            "data-slot": "viewport",
                            class: ui.value.viewport({ class: props.ui?.viewport })
                          }, [
                            !!__props.virtualize ? (vueExports.openBlock(), vueExports.createBlock(vueExports.Fragment, { key: 0 }, [
                              createItem.value && createItemPosition.value === "top" ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(ReuseCreateItemTemplate), { key: 0 })) : vueExports.createCommentVNode("", true),
                              vueExports.createVNode(vueExports.unref(ComboboxVirtualizer_default), vueExports.mergeProps({
                                options: filteredItems.value,
                                "text-content": (item2) => isSelectItem(item2) ? vueExports.unref(get)(item2, props.labelKey) : String(item2)
                              }, virtualizerProps.value), {
                                default: vueExports.withCtx(({ option: item, virtualItem }) => [
                                  vueExports.createVNode(vueExports.unref(ReuseItemTemplate), {
                                    item,
                                    index: virtualItem.index
                                  }, null, 8, ["item", "index"])
                                ]),
                                _: 1
                              }, 16, ["options", "text-content"]),
                              createItem.value && createItemPosition.value === "bottom" ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(ReuseCreateItemTemplate), { key: 1 })) : vueExports.createCommentVNode("", true)
                            ], 64)) : (vueExports.openBlock(), vueExports.createBlock(vueExports.Fragment, { key: 1 }, [
                              createItem.value && createItemPosition.value === "top" ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(ComboboxGroup_default), {
                                key: 0,
                                "data-slot": "group",
                                class: ui.value.group({ class: props.ui?.group })
                              }, {
                                default: vueExports.withCtx(() => [
                                  vueExports.createVNode(vueExports.unref(ReuseCreateItemTemplate))
                                ]),
                                _: 1
                              }, 8, ["class"])) : vueExports.createCommentVNode("", true),
                              (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(filteredGroups.value, (group, groupIndex) => {
                                return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(ComboboxGroup_default), {
                                  key: `group-${groupIndex}`,
                                  "data-slot": "group",
                                  class: ui.value.group({ class: props.ui?.group })
                                }, {
                                  default: vueExports.withCtx(() => [
                                    (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(group, (item, index) => {
                                      return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(ReuseItemTemplate), {
                                        key: `group-${groupIndex}-${index}`,
                                        item,
                                        index
                                      }, null, 8, ["item", "index"]);
                                    }), 128))
                                  ]),
                                  _: 2
                                }, 1032, ["class"]);
                              }), 128)),
                              createItem.value && createItemPosition.value === "bottom" ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(ComboboxGroup_default), {
                                key: 1,
                                "data-slot": "group",
                                class: ui.value.group({ class: props.ui?.group })
                              }, {
                                default: vueExports.withCtx(() => [
                                  vueExports.createVNode(vueExports.unref(ReuseCreateItemTemplate))
                                ]),
                                _: 1
                              }, 8, ["class"])) : vueExports.createCommentVNode("", true)
                            ], 64))
                          ], 2),
                          vueExports.renderSlot(_ctx.$slots, "content-bottom")
                        ]),
                        _: 3
                      }, 8, ["class"]),
                      !!__props.arrow ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(ComboboxArrow_default), vueExports.mergeProps({ key: 0 }, arrowProps.value, {
                        "data-slot": "arrow",
                        class: ui.value.arrow({ class: props.ui?.arrow })
                      }), null, 16, ["class"])) : vueExports.createCommentVNode("", true)
                    ]),
                    _: 3
                  }, 16, ["class"])
                ]),
                _: 3
              }, 16)
            ];
          }
        }),
        _: 3
      }, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = vueExports.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/@nuxt+ui@4.2.1_@babel+parser@7.28.5_axios@1.13.2_db0@0.3.4_better-sqlite3@12.5.0_drizzl_dfa8f561a9d8983c7332d596b28eea3c/node_modules/@nuxt/ui/dist/runtime/components/SelectMenu.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _, _sfc_main$1 as a };
//# sourceMappingURL=SelectMenu-BgHNqFCX.mjs.map
