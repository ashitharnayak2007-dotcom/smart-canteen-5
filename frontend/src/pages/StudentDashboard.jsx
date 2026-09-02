import React, { useState } from 'react';
import { 
  Search, 
  Clock, 
  Flame, 
  Star, 
  Plus, 
  CheckCircle2, 
  ShoppingBag, 
  QrCode, 
  ArrowRight, 
  Sparkles, 
  ChefHat,
  BellRing,
  RotateCcw,
  Zap,
  Info
} from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';

export default function StudentDashboard() {
  const {
    menu,
    cart,
    addToCart,
    updateCartQty,
    orders,
    activeStudentTab,
    setActiveStudentTab,
    setSelectedFoodDetail,
    setIsCartOpen,
    advanceOrderStatus
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [vegOnly, setVegOnly] = useState(false);

  const categories = ['All', 'South Indian', 'Meals', 'Chinese', 'Snacks', 'Beverages'];

  const filteredMenu = menu.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesVeg = !vegOnly || item.isVeg;
    return matchesSearch && matchesCategory && matchesVeg;
  });

  // Find the primary active order to track (first un-picked up order, or most recent)
  const activeOrder = orders.find((o) => o.status !== 'PICKED UP') || orders[0];

  const getStatusIndex = (status) => {
    switch (status) {
      case 'PLACED': return 0;
      case 'COOKING': return 1;
      case 'READY': return 2;
      case 'PICKED UP': return 3;
      default: return 0;
    }
  };

  const currentStepIdx = activeOrder ? getStatusIndex(activeOrder.status) : 0;

  const statusSteps = [
    { title: 'Order Placed', desc: 'Received by kitchen system' },
    { title: 'Cooking / In Prep', desc: 'Chef preparing fresh batch' },
    { title: 'Ready for Pickup', desc: 'Hot & packed at counter' },
    { title: 'Picked Up', desc: 'Token verified' }
  ];

  return (
    <div style={{ padding: '2rem 0 4rem 0' }}>
      <div className="container">
        
        {/* Student Profile & Quick Welcome Banner */}
        <div
          style={{
            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(56, 189, 248, 0.1) 100%)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            borderRadius: '16px',
            padding: '1.25rem 1.5rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
            marginBottom: '2rem'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.2rem' }}>
              <span style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff' }}>
                Hey Ashitha! 🎓
              </span>
              <span className="badge badge-brand" style={{ fontSize: '0.7rem' }}>
                Student ID: CS402
              </span>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>
              Pre-order your campus meals in advance & skip the 25-minute lunch queues.
            </p>
          </div>

          {/* Quick Active Order Snapshot */}
          {activeOrder && (
            <div
              style={{
                background: activeOrder.status === 'READY' ? 'rgba(16, 185, 129, 0.25)' : 'rgba(30, 41, 59, 0.8)',
                border: activeOrder.status === 'READY' ? '1px solid #10b981' : '1px solid var(--border-subtle)',
                borderRadius: '12px',
                padding: '0.65rem 1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.85rem',
                cursor: 'pointer'
              }}
              onClick={() => setActiveStudentTab('tracking')}
            >
              <div style={{
                background: activeOrder.status === 'READY' ? '#10b981' : '#38bdf8',
                padding: '0.4rem',
                borderRadius: '8px',
                color: '#fff',
                display: 'flex'
              }}>
                <BellRing size={16} />
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  Active Order {activeOrder.id} • {activeOrder.pickupSlot}
                </div>
                <div style={{ fontSize: '0.85rem', fontWeight: 800, color: activeOrder.status === 'READY' ? '#34d399' : '#38bdf8' }}>
                  Status: {activeOrder.status} ({activeOrder.estimatedWait})
                </div>
              </div>
              <ArrowRight size={14} color="#94a3b8" />
            </div>
          )}
        </div>

        {/* Tab Navigation: Menu vs Tracking */}
        <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '2rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.75rem' }}>
          <button
            onClick={() => setActiveStudentTab('menu')}
            style={{
              background: activeStudentTab === 'menu' ? 'linear-gradient(135deg, #10b981, #059669)' : 'rgba(255, 255, 255, 0.05)',
              color: activeStudentTab === 'menu' ? '#ffffff' : 'var(--text-muted)',
              border: activeStudentTab === 'menu' ? 'none' : '1px solid var(--border-subtle)',
              borderRadius: '10px',
              padding: '0.65rem 1.25rem',
              fontSize: '0.9rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              transition: 'all 0.2s'
            }}
          >
            <ShoppingBag size={18} /> Today's Live Menu ({menu.length})
          </button>

          <button
            onClick={() => setActiveStudentTab('tracking')}
            style={{
              background: activeStudentTab === 'tracking' ? 'linear-gradient(135deg, #38bdf8, #0284c7)' : 'rgba(255, 255, 255, 0.05)',
              color: activeStudentTab === 'tracking' ? '#ffffff' : 'var(--text-muted)',
              border: activeStudentTab === 'tracking' ? 'none' : '1px solid var(--border-subtle)',
              borderRadius: '10px',
              padding: '0.65rem 1.25rem',
              fontSize: '0.9rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              transition: 'all 0.2s'
            }}
          >
            <Clock size={18} /> My Orders & Live Tracking ({orders.length})
          </button>
        </div>

        {/* TAB 1: LIVE MENU */}
        {activeStudentTab === 'menu' && (
          <div>
            {/* Search & Category Filter Bar */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
                {/* Search Bar */}
                <div style={{ position: 'relative', flex: 1, minWidth: '260px' }}>
                  <Search size={18} color="#94a3b8" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                  <input
                    type="text"
                    placeholder="Search dishes (e.g. Masala Dosa, Rice, Noodles, Coffee)..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{
                      width: '100%',
                      background: 'rgba(30, 41, 59, 0.8)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: '12px',
                      padding: '0.75rem 1rem 0.75rem 2.6rem',
                      color: '#ffffff',
                      fontSize: '0.9rem'
                    }}
                  />
                </div>

                {/* Veg Toggle */}
                <button
                  onClick={() => setVegOnly(!vegOnly)}
                  style={{
                    background: vegOnly ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                    border: vegOnly ? '1px solid #10b981' : '1px solid var(--border-subtle)',
                    color: vegOnly ? '#34d399' : 'var(--text-muted)',
                    borderRadius: '10px',
                    padding: '0.7rem 1.1rem',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem'
                  }}
                >
                  <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981' }}></span>
                  Pure Veg Only
                </button>
              </div>

              {/* Category Pills */}
              <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    style={{
                      background: selectedCategory === cat ? '#334155' : 'transparent',
                      border: selectedCategory === cat ? '1px solid rgba(255, 255, 255, 0.3)' : '1px solid var(--border-subtle)',
                      color: selectedCategory === cat ? '#ffffff' : 'var(--text-muted)',
                      borderRadius: '9999px',
                      padding: '0.45rem 1rem',
                      fontSize: '0.825rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Menu Cards Grid */}
            <div className="grid-3">
              {filteredMenu.map((item) => {
                const inCart = cart.find((i) => i.id === item.id);
                return (
                  <div
                    key={item.id}
                    className="card card-glow"
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      cursor: 'pointer',
                      transition: 'all 0.25s ease'
                    }}
                    onClick={() => setSelectedFoodDetail(item)}
                  >
                    <div>
                      {/* Top Badges & Food Image */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.85rem' }}>
                        <div style={{
                          fontSize: '2.5rem',
                          background: 'rgba(255, 255, 255, 0.05)',
                          borderRadius: '12px',
                          width: '60px',
                          height: '60px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          border: '1px solid var(--border-subtle)'
                        }}>
                          {item.image}
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.3rem' }}>
                          <span className="badge badge-brand" style={{ fontSize: '0.65rem' }}>
                            {item.tag || item.category}
                          </span>
                          <span style={{ fontSize: '0.75rem', color: '#fbbf24', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                            <Star size={13} fill="#fbbf24" /> {item.rating}
                          </span>
                        </div>
                      </div>

                      {/* Food Name & Price */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.35rem' }}>
                        <h3 style={{ fontSize: '1.15rem', fontWeight: 800 }}>{item.name}</h3>
                        <span style={{ color: '#10b981', fontWeight: 800, fontSize: '1.2rem' }}>
                          ₹{item.price}
                        </span>
                      </div>

                      {/* Description */}
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: '1.45', marginBottom: '1rem' }}>
                        {item.description}
                      </p>

                      {/* Details Strip */}
                      <div style={{ display: 'flex', gap: '0.75rem', fontSize: '0.75rem', color: 'var(--text-dim)', marginBottom: '1.25rem' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                          <Clock size={13} /> {item.prepTime}
                        </span>
                        <span>•</span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                          <Flame size={13} /> {item.calories}
                        </span>
                      </div>
                    </div>

                    {/* Add to Cart Actions */}
                    <div onClick={(e) => e.stopPropagation()}>
                      {inCart ? (
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#334155', borderRadius: '8px', padding: '0.25rem 0.5rem' }}>
                          <button
                            onClick={() => updateCartQty(item.id, -1)}
                            style={{ background: 'none', border: 'none', color: '#fff', fontSize: '1.1rem', width: '28px', height: '28px', cursor: 'pointer', fontWeight: 700 }}
                          >
                            -
                          </button>
                          <span style={{ fontWeight: 800, fontSize: '0.9rem', color: '#34d399' }}>
                            {inCart.qty} in Cart (₹{inCart.qty * item.price})
                          </span>
                          <button
                            onClick={() => updateCartQty(item.id, 1)}
                            style={{ background: 'none', border: 'none', color: '#fff', fontSize: '1.1rem', width: '28px', height: '28px', cursor: 'pointer', fontWeight: 700 }}
                          >
                            +
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => addToCart(item)}
                          className="btn btn-primary"
                          style={{ width: '100%', fontSize: '0.85rem', padding: '0.6rem' }}
                        >
                          <Plus size={16} /> Add to Cart • ₹{item.price}
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 2: MY ORDERS & LIVE TRACKING */}
        {activeStudentTab === 'tracking' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            
            {/* Active Order Spotlight */}
            {activeOrder && (
              <div className="card card-glow" style={{ borderTop: '3px solid #10b981', padding: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem' }}>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>LIVE ORDER TRACKING</span>
                      <span className="badge badge-brand">{activeOrder.status}</span>
                    </div>
                    <h2 style={{ fontSize: '1.85rem', fontWeight: 800 }}>Order #{activeOrder.id}</h2>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>
                      Scheduled for <strong>{activeOrder.pickupSlot}</strong> at <strong>{activeOrder.counter}</strong>
                    </p>
                  </div>

                  {/* Token Pass Card */}
                  <div
                    style={{
                      background: 'rgba(15, 23, 42, 0.8)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: '12px',
                      padding: '0.85rem 1.25rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem'
                    }}
                  >
                    <QrCode size={40} color="#34d399" />
                    <div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>PICKUP TOKEN</div>
                      <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#34d399', lineHeight: 1 }}>
                        #{activeOrder.tokenNumber}
                      </div>
                      <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>{activeOrder.counter}</div>
                    </div>
                  </div>
                </div>

                {/* 4-Step Progress Bar */}
                <div style={{ marginBottom: '2rem' }}>
                  {/* Progress Line */}
                  <div style={{ height: '6px', background: '#334155', borderRadius: '4px', position: 'relative', marginBottom: '1.25rem' }}>
                    <div
                      style={{
                        height: '100%',
                        background: 'linear-gradient(90deg, #10b981 0%, #38bdf8 100%)',
                        borderRadius: '4px',
                        width: `${((currentStepIdx + 1) / statusSteps.length) * 100}%`,
                        transition: 'width 0.4s ease'
                      }}
                    ></div>
                  </div>

                  {/* Steps Grid */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem' }}>
                    {statusSteps.map((step, idx) => {
                      const isDone = idx <= currentStepIdx;
                      const isCurrent = idx === currentStepIdx;
                      return (
                        <div key={step.title} style={{ textAlign: 'center' }}>
                          <div
                            style={{
                              width: '28px',
                              height: '28px',
                              borderRadius: '50%',
                              background: isCurrent ? '#10b981' : isDone ? '#059669' : '#334155',
                              color: '#fff',
                              display: 'inline-flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '0.75rem',
                              fontWeight: 800,
                              marginBottom: '0.4rem',
                              boxShadow: isCurrent ? '0 0 12px #10b981' : 'none'
                            }}
                          >
                            {isDone ? <CheckCircle2 size={16} /> : idx + 1}
                          </div>
                          <div style={{ fontSize: '0.8rem', fontWeight: 700, color: isDone ? '#ffffff' : 'var(--text-dim)' }}>
                            {step.title}
                          </div>
                          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{step.desc}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Ready Status Notification Alert */}
                {activeOrder.status === 'READY' && (
                  <div
                    style={{
                      background: 'rgba(16, 185, 129, 0.2)',
                      border: '2px dashed #10b981',
                      borderRadius: '12px',
                      padding: '1.25rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      marginBottom: '1.5rem'
                    }}
                  >
                    <div style={{ background: '#10b981', color: '#fff', padding: '0.6rem', borderRadius: '10px', display: 'flex' }}>
                      <ChefHat size={24} />
                    </div>
                    <div>
                      <h4 style={{ color: '#34d399', fontSize: '1.05rem', fontWeight: 800 }}>
                        "Your order {activeOrder.id} is READY for pickup!"
                      </h4>
                      <p style={{ color: '#e2e8f0', fontSize: '0.825rem', margin: 0 }}>
                        Please proceed to <strong>{activeOrder.counter}</strong> and show <strong>Token #{activeOrder.tokenNumber}</strong>.
                      </p>
                    </div>
                  </div>
                )}

                {/* Interactive Kitchen Simulation Helper for Judges & Testing */}
                <div
                  style={{
                    background: 'rgba(15, 23, 42, 0.6)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '12px',
                    padding: '1rem 1.25rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '1rem'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    <Zap size={16} color="#fbbf24" />
                    <span><strong>Hackathon Test Tool:</strong> Advance order stage to simulate kitchen staff actions.</span>
                  </div>

                  <button
                    onClick={() => advanceOrderStatus(activeOrder.id)}
                    className="btn btn-secondary"
                    style={{ fontSize: '0.8rem', padding: '0.45rem 0.9rem', gap: '0.4rem', border: '1px solid #38bdf8' }}
                  >
                    <RotateCcw size={14} color="#38bdf8" /> Simulate Next Stage ({activeOrder.status} ➔)
                  </button>
                </div>
              </div>
            )}

            {/* Order History Table */}
            <div className="card">
              <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>All Campus Orders</h3>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-muted)', textAlign: 'left' }}>
                      <th style={{ padding: '0.6rem 0.5rem 0.6rem 0' }}>Order ID</th>
                      <th style={{ padding: '0.6rem 0.5rem' }}>Items</th>
                      <th style={{ padding: '0.6rem 0.5rem' }}>Pickup Slot</th>
                      <th style={{ padding: '0.6rem 0.5rem' }}>Amount</th>
                      <th style={{ padding: '0.6rem 0.5rem' }}>Status</th>
                      <th style={{ padding: '0.6rem 0 0.6rem 0.5rem', textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((o) => (
                      <tr key={o.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                        <td style={{ padding: '0.75rem 0.5rem 0.75rem 0', fontWeight: 800, color: '#ffffff' }}>{o.id}</td>
                        <td style={{ padding: '0.75rem 0.5rem', color: '#e2e8f0' }}>
                          {o.items.map((i) => `${i.qty}x ${i.name}`).join(', ')}
                        </td>
                        <td style={{ padding: '0.75rem 0.5rem', color: 'var(--text-muted)' }}>{o.pickupSlot}</td>
                        <td style={{ padding: '0.75rem 0.5rem', color: '#34d399', fontWeight: 700 }}>₹{o.totalAmount}</td>
                        <td style={{ padding: '0.75rem 0.5rem' }}>
                          <span
                            style={{
                              background: o.status === 'READY' ? 'rgba(16, 185, 129, 0.2)' : o.status === 'COOKING' ? 'rgba(245, 158, 11, 0.2)' : 'rgba(56, 189, 248, 0.2)',
                              color: o.status === 'READY' ? '#34d399' : o.status === 'COOKING' ? '#fbbf24' : '#38bdf8',
                              padding: '0.2rem 0.6rem',
                              borderRadius: '6px',
                              fontSize: '0.75rem',
                              fontWeight: 700
                            }}
                          >
                            {o.status}
                          </span>
                        </td>
                        <td style={{ padding: '0.75rem 0 0.75rem 0.5rem', textAlign: 'right' }}>
                          <button
                            onClick={() => advanceOrderStatus(o.id)}
                            style={{ background: 'none', border: 'none', color: '#38bdf8', fontSize: '0.75rem', cursor: 'pointer', fontWeight: 600 }}
                          >
                            Update ↻
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
