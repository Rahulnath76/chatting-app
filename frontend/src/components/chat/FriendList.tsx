import { Users } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import type { AppDispatch, RootState } from "../../store/store";
import FriendItem from "./FriendItem";
import { useEffect } from "react";
import { findSortedFriendList } from "../../lib/operations/friend.api";

const FriendList = () => {
  const { friends } = useSelector((state: RootState) => state.profile);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(findSortedFriendList());
  }, [dispatch]);

  return (
    <div className="flex-1 overflow-y-auto py-2 custom-scrollbar">
      {(!friends || friends.length === 0) ? (
        <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400">
          <div className="size-11 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 mb-2.5">
            <Users className="size-5 text-slate-400" />
          </div>
          <h3 className="text-xs font-medium text-slate-200">No conversations yet</h3>
          <p className="text-[11px] text-slate-400 mt-1 max-w-[190px]">
            Add a friend to start your first chat.
          </p>
        </div>
      ) : (
        friends.map((item) => <FriendItem key={item._id} friend={item} />)
      )}
    </div>
  );
};

export default FriendList;
