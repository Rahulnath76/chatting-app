import type { Middleware } from "@reduxjs/toolkit";
import { socket } from "../lib/socket";
import { addNewMessage } from "../store/slices/chatSlice";
import { updateFriendList } from "../store/slices/profileSlice";

const socketMiddleware: Middleware = (store) => {
  socket.on("connect", () => {
    console.log(store.getState().profile.user);
    const userId = store.getState().profile.user?._id;
    if (userId) {
      socket.emit("join", userId);
    }
    console.log("Connected to socket server");
  });

  socket.on("receive_message", (message) => {
    store.dispatch(addNewMessage(message));
    if(message?.chatId) {
      store.dispatch(updateFriendList(message.chatId));
    }
  });

  return (next) => (action: any) => {
    if(action.type === "socket/connect") {
      if(!socket.connected) {
        socket.connect();
      }
    }

    if(action.type === "socket/disconnect") {
      if(socket.connected) {
        socket.disconnect();
      }
    }

    return next(action);
  }
}

export default socketMiddleware;