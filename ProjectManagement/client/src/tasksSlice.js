import { createSlice } from '@reduxjs/toolkit';

const tasksSlice = createSlice({
    name: 'tasks',
    initialState: {
        tasks: [],
        filter: 'all',  // 'all', 'active', 'completed'
    },

    reducers: {
        addTask: (state, action) => {
            state.tasks.push({
                id: Date.now(),
                title: action.payload.title,
                description: action.payload.description,
                completed: false
            });
        },
        toggleTaskCompletion: (state, action) => {
            const task = state.tasks.find((t) => t.id === action.payload);
            if (task) {
                task.completed = !task.completed;
            }
        },
        deleteTask: (state, action) => {
            state.tasks = state.tasks.filter((task) => task.id !== action.payload);
        },
        setFilter: (state, action) => {
            state.filter = action.payload; // 'all', 'active', 'completed'
        },
    },
});

export const { addTask, toggleTaskCompletion, deleteTask, setFilter } = tasksSlice.actions;

export default tasksSlice.reducer;