import { Request, Response } from 'express';
import { getDemandForecast, getPriceIntelligence, getMarketInsights } from '../services/aiProxy';

export const demandForecast = (req: Request, res: Response) => {
  const { crop, location } = req.query;
  const data = getDemandForecast(crop as string, location as string);
  res.json({ success: true, data });
};

export const priceIntelligence = (req: Request, res: Response) => {
  const { crop, location } = req.query;
  const data = getPriceIntelligence(crop as string, location as string);
  res.json({ success: true, data });
};

export const marketInsights = (req: Request, res: Response) => {
  const { crop } = req.query;
  const data = getMarketInsights(crop as string);
  res.json({ success: true, data });
};
