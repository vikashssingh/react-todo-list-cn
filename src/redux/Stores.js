import { configureStore } from "@reduxjs/toolkit";
import { todoReducer } from "./TodoReducer";
import { notificationReducer } from "./notificationReducer";

export const store = configureStore({
    reducer: {
        todoReducer,
        notificationReducer
    }
})