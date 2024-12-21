import { createSlice } from '@reduxjs/toolkit'; // Importing createSlice from Redux Toolkit

// Helper function to save tasks to localStorage
const saveTasksToLocalStorage = (tasks) => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
};
// Helper function to load tasks from localStorage
const loadTasksFromLocalStorage = () => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
};

const tasksSlice = createSlice({
    name: 'tasks', // The slice's namespace (used for actions and debugging)
    //Define the initial state for the tasks slice
    // The state includes:
    // - `tasks`: An array to hold all task objects
    // - `filter`: A string that determines the current view filter ('all', 'active', or 'completed')
    initialState: {
        tasks: loadTasksFromLocalStorage(), // Load saved tasks or initialize with an empty array
        filter: 'all',  // <<default filter. Available options: 'all', 'active', 'completed'
    },

    reducers: {  // Reducers define how state should change in response to actions

        // addTask function - Add a new task to the list
        addTask: (state, action) => {
            state.tasks.push({
                id: Date.now(), 
                title: action.payload.title, 
                description: action.payload.description, 
                completed: false
            });
            saveTasksToLocalStorage(state.tasks); // Save updated tasks to localStorage
        },

        // toggleTaskCompletion function - Toggle the completed state of a task
        toggleTaskCompletion: (state, action) => {
            const task = state.tasks.find((t) => t.id === action.payload);
            if (task) {
                task.completed = !task.completed;
            }
            saveTasksToLocalStorage(state.tasks); // Save updated tasks to localStorage
        },
        // deleteTask function - Remove a task from the list by its ID
        deleteTask: (state, action) => {
            state.tasks = state.tasks.filter((task) => task.id !== action.payload);
            saveTasksToLocalStorage(state.tasks); // Save updated tasks to localStorage
        },
        // setFilter function - set the filter for viewing tasks
        setFilter: (state, action) => {
            state.filter = action.payload; // 'all', 'active', 'completed'
        },
    },
});
// These are automatically generated based on the reducer names (e.g., addTask creates an addTask action)
export const { addTask, toggleTaskCompletion, deleteTask, setFilter } = tasksSlice.actions;

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
