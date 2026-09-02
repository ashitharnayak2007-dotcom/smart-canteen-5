-- ============================================================
-- Databricks Genie Sample Benchmark Analytical Queries
-- ============================================================

-- Q1: Total sales and revenue by food item
SELECT 
    food_name, 
    SUM(quantity) AS total_units_sold, 
    SUM(total_amount) AS total_revenue
FROM smart_canteen.main.orders
WHERE status = 'PICKED_UP'
GROUP BY food_name
ORDER BY total_revenue DESC;

-- Q2: Peak lunch hours
SELECT 
    pickup_slot, 
    COUNT(*) AS total_orders
FROM smart_canteen.main.orders
GROUP BY pickup_slot
ORDER BY total_orders DESC;

-- Q3: Food wastage breakdown by reason
SELECT 
    reason, 
    SUM(quantity_wasted) AS total_waste_kg
FROM smart_canteen.main.wastage
GROUP BY reason
ORDER BY total_waste_kg DESC;

-- Q4: Low stock inventory detection
SELECT 
    ingredient, 
    quantity, 
    min_level, 
    unit
FROM smart_canteen.main.inventory
WHERE quantity <= min_level;
