import api from './api';
export const getDemandForecast = async (crop, location) => {
    const response = await api.get('/ai/demand-forecast', { params: { crop, location } });
    return response.data;
};
export const getPriceIntelligence = async (crop, location) => {
    const response = await api.get('/ai/price-intelligence', { params: { crop, location } });
    return response.data;
};
export const getMarketInsight = async (crop) => {
    const response = await api.get('/ai/market-insight', { params: { crop } });
    return response.data;
};
