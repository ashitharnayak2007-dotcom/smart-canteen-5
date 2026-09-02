import React from 'react';
import { UtensilsCrossed, Sparkles, Shield, Users, ChefHat, ShoppingBag } from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';
import NotificationCenter from './NotificationCenter.jsx';

export default function Navbar() {
  const { activeRole, setActiveRole, cartItemCount, finalTotal, setIsCartOpen } = useApp();

  return (
    <nav
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: 'rgba(15, 23, 42, 0.94)',
        backdropFilter: 'blur(14px)',
        borderBottom: '1px solid var(--border-subtle)',
        padding: '0.85rem 0'
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
        
        {/* Brand Logo & Team */}
        <div 
          style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', cursor: 'pointer' }}
          onClick={() => setActiveRole('overview')}
        >
          <div
            style={{
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              padding: '0.65rem',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)'
            }}
          >
            <UtensilsCrossed size={22} color="#ffffff" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontWeight: 800, fontSize: '1.2rem', letterSpacing: '-0.02em', color: '#ffffff' }}>
                SMART CANTEEN
              </span>
              <span className="badge badge-team" style={{ fontSize: '0.65rem', padding: '0.2rem 0.5rem' }}>
                AURIX NEXUS
              </span>
            </div>
            <p style={{ fontSize: '0.725rem', color: 'var(--text-muted)', margin: 0 }}>
              AI-Powered Campus Food Intelligence
            </p>
          </div>
        </div>

        {/* Role Quick Selector Tabs */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            background: 'rgba(30, 41, 59, 0.8)',
            padding: '0.3rem',
            borderRadius: '9999px',
            border: '1px solid var(--border-subtle)',
            gap: '0.25rem'
          }}
        >
          <button
            onClick={() => setActiveRole('overview')}
            style={{
              background: activeRole === 'overview' ? '#334155' : 'transparent',
              color: activeRole === 'overview' ? '#ffffff' : 'var(--text-muted)',
              border: 'none',
              borderRadius: '9999px',
              padding: '0.4rem 0.85rem',
              fontSize: '0.825rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              transition: 'all 0.2s'
            }}
          >
            <Sparkles size={14} /> Overview
          </button>

          <button
            onClick={() => setActiveRole('student')}
            style={{
              background: activeRole === 'student' ? 'linear-gradient(135deg, #10b981, #059669)' : 'transparent',
              color: activeRole === 'student' ? '#ffffff' : 'var(--text-muted)',
              border: 'none',
              borderRadius: '9999px',
              padding: '0.4rem 0.85rem',
              fontSize: '0.825rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              transition: 'all 0.2s'
            }}
          >
            <Users size={14} /> Student Portal
          </button>

          <button
            onClick={() => setActiveRole('staff')}
            style={{
              background: activeRole === 'staff' ? 'linear-gradient(135deg, #f59e0b, #d97706)' : 'transparent',
              color: activeRole === 'staff' ? '#ffffff' : 'var(--text-muted)',
              border: 'none',
              borderRadius: '9999px',
              padding: '0.4rem 0.85rem',
              fontSize: '0.825rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              transition: 'all 0.2s'
            }}
          >
            <ChefHat size={14} /> Staff Ops
          </button>

          <button
            onClick={() => setActiveRole('admin')}
            style={{
              background: activeRole === 'admin' ? 'linear-gradient(135deg, #6366f1, #4f46e5)' : 'transparent',
              color: activeRole === 'admin' ? '#ffffff' : 'var(--text-muted)',
              border: 'none',
              borderRadius: '9999px',
              padding: '0.4rem 0.85rem',
              fontSize: '0.825rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              transition: 'all 0.2s'
            }}
          >
            <Shield size={14} /> Admin
          </button>
        </div>

        {/* Right Actions: Notifications & Cart */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <NotificationCenter />

          {/* Cart Drawer Trigger */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="btn btn-primary"
            style={{ padding: '0.55rem 1rem', fontSize: '0.825rem', gap: '0.5rem', borderRadius: '10px' }}
          >
            <ShoppingBag size={17} />
            <span>Cart</span>
            {cartItemCount > 0 && (
              <span
                style={{
                  background: '#ffffff',
                  color: '#059669',
                  fontWeight: 800,
                  fontSize: '0.75rem',
                  padding: '0.1rem 0.45rem',
                  borderRadius: '9999px'
                }}
              >
                {cartItemCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}
