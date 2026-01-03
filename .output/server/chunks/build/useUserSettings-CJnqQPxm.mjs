import { u as useAuth } from './useAuth-xXrD8D6Y.mjs';
import { p as USER_SETTING_DEFAULTS, U as USER_SETTING_KEYS } from './constants-Bq60BfFZ.mjs';
import { d as useState } from './server.mjs';

function useUserSettings() {
  const { getAuthHeader } = useAuth();
  const settings = useState("user-settings", () => ({ ...USER_SETTING_DEFAULTS }));
  const isLoading = useState("user-settings-loading", () => false);
  const isLoaded = useState("user-settings-loaded", () => false);
  async function loadSettings() {
    if (isLoading.value) return;
    isLoading.value = true;
    try {
      const data = await $fetch("/api/settings", {
        headers: getAuthHeader()
      });
      settings.value = data;
      isLoaded.value = true;
    } catch (error) {
      console.error("加载用户设置失败:", error);
    } finally {
      isLoading.value = false;
    }
  }
  async function updateSettings(updates) {
    const data = await $fetch("/api/settings", {
      method: "PUT",
      headers: getAuthHeader(),
      body: updates
    });
    settings.value = data;
  }
  function get(key) {
    return settings.value[key];
  }
  async function resetToDefault(key) {
    await updateSettings({ [key]: USER_SETTING_DEFAULTS[key] });
  }
  return {
    settings,
    isLoading,
    isLoaded,
    loadSettings,
    updateSettings,
    get,
    resetToDefault,
    USER_SETTING_KEYS,
    USER_SETTING_DEFAULTS
  };
}

export { useUserSettings as u };
//# sourceMappingURL=useUserSettings-CJnqQPxm.mjs.map
