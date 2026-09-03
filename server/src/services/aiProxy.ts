import { DemandForecast, PriceIntelligence, MarketInsight } from '../types';

export const getDemandForecast = (crop: string, location: string): DemandForecast => {
  // Deterministic fallback (Prototype)
  return {
    crop,
    location,
    predictions: Array.from({ length: 7 }).map((_, i) => {
      const d = new Date();
      d.setDate(d.getDate() + i);
      return {
        date: d.toISOString().split('T')[0],
        day: d.toLocaleDateString('en-US', { weekday: 'short' }),
        predictedDemand: Math.floor(Math.random() * 500) + 500,
        unit: 'kg'
      };
    }),
    trend: 'increasing',
    confidence: 85,
    recommendation: `High demand expected for ${crop} in ${location} over the next week. Consider increasing supply.`,
    isPrototype: true
  };
};

export const getPriceIntelligence = (crop: string, location: string): PriceIntelligence => {
  // Deterministic fallback (Prototype)
  const basePrice = crop.toLowerCase() === 'tomato' ? 30 : crop.toLowerCase() === 'onion' ? 40 : 50;
  
  return {
    crop,
    location,
    suggestedMin: basePrice - 5,
    suggestedMax: basePrice + 10,
    recommendedReference: basePrice + 2,
    factors: [
      { name: 'Recent Local Demand', value: 'High', impact: 'positive' },
      { name: 'Weather Forecast', value: 'Rain Expected', impact: 'positive' },
      { name: 'Supply Volume', value: 'Average', impact: 'neutral' }
    ],
    isPrototype: true
  };
};

export const getMarketInsights = (crop: string): MarketInsight => {
  return {
    crop,
    expectedDemand: 1500,
    currentSupply: 1000,
    demandSupplyGap: 500,
    trend: 'Shortage',
    trendPercentage: 33,
    recommendation: 'Good opportunity for FPOs to aggregate and supply.',
    isPrototype: true
  };
};
