from fastapi import APIRouter
from typing import Dict, Any, List
from pydantic import BaseModel
from app.services.genie_service import genie_service

router = APIRouter(prefix="/api/genie", tags=["Databricks Genie"])

class GenieQueryRequest(BaseModel):
    question: str

@router.post("/query")
def ask_genie(req: GenieQueryRequest) -> Dict[str, Any]:
    """Ask Databricks Genie a natural-language question over Lakehouse data."""
    return genie_service.ask_genie(req.question)

@router.get("/config")
def get_genie_config() -> Dict[str, Any]:
    """Retrieve Databricks Genie configuration status and instructions for live setup."""
    return genie_service.get_service_status()

@router.get("/suggestions")
def get_query_suggestions() -> List[str]:
    """Retrieve curated natural-language question suggestions for Staff and Admin."""
    return [
        "How many masala dosas should we prepare tomorrow?",
        "Which food item has the highest wastage?",
        "What is the busiest lunch hour?",
        "Which items are most popular on Fridays?",
        "How much rice should we stock for tomorrow?"
    ]
