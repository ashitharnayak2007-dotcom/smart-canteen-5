import { useLocation, Link } from "react-router-dom";
import { MapPin, ClipboardList, CreditCard, Tag, Sparkles } from "lucide-react";
import { PICKUP_SLOTS } from "../../data/menuData";

export default function OrderConfirmation() {
  const { state } = useLocation();

  if (!state) {
    return (
      <div className="sc-confirm-page">
        <div className="sc-confirm-box">
          <p>No active order receipt found.</p>
          <Link to="/student/menu" className="sc-btn sc-btn-primary" style={{ marginTop: 16 }}>Back to Menu</Link>
        </div>
      </div>
    );
  }

  const { orderId, slot, items, subtotal, discount, total, couponCode, payMethod } = state;
  const slotInfo = PICKUP_SLOTS.find(s => s.id === slot);
  const PMLabel = { upi: "UPI (Google Pay/PhonePe)", card: "Credit/Debit Card", cash: "Cash at Counter" };

  return (
    <div className="sc-confirm-page">
      <div className="sc-confirm-box" style={{ maxWidth: 540 }}>
        <div className="sc-confirm-icon">🎉</div>
        <div style={{ color: "var(--color-success)", fontWeight: 700, fontSize: 15, marginBottom: 6 }}>
          ✓ Payment & Order Confirmed!
        </div>
        <h1 className="sc-confirm-title" style={{ fontSize: 24, marginBottom: 4 }}>
          Kitchen is preparing your meal
        </h1>
        <div className="sc-confirm-order-id">{orderId}</div>
        <div className="sc-confirm-detail">Show this Order ID at the counter to collect</div>

        {/* Order Bill Breakdown */}
        <div style={{
          background: "var(--bg-primary)",
          border: "1px solid var(--border-color)",
          borderRadius: 12,
          padding: 18,
          marginTop: 20,
          textAlign: "left"
        }}>
          <div style={{ fontWeight: 700, marginBottom: 12, fontSize: 14 }}>Bill Details</div>
          {items.map(item => (
            <div key={item.id + item.customization} style={{ marginBottom: 6 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "var(--text-secondary)" }}>
                <span>{item.name} ×{item.quantity}</span>
                <span style={{ fontWeight: 600 }}>₹{item.price * item.quantity}</span>
              </div>
              {item.customization && (
                <div style={{ fontSize: 11, color: "var(--color-primary-light)", marginTop: 2 }}>
                  📝 {item.customization}
                </div>
              )}
            </div>
          ))}

          <div style={{ borderTop: "1px solid var(--border-color)", marginTop: 10, paddingTop: 10 }}>
            {discount > 0 && (
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "var(--color-success)", marginBottom: 4 }}>
                <span>Coupon Applied ({couponCode})</span>
                <span>-₹{discount}</span>
              </div>
            )}
            <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 700, color: "var(--color-accent)", fontSize: 16 }}>
              <span>Total Paid</span>
              <span>₹{total}</span>
            </div>
          </div>
        </div>

        {/* Pickup & Payment Badges */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 16, fontSize: 13, color: "var(--text-secondary)" }}>
          {slotInfo && (
            <div style={{ display: "flex", alignItems: "center", gap: 8, justifyContent: "center" }}>
              <MapPin size={16} color="var(--color-primary-light)" />
              Pickup Time: <strong style={{ color: "var(--text-primary)" }}>{slotInfo.time}</strong>
            </div>
          )}
          <div style={{ display: "flex", alignItems: "center", gap: 8, justifyContent: "center" }}>
            <CreditCard size={15} color="var(--color-info)" />
            Payment Mode: <strong style={{ color: "var(--text-primary)" }}>{PMLabel[payMethod] || payMethod}</strong>
          </div>
          {discount > 0 && (
            <div style={{ display: "flex", alignItems: "center", gap: 6, justifyContent: "center", color: "var(--color-success)" }}>
              <Sparkles size={14} /> You saved ₹{discount} with coupon {couponCode}!
            </div>
          )}
        </div>

        <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
          <Link to="/student/orders" className="sc-btn sc-btn-primary" style={{ flex: 1, justifyContent: "center" }}>
            <ClipboardList size={16} /> Track Status
          </Link>
          <Link to="/student/menu" className="sc-btn sc-btn-outline" style={{ flex: 1, justifyContent: "center" }}>
            Order More
          </Link>
        </div>
      </div>
    </div>
  );
}