from fastapi import APIRouter, Query
from typing import Optional
from app.models.schemas import DemandPrediction, ItemPrediction
import sys
import os

# Ensure ml package is in sys.path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "../../../")))
from ml.demand_prediction import demand_ml_engine

router = APIRouter(prefix="/api/demand", tags=["Demand Forecasting"])

@router.get("", response_model=DemandPrediction)
def get_demand_forecast(
    day: Optional[str] = Query("Monday", description="Day of week (Monday, Tuesday, Friday)"),
    event: Optional[str] = Query("Regular", description="Campus event (Regular, Exam Week, Tech Fest)"),
    meal_period: Optional[str] = Query("Lunch", description="Meal period (Breakfast, Lunch, Snacks)")
):
    """Retrieve ML demand prediction targets computed by the ML Demand Forecasting Engine."""
    result = demand_ml_engine.predict_daily_demand(
        day_of_week=day or "Monday",
        campus_event=event or "Regular",
        meal_period=meal_period or "Lunch"
    )

    items = [
        ItemPrediction(
            item=p["item"],
            target=p["target"],
            baseline=p["baseline"],
            factor=p["factor"]
        ) for p in result["predictions"]
    ]

    return DemandPrediction(
        day_of_week=result["day_of_week"],
        total_predicted_meals=result["total_predicted_meals"],
        confidence_score=result["confidence_score"],
        predictions=items,
        insight=result["insight"]
    )
