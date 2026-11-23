import { LucideMoreVertical, Search, UserPlus, User, LogOut, X } from "lucide-react";
import { useRef, useState } from "react";
import FriendList from "./FriendList";
import { useDispatch } from "react-redux";
import { findFriend } from "../../lib/operations/friend.api";
import type { AppDispatch } from "../../store/store";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../lib/operations/auth.api";

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const inputRef = useRef<HTMLInputElement>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [tab, setOpenTab] = useState(false);
  const [searchFriend, setSearchFriend] = useState(false);

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchTerm.trim()) {
      dispatch(findFriend(searchTerm.trim()));
      setSearchTerm("");
      setSearchFriend(false);
    }
  };

  return (
    <div
      className="w-full h-full flex flex-col"
      onClick={() => tab && setOpenTab(false)}
    >
      {/* Top Header */}
      <div className="p-3.5 border-b border-slate-800/80">
        <div className="flex justify-between items-center mb-3 relative">
          <h2 className="text-lg font-bold tracking-tight text-white">
            Chats
          </h2>

          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setOpenTab(!tab);
              }}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors cursor-pointer"
              aria-label="Menu"
            >
              <LucideMoreVertical className="size-5" />
            </button>

            {/* Dropdown Menu */}
            {tab && (
              <div
                className="absolute right-0 top-8 w-44 rounded-xl border border-slate-800 bg-slate-900/95 backdrop-blur-md p-1 shadow-xl shadow-black/50 z-50 flex flex-col text-xs font-medium"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => {
                    setOpenTab(false);
                    setSearchFriend(true);
                    setTimeout(() => inputRef.current?.focus(), 50);
                  }}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors cursor-pointer text-left"
                >
                  <UserPlus className="size-4 text-blue-400" />
                  <span>Add Friend</span>
                </button>

                <Link
                  to="/profile"
                  onClick={() => setOpenTab(false)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors cursor-pointer text-left"
                >
                  <User className="size-4 text-slate-400" />
                  <span>My Profile</span>
                </Link>

                <div className="h-px bg-slate-800 my-1" />

                <button
                  onClick={() => {
                    setOpenTab(false);
                    dispatch(logout(navigate));
                  }}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition-colors cursor-pointer text-left"
                >
                  <LogOut className="size-4" />
                  <span>Log out</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative flex items-center">
          <Search className="absolute left-3 size-4 text-slate-400 pointer-events-none" />
          <input
            type="text"
            ref={inputRef}
            placeholder={
              searchFriend ? "Enter username or email..." : "Search chats..."
            }
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={searchFriend ? handleSearch : undefined}
            className="w-full pl-9 pr-8 py-2 text-xs rounded-xl bg-slate-950/70 border border-slate-800 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-slate-700 focus:ring-2 focus:ring-blue-500/20 transition-all"
          />
          {searchFriend && (
            <button
              onClick={() => {
                setSearchFriend(false);
                setSearchTerm("");
              }}
              className="absolute right-2.5 text-slate-400 hover:text-slate-200 p-0.5 rounded"
            >
              <X className="size-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Friends & Conversation List */}
      <FriendList />
    </div>
  );
};

export default Sidebar;
