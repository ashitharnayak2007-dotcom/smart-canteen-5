from fastapi import APIRouter, HTTPException
from typing import List
from datetime import datetime
from app.models.schemas import WastageRecord, WastageCreate
from app.services.database import db

router = APIRouter(prefix="/api/wastage", tags=["Wastage"])

@router.get("", response_model=List[WastageRecord])
def get_wastage_records():
    """Retrieve food wastage audit history."""
    return db.wastage

@router.post("", response_model=WastageRecord, status_code=201)
def log_wastage(waste_in: WastageCreate):
    """Record food wastage incident and ingest into Lakehouse schema."""
    if waste_in.quantity_wasted <= 0:
        raise HTTPException(status_code=400, detail="Wasted quantity must be greater than 0")

    new_id = f"w_{len(db.wastage) + 1}"
    cost = round(waste_in.quantity_wasted * 95.0, 2)
    date_str = datetime.now().strftime("%Y-%m-%d")

    record = WastageRecord(
        record_id=new_id,
        food_item=waste_in.food_item,
        quantity_wasted=waste_in.quantity_wasted,
        unit=waste_in.unit,
        date=date_str,
        reason=waste_in.reason,
        cost_lost=cost
    )
    db.wastage.insert(0, record)
    return record
