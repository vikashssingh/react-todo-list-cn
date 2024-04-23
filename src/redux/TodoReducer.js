import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const INITIAL_STATE ={
    todos: [],
    editingIndex: null
}

export const getTodoAsync = createAsyncThunk(
  "todo/getTodoAsync",
  async (_, thunkAPI) => {
    try {
        const response = await axios.get("https://jsonplaceholder.typicode.com/todos");
        // console.log("response", response)
      thunkAPI.dispatch(todoActions.setInitialState(response.data))
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error; // Throw error to handle it in the component or elsewhere
    }
  }
);

export const addTodoAsync = createAsyncThunk(
  "todo/addTodoAsync",
  async (todoData, thunkAPI) => {
    try {
      const response = await axios.post("https://jsonplaceholder.typicode.com/todos", todoData);
      return response.data;
    } catch (error) {
      console.error('Error adding todo:', error);
      throw error; // Throw error to handle it in the component or elsewhere
    }
  }
);
export const updateTodoAsync = createAsyncThunk(
  "todo/updateTodoAsync",
  async (todoData, thunkAPI) => {
    const { value, editingIndex } = todoData;
    try {
      const response = await axios.put(`https://jsonplaceholder.typicode.com/todos/${editingIndex}`,value);
      return response.data;
    } catch (error) {
      console.error('Error adding todo:', error);
      throw error; // Throw error to handle it in the component or elsewhere
    }
  }
);

export const deleteTodoAsync = createAsyncThunk(
  "todo/deleteTodoAsync",
  async (todoId, thunkAPI) => {
    try {
      const response = await axios.delete(`https://jsonplaceholder.typicode.com/todos/${todoId}`);
      return response.data;
    } catch (error) {
      console.error('Error adding todo:', error);
      throw error; // Throw error to handle it in the component or elsewhere
    }
  }
);




const todoSlice = createSlice({
    name: 'todo',
    initialState: INITIAL_STATE,
    reducers: {
        setInitialState: (state,action)=>{
            state.todos=action.payload
            
        },
        add: (state, action) => {
            const { value, editingIndex } = action.payload;
            const datePart = new Date().toDateString();
                const timePart = new Date().toTimeString().split(' ')[0]; // Extracting time and removing timezone info
                const formattedDateTime = `${datePart} ${timePart}`;
            
            if(editingIndex !== null){
                state.todos[editingIndex].title = value
                state.todos[editingIndex].time = formattedDateTime;
            } else {
                state.todos.unshift({ 
                title: value,
                time:formattedDateTime,
                completed: false,
                delete:false
                })
            
            }
        },
        update: (state, action) => {
            state.editingIndex = action.payload;
        },
        toggleCompleted: (state, action) => {
            const index = action.payload;
            state.todos[index].completed = !state.todos[index].completed;
   
        },
        delete: (state, action) => {
            const index = action.payload;
            state.todos.splice(index, 1);
        }
    }
})

export const todoReducer = todoSlice.reducer;
export const todoActions = todoSlice.actions;
export const todoSelector = (state) => state.todoReducer.todos;
export const todoEditIndex = (state) => state.todoReducer.editingIndex;