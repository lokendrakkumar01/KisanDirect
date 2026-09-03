import { Router } from 'express';
import { demandForecast, priceIntelligence, marketInsights } from '../controllers/aiController.js';
const router = Router();
router.get('/demand', demandForecast);
router.get('/price', priceIntelligence);
router.get('/insights', marketInsights);
export default router;
