import { Router } from 'express';
import { getNotifications, markRead } from '../controllers/notificationController.js';
import { authenticate } from '../middleware/auth.js';
const router = Router();
router.use(authenticate);
router.get('/', getNotifications);
router.put('/:id/read', markRead);
export default router;
