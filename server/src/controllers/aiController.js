import { getDemandForecast, getPriceIntelligence, getMarketInsights } from '../services/aiProxy.js';
export const demandForecast = (req, res) => {
    const { crop, location } = req.query;
    const data = getDemandForecast(crop, location);
    res.json({ success: true, data });
};
export const priceIntelligence = (req, res) => {
    const { crop, location } = req.query;
    const data = getPriceIntelligence(crop, location);
    res.json({ success: true, data });
};
export const marketInsights = (req, res) => {
    const { crop } = req.query;
    const data = getMarketInsights(crop);
    res.json({ success: true, data });
};
