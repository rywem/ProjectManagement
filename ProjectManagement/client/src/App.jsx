/* eslint-disable no-unused-vars */
import { useSelector, useDispatch } from 'react-redux';
import { addTask, toggleTaskCompletion, deleteTask, getTasks, setFilter} from './tasksSlice';
import { useEffect } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import Login from './components/Login';
import Register from './components/Register';
import AuthProvider from './hooks/authProvider';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
const App = () => {
    const dispatch = useDispatch();
    const tasks = useSelector((state) => state.tasks.tasks);
    const filter = useSelector((state) => state.tasks.filter);
    const status = useSelector((state) => state.tasks.status);
    const error = useSelector((state) => state.tasks.error);

    useEffect(() => {
        if (status === 'idle') {
          dispatch(getTasks());
        }
      }, [status, dispatch]);
    
      const filteredTasks = tasks.filter((task) => {
        if (filter === 'active') return !task.completed;
        if (filter === 'completed') return task.completed;
        return true;
      });                    
    
      return (
        <AuthProvider>
            <Routes>
                {/* Public Routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/" element={<Navigate to="/tasks" replace />} />

                {/* Protected Routes */}
                <Route
                    path="/tasks"
                    element={
                        <ProtectedRoute>
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
                                    <button
                                        onClick={() => dispatch(setFilter('all'))}
                                        className="button-small"
                                    >
                                        All
                                    </button>
                                    <button
                                        onClick={() => dispatch(setFilter('active'))}
                                        className="button-small"
                                    >
                                        Active
                                    </button>
                                    <button
                                        onClick={() => dispatch(setFilter('completed'))}
                                        className="button-small"
                                    >
                                        Completed
                                    </button>
                                </div>

                                <TaskList
                                    tasks={filteredTasks}
                                    toggleTaskCompletion={(id) =>
                                        dispatch(toggleTaskCompletion(id))
                                    }
                                    deleteTask={(id) => dispatch(deleteTask(id))}
                                />
                            </div>
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </AuthProvider>
    );
};

export default App
