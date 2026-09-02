import { BarChart2, ShoppingBag, TrendingDown, Clock, Users, Star } from "lucide-react";
import { KPI, POPULAR_ITEMS } from "../../data/analyticsData";
import { Link } from "react-router-dom";
export default function AdminDashboard() {
  return (
    <div>
      <div className="sc-topbar">
        <div className="sc-topbar-left"><h1>Admin Dashboard</h1><p>Smart Canteen — Overview</p></div>
        <div className="sc-topbar-right"><span className="sc-demo-tag">🧪 DEMO</span></div>
      </div>
      <div className="sc-page-content">
        <div className="sc-stat-grid">
          <div className="sc-stat-card">
            <div className="sc-stat-icon" style={{ background:"rgba(15,118,110,0.12)" }}><ShoppingBag size={20} color="var(--color-primary-light)"/></div>
            <div className="sc-stat-value">{KPI.todayOrders}</div>
            <div className="sc-stat-title">Today's Orders</div><div className="sc-stat-sub">+8% vs yesterday</div>
          </div>
          <div className="sc-stat-card">
            <div className="sc-stat-icon" style={{ background:"rgba(245,158,11,0.12)" }}><BarChart2 size={20} color="var(--color-accent)"/></div>
            <div className="sc-stat-value">{KPI.weeklyOrders}</div>
            <div className="sc-stat-title">Weekly Orders</div><div className="sc-stat-sub">This week</div>
          </div>
          <div className="sc-stat-card">
            <div className="sc-stat-icon" style={{ background:"rgba(16,185,129,0.12)" }}><span style={{ fontSize:20 }}>₹</span></div>
            <div className="sc-stat-value">₹{(KPI.monthlyRevenue/1000).toFixed(0)}k</div>
            <div className="sc-stat-title">Monthly Revenue</div><div className="sc-stat-sub">Sep 2026</div>
          </div>
          <div className="sc-stat-card">
            <div className="sc-stat-icon" style={{ background:"rgba(239,68,68,0.12)" }}><TrendingDown size={20} color="var(--color-danger)"/></div>
            <div className="sc-stat-value">{KPI.totalWasteKg} kg</div>
            <div className="sc-stat-title">Food Waste</div><div className="sc-stat-sub">This week</div>
          </div>
          <div className="sc-stat-card">
            <div className="sc-stat-icon" style={{ background:"rgba(59,130,246,0.12)" }}><Clock size={20} color="var(--color-info)"/></div>
            <div className="sc-stat-value">{KPI.avgWaitMin} min</div>
            <div className="sc-stat-title">Avg Wait Time</div><div className="sc-stat-sub">Pre-order benefit</div>
          </div>
          <div className="sc-stat-card">
            <div className="sc-stat-icon" style={{ background:"rgba(168,85,247,0.12)" }}><Users size={20} color="#A78BFA"/></div>
            <div className="sc-stat-value">{KPI.totalStudents}</div>
            <div className="sc-stat-title">Active Students</div><div className="sc-stat-sub">This week</div>
          </div>
          <div className="sc-stat-card">
            <div className="sc-stat-icon" style={{ background:"rgba(245,158,11,0.12)" }}><Star size={20} color="var(--color-accent)"/></div>
            <div className="sc-stat-value">{KPI.satisfactionPct}%</div>
            <div className="sc-stat-title">Satisfaction</div><div className="sc-stat-sub">Student rating</div>
          </div>
          <div className="sc-stat-card">
            <div className="sc-stat-icon" style={{ background:"rgba(15,118,110,0.12)" }}><span style={{ fontSize:20 }}>🍽️</span></div>
            <div className="sc-stat-value">{KPI.activeMenuItems}</div>
            <div className="sc-stat-title">Menu Items</div><div className="sc-stat-sub">Available today</div>
          </div>
        </div>

        <div className="sc-grid-2" style={{ gap:20 }}>
          <div className="sc-card">
            <div className="sc-card-header"><span className="sc-card-title">🏆 Top Items This Week</span><Link to="/admin/analytics" style={{ color:"var(--color-primary-light)", fontSize:13 }}>Full analytics →</Link></div>
            <div className="sc-table-wrapper">
              <table className="sc-table">
                <thead><tr><th>Item</th><th>Sold</th><th>Revenue</th></tr></thead>
                <tbody>{POPULAR_ITEMS.slice(0,6).map(i=>(
                  <tr key={i.name}>
                    <td style={{ fontWeight:600 }}>{i.name}</td>
                    <td>{i.sold}</td>
                    <td style={{ color:"var(--color-accent)", fontWeight:600 }}>₹{i.revenue.toLocaleString()}</td>
                  </tr>
                ))}</tbody>
              </table>
            </div>
          </div>
          <div className="sc-card">
            <div className="sc-card-header"><span className="sc-card-title">Quick Links</span></div>
            <div className="sc-card-body" style={{ display:"flex", flexDirection:"column", gap:12 }}>
              {[
                { to:"/admin/analytics", label:"📈 Full Analytics & Charts", desc:"Orders, revenue, peak hours" },
                { to:"/admin/sales",     label:"💰 Sales Report",            desc:"Detailed sales breakdown" },
                { to:"/admin/wastage",   label:"♻️ Wastage Report",          desc:"Waste trends and analysis" },
                { to:"/admin/genie",     label:"✨ Genie AI Q&A",           desc:"Natural-language insights" },
              ].map(l=>(
                <Link key={l.to} to={l.to} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"12px 14px", background:"var(--bg-primary)", borderRadius:10, border:"1px solid var(--border-color)", textDecoration:"none", transition:"border-color 0.15s" }}>
                  <div><div style={{ fontWeight:600, fontSize:14 }}>{l.label}</div><div style={{ fontSize:12, color:"var(--text-muted)" }}>{l.desc}</div></div>
                  <span style={{ color:"var(--text-muted)" }}>→</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
