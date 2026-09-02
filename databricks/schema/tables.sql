-- ============================================================
-- Databricks Lakehouse Table Schemas
-- Catalog: smart_canteen | Schema: main
-- ============================================================

CREATE CATALOG IF NOT EXISTS smart_canteen;
USE CATALOG smart_canteen;
CREATE SCHEMA IF NOT EXISTS main;
USE SCHEMA main;

-- 1. ORDERS Table
CREATE TABLE IF NOT EXISTS orders (
    order_id STRING NOT NULL,
    student_id STRING NOT NULL,
    student_name STRING,
    roll_no STRING,
    food_id STRING,
    food_name STRING,
    quantity INT,
    price DOUBLE,
    total_amount DOUBLE,
    customization STRING,
    payment_method STRING,
    payment_status STRING,
    pickup_slot STRING,
    pickup_slot_id STRING,
    status STRING, -- 'PLACED', 'COOKING', 'READY', 'PICKED_UP'
    order_time TIMESTAMP,
    ready_time TIMESTAMP,
    picked_up_time TIMESTAMP
) USING DELTA;

-- 2. FOOD_ITEMS Table
CREATE TABLE IF NOT EXISTS food_items (
    food_id STRING NOT NULL,
    name STRING NOT NULL,
    category STRING,
    price DOUBLE,
    prep_time_min INT,
    available BOOLEAN,
    emoji STRING,
    rating DOUBLE,
    customizable BOOLEAN
) USING DELTA;

-- 3. INVENTORY Table
CREATE TABLE IF NOT EXISTS inventory (
    ingredient_id STRING NOT NULL,
    ingredient STRING NOT NULL,
    quantity DOUBLE,
    unit STRING,
    min_level DOUBLE,
    max_level DOUBLE,
    category STRING,
    updated_at TIMESTAMP
) USING DELTA;

-- 4. WASTAGE Table
CREATE TABLE IF NOT EXISTS wastage (
    wastage_id STRING NOT NULL,
    food_item STRING NOT NULL,
    quantity_wasted DOUBLE,
    unit STRING,
    reason STRING,
    date DATE,
    recorded_at TIMESTAMP
) USING DELTA;

-- 5. SALES Table
CREATE TABLE IF NOT EXISTS sales (
    sale_id STRING NOT NULL,
    food_item STRING NOT NULL,
    quantity_sold INT,
    unit_price DOUBLE,
    revenue DOUBLE,
    date DATE
) USING DELTA;

-- 6. DEMAND_PREDICTIONS Table
CREATE TABLE IF NOT EXISTS demand_predictions (
    prediction_id STRING NOT NULL,
    target_date DATE NOT NULL,
    food_item STRING NOT NULL,
    predicted_quantity INT,
    confidence_score DOUBLE,
    model_version STRING,
    generated_at TIMESTAMP
) USING DELTA;
