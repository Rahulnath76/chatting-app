import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import type { Message, User } from "../../lib/types";

const formatTime = (dateStr?: string) => {
  if (!dateStr) return "";
  try {
    const d = new Date(dateStr);
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  } catch {
    return "";
  }
};

const MessageContent = ({ message }: { message: Message }) => {
  const { user } = useSelector((state: RootState) => state.profile);

  const senderId =
    typeof message.sender === "string"
      ? message.sender
      : (message.sender as User)?._id;

  const isMyMessage = senderId === user?._id;

  const senderAvatar =
    typeof message.sender === "object" && (message.sender as User)?.avatar
      ? (message.sender as User).avatar
      : `https://ui-avatars.com/api/?name=User&background=1e293b&color=94a3b8`;

  return (
    <div className={`flex w-full ${isMyMessage ? "justify-end" : "justify-start"} px-1`}>
      <div
        className={`flex gap-2 max-w-[85%] sm:max-w-[70%] ${
          isMyMessage ? "flex-row-reverse" : "flex-row"
        }`}
      >
        {!isMyMessage && (
          <img
            src={senderAvatar}
            alt="sender avatar"
            className="size-6 rounded-full object-cover shrink-0 self-end ring-1 ring-slate-800 mb-0.5"
          />
        )}

        <div
          className={`flex flex-col rounded-2xl px-3.5 py-2 text-xs sm:text-sm ${
            isMyMessage
              ? "bg-blue-600 text-white rounded-br-xs shadow-sm"
              : "bg-slate-800 text-slate-100 rounded-bl-xs border border-slate-700/60 shadow-sm"
          }`}
        >
          {message.image && (
            <div className="mb-1.5 overflow-hidden rounded-lg">
              <img
                src={message.image}
                className="max-h-60 w-auto object-cover rounded-md"
                alt="attachment"
              />
            </div>
          )}

          {message.text && (
            <p className="whitespace-pre-wrap break-words leading-relaxed">
              {message.text}
            </p>
          )}

          <span
            className={`text-[10px] mt-0.5 select-none self-end ${
              isMyMessage ? "text-blue-200/80" : "text-slate-400"
            }`}
          >
            {formatTime(message.createdAt)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MessageContent;
