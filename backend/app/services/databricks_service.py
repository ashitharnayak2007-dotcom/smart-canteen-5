"""
Databricks SQL Connector Service
"""
import os
try:
    from databricks import sql
    DATABRICKS_AVAILABLE = True
except ImportError:
    DATABRICKS_AVAILABLE = False

def get_connection():
    if not DATABRICKS_AVAILABLE:
        raise RuntimeError("databricks-sql-connector not installed")
    return sql.connect(
        server_hostname=os.getenv("DATABRICKS_HOST", "").replace("https://", ""),
        http_path=os.getenv("DATABRICKS_HTTP_PATH"),
        access_token=os.getenv("DATABRICKS_TOKEN"),
    )

def run_query(query: str):
    with get_connection() as conn:
        with conn.cursor() as cursor:
            cursor.execute(query)
            return cursor.fetchall()
