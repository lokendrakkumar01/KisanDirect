import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { apiLimiter } from './middleware/rateLimiter.js';
import { errorHandler } from './middleware/errorHandler.js';
import routes from './routes/index.js';
import { mongoDb } from './config/database.js';
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', apiLimiter);
app.get('/', (req, res) => {
    res.json({
        message: 'AgroConnect Backend API Server is running!',
        frontendUrl: process.env.FRONTEND_URL || 'https://agroconnect-on1t.onrender.com',
        documentation: 'SIH 2026 Problem Statement 26033 - DoCA',
        status: 'online',
        database: mongoDb.isDbConnected() ? 'MongoDB Atlas (Connected)' : 'In-Memory Store (Active)',
        endpoints: '/api'
    });
});
app.use('/api', routes);
app.use(errorHandler);
const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
    console.log(`Server running on port ${PORT}`);
    await mongoDb.connect();
});
