import apiClient from '../interceptors/apiClient';

const TaskService = {
    getTasks: async () => {
        console.log("3. Fetching tasks from API..."); // Debugging
        try {
            const response = await apiClient.get('/tasks');
            console.log("4. API Response:", response.data); // Debugging
            return response.data;
        } catch (error) {
            console.error("5. Error fetching tasks:", error);
            throw error;
        }
    },
    addTask: async (task) => {
        console.log("Adding a new task...", task); // Debugging
        try {
            const response = await apiClient.post('/tasks', task);
            console.log("Task added:", response.data); // Debugging
            return response.data;
        } catch (error) {
            console.error("Error adding task:", error);
            throw error;
        }
    },
    toggleTaskCompletion: async (id) => {
        console.log("Toggling task completion for ID:", id); // Debugging
        try {
            await apiClient.put(`/tasks/${id}`);
            console.log("Task toggled successfully."); // Debugging
            return id;
        } catch (error) {
            console.error("Error toggling task:", error);
        }
    },
    deleteTask: async (id) => {
        console.log("Deleting task ID:", id); // Debugging
        try {
            await apiClient.delete(`/tasks/${id}`);
            console.log("Task deleted successfully."); // Debugging
            return id;
        } catch (error) {
            console.error("Error deleting task:", error);
            throw error;
        }
    },
};

export default TaskService;