const streamingSessions = /* @__PURE__ */ new Map();
function startStreamingSession(messageId, conversationId, userId, abortController) {
  streamingSessions.set(messageId, {
    messageId,
    conversationId,
    userId,
    content: "",
    status: "created",
    startedAt: Date.now(),
    updatedAt: Date.now(),
    abortController
  });
}
function updateSessionStatus(messageId, status) {
  const session = streamingSessions.get(messageId);
  if (session) {
    session.status = status;
    session.updatedAt = Date.now();
  }
}
function appendStreamingContent(messageId, content) {
  const session = streamingSessions.get(messageId);
  if (session) {
    session.content += content;
    session.updatedAt = Date.now();
  }
}
function getStreamingSession(messageId) {
  return streamingSessions.get(messageId) || null;
}
function endStreamingSession(messageId) {
  const session = streamingSessions.get(messageId);
  const content = (session == null ? void 0 : session.content) || "";
  streamingSessions.delete(messageId);
  return content;
}
function getSessionAbortController(messageId) {
  var _a;
  return (_a = streamingSessions.get(messageId)) == null ? void 0 : _a.abortController;
}
function cleanupStaleSessions() {
  var _a;
  const now = Date.now();
  const timeout = 5 * 60 * 1e3;
  for (const [messageId, session] of streamingSessions) {
    if (now - session.updatedAt > timeout) {
      (_a = session.abortController) == null ? void 0 : _a.abort();
      streamingSessions.delete(messageId);
    }
  }
}
setInterval(cleanupStaleSessions, 60 * 1e3);
function findActiveSession(conversationId, userId) {
  for (const session of streamingSessions.values()) {
    if (session.conversationId === conversationId && session.userId === userId) {
      return session;
    }
  }
  return null;
}

export { appendStreamingContent as a, getSessionAbortController as b, endStreamingSession as e, findActiveSession as f, getStreamingSession as g, startStreamingSession as s, updateSessionStatus as u };
//# sourceMappingURL=streamingCache.mjs.map
