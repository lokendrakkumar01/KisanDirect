"""
Pricing Service for KisanDirect AI Service.

Manages trained price models per crop+location combination.
Provides on-the-fly training and generates explainable price factors
so farmers understand market dynamics.

All predictions are prototype simulations using synthetic training data.
"""

import logging
from typing import Dict, Optional, List
from datetime import datetime

from models.price_model import PricePredictor
from data.historical_data import generate_price_data, CROP_CONFIG
from schemas.responses import PriceFactor, PricePredictionResponse

logger = logging.getLogger(__name__)


class PricingService:
    """
    Service layer for price prediction.

    Maintains a cache of trained PricePredictor models keyed
    by crop+location. Trains models on-the-fly when new
    crop+location combinations are requested.
    """

    def __init__(self):
        # Cache trained models: key = "crop_location" (lowercase)
        self._models: Dict[str, PricePredictor] = {}

    def _get_model_key(self, crop: str, location: str) -> str:
        """Generate a consistent cache key for crop+location."""
        return f"{crop.lower().strip()}_{location.lower().strip()}"

    def _get_or_train_model(
        self,
        crop: str,
        location: str,
        historical_price: Optional[List[dict]] = None,
    ) -> PricePredictor:
        """
        Retrieve a cached model or train a new one.

        If historical_price data is provided, trains a fresh model.
        Otherwise checks cache, falling back to synthetic data training.
        """
        key = self._get_model_key(crop, location)

        # If user provides their own price data, retrain
        if historical_price is not None:
            return self._train_from_user_data(crop, location, historical_price)

        # Return cached model if available
        if key in self._models and self._models[key].is_trained:
            logger.info(f"Using cached price model for {key}")
            return self._models[key]

        # Train on synthetic data
        return self._train_on_synthetic(crop, location)

    def _train_on_synthetic(self, crop: str, location: str) -> PricePredictor:
        """Train a model using generated synthetic price data."""
        key = self._get_model_key(crop, location)
        logger.info(f"Training price model on synthetic data for {key}")

        data = generate_price_data(crop, location, days=90)
        model = PricePredictor()

        try:
            metrics = model.train(data)
            logger.info(f"Price model trained for {key}: R²={metrics['r2_score']}")
            self._models[key] = model
            return model
        except Exception as e:
            logger.error(f"Failed to train price model for {key}: {e}")
            raise

    def _train_from_user_data(
        self,
        crop: str,
        location: str,
        historical_price: List[dict],
    ) -> PricePredictor:
        """Train a model using user-provided historical price data."""
        import pandas as pd
        import numpy as np
        from data.historical_data import SEASON_MAP

        key = self._get_model_key(crop, location)
        logger.info(f"Training price model on user data for {key} ({len(historical_price)} points)")

        records = []
        for point in historical_price:
            date = pd.Timestamp(point.get("date", datetime.now().isoformat()))
            min_price = float(point.get("min_price", 10))
            max_price = float(point.get("max_price", min_price * 1.2))
            avg_price = (min_price + max_price) / 2
            volume = float(point.get("volume", 500))

            records.append({
                "date": date,
                "crop": crop.title(),
                "location": location.title(),
                "min_price": min_price,
                "max_price": max_price,
                "avg_price": avg_price,
                "volume": volume,
                "month": date.month,
                "day_of_week": date.dayofweek,
                "season": SEASON_MAP.get(date.month, "Rabi"),
                "demand": volume * 0.6,
                "supply": volume * 0.5,
            })

        data = pd.DataFrame(records)

        if len(data) < 14:
            logger.warning(f"User price data too small ({len(data)} rows), supplementing with synthetic")
            synthetic = generate_price_data(crop, location, days=90 - len(data))
            data = pd.concat([synthetic, data], ignore_index=True)

        model = PricePredictor()
        model.train(data)
        self._models[key] = model
        return model

    def predict_price(
        self,
        crop: str,
        location: str,
        quantity: float,
        demand: Optional[float] = None,
        supply: Optional[float] = None,
        historical_price: Optional[List[dict]] = None,
    ) -> PricePredictionResponse:
        """
        Predict fair price range for a crop at a location.

        Args:
            crop: Crop name (e.g., "Tomato")
            location: Location/mandi (e.g., "Nashik")
            quantity: Quantity being sold in KG
            demand: Current market demand estimate (KG/day)
            supply: Current market supply estimate (KG/day)
            historical_price: Optional user-provided historical price data

        Returns:
            PricePredictionResponse with price range and explainable factors
        """
        try:
            # Get or train model
            model = self._get_or_train_model(crop, location, historical_price)

            # Predict prices
            min_price, max_price, recommended = model.predict(
                quantity=quantity,
                demand=demand,
                supply=supply,
            )

            # Get explainable factors
            raw_factors = model.get_factors(crop, location, demand, supply)
            factors = [
                PriceFactor(
                    name=f["name"],
                    value=f["value"],
                    impact=f["impact"],
                )
                for f in raw_factors
            ]

            return PricePredictionResponse(
                crop=crop.title(),
                location=location.title(),
                suggested_min=min_price,
                suggested_max=max_price,
                recommended_reference=recommended,
                factors=factors,
                is_prototype=True,
            )

        except Exception as e:
            logger.error(f"Price prediction failed for {crop} at {location}: {e}")
            return self._fallback_response(crop, location, quantity, str(e))

    def _fallback_response(
        self,
        crop: str,
        location: str,
        quantity: float,
        error_msg: str,
    ) -> PricePredictionResponse:
        """Generate a fallback response when price prediction fails."""
        logger.warning(f"Using fallback price response for {crop} at {location}")

        # Use crop config defaults for reasonable fallback prices
        config = CROP_CONFIG.get(crop.lower().strip(), {
            "price_min": 20, "price_max": 35
        })
        min_price = config["price_min"]
        max_price = config["price_max"]
        recommended = round((min_price + max_price) / 2, 2)

        return PricePredictionResponse(
            crop=crop.title(),
            location=location.title(),
            suggested_min=min_price,
            suggested_max=max_price,
            recommended_reference=recommended,
            factors=[
                PriceFactor(
                    name="Fallback Estimate",
                    value=f"Using historical average range for {crop.title()} (model error: {error_msg})",
                    impact="neutral",
                ),
                PriceFactor(
                    name="Data Source",
                    value="Based on typical market prices — provide historical data for accuracy",
                    impact="neutral",
                ),
            ],
            is_prototype=True,
        )

    def pre_train(self, crop: str, location: str) -> None:
        """Pre-train a model for faster first-request response."""
        try:
            self._train_on_synthetic(crop, location)
            logger.info(f"Pre-trained price model for {crop} at {location}")
        except Exception as e:
            logger.error(f"Pre-training failed for {crop} at {location}: {e}")
