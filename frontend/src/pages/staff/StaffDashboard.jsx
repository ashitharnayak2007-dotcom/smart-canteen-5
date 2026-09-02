import { Link } from "react-router-dom";
import { ShoppingBag, Package, TrendingUp, AlertTriangle, Clock } from "lucide-react";
import { DEMO_ORDERS } from "../../data/ordersData";
import { INVENTORY_ITEMS, getInventoryStatus } from "../../data/inventoryData";
import { DEMAND_PREDICTIONS } from "../../data/demandData";
import Badge from "../../components/Badge";
export default function StaffDashboard() {
  const activeOrders = DEMO_ORDERS.filter(o=>o.status!=="PICKED_UP");
  const lowStock = INVENTORY_ITEMS.filter(i=>getInventoryStatus(i)==="low");
  const totalPredicted = DEMAND_PREDICTIONS.reduce((s,d)=>s+d.predicted,0);
  return (
    <div>
      <div className="sc-topbar">
        <div className="sc-topbar-left"><h1>Staff Dashboard</h1><p>Wednesday, 2 September 2026</p></div>
        <div className="sc-topbar-right"><span className="sc-demo-tag">🧪 DEMO</span></div>
      </div>
      <div className="sc-page-content">
        <div className="sc-stat-grid">
          <div className="sc-stat-card">
            <div className="sc-stat-icon" style={{ background:"rgba(15,118,110,0.12)" }}><ShoppingBag size={20} color="var(--color-primary-light)"/></div>
            <div className="sc-stat-value">{activeOrders.length}</div>
            <div className="sc-stat-title">Active Orders</div><div className="sc-stat-sub">Needs attention</div>
          </div>
          <div className="sc-stat-card">
            <div className="sc-stat-icon" style={{ background:"rgba(245,158,11,0.12)" }}><Clock size={20} color="var(--color-accent)"/></div>
            <div className="sc-stat-value">7 min</div>
            <div className="sc-stat-title">Avg Prep Time</div><div className="sc-stat-sub">Today</div>
          </div>
          <div className="sc-stat-card">
            <div className="sc-stat-icon" style={{ background:"rgba(59,130,246,0.12)" }}><TrendingUp size={20} color="var(--color-info)"/></div>
            <div className="sc-stat-value">{totalPredicted}</div>
            <div className="sc-stat-title">Predicted Meals</div><div className="sc-stat-sub">AI demand for today</div>
          </div>
          <div className="sc-stat-card">
            <div className="sc-stat-icon" style={{ background:"rgba(239,68,68,0.12)" }}><AlertTriangle size={20} color="var(--color-danger)"/></div>
            <div className="sc-stat-value">{lowStock.length}</div>
            <div className="sc-stat-title">Low Stock Alerts</div><div className="sc-stat-sub">Reorder needed</div>
          </div>
        </div>

        {lowStock.length>0 && (
          <div className="sc-alert sc-alert-warning" style={{ marginBottom:24 }}>
            <AlertTriangle size={18}/>
            <div><strong>Low Stock Alert:</strong> {lowStock.map(i=>i.ingredient).join(", ")} — please reorder.
              <Link to="/staff/inventory" style={{ color:"var(--color-accent)", marginLeft:8, fontWeight:600 }}>View Inventory →</Link>
            </div>
          </div>
        )}

        <div className="sc-grid-2" style={{ gap:20 }}>
          <div className="sc-card">
            <div className="sc-card-header"><span className="sc-card-title">Active Orders</span><Link to="/staff/orders" style={{ color:"var(--color-primary-light)", fontSize:13 }}>View all →</Link></div>
            <div>
              {activeOrders.slice(0,4).map(o=>(
                <div key={o.id} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"12px 20px", borderBottom:"1px solid rgba(51,65,85,0.4)", gap:8 }}>
                  <div>
                    <div style={{ fontWeight:600 }}>{o.id} <span style={{ fontSize:12, color:"var(--text-muted)", fontWeight:400 }}>· {o.studentName}</span></div>
                    <div style={{ fontSize:12, color:"var(--text-muted)", marginTop:2 }}>⏰ {o.pickupSlot}</div>
                  </div>
                  <Badge status={o.status}/>
                </div>
              ))}
            </div>
          </div>

          <div className="sc-card">
            <div className="sc-card-header"><span className="sc-card-title">🤖 AI Demand (Top 5)</span><Link to="/staff/demand" style={{ color:"var(--color-primary-light)", fontSize:13 }}>Full →</Link></div>
            <div className="sc-card-body">
              {DEMAND_PREDICTIONS.slice(0,5).map(d=>(
                <div key={d.item} style={{ display:"flex", alignItems:"center", gap:12, marginBottom:12 }}>
                  <span style={{ fontSize:20 }}>{d.emoji}</span>
                  <span style={{ flex:1, fontSize:14, fontWeight:500 }}>{d.item}</span>
                  <div style={{ width:80, height:6, background:"var(--border-color)", borderRadius:3, overflow:"hidden" }}>
                    <div style={{ height:"100%", width:`${(d.predicted/100)*100}%`, background:"var(--color-primary-light)", borderRadius:3 }}/>
                  </div>
                  <span style={{ fontWeight:700, color:"var(--color-accent)", minWidth:32 }}>{d.predicted}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
