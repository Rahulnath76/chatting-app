import type { Middleware } from "@reduxjs/toolkit";
import { socket } from "../lib/socket";
import { addMessage } from "../store/slices/chatSlice";

const SOCKET_CONNECT = "socket/connect";

const socketMiddleware: Middleware = (store) => (next) => (action) => {
  const { dispatch, getState } = store;
  console.log(action);
  if (action.type === SOCKET_CONNECT) {
    
    socket.on("connect", () => {
      console.log("socket connected", socket.id);

      const userId = getState().profile.user?._id;
      // console.log(userId);
      if (userId) {
        socket.emit("join", userId);
        console.log("Joined socket room:", userId);
      }
    });
    
    socket.on("recieve_message", (message) => {
      console.log("Received message from socket:", message);
      dispatch(addMessage(message));
    });


    socket.connect();
  }

  if (action.type === "socket/disconnect") {
    console.log("disconnexted");
    socket.disconnect();
  }
  return next(action);
};

export default socketMiddleware;
