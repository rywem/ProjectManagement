import axios from 'axios'; 
import { getAuthData } from '../hooks/authProvider'; // ✅ Import global getter

const apiClient = axios.create({
    baseURL: 'http://localhost:5110/api',
});

apiClient.interceptors.request.use((config) => {
        const { token, expires } = getAuthData(); // ✅ Fetch latest token
        if (token && Date.now() < expires) {
            config.headers["Authorization"] = `Bearer ${token}`;
        } else {
            console.warn("Token is missing or expired.");
        }
        return config;
    },
    (error) => {
        console.error("1. Request error:", error);
        return Promise.reject(error);
    }
);

export default apiClient;