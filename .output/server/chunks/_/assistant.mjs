import { b as db, n as assistants, o as conversations } from '../nitro/nitro.mjs';
import { and, eq, sql, desc } from 'drizzle-orm';

function useAssistantService() {
  async function listByUser(userId) {
    const result = await db.select({
      id: assistants.id,
      userId: assistants.userId,
      name: assistants.name,
      description: assistants.description,
      avatar: assistants.avatar,
      systemPrompt: assistants.systemPrompt,
      upstreamId: assistants.upstreamId,
      aimodelId: assistants.aimodelId,
      modelName: assistants.modelName,
      isDefault: assistants.isDefault,
      createdAt: assistants.createdAt,
      conversationCount: sql`count(${conversations.id})`.as("conversationCount")
    }).from(assistants).leftJoin(conversations, eq(conversations.assistantId, assistants.id)).where(eq(assistants.userId, userId)).groupBy(assistants.id).orderBy(desc(assistants.createdAt));
    return result.map((row) => ({
      ...row,
      conversationCount: Number(row.conversationCount)
    }));
  }
  async function getById(id) {
    return db.query.assistants.findFirst({
      where: eq(assistants.id, id)
    });
  }
  async function getDefault(userId) {
    return db.query.assistants.findFirst({
      where: and(eq(assistants.userId, userId), eq(assistants.isDefault, true))
    });
  }
  async function create(data) {
    var _a, _b, _c, _d, _e, _f, _g;
    if (data.isDefault) {
      await db.update(assistants).set({ isDefault: false }).where(eq(assistants.userId, data.userId));
    }
    const [assistant] = await db.insert(assistants).values({
      userId: data.userId,
      name: data.name,
      description: (_a = data.description) != null ? _a : null,
      avatar: (_b = data.avatar) != null ? _b : null,
      systemPrompt: (_c = data.systemPrompt) != null ? _c : null,
      upstreamId: (_d = data.upstreamId) != null ? _d : null,
      aimodelId: (_e = data.aimodelId) != null ? _e : null,
      modelName: (_f = data.modelName) != null ? _f : null,
      isDefault: (_g = data.isDefault) != null ? _g : false
    }).returning();
    return assistant;
  }
  async function update(id, userId, data) {
    if (data.isDefault) {
      await db.update(assistants).set({ isDefault: false }).where(eq(assistants.userId, userId));
    }
    const [updated] = await db.update(assistants).set(data).where(and(eq(assistants.id, id), eq(assistants.userId, userId))).returning();
    return updated;
  }
  async function remove(id, userId) {
    const result = await db.delete(assistants).where(and(eq(assistants.id, id), eq(assistants.userId, userId))).returning();
    return result.length > 0;
  }
  async function ensureDefault(userId) {
    let defaultAssistant = await getDefault(userId);
    if (!defaultAssistant) {
      const allAssistants = await listByUser(userId);
      if (allAssistants.length === 0) {
        defaultAssistant = await create({
          userId,
          name: "\u9ED8\u8BA4\u52A9\u624B",
          description: "\u667A\u80FD\u52A9\u7406\uFF0C\u53EF\u4EE5\u5E2E\u52A9\u4F60\u5B8C\u6210\u5404\u79CD\u4EFB\u52A1",
          isDefault: true
        });
      } else {
        defaultAssistant = await update(allAssistants[0].id, userId, { isDefault: true });
      }
    }
    return defaultAssistant;
  }
  return {
    listByUser,
    getById,
    getDefault,
    create,
    update,
    remove,
    ensureDefault
  };
}

export { useAssistantService as u };
//# sourceMappingURL=assistant.mjs.map
