# 🍽️ SMART CANTEEN — AI-Powered Campus Food Intelligence

**Team:** AURIX NEXUS  
**Lead:** Ashitha R  
**Members:** Harshit Reddy, Punya K M, Harini R  

---

## 🚀 Overview

Smart Canteen solves long lines, food overproduction/underproduction, and manual canteen guesswork.

### Core Workflow:
```
Student pre-orders & customizes food (e.g. Pulao without veggies)
       ↓
Selects pickup slot (e.g. 12:30 PM - 1:00 PM)
       ↓
Selects payment method (UPI / Card / Cash) & pays
       ↓
Order data sent to Canteen Kitchen
       ↓
Databricks Lakehouse stores orders, inventory & wastage
       ↓
ML Demand Model predicts tomorrow's quantities
       ↓
Canteen staff prepares accurate quantities
       ↓
Databricks Genie answers natural language business questions
       ↓
Student receives in-app ready notification
```

---

## 🛠️ Technology Stack

- **Frontend:** React 18, Vite, React Router 6, Recharts, Lucide Icons, Modern CSS3
- **Backend:** Python FastAPI, Pydantic, Uvicorn, Databricks SQL Connector
- **AI & Analytics:** XGBoost / Scikit-learn Demand Forecaster, Databricks Lakehouse (Delta Tables), Databricks Genie AI

---

## ⚡ Quick Start Instructions

### 1. Frontend (React + Vite)
```bash
cd frontend
npm install
npm run dev
```
Open **http://localhost:5173** in your browser.

### 2. Backend (FastAPI)
```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```
API Documentation available at: **http://localhost:8000/docs**

### 3. ML Demand Prediction Model
```bash
cd ml
python demand_prediction.py
```

---

## 🧪 Demo Credentials

| Role | Email | Password | Features |
|---|---|---|---|
| **Student** | `student@aurix.edu` | `student123` | Menu, Customizations, Cart, Slot Selection, UPI/Card/Cash Gateway, Live Order Tracking |
| **Canteen Staff** | `staff@aurix.edu` | `staff123` | Live incoming orders, status transitions, Inventory with low-stock alerts, AI demand recommendations, Wastage entry, Genie Q&A |
| **Admin** | `admin@aurix.edu` | `admin123` | Sales reports, Wastage analytics, Peak hours, Payment breakdowns, Recharts data visualization, Genie Q&A |

---

## 🌟 Key Features Included

1. **Food Customization Modal:** Per-item special preparation (Spice level, Remove Veggies/Onion/Garlic, Add extras, Custom notes).
2. **Multi-Payment Gateway:** UPI ID, Credit/Debit card simulation, and Cash at Counter payment modes.
3. **Live Order Status Lifecycle:** `PLACED` ➔ `COOKING` ➔ `READY` (Triggers student notification) ➔ `PICKED_UP`.
4. **AI Demand Prediction:** Historical ML regressor calculating preparation quantities.
5. **Databricks Genie AI:** Interactive natural-language Q&A assistant with benchmark canteen questions.
6. **Low-stock & Wastage Monitoring:** Real-time stock alerts and wastage recording.

---
Built with ❤️ by **AURIX NEXUS** for the Hackathon.
