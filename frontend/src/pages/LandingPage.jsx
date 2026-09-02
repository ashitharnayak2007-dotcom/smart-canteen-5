import { Link } from "react-router-dom";
import { Zap, ChevronRight } from "lucide-react";
export default function LandingPage() {
  return (
    <div className="sc-landing">
      <nav className="sc-landing-nav">
        <div className="sc-landing-nav-brand">
          <span style={{ fontSize:28 }}>🍽️</span>
          <div><div className="nav-title">SMART CANTEEN</div><div className="nav-team">AURIX NEXUS</div></div>
        </div>
        <Link to="/login" className="sc-btn sc-btn-primary">Login <ChevronRight size={16}/></Link>
      </nav>
      <section className="sc-hero">
        <div className="sc-hero-pill"><Zap size={14}/> AI-Powered Campus Food Intelligence</div>
        <h1 className="sc-hero-title">Smart Food,<br/><span className="highlight">Zero Waste</span> Campus</h1>
        <p className="sc-hero-subtitle">Pre-order meals, skip queues, and let AI predict the perfect preparation quantities.</p>
        <p className="sc-hero-tagline">Powered by Databricks Lakehouse · ML Demand Prediction · Genie AI</p>
        <div className="sc-role-cards">
          <Link to="/login?role=student" className="sc-role-card">
            <div className="sc-role-emoji">🎓</div>
            <h3>Student</h3>
            <p>Pre-order meals, customize food, skip the queue</p>
          </Link>
          <Link to="/login?role=staff" className="sc-role-card">
            <div className="sc-role-emoji">👨‍🍳</div>
            <h3>Canteen Staff</h3>
            <p>Manage orders and view AI demand predictions</p>
          </Link>
          <Link to="/login?role=admin" className="sc-role-card">
            <div className="sc-role-emoji">📊</div>
            <h3>Admin</h3>
            <p>Full analytics, sales insights and Genie Q&A</p>
          </Link>
        </div>
      </section>
      <section className="sc-landing-features">
        <h2 style={{ textAlign:"center", fontSize:26, fontWeight:700, marginBottom:32 }}>Why Smart Canteen?</h2>
        <div className="sc-features-grid">
          <div className="sc-feature-card"><div className="sc-feature-icon">⚡</div><div className="sc-feature-title">Skip the Queue</div><div className="sc-feature-desc">Pre-order with a pickup slot. Your meal is ready when you arrive — no waiting, no stress.</div></div>
          <div className="sc-feature-card"><div className="sc-feature-icon">🎨</div><div className="sc-feature-title">Customize Your Food</div><div className="sc-feature-desc">Want Pulao without veggies? Extra spicy noodles? Add special instructions per item — canteen staff will follow them.</div></div>
          <div className="sc-feature-card"><div className="sc-feature-icon">🧠</div><div className="sc-feature-title">AI Demand Prediction</div><div className="sc-feature-desc">ML model predicts tomorrow's demand so staff prepare exact quantities. Less waste, better food.</div></div>
          <div className="sc-feature-card"><div className="sc-feature-icon">🔮</div><div className="sc-feature-title">Genie AI Insights</div><div className="sc-feature-desc">Ask natural-language questions — "What's the busiest lunch hour?" Get instant Databricks-powered answers.</div></div>
          <div className="sc-feature-card"><div className="sc-feature-icon">💳</div><div className="sc-feature-title">Multiple Payments</div><div className="sc-feature-desc">Pay via UPI, Credit/Debit Card, or Cash at counter. Seamless payment experience.</div></div>
          <div className="sc-feature-card"><div className="sc-feature-icon">📦</div><div className="sc-feature-title">Smart Inventory</div><div className="sc-feature-desc">Real-time inventory tracking with low-stock alerts. Never run out of ingredients unexpectedly.</div></div>
        </div>
      </section>
      <footer className="sc-landing-footer">
        <p>🍽️ Smart Canteen · Built by <strong>AURIX NEXUS</strong> · Ashitha R, Harshit Reddy, Punya K M, Harini R</p>
        <p style={{ marginTop:6, fontSize:12 }}>Powered by Databricks Lakehouse · React · FastAPI · XGBoost ML</p>
      </footer>
    </div>
  );
}
