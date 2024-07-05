import { createSlice } from "@reduxjs/toolkit";

//TasksSlice
const initialState = [];
const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    //Add tasks
    addTasks: (state, action) => {
      state.push(action.payload);
      return state;
    },
    //Removing tasks
    removeTasks: (state, action) => {
      return state.filter((item) => item._id !== action.payload);
    },
  },
});

export const { addTasks, removeTasks } = taskSlice.actions;
export const selectTasks = (state) => state.tasks;

// User's slice
const userInitialState = {
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState: userInitialState,
  reducers: {
    setUser: (state, action) => {
      return action.payload;
    },
    clearUser: (state) => {
      return null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export const selectUser = (state) => state.user.user;

// Completed Tasks SLice
const completedTasks = []

const completedtaskSlice = createSlice({
  name: "completed",
  initialState: completedTasks,
  reducers: {
    addCompletedTask: (state, action) => {
      state.push(action.payload);
    },
    // removeCompletedTask: (state, action) => {
    //   return state.filter((task) => task._id !== action.payload);
    // },
  }
})

export const { addCompletedTask } = completedtaskSlice.actions;

// Export both reducers
export const tasksReducer = taskSlice.reducer;
export const userReducer = userSlice.reducer;
export const completedtaskReducer = completedtaskSlice.reducer;
