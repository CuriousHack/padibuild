import axios from 'axios';
import toast from 'react-hot-toast';

const API = axios.create({
    baseURL: '/api', // This points to the proxy we set in vite.config.js
});

// Automatically add the token to every request if it exists
API.interceptors.request.use((req) => {
    const token = localStorage.getItem('padiToken');
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});

API.interceptors.response.use(
    (response) => {
        // Automatically toast success messages if the backend sends a "message"
        if (response.data?.message) {
            toast.success(response.data.message);
        }
        return response;
    },
    (error) => {
        const message = error.response?.data?.message || "An unexpected error occurred";
        
        // Don't toast 401 errors (usually handled by redirecting to login)
        if (error.response?.status !== 401) {
            toast.error(message);
        }
        
        console.error("🔥 API ERROR:", error);
        return Promise.reject(error);
    }
);

export default API;