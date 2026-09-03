import api from './api';
export const getProfile = async () => {
    const response = await api.get('/farmer/profile');
    return response.data;
};
export const getListings = async () => {
    const response = await api.get('/farmer/listings');
    return response.data;
};
export const createListing = async (data) => {
    const response = await api.post('/farmer/listings', data);
    return response.data;
};
export const updateListing = async (id, data) => {
    const response = await api.put(`/farmer/listings/${id}`, data);
    return response.data;
};
export const deleteListing = async (id) => {
    const response = await api.delete(`/farmer/listings/${id}`);
    return response.data;
};
export const getEarnings = async () => {
    const response = await api.get('/farmer/earnings');
    return response.data;
};
export const getHarvests = async () => {
    const response = await api.get('/farmer/harvests');
    return response.data;
};
