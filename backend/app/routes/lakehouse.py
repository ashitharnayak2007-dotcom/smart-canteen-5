from fastapi import APIRouter
from typing import Dict, Any
from app.services.databricks_client import lakehouse_service

router = APIRouter(prefix="/api/lakehouse", tags=["Databricks Lakehouse"])

@router.get("/status")
def get_lakehouse_status() -> Dict[str, Any]:
    """Retrieve Databricks Lakehouse connection status, table schemas, and sync state."""
    return lakehouse_service.get_connection_status()

@router.post("/execute")
def execute_lakehouse_sql(payload: Dict[str, str]) -> Dict[str, Any]:
    """Execute SQL statement against the Databricks Lakehouse catalog."""
    query = payload.get("query", "")
    return lakehouse_service.execute_sql(query)
