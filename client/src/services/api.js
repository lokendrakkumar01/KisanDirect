import axios from 'axios';
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || '/api',
    headers: {
        'Content-Type': 'application/json',
    },
});
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
}, (error) => Promise.reject(error));
api.interceptors.response.use((response) => response, (error) => {
    // Handle global errors here (e.g., redirect on 401)
    if (error.response && error.response.status === 401) {
        localStorage.removeItem('token');
        // Potential redirect to login logic can be added here or in AuthContext
    }
    return Promise.reject(error);
});
export default api;
