from fastapi import APIRouter, HTTPException
from typing import List
from app.models.schemas import FoodItem, FoodItemCreate
from app.services.database import db

router = APIRouter(prefix="/api/menu", tags=["Menu"])

@router.get("", response_model=List[FoodItem])
def get_menu():
    """Retrieve today's live campus menu items."""
    return list(db.menu.values())

@router.post("", response_model=FoodItem, status_code=201)
def add_food_item(item_in: FoodItemCreate):
    """Add a new food item to the campus menu."""
    new_id = f"food_{len(db.menu) + 1}"
    new_item = FoodItem(
        food_id=new_id,
        name=item_in.name,
        price=item_in.price,
        category=item_in.category,
        prep_time=item_in.prep_time,
        available=item_in.available,
        rating=item_in.rating,
        calories=item_in.calories,
        image=item_in.image,
        description=item_in.description,
        tag=item_in.tag,
        is_veg=item_in.is_veg
    )
    db.menu[new_id] = new_item
    return new_item
