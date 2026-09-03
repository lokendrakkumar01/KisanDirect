"""
Response schemas for KisanDirect AI Service.
Pydantic models for structuring prediction outputs.
"""

from pydantic import BaseModel, Field
from typing import List


class DailyPrediction(BaseModel):
    """A single day's demand prediction."""
    date: str = Field(..., description="Predicted date in YYYY-MM-DD format")
    day: str = Field(..., description="Day of the week (e.g., Monday)")
    predicted_demand: float = Field(..., description="Predicted demand in KG")
    unit: str = Field(default="KG", description="Unit of measurement")


class DemandPredictionResponse(BaseModel):
    """Response for demand prediction with 7-day forecast."""
    crop: str = Field(..., description="Crop name")
    location: str = Field(..., description="Location/mandi name")
    predictions: List[DailyPrediction] = Field(
        ..., description="7-day demand predictions"
    )
    trend: str = Field(
        ...,
        description="Overall trend: 'increasing', 'stable', or 'decreasing'"
    )
    confidence: float = Field(
        ...,
        ge=0,
        le=1,
        description="Model confidence score (0-1)"
    )
    recommendation: str = Field(
        ...,
        description="Actionable recommendation for the farmer based on the forecast"
    )
    is_prototype: bool = Field(
        default=True,
        description="Flag indicating this is a prototype AI prediction using synthetic data"
    )


class PriceFactor(BaseModel):
    """An explainable factor affecting the predicted price."""
    name: str = Field(..., description="Name of the factor (e.g., 'Seasonal Demand')")
    value: str = Field(
        ...,
        description="Current value or state of the factor (e.g., 'High - Monsoon Season')"
    )
    impact: str = Field(
        ...,
        description="Impact on price: 'positive', 'negative', or 'neutral'"
    )


class PricePredictionResponse(BaseModel):
    """Response for price prediction with explainable factors."""
    crop: str = Field(..., description="Crop name")
    location: str = Field(..., description="Location/mandi name")
    suggested_min: float = Field(
        ...,
        ge=0,
        description="Suggested minimum selling price in ₹/KG"
    )
    suggested_max: float = Field(
        ...,
        ge=0,
        description="Suggested maximum selling price in ₹/KG"
    )
    recommended_reference: float = Field(
        ...,
        ge=0,
        description="Recommended reference price in ₹/KG"
    )
    factors: List[PriceFactor] = Field(
        ...,
        description="List of explainable factors that influence the price"
    )
    is_prototype: bool = Field(
        default=True,
        description="Flag indicating this is a prototype AI prediction using synthetic data"
    )
