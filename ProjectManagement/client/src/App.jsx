import { useSelector, useDispatch } from 'react-redux';
import { addTask, toggleTaskCompletion, deleteTask, setFilter } from './tasksSlice';

import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';

const App = () => {
    
    // useDispatch: Used to dispatch actions to update the Redux state.
    const dispatch = useDispatch();  // Hook to dispatch actions to the Redux store
    // useSelector: Used to access specific parts of the Redux state.
    // Here, we use it to access tasks and filter from the global state.
    const tasks = useSelector((state) => state.tasks.tasks);  // Hook to select the tasks from the Redux state
    const filter = useSelector((state) => state.tasks.filter)  // Hook to select filter from the Redux state

    // Filter tasks based on the current filter state
    const filteredTasks = tasks.filter((task) => {
        if (filter === 'active')
            return !task.completed;
        if (filter === 'completed')
            return task.completed;

        return true;
    });                        
    
    return (
        <div>
            <h1>Task Manager</h1>
            {/*  Pass the addTask action to TaskForm via dispatch */}
            <TaskForm addTask={(title, description) => dispatch(addTask({ title, description }))} />
            {/* Add filter buttons */}
            <div>
                <button onClick={() => dispatch(setFilter('all'))}>All</button>
                <button onClick={() => dispatch(setFilter('active'))}>Active</button>
                <button onClick={() => dispatch(setFilter('completed'))}>Completed</button>
            </div>
            {/* Pass filtered tasks and actions to TaskList */}
            <TaskList
                tasks={filteredTasks}
                toggleTaskCompletion={(id) => dispatch(toggleTaskCompletion(id))}
                deleteTask={(id) => dispatch(deleteTask(id))}
            />
        </div>
    )
}

export default App
