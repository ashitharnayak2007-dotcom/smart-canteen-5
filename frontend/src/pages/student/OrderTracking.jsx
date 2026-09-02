import { useParams, Link } from "react-router-dom";
import { CheckCircle, Circle, Clock, MapPin, Bell, CreditCard } from "lucide-react";
import { DEMO_ORDERS } from "../../data/ordersData";
import Badge from "../../components/Badge";
const STEPS = [
  { key:"PLACED",    label:"Order Placed",     desc:"Your order has been received." },
  { key:"COOKING",   label:"Being Prepared",   desc:"The kitchen is preparing your food." },
  { key:"READY",     label:"Ready for Pickup", desc:"Head to the counter now! 🎉" },
  { key:"PICKED_UP", label:"Picked Up",        desc:"Enjoy your meal! 😊" },
];
const SI = { PLACED:0, COOKING:1, READY:2, PICKED_UP:3 };
export default function OrderTracking() {
  const { id } = useParams();
  const order = DEMO_ORDERS.find(o=>o.id===id);
  if (!order) return (
    <div>
      <div className="sc-topbar"><div className="sc-topbar-left"><h1>Order Not Found</h1></div></div>
      <div className="sc-page-content"><div className="sc-empty"><div className="sc-empty-icon">🔍</div><h3>Order {id} not found</h3>
        <Link to="/student/orders" className="sc-btn sc-btn-primary" style={{ marginTop:16 }}>View All Orders</Link>
      </div></div>
    </div>
  );
  const ci = SI[order.status];
  return (
    <div>
      <div className="sc-topbar">
        <div className="sc-topbar-left"><h1>Track Order</h1><p>{order.id}</p></div>
        <div className="sc-topbar-right"><Badge status={order.status}/></div>
      </div>
      <div className="sc-page-content">
        <div className="sc-grid-2" style={{ gap:24, alignItems:"start" }}>
          <div className="sc-card">
            <div className="sc-card-header"><span className="sc-card-title">Order Status</span></div>
            <div className="sc-card-body">
              {order.status==="READY" && <div className="sc-alert sc-alert-success" style={{ marginBottom:20 }}><Bell size={16}/> 🔔 Your order is READY for pickup!</div>}
              <div className="sc-timeline">
                {STEPS.map((step,idx)=>{
                  const done=idx<ci, cur=idx===ci, pend=idx>ci;
                  return (
                    <div key={step.key} className={`sc-timeline-step ${done?"done":""}`}>
                      {idx<STEPS.length-1 && <div className="sc-timeline-line"/>}
                      <div className={`sc-timeline-dot ${done?"done":cur?"current":"pending"}`}>
                        {done?<CheckCircle size={18} color="white"/>:cur?<Clock size={18} color="white"/>:<Circle size={18} color="var(--text-muted)"/>}
                      </div>
                      <div className="sc-timeline-content">
                        <div className="sc-timeline-label" style={{ color:pend?"var(--text-muted)":"var(--text-primary)" }}>{step.label}</div>
                        {(done||cur) && <div className="sc-timeline-desc">{step.desc}</div>}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div>
            <div className="sc-card" style={{ marginBottom:16 }}>
              <div className="sc-card-header"><span className="sc-card-title">Order Details</span></div>
              <div className="sc-card-body">
                {order.items.map(item=>(
                  <div key={item.itemId} style={{ marginBottom:8 }}>
                    <div style={{ display:"flex", justifyContent:"space-between", fontSize:14 }}>
                      <span>{item.emoji} {item.name} ×{item.quantity}</span>
                      <span style={{ color:"var(--color-accent)", fontWeight:600 }}>₹{item.price*item.quantity}</span>
                    </div>
                    {item.customization && <div style={{ fontSize:11, color:"var(--color-primary-light)" }}>📝 {item.customization}</div>}
                  </div>
                ))}
                <div style={{ borderTop:"1px solid var(--border-color)", paddingTop:10, display:"flex", justifyContent:"space-between", fontWeight:700, color:"var(--color-accent)", fontSize:16 }}>
                  <span>Total</span><span>₹{order.total}</span>
                </div>
              </div>
            </div>
            <div className="sc-card">
              <div className="sc-card-header"><span className="sc-card-title">Pickup & Payment</span></div>
              <div className="sc-card-body" style={{ display:"flex", flexDirection:"column", gap:12 }}>
                <div style={{ display:"flex", alignItems:"center", gap:10, fontSize:14 }}>
                  <MapPin size={18} color="var(--color-primary-light)"/>
                  <div><div style={{ fontWeight:600 }}>Pickup Slot</div><div style={{ color:"var(--text-secondary)" }}>{order.pickupSlot}</div></div>
                </div>
                <div style={{ display:"flex", alignItems:"center", gap:10, fontSize:14 }}>
                  <CreditCard size={18} color="var(--color-info)"/>
                  <div><div style={{ fontWeight:600 }}>Payment</div><div style={{ color:"var(--text-secondary)" }}>{order.paymentMethod} · {order.paymentStatus}</div></div>
                </div>
                {order.estimatedWait>0 && (
                  <div style={{ display:"flex", alignItems:"center", gap:10, fontSize:14 }}>
                    <Clock size={18} color="var(--color-accent)"/>
                    <div><div style={{ fontWeight:600 }}>Est. Wait</div><div style={{ color:"var(--text-secondary)" }}>{order.estimatedWait} min</div></div>
                  </div>
                )}
              </div>
            </div>
            <Link to="/student/orders" className="sc-btn sc-btn-outline sc-btn-full" style={{ marginTop:14, justifyContent:"center" }}>← All Orders</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
