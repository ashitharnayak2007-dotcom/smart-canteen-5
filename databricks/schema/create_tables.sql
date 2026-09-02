-- =========================================================================
-- SMART CANTEEN — DATABRICKS LAKEHOUSE DELTA TABLE SCHEMAS
-- Team: AURIX NEXUS (Ashitha R, Harshit Reddy, Punya K M, Harini R)
-- =========================================================================

-- Create Catalog and Schema
CREATE CATALOG IF NOT EXISTS smart_canteen;
USE CATALOG smart_canteen;
CREATE SCHEMA IF NOT EXISTS default;
USE SCHEMA default;

-- 1. ORDERS TABLE (Core Transactional Stream)
CREATE TABLE IF NOT EXISTS orders (
    order_id STRING COMMENT 'Unique order identifier, e.g. SC-1024',
    student_id STRING COMMENT 'Campus student roll number',
    student_name STRING COMMENT 'Full student name',
    food_id STRING COMMENT 'Foreign key to food_items table',
    quantity INT COMMENT 'Number of units ordered',
    price DOUBLE COMMENT 'Item price in INR',
    order_time TIMESTAMP COMMENT 'Exact timestamp when pre-order was submitted',
    pickup_slot STRING COMMENT '15-minute pickup window, e.g. 12:45 PM - 01:00 PM',
    status STRING COMMENT 'Order stage: PLACED, COOKING, READY, PICKED UP',
    counter STRING COMMENT 'Designated pickup counter',
    token_number INT COMMENT 'Digital token number'
) 
USING DELTA
PARTITIONED BY (status)
COMMENT 'Delta Lake table tracking live campus meal orders and fulfillment stages';

-- 2. INVENTORY TABLE (Ingredient Stock Management)
CREATE TABLE IF NOT EXISTS inventory (
    item_id STRING COMMENT 'Unique ingredient identifier',
    ingredient STRING COMMENT 'Name of raw ingredient',
    quantity DOUBLE COMMENT 'Current stock level',
    unit STRING COMMENT 'Unit of measurement: kg, L, packs',
    min_threshold DOUBLE COMMENT 'Low stock alert trigger point',
    status STRING COMMENT 'Inventory state: OK, LOW, CRITICAL',
    updated_at TIMESTAMP COMMENT 'Last inventory restock/usage timestamp'
)
USING DELTA
COMMENT 'Delta Lake table for tracking ingredient inventory and automated reorder alerts';

-- 3. WASTAGE TABLE (Food Waste Audit)
CREATE TABLE IF NOT EXISTS wastage (
    record_id STRING COMMENT 'Unique wastage incident identifier',
    food_item STRING COMMENT 'Dish or ingredient name wasted',
    quantity_wasted DOUBLE COMMENT 'Weight wasted in kg',
    unit STRING COMMENT 'Unit (default kg)',
    date DATE COMMENT 'Date of waste occurrence',
    reason STRING COMMENT 'Root cause: Overproduction, Hold time exceeded, Overcooked, Spill',
    cost_lost DOUBLE COMMENT 'Monetary loss incurred in INR'
)
USING DELTA
COMMENT 'Delta Lake table tracking daily food waste records for ML prevention models';

-- 4. FOOD_ITEMS TABLE (Live Menu Catalog)
CREATE TABLE IF NOT EXISTS food_items (
    food_id STRING COMMENT 'Unique food item ID',
    name STRING COMMENT 'Dish name',
    price DOUBLE COMMENT 'Selling price in INR',
    category STRING COMMENT 'South Indian, Meals, Chinese, Snacks, Beverages',
    prep_time STRING COMMENT 'Estimated cooking duration',
    calories STRING COMMENT 'Caloric content',
    is_veg BOOLEAN COMMENT 'Dietary flag',
    availability BOOLEAN COMMENT 'Live availability switch'
)
USING DELTA
COMMENT 'Delta Lake table storing the live active campus menu catalog';

-- 5. SALES TABLE (Aggregated Performance & Revenue)
CREATE TABLE IF NOT EXISTS sales (
    sale_id STRING COMMENT 'Unique sales summary ID',
    food_item STRING COMMENT 'Dish name',
    quantity_sold INT COMMENT 'Total units sold',
    date DATE COMMENT 'Date of sales',
    revenue DOUBLE COMMENT 'Total revenue generated in INR',
    avg_prep_time DOUBLE COMMENT 'Average preparation time in minutes'
)
USING DELTA
PARTITIONED BY (date)
COMMENT 'Aggregated daily sales and revenue metrics for executive reporting';
