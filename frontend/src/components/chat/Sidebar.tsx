import { LucideMoreVertical, Search } from "lucide-react";
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
    console.log("entered")
    console.log(e.key);
    if (e.key === "Enter") {
      dispatch(findFriend(searchTerm));
      setSearchTerm("");
      setSearchFriend(false);
    }
  };
  return (
    <div
      className="h-screen flex flex-col"
      onClick={() => tab && setOpenTab(false)}
    >
      <div className="p-2 bg-[#090d1e] rounded-lg pb-4 mb-2">
        <div className="flex justify-between items-center p-2 mb-4 relative">
          <h3 className="text-2xl font-semibold">Chats</h3>
            <div
            className="relative group"
            onClick={() => setOpenTab(!tab)}
            >
            <button
              className="p-1 rounded-full hover:bg-black/65 cursor-pointer transition-all duration-200"
            >
              <LucideMoreVertical />
            </button>
            </div>

          <div
            className={`${
              tab ? "flex" : "hidden"
            } absolute flex-col bg-gray-900 rounded-lg transition-all duration-200 right-5 top-10`}
          >
            <button
              onClick={() => {
                setSearchFriend(true);
                if (inputRef.current) {
                  inputRef.current.focus();
                }
              }}
              className="cursor-pointer hover:bg-gray-950 px-4 py-2 rounded-t-lg transition-all duration-200"
            >
              Add Friend
            </button>
            <Link to="/" className="cursor-pointer hover:bg-gray-950 px-4 py-2 transition-all duration-200">My Profile</Link>

            <button
              onClick={() => {
                dispatch(logout(navigate));
              }}
              className="cursor-pointer hover:bg-gray-950 px-4 py-2 rounded-b-lg transition-all duration-200"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="flex items-center w-full px-2  rounded-md bg-[#181c2f] text-blue-200  focus:ring-2 focus:ring-blue-200 transition">
          <Search className="size-5" />
          <input
            type="text"
            placeholder={
              searchFriend ? "enter email or username" : "Search Chats..."
            }
            ref={inputRef}
            className="w-full px-3 py-2 rounded-md bg-[#181c2f]  placeholder-gray-400 focus:outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={searchFriend ? (e) => handleSearch(e) : undefined}
          />
        </div>
      </div>

      <FriendList />
    </div>
  );
};

export default Sidebar;
