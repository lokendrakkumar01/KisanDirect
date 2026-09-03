# AgroConnect 🌾

**AgroConnect** is an AI-powered agricultural marketplace platform built for SIH 2026 (Smart India Hackathon), addressing Problem Statement 26033 by the Department of Consumer Affairs (DoCA).

---

## ⚡ Quick Command Guide for Localhost (Copy & Run)

Follow these exact commands to clone and run all 3 microservices locally on your machine.

### 1. Clone the Repository
```bash
git clone https://github.com/lokendrakkumar01/KisanDirect.git
cd KisanDirect
```

---

### 2. Run Backend Server (Express + Node.js + MongoDB Atlas)
Open Terminal #1:
```bash
cd server
npm install
npm run dev
```
- **Localhost URL:** `http://localhost:5000`
- **Health Check:** `http://localhost:5000/`

---

### 3. Run Frontend Client (React JS + Vite + Tailwind CSS)
Open Terminal #2:
```bash
cd client
npm install
npm run dev
```
- **Localhost URL:** `http://localhost:3000`

---

### 4. Run AI Insights Service (Python FastAPI + Machine Learning)
Open Terminal #3:

**Windows (PowerShell / Command Prompt):**
```powershell
cd ai-service
py -m venv venv
.\venv\Scripts\activate
py -m pip install -r requirements.txt
py main.py
```

**Linux / macOS / Git Bash:**
```bash
cd ai-service
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python main.py
```
- **Localhost URL:** `http://localhost:8000`
- **Docs / API:** `http://localhost:8000/docs`
- **Health Check:** `http://localhost:8000/health`

---

## 🌐 Localhost Port Summary

| Microservice | Port | URL | Description |
| :--- | :--- | :--- | :--- |
| **Frontend Client** | `3000` | `http://localhost:3000` | User Web Interface (React) |
| **Backend API** | `5000` | `http://localhost:5000` | Node.js Express REST API |
| **AI Service** | `8000` | `http://localhost:8000` | Python FastAPI Demand & Price ML Models |

---

## 🔐 Environment Setup

Create a `.env` file inside `server/`:
```env
MONGODB_URI=mongodb+srv://lokendrakuma9568_db_user:zkOWnoDmc3QOIIjJ@cluster0.mjizfzs.mongodb.net/kisandirect?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=agroconnect-super-secret-jwt-key-2026
PORT=5000
```

---

## 👥 Demo Login Credentials (All Passwords: `demo123`)

| Role | Demo Email | Password |
| :--- | :--- | :--- |
| 🌾 **Farmer** | `farmer@demo.com` (or `ramesh.patil@example.com`) | `demo123` |
| 🏭 **FPO** | `fpo@demo.com` (or `nashikfresh@example.com`) | `demo123` |
| 🛒 **Consumer** | `consumer@demo.com` (or `priya.consumer@example.com`) | `demo123` |
| 🏢 **Bulk Buyer** | `buyer@demo.com` (or `punefresh@example.com`) | `demo123` |
| 🚛 **Logistics Operator** | `logistics@demo.com` | `demo123` |
| 🛡️ **Platform Admin** | `admin@demo.com` | `demo123` |

---

## 🏗️ Project Architecture & Tech Stack

### Frontend (`/client`)
- Plain React 18 (JavaScript / JSX)
- Vite build tool & dev server
- Tailwind CSS styling
- Lucide React icons & Recharts graphs
- Leaflet + OpenStreetMap interactive maps

### Backend (`/server`)
- Node.js + Express (ES Modules)
- MongoDB Atlas official database driver
- JWT authentication & Role-Based Access Control (RBAC)
- Haversine distance matrix & vehicle route optimizer

### AI Service (`/ai-service`)
- Python 3 FastAPI + Uvicorn
- scikit-learn `RandomForestRegressor`
- Synthetic training data generator for Maharashtra agricultural market
- Real-time 7-day crop demand forecasting & price intelligence

---

## 🏆 SIH 2026 Context

- **Problem Statement ID:** 26033
- **Organization:** Department of Consumer Affairs (DoCA), Govt. of India
- **Platform Name:** AgroConnect (*Farm to Buyer, Direct & Smart*) 🚜
