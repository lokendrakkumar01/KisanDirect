import api from './api';
import { ApiResponse, DemandForecast, PriceIntelligence, MarketInsight } from '../types';

export const getDemandForecast = async (crop: string, location: string): Promise<ApiResponse<DemandForecast>> => {
  const response = await api.get('/ai/demand-forecast', { params: { crop, location } });
  return response.data;
};

export const getPriceIntelligence = async (crop: string, location: string): Promise<ApiResponse<PriceIntelligence>> => {
  const response = await api.get('/ai/price-intelligence', { params: { crop, location } });
  return response.data;
};

export const getMarketInsight = async (crop: string): Promise<ApiResponse<MarketInsight>> => {
  const response = await api.get('/ai/market-insight', { params: { crop } });
  return response.data;
};
