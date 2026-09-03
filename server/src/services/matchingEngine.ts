import { BulkRequirement, Offer, CropListing } from '../types';
import { store } from '../data/store';

// Haversine distance calculator
const getDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const R = 6371; // Radius of the earth in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * 
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); 
  return R * c; 
};

export const matchSellers = (requirement: BulkRequirement) => {
  const listings = store.getListings().filter(l => 
    l.status === 'active' && 
    l.category === requirement.category &&
    l.productName.toLowerCase().includes(requirement.productName.toLowerCase())
  );

  const matches = listings.map(listing => {
    let score = 0;
    const reasons = [];

    // productMatch (0.25)
    score += 0.25;
    reasons.push({ factor: 'Product', status: 'pass', detail: 'Exact product match' });

    // quantityScore (0.20)
    if (listing.availableQuantity >= requirement.requiredQuantity) {
      score += 0.20;
      reasons.push({ factor: 'Quantity', status: 'pass', detail: 'Sufficient quantity available' });
    } else if (listing.availableQuantity >= requirement.requiredQuantity * 0.5) {
      score += 0.10;
      reasons.push({ factor: 'Quantity', status: 'partial', detail: 'Partial quantity available' });
    } else {
      reasons.push({ factor: 'Quantity', status: 'fail', detail: 'Insufficient quantity' });
    }

    // priceScore (0.20)
    if (listing.price <= requirement.maxBudget) {
      score += 0.20;
      reasons.push({ factor: 'Price', status: 'pass', detail: 'Within budget' });
    } else {
      const excess = (listing.price - requirement.maxBudget) / requirement.maxBudget;
      if (excess <= 0.1) {
        score += 0.10;
        reasons.push({ factor: 'Price', status: 'partial', detail: 'Slightly over budget' });
      } else {
        reasons.push({ factor: 'Price', status: 'fail', detail: 'Over budget' });
      }
    }

    // distanceScore (0.15)
    const distance = getDistance(
      requirement.deliveryLocation.lat, requirement.deliveryLocation.lng,
      listing.location.lat, listing.location.lng
    );
    if (distance <= 50) {
      score += 0.15;
      reasons.push({ factor: 'Distance', status: 'pass', detail: `${distance.toFixed(1)} km away` });
    } else if (distance <= 200) {
      score += 0.07;
      reasons.push({ factor: 'Distance', status: 'partial', detail: `${distance.toFixed(1)} km away` });
    } else {
      reasons.push({ factor: 'Distance', status: 'fail', detail: `${distance.toFixed(1)} km away` });
    }

    // qualityScore (0.10)
    if (listing.qualityGrade === requirement.qualityRequirement) {
      score += 0.10;
      reasons.push({ factor: 'Quality', status: 'pass', detail: 'Matches quality requirement' });
    } else {
      reasons.push({ factor: 'Quality', status: 'fail', detail: `Grade ${listing.qualityGrade}` });
    }

    // availabilityScore (0.10)
    score += 0.10;
    reasons.push({ factor: 'Availability', status: 'pass', detail: 'Currently available' });

    return { listing, score: score * 100, reasons, distance };
  });

  return matches.sort((a, b) => b.score - a.score);
};
