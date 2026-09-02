import React from 'react';
import { 
  Smartphone, 
  CalendarClock, 
  Database, 
  BrainCircuit, 
  ChefHat, 
  Bot, 
  BellRing,
  ArrowRight
} from 'lucide-react';

export default function WorkflowFlowchart() {
  const steps = [
    {
      id: 1,
      title: "1. Student Pre-Order",
      desc: "Student selects food items from the live campus menu",
      icon: <Smartphone size={22} color="#34d399" />,
      tag: "Frontend",
      color: "#10b981"
    },
    {
      id: 2,
      title: "2. Pickup Slot",
      desc: "Selects 15-min pickup interval (e.g. 12:45 PM)",
      icon: <CalendarClock size={22} color="#38bdf8" />,
      tag: "Queue Control",
      color: "#38bdf8"
    },
    {
      id: 3,
      title: "3. Databricks Lakehouse",
      desc: "Order & inventory data stream into Delta tables",
      icon: <Database size={22} color="#f59e0b" />,
      tag: "Data Layer",
      color: "#f59e0b"
    },
    {
      id: 4,
      title: "4. ML Demand Forecast",
      desc: "Scikit-Learn predicts exact meal preparation targets",
      icon: <BrainCircuit size={22} color="#a855f7" />,
      tag: "ML Layer",
      color: "#a855f7"
    },
    {
      id: 5,
      title: "5. Kitchen Prep",
      desc: "Staff prepares optimal batch quantities without guesswork",
      icon: <ChefHat size={22} color="#ec4899" />,
      tag: "Staff Ops",
      color: "#ec4899"
    },
    {
      id: 6,
      title: "6. Databricks Genie",
      desc: "Natural-language answers for wastage & trends",
      icon: <Bot size={22} color="#6366f1" />,
      tag: "Genie AI",
      color: "#6366f1"
    },
    {
      id: 7,
      title: "7. Ready Notification",
      desc: "Student notified on phone: 'Order is ready for pickup'",
      icon: <BellRing size={22} color="#10b981" />,
      tag: "Fulfilled",
      color: "#10b981"
    }
  ];

  return (
    <section style={{ padding: '3rem 0', background: 'rgba(15, 23, 42, 0.6)', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <span className="badge badge-brand" style={{ marginBottom: '0.5rem' }}>Architecture Flow</span>
          <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>How Smart Canteen Works</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            An integrated loop from student ordering to Databricks Lakehouse processing, ML forecasting, and instant pickup.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.25rem',
          position: 'relative'
        }}>
          {steps.map((step, idx) => (
            <div 
              key={step.id} 
              className="card card-glow"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '1.25rem',
                background: 'rgba(30, 41, 59, 0.7)'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
                  <div style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    padding: '0.6rem',
                    borderRadius: '10px',
                    display: 'inline-flex'
                  }}>
                    {step.icon}
                  </div>
                  <span style={{
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    color: step.color,
                    background: 'rgba(255, 255, 255, 0.04)',
                    padding: '0.2rem 0.6rem',
                    borderRadius: '6px',
                    border: `1px solid ${step.color}40`
                  }}>
                    {step.tag}
                  </span>
                </div>
                <h3 style={{ fontSize: '1.05rem', marginBottom: '0.35rem' }}>{step.title}</h3>
                <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', lineHeight: '1.45' }}>
                  {step.desc}
                </p>
              </div>

              {idx < steps.length - 1 && (
                <div style={{ marginTop: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.725rem', color: 'var(--text-dim)' }}>
                  <span>Next step</span> <ArrowRight size={12} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
