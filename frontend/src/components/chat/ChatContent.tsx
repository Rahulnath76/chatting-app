import { useSelector, useDispatch } from "react-redux";
import type { AppDispatch, RootState } from "../../store/store";
import ChatInput from "./ChatInput";
import MessageContent from "./MessageContent";
import { useCallback, useEffect, useRef } from "react";
import {
  getAllMessages,
  loadMoreMessages,
} from "../../lib/operations/message.api";
import { isNewMessage } from "../../store/slices/chatSlice";
import { useMemo } from "react";
import Loading from "../ui/Loading";

const ChatContent = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { selectedChat, messages, isLoading } = useSelector(
    (state: RootState) => state.chat
  );

  const chatId = selectedChat?.userId;
  const chatMessagesState = chatId ? messages[chatId] : undefined;
  const allMessages = useMemo(
    () => chatMessagesState?.messages || [],
    [chatMessagesState?.messages]
  );
  const hasMore = chatMessagesState?.hasMore || false;
  const newMessage = chatMessagesState?.newMessage || false;
  const lastFetchedAt = chatMessagesState?.lastFetchedAt ?? 0;
  const hasCachedMessages = !!chatMessagesState?.messages?.length;
  const lastFetchAttemptRef = useRef<{ chatId: string; at: number } | null>(
    null
  );
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const messageContainerRef = useRef<HTMLDivElement>(null);
  const scrollHeightBeforeFetch = useRef(0);

  useEffect(() => {
    if (!chatId) return;

    const isStale = Date.now() - lastFetchedAt > 60 * 1000;

    if (!hasCachedMessages) {
      if (isLoading) return;
      const lastAttempt = lastFetchAttemptRef.current;
      if (lastAttempt?.chatId === chatId && Date.now() - lastAttempt.at < 1000) {
        return;
      }
      lastFetchAttemptRef.current = { chatId, at: Date.now() };
      dispatch(getAllMessages(chatId));
      return;
    }

    if (isStale && !isLoading) {
      dispatch(getAllMessages(chatId, 1, { silent: true }));
    }
  }, [chatId, hasCachedMessages, lastFetchedAt, dispatch, isLoading]);

  useEffect(() => {
    if (
      messagesEndRef.current &&
      allMessages.length > 0 &&
      newMessage &&
      selectedChat?.userId &&
      chatId
    ) {
      messagesEndRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
      dispatch(isNewMessage({ chatId, value: false }));
    }
  }, [newMessage, selectedChat?.userId, allMessages.length, chatId, dispatch]);

  useEffect(() => {
    if (!messageContainerRef.current || scrollHeightBeforeFetch.current === 0)
      return;

    const container = messageContainerRef.current;
    const newScrollHeight = container.scrollHeight;
    const scrollDiff = newScrollHeight - scrollHeightBeforeFetch.current;

    container.scrollTop = scrollDiff;
    scrollHeightBeforeFetch.current = 0;
  }, [allMessages.length]);

  const handleScroll = useCallback(() => {
    if (!messageContainerRef.current || isLoading || !hasMore || !chatId) {
      return;
    }

    const container = messageContainerRef.current;
    const { scrollTop } = container;

    if (scrollTop <= 20) {
      scrollHeightBeforeFetch.current = container.scrollHeight;
      dispatch(loadMoreMessages(chatId));
    }
  }, [isLoading, hasMore, chatId, dispatch]);

  return (
    <div className="flex flex-col h-full">
      <div
        ref={messageContainerRef}
        className="p-2 flex-1 flex flex-col gap-6 overflow-y-scroll custom-scrollbar"
        onScroll={handleScroll}
      >
        {!allMessages.length ? (
          isLoading ? (
            <div className="flex-1 flex items-center justify-center">
              <Loading message="Loading conversation..." />
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center text-center text-gray-400 px-4">
              <p className="text-base md:text-lg">
                No messages yet. Start the conversation by sending a message.
              </p>
            </div>
          )
        ) : (
          <>
            {isLoading && (
              <div className="flex justify-center pt-2">
                <Loading message="Loading more..." />
              </div>
            )}
            {allMessages.map((message, index) => (
              <MessageContent key={message._id || index} message={message} />
            ))}
          </>
        )}
        <span ref={messagesEndRef} className="h-0 overflow-hidden" />
      </div>

      <ChatInput />
    </div>
  );
};

export default ChatContent;
