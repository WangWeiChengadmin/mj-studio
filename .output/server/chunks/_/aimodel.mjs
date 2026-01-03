import { b as db, q as aimodels, p as upstreams } from '../nitro/nitro.mjs';
import { eq, and, isNull } from 'drizzle-orm';

function useAimodelService() {
  async function listByUpstream(upstreamId) {
    return db.query.aimodels.findMany({
      where: eq(aimodels.upstreamId, upstreamId)
    });
  }
  async function getById(id) {
    return db.query.aimodels.findFirst({
      where: eq(aimodels.id, id)
    });
  }
  async function findByModelName(upstreamId, modelName) {
    return db.query.aimodels.findFirst({
      where: and(
        eq(aimodels.upstreamId, upstreamId),
        eq(aimodels.modelName, modelName)
      )
    });
  }
  async function findByModelType(upstreamId, modelType) {
    return db.query.aimodels.findFirst({
      where: and(
        eq(aimodels.upstreamId, upstreamId),
        eq(aimodels.modelType, modelType)
      )
    });
  }
  async function findByUserAndModelName(userId, modelName, category) {
    const userUpstreams = await db.query.upstreams.findMany({
      where: eq(upstreams.userId, userId)
    });
    for (const upstream of userUpstreams) {
      let query = and(
        eq(aimodels.upstreamId, upstream.id),
        eq(aimodels.modelName, modelName)
      );
      if (category) {
        query = and(query, eq(aimodels.category, category));
      }
      const aimodel = await db.query.aimodels.findFirst({
        where: query
      });
      if (aimodel) {
        return { upstream, aimodel };
      }
    }
    return void 0;
  }
  async function create(data) {
    var _a, _b;
    const [aimodel] = await db.insert(aimodels).values({
      upstreamId: data.upstreamId,
      category: data.category,
      modelType: data.modelType,
      apiFormat: data.apiFormat,
      modelName: data.modelName,
      estimatedTime: (_a = data.estimatedTime) != null ? _a : 60,
      keyName: (_b = data.keyName) != null ? _b : "default"
    }).returning();
    return aimodel;
  }
  async function createMany(data) {
    if (data.length === 0) return [];
    const values = data.map((d) => {
      var _a, _b;
      return {
        upstreamId: d.upstreamId,
        category: d.category,
        modelType: d.modelType,
        apiFormat: d.apiFormat,
        modelName: d.modelName,
        estimatedTime: (_a = d.estimatedTime) != null ? _a : 60,
        keyName: (_b = d.keyName) != null ? _b : "default"
      };
    });
    return db.insert(aimodels).values(values).returning();
  }
  async function update(id, data) {
    const [updated] = await db.update(aimodels).set(data).where(eq(aimodels.id, id)).returning();
    return updated;
  }
  async function updateEstimatedTime(upstreamId, modelName, actualTime) {
    const newEstimatedTime = Math.round(actualTime);
    await db.update(aimodels).set({ estimatedTime: newEstimatedTime }).where(and(
      eq(aimodels.upstreamId, upstreamId),
      eq(aimodels.modelName, modelName)
    ));
    return newEstimatedTime;
  }
  async function remove(id) {
    const result = await db.update(aimodels).set({ deletedAt: /* @__PURE__ */ new Date() }).where(eq(aimodels.id, id)).returning();
    return result.length > 0;
  }
  async function removeByUpstream(upstreamId) {
    const result = await db.delete(aimodels).where(eq(aimodels.upstreamId, upstreamId)).returning();
    return result.length;
  }
  async function syncByUpstream(upstreamId, models) {
    var _a, _b;
    const existing = await db.query.aimodels.findMany({
      where: eq(aimodels.upstreamId, upstreamId)
    });
    new Set(existing.map((m) => m.id));
    const inputIds = new Set(models.filter((m) => m.id).map((m) => m.id));
    for (const model of models.filter((m) => m.id)) {
      await db.update(aimodels).set({
        category: model.category,
        modelType: model.modelType,
        apiFormat: model.apiFormat,
        modelName: model.modelName,
        estimatedTime: (_a = model.estimatedTime) != null ? _a : 60,
        keyName: (_b = model.keyName) != null ? _b : "default",
        deletedAt: null
        // 如果之前被软删除，恢复它
      }).where(eq(aimodels.id, model.id));
    }
    const newModels = models.filter((m) => !m.id);
    if (newModels.length > 0) {
      await createMany(newModels.map((m) => ({ ...m, upstreamId })));
    }
    const toDelete = existing.filter((m) => !inputIds.has(m.id) && !m.deletedAt);
    for (const model of toDelete) {
      await db.update(aimodels).set({ deletedAt: /* @__PURE__ */ new Date() }).where(eq(aimodels.id, model.id));
    }
    return db.query.aimodels.findMany({
      where: and(
        eq(aimodels.upstreamId, upstreamId),
        isNull(aimodels.deletedAt)
      )
    });
  }
  return {
    listByUpstream,
    getById,
    findByModelName,
    findByModelType,
    findByUserAndModelName,
    create,
    createMany,
    update,
    updateEstimatedTime,
    remove,
    removeByUpstream,
    syncByUpstream
  };
}

export { useAimodelService as u };
//# sourceMappingURL=aimodel.mjs.map
