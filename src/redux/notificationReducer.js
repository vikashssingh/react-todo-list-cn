import { createSlice } from "@reduxjs/toolkit";
import { todoActions } from "./TodoReducer";

const INITIAL_STATE = {
    message: ""
}

const notificationSlice = createSlice({
    name: 'notification',
    initialState: INITIAL_STATE,
    reducers: {
        clear: (state, action) => {
            state.message = ""
        }
    },
    extraReducers: (builder) => {
        builder.addCase(todoActions.add, (state, action) => {
            state.message = "Task is added";
        })
    
        .addCase(todoActions.toggleCompleted, (state, action) => { 
            state.message = "Task is completed"
        })
        .addCase(todoActions.delete, (state, action) => { 
            state.message = "Task is Deleted"
        })
    }
})

export const notificationReducer = notificationSlice.reducer;
export const notificationActions = notificationSlice.actions; // Destructuring clear directly from actions

export const notificationSelector = (state) => state.notificationReducer.message;
