import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

const AuthService = {
    register: async (username, password) => {
        try {
            const response = await axios.post(`${API_URL}/register`, {
                username,
                password,
            });
            return response.data;
        } catch (error) {
            console.error("Error during registration: ", error.response?.data || error.message);
            throw error;
        }
    },

    login: async (username, password) => {
        try {
            const response = await axios.post(`${API_URL}/login`, {
                username,
                password,
            });
            return response.data.token;
        } catch (error) {
            console.error("Error during login: ", error.response?.data || error.message);
            throw error;
        }
    },
}

export default AuthService;