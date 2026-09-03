import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { store } from '../data/store';
import { JWT_SECRET, JWT_EXPIRES_IN } from '../config/constants';
import { User, RegisterRequest, LoginRequest, ApiResponse } from '../types';

export const register = (req: Request<{}, {}, RegisterRequest>, res: Response<ApiResponse<{ token: string; user: User }>>) => {
  try {
    const { name, email, phone, password, role, location } = req.body;
    
    if (store.getUserByEmail(email)) {
      return res.status(400).json({ success: false, error: 'User already exists' });
    }

    const user: User = {
      id: uuidv4(),
      name,
      email,
      phone,
      role,
      location,
      isVerified: false,
      verificationStatus: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const hash = bcrypt.hashSync(password, 10);
    store.createUser(user, hash);

    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    
    res.status(201).json({ success: true, data: { token, user } });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const login = (req: Request<{}, {}, LoginRequest>, res: Response<ApiResponse<{ token: string; user: User }>>) => {
  try {
    const { email, password } = req.body;
    const user = store.getUserByEmail(email);
    
    if (!user) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }

    const hash = store.userPasswords[email];
    if (!bcrypt.compareSync(password, hash)) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    
    res.json({ success: true, data: { token, user } });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getMe = (req: any, res: Response<ApiResponse<User>>) => {
  res.json({ success: true, data: req.user });
};
