import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/constants.js';
import { store } from '../data/store.js';
export const authenticate = (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({ success: false, error: 'Authentication required' });
        }
        const decoded = jwt.verify(token, JWT_SECRET);
        const user = store.getUserById(decoded.id);
        if (!user) {
            return res.status(401).json({ success: false, error: 'User not found' });
        }
        req.user = user;
        next();
    }
    catch (error) {
        res.status(401).json({ success: false, error: 'Invalid token' });
    }
};
