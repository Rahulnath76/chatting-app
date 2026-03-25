import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import profileReducer, { initialProfileState } from "./slices/profileSlice";
import chatSlice from "./slices/chatSlice"
import socketMiddleware from "../middleware/socketMiddleware";
import { loadFriends } from "../lib/storage/friendsStorage";

const preloadedState = {
    profile: {
        ...initialProfileState,
        friends: loadFriends(),
    },
};

export const store = configureStore({
    reducer: {
        auth: authReducer,
        profile: profileReducer,
        chat: chatSlice,
    },
    preloadedState,

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(socketMiddleware),
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
