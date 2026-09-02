"""
Smart Canteen — FastAPI Backend
AURIX NEXUS Hackathon Project
Run: uvicorn app.main:app --reload --port 8000
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Smart Canteen API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory demo store (replace with Databricks SQL in production)
import uuid, datetime

MENU = [
    {"id":"M001","name":"Masala Dosa","category":"Breakfast","price":35,"available":True,"emoji":"🫓"},
    {"id":"M002","name":"Veg Rice","category":"Lunch","price":50,"available":True,"emoji":"🍚"},
    {"id":"M003","name":"Veg Noodles","category":"Lunch","price":55,"available":True,"emoji":"🍜"},
    {"id":"M004","name":"Idli","category":"Breakfast","price":25,"available":True,"emoji":"⚪"},
    {"id":"M005","name":"Vada","category":"Breakfast","price":20,"available":True,"emoji":"🍩"},
    {"id":"M008","name":"Filter Coffee","category":"Beverages","price":15,"available":True,"emoji":"☕"},
    {"id":"M011","name":"Veg Pulao","category":"Lunch","price":60,"available":True,"emoji":"🍛"},
]

ORDERS = []
WASTAGE = []

@app.get("/")
def root():
    return {"project": "Smart Canteen", "team": "AURIX NEXUS", "status": "running"}

@app.get("/api/menu")
def get_menu():
    return MENU

@app.get("/api/orders")
def get_orders():
    return ORDERS

@app.post("/api/orders")
def create_order(order: dict):
    order["id"] = "SC" + str(1000 + len(ORDERS) + 1)
    order["status"] = "PLACED"
    order["orderTime"] = datetime.datetime.now().isoformat()
    ORDERS.append(order)
    return order

@app.get("/api/orders/{order_id}")
def get_order(order_id: str):
    for o in ORDERS:
        if o.get("id") == order_id:
            return o
    return {"error": "Order not found"}, 404

@app.put("/api/orders/{order_id}/status")
def update_status(order_id: str, body: dict):
    for o in ORDERS:
        if o.get("id") == order_id:
            o["status"] = body.get("status", o["status"])
            return o
    return {"error": "Not found"}, 404

@app.get("/api/inventory")
def get_inventory():
    return [
        {"id":"INV001","ingredient":"Rice (Raw)","quantity":25,"unit":"kg","minLevel":10},
        {"id":"INV002","ingredient":"Urad Dal","quantity":4,"unit":"kg","minLevel":5},
        {"id":"INV003","ingredient":"Toor Dal","quantity":8,"unit":"kg","minLevel":5},
    ]

@app.post("/api/wastage")
def record_wastage(entry: dict):
    entry["id"] = str(uuid.uuid4())
    entry["date"] = datetime.datetime.now().isoformat()
    WASTAGE.append(entry)
    return entry

@app.get("/api/wastage")
def get_wastage():
    return WASTAGE

@app.get("/api/analytics")
def get_analytics():
    return {
        "todayOrders": 128, "weeklyOrders": 726,
        "monthlyRevenue": 143600, "totalWasteKg": 8.4,
        "avgWaitMin": 7, "satisfactionPct": 91
    }

@app.get("/api/demand")
def get_demand():
    """
    Returns ML model predictions.
    In production this calls ml/demand_prediction.py
    """
    return [
        {"item":"Masala Dosa","predicted":72,"confidence":87,"emoji":"🫓"},
        {"item":"Veg Rice","predicted":64,"confidence":82,"emoji":"🍚"},
        {"item":"Veg Noodles","predicted":50,"confidence":79,"emoji":"🍜"},
        {"item":"Filter Coffee","predicted":95,"confidence":91,"emoji":"☕"},
        {"item":"Idli","predicted":48,"confidence":85,"emoji":"⚪"},
    ]

@app.post("/api/genie/ask")
def genie_ask(body: dict):
    """
    Databricks Genie endpoint.
    Requires DATABRICKS_GENIE_SPACE_ID + DATABRICKS_TOKEN in .env
    Currently returns demo responses.
    """
    question = body.get("question", "")
    # TODO: Replace with actual Databricks Genie API call
    # from app.services.genie_service import ask_genie
    # return ask_genie(question)
    return {
        "question": question,
        "answer": f"[DEMO] Genie received: '{question}'. Connect DATABRICKS_GENIE_SPACE_ID in .env for live responses.",
        "source": "demo"
    }
