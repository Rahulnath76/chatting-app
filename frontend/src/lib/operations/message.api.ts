import { addMessage, setCurrentMessages } from "../../store/slices/chatSlice";
import type { AppDispatch } from "../../store/store";
import { messageRoutes } from "../api";
import { apiConnector } from "../apiConnector";
import { socket } from "../socket";

const { SEND_MESSAGE, GET_MESSAGE } = messageRoutes;

interface SendMessageParams {
  senderId: string;
  text: string;
  image?: File;
}

export const sendMessage = ({ senderId, text, image }: SendMessageParams) => {
  return async (dispatch: AppDispatch) => {
    try {
      const formData = new FormData();
      formData.append("text", text);
      formData.append("image", image);

      const response = await apiConnector("POST", SEND_MESSAGE(senderId), formData);

      console.log(response);
      if(!response.data.success)  throw new Error("Eroooor");
      const message = response?.data?.data;
      
      socket.emit("send_message", {
        message: message,
        receiverId: message.receiver
      });

    } catch (error) {
      console.log(error);
    }
  };
};


export const getAllMessages = (chatId) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await apiConnector("GET", GET_MESSAGE(chatId));

      console.log(response);
      
      dispatch(setCurrentMessages(response.data.data));
      // localStorage.setItem(`${chatId}`, response.data.data);
    } catch (error) {
      console.log(error);
    }
  }
}
