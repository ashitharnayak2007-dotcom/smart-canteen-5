"""
Pydantic Data Models for Smart Canteen (Team AURIX NEXUS)
"""
from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime
from enum import Enum

class UserRole(str, Enum):
    STUDENT = "student"
    STAFF = "staff"
    ADMIN = "admin"

class OrderStatus(str, Enum):
    PLACED = "PLACED"
    COOKING = "COOKING"
    READY = "READY"
    PICKED_UP = "PICKED UP"

# 1. USER
class User(BaseModel):
    user_id: str
    name: str
    email: str
    role: UserRole
    department: Optional[str] = "Computer Science"

# 2. FOOD_ITEM
class FoodItem(BaseModel):
    food_id: str
    name: str
    price: float
    category: str
    prep_time: str
    available: bool = True
    rating: float = 4.8
    calories: str = "250 kcal"
    image: str = "🍽️"
    description: str = ""
    tag: Optional[str] = None
    is_veg: bool = True

class FoodItemCreate(BaseModel):
    name: str
    price: float
    category: str
    prep_time: str = "5 mins"
    available: bool = True
    rating: float = 4.8
    calories: str = "250 kcal"
    image: str = "🍽️"
    description: str = ""
    tag: Optional[str] = None
    is_veg: bool = True

# 3. ORDER_ITEM
class OrderItem(BaseModel):
    food_id: str
    name: str
    price: float
    quantity: int = Field(ge=1)

# 4. ORDER
class OrderCreate(BaseModel):
    student_name: str
    student_id: str
    items: List[OrderItem]
    pickup_slot: str
    instructions: Optional[str] = ""
    coupon_code: Optional[str] = None

class Order(BaseModel):
    order_id: str
    student_name: str
    student_id: str
    items: List[OrderItem]
    total_amount: float
    pickup_slot: str
    status: OrderStatus = OrderStatus.PLACED
    order_time: str
    estimated_wait: str
    token_number: int
    counter: str
    instructions: Optional[str] = ""

class OrderStatusUpdate(BaseModel):
    status: OrderStatus

# 5. PICKUP_SLOT
class PickupSlot(BaseModel):
    slot_id: str
    time_window: str
    is_available: bool = True
    capacity: int = 100
    booked_count: int = 0

# 6. INVENTORY
class InventoryItem(BaseModel):
    item_id: str
    ingredient: str
    quantity: float
    unit: str
    min_threshold: float
    status: str
    updated_at: Optional[str] = None

class InventoryUpdate(BaseModel):
    item_id: str
    quantity: float
    action: Optional[str] = "set" # "set" or "add"

# 7. WASTAGE
class WastageRecord(BaseModel):
    record_id: str
    food_item: str
    quantity_wasted: float
    unit: str = "kg"
    date: str
    reason: str
    cost_lost: float

class WastageCreate(BaseModel):
    food_item: str
    quantity_wasted: float
    unit: str = "kg"
    reason: str

# 8. SALES
class SalesRecord(BaseModel):
    food_item: str
    quantity_sold: int
    date: str
    revenue: float

# 9. DEMAND_PREDICTION
class ItemPrediction(BaseModel):
    item: str
    target: int
    baseline: int
    factor: str

class DemandPrediction(BaseModel):
    day_of_week: str
    total_predicted_meals: int
    confidence_score: float
    predictions: List[ItemPrediction]
    insight: str

# 10. GENIE QUERY
class GenieQueryRequest(BaseModel):
    question: str

class GenieQueryResponse(BaseModel):
    question: str
    answer: str
    sql_query: str
    confidence: str
