import api from './api';
export const getDemandForecast = async (crop, location) => {
    const response = await api.get('/ai/demand-forecast', { params: { crop, location } });
    return response.data;
};
export const getPriceIntelligence = async (crop, location) => {
    const response = await api.get('/ai/price', { params: { crop, location }, timeout: 3000 });
    return response.data;
};
export const getMarketInsight = async (crop) => {
    const response = await api.get('/ai/insights', { params: { crop } });
    return response.data;
};
