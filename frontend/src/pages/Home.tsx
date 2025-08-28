import { MessageSquare } from "lucide-react";
import { useSelector } from "react-redux";
import ChatScreen from "../components/chat/ChatScreen";
import Sidebar from "../components/chat/Sidebar";
import type { RootState } from "../store/store";

const Home = () => {
  const { selectedChat } = useSelector((state: RootState) => state.chat);


  const isChatSelected = Boolean(selectedChat?.userId);

  return (
    <div className="w-screen h-screen bg-black text-blue-200 overflow-hidden">
      <div className="flex h-full gap-2 p-2">
        {/* Sidebar */}
        <div className={`${isChatSelected ? "hidden md:block" : "block"} w-full md:max-w-[350px]`}>
          <Sidebar />
        </div>

        {/* Chat Area */}
        <div className={`flex-1 rounded-lg overflow-hidden ${!isChatSelected ? "hidden md:block" : "block"}`}>
          {isChatSelected ? (
            <ChatScreen />
          ) : (
            <div className="h-full w-full flex flex-col items-center justify-center bg-gray-900 rounded-lg text-center">
              <MessageSquare className="size-16 text-blue-400 mb-4" />
              <h2 className="text-xl font-semibold text-blue-200">Start chatting</h2>
              <p className="text-sm text-gray-400">Choose a conversation from the left panel.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
