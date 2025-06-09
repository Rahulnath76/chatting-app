import { createSlice } from "@reduxjs/toolkit";

export interface Auth {
  loading: boolean;
  isLoggedIn: boolean;
  success: boolean;
}

const initialState: Auth = {
  loading: false,
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
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setSuccess: (state, action) => {
      state.success = action.payload;
    }
  },
});


export const { setLoggedin, setSuccess, setLoading } = authSlice.actions;
export default authSlice.reducer;
