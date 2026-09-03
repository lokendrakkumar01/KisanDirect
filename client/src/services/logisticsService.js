import api from './api';
export const getDeliveries = async () => {
    const response = await api.get('/logistics/deliveries');
    return response.data;
};
export const getDeliveryById = async (id) => {
    const response = await api.get(`/logistics/deliveries/${id}`);
    return response.data;
};
export const updateDeliveryStatus = async (id, status, note) => {
    const response = await api.patch(`/logistics/deliveries/${id}/status`, { status, note });
    return response.data;
};
export const getVehicles = async () => {
    const response = await api.get('/logistics/vehicles');
    return response.data;
};
export const getDrivers = async () => {
    const response = await api.get('/logistics/drivers');
    return response.data;
};
export const optimizeRoute = async (points) => {
    const response = await api.post('/logistics/routes/optimize', { points });
    return response.data;
};
