import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import profileReducer from "./slices/profileSlice";
import chatSlice from "./slices/chatSlice"
import socketMiddleware from "../middleware/socketMiddleware";


export const store = configureStore({
    reducer: {
        auth: authReducer,
        profile: profileReducer,
        chat: chatSlice,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(socketMiddleware),
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;