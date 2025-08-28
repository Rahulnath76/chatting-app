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
      localStorage.setItem("friends", JSON.stringify(state.friends));
    },
    addFriend: (state, action) => {
      const newFriends = Array.isArray(action.payload)
        ? action.payload
        : [action.payload];
      state.friends.push(...newFriends);
      localStorage.setItem("friends", JSON.stringify(state.friends));
    },

    updateFriendList: (state, action) => {
      const friendIndex = state.friends.findIndex(
        (friend) => friend._id === action.payload
      );
      if (friendIndex !== -1) {
        const [friend] = state.friends.splice(friendIndex, 1);
        state.friends.unshift(friend);
      }
    },
  },
});

export const { setUserData, setLoading, setFriends, addFriend, updateFriendList } =
  profileSlice.actions;
export default profileSlice.reducer;
