import type { Middleware } from "@reduxjs/toolkit";
import { socket } from "../lib/socket";
import { addNewMessage } from "../store/slices/chatSlice";

const socketMiddleware: Middleware = (store) => (next) => (action) => {
  const { dispatch, getState } = store;
  if (action.type === "socket/connect") {
    
    socket.on("connect", () => {

      const userId = getState().profile.user?._id;
      console.log("Socket connected with ID:", socket.id);
      if (userId) {
        socket.emit("join", userId);
        console.log("Joined socket room:", userId);
      }
    });

    socket.emit("test_event", { msg: "hello server" });

    
    socket.on("receive_message", (message) => {
      console.log("Received message from socket:", message);
      dispatch(addNewMessage(message));
    });
    
    socket.connect();
  }

  if (action.type === "socket/disconnect") {
    console.log("disconnected");
    socket.disconnect();
  }
  return next(action);
};

export default socketMiddleware;
