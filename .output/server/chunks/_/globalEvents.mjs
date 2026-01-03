const userSubscribers = /* @__PURE__ */ new Map();
let eventIdCounter = 0;
function generateEventId() {
  return `${Date.now()}-${++eventIdCounter}`;
}
function addUserSubscriber(userId, event) {
  if (!userSubscribers.has(userId)) {
    userSubscribers.set(userId, /* @__PURE__ */ new Set());
  }
  userSubscribers.get(userId).add({
    event,
    createdAt: Date.now()
  });
}
function removeUserSubscriber(userId, event) {
  const connections = userSubscribers.get(userId);
  if (connections) {
    for (const conn of connections) {
      if (conn.event === event) {
        connections.delete(conn);
        break;
      }
    }
    if (connections.size === 0) {
      userSubscribers.delete(userId);
    }
  }
}
async function emitToUser(userId, eventType, data) {
  const connections = userSubscribers.get(userId);
  if (!connections || connections.size === 0) return;
  const envelope = {
    id: generateEventId(),
    ts: Date.now(),
    type: eventType,
    data
  };
  const message = [
    `id: ${envelope.id}`,
    `event: ${eventType}`,
    `data: ${JSON.stringify(envelope)}`,
    "",
    ""
  ].join("\n");
  for (const conn of connections) {
    try {
      await conn.event.node.res.write(message);
    } catch {
      connections.delete(conn);
    }
  }
}
function cleanupStaleConnections() {
  const now = Date.now();
  const timeout = 30 * 60 * 1e3;
  for (const [userId, connections] of userSubscribers) {
    for (const conn of connections) {
      if (now - conn.createdAt > timeout) {
        try {
          conn.event.node.res.end();
        } catch {
        }
        connections.delete(conn);
      }
    }
    if (connections.size === 0) {
      userSubscribers.delete(userId);
    }
  }
}
setInterval(cleanupStaleConnections, 5 * 60 * 1e3);

export { addUserSubscriber as a, emitToUser as e, removeUserSubscriber as r };
//# sourceMappingURL=globalEvents.mjs.map
