import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'; // Importing createSlice from Redux Toolkit
import axios from 'axios';

const API_URL = "http://localhost:5000/api/tasks";

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
    const response = await axios.get(API_URL);
    return response.data;
  });
  
  export const addTask = createAsyncThunk('tasks/addTask', async (task) => {
    const response = await axios.post(API_URL, task);
    return response.data;
  });
  export const toggleTaskCompletion = createAsyncThunk('tasks/toggleTaskCompletion', async (id) => {
    await axios.put(`${API_URL}/${id}`);
    return id;
  });
  
  export const deleteTask = createAsyncThunk('tasks/deleteTask', async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    return id;
  });
  
// Slice
const tasksSlice = createSlice({
    name: 'tasks',
    initialState: {
        tasks: [],
        filter: 'all', // 'all' | 'active' | 'completed'
        status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
        error: null,
    },
    reducers: {
        // Set the current filter
        setFilter: (state, action) => {
            state.filter = action.payload; // Update the filter state
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTasks.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.tasks = action.payload;
            })
            .addCase(fetchTasks.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(addTask.fulfilled, (state, action) => {
                state.tasks.push(action.payload);
            })
            .addCase(toggleTaskCompletion.fulfilled, (state, action) => {
                const task = state.tasks.find((t) => t.id === action.payload);
                if (task) task.completed = !task.completed;
            })
            .addCase(deleteTask.fulfilled, (state, action) => {
                state.tasks = state.tasks.filter((task) => task.id !== action.payload);
            });
    },
});

// Export actions
export const { setFilter } = tasksSlice.actions;
// These are automatically generated based on the reducer names (e.g., addTask creates an addTask action)
//export const { addTask, toggleTaskCompletion, deleteTask, setFilter, fetchTasks } = tasksSlice.actions;

/* Usage examples:
dispatch(addTask({ title: 'New Task', description: 'Description' }));
dispatch(toggleTaskCompletion(taskId));
dispatch(deleteTask(taskId));
dispatch(setFilter('completed'));
*/

// The reducer is used to handle state updates in the Redux store
export default tasksSlice.reducer;

/* Usage example (in store.js)

const store = configureStore({
  reducer: {
    tasks: tasksReducer,
  },
});

*/
