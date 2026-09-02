"""
In-Memory Lakehouse Database Storage Service for Smart Canteen
Team AURIX NEXUS (Ashitha R, Harshit Reddy, Punya K M, Harini R)
"""
from typing import List, Dict, Optional
from datetime import datetime
from app.models.schemas import (
    FoodItem, Order, OrderItem, OrderStatus, InventoryItem, 
    WastageRecord, SalesRecord, DemandPrediction, ItemPrediction
)

class CanteenDatabase:
    def __init__(self):
        self.menu: Dict[str, FoodItem] = {
            "food_1": FoodItem(
                food_id="food_1", name="Masala Dosa", category="South Indian", price=45.0,
                prep_time="6 mins", available=True, rating=4.8, calories="280 kcal",
                image="🥞", description="Crispy golden crepe with spiced potato masala and sambar.", tag="Bestseller"
            ),
            "food_2": FoodItem(
                food_id="food_2", name="Veg Rice Combo", category="Meals", price=70.0,
                prep_time="4 mins", available=True, rating=4.6, calories="420 kcal",
                image="🍛", description="Basmati rice with dal tadka, veg curry, papad, and curd.", tag="Popular Lunch"
            ),
            "food_3": FoodItem(
                food_id="food_3", name="Veg Hakka Noodles", category="Chinese", price=60.0,
                prep_time="8 mins", available=True, rating=4.7, calories="350 kcal",
                image="🍜", description="Wok-tossed noodles with shredded vegetables and soy seasoning.", tag="Student Favorite"
            ),
            "food_4": FoodItem(
                food_id="food_4", name="Idli (2 Pcs) with Sambar", category="South Indian", price=30.0,
                prep_time="2 mins", available=True, rating=4.9, calories="160 kcal",
                image="⚪", description="Steamed fermented rice cakes with hot vegetable sambar.", tag="Quick Pickup"
            ),
            "food_5": FoodItem(
                food_id="food_5", name="Crispy Medu Vada (1 Pc)", category="Snacks", price=25.0,
                prep_time="3 mins", available=True, rating=4.5, calories="190 kcal",
                image="🍩", description="Golden fried crispy lentil doughnut with coconut chutney.", tag="Snack"
            ),
            "food_6": FoodItem(
                food_id="food_6", name="Tangy Lemon Rice", category="Rice Items", price=50.0,
                prep_time="4 mins", available=True, rating=4.6, calories="310 kcal",
                image="🍋", description="Lemon infused tempered rice with crunchy peanuts.", tag="Light Meal"
            )
        }

        self.orders: Dict[str, Order] = {
            "SC-1024": Order(
                order_id="SC-1024", student_name="Ashitha R", student_id="CS402",
                items=[
                    OrderItem(food_id="food_1", name="Masala Dosa", price=45.0, quantity=1),
                    OrderItem(food_id="food_3", name="Veg Hakka Noodles", price=60.0, quantity=1)
                ],
                total_amount=105.0, pickup_slot="12:45 PM - 01:00 PM", status=OrderStatus.READY,
                order_time="12:32 PM", estimated_wait="0 mins (Ready)", token_number=24,
                counter="Counter 2", instructions="Extra coconut chutney please"
            ),
            "SC-1025": Order(
                order_id="SC-1025", student_name="Harshit Reddy", student_id="EC201",
                items=[OrderItem(food_id="food_2", name="Veg Rice Combo", price=70.0, quantity=2)],
                total_amount=140.0, pickup_slot="12:45 PM - 01:00 PM", status=OrderStatus.COOKING,
                order_time="12:36 PM", estimated_wait="4 mins", token_number=25,
                counter="Counter 1", instructions=""
            ),
            "SC-1026": Order(
                order_id="SC-1026", student_name="Punya K M", student_id="IS304",
                items=[
                    OrderItem(food_id="food_4", name="Idli (2 Pcs) with Sambar", price=30.0, quantity=2),
                    OrderItem(food_id="food_5", name="Crispy Medu Vada (1 Pc)", price=25.0, quantity=1)
                ],
                total_amount=85.0, pickup_slot="01:00 PM - 01:15 PM", status=OrderStatus.PLACED,
                order_time="12:40 PM", estimated_wait="12 mins", token_number=26,
                counter="Counter 2", instructions="Hot sambar separate"
            )
        }

        self.inventory: Dict[str, InventoryItem] = {
            "inv_1": InventoryItem(item_id="inv_1", ingredient="Dosa Batter", quantity=4.2, unit="kg", min_threshold=5.0, status="LOW", updated_at="Just now"),
            "inv_2": InventoryItem(item_id="inv_2", ingredient="Basmati Rice", quantity=24.0, unit="kg", min_threshold=10.0, status="OK", updated_at="Today 09:00 AM"),
            "inv_3": InventoryItem(item_id="inv_3", ingredient="Cooking Oil", quantity=2.5, unit="L", min_threshold=5.0, status="LOW", updated_at="Today 09:00 AM"),
            "inv_4": InventoryItem(item_id="inv_4", ingredient="Potatoes & Onions", quantity=18.5, unit="kg", min_threshold=8.0, status="OK", updated_at="Today 09:00 AM"),
            "inv_5": InventoryItem(item_id="inv_5", ingredient="Hakka Noodles Packets", quantity=32.0, unit="packs", min_threshold=15.0, status="OK", updated_at="Today 09:00 AM"),
            "inv_6": InventoryItem(item_id="inv_6", ingredient="Fresh Vegetables", quantity=14.0, unit="kg", min_threshold=6.0, status="OK", updated_at="Today 09:00 AM")
        }

        self.wastage: List[WastageRecord] = [
            WastageRecord(record_id="w_1", food_item="Veg Rice Combo", quantity_wasted=2.4, unit="kg", date="2026-08-31", reason="Post-lunch overproduction", cost_lost=240.0),
            WastageRecord(record_id="w_2", food_item="Sambar & Chutney", quantity_wasted=1.8, unit="kg", date="2026-08-31", reason="Exceeded safe holding time", cost_lost=120.0),
            WastageRecord(record_id="w_3", food_item="Veg Hakka Noodles", quantity_wasted=0.9, unit="kg", date="2026-08-30", reason="Batch overcooked", cost_lost=110.0)
        ]

# Global singleton
db = CanteenDatabase()
