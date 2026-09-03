import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { apiLimiter } from './middleware/rateLimiter';
import { errorHandler } from './middleware/errorHandler';
import routes from './routes';
import { mongoDb } from './config/database';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', apiLimiter);

app.get('/', (req, res) => {
  res.json({
    message: 'KisanDirect Backend API Server is running!',
    frontendUrl: 'http://localhost:3000',
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
