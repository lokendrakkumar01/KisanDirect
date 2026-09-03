"""
KisanDirect AI Service — Main FastAPI Application

Agricultural marketplace AI microservice providing:
- 7-day crop demand forecasting
- Fair price prediction with explainable factors

Built for Smart India Hackathon 2026.
All predictions use prototype models trained on synthetic data.

Usage:
    uvicorn main:app --host 0.0.0.0 --port 8000 --reload
"""

import logging
from contextlib import asynccontextmanager
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from schemas.requests import DemandPredictionRequest, PricePredictionRequest
from schemas.responses import DemandPredictionResponse, PricePredictionResponse
from services.forecasting import ForecastingService
from services.pricing import PricingService

# ─── Logging Configuration ─────────────────────────────────────────────────────
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s | %(name)s | %(levelname)s | %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S",
)
logger = logging.getLogger("kisandirect.ai")

# ─── Service Instances ──────────────────────────────────────────────────────────
forecasting_service = ForecastingService()
pricing_service = PricingService()

# ─── Common crops to pre-train at startup ────────────────────────────────────
PRE_TRAIN_CONFIGS = [
    ("Tomato", "Nashik"),
    ("Onion", "Nashik"),
    ("Potato", "Nashik"),
]


# ─── Application Lifespan ───────────────────────────────────────────────────────
@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Pre-train models for common crops on startup.
    This ensures the first API call for popular crop+location
    combinations responds quickly without training delay.
    """
    logger.info("🌾 KisanDirect AI Service starting up...")
    logger.info("Pre-training models for common crops...")

    for crop, location in PRE_TRAIN_CONFIGS:
        try:
            forecasting_service.pre_train(crop, location)
            pricing_service.pre_train(crop, location)
            logger.info(f"  ✅ Pre-trained: {crop} at {location}")
        except Exception as e:
            logger.warning(f"  ⚠️ Pre-training failed for {crop} at {location}: {e}")

    logger.info("🚀 AI Service ready! Models pre-trained and serving on port 8000")
    yield
    logger.info("🛑 KisanDirect AI Service shutting down...")


# ─── FastAPI App ─────────────────────────────────────────────────────────────────
app = FastAPI(
    title="KisanDirect AI Service",
    description=(
        "Agricultural marketplace AI microservice for demand forecasting "
        "and fair price prediction. Built for Smart India Hackathon 2026. "
        "All predictions are prototype simulations using synthetic training data."
    ),
    version="1.0.0",
    lifespan=lifespan,
    docs_url="/docs",
    redoc_url="/redoc",
)

# ─── CORS Middleware (allow all origins for development) ─────────────────────
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ─── Health Check Endpoint ───────────────────────────────────────────────────────
@app.get("/health", tags=["Health"])
async def health_check():
    """
    Health check endpoint for monitoring and load balancer probes.
    Returns service status and number of cached models.
    """
    return {
        "status": "healthy",
        "service": "KisanDirect AI Service",
        "version": "1.0.0",
        "models_cached": {
            "demand": len(forecasting_service._models),
            "pricing": len(pricing_service._models),
        },
        "is_prototype": True,
    }


# ─── Demand Prediction Endpoint ─────────────────────────────────────────────────
@app.post(
    "/predict/demand",
    response_model=DemandPredictionResponse,
    tags=["Predictions"],
    summary="Predict 7-day crop demand",
    description=(
        "Generates a 7-day demand forecast for a specific crop at a given location. "
        "Uses RandomForest model trained on seasonal, temporal, and supply features. "
        "Prototype AI Prediction — uses synthetic training data."
    ),
)
async def predict_demand(request: DemandPredictionRequest):
    """
    Generate 7-day demand forecast.

    - Trains model on-the-fly if not cached for this crop+location
    - Returns daily predictions, trend analysis, and actionable recommendations
    - All responses include is_prototype=True
    """
    try:
        # Convert user historical data to dict format if provided
        historical_data = None
        if request.historical_data:
            historical_data = [
                {
                    "date": point.date,
                    "quantity": point.quantity,
                    "price": point.price,
                }
                for point in request.historical_data
            ]

        response = forecasting_service.forecast_demand(
            crop=request.crop,
            location=request.location,
            historical_data=historical_data,
        )

        logger.info(
            f"Demand prediction served: {request.crop} at {request.location} "
            f"(trend={response.trend}, confidence={response.confidence})"
        )

        return response

    except Exception as e:
        logger.error(f"Demand prediction endpoint error: {e}")
        raise HTTPException(
            status_code=500,
            detail={
                "error": "Prediction failed",
                "message": str(e),
                "hint": "Try again or provide historical_data for better results.",
            },
        )


# ─── Price Prediction Endpoint ──────────────────────────────────────────────────
@app.post(
    "/predict/price",
    response_model=PricePredictionResponse,
    tags=["Predictions"],
    summary="Predict fair price range",
    description=(
        "Predicts a fair price range (min, max, recommended) for a crop "
        "at a specific location, with explainable factors. "
        "Prototype AI Prediction — uses synthetic training data."
    ),
)
async def predict_price(request: PricePredictionRequest):
    """
    Generate price prediction with explainable factors.

    - Trains model on-the-fly if not cached for this crop+location
    - Returns suggested min/max/recommended prices in ₹/KG
    - Includes explainable factors (seasonal demand, supply-demand balance, etc.)
    - All responses include is_prototype=True
    """
    try:
        # Convert user historical price data if provided
        historical_price = None
        if request.historical_price:
            historical_price = [
                {
                    "date": point.date,
                    "min_price": point.min_price,
                    "max_price": point.max_price,
                    "volume": point.volume,
                }
                for point in request.historical_price
            ]

        response = pricing_service.predict_price(
            crop=request.crop,
            location=request.location,
            quantity=request.quantity,
            demand=request.demand,
            supply=request.supply,
            historical_price=historical_price,
        )

        logger.info(
            f"Price prediction served: {request.crop} at {request.location} "
            f"(₹{response.suggested_min}-{response.suggested_max}, "
            f"recommended=₹{response.recommended_reference})"
        )

        return response

    except Exception as e:
        logger.error(f"Price prediction endpoint error: {e}")
        raise HTTPException(
            status_code=500,
            detail={
                "error": "Price prediction failed",
                "message": str(e),
                "hint": "Try again or provide historical_price data for better results.",
            },
        )


# ─── Entry Point ─────────────────────────────────────────────────────────────────
if __name__ == "__main__":
    import uvicorn

    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info",
    )
