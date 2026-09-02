import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Trash2, ArrowRight, SlidersHorizontal, Tag, Check, X, Sparkles, Percent } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { useNotification } from "../../context/NotificationContext";

export default function CartPage() {
  const {
    items,
    removeItem,
    updateQuantity,
    subtotal,
    discount,
    total,
    clearCart,
    itemCount,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    availableCoupons
  } = useCart();

  const [inputCode, setInputCode] = useState("");
  const { addNotification } = useNotification();

  const handleApply = (codeToApply) => {
    const code = codeToApply || inputCode;
    if (!code) return;
    const res = applyCoupon(code);
    if (res.success) {
      addNotification({ type: "success", message: res.message });
      setInputCode("");
    } else {
      addNotification({ type: "error", message: res.message });
    }
  };

  const handleRemoveCoupon = () => {
    removeCoupon();
    addNotification({ type: "info", message: "Coupon removed" });
  };

  if (items.length === 0) {
    return (
      <div>
        <div className="sc-topbar"><div className="sc-topbar-left"><h1>Your Cart</h1></div></div>
        <div className="sc-page-content">
          <div className="sc-empty">
            <div className="sc-empty-icon">🛒</div>
            <h3>Your cart is empty</h3>
            <p>Add delicious items from the menu to start your order</p>
            <Link to="/student/menu" className="sc-btn sc-btn-primary" style={{ marginTop: 16 }}>
              Browse Menu
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="sc-topbar">
        <div className="sc-topbar-left">
          <h1>Your Cart</h1>
          <p>{itemCount} item{itemCount !== 1 ? "s" : ""} selected · Choose a discount before checkout</p>
        </div>
        <div className="sc-topbar-right">
          <button className="sc-btn sc-btn-ghost sc-btn-sm" onClick={clearCart}>
            <Trash2 size={14} /> Clear Cart
          </button>
        </div>
      </div>

      <div className="sc-page-content">
        <div className="sc-grid-2" style={{ gap: 20, alignItems: "start" }}>
          {/* Left Column: Cart Items & Coupon Selector */}
          <div>
            {/* Cart Items List */}
            <div className="sc-card" style={{ marginBottom: 20 }}>
              <div className="sc-card-header">
                <span className="sc-card-title"><ShoppingCart size={16} /> Selected Meals</span>
              </div>
              <div className="sc-card-body">
                {items.map(item => {
                  const key = item.id + item.customization;
                  return (
                    <div key={key} className="sc-cart-item">
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{ width: 64, height: 64, borderRadius: 10, objectFit: "cover", flexShrink: 0 }}
                        onError={(e) => { e.target.style.display = 'none'; }}
                      />
                      <div className="sc-cart-info">
                        <div className="sc-cart-name">{item.name}</div>
                        <div className="sc-cart-unit">₹{item.price} each</div>
                        {item.customization && (
                          <div style={{ fontSize: 12, color: "var(--color-primary-light)", marginTop: 4, display: "flex", alignItems: "center", gap: 4, background: "rgba(20,184,166,0.08)", padding: "2px 8px", borderRadius: 4, width: "fit-content" }}>
                            <SlidersHorizontal size={11} /> {item.customization}
                          </div>
                        )}
                        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 8 }}>
                          <button className="sc-qty-btn" onClick={() => updateQuantity(key, item.quantity - 1)}>-</button>
                          <span className="sc-qty-val">{item.quantity}</span>
                          <button className="sc-qty-btn" onClick={() => updateQuantity(key, item.quantity + 1)}>+</button>
                        </div>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8 }}>
                        <div className="sc-cart-subtotal">₹{item.price * item.quantity}</div>
                        <button className="sc-btn sc-btn-ghost sc-btn-icon" onClick={() => removeItem(key)} title="Remove item">
                          <Trash2 size={14} color="var(--color-danger)" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Coupons Section */}
            <div className="sc-card">
              <div className="sc-card-header">
                <span className="sc-card-title"><Tag size={16} /> Apply Coupons & Student Offers</span>
              </div>
              <div className="sc-card-body">
                {/* Manual Code Input */}
                <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
                  <input
                    className="sc-input"
                    placeholder="Enter coupon code (e.g. FIRST50, AURIX20)..."
                    value={inputCode}
                    onChange={e => setInputCode(e.target.value.toUpperCase())}
                    style={{ textTransform: "uppercase", letterSpacing: 1, fontFamily: "monospace" }}
                  />
                  <button className="sc-btn sc-btn-primary" onClick={() => handleApply()}>
                    Apply
                  </button>
                </div>

                {/* Applied Coupon Banner */}
                {appliedCoupon && (
                  <div style={{
                    background: "rgba(16, 185, 129, 0.1)",
                    border: "1px solid var(--color-success)",
                    borderRadius: 10,
                    padding: "12px 16px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 16
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{ width: 28, height: 28, borderRadius: "50%", background: "var(--color-success)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Check size={16} color="white" />
                      </div>
                      <div>
                        <div style={{ fontWeight: 700, color: "var(--color-success)", fontSize: 14 }}>
                          &apos;{appliedCoupon.code}&apos; Applied!
                        </div>
                        <div style={{ fontSize: 12, color: "var(--text-secondary)" }}>
                          You are saving ₹{discount} on this order!
                        </div>
                      </div>
                    </div>
                    <button className="sc-btn sc-btn-ghost sc-btn-sm" onClick={handleRemoveCoupon} style={{ color: "var(--color-danger)" }}>
                      <X size={14} /> Remove
                    </button>
                  </div>
                )}

                {/* Available Coupon Cards */}
                <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-secondary)", marginBottom: 10 }}>
                  Available Offers for You:
                </div>
                <div className="sc-coupons-grid">
                  {availableCoupons.map(c => {
                    const isApplied = appliedCoupon?.code === c.code;
                    const canApply = subtotal >= c.minOrder;
                    return (
                      <div key={c.code} className={`sc-coupon-card ${isApplied ? 'applied' : ''}`}>
                        <div className="sc-coupon-top">
                          <span
                            className="sc-coupon-tag"
                            style={{ background: `${c.color}22`, color: c.color }}
                          >
                            {c.tag}
                          </span>
                          <span style={{ fontFamily: "monospace", fontWeight: 800, color: "var(--color-primary-light)", fontSize: 13 }}>
                            {c.code}
                          </span>
                        </div>
                        <div className="sc-coupon-title">{c.title}</div>
                        <div className="sc-coupon-desc">{c.description}</div>
                        <div className="sc-coupon-footer">
                          <span style={{ fontSize: 11, color: "var(--text-muted)" }}>
                            Min order: ₹{c.minOrder}
                          </span>
                          {isApplied ? (
                            <span style={{ color: "var(--color-success)", fontWeight: 700, fontSize: 12, display: "flex", alignItems: "center", gap: 3 }}>
                              <Check size={14} /> Applied
                            </span>
                          ) : (
                            <button
                              className="sc-btn sc-btn-outline sc-btn-sm"
                              onClick={() => handleApply(c.code)}
                              disabled={!canApply}
                              style={{ padding: "3px 10px", fontSize: 12 }}
                            >
                              {canApply ? "Apply" : `Add ₹${c.minOrder - subtotal} more`}
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Order Total & Checkout */}
          <div className="sc-card" style={{ position: "sticky", top: 80 }}>
            <div className="sc-card-header">
              <span className="sc-card-title">Order Summary</span>
            </div>
            <div className="sc-card-body">
              {/* Items Breakdown */}
              <div style={{ marginBottom: 16 }}>
                {items.map(item => {
                  const key = item.id + item.customization;
                  return (
                    <div key={key} style={{ borderBottom: "1px solid rgba(51,65,85,0.3)", padding: "8px 0" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14 }}>
                        <span>{item.name} ×{item.quantity}</span>
                        <span style={{ color: "var(--text-secondary)" }}>₹{item.price * item.quantity}</span>
                      </div>
                      {item.customization && (
                        <div style={{ fontSize: 11, color: "var(--color-primary-light)", marginTop: 2 }}>
                          📝 {item.customization}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Price Calculations */}
              <div style={{ padding: "8px 0" }}>
                <div className="sc-cart-row">
                  <span>Items Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>
                {discount > 0 && (
                  <div className="sc-discount-row">
                    <span>Discount ({appliedCoupon?.code})</span>
                    <span>-₹{discount}</span>
                  </div>
                )}
                <div className="sc-cart-row">
                  <span>Platform Fee</span>
                  <span style={{ color: "var(--color-success)" }}>FREE</span>
                </div>
                <div className="sc-cart-row total">
                  <span>Final Total</span>
                  <span>₹{total}</span>
                </div>
              </div>

              {discount > 0 && (
                <div className="sc-savings-badge">
                  <Sparkles size={14} /> Total Savings: ₹{discount} with coupon!
                </div>
              )}

              <Link to="/student/checkout" className="sc-btn sc-btn-accent sc-btn-full sc-btn-lg">
                Proceed to Checkout <ArrowRight size={18} />
              </Link>
              <Link to="/student/menu" className="sc-btn sc-btn-ghost sc-btn-full" style={{ marginTop: 10, justifyContent: "center" }}>
                ← Add More Food Items
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}