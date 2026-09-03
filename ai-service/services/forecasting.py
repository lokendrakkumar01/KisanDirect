"""
Forecasting Service for KisanDirect AI Service.

Manages trained demand models per crop+location combination.
Provides on-the-fly training when models aren't cached, and
generates actionable recommendations for farmers.

All predictions are prototype simulations using synthetic training data.
"""

import logging
from typing import Dict, Optional, List
from datetime import datetime

from models.demand_model import DemandForecaster
from data.historical_data import generate_demand_data, CROP_CONFIG
from schemas.responses import DailyPrediction, DemandPredictionResponse

logger = logging.getLogger(__name__)


class ForecastingService:
    """
    Service layer for demand forecasting.

    Maintains a cache of trained DemandForecaster models keyed
    by crop+location. Trains models on-the-fly when a new
    crop+location combination is requested.
    """

    def __init__(self):
        # Cache trained models: key = "crop_location" (lowercase)
        self._models: Dict[str, DemandForecaster] = {}

    def _get_model_key(self, crop: str, location: str) -> str:
        """Generate a consistent cache key for crop+location."""
        return f"{crop.lower().strip()}_{location.lower().strip()}"

    def _get_or_train_model(
        self,
        crop: str,
        location: str,
        historical_data: Optional[List[dict]] = None,
    ) -> DemandForecaster:
        """
        Retrieve a cached model or train a new one.

        If historical_data is provided, trains a fresh model.
        Otherwise checks cache, falling back to synthetic data training.
        """
        key = self._get_model_key(crop, location)

        # If user provides their own data, always retrain
        if historical_data is not None:
            return self._train_from_user_data(crop, location, historical_data)

        # Return cached model if available
        if key in self._models and self._models[key].is_trained:
            logger.info(f"Using cached model for {key}")
            return self._models[key]

        # Train on synthetic data
        return self._train_on_synthetic(crop, location)

    def _train_on_synthetic(self, crop: str, location: str) -> DemandForecaster:
        """Train a model using generated synthetic data."""
        key = self._get_model_key(crop, location)
        logger.info(f"Training demand model on synthetic data for {key}")

        data = generate_demand_data(crop, location, days=90)
        model = DemandForecaster()

        try:
            metrics = model.train(data)
            logger.info(f"Model trained for {key}: R²={metrics['r2_score']}")
            self._models[key] = model
            return model
        except Exception as e:
            logger.error(f"Failed to train model for {key}: {e}")
            raise

    def _train_from_user_data(
        self,
        crop: str,
        location: str,
        historical_data: List[dict],
    ) -> DemandForecaster:
        """Train a model using user-provided historical data."""
        import pandas as pd
        from data.historical_data import SEASON_MAP

        key = self._get_model_key(crop, location)
        logger.info(f"Training demand model on user data for {key} ({len(historical_data)} points)")

        # Convert user data to DataFrame
        records = []
        for point in historical_data:
            date = pd.Timestamp(point.get("date", datetime.now().isoformat()))
            records.append({
                "date": date,
                "crop": crop.title(),
                "location": location.title(),
                "quantity_sold": float(point.get("quantity", 0)),
                "price": float(point.get("price", 0)) if point.get("price") else 25.0,
                "season": SEASON_MAP.get(date.month, "Rabi"),
                "month": date.month,
                "day_of_week": date.dayofweek,
                "supply": float(point.get("quantity", 0)) * 0.85,  # Estimate supply
            })

        data = pd.DataFrame(records)

        if len(data) < 14:
            logger.warning(f"User data too small ({len(data)} rows), supplementing with synthetic")
            synthetic = generate_demand_data(crop, location, days=90 - len(data))
            data = pd.concat([synthetic, data], ignore_index=True)

        model = DemandForecaster()
        model.train(data)
        self._models[key] = model
        return model

    def _generate_recommendation(
        self,
        crop: str,
        location: str,
        trend: str,
        trend_pct: float,
        predictions: List[dict],
        confidence: float,
    ) -> str:
        """
        Generate actionable, specific recommendation text for farmers.

        Recommendations consider:
        - Demand trend direction and magnitude
        - Peak days in the forecast
        - Crop-specific advice
        - Location context
        """
        crop_title = crop.title()
        location_title = location.title()

        # Find peak and low demand days in the forecast
        if predictions:
            peak_day = max(predictions, key=lambda x: x["predicted_demand"])
            low_day = min(predictions, key=lambda x: x["predicted_demand"])
            avg_demand = sum(p["predicted_demand"] for p in predictions) / len(predictions)
        else:
            return f"Prototype AI Prediction: Unable to generate recommendation for {crop_title} at {location_title}."

        parts = [f"Prototype AI Prediction for {crop_title} at {location_title} Mandi:"]

        # Trend-based advice
        if trend == "increasing":
            parts.append(
                f"{crop_title} demand is expected to increase by {abs(trend_pct):.0f}% "
                f"over the next 7 days. Consider listing available produce early to "
                f"capitalise on rising demand."
            )
        elif trend == "decreasing":
            parts.append(
                f"{crop_title} demand is expected to decrease by {abs(trend_pct):.0f}% "
                f"over the next 7 days. Consider selling sooner or exploring "
                f"alternative mandis for better prices."
            )
        else:
            parts.append(
                f"{crop_title} demand is expected to remain stable "
                f"(average ~{avg_demand:.0f} KG/day) over the next 7 days."
            )

        # Peak day advice
        parts.append(
            f"Peak demand expected on {peak_day['day']} ({peak_day['date']}) "
            f"at ~{peak_day['predicted_demand']:.0f} KG — best day to list produce."
        )

        # Low day warning
        if low_day["predicted_demand"] < avg_demand * 0.85:
            parts.append(
                f"Avoid listing on {low_day['day']} ({low_day['date']}) when "
                f"demand drops to ~{low_day['predicted_demand']:.0f} KG."
            )

        # Crop-specific tips
        crop_lower = crop.lower().strip()
        if crop_lower == "tomato":
            parts.append(
                "Tip: Tomatoes are perishable — list within 2-3 days of harvest "
                "for best quality premium."
            )
        elif crop_lower == "onion":
            parts.append(
                "Tip: Onions can be stored — consider holding stock if prices "
                "are expected to rise next week."
            )
        elif crop_lower == "grapes":
            parts.append(
                "Tip: Premium quality grapes fetch 20-30% more — ensure proper "
                "grading before listing."
            )

        return " ".join(parts)

    def forecast_demand(
        self,
        crop: str,
        location: str,
        historical_data: Optional[List[dict]] = None,
    ) -> DemandPredictionResponse:
        """
        Generate a 7-day demand forecast for a crop at a location.

        Args:
            crop: Crop name (e.g., "Tomato")
            location: Location/mandi (e.g., "Nashik")
            historical_data: Optional user-provided historical data

        Returns:
            DemandPredictionResponse with predictions, trend, and recommendation
        """
        try:
            # Get or train model
            model = self._get_or_train_model(crop, location, historical_data)

            # Generate predictions
            raw_predictions = model.predict(days=7)
            trend = model.get_trend()
            trend_pct = model.get_trend_percentage()
            confidence = model.get_confidence()

            # Build response predictions
            predictions = [
                DailyPrediction(
                    date=p["date"],
                    day=p["day"],
                    predicted_demand=p["predicted_demand"],
                    unit="KG",
                )
                for p in raw_predictions
            ]

            # Generate recommendation
            recommendation = self._generate_recommendation(
                crop, location, trend, trend_pct, raw_predictions, confidence
            )

            return DemandPredictionResponse(
                crop=crop.title(),
                location=location.title(),
                predictions=predictions,
                trend=trend,
                confidence=confidence,
                recommendation=recommendation,
                is_prototype=True,
            )

        except Exception as e:
            logger.error(f"Demand forecast failed for {crop} at {location}: {e}")
            # Return a graceful fallback response
            return self._fallback_response(crop, location, str(e))

    def _fallback_response(
        self,
        crop: str,
        location: str,
        error_msg: str,
    ) -> DemandPredictionResponse:
        """Generate a fallback response when prediction fails."""
        from datetime import timedelta

        logger.warning(f"Using fallback response for {crop} at {location}")

        # Generate basic predictions from crop config defaults
        config = CROP_CONFIG.get(crop.lower().strip(), {
            "base_demand_min": 300, "base_demand_max": 500
        })
        avg_demand = (config["base_demand_min"] + config["base_demand_max"]) / 2

        now = datetime.now()
        predictions = []
        for i in range(7):
            pred_date = now + timedelta(days=i + 1)
            predictions.append(
                DailyPrediction(
                    date=pred_date.strftime("%Y-%m-%d"),
                    day=pred_date.strftime("%A"),
                    predicted_demand=round(avg_demand, 1),
                    unit="KG",
                )
            )

        return DemandPredictionResponse(
            crop=crop.title(),
            location=location.title(),
            predictions=predictions,
            trend="stable",
            confidence=0.3,
            recommendation=(
                f"Prototype AI Prediction: Forecast model encountered an issue ({error_msg}). "
                f"Showing estimated average demand of ~{avg_demand:.0f} KG/day for {crop.title()} "
                f"at {location.title()}. Please try again or provide historical data for "
                f"more accurate predictions."
            ),
            is_prototype=True,
        )

    def pre_train(self, crop: str, location: str) -> None:
        """Pre-train a model for faster first-request response."""
        try:
            self._train_on_synthetic(crop, location)
            logger.info(f"Pre-trained demand model for {crop} at {location}")
        except Exception as e:
            logger.error(f"Pre-training failed for {crop} at {location}: {e}")
