import React, { useState } from 'react';
import { 
  Bot, 
  Send, 
  Sparkles, 
  Database, 
  Code, 
  Info, 
  CheckCircle2, 
  HelpCircle,
  Table as TableIcon,
  ChevronDown,
  ChevronUp,
  X
} from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';

export default function GenieQA({ defaultRole = "Staff" }) {
  const { genieHistory, askGenie } = useApp();
  const [inputQuery, setInputQuery] = useState('');
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [showSqlFor, setShowSqlFor] = useState({});

  const suggestions = [
    "How many masala dosas should we prepare tomorrow?",
    "Which food item has the highest wastage?",
    "What is the busiest lunch hour?",
    "Which items are most popular on Fridays?",
    "How much rice should we stock for tomorrow?"
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputQuery.trim()) return;
    askGenie(inputQuery);
    setInputQuery('');
  };

  const toggleSql = (id) => {
    setShowSqlFor(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="card card-glow" style={{ borderTop: '3px solid #6366f1' }}>
      
      {/* Header with Title & Status Badge */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <div style={{ background: 'linear-gradient(135deg, #6366f1, #818cf8)', padding: '0.5rem', borderRadius: '10px', display: 'flex' }}>
            <Bot size={22} color="#ffffff" />
          </div>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff' }}>Databricks Genie Q&A</h3>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: 0 }}>Natural-language Lakehouse conversational intelligence</p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <button
            onClick={() => setShowConfigModal(true)}
            style={{
              background: 'rgba(99, 102, 241, 0.15)',
              border: '1px solid rgba(99, 102, 241, 0.3)',
              borderRadius: '8px',
              padding: '0.35rem 0.75rem',
              color: '#a5b4fc',
              fontSize: '0.725rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem'
            }}
          >
            <Info size={13} /> Lakehouse Status: Demo Mode
          </button>
        </div>
      </div>

      <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
        Ask natural-language questions regarding kitchen prep forecasts, waste audits, peak hours, or inventory buffers.
      </p>

      {/* Suggestion Chips */}
      <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
        {suggestions.map((q, idx) => (
          <button
            key={idx}
            onClick={() => askGenie(q)}
            style={{
              background: 'rgba(99, 102, 241, 0.1)',
              border: '1px solid rgba(99, 102, 241, 0.25)',
              color: '#a5b4fc',
              borderRadius: '8px',
              padding: '0.35rem 0.75rem',
              fontSize: '0.75rem',
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            "{q}"
          </button>
        ))}
      </div>

      {/* Main Conversation Stream */}
      <div
        style={{
          background: 'rgba(15, 23, 42, 0.85)',
          border: '1px solid var(--border-subtle)',
          borderRadius: '12px',
          padding: '1rem',
          maxHeight: '340px',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          marginBottom: '1rem'
        }}
      >
        {genieHistory.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-dim)', fontSize: '0.85rem' }}>
            Ask a question or click a suggestion chip above to query Databricks Genie.
          </div>
        ) : (
          genieHistory.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <div
                key={msg.id}
                style={{
                  alignSelf: isUser ? 'flex-end' : 'flex-start',
                  maxWidth: isUser ? '85%' : '95%',
                  background: isUser ? 'rgba(56, 189, 248, 0.15)' : 'rgba(30, 41, 59, 0.9)',
                  border: isUser ? '1px solid rgba(56, 189, 248, 0.3)' : '1px solid rgba(99, 102, 241, 0.3)',
                  borderRadius: '12px',
                  padding: '0.85rem 1rem',
                  fontSize: '0.85rem'
                }}
              >
                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                  <span style={{ fontWeight: 700, color: isUser ? '#38bdf8' : '#818cf8', fontSize: '0.8rem' }}>
                    {isUser ? `👤 ${defaultRole} Question:` : '🤖 Databricks Genie Intelligence:'}
                  </span>
                  {msg.time && (
                    <span style={{ fontSize: '0.68rem', color: 'var(--text-dim)' }}>{msg.time}</span>
                  )}
                </div>

                {/* Text Content */}
                <div style={{ color: '#f1f5f9', lineHeight: '1.5', marginBottom: msg.sql ? '0.6rem' : 0 }}>
                  {msg.text}
                </div>

                {/* Collapsible SQL Query Box */}
                {msg.sql && (
                  <div>
                    <button
                      onClick={() => toggleSql(msg.id)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#34d399',
                        fontSize: '0.725rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.3rem',
                        padding: '0.2rem 0',
                        fontWeight: 600
                      }}
                    >
                      <Code size={13} /> {showSqlFor[msg.id] ? 'Hide Databricks SQL' : 'View Generated Databricks SQL'} {showSqlFor[msg.id] ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                    </button>

                    {showSqlFor[msg.id] && (
                      <div
                        style={{
                          marginTop: '0.4rem',
                          padding: '0.6rem 0.75rem',
                          background: 'rgba(0, 0, 0, 0.5)',
                          border: '1px solid rgba(52, 211, 153, 0.3)',
                          borderRadius: '8px',
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.725rem',
                          color: '#34d399',
                          lineHeight: '1.4'
                        }}
                      >
                        <div style={{ color: 'var(--text-dim)', fontSize: '0.65rem', marginBottom: '0.2rem' }}>-- Databricks Lakehouse SQL Query:</div>
                        {msg.sql}
                      </div>
                    )}
                  </div>
                )}

                {/* Confidence & Source */}
                {msg.confidence && (
                  <div style={{ fontSize: '0.68rem', color: '#a5b4fc', marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <Sparkles size={11} /> {msg.confidence}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Input Field & Submit Button */}
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '0.6rem' }}>
        <input
          type="text"
          placeholder="Ask your question..."
          value={inputQuery}
          onChange={(e) => setInputQuery(e.target.value)}
          style={{
            flex: 1,
            background: 'rgba(15, 23, 42, 0.9)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '10px',
            padding: '0.75rem 1rem',
            color: '#ffffff',
            fontSize: '0.875rem'
          }}
        />
        <button
          type="submit"
          className="btn btn-primary"
          style={{ padding: '0.75rem 1.5rem', fontSize: '0.875rem', fontWeight: 700, gap: '0.4rem' }}
        >
          <Send size={16} /> Ask Genie
        </button>
      </form>

      {/* Databricks Credentials Guide Modal */}
      {showConfigModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 110,
            background: 'rgba(10, 15, 29, 0.8)',
            backdropFilter: 'blur(6px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem'
          }}
          onClick={() => setShowConfigModal(false)}
        >
          <div
            className="card card-glow"
            style={{
              width: '100%',
              maxWidth: '560px',
              background: '#1e293b',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '20px',
              padding: '2rem',
              position: 'relative'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowConfigModal(false)}
              style={{
                position: 'absolute',
                top: '1.25rem',
                right: '1.25rem',
                background: 'rgba(255, 255, 255, 0.08)',
                border: 'none',
                color: '#94a3b8',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <X size={18} />
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
              <Database size={24} color="#818cf8" />
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800 }}>Databricks Genie Integration</h3>
            </div>

            <div style={{
              background: 'rgba(16, 185, 129, 0.15)',
              border: '1px solid #10b981',
              borderRadius: '10px',
              padding: '0.85rem 1rem',
              fontSize: '0.825rem',
              color: '#e2e8f0',
              marginBottom: '1.25rem'
            }}>
              <strong>Demo Fallback Active:</strong> The application is currently running with realistic synthetic Lakehouse schemas and offline natural-language parsing.
            </div>

            <h4 style={{ fontSize: '0.95rem', marginBottom: '0.5rem', color: '#cbd5e1' }}>
              Required Environment Variables for Live Workspace:
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.8rem', marginBottom: '1.5rem' }}>
              <div style={{ background: 'rgba(15, 23, 42, 0.7)', padding: '0.65rem', borderRadius: '6px', border: '1px solid var(--border-subtle)' }}>
                <code style={{ color: '#38bdf8' }}>DATABRICKS_HOST</code>: e.g. <span style={{ color: 'var(--text-muted)' }}>https://adb-123456.7.azuredatabricks.net</span>
              </div>
              <div style={{ background: 'rgba(15, 23, 42, 0.7)', padding: '0.65rem', borderRadius: '6px', border: '1px solid var(--border-subtle)' }}>
                <code style={{ color: '#38bdf8' }}>DATABRICKS_TOKEN</code>: e.g. <span style={{ color: 'var(--text-muted)' }}>dapi_xxxxxxxxxxxxxxxxxxxxxx</span>
              </div>
              <div style={{ background: 'rgba(15, 23, 42, 0.7)', padding: '0.65rem', borderRadius: '6px', border: '1px solid var(--border-subtle)' }}>
                <code style={{ color: '#38bdf8' }}>DATABRICKS_GENIE_SPACE_ID</code>: e.g. <span style={{ color: 'var(--text-muted)' }}>01ef4f7c8a9b1c2d</span>
              </div>
            </div>

            <button
              onClick={() => setShowConfigModal(false)}
              className="btn btn-primary"
              style={{ width: '100%', padding: '0.75rem', fontSize: '0.9rem' }}
            >
              Close & Continue in Demo Mode
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
