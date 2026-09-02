import { useState } from "react";
import { DEMO_ORDERS, getNextStatus } from "../../data/ordersData";
import Badge from "../../components/Badge";
import { useNotification } from "../../context/NotificationContext";
import { Clock, User, CreditCard, SlidersHorizontal } from "lucide-react";
export default function LiveOrders() {
  const [orders, setOrders] = useState(DEMO_ORDERS);
  const [filter, setFilter] = useState("ALL");
  const { addNotification } = useNotification();
  const advance = (id) => {
    setOrders(prev => prev.map(o => {
      if (o.id!==id) return o;
      const next = getNextStatus(o.status);
      if (next===o.status) return o;
      if (next==="READY") addNotification({ type:"success", message:`Order ${id} is READY — student notified!` });
      return { ...o, status:next };
    }));
  };
  const filtered = filter==="ALL" ? orders : orders.filter(o=>o.status===filter);
  const counts = { ALL:orders.length, PLACED:orders.filter(o=>o.status==="PLACED").length, COOKING:orders.filter(o=>o.status==="COOKING").length, READY:orders.filter(o=>o.status==="READY").length };
  return (
    <div>
      <div className="sc-topbar">
        <div className="sc-topbar-left"><h1>Live Orders</h1><p>{orders.filter(o=>o.status!=="PICKED_UP").length} active orders</p></div>
        <div className="sc-topbar-right"><span className="sc-demo-tag">🧪 DEMO</span></div>
      </div>
      <div className="sc-page-content">
        <div style={{ display:"flex", gap:8, marginBottom:20, flexWrap:"wrap" }}>
          {Object.entries(counts).map(([k,v])=>(
            <button key={k} className={`sc-cat-btn ${filter===k?"active":""}`} onClick={()=>setFilter(k)}>
              {k} <span style={{ marginLeft:6, background:"rgba(255,255,255,0.15)", borderRadius:10, padding:"1px 7px", fontSize:11 }}>{v}</span>
            </button>
          ))}
        </div>
        {filtered.length===0 ? (
          <div className="sc-empty"><div className="sc-empty-icon">✅</div><h3>No orders in this status</h3><p>All caught up!</p></div>
        ) : (
          <div className="sc-order-grid">
            {filtered.map(order=>(
              <div key={order.id} className={`sc-order-card ${order.status.toLowerCase()}`}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                  <span style={{ fontWeight:700, fontSize:16 }}>{order.id}</span>
                  <Badge status={order.status}/>
                </div>
                <div style={{ fontSize:13, color:"var(--text-secondary)", display:"flex", gap:12 }}>
                  <span style={{ display:"flex", alignItems:"center", gap:4 }}><User size={12}/> {order.studentName}</span>
                  <span style={{ display:"flex", alignItems:"center", gap:4 }}><Clock size={12}/> {order.pickupSlot}</span>
                </div>
                <div style={{ background:"var(--bg-primary)", borderRadius:8, padding:12 }}>
                  {order.items.map(item=>(
                    <div key={item.itemId} style={{ marginBottom:4 }}>
                      <div style={{ display:"flex", justifyContent:"space-between", fontSize:13 }}>
                        <span>{item.emoji} {item.name} ×{item.quantity}</span>
                        <span style={{ color:"var(--text-muted)" }}>₹{item.price*item.quantity}</span>
                      </div>
                      {item.customization && (
                        <div style={{ fontSize:11, color:"var(--color-accent)", display:"flex", alignItems:"center", gap:4, marginTop:2 }}>
                          <SlidersHorizontal size={10}/> {item.customization}
                        </div>
                      )}
                    </div>
                  ))}
                  <div style={{ borderTop:"1px solid var(--border-color)", marginTop:8, paddingTop:8, display:"flex", justifyContent:"space-between", fontWeight:700, color:"var(--color-accent)" }}>
                    <span>Total</span><span>₹{order.total}</span>
                  </div>
                </div>
                <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                  <div style={{ fontSize:12, color:"var(--text-muted)", display:"flex", alignItems:"center", gap:4 }}>
                    <CreditCard size={12}/> {order.paymentMethod} · {order.paymentStatus}
                  </div>
                  {order.status!=="PICKED_UP" && (
                    <button className={`sc-btn sc-btn-sm ${order.status==="PLACED"?"sc-btn-primary":order.status==="COOKING"?"sc-btn-success":"sc-btn-outline"}`} onClick={()=>advance(order.id)}>
                      {order.status==="PLACED"?"→ Start Cooking":order.status==="COOKING"?"→ Mark Ready":"→ Mark Picked Up"}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
