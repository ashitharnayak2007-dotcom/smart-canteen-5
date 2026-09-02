import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { DAILY_ORDERS, POPULAR_ITEMS, PEAK_HOURS, PAYMENT_METHODS } from "../../data/analyticsData";
const COLORS = ["#0F766E","#F59E0B","#3B82F6","#10B981","#EF4444","#A78BFA","#14B8A6","#FCD34D"];
const TT = { contentStyle:{ background:"#1E293B", border:"1px solid #334155", borderRadius:8 }, labelStyle:{ color:"#F1F5F9" }, itemStyle:{ color:"#94A3B8" } };
export default function AnalyticsPage() {
  return (
    <div>
      <div className="sc-topbar">
        <div className="sc-topbar-left"><h1>Analytics</h1><p>Weekly performance overview</p></div>
        <div className="sc-topbar-right"><span className="sc-demo-tag">🧪 DEMO</span></div>
      </div>
      <div className="sc-page-content">

        <div className="sc-grid-2" style={{ gap:20, marginBottom:20 }}>
          <div className="sc-card">
            <div className="sc-card-header"><span className="sc-card-title">📦 Daily Orders</span></div>
            <div className="sc-card-body">
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={DAILY_ORDERS}><CartesianGrid strokeDasharray="3 3" stroke="#334155"/>
                  <XAxis dataKey="day" stroke="#64748B"/><YAxis stroke="#64748B"/>
                  <Tooltip {...TT}/><Bar dataKey="orders" fill="#0F766E" radius={[4,4,0,0]}/>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="sc-card">
            <div className="sc-card-header"><span className="sc-card-title">💰 Daily Revenue (₹)</span></div>
            <div className="sc-card-body">
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={DAILY_ORDERS}><CartesianGrid strokeDasharray="3 3" stroke="#334155"/>
                  <XAxis dataKey="day" stroke="#64748B"/><YAxis stroke="#64748B"/>
                  <Tooltip {...TT}/><Line type="monotone" dataKey="revenue" stroke="#F59E0B" strokeWidth={2} dot={{ fill:"#F59E0B" }}/>
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="sc-grid-2" style={{ gap:20, marginBottom:20 }}>
          <div className="sc-card">
            <div className="sc-card-header"><span className="sc-card-title">🏆 Popular Items (Units Sold)</span></div>
            <div className="sc-card-body">
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={POPULAR_ITEMS} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155"/>
                  <XAxis type="number" stroke="#64748B"/><YAxis type="category" dataKey="name" stroke="#64748B" width={100}/>
                  <Tooltip {...TT}/><Bar dataKey="sold" fill="#14B8A6" radius={[0,4,4,0]}/>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="sc-card">
            <div className="sc-card-header"><span className="sc-card-title">⏰ Peak Hours</span></div>
            <div className="sc-card-body">
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={PEAK_HOURS}><CartesianGrid strokeDasharray="3 3" stroke="#334155"/>
                  <XAxis dataKey="hour" stroke="#64748B"/><YAxis stroke="#64748B"/>
                  <Tooltip {...TT}/><Bar dataKey="orders" fill="#3B82F6" radius={[4,4,0,0]}/>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="sc-card">
          <div className="sc-card-header"><span className="sc-card-title">💳 Payment Methods</span></div>
          <div className="sc-card-body" style={{ display:"flex", alignItems:"center", gap:40, flexWrap:"wrap" }}>
            <PieChart width={200} height={200}>
              <Pie data={PAYMENT_METHODS} cx={95} cy={95} outerRadius={80} dataKey="count" nameKey="method">
                {PAYMENT_METHODS.map((_,i)=><Cell key={i} fill={COLORS[i]}/>)}
              </Pie>
              <Tooltip {...TT}/>
            </PieChart>
            <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
              {PAYMENT_METHODS.map((pm,i)=>(
                <div key={pm.method} style={{ display:"flex", alignItems:"center", gap:12 }}>
                  <div style={{ width:12, height:12, borderRadius:3, background:COLORS[i] }}/>
                  <span style={{ fontWeight:600, minWidth:60 }}>{pm.method}</span>
                  <span style={{ color:"var(--text-muted)" }}>{pm.count} orders</span>
                  <span className="sc-badge sc-badge-info">{pm.pct}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
