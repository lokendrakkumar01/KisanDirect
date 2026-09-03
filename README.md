# KisanDirect (किसानडायरेक्ट) 🌾

> **"Farm to Buyer, Direct & Smart."**  
> *Connecting Farmers, FPOs, Consumers, and Bulk Buyers through AI-powered market intelligence and smart logistics.*

---

## 📌 Project Context

- **Event**: Smart India Hackathon (SIH) 2026
- **Problem Statement ID**: `26033`
- **Problem Statement**: *"Multiple intermediaries reduce farmers' earnings and increase consumer prices."*
- **Organization**: Ministry of Consumer Affairs, Food & Public Distribution
- **Department**: Department of Consumer Affairs (DoCA)
- **Category**: Software
- **Theme**: Agriculture, FoodTech & Rural Development

---

## 🚀 Key Differentiators & Product Pillars

Unlike generic e-commerce platforms or static dashboards, **KisanDirect** is an end-to-end, dynamic agricultural ecosystem where every action propagates across all platform modules in real-time.

1. **Direct Agricultural Marketplace**: Direct B2C and B2B produce listings eliminating supply chain middle-layers.
2. **FPO Produce Aggregation**: Allows Farmer Producer Organizations to pool smallholder output into bulk listings to achieve economies of scale.
3. **Smart B2B Matching Engine**: Multi-factor algorithm matching bulk buyer requirements with optimal sellers based on produce type, volume, target price, geographic distance, and quality grade.
4. **AI Demand Forecasting**: Time-series demand forecasting trained on historical market data using `RandomForestRegressor`.
5. **AI Reference Price Intelligence**: Dynamic reference pricing providing transparent target price ranges with explainable factors (seasonality, supply/demand balance, regional mandi trends).
6. **Logistics Route Optimization**: Capacitated Vehicle Routing Problem (CVRP) optimizer using a Nearest-Neighbor heuristic to consolidate multi-pickup and delivery routes.
7. **Transparent Price Breakdown**: Visual cost distribution showing exact farmer realization vs. logistics and platform service fees.
8. **Real-time Order & Delivery Tracking**: End-to-end order lifecycle tracking from `Confirmed` → `Pickup Scheduled` → `Picked Up` → `In Transit` → `Delivered`.
9. **Interactive Geospatial Mapping**: OpenStreetMap + Leaflet visualization of farms, FPO centers, buyer locations, and delivery vehicle routes across Maharashtra.
10. **Prototype Impact Measurement**: Dedicated impact dashboard showing estimated logistics distance saved, cost reduction, and farmer income improvement.

---

## 🛠️ Technology Architecture

### **Frontend** (`/client`)
- **Framework**: React 18 + Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS (Agriculture palette: primary green, amber accent, earth brown)
- **UI Components**: Custom reusable design system (Buttons, Cards, Badges, Modals, Status Timelines, Price Breakdown)
- **Icons**: Lucide React
- **Charts**: Recharts (Demand curves, price trends, revenue distribution, user growth)
- **Maps**: Leaflet + React-Leaflet (OpenStreetMap tile provider)
- **HTTP Client**: Axios with JWT Interceptors

### **Backend API** (`/server`)
- **Runtime**: Node.js + Express.js (TypeScript)
- **Database**: MongoDB Atlas (`mongodb+srv://...`) + PostgreSQL SQL DDL
- **Auth**: JWT Authentication with Role-Based Access Control (RBAC)
- **State Management**: MongoDB Atlas Connection + Synchronized Data Store
- **Services**:
  - `MatchingEngine`: Weighted multi-factor seller matching algorithm
  - `RouteOptimizer`: CVRP nearest-neighbor routing engine
  - `AIProxyService`: FastAPI bridge with deterministic ML prototype fallback
  - `PricingService`: Transparent breakdown calculator

### **AI / ML Service** (`/ai-service`)
- **Framework**: Python 3.11 + FastAPI
- **Libraries**: scikit-learn, pandas, numpy, pydantic
- **Models**:
  - `DemandForecaster`: `RandomForestRegressor` trained on 90-day historical crop demand with lag and rolling features
  - `PricePredictor`: `RandomForestRegressor` ensemble predicting min/max/reference market rates with explainable feature importances

### **Database Schema** (`/server/src/database/schema.sql`)
- Production-ready PostgreSQL + PostGIS relational DDL containing 27 tables with spatial GiST indexing, transactional foreign key constraints, and check constraints for financial integrity.

---

## 📊 End-to-End Connected Journey

```
Farmer Lists Produce (Ramesh Farm)
   ↓ (Inventory Updates & Marketplace Displayed)
Bulk Buyer Posts Requirement (Pune Fresh Restaurant)
   ↓ (Smart Matching Engine evaluates 92% match)
Offer Accepted & Order Created
   ↓ (Order & Payment Escrow Init)
Logistics Delivery Assigned
   ↓ (Nearest-Neighbor Route Optimization: 440 km → 280 km)
Status Tracking (In-Transit → Out for Delivery → Delivered)
   ↓
Farmer Realization Credited & Analytics/Impact Dashboard Updated
```

---

## 🔑 Demo Credentials (SIH 2026 Demo Mode)

The Login page includes a **One-Click Demo Login Panel** to instantly test each role persona:

| Role Persona | Email | Password | Persona Context |
| :--- | :--- | :--- | :--- |
| 🧑‍🌾 **Farmer** | `farmer@demo.com` | `demo123` | Ramesh Farm, Nashik (1000 KG Tomato, Grade A) |
| 🏬 **FPO** | `fpo@demo.com` | `demo123` | Nashik Fresh Farmers FPO (50 Member Farmers) |
| 🏢 **Bulk Buyer** | `buyer@demo.com` | `demo123` | Pune Fresh Restaurant (Bulk Tomato Requirement) |
| 🛒 **Consumer** | `consumer@demo.com` | `demo123` | Retail Buyer (Browse, Cart, Order, Track) |
| 🚚 **Logistics** | `logistics@demo.com` | `demo123` | Maharashtra Agrilogistics (Vehicle Fleet & Route Engine) |
| 🛡️ **Admin** | `admin@demo.com` | `demo123` | DoCA Platform Admin (System KPIs, Users, Complaints) |

---

## ⚡ Quick Start & Installation Guide

### Prerequisites
- Node.js >= 18.x
- npm >= 9.x
- Python >= 3.10 (Optional: for running the standalone Python FastAPI AI service)

### 1️⃣ Clone & Configure Environment

```bash
git clone https://github.com/your-org/KisanDirect.git
cd KisanDirect

# Copy environment template
cp .env.example .env
```

### 2️⃣ Start Backend Server

```bash
cd server
npm install
npm run dev
# Server starts on http://localhost:5000
```

### 3️⃣ Start Frontend Client

In a new terminal:
```bash
cd client
npm install
npm run dev
# App opens on http://localhost:3000
```

### 4️⃣ Start Python AI Service (Optional)

In a third terminal:
```bash
cd ai-service
pip install -r requirements.txt
python main.py
# AI service starts on http://localhost:8000
```

*Note: If the Python AI service is not running, the Node.js backend seamlessly defaults to built-in deterministic ML prototype predictions (clearly tagged as "Prototype AI Prediction").*

---

## 📍 Key Operational Routes

- **Public Landing**: `/`
- **Agri Marketplace**: `/marketplace`
- **Farmer Dashboard**: `/farmer/dashboard`
- **Add Produce**: `/farmer/listings/new`
- **AI Insights & Forecasting**: `/farmer/insights`
- **B2B Bulk Requirements**: `/buyer/dashboard`
- **Smart Matching Engine**: `/buyer/find`
- **FPO Aggregation Hub**: `/fpo/aggregation`
- **Logistics & Route Optimizer**: `/logistics/routes`
- **Live Logistics Map**: `/logistics/map`
- **Admin Command Center**: `/admin/dashboard`
- **Impact Measurement**: `/admin/impact`

---

## 📜 License & Acknowledgements

Developed for **Smart India Hackathon 2026** under Problem Statement `26033` for the **Department of Consumer Affairs (DoCA), Ministry of Consumer Affairs, Food & Public Distribution**.
