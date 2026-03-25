import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

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
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setSuccess: (state, action: PayloadAction<boolean>) => {
      state.success = action.payload;
    }
  },
});


export const { setSuccess, setLoading } = authSlice.actions;
export default authSlice.reducer;
