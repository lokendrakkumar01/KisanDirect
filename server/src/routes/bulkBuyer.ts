import { Router } from 'express';
import { getRequirements, createRequirement } from '../controllers/bulkBuyerController';
import { authenticate } from '../middleware/auth';
import { requireRole } from '../middleware/roleGuard';

const router = Router();

router.use(authenticate);
router.use(requireRole(['bulk_buyer']));

router.get('/requirements', getRequirements);
router.post('/requirements', createRequirement);

export default router;
