import { ArrowLeft } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import type { AppDispatch, RootState } from "../../store/store";
import { setCurrentChat } from "../../store/slices/chatSlice";

const ChatHeader = () => {
  const selectedChat = useSelector(
    (state: RootState) => state.chat.selectedChat
  );
  const dispatch = useDispatch<AppDispatch>();
  const friends = useSelector((state: RootState) => state.profile.friends);

  if (!selectedChat) return null;

  const friend = friends.find((f) => f._id === selectedChat.userId);

  const defaultAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    friend?.fullName || "User"
  )}&background=1e293b&color=94a3b8`;

  return (
    <div className="h-14 px-4 flex items-center justify-between border-b border-slate-800/80 bg-slate-900/40 shrink-0">
      <div className="flex items-center gap-3">
        <button
          onClick={() => dispatch(setCurrentChat(null))}
          className="md:hidden p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors cursor-pointer"
          aria-label="Back to conversations"
        >
          <ArrowLeft className="size-5" />
        </button>

        <Link
          to="/profile"
          className="flex items-center gap-2.5 group transition-opacity hover:opacity-90"
        >
          <img
            src={friend?.avatar || defaultAvatar}
            alt={friend?.fullName || "User"}
            className="size-8 rounded-full object-cover ring-1 ring-slate-800"
          />
          <div>
            <h3 className="text-xs sm:text-sm font-semibold text-white leading-tight">
              {friend?.fullName || "Chat"}
            </h3>
            <p className="text-[11px] text-slate-400 leading-tight">
              @{friend?.username || "user"}
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ChatHeader;
