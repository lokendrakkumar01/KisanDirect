import { Router } from 'express';
import { getListings, getListingById } from '../controllers/marketplaceController';

const router = Router();

router.get('/listings', getListings);
router.get('/listings/:id', getListingById);

export default router;
