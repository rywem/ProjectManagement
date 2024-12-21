import { configureStore } from '@reduxjs/toolkit'; // Importing the configureStore method from Redux Toolkit
import tasksReducer from './tasksSlice';; // Importing the reducer from the tasksSlice file
// 1. Configuring the Redux store
// The configureStore function sets up the store with the given reducers and automatically includes Redux DevTools and middleware like thunk.
const store = configureStore({
    // The reducer key defines how state updates are handled.
    reducer: {
        // Adding the "tasks" slice of state to the store
        // This means that the tasksReducer will handle any actions related to the "tasks" state.       
        tasks: tasksReducer,
    }
});

export default store;