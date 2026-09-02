-- =========================================================================
-- SMART CANTEEN — REALISTIC CAMPUS SAMPLE DATA FOR DELTA LAKE
-- Team: AURIX NEXUS (Ashitha R, Harshit Reddy, Punya K M, Harini R)
-- =========================================================================

USE CATALOG smart_canteen;
USE SCHEMA default;

-- 1. INSERT INTO FOOD_ITEMS
INSERT INTO food_items VALUES
('food_1', 'Masala Dosa', 45.0, 'South Indian', '6 mins', '280 kcal', true, true),
('food_2', 'Veg Rice Combo', 70.0, 'Meals', '4 mins', '420 kcal', true, true),
('food_3', 'Veg Hakka Noodles', 60.0, 'Chinese', '8 mins', '350 kcal', true, true),
('food_4', 'Idli (2 Pcs) with Sambar', 30.0, 'South Indian', '2 mins', '160 kcal', true, true),
('food_5', 'Crispy Medu Vada (1 Pc)', 25.0, 'Snacks', '3 mins', '190 kcal', true, true),
('food_6', 'Tangy Lemon Rice', 50.0, 'Rice Items', '4 mins', '310 kcal', true, true),
('food_7', 'Paneer Butter Masala Roll', 65.0, 'Snacks', '7 mins', '390 kcal', true, true),
('food_8', 'Cold Filter Coffee', 30.0, 'Beverages', '2 mins', '140 kcal', true, true);

-- 2. INSERT INTO INVENTORY
INSERT INTO inventory VALUES
('inv_1', 'Dosa Batter', 4.2, 'kg', 5.0, 'LOW', current_timestamp()),
('inv_2', 'Basmati Rice', 24.0, 'kg', 10.0, 'OK', current_timestamp()),
('inv_3', 'Cooking Oil', 2.5, 'L', 5.0, 'LOW', current_timestamp()),
('inv_4', 'Potatoes & Onions', 18.5, 'kg', 8.0, 'OK', current_timestamp()),
('inv_5', 'Hakka Noodles Packets', 32.0, 'packs', 15.0, 'OK', current_timestamp()),
('inv_6', 'Fresh Vegetables', 14.0, 'kg', 6.0, 'OK', current_timestamp()),
('inv_7', 'Paneer Cubes', 6.5, 'kg', 3.0, 'OK', current_timestamp()),
('inv_8', 'Filter Coffee Powder', 3.8, 'kg', 2.0, 'OK', current_timestamp());

-- 3. INSERT INTO WASTAGE
INSERT INTO wastage VALUES
('w_1', 'Veg Rice Combo', 2.4, 'kg', '2026-08-31', 'Post-lunch overproduction', 240.0),
('w_2', 'Sambar & Chutney', 1.8, 'kg', '2026-08-31', 'Exceeded safe holding time', 120.0),
('w_3', 'Veg Hakka Noodles', 0.9, 'kg', '2026-08-30', 'Batch overcooked', 110.0),
('w_4', 'Medu Vada Batter', 0.6, 'kg', '2026-08-30', 'Surplus batter souring', 65.0),
('w_5', 'Upma Special', 2.8, 'kg', '2026-08-29', 'Low student demand', 280.0),
('w_6', 'Lemon Rice', 0.5, 'kg', '2026-08-29', 'Accidental kitchen drop', 50.0);

-- 4. INSERT INTO SALES (Aggregates)
INSERT INTO sales VALUES
('s_1', 'Masala Dosa', 342, '2026-08-31', 15390.0, 5.8),
('s_2', 'Veg Rice Combo', 285, '2026-08-31', 19950.0, 4.2),
('s_3', 'Veg Hakka Noodles', 210, '2026-08-31', 12600.0, 7.9),
('s_4', 'Idli (2 Pcs) with Sambar', 195, '2026-08-31', 5850.0, 2.1),
('s_5', 'Crispy Medu Vada', 160, '2026-08-31', 4000.0, 3.0),
('s_6', 'Tangy Lemon Rice', 140, '2026-08-31', 7000.0, 4.0);

-- 5. INSERT INTO ORDERS (Sample Historical Batch)
INSERT INTO orders VALUES
('SC-1020', 'CS101', 'Rahul Sharma', 'food_1', 1, 45.0, TIMESTAMP'2026-08-31 12:15:00', '12:30 PM - 12:45 PM', 'PICKED UP', 'Counter 1', 20),
('SC-1021', 'EC204', 'Sneha Patel', 'food_2', 1, 70.0, TIMESTAMP'2026-08-31 12:20:00', '12:30 PM - 12:45 PM', 'PICKED UP', 'Counter 2', 21),
('SC-1022', 'ME302', 'Vikram Singh', 'food_3', 2, 120.0, TIMESTAMP'2026-08-31 12:25:00', '12:45 PM - 01:00 PM', 'PICKED UP', 'Counter 1', 22),
('SC-1023', 'AI108', 'Ananya Roy', 'food_1', 1, 45.0, TIMESTAMP'2026-08-31 12:30:00', '12:45 PM - 01:00 PM', 'PICKED UP', 'Counter 2', 23),
('SC-1024', 'CS402', 'Ashitha R', 'food_1', 1, 45.0, TIMESTAMP'2026-09-01 12:32:00', '12:45 PM - 01:00 PM', 'READY', 'Counter 2', 24),
('SC-1025', 'EC201', 'Harshit Reddy', 'food_2', 2, 140.0, TIMESTAMP'2026-09-01 12:36:00', '12:45 PM - 01:00 PM', 'COOKING', 'Counter 1', 25),
('SC-1026', 'IS304', 'Punya K M', 'food_4', 2, 60.0, TIMESTAMP'2026-09-01 12:40:00', '01:00 PM - 01:15 PM', 'PLACED', 'Counter 2', 26),
('SC-1027', 'AI105', 'Harini R', 'food_6', 1, 50.0, TIMESTAMP'2026-09-01 12:42:00', '01:00 PM - 01:15 PM', 'PLACED', 'Counter 1', 27);
