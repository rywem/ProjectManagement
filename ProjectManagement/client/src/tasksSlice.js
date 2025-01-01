import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'; // Importing createSlice from Redux Toolkit
import TaskService from './services/taskService'; // Importing the TaskService


export const getTasks = createAsyncThunk('tasks/fetchTasks', async () => {
    return await TaskService.getTasks();
    
  });
  
  export const addTask = createAsyncThunk('tasks/addTask', async (task) => {
      return await TaskService.addTask(task);
  });
  export const toggleTaskCompletion = createAsyncThunk('tasks/toggleTaskCompletion', async (id) => {
      return await TaskService.toggleTaskCompletion(id);
  });
  
  export const deleteTask = createAsyncThunk('tasks/deleteTask', async (id) => {
      return await TaskService.deleteTask(id);
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
            .addCase(getTasks.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getTasks.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.tasks = action.payload;
            })
            .addCase(getTasks.rejected, (state, action) => {
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

export default tasksSlice.reducer;

