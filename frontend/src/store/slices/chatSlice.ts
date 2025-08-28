import { createSlice } from "@reduxjs/toolkit";
import type { Message } from "../../lib/types";

interface SelectedChat {
  userId: string;
  conversationId?: string;
}

interface ChatMessagesState {
  messages: Message[];
  currentPage: number;
  hasMore: boolean;
  newMessage: boolean;
}

interface ChatState {
  selectedChat: SelectedChat | null;
  messages: {
    [chatId: string]: ChatMessagesState;
  };
  isLoading: boolean;
}

const initialState: ChatState = {
  selectedChat: null,
  messages: {},
  isLoading: false,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setCurrentChat: (state, action) => {
      state.selectedChat = action.payload;
      console.log(state.selectedChat);
    },

    setCurrentMessages: (state, action) => {
      const { chatId, messages, hasMore, currentPage } = action.payload;
      state.messages[chatId] = {
        messages,
        hasMore,
        currentPage,
        newMessage: false,
      };
    },

    addMessage: (state, action) => {
      console.log(action.payload);
      const { chatId, messages, hasMore, currentPage } = action.payload;
      if (!state.messages[chatId]) {
        state.messages[chatId] = {
          messages,
          hasMore,
          currentPage,
          newMessage: false,
        };
      } else {
        state.messages[chatId].messages = [
          ...messages,
          ...state.messages[chatId].messages,
        ];
        state.messages[chatId].currentPage = currentPage;
        state.messages[chatId].hasMore = hasMore;
      }
    },

    addNewMessage: (state, action) => {
      console.log(action.payload);
      const { chatId, message } = action.payload;
      if (!state.messages[chatId]) {
        state.messages[chatId] = {
          messages: [message],
          hasMore: true,
          currentPage: 1,
          newMessage: true,
        };
      } else {
        state.messages[chatId].messages.push(message);
        state.messages[chatId].newMessage = true;
      }
    },

    isNewMessage: (state, action) => {
      const { chatId, value } = action.payload;
      if (state.messages[chatId]) {
        state.messages[chatId].newMessage = value;
      }
    },

    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const {
  setCurrentChat,
  setCurrentMessages,
  addMessage,
  addNewMessage,
  isNewMessage,
  setIsLoading,
} = chatSlice.actions;
export default chatSlice.reducer;
