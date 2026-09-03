import { store } from '../data/store.js';
import { optimizeRoute } from '../services/routeOptimizer.js';
export const getDeliveries = (req, res) => {
    const deliveries = store.getDeliveries();
    res.json({ success: true, data: deliveries });
};
export const updateDeliveryStatus = (req, res) => {
    const d = store.updateDeliveryStatus(req.params.id, req.body.status);
    if (!d)
        return res.status(404).json({ success: false, error: 'Not found' });
    res.json({ success: true, data: d });
};
export const getOptimizedRoute = (req, res) => {
    const { points, vehicleCapacity } = req.body;
    const route = optimizeRoute(points, vehicleCapacity);
    res.json({ success: true, data: route });
};
