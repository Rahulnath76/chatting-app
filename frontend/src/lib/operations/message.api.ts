import {
  addMessage,
  addNewMessage,
  setCurrentMessages,
  setIsLoading,
} from "../../store/slices/chatSlice";
import { updateFriendList } from "../../store/slices/profileSlice";
import type { AppDispatch, RootState } from "../../store/store";
import { messageRoutes } from "../api";
import { apiConnector } from "../apiConnector";
import { socket } from "../socket";

const { SEND_MESSAGE, GET_MESSAGE } = messageRoutes;

interface SendMessageParams {
  receiverId: string;
  text: string;
  image?: File;
}

export const sendMessage = ({ receiverId, text, image }: SendMessageParams) => {
  return async (dispatch: AppDispatch) => {
    try {
      const formData = new FormData();
      formData.append("text", text);
      if (image) formData.append("image", image);

      const response = await apiConnector(
        "POST",
        SEND_MESSAGE(receiverId),
        formData
      );
      console.log(response);
      if (!response.data.success) throw new Error("Failed to send message");

      const message = response.data.message;

      socket.emit("send_message", {
        receiverId,
        message,
      });

      dispatch(
        addNewMessage({
          chatId: receiverId,
          message,
        })
      );

      dispatch(updateFriendList(receiverId));
    } catch (error) {
      console.log("Send message error:", error);
    }
  };
};

export const getAllMessages = (otherUserId: string, page = 1) => {
  return async (dispatch: AppDispatch) => {
    dispatch(setIsLoading(true));
    try {
      const response = await apiConnector(
        "GET",
        `${GET_MESSAGE(otherUserId)}?page=${page}&limit=20`
      );
      console.log(response);
      if (!response.data.success) throw new Error("Failed to fetch messages");
      console.log(page);
      const payload = {
        chatId: otherUserId,
        messages: response.data.messages.messages,
        hasMore: response.data.messages.hasMore,
        currentPage: response.data.messages.currentPage,
      };

      if (page === 1) {
        dispatch(setCurrentMessages(payload));
      } else {
        dispatch(addMessage(payload));
      }
    } catch (error) {
      console.log("Get messages error:", error);
    }
    finally{
      dispatch(setIsLoading(false));
    }
  };
};

export const loadMoreMessages = (otherUserId: string) => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    const state = getState();
    const currentChat = state.chat.messages[otherUserId];
    console.log(currentChat);
    if (currentChat?.hasMore) {
      dispatch(getAllMessages(otherUserId, currentChat.currentPage + 1));
    }
  };
};
