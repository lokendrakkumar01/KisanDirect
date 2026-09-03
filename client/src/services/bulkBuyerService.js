import api from './api';
export const postRequirement = async (data) => {
    const response = await api.post('/bulk-buyer/requirements', data);
    return response.data;
};
export const getRequirements = async () => {
    const response = await api.get('/bulk-buyer/requirements');
    return response.data;
};
export const getOffers = async (requirementId) => {
    const response = await api.get(`/bulk-buyer/requirements/${requirementId}/offers`);
    return response.data;
};
export const respondToOffer = async (offerId, action) => {
    const response = await api.post(`/bulk-buyer/offers/${offerId}/respond`, { action });
    return response.data;
};
