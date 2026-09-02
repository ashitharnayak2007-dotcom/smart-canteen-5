# Databricks notebook source
# MAGIC %md
# MAGIC # Smart Canteen — Lakehouse ETL & Analytics Pipeline
# MAGIC **Team:** AURIX NEXUS (Ashitha R, Harshit Reddy, Punya K M, Harini R)  
# MAGIC **Catalog:** `smart_canteen` | **Schema:** `default`
# MAGIC
# MAGIC This notebook ingests raw order streams, validates inventory thresholds, computes wastage aggregates, and prepares feature datasets for the ML Demand Prediction model.

# COMMAND ----------
import os
from pyspark.sql import functions as F
from pyspark.sql.types import *

# COMMAND ----------
# MAGIC %sql
# MAGIC USE CATALOG smart_canteen;
# MAGIC USE SCHEMA default;

# COMMAND ----------
# Ingest and clean live orders stream
orders_df = spark.table("smart_canteen.default.orders")

# Extract temporal features for demand forecasting
demand_features_df = orders_df \
    .withColumn("order_hour", F.hour("order_time")) \
    .withColumn("day_of_week", F.date_format("order_time", "EEEE")) \
    .groupBy("day_of_week", "pickup_slot", "food_id") \
    .agg(
        F.count("order_id").alias("order_frequency"),
        F.sum("quantity").alias("total_quantity_demanded"),
        F.avg("price").alias("avg_selling_price")
    )

display(demand_features_df)

# COMMAND ----------
# Write aggregated features to Delta Lake table for ML Model training
demand_features_df.write \
    .format("delta") \
    .mode("overwrite") \
    .option("overwriteSchema", "true") \
    .saveAsTable("smart_canteen.default.ml_demand_features")

print("✔ ML Demand Features successfully published to Delta Lake table: ml_demand_features")
