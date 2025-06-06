import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: (() => {
    const userStr = localStorage.getItem("user");
    return userStr ? JSON.parse(userStr) : null;
  })(),
  loading: false,
};

const profileSlice = createSlice({
  name: "profile",
  initialState: initialState,
  reducers: {
    setUserData(state, value) {
      state.user = value.payload;
    },
    setLoading(state, value) {
      state.loading = value.payload;
    },
  },
});

export const { setUserData, setLoading } = profileSlice.actions;
export default profileSlice.reducer;
