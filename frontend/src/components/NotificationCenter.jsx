import React, { useState } from 'react';
import { Bell, CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';

export default function NotificationCenter() {
  const { notifications, markAllNotificationsRead } = useApp();
  const [isOpen, setIsOpen] = useState(false);

  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <div style={{ position: 'relative' }}>
      {/* Bell Icon Trigger */}
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          if (!isOpen && unreadCount > 0) {
            markAllNotificationsRead();
          }
        }}
        style={{
          background: 'rgba(255, 255, 255, 0.06)',
          border: '1px solid var(--border-subtle)',
          borderRadius: '10px',
          width: '38px',
          height: '38px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#cbd5e1',
          cursor: 'pointer',
          position: 'relative'
        }}
      >
        <Bell size={18} />
        {unreadCount > 0 && (
          <span
            style={{
              position: 'absolute',
              top: '-4px',
              right: '-4px',
              background: '#ef4444',
              color: '#ffffff',
              fontSize: '0.65rem',
              fontWeight: 800,
              borderRadius: '9999px',
              width: '18px',
              height: '18px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 8px #ef4444'
            }}
          >
            {unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          style={{
            position: 'absolute',
            top: '48px',
            right: 0,
            width: '340px',
            background: '#1e293b',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            borderRadius: '16px',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5)',
            zIndex: 100,
            padding: '1rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.5rem' }}>
            <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#ffffff' }}>Campus Notifications</div>
            <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
              <X size={16} />
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', maxHeight: '300px', overflowY: 'auto' }}>
            {notifications.length === 0 ? (
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textAlign: 'center', padding: '1rem' }}>No notifications yet</p>
            ) : (
              notifications.map((n) => (
                <div
                  key={n.id}
                  style={{
                    background: n.type === 'success' ? 'rgba(16, 185, 129, 0.12)' : 'rgba(255, 255, 255, 0.04)',
                    border: n.type === 'success' ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid var(--border-subtle)',
                    borderRadius: '10px',
                    padding: '0.75rem',
                    fontSize: '0.8rem'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 700, color: n.type === 'success' ? '#34d399' : '#38bdf8', marginBottom: '0.2rem' }}>
                    {n.type === 'success' ? <CheckCircle2 size={15} /> : <Info size={15} />}
                    {n.title}
                  </div>
                  <div style={{ color: '#e2e8f0', fontSize: '0.75rem', lineHeight: '1.4' }}>{n.message}</div>
                  <div style={{ color: 'var(--text-dim)', fontSize: '0.65rem', marginTop: '0.35rem' }}>{n.time}</div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
