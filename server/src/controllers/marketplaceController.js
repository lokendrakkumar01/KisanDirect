import { store } from '../data/store.js';
export const getListings = (req, res) => {
    let listings = store.getListings().filter(l => l.status === 'active');
    const { category, search } = req.query;
    if (category) {
        listings = listings.filter(l => l.category === category);
    }
    if (search) {
        const s = search.toLowerCase();
        listings = listings.filter(l => l.productName.toLowerCase().includes(s));
    }
    res.json({ success: true, data: listings });
};
export const getListingById = (req, res) => {
    const listing = store.getListingById(req.params.id);
    if (!listing)
        return res.status(404).json({ success: false, error: 'Not found' });
    res.json({ success: true, data: listing });
};
