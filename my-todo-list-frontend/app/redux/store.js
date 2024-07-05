import { configureStore } from "@reduxjs/toolkit";
import { tasksReducer, userReducer } from "./reducer.js";
import { fetchUser } from "./action.js";
import { fetchTasks } from "./action.js";

const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    user: userReducer,
  },
});


// Fetch user data when the store is created
store.dispatch(fetchUser());

// Fetch user's task data when the store is created
store.dispatch(fetchTasks());

export default store;
