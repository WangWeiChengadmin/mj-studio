import { d as useState, v as vueExports } from './server.mjs';

function useAssistants() {
  const assistants = useState("assistants", () => []);
  const isLoading = useState("assistants-loading", () => false);
  const currentAssistantId = vueExports.ref(null);
  const currentAssistant = vueExports.computed(() => {
    if (currentAssistantId.value) {
      return assistants.value.find((a) => a.id === currentAssistantId.value);
    }
    return null;
  });
  function getDefaultAssistant() {
    return assistants.value.find((a) => a.isDefault) || assistants.value[0] || null;
  }
  async function loadAssistants() {
    isLoading.value = true;
    try {
      const result = await $fetch("/api/assistants");
      assistants.value = result;
    } catch (error) {
      console.error("加载助手列表失败:", error);
    } finally {
      isLoading.value = false;
    }
  }
  function selectAssistant(id) {
    currentAssistantId.value = id;
  }
  async function createAssistant(data) {
    const assistant = await $fetch("/api/assistants", {
      method: "POST",
      body: data
    });
    if (data.isDefault) {
      assistants.value.forEach((a) => {
        a.isDefault = false;
      });
    }
    assistants.value.unshift({ ...assistant, conversationCount: 0 });
    return assistant;
  }
  async function updateAssistant(id, data) {
    const updated = await $fetch(`/api/assistants/${id}`, {
      method: "PUT",
      body: data
    });
    if (data.isDefault) {
      assistants.value.forEach((a) => {
        if (a.id !== id) a.isDefault = false;
      });
    }
    const index = assistants.value.findIndex((a) => a.id === id);
    if (index >= 0) {
      assistants.value[index] = updated;
    }
    return updated;
  }
  async function deleteAssistant(id) {
    await $fetch(`/api/assistants/${id}`, {
      method: "DELETE"
    });
    assistants.value = assistants.value.filter((a) => a.id !== id);
    if (currentAssistantId.value === id) {
      const defaultAssistant = assistants.value.find((a) => a.isDefault) || assistants.value[0];
      currentAssistantId.value = defaultAssistant?.id || null;
    }
  }
  function incrementConversationCount(assistantId) {
    const assistant = assistants.value.find((a) => a.id === assistantId);
    if (assistant) {
      assistant.conversationCount++;
    }
  }
  function decrementConversationCount(assistantId) {
    const assistant = assistants.value.find((a) => a.id === assistantId);
    if (assistant && assistant.conversationCount > 0) {
      assistant.conversationCount--;
    }
  }
  return {
    assistants,
    isLoading,
    currentAssistantId,
    currentAssistant,
    getDefaultAssistant,
    loadAssistants,
    selectAssistant,
    createAssistant,
    updateAssistant,
    deleteAssistant,
    incrementConversationCount,
    decrementConversationCount
  };
}

export { useAssistants as u };
//# sourceMappingURL=useAssistants-CglvJODb.mjs.map
