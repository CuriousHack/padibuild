import axios from 'axios';

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

export default API;