import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
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
  lastFetchedAt?: number;
}

interface ChatState {
  selectedChat: SelectedChat | null;
  messages: {
    [chatId: string]: ChatMessagesState;
  };
  isLoading: boolean;
}

interface ChatMessagesPayload {
  chatId: string;
  messages: Message[];
  hasMore: boolean;
  currentPage: number;
  lastFetchedAt?: number;
}

interface NewMessagePayload {
  chatId: string;
  message: Message;
}

interface NewMessageFlagPayload {
  chatId: string;
  value: boolean;
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
    setCurrentChat: (state, action: PayloadAction<SelectedChat | null>) => {
      state.selectedChat = action.payload;
    },

    setCurrentMessages: (state, action: PayloadAction<ChatMessagesPayload>) => {
      const { chatId, messages, hasMore, currentPage, lastFetchedAt } =
        action.payload;
      state.messages[chatId] = {
        messages,
        hasMore,
        currentPage,
        newMessage: false,
        lastFetchedAt: lastFetchedAt ?? Date.now(),
      };
    },

    addMessage: (state, action: PayloadAction<ChatMessagesPayload>) => {
      const { chatId, messages, hasMore, currentPage } = action.payload;
      if (!state.messages[chatId]) {
        state.messages[chatId] = {
          messages,
          hasMore,
          currentPage,
          newMessage: false,
        };
      } else {
        const existingMessages = state.messages[chatId].messages;
        const existingIds = new Set(
          existingMessages
            .map((message) => message._id)
            .filter((id): id is string => Boolean(id))
        );
        const uniqueNewMessages = messages.filter((message) => {
          if (!message._id) return true;
          return !existingIds.has(message._id);
        });
        state.messages[chatId].messages = [
          ...uniqueNewMessages,
          ...existingMessages,
        ];
        state.messages[chatId].currentPage = currentPage;
        state.messages[chatId].hasMore = hasMore;
      }
    },

    addNewMessage: (state, action: PayloadAction<NewMessagePayload>) => {
      const { chatId, message } = action.payload;
      if (!state.messages[chatId]) {
        state.messages[chatId] = {
          messages: [message],
          hasMore: true,
          currentPage: 1,
          newMessage: true,
        };
      } else {
        if (
          !message._id ||
          !state.messages[chatId].messages.some(
            (existing) => existing._id === message._id
          )
        ) {
          state.messages[chatId].messages.push(message);
        }
        state.messages[chatId].newMessage = true;
      }
    },

    isNewMessage: (state, action: PayloadAction<NewMessageFlagPayload>) => {
      const { chatId, value } = action.payload;
      if (state.messages[chatId]) {
        state.messages[chatId].newMessage = value;
      }
    },

    setIsLoading: (state, action: PayloadAction<boolean>) => {
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
