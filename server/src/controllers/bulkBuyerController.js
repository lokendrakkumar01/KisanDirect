import { store } from '../data/store.js';
import { v4 as uuidv4 } from 'uuid';
import { matchSellers } from '../services/matchingEngine.js';
export const getRequirements = (req, res) => {
    const requirements = store.getBulkRequirements().filter(r => r.buyerId === req.user.id);
    res.json({ success: true, data: requirements });
};
export const createRequirement = (req, res) => {
    const buyer = store.buyerProfiles.find(b => b.userId === req.user.id);
    const reqData = store.createBulkRequirement({
        id: uuidv4(),
        buyerId: req.user.id,
        buyerName: req.user.name,
        businessName: buyer?.businessName || req.user.name,
        ...req.body,
        status: 'active',
        matchedOffers: 0,
        createdAt: new Date().toISOString()
    });
    // Find matches immediately
    const matches = matchSellers(reqData);
    res.status(201).json({
        success: true,
        data: {
            requirement: reqData,
            matches: matches.slice(0, 5)
        }
    });
};
