import { b as db, D as tasks, G as workflows, d as defineEventHandler, r as requireAuth, g as getRouterParam, c as createError, a as readBody } from '../../../../nitro/nitro.mjs';
import { readFile } from 'fs/promises';
import { join } from 'path';
import { eq, and, isNull } from 'drizzle-orm';
import { u as useTaskService } from '../../../../_/task.mjs';
import { u as useAimodelService } from '../../../../_/aimodel.mjs';
import { u as useUpstreamService } from '../../../../_/upstream.mjs';
import { u as useUserSettingsService } from '../../../../_/userSettings.mjs';
import { U as USER_SETTING_KEYS } from '../../../../_/constants.mjs';
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
import 'drizzle-orm/better-sqlite3/migrator';
import 'node:url';
import '@iconify/utils';
import 'consola';
import '../../../../_/file.mjs';
import '../../../../_/globalEvents.mjs';

function useWorkflowService() {
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
  function getNodeInputs(nodeId, ctx) {
    const images = [];
    const texts = [];
    const incomingEdges = ctx.edges.filter((e) => e.target === nodeId);
    for (const edge of incomingEdges) {
      const sourceNode = ctx.nodes.find((n) => n.id === edge.source);
      if (!sourceNode) continue;
      if (sourceNode.type === "input-image" && sourceNode.data.imageUrl) {
        images.push(sourceNode.data.imageUrl);
      } else if (sourceNode.type === "text-node" && sourceNode.data.text) {
        texts.push(sourceNode.data.text);
      } else if (sourceNode.type === "gen-image" || sourceNode.type === "gen-video") {
        const result = ctx.nodeResults.get(sourceNode.id);
        if (result == null ? void 0 : result.resultUrl) {
          images.push(result.resultUrl);
        }
      }
    }
    return { images, texts };
  }
  async function executeGenNode(node, ctx, taskType) {
    const { upstreamId, aimodelId, prompt } = node.data;
    if (!upstreamId || !aimodelId) {
      return {
        nodeId: node.id,
        status: "failed",
        error: "\u8BF7\u5148\u9009\u62E9\u6A21\u578B"
      };
    }
    const upstream = await upstreamService.getByIdSimple(upstreamId);
    if (!upstream || upstream.userId !== ctx.userId) {
      return {
        nodeId: node.id,
        status: "failed",
        error: "\u65E0\u6548\u7684\u4E0A\u6E38\u914D\u7F6E"
      };
    }
    const aimodel = await aimodelService.getById(aimodelId);
    if (!aimodel || aimodel.upstreamId !== upstreamId) {
      return {
        nodeId: node.id,
        status: "failed",
        error: "\u65E0\u6548\u7684\u6A21\u578B\u914D\u7F6E"
      };
    }
    const inputs = getNodeInputs(node.id, ctx);
    const finalPrompt = inputs.texts.length > 0 ? inputs.texts.join("\n") + (prompt ? "\n" + prompt : "") : prompt;
    if (!finalPrompt && inputs.images.length === 0) {
      return {
        nodeId: node.id,
        status: "failed",
        error: "\u8BF7\u8F93\u5165\u63D0\u793A\u8BCD\u6216\u8FDE\u63A5\u8F93\u5165\u8282\u70B9"
      };
    }
    const blurByDefault = taskType === "image" ? await userSettingsService.get(ctx.userId, USER_SETTING_KEYS.GENERAL_BLUR_BY_DEFAULT) : false;
    try {
      const task = await taskService.createTask({
        userId: ctx.userId,
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
      taskService.submitTask(task.id).catch((err) => {
        console.error("\u5DE5\u4F5C\u6D41\u8282\u70B9\u4EFB\u52A1\u63D0\u4EA4\u5931\u8D25:", err);
      });
      return {
        nodeId: node.id,
        status: "processing",
        taskId: task.id
      };
    } catch (error) {
      return {
        nodeId: node.id,
        status: "failed",
        error: error.message || "\u521B\u5EFA\u4EFB\u52A1\u5931\u8D25"
      };
    }
  }
  async function runNode(workflowId, nodeId, userId) {
    const { data } = await loadWorkflowData(workflowId, userId);
    const node = data.nodes.find((n) => n.id === nodeId);
    if (!node) {
      throw new Error("\u8282\u70B9\u4E0D\u5B58\u5728");
    }
    const ctx = {
      userId,
      workflowId,
      nodes: data.nodes,
      edges: data.edges,
      nodeResults: /* @__PURE__ */ new Map()
    };
    if (node.type === "gen-image") {
      return executeGenNode(node, ctx, "image");
    } else if (node.type === "gen-video") {
      return executeGenNode(node, ctx, "video");
    } else {
      throw new Error("\u8BE5\u8282\u70B9\u7C7B\u578B\u4E0D\u652F\u6301\u6267\u884C");
    }
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
  async function runWorkflow(workflowId, userId) {
    const { data } = await loadWorkflowData(workflowId, userId);
    const ctx = {
      userId,
      workflowId,
      nodes: data.nodes,
      edges: data.edges,
      nodeResults: /* @__PURE__ */ new Map()
    };
    const sortedNodes = topologicalSort(data.nodes, data.edges);
    const results = [];
    for (const node of sortedNodes) {
      let result = null;
      if (node.type === "gen-image") {
        result = await executeGenNode(node, ctx, "image");
      } else if (node.type === "gen-video") {
        result = await executeGenNode(node, ctx, "video");
      }
      if (result) {
        results.push(result);
        ctx.nodeResults.set(node.id, result);
      }
    }
    return results;
  }
  async function getNodeTaskStatus(taskId) {
    const task = await db.query.tasks.findFirst({
      where: eq(tasks.id, taskId)
    });
    if (!task) return null;
    return {
      status: task.status,
      progress: task.progress || void 0,
      resourceUrl: task.resourceUrl || void 0,
      error: task.error || void 0
    };
  }
  return {
    loadWorkflowData,
    runNode,
    runWorkflow,
    getNodeTaskStatus,
    getNodeInputs,
    topologicalSort
  };
}

const runNode_post = defineEventHandler(async (event) => {
  const { user } = await requireAuth(event);
  const workflowId = Number(getRouterParam(event, "id"));
  if (!workflowId || isNaN(workflowId)) {
    throw createError({ statusCode: 400, message: "\u65E0\u6548\u7684\u5DE5\u4F5C\u6D41ID" });
  }
  const body = await readBody(event);
  if (!body.nodeId) {
    throw createError({ statusCode: 400, message: "\u8BF7\u6307\u5B9A\u8981\u6267\u884C\u7684\u8282\u70B9" });
  }
  const workflowService = useWorkflowService();
  try {
    const result = await workflowService.runNode(workflowId, body.nodeId, user.id);
    return {
      success: true,
      data: result
    };
  } catch (error) {
    throw createError({
      statusCode: 400,
      message: error.message || "\u8282\u70B9\u6267\u884C\u5931\u8D25"
    });
  }
});

export { runNode_post as default };
//# sourceMappingURL=run-node.post.mjs.map
