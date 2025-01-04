import axios from 'axios'; 

const apiClient = axios.create({
    baseURL: 'http://localhost:5110/api',
});

apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    console.log('JWT Token:', token); // Debug
    if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
    }
    console.log('2. Request Headers:', config.headers); // Debugging
    return config;
},
    (error) => {
        console.error("1. Request error:", error);
        return Promise.reject(error);
    }
);

export default apiClient;