import { Users } from "lucide-react";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import FriendItem from "./FriendItem";

const FriendList = () => {
  const { friends } = useSelector((state: RootState) => state.profile);
  
  return (
    <div className="flex-1 max-h-[calc(100vh-155px)] py-4 pr-2 bg-[#090d1e] rounded-lg h-full overflow-y-auto">
      {(!friends || friends.length === 0) && (
        <div className="h-full flex flex-col items-center justify-center text-center text-blue-200 px-4">
          <Users className="w-16 h-16 text-blue-400 mb-3" />
          <h2 className="text-xl font-semibold">No friends yet</h2>
          <p className="text-sm text-gray-400">
            Go ahead and make your first connection!
          </p>
        </div>
      )}

      {friends &&
        friends.map((item) => <FriendItem key={item._id} friend={item} />)}
    </div>
  );
};

export default FriendList;
