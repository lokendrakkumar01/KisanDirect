# AgroConnect 🌾

**AgroConnect** is an AI-powered agricultural marketplace platform built for SIH 2026 (Smart India Hackathon), addressing Problem Statement 26033 by the Department of Consumer Affairs (DoCA).

## Project Overview

AgroConnect connects farmers directly with consumers and bulk buyers, eliminating middlemen and ensuring fair prices for all. The platform uses AI-driven demand forecasting, route optimization, and smart matching to make agricultural trade efficient and transparent.

## Features

- 🌾 **Farmer Portal** — List produce, track orders, view AI-driven price insights
- 🏪 **Marketplace** — Browse fresh farm produce with full price transparency
- 🏭 **FPO Management** — Farmer Producer Organization tools for aggregation and bulk sales
- 📦 **Bulk Buyer Portal** — Post requirements, get smart seller matching
- 🚛 **Logistics Management** — Route optimization, delivery tracking
- 👤 **Consumer Dashboard** — Cart, checkout, track deliveries
- 🤖 **AI Insights** — Demand forecasting, price intelligence, market analysis
- 🔐 **Role-Based Access** — Farmer, FPO, Consumer, Bulk Buyer, Logistics, Admin

## Tech Stack

### Frontend
- React 18 + Vite
- Tailwind CSS
- React Router v6
- Recharts (data visualization)
- React Leaflet + OpenStreetMap (maps)
- Lucide React (icons)
- Axios (HTTP)

### Backend
- Node.js + Express.js
- MongoDB Atlas (database)
- JWT Authentication
- Role-Based Access Control (RBAC)
- In-Memory data store (fallback)

### AI Service
- Python FastAPI
- scikit-learn (RandomForest demand forecasting)
- Price intelligence algorithms

## Project Structure

```
KisanDirect/
├── client/          # React frontend (port 3000)
├── server/          # Express backend (port 5000)
└── ai-service/      # Python FastAPI AI service (port 8000)
```

## Quick Start

### 1. Clone the repository
```bash
git clone https://github.com/lokendrakkumar01/KisanDirect.git
cd KisanDirect
```

### 2. Backend (Server)
```bash
cd server
npm install
npm run dev
```
Server runs at: `http://localhost:5000`

### 3. Frontend (Client)
```bash
cd client
npm install
npm run dev
```
Frontend runs at: `http://localhost:3000`

### 4. AI Service (Python)
```bash
cd ai-service
py -m venv venv
venv\Scripts\activate
py -m pip install -r requirements.txt
py main.py
```
AI Service runs at: `http://localhost:8000`

## Environment Variables

Create `server/.env`:
```
MONGODB_URI=mongodb+srv://lokendrakuma9568_db_user:zkOWnoDmc3QOIIjJ@cluster0.mjizfzs.mongodb.net/kisandirect?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=agroconnect-super-secret-jwt-key-2026
PORT=5000
```

## Demo Accounts

| Role | Email | Password |
|------|-------|----------|
| Farmer | ramesh.patil@example.com | demo123 |
| FPO | nashikfresh@example.com | demo123 |
| Consumer | priya.consumer@example.com | demo123 |
| Bulk Buyer | punefresh@example.com | demo123 |
| Logistics | logistics@example.com | demo123 |
| Admin | admin@kisandirect.com | demo123 |

## Built for SIH 2026

Problem Statement 26033 | Department of Consumer Affairs (DoCA)

---

*AgroConnect — Farm to Buyer, Direct & Smart* 🚜
