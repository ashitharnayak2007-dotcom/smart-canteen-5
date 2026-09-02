from fastapi import APIRouter, HTTPException, Query
from typing import List, Optional
from datetime import datetime
from app.models.schemas import Order, OrderCreate, OrderStatusUpdate, OrderStatus
from app.services.database import db

router = APIRouter(prefix="/api/orders", tags=["Orders"])

@router.get("", response_model=List[Order])
def list_orders(status: Optional[OrderStatus] = None):
    """Retrieve all campus orders, optionally filtered by status."""
    orders_list = list(db.orders.values())
    if status:
        orders_list = [o for o in orders_list if o.status == status]
    # Sort with newest first
    return sorted(orders_list, key=lambda x: x.order_id, reverse=True)

@router.get("/{order_id}", response_model=Order)
def get_order(order_id: str):
    """Get single order details by order_id."""
    if order_id not in db.orders:
        raise HTTPException(status_code=404, detail=f"Order {order_id} not found")
    return db.orders[order_id]

@router.post("", response_model=Order, status_code=201)
def create_order(order_in: OrderCreate):
    """Place a new student pre-order with slot assignment and auto token."""
    if not order_in.items:
        raise HTTPException(status_code=400, detail="Order must contain at least one item")

    count = len(db.orders) + 1
    new_id = f"SC-{1024 + count}"
    token = 24 + count
    counter = "Counter 1" if count % 2 == 1 else "Counter 2"

    subtotal = sum(i.price * i.quantity for i in order_in.items)
    discount = 0.0
    if order_in.coupon_code:
        code = order_in.coupon_code.strip().upper()
        if code == "CAMPUSFRESH" and subtotal >= 60:
            discount = 15.0
        elif code == "FIRSTBITE":
            discount = round(subtotal * 0.10, 2)
        elif code == "AURIX100" and subtotal >= 100:
            discount = 25.0
            
    total = max(0.0, subtotal - discount)
    now_time = datetime.now().strftime("%I:%M %p")

    new_order = Order(
        order_id=new_id,
        student_name=order_in.student_name,
        student_id=order_in.student_id,
        items=order_in.items,
        total_amount=total,
        pickup_slot=order_in.pickup_slot,
        status=OrderStatus.PLACED,
        order_time=now_time,
        estimated_wait="8 mins",
        token_number=token,
        counter=counter,
        instructions=order_in.instructions or ""
    )

    db.orders[new_id] = new_order
    return new_order

@router.put("/{order_id}/status", response_model=Order)
def update_order_status(order_id: str, status_in: OrderStatusUpdate):
    """Update order stage (PLACED -> COOKING -> READY -> PICKED UP)."""
    if order_id not in db.orders:
        raise HTTPException(status_code=404, detail=f"Order {order_id} not found")

    order = db.orders[order_id]
    order.status = status_in.status
    if status_in.status == OrderStatus.COOKING:
        order.estimated_wait = "3 mins"
    elif status_in.status == OrderStatus.READY:
        order.estimated_wait = "0 mins (Ready)"
    elif status_in.status == OrderStatus.PICKED_UP:
        order.estimated_wait = "Fulfilled"

    db.orders[order_id] = order
    return order
