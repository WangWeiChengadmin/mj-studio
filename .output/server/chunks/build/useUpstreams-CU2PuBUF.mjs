import { d as useState } from './server.mjs';

function useUpstreams() {
  const upstreams = useState("upstreams", () => []);
  const isLoading = useState("upstreams-loading", () => false);
  async function loadUpstreams() {
    isLoading.value = true;
    try {
      const result = await $fetch("/api/upstreams");
      upstreams.value = result;
    } catch (error) {
      console.error("加载上游配置失败:", error);
    } finally {
      isLoading.value = false;
    }
  }
  async function createUpstream(data) {
    const upstream = await $fetch("/api/upstreams", {
      method: "POST",
      body: data
    });
    upstreams.value.push(upstream);
    upstreams.value.sort((a, b) => a.sortOrder - b.sortOrder);
    return upstream;
  }
  async function updateUpstream(id, data) {
    const updated = await $fetch(`/api/upstreams/${id}`, {
      method: "PUT",
      body: data
    });
    const index = upstreams.value.findIndex((u) => u.id === id);
    if (index >= 0) {
      upstreams.value[index] = updated;
    }
    upstreams.value.sort((a, b) => a.sortOrder - b.sortOrder);
    return updated;
  }
  async function moveToTop(id) {
    const upstream = upstreams.value.find((u) => u.id === id);
    if (!upstream) return;
    const minSortOrder = Math.min(...upstreams.value.map((u) => u.sortOrder));
    const newSortOrder = minSortOrder > 0 ? minSortOrder - 1 : minSortOrder - 1;
    return updateUpstream(id, { sortOrder: newSortOrder });
  }
  async function deleteUpstream(id) {
    await $fetch(`/api/upstreams/${id}`, {
      method: "DELETE"
    });
    upstreams.value = upstreams.value.filter((u) => u.id !== id);
  }
  function getUpstreamById(id) {
    return upstreams.value.find((u) => u.id === id);
  }
  function getAimodelById(upstreamId, aimodelId) {
    const upstream = getUpstreamById(upstreamId);
    return upstream?.aimodels.find((m) => m.id === aimodelId);
  }
  async function queryBalance(id) {
    const result = await $fetch(`/api/upstreams/${id}/balance`);
    if (result.success && result.upstreamInfo) {
      const index = upstreams.value.findIndex((u) => u.id === id);
      if (index >= 0) {
        upstreams.value[index].upstreamInfo = result.upstreamInfo;
      }
    }
    return result;
  }
  return {
    upstreams,
    isLoading,
    loadUpstreams,
    createUpstream,
    updateUpstream,
    moveToTop,
    deleteUpstream,
    getUpstreamById,
    getAimodelById,
    queryBalance
  };
}

export { useUpstreams as u };
//# sourceMappingURL=useUpstreams-CU2PuBUF.mjs.map
