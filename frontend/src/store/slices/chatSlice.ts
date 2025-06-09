import { createSlice } from "@reduxjs/toolkit";
import type { Message, User } from "../../lib/types";

interface Prop{
  currentChat: User | null;
  messages: Message[];
}

const initialState:Prop = {
    currentChat: null,
    messages: [],
}

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setCurrentChat: (state, action) => {
      state.currentChat = action.payload;
    },
    setCurrentMessages: (state, action) => {
      state.messages = action.payload;
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },

  },
});

export const { setCurrentChat, setCurrentMessages, addMessage } = chatSlice.actions;
export default chatSlice.reducer;
