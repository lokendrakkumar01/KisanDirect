import { Request, Response } from 'express';
import { store } from '../data/store';

export const getListings = (req: Request, res: Response) => {
  let listings = store.getListings().filter(l => l.status === 'active');
  const { category, search } = req.query;

  if (category) {
    listings = listings.filter(l => l.category === category);
  }
  
  if (search) {
    const s = (search as string).toLowerCase();
    listings = listings.filter(l => l.productName.toLowerCase().includes(s));
  }

  res.json({ success: true, data: listings });
};

export const getListingById = (req: Request, res: Response) => {
  const listing = store.getListingById(req.params.id as string);
  if (!listing) return res.status(404).json({ success: false, error: 'Not found' });
  res.json({ success: true, data: listing });
};
