import { d as defineEventHandler, r as requireAuth, g as getRouterParam, c as createError, b as db, E as workflowRuns, f as setHeader, F as workflowRunNodes } from '../../../../nitro/nitro.mjs';
import { eq } from 'drizzle-orm';
import { a as addSSESubscriber, r as removeSSESubscriber } from '../../../../_/workflowRun.mjs';
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
import 'better-sqlite3';
import 'drizzle-orm/better-sqlite3';
import 'drizzle-orm/sqlite-core';
import 'fs';
import 'path';
import 'drizzle-orm/better-sqlite3/migrator';
import 'node:url';
import '@iconify/utils';
import 'consola';
import 'fs/promises';
import '../../../../_/task.mjs';
import '../../../../_/constants.mjs';
import '../../../../_/upstream.mjs';
import '../../../../_/aimodel.mjs';
import '../../../../_/file.mjs';
import '../../../../_/globalEvents.mjs';
import '../../../../_/userSettings.mjs';

const events_get = defineEventHandler(async (event) => {
  const { user } = await requireAuth(event);
  const runId = Number(getRouterParam(event, "id"));
  if (!runId || isNaN(runId)) {
    throw createError({ statusCode: 400, message: "\u65E0\u6548\u7684\u8FD0\u884CID" });
  }
  const [run] = await db.select().from(workflowRuns).where(eq(workflowRuns.id, runId)).limit(1);
  if (!run || run.userId !== user.id) {
    throw createError({ statusCode: 404, message: "\u8FD0\u884C\u8BB0\u5F55\u4E0D\u5B58\u5728" });
  }
  setHeader(event, "Content-Type", "text/event-stream");
  setHeader(event, "Cache-Control", "no-cache");
  setHeader(event, "Connection", "keep-alive");
  setHeader(event, "X-Accel-Buffering", "no");
  const initData = JSON.stringify({
    type: "run_status",
    runId: run.id,
    status: run.status
  });
  await event.node.res.write(`data: ${initData}

`);
  const nodes = await db.select().from(workflowRunNodes).where(eq(workflowRunNodes.runId, runId));
  for (const node of nodes) {
    const nodeData = JSON.stringify({
      type: "run_node_status",
      runId: run.id,
      nodeId: node.nodeId,
      status: node.status,
      outputs: node.outputs,
      error: node.error
    });
    await event.node.res.write(`data: ${nodeData}

`);
  }
  if (["completed", "failed", "cancelled"].includes(run.status)) {
    await event.node.res.end();
    return;
  }
  addSSESubscriber(runId, event, user.id);
  return new Promise((resolve) => {
    event.node.req.on("close", () => {
      removeSSESubscriber(runId, event);
      resolve(void 0);
    });
    event.node.req.on("error", () => {
      removeSSESubscriber(runId, event);
      resolve(void 0);
    });
  });
});

export { events_get as default };
//# sourceMappingURL=events.get.mjs.map
