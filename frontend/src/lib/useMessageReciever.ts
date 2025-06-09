import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { receiveMessage } from "../../store/chatSlice";
import type { RootState } from "../store/store";
import { socket } from "./socket";

const useMessageReceiver = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.profile.user);

  useEffect(() => {
    if (!currentUser?._id) return;

    // Join your socket room using user ID
    socket.emit("join", currentUser._id);

    // Handle incoming messages
    socket.on("receive_message", (message) => {
      console.log("Socket message received:", message);

      dispatch(receiveMessage(message)); // Add to Redux
    });

    // Cleanup on unmount
    return () => {
      socket.off("receive_message");
    };
  }, [currentUser, dispatch]);
};

export default useMessageReceiver;
