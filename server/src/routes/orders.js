import { Router } from 'express';
import { createOrder, getOrders } from '../controllers/orderController.js';
import { authenticate } from '../middleware/auth.js';
const router = Router();
router.use(authenticate);
router.post('/', createOrder);
router.get('/', getOrders);
export default router;
