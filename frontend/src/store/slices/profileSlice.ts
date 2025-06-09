import { createSlice } from "@reduxjs/toolkit";
import type { User } from "../../lib/types";

interface Props {
  user: User | null;
  friends: User[];
  loading: boolean;
}

const initialFriendsStr = localStorage.getItem("friends");

const initialState: Props = {
  user: null,
  friends: initialFriendsStr ? JSON.parse(initialFriendsStr) : [],
  loading: false,
};

const profileSlice = createSlice({
  name: "profile",
  initialState: initialState,
  reducers: {
    setUserData: (state, action) => {
      state.user = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setFriends: (state, action) => {
      state.friends = action.payload;
      localStorage.setItem("friends", JSON.stringify(action.payload));
    },
    addFriend: (state, action) => {
      const newFriends = Array.isArray(action.payload)
        ? action.payload
        : [action.payload];
      state.friends.push(...newFriends);
      localStorage.setItem("friends", JSON.stringify(state.friends));
    },
  },
});

export const { setUserData, setLoading, setFriends, addFriend } =
  profileSlice.actions;
export default profileSlice.reducer;
