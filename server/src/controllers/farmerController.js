import { store } from '../data/store.js';
import { v4 as uuidv4 } from 'uuid';
export const getProfile = (req, res) => {
    const profile = store.farmerProfiles.find(p => p.userId === req.user.id);
    res.json({ success: true, data: profile });
};
export const getListings = (req, res) => {
    const listings = store.getListings().filter(l => l.farmerId === req.user.id);
    res.json({ success: true, data: listings });
};
export const createListing = (req, res) => {
    const profile = store.farmerProfiles.find(p => p.userId === req.user.id);
    if (!profile)
        return res.status(400).json({ success: false, error: 'Profile not found' });
    const data = req.body;
    const listing = store.createListing({
        id: uuidv4(),
        farmerId: req.user.id,
        farmerName: req.user.name,
        farmName: profile.farmName,
        ...data,
        availableQuantity: data.quantity,
        location: profile.location,
        rating: 0,
        totalReviews: 0,
        sellerType: 'farmer',
        status: 'active',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    });
    res.status(201).json({ success: true, data: listing });
};
