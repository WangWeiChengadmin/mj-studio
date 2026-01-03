import { u as useConversationService } from './conversation.mjs';
import { u as useAssistantService } from './assistant.mjs';
import { u as useUpstreamService } from './upstream.mjs';
import { u as useAimodelService } from './aimodel.mjs';
import { c as createChatService } from './chat.mjs';
import { c as createClaudeChatService } from './claude.mjs';
import { s as startStreamingSession, u as updateSessionStatus, a as appendStreamingContent, e as endStreamingSession, b as getSessionAbortController, g as getStreamingSession } from './streamingCache.mjs';
import { e as emitToUser } from './globalEvents.mjs';

async function startStreamingTask(params) {
  const {
    messageId,
    conversationId,
    userId,
    userContent,
    userFiles,
    isCompressRequest = false,
    responseMark,
    responseSortId
  } = params;
  const conversationService = useConversationService();
  const assistantService = useAssistantService();
  const upstreamService = useUpstreamService();
  const aimodelService = useAimodelService();
  const abortController = new AbortController();
  startStreamingSession(messageId, conversationId, userId, abortController);
  try {
    const result = await conversationService.getWithMessages(conversationId);
    if (!result) {
      throw new Error("\u5BF9\u8BDD\u4E0D\u5B58\u5728");
    }
    const assistant = await assistantService.getById(result.conversation.assistantId);
    if (!assistant) {
      throw new Error("\u52A9\u624B\u4E0D\u5B58\u5728");
    }
    if (!assistant.upstreamId || !assistant.aimodelId || !assistant.modelName) {
      throw new Error("\u8BF7\u5148\u4E3A\u52A9\u624B\u914D\u7F6E\u6A21\u578B");
    }
    const upstream = await upstreamService.getByIdSimple(assistant.upstreamId);
    if (!upstream) {
      throw new Error("\u4E0A\u6E38\u914D\u7F6E\u4E0D\u5B58\u5728");
    }
    const aimodel = await aimodelService.getById(assistant.aimodelId);
    if (!aimodel) {
      throw new Error("\u6A21\u578B\u914D\u7F6E\u4E0D\u5B58\u5728");
    }
    let historyMessages = result.messages;
    if (isCompressRequest) {
      const compressRequestIndex = result.messages.findIndex((m) => m.mark === "compress-request");
      if (compressRequestIndex > 0) {
        let startIndex = 0;
        for (let i = compressRequestIndex - 1; i >= 0; i--) {
          const msg = result.messages[i];
          if (msg && msg.mark === "compress-response") {
            startIndex = i;
            break;
          }
        }
        historyMessages = result.messages.slice(startIndex, compressRequestIndex);
      }
    } else {
      for (let i = result.messages.length - 1; i >= 0; i--) {
        const msg = result.messages[i];
        if (msg && msg.mark === "compress-response") {
          historyMessages = result.messages.slice(i);
          break;
        }
      }
      historyMessages = historyMessages.filter(
        (m) => m.mark !== "compress-request" && m.id !== messageId
      );
    }
    await conversationService.updateMessageStatus(messageId, "pending");
    updateSessionStatus(messageId, "pending");
    const apiFormat = aimodel.apiFormat;
    const keyName = aimodel.keyName;
    const chatService = apiFormat === "claude" ? createClaudeChatService(upstream, keyName) : createChatService(upstream, keyName);
    const logContext = {
      type: isCompressRequest ? "\u538B\u7F29" : "\u804A\u5929",
      conversationId,
      conversationTitle: result.conversation.title,
      keyName
    };
    const generator = chatService.chatStream(
      assistant.modelName,
      assistant.systemPrompt,
      historyMessages,
      userContent,
      userFiles,
      abortController.signal,
      logContext
    );
    let fullContent = "";
    let firstChunkReceived = false;
    const requestStartTime = Date.now();
    let updatedEstimatedTime = null;
    const DELTA_BUFFER_INTERVAL = 300;
    let deltaBuffer = "";
    let deltaBufferTimer = null;
    const flushDeltaBuffer = async () => {
      if (deltaBuffer) {
        const content = deltaBuffer;
        deltaBuffer = "";
        await emitToUser(userId, "chat.message.delta", {
          conversationId,
          messageId,
          delta: content
        });
      }
      deltaBufferTimer = null;
    };
    for await (const chunk of generator) {
      if (abortController.signal.aborted) {
        break;
      }
      if (chunk.content) {
        fullContent += chunk.content;
        if (!firstChunkReceived) {
          firstChunkReceived = true;
          await conversationService.updateMessageStatus(messageId, "streaming");
          updateSessionStatus(messageId, "streaming");
          const firstChunkTime = (Date.now() - requestStartTime) / 1e3;
          if (assistant.upstreamId && assistant.modelName) {
            try {
              updatedEstimatedTime = await aimodelService.updateEstimatedTime(
                assistant.upstreamId,
                assistant.modelName,
                firstChunkTime
              );
            } catch (err) {
              console.error("\u66F4\u65B0\u9884\u8BA1\u9996\u5B57\u65F6\u957F\u5931\u8D25:", err);
            }
          }
        }
        appendStreamingContent(messageId, chunk.content);
        deltaBuffer += chunk.content;
        if (!deltaBufferTimer) {
          deltaBufferTimer = setTimeout(flushDeltaBuffer, DELTA_BUFFER_INTERVAL);
        }
      }
      if (chunk.done) {
        break;
      }
    }
    if (deltaBufferTimer) {
      clearTimeout(deltaBufferTimer);
      deltaBufferTimer = null;
    }
    if (abortController.signal.aborted) {
      const cachedContent = endStreamingSession(messageId);
      const contentToSave = cachedContent || fullContent;
      await conversationService.updateMessageContentAndStatus(messageId, contentToSave, "stopped", responseMark);
      await emitToUser(userId, "chat.message.done", {
        conversationId,
        messageId,
        status: "stopped",
        ...updatedEstimatedTime !== null && assistant.upstreamId && assistant.aimodelId ? {
          estimatedTime: updatedEstimatedTime,
          upstreamId: assistant.upstreamId,
          aimodelId: assistant.aimodelId
        } : {}
      });
      return;
    }
    await flushDeltaBuffer();
    await conversationService.updateMessageContentAndStatus(messageId, fullContent, "completed", responseMark);
    endStreamingSession(messageId);
    await emitToUser(userId, "chat.message.done", {
      conversationId,
      messageId,
      status: "completed",
      ...updatedEstimatedTime !== null && assistant.upstreamId && assistant.aimodelId ? {
        estimatedTime: updatedEstimatedTime,
        upstreamId: assistant.upstreamId,
        aimodelId: assistant.aimodelId
      } : {}
    });
  } catch (error) {
    const errorMessage = error.message || "\u751F\u6210\u5931\u8D25";
    endStreamingSession(messageId);
    await conversationService.updateMessageContentAndStatus(
      messageId,
      errorMessage,
      "failed",
      "error"
    );
    await emitToUser(userId, "chat.message.done", {
      conversationId,
      messageId,
      status: "failed",
      error: errorMessage
    });
  }
}
async function stopStreamingTask(messageId) {
  const conversationService = useConversationService();
  const abortController = getSessionAbortController(messageId);
  if (abortController) {
    abortController.abort();
  }
  const session = getStreamingSession(messageId);
  if (!session) {
    return false;
  }
  const cachedContent = endStreamingSession(messageId);
  await conversationService.updateMessageContentAndStatus(messageId, cachedContent, "stopped");
  await emitToUser(session.userId, "chat.message.done", {
    conversationId: session.conversationId,
    messageId,
    status: "stopped"
  });
  return true;
}

export { stopStreamingTask as a, startStreamingTask as s };
//# sourceMappingURL=streamingTask.mjs.map
