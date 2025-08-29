import { createSlice } from "@reduxjs/toolkit";

export interface Auth {
  loading: boolean;
  success: boolean;
}

const initialState: Auth = {
  loading: false,
  success: false
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setSuccess: (state, action) => {
      state.success = action.payload;
    }
  },
});


export const { setSuccess, setLoading } = authSlice.actions;
export default authSlice.reducer;
