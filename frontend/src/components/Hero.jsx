import React from 'react';
import { ArrowRight, Clock, Trash2, Cpu, TrendingUp, CheckCircle2 } from 'lucide-react';

export default function Hero({ onSelectRole }) {
  return (
    <section style={{ padding: '3.5rem 0 2.5rem 0', position: 'relative' }}>
      <div className="container">
        <div style={{ maxWidth: '820px', margin: '0 auto', textAlign: 'center' }}>
          {/* Badge */}
          <div style={{ display: 'inline-flex', gap: '0.5rem', marginBottom: '1.25rem' }}>
            <span className="badge badge-brand">
              <Cpu size={14} /> Databricks Lakehouse & Genie Ready
            </span>
            <span className="badge badge-team">
              Team AURIX NEXUS
            </span>
          </div>

          {/* Heading */}
          <h1 style={{
            fontSize: '2.85rem',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            marginBottom: '1.25rem',
            lineHeight: 1.2
          }}>
            Zero Lines. Zero Food Waste. <br />
            <span className="gradient-text">AI-Driven Campus Dining.</span>
          </h1>

          {/* Subtitle */}
          <p style={{
            fontSize: '1.125rem',
            color: 'var(--text-muted)',
            marginBottom: '2rem',
            lineHeight: 1.6,
            maxWidth: '700px',
            margin: '0 auto 2rem auto'
          }}>
            Smart Canteen synchronizes student pre-orders with precise slot-based pickups, 
            trains machine learning demand forecasting, and empowers canteen staff & administration 
            with Databricks Genie natural language intelligence.
          </p>

          {/* Action CTAs */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
            <button
              onClick={() => onSelectRole('student')}
              className="btn btn-primary"
              style={{ fontSize: '1rem', padding: '0.85rem 1.75rem' }}
            >
              Explore Student Menu <ArrowRight size={18} />
            </button>
            <button
              onClick={() => onSelectRole('staff')}
              className="btn btn-secondary"
              style={{ fontSize: '1rem', padding: '0.85rem 1.75rem' }}
            >
              Canteen Staff View
            </button>
            <button
              onClick={() => onSelectRole('admin')}
              className="btn btn-outline"
              style={{ fontSize: '1rem', padding: '0.85rem 1.75rem' }}
            >
              Admin Analytics
            </button>
          </div>

          {/* Fast Metric Highlights */}
          <div className="grid-4" style={{ textAlign: 'left' }}>
            <div className="card" style={{ borderLeft: '3px solid #10b981' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#34d399', marginBottom: '0.4rem' }}>
                <Clock size={18} />
                <span style={{ fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase' }}>Wait Time</span>
              </div>
              <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>~7 mins</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Down from 25+ min queues</div>
            </div>

            <div className="card" style={{ borderLeft: '3px solid #f59e0b' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#fbbf24', marginBottom: '0.4rem' }}>
                <Trash2 size={18} />
                <span style={{ fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase' }}>Waste Reduction</span>
              </div>
              <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>-42%</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Via ML demand predictions</div>
            </div>

            <div className="card" style={{ borderLeft: '3px solid #38bdf8' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#38bdf8', marginBottom: '0.4rem' }}>
                <TrendingUp size={18} />
                <span style={{ fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase' }}>Kitchen Accuracy</span>
              </div>
              <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>94.8%</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Optimal prep quantity</div>
            </div>

            <div className="card" style={{ borderLeft: '3px solid #818cf8' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#a5b4fc', marginBottom: '0.4rem' }}>
                <CheckCircle2 size={18} />
                <span style={{ fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase' }}>Lakehouse Analytics</span>
              </div>
              <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>Real-Time</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Databricks Genie Q&A</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
