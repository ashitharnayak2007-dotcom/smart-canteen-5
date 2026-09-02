import { DEMAND_PREDICTIONS, PREDICTION_METADATA } from "../../data/demandData";
import { TrendingUp, TrendingDown, Minus, Brain } from "lucide-react";
export default function DemandPrediction() {
  const maxPred = Math.max(...DEMAND_PREDICTIONS.map(d=>d.predicted));
  const trendIcon = t => t==="up"?<TrendingUp size={14} color="#10B981"/>:t==="down"?<TrendingDown size={14} color="#EF4444"/>:<Minus size={14} color="#94A3B8"/>;
  return (
    <div>
      <div className="sc-topbar">
        <div className="sc-topbar-left"><h1>AI Demand Prediction</h1><p>XGBoost ML model · {PREDICTION_METADATA.targetDate}</p></div>
        <div className="sc-topbar-right"><span className="sc-demo-tag">🧪 DEMO</span></div>
      </div>
      <div className="sc-page-content">
        <div className="sc-alert sc-alert-info" style={{ marginBottom:24 }}>
          <Brain size={18}/>
          <div>
            <strong>How this works:</strong> Our ML model ({PREDICTION_METADATA.algorithm}) analyzes historical order data, day of week, meal periods, and events to predict tomorrow&apos;s demand. <strong>Total predicted meals: {PREDICTION_METADATA.totalPredicted}</strong>
            <br/><span style={{ fontSize:12, marginTop:4, display:"block" }}>Note: Genie AI is a separate natural-language interface for querying data — the forecasting is done by this ML model.</span>
          </div>
        </div>

        <div className="sc-grid-2" style={{ gap:20, marginBottom:20 }}>
          <div className="sc-stat-card">
            <div className="sc-stat-icon" style={{ background:"rgba(15,118,110,0.12)" }}><TrendingUp size={20} color="var(--color-primary-light)"/></div>
            <div className="sc-stat-value">{PREDICTION_METADATA.totalPredicted}</div>
            <div className="sc-stat-title">Total Predicted Meals</div>
            <div className="sc-stat-sub">For today</div>
          </div>
          <div className="sc-stat-card">
            <div className="sc-stat-icon" style={{ background:"rgba(16,185,129,0.12)" }}><Brain size={20} color="var(--color-success)"/></div>
            <div className="sc-stat-value">{Math.round(DEMAND_PREDICTIONS.reduce((s,d)=>s+d.confidence,0)/DEMAND_PREDICTIONS.length)}%</div>
            <div className="sc-stat-title">Avg Confidence</div>
            <div className="sc-stat-sub">Model accuracy</div>
          </div>
        </div>

        <div className="sc-card">
          <div className="sc-card-header"><span className="sc-card-title">📊 Preparation Recommendations</span></div>
          <div className="sc-card-body" style={{ display:"flex", flexDirection:"column", gap:14 }}>
            {DEMAND_PREDICTIONS.sort((a,b)=>b.predicted-a.predicted).map(d=>(
              <div key={d.item} className="sc-demand-card">
                <span style={{ fontSize:24 }}>{d.emoji}</span>
                <span className="sc-demand-food">{d.item}</span>
                <div className="sc-demand-bar-track">
                  <div className="sc-demand-bar-fill" style={{ width:`${(d.predicted/maxPred)*100}%` }}/>
                </div>
                <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                  {trendIcon(d.trend)}
                  <span className="sc-confidence-pill">{d.confidence}%</span>
                </div>
                <span className="sc-demand-qty">{d.predicted}</span>
              </div>
            ))}
          </div>
          <div style={{ padding:"14px 20px", borderTop:"1px solid var(--border-color)", fontSize:12, color:"var(--text-muted)" }}>
            Generated: {new Date(PREDICTION_METADATA.generatedAt).toLocaleString()} · Model: {PREDICTION_METADATA.modelVersion} · Features: {PREDICTION_METADATA.features.join(", ")}
          </div>
        </div>
      </div>
    </div>
  );
}
