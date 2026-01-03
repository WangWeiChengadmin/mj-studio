import { v as vueExports, s as serverRenderer_cjs_prodExports, _ as _export_sfc } from './server.mjs';
import { u as useAuth } from './useAuth-xXrD8D6Y.mjs';
import { f as formatTimeAgo, a as formatDateTime } from './useTimeFormat-BGnNO3st.mjs';

const _sfc_main$1 = /* @__PURE__ */ vueExports.defineComponent({
  __name: "Loader",
  __ssrInlineRender: true,
  props: {
    color: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${serverRenderer_cjs_prodExports.ssrRenderAttrs(vueExports.mergeProps({ class: "bars-loader flex items-end justify-center gap-0.5" }, _attrs))} data-v-e51b1fc2><span class="${serverRenderer_cjs_prodExports.ssrRenderClass([__props.color || "bg-current", "bar"])}" data-v-e51b1fc2></span><span class="${serverRenderer_cjs_prodExports.ssrRenderClass([__props.color || "bg-current", "bar"])}" data-v-e51b1fc2></span><span class="${serverRenderer_cjs_prodExports.ssrRenderClass([__props.color || "bg-current", "bar"])}" data-v-e51b1fc2></span><span class="${serverRenderer_cjs_prodExports.ssrRenderClass([__props.color || "bg-current", "bar"])}" data-v-e51b1fc2></span></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = vueExports.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/studio/Loader.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$1, [["__scopeId", "data-v-e51b1fc2"]]), { __name: "StudioLoader" });
const isConnected = vueExports.ref(false);
const isConnecting = vueExports.ref(false);
const lastEventId = vueExports.ref(null);
const handlers = /* @__PURE__ */ new Map();
let abortController = null;
let reconnectTimer = null;
const RECONNECT_DELAY = 3e3;
function useGlobalEvents() {
  const { getAuthHeader, loggedIn } = useAuth();
  function on(eventType, handler) {
    if (!handlers.has(eventType)) {
      handlers.set(eventType, /* @__PURE__ */ new Set());
    }
    handlers.get(eventType).add(handler);
    return () => {
      const typeHandlers = handlers.get(eventType);
      if (typeHandlers) {
        typeHandlers.delete(handler);
        if (typeHandlers.size === 0) {
          handlers.delete(eventType);
        }
      }
    };
  }
  function emit(eventType, data, envelope) {
    const typeHandlers = handlers.get(eventType);
    if (typeHandlers) {
      for (const handler of typeHandlers) {
        try {
          handler(data, envelope);
        } catch (err) {
          console.error(`[GlobalEvents] 事件处理器错误 (${eventType}):`, err);
        }
      }
    }
  }
  async function connect() {
    if (isConnected.value || isConnecting.value) return;
    if (!loggedIn.value) return;
    isConnecting.value = true;
    abortController = new AbortController();
    try {
      const response = await fetch("/api/events", {
        signal: abortController.signal,
        headers: getAuthHeader()
      });
      if (!response.ok) {
        throw new Error(`连接失败: ${response.status}`);
      }
      isConnected.value = true;
      isConnecting.value = false;
      console.log("[GlobalEvents] 连接已建立");
      const reader = response.body?.getReader();
      if (!reader) throw new Error("无法读取响应");
      const decoder = new TextDecoder();
      let buffer = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";
        let currentEvent = {};
        for (const line of lines) {
          const trimmed = line.trim();
          if (trimmed.startsWith(":")) {
            continue;
          }
          if (trimmed === "") {
            if (currentEvent.data) {
              try {
                const envelope = JSON.parse(currentEvent.data);
                lastEventId.value = envelope.id;
                emit(envelope.type, envelope.data, envelope);
              } catch (err) {
                console.error("[GlobalEvents] 解析事件失败:", err);
              }
            }
            currentEvent = {};
            continue;
          }
          if (trimmed.startsWith("id:")) {
            currentEvent.id = trimmed.slice(3).trim();
          } else if (trimmed.startsWith("event:")) {
            currentEvent.event = trimmed.slice(6).trim();
          } else if (trimmed.startsWith("data:")) {
            currentEvent.data = trimmed.slice(5).trim();
          }
        }
      }
    } catch (err) {
      if (err.name === "AbortError") {
        console.log("[GlobalEvents] 连接已取消");
        return;
      }
      console.error("[GlobalEvents] 连接错误:", err);
    } finally {
      isConnected.value = false;
      isConnecting.value = false;
      abortController = null;
      if (loggedIn.value) {
        scheduleReconnect();
      }
    }
  }
  function disconnect() {
    if (reconnectTimer) {
      clearTimeout(reconnectTimer);
      reconnectTimer = null;
    }
    if (abortController) {
      abortController.abort();
      abortController = null;
    }
    isConnected.value = false;
    isConnecting.value = false;
    console.log("[GlobalEvents] 连接已断开");
  }
  function scheduleReconnect() {
    if (reconnectTimer) return;
    console.log(`[GlobalEvents] ${RECONNECT_DELAY / 1e3} 秒后重连...`);
    reconnectTimer = setTimeout(() => {
      reconnectTimer = null;
      connect();
    }, RECONNECT_DELAY);
  }
  return {
    isConnected: vueExports.readonly(isConnected),
    isConnecting: vueExports.readonly(isConnecting),
    lastEventId: vueExports.readonly(lastEventId),
    on,
    connect,
    disconnect
  };
}
const intervalError = "[nuxt] `setInterval` should not be used on the server. Consider wrapping it with an `onNuxtReady`, `onBeforeMount` or `onMounted` lifecycle hook, or ensure you only call it in the browser by checking `false`.";
const setInterval = () => {
  console.error(intervalError);
};
const _sfc_main = /* @__PURE__ */ vueExports.defineComponent({
  __name: "TimeAgo",
  __ssrInlineRender: true,
  props: {
    time: {}
  },
  setup(__props) {
    const props = __props;
    const showFull = vueExports.ref(false);
    const relativeTime = vueExports.computed(() => formatTimeAgo(props.time));
    const fullTime = vueExports.computed(() => formatDateTime(props.time));
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<span${serverRenderer_cjs_prodExports.ssrRenderAttrs(vueExports.mergeProps({
        class: "cursor-pointer",
        title: vueExports.unref(fullTime)
      }, _attrs))}>${serverRenderer_cjs_prodExports.ssrInterpolate(vueExports.unref(showFull) ? vueExports.unref(fullTime) : vueExports.unref(relativeTime))}</span>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = vueExports.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/TimeAgo.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_3 = Object.assign(_sfc_main, { __name: "TimeAgo" });

export { __nuxt_component_3 as _, __nuxt_component_0 as a, setInterval as s, useGlobalEvents as u };
//# sourceMappingURL=TimeAgo-CNFOo2Jq.mjs.map
