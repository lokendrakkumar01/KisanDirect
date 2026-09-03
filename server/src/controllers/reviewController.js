import { store } from '../data/store.js';
import { v4 as uuidv4 } from 'uuid';
export const getReviews = (req, res) => {
    res.json({ success: true, data: store.getReviews() });
};
export const createReview = (req, res) => {
    const r = store.createReview({
        id: uuidv4(),
        reviewerId: req.user.id,
        reviewerName: req.user.name,
        createdAt: new Date().toISOString(),
        ...req.body
    });
    res.status(201).json({ success: true, data: r });
};
