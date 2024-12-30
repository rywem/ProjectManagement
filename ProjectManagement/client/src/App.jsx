import { useSelector, useDispatch } from 'react-redux';
import { addTask, toggleTaskCompletion, deleteTask, fetchTasks, setFilter} from './tasksSlice';
import { useEffect } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';

const App = () => {
    const dispatch = useDispatch();
    const tasks = useSelector((state) => state.tasks.tasks);
    const filter = useSelector((state) => state.tasks.filter);
    const status = useSelector((state) => state.tasks.status);
    const error = useSelector((state) => state.tasks.error);

    useEffect(() => {
        if (status === 'idle') {
          dispatch(fetchTasks());
        }
      }, [status, dispatch]);
    
      const filteredTasks = tasks.filter((task) => {
        if (filter === 'active') return !task.completed;
        if (filter === 'completed') return task.completed;
        return true;
      });                    
    
      return (
        <div>
          <h1>Task Manager</h1>
          {status === 'loading' && <p>Loading...</p>}
          {status === 'failed' && <p>Error: {error}</p>}
    
          <TaskForm
            addTask={(title, description) =>
              dispatch(addTask({ title, description }))
            }
          />
    
          <div>
            <button onClick={() => dispatch(setFilter('all'))}>All</button>
            <button onClick={() => dispatch(setFilter('active'))}>Active</button>
            <button onClick={() => dispatch(setFilter('completed'))}>Completed</button>
          </div>
    
          <TaskList
            tasks={filteredTasks}
            toggleTaskCompletion={(id) =>
              dispatch(toggleTaskCompletion(id))
            }
            deleteTask={(id) => dispatch(deleteTask(id))}
          />
        </div>
    );
};

export default App
