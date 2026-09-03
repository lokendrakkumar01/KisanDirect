import { Router } from 'express';
import { getDeliveries, updateDeliveryStatus, getOptimizedRoute } from '../controllers/logisticsController';
import { authenticate } from '../middleware/auth';
import { requireRole } from '../middleware/roleGuard';

const router = Router();

router.use(authenticate);
router.use(requireRole(['logistics']));

router.get('/deliveries', getDeliveries);
router.put('/deliveries/:id/status', updateDeliveryStatus);
router.post('/optimize-route', getOptimizedRoute);

export default router;
