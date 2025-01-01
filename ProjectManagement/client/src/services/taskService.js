import apiClient from '../interceptors/apiClient';

const TaskService = {
    getTasks: async () => {
        try {
            const response = await apiClient.get('/Tasks');
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
    addTask: async (task) => {
        try {
            const response = await apiClient.post('/Tasks', task);
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
    toggleTaskCompletion: async (id) => {
        try {
            await apiClient.put(`/Tasks/${id}`);
            return id;
        } catch (error) {
            console.error(error);
        }
    },
    deleteTask: async (id) => {
        try {
            await apiClient.delete(`/Tasks/${id}`);
            return id;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
}

export default TaskService;