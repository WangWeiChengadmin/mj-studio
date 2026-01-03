import { d as defineEventHandler, r as requireAuth, f as setHeader } from '../../nitro/nitro.mjs';
import { a as addUserSubscriber, e as emitToUser, r as removeUserSubscriber } from '../../_/globalEvents.mjs';
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

const events_get = defineEventHandler(async (event) => {
  const { user } = await requireAuth(event);
  setHeader(event, "Content-Type", "text/event-stream");
  setHeader(event, "Cache-Control", "no-cache");
  setHeader(event, "Connection", "keep-alive");
  setHeader(event, "X-Accel-Buffering", "no");
  addUserSubscriber(user.id, event);
  await emitToUser(user.id, "system.hello", {
    userId: user.id,
    ts: Date.now()
  });
  const heartbeatInterval = setInterval(async () => {
    try {
      await event.node.res.write(": ping\n\n");
    } catch {
      clearInterval(heartbeatInterval);
    }
  }, 30 * 1e3);
  return new Promise((resolve) => {
    const cleanup = () => {
      clearInterval(heartbeatInterval);
      removeUserSubscriber(user.id, event);
      resolve(void 0);
    };
    event.node.req.on("close", cleanup);
    event.node.req.on("error", cleanup);
  });
});

export { events_get as default };
//# sourceMappingURL=events.get.mjs.map
