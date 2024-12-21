import { useState } from 'react'

import './App.css'
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';

const App = () => {
    const [tasks, setTasks] = useState([]);
    const addTask = (title, description) => {
        setTasks([...tasks, { id: Date.now(), title, description, completed: false }]);
    };

    const toggleTaskCompletion = (id) => {
        setTasks(tasks.map(task =>
            task.id == id ? {... task, completed : !task.completed} : task
        ));
    };

    const deleteTask = (id) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    return (
        <div>
            <h1>Task Manager</h1>
            <TaskForm addTask={addTask} />
            <TaskList tasks={tasks}
                toggleTaskCompletion={toggleTaskCompletion}
                deleteTask={deleteTask}
            />
        </div>
    )
}

export default App
