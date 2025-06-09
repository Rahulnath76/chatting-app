import { useDispatch } from "react-redux";
import { setCurrentChat } from "../../store/slices/chatSlice";
import type { User } from "../../lib/types";
import { getAllMessages } from "../../lib/operations/message.api";
import type { AppDispatch } from "../../store/store";

const FriendItem = ({ friend }: {friend: User}) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleClick = () => {
    dispatch(setCurrentChat(friend));
    dispatch(getAllMessages(friend._id));
  };

  const defaultAvatar = `https://ui-avatars.com/api/?name=${friend?.fullName}&background=000&color=fff`;

  return (
    <div
      className="p-2 border-b-2 border-gray-800 last:border-none flex gap-4 hover:bg-gray-800 cursor-pointer transition-all duration-200"
      onClick={handleClick}
    >
      <div>
        <img
          src={friend.avatar || defaultAvatar}
          alt={friend.fullName}
          width={45}
          className="rounded-full"
        />
      </div>
      <div>
        <h3>{friend.fullName}</h3>
      </div>
    </div>
  );
};

export default FriendItem;
