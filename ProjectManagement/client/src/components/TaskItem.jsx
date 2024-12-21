/* eslint-disable react/prop-types */
const TaskItem = ({ task, toggleTaskCompletion, deleteTask }) => {
    return (
        <li style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
            <span>{task.title}</span>
            <p>{task.description}</p>
            <button onClick={() => toggleTaskCompletion(task.id)}>
                {task.completed ? 'Undo' : 'Complete' }
            </button>
            <button onClick={() => deleteTask(task.id)}>Delete</button>
        </li>
    )
}

export default TaskItem;