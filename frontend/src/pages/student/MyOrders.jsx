import { Link } from "react-router-dom";
import { DEMO_ORDERS } from "../../data/ordersData";
import Badge from "../../components/Badge";
export default function MyOrders() {
  return (
    <div>
      <div className="sc-topbar">
        <div className="sc-topbar-left"><h1>My Orders</h1><p>All your orders, past and present</p></div>
        <div className="sc-topbar-right"><span className="sc-demo-tag">🧪 DEMO</span></div>
      </div>
      <div className="sc-page-content">
        <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
          {DEMO_ORDERS.map(order=>(
            <div key={order.id} className="sc-card">
              <div style={{ padding:"16px 20px", display:"flex", alignItems:"flex-start", justifyContent:"space-between", flexWrap:"wrap", gap:12 }}>
                <div>
                  <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:6 }}>
                    <span style={{ fontWeight:700, fontSize:16 }}>{order.id}</span><Badge status={order.status}/>
                  </div>
                  {order.items.map(i=>(
                    <div key={i.itemId} style={{ fontSize:13, color:"var(--text-secondary)" }}>
                      {i.emoji} {i.name} ×{i.quantity}
                      {i.customization && <span style={{ color:"var(--color-primary-light)", fontSize:11 }}> · {i.customization}</span>}
                    </div>
                  ))}
                  <div style={{ fontSize:12, color:"var(--text-muted)", marginTop:4 }}>⏰ {order.pickupSlot} · 💳 {order.paymentMethod}</div>
                </div>
                <div style={{ textAlign:"right", display:"flex", flexDirection:"column", alignItems:"flex-end", gap:8 }}>
                  <span style={{ fontWeight:700, fontSize:16, color:"var(--color-accent)" }}>₹{order.total}</span>
                  {order.status!=="PICKED_UP" && <div style={{ fontSize:12, color:"var(--text-muted)" }}>Est: {order.estimatedWait} min</div>}
                  <Link to={`/student/orders/${order.id}`} className="sc-btn sc-btn-outline sc-btn-sm">Track</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
