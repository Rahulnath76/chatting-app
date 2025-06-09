import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";

const ChatHeader = () => {
  const { currentChat } = useSelector((state: RootState) => state.chat);

  const defaultAvatar = `https://ui-avatars.com/api/?name=${currentChat?.fullName}&background=000&color=fff`;


  return (
    <Link to={"/profile-details"}>
      <div className="flex justify-between h-20 px-4 p-2 bg-[#050712] rounded-t-lg border-b-2 border-slate-500 cursor-pointer">
        <div className="flex items-center gap-4">
          <img
            src={currentChat?.avatar ? currentChat.avatar : defaultAvatar}
            alt={currentChat?.username || "User"}
            width={50}
            height={50}
            className="rounded-full object-cover"
          />
          <h3 className="text-lg font-semibold">{currentChat?.fullName}</h3>
        </div>
      </div>
    </Link>
  );
};

export default ChatHeader;
