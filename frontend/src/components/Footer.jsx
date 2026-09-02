import React from 'react';
import { Heart, Users, Award, ShieldCheck } from 'lucide-react';

export default function Footer() {
  const team = [
    { name: 'Ashitha R', role: 'Team Leader' },
    { name: 'Harshit Reddy', role: 'Full Stack & ML' },
    { name: 'Punya K M', role: 'Frontend & UI/UX' },
    { name: 'Harini R', role: 'Data & Lakehouse' }
  ];

  return (
    <footer style={{
      borderTop: '1px solid var(--border-subtle)',
      background: 'rgba(10, 15, 29, 0.95)',
      padding: '3rem 0 2rem 0',
      marginTop: '3rem'
    }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>
          
          {/* Brand & Mission */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <span style={{ fontWeight: 800, fontSize: '1.25rem', letterSpacing: '-0.02em', color: '#ffffff' }}>
                SMART CANTEEN
              </span>
              <span className="badge badge-brand" style={{ fontSize: '0.65rem' }}>AURIX NEXUS</span>
            </div>
            <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', lineHeight: '1.6', maxWidth: '360px' }}>
              Transforming campus dining with intelligent pre-orders, slot allocations, ML prep forecasting, and Databricks Lakehouse intelligence.
            </p>
          </div>

          {/* Team AURIX NEXUS Members */}
          <div>
            <h4 style={{ fontSize: '0.95rem', marginBottom: '0.75rem', color: '#cbd5e1', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Users size={16} color="#818cf8" /> Team AURIX NEXUS
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.8rem' }}>
              {team.map(m => (
                <div key={m.name} style={{ display: 'flex', justifyContent: 'space-between', color: '#94a3b8' }}>
                  <span style={{ color: '#ffffff', fontWeight: 600 }}>{m.name}</span>
                  <span style={{ color: m.role === 'Team Leader' ? '#34d399' : '#94a3b8' }}>{m.role}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Hackathon Details */}
          <div>
            <h4 style={{ fontSize: '0.95rem', marginBottom: '0.75rem', color: '#cbd5e1', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Award size={16} color="#fbbf24" /> Hackathon Project
            </h4>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
              Built strictly according to Hackathon architectural guidelines with complete separation of UI, Backend APIs, Lakehouse, and ML layers.
            </p>
            <div style={{ marginTop: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', color: '#34d399' }}>
              <ShieldCheck size={14} /> Production-Structured Architecture
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.06)',
          paddingTop: '1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          fontSize: '0.75rem',
          color: 'var(--text-dim)'
        }}>
          <div>
            © 2026 Smart Canteen • AURIX NEXUS (Ashitha R, Harshit Reddy, Punya K M, Harini R).
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            AI-Powered Campus Food Intelligence
          </div>
        </div>
      </div>
    </footer>
  );
}
