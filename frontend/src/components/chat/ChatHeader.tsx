import { ArrowLeft } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import type { AppDispatch, RootState } from "../../store/store";
import { setCurrentChat } from "../../store/slices/chatSlice";

const ChatHeader = () => {
  const selectedChat = useSelector(
    (state: RootState) => state.chat.selectedChat
  );
  const dispatch = useDispatch<AppDispatch>()
  const friends = useSelector((state: RootState) => state.profile.friends);

  if (!selectedChat) {
    return (
      <div className="flex justify-between h-20 px-4 p-2 bg-[#050712] rounded-t-lg border-b-2 border-slate-500">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gray-700 rounded-full" />
          <h3 className="text-lg font-semibold text-gray-400">
            No Chat Selected
          </h3>
        </div>
      </div>
    );
  }

  // Find friend user info by userId stored in selectedChat
  const friend = friends.find((f) => f._id === selectedChat.userId);

  const defaultAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    friend?.fullName || "User"
  )}&background=000&color=fff`;

  return (
    <div className="flex justify-between h-20 px-4 p-2 bg-[#050712] rounded-t-lg border-b-2 border-slate-500">
      <div className="flex items-center gap-2">
        <button className="cursor-pointer hover:bg-gray-800 rounded-full p-2" onClick={() => dispatch(setCurrentChat(null))}>
          <ArrowLeft />
        </button>
        <Link to={"/profile"}>
          <div className="flex items-center gap-4">
            <img
              src={friend?.avatar || defaultAvatar}
              alt={
                friend?.fullName ? `${friend.fullName}'s avatar` : "User avatar"
              }
              width={50}
              height={50}
              className="rounded-full object-cover"
            />
            <h3 className="text-lg font-semibold">
              {friend?.fullName || "Unknown User"}
            </h3>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ChatHeader;
