import api from './api';
export const getProducts = async (filters) => {
    const response = await api.get('/marketplace/products', { params: filters });
    return response.data;
};
export const getProductById = async (id) => {
    const response = await api.get(`/marketplace/products/${id}`);
    return response.data;
};
export const searchProducts = async (query) => {
    const response = await api.get('/marketplace/search', { params: { q: query } });
    return response.data;
};
