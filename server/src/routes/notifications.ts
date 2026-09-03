import { Router } from 'express';
import { getNotifications, markRead } from '../controllers/notificationController';
import { authenticate } from '../middleware/auth';

const router = Router();

router.use(authenticate);
router.get('/', getNotifications);
router.put('/:id/read', markRead);

export default router;
