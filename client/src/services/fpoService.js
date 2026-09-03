import api from './api';
export const getMembers = async () => {
    const response = await api.get('/fpo/members');
    return response.data;
};
export const getInventory = async () => {
    const response = await api.get('/fpo/inventory');
    return response.data;
};
export const createAggregation = async (data) => {
    const response = await api.post('/fpo/aggregations', data);
    return response.data;
};
export const getAnalytics = async () => {
    const response = await api.get('/fpo/analytics');
    return response.data;
};
