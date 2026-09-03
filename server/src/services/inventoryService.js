import { store } from '../data/store.js';
export const updateInventory = (listingId, quantity) => {
    const listing = store.getListingById(listingId);
    if (!listing)
        throw new Error('Listing not found');
    if (listing.availableQuantity < quantity) {
        throw new Error('Insufficient inventory');
    }
    listing.availableQuantity -= quantity;
    if (listing.availableQuantity === 0) {
        listing.status = 'sold_out';
    }
    store.updateListing(listingId, listing);
    return listing;
};
