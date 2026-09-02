import React from 'react';
import { Layers, Database, Cpu, Bot, Layout, Server } from 'lucide-react';

export default function TechStackBadge() {
  const stack = [
    { name: 'React + Vite', role: 'Modern UI & Mobile-First Frontend', icon: <Layout size={18} color="#38bdf8" /> },
    { name: 'FastAPI (Python)', role: 'High-Performance Async Backend API', icon: <Server size={18} color="#34d399" /> },
    { name: 'Databricks Lakehouse', role: 'Delta Tables & Distributed SQL Warehouse', icon: <Database size={18} color="#f59e0b" /> },
    { name: 'Databricks Genie', role: 'Conversational Lakehouse Insights', icon: <Bot size={18} color="#818cf8" /> },
    { name: 'Scikit-Learn ML', role: 'Temporal Demand Forecasting Engine', icon: <Cpu size={18} color="#ec4899" /> }
  ];

  return (
    <section style={{ padding: '2.5rem 0', background: 'rgba(15, 23, 42, 0.4)', borderTop: '1px solid var(--border-subtle)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
          <span className="badge badge-brand" style={{ marginBottom: '0.4rem' }}>Production-Structured Stack</span>
          <h3 style={{ fontSize: '1.4rem' }}>Powered by Lakehouse & Modern AI</h3>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          {stack.map((s, idx) => (
            <div key={idx} className="card" style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ background: 'rgba(255,255,255,0.05)', padding: '0.5rem', borderRadius: '8px' }}>
                {s.icon}
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#ffffff' }}>{s.name}</div>
                <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>{s.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
