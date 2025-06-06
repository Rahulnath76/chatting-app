import { createSlice } from "@reduxjs/toolkit";

export interface Auth {
  isLoggedIn: boolean;
  success: boolean;
}

const initialState: Auth = {
  isLoggedIn: localStorage.getItem("isLoggedin") === "true" || false,
  success: false
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoggedin: (state, action) => {
      console.log("setLoggedin reducer called with:", action.payload);
      state.isLoggedIn = action.payload;
    },
    setSuccess: (state, action) => {
      state.success = action.payload;
    }
  },
});


export const { setLoggedin, setSuccess } = authSlice.actions;
export default authSlice.reducer;
