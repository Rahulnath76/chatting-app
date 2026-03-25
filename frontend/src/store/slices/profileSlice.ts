import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User } from "../../lib/types";

interface Props {
  user: User | null;
  friends: User[];
  loading: boolean;
}

export const initialProfileState: Props = {
  user: null,
  friends: [],
  loading: false,
};

const profileSlice = createSlice({
  name: "profile",
  initialState: initialProfileState,
  reducers: {
    setUserData: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload ?? null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setFriends: (state, action: PayloadAction<User[]>) => {
      state.friends = action.payload;
    },
    addFriend: (state, action: PayloadAction<User | User[]>) => {
      const newFriends = Array.isArray(action.payload)
        ? action.payload
        : [action.payload];
      state.friends.push(...newFriends);
    },

    updateFriendList: (state, action: PayloadAction<string>) => {
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
