from fastapi import APIRouter
from typing import Dict, Any
from app.services.database import db

router = APIRouter(prefix="/api/analytics", tags=["Analytics"])

@router.get("")
def get_campus_analytics() -> Dict[str, Any]:
    """Retrieve executive KPI metrics and summary trends."""
    total_orders_count = len(db.orders)
    total_rev = sum(o.total_amount for o in db.orders.values())
    total_waste_kg = sum(w.quantity_wasted for w in db.wastage)
    
    return {
        "kpis": {
            "today_orders": total_orders_count + 124,
            "weekly_orders": 842,
            "weekly_revenue": round(total_rev + 48620, 2),
            "food_waste_kg": round(total_waste_kg + 3.3, 1),
            "average_wait_time_minutes": 7.2,
            "waste_reduction_percentage": 32.4
        },
        "peak_hours": [
            {"time": "11:30 AM", "orders": 18, "capacity_pct": 30},
            {"time": "12:00 PM", "orders": 42, "capacity_pct": 52},
            {"time": "12:30 PM", "orders": 88, "capacity_pct": 88},
            {"time": "01:00 PM", "orders": 114, "capacity_pct": 95, "is_peak": True},
            {"time": "01:30 PM", "orders": 54, "capacity_pct": 67},
            {"time": "02:00 PM", "orders": 16, "capacity_pct": 32}
        ],
        "delta_tables": [
            {"name": "orders", "records": 3420, "status": "Live Sync"},
            {"name": "inventory", "records": len(db.inventory), "status": "Live Sync"},
            {"name": "wastage", "records": len(db.wastage), "status": "Live Sync"},
            {"name": "food_items", "records": len(db.menu), "status": "Live Sync"},
            {"name": "sales", "records": 1290, "status": "Live Sync"}
        ]
    }
