import { useDispatch, useSelector } from "react-redux";
import type { User } from "../../lib/types";
import { isNewMessage, setCurrentChat } from "../../store/slices/chatSlice";
import type { AppDispatch, RootState } from "../../store/store";

const FriendItem = ({ friend }: { friend: User }) => {
  const dispatch = useDispatch<AppDispatch>();

  const { selectedChat, messages } = useSelector(
    (state: RootState) => state.chat
  );
  const isSelected = selectedChat?.userId === friend._id;
  const hasUnread = !!messages[friend._id]?.newMessage && !isSelected;

  const handleClick = () => {
    if (isSelected) return;
    dispatch(setCurrentChat({ userId: friend._id }));
    if (messages[friend._id]) {
      dispatch(isNewMessage({ chatId: friend._id, value: false }));
    }
  };

  const defaultAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    friend?.fullName || "User"
  )}&background=1e293b&color=94a3b8`;

  return (
    <div
      onClick={handleClick}
      className={`mx-2 my-0.5 px-3 py-2 rounded-xl flex items-center gap-3 transition-colors cursor-pointer select-none ${
        isSelected
          ? "bg-slate-800 text-white"
          : "text-slate-300 hover:bg-slate-800/40 hover:text-white"
      }`}
    >
      <div className="relative shrink-0">
        <img
          src={friend.avatar || defaultAvatar}
          alt={friend.fullName}
          className="size-9 rounded-full object-cover ring-1 ring-slate-800"
        />
        {hasUnread && (
          <span className="absolute -top-0.5 -right-0.5 size-2.5 rounded-full bg-blue-500 ring-2 ring-slate-900" />
        )}
      </div>

      <div className="flex-1 min-w-0">
        <h4 className="text-xs font-semibold truncate leading-tight">
          {friend.fullName || "User"}
        </h4>
        <p className="text-[11px] text-slate-400 truncate mt-0.5">
          @{friend.username || "user"}
        </p>
      </div>
    </div>
  );
};

export default FriendItem;
