const THREE_DAYS_MS = 3 * 24 * 60 * 60 * 1e3;
function formatTimeAgo(dateStr) {
  const date = new Date(dateStr);
  const now = /* @__PURE__ */ new Date();
  const diff = now.getTime() - date.getTime();
  if (diff < THREE_DAYS_MS) {
    if (diff < 6e4) return "刚刚";
    if (diff < 36e5) return `${Math.floor(diff / 6e4)} 分钟前`;
    if (diff < 864e5) return `${Math.floor(diff / 36e5)} 小时前`;
    const days = Math.floor(diff / 864e5);
    if (days === 1) return "昨天";
    if (days === 2) return "前天";
  }
  return formatDate(dateStr);
}
function formatDate(dateStr) {
  const date = new Date(dateStr);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
function formatDateTime(dateStr) {
  const date = new Date(dateStr);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hour = String(date.getHours()).padStart(2, "0");
  const minute = String(date.getMinutes()).padStart(2, "0");
  const second = String(date.getSeconds()).padStart(2, "0");
  return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
}
function useTimeFormat() {
  return {
    formatTimeAgo,
    formatDate,
    formatDateTime
  };
}

export { formatDateTime as a, formatTimeAgo as f, useTimeFormat as u };
//# sourceMappingURL=useTimeFormat-BGnNO3st.mjs.map
