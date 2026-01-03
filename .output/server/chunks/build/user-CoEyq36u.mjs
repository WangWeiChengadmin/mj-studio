import { v as vueExports, g as useToast, s as serverRenderer_cjs_prodExports, b as _sfc_main$d, c as _sfc_main$8, n as navigateTo } from './server.mjs';
import { _ as _sfc_main$1 } from './FormField-CGip9Bav.mjs';
import { _ as _sfc_main$2 } from './Input-A_WPZx9s.mjs';
import { _ as _sfc_main$3 } from './Modal-DTUEXzQH.mjs';
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
import './Label-CV5OSAkM.mjs';
import './index--6aaawBa.mjs';
import './DialogTrigger-DZAnfNyf.mjs';
import './utils-DCnNb5Bf.mjs';

const _sfc_main = /* @__PURE__ */ vueExports.defineComponent({
  __name: "user",
  __ssrInlineRender: true,
  setup(__props) {
    const { updateUser } = useAuth();
    const toast = useToast();
    const isLoading = vueExports.ref(true);
    const isSaving = vueExports.ref(false);
    const currentEmail = vueExports.ref("");
    const formData = vueExports.reactive({
      name: "",
      avatar: ""
    });
    const passwordForm = vueExports.reactive({
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    });
    const isChangingPassword = vueExports.ref(false);
    const emailForm = vueExports.reactive({
      newEmail: "",
      password: ""
    });
    const isChangingEmail = vueExports.ref(false);
    async function handleAvatarUpload(e) {
      const target = e.target;
      const file = target.files?.[0];
      if (!file) return;
      if (file.size > 2 * 1024 * 1024) {
        toast.add({ title: "图片大小不能超过 2MB", color: "error" });
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        formData.avatar = reader.result;
      };
      reader.readAsDataURL(file);
    }
    function clearAvatar() {
      formData.avatar = "";
    }
    async function saveProfile() {
      isSaving.value = true;
      try {
        await $fetch("/api/user", {
          method: "PUT",
          body: {
            name: formData.name?.trim() || null,
            avatar: formData.avatar || null
          }
        });
        updateUser({
          name: formData.name?.trim() || null,
          avatar: formData.avatar || null
        });
        toast.add({ title: "个人信息已保存", color: "success" });
      } catch (error) {
        toast.add({
          title: "保存失败",
          description: error.data?.message || error.message,
          color: "error"
        });
      } finally {
        isSaving.value = false;
      }
    }
    async function changePassword() {
      if (!passwordForm.currentPassword || !passwordForm.newPassword) {
        toast.add({ title: "请填写当前密码和新密码", color: "error" });
        return;
      }
      if (passwordForm.newPassword.length < 6) {
        toast.add({ title: "新密码长度不能少于6位", color: "error" });
        return;
      }
      if (passwordForm.newPassword !== passwordForm.confirmPassword) {
        toast.add({ title: "两次输入的新密码不一致", color: "error" });
        return;
      }
      isChangingPassword.value = true;
      try {
        await $fetch("/api/user/password", {
          method: "PUT",
          body: {
            currentPassword: passwordForm.currentPassword,
            newPassword: passwordForm.newPassword
          }
        });
        toast.add({ title: "密码修改成功", color: "success" });
        passwordForm.currentPassword = "";
        passwordForm.newPassword = "";
        passwordForm.confirmPassword = "";
      } catch (error) {
        toast.add({ title: "修改失败", description: error.data?.message || error.message, color: "error" });
      } finally {
        isChangingPassword.value = false;
      }
    }
    async function changeEmail() {
      if (!emailForm.newEmail || !emailForm.password) {
        toast.add({ title: "请填写新邮箱和密码", color: "error" });
        return;
      }
      isChangingEmail.value = true;
      try {
        const result = await $fetch("/api/user/email", {
          method: "PUT",
          body: {
            newEmail: emailForm.newEmail,
            password: emailForm.password
          }
        });
        updateUser({ email: result.email });
        currentEmail.value = result.email;
        toast.add({ title: "邮箱修改成功", color: "success" });
        emailForm.newEmail = "";
        emailForm.password = "";
      } catch (error) {
        toast.add({ title: "修改失败", description: error.data?.message || error.message, color: "error" });
      } finally {
        isChangingEmail.value = false;
      }
    }
    const deleteAccountForm = vueExports.reactive({
      password: ""
    });
    const isDeletingAccount = vueExports.ref(false);
    const showDeleteConfirm = vueExports.ref(false);
    async function deleteAccount() {
      if (!deleteAccountForm.password) {
        toast.add({ title: "请输入密码确认删除", color: "error" });
        return;
      }
      isDeletingAccount.value = true;
      try {
        await $fetch("/api/user/delete", {
          method: "POST",
          body: {
            password: deleteAccountForm.password
          }
        });
        toast.add({ title: "账号已删除", color: "success" });
        showDeleteConfirm.value = false;
        const { logout } = useAuth();
        logout();
        navigateTo("/login");
      } catch (error) {
        toast.add({ title: "删除失败", description: error.data?.message || error.message, color: "error" });
      } finally {
        isDeletingAccount.value = false;
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = _sfc_main$d;
      const _component_UFormField = _sfc_main$1;
      const _component_UInput = _sfc_main$2;
      const _component_UButton = _sfc_main$8;
      const _component_UModal = _sfc_main$3;
      _push(`<div${serverRenderer_cjs_prodExports.ssrRenderAttrs(vueExports.mergeProps({ class: "p-6" }, _attrs))}><div class="max-w-2xl mx-auto"><div class="mb-6"><h1 class="text-2xl font-bold text-(--ui-text)">用户设置</h1><p class="text-(--ui-text-muted) text-sm mt-1">管理你的个人信息和偏好设置</p></div>`);
      if (vueExports.unref(isLoading)) {
        _push(`<div class="text-center py-12">`);
        _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-arrow-path",
          class: "w-8 h-8 text-(--ui-text-dimmed) animate-spin"
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (!vueExports.unref(isLoading)) {
        _push(`<div class="space-y-6"><div class="bg-(--ui-bg-elevated) rounded-lg p-6 border border-(--ui-border) space-y-5"><h2 class="text-lg font-medium text-(--ui-text)">个人信息</h2>`);
        _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UFormField, {
          label: "头像",
          name: "avatar"
        }, {
          default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="flex items-center gap-4"${_scopeId}><div class="relative w-20 h-20 rounded-full overflow-hidden group"${_scopeId}>`);
              if (vueExports.unref(formData).avatar) {
                _push2(`<img${serverRenderer_cjs_prodExports.ssrRenderAttr("src", vueExports.unref(formData).avatar)} class="w-full h-full object-cover"${_scopeId}>`);
              } else {
                _push2(`<label class="w-full h-full border-2 border-dashed border-(--ui-border-accented) hover:border-(--ui-primary) transition-colors flex flex-col items-center justify-center cursor-pointer rounded-full bg-(--ui-bg-muted)"${_scopeId}>`);
                _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UIcon, {
                  name: "i-heroicons-user",
                  class: "w-8 h-8 text-(--ui-text-dimmed)"
                }, null, _parent2, _scopeId));
                _push2(`<input type="file" accept="image/*" class="hidden"${_scopeId}></label>`);
              }
              if (vueExports.unref(formData).avatar) {
                _push2(`<button type="button" class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-full"${_scopeId}>`);
                _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UIcon, {
                  name: "i-heroicons-x-mark",
                  class: "w-6 h-6 text-white"
                }, null, _parent2, _scopeId));
                _push2(`</button>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><div class="text-sm text-(--ui-text-muted)"${_scopeId}><p${_scopeId}>点击上传头像</p><p class="text-xs"${_scopeId}>支持 JPG、PNG，最大 2MB</p></div></div>`);
            } else {
              return [
                vueExports.createVNode("div", { class: "flex items-center gap-4" }, [
                  vueExports.createVNode("div", { class: "relative w-20 h-20 rounded-full overflow-hidden group" }, [
                    vueExports.unref(formData).avatar ? (vueExports.openBlock(), vueExports.createBlock("img", {
                      key: 0,
                      src: vueExports.unref(formData).avatar,
                      class: "w-full h-full object-cover"
                    }, null, 8, ["src"])) : (vueExports.openBlock(), vueExports.createBlock("label", {
                      key: 1,
                      class: "w-full h-full border-2 border-dashed border-(--ui-border-accented) hover:border-(--ui-primary) transition-colors flex flex-col items-center justify-center cursor-pointer rounded-full bg-(--ui-bg-muted)"
                    }, [
                      vueExports.createVNode(_component_UIcon, {
                        name: "i-heroicons-user",
                        class: "w-8 h-8 text-(--ui-text-dimmed)"
                      }),
                      vueExports.createVNode("input", {
                        type: "file",
                        accept: "image/*",
                        class: "hidden",
                        onChange: handleAvatarUpload
                      }, null, 32)
                    ])),
                    vueExports.unref(formData).avatar ? (vueExports.openBlock(), vueExports.createBlock("button", {
                      key: 2,
                      type: "button",
                      class: "absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-full",
                      onClick: clearAvatar
                    }, [
                      vueExports.createVNode(_component_UIcon, {
                        name: "i-heroicons-x-mark",
                        class: "w-6 h-6 text-white"
                      })
                    ])) : vueExports.createCommentVNode("", true)
                  ]),
                  vueExports.createVNode("div", { class: "text-sm text-(--ui-text-muted)" }, [
                    vueExports.createVNode("p", null, "点击上传头像"),
                    vueExports.createVNode("p", { class: "text-xs" }, "支持 JPG、PNG，最大 2MB")
                  ])
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UFormField, {
          label: "昵称",
          name: "name"
        }, {
          default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UInput, {
                modelValue: vueExports.unref(formData).name,
                "onUpdate:modelValue": ($event) => vueExports.unref(formData).name = $event,
                placeholder: "输入你的昵称",
                class: "w-full max-w-xs"
              }, null, _parent2, _scopeId));
            } else {
              return [
                vueExports.createVNode(_component_UInput, {
                  modelValue: vueExports.unref(formData).name,
                  "onUpdate:modelValue": ($event) => vueExports.unref(formData).name = $event,
                  placeholder: "输入你的昵称",
                  class: "w-full max-w-xs"
                }, null, 8, ["modelValue", "onUpdate:modelValue"])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<div class="flex justify-end">`);
        _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UButton, {
          loading: vueExports.unref(isSaving),
          onClick: saveProfile
        }, {
          default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` 保存 `);
            } else {
              return [
                vueExports.createTextVNode(" 保存 ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div><div class="bg-(--ui-bg-elevated) rounded-lg p-6 border border-(--ui-border) space-y-5"><h2 class="text-lg font-medium text-(--ui-text)">修改邮箱</h2><p class="text-sm text-(--ui-text-muted)">当前邮箱：${serverRenderer_cjs_prodExports.ssrInterpolate(vueExports.unref(currentEmail))}</p>`);
        _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UFormField, {
          label: "新邮箱",
          name: "newEmail"
        }, {
          default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UInput, {
                modelValue: vueExports.unref(emailForm).newEmail,
                "onUpdate:modelValue": ($event) => vueExports.unref(emailForm).newEmail = $event,
                type: "email",
                placeholder: "输入新邮箱地址",
                class: "w-full max-w-xs"
              }, null, _parent2, _scopeId));
            } else {
              return [
                vueExports.createVNode(_component_UInput, {
                  modelValue: vueExports.unref(emailForm).newEmail,
                  "onUpdate:modelValue": ($event) => vueExports.unref(emailForm).newEmail = $event,
                  type: "email",
                  placeholder: "输入新邮箱地址",
                  class: "w-full max-w-xs"
                }, null, 8, ["modelValue", "onUpdate:modelValue"])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UFormField, {
          label: "确认密码",
          name: "emailPassword"
        }, {
          default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UInput, {
                modelValue: vueExports.unref(emailForm).password,
                "onUpdate:modelValue": ($event) => vueExports.unref(emailForm).password = $event,
                type: "password",
                placeholder: "输入当前密码以确认身份",
                class: "w-full max-w-xs"
              }, null, _parent2, _scopeId));
            } else {
              return [
                vueExports.createVNode(_component_UInput, {
                  modelValue: vueExports.unref(emailForm).password,
                  "onUpdate:modelValue": ($event) => vueExports.unref(emailForm).password = $event,
                  type: "password",
                  placeholder: "输入当前密码以确认身份",
                  class: "w-full max-w-xs"
                }, null, 8, ["modelValue", "onUpdate:modelValue"])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<div class="flex justify-end">`);
        _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UButton, {
          loading: vueExports.unref(isChangingEmail),
          onClick: changeEmail
        }, {
          default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` 修改邮箱 `);
            } else {
              return [
                vueExports.createTextVNode(" 修改邮箱 ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div><div class="bg-(--ui-bg-elevated) rounded-lg p-6 border border-(--ui-border) space-y-5"><h2 class="text-lg font-medium text-(--ui-text)">修改密码</h2>`);
        _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UFormField, {
          label: "当前密码",
          name: "currentPassword"
        }, {
          default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UInput, {
                modelValue: vueExports.unref(passwordForm).currentPassword,
                "onUpdate:modelValue": ($event) => vueExports.unref(passwordForm).currentPassword = $event,
                type: "password",
                placeholder: "输入当前密码",
                class: "w-full max-w-xs"
              }, null, _parent2, _scopeId));
            } else {
              return [
                vueExports.createVNode(_component_UInput, {
                  modelValue: vueExports.unref(passwordForm).currentPassword,
                  "onUpdate:modelValue": ($event) => vueExports.unref(passwordForm).currentPassword = $event,
                  type: "password",
                  placeholder: "输入当前密码",
                  class: "w-full max-w-xs"
                }, null, 8, ["modelValue", "onUpdate:modelValue"])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UFormField, {
          label: "新密码",
          name: "newPassword"
        }, {
          default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UInput, {
                modelValue: vueExports.unref(passwordForm).newPassword,
                "onUpdate:modelValue": ($event) => vueExports.unref(passwordForm).newPassword = $event,
                type: "password",
                placeholder: "输入新密码（至少6位）",
                class: "w-full max-w-xs"
              }, null, _parent2, _scopeId));
            } else {
              return [
                vueExports.createVNode(_component_UInput, {
                  modelValue: vueExports.unref(passwordForm).newPassword,
                  "onUpdate:modelValue": ($event) => vueExports.unref(passwordForm).newPassword = $event,
                  type: "password",
                  placeholder: "输入新密码（至少6位）",
                  class: "w-full max-w-xs"
                }, null, 8, ["modelValue", "onUpdate:modelValue"])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UFormField, {
          label: "确认新密码",
          name: "confirmPassword"
        }, {
          default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UInput, {
                modelValue: vueExports.unref(passwordForm).confirmPassword,
                "onUpdate:modelValue": ($event) => vueExports.unref(passwordForm).confirmPassword = $event,
                type: "password",
                placeholder: "再次输入新密码",
                class: "w-full max-w-xs"
              }, null, _parent2, _scopeId));
            } else {
              return [
                vueExports.createVNode(_component_UInput, {
                  modelValue: vueExports.unref(passwordForm).confirmPassword,
                  "onUpdate:modelValue": ($event) => vueExports.unref(passwordForm).confirmPassword = $event,
                  type: "password",
                  placeholder: "再次输入新密码",
                  class: "w-full max-w-xs"
                }, null, 8, ["modelValue", "onUpdate:modelValue"])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<div class="flex justify-end">`);
        _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UButton, {
          loading: vueExports.unref(isChangingPassword),
          onClick: changePassword
        }, {
          default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` 修改密码 `);
            } else {
              return [
                vueExports.createTextVNode(" 修改密码 ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div><div class="bg-(--ui-bg-elevated) rounded-lg p-6 border border-red-500/30 space-y-5"><h2 class="text-lg font-medium text-red-500">危险区域</h2><p class="text-sm text-(--ui-text-muted)"> 删除账号将永久删除你的所有数据，包括上游配置、AI 模型、绘图任务、助手、对话记录等。此操作不可撤销。 </p><div class="flex justify-end">`);
        _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UButton, {
          color: "error",
          variant: "outline",
          onClick: ($event) => showDeleteConfirm.value = true
        }, {
          default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` 删除账号 `);
            } else {
              return [
                vueExports.createTextVNode(" 删除账号 ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UModal, {
        open: vueExports.unref(showDeleteConfirm),
        title: "确认删除账号",
        close: false
      }, {
        body: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="space-y-4"${_scopeId}><p class="text-(--ui-text-muted)"${_scopeId}> 你确定要删除账号吗？此操作将永久删除你的所有数据，且无法恢复。 </p>`);
            _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UFormField, {
              label: "输入密码确认",
              name: "deletePassword"
            }, {
              default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UInput, {
                    modelValue: vueExports.unref(deleteAccountForm).password,
                    "onUpdate:modelValue": ($event) => vueExports.unref(deleteAccountForm).password = $event,
                    type: "password",
                    placeholder: "输入密码",
                    class: "w-full"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    vueExports.createVNode(_component_UInput, {
                      modelValue: vueExports.unref(deleteAccountForm).password,
                      "onUpdate:modelValue": ($event) => vueExports.unref(deleteAccountForm).password = $event,
                      type: "password",
                      placeholder: "输入密码",
                      class: "w-full"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              vueExports.createVNode("div", { class: "space-y-4" }, [
                vueExports.createVNode("p", { class: "text-(--ui-text-muted)" }, " 你确定要删除账号吗？此操作将永久删除你的所有数据，且无法恢复。 "),
                vueExports.createVNode(_component_UFormField, {
                  label: "输入密码确认",
                  name: "deletePassword"
                }, {
                  default: vueExports.withCtx(() => [
                    vueExports.createVNode(_component_UInput, {
                      modelValue: vueExports.unref(deleteAccountForm).password,
                      "onUpdate:modelValue": ($event) => vueExports.unref(deleteAccountForm).password = $event,
                      type: "password",
                      placeholder: "输入密码",
                      class: "w-full"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  _: 1
                })
              ])
            ];
          }
        }),
        footer: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex justify-end gap-2"${_scopeId}>`);
            _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UButton, {
              variant: "ghost",
              onClick: ($event) => {
                showDeleteConfirm.value = false;
                vueExports.unref(deleteAccountForm).password = "";
              }
            }, {
              default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` 取消 `);
                } else {
                  return [
                    vueExports.createTextVNode(" 取消 ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UButton, {
              color: "error",
              loading: vueExports.unref(isDeletingAccount),
              onClick: deleteAccount
            }, {
              default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` 确认删除 `);
                } else {
                  return [
                    vueExports.createTextVNode(" 确认删除 ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              vueExports.createVNode("div", { class: "flex justify-end gap-2" }, [
                vueExports.createVNode(_component_UButton, {
                  variant: "ghost",
                  onClick: ($event) => {
                    showDeleteConfirm.value = false;
                    vueExports.unref(deleteAccountForm).password = "";
                  }
                }, {
                  default: vueExports.withCtx(() => [
                    vueExports.createTextVNode(" 取消 ")
                  ]),
                  _: 1
                }, 8, ["onClick"]),
                vueExports.createVNode(_component_UButton, {
                  color: "error",
                  loading: vueExports.unref(isDeletingAccount),
                  onClick: deleteAccount
                }, {
                  default: vueExports.withCtx(() => [
                    vueExports.createTextVNode(" 确认删除 ")
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
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = vueExports.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/user.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=user-CoEyq36u.mjs.map
