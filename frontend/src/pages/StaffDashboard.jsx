import React, { useState } from 'react';
import { 
  ChefHat, 
  Clock, 
  TrendingUp, 
  AlertTriangle, 
  Bot, 
  CheckCircle2, 
  Trash2, 
  Sparkles, 
  ArrowRight, 
  Plus, 
  Package, 
  Layers, 
  Database,
  Flame
} from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';
import GenieQA from '../components/GenieQA.jsx';

export default function StaffDashboard() {
  const {
    orders,
    advanceOrderStatus,
    inventory,
    restockInventoryItem,
    wastageLogs,
    recordWastage,
    forecastDay,
    setForecastDay,
    forecastData
  } = useApp();

  const [orderFilter, setOrderFilter] = useState('ALL'); // 'ALL' | 'PLACED' | 'COOKING' | 'READY' | 'PICKED UP'
  
  // Wastage form
  const [wasteItem, setWasteItem] = useState('Veg Rice Combo');
  const [wasteQty, setWasteQty] = useState('');
  const [wasteReason, setWasteReason] = useState('Post-lunch overproduction');

  const filteredOrders = orders.filter((o) => {
    if (orderFilter === 'ALL') return true;
    return o.status === orderFilter;
  });

  const lowStockItems = inventory.filter((i) => i.status === 'LOW');

  const handleWastageSubmit = (e) => {
    e.preventDefault();
    if (!wasteItem || !wasteQty) return;
    recordWastage({ item: wasteItem, quantity: wasteQty, reason: wasteReason });
    setWasteQty('');
  };

  return (
    <div style={{ padding: '2rem 0 4rem 0' }}>
      <div className="container">
        
        {/* Header Banner */}
        <div
          style={{
            background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, rgba(234, 88, 12, 0.1) 100%)',
            border: '1px solid rgba(245, 158, 11, 0.3)',
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
                Canteen Kitchen Operations 👨‍🍳
              </span>
              <span className="badge badge-warning" style={{ fontSize: '0.7rem' }}>
                Chef Raman (Lead)
              </span>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>
              Live Order Pipeline • ML Demand Prep Targets • Databricks Genie Lakehouse Assistant
            </p>
          </div>

          {/* Quick Metrics */}
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <div style={{ background: 'rgba(30, 41, 59, 0.8)', padding: '0.5rem 1rem', borderRadius: '10px', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>ACTIVE QUEUE</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#38bdf8' }}>
                {orders.filter((o) => o.status !== 'PICKED UP').length} Orders
              </div>
            </div>

            <div style={{ background: 'rgba(30, 41, 59, 0.8)', padding: '0.5rem 1rem', borderRadius: '10px', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>TODAY'S ML PREP TARGET</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#34d399' }}>
                {forecastData.total} Meals
              </div>
            </div>
          </div>
        </div>

        {/* Low Stock Alert Banner (if any) */}
        {lowStockItems.length > 0 && (
          <div
            style={{
              background: 'rgba(239, 68, 68, 0.15)',
              border: '1px solid rgba(239, 68, 68, 0.4)',
              borderRadius: '12px',
              padding: '1rem 1.25rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1rem',
              marginBottom: '2rem'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <AlertTriangle size={22} color="#f87171" />
              <div>
                <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#f87171' }}>
                  Low-Stock Inventory Warning ({lowStockItems.length} items critical)
                </div>
                <div style={{ fontSize: '0.78rem', color: '#cbd5e1' }}>
                  {lowStockItems.map((i) => `${i.name} (${i.stock} ${i.unit} left)`).join(' • ')}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {lowStockItems.map((i) => (
                <button
                  key={i.id}
                  onClick={() => restockInventoryItem(i.id, 10.0)}
                  className="btn btn-secondary"
                  style={{ fontSize: '0.75rem', padding: '0.4rem 0.75rem', borderColor: '#f87171', color: '#f87171' }}
                >
                  Restock {i.name} (+10 {i.unit})
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 2 Column Main Section */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>
          
          {/* COLUMN 1: LIVE ORDERS QUEUE & INVENTORY */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            <div className="card card-glow" style={{ borderTop: '3px solid #f59e0b' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Live Kitchen Order Stream</h3>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: 0 }}>Advance order stages as dishes are cooked & packed</p>
                </div>
                <span className="badge badge-warning">{filteredOrders.length} Visible</span>
              </div>

              {/* Status Filter Tabs */}
              <div style={{ display: 'flex', gap: '0.4rem', overflowX: 'auto', paddingBottom: '0.5rem', marginBottom: '1.25rem' }}>
                {['ALL', 'PLACED', 'COOKING', 'READY', 'PICKED UP'].map((status) => (
                  <button
                    key={status}
                    onClick={() => setOrderFilter(status)}
                    style={{
                      background: orderFilter === status ? '#334155' : 'transparent',
                      border: orderFilter === status ? '1px solid rgba(255, 255, 255, 0.3)' : '1px solid var(--border-subtle)',
                      color: orderFilter === status ? '#ffffff' : 'var(--text-muted)',
                      borderRadius: '8px',
                      padding: '0.35rem 0.75rem',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {status}
                  </button>
                ))}
              </div>

              {/* Order Cards Stream */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {filteredOrders.length === 0 ? (
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-dim)', textAlign: 'center', padding: '2rem' }}>
                    No orders matching filter "{orderFilter}"
                  </p>
                ) : (
                  filteredOrders.map((order) => {
                    let badgeColor = '#38bdf8';
                    let nextActionText = '👨‍🍳 Start Cooking';
                    let targetNext = 'COOKING';

                    if (order.status === 'COOKING') {
                      badgeColor = '#fbbf24';
                      nextActionText = '🔔 Mark Ready';
                      targetNext = 'READY';
                    } else if (order.status === 'READY') {
                      badgeColor = '#34d399';
                      nextActionText = '✅ Mark Picked Up';
                      targetNext = 'PICKED UP';
                    } else if (order.status === 'PICKED UP') {
                      badgeColor = '#94a3b8';
                      nextActionText = 'Fulfilled';
                      targetNext = null;
                    }

                    return (
                      <div
                        key={order.id}
                        style={{
                          background: 'rgba(15, 23, 42, 0.75)',
                          border: `1px solid ${badgeColor}33`,
                          borderLeft: `4px solid ${badgeColor}`,
                          borderRadius: '12px',
                          padding: '1.15rem'
                        }}
                      >
                        {/* Top info */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                          <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                              <span style={{ fontWeight: 800, fontSize: '1.1rem', color: '#ffffff' }}>{order.id}</span>
                              <span style={{ fontSize: '0.75rem', background: '#334155', padding: '0.15rem 0.5rem', borderRadius: '4px', color: '#cbd5e1' }}>
                                Token #{order.tokenNumber}
                              </span>
                              <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>• {order.counter}</span>
                            </div>
                            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                              Student: <strong>{order.studentName}</strong> ({order.studentId}) • Ordered: {order.orderTime}
                            </div>
                          </div>

                          <span
                            style={{
                              background: `${badgeColor}22`,
                              color: badgeColor,
                              padding: '0.25rem 0.65rem',
                              borderRadius: '6px',
                              fontSize: '0.725rem',
                              fontWeight: 800,
                              border: `1px solid ${badgeColor}44`
                            }}
                          >
                            {order.status}
                          </span>
                        </div>

                        {/* Items summary */}
                        <div style={{ background: 'rgba(30, 41, 59, 0.5)', padding: '0.65rem', borderRadius: '8px', marginBottom: '0.75rem' }}>
                          <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#e2e8f0' }}>
                            {order.items.map((i) => `${i.qty}x ${i.name}`).join(' • ')}
                          </div>
                          {order.instructions && (
                            <div style={{ fontSize: '0.75rem', color: '#fbbf24', marginTop: '0.25rem' }}>
                              Note: "{order.instructions}"
                            </div>
                          )}
                        </div>

                        {/* Pickup Slot & Advance Action */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                            <Clock size={14} color="#38bdf8" />
                            <span>Slot: <strong>{order.pickupSlot}</strong></span>
                          </div>

                          {targetNext ? (
                            <button
                              onClick={() => advanceOrderStatus(order.id, targetNext)}
                              className="btn btn-primary"
                              style={{
                                padding: '0.45rem 0.9rem',
                                fontSize: '0.78rem',
                                background: targetNext === 'COOKING' ? '#f59e0b' : targetNext === 'READY' ? '#10b981' : '#38bdf8'
                              }}
                            >
                              {nextActionText}
                            </button>
                          ) : (
                            <span style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 600 }}>
                              ✓ Order Complete
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* INGREDIENT INVENTORY TABLE */}
            <div className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Package size={20} color="#38bdf8" />
                  <h3 style={{ fontSize: '1.15rem' }}>Ingredient Inventory</h3>
                </div>
                <span className="badge badge-brand">{inventory.length} Tracked</span>
              </div>

              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.825rem' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-muted)', textAlign: 'left' }}>
                      <th style={{ padding: '0.5rem 0.5rem 0.5rem 0' }}>Ingredient</th>
                      <th style={{ padding: '0.5rem' }}>Stock</th>
                      <th style={{ padding: '0.5rem' }}>Min Level</th>
                      <th style={{ padding: '0.5rem' }}>Status</th>
                      <th style={{ padding: '0.5rem 0 0.5rem 0.5rem', textAlign: 'right' }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inventory.map((item) => (
                      <tr key={item.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                        <td style={{ padding: '0.65rem 0.5rem 0.65rem 0', fontWeight: 600, color: '#ffffff' }}>{item.name}</td>
                        <td style={{ padding: '0.65rem 0.5rem', color: item.status === 'LOW' ? '#f87171' : '#34d399', fontWeight: 700 }}>
                          {item.stock} {item.unit}
                        </td>
                        <td style={{ padding: '0.65rem 0.5rem', color: 'var(--text-muted)' }}>
                          {item.minThreshold} {item.unit}
                        </td>
                        <td style={{ padding: '0.65rem 0.5rem' }}>
                          <span
                            style={{
                              background: item.status === 'LOW' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(16, 185, 129, 0.2)',
                              color: item.status === 'LOW' ? '#f87171' : '#34d399',
                              padding: '0.15rem 0.5rem',
                              borderRadius: '4px',
                              fontSize: '0.7rem',
                              fontWeight: 700
                            }}
                          >
                            {item.status}
                          </span>
                        </td>
                        <td style={{ padding: '0.65rem 0 0.65rem 0.5rem', textAlign: 'right' }}>
                          <button
                            onClick={() => restockInventoryItem(item.id, 10.0)}
                            style={{
                              background: 'rgba(255,255,255,0.06)',
                              border: '1px solid var(--border-subtle)',
                              color: '#38bdf8',
                              padding: '0.25rem 0.5rem',
                              borderRadius: '6px',
                              fontSize: '0.725rem',
                              cursor: 'pointer',
                              fontWeight: 600
                            }}
                          >
                            + Restock
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>

          {/* COLUMN 2: ML DEMAND FORECAST & GENIE ASSISTANT & WASTAGE */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            {/* ML DEMAND PREDICTION CARD */}
            <div className="card card-glow" style={{ borderTop: '3px solid #10b981' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <TrendingUp size={20} color="#34d399" />
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>AI Demand Forecasting</h3>
                  </div>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: 0 }}>
                    Scikit-Learn ML Model • Confidence: <strong>{forecastData.confidence}</strong>
                  </p>
                </div>

                {/* Day Switcher */}
                <div style={{ display: 'flex', gap: '0.25rem', background: '#0f172a', padding: '0.2rem', borderRadius: '8px' }}>
                  {['Monday', 'Tuesday', 'Friday'].map((d) => (
                    <button
                      key={d}
                      onClick={() => setForecastDay(d)}
                      style={{
                        background: forecastDay === d ? '#10b981' : 'transparent',
                        color: forecastDay === d ? '#ffffff' : '#94a3b8',
                        border: 'none',
                        borderRadius: '6px',
                        padding: '0.25rem 0.6rem',
                        fontSize: '0.725rem',
                        fontWeight: 700,
                        cursor: 'pointer'
                      }}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              {/* Total Prep Box */}
              <div
                style={{
                  background: 'rgba(16, 185, 129, 0.12)',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  borderRadius: '10px',
                  padding: '0.85rem 1rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '1rem'
                }}
              >
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>RECOMMENDED PREPARATION BATCH</div>
                  <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#34d399' }}>
                    {forecastData.total} Total Meals
                  </div>
                </div>
                <div style={{ textAlign: 'right', fontSize: '0.75rem', color: '#cbd5e1', maxWidth: '200px' }}>
                  {forecastData.insight}
                </div>
              </div>

              {/* Item Predictions Breakdown */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.6rem' }}>
                {forecastData.predictions.map((p) => (
                  <div
                    key={p.item}
                    style={{
                      background: 'rgba(15, 23, 42, 0.6)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: '8px',
                      padding: '0.65rem 0.85rem',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#ffffff' }}>{p.item}</div>
                      <div style={{ fontSize: '0.68rem', color: '#10b981' }}>{p.factor}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#38bdf8' }}>{p.target}</div>
                      <div style={{ fontSize: '0.65rem', color: 'var(--text-dim)' }}>units</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* DEDICATED DATABRICKS GENIE Q&A COMPONENT */}
            <GenieQA defaultRole="Staff" />

            {/* FOOD WASTAGE LOGGER */}
            <div className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Trash2 size={18} color="#f59e0b" />
                  <h3 style={{ fontSize: '1.15rem' }}>Food Wastage Entry</h3>
                </div>
                <span className="badge badge-warning" style={{ fontSize: '0.65rem' }}>Delta Lake Ingestion</span>
              </div>

              <form onSubmit={handleWastageSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '0.5rem' }}>
                  <select
                    value={wasteItem}
                    onChange={(e) => setWasteItem(e.target.value)}
                    style={{
                      background: 'rgba(15, 23, 42, 0.8)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: '8px',
                      padding: '0.5rem 0.75rem',
                      color: '#ffffff',
                      fontSize: '0.8rem'
                    }}
                  >
                    <option value="Veg Rice Combo">Veg Rice Combo</option>
                    <option value="Masala Dosa">Masala Dosa</option>
                    <option value="Veg Hakka Noodles">Veg Hakka Noodles</option>
                    <option value="Idli & Sambar">Idli & Sambar</option>
                    <option value="Medu Vada Batter">Medu Vada Batter</option>
                    <option value="Tangy Lemon Rice">Tangy Lemon Rice</option>
                  </select>

                  <input
                    type="number"
                    step="0.1"
                    placeholder="Qty in kg"
                    value={wasteQty}
                    onChange={(e) => setWasteQty(e.target.value)}
                    style={{
                      background: 'rgba(15, 23, 42, 0.8)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: '8px',
                      padding: '0.5rem 0.75rem',
                      color: '#ffffff',
                      fontSize: '0.8rem'
                    }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '0.5rem' }}>
                  <select
                    value={wasteReason}
                    onChange={(e) => setWasteReason(e.target.value)}
                    style={{
                      background: 'rgba(15, 23, 42, 0.8)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: '8px',
                      padding: '0.5rem 0.75rem',
                      color: '#ffffff',
                      fontSize: '0.8rem'
                    }}
                  >
                    <option value="Post-lunch overproduction">Post-lunch overproduction</option>
                    <option value="Exceeded safe holding time">Exceeded safe holding time</option>
                    <option value="Batch overcooked">Batch overcooked</option>
                    <option value="Accidental spill">Accidental spill</option>
                  </select>

                  <button type="submit" className="btn btn-secondary" style={{ padding: '0.5rem', fontSize: '0.8rem' }}>
                    + Record
                  </button>
                </div>
              </form>

              {/* Recent Wastage Logs */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', maxHeight: '160px', overflowY: 'auto' }}>
                {wastageLogs.map((log) => (
                  <div
                    key={log.id}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      background: 'rgba(15, 23, 42, 0.5)',
                      padding: '0.45rem 0.65rem',
                      borderRadius: '6px',
                      fontSize: '0.75rem'
                    }}
                  >
                    <div>
                      <span style={{ fontWeight: 700, color: '#ffffff' }}>{log.item}</span>
                      <span style={{ color: '#fbbf24', marginLeft: '0.4rem' }}>{log.quantity} {log.unit || 'kg'}</span>
                      <span style={{ color: 'var(--text-dim)', marginLeft: '0.4rem' }}>({log.reason})</span>
                    </div>
                    <span style={{ color: 'var(--text-muted)' }}>{log.date}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
