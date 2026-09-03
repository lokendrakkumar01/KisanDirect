import api from './api';

export const getDashboard = async () => {
    const response = await api.get('/admin/dashboard');
    return response.data;
};

export const getUsers = async () => {
    const response = await api.get('/admin/users');
    return response.data;
};

export const verifyUser = async (id, status) => {
    const response = await api.post(`/admin/users/${id}/verify`, { status });
    return response.data;
};

export const updateUserRole = async (id, role) => {
    const response = await api.post(`/admin/users/${id}/role`, { role });
    return response.data;
};

export const getAnalytics = async () => {
    const response = await api.get('/admin/analytics');
    return response.data;
};
