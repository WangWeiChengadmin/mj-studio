import { b as db, p as upstreams, q as aimodels } from '../nitro/nitro.mjs';
import { eq, and, isNull, asc } from 'drizzle-orm';

function useUpstreamService() {
  async function listByUser(userId) {
    const upstreamList = await db.query.upstreams.findMany({
      where: eq(upstreams.userId, userId),
      orderBy: [asc(upstreams.sortOrder), asc(upstreams.id)]
    });
    const result = [];
    for (const upstream of upstreamList) {
      const models = await db.query.aimodels.findMany({
        where: and(
          eq(aimodels.upstreamId, upstream.id),
          isNull(aimodels.deletedAt)
        )
      });
      result.push({ ...upstream, aimodels: models });
    }
    return result;
  }
  async function getById(id) {
    const upstream = await db.query.upstreams.findFirst({
      where: eq(upstreams.id, id)
    });
    if (!upstream) return void 0;
    const models = await db.query.aimodels.findMany({
      where: and(
        eq(aimodels.upstreamId, id),
        isNull(aimodels.deletedAt)
      )
    });
    return { ...upstream, aimodels: models };
  }
  async function getByIdSimple(id) {
    return db.query.upstreams.findFirst({
      where: eq(upstreams.id, id)
    });
  }
  async function create(data) {
    var _a, _b, _c;
    const apiKeys = data.apiKeys || [{ name: "default", key: data.apiKey }];
    const [upstream] = await db.insert(upstreams).values({
      userId: data.userId,
      name: data.name,
      baseUrl: data.baseUrl,
      apiKey: data.apiKey,
      apiKeys,
      remark: (_a = data.remark) != null ? _a : null,
      sortOrder: (_b = data.sortOrder) != null ? _b : 999,
      upstreamPlatform: data.upstreamPlatform,
      userApiKey: (_c = data.userApiKey) != null ? _c : null
    }).returning();
    return upstream;
  }
  async function update(id, userId, data) {
    const [updated] = await db.update(upstreams).set(data).where(and(eq(upstreams.id, id), eq(upstreams.userId, userId))).returning();
    return updated;
  }
  async function remove(id, userId) {
    await db.update(aimodels).set({ deletedAt: /* @__PURE__ */ new Date() }).where(eq(aimodels.upstreamId, id));
    const result = await db.delete(upstreams).where(and(eq(upstreams.id, id), eq(upstreams.userId, userId))).returning();
    return result.length > 0;
  }
  function getApiKey(upstream, keyName) {
    const targetName = keyName || "default";
    if (upstream.apiKeys && upstream.apiKeys.length > 0) {
      const found = upstream.apiKeys.find((k) => k.name === targetName);
      if (found) return found.key;
      return upstream.apiKeys[0].key;
    }
    return upstream.apiKey;
  }
  async function updateUpstreamInfo(id, upstreamInfo) {
    await db.update(upstreams).set({ upstreamInfo }).where(eq(upstreams.id, id));
  }
  return {
    listByUser,
    getById,
    getByIdSimple,
    create,
    update,
    remove,
    getApiKey,
    updateUpstreamInfo
  };
}

export { useUpstreamService as u };
//# sourceMappingURL=upstream.mjs.map
