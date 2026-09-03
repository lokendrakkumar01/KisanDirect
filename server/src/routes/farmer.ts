import { Router } from 'express';
import { getProfile, getListings, createListing } from '../controllers/farmerController';
import { authenticate } from '../middleware/auth';
import { requireRole } from '../middleware/roleGuard';

const router = Router();

router.use(authenticate);
router.use(requireRole(['farmer']));

router.get('/profile', getProfile);
router.get('/listings', getListings);
router.post('/listings', createListing);

export default router;
