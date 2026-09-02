import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { WASTAGE_TREND } from "../../data/analyticsData";
const WASTAGE_LOG = [
  { date:"2026-09-02", item:"Veg Rice",    qty:"3.2 kg", reason:"Overproduction",  cost:"₹160" },
  { date:"2026-09-02", item:"Idli",        qty:"15 pcs", reason:"Low demand",      cost:"₹375" },
  { date:"2026-09-01", item:"Masala Dosa", qty:"8 pcs",  reason:"Cancelled orders",cost:"₹280" },
  { date:"2026-09-01", item:"Veg Noodles", qty:"1.5 kg", reason:"Overproduction",  cost:"₹82" },
  { date:"2026-08-31", item:"Sambar",      qty:"2 L",    reason:"Overproduction",  cost:"₹30" },
];
const TT = { contentStyle:{ background:"#1E293B", border:"1px solid #334155", borderRadius:8 }, labelStyle:{ color:"#F1F5F9" }, itemStyle:{ color:"#94A3B8" } };
export default function WastageReport() {
  const totalWaste = WASTAGE_TREND.reduce((s,d)=>s+d.kg,0).toFixed(1);
  return (
    <div>
      <div className="sc-topbar">
        <div className="sc-topbar-left"><h1>Wastage Report</h1><p>Food waste analysis and trends</p></div>
        <div className="sc-topbar-right"><span className="sc-demo-tag">🧪 DEMO</span></div>
      </div>
      <div className="sc-page-content">
        <div className="sc-stat-grid" style={{ gridTemplateColumns:"repeat(3,1fr)", marginBottom:24 }}>
          <div className="sc-stat-card">
            <div className="sc-stat-icon" style={{ background:"rgba(239,68,68,0.12)" }}><span style={{ fontSize:20 }}>♻️</span></div>
            <div className="sc-stat-value">{totalWaste} kg</div>
            <div className="sc-stat-title">Weekly Waste</div><div className="sc-stat-sub">↓ 12% vs last week</div>
          </div>
          <div className="sc-stat-card">
            <div className="sc-stat-icon" style={{ background:"rgba(245,158,11,0.12)" }}><span style={{ fontSize:20 }}>💸</span></div>
            <div className="sc-stat-value">₹927</div>
            <div className="sc-stat-title">Waste Cost</div><div className="sc-stat-sub">This week</div>
          </div>
          <div className="sc-stat-card">
            <div className="sc-stat-icon" style={{ background:"rgba(16,185,129,0.12)" }}><span style={{ fontSize:20 }}>📉</span></div>
            <div className="sc-stat-value">40%</div>
            <div className="sc-stat-title">Waste Reduced</div><div className="sc-stat-sub">vs pre-AI era</div>
          </div>
        </div>
        <div className="sc-grid-2" style={{ gap:20 }}>
          <div className="sc-card">
            <div className="sc-card-header"><span className="sc-card-title">📈 Wastage Trend (kg)</span></div>
            <div className="sc-card-body">
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={WASTAGE_TREND}><CartesianGrid strokeDasharray="3 3" stroke="#334155"/>
                  <XAxis dataKey="day" stroke="#64748B"/><YAxis stroke="#64748B"/>
                  <Tooltip {...TT}/><Line type="monotone" dataKey="kg" stroke="#EF4444" strokeWidth={2} dot={{ fill:"#EF4444" }}/>
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="sc-card">
            <div className="sc-card-header"><span className="sc-card-title">Wastage Log</span></div>
            <div className="sc-table-wrapper">
              <table className="sc-table">
                <thead><tr><th>Date</th><th>Item</th><th>Qty</th><th>Reason</th><th>Cost</th></tr></thead>
                <tbody>{WASTAGE_LOG.map((w,i)=>(
                  <tr key={i}>
                    <td style={{ color:"var(--text-muted)", fontSize:12 }}>{w.date}</td>
                    <td style={{ fontWeight:600 }}>{w.item}</td>
                    <td style={{ color:"var(--color-danger)" }}>{w.qty}</td>
                    <td><span className="sc-badge sc-badge-warning" style={{ fontSize:11 }}>{w.reason}</span></td>
                    <td style={{ color:"var(--text-muted)" }}>{w.cost}</td>
                  </tr>
                ))}</tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
