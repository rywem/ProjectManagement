/* eslint-disable react/prop-types */

import { useState } from 'react';

const TaskForm = ({ addTask }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (title.trim() === '') return;
        addTask(title, description);
        setTitle('');
        setDescription('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text"
                placeholder="Task Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required />
            <textarea placeholder="Task Description (optional)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}>                
            </textarea>
            <button type="submit">Add Task</button>
        </form>
    )
}

export default TaskForm;