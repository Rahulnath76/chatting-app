import { useSelector } from "react-redux";
import ChatScreen from "../components/chat/ChatScreen";
import Sidebar from "../components/chat/Sidebar";
import type { AppDispatch, RootState } from "../store/store";
import { MessageSquare } from "lucide-react";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchMe } from "../lib/operations/auth.api";

const Home = () => {
  const { currentChat } = useSelector((state: RootState) => state.chat);
  const dispatch = useDispatch<AppDispatch>();
  const { user, loading } = useSelector((state: RootState) => state.profile);

  useEffect(() => {
    if (!user) {
      dispatch(fetchMe());
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      console.log("Hellllo  socket ");
      dispatch({ type: "socket/connect" });
    }

    return () => {
      if (user) {
        dispatch({ type: "socket/disconnect" });
      }
    };
  }, [user]);

  return (
    <div className="w-screen h-screen bg-black text-blue-200 overflow-hidden">
      <div className="flex h-full gap-2 p-2">
        {/* Sidebar */}
        <div
          className={`${
            currentChat ? "hidden md:block" : "block"
          } w-full md:max-w-[350px]`}
        >
          <Sidebar />
        </div>

        {/* Chat Area */}
        <div
          className={`flex-1 rounded-lg overflow-hidden ${
            !currentChat ? "hidden md:block" : "block"
          }`}
        >
          {currentChat ? (
            <ChatScreen />
          ) : (
            <div className="h-full w-full flex flex-col items-center justify-center bg-gray-900 rounded-lg text-center">
              <MessageSquare className="size-16 text-blue-400 mb-4" />
              <h2 className="text-xl font-semibold text-blue-200">
                Start chatting
              </h2>
              <p className="text-sm text-gray-400">
                Choose a conversation from the left panel.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
