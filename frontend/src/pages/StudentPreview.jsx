import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Clock, 
  CheckCircle2, 
  ChefHat, 
  ArrowRight, 
  Plus, 
  Minus, 
  Sparkles,
  Info,
  QrCode
} from 'lucide-react';

export default function StudentPreview() {
  const [cart, setCart] = useState([
    { id: '1', name: 'Masala Dosa', price: 45, qty: 1, category: 'Breakfast / Snack' },
    { id: '2', name: 'Veg Noodles', price: 60, qty: 1, category: 'Lunch' }
  ]);
  const [selectedSlot, setSelectedSlot] = useState('12:45 PM - 01:00 PM');
  const [activeStep, setActiveStep] = useState(2); // 0: Placed, 1: Cooking, 2: Ready, 3: Picked Up

  const menuItems = [
    { id: '1', name: 'Masala Dosa', price: 45, category: 'South Indian', available: true, wait: '6 mins', prepQty: 72 },
    { id: '2', name: 'Veg Rice Combo', price: 70, category: 'Meals', available: true, wait: '4 mins', prepQty: 64 },
    { id: '3', name: 'Veg Noodles', price: 60, category: 'Chinese', available: true, wait: '8 mins', prepQty: 50 },
    { id: '4', name: 'Idli (2 Pcs)', price: 30, category: 'South Indian', available: true, wait: '2 mins', prepQty: 45 },
    { id: '5', name: 'Medu Vada (1 Pc)', price: 25, category: 'Snacks', available: true, wait: '3 mins', prepQty: 40 },
    { id: '6', name: 'Lemon Rice', price: 50, category: 'Rice Items', available: true, wait: '4 mins', prepQty: 35 }
  ];

  const pickupSlots = [
    '12:15 PM - 12:30 PM',
    '12:30 PM - 12:45 PM',
    '12:45 PM - 01:00 PM',
    '01:00 PM - 01:15 PM',
    '01:15 PM - 01:30 PM'
  ];

  const updateQty = (id, delta) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(0, item.qty + delta);
        return { ...item, qty: newQty };
      }
      return item;
    }).filter(item => item.qty > 0));
  };

  const addItem = (item) => {
    setCart(prev => {
      const exists = prev.find(i => i.id === item.id);
      if (exists) {
        return prev.map(i => i.id === item.id ? { ...i, qty: i.qty + 1 } : i);
      }
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

  const statusSteps = [
    { title: 'Order Placed', time: '12:35 PM', desc: 'Received by kitchen system' },
    { title: 'Cooking / In Prep', time: '12:40 PM', desc: 'Chef preparing fresh batch' },
    { title: 'Ready for Pickup', time: '12:48 PM', desc: 'Ready at Counter 2' },
    { title: 'Picked Up', time: 'Pending', desc: 'Scan QR at counter' }
  ];

  return (
    <div style={{ padding: '2rem 0' }}>
      <div className="container">
        {/* Banner Alert for Phase 1 */}
        <div style={{
          background: 'rgba(16, 185, 129, 0.1)',
          border: '1px solid rgba(16, 185, 129, 0.3)',
          borderRadius: '12px',
          padding: '1rem 1.25rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          marginBottom: '2rem'
        }}>
          <Sparkles size={20} color="#34d399" />
          <div style={{ fontSize: '0.875rem', color: '#e2e8f0' }}>
            <strong>Student Experience Preview (Phase 1 Baseline):</strong> Complete live menu, interactive cart calculation, pickup slot allocation, and real-time order lifecycle tracking.
          </div>
        </div>

        {/* 2 Column Layout: Menu + Cart/Tracker */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '2rem' }}>
          
          {/* Left Column: Menu Items */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <div>
                <h3 style={{ fontSize: '1.4rem' }}>Today's Live Menu</h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Canteen Main Campus • Counter 1 & 2</p>
              </div>
              <span className="badge badge-brand">Freshly Prepared</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {menuItems.map(item => (
                <div 
                  key={item.id} 
                  className="card"
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '1.15rem',
                    background: 'rgba(30, 41, 59, 0.9)'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                      <span style={{ fontWeight: 700, fontSize: '1rem', color: '#ffffff' }}>{item.name}</span>
                      <span style={{ fontSize: '0.7rem', background: '#334155', padding: '0.15rem 0.5rem', borderRadius: '4px', color: '#94a3b8' }}>
                        {item.category}
                      </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.775rem', color: 'var(--text-muted)' }}>
                      <span style={{ color: '#34d399', fontWeight: 700, fontSize: '0.9rem' }}>₹{item.price}</span>
                      <span>• Est. wait: {item.wait}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => addItem(item)}
                    className="btn btn-secondary"
                    style={{ padding: '0.45rem 0.85rem', fontSize: '0.8rem', gap: '0.3rem' }}
                  >
                    <Plus size={14} /> Add
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Slot Selection + Order Status Tracker */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            {/* Slot & Cart Card */}
            <div className="card card-glow">
              <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Clock size={18} color="#38bdf8" /> 1. Select Pickup Slot
              </h3>
              
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
                {pickupSlots.map(slot => (
                  <button
                    key={slot}
                    onClick={() => setSelectedSlot(slot)}
                    style={{
                      background: selectedSlot === slot ? 'rgba(56, 189, 248, 0.18)' : 'rgba(255, 255, 255, 0.04)',
                      border: selectedSlot === slot ? '1px solid #38bdf8' : '1px solid var(--border-subtle)',
                      color: selectedSlot === slot ? '#38bdf8' : 'var(--text-muted)',
                      padding: '0.45rem 0.75rem',
                      borderRadius: '8px',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    {slot}
                  </button>
                ))}
              </div>

              <h4 style={{ fontSize: '0.95rem', marginBottom: '0.75rem', color: '#cbd5e1' }}>Order Summary</h4>
              {cart.length === 0 ? (
                <p style={{ fontSize: '0.85rem', color: 'var(--text-dim)' }}>Your cart is empty. Add items from the menu.</p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '1rem' }}>
                  {cart.map(item => (
                    <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem' }}>
                      <span>{item.name} (x{item.qty})</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                        <span style={{ fontWeight: 600 }}>₹{item.price * item.qty}</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                          <button onClick={() => updateQty(item.id, -1)} style={{ background: '#334155', border: 'none', color: '#fff', borderRadius: '4px', width: '22px', height: '22px', cursor: 'pointer' }}>-</button>
                          <button onClick={() => updateQty(item.id, 1)} style={{ background: '#334155', border: 'none', color: '#fff', borderRadius: '4px', width: '22px', height: '22px', cursor: 'pointer' }}>+</button>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '0.75rem', display: 'flex', justifyContent: 'space-between', fontWeight: 700 }}>
                    <span>Total Amount:</span>
                    <span style={{ color: '#34d399', fontSize: '1.1rem' }}>₹{totalAmount}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Live Order Tracker */}
            <div className="card" style={{ borderLeft: '3px solid #10b981' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>ACTIVE ORDER</div>
                  <div style={{ fontWeight: 800, fontSize: '1.15rem', color: '#ffffff' }}>Order #SC-1024</div>
                </div>
                <span className="badge badge-brand">
                  <CheckCircle2 size={13} /> READY FOR PICKUP
                </span>
              </div>

              {/* Status Stepper */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', position: 'relative', paddingLeft: '1.25rem' }}>
                <div style={{ position: 'absolute', left: '6px', top: '8px', bottom: '8px', width: '2px', background: '#334155' }}></div>
                
                {statusSteps.map((s, idx) => {
                  const isDone = idx <= activeStep;
                  const isCurrent = idx === activeStep;
                  return (
                    <div key={s.title} style={{ position: 'relative' }}>
                      <div style={{
                        position: 'absolute',
                        left: '-1.25rem',
                        top: '4px',
                        width: '14px',
                        height: '14px',
                        borderRadius: '50%',
                        background: isCurrent ? '#10b981' : isDone ? '#059669' : '#334155',
                        boxShadow: isCurrent ? '0 0 10px #10b981' : 'none'
                      }}></div>
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontSize: '0.875rem', fontWeight: 600, color: isDone ? '#ffffff' : 'var(--text-dim)' }}>
                            {s.title}
                          </span>
                          <span style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>{s.time}</span>
                        </div>
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-dim)', margin: 0 }}>{s.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Ready Notification Card */}
              <div style={{
                marginTop: '1.25rem',
                padding: '0.85rem',
                background: 'rgba(16, 185, 129, 0.15)',
                border: '1px dashed #10b981',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem'
              }}>
                <QrCode size={32} color="#34d399" />
                <div>
                  <div style={{ fontSize: '0.825rem', fontWeight: 700, color: '#34d399' }}>
                    "Your order SC-1024 is ready for pickup at Counter 2!"
                  </div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                    Show Token #24 to the canteen staff
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
