import { v as vueExports } from './server.mjs';

const token = vueExports.ref(null);
const user = vueExports.ref(null);
const isInitialized = vueExports.ref(false);
function useAuth() {
  const loggedIn = vueExports.computed(() => !!token.value && !!user.value);
  function init() {
    if (isInitialized.value || true) return;
  }
  function login(newToken, newUser) {
    token.value = newToken;
    user.value = newUser;
  }
  function logout() {
    token.value = null;
    user.value = null;
  }
  function updateUser(newUser) {
    if (user.value) {
      user.value = { ...user.value, ...newUser };
    }
  }
  function getAuthHeader() {
    if (!token.value) return {};
    return { Authorization: `Bearer ${token.value}` };
  }
  return {
    token: vueExports.readonly(token),
    user: vueExports.readonly(user),
    loggedIn,
    isInitialized: vueExports.readonly(isInitialized),
    init,
    login,
    logout,
    updateUser,
    getAuthHeader
  };
}

export { useAuth as u };
//# sourceMappingURL=useAuth-xXrD8D6Y.mjs.map
