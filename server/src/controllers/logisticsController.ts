import { Response, Request } from 'express';
import { AuthRequest } from '../middleware/auth';
import { store } from '../data/store';
import { optimizeRoute } from '../services/routeOptimizer';

export const getDeliveries = (req: AuthRequest, res: Response) => {
  const deliveries = store.getDeliveries();
  res.json({ success: true, data: deliveries });
};

export const updateDeliveryStatus = (req: AuthRequest, res: Response) => {
  const d = store.updateDeliveryStatus(req.params.id as string, req.body.status);
  if (!d) return res.status(404).json({ success: false, error: 'Not found' });
  res.json({ success: true, data: d });
};

export const getOptimizedRoute = (req: Request, res: Response) => {
  const { points, vehicleCapacity } = req.body;
  const route = optimizeRoute(points, vehicleCapacity);
  res.json({ success: true, data: route });
};
