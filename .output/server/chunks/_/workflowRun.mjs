import { readFile, copyFile } from 'fs/promises';
import { join } from 'path';
import { eq, and, isNull } from 'drizzle-orm';
import { b as db, F as workflowRunNodes, E as workflowRuns, D as tasks, G as workflows } from '../nitro/nitro.mjs';
import { u as useTaskService } from './task.mjs';
import { u as useAimodelService } from './aimodel.mjs';
import { u as useUpstreamService } from './upstream.mjs';
import { u as useUserSettingsService } from './userSettings.mjs';
import { U as USER_SETTING_KEYS } from './constants.mjs';

const subscribers = /* @__PURE__ */ new Map();
async function emitSSE(runId, sseEvent) {
  const subs = subscribers.get(runId);
  if (!subs || subs.size === 0) return;
  const message = `data: ${JSON.stringify(sseEvent)}

`;
  for (const sub of subs) {
    try {
      await sub.event.node.res.write(message);
    } catch {
      subs.delete(sub);
    }
  }
}
function addSSESubscriber(runId, event, userId) {
  if (!subscribers.has(runId)) {
    subscribers.set(runId, /* @__PURE__ */ new Set());
  }
  subscribers.get(runId).add({ runId, event, userId });
}
function removeSSESubscriber(runId, event) {
  const subs = subscribers.get(runId);
  if (subs) {
    for (const sub of subs) {
      if (sub.event === event) {
        subs.delete(sub);
        break;
      }
    }
    if (subs.size === 0) {
      subscribers.delete(runId);
    }
  }
}
function useWorkflowRunService() {
  const taskService = useTaskService();
  const aimodelService = useAimodelService();
  const upstreamService = useUpstreamService();
  const userSettingsService = useUserSettingsService();
  async function loadWorkflowData(workflowId, userId) {
    const [workflow] = await db.select().from(workflows).where(and(
      eq(workflows.id, workflowId),
      eq(workflows.userId, userId),
      isNull(workflows.deletedAt)
    )).limit(1);
    if (!workflow) {
      throw new Error("\u5DE5\u4F5C\u6D41\u4E0D\u5B58\u5728");
    }
    const filePath = join(process.cwd(), "data/workflows", workflow.filename);
    const content = await readFile(filePath, "utf-8");
    const data = JSON.parse(content);
    return { workflow, data };
  }
  async function loadSnapshotData(snapshotFilename) {
    const filePath = join(process.cwd(), "data/workflows", snapshotFilename);
    const content = await readFile(filePath, "utf-8");
    return JSON.parse(content);
  }
  async function createSnapshot(workflowFilename) {
    const timestamp = Date.now();
    const snapshotFilename = `snapshot-${timestamp}.json`;
    const srcPath = join(process.cwd(), "data/workflows", workflowFilename);
    const destPath = join(process.cwd(), "data/workflows", snapshotFilename);
    await copyFile(srcPath, destPath);
    return snapshotFilename;
  }
  async function createRun(workflowId, userId, runMode = "normal") {
    const { workflow, data } = await loadWorkflowData(workflowId, userId);
    const snapshotFilename = await createSnapshot(workflow.filename);
    const [run] = await db.insert(workflowRuns).values({
      workflowId,
      userId,
      status: "pending",
      runMode,
      snapshotFilename,
      createdAt: /* @__PURE__ */ new Date()
    }).returning();
    const nodeRecords = data.nodes.map((node) => ({
      runId: run.id,
      nodeId: node.id,
      status: "idle",
      createdAt: /* @__PURE__ */ new Date()
    }));
    if (nodeRecords.length > 0) {
      await db.insert(workflowRunNodes).values(nodeRecords);
    }
    return run;
  }
  async function getRun(runId) {
    const [run] = await db.select().from(workflowRuns).where(eq(workflowRuns.id, runId)).limit(1);
    if (!run) return null;
    const nodes = await db.select().from(workflowRunNodes).where(eq(workflowRunNodes.runId, runId));
    const snapshot = await loadSnapshotData(run.snapshotFilename);
    return { run, nodes, snapshot };
  }
  async function updateRunStatus(runId, status, error) {
    const updates = { status };
    if (error) updates.error = error;
    if (status === "running" && !updates.startedAt) {
      updates.startedAt = /* @__PURE__ */ new Date();
    }
    if (["completed", "failed", "cancelled"].includes(status)) {
      updates.completedAt = /* @__PURE__ */ new Date();
    }
    await db.update(workflowRuns).set(updates).where(eq(workflowRuns.id, runId));
    emitSSE(runId, { type: "run_status", runId, status });
  }
  async function updateRunMode(runId, runMode) {
    await db.update(workflowRuns).set({ runMode }).where(eq(workflowRuns.id, runId));
    emitSSE(runId, { type: "run_mode_changed", runId, runMode });
  }
  async function updateNodeStatus(runId, nodeId, status, outputs, error) {
    const updates = { status };
    if (outputs) updates.outputs = outputs;
    if (error) updates.error = error;
    if (status === "processing") {
      updates.startedAt = /* @__PURE__ */ new Date();
    }
    if (["success", "failed"].includes(status)) {
      updates.completedAt = /* @__PURE__ */ new Date();
    }
    await db.update(workflowRunNodes).set(updates).where(and(
      eq(workflowRunNodes.runId, runId),
      eq(workflowRunNodes.nodeId, nodeId)
    ));
    emitSSE(runId, {
      type: "run_node_status",
      runId,
      nodeId,
      status,
      outputs,
      error
    });
  }
  function topologicalSort(nodes, edges) {
    const inDegree = /* @__PURE__ */ new Map();
    const adjacency = /* @__PURE__ */ new Map();
    for (const node of nodes) {
      inDegree.set(node.id, 0);
      adjacency.set(node.id, []);
    }
    for (const edge of edges) {
      const targets = adjacency.get(edge.source) || [];
      targets.push(edge.target);
      adjacency.set(edge.source, targets);
      inDegree.set(edge.target, (inDegree.get(edge.target) || 0) + 1);
    }
    const queue = [];
    const result = [];
    for (const [nodeId, degree] of inDegree) {
      if (degree === 0) {
        queue.push(nodeId);
      }
    }
    while (queue.length > 0) {
      const nodeId = queue.shift();
      const node = nodes.find((n) => n.id === nodeId);
      if (node) {
        result.push(node);
      }
      for (const targetId of adjacency.get(nodeId) || []) {
        const newDegree = (inDegree.get(targetId) || 1) - 1;
        inDegree.set(targetId, newDegree);
        if (newDegree === 0) {
          queue.push(targetId);
        }
      }
    }
    return result;
  }
  function getNodeInputs(nodeId, nodes, edges, nodeResults) {
    const images = [];
    const texts = [];
    const incomingEdges = edges.filter((e) => e.target === nodeId);
    for (const edge of incomingEdges) {
      const sourceNode = nodes.find((n) => n.id === edge.source);
      if (!sourceNode) continue;
      if (sourceNode.type === "input-image" && sourceNode.data.imageUrl) {
        images.push(sourceNode.data.imageUrl);
      } else if (sourceNode.type === "text-node" && sourceNode.data.text) {
        texts.push(sourceNode.data.text);
      } else if (sourceNode.type === "gen-image" || sourceNode.type === "gen-video") {
        const result = nodeResults.get(sourceNode.id);
        if (result == null ? void 0 : result.resourceUrl) {
          images.push(result.resourceUrl);
        }
      }
    }
    return { images, texts };
  }
  async function executeGenNode(runId, node, userId, nodes, edges, nodeResults, taskType) {
    const { upstreamId, aimodelId, prompt } = node.data;
    if (!upstreamId || !aimodelId) {
      return { error: "\u8BF7\u5148\u9009\u62E9\u6A21\u578B" };
    }
    const upstream = await upstreamService.getByIdSimple(upstreamId);
    if (!upstream || upstream.userId !== userId) {
      return { error: "\u65E0\u6548\u7684\u4E0A\u6E38\u914D\u7F6E" };
    }
    const aimodel = await aimodelService.getById(aimodelId);
    if (!aimodel || aimodel.upstreamId !== upstreamId) {
      return { error: "\u65E0\u6548\u7684\u6A21\u578B\u914D\u7F6E" };
    }
    const inputs = getNodeInputs(node.id, nodes, edges, nodeResults);
    const finalPrompt = inputs.texts.length > 0 ? inputs.texts.join("\n") + (prompt ? "\n" + prompt : "") : prompt;
    if (!finalPrompt && inputs.images.length === 0) {
      return { error: "\u8BF7\u8F93\u5165\u63D0\u793A\u8BCD\u6216\u8FDE\u63A5\u8F93\u5165\u8282\u70B9" };
    }
    const blurByDefault = taskType === "image" ? await userSettingsService.get(userId, USER_SETTING_KEYS.GENERAL_BLUR_BY_DEFAULT) : false;
    try {
      const task = await taskService.createTask({
        userId,
        upstreamId,
        aimodelId,
        taskType,
        modelType: aimodel.modelType,
        apiFormat: aimodel.apiFormat,
        modelName: aimodel.modelName,
        prompt: finalPrompt || "",
        images: inputs.images,
        type: "imagine",
        isBlurred: blurByDefault != null ? blurByDefault : true,
        sourceType: "workbench"
      });
      return { taskId: task.id };
    } catch (error) {
      return { error: error.message || "\u521B\u5EFA\u4EFB\u52A1\u5931\u8D25" };
    }
  }
  async function waitForTask(taskId, runId, nodeId) {
    const maxWaitTime = 10 * 60 * 1e3;
    const pollInterval = 2e3;
    const startTime = Date.now();
    while (Date.now() - startTime < maxWaitTime) {
      const task = await db.query.tasks.findFirst({
        where: eq(tasks.id, taskId)
      });
      if (!task) {
        return { error: "\u4EFB\u52A1\u4E0D\u5B58\u5728" };
      }
      if (task.progress) {
        emitSSE(runId, {
          type: "run_node_progress",
          runId,
          nodeId,
          progress: parseInt(task.progress) || 0,
          taskId
        });
      }
      if (task.status === "success") {
        return { resourceUrl: task.resourceUrl || void 0 };
      }
      if (task.status === "failed" || task.status === "cancelled") {
        return { error: task.error || "\u4EFB\u52A1\u5931\u8D25" };
      }
      await new Promise((resolve) => setTimeout(resolve, pollInterval));
    }
    return { error: "\u4EFB\u52A1\u8D85\u65F6" };
  }
  async function startExecution(runId) {
    const runData = await getRun(runId);
    if (!runData) {
      throw new Error("\u8FD0\u884C\u8BB0\u5F55\u4E0D\u5B58\u5728");
    }
    const { run, snapshot } = runData;
    const { nodes, edges } = snapshot;
    await updateRunStatus(runId, "running");
    const sortedNodes = topologicalSort(nodes, edges);
    const nodeResults = /* @__PURE__ */ new Map();
    for (const node of sortedNodes) {
      const [currentRun] = await db.select().from(workflowRuns).where(eq(workflowRuns.id, runId)).limit(1);
      if (!currentRun || currentRun.status === "cancelled") {
        return;
      }
      if (node.type !== "gen-image" && node.type !== "gen-video") {
        continue;
      }
      const taskType = node.type === "gen-image" ? "image" : "video";
      await updateNodeStatus(runId, node.id, "pending");
      await updateNodeStatus(runId, node.id, "processing");
      const result = await executeGenNode(
        runId,
        node,
        run.userId,
        nodes,
        edges,
        nodeResults,
        taskType
      );
      if (result.error) {
        await updateNodeStatus(runId, node.id, "failed", void 0, result.error);
        await updateRunStatus(runId, "failed", `\u8282\u70B9 ${node.id} \u6267\u884C\u5931\u8D25: ${result.error}`);
        return;
      }
      if (result.taskId) {
        await taskService.submitTask(result.taskId);
        const taskResult = await waitForTask(result.taskId, runId, node.id);
        if (taskResult.error) {
          await updateNodeStatus(runId, node.id, "failed", { taskId: result.taskId }, taskResult.error);
          await updateRunStatus(runId, "failed", `\u8282\u70B9 ${node.id} \u6267\u884C\u5931\u8D25: ${taskResult.error}`);
          return;
        }
        await updateNodeStatus(runId, node.id, "success", {
          taskId: result.taskId,
          resourceUrl: taskResult.resourceUrl
        });
        nodeResults.set(node.id, { resourceUrl: taskResult.resourceUrl });
        if (currentRun.runMode === "step") {
          await updateRunStatus(runId, "paused");
          return;
        }
      }
    }
    await updateRunStatus(runId, "completed");
  }
  async function executeNode(runId, nodeId) {
    var _a;
    const runData = await getRun(runId);
    if (!runData) {
      throw new Error("\u8FD0\u884C\u8BB0\u5F55\u4E0D\u5B58\u5728");
    }
    const { run, nodes: runNodes, snapshot } = runData;
    const node = snapshot.nodes.find((n) => n.id === nodeId);
    if (!node) {
      throw new Error("\u8282\u70B9\u4E0D\u5B58\u5728");
    }
    if (node.type !== "gen-image" && node.type !== "gen-video") {
      throw new Error("\u8BE5\u8282\u70B9\u7C7B\u578B\u4E0D\u652F\u6301\u6267\u884C");
    }
    if (run.status === "running") {
      throw new Error("\u5DE5\u4F5C\u6D41\u6B63\u5728\u8FD0\u884C\u4E2D");
    }
    const nodeResults = /* @__PURE__ */ new Map();
    for (const rn of runNodes) {
      if (rn.status === "success" && ((_a = rn.outputs) == null ? void 0 : _a.resourceUrl)) {
        nodeResults.set(rn.nodeId, { resourceUrl: rn.outputs.resourceUrl });
      }
    }
    const taskType = node.type === "gen-image" ? "image" : "video";
    await updateRunStatus(runId, "running");
    await updateNodeStatus(runId, nodeId, "processing");
    const result = await executeGenNode(
      runId,
      node,
      run.userId,
      snapshot.nodes,
      snapshot.edges,
      nodeResults,
      taskType
    );
    if (result.error) {
      await updateNodeStatus(runId, nodeId, "failed", void 0, result.error);
      await updateRunStatus(runId, "failed", `\u8282\u70B9 ${nodeId} \u6267\u884C\u5931\u8D25: ${result.error}`);
      return;
    }
    if (result.taskId) {
      await taskService.submitTask(result.taskId);
      const taskResult = await waitForTask(result.taskId, runId, nodeId);
      if (taskResult.error) {
        await updateNodeStatus(runId, nodeId, "failed", { taskId: result.taskId }, taskResult.error);
        await updateRunStatus(runId, "failed", `\u8282\u70B9 ${nodeId} \u6267\u884C\u5931\u8D25: ${taskResult.error}`);
        return;
      }
      await updateNodeStatus(runId, nodeId, "success", {
        taskId: result.taskId,
        resourceUrl: taskResult.resourceUrl
      });
      const [currentRun] = await db.select().from(workflowRuns).where(eq(workflowRuns.id, runId)).limit(1);
      if ((currentRun == null ? void 0 : currentRun.runMode) === "step") {
        await updateRunStatus(runId, "paused");
      } else {
        await continueExecution(runId);
      }
    }
  }
  async function continueExecution(runId) {
    var _a;
    const runData = await getRun(runId);
    if (!runData) {
      throw new Error("\u8FD0\u884C\u8BB0\u5F55\u4E0D\u5B58\u5728");
    }
    const { run, nodes: runNodes, snapshot } = runData;
    const { nodes, edges } = snapshot;
    await updateRunStatus(runId, "running");
    const sortedNodes = topologicalSort(nodes, edges);
    const nodeResults = /* @__PURE__ */ new Map();
    const completedNodeIds = /* @__PURE__ */ new Set();
    for (const rn of runNodes) {
      if (rn.status === "success") {
        completedNodeIds.add(rn.nodeId);
        if ((_a = rn.outputs) == null ? void 0 : _a.resourceUrl) {
          nodeResults.set(rn.nodeId, { resourceUrl: rn.outputs.resourceUrl });
        }
      }
    }
    for (const node of sortedNodes) {
      if (completedNodeIds.has(node.id)) {
        continue;
      }
      const [currentRun] = await db.select().from(workflowRuns).where(eq(workflowRuns.id, runId)).limit(1);
      if (!currentRun || currentRun.status === "cancelled") {
        return;
      }
      if (node.type !== "gen-image" && node.type !== "gen-video") {
        continue;
      }
      const taskType = node.type === "gen-image" ? "image" : "video";
      await updateNodeStatus(runId, node.id, "pending");
      await updateNodeStatus(runId, node.id, "processing");
      const result = await executeGenNode(
        runId,
        node,
        run.userId,
        nodes,
        edges,
        nodeResults,
        taskType
      );
      if (result.error) {
        await updateNodeStatus(runId, node.id, "failed", void 0, result.error);
        await updateRunStatus(runId, "failed", `\u8282\u70B9 ${node.id} \u6267\u884C\u5931\u8D25: ${result.error}`);
        return;
      }
      if (result.taskId) {
        await taskService.submitTask(result.taskId);
        const taskResult = await waitForTask(result.taskId, runId, node.id);
        if (taskResult.error) {
          await updateNodeStatus(runId, node.id, "failed", { taskId: result.taskId }, taskResult.error);
          await updateRunStatus(runId, "failed", `\u8282\u70B9 ${node.id} \u6267\u884C\u5931\u8D25: ${taskResult.error}`);
          return;
        }
        await updateNodeStatus(runId, node.id, "success", {
          taskId: result.taskId,
          resourceUrl: taskResult.resourceUrl
        });
        nodeResults.set(node.id, { resourceUrl: taskResult.resourceUrl });
        if (currentRun.runMode === "step") {
          await updateRunStatus(runId, "paused");
          return;
        }
      }
    }
    await updateRunStatus(runId, "completed");
  }
  async function retryRun(runId) {
    const runData = await getRun(runId);
    if (!runData) {
      throw new Error("\u8FD0\u884C\u8BB0\u5F55\u4E0D\u5B58\u5728");
    }
    await db.update(workflowRunNodes).set({
      status: "idle",
      outputs: null,
      error: null,
      startedAt: null,
      completedAt: null
    }).where(eq(workflowRunNodes.runId, runId));
    await db.update(workflowRuns).set({
      status: "pending",
      error: null,
      startedAt: null,
      completedAt: null
    }).where(eq(workflowRuns.id, runId));
    emitSSE(runId, { type: "run_status", runId, status: "pending" });
    await startExecution(runId);
  }
  async function cancelRun(runId) {
    await updateRunStatus(runId, "cancelled");
  }
  return {
    createRun,
    getRun,
    updateRunStatus,
    updateRunMode,
    updateNodeStatus,
    startExecution,
    executeNode,
    continueExecution,
    retryRun,
    cancelRun
  };
}

export { addSSESubscriber as a, removeSSESubscriber as r, useWorkflowRunService as u };
//# sourceMappingURL=workflowRun.mjs.map
