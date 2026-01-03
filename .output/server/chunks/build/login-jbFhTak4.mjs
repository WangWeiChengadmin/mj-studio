import { v as vueExports, g as useToast, s as serverRenderer_cjs_prodExports, j as __nuxt_component_0, n as navigateTo } from './server.mjs';
import { u as useAuth } from './useAuth-xXrD8D6Y.mjs';
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

const _sfc_main = /* @__PURE__ */ vueExports.defineComponent({
  __name: "login",
  __ssrInlineRender: true,
  setup(__props) {
    const { login } = useAuth();
    const toast = useToast();
    const isLogin = vueExports.ref(true);
    const isLoading = vueExports.ref(false);
    const form = vueExports.reactive({
      email: "",
      password: "",
      name: ""
    });
    async function handleSubmit() {
      if (!form.email || !form.password) {
        toast.add({ title: "请填写邮箱和密码", color: "error" });
        return;
      }
      isLoading.value = true;
      try {
        const endpoint = isLogin.value ? "/api/auth/login" : "/api/auth/register";
        const body = isLogin.value ? { email: form.email, password: form.password } : { email: form.email, password: form.password, name: form.name };
        const result = await $fetch(endpoint, {
          method: "POST",
          body
        });
        login(result.token, result.user);
        toast.add({
          title: isLogin.value ? "登录成功" : "注册成功",
          color: "success"
        });
        await navigateTo("/");
      } catch (error) {
        toast.add({
          title: isLogin.value ? "登录失败" : "注册失败",
          description: error.data?.message || error.message,
          color: "error"
        });
      } finally {
        isLoading.value = false;
      }
    }
    function toggleMode() {
      isLogin.value = !isLogin.value;
      form.name = "";
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UApp = __nuxt_component_0;
      _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UApp, _attrs, {
        default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="min-h-screen bg-(--ui-bg) flex items-center justify-center p-6"${_scopeId}><div class="w-full max-w-sm"${_scopeId}><div class="text-center mb-8"${_scopeId}><h1 class="text-4xl font-bold text-(--ui-text) mb-2"${_scopeId}><span class="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"${_scopeId}> MJ Studio </span></h1><p class="text-(--ui-text-muted)"${_scopeId}>多模型 AI 绘图工作台</p></div><div class="bg-(--ui-bg-elevated) backdrop-blur-sm rounded-lg p-8 border border-(--ui-border) shadow-2xl"${_scopeId}><h2 class="text-xl font-semibold text-(--ui-text) mb-6 text-center"${_scopeId}>${serverRenderer_cjs_prodExports.ssrInterpolate(vueExports.unref(isLogin) ? "登录账号" : "注册账号")}</h2><form class="space-y-5"${_scopeId}>`);
            if (!vueExports.unref(isLogin)) {
              _push2(`<div${_scopeId}><label class="block text-(--ui-text-toned) text-sm mb-2 font-medium"${_scopeId}>昵称</label><input${serverRenderer_cjs_prodExports.ssrRenderAttr("value", vueExports.unref(form).name)} type="text" placeholder="输入昵称（可选）" class="w-full px-4 py-3 rounded-lg bg-(--ui-bg-muted) border border-(--ui-border) text-(--ui-text) placeholder-(--ui-text-dimmed) focus:outline-none focus:border-(--ui-primary) focus:ring-1 focus:ring-(--ui-primary) transition-colors"${_scopeId}></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div${_scopeId}><label class="block text-(--ui-text-toned) text-sm mb-2 font-medium"${_scopeId}>邮箱</label><input${serverRenderer_cjs_prodExports.ssrRenderAttr("value", vueExports.unref(form).email)} type="email" placeholder="输入邮箱" class="w-full px-4 py-3 rounded-lg bg-(--ui-bg-muted) border border-(--ui-border) text-(--ui-text) placeholder-(--ui-text-dimmed) focus:outline-none focus:border-(--ui-primary) focus:ring-1 focus:ring-(--ui-primary) transition-colors"${_scopeId}></div><div${_scopeId}><label class="block text-(--ui-text-toned) text-sm mb-2 font-medium"${_scopeId}>密码</label><input${serverRenderer_cjs_prodExports.ssrRenderAttr("value", vueExports.unref(form).password)} type="password" placeholder="输入密码" class="w-full px-4 py-3 rounded-lg bg-(--ui-bg-muted) border border-(--ui-border) text-(--ui-text) placeholder-(--ui-text-dimmed) focus:outline-none focus:border-(--ui-primary) focus:ring-1 focus:ring-(--ui-primary) transition-colors"${_scopeId}></div><button type="submit"${serverRenderer_cjs_prodExports.ssrIncludeBooleanAttr(vueExports.unref(isLoading)) ? " disabled" : ""} class="w-full py-3 px-4 rounded-lg font-medium text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed mt-2"${_scopeId}>`);
            if (vueExports.unref(isLoading)) {
              _push2(`<span class="flex items-center justify-center gap-2"${_scopeId}><svg class="animate-spin h-5 w-5" viewBox="0 0 24 24"${_scopeId}><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"${_scopeId}></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"${_scopeId}></path></svg> 处理中... </span>`);
            } else {
              _push2(`<span${_scopeId}>${serverRenderer_cjs_prodExports.ssrInterpolate(vueExports.unref(isLogin) ? "登录" : "注册")}</span>`);
            }
            _push2(`</button></form><div class="mt-6 text-center"${_scopeId}><span class="text-(--ui-text-dimmed) text-sm"${_scopeId}>${serverRenderer_cjs_prodExports.ssrInterpolate(vueExports.unref(isLogin) ? "还没有账号？" : "已有账号？")}</span><button type="button" class="text-(--ui-primary) hover:opacity-80 text-sm ml-1 font-medium"${_scopeId}>${serverRenderer_cjs_prodExports.ssrInterpolate(vueExports.unref(isLogin) ? "立即注册" : "立即登录")}</button></div></div></div></div>`);
          } else {
            return [
              vueExports.createVNode("div", { class: "min-h-screen bg-(--ui-bg) flex items-center justify-center p-6" }, [
                vueExports.createVNode("div", { class: "w-full max-w-sm" }, [
                  vueExports.createVNode("div", { class: "text-center mb-8" }, [
                    vueExports.createVNode("h1", { class: "text-4xl font-bold text-(--ui-text) mb-2" }, [
                      vueExports.createVNode("span", { class: "bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent" }, " MJ Studio ")
                    ]),
                    vueExports.createVNode("p", { class: "text-(--ui-text-muted)" }, "多模型 AI 绘图工作台")
                  ]),
                  vueExports.createVNode("div", { class: "bg-(--ui-bg-elevated) backdrop-blur-sm rounded-lg p-8 border border-(--ui-border) shadow-2xl" }, [
                    vueExports.createVNode("h2", { class: "text-xl font-semibold text-(--ui-text) mb-6 text-center" }, vueExports.toDisplayString(vueExports.unref(isLogin) ? "登录账号" : "注册账号"), 1),
                    vueExports.createVNode("form", {
                      onSubmit: vueExports.withModifiers(handleSubmit, ["prevent"]),
                      class: "space-y-5"
                    }, [
                      !vueExports.unref(isLogin) ? (vueExports.openBlock(), vueExports.createBlock("div", { key: 0 }, [
                        vueExports.createVNode("label", { class: "block text-(--ui-text-toned) text-sm mb-2 font-medium" }, "昵称"),
                        vueExports.withDirectives(vueExports.createVNode("input", {
                          "onUpdate:modelValue": ($event) => vueExports.unref(form).name = $event,
                          type: "text",
                          placeholder: "输入昵称（可选）",
                          class: "w-full px-4 py-3 rounded-lg bg-(--ui-bg-muted) border border-(--ui-border) text-(--ui-text) placeholder-(--ui-text-dimmed) focus:outline-none focus:border-(--ui-primary) focus:ring-1 focus:ring-(--ui-primary) transition-colors"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vueExports.vModelText, vueExports.unref(form).name]
                        ])
                      ])) : vueExports.createCommentVNode("", true),
                      vueExports.createVNode("div", null, [
                        vueExports.createVNode("label", { class: "block text-(--ui-text-toned) text-sm mb-2 font-medium" }, "邮箱"),
                        vueExports.withDirectives(vueExports.createVNode("input", {
                          "onUpdate:modelValue": ($event) => vueExports.unref(form).email = $event,
                          type: "email",
                          placeholder: "输入邮箱",
                          class: "w-full px-4 py-3 rounded-lg bg-(--ui-bg-muted) border border-(--ui-border) text-(--ui-text) placeholder-(--ui-text-dimmed) focus:outline-none focus:border-(--ui-primary) focus:ring-1 focus:ring-(--ui-primary) transition-colors"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vueExports.vModelText, vueExports.unref(form).email]
                        ])
                      ]),
                      vueExports.createVNode("div", null, [
                        vueExports.createVNode("label", { class: "block text-(--ui-text-toned) text-sm mb-2 font-medium" }, "密码"),
                        vueExports.withDirectives(vueExports.createVNode("input", {
                          "onUpdate:modelValue": ($event) => vueExports.unref(form).password = $event,
                          type: "password",
                          placeholder: "输入密码",
                          class: "w-full px-4 py-3 rounded-lg bg-(--ui-bg-muted) border border-(--ui-border) text-(--ui-text) placeholder-(--ui-text-dimmed) focus:outline-none focus:border-(--ui-primary) focus:ring-1 focus:ring-(--ui-primary) transition-colors"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vueExports.vModelText, vueExports.unref(form).password]
                        ])
                      ]),
                      vueExports.createVNode("button", {
                        type: "submit",
                        disabled: vueExports.unref(isLoading),
                        class: "w-full py-3 px-4 rounded-lg font-medium text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                      }, [
                        vueExports.unref(isLoading) ? (vueExports.openBlock(), vueExports.createBlock("span", {
                          key: 0,
                          class: "flex items-center justify-center gap-2"
                        }, [
                          (vueExports.openBlock(), vueExports.createBlock("svg", {
                            class: "animate-spin h-5 w-5",
                            viewBox: "0 0 24 24"
                          }, [
                            vueExports.createVNode("circle", {
                              class: "opacity-25",
                              cx: "12",
                              cy: "12",
                              r: "10",
                              stroke: "currentColor",
                              "stroke-width": "4",
                              fill: "none"
                            }),
                            vueExports.createVNode("path", {
                              class: "opacity-75",
                              fill: "currentColor",
                              d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            })
                          ])),
                          vueExports.createTextVNode(" 处理中... ")
                        ])) : (vueExports.openBlock(), vueExports.createBlock("span", { key: 1 }, vueExports.toDisplayString(vueExports.unref(isLogin) ? "登录" : "注册"), 1))
                      ], 8, ["disabled"])
                    ], 32),
                    vueExports.createVNode("div", { class: "mt-6 text-center" }, [
                      vueExports.createVNode("span", { class: "text-(--ui-text-dimmed) text-sm" }, vueExports.toDisplayString(vueExports.unref(isLogin) ? "还没有账号？" : "已有账号？"), 1),
                      vueExports.createVNode("button", {
                        type: "button",
                        class: "text-(--ui-primary) hover:opacity-80 text-sm ml-1 font-medium",
                        onClick: toggleMode
                      }, vueExports.toDisplayString(vueExports.unref(isLogin) ? "立即注册" : "立即登录"), 1)
                    ])
                  ])
                ])
              ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/login.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=login-jbFhTak4.mjs.map
