import { v as vueExports, e as useAppConfig, q as useForwardPropsEmits, r as reactivePick, t as tv, s as serverRenderer_cjs_prodExports, M as omit, m as useForwardExpose, k as useVModel, l as createContext, P as Primitive, y as useLocale, I as usePortal, J as reactiveOmit, K as isArrayOfArray, b as _sfc_main$d, z as _sfc_main$b, L as get, N as _sfc_main$9, O as pickLinkProps, Q as _sfc_main$a, C as createSharedComposable$1, H as createSharedComposable, G as useEmitAsProps, p as Presence_default, F as reactiveOmit$1, w as useForwardProps, T as Teleport_default, E as useCollection, D as getActiveElement } from './server.mjs';
import { R as defu } from '../nitro/nitro.mjs';
import { P as PopperRoot_default, a as PopperAnchor_default, b as PopperArrow_default, u as useFocusGuards, c as useTypeahead, d as PopperContent_default, e as PopperContentPropsDefaultValue } from './PopperArrow-_X1u5CFX.mjs';
import { u as useDirection, R as RovingFocusGroup_default } from './RovingFocusGroup-CN9Tim1l.mjs';
import { u as useId, g as getOpenState, S as SUB_CLOSE_KEYS, a as getCheckedState, i as isIndeterminate, b as SELECTION_KEYS, c as SUB_OPEN_KEYS, d as isMouseEvent, e as useBodyScrollLock, F as FocusScope_default, D as DismissableLayer_default, f as useHideOthers, h as isPointerInGraceArea, j as FIRST_LAST_KEYS, L as LAST_KEYS, k as focusFirst, I as ITEM_SELECT } from './utils-DCnNb5Bf.mjs';
import { c as createReusableTemplate } from './index--6aaawBa.mjs';

const ignoredElement = ["INPUT", "TEXTAREA"];
function useArrowNavigation(e, currentElement, parentElement, options = {}) {
  if (!currentElement || options.enableIgnoredElement && ignoredElement.includes(currentElement.nodeName)) return null;
  const { arrowKeyOptions = "both", attributeName = "[data-reka-collection-item]", itemsArray = [], loop = true, dir = "ltr", preventScroll = true, focus = false } = options;
  const [right, left, up, down, home, end] = [
    e.key === "ArrowRight",
    e.key === "ArrowLeft",
    e.key === "ArrowUp",
    e.key === "ArrowDown",
    e.key === "Home",
    e.key === "End"
  ];
  const goingVertical = up || down;
  const goingHorizontal = right || left;
  if (!home && !end && (!goingVertical && !goingHorizontal || arrowKeyOptions === "vertical" && goingHorizontal || arrowKeyOptions === "horizontal" && goingVertical)) return null;
  const allCollectionItems = parentElement ? Array.from(parentElement.querySelectorAll(attributeName)) : itemsArray;
  if (!allCollectionItems.length) return null;
  if (preventScroll) e.preventDefault();
  let item = null;
  if (goingHorizontal || goingVertical) {
    const goForward = goingVertical ? down : dir === "ltr" ? right : left;
    item = findNextFocusableElement(allCollectionItems, currentElement, {
      goForward,
      loop
    });
  } else if (home) item = allCollectionItems.at(0) || null;
  else if (end) item = allCollectionItems.at(-1) || null;
  if (focus) item?.focus();
  return item;
}
function findNextFocusableElement(elements, currentElement, options, iterations = elements.length) {
  if (--iterations === 0) return null;
  const index = elements.indexOf(currentElement);
  const newIndex = options.goForward ? index + 1 : index - 1;
  if (!options.loop && (newIndex < 0 || newIndex >= elements.length)) return null;
  const adjustedNewIndex = (newIndex + elements.length) % elements.length;
  const candidate = elements[adjustedNewIndex];
  if (!candidate) return null;
  const isDisabled = candidate.hasAttribute("disabled") && candidate.getAttribute("disabled") !== "false";
  if (isDisabled) return findNextFocusableElement(elements, candidate, options, iterations);
  return candidate;
}
var MenuAnchor_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
  __name: "MenuAnchor",
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
    const props = __props;
    return (_ctx, _cache) => {
      return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(PopperAnchor_default), vueExports.normalizeProps(vueExports.guardReactiveProps(props)), {
        default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
        _: 3
      }, 16);
    };
  }
});
var MenuAnchor_default = MenuAnchor_vue_vue_type_script_setup_true_lang_default;
var MenuArrow_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
  __name: "MenuArrow",
  props: {
    width: {
      type: Number,
      required: false
    },
    height: {
      type: Number,
      required: false
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
      required: false
    }
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _cache) => {
      return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(PopperArrow_default), vueExports.normalizeProps(vueExports.guardReactiveProps(props)), {
        default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
        _: 3
      }, 16);
    };
  }
});
var MenuArrow_default = MenuArrow_vue_vue_type_script_setup_true_lang_default;
function useIsUsingKeyboardImpl() {
  const isUsingKeyboard = vueExports.ref(false);
  return isUsingKeyboard;
}
const useIsUsingKeyboard = createSharedComposable$1(useIsUsingKeyboardImpl);
const [injectMenuContext, provideMenuContext] = createContext(["MenuRoot", "MenuSub"], "MenuContext");
const [injectMenuRootContext, provideMenuRootContext] = createContext("MenuRoot");
var MenuRoot_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
  __name: "MenuRoot",
  props: {
    open: {
      type: Boolean,
      required: false,
      default: false
    },
    dir: {
      type: String,
      required: false
    },
    modal: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  emits: ["update:open"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const { modal, dir: propDir } = vueExports.toRefs(props);
    const dir = useDirection(propDir);
    const open = useVModel(props, "open", emits);
    const content = vueExports.ref();
    const isUsingKeyboardRef = useIsUsingKeyboard();
    provideMenuContext({
      open,
      onOpenChange: (value) => {
        open.value = value;
      },
      content,
      onContentChange: (element) => {
        content.value = element;
      }
    });
    provideMenuRootContext({
      onClose: () => {
        open.value = false;
      },
      isUsingKeyboardRef,
      dir,
      modal
    });
    return (_ctx, _cache) => {
      return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(PopperRoot_default), null, {
        default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
        _: 3
      });
    };
  }
});
var MenuRoot_default = MenuRoot_vue_vue_type_script_setup_true_lang_default;
const [injectMenuContentContext, provideMenuContentContext] = createContext("MenuContent");
var MenuContentImpl_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
  __name: "MenuContentImpl",
  props: /* @__PURE__ */ vueExports.mergeDefaults({
    loop: {
      type: Boolean,
      required: false
    },
    disableOutsidePointerEvents: {
      type: Boolean,
      required: false
    },
    disableOutsideScroll: {
      type: Boolean,
      required: false
    },
    trapFocus: {
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
  }, { ...PopperContentPropsDefaultValue }),
  emits: [
    "escapeKeyDown",
    "pointerDownOutside",
    "focusOutside",
    "interactOutside",
    "entryFocus",
    "openAutoFocus",
    "closeAutoFocus",
    "dismiss"
  ],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const menuContext = injectMenuContext();
    const rootContext = injectMenuRootContext();
    const { trapFocus, disableOutsidePointerEvents, loop } = vueExports.toRefs(props);
    useFocusGuards();
    useBodyScrollLock(disableOutsidePointerEvents.value);
    const searchRef = vueExports.ref("");
    const timerRef = vueExports.ref(0);
    const pointerGraceTimerRef = vueExports.ref(0);
    const pointerGraceIntentRef = vueExports.ref(null);
    const pointerDirRef = vueExports.ref("right");
    const lastPointerXRef = vueExports.ref(0);
    const currentItemId = vueExports.ref(null);
    const rovingFocusGroupRef = vueExports.ref();
    const { forwardRef, currentElement: contentElement } = useForwardExpose();
    const { handleTypeaheadSearch } = useTypeahead();
    vueExports.watch(contentElement, (el) => {
      menuContext.onContentChange(el);
    });
    function isPointerMovingToSubmenu(event) {
      const isMovingTowards = pointerDirRef.value === pointerGraceIntentRef.value?.side;
      return isMovingTowards && isPointerInGraceArea(event, pointerGraceIntentRef.value?.area);
    }
    async function handleMountAutoFocus(event) {
      emits("openAutoFocus", event);
      if (event.defaultPrevented) return;
      event.preventDefault();
      contentElement.value?.focus({ preventScroll: true });
    }
    function handleKeyDown(event) {
      if (event.defaultPrevented) return;
      const target = event.target;
      const isKeyDownInside = target.closest("[data-reka-menu-content]") === event.currentTarget;
      const isModifierKey = event.ctrlKey || event.altKey || event.metaKey;
      const isCharacterKey = event.key.length === 1;
      const el = useArrowNavigation(event, getActiveElement(), contentElement.value, {
        loop: loop.value,
        arrowKeyOptions: "vertical",
        dir: rootContext?.dir.value,
        focus: true,
        attributeName: "[data-reka-collection-item]:not([data-disabled])"
      });
      if (el) return el?.focus();
      if (event.code === "Space") return;
      const collectionItems = rovingFocusGroupRef.value?.getItems() ?? [];
      if (isKeyDownInside) {
        if (event.key === "Tab") event.preventDefault();
        if (!isModifierKey && isCharacterKey) handleTypeaheadSearch(event.key, collectionItems);
      }
      if (event.target !== contentElement.value) return;
      if (!FIRST_LAST_KEYS.includes(event.key)) return;
      event.preventDefault();
      const candidateNodes = [...collectionItems.map((item) => item.ref)];
      if (LAST_KEYS.includes(event.key)) candidateNodes.reverse();
      focusFirst(candidateNodes);
    }
    function handleBlur(event) {
      if (!event?.currentTarget?.contains?.(event.target)) {
        (void 0).clearTimeout(timerRef.value);
        searchRef.value = "";
      }
    }
    function handlePointerMove(event) {
      if (!isMouseEvent(event)) return;
      const target = event.target;
      const pointerXHasChanged = lastPointerXRef.value !== event.clientX;
      if (event?.currentTarget?.contains(target) && pointerXHasChanged) {
        const newDir = event.clientX > lastPointerXRef.value ? "right" : "left";
        pointerDirRef.value = newDir;
        lastPointerXRef.value = event.clientX;
      }
    }
    provideMenuContentContext({
      onItemEnter: (event) => {
        if (isPointerMovingToSubmenu(event)) return true;
        else return false;
      },
      onItemLeave: (event) => {
        if (isPointerMovingToSubmenu(event)) return;
        contentElement.value?.focus();
        currentItemId.value = null;
      },
      onTriggerLeave: (event) => {
        if (isPointerMovingToSubmenu(event)) return true;
        else return false;
      },
      searchRef,
      pointerGraceTimerRef,
      onPointerGraceIntentChange: (intent) => {
        pointerGraceIntentRef.value = intent;
      }
    });
    return (_ctx, _cache) => {
      return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(FocusScope_default), {
        "as-child": "",
        trapped: vueExports.unref(trapFocus),
        onMountAutoFocus: handleMountAutoFocus,
        onUnmountAutoFocus: _cache[7] || (_cache[7] = ($event) => emits("closeAutoFocus", $event))
      }, {
        default: vueExports.withCtx(() => [vueExports.createVNode(vueExports.unref(DismissableLayer_default), {
          "as-child": "",
          "disable-outside-pointer-events": vueExports.unref(disableOutsidePointerEvents),
          onEscapeKeyDown: _cache[2] || (_cache[2] = ($event) => emits("escapeKeyDown", $event)),
          onPointerDownOutside: _cache[3] || (_cache[3] = ($event) => emits("pointerDownOutside", $event)),
          onFocusOutside: _cache[4] || (_cache[4] = ($event) => emits("focusOutside", $event)),
          onInteractOutside: _cache[5] || (_cache[5] = ($event) => emits("interactOutside", $event)),
          onDismiss: _cache[6] || (_cache[6] = ($event) => emits("dismiss"))
        }, {
          default: vueExports.withCtx(() => [vueExports.createVNode(vueExports.unref(RovingFocusGroup_default), {
            ref_key: "rovingFocusGroupRef",
            ref: rovingFocusGroupRef,
            "current-tab-stop-id": currentItemId.value,
            "onUpdate:currentTabStopId": _cache[0] || (_cache[0] = ($event) => currentItemId.value = $event),
            "as-child": "",
            orientation: "vertical",
            dir: vueExports.unref(rootContext).dir.value,
            loop: vueExports.unref(loop),
            onEntryFocus: _cache[1] || (_cache[1] = (event) => {
              emits("entryFocus", event);
              if (!vueExports.unref(rootContext).isUsingKeyboardRef.value) event.preventDefault();
            })
          }, {
            default: vueExports.withCtx(() => [vueExports.createVNode(vueExports.unref(PopperContent_default), {
              ref: vueExports.unref(forwardRef),
              role: "menu",
              as: _ctx.as,
              "as-child": _ctx.asChild,
              "aria-orientation": "vertical",
              "data-reka-menu-content": "",
              "data-state": vueExports.unref(getOpenState)(vueExports.unref(menuContext).open.value),
              dir: vueExports.unref(rootContext).dir.value,
              side: _ctx.side,
              "side-offset": _ctx.sideOffset,
              align: _ctx.align,
              "align-offset": _ctx.alignOffset,
              "avoid-collisions": _ctx.avoidCollisions,
              "collision-boundary": _ctx.collisionBoundary,
              "collision-padding": _ctx.collisionPadding,
              "arrow-padding": _ctx.arrowPadding,
              "prioritize-position": _ctx.prioritizePosition,
              "position-strategy": _ctx.positionStrategy,
              "update-position-strategy": _ctx.updatePositionStrategy,
              sticky: _ctx.sticky,
              "hide-when-detached": _ctx.hideWhenDetached,
              reference: _ctx.reference,
              onKeydown: handleKeyDown,
              onBlur: handleBlur,
              onPointermove: handlePointerMove
            }, {
              default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
              _: 3
            }, 8, [
              "as",
              "as-child",
              "data-state",
              "dir",
              "side",
              "side-offset",
              "align",
              "align-offset",
              "avoid-collisions",
              "collision-boundary",
              "collision-padding",
              "arrow-padding",
              "prioritize-position",
              "position-strategy",
              "update-position-strategy",
              "sticky",
              "hide-when-detached",
              "reference"
            ])]),
            _: 3
          }, 8, [
            "current-tab-stop-id",
            "dir",
            "loop"
          ])]),
          _: 3
        }, 8, ["disable-outside-pointer-events"])]),
        _: 3
      }, 8, ["trapped"]);
    };
  }
});
var MenuContentImpl_default = MenuContentImpl_vue_vue_type_script_setup_true_lang_default;
var MenuItemImpl_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
  inheritAttrs: false,
  __name: "MenuItemImpl",
  props: {
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
  setup(__props) {
    const props = __props;
    const contentContext = injectMenuContentContext();
    const { forwardRef } = useForwardExpose();
    const { CollectionItem } = useCollection();
    const isFocused = vueExports.ref(false);
    async function handlePointerMove(event) {
      if (event.defaultPrevented) return;
      if (!isMouseEvent(event)) return;
      if (props.disabled) contentContext.onItemLeave(event);
      else {
        const defaultPrevented = contentContext.onItemEnter(event);
        if (!defaultPrevented) {
          const item = event.currentTarget;
          item?.focus({ preventScroll: true });
        }
      }
    }
    async function handlePointerLeave(event) {
      await vueExports.nextTick();
      if (event.defaultPrevented) return;
      if (!isMouseEvent(event)) return;
      contentContext.onItemLeave(event);
    }
    return (_ctx, _cache) => {
      return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(CollectionItem), { value: { textValue: _ctx.textValue } }, {
        default: vueExports.withCtx(() => [vueExports.createVNode(vueExports.unref(Primitive), vueExports.mergeProps({
          ref: vueExports.unref(forwardRef),
          role: "menuitem",
          tabindex: "-1"
        }, _ctx.$attrs, {
          as: _ctx.as,
          "as-child": _ctx.asChild,
          "aria-disabled": _ctx.disabled || void 0,
          "data-disabled": _ctx.disabled ? "" : void 0,
          "data-highlighted": isFocused.value ? "" : void 0,
          onPointermove: handlePointerMove,
          onPointerleave: handlePointerLeave,
          onFocus: _cache[0] || (_cache[0] = async (event) => {
            await vueExports.nextTick();
            if (event.defaultPrevented || _ctx.disabled) return;
            isFocused.value = true;
          }),
          onBlur: _cache[1] || (_cache[1] = async (event) => {
            await vueExports.nextTick();
            if (event.defaultPrevented) return;
            isFocused.value = false;
          })
        }), {
          default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
          _: 3
        }, 16, [
          "as",
          "as-child",
          "aria-disabled",
          "data-disabled",
          "data-highlighted"
        ])]),
        _: 3
      }, 8, ["value"]);
    };
  }
});
var MenuItemImpl_default = MenuItemImpl_vue_vue_type_script_setup_true_lang_default;
var MenuItem_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
  __name: "MenuItem",
  props: {
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
    const { forwardRef, currentElement } = useForwardExpose();
    const rootContext = injectMenuRootContext();
    const contentContext = injectMenuContentContext();
    const isPointerDownRef = vueExports.ref(false);
    async function handleSelect() {
      const menuItem = currentElement.value;
      if (!props.disabled && menuItem) {
        const itemSelectEvent = new CustomEvent(ITEM_SELECT, {
          bubbles: true,
          cancelable: true
        });
        emits("select", itemSelectEvent);
        await vueExports.nextTick();
        if (itemSelectEvent.defaultPrevented) isPointerDownRef.value = false;
        else rootContext.onClose();
      }
    }
    return (_ctx, _cache) => {
      return vueExports.openBlock(), vueExports.createBlock(MenuItemImpl_default, vueExports.mergeProps(props, {
        ref: vueExports.unref(forwardRef),
        onClick: handleSelect,
        onPointerdown: _cache[0] || (_cache[0] = () => {
          isPointerDownRef.value = true;
        }),
        onPointerup: _cache[1] || (_cache[1] = async (event) => {
          await vueExports.nextTick();
          if (event.defaultPrevented) return;
          if (!isPointerDownRef.value) event.currentTarget?.click();
        }),
        onKeydown: _cache[2] || (_cache[2] = async (event) => {
          const isTypingAhead = vueExports.unref(contentContext).searchRef.value !== "";
          if (_ctx.disabled || isTypingAhead && event.key === " ") return;
          if (vueExports.unref(SELECTION_KEYS).includes(event.key)) {
            event.currentTarget.click();
            event.preventDefault();
          }
        })
      }), {
        default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
        _: 3
      }, 16);
    };
  }
});
var MenuItem_default = MenuItem_vue_vue_type_script_setup_true_lang_default;
const [injectMenuItemIndicatorContext, provideMenuItemIndicatorContext] = createContext(["MenuCheckboxItem", "MenuRadioItem"], "MenuItemIndicatorContext");
var MenuItemIndicator_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
  __name: "MenuItemIndicator",
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
      required: false,
      default: "span"
    }
  },
  setup(__props) {
    const indicatorContext = injectMenuItemIndicatorContext({ modelValue: vueExports.ref(false) });
    return (_ctx, _cache) => {
      return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(Presence_default), { present: _ctx.forceMount || vueExports.unref(isIndeterminate)(vueExports.unref(indicatorContext).modelValue.value) || vueExports.unref(indicatorContext).modelValue.value === true }, {
        default: vueExports.withCtx(() => [vueExports.createVNode(vueExports.unref(Primitive), {
          as: _ctx.as,
          "as-child": _ctx.asChild,
          "data-state": vueExports.unref(getCheckedState)(vueExports.unref(indicatorContext).modelValue.value)
        }, {
          default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
          _: 3
        }, 8, [
          "as",
          "as-child",
          "data-state"
        ])]),
        _: 3
      }, 8, ["present"]);
    };
  }
});
var MenuItemIndicator_default = MenuItemIndicator_vue_vue_type_script_setup_true_lang_default;
var MenuCheckboxItem_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
  __name: "MenuCheckboxItem",
  props: {
    modelValue: {
      type: [Boolean, String],
      required: false,
      default: false
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
  emits: ["select", "update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const delegatedProps = reactiveOmit$1(props, ["modelValue"]);
    const forwarded = useForwardProps(delegatedProps);
    const modelValue = useVModel(props, "modelValue", emits);
    provideMenuItemIndicatorContext({ modelValue });
    return (_ctx, _cache) => {
      return vueExports.openBlock(), vueExports.createBlock(MenuItem_default, vueExports.mergeProps({ role: "menuitemcheckbox" }, vueExports.unref(forwarded), {
        "aria-checked": vueExports.unref(isIndeterminate)(vueExports.unref(modelValue)) ? "mixed" : vueExports.unref(modelValue),
        "data-state": vueExports.unref(getCheckedState)(vueExports.unref(modelValue)),
        onSelect: _cache[0] || (_cache[0] = async (event) => {
          emits("select", event);
          if (vueExports.unref(isIndeterminate)(vueExports.unref(modelValue))) modelValue.value = true;
          else modelValue.value = !vueExports.unref(modelValue);
        })
      }), {
        default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default", { modelValue: vueExports.unref(modelValue) })]),
        _: 3
      }, 16, ["aria-checked", "data-state"]);
    };
  }
});
var MenuCheckboxItem_default = MenuCheckboxItem_vue_vue_type_script_setup_true_lang_default;
var MenuRootContentModal_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
  __name: "MenuRootContentModal",
  props: {
    loop: {
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
    "escapeKeyDown",
    "pointerDownOutside",
    "focusOutside",
    "interactOutside",
    "entryFocus",
    "openAutoFocus",
    "closeAutoFocus"
  ],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const forwarded = useForwardPropsEmits(props, emits);
    const menuContext = injectMenuContext();
    const { forwardRef, currentElement } = useForwardExpose();
    useHideOthers(currentElement);
    return (_ctx, _cache) => {
      return vueExports.openBlock(), vueExports.createBlock(MenuContentImpl_default, vueExports.mergeProps(vueExports.unref(forwarded), {
        ref: vueExports.unref(forwardRef),
        "trap-focus": vueExports.unref(menuContext).open.value,
        "disable-outside-pointer-events": vueExports.unref(menuContext).open.value,
        "disable-outside-scroll": true,
        onDismiss: _cache[0] || (_cache[0] = ($event) => vueExports.unref(menuContext).onOpenChange(false)),
        onFocusOutside: _cache[1] || (_cache[1] = vueExports.withModifiers(($event) => emits("focusOutside", $event), ["prevent"]))
      }), {
        default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
        _: 3
      }, 16, ["trap-focus", "disable-outside-pointer-events"]);
    };
  }
});
var MenuRootContentModal_default = MenuRootContentModal_vue_vue_type_script_setup_true_lang_default;
var MenuRootContentNonModal_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
  __name: "MenuRootContentNonModal",
  props: {
    loop: {
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
    "escapeKeyDown",
    "pointerDownOutside",
    "focusOutside",
    "interactOutside",
    "entryFocus",
    "openAutoFocus",
    "closeAutoFocus"
  ],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const forwarded = useForwardPropsEmits(props, emits);
    const menuContext = injectMenuContext();
    return (_ctx, _cache) => {
      return vueExports.openBlock(), vueExports.createBlock(MenuContentImpl_default, vueExports.mergeProps(vueExports.unref(forwarded), {
        "trap-focus": false,
        "disable-outside-pointer-events": false,
        "disable-outside-scroll": false,
        onDismiss: _cache[0] || (_cache[0] = ($event) => vueExports.unref(menuContext).onOpenChange(false))
      }), {
        default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
        _: 3
      }, 16);
    };
  }
});
var MenuRootContentNonModal_default = MenuRootContentNonModal_vue_vue_type_script_setup_true_lang_default;
var MenuContent_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
  __name: "MenuContent",
  props: {
    forceMount: {
      type: Boolean,
      required: false
    },
    loop: {
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
    "escapeKeyDown",
    "pointerDownOutside",
    "focusOutside",
    "interactOutside",
    "entryFocus",
    "openAutoFocus",
    "closeAutoFocus"
  ],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const forwarded = useForwardPropsEmits(props, emits);
    const menuContext = injectMenuContext();
    const rootContext = injectMenuRootContext();
    return (_ctx, _cache) => {
      return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(Presence_default), { present: _ctx.forceMount || vueExports.unref(menuContext).open.value }, {
        default: vueExports.withCtx(() => [vueExports.unref(rootContext).modal.value ? (vueExports.openBlock(), vueExports.createBlock(MenuRootContentModal_default, vueExports.normalizeProps(vueExports.mergeProps({ key: 0 }, {
          ..._ctx.$attrs,
          ...vueExports.unref(forwarded)
        })), {
          default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
          _: 3
        }, 16)) : (vueExports.openBlock(), vueExports.createBlock(MenuRootContentNonModal_default, vueExports.normalizeProps(vueExports.mergeProps({ key: 1 }, {
          ..._ctx.$attrs,
          ...vueExports.unref(forwarded)
        })), {
          default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
          _: 3
        }, 16))]),
        _: 3
      }, 8, ["present"]);
    };
  }
});
var MenuContent_default = MenuContent_vue_vue_type_script_setup_true_lang_default;
var MenuGroup_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
  __name: "MenuGroup",
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
      return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(Primitive), vueExports.mergeProps({ role: "group" }, props), {
        default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
        _: 3
      }, 16);
    };
  }
});
var MenuGroup_default = MenuGroup_vue_vue_type_script_setup_true_lang_default;
var MenuLabel_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
  __name: "MenuLabel",
  props: {
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
    return (_ctx, _cache) => {
      return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(Primitive), vueExports.normalizeProps(vueExports.guardReactiveProps(props)), {
        default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
        _: 3
      }, 16);
    };
  }
});
var MenuLabel_default = MenuLabel_vue_vue_type_script_setup_true_lang_default;
var MenuPortal_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
  __name: "MenuPortal",
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
var MenuPortal_default = MenuPortal_vue_vue_type_script_setup_true_lang_default;
const [injectMenuRadioGroupContext, provideMenuRadioGroupContext] = createContext("MenuRadioGroup");
var MenuRadioGroup_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
  __name: "MenuRadioGroup",
  props: {
    modelValue: {
      type: String,
      required: false,
      default: ""
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
    const delegatedProps = reactiveOmit$1(props, ["modelValue"]);
    const forwarded = useForwardProps(delegatedProps);
    const modelValue = useVModel(props, "modelValue", emits);
    provideMenuRadioGroupContext({
      modelValue,
      onValueChange: (payload) => {
        modelValue.value = payload;
      }
    });
    return (_ctx, _cache) => {
      return vueExports.openBlock(), vueExports.createBlock(MenuGroup_default, vueExports.normalizeProps(vueExports.guardReactiveProps(vueExports.unref(forwarded))), {
        default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default", { modelValue: vueExports.unref(modelValue) })]),
        _: 3
      }, 16);
    };
  }
});
var MenuRadioGroup_default = MenuRadioGroup_vue_vue_type_script_setup_true_lang_default;
var MenuRadioItem_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
  __name: "MenuRadioItem",
  props: {
    value: {
      type: String,
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
    const delegatedProps = reactiveOmit$1(props, ["value"]);
    const forwarded = useForwardProps(delegatedProps);
    const { value } = vueExports.toRefs(props);
    const radioGroupContext = injectMenuRadioGroupContext();
    const modelValue = vueExports.computed(() => radioGroupContext.modelValue.value === value?.value);
    provideMenuItemIndicatorContext({ modelValue });
    return (_ctx, _cache) => {
      return vueExports.openBlock(), vueExports.createBlock(MenuItem_default, vueExports.mergeProps({ role: "menuitemradio" }, vueExports.unref(forwarded), {
        "aria-checked": modelValue.value,
        "data-state": vueExports.unref(getCheckedState)(modelValue.value),
        onSelect: _cache[0] || (_cache[0] = async (event) => {
          emits("select", event);
          vueExports.unref(radioGroupContext).onValueChange(vueExports.unref(value));
        })
      }), {
        default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
        _: 3
      }, 16, ["aria-checked", "data-state"]);
    };
  }
});
var MenuRadioItem_default = MenuRadioItem_vue_vue_type_script_setup_true_lang_default;
var MenuSeparator_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
  __name: "MenuSeparator",
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
      return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(Primitive), vueExports.mergeProps(props, {
        role: "separator",
        "aria-orientation": "horizontal"
      }), {
        default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
        _: 3
      }, 16);
    };
  }
});
var MenuSeparator_default = MenuSeparator_vue_vue_type_script_setup_true_lang_default;
const [injectMenuSubContext, provideMenuSubContext] = createContext("MenuSub");
var MenuSub_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
  __name: "MenuSub",
  props: { open: {
    type: Boolean,
    required: false,
    default: void 0
  } },
  emits: ["update:open"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const open = useVModel(props, "open", emits, {
      defaultValue: false,
      passive: props.open === void 0
    });
    const parentMenuContext = injectMenuContext();
    const trigger = vueExports.ref();
    const content = vueExports.ref();
    vueExports.watchEffect((cleanupFn) => {
      if (parentMenuContext?.open.value === false) open.value = false;
      cleanupFn(() => open.value = false);
    });
    provideMenuContext({
      open,
      onOpenChange: (value) => {
        open.value = value;
      },
      content,
      onContentChange: (element) => {
        content.value = element;
      }
    });
    provideMenuSubContext({
      triggerId: "",
      contentId: "",
      trigger,
      onTriggerChange: (element) => {
        trigger.value = element;
      }
    });
    return (_ctx, _cache) => {
      return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(PopperRoot_default), null, {
        default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
        _: 3
      });
    };
  }
});
var MenuSub_default = MenuSub_vue_vue_type_script_setup_true_lang_default;
var MenuSubContent_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
  __name: "MenuSubContent",
  props: {
    forceMount: {
      type: Boolean,
      required: false
    },
    loop: {
      type: Boolean,
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
      required: false,
      default: true
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
    "escapeKeyDown",
    "pointerDownOutside",
    "focusOutside",
    "interactOutside",
    "entryFocus",
    "openAutoFocus",
    "closeAutoFocus"
  ],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const forwarded = useForwardPropsEmits(props, emits);
    const menuContext = injectMenuContext();
    const rootContext = injectMenuRootContext();
    const menuSubContext = injectMenuSubContext();
    const { forwardRef, currentElement: subContentElement } = useForwardExpose();
    menuSubContext.contentId ||= useId(void 0, "reka-menu-sub-content");
    return (_ctx, _cache) => {
      return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(Presence_default), { present: _ctx.forceMount || vueExports.unref(menuContext).open.value }, {
        default: vueExports.withCtx(() => [vueExports.createVNode(MenuContentImpl_default, vueExports.mergeProps(vueExports.unref(forwarded), {
          id: vueExports.unref(menuSubContext).contentId,
          ref: vueExports.unref(forwardRef),
          "aria-labelledby": vueExports.unref(menuSubContext).triggerId,
          align: "start",
          side: vueExports.unref(rootContext).dir.value === "rtl" ? "left" : "right",
          "disable-outside-pointer-events": false,
          "disable-outside-scroll": false,
          "trap-focus": false,
          onOpenAutoFocus: _cache[0] || (_cache[0] = vueExports.withModifiers((event) => {
            if (vueExports.unref(rootContext).isUsingKeyboardRef.value) vueExports.unref(subContentElement)?.focus();
          }, ["prevent"])),
          onCloseAutoFocus: _cache[1] || (_cache[1] = vueExports.withModifiers(() => {
          }, ["prevent"])),
          onFocusOutside: _cache[2] || (_cache[2] = (event) => {
            if (event.defaultPrevented) return;
            if (event.target !== vueExports.unref(menuSubContext).trigger.value) vueExports.unref(menuContext).onOpenChange(false);
          }),
          onEscapeKeyDown: _cache[3] || (_cache[3] = (event) => {
            vueExports.unref(rootContext).onClose();
            event.preventDefault();
          }),
          onKeydown: _cache[4] || (_cache[4] = (event) => {
            const isKeyDownInside = event.currentTarget?.contains(event.target);
            const isCloseKey = vueExports.unref(SUB_CLOSE_KEYS)[vueExports.unref(rootContext).dir.value].includes(event.key);
            if (isKeyDownInside && isCloseKey) {
              vueExports.unref(menuContext).onOpenChange(false);
              vueExports.unref(menuSubContext).trigger.value?.focus();
              event.preventDefault();
            }
          })
        }), {
          default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
          _: 3
        }, 16, [
          "id",
          "aria-labelledby",
          "side"
        ])]),
        _: 3
      }, 8, ["present"]);
    };
  }
});
var MenuSubContent_default = MenuSubContent_vue_vue_type_script_setup_true_lang_default;
var MenuSubTrigger_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
  __name: "MenuSubTrigger",
  props: {
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
  setup(__props) {
    const props = __props;
    const menuContext = injectMenuContext();
    const rootContext = injectMenuRootContext();
    const subContext = injectMenuSubContext();
    const contentContext = injectMenuContentContext();
    const openTimerRef = vueExports.ref(null);
    subContext.triggerId ||= useId(void 0, "reka-menu-sub-trigger");
    function clearOpenTimer() {
      if (openTimerRef.value) (void 0).clearTimeout(openTimerRef.value);
      openTimerRef.value = null;
    }
    function handlePointerMove(event) {
      if (!isMouseEvent(event)) return;
      const defaultPrevented = contentContext.onItemEnter(event);
      if (defaultPrevented) return;
      if (!props.disabled && !menuContext.open.value && !openTimerRef.value) {
        contentContext.onPointerGraceIntentChange(null);
        openTimerRef.value = (void 0).setTimeout(() => {
          menuContext.onOpenChange(true);
          clearOpenTimer();
        }, 100);
      }
    }
    async function handlePointerLeave(event) {
      if (!isMouseEvent(event)) return;
      clearOpenTimer();
      const contentRect = menuContext.content.value?.getBoundingClientRect();
      if (contentRect?.width) {
        const side = menuContext.content.value?.dataset.side;
        const rightSide = side === "right";
        const bleed = rightSide ? -5 : 5;
        const contentNearEdge = contentRect[rightSide ? "left" : "right"];
        const contentFarEdge = contentRect[rightSide ? "right" : "left"];
        contentContext.onPointerGraceIntentChange({
          area: [
            {
              x: event.clientX + bleed,
              y: event.clientY
            },
            {
              x: contentNearEdge,
              y: contentRect.top
            },
            {
              x: contentFarEdge,
              y: contentRect.top
            },
            {
              x: contentFarEdge,
              y: contentRect.bottom
            },
            {
              x: contentNearEdge,
              y: contentRect.bottom
            }
          ],
          side
        });
        (void 0).clearTimeout(contentContext.pointerGraceTimerRef.value);
        contentContext.pointerGraceTimerRef.value = (void 0).setTimeout(() => contentContext.onPointerGraceIntentChange(null), 300);
      } else {
        const defaultPrevented = contentContext.onTriggerLeave(event);
        if (defaultPrevented) return;
        contentContext.onPointerGraceIntentChange(null);
      }
    }
    async function handleKeyDown(event) {
      const isTypingAhead = contentContext.searchRef.value !== "";
      if (props.disabled || isTypingAhead && event.key === " ") return;
      if (SUB_OPEN_KEYS[rootContext.dir.value].includes(event.key)) {
        menuContext.onOpenChange(true);
        await vueExports.nextTick();
        menuContext.content.value?.focus();
        event.preventDefault();
      }
    }
    return (_ctx, _cache) => {
      return vueExports.openBlock(), vueExports.createBlock(MenuAnchor_default, { "as-child": "" }, {
        default: vueExports.withCtx(() => [vueExports.createVNode(MenuItemImpl_default, vueExports.mergeProps(props, {
          id: vueExports.unref(subContext).triggerId,
          ref: (vnode) => {
            vueExports.unref(subContext)?.onTriggerChange(vnode?.$el);
            return void 0;
          },
          "aria-haspopup": "menu",
          "aria-expanded": vueExports.unref(menuContext).open.value,
          "aria-controls": vueExports.unref(subContext).contentId,
          "data-state": vueExports.unref(getOpenState)(vueExports.unref(menuContext).open.value),
          onClick: _cache[0] || (_cache[0] = async (event) => {
            if (props.disabled || event.defaultPrevented) return;
            event.currentTarget.focus();
            if (!vueExports.unref(menuContext).open.value) vueExports.unref(menuContext).onOpenChange(true);
          }),
          onPointermove: handlePointerMove,
          onPointerleave: handlePointerLeave,
          onKeydown: handleKeyDown
        }), {
          default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
          _: 3
        }, 16, [
          "id",
          "aria-expanded",
          "aria-controls",
          "data-state"
        ])]),
        _: 3
      });
    };
  }
});
var MenuSubTrigger_default = MenuSubTrigger_vue_vue_type_script_setup_true_lang_default;
var DropdownMenuArrow_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
  __name: "DropdownMenuArrow",
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
    useForwardExpose();
    return (_ctx, _cache) => {
      return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(MenuArrow_default), vueExports.normalizeProps(vueExports.guardReactiveProps(props)), {
        default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
        _: 3
      }, 16);
    };
  }
});
var DropdownMenuArrow_default = DropdownMenuArrow_vue_vue_type_script_setup_true_lang_default;
var DropdownMenuCheckboxItem_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
  __name: "DropdownMenuCheckboxItem",
  props: {
    modelValue: {
      type: [Boolean, String],
      required: false
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
  emits: ["select", "update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const emitsAsProps = useEmitAsProps(emits);
    useForwardExpose();
    return (_ctx, _cache) => {
      return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(MenuCheckboxItem_default), vueExports.normalizeProps(vueExports.guardReactiveProps({
        ...props,
        ...vueExports.unref(emitsAsProps)
      })), {
        default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
        _: 3
      }, 16);
    };
  }
});
var DropdownMenuCheckboxItem_default = DropdownMenuCheckboxItem_vue_vue_type_script_setup_true_lang_default;
const [injectDropdownMenuRootContext, provideDropdownMenuRootContext] = createContext("DropdownMenuRoot");
var DropdownMenuRoot_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
  __name: "DropdownMenuRoot",
  props: {
    defaultOpen: {
      type: Boolean,
      required: false
    },
    open: {
      type: Boolean,
      required: false,
      default: void 0
    },
    dir: {
      type: String,
      required: false
    },
    modal: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  emits: ["update:open"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    useForwardExpose();
    const open = useVModel(props, "open", emit, {
      defaultValue: props.defaultOpen,
      passive: props.open === void 0
    });
    const triggerElement = vueExports.ref();
    const { modal, dir: propDir } = vueExports.toRefs(props);
    const dir = useDirection(propDir);
    provideDropdownMenuRootContext({
      open,
      onOpenChange: (value) => {
        open.value = value;
      },
      onOpenToggle: () => {
        open.value = !open.value;
      },
      triggerId: "",
      triggerElement,
      contentId: "",
      modal,
      dir
    });
    return (_ctx, _cache) => {
      return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(MenuRoot_default), {
        open: vueExports.unref(open),
        "onUpdate:open": _cache[0] || (_cache[0] = ($event) => vueExports.isRef(open) ? open.value = $event : null),
        dir: vueExports.unref(dir),
        modal: vueExports.unref(modal)
      }, {
        default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default", { open: vueExports.unref(open) })]),
        _: 3
      }, 8, [
        "open",
        "dir",
        "modal"
      ]);
    };
  }
});
var DropdownMenuRoot_default = DropdownMenuRoot_vue_vue_type_script_setup_true_lang_default;
var DropdownMenuContent_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
  __name: "DropdownMenuContent",
  props: {
    forceMount: {
      type: Boolean,
      required: false
    },
    loop: {
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
    "escapeKeyDown",
    "pointerDownOutside",
    "focusOutside",
    "interactOutside",
    "closeAutoFocus"
  ],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const forwarded = useForwardPropsEmits(props, emits);
    useForwardExpose();
    const rootContext = injectDropdownMenuRootContext();
    const hasInteractedOutsideRef = vueExports.ref(false);
    function handleCloseAutoFocus(event) {
      if (event.defaultPrevented) return;
      if (!hasInteractedOutsideRef.value) setTimeout(() => {
        rootContext.triggerElement.value?.focus();
      }, 0);
      hasInteractedOutsideRef.value = false;
      event.preventDefault();
    }
    rootContext.contentId ||= useId(void 0, "reka-dropdown-menu-content");
    return (_ctx, _cache) => {
      return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(MenuContent_default), vueExports.mergeProps(vueExports.unref(forwarded), {
        id: vueExports.unref(rootContext).contentId,
        "aria-labelledby": vueExports.unref(rootContext)?.triggerId,
        style: {
          "--reka-dropdown-menu-content-transform-origin": "var(--reka-popper-transform-origin)",
          "--reka-dropdown-menu-content-available-width": "var(--reka-popper-available-width)",
          "--reka-dropdown-menu-content-available-height": "var(--reka-popper-available-height)",
          "--reka-dropdown-menu-trigger-width": "var(--reka-popper-anchor-width)",
          "--reka-dropdown-menu-trigger-height": "var(--reka-popper-anchor-height)"
        },
        onCloseAutoFocus: handleCloseAutoFocus,
        onInteractOutside: _cache[0] || (_cache[0] = (event) => {
          if (event.defaultPrevented) return;
          const originalEvent = event.detail.originalEvent;
          const ctrlLeftClick = originalEvent.button === 0 && originalEvent.ctrlKey === true;
          const isRightClick = originalEvent.button === 2 || ctrlLeftClick;
          if (!vueExports.unref(rootContext).modal.value || isRightClick) hasInteractedOutsideRef.value = true;
          if (vueExports.unref(rootContext).triggerElement.value?.contains(event.target)) event.preventDefault();
        })
      }), {
        default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
        _: 3
      }, 16, ["id", "aria-labelledby"]);
    };
  }
});
var DropdownMenuContent_default = DropdownMenuContent_vue_vue_type_script_setup_true_lang_default;
var DropdownMenuGroup_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
  __name: "DropdownMenuGroup",
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
      return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(MenuGroup_default), vueExports.normalizeProps(vueExports.guardReactiveProps(props)), {
        default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
        _: 3
      }, 16);
    };
  }
});
var DropdownMenuGroup_default = DropdownMenuGroup_vue_vue_type_script_setup_true_lang_default;
var DropdownMenuItem_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
  __name: "DropdownMenuItem",
  props: {
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
    const emitsAsProps = useEmitAsProps(emits);
    useForwardExpose();
    return (_ctx, _cache) => {
      return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(MenuItem_default), vueExports.normalizeProps(vueExports.guardReactiveProps({
        ...props,
        ...vueExports.unref(emitsAsProps)
      })), {
        default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
        _: 3
      }, 16);
    };
  }
});
var DropdownMenuItem_default = DropdownMenuItem_vue_vue_type_script_setup_true_lang_default;
var DropdownMenuItemIndicator_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
  __name: "DropdownMenuItemIndicator",
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
  setup(__props) {
    const props = __props;
    useForwardExpose();
    return (_ctx, _cache) => {
      return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(MenuItemIndicator_default), vueExports.normalizeProps(vueExports.guardReactiveProps(props)), {
        default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
        _: 3
      }, 16);
    };
  }
});
var DropdownMenuItemIndicator_default = DropdownMenuItemIndicator_vue_vue_type_script_setup_true_lang_default;
var DropdownMenuLabel_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
  __name: "DropdownMenuLabel",
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
      return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(MenuLabel_default), vueExports.normalizeProps(vueExports.guardReactiveProps(props)), {
        default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
        _: 3
      }, 16);
    };
  }
});
var DropdownMenuLabel_default = DropdownMenuLabel_vue_vue_type_script_setup_true_lang_default;
var DropdownMenuPortal_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
  __name: "DropdownMenuPortal",
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
      return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(MenuPortal_default), vueExports.normalizeProps(vueExports.guardReactiveProps(props)), {
        default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
        _: 3
      }, 16);
    };
  }
});
var DropdownMenuPortal_default = DropdownMenuPortal_vue_vue_type_script_setup_true_lang_default;
var DropdownMenuRadioGroup_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
  __name: "DropdownMenuRadioGroup",
  props: {
    modelValue: {
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
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const emitsAsProps = useEmitAsProps(emits);
    useForwardExpose();
    return (_ctx, _cache) => {
      return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(MenuRadioGroup_default), vueExports.normalizeProps(vueExports.guardReactiveProps({
        ...props,
        ...vueExports.unref(emitsAsProps)
      })), {
        default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
        _: 3
      }, 16);
    };
  }
});
var DropdownMenuRadioGroup_default = DropdownMenuRadioGroup_vue_vue_type_script_setup_true_lang_default;
var DropdownMenuRadioItem_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
  __name: "DropdownMenuRadioItem",
  props: {
    value: {
      type: String,
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
    const forwarded = useForwardPropsEmits(props, emits);
    useForwardExpose();
    return (_ctx, _cache) => {
      return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(MenuRadioItem_default), vueExports.normalizeProps(vueExports.guardReactiveProps(vueExports.unref(forwarded))), {
        default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
        _: 3
      }, 16);
    };
  }
});
var DropdownMenuRadioItem_default = DropdownMenuRadioItem_vue_vue_type_script_setup_true_lang_default;
var DropdownMenuSeparator_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
  __name: "DropdownMenuSeparator",
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
      return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(MenuSeparator_default), vueExports.normalizeProps(vueExports.guardReactiveProps(props)), {
        default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
        _: 3
      }, 16);
    };
  }
});
var DropdownMenuSeparator_default = DropdownMenuSeparator_vue_vue_type_script_setup_true_lang_default;
var DropdownMenuSub_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
  __name: "DropdownMenuSub",
  props: {
    defaultOpen: {
      type: Boolean,
      required: false
    },
    open: {
      type: Boolean,
      required: false,
      default: void 0
    }
  },
  emits: ["update:open"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const open = useVModel(props, "open", emit, {
      passive: props.open === void 0,
      defaultValue: props.defaultOpen ?? false
    });
    useForwardExpose();
    return (_ctx, _cache) => {
      return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(MenuSub_default), {
        open: vueExports.unref(open),
        "onUpdate:open": _cache[0] || (_cache[0] = ($event) => vueExports.isRef(open) ? open.value = $event : null)
      }, {
        default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default", { open: vueExports.unref(open) })]),
        _: 3
      }, 8, ["open"]);
    };
  }
});
var DropdownMenuSub_default = DropdownMenuSub_vue_vue_type_script_setup_true_lang_default;
var DropdownMenuSubContent_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
  __name: "DropdownMenuSubContent",
  props: {
    forceMount: {
      type: Boolean,
      required: false
    },
    loop: {
      type: Boolean,
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
    "escapeKeyDown",
    "pointerDownOutside",
    "focusOutside",
    "interactOutside",
    "entryFocus",
    "openAutoFocus",
    "closeAutoFocus"
  ],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const forwarded = useForwardPropsEmits(props, emits);
    useForwardExpose();
    return (_ctx, _cache) => {
      return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(MenuSubContent_default), vueExports.mergeProps(vueExports.unref(forwarded), { style: {
        "--reka-dropdown-menu-content-transform-origin": "var(--reka-popper-transform-origin)",
        "--reka-dropdown-menu-content-available-width": "var(--reka-popper-available-width)",
        "--reka-dropdown-menu-content-available-height": "var(--reka-popper-available-height)",
        "--reka-dropdown-menu-trigger-width": "var(--reka-popper-anchor-width)",
        "--reka-dropdown-menu-trigger-height": "var(--reka-popper-anchor-height)"
      } }), {
        default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
        _: 3
      }, 16);
    };
  }
});
var DropdownMenuSubContent_default = DropdownMenuSubContent_vue_vue_type_script_setup_true_lang_default;
var DropdownMenuSubTrigger_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
  __name: "DropdownMenuSubTrigger",
  props: {
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
  setup(__props) {
    const props = __props;
    useForwardExpose();
    return (_ctx, _cache) => {
      return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(MenuSubTrigger_default), vueExports.normalizeProps(vueExports.guardReactiveProps(props)), {
        default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
        _: 3
      }, 16);
    };
  }
});
var DropdownMenuSubTrigger_default = DropdownMenuSubTrigger_vue_vue_type_script_setup_true_lang_default;
var DropdownMenuTrigger_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
  __name: "DropdownMenuTrigger",
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
    const rootContext = injectDropdownMenuRootContext();
    const { forwardRef } = useForwardExpose();
    rootContext.triggerId ||= useId(void 0, "reka-dropdown-menu-trigger");
    return (_ctx, _cache) => {
      return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(MenuAnchor_default), { "as-child": "" }, {
        default: vueExports.withCtx(() => [vueExports.createVNode(vueExports.unref(Primitive), {
          id: vueExports.unref(rootContext).triggerId,
          ref: vueExports.unref(forwardRef),
          type: _ctx.as === "button" ? "button" : void 0,
          "as-child": props.asChild,
          as: _ctx.as,
          "aria-haspopup": "menu",
          "aria-expanded": vueExports.unref(rootContext).open.value,
          "aria-controls": vueExports.unref(rootContext).open.value ? vueExports.unref(rootContext).contentId : void 0,
          "data-disabled": _ctx.disabled ? "" : void 0,
          disabled: _ctx.disabled,
          "data-state": vueExports.unref(rootContext).open.value ? "open" : "closed",
          onClick: _cache[0] || (_cache[0] = async (event) => {
            if (!_ctx.disabled && event.button === 0 && event.ctrlKey === false) {
              vueExports.unref(rootContext)?.onOpenToggle();
              await vueExports.nextTick();
              if (vueExports.unref(rootContext).open.value) event.preventDefault();
            }
          }),
          onKeydown: _cache[1] || (_cache[1] = vueExports.withKeys((event) => {
            if (_ctx.disabled) return;
            if (["Enter", " "].includes(event.key)) vueExports.unref(rootContext).onOpenToggle();
            if (event.key === "ArrowDown") vueExports.unref(rootContext).onOpenChange(true);
            if ([
              "Enter",
              " ",
              "ArrowDown"
            ].includes(event.key)) event.preventDefault();
          }, [
            "enter",
            "space",
            "arrow-down"
          ]))
        }, {
          default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
          _: 3
        }, 8, [
          "id",
          "type",
          "as-child",
          "as",
          "aria-expanded",
          "aria-controls",
          "data-disabled",
          "disabled",
          "data-state"
        ])]),
        _: 3
      });
    };
  }
});
var DropdownMenuTrigger_default = DropdownMenuTrigger_vue_vue_type_script_setup_true_lang_default;
const DropdownMenu = {
  Root: DropdownMenuRoot_default,
  Trigger: DropdownMenuTrigger_default,
  Portal: DropdownMenuPortal_default,
  Content: DropdownMenuContent_default,
  Arrow: DropdownMenuArrow_default,
  Item: DropdownMenuItem_default,
  Group: DropdownMenuGroup_default,
  Separator: DropdownMenuSeparator_default,
  CheckboxItem: DropdownMenuCheckboxItem_default,
  ItemIndicator: DropdownMenuItemIndicator_default,
  Label: DropdownMenuLabel_default,
  RadioGroup: DropdownMenuRadioGroup_default,
  RadioItem: DropdownMenuRadioItem_default,
  Sub: DropdownMenuSub_default,
  SubContent: DropdownMenuSubContent_default,
  SubTrigger: DropdownMenuSubTrigger_default
};
const kbdKeysMap = {
  meta: "",
  ctrl: "",
  alt: "",
  win: "⊞",
  command: "⌘",
  shift: "⇧",
  control: "⌃",
  option: "⌥",
  enter: "↵",
  delete: "⌦",
  backspace: "⌫",
  escape: "Esc",
  tab: "⇥",
  capslock: "⇪",
  arrowup: "↑",
  arrowright: "→",
  arrowdown: "↓",
  arrowleft: "←",
  pageup: "⇞",
  pagedown: "⇟",
  home: "↖",
  end: "↘"
};
const _useKbd = () => {
  const macOS = vueExports.computed(() => false);
  const kbdKeysSpecificMap = vueExports.reactive({
    meta: " ",
    alt: " ",
    ctrl: " "
  });
  function getKbdKey(value) {
    if (!value) {
      return;
    }
    if (["meta", "alt", "ctrl"].includes(value)) {
      return kbdKeysSpecificMap[value];
    }
    return kbdKeysMap[value] || value;
  }
  return {
    macOS,
    getKbdKey
  };
};
const useKbd = /* @__PURE__ */ createSharedComposable(_useKbd);
const theme$1 = {
  "base": "inline-flex items-center justify-center px-1 rounded-sm font-medium font-sans uppercase",
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
    "size": {
      "sm": "h-4 min-w-[16px] text-[10px]",
      "md": "h-5 min-w-[20px] text-[11px]",
      "lg": "h-6 min-w-[24px] text-[12px]"
    }
  },
  "compoundVariants": [
    {
      "color": "primary",
      "variant": "solid",
      "class": "text-inverted bg-primary"
    },
    {
      "color": "secondary",
      "variant": "solid",
      "class": "text-inverted bg-secondary"
    },
    {
      "color": "success",
      "variant": "solid",
      "class": "text-inverted bg-success"
    },
    {
      "color": "info",
      "variant": "solid",
      "class": "text-inverted bg-info"
    },
    {
      "color": "warning",
      "variant": "solid",
      "class": "text-inverted bg-warning"
    },
    {
      "color": "error",
      "variant": "solid",
      "class": "text-inverted bg-error"
    },
    {
      "color": "primary",
      "variant": "outline",
      "class": "ring ring-inset ring-primary/50 text-primary"
    },
    {
      "color": "secondary",
      "variant": "outline",
      "class": "ring ring-inset ring-secondary/50 text-secondary"
    },
    {
      "color": "success",
      "variant": "outline",
      "class": "ring ring-inset ring-success/50 text-success"
    },
    {
      "color": "info",
      "variant": "outline",
      "class": "ring ring-inset ring-info/50 text-info"
    },
    {
      "color": "warning",
      "variant": "outline",
      "class": "ring ring-inset ring-warning/50 text-warning"
    },
    {
      "color": "error",
      "variant": "outline",
      "class": "ring ring-inset ring-error/50 text-error"
    },
    {
      "color": "primary",
      "variant": "soft",
      "class": "text-primary bg-primary/10"
    },
    {
      "color": "secondary",
      "variant": "soft",
      "class": "text-secondary bg-secondary/10"
    },
    {
      "color": "success",
      "variant": "soft",
      "class": "text-success bg-success/10"
    },
    {
      "color": "info",
      "variant": "soft",
      "class": "text-info bg-info/10"
    },
    {
      "color": "warning",
      "variant": "soft",
      "class": "text-warning bg-warning/10"
    },
    {
      "color": "error",
      "variant": "soft",
      "class": "text-error bg-error/10"
    },
    {
      "color": "primary",
      "variant": "subtle",
      "class": "text-primary ring ring-inset ring-primary/25 bg-primary/10"
    },
    {
      "color": "secondary",
      "variant": "subtle",
      "class": "text-secondary ring ring-inset ring-secondary/25 bg-secondary/10"
    },
    {
      "color": "success",
      "variant": "subtle",
      "class": "text-success ring ring-inset ring-success/25 bg-success/10"
    },
    {
      "color": "info",
      "variant": "subtle",
      "class": "text-info ring ring-inset ring-info/25 bg-info/10"
    },
    {
      "color": "warning",
      "variant": "subtle",
      "class": "text-warning ring ring-inset ring-warning/25 bg-warning/10"
    },
    {
      "color": "error",
      "variant": "subtle",
      "class": "text-error ring ring-inset ring-error/25 bg-error/10"
    },
    {
      "color": "neutral",
      "variant": "solid",
      "class": "text-inverted bg-inverted"
    },
    {
      "color": "neutral",
      "variant": "outline",
      "class": "ring ring-inset ring-accented text-default bg-default"
    },
    {
      "color": "neutral",
      "variant": "soft",
      "class": "text-default bg-elevated"
    },
    {
      "color": "neutral",
      "variant": "subtle",
      "class": "ring ring-inset ring-accented text-default bg-elevated"
    }
  ],
  "defaultVariants": {
    "variant": "outline",
    "color": "neutral",
    "size": "md"
  }
};
const _sfc_main$2 = {
  __name: "UKbd",
  __ssrInlineRender: true,
  props: {
    as: { type: null, required: false, default: "kbd" },
    value: { type: null, required: false },
    color: { type: null, required: false },
    variant: { type: null, required: false },
    size: { type: null, required: false },
    class: { type: null, required: false }
  },
  setup(__props) {
    const props = __props;
    const { getKbdKey } = useKbd();
    const appConfig = useAppConfig();
    const ui = vueExports.computed(() => tv({ extend: tv(theme$1), ...appConfig.ui?.kbd || {} }));
    return (_ctx, _push, _parent, _attrs) => {
      _push(serverRenderer_cjs_prodExports.ssrRenderComponent(vueExports.unref(Primitive), vueExports.mergeProps({
        as: __props.as,
        class: ui.value({ class: props.class, color: props.color, variant: props.variant, size: props.size })
      }, _attrs), {
        default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            serverRenderer_cjs_prodExports.ssrRenderSlot(_ctx.$slots, "default", {}, () => {
              _push2(`${serverRenderer_cjs_prodExports.ssrInterpolate(vueExports.unref(getKbdKey)(__props.value))}`);
            }, _push2, _parent2, _scopeId);
          } else {
            return [
              vueExports.renderSlot(_ctx.$slots, "default", {}, () => [
                vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(getKbdKey)(__props.value)), 1)
              ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/@nuxt+ui@4.2.1_@babel+parser@7.28.5_axios@1.13.2_db0@0.3.4_better-sqlite3@12.5.0_drizzl_dfa8f561a9d8983c7332d596b28eea3c/node_modules/@nuxt/ui/dist/runtime/components/Kbd.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {
  __name: "UDropdownMenuContent",
  __ssrInlineRender: true,
  props: {
    items: { type: null, required: false },
    portal: { type: [Boolean, String], required: false, skipCheck: true },
    sub: { type: Boolean, required: false },
    labelKey: { type: null, required: true },
    descriptionKey: { type: null, required: true },
    checkedIcon: { type: null, required: false },
    loadingIcon: { type: null, required: false },
    externalIcon: { type: [Boolean, String], required: false, skipCheck: true },
    class: { type: null, required: false },
    ui: { type: null, required: true },
    uiOverride: { type: null, required: false },
    loop: { type: Boolean, required: false },
    side: { type: null, required: false },
    sideOffset: { type: Number, required: false },
    sideFlip: { type: Boolean, required: false },
    align: { type: null, required: false },
    alignOffset: { type: Number, required: false },
    alignFlip: { type: Boolean, required: false },
    avoidCollisions: { type: Boolean, required: false },
    collisionBoundary: { type: null, required: false },
    collisionPadding: { type: [Number, Object], required: false },
    arrowPadding: { type: Number, required: false },
    sticky: { type: String, required: false },
    hideWhenDetached: { type: Boolean, required: false },
    positionStrategy: { type: String, required: false },
    updatePositionStrategy: { type: String, required: false },
    disableUpdateOnLayoutShift: { type: Boolean, required: false },
    prioritizePosition: { type: Boolean, required: false },
    reference: { type: null, required: false }
  },
  emits: ["escapeKeyDown", "pointerDownOutside", "focusOutside", "interactOutside", "closeAutoFocus"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const slots = vueExports.useSlots();
    const { dir } = useLocale();
    const appConfig = useAppConfig();
    const portalProps = usePortal(vueExports.toRef(() => props.portal));
    const contentProps = useForwardPropsEmits(reactiveOmit(props, "sub", "items", "portal", "labelKey", "descriptionKey", "checkedIcon", "loadingIcon", "externalIcon", "class", "ui", "uiOverride"), emits);
    const getProxySlots = () => omit(slots, ["default"]);
    const [DefineItemTemplate, ReuseItemTemplate] = createReusableTemplate();
    const childrenIcon = vueExports.computed(() => dir.value === "rtl" ? appConfig.ui.icons.chevronLeft : appConfig.ui.icons.chevronRight);
    const groups = vueExports.computed(
      () => props.items?.length ? isArrayOfArray(props.items) ? props.items : [props.items] : []
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(serverRenderer_cjs_prodExports.ssrRenderComponent(vueExports.unref(DefineItemTemplate), null, {
        default: vueExports.withCtx(({ item, active, index }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            serverRenderer_cjs_prodExports.ssrRenderSlot(_ctx.$slots, item.slot || "item", {
              item,
              index,
              ui: __props.ui
            }, () => {
              serverRenderer_cjs_prodExports.ssrRenderSlot(_ctx.$slots, item.slot ? `${item.slot}-leading` : "item-leading", {
                item,
                active,
                index,
                ui: __props.ui
              }, () => {
                if (item.loading) {
                  _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_sfc_main$d, {
                    name: __props.loadingIcon || vueExports.unref(appConfig).ui.icons.loading,
                    "data-slot": "itemLeadingIcon",
                    class: __props.ui.itemLeadingIcon({ class: [__props.uiOverride?.itemLeadingIcon, item.ui?.itemLeadingIcon], color: item?.color, loading: true })
                  }, null, _parent2, _scopeId));
                } else if (item.icon) {
                  _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_sfc_main$d, {
                    name: item.icon,
                    "data-slot": "itemLeadingIcon",
                    class: __props.ui.itemLeadingIcon({ class: [__props.uiOverride?.itemLeadingIcon, item.ui?.itemLeadingIcon], color: item?.color, active })
                  }, null, _parent2, _scopeId));
                } else if (item.avatar) {
                  _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_sfc_main$b, vueExports.mergeProps({
                    size: item.ui?.itemLeadingAvatarSize || __props.uiOverride?.itemLeadingAvatarSize || __props.ui.itemLeadingAvatarSize()
                  }, item.avatar, {
                    "data-slot": "itemLeadingAvatar",
                    class: __props.ui.itemLeadingAvatar({ class: [__props.uiOverride?.itemLeadingAvatar, item.ui?.itemLeadingAvatar], active })
                  }), null, _parent2, _scopeId));
                } else {
                  _push2(`<!---->`);
                }
              }, _push2, _parent2, _scopeId);
              if (vueExports.unref(get)(item, props.labelKey) || !!slots[item.slot ? `${item.slot}-label` : "item-label"] || (vueExports.unref(get)(item, props.descriptionKey) || !!slots[item.slot ? `${item.slot}-description` : "item-description"])) {
                _push2(`<span data-slot="itemWrapper" class="${serverRenderer_cjs_prodExports.ssrRenderClass(__props.ui.itemWrapper({ class: [__props.uiOverride?.itemWrapper, item.ui?.itemWrapper] }))}"${_scopeId}><span data-slot="itemLabel" class="${serverRenderer_cjs_prodExports.ssrRenderClass(__props.ui.itemLabel({ class: [__props.uiOverride?.itemLabel, item.ui?.itemLabel], active }))}"${_scopeId}>`);
                serverRenderer_cjs_prodExports.ssrRenderSlot(_ctx.$slots, item.slot ? `${item.slot}-label` : "item-label", {
                  item,
                  active,
                  index
                }, () => {
                  _push2(`${serverRenderer_cjs_prodExports.ssrInterpolate(vueExports.unref(get)(item, props.labelKey))}`);
                }, _push2, _parent2, _scopeId);
                if (item.target === "_blank" && __props.externalIcon !== false) {
                  _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_sfc_main$d, {
                    name: typeof __props.externalIcon === "string" ? __props.externalIcon : vueExports.unref(appConfig).ui.icons.external,
                    "data-slot": "itemLabelExternalIcon",
                    class: __props.ui.itemLabelExternalIcon({ class: [__props.uiOverride?.itemLabelExternalIcon, item.ui?.itemLabelExternalIcon], color: item?.color, active })
                  }, null, _parent2, _scopeId));
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</span>`);
                if (vueExports.unref(get)(item, props.descriptionKey)) {
                  _push2(`<span data-slot="itemDescription" class="${serverRenderer_cjs_prodExports.ssrRenderClass(__props.ui.itemDescription({ class: [__props.uiOverride?.itemDescription, item.ui?.itemDescription] }))}"${_scopeId}>`);
                  serverRenderer_cjs_prodExports.ssrRenderSlot(_ctx.$slots, item.slot ? `${item.slot}-description` : "item-description", {
                    item,
                    active,
                    index
                  }, () => {
                    _push2(`${serverRenderer_cjs_prodExports.ssrInterpolate(vueExports.unref(get)(item, props.descriptionKey))}`);
                  }, _push2, _parent2, _scopeId);
                  _push2(`</span>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</span>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<span data-slot="itemTrailing" class="${serverRenderer_cjs_prodExports.ssrRenderClass(__props.ui.itemTrailing({ class: [__props.uiOverride?.itemTrailing, item.ui?.itemTrailing] }))}"${_scopeId}>`);
              serverRenderer_cjs_prodExports.ssrRenderSlot(_ctx.$slots, item.slot ? `${item.slot}-trailing` : "item-trailing", {
                item,
                active,
                index,
                ui: __props.ui
              }, () => {
                if (item.children?.length) {
                  _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_sfc_main$d, {
                    name: childrenIcon.value,
                    "data-slot": "itemTrailingIcon",
                    class: __props.ui.itemTrailingIcon({ class: [__props.uiOverride?.itemTrailingIcon, item.ui?.itemTrailingIcon], color: item?.color, active })
                  }, null, _parent2, _scopeId));
                } else if (item.kbds?.length) {
                  _push2(`<span data-slot="itemTrailingKbds" class="${serverRenderer_cjs_prodExports.ssrRenderClass(__props.ui.itemTrailingKbds({ class: [__props.uiOverride?.itemTrailingKbds, item.ui?.itemTrailingKbds] }))}"${_scopeId}><!--[-->`);
                  serverRenderer_cjs_prodExports.ssrRenderList(item.kbds, (kbd, kbdIndex) => {
                    _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_sfc_main$2, vueExports.mergeProps({
                      key: kbdIndex,
                      size: item.ui?.itemTrailingKbdsSize || __props.uiOverride?.itemTrailingKbdsSize || __props.ui.itemTrailingKbdsSize()
                    }, { ref_for: true }, typeof kbd === "string" ? { value: kbd } : kbd), null, _parent2, _scopeId));
                  });
                  _push2(`<!--]--></span>`);
                } else {
                  _push2(`<!---->`);
                }
              }, _push2, _parent2, _scopeId);
              _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(vueExports.unref(DropdownMenu).ItemIndicator, { "as-child": "" }, {
                default: vueExports.withCtx((_, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(serverRenderer_cjs_prodExports.ssrRenderComponent(_sfc_main$d, {
                      name: __props.checkedIcon || vueExports.unref(appConfig).ui.icons.check,
                      "data-slot": "itemTrailingIcon",
                      class: __props.ui.itemTrailingIcon({ class: [__props.uiOverride?.itemTrailingIcon, item.ui?.itemTrailingIcon], color: item?.color })
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      vueExports.createVNode(_sfc_main$d, {
                        name: __props.checkedIcon || vueExports.unref(appConfig).ui.icons.check,
                        "data-slot": "itemTrailingIcon",
                        class: __props.ui.itemTrailingIcon({ class: [__props.uiOverride?.itemTrailingIcon, item.ui?.itemTrailingIcon], color: item?.color })
                      }, null, 8, ["name", "class"])
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`</span>`);
            }, _push2, _parent2, _scopeId);
          } else {
            return [
              vueExports.renderSlot(_ctx.$slots, item.slot || "item", {
                item,
                index,
                ui: __props.ui
              }, () => [
                vueExports.renderSlot(_ctx.$slots, item.slot ? `${item.slot}-leading` : "item-leading", {
                  item,
                  active,
                  index,
                  ui: __props.ui
                }, () => [
                  item.loading ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$d, {
                    key: 0,
                    name: __props.loadingIcon || vueExports.unref(appConfig).ui.icons.loading,
                    "data-slot": "itemLeadingIcon",
                    class: __props.ui.itemLeadingIcon({ class: [__props.uiOverride?.itemLeadingIcon, item.ui?.itemLeadingIcon], color: item?.color, loading: true })
                  }, null, 8, ["name", "class"])) : item.icon ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$d, {
                    key: 1,
                    name: item.icon,
                    "data-slot": "itemLeadingIcon",
                    class: __props.ui.itemLeadingIcon({ class: [__props.uiOverride?.itemLeadingIcon, item.ui?.itemLeadingIcon], color: item?.color, active })
                  }, null, 8, ["name", "class"])) : item.avatar ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$b, vueExports.mergeProps({
                    key: 2,
                    size: item.ui?.itemLeadingAvatarSize || __props.uiOverride?.itemLeadingAvatarSize || __props.ui.itemLeadingAvatarSize()
                  }, item.avatar, {
                    "data-slot": "itemLeadingAvatar",
                    class: __props.ui.itemLeadingAvatar({ class: [__props.uiOverride?.itemLeadingAvatar, item.ui?.itemLeadingAvatar], active })
                  }), null, 16, ["size", "class"])) : vueExports.createCommentVNode("", true)
                ]),
                vueExports.unref(get)(item, props.labelKey) || !!slots[item.slot ? `${item.slot}-label` : "item-label"] || (vueExports.unref(get)(item, props.descriptionKey) || !!slots[item.slot ? `${item.slot}-description` : "item-description"]) ? (vueExports.openBlock(), vueExports.createBlock("span", {
                  key: 0,
                  "data-slot": "itemWrapper",
                  class: __props.ui.itemWrapper({ class: [__props.uiOverride?.itemWrapper, item.ui?.itemWrapper] })
                }, [
                  vueExports.createVNode("span", {
                    "data-slot": "itemLabel",
                    class: __props.ui.itemLabel({ class: [__props.uiOverride?.itemLabel, item.ui?.itemLabel], active })
                  }, [
                    vueExports.renderSlot(_ctx.$slots, item.slot ? `${item.slot}-label` : "item-label", {
                      item,
                      active,
                      index
                    }, () => [
                      vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(get)(item, props.labelKey)), 1)
                    ]),
                    item.target === "_blank" && __props.externalIcon !== false ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$d, {
                      key: 0,
                      name: typeof __props.externalIcon === "string" ? __props.externalIcon : vueExports.unref(appConfig).ui.icons.external,
                      "data-slot": "itemLabelExternalIcon",
                      class: __props.ui.itemLabelExternalIcon({ class: [__props.uiOverride?.itemLabelExternalIcon, item.ui?.itemLabelExternalIcon], color: item?.color, active })
                    }, null, 8, ["name", "class"])) : vueExports.createCommentVNode("", true)
                  ], 2),
                  vueExports.unref(get)(item, props.descriptionKey) ? (vueExports.openBlock(), vueExports.createBlock("span", {
                    key: 0,
                    "data-slot": "itemDescription",
                    class: __props.ui.itemDescription({ class: [__props.uiOverride?.itemDescription, item.ui?.itemDescription] })
                  }, [
                    vueExports.renderSlot(_ctx.$slots, item.slot ? `${item.slot}-description` : "item-description", {
                      item,
                      active,
                      index
                    }, () => [
                      vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(get)(item, props.descriptionKey)), 1)
                    ])
                  ], 2)) : vueExports.createCommentVNode("", true)
                ], 2)) : vueExports.createCommentVNode("", true),
                vueExports.createVNode("span", {
                  "data-slot": "itemTrailing",
                  class: __props.ui.itemTrailing({ class: [__props.uiOverride?.itemTrailing, item.ui?.itemTrailing] })
                }, [
                  vueExports.renderSlot(_ctx.$slots, item.slot ? `${item.slot}-trailing` : "item-trailing", {
                    item,
                    active,
                    index,
                    ui: __props.ui
                  }, () => [
                    item.children?.length ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$d, {
                      key: 0,
                      name: childrenIcon.value,
                      "data-slot": "itemTrailingIcon",
                      class: __props.ui.itemTrailingIcon({ class: [__props.uiOverride?.itemTrailingIcon, item.ui?.itemTrailingIcon], color: item?.color, active })
                    }, null, 8, ["name", "class"])) : item.kbds?.length ? (vueExports.openBlock(), vueExports.createBlock("span", {
                      key: 1,
                      "data-slot": "itemTrailingKbds",
                      class: __props.ui.itemTrailingKbds({ class: [__props.uiOverride?.itemTrailingKbds, item.ui?.itemTrailingKbds] })
                    }, [
                      (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(item.kbds, (kbd, kbdIndex) => {
                        return vueExports.openBlock(), vueExports.createBlock(_sfc_main$2, vueExports.mergeProps({
                          key: kbdIndex,
                          size: item.ui?.itemTrailingKbdsSize || __props.uiOverride?.itemTrailingKbdsSize || __props.ui.itemTrailingKbdsSize()
                        }, { ref_for: true }, typeof kbd === "string" ? { value: kbd } : kbd), null, 16, ["size"]);
                      }), 128))
                    ], 2)) : vueExports.createCommentVNode("", true)
                  ]),
                  vueExports.createVNode(vueExports.unref(DropdownMenu).ItemIndicator, { "as-child": "" }, {
                    default: vueExports.withCtx(() => [
                      vueExports.createVNode(_sfc_main$d, {
                        name: __props.checkedIcon || vueExports.unref(appConfig).ui.icons.check,
                        "data-slot": "itemTrailingIcon",
                        class: __props.ui.itemTrailingIcon({ class: [__props.uiOverride?.itemTrailingIcon, item.ui?.itemTrailingIcon], color: item?.color })
                      }, null, 8, ["name", "class"])
                    ]),
                    _: 2
                  }, 1024)
                ], 2)
              ])
            ];
          }
        }),
        _: 3
      }, _parent));
      _push(serverRenderer_cjs_prodExports.ssrRenderComponent(vueExports.unref(DropdownMenu).Portal, vueExports.unref(portalProps), {
        default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            serverRenderer_cjs_prodExports.ssrRenderVNode(_push2, vueExports.createVNode(vueExports.resolveDynamicComponent(__props.sub ? vueExports.unref(DropdownMenu).SubContent : vueExports.unref(DropdownMenu).Content), vueExports.mergeProps({
              "data-slot": "content",
              class: __props.ui.content({ class: [__props.uiOverride?.content, props.class] })
            }, vueExports.unref(contentProps)), {
              default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  serverRenderer_cjs_prodExports.ssrRenderSlot(_ctx.$slots, "content-top", {}, null, _push3, _parent3, _scopeId2);
                  _push3(`<div role="presentation" data-slot="viewport" class="${serverRenderer_cjs_prodExports.ssrRenderClass(__props.ui.viewport({ class: __props.uiOverride?.viewport }))}"${_scopeId2}><!--[-->`);
                  serverRenderer_cjs_prodExports.ssrRenderList(groups.value, (group, groupIndex) => {
                    _push3(serverRenderer_cjs_prodExports.ssrRenderComponent(vueExports.unref(DropdownMenu).Group, {
                      key: `group-${groupIndex}`,
                      "data-slot": "group",
                      class: __props.ui.group({ class: __props.uiOverride?.group })
                    }, {
                      default: vueExports.withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<!--[-->`);
                          serverRenderer_cjs_prodExports.ssrRenderList(group, (item, index) => {
                            _push4(`<!--[-->`);
                            if (item.type === "label") {
                              _push4(serverRenderer_cjs_prodExports.ssrRenderComponent(vueExports.unref(DropdownMenu).Label, {
                                "data-slot": "label",
                                class: __props.ui.label({ class: [__props.uiOverride?.label, item.ui?.label, item.class] })
                              }, {
                                default: vueExports.withCtx((_4, _push5, _parent5, _scopeId4) => {
                                  if (_push5) {
                                    _push5(serverRenderer_cjs_prodExports.ssrRenderComponent(vueExports.unref(ReuseItemTemplate), {
                                      item,
                                      index
                                    }, null, _parent5, _scopeId4));
                                  } else {
                                    return [
                                      vueExports.createVNode(vueExports.unref(ReuseItemTemplate), {
                                        item,
                                        index
                                      }, null, 8, ["item", "index"])
                                    ];
                                  }
                                }),
                                _: 2
                              }, _parent4, _scopeId3));
                            } else if (item.type === "separator") {
                              _push4(serverRenderer_cjs_prodExports.ssrRenderComponent(vueExports.unref(DropdownMenu).Separator, {
                                "data-slot": "separator",
                                class: __props.ui.separator({ class: [__props.uiOverride?.separator, item.ui?.separator, item.class] })
                              }, null, _parent4, _scopeId3));
                            } else if (item?.children?.length) {
                              _push4(serverRenderer_cjs_prodExports.ssrRenderComponent(vueExports.unref(DropdownMenu).Sub, {
                                open: item.open,
                                "default-open": item.defaultOpen
                              }, {
                                default: vueExports.withCtx((_4, _push5, _parent5, _scopeId4) => {
                                  if (_push5) {
                                    _push5(serverRenderer_cjs_prodExports.ssrRenderComponent(vueExports.unref(DropdownMenu).SubTrigger, {
                                      as: "button",
                                      type: "button",
                                      disabled: item.disabled,
                                      "text-value": vueExports.unref(get)(item, props.labelKey),
                                      "data-slot": "item",
                                      class: __props.ui.item({ class: [__props.uiOverride?.item, item.ui?.item, item.class], color: item?.color })
                                    }, {
                                      default: vueExports.withCtx((_5, _push6, _parent6, _scopeId5) => {
                                        if (_push6) {
                                          _push6(serverRenderer_cjs_prodExports.ssrRenderComponent(vueExports.unref(ReuseItemTemplate), {
                                            item,
                                            index
                                          }, null, _parent6, _scopeId5));
                                        } else {
                                          return [
                                            vueExports.createVNode(vueExports.unref(ReuseItemTemplate), {
                                              item,
                                              index
                                            }, null, 8, ["item", "index"])
                                          ];
                                        }
                                      }),
                                      _: 2
                                    }, _parent5, _scopeId4));
                                    _push5(serverRenderer_cjs_prodExports.ssrRenderComponent(_sfc_main$1, vueExports.mergeProps({
                                      sub: "",
                                      class: item.ui?.content,
                                      ui: __props.ui,
                                      "ui-override": __props.uiOverride,
                                      portal: __props.portal,
                                      items: item.children,
                                      align: "start",
                                      "align-offset": -4,
                                      "side-offset": 3,
                                      "label-key": __props.labelKey,
                                      "description-key": __props.descriptionKey,
                                      "checked-icon": __props.checkedIcon,
                                      "loading-icon": __props.loadingIcon,
                                      "external-icon": __props.externalIcon
                                    }, { ref_for: true }, item.content), vueExports.createSlots({ _: 2 }, [
                                      vueExports.renderList(getProxySlots(), (_5, name) => {
                                        return {
                                          name,
                                          fn: vueExports.withCtx((slotData, _push6, _parent6, _scopeId5) => {
                                            if (_push6) {
                                              serverRenderer_cjs_prodExports.ssrRenderSlot(_ctx.$slots, name, vueExports.mergeProps({ ref_for: true }, slotData), null, _push6, _parent6, _scopeId5);
                                            } else {
                                              return [
                                                vueExports.renderSlot(_ctx.$slots, name, vueExports.mergeProps({ ref_for: true }, slotData))
                                              ];
                                            }
                                          })
                                        };
                                      })
                                    ]), _parent5, _scopeId4));
                                  } else {
                                    return [
                                      vueExports.createVNode(vueExports.unref(DropdownMenu).SubTrigger, {
                                        as: "button",
                                        type: "button",
                                        disabled: item.disabled,
                                        "text-value": vueExports.unref(get)(item, props.labelKey),
                                        "data-slot": "item",
                                        class: __props.ui.item({ class: [__props.uiOverride?.item, item.ui?.item, item.class], color: item?.color })
                                      }, {
                                        default: vueExports.withCtx(() => [
                                          vueExports.createVNode(vueExports.unref(ReuseItemTemplate), {
                                            item,
                                            index
                                          }, null, 8, ["item", "index"])
                                        ]),
                                        _: 2
                                      }, 1032, ["disabled", "text-value", "class"]),
                                      vueExports.createVNode(_sfc_main$1, vueExports.mergeProps({
                                        sub: "",
                                        class: item.ui?.content,
                                        ui: __props.ui,
                                        "ui-override": __props.uiOverride,
                                        portal: __props.portal,
                                        items: item.children,
                                        align: "start",
                                        "align-offset": -4,
                                        "side-offset": 3,
                                        "label-key": __props.labelKey,
                                        "description-key": __props.descriptionKey,
                                        "checked-icon": __props.checkedIcon,
                                        "loading-icon": __props.loadingIcon,
                                        "external-icon": __props.externalIcon
                                      }, { ref_for: true }, item.content), vueExports.createSlots({ _: 2 }, [
                                        vueExports.renderList(getProxySlots(), (_5, name) => {
                                          return {
                                            name,
                                            fn: vueExports.withCtx((slotData) => [
                                              vueExports.renderSlot(_ctx.$slots, name, vueExports.mergeProps({ ref_for: true }, slotData))
                                            ])
                                          };
                                        })
                                      ]), 1040, ["class", "ui", "ui-override", "portal", "items", "label-key", "description-key", "checked-icon", "loading-icon", "external-icon"])
                                    ];
                                  }
                                }),
                                _: 2
                              }, _parent4, _scopeId3));
                            } else if (item.type === "checkbox") {
                              _push4(serverRenderer_cjs_prodExports.ssrRenderComponent(vueExports.unref(DropdownMenu).CheckboxItem, {
                                "model-value": item.checked,
                                disabled: item.disabled,
                                "text-value": vueExports.unref(get)(item, props.labelKey),
                                "data-slot": "item",
                                class: __props.ui.item({ class: [__props.uiOverride?.item, item.ui?.item, item.class], color: item?.color }),
                                "onUpdate:modelValue": item.onUpdateChecked,
                                onSelect: item.onSelect
                              }, {
                                default: vueExports.withCtx((_4, _push5, _parent5, _scopeId4) => {
                                  if (_push5) {
                                    _push5(serverRenderer_cjs_prodExports.ssrRenderComponent(vueExports.unref(ReuseItemTemplate), {
                                      item,
                                      index
                                    }, null, _parent5, _scopeId4));
                                  } else {
                                    return [
                                      vueExports.createVNode(vueExports.unref(ReuseItemTemplate), {
                                        item,
                                        index
                                      }, null, 8, ["item", "index"])
                                    ];
                                  }
                                }),
                                _: 2
                              }, _parent4, _scopeId3));
                            } else {
                              _push4(serverRenderer_cjs_prodExports.ssrRenderComponent(vueExports.unref(DropdownMenu).Item, {
                                "as-child": "",
                                disabled: item.disabled,
                                "text-value": vueExports.unref(get)(item, props.labelKey),
                                onSelect: item.onSelect
                              }, {
                                default: vueExports.withCtx((_4, _push5, _parent5, _scopeId4) => {
                                  if (_push5) {
                                    _push5(serverRenderer_cjs_prodExports.ssrRenderComponent(_sfc_main$9, vueExports.mergeProps({ ref_for: true }, vueExports.unref(pickLinkProps)(item), { custom: "" }), {
                                      default: vueExports.withCtx(({ active, ...slotProps }, _push6, _parent6, _scopeId5) => {
                                        if (_push6) {
                                          _push6(serverRenderer_cjs_prodExports.ssrRenderComponent(_sfc_main$a, vueExports.mergeProps({ ref_for: true }, slotProps, {
                                            "data-slot": "item",
                                            class: __props.ui.item({ class: [__props.uiOverride?.item, item.ui?.item, item.class], color: item?.color, active })
                                          }), {
                                            default: vueExports.withCtx((_5, _push7, _parent7, _scopeId6) => {
                                              if (_push7) {
                                                _push7(serverRenderer_cjs_prodExports.ssrRenderComponent(vueExports.unref(ReuseItemTemplate), {
                                                  item,
                                                  active,
                                                  index
                                                }, null, _parent7, _scopeId6));
                                              } else {
                                                return [
                                                  vueExports.createVNode(vueExports.unref(ReuseItemTemplate), {
                                                    item,
                                                    active,
                                                    index
                                                  }, null, 8, ["item", "active", "index"])
                                                ];
                                              }
                                            }),
                                            _: 2
                                          }, _parent6, _scopeId5));
                                        } else {
                                          return [
                                            vueExports.createVNode(_sfc_main$a, vueExports.mergeProps({ ref_for: true }, slotProps, {
                                              "data-slot": "item",
                                              class: __props.ui.item({ class: [__props.uiOverride?.item, item.ui?.item, item.class], color: item?.color, active })
                                            }), {
                                              default: vueExports.withCtx(() => [
                                                vueExports.createVNode(vueExports.unref(ReuseItemTemplate), {
                                                  item,
                                                  active,
                                                  index
                                                }, null, 8, ["item", "active", "index"])
                                              ]),
                                              _: 2
                                            }, 1040, ["class"])
                                          ];
                                        }
                                      }),
                                      _: 2
                                    }, _parent5, _scopeId4));
                                  } else {
                                    return [
                                      vueExports.createVNode(_sfc_main$9, vueExports.mergeProps({ ref_for: true }, vueExports.unref(pickLinkProps)(item), { custom: "" }), {
                                        default: vueExports.withCtx(({ active, ...slotProps }) => [
                                          vueExports.createVNode(_sfc_main$a, vueExports.mergeProps({ ref_for: true }, slotProps, {
                                            "data-slot": "item",
                                            class: __props.ui.item({ class: [__props.uiOverride?.item, item.ui?.item, item.class], color: item?.color, active })
                                          }), {
                                            default: vueExports.withCtx(() => [
                                              vueExports.createVNode(vueExports.unref(ReuseItemTemplate), {
                                                item,
                                                active,
                                                index
                                              }, null, 8, ["item", "active", "index"])
                                            ]),
                                            _: 2
                                          }, 1040, ["class"])
                                        ]),
                                        _: 2
                                      }, 1040)
                                    ];
                                  }
                                }),
                                _: 2
                              }, _parent4, _scopeId3));
                            }
                            _push4(`<!--]-->`);
                          });
                          _push4(`<!--]-->`);
                        } else {
                          return [
                            (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(group, (item, index) => {
                              return vueExports.openBlock(), vueExports.createBlock(vueExports.Fragment, {
                                key: `group-${groupIndex}-${index}`
                              }, [
                                item.type === "label" ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(DropdownMenu).Label, {
                                  key: 0,
                                  "data-slot": "label",
                                  class: __props.ui.label({ class: [__props.uiOverride?.label, item.ui?.label, item.class] })
                                }, {
                                  default: vueExports.withCtx(() => [
                                    vueExports.createVNode(vueExports.unref(ReuseItemTemplate), {
                                      item,
                                      index
                                    }, null, 8, ["item", "index"])
                                  ]),
                                  _: 2
                                }, 1032, ["class"])) : item.type === "separator" ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(DropdownMenu).Separator, {
                                  key: 1,
                                  "data-slot": "separator",
                                  class: __props.ui.separator({ class: [__props.uiOverride?.separator, item.ui?.separator, item.class] })
                                }, null, 8, ["class"])) : item?.children?.length ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(DropdownMenu).Sub, {
                                  key: 2,
                                  open: item.open,
                                  "default-open": item.defaultOpen
                                }, {
                                  default: vueExports.withCtx(() => [
                                    vueExports.createVNode(vueExports.unref(DropdownMenu).SubTrigger, {
                                      as: "button",
                                      type: "button",
                                      disabled: item.disabled,
                                      "text-value": vueExports.unref(get)(item, props.labelKey),
                                      "data-slot": "item",
                                      class: __props.ui.item({ class: [__props.uiOverride?.item, item.ui?.item, item.class], color: item?.color })
                                    }, {
                                      default: vueExports.withCtx(() => [
                                        vueExports.createVNode(vueExports.unref(ReuseItemTemplate), {
                                          item,
                                          index
                                        }, null, 8, ["item", "index"])
                                      ]),
                                      _: 2
                                    }, 1032, ["disabled", "text-value", "class"]),
                                    vueExports.createVNode(_sfc_main$1, vueExports.mergeProps({
                                      sub: "",
                                      class: item.ui?.content,
                                      ui: __props.ui,
                                      "ui-override": __props.uiOverride,
                                      portal: __props.portal,
                                      items: item.children,
                                      align: "start",
                                      "align-offset": -4,
                                      "side-offset": 3,
                                      "label-key": __props.labelKey,
                                      "description-key": __props.descriptionKey,
                                      "checked-icon": __props.checkedIcon,
                                      "loading-icon": __props.loadingIcon,
                                      "external-icon": __props.externalIcon
                                    }, { ref_for: true }, item.content), vueExports.createSlots({ _: 2 }, [
                                      vueExports.renderList(getProxySlots(), (_4, name) => {
                                        return {
                                          name,
                                          fn: vueExports.withCtx((slotData) => [
                                            vueExports.renderSlot(_ctx.$slots, name, vueExports.mergeProps({ ref_for: true }, slotData))
                                          ])
                                        };
                                      })
                                    ]), 1040, ["class", "ui", "ui-override", "portal", "items", "label-key", "description-key", "checked-icon", "loading-icon", "external-icon"])
                                  ]),
                                  _: 2
                                }, 1032, ["open", "default-open"])) : item.type === "checkbox" ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(DropdownMenu).CheckboxItem, {
                                  key: 3,
                                  "model-value": item.checked,
                                  disabled: item.disabled,
                                  "text-value": vueExports.unref(get)(item, props.labelKey),
                                  "data-slot": "item",
                                  class: __props.ui.item({ class: [__props.uiOverride?.item, item.ui?.item, item.class], color: item?.color }),
                                  "onUpdate:modelValue": item.onUpdateChecked,
                                  onSelect: item.onSelect
                                }, {
                                  default: vueExports.withCtx(() => [
                                    vueExports.createVNode(vueExports.unref(ReuseItemTemplate), {
                                      item,
                                      index
                                    }, null, 8, ["item", "index"])
                                  ]),
                                  _: 2
                                }, 1032, ["model-value", "disabled", "text-value", "class", "onUpdate:modelValue", "onSelect"])) : (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(DropdownMenu).Item, {
                                  key: 4,
                                  "as-child": "",
                                  disabled: item.disabled,
                                  "text-value": vueExports.unref(get)(item, props.labelKey),
                                  onSelect: item.onSelect
                                }, {
                                  default: vueExports.withCtx(() => [
                                    vueExports.createVNode(_sfc_main$9, vueExports.mergeProps({ ref_for: true }, vueExports.unref(pickLinkProps)(item), { custom: "" }), {
                                      default: vueExports.withCtx(({ active, ...slotProps }) => [
                                        vueExports.createVNode(_sfc_main$a, vueExports.mergeProps({ ref_for: true }, slotProps, {
                                          "data-slot": "item",
                                          class: __props.ui.item({ class: [__props.uiOverride?.item, item.ui?.item, item.class], color: item?.color, active })
                                        }), {
                                          default: vueExports.withCtx(() => [
                                            vueExports.createVNode(vueExports.unref(ReuseItemTemplate), {
                                              item,
                                              active,
                                              index
                                            }, null, 8, ["item", "active", "index"])
                                          ]),
                                          _: 2
                                        }, 1040, ["class"])
                                      ]),
                                      _: 2
                                    }, 1040)
                                  ]),
                                  _: 2
                                }, 1032, ["disabled", "text-value", "onSelect"]))
                              ], 64);
                            }), 128))
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  });
                  _push3(`<!--]--></div>`);
                  serverRenderer_cjs_prodExports.ssrRenderSlot(_ctx.$slots, "default", {}, null, _push3, _parent3, _scopeId2);
                  serverRenderer_cjs_prodExports.ssrRenderSlot(_ctx.$slots, "content-bottom", {}, null, _push3, _parent3, _scopeId2);
                } else {
                  return [
                    vueExports.renderSlot(_ctx.$slots, "content-top"),
                    vueExports.createVNode("div", {
                      role: "presentation",
                      "data-slot": "viewport",
                      class: __props.ui.viewport({ class: __props.uiOverride?.viewport })
                    }, [
                      (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(groups.value, (group, groupIndex) => {
                        return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(DropdownMenu).Group, {
                          key: `group-${groupIndex}`,
                          "data-slot": "group",
                          class: __props.ui.group({ class: __props.uiOverride?.group })
                        }, {
                          default: vueExports.withCtx(() => [
                            (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(group, (item, index) => {
                              return vueExports.openBlock(), vueExports.createBlock(vueExports.Fragment, {
                                key: `group-${groupIndex}-${index}`
                              }, [
                                item.type === "label" ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(DropdownMenu).Label, {
                                  key: 0,
                                  "data-slot": "label",
                                  class: __props.ui.label({ class: [__props.uiOverride?.label, item.ui?.label, item.class] })
                                }, {
                                  default: vueExports.withCtx(() => [
                                    vueExports.createVNode(vueExports.unref(ReuseItemTemplate), {
                                      item,
                                      index
                                    }, null, 8, ["item", "index"])
                                  ]),
                                  _: 2
                                }, 1032, ["class"])) : item.type === "separator" ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(DropdownMenu).Separator, {
                                  key: 1,
                                  "data-slot": "separator",
                                  class: __props.ui.separator({ class: [__props.uiOverride?.separator, item.ui?.separator, item.class] })
                                }, null, 8, ["class"])) : item?.children?.length ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(DropdownMenu).Sub, {
                                  key: 2,
                                  open: item.open,
                                  "default-open": item.defaultOpen
                                }, {
                                  default: vueExports.withCtx(() => [
                                    vueExports.createVNode(vueExports.unref(DropdownMenu).SubTrigger, {
                                      as: "button",
                                      type: "button",
                                      disabled: item.disabled,
                                      "text-value": vueExports.unref(get)(item, props.labelKey),
                                      "data-slot": "item",
                                      class: __props.ui.item({ class: [__props.uiOverride?.item, item.ui?.item, item.class], color: item?.color })
                                    }, {
                                      default: vueExports.withCtx(() => [
                                        vueExports.createVNode(vueExports.unref(ReuseItemTemplate), {
                                          item,
                                          index
                                        }, null, 8, ["item", "index"])
                                      ]),
                                      _: 2
                                    }, 1032, ["disabled", "text-value", "class"]),
                                    vueExports.createVNode(_sfc_main$1, vueExports.mergeProps({
                                      sub: "",
                                      class: item.ui?.content,
                                      ui: __props.ui,
                                      "ui-override": __props.uiOverride,
                                      portal: __props.portal,
                                      items: item.children,
                                      align: "start",
                                      "align-offset": -4,
                                      "side-offset": 3,
                                      "label-key": __props.labelKey,
                                      "description-key": __props.descriptionKey,
                                      "checked-icon": __props.checkedIcon,
                                      "loading-icon": __props.loadingIcon,
                                      "external-icon": __props.externalIcon
                                    }, { ref_for: true }, item.content), vueExports.createSlots({ _: 2 }, [
                                      vueExports.renderList(getProxySlots(), (_3, name) => {
                                        return {
                                          name,
                                          fn: vueExports.withCtx((slotData) => [
                                            vueExports.renderSlot(_ctx.$slots, name, vueExports.mergeProps({ ref_for: true }, slotData))
                                          ])
                                        };
                                      })
                                    ]), 1040, ["class", "ui", "ui-override", "portal", "items", "label-key", "description-key", "checked-icon", "loading-icon", "external-icon"])
                                  ]),
                                  _: 2
                                }, 1032, ["open", "default-open"])) : item.type === "checkbox" ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(DropdownMenu).CheckboxItem, {
                                  key: 3,
                                  "model-value": item.checked,
                                  disabled: item.disabled,
                                  "text-value": vueExports.unref(get)(item, props.labelKey),
                                  "data-slot": "item",
                                  class: __props.ui.item({ class: [__props.uiOverride?.item, item.ui?.item, item.class], color: item?.color }),
                                  "onUpdate:modelValue": item.onUpdateChecked,
                                  onSelect: item.onSelect
                                }, {
                                  default: vueExports.withCtx(() => [
                                    vueExports.createVNode(vueExports.unref(ReuseItemTemplate), {
                                      item,
                                      index
                                    }, null, 8, ["item", "index"])
                                  ]),
                                  _: 2
                                }, 1032, ["model-value", "disabled", "text-value", "class", "onUpdate:modelValue", "onSelect"])) : (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(DropdownMenu).Item, {
                                  key: 4,
                                  "as-child": "",
                                  disabled: item.disabled,
                                  "text-value": vueExports.unref(get)(item, props.labelKey),
                                  onSelect: item.onSelect
                                }, {
                                  default: vueExports.withCtx(() => [
                                    vueExports.createVNode(_sfc_main$9, vueExports.mergeProps({ ref_for: true }, vueExports.unref(pickLinkProps)(item), { custom: "" }), {
                                      default: vueExports.withCtx(({ active, ...slotProps }) => [
                                        vueExports.createVNode(_sfc_main$a, vueExports.mergeProps({ ref_for: true }, slotProps, {
                                          "data-slot": "item",
                                          class: __props.ui.item({ class: [__props.uiOverride?.item, item.ui?.item, item.class], color: item?.color, active })
                                        }), {
                                          default: vueExports.withCtx(() => [
                                            vueExports.createVNode(vueExports.unref(ReuseItemTemplate), {
                                              item,
                                              active,
                                              index
                                            }, null, 8, ["item", "active", "index"])
                                          ]),
                                          _: 2
                                        }, 1040, ["class"])
                                      ]),
                                      _: 2
                                    }, 1040)
                                  ]),
                                  _: 2
                                }, 1032, ["disabled", "text-value", "onSelect"]))
                              ], 64);
                            }), 128))
                          ]),
                          _: 2
                        }, 1032, ["class"]);
                      }), 128))
                    ], 2),
                    vueExports.renderSlot(_ctx.$slots, "default"),
                    vueExports.renderSlot(_ctx.$slots, "content-bottom")
                  ];
                }
              }),
              _: 3
            }), _parent2, _scopeId);
          } else {
            return [
              (vueExports.openBlock(), vueExports.createBlock(vueExports.resolveDynamicComponent(__props.sub ? vueExports.unref(DropdownMenu).SubContent : vueExports.unref(DropdownMenu).Content), vueExports.mergeProps({
                "data-slot": "content",
                class: __props.ui.content({ class: [__props.uiOverride?.content, props.class] })
              }, vueExports.unref(contentProps)), {
                default: vueExports.withCtx(() => [
                  vueExports.renderSlot(_ctx.$slots, "content-top"),
                  vueExports.createVNode("div", {
                    role: "presentation",
                    "data-slot": "viewport",
                    class: __props.ui.viewport({ class: __props.uiOverride?.viewport })
                  }, [
                    (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(groups.value, (group, groupIndex) => {
                      return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(DropdownMenu).Group, {
                        key: `group-${groupIndex}`,
                        "data-slot": "group",
                        class: __props.ui.group({ class: __props.uiOverride?.group })
                      }, {
                        default: vueExports.withCtx(() => [
                          (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(group, (item, index) => {
                            return vueExports.openBlock(), vueExports.createBlock(vueExports.Fragment, {
                              key: `group-${groupIndex}-${index}`
                            }, [
                              item.type === "label" ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(DropdownMenu).Label, {
                                key: 0,
                                "data-slot": "label",
                                class: __props.ui.label({ class: [__props.uiOverride?.label, item.ui?.label, item.class] })
                              }, {
                                default: vueExports.withCtx(() => [
                                  vueExports.createVNode(vueExports.unref(ReuseItemTemplate), {
                                    item,
                                    index
                                  }, null, 8, ["item", "index"])
                                ]),
                                _: 2
                              }, 1032, ["class"])) : item.type === "separator" ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(DropdownMenu).Separator, {
                                key: 1,
                                "data-slot": "separator",
                                class: __props.ui.separator({ class: [__props.uiOverride?.separator, item.ui?.separator, item.class] })
                              }, null, 8, ["class"])) : item?.children?.length ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(DropdownMenu).Sub, {
                                key: 2,
                                open: item.open,
                                "default-open": item.defaultOpen
                              }, {
                                default: vueExports.withCtx(() => [
                                  vueExports.createVNode(vueExports.unref(DropdownMenu).SubTrigger, {
                                    as: "button",
                                    type: "button",
                                    disabled: item.disabled,
                                    "text-value": vueExports.unref(get)(item, props.labelKey),
                                    "data-slot": "item",
                                    class: __props.ui.item({ class: [__props.uiOverride?.item, item.ui?.item, item.class], color: item?.color })
                                  }, {
                                    default: vueExports.withCtx(() => [
                                      vueExports.createVNode(vueExports.unref(ReuseItemTemplate), {
                                        item,
                                        index
                                      }, null, 8, ["item", "index"])
                                    ]),
                                    _: 2
                                  }, 1032, ["disabled", "text-value", "class"]),
                                  vueExports.createVNode(_sfc_main$1, vueExports.mergeProps({
                                    sub: "",
                                    class: item.ui?.content,
                                    ui: __props.ui,
                                    "ui-override": __props.uiOverride,
                                    portal: __props.portal,
                                    items: item.children,
                                    align: "start",
                                    "align-offset": -4,
                                    "side-offset": 3,
                                    "label-key": __props.labelKey,
                                    "description-key": __props.descriptionKey,
                                    "checked-icon": __props.checkedIcon,
                                    "loading-icon": __props.loadingIcon,
                                    "external-icon": __props.externalIcon
                                  }, { ref_for: true }, item.content), vueExports.createSlots({ _: 2 }, [
                                    vueExports.renderList(getProxySlots(), (_2, name) => {
                                      return {
                                        name,
                                        fn: vueExports.withCtx((slotData) => [
                                          vueExports.renderSlot(_ctx.$slots, name, vueExports.mergeProps({ ref_for: true }, slotData))
                                        ])
                                      };
                                    })
                                  ]), 1040, ["class", "ui", "ui-override", "portal", "items", "label-key", "description-key", "checked-icon", "loading-icon", "external-icon"])
                                ]),
                                _: 2
                              }, 1032, ["open", "default-open"])) : item.type === "checkbox" ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(DropdownMenu).CheckboxItem, {
                                key: 3,
                                "model-value": item.checked,
                                disabled: item.disabled,
                                "text-value": vueExports.unref(get)(item, props.labelKey),
                                "data-slot": "item",
                                class: __props.ui.item({ class: [__props.uiOverride?.item, item.ui?.item, item.class], color: item?.color }),
                                "onUpdate:modelValue": item.onUpdateChecked,
                                onSelect: item.onSelect
                              }, {
                                default: vueExports.withCtx(() => [
                                  vueExports.createVNode(vueExports.unref(ReuseItemTemplate), {
                                    item,
                                    index
                                  }, null, 8, ["item", "index"])
                                ]),
                                _: 2
                              }, 1032, ["model-value", "disabled", "text-value", "class", "onUpdate:modelValue", "onSelect"])) : (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(DropdownMenu).Item, {
                                key: 4,
                                "as-child": "",
                                disabled: item.disabled,
                                "text-value": vueExports.unref(get)(item, props.labelKey),
                                onSelect: item.onSelect
                              }, {
                                default: vueExports.withCtx(() => [
                                  vueExports.createVNode(_sfc_main$9, vueExports.mergeProps({ ref_for: true }, vueExports.unref(pickLinkProps)(item), { custom: "" }), {
                                    default: vueExports.withCtx(({ active, ...slotProps }) => [
                                      vueExports.createVNode(_sfc_main$a, vueExports.mergeProps({ ref_for: true }, slotProps, {
                                        "data-slot": "item",
                                        class: __props.ui.item({ class: [__props.uiOverride?.item, item.ui?.item, item.class], color: item?.color, active })
                                      }), {
                                        default: vueExports.withCtx(() => [
                                          vueExports.createVNode(vueExports.unref(ReuseItemTemplate), {
                                            item,
                                            active,
                                            index
                                          }, null, 8, ["item", "active", "index"])
                                        ]),
                                        _: 2
                                      }, 1040, ["class"])
                                    ]),
                                    _: 2
                                  }, 1040)
                                ]),
                                _: 2
                              }, 1032, ["disabled", "text-value", "onSelect"]))
                            ], 64);
                          }), 128))
                        ]),
                        _: 2
                      }, 1032, ["class"]);
                    }), 128))
                  ], 2),
                  vueExports.renderSlot(_ctx.$slots, "default"),
                  vueExports.renderSlot(_ctx.$slots, "content-bottom")
                ]),
                _: 3
              }, 16, ["class"]))
            ];
          }
        }),
        _: 3
      }, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = vueExports.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/@nuxt+ui@4.2.1_@babel+parser@7.28.5_axios@1.13.2_db0@0.3.4_better-sqlite3@12.5.0_drizzl_dfa8f561a9d8983c7332d596b28eea3c/node_modules/@nuxt/ui/dist/runtime/components/DropdownMenuContent.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const theme = {
  "slots": {
    "content": "min-w-32 bg-default shadow-lg rounded-md ring ring-default overflow-hidden data-[state=open]:animate-[scale-in_100ms_ease-out] data-[state=closed]:animate-[scale-out_100ms_ease-in] origin-(--reka-dropdown-menu-content-transform-origin) flex flex-col",
    "viewport": "relative divide-y divide-default scroll-py-1 overflow-y-auto flex-1",
    "arrow": "fill-default",
    "group": "p-1 isolate",
    "label": "w-full flex items-center font-semibold text-highlighted",
    "separator": "-mx-1 my-1 h-px bg-border",
    "item": "group relative w-full flex items-start select-none outline-none before:absolute before:z-[-1] before:inset-px before:rounded-md data-disabled:cursor-not-allowed data-disabled:opacity-75",
    "itemLeadingIcon": "shrink-0",
    "itemLeadingAvatar": "shrink-0",
    "itemLeadingAvatarSize": "",
    "itemTrailing": "ms-auto inline-flex gap-1.5 items-center",
    "itemTrailingIcon": "shrink-0",
    "itemTrailingKbds": "hidden lg:inline-flex items-center shrink-0",
    "itemTrailingKbdsSize": "",
    "itemWrapper": "flex-1 flex flex-col text-start min-w-0",
    "itemLabel": "truncate",
    "itemDescription": "truncate text-muted",
    "itemLabelExternalIcon": "inline-block size-3 align-top text-dimmed"
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
    "active": {
      "true": {
        "item": "text-highlighted before:bg-elevated",
        "itemLeadingIcon": "text-default"
      },
      "false": {
        "item": [
          "text-default data-highlighted:text-highlighted data-[state=open]:text-highlighted data-highlighted:before:bg-elevated/50 data-[state=open]:before:bg-elevated/50",
          "transition-colors before:transition-colors"
        ],
        "itemLeadingIcon": [
          "text-dimmed group-data-highlighted:text-default group-data-[state=open]:text-default",
          "transition-colors"
        ]
      }
    },
    "loading": {
      "true": {
        "itemLeadingIcon": "animate-spin"
      }
    },
    "size": {
      "xs": {
        "label": "p-1 text-xs gap-1",
        "item": "p-1 text-xs gap-1",
        "itemLeadingIcon": "size-4",
        "itemLeadingAvatarSize": "3xs",
        "itemTrailingIcon": "size-4",
        "itemTrailingKbds": "gap-0.5",
        "itemTrailingKbdsSize": "sm"
      },
      "sm": {
        "label": "p-1.5 text-xs gap-1.5",
        "item": "p-1.5 text-xs gap-1.5",
        "itemLeadingIcon": "size-4",
        "itemLeadingAvatarSize": "3xs",
        "itemTrailingIcon": "size-4",
        "itemTrailingKbds": "gap-0.5",
        "itemTrailingKbdsSize": "sm"
      },
      "md": {
        "label": "p-1.5 text-sm gap-1.5",
        "item": "p-1.5 text-sm gap-1.5",
        "itemLeadingIcon": "size-5",
        "itemLeadingAvatarSize": "2xs",
        "itemTrailingIcon": "size-5",
        "itemTrailingKbds": "gap-0.5",
        "itemTrailingKbdsSize": "md"
      },
      "lg": {
        "label": "p-2 text-sm gap-2",
        "item": "p-2 text-sm gap-2",
        "itemLeadingIcon": "size-5",
        "itemLeadingAvatarSize": "2xs",
        "itemTrailingIcon": "size-5",
        "itemTrailingKbds": "gap-1",
        "itemTrailingKbdsSize": "md"
      },
      "xl": {
        "label": "p-2 text-base gap-2",
        "item": "p-2 text-base gap-2",
        "itemLeadingIcon": "size-6",
        "itemLeadingAvatarSize": "xs",
        "itemTrailingIcon": "size-6",
        "itemTrailingKbds": "gap-1",
        "itemTrailingKbdsSize": "lg"
      }
    }
  },
  "compoundVariants": [
    {
      "color": "primary",
      "active": false,
      "class": {
        "item": "text-primary data-highlighted:text-primary data-highlighted:before:bg-primary/10 data-[state=open]:before:bg-primary/10",
        "itemLeadingIcon": "text-primary/75 group-data-highlighted:text-primary group-data-[state=open]:text-primary"
      }
    },
    {
      "color": "secondary",
      "active": false,
      "class": {
        "item": "text-secondary data-highlighted:text-secondary data-highlighted:before:bg-secondary/10 data-[state=open]:before:bg-secondary/10",
        "itemLeadingIcon": "text-secondary/75 group-data-highlighted:text-secondary group-data-[state=open]:text-secondary"
      }
    },
    {
      "color": "success",
      "active": false,
      "class": {
        "item": "text-success data-highlighted:text-success data-highlighted:before:bg-success/10 data-[state=open]:before:bg-success/10",
        "itemLeadingIcon": "text-success/75 group-data-highlighted:text-success group-data-[state=open]:text-success"
      }
    },
    {
      "color": "info",
      "active": false,
      "class": {
        "item": "text-info data-highlighted:text-info data-highlighted:before:bg-info/10 data-[state=open]:before:bg-info/10",
        "itemLeadingIcon": "text-info/75 group-data-highlighted:text-info group-data-[state=open]:text-info"
      }
    },
    {
      "color": "warning",
      "active": false,
      "class": {
        "item": "text-warning data-highlighted:text-warning data-highlighted:before:bg-warning/10 data-[state=open]:before:bg-warning/10",
        "itemLeadingIcon": "text-warning/75 group-data-highlighted:text-warning group-data-[state=open]:text-warning"
      }
    },
    {
      "color": "error",
      "active": false,
      "class": {
        "item": "text-error data-highlighted:text-error data-highlighted:before:bg-error/10 data-[state=open]:before:bg-error/10",
        "itemLeadingIcon": "text-error/75 group-data-highlighted:text-error group-data-[state=open]:text-error"
      }
    },
    {
      "color": "primary",
      "active": true,
      "class": {
        "item": "text-primary before:bg-primary/10",
        "itemLeadingIcon": "text-primary"
      }
    },
    {
      "color": "secondary",
      "active": true,
      "class": {
        "item": "text-secondary before:bg-secondary/10",
        "itemLeadingIcon": "text-secondary"
      }
    },
    {
      "color": "success",
      "active": true,
      "class": {
        "item": "text-success before:bg-success/10",
        "itemLeadingIcon": "text-success"
      }
    },
    {
      "color": "info",
      "active": true,
      "class": {
        "item": "text-info before:bg-info/10",
        "itemLeadingIcon": "text-info"
      }
    },
    {
      "color": "warning",
      "active": true,
      "class": {
        "item": "text-warning before:bg-warning/10",
        "itemLeadingIcon": "text-warning"
      }
    },
    {
      "color": "error",
      "active": true,
      "class": {
        "item": "text-error before:bg-error/10",
        "itemLeadingIcon": "text-error"
      }
    }
  ],
  "defaultVariants": {
    "size": "md"
  }
};
const _sfc_main = {
  __name: "UDropdownMenu",
  __ssrInlineRender: true,
  props: {
    size: { type: null, required: false },
    items: { type: null, required: false },
    checkedIcon: { type: null, required: false },
    loadingIcon: { type: null, required: false },
    externalIcon: { type: [Boolean, String], required: false, skipCheck: true, default: true },
    content: { type: Object, required: false },
    arrow: { type: [Boolean, Object], required: false },
    portal: { type: [Boolean, String], required: false, skipCheck: true, default: true },
    labelKey: { type: null, required: false, default: "label" },
    descriptionKey: { type: null, required: false, default: "description" },
    disabled: { type: Boolean, required: false },
    class: { type: null, required: false },
    ui: { type: null, required: false },
    defaultOpen: { type: Boolean, required: false },
    open: { type: Boolean, required: false },
    modal: { type: Boolean, required: false, default: true }
  },
  emits: ["update:open"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const slots = vueExports.useSlots();
    const appConfig = useAppConfig();
    const rootProps = useForwardPropsEmits(reactivePick(props, "defaultOpen", "open", "modal"), emits);
    const contentProps = vueExports.toRef(() => defu(props.content, { side: "bottom", sideOffset: 8, collisionPadding: 8 }));
    const arrowProps = vueExports.toRef(() => props.arrow);
    const getProxySlots = () => omit(slots, ["default"]);
    const ui = vueExports.computed(() => tv({ extend: tv(theme), ...appConfig.ui?.dropdownMenu || {} })({
      size: props.size
    }));
    return (_ctx, _push, _parent, _attrs) => {
      _push(serverRenderer_cjs_prodExports.ssrRenderComponent(vueExports.unref(DropdownMenuRoot_default), vueExports.mergeProps(vueExports.unref(rootProps), _attrs), {
        default: vueExports.withCtx(({ open }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (!!slots.default) {
              _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(vueExports.unref(DropdownMenuTrigger_default), {
                "as-child": "",
                class: props.class,
                disabled: __props.disabled
              }, {
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
            _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_sfc_main$1, vueExports.mergeProps({
              class: ui.value.content({ class: [!slots.default && props.class, props.ui?.content] }),
              ui: ui.value,
              "ui-override": props.ui
            }, contentProps.value, {
              items: __props.items,
              portal: __props.portal,
              "label-key": __props.labelKey,
              "description-key": __props.descriptionKey,
              "checked-icon": __props.checkedIcon,
              "loading-icon": __props.loadingIcon,
              "external-icon": __props.externalIcon
            }), vueExports.createSlots({
              default: vueExports.withCtx((_, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (!!__props.arrow) {
                    _push3(serverRenderer_cjs_prodExports.ssrRenderComponent(vueExports.unref(DropdownMenuArrow_default), vueExports.mergeProps(arrowProps.value, {
                      "data-slot": "arrow",
                      class: ui.value.arrow({ class: props.ui?.arrow })
                    }), null, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                } else {
                  return [
                    !!__props.arrow ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(DropdownMenuArrow_default), vueExports.mergeProps({ key: 0 }, arrowProps.value, {
                      "data-slot": "arrow",
                      class: ui.value.arrow({ class: props.ui?.arrow })
                    }), null, 16, ["class"])) : vueExports.createCommentVNode("", true)
                  ];
                }
              }),
              _: 2
            }, [
              vueExports.renderList(getProxySlots(), (_, name) => {
                return {
                  name,
                  fn: vueExports.withCtx((slotData, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      serverRenderer_cjs_prodExports.ssrRenderSlot(_ctx.$slots, name, slotData, null, _push3, _parent3, _scopeId2);
                    } else {
                      return [
                        vueExports.renderSlot(_ctx.$slots, name, slotData)
                      ];
                    }
                  })
                };
              })
            ]), _parent2, _scopeId));
          } else {
            return [
              !!slots.default ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(DropdownMenuTrigger_default), {
                key: 0,
                "as-child": "",
                class: props.class,
                disabled: __props.disabled
              }, {
                default: vueExports.withCtx(() => [
                  vueExports.renderSlot(_ctx.$slots, "default", { open })
                ]),
                _: 2
              }, 1032, ["class", "disabled"])) : vueExports.createCommentVNode("", true),
              vueExports.createVNode(_sfc_main$1, vueExports.mergeProps({
                class: ui.value.content({ class: [!slots.default && props.class, props.ui?.content] }),
                ui: ui.value,
                "ui-override": props.ui
              }, contentProps.value, {
                items: __props.items,
                portal: __props.portal,
                "label-key": __props.labelKey,
                "description-key": __props.descriptionKey,
                "checked-icon": __props.checkedIcon,
                "loading-icon": __props.loadingIcon,
                "external-icon": __props.externalIcon
              }), vueExports.createSlots({
                default: vueExports.withCtx(() => [
                  !!__props.arrow ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(DropdownMenuArrow_default), vueExports.mergeProps({ key: 0 }, arrowProps.value, {
                    "data-slot": "arrow",
                    class: ui.value.arrow({ class: props.ui?.arrow })
                  }), null, 16, ["class"])) : vueExports.createCommentVNode("", true)
                ]),
                _: 2
              }, [
                vueExports.renderList(getProxySlots(), (_, name) => {
                  return {
                    name,
                    fn: vueExports.withCtx((slotData) => [
                      vueExports.renderSlot(_ctx.$slots, name, slotData)
                    ])
                  };
                })
              ]), 1040, ["class", "ui", "ui-override", "items", "portal", "label-key", "description-key", "checked-icon", "loading-icon", "external-icon"])
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = vueExports.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/@nuxt+ui@4.2.1_@babel+parser@7.28.5_axios@1.13.2_db0@0.3.4_better-sqlite3@12.5.0_drizzl_dfa8f561a9d8983c7332d596b28eea3c/node_modules/@nuxt/ui/dist/runtime/components/DropdownMenu.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
//# sourceMappingURL=DropdownMenu-D_kNtRd4.mjs.map
