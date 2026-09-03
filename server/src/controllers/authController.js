import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { store } from '../data/store.js';
import { JWT_SECRET, JWT_EXPIRES_IN } from '../config/constants.js';
export const register = (req, res) => {
    try {
        let { name, email, phone, password, role, location } = req.body;
        
        if (!name || !email || !password || !role) {
            return res.status(400).json({ success: false, error: 'Please provide all required fields: name, email, password, and role.' });
        }

        email = email.toLowerCase().trim();

        if (password.length < 6) {
            return res.status(400).json({ success: false, error: 'Password must be at least 6 characters long.' });
        }

        const existingUser = store.getUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ 
                success: false, 
                error: `An account with email "${email}" already exists. Please sign in instead.` 
            });
        }

        const user = {
            id: uuidv4(),
            name: name.trim(),
            email,
            phone: phone ? phone.trim() : '',
            role,
            location: location || 'Maharashtra, India',
            isVerified: false,
            verificationStatus: 'pending',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        const hash = bcrypt.hashSync(password, 10);
        store.createUser(user, hash);

        const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
        res.status(201).json({ success: true, data: { token, user } });
    }
    catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ success: false, error: error.message || 'Registration failed' });
    }
};
export const login = (req, res) => {
    try {
        let { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ success: false, error: 'Email and password are required' });
        }
        email = email.toLowerCase().trim();
        const user = store.getUserByEmail(email);
        if (!user) {
            return res.status(401).json({ success: false, error: 'Invalid email or password' });
        }
        const hash = store.userPasswords[email];
        if (!hash || !bcrypt.compareSync(password, hash)) {
            return res.status(401).json({ success: false, error: 'Invalid email or password' });
        }
        const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
        res.json({ success: true, data: { token, user } });
    }
    catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ success: false, error: error.message || 'Login failed' });
    }
};
export const getMe = (req, res) => {
    res.json({ success: true, data: req.user });
};
