import { b as db, C as messages, o as conversations } from '../nitro/nitro.mjs';
import { inArray, eq, and, desc } from 'drizzle-orm';

function useConversationService() {
  async function listByAssistant(userId, assistantId) {
    return db.query.conversations.findMany({
      where: and(eq(conversations.userId, userId), eq(conversations.assistantId, assistantId)),
      orderBy: [desc(conversations.updatedAt)]
    });
  }
  async function getById(id) {
    return db.query.conversations.findFirst({
      where: eq(conversations.id, id)
    });
  }
  async function getWithMessages(id) {
    const conversation = await getById(id);
    if (!conversation) return void 0;
    const messageList = await db.query.messages.findMany({
      where: eq(messages.conversationId, id),
      orderBy: [messages.sortId, messages.id]
      // 优先按 sortId 排序，sortId 为空时按 id
    });
    return { conversation, messages: messageList };
  }
  async function create(data) {
    const now = /* @__PURE__ */ new Date();
    const [conversation] = await db.insert(conversations).values({
      userId: data.userId,
      assistantId: data.assistantId,
      title: data.title,
      createdAt: now,
      updatedAt: now
    }).returning();
    return conversation;
  }
  async function updateTitle(id, userId, title) {
    const [updated] = await db.update(conversations).set({ title, updatedAt: /* @__PURE__ */ new Date() }).where(and(eq(conversations.id, id), eq(conversations.userId, userId))).returning();
    return updated;
  }
  async function touch(id) {
    await db.update(conversations).set({ updatedAt: /* @__PURE__ */ new Date() }).where(eq(conversations.id, id));
  }
  async function remove(id, userId) {
    const conversation = await getById(id);
    if (!conversation || conversation.userId !== userId) {
      return false;
    }
    await db.delete(messages).where(eq(messages.conversationId, id));
    const result = await db.delete(conversations).where(eq(conversations.id, id)).returning();
    return result.length > 0;
  }
  async function addMessage(data) {
    var _a, _b, _c, _d, _e, _f, _g;
    const [message] = await db.insert(messages).values({
      conversationId: data.conversationId,
      role: data.role,
      content: data.content,
      files: (_a = data.files) != null ? _a : null,
      upstreamId: (_b = data.upstreamId) != null ? _b : null,
      aimodelId: (_c = data.aimodelId) != null ? _c : null,
      modelName: (_d = data.modelName) != null ? _d : null,
      mark: (_e = data.mark) != null ? _e : null,
      status: (_f = data.status) != null ? _f : null,
      sortId: (_g = data.sortId) != null ? _g : null
    }).returning();
    if (!data.sortId) {
      await db.update(messages).set({ sortId: message.id }).where(eq(messages.id, message.id));
      message.sortId = message.id;
    }
    await touch(data.conversationId);
    return message;
  }
  async function updateMessageSortId(messageId, sortId) {
    await db.update(messages).set({ sortId }).where(eq(messages.id, messageId));
  }
  async function updateMessageStatus(messageId, status) {
    await db.update(messages).set({ status }).where(eq(messages.id, messageId));
  }
  async function updateMessageContentAndStatus(messageId, content, status, mark) {
    const updateData = { content, status };
    if (mark !== void 0) {
      updateData.mark = mark;
    }
    await db.update(messages).set(updateData).where(eq(messages.id, messageId));
  }
  async function getMessageById(id) {
    return db.query.messages.findFirst({
      where: eq(messages.id, id)
    });
  }
  async function removeMessage(messageId, userId) {
    const message = await db.query.messages.findFirst({
      where: eq(messages.id, messageId)
    });
    if (!message) return false;
    const conversation = await getById(message.conversationId);
    if (!conversation || conversation.userId !== userId) {
      return false;
    }
    const result = await db.delete(messages).where(eq(messages.id, messageId)).returning();
    return result.length > 0;
  }
  async function removeMessagesUntil(messageId, userId) {
    const message = await getMessageById(messageId);
    if (!message) return null;
    const conversation = await getById(message.conversationId);
    if (!conversation || conversation.userId !== userId) {
      return null;
    }
    const data = await getWithMessages(message.conversationId);
    if (!data) return null;
    const targetIndex = data.messages.findIndex((m) => m.id === messageId);
    if (targetIndex < 0) return null;
    const messageIdsToDelete = data.messages.slice(0, targetIndex + 1).map((m) => m.id);
    const result = await db.delete(messages).where(inArray(messages.id, messageIdsToDelete)).returning();
    if (result.length === 0) return null;
    return {
      conversationId: message.conversationId,
      messageIds: messageIdsToDelete
    };
  }
  function generateTitle(content) {
    const title = content.replace(/\n/g, " ").trim();
    if (title.length <= 20) {
      return title;
    }
    return title.slice(0, 20) + "...";
  }
  async function fork(messageId, userId) {
    var _a, _b, _c, _d, _e, _f;
    const message = await getMessageById(messageId);
    if (!message) return null;
    const originalConversation = await getById(message.conversationId);
    if (!originalConversation || originalConversation.userId !== userId) {
      return null;
    }
    const data = await getWithMessages(message.conversationId);
    if (!data) return null;
    const targetIndex = data.messages.findIndex((m) => m.id === messageId);
    if (targetIndex < 0) return null;
    const messagesToCopy = data.messages.slice(0, targetIndex + 1);
    const messageNumber = targetIndex + 1;
    const newConversation = await create({
      userId,
      assistantId: originalConversation.assistantId,
      title: `#\u{1F500}${messageNumber} ${originalConversation.title}`
    });
    const newMessages = [];
    for (const msg of messagesToCopy) {
      const newMsg = await addMessage({
        conversationId: newConversation.id,
        role: msg.role,
        content: msg.content,
        files: (_a = msg.files) != null ? _a : void 0,
        upstreamId: (_b = msg.upstreamId) != null ? _b : void 0,
        aimodelId: (_c = msg.aimodelId) != null ? _c : void 0,
        modelName: (_d = msg.modelName) != null ? _d : void 0,
        mark: (_e = msg.mark) != null ? _e : void 0,
        status: (_f = msg.status) != null ? _f : void 0
      });
      newMessages.push(newMsg);
    }
    return { conversation: newConversation, messages: newMessages };
  }
  return {
    listByAssistant,
    getById,
    getWithMessages,
    create,
    updateTitle,
    touch,
    remove,
    addMessage,
    updateMessageSortId,
    updateMessageStatus,
    updateMessageContentAndStatus,
    getMessageById,
    removeMessage,
    removeMessagesUntil,
    generateTitle,
    fork
  };
}

export { useConversationService as u };
//# sourceMappingURL=conversation.mjs.map
