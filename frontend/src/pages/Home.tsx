import { MessageSquare } from "lucide-react";
import { useSelector } from "react-redux";
import ChatScreen from "../components/chat/ChatScreen";
import Sidebar from "../components/chat/Sidebar";
import type { RootState } from "../store/store";

const Home = () => {
  const { selectedChat } = useSelector((state: RootState) => state.chat);

  const isChatSelected = Boolean(selectedChat?.userId);

  return (
    <div className="w-screen h-screen bg-[#0B0F19] text-slate-100 overflow-hidden flex">
      {/* Sidebar */}
      <div
        className={`${
          isChatSelected ? "hidden md:flex" : "flex"
        } w-full md:w-[320px] lg:w-[360px] shrink-0 h-full border-r border-slate-800/80 bg-slate-900/40`}
      >
        <Sidebar />
      </div>

      {/* Chat Area */}
      <div
        className={`${
          !isChatSelected ? "hidden md:flex" : "flex"
        } flex-1 h-full bg-slate-950/60 overflow-hidden flex-col`}
      >
        {isChatSelected ? (
          <ChatScreen />
        ) : (
          <div className="h-full w-full flex flex-col items-center justify-center text-center p-6 select-none">
            <div className="size-14 rounded-2xl bg-slate-900 border border-slate-800/80 flex items-center justify-center text-slate-400 mb-3 shadow-inner">
              <MessageSquare className="size-7 text-blue-400" />
            </div>
            <h2 className="text-base font-semibold text-slate-100">
              No conversation selected
            </h2>
            <p className="text-xs text-slate-400 max-w-xs mt-1">
              Choose a contact from the sidebar to start chatting.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
