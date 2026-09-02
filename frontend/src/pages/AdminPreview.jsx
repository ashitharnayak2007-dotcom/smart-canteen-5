import React from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Trash2, 
  Clock, 
  ShoppingBag, 
  Database, 
  Sparkles,
  ArrowUpRight,
  CheckCircle2,
  Users
} from 'lucide-react';

export default function AdminPreview() {
  const kpis = [
    { title: "Today's Orders", val: '128', sub: '+14% vs yesterday', icon: <ShoppingBag size={20} color="#10b981" />, border: '#10b981' },
    { title: 'Weekly Orders', val: '842', sub: 'Campus-wide volume', icon: <Users size={20} color="#38bdf8" />, border: '#38bdf8' },
    { title: 'Food Waste', val: '8.4 kg', sub: '-32% reduction vs baseline', icon: <Trash2 size={20} color="#f59e0b" />, border: '#f59e0b' },
    { title: 'Average Wait Time', val: '7 min', sub: 'Target < 10 mins achieved', icon: <Clock size={20} color="#a855f7" />, border: '#a855f7' }
  ];

  const popularItems = [
    { name: 'Masala Dosa', sold: 342, revenue: '₹15,390', waste: '1.2 kg', trend: '+18%' },
    { name: 'Veg Rice Combo', sold: 285, revenue: '₹19,950', waste: '2.1 kg', trend: '+12%' },
    { name: 'Veg Noodles', sold: 210, revenue: '₹12,600', waste: '0.8 kg', trend: '+5%' },
    { name: 'Idli & Vada', sold: 195, revenue: '₹5,850', waste: '0.5 kg', trend: '+8%' },
    { name: 'Lemon Rice', sold: 140, revenue: '₹7,000', waste: '0.9 kg', trend: '-2%' }
  ];

  const peakHours = [
    { time: '11:30 AM - 12:00 PM', orders: 18, pct: 14 },
    { time: '12:00 PM - 12:30 PM', orders: 42, pct: 33 },
    { time: '12:30 PM - 01:00 PM', orders: 88, pct: 69 },
    { time: '01:00 PM - 01:30 PM', orders: 114, pct: 89, isPeak: true },
    { time: '01:30 PM - 02:00 PM', orders: 54, pct: 42 },
    { time: '02:00 PM - 02:30 PM', orders: 16, pct: 12 }
  ];

  const deltaTables = [
    { name: 'orders', rows: '3,420', status: 'Live Sync', format: 'Delta Lake' },
    { name: 'inventory', rows: '48', status: 'Live Sync', format: 'Delta Lake' },
    { name: 'wastage', rows: '184', status: 'Live Sync', format: 'Delta Lake' },
    { name: 'food_items', rows: '26', status: 'Live Sync', format: 'Delta Lake' },
    { name: 'sales', rows: '1,290', status: 'Live Sync', format: 'Delta Lake' }
  ];

  return (
    <div style={{ padding: '2rem 0' }}>
      <div className="container">
        {/* Banner */}
        <div style={{
          background: 'rgba(99, 102, 241, 0.1)',
          border: '1px solid rgba(99, 102, 241, 0.3)',
          borderRadius: '12px',
          padding: '1rem 1.25rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          marginBottom: '2rem'
        }}>
          <Sparkles size={20} color="#818cf8" />
          <div style={{ fontSize: '0.875rem', color: '#e2e8f0' }}>
            <strong>College Administration Dashboard (Phase 1 Baseline):</strong> High-level campus food intelligence, Databricks Lakehouse sync, demand & wastage KPIs, and peak rush metrics.
          </div>
        </div>

        {/* 4 KPI Cards */}
        <div className="grid-4" style={{ marginBottom: '2rem' }}>
          {kpis.map(k => (
            <div key={k.title} className="card" style={{ borderLeft: `3px solid ${k.border}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                  {k.title}
                </span>
                {k.icon}
              </div>
              <div style={{ fontSize: '1.75rem', fontWeight: 800 }}>{k.val}</div>
              <div style={{ fontSize: '0.75rem', color: '#34d399', marginTop: '0.2rem' }}>{k.sub}</div>
            </div>
          ))}
        </div>

        {/* 2 Column Section: Popular Items Table & Peak Hours */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>
          
          {/* Popular Items Table */}
          <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <div>
                <h3 style={{ fontSize: '1.15rem' }}>Popular Food Items & Wastage</h3>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Aggregated from Databricks Lakehouse SQL</p>
              </div>
              <span className="badge badge-brand">Weekly Aggregates</span>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.825rem' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-muted)', textAlign: 'left' }}>
                    <th style={{ padding: '0.5rem 0.5rem 0.5rem 0' }}>Item Name</th>
                    <th style={{ padding: '0.5rem' }}>Orders Sold</th>
                    <th style={{ padding: '0.5rem' }}>Revenue</th>
                    <th style={{ padding: '0.5rem' }}>Wastage</th>
                    <th style={{ padding: '0.5rem 0 0.5rem 0.5rem', textAlign: 'right' }}>Trend</th>
                  </tr>
                </thead>
                <tbody>
                  {popularItems.map((item, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                      <td style={{ padding: '0.65rem 0.5rem 0.65rem 0', fontWeight: 600, color: '#ffffff' }}>{item.name}</td>
                      <td style={{ padding: '0.65rem 0.5rem', color: 'var(--text-muted)' }}>{item.sold}</td>
                      <td style={{ padding: '0.65rem 0.5rem', color: '#34d399', fontWeight: 600 }}>{item.revenue}</td>
                      <td style={{ padding: '0.65rem 0.5rem', color: '#fbbf24' }}>{item.waste}</td>
                      <td style={{ padding: '0.65rem 0 0.65rem 0.5rem', textAlign: 'right', color: item.trend.startsWith('+') ? '#10b981' : '#f87171' }}>{item.trend}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Peak Lunch Hours Chart */}
          <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <div>
                <h3 style={{ fontSize: '1.15rem' }}>Peak Lunch Hours Distribution</h3>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Student order load by 30-min window</p>
              </div>
              <span className="badge badge-warning">Rush at 1:00 PM</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {peakHours.map((slot, i) => (
                <div key={i}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '0.2rem' }}>
                    <span style={{ fontWeight: slot.isPeak ? 700 : 500, color: slot.isPeak ? '#fbbf24' : '#cbd5e1' }}>
                      {slot.time} {slot.isPeak && '(🔥 Peak Rush)'}
                    </span>
                    <span style={{ color: 'var(--text-muted)' }}>{slot.orders} orders ({slot.pct}%)</span>
                  </div>
                  <div style={{ height: '7px', background: 'rgba(255,255,255,0.06)', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{
                      width: `${slot.pct}%`,
                      height: '100%',
                      background: slot.isPeak ? 'linear-gradient(90deg, #f59e0b, #ef4444)' : 'linear-gradient(90deg, #10b981, #38bdf8)',
                      borderRadius: '4px'
                    }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Databricks Lakehouse Delta Tables Status Card */}
        <div className="card card-glow" style={{ borderLeft: '3px solid #6366f1' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Database size={20} color="#818cf8" />
              <div>
                <h3 style={{ fontSize: '1.1rem' }}>Databricks Lakehouse Delta Tables</h3>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: 0 }}>Active tables synchronized for SQL & Genie queries</p>
              </div>
            </div>
            <span className="badge badge-team">Catalog: smart_canteen</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
            {deltaTables.map(t => (
              <div key={t.name} style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                  <span style={{ fontWeight: 700, fontSize: '0.85rem', color: '#ffffff', fontFamily: 'var(--font-mono)' }}>{t.name}</span>
                  <CheckCircle2 size={13} color="#10b981" />
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{t.rows} records • {t.format}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
