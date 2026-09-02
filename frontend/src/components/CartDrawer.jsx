import React, { useState } from 'react';
import { X, Trash2, Clock, Tag, ArrowRight, ShoppingBag, Sparkles, Check } from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';
import { PICKUP_SLOTS } from '../data/initialData.js';

export default function CartDrawer() {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    updateCartQty,
    removeFromCart,
    clearCart,
    subtotal,
    discountAmount,
    finalTotal,
    selectedSlot,
    setSelectedSlot,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    placeOrder
  } = useApp();

  const [couponInput, setCouponInput] = useState('');
  const [couponMessage, setCouponMessage] = useState(null);
  const [instructions, setInstructions] = useState('');

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponInput) return;
    const res = applyCoupon(couponInput);
    setCouponMessage(res);
    if (res.success) {
      setCouponInput('');
    }
  };

  const handlePlaceOrder = () => {
    const order = placeOrder({ instructions });
    if (order) {
      // Order placed and navigated to tracking tab automatically in AppContext
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 90,
        backgroundColor: 'rgba(10, 15, 29, 0.75)',
        backdropFilter: 'blur(6px)',
        display: 'flex',
        justifyContent: 'flex-end'
      }}
      onClick={() => setIsCartOpen(false)}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '460px',
          height: '100%',
          background: '#1e293b',
          borderLeft: '1px solid rgba(255, 255, 255, 0.12)',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '-10px 0 30px rgba(0, 0, 0, 0.6)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            padding: '1.25rem 1.5rem',
            borderBottom: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'rgba(15, 23, 42, 0.8)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <ShoppingBag size={20} color="#10b981" />
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800 }}>Your Campus Cart</h3>
            <span className="badge badge-brand" style={{ fontSize: '0.7rem' }}>
              {cart.reduce((s, i) => s + i.qty, 0)} items
            </span>
          </div>

          <button
            onClick={() => setIsCartOpen(false)}
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              border: 'none',
              color: '#94a3b8',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable Body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.25rem 1.5rem' }}>
          {cart.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🛒</div>
              <h4 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Your Cart is Empty</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                Add hot South Indian snacks, combo meals, or drinks from today's live menu.
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="btn btn-primary"
                style={{ fontSize: '0.85rem' }}
              >
                Browse Live Menu
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              
              {/* Items List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                    Selected Items
                  </span>
                  <button
                    onClick={clearCart}
                    style={{ background: 'none', border: 'none', color: '#f87171', fontSize: '0.75rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
                  >
                    <Trash2 size={13} /> Clear
                  </button>
                </div>

                {cart.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      background: 'rgba(15, 23, 42, 0.6)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: '12px',
                      padding: '0.85rem 1rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <span style={{ fontSize: '1.5rem' }}>{item.image || '🍽️'}</span>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#ffffff' }}>{item.name}</div>
                        <div style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: 600 }}>
                          ₹{item.price} each
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          background: '#334155',
                          borderRadius: '6px',
                          padding: '0.2rem'
                        }}
                      >
                        <button
                          onClick={() => updateCartQty(item.id, -1)}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: '#fff',
                            width: '24px',
                            height: '24px',
                            cursor: 'pointer',
                            fontWeight: 700
                          }}
                        >
                          -
                        </button>
                        <span style={{ padding: '0 0.5rem', fontSize: '0.85rem', fontWeight: 700 }}>
                          {item.qty}
                        </span>
                        <button
                          onClick={() => updateCartQty(item.id, 1)}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: '#fff',
                            width: '24px',
                            height: '24px',
                            cursor: 'pointer',
                            fontWeight: 700
                          }}
                        >
                          +
                        </button>
                      </div>

                      <span style={{ fontWeight: 800, fontSize: '0.95rem', minWidth: '45px', textAlign: 'right' }}>
                        ₹{item.price * item.qty}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* 15-Minute Pickup Slot Selector */}
              <div
                style={{
                  background: 'rgba(15, 23, 42, 0.6)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '12px',
                  padding: '1rem'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.5rem' }}>
                  <Clock size={16} color="#38bdf8" />
                  <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#ffffff' }}>
                    Choose Pickup Slot
                  </span>
                </div>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                  Food will be prepared and ready at the counter at your scheduled time.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.4rem' }}>
                  {PICKUP_SLOTS.map((slot) => (
                    <button
                      key={slot}
                      onClick={() => setSelectedSlot(slot)}
                      style={{
                        background: selectedSlot === slot ? 'rgba(56, 189, 248, 0.2)' : 'rgba(255, 255, 255, 0.04)',
                        border: selectedSlot === slot ? '1px solid #38bdf8' : '1px solid var(--border-subtle)',
                        color: selectedSlot === slot ? '#38bdf8' : '#94a3b8',
                        padding: '0.45rem 0.6rem',
                        borderRadius: '6px',
                        fontSize: '0.725rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        textAlign: 'center'
                      }}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              {/* Coupon / Promo Code */}
              <div
                style={{
                  background: 'rgba(15, 23, 42, 0.6)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '12px',
                  padding: '1rem'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.5rem' }}>
                  <Tag size={16} color="#f59e0b" />
                  <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#ffffff' }}>
                    Coupons & Discounts
                  </span>
                </div>

                {appliedCoupon ? (
                  <div
                    style={{
                      background: 'rgba(16, 185, 129, 0.15)',
                      border: '1px solid #10b981',
                      borderRadius: '8px',
                      padding: '0.65rem 0.85rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '0.825rem', fontWeight: 700, color: '#34d399' }}>
                        Code {appliedCoupon.code} Applied!
                      </div>
                      <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>{appliedCoupon.desc}</div>
                    </div>
                    <button
                      onClick={removeCoupon}
                      style={{ background: 'none', border: 'none', color: '#f87171', fontSize: '0.75rem', cursor: 'pointer', fontWeight: 600 }}
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} style={{ display: 'flex', gap: '0.4rem' }}>
                    <input
                      type="text"
                      placeholder="e.g. CAMPUSFRESH / FIRSTBITE"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      style={{
                        flex: 1,
                        background: 'rgba(30, 41, 59, 0.8)',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: '6px',
                        padding: '0.45rem 0.65rem',
                        color: '#fff',
                        fontSize: '0.8rem',
                        textTransform: 'uppercase'
                      }}
                    />
                    <button type="submit" className="btn btn-secondary" style={{ padding: '0.45rem 0.85rem', fontSize: '0.8rem' }}>
                      Apply
                    </button>
                  </form>
                )}

                {couponMessage && !appliedCoupon && (
                  <div style={{ fontSize: '0.725rem', color: '#f87171', marginTop: '0.4rem' }}>
                    {couponMessage.message}
                  </div>
                )}
              </div>

              {/* Special Instructions */}
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.35rem', display: 'block' }}>
                  Cooking / Pickup Instructions (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Extra coconut chutney, less spicy noodles..."
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                  style={{
                    width: '100%',
                    background: 'rgba(15, 23, 42, 0.8)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '8px',
                    padding: '0.55rem 0.75rem',
                    color: '#fff',
                    fontSize: '0.8rem'
                  }}
                />
              </div>

            </div>
          )}
        </div>

        {/* Footer Bill & Place Order CTA */}
        {cart.length > 0 && (
          <div
            style={{
              padding: '1.25rem 1.5rem',
              borderTop: '1px solid var(--border-subtle)',
              background: 'rgba(15, 23, 42, 0.95)'
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', marginBottom: '1rem', fontSize: '0.85rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>

              {discountAmount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#34d399', fontWeight: 600 }}>
                  <span>Discount ({appliedCoupon?.code})</span>
                  <span>- ₹{discountAmount}</span>
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
                <span>Campus Convenience Fee</span>
                <span style={{ color: '#34d399' }}>FREE</span>
              </div>

              <div
                style={{
                  borderTop: '1px solid var(--border-subtle)',
                  paddingTop: '0.5rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontWeight: 800,
                  fontSize: '1.15rem'
                }}
              >
                <span>To Pay:</span>
                <span style={{ color: '#10b981' }}>₹{finalTotal}</span>
              </div>
            </div>

            <button
              onClick={handlePlaceOrder}
              className="btn btn-primary"
              style={{ width: '100%', padding: '0.9rem', fontSize: '1rem', fontWeight: 800, gap: '0.5rem' }}
            >
              Place Pre-Order • ₹{finalTotal} <ArrowRight size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
