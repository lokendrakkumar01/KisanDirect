"""
Synthetic Historical Data Generator for KisanDirect AI Service.

Generates realistic agricultural market data for Indian crops with:
- Seasonal patterns (Kharif, Rabi, Zaid seasons)
- Weekly demand variations (weekend spikes near mandis)
- Location-specific adjustments for Maharashtra markets
- Random noise for realistic variability

All data is synthetic and clearly labeled as prototype data.
"""

import numpy as np
import pandas as pd
from datetime import datetime, timedelta
from typing import Optional


# ─── Crop Configuration ────────────────────────────────────────────────────────
# Realistic base demand ranges (KG/day) and price ranges (₹/KG)
# for common Indian agricultural produce

CROP_CONFIG = {
    "tomato": {
        "base_demand_min": 400,
        "base_demand_max": 600,
        "price_min": 20,
        "price_max": 35,
        # Tomato peaks during monsoon (June-Sept) when local supply is constrained
        "peak_months": [6, 7, 8, 9],
        "peak_multiplier": 1.35,
        "low_months": [12, 1, 2],
        "low_multiplier": 0.75,
    },
    "onion": {
        "base_demand_min": 300,
        "base_demand_max": 500,
        "price_min": 15,
        "price_max": 40,
        # Onion peaks in winter when stored onion supply drops
        "peak_months": [11, 12, 1, 2],
        "peak_multiplier": 1.40,
        "low_months": [4, 5, 6],
        "low_multiplier": 0.70,
    },
    "potato": {
        "base_demand_min": 350,
        "base_demand_max": 550,
        "price_min": 18,
        "price_max": 30,
        # Potato is relatively stable, slight peak in summer
        "peak_months": [3, 4, 5],
        "peak_multiplier": 1.15,
        "low_months": [9, 10],
        "low_multiplier": 0.90,
    },
    "wheat": {
        "base_demand_min": 200,
        "base_demand_max": 400,
        "price_min": 22,
        "price_max": 28,
        # Wheat peaks post-harvest in Rabi season
        "peak_months": [4, 5, 6],
        "peak_multiplier": 1.20,
        "low_months": [10, 11, 12],
        "low_multiplier": 0.85,
    },
    "rice": {
        "base_demand_min": 250,
        "base_demand_max": 450,
        "price_min": 35,
        "price_max": 50,
        # Rice peaks post-Kharif harvest
        "peak_months": [10, 11, 12],
        "peak_multiplier": 1.25,
        "low_months": [5, 6, 7],
        "low_multiplier": 0.80,
    },
    "grapes": {
        "base_demand_min": 150,
        "base_demand_max": 350,
        "price_min": 40,
        "price_max": 80,
        # Grapes peak in Maharashtra during harvest (Jan-Apr)
        "peak_months": [1, 2, 3, 4],
        "peak_multiplier": 1.50,
        "low_months": [7, 8, 9, 10],
        "low_multiplier": 0.50,
    },
}

# Location-specific demand multipliers for Maharashtra markets
LOCATION_MULTIPLIERS = {
    "nashik": 1.15,       # Major grape & onion hub
    "pune": 1.20,         # Large urban market
    "mumbai": 1.40,       # Highest demand metro
    "nagpur": 1.00,       # Central Maharashtra baseline
    "aurangabad": 0.95,
    "solapur": 0.90,
    "kolhapur": 0.95,
    "satara": 0.85,
    "ahmednagar": 0.90,
    "sangli": 0.88,
}

# Indian agricultural seasons mapping
SEASON_MAP = {
    1: "Rabi",    2: "Rabi",    3: "Rabi",
    4: "Zaid",    5: "Zaid",    6: "Kharif",
    7: "Kharif",  8: "Kharif",  9: "Kharif",
    10: "Rabi",   11: "Rabi",   12: "Rabi",
}

SEASON_ENCODING = {"Kharif": 0, "Rabi": 1, "Zaid": 2}


def _get_crop_config(crop: str) -> dict:
    """Retrieve crop config, falling back to tomato-like defaults for unknown crops."""
    crop_lower = crop.lower().strip()
    if crop_lower in CROP_CONFIG:
        return CROP_CONFIG[crop_lower]
    # Fallback: generic crop with moderate values
    return {
        "base_demand_min": 300,
        "base_demand_max": 500,
        "price_min": 20,
        "price_max": 35,
        "peak_months": [6, 7, 8],
        "peak_multiplier": 1.20,
        "low_months": [12, 1, 2],
        "low_multiplier": 0.80,
    }


def _get_location_multiplier(location: str) -> float:
    """Get location-specific demand multiplier."""
    location_lower = location.lower().strip()
    return LOCATION_MULTIPLIERS.get(location_lower, 1.0)


def _get_seasonal_multiplier(month: int, config: dict) -> float:
    """Calculate seasonal demand/price multiplier based on crop configuration."""
    if month in config["peak_months"]:
        return config["peak_multiplier"]
    elif month in config["low_months"]:
        return config["low_multiplier"]
    return 1.0


def _get_day_of_week_multiplier(day_of_week: int) -> float:
    """
    Weekly demand pattern for Indian mandis.
    Saturdays (5) and Mondays (0) tend to have higher activity.
    Sundays (6) are typically lower.
    """
    weekly_pattern = {
        0: 1.10,  # Monday - week start, higher restocking
        1: 1.00,  # Tuesday
        2: 0.95,  # Wednesday
        3: 1.00,  # Thursday
        4: 1.05,  # Friday - pre-weekend stocking
        5: 1.15,  # Saturday - peak mandi day
        6: 0.75,  # Sunday - most mandis closed or reduced
    }
    return weekly_pattern.get(day_of_week, 1.0)


def generate_demand_data(
    crop: str,
    location: str,
    days: int = 90,
    seed: Optional[int] = None,
) -> pd.DataFrame:
    """
    Generate synthetic demand data for a crop at a specific location.

    Returns a DataFrame with columns:
    [date, crop, location, quantity_sold, price, season, month, day_of_week, supply]

    The data incorporates:
    - Crop-specific seasonal patterns
    - Location-specific demand multipliers
    - Day-of-week effects (mandi trading patterns)
    - Random noise for realistic variability
    - Supply as inverse-correlated with demand (scarcity drives demand)
    """
    if seed is not None:
        np.random.seed(seed)
    else:
        # Use crop+location hash for reproducible but varied data
        np.random.seed(hash(f"{crop.lower()}_{location.lower()}") % (2**31))

    config = _get_crop_config(crop)
    loc_multiplier = _get_location_multiplier(location)

    end_date = datetime.now()
    start_date = end_date - timedelta(days=days)
    date_range = pd.date_range(start=start_date, periods=days, freq="D")

    records = []
    for date in date_range:
        month = date.month
        day_of_week = date.dayofweek
        season = SEASON_MAP[month]

        # Calculate demand with seasonal, weekly, and location adjustments
        base_demand = np.random.uniform(
            config["base_demand_min"], config["base_demand_max"]
        )
        seasonal_mult = _get_seasonal_multiplier(month, config)
        weekly_mult = _get_day_of_week_multiplier(day_of_week)
        noise = np.random.normal(1.0, 0.08)  # ±8% random variation

        quantity_sold = round(
            base_demand * seasonal_mult * weekly_mult * loc_multiplier * noise, 1
        )
        quantity_sold = max(50, quantity_sold)  # Floor at 50 KG

        # Price inversely correlates with supply, positively with demand
        price_range = config["price_max"] - config["price_min"]
        base_price = config["price_min"] + price_range * 0.5
        price_seasonal = base_price * (1 + (seasonal_mult - 1) * 0.6)
        price_noise = np.random.normal(0, price_range * 0.05)
        price = round(price_seasonal + price_noise, 2)
        price = max(config["price_min"], min(config["price_max"], price))

        # Supply: inversely correlated with seasonal demand multiplier
        # When demand peaks, supply tends to lag, creating price pressure
        supply_base = np.random.uniform(
            config["base_demand_min"] * 0.85,
            config["base_demand_max"] * 1.1
        )
        supply_seasonal = supply_base * (2.0 - seasonal_mult)  # Inverse of demand seasonality
        supply_noise = np.random.normal(1.0, 0.10)
        supply = round(supply_seasonal * supply_noise * loc_multiplier, 1)
        supply = max(30, supply)

        records.append({
            "date": date,
            "crop": crop.title(),
            "location": location.title(),
            "quantity_sold": quantity_sold,
            "price": price,
            "season": season,
            "month": month,
            "day_of_week": day_of_week,
            "supply": supply,
        })

    df = pd.DataFrame(records)
    return df


def generate_price_data(
    crop: str,
    location: str,
    days: int = 90,
    seed: Optional[int] = None,
) -> pd.DataFrame:
    """
    Generate synthetic price data for a crop at a specific location.

    Returns a DataFrame with columns:
    [date, crop, location, min_price, max_price, avg_price, volume,
     month, day_of_week, season, demand, supply]

    The data incorporates:
    - Crop-specific price ranges and seasonality
    - Daily min/max spread (typically 15-25% range)
    - Volume patterns correlated with mandi trading days
    - Demand and supply columns for model training
    """
    if seed is not None:
        np.random.seed(seed)
    else:
        np.random.seed(hash(f"price_{crop.lower()}_{location.lower()}") % (2**31))

    config = _get_crop_config(crop)
    loc_multiplier = _get_location_multiplier(location)

    end_date = datetime.now()
    start_date = end_date - timedelta(days=days)
    date_range = pd.date_range(start=start_date, periods=days, freq="D")

    records = []
    for date in date_range:
        month = date.month
        day_of_week = date.dayofweek
        season = SEASON_MAP[month]

        # Base average price with seasonal adjustment
        price_mid = (config["price_min"] + config["price_max"]) / 2
        seasonal_mult = _get_seasonal_multiplier(month, config)

        # Prices increase when seasonal demand is high
        avg_price_base = price_mid * (1 + (seasonal_mult - 1) * 0.5)

        # Weekly pattern: slightly higher prices on peak trading days
        weekly_price_mult = 1.0 + (_get_day_of_week_multiplier(day_of_week) - 1.0) * 0.3
        avg_price = avg_price_base * weekly_price_mult

        # Add random daily noise
        daily_noise = np.random.normal(0, (config["price_max"] - config["price_min"]) * 0.04)
        avg_price = round(avg_price + daily_noise, 2)
        avg_price = max(config["price_min"], min(config["price_max"], avg_price))

        # Min/max spread: typically 15-25% around average
        spread_pct = np.random.uniform(0.08, 0.15)
        min_price = round(avg_price * (1 - spread_pct), 2)
        max_price = round(avg_price * (1 + spread_pct), 2)
        min_price = max(config["price_min"] * 0.9, min_price)
        max_price = min(config["price_max"] * 1.1, max_price)

        # Volume: correlated with day-of-week trading patterns
        base_volume = np.random.uniform(
            config["base_demand_min"] * 2,
            config["base_demand_max"] * 3
        )
        volume = round(
            base_volume * _get_day_of_week_multiplier(day_of_week) * loc_multiplier
            * np.random.normal(1.0, 0.12),
            1
        )
        volume = max(100, volume)

        # Demand and supply for price model training
        demand = round(
            np.random.uniform(config["base_demand_min"], config["base_demand_max"])
            * seasonal_mult * loc_multiplier * np.random.normal(1.0, 0.08),
            1
        )
        supply = round(
            np.random.uniform(config["base_demand_min"] * 0.8, config["base_demand_max"] * 1.05)
            * (2.0 - seasonal_mult) * loc_multiplier * np.random.normal(1.0, 0.10),
            1
        )
        demand = max(50, demand)
        supply = max(30, supply)

        records.append({
            "date": date,
            "crop": crop.title(),
            "location": location.title(),
            "min_price": min_price,
            "max_price": max_price,
            "avg_price": avg_price,
            "volume": volume,
            "month": month,
            "day_of_week": day_of_week,
            "season": season,
            "demand": demand,
            "supply": supply,
        })

    df = pd.DataFrame(records)
    return df
