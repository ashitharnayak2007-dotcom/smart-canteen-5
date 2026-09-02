import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Clock, MapPin, CreditCard, Smartphone, Banknote, Check, Tag, Sparkles, Percent } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { useNotification } from "../../context/NotificationContext";
import { PICKUP_SLOTS } from "../../data/menuData";

function generateOrderId() {
  return "SC" + (1000 + Math.floor(Math.random() * 9000));
}

const PAYMENT_METHODS = [
  { id: "upi",  label: "UPI Payment", icon: <Smartphone size={20} />, desc: "Google Pay, PhonePe, Paytm, BHIM" },
  { id: "card", label: "Credit / Debit Card", icon: <CreditCard size={20} />, desc: "Visa, Mastercard, RuPay cards" },
  { id: "cash", label: "Cash on Pickup", icon: <Banknote size={20} />, desc: "Pay in cash at canteen counter" },
];

function UPIForm() {
  const [upiId, setUpiId] = useState("");
  return (
    <div className="sc-form-group" style={{ marginTop: 14 }}>
      <label className="sc-label">Enter UPI ID / VPA</label>
      <input
        className="sc-input"
        placeholder="e.g. rahul@okaxis, 9876543210@ybl"
        value={upiId}
        onChange={e => setUpiId(e.target.value)}
      />
      <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 4 }}>
        A mock payment verification request will be simulated.
      </div>
    </div>
  );
}

function CardForm() {
  const [card, setCard] = useState({ number: "", name: "", expiry: "", cvv: "" });
  const upd = f => e => setCard(p => ({ ...p, [f]: e.target.value }));
  return (
    <div style={{ marginTop: 14 }}>
      <div className="sc-form-group">
        <label className="sc-label">Card Number</label>
        <input
          className="sc-input"
          placeholder="1234 5678 9012 3456"
          maxLength={19}
          value={card.number}
          onChange={e => {
            const v = e.target.value.replace(/\D/g, "").replace(/(.{4})/g, "$1 ").trim().slice(0, 19);
            setCard(p => ({ ...p, number: v }));
          }}
        />
      </div>
      <div className="sc-form-group">
        <label className="sc-label">Cardholder Name</label>
        <input
          className="sc-input"
          placeholder="RAHUL KUMAR"
          value={card.name}
          onChange={upd("name")}
        />
      </div>
      <div style={{ display: "flex", gap: 12 }}>
        <div className="sc-form-group" style={{ flex: 1 }}>
          <label className="sc-label">Expiry (MM/YY)</label>
          <input
            className="sc-input"
            placeholder="12/28"
            maxLength={5}
            value={card.expiry}
            onChange={upd("expiry")}
          />
        </div>
        <div className="sc-form-group" style={{ flex: 1 }}>
          <label className="sc-label">CVV</label>
          <input
            className="sc-input"
            type="password"
            placeholder="•••"
            maxLength={4}
            value={card.cvv}
            onChange={upd("cvv")}
          />
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  const {
    items,
    subtotal,
    discount,
    total,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    availableCoupons,
    clearCart
  } = useCart();
  const { user } = useAuth();
  const { addNotification } = useNotification();
  const navigate = useNavigate();

  const [slot, setSlot] = useState("S2");
  const [note, setNote] = useState("");
  const [payMethod, setPayMethod] = useState("upi");
  const [loading, setLoading] = useState(false);
  const [payLoading, setPayLoading] = useState(false);
  const [couponInput, setCouponInput] = useState("");

  if (items.length === 0) {
    return (
      <div className="sc-page-content" style={{ textAlign: "center", paddingTop: 80 }}>
        <p>Your cart is empty. <Link to="/student/menu">Go to menu</Link></p>
      </div>
    );
  }

  const handleApplyCoupon = (code) => {
    const res = applyCoupon(code || couponInput);
    if (res.success) {
      addNotification({ type: "success", message: res.message });
      setCouponInput("");
    } else {
      addNotification({ type: "error", message: res.message });
    }
  };

  const handlePlaceOrder = async () => {
    if (!slot) {
      alert("Please select a pickup slot.");
      return;
    }
    setPayLoading(true);
    await new Promise(r => setTimeout(r, 1400));
    setPayLoading(false);
    setLoading(true);
    await new Promise(r => setTimeout(r, 600));
    const orderId = generateOrderId();
    const orderData = {
      orderId,
      slot,
      items,
      subtotal,
      discount,
      total,
      couponCode: appliedCoupon?.code || null,
      note,
      user,
      payMethod
    };
    clearCart();
    navigate(`/student/confirmation/${orderId}`, { state: orderData });
  };

  return (
    <div>
      <div className="sc-topbar">
        <div className="sc-topbar-left">
          <h1>Checkout & Payment</h1>
          <p>Select pickup slot, apply offers & choose payment mode</p>
        </div>
      </div>

      <div className="sc-page-content">
        <div className="sc-grid-2" style={{ gap: 24, alignItems: "start" }}>
          {/* Left Column */}
          <div>
            {/* Pickup Slot Selection */}
            <div className="sc-card" style={{ marginBottom: 20 }}>
              <div className="sc-card-header">
                <span className="sc-card-title"><Clock size={16} /> 1. Select Pickup Slot</span>
              </div>
              <div className="sc-card-body">
                {["Breakfast", "Lunch", "Snacks"].map(period => {
                  const slots = PICKUP_SLOTS.filter(s => s.period === period);
                  return (
                    <div key={period} style={{ marginBottom: 16 }}>
                      <div style={{ fontSize: 11, fontWeight: 700, color: "var(--text-muted)", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.5px" }}>
                        {period} Slots
                      </div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                        {slots.map(s => (
                          <button
                            key={s.id}
                            onClick={() => setSlot(s.id)}
                            style={{
                              padding: "8px 14px",
                              borderRadius: 8,
                              border: `1px solid ${slot === s.id ? "var(--color-primary-light)" : "var(--border-color)"}`,
                              background: slot === s.id ? "rgba(20,184,166,0.12)" : "transparent",
                              color: slot === s.id ? "var(--color-primary-light)" : "var(--text-secondary)",
                              cursor: "pointer",
                              fontSize: 13,
                              fontWeight: slot === s.id ? 700 : 400,
                              transition: "all 0.15s"
                            }}
                          >
                            {s.time}
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Offers During Checkout */}
            <div className="sc-card" style={{ marginBottom: 20 }}>
              <div className="sc-card-header">
                <span className="sc-card-title"><Tag size={16} /> 2. Checkout Offers & Coupons</span>
              </div>
              <div className="sc-card-body">
                {appliedCoupon ? (
                  <div style={{
                    background: "rgba(16, 185, 129, 0.1)",
                    border: "1px solid var(--color-success)",
                    borderRadius: 8,
                    padding: "10px 14px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between"
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <Check size={16} color="var(--color-success)" />
                      <span style={{ fontWeight: 700, color: "var(--color-success)" }}>
                        Coupon {appliedCoupon.code} applied (-₹{discount})
                      </span>
                    </div>
                    <button
                      className="sc-btn sc-btn-ghost sc-btn-sm"
                      onClick={removeCoupon}
                      style={{ color: "var(--color-danger)", padding: "2px 8px" }}
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div>
                    <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
                      <input
                        className="sc-input"
                        placeholder="Enter coupon (e.g. FIRST50)"
                        value={couponInput}
                        onChange={e => setCouponInput(e.target.value.toUpperCase())}
                        style={{ textTransform: "uppercase", fontFamily: "monospace" }}
                      />
                      <button className="sc-btn sc-btn-primary sc-btn-sm" onClick={() => handleApplyCoupon()}>
                        Apply
                      </button>
                    </div>
                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                      {availableCoupons.slice(0, 3).map(c => (
                        <button
                          key={c.code}
                          className="sc-coupon-code-pill"
                          onClick={() => handleApplyCoupon(c.code)}
                          style={{ fontSize: 11, padding: "3px 8px" }}
                        >
                          ⚡ {c.code} ({c.discountType === 'flat' ? `₹${c.discountValue}` : `${c.discountValue}%`} off)
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Payment Method Gateway */}
            <div className="sc-card" style={{ marginBottom: 20 }}>
              <div className="sc-card-header">
                <span className="sc-card-title"><CreditCard size={16} /> 3. Payment Gateway</span>
                <span className="sc-demo-tag">🧪 100% SECURE DEMO</span>
              </div>
              <div className="sc-card-body">
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {PAYMENT_METHODS.map(pm => (
                    <div
                      key={pm.id}
                      onClick={() => setPayMethod(pm.id)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 14,
                        padding: "14px 16px",
                        borderRadius: 10,
                        border: `2px solid ${payMethod === pm.id ? "var(--color-primary-light)" : "var(--border-color)"}`,
                        background: payMethod === pm.id ? "rgba(20,184,166,0.07)" : "transparent",
                        cursor: "pointer",
                        transition: "all 0.15s"
                      }}
                    >
                      <div style={{
                        width: 40,
                        height: 40,
                        borderRadius: 10,
                        background: payMethod === pm.id ? "rgba(20,184,166,0.15)" : "var(--bg-hover)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: payMethod === pm.id ? "var(--color-primary-light)" : "var(--text-muted)"
                      }}>
                        {pm.icon}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 600, marginBottom: 2 }}>{pm.label}</div>
                        <div style={{ fontSize: 12, color: "var(--text-muted)" }}>{pm.desc}</div>
                      </div>
                      {payMethod === pm.id && (
                        <div style={{ width: 22, height: 22, borderRadius: "50%", background: "var(--color-primary-light)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <Check size={14} color="white" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {payMethod === "upi"  && <UPIForm />}
                {payMethod === "card" && <CardForm />}
                {payMethod === "cash" && (
                  <div className="sc-alert sc-alert-info" style={{ marginTop: 14, marginBottom: 0 }}>
                    <Banknote size={16} /> You will pay ₹{total} in cash at the canteen counter when you collect your meal.
                  </div>
                )}
              </div>
            </div>

            {/* Special Instructions Note */}
            <div className="sc-card">
              <div className="sc-card-header"><span className="sc-card-title">Order Notes & Handover</span></div>
              <div className="sc-card-body">
                <textarea
                  className="sc-textarea"
                  placeholder="e.g. Please pack cutlery / extra tissues / handover near Counter 2..."
                  value={note}
                  onChange={e => setNote(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Right Column: Sticky Summary & Pay Button */}
          <div className="sc-card" style={{ position: "sticky", top: 80 }}>
            <div className="sc-card-header">
              <span className="sc-card-title">Payment Summary</span>
            </div>
            <div className="sc-card-body">
              {items.map(item => {
                const key = item.id + item.customization;
                return (
                  <div key={key} style={{ borderBottom: "1px solid rgba(51,65,85,0.3)", padding: "8px 0" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14 }}>
                      <span>{item.name} ×{item.quantity}</span>
                      <span style={{ color: "var(--color-accent)", fontWeight: 600 }}>₹{item.price * item.quantity}</span>
                    </div>
                    {item.customization && (
                      <div style={{ fontSize: 11, color: "var(--color-primary-light)", marginTop: 2 }}>
                        📝 {item.customization}
                      </div>
                    )}
                  </div>
                );
              })}

              {slot && (
                <div className="sc-alert sc-alert-info" style={{ marginTop: 14, marginBottom: 0 }}>
                  <MapPin size={15} /> Pickup Slot: <strong>{PICKUP_SLOTS.find(s => s.id === slot)?.time}</strong>
                </div>
              )}

              <div style={{ padding: "12px 0", borderTop: "1px solid var(--border-color)", marginTop: 14 }}>
                <div className="sc-cart-row">
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>
                {discount > 0 && (
                  <div className="sc-discount-row">
                    <span>Coupon Discount ({appliedCoupon?.code})</span>
                    <span>-₹{discount}</span>
                  </div>
                )}
                <div className="sc-cart-row">
                  <span>Platform Fee</span>
                  <span style={{ color: "var(--color-success)" }}>FREE</span>
                </div>
                <div className="sc-cart-row total" style={{ fontSize: 20 }}>
                  <span>Total Payable</span>
                  <span>₹{total}</span>
                </div>
              </div>

              {discount > 0 && (
                <div className="sc-savings-badge">
                  <Sparkles size={14} /> You saved ₹{discount} on this order!
                </div>
              )}

              <button
                className="sc-btn sc-btn-accent sc-btn-full sc-btn-lg"
                onClick={handlePlaceOrder}
                disabled={loading || payLoading || !slot}
                style={{ fontSize: 16, fontWeight: 700 }}
              >
                {payLoading ? (
                  "🔒 Processing Gateway..."
                ) : loading ? (
                  "Confirming Order..."
                ) : (
                  `⚡ Pay ₹${total} & Place Order`
                )}
              </button>

              <Link to="/student/cart" className="sc-btn sc-btn-ghost sc-btn-full" style={{ marginTop: 10, justifyContent: "center" }}>
                ← Edit Cart
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}