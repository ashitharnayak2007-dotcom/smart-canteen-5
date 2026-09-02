"""
Databricks Genie Service
Configure DATABRICKS_GENIE_SPACE_ID and DATABRICKS_TOKEN in .env
"""
import os, requests

GENIE_SPACE_ID = os.getenv("DATABRICKS_GENIE_SPACE_ID")
DATABRICKS_HOST = os.getenv("DATABRICKS_HOST")
DATABRICKS_TOKEN = os.getenv("DATABRICKS_TOKEN")

def ask_genie(question: str) -> dict:
    """Send a natural-language question to Databricks Genie."""
    if not all([GENIE_SPACE_ID, DATABRICKS_HOST, DATABRICKS_TOKEN]):
        return {
            "question": question,
            "answer": "Genie not configured. Set DATABRICKS_GENIE_SPACE_ID, DATABRICKS_HOST, DATABRICKS_TOKEN in .env",
            "source": "demo"
        }
    # Start conversation
    headers = {"Authorization": f"Bearer {DATABRICKS_TOKEN}", "Content-Type": "application/json"}
    url = f"{DATABRICKS_HOST}/api/2.0/genie/spaces/{GENIE_SPACE_ID}/start-conversation"
    resp = requests.post(url, json={"content": question}, headers=headers, timeout=30)
    resp.raise_for_status()
    data = resp.json()
    return {
        "question": question,
        "answer": data.get("message", {}).get("content", "No response"),
        "source": "databricks_genie"
    }
