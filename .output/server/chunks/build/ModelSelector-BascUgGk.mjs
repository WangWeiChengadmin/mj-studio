import { v as vueExports, h as useRouter, s as serverRenderer_cjs_prodExports, b as _sfc_main$d } from './server.mjs';
import { o as onClickOutside } from './index--6aaawBa.mjs';
import { M as MODEL_TYPE_LABELS, b as MODEL_TYPE_ICONS } from './constants-Bq60BfFZ.mjs';

const _sfc_main = /* @__PURE__ */ vueExports.defineComponent({
  __name: "ModelSelector",
  __ssrInlineRender: true,
  props: {
    upstreams: {},
    category: {},
    upstreamId: {},
    aimodelId: {},
    showTypeLabel: { type: Boolean },
    dropdownWidth: {},
    listLayout: { type: Boolean },
    noAutoSelect: { type: Boolean },
    alignRight: { type: Boolean }
  },
  emits: ["update:upstreamId", "update:aimodelId"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    useRouter();
    const isOpen = vueExports.ref(false);
    const dropdownRef = vueExports.ref();
    vueExports.ref();
    const dropUp = vueExports.ref(false);
    const selectedUpstreamId = vueExports.ref(props.upstreamId ?? null);
    const selectedAimodelId = vueExports.ref(props.aimodelId ?? null);
    vueExports.watch(() => props.upstreamId, (val) => {
      selectedUpstreamId.value = val ?? null;
    });
    vueExports.watch(() => props.aimodelId, (val) => {
      selectedAimodelId.value = val ?? null;
    });
    onClickOutside(dropdownRef, () => {
      isOpen.value = false;
    });
    function isImageModelType(modelType) {
      const imageModels = [
        "midjourney",
        "gemini",
        "flux",
        "dalle",
        "doubao",
        "gpt4o-image",
        "grok-image",
        "qwen-image",
        "z-image"
      ];
      return imageModels.includes(modelType);
    }
    function filterModelsByCategory(aimodels) {
      return aimodels.filter((m) => {
        if (props.category === "image") {
          return m.category === "image" || !m.category && isImageModelType(m.modelType);
        } else if (props.category === "video") {
          return m.category === "video";
        } else {
          return m.category === "chat" || !m.category && m.apiFormat === "openai-chat" && !isImageModelType(m.modelType);
        }
      });
    }
    const groupedModels = vueExports.computed(() => {
      const groups = [];
      for (const upstream of props.upstreams) {
        const filteredModels = filterModelsByCategory(upstream.aimodels || []);
        if (filteredModels.length > 0) {
          groups.push({
            upstreamId: upstream.id,
            upstreamName: upstream.name,
            aimodels: filteredModels
          });
        }
      }
      return groups;
    });
    const hasModels = vueExports.computed(() => groupedModels.value.some((g) => g.aimodels.length > 0));
    const selectedUpstream = vueExports.computed(() => {
      return props.upstreams.find((u) => u.id === selectedUpstreamId.value);
    });
    const selectedAimodel = vueExports.computed(() => {
      if (!selectedUpstream.value || !selectedAimodelId.value) return void 0;
      return selectedUpstream.value.aimodels?.find(
        (m) => m.id === selectedAimodelId.value
      );
    });
    const currentDisplayText = vueExports.computed(() => {
      if (!selectedUpstreamId.value || !selectedAimodelId.value) {
        return "选择模型";
      }
      const upstream = props.upstreams.find((u) => u.id === selectedUpstreamId.value);
      if (!upstream) return "选择模型";
      const aimodel = upstream.aimodels?.find((m) => m.id === selectedAimodelId.value);
      if (!aimodel) return `${upstream.name} / 未知模型`;
      const displayName = props.showTypeLabel ? MODEL_TYPE_LABELS[aimodel.modelType] || aimodel.modelType : aimodel.modelName;
      return `${upstream.name} / ${displayName}`;
    });
    function getModelIcon(modelType) {
      return MODEL_TYPE_ICONS[modelType] || "i-heroicons-sparkles";
    }
    function getModelDisplayText(aimodel) {
      if (props.showTypeLabel) {
        return MODEL_TYPE_LABELS[aimodel.modelType] || aimodel.modelType;
      }
      return aimodel.modelName;
    }
    function isSelected(upstreamId, aimodelId) {
      return selectedUpstreamId.value === upstreamId && selectedAimodelId.value === aimodelId;
    }
    function handleSelectModel(upstreamId, aimodelId) {
      selectedUpstreamId.value = upstreamId;
      selectedAimodelId.value = aimodelId;
      emit("update:upstreamId", upstreamId);
      emit("update:aimodelId", aimodelId);
      isOpen.value = false;
    }
    vueExports.watch(() => props.upstreams, (upstreams) => {
      if (props.noAutoSelect) return;
      if (upstreams.length > 0 && !selectedUpstreamId.value) {
        const firstUpstream = upstreams[0];
        const filteredModels = filterModelsByCategory(firstUpstream.aimodels || []);
        if (filteredModels.length > 0) {
          handleSelectModel(firstUpstream.id, filteredModels[0].id);
        }
      }
    }, { immediate: true });
    vueExports.watch(selectedUpstreamId, (newId) => {
      if (!newId) return;
      const upstream = props.upstreams.find((u) => u.id === newId);
      if (!upstream) return;
      const filteredModels = filterModelsByCategory(upstream.aimodels || []);
      const validIds = filteredModels.map((m) => m.id);
      if (!selectedAimodelId.value || !validIds.includes(selectedAimodelId.value)) {
        if (filteredModels.length > 0) {
          selectedAimodelId.value = filteredModels[0].id;
          emit("update:aimodelId", selectedAimodelId.value);
        }
      }
    });
    __expose({
      selectedUpstream,
      selectedAimodel
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = _sfc_main$d;
      _push(`<div${serverRenderer_cjs_prodExports.ssrRenderAttrs(vueExports.mergeProps({
        ref_key: "dropdownRef",
        ref: dropdownRef,
        class: "relative"
      }, _attrs))}>`);
      if (__props.upstreams.length === 0) {
        _push(`<div class="text-xs text-(--ui-text-muted) flex items-center">`);
        _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-exclamation-circle",
          class: "w-4 h-4 mr-1"
        }, null, _parent));
        _push(` 请先在设置中添加${serverRenderer_cjs_prodExports.ssrInterpolate(__props.category === "chat" ? "对话" : __props.category === "video" ? "视频" : "绘图")}模型 </div>`);
      } else {
        _push(`<div><button type="button" class="${serverRenderer_cjs_prodExports.ssrRenderClass([{ "opacity-50 cursor-not-allowed": !vueExports.unref(hasModels) }, "flex items-center justify-between gap-2 w-full min-w-48 px-3 py-2 rounded-lg border border-(--ui-border) bg-(--ui-bg) hover:bg-(--ui-bg-elevated) transition-colors text-sm"])}"${serverRenderer_cjs_prodExports.ssrIncludeBooleanAttr(!vueExports.unref(hasModels)) ? " disabled" : ""}><span class="flex items-center gap-2">`);
        _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-cpu-chip",
          class: "w-4 h-4 text-(--ui-text-muted)"
        }, null, _parent));
        _push(`<span class="text-(--ui-text)">${serverRenderer_cjs_prodExports.ssrInterpolate(vueExports.unref(currentDisplayText))}</span></span>`);
        _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-chevron-down",
          class: ["w-4 h-4 text-(--ui-text-muted) transition-transform", { "rotate-180": vueExports.unref(isOpen) }]
        }, null, _parent));
        _push(`</button></div>`);
      }
      if (vueExports.unref(isOpen) && vueExports.unref(hasModels)) {
        _push(`<div class="${serverRenderer_cjs_prodExports.ssrRenderClass([[vueExports.unref(dropUp) ? "bottom-full mb-1" : "top-full mt-1", __props.dropdownWidth || "w-80", __props.alignRight ? "right-0" : "left-0"], "absolute z-50 max-h-80 overflow-y-auto rounded-lg border border-(--ui-border) bg-(--ui-bg-elevated) shadow-lg"])}"><!--[-->`);
        serverRenderer_cjs_prodExports.ssrRenderList(vueExports.unref(groupedModels), (group, index) => {
          _push(`<div>`);
          if (index > 0) {
            _push(`<div class="border-t border-(--ui-border)"></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<div class="flex items-center justify-between px-3 py-2 bg-(--ui-bg-muted)"><span class="text-xs font-medium text-(--ui-text-muted)">${serverRenderer_cjs_prodExports.ssrInterpolate(group.upstreamName)}</span><button class="p-1 hover:bg-(--ui-bg-accented) rounded text-(--ui-text-muted) hover:text-(--ui-text)">`);
          _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UIcon, {
            name: "i-heroicons-cog-6-tooth",
            class: "w-3.5 h-3.5"
          }, null, _parent));
          _push(`</button></div><div class="${serverRenderer_cjs_prodExports.ssrRenderClass(__props.listLayout ? "flex flex-col gap-1 p-2" : "grid grid-cols-2 gap-2 p-2")}"><!--[-->`);
          serverRenderer_cjs_prodExports.ssrRenderList(group.aimodels, (aimodel) => {
            _push(`<button class="${serverRenderer_cjs_prodExports.ssrRenderClass([[
              isSelected(group.upstreamId, aimodel.id) ? "bg-(--ui-primary)/10 text-(--ui-primary)" : "hover:bg-(--ui-bg-accented) text-(--ui-text)",
              __props.listLayout ? "" : "border border-(--ui-border) hover:border-(--ui-primary)"
            ], "flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-left text-sm transition-colors"])}">`);
            _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UIcon, {
              name: getModelIcon(aimodel.modelType),
              class: "w-4 h-4 shrink-0"
            }, null, _parent));
            _push(`<span class="truncate">${serverRenderer_cjs_prodExports.ssrInterpolate(getModelDisplayText(aimodel))}</span></button>`);
          });
          _push(`<!--]--></div></div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = vueExports.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ModelSelector.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_4 = Object.assign(_sfc_main, { __name: "ModelSelector" });

export { __nuxt_component_4 as _ };
//# sourceMappingURL=ModelSelector-BascUgGk.mjs.map
