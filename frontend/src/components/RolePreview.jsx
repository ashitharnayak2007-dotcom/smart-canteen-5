import React from 'react';
import { 
  Users, 
  ChefHat, 
  Shield, 
  ShoppingBag, 
  Clock, 
  AlertTriangle, 
  Bot, 
  BarChart3, 
  ArrowUpRight,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

export default function RolePreview({ activeRole, setActiveRole }) {
  return (
    <section style={{ padding: '3.5rem 0' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <span className="badge badge-brand" style={{ marginBottom: '0.5rem' }}>3-Role Ecosystem</span>
          <h2 style={{ fontSize: '2.1rem', marginBottom: '0.5rem' }}>Integrated Stakeholder Dashboards</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '650px', margin: '0 auto' }}>
            Smart Canteen synchronizes Students, Canteen Staff, and College Administration into one cohesive AI-driven platform.
          </p>
        </div>

        {/* 3 Interactive Cards */}
        <div className="grid-3">
          {/* 1. Student Experience */}
          <div 
            className="card card-glow" 
            style={{
              borderColor: activeRole === 'student' ? '#10b981' : 'var(--border-subtle)',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
            onClick={() => setActiveRole('student')}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div style={{
                  background: 'rgba(16, 185, 129, 0.15)',
                  padding: '0.75rem',
                  borderRadius: '12px',
                  color: '#34d399'
                }}>
                  <Users size={24} />
                </div>
                <span className="badge badge-brand">Phase 2 Target</span>
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>1. Student Experience</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
                Pre-order meals from the live campus menu, select scheduled pickup slots, and track order stages in real time.
              </p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: '#e2e8f0' }}>
                  <CheckCircle2 size={15} color="#10b981" /> Live Digital Menu (Dosa, Rice, Noodles)
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: '#e2e8f0' }}>
                  <CheckCircle2 size={15} color="#10b981" /> 15-Minute Slot-based Pickups
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: '#10b981' }}>
                  <CheckCircle2 size={15} color="#10b981" /> Status: Placed → Cooking → Ready
                </div>
              </div>
            </div>

            <button 
              className="btn btn-primary" 
              style={{ width: '100%', fontSize: '0.85rem', padding: '0.65rem' }}
              onClick={(e) => { e.stopPropagation(); setActiveRole('student'); }}
            >
              View Student Interface <ArrowUpRight size={16} />
            </button>
          </div>

          {/* 2. Canteen Staff Experience */}
          <div 
            className="card card-glow" 
            style={{
              borderColor: activeRole === 'staff' ? '#f59e0b' : 'var(--border-subtle)',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
            onClick={() => setActiveRole('staff')}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div style={{
                  background: 'rgba(245, 158, 11, 0.15)',
                  padding: '0.75rem',
                  borderRadius: '12px',
                  color: '#fbbf24'
                }}>
                  <ChefHat size={24} />
                </div>
                <span className="badge badge-warning">Phase 3 Target</span>
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>2. Canteen Staff Ops</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
                Real-time kitchen order board, ML-predicted meal targets, automated ingredient stock alerts, and Genie Q&A.
              </p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: '#e2e8f0' }}>
                  <CheckCircle2 size={15} color="#f59e0b" /> Live Order Stream & Status Updater
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: '#f59e0b' }}>
                  <CheckCircle2 size={15} color="#f59e0b" /> ML Preparation Quantities (e.g. 72 Dosas)
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: '#f59e0b' }}>
                  <CheckCircle2 size={15} color="#f59e0b" /> Low-Stock Alerts & Wastage Logging
                </div>
              </div>
            </div>

            <button 
              className="btn btn-secondary" 
              style={{ width: '100%', fontSize: '0.85rem', padding: '0.65rem' }}
              onClick={(e) => { e.stopPropagation(); setActiveRole('staff'); }}
            >
              View Staff Dashboard <ArrowUpRight size={16} />
            </button>
          </div>

          {/* 3. Admin Experience */}
          <div 
            className="card card-glow" 
            style={{
              borderColor: activeRole === 'admin' ? '#6366f1' : 'var(--border-subtle)',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
            onClick={() => setActiveRole('admin')}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div style={{
                  background: 'rgba(99, 102, 241, 0.15)',
                  padding: '0.75rem',
                  borderRadius: '12px',
                  color: '#a5b4fc'
                }}>
                  <Shield size={24} />
                </div>
                <span className="badge badge-team">Phase 4 Target</span>
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>3. College Admin Intelligence</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
                Databricks Lakehouse reporting on sales volume, peak lunch hours, revenue, and wastage trends.
              </p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: '#e2e8f0' }}>
                  <CheckCircle2 size={15} color="#6366f1" /> Daily & Weekly Orders KPI Metrics
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: '#6366f1' }}>
                  <CheckCircle2 size={15} color="#6366f1" /> Peak Hour & Wastage Analysis
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: '#6366f1' }}>
                  <CheckCircle2 size={15} color="#6366f1" /> Natural Language Genie Query Console
                </div>
              </div>
            </div>

            <button 
              className="btn btn-outline" 
              style={{ width: '100%', fontSize: '0.85rem', padding: '0.65rem' }}
              onClick={(e) => { e.stopPropagation(); setActiveRole('admin'); }}
            >
              View Admin Analytics <ArrowUpRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
