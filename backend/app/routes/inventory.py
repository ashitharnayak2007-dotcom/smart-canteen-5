from fastapi import APIRouter, HTTPException
from typing import List
from app.models.schemas import InventoryItem, InventoryUpdate
from app.services.database import db

router = APIRouter(prefix="/api/inventory", tags=["Inventory"])

@router.get("", response_model=List[InventoryItem])
def get_inventory():
    """Retrieve all ingredient inventory records and low-stock alerts."""
    return list(db.inventory.values())

@router.put("", response_model=InventoryItem)
def update_inventory(update_in: InventoryUpdate):
    """Update stock quantity or restock ingredient."""
    if update_in.item_id not in db.inventory:
        raise HTTPException(status_code=404, detail=f"Ingredient {update_in.item_id} not found")

    item = db.inventory[update_in.item_id]
    if update_in.action == "add":
        item.quantity = round(item.quantity + update_in.quantity, 2)
    else:
        item.quantity = round(update_in.quantity, 2)

    item.status = "LOW" if item.quantity <= item.min_threshold else "OK"
    item.updated_at = "Just now"
    db.inventory[update_in.item_id] = item
    return item
