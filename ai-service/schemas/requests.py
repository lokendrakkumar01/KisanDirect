"""
Request schemas for KisanDirect AI Service.
Pydantic models for validating incoming prediction requests.
"""

from pydantic import BaseModel, Field
from typing import Optional, List


class HistoricalDataPoint(BaseModel):
    """A single historical data point for demand forecasting."""
    date: str = Field(..., description="Date in YYYY-MM-DD format")
    quantity: float = Field(..., ge=0, description="Quantity sold in KG")
    price: Optional[float] = Field(None, ge=0, description="Price in ₹/KG")


class HistoricalPricePoint(BaseModel):
    """A single historical price data point."""
    date: str = Field(..., description="Date in YYYY-MM-DD format")
    min_price: float = Field(..., ge=0, description="Minimum price in ₹/KG")
    max_price: float = Field(..., ge=0, description="Maximum price in ₹/KG")
    volume: Optional[float] = Field(None, ge=0, description="Trade volume in KG")


class DemandPredictionRequest(BaseModel):
    """Request body for demand prediction endpoint."""
    crop: str = Field(
        ...,
        min_length=1,
        max_length=100,
        description="Name of the crop (e.g., Tomato, Onion, Potato)"
    )
    location: str = Field(
        ...,
        min_length=1,
        max_length=200,
        description="Location/mandi name (e.g., Nashik, Pune, Mumbai)"
    )
    historical_data: Optional[List[HistoricalDataPoint]] = Field(
        None,
        description="Optional historical demand data. If not provided, synthetic data is used."
    )

    model_config = {
        "json_schema_extra": {
            "examples": [
                {
                    "crop": "Tomato",
                    "location": "Nashik",
                    "historical_data": None
                }
            ]
        }
    }


class PricePredictionRequest(BaseModel):
    """Request body for price prediction endpoint."""
    crop: str = Field(
        ...,
        min_length=1,
        max_length=100,
        description="Name of the crop (e.g., Tomato, Onion, Potato)"
    )
    location: str = Field(
        ...,
        min_length=1,
        max_length=200,
        description="Location/mandi name (e.g., Nashik, Pune, Mumbai)"
    )
    quantity: float = Field(
        ...,
        gt=0,
        description="Quantity being sold in KG"
    )
    historical_price: Optional[List[HistoricalPricePoint]] = Field(
        None,
        description="Optional historical price data. If not provided, synthetic data is used."
    )
    demand: Optional[float] = Field(
        None,
        ge=0,
        description="Current market demand estimate in KG/day"
    )
    supply: Optional[float] = Field(
        None,
        ge=0,
        description="Current market supply estimate in KG/day"
    )

    model_config = {
        "json_schema_extra": {
            "examples": [
                {
                    "crop": "Tomato",
                    "location": "Nashik",
                    "quantity": 500,
                    "demand": 450,
                    "supply": 380
                }
            ]
        }
    }
