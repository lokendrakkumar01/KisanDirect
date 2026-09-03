"""
Demand Forecasting Model for KisanDirect AI Service.

Uses scikit-learn RandomForestRegressor to predict daily crop demand
based on temporal features, supply data, and lagged demand indicators.

Prototype model trained on synthetic data — all predictions are labeled accordingly.
"""

import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import cross_val_score
from sklearn.preprocessing import LabelEncoder
from typing import Tuple, List, Optional
from datetime import datetime, timedelta

from data.historical_data import SEASON_ENCODING


class DemandForecaster:
    """
    Random Forest-based demand forecasting model.

    Features used for prediction:
    - month: Month of the year (1-12)
    - day_of_week: Day of the week (0=Mon, 6=Sun)
    - season_encoded: Indian agricultural season (Kharif=0, Rabi=1, Zaid=2)
    - supply: Daily supply in KG
    - lag_1: Previous day's demand
    - lag_7: Demand from 7 days ago
    - rolling_mean_7: 7-day rolling average demand
    """

    FEATURE_COLUMNS = [
        "month", "day_of_week", "season_encoded",
        "supply", "lag_1", "lag_7", "rolling_mean_7"
    ]

    def __init__(self):
        self.model = RandomForestRegressor(
            n_estimators=100,
            max_depth=10,
            min_samples_split=5,
            min_samples_leaf=3,
            random_state=42,
            n_jobs=-1,
        )
        self.is_trained = False
        self.training_data: Optional[pd.DataFrame] = None
        self.confidence_score: float = 0.0
        self.r2_score: float = 0.0

    def _prepare_features(self, data: pd.DataFrame) -> pd.DataFrame:
        """
        Engineer features from raw demand data.

        Adds lagged demand features and rolling statistics
        which capture temporal demand patterns.
        """
        df = data.copy()

        # Encode season as numeric
        df["season_encoded"] = df["season"].map(SEASON_ENCODING).fillna(1)

        # Lag features: capture recent demand trends
        df["lag_1"] = df["quantity_sold"].shift(1)
        df["lag_7"] = df["quantity_sold"].shift(7)

        # Rolling statistics: smooth out daily noise
        df["rolling_mean_7"] = df["quantity_sold"].rolling(window=7, min_periods=1).mean()

        # Fill NaN values from shifting with column means (first few rows)
        df["lag_1"] = df["lag_1"].fillna(df["quantity_sold"].mean())
        df["lag_7"] = df["lag_7"].fillna(df["quantity_sold"].mean())

        return df

    def train(self, data: pd.DataFrame) -> dict:
        """
        Train the demand forecasting model on historical data.

        Args:
            data: DataFrame with columns [date, quantity_sold, month,
                  day_of_week, season, supply]

        Returns:
            dict with training metrics (r2_score, cv_mean, cv_std)
        """
        if len(data) < 14:
            raise ValueError(
                f"Insufficient training data: {len(data)} rows. Need at least 14 days."
            )

        self.training_data = data.copy()
        df = self._prepare_features(data)

        # Drop rows where lag features are still NaN (first 7 rows)
        df = df.dropna(subset=self.FEATURE_COLUMNS)

        X = df[self.FEATURE_COLUMNS].values
        y = df["quantity_sold"].values

        # Train the model
        self.model.fit(X, y)
        self.is_trained = True

        # Evaluate with cross-validation (3-fold for smaller datasets)
        n_folds = min(5, max(2, len(X) // 10))
        try:
            cv_scores = cross_val_score(
                self.model, X, y, cv=n_folds, scoring="r2"
            )
            self.r2_score = float(np.mean(cv_scores))
            self.confidence_score = max(0.0, min(1.0, (self.r2_score + 1) / 2))
        except Exception:
            # Fallback if CV fails (very small dataset)
            self.r2_score = float(self.model.score(X, y))
            self.confidence_score = max(0.0, min(0.85, self.r2_score))

        return {
            "r2_score": round(self.r2_score, 4),
            "cv_mean": round(float(np.mean(cv_scores)) if 'cv_scores' in dir() else self.r2_score, 4),
            "cv_std": round(float(np.std(cv_scores)) if 'cv_scores' in dir() else 0.0, 4),
            "n_samples": len(X),
        }

    def predict(self, days: int = 7) -> List[dict]:
        """
        Generate demand predictions for the next N days.

        Uses the last known data point as a starting state and
        iteratively predicts forward, feeding each prediction
        back as lag input for subsequent days.

        Args:
            days: Number of days to forecast (default: 7)

        Returns:
            List of dicts with [date, day, predicted_demand]
        """
        if not self.is_trained or self.training_data is None:
            raise RuntimeError("Model must be trained before making predictions.")

        df = self._prepare_features(self.training_data)
        last_row = df.iloc[-1]

        # Build initial state from last known data
        recent_demands = df["quantity_sold"].values[-7:].tolist()
        last_supply = float(last_row["supply"])
        last_date = pd.Timestamp(last_row["date"])

        predictions = []
        for i in range(days):
            pred_date = last_date + timedelta(days=i + 1)
            month = pred_date.month
            day_of_week = pred_date.dayofweek
            day_name = pred_date.strftime("%A")

            # Determine season from month
            from data.historical_data import SEASON_MAP
            season = SEASON_MAP.get(month, "Rabi")
            season_encoded = SEASON_ENCODING.get(season, 1)

            # Use recent predictions as lag features
            lag_1 = recent_demands[-1] if recent_demands else float(last_row["quantity_sold"])
            lag_7 = recent_demands[-7] if len(recent_demands) >= 7 else float(last_row["quantity_sold"])
            rolling_mean_7 = float(np.mean(recent_demands[-7:]))

            # Supply evolves slowly: add small random variation
            supply = last_supply * np.random.uniform(0.95, 1.05)

            # Build feature vector
            features = np.array([[
                month, day_of_week, season_encoded,
                supply, lag_1, lag_7, rolling_mean_7
            ]])

            predicted_demand = float(self.model.predict(features)[0])
            predicted_demand = max(10, round(predicted_demand, 1))  # Floor at 10 KG

            predictions.append({
                "date": pred_date.strftime("%Y-%m-%d"),
                "day": day_name,
                "predicted_demand": predicted_demand,
            })

            # Feed prediction back for next iteration
            recent_demands.append(predicted_demand)
            last_supply = supply

        return predictions

    def get_trend(self) -> str:
        """
        Analyze the overall trend from the most recent training data.

        Compares the average demand of the last 7 days vs the previous 7 days
        to determine if demand is increasing, stable, or decreasing.

        Returns:
            'increasing', 'stable', or 'decreasing'
        """
        if self.training_data is None or len(self.training_data) < 14:
            return "stable"

        recent = self.training_data["quantity_sold"].iloc[-7:].mean()
        previous = self.training_data["quantity_sold"].iloc[-14:-7].mean()

        if previous == 0:
            return "stable"

        change_pct = (recent - previous) / previous

        if change_pct > 0.05:
            return "increasing"
        elif change_pct < -0.05:
            return "decreasing"
        return "stable"

    def get_trend_percentage(self) -> float:
        """Calculate percentage change between recent and previous week."""
        if self.training_data is None or len(self.training_data) < 14:
            return 0.0

        recent = self.training_data["quantity_sold"].iloc[-7:].mean()
        previous = self.training_data["quantity_sold"].iloc[-14:-7].mean()

        if previous == 0:
            return 0.0

        return round(((recent - previous) / previous) * 100, 1)

    def get_confidence(self) -> float:
        """
        Return model confidence score (0 to 1).

        Based on cross-validated R² score, scaled to a 0-1 range.
        Higher confidence means the model explains more variance in demand.
        """
        return round(self.confidence_score, 3)
