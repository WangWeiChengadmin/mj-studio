import { v as vueExports, s as serverRenderer_cjs_prodExports, h as useRouter, i as useRoute$1, a as __nuxt_component_0$1, A as __nuxt_component_1$1, y as useLocale, e as useAppConfig, w as useForwardProps, J as reactiveOmit, c as _sfc_main$8, b as _sfc_main$d, d as useState } from './server.mjs';
import { N as publicAssetsURL } from '../nitro/nitro.mjs';
import { u as useAuth } from './useAuth-xXrD8D6Y.mjs';
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

const useColorMode = () => {
  return useState("color-mode").value;
};
const _sfc_main$2 = /* @__PURE__ */ Object.assign({ inheritAttrs: false }, {
  __name: "UColorModeButton",
  __ssrInlineRender: true,
  props: {
    color: { type: null, required: false, default: "neutral" },
    variant: { type: null, required: false, default: "ghost" },
    label: { type: String, required: false },
    activeColor: { type: null, required: false },
    activeVariant: { type: null, required: false },
    size: { type: null, required: false },
    square: { type: Boolean, required: false },
    block: { type: Boolean, required: false },
    loadingAuto: { type: Boolean, required: false },
    onClick: { type: [Function, Array], required: false },
    class: { type: null, required: false },
    ui: { type: null, required: false },
    icon: { type: null, required: false },
    avatar: { type: Object, required: false },
    leading: { type: Boolean, required: false },
    leadingIcon: { type: null, required: false },
    trailing: { type: Boolean, required: false },
    trailingIcon: { type: null, required: false },
    loading: { type: Boolean, required: false },
    loadingIcon: { type: null, required: false },
    as: { type: null, required: false },
    type: { type: null, required: false },
    disabled: { type: Boolean, required: false },
    active: { type: Boolean, required: false },
    exact: { type: Boolean, required: false },
    exactQuery: { type: [Boolean, String], required: false },
    exactHash: { type: Boolean, required: false },
    inactiveClass: { type: String, required: false },
    to: { type: null, required: false },
    href: { type: null, required: false },
    external: { type: Boolean, required: false },
    target: { type: [String, Object, null], required: false },
    rel: { type: [String, Object, null], required: false },
    noRel: { type: Boolean, required: false },
    prefetchedClass: { type: String, required: false },
    prefetch: { type: Boolean, required: false },
    prefetchOn: { type: [String, Object], required: false },
    noPrefetch: { type: Boolean, required: false },
    trailingSlash: { type: String, required: false },
    activeClass: { type: String, required: false },
    exactActiveClass: { type: String, required: false },
    ariaCurrentValue: { type: String, required: false },
    viewTransition: { type: Boolean, required: false },
    replace: { type: Boolean, required: false }
  },
  setup(__props) {
    const props = __props;
    const { t } = useLocale();
    const colorMode = useColorMode();
    const appConfig = useAppConfig();
    const buttonProps = useForwardProps(reactiveOmit(props, "icon"));
    const isDark = vueExports.computed({
      get() {
        return colorMode.value === "dark";
      },
      set(_isDark) {
        colorMode.preference = _isDark ? "dark" : "light";
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_sfc_main$8, vueExports.mergeProps({
        ...vueExports.unref(buttonProps),
        "aria-label": isDark.value ? vueExports.unref(t)("colorMode.switchToLight") : vueExports.unref(t)("colorMode.switchToDark"),
        ..._ctx.$attrs
      }, {
        onClick: ($event) => isDark.value = !isDark.value
      }, _attrs), {
        leading: vueExports.withCtx(({ ui }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_sfc_main$d, {
              class: [ui.leadingIcon({ class: props.ui?.leadingIcon }), "hidden dark:inline"],
              name: vueExports.unref(appConfig).ui.icons.dark
            }, null, _parent2, _scopeId));
            _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_sfc_main$d, {
              class: [ui.leadingIcon({ class: props.ui?.leadingIcon }), "inline dark:hidden"],
              name: vueExports.unref(appConfig).ui.icons.light
            }, null, _parent2, _scopeId));
          } else {
            return [
              vueExports.createVNode(_sfc_main$d, {
                class: [ui.leadingIcon({ class: props.ui?.leadingIcon }), "hidden dark:inline"],
                name: vueExports.unref(appConfig).ui.icons.dark
              }, null, 8, ["class", "name"]),
              vueExports.createVNode(_sfc_main$d, {
                class: [ui.leadingIcon({ class: props.ui?.leadingIcon }), "inline dark:hidden"],
                name: vueExports.unref(appConfig).ui.icons.light
              }, null, 8, ["class", "name"])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = vueExports.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/@nuxt+ui@4.2.1_@babel+parser@7.28.5_axios@1.13.2_db0@0.3.4_better-sqlite3@12.5.0_drizzl_dfa8f561a9d8983c7332d596b28eea3c/node_modules/@nuxt/ui/dist/runtime/components/color-mode/ColorModeButton.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _imports_0 = publicAssetsURL("/logo.png");
const _sfc_main$1 = /* @__PURE__ */ vueExports.defineComponent({
  __name: "AppHeader",
  __ssrInlineRender: true,
  props: {
    showNav: { type: Boolean, default: true }
  },
  setup(__props) {
    const { user, loggedIn, logout } = useAuth();
    const router = useRouter();
    useRoute$1();
    const userProfile = vueExports.ref(null);
    async function loadUserProfile() {
      if (!loggedIn.value) return;
      try {
        userProfile.value = await $fetch("/api/user");
      } catch {
      }
    }
    vueExports.watch(loggedIn, (val) => {
      if (val) loadUserProfile();
      else userProfile.value = null;
    }, { immediate: true });
    vueExports.watch(user, (val) => {
      if (val && userProfile.value) {
        userProfile.value = {
          ...userProfile.value,
          name: val.name,
          avatar: val.avatar
        };
      }
    }, { deep: true });
    vueExports.computed(() => [
      { label: userProfile.value?.name || user.value?.name || user.value?.email || "用户", disabled: true },
      { type: "separator" },
      { label: "用户设置", icon: "i-heroicons-user", to: "/user" },
      { type: "separator" },
      { label: "退出登录", icon: "i-heroicons-arrow-right-on-rectangle", onSelect: handleLogout }
    ]);
    function handleLogout() {
      logout();
      router.push("/login");
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      const _component_ClientOnly = __nuxt_component_1$1;
      const _component_UColorModeButton = _sfc_main$2;
      _push(`<header${serverRenderer_cjs_prodExports.ssrRenderAttrs(vueExports.mergeProps({ class: "border-b border-(--ui-border) bg-(--ui-bg-elevated) flex-shrink-0" }, _attrs))}><div class="px-4 h-14 flex items-center justify-between">`);
      _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "flex items-center gap-2"
      }, {
        default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<img${serverRenderer_cjs_prodExports.ssrRenderAttr("src", _imports_0)} alt="MJ Studio" class="w-7 h-7"${_scopeId}><span class="font-bold text-lg"${_scopeId}>MJ Studio</span>`);
          } else {
            return [
              vueExports.createVNode("img", {
                src: _imports_0,
                alt: "MJ Studio",
                class: "w-7 h-7"
              }),
              vueExports.createVNode("span", { class: "font-bold text-lg" }, "MJ Studio")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="flex items-center gap-2">`);
      _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_ClientOnly, null, {}, _parent));
      _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UColorModeButton, null, null, _parent));
      _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_ClientOnly, null, {
        fallback: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="w-7 h-7"${_scopeId}></div>`);
          } else {
            return [
              vueExports.createVNode("div", { class: "w-7 h-7" })
            ];
          }
        })
      }, _parent));
      _push(`</div></div></header>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = vueExports.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/AppHeader.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_0 = Object.assign(_sfc_main$1, { __name: "AppHeader" });
const _sfc_main = /* @__PURE__ */ vueExports.defineComponent({
  __name: "default",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AppHeader = __nuxt_component_0;
      _push(`<div${serverRenderer_cjs_prodExports.ssrRenderAttrs(vueExports.mergeProps({ class: "min-h-screen bg-(--ui-bg) flex flex-col" }, _attrs))}>`);
      _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_AppHeader, { class: "h-14 flex-shrink-0" }, null, _parent));
      _push(`<main class="flex-1">`);
      serverRenderer_cjs_prodExports.ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</main></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = vueExports.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=default-DQdBMuZV.mjs.map
