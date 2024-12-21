import { useState } from 'react'

import './App.css'
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';

const App = () => {
    const [tasks, setTasks] = useState([]); // creates an empty array 'tasks', also, 'setTasks' is a react provided 
                                            // its important to note that tasks is immutable.
    const addTask = (title, description) => {
        // ...tasks is the javascript spread operator. 
        // which create because it tasks is immutable, it creates a new task array and adding the newly added task to the end of the array
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
