import { useDispatch, useSelector } from "react-redux";
import type { User } from "../../lib/types";
import { setCurrentChat } from "../../store/slices/chatSlice";
import type { AppDispatch, RootState } from "../../store/store";

const FriendItem = ({ friend }: { friend: User }) => {
  const dispatch = useDispatch<AppDispatch>();

  const { selectedChat } = useSelector((state: RootState) => state.chat);
  const isSelected = selectedChat?.userId === friend._id;
  const handleClick = () => {
    if (isSelected) return;
    dispatch(setCurrentChat({ userId: friend._id }));
  };

  const defaultAvatar = `https://ui-avatars.com/api/?name=${friend?.fullName}&background=000&color=fff`;
  // console.log(friend.avatar);
  return (
    <div
      className={`p-2 border-b-2 border-gray-800 last:border-none flex gap-4 hover:bg-gray-800 cursor-pointer transition-all duration-200 ${isSelected && "bg-gray-900"}`}
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
