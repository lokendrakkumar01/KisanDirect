"""
Price Prediction Model for KisanDirect AI Service.

Uses scikit-learn RandomForestRegressor to predict fair price ranges
for agricultural produce based on market conditions.

Provides explainable factors so farmers understand WHY a price is suggested,
not just WHAT the price is.

Prototype model trained on synthetic data — all predictions are labeled accordingly.
"""

import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import cross_val_score
from typing import List, Tuple, Optional

from data.historical_data import SEASON_ENCODING, SEASON_MAP, CROP_CONFIG


class PricePredictor:
    """
    Random Forest-based price prediction model.

    Trains separate models for min, max, and average price prediction.

    Features used:
    - month: Month of the year (1-12)
    - day_of_week: Day of the week (0=Mon, 6=Sun)
    - supply: Daily supply in KG
    - demand: Daily demand in KG
    - season_encoded: Indian agricultural season (Kharif=0, Rabi=1, Zaid=2)
    - volume: Daily trading volume in KG
    """

    FEATURE_COLUMNS = [
        "month", "day_of_week", "supply", "demand",
        "season_encoded", "volume"
    ]

    def __init__(self):
        # Separate models for min, max, and avg price
        self.model_min = RandomForestRegressor(
            n_estimators=80, max_depth=8, min_samples_split=5,
            random_state=42, n_jobs=-1
        )
        self.model_max = RandomForestRegressor(
            n_estimators=80, max_depth=8, min_samples_split=5,
            random_state=42, n_jobs=-1
        )
        self.model_avg = RandomForestRegressor(
            n_estimators=100, max_depth=10, min_samples_split=5,
            random_state=42, n_jobs=-1
        )
        self.is_trained = False
        self.training_data: Optional[pd.DataFrame] = None
        self.r2_score: float = 0.0
        self.crop_name: str = ""
        self.location_name: str = ""

    def _prepare_features(self, data: pd.DataFrame) -> pd.DataFrame:
        """Encode season and ensure all feature columns exist."""
        df = data.copy()
        df["season_encoded"] = df["season"].map(SEASON_ENCODING).fillna(1)

        # Fill any missing demand/supply with median values
        if "demand" not in df.columns:
            df["demand"] = df.get("volume", 300) * 0.6
        if "supply" not in df.columns:
            df["supply"] = df.get("volume", 300) * 0.5
        if "volume" not in df.columns:
            df["volume"] = df.get("demand", 300) * 2

        df["demand"] = df["demand"].fillna(df["demand"].median())
        df["supply"] = df["supply"].fillna(df["supply"].median())
        df["volume"] = df["volume"].fillna(df["volume"].median())

        return df

    def train(self, data: pd.DataFrame) -> dict:
        """
        Train price prediction models on historical price data.

        Args:
            data: DataFrame with columns [min_price, max_price, avg_price,
                  month, day_of_week, season, supply, demand, volume]

        Returns:
            dict with training metrics
        """
        if len(data) < 14:
            raise ValueError(
                f"Insufficient training data: {len(data)} rows. Need at least 14 days."
            )

        self.training_data = data.copy()
        if "crop" in data.columns:
            self.crop_name = data["crop"].iloc[0]
        if "location" in data.columns:
            self.location_name = data["location"].iloc[0]

        df = self._prepare_features(data)

        X = df[self.FEATURE_COLUMNS].values
        y_min = df["min_price"].values
        y_max = df["max_price"].values
        y_avg = df["avg_price"].values

        # Train all three models
        self.model_min.fit(X, y_min)
        self.model_max.fit(X, y_max)
        self.model_avg.fit(X, y_avg)
        self.is_trained = True

        # Evaluate with cross-validation on the average price model
        n_folds = min(5, max(2, len(X) // 10))
        try:
            cv_scores = cross_val_score(
                self.model_avg, X, y_avg, cv=n_folds, scoring="r2"
            )
            self.r2_score = float(np.mean(cv_scores))
        except Exception:
            self.r2_score = float(self.model_avg.score(X, y_avg))

        return {
            "r2_score": round(self.r2_score, 4),
            "n_samples": len(X),
            "avg_price_range": f"₹{y_avg.min():.2f} - ₹{y_avg.max():.2f}",
        }

    def predict(
        self,
        quantity: float,
        demand: Optional[float] = None,
        supply: Optional[float] = None,
    ) -> Tuple[float, float, float]:
        """
        Predict price range for a given quantity.

        Args:
            quantity: Quantity being sold (KG)
            demand: Current market demand (KG/day), estimated if not provided
            supply: Current market supply (KG/day), estimated if not provided

        Returns:
            Tuple of (min_price, max_price, recommended_price) in ₹/KG
        """
        if not self.is_trained or self.training_data is None:
            raise RuntimeError("Model must be trained before making predictions.")

        df = self._prepare_features(self.training_data)
        now = pd.Timestamp.now()
        month = now.month
        day_of_week = now.dayofweek
        season = SEASON_MAP.get(month, "Rabi")
        season_encoded = SEASON_ENCODING.get(season, 1)

        # Use provided values or estimate from training data medians
        if demand is None:
            demand = float(df["demand"].median())
        if supply is None:
            supply = float(df["supply"].median())

        # Volume is approximately quantity * market activity factor
        volume = quantity * np.random.uniform(1.5, 2.5)

        features = np.array([[
            month, day_of_week, supply, demand, season_encoded, volume
        ]])

        min_price = float(self.model_min.predict(features)[0])
        max_price = float(self.model_max.predict(features)[0])
        avg_price = float(self.model_avg.predict(features)[0])

        # Ensure logical ordering: min <= recommended <= max
        min_price = round(max(1.0, min_price), 2)
        max_price = round(max(min_price + 1.0, max_price), 2)
        recommended = round(np.clip(avg_price, min_price, max_price), 2)

        # Apply quantity-based price adjustment:
        # Larger quantities may get slightly lower per-unit pricing (bulk discount effect)
        if quantity > 1000:
            bulk_factor = 0.97  # 3% bulk discount
        elif quantity > 500:
            bulk_factor = 0.985  # 1.5% slight reduction
        else:
            bulk_factor = 1.0

        min_price = round(min_price * bulk_factor, 2)
        max_price = round(max_price * bulk_factor, 2)
        recommended = round(recommended * bulk_factor, 2)

        return min_price, max_price, recommended

    def get_factors(
        self,
        crop: str,
        location: str,
        demand: Optional[float] = None,
        supply: Optional[float] = None,
    ) -> List[dict]:
        """
        Generate explainable price factors.

        Returns human-readable explanations of what's driving the price,
        helping farmers understand market dynamics.

        Args:
            crop: Crop name
            location: Location/mandi
            demand: Current demand estimate
            supply: Current supply estimate

        Returns:
            List of dicts with [name, value, impact]
        """
        factors = []
        now = pd.Timestamp.now()
        month = now.month
        season = SEASON_MAP.get(month, "Rabi")

        crop_lower = crop.lower().strip()
        config = CROP_CONFIG.get(crop_lower, CROP_CONFIG.get("tomato", {}))

        # ── Factor 1: Seasonal Demand ──
        if month in config.get("peak_months", []):
            factors.append({
                "name": "Seasonal Demand",
                "value": f"High — {season} season peak for {crop.title()}",
                "impact": "positive",
            })
        elif month in config.get("low_months", []):
            factors.append({
                "name": "Seasonal Demand",
                "value": f"Low — Off-season for {crop.title()} in {season}",
                "impact": "negative",
            })
        else:
            factors.append({
                "name": "Seasonal Demand",
                "value": f"Moderate — Normal {season} season",
                "impact": "neutral",
            })

        # ── Factor 2: Supply-Demand Balance ──
        if demand is not None and supply is not None and supply > 0:
            ratio = demand / supply
            if ratio > 1.2:
                factors.append({
                    "name": "Supply-Demand Balance",
                    "value": f"Demand exceeds supply by {((ratio - 1) * 100):.0f}% — seller's market",
                    "impact": "positive",
                })
            elif ratio < 0.8:
                factors.append({
                    "name": "Supply-Demand Balance",
                    "value": f"Supply exceeds demand by {((1 - ratio) * 100):.0f}% — buyer's market",
                    "impact": "negative",
                })
            else:
                factors.append({
                    "name": "Supply-Demand Balance",
                    "value": "Supply and demand are roughly balanced",
                    "impact": "neutral",
                })
        else:
            factors.append({
                "name": "Supply-Demand Balance",
                "value": "Estimated from historical patterns",
                "impact": "neutral",
            })

        # ── Factor 3: Market Location ──
        from data.historical_data import LOCATION_MULTIPLIERS
        loc_mult = LOCATION_MULTIPLIERS.get(location.lower().strip(), 1.0)
        if loc_mult > 1.1:
            factors.append({
                "name": "Market Location",
                "value": f"{location.title()} — High-demand market (+{((loc_mult - 1) * 100):.0f}% premium)",
                "impact": "positive",
            })
        elif loc_mult < 0.9:
            factors.append({
                "name": "Market Location",
                "value": f"{location.title()} — Smaller market ({((1 - loc_mult) * 100):.0f}% lower)",
                "impact": "negative",
            })
        else:
            factors.append({
                "name": "Market Location",
                "value": f"{location.title()} — Average market conditions",
                "impact": "neutral",
            })

        # ── Factor 4: Day of Week ──
        day_name = now.strftime("%A")
        if now.dayofweek == 5:  # Saturday
            factors.append({
                "name": "Trading Day",
                "value": f"{day_name} — Peak mandi trading day, higher buyer competition",
                "impact": "positive",
            })
        elif now.dayofweek == 6:  # Sunday
            factors.append({
                "name": "Trading Day",
                "value": f"{day_name} — Most mandis closed, limited trading",
                "impact": "negative",
            })
        elif now.dayofweek == 0:  # Monday
            factors.append({
                "name": "Trading Day",
                "value": f"{day_name} — Week-start restocking, good demand",
                "impact": "positive",
            })
        else:
            factors.append({
                "name": "Trading Day",
                "value": f"{day_name} — Regular trading day",
                "impact": "neutral",
            })

        # ── Factor 5: Feature Importance (from trained model) ──
        if self.is_trained:
            importances = self.model_avg.feature_importances_
            top_feature_idx = int(np.argmax(importances))
            feature_names = [
                "Month/Season", "Day of Week", "Supply Level",
                "Demand Level", "Season Type", "Trading Volume"
            ]
            top_feature = feature_names[top_feature_idx]
            top_importance = importances[top_feature_idx]
            factors.append({
                "name": "Key Price Driver",
                "value": f"{top_feature} (contributes {top_importance * 100:.0f}% to prediction)",
                "impact": "neutral",
            })

        return factors
