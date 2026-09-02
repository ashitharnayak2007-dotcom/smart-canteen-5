import React, { useState } from 'react';
import { 
  ChefHat, 
  Clock, 
  TrendingUp, 
  AlertTriangle, 
  Bot, 
  CheckCircle, 
  Sparkles,
  ArrowRight,
  Send,
  Trash2
} from 'lucide-react';

export default function StaffPreview() {
  const [orders, setOrders] = useState([
    { id: 'SC-1024', student: 'Ashitha R (CS402)', items: '1x Masala Dosa, 1x Veg Noodles', slot: '12:45 PM', status: 'READY', time: '12:35 PM' },
    { id: 'SC-1025', student: 'Harshit R (EC201)', items: '2x Veg Rice Combo', slot: '12:45 PM', status: 'COOKING', time: '12:38 PM' },
    { id: 'SC-1026', student: 'Punya K (IS304)', items: '2x Idli, 1x Medu Vada', slot: '01:00 PM', status: 'PLACED', time: '12:42 PM' },
    { id: 'SC-1027', student: 'Harini R (AI105)', items: '1x Lemon Rice', slot: '01:00 PM', status: 'PLACED', time: '12:43 PM' }
  ]);

  const [genieQuery, setGenieQuery] = useState('How many masala dosas should we prepare tomorrow?');
  const [genieResponse, setGenieResponse] = useState({
    question: "How many masala dosas should we prepare tomorrow?",
    answer: "Based on historical Tuesday order patterns in the Databricks Lakehouse, the ML demand forecast projects 78 Masala Dosas. Peak rush is anticipated between 12:45 PM and 1:15 PM.",
    confidence: "94.2% accuracy from 3,420 historical transactions"
  });

  const [wastageItem, setWastageItem] = useState('Veg Rice');
  const [wastageQty, setWastageQty] = useState('1.5');
  const [wastageLogs, setWastageLogs] = useState([
    { item: 'Sambar', qty: '2.0 kg', reason: 'Overproduction post-lunch', time: 'Yesterday' },
    { item: 'Noodles', qty: '0.8 kg', reason: 'Cooked past hold time', time: 'Yesterday' }
  ]);

  const cycleStatus = (id) => {
    const sequence = ['PLACED', 'COOKING', 'READY', 'PICKED UP'];
    setOrders(prev => prev.map(o => {
      if (o.id === id) {
        const nextIdx = (sequence.indexOf(o.status) + 1) % sequence.length;
        return { ...o, status: sequence[nextIdx] };
      }
      return o;
    }));
  };

  const handleGenieSubmit = (e) => {
    e.preventDefault();
    if (!genieQuery.trim()) return;

    let ans = `Databricks Genie analyzed your query: "${genieQuery}". Projected inventory usage is within normal parameters, and 64 units of Veg Rice are forecasted for the afternoon batch.`;
    if (genieQuery.toLowerCase().includes('waste')) {
      ans = "Databricks Lakehouse reports Veg Rice had the highest wastage last Friday (3.2 kg). Preparing in 2 split batches (12:00 PM & 1:00 PM) is recommended.";
    } else if (genieQuery.toLowerCase().includes('busy') || genieQuery.toLowerCase().includes('peak')) {
      ans = "Peak canteen rush occurs between 12:45 PM - 1:15 PM with 68% of daily lunch orders placed in this 30-minute interval.";
    }

    setGenieResponse({
      question: genieQuery,
      answer: ans,
      confidence: "Live Databricks Lakehouse SQL Query Executed"
    });
  };

  const addWastage = (e) => {
    e.preventDefault();
    if (!wastageItem || !wastageQty) return;
    setWastageLogs([
      { item: wastageItem, qty: `${wastageQty} kg`, reason: 'Logged at shift end', time: 'Just now' },
      ...wastageLogs
    ]);
    setWastageQty('');
  };

  return (
    <div style={{ padding: '2rem 0' }}>
      <div className="container">
        {/* Banner */}
        <div style={{
          background: 'rgba(245, 158, 11, 0.1)',
          border: '1px solid rgba(245, 158, 11, 0.3)',
          borderRadius: '12px',
          padding: '1rem 1.25rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          marginBottom: '2rem'
        }}>
          <Sparkles size={20} color="#fbbf24" />
          <div style={{ fontSize: '0.875rem', color: '#e2e8f0' }}>
            <strong>Canteen Staff Dashboard Preview (Phase 1 Baseline):</strong> Live kitchen queue management, ML preparation targets, Databricks Genie Q&A console, and automated ingredient alerts.
          </div>
        </div>

        {/* Top 3 KPI Cards for Staff */}
        <div className="grid-3" style={{ marginBottom: '2rem' }}>
          {/* ML Target Card */}
          <div className="card" style={{ borderLeft: '3px solid #10b981' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#34d399', textTransform: 'uppercase' }}>
                Today's ML Prep Recommendation
              </span>
              <ChefHat size={18} color="#34d399" />
            </div>
            <div style={{ fontSize: '1.65rem', fontWeight: 800 }}>186 Meals Total</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.4rem' }}>
              • Dosa: <strong>72</strong> • Rice: <strong>64</strong> • Noodles: <strong>50</strong>
            </div>
          </div>

          {/* Low Stock Alerts */}
          <div className="card" style={{ borderLeft: '3px solid #ef4444' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#f87171', textTransform: 'uppercase' }}>
                Low-Stock Alerts
              </span>
              <AlertTriangle size={18} color="#ef4444" />
            </div>
            <div style={{ fontSize: '1.65rem', fontWeight: 800, color: '#f87171' }}>2 Items Critical</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.4rem' }}>
              • Dosa Batter (3.5 kg left) • Cooking Oil (2.0 L left)
            </div>
          </div>

          {/* Average Fulfillment Time */}
          <div className="card" style={{ borderLeft: '3px solid #38bdf8' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#38bdf8', textTransform: 'uppercase' }}>
                Queue Efficiency
              </span>
              <Clock size={18} color="#38bdf8" />
            </div>
            <div style={{ fontSize: '1.65rem', fontWeight: 800 }}>4.8 Mins / Order</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.4rem' }}>
              98% orders ready ahead of student pickup slot
            </div>
          </div>
        </div>

        {/* 2 Column Main Section: Live Orders & Databricks Genie + Wastage */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
          
          {/* Left Column: Live Kitchen Orders */}
          <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <div>
                <h3 style={{ fontSize: '1.2rem' }}>Live Kitchen Order Queue</h3>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Click status badge to advance order stage</p>
              </div>
              <span className="badge badge-brand">4 Active</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {orders.map(o => {
                let badgeStyle = { background: 'rgba(56, 189, 248, 0.2)', color: '#38bdf8' };
                if (o.status === 'COOKING') badgeStyle = { background: 'rgba(245, 158, 11, 0.2)', color: '#fbbf24' };
                if (o.status === 'READY') badgeStyle = { background: 'rgba(16, 185, 129, 0.2)', color: '#34d399' };
                if (o.status === 'PICKED UP') badgeStyle = { background: 'rgba(148, 163, 184, 0.2)', color: '#94a3b8' };

                return (
                  <div 
                    key={o.id}
                    style={{
                      background: 'rgba(15, 23, 42, 0.6)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: '10px',
                      padding: '1rem',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
                        <span style={{ fontWeight: 700, fontSize: '0.95rem', color: '#ffffff' }}>{o.id}</span>
                        <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>({o.slot})</span>
                      </div>
                      <div style={{ fontSize: '0.85rem', color: '#e2e8f0', marginBottom: '0.25rem' }}>{o.items}</div>
                      <div style={{ fontSize: '0.725rem', color: 'var(--text-dim)' }}>Student: {o.student} • Placed: {o.time}</div>
                    </div>

                    <button
                      onClick={() => cycleStatus(o.id)}
                      style={{
                        ...badgeStyle,
                        border: 'none',
                        borderRadius: '8px',
                        padding: '0.45rem 0.85rem',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        letterSpacing: '0.04em'
                      }}
                    >
                      {o.status} ↻
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Databricks Genie Q&A & Wastage Logging */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            {/* Databricks Genie Card */}
            <div className="card card-glow" style={{ borderTop: '2px solid #6366f1' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Bot size={20} color="#818cf8" />
                  <h3 style={{ fontSize: '1.15rem' }}>Databricks Genie Q&A</h3>
                </div>
                <span className="badge badge-team" style={{ fontSize: '0.65rem' }}>Lakehouse AI</span>
              </div>

              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                Ask natural-language questions regarding kitchen prep, peak hours, or wastage insights.
              </p>

              <form onSubmit={handleGenieSubmit} style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                <input
                  type="text"
                  value={genieQuery}
                  onChange={(e) => setGenieQuery(e.target.value)}
                  placeholder="e.g. Which food item has highest wastage?"
                  style={{
                    flex: 1,
                    background: 'rgba(15, 23, 42, 0.8)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '8px',
                    padding: '0.6rem 0.85rem',
                    color: '#ffffff',
                    fontSize: '0.825rem'
                  }}
                />
                <button type="submit" className="btn btn-primary" style={{ padding: '0.6rem 1rem', fontSize: '0.825rem' }}>
                  <Send size={14} /> Ask
                </button>
              </form>

              {genieResponse && (
                <div style={{
                  background: 'rgba(99, 102, 241, 0.1)',
                  border: '1px solid rgba(99, 102, 241, 0.3)',
                  borderRadius: '8px',
                  padding: '0.85rem',
                  fontSize: '0.825rem'
                }}>
                  <div style={{ fontWeight: 600, color: '#a5b4fc', marginBottom: '0.35rem' }}>
                    Q: "{genieResponse.question}"
                  </div>
                  <p style={{ color: '#e2e8f0', marginBottom: '0.4rem', lineHeight: '1.45' }}>
                    {genieResponse.answer}
                  </p>
                  <div style={{ fontSize: '0.7rem', color: '#818cf8', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <Sparkles size={12} /> {genieResponse.confidence}
                  </div>
                </div>
              )}
            </div>

            {/* Wastage Logger */}
            <div className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Trash2 size={18} color="#f59e0b" />
                  <h3 style={{ fontSize: '1.1rem' }}>Food Wastage Logger</h3>
                </div>
                <span className="badge badge-warning" style={{ fontSize: '0.65rem' }}>Databricks Ingest</span>
              </div>

              <form onSubmit={addWastage} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: '0.5rem', marginBottom: '1rem' }}>
                <input
                  type="text"
                  placeholder="Food item (e.g. Veg Rice)"
                  value={wastageItem}
                  onChange={(e) => setWastageItem(e.target.value)}
                  style={{
                    background: 'rgba(15, 23, 42, 0.8)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '8px',
                    padding: '0.5rem 0.75rem',
                    color: '#ffffff',
                    fontSize: '0.8rem'
                  }}
                />
                <input
                  type="number"
                  step="0.1"
                  placeholder="Qty (kg)"
                  value={wastageQty}
                  onChange={(e) => setWastageQty(e.target.value)}
                  style={{
                    background: 'rgba(15, 23, 42, 0.8)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '8px',
                    padding: '0.5rem 0.75rem',
                    color: '#ffffff',
                    fontSize: '0.8rem'
                  }}
                />
                <button type="submit" className="btn btn-secondary" style={{ padding: '0.5rem 0.85rem', fontSize: '0.8rem' }}>
                  Record
                </button>
              </form>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                {wastageLogs.map((log, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: 'var(--text-muted)', borderBottom: '1px solid rgba(255,255,255,0.04)', paddingBottom: '0.35rem' }}>
                    <span><strong>{log.item}</strong>: {log.qty} ({log.reason})</span>
                    <span>{log.time}</span>
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
