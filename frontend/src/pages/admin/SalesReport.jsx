import { POPULAR_ITEMS, KPI, DAILY_ORDERS } from "../../data/analyticsData";
export default function SalesReport() {
  const totalRevenue = DAILY_ORDERS.reduce((s,d)=>s+d.revenue,0);
  const totalOrders = DAILY_ORDERS.reduce((s,d)=>s+d.orders,0);
  return (
    <div>
      <div className="sc-topbar">
        <div className="sc-topbar-left"><h1>Sales Report</h1><p>Weekly revenue breakdown</p></div>
        <div className="sc-topbar-right"><span className="sc-demo-tag">🧪 DEMO</span></div>
      </div>
      <div className="sc-page-content">
        <div className="sc-stat-grid" style={{ gridTemplateColumns:"repeat(3,1fr)", marginBottom:24 }}>
          <div className="sc-stat-card">
            <div className="sc-stat-icon" style={{ background:"rgba(16,185,129,0.12)" }}><span style={{ fontSize:20 }}>₹</span></div>
            <div className="sc-stat-value">₹{totalRevenue.toLocaleString()}</div>
            <div className="sc-stat-title">Weekly Revenue</div>
          </div>
          <div className="sc-stat-card">
            <div className="sc-stat-icon" style={{ background:"rgba(15,118,110,0.12)" }}><span style={{ fontSize:20 }}>🛒</span></div>
            <div className="sc-stat-value">{totalOrders}</div>
            <div className="sc-stat-title">Weekly Orders</div>
          </div>
          <div className="sc-stat-card">
            <div className="sc-stat-icon" style={{ background:"rgba(245,158,11,0.12)" }}><span style={{ fontSize:20 }}>₹</span></div>
            <div className="sc-stat-value">₹{Math.round(totalRevenue/totalOrders)}</div>
            <div className="sc-stat-title">Avg Order Value</div>
          </div>
        </div>

        <div className="sc-grid-2" style={{ gap:20 }}>
          <div className="sc-card">
            <div className="sc-card-header"><span className="sc-card-title">Daily Sales Breakdown</span></div>
            <div className="sc-table-wrapper">
              <table className="sc-table">
                <thead><tr><th>Day</th><th>Orders</th><th>Revenue</th><th>Avg/Order</th></tr></thead>
                <tbody>{DAILY_ORDERS.map(d=>(
                  <tr key={d.day}>
                    <td style={{ fontWeight:600 }}>{d.day}</td>
                    <td>{d.orders}</td>
                    <td style={{ color:"var(--color-accent)", fontWeight:600 }}>₹{d.revenue.toLocaleString()}</td>
                    <td style={{ color:"var(--text-muted)" }}>₹{Math.round(d.revenue/d.orders)}</td>
                  </tr>
                ))}</tbody>
              </table>
            </div>
          </div>
          <div className="sc-card">
            <div className="sc-card-header"><span className="sc-card-title">Revenue by Item</span></div>
            <div className="sc-table-wrapper">
              <table className="sc-table">
                <thead><tr><th>Item</th><th>Sold</th><th>Revenue</th></tr></thead>
                <tbody>{POPULAR_ITEMS.map(i=>(
                  <tr key={i.name}>
                    <td style={{ fontWeight:600 }}>{i.name}</td>
                    <td>{i.sold}</td>
                    <td style={{ color:"var(--color-accent)", fontWeight:600 }}>₹{i.revenue.toLocaleString()}</td>
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
