import React, { useState } from 'react';
import { 
  Shield, 
  Trash2, 
  Clock, 
  ShoppingBag, 
  Database, 
  Sparkles, 
  DollarSign, 
  CheckCircle2, 
  Users, 
  ArrowUpRight, 
  ArrowDownRight,
  Flame,
  Calendar,
  Layers
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { useApp } from '../context/AppContext.jsx';
import GenieQA from '../components/GenieQA.jsx';

export default function AdminDashboard() {
  const { orders, inventory, wastageLogs } = useApp();

  // Chart Data: Peak Lunch Hours
  const peakHourData = [
    { time: '11:30 AM', orders: 18, capacity: 60 },
    { time: '12:00 PM', orders: 42, capacity: 80 },
    { time: '12:30 PM', orders: 88, capacity: 100 },
    { time: '01:00 PM', orders: 114, capacity: 120 }, // Peak Rush
    { time: '01:30 PM', orders: 54, capacity: 80 },
    { time: '02:00 PM', orders: 16, capacity: 50 }
  ];

  // Chart Data: 7-Day Revenue & Demand Trend
  const weeklyTrendData = [
    { day: 'Mon', orders: 142, revenue: 8520, wasteKg: 1.8 },
    { day: 'Tue', orders: 128, revenue: 7680, wasteKg: 1.2 },
    { day: 'Wed', orders: 135, revenue: 8100, wasteKg: 1.4 },
    { day: 'Thu', orders: 122, revenue: 7320, wasteKg: 1.1 },
    { day: 'Fri', orders: 168, revenue: 10080, wasteKg: 1.9 },
    { day: 'Sat', orders: 82, revenue: 4920, wasteKg: 0.6 },
    { day: 'Sun', orders: 65, revenue: 3900, wasteKg: 0.4 }
  ];

  // Chart Data: Food Wastage Before vs After ML Model
  const wasteComparisonData = [
    { item: 'Veg Rice', beforeML: 4.8, afterML: 2.4, saved: 2.4 },
    { item: 'Sambar/Curry', beforeML: 3.5, afterML: 1.8, saved: 1.7 },
    { item: 'Noodles', beforeML: 2.1, afterML: 0.9, saved: 1.2 },
    { item: 'Dosa Batter', beforeML: 1.6, afterML: 0.6, saved: 1.0 },
    { item: 'Lemon Rice', beforeML: 1.4, afterML: 0.5, saved: 0.9 }
  ];

  // Chart Data: Category Share
  const categoryData = [
    { name: 'South Indian', value: 42, color: '#10b981' },
    { name: 'Combo Meals', value: 28, color: '#38bdf8' },
    { name: 'Chinese / Fast', value: 18, color: '#f59e0b' },
    { name: 'Snacks & Drinks', value: 12, color: '#818cf8' }
  ];

  // Popular vs Unpopular Items Table Data
  const foodPerformance = [
    { name: 'Masala Dosa', category: 'South Indian', sold: 342, revenue: '₹15,390', waste: '1.2 kg', status: 'TOP_SELLER', trend: '+18%' },
    { name: 'Veg Rice Combo', category: 'Meals', sold: 285, revenue: '₹19,950', waste: '2.4 kg', status: 'TOP_SELLER', trend: '+12%' },
    { name: 'Veg Hakka Noodles', category: 'Chinese', sold: 210, revenue: '₹12,600', waste: '0.9 kg', status: 'STABLE', trend: '+5%' },
    { name: 'Idli & Vada Combo', category: 'South Indian', sold: 195, revenue: '₹5,850', waste: '0.6 kg', status: 'STABLE', trend: '+8%' },
    { name: 'Tangy Lemon Rice', category: 'Rice Items', sold: 140, revenue: '₹7,000', waste: '0.5 kg', status: 'MODERATE', trend: '-2%' },
    { name: 'Upma Special', category: 'Breakfast', sold: 38, revenue: '₹1,140', waste: '2.8 kg', status: 'LOW_DEMAND', trend: '-24%' }
  ];

  // Lakehouse Delta Tables
  const deltaTables = [
    { name: 'orders', rows: '3,420', status: 'Live Sync', format: 'Delta Lake', partition: 'order_date' },
    { name: 'inventory', rows: '48', status: 'Live Sync', format: 'Delta Lake', partition: 'category' },
    { name: 'wastage', rows: '184', status: 'Live Sync', format: 'Delta Lake', partition: 'date' },
    { name: 'food_items', rows: '26', status: 'Live Sync', format: 'Delta Lake', partition: 'is_active' },
    { name: 'sales', rows: '1,290', status: 'Live Sync', format: 'Delta Lake', partition: 'month' }
  ];

  return (
    <div style={{ padding: '2rem 0 4rem 0' }}>
      <div className="container">
        
        {/* Header Banner */}
        <div
          style={{
            background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(139, 92, 246, 0.1) 100%)',
            border: '1px solid rgba(99, 102, 241, 0.3)',
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
                College Administration Intelligence 🛡️
              </span>
              <span className="badge badge-team" style={{ fontSize: '0.7rem' }}>
                Databricks Lakehouse Executive
              </span>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>
              Campus Food Services Governance • Waste Reduction Metrics • Revenue & Demand Analytics
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <span className="badge badge-brand" style={{ padding: '0.4rem 0.85rem', fontSize: '0.75rem' }}>
              Delta Lake Sync Active
            </span>
          </div>
        </div>

        {/* 5 EXECUTIVE KPI CARDS */}
        <div className="grid-3" style={{ marginBottom: '2rem', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
          
          <div className="card" style={{ borderLeft: '3px solid #10b981' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#34d399', marginBottom: '0.3rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase' }}>Today's Orders</span>
              <ShoppingBag size={18} />
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: 900 }}>128</div>
            <div style={{ fontSize: '0.75rem', color: '#10b981' }}>+14% vs yesterday</div>
          </div>

          <div className="card" style={{ borderLeft: '3px solid #38bdf8' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#38bdf8', marginBottom: '0.3rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase' }}>Weekly Orders</span>
              <Users size={18} />
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: 900 }}>842</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Campus volume</div>
          </div>

          <div className="card" style={{ borderLeft: '3px solid #f59e0b' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#fbbf24', marginBottom: '0.3rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase' }}>Weekly Revenue</span>
              <DollarSign size={18} />
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: 900 }}>₹48,950</div>
            <div style={{ fontSize: '0.75rem', color: '#10b981' }}>+11.4% growth</div>
          </div>

          <div className="card" style={{ borderLeft: '3px solid #ec4899' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#f472b6', marginBottom: '0.3rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase' }}>Food Waste</span>
              <Trash2 size={18} />
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: 900 }}>8.4 kg</div>
            <div style={{ fontSize: '0.75rem', color: '#10b981' }}>-32% reduction</div>
          </div>

          <div className="card" style={{ borderLeft: '3px solid #818cf8' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#a5b4fc', marginBottom: '0.3rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase' }}>Average Wait Time</span>
              <Clock size={18} />
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: 900 }}>7.2 min</div>
            <div style={{ fontSize: '0.75rem', color: '#10b981' }}>Target &lt; 10 min achieved</div>
          </div>

        </div>

        {/* 2 CHARTS ROW: PEAK HOURS & 7-DAY REVENUE */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
          
          <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <div>
                <h3 style={{ fontSize: '1.15rem' }}>Peak Lunch Hours Load</h3>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Pre-orders placed by 30-min window</p>
              </div>
              <span className="badge badge-warning">🔥 Rush at 1:00 PM</span>
            </div>

            <div style={{ width: '100%', height: '240px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={peakHourData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                  <XAxis dataKey="time" stroke="#94a3b8" fontSize={11} />
                  <YAxis stroke="#94a3b8" fontSize={11} />
                  <Tooltip 
                    contentStyle={{ background: '#1e293b', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }}
                  />
                  <Bar dataKey="orders" fill="#38bdf8" radius={[4, 4, 0, 0]} name="Orders" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <div>
                <h3 style={{ fontSize: '1.15rem' }}>7-Day Revenue & Orders Trend</h3>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Daily Gross Revenue in ₹</p>
              </div>
              <span className="badge badge-brand">Weekly Overview</span>
            </div>

            <div style={{ width: '100%', height: '240px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={weeklyTrendData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                  <XAxis dataKey="day" stroke="#94a3b8" fontSize={11} />
                  <YAxis stroke="#94a3b8" fontSize={11} />
                  <Tooltip 
                    contentStyle={{ background: '#1e293b', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }}
                  />
                  <Area type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorRev)" name="Revenue (₹)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>

        {/* 2 CHARTS ROW: WASTAGE REDUCTION & CATEGORY BREAKDOWN */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
          
          <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <div>
                <h3 style={{ fontSize: '1.15rem' }}>Food Wastage: Before vs After ML</h3>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Quantity in kg lost per dish type</p>
              </div>
              <span className="badge badge-brand">-32% Average Reduction</span>
            </div>

            <div style={{ width: '100%', height: '240px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={wasteComparisonData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                  <XAxis dataKey="item" stroke="#94a3b8" fontSize={11} />
                  <YAxis stroke="#94a3b8" fontSize={11} />
                  <Tooltip 
                    contentStyle={{ background: '#1e293b', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }}
                  />
                  <Legend wrapperStyle={{ fontSize: '12px' }} />
                  <Bar dataKey="beforeML" fill="#f87171" name="Before ML (kg)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="afterML" fill="#10b981" name="With ML (kg)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <div>
                <h3 style={{ fontSize: '1.15rem' }}>Campus Food Category Share</h3>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Order volume by cuisine type</p>
              </div>
              <span className="badge badge-team">South Indian 42%</span>
            </div>

            <div style={{ width: '100%', height: '240px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={85}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ background: '#1e293b', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }}
                  />
                  <Legend wrapperStyle={{ fontSize: '12px' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>

        {/* 2 COLUMN SECTION: LAKEHOUSE TABLES & ADMIN GENIE */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '2rem' }}>
          
          <div className="card card-glow" style={{ borderTop: '3px solid #6366f1' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Database size={20} color="#818cf8" />
                <h3 style={{ fontSize: '1.15rem' }}>Databricks Lakehouse Delta Tables</h3>
              </div>
              <span className="badge badge-team">Catalog: smart_canteen</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {deltaTables.map((t) => (
                <div
                  key={t.name}
                  style={{
                    background: 'rgba(15, 23, 42, 0.6)',
                    padding: '0.75rem 1rem',
                    borderRadius: '8px',
                    border: '1px solid var(--border-subtle)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '0.9rem', color: '#ffffff', fontFamily: 'var(--font-mono)' }}>
                      {t.name}
                    </div>
                    <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>
                      Partitioned by: <code style={{ color: '#38bdf8' }}>{t.partition}</code>
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#34d399' }}>{t.rows} records</div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>{t.format} • {t.status}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* DEDICATED DATABRICKS GENIE Q&A COMPONENT */}
          <GenieQA defaultRole="Admin" />

        </div>

      </div>
    </div>
  );
}
