import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import ChatInput from "./ChatInput";
import MessageContent from "./MessageContent";
import { useEffect, useRef } from "react";

const ChatContent = () => {
  const { messages } = useSelector((state: RootState) => state.chat);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (messagesEndRef.current && messages) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="flex flex-col h-full">
      <div className="p-2 flex-1 flex flex-col gap-6 overflow-y-scroll custom-scrollbar">
        {!messages || messages.length === 0 ? (
          <div className="flex-1 flex items-center justify-center text-center text-gray-400 px-4">
            <p className="text-base md:text-lg">
              No messages yet. Start the conversation by sending a message.
            </p>
          </div>
        ) : (
          messages.map((message, index) => (
            <MessageContent key={index} message={message} />
          ))
        )}

        <span ref={messagesEndRef} className="h-0 overflow-hidden" />
      </div>

      <ChatInput />
    </div>
  );
};

export default ChatContent;
