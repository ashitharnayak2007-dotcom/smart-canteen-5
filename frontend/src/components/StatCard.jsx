export default function StatCard({ title, value, subtitle, icon, color="#0F766E", change }) {
  return (
    <div className="sc-stat-card">
      <div className="sc-stat-icon" style={{ background:`${color}22` }}>
        <span style={{ color, fontSize:20 }}>{icon}</span>
      </div>
      <div className="sc-stat-value">{value}</div>
      <div className="sc-stat-title">{title}</div>
      {subtitle && <div className="sc-stat-sub">{subtitle}</div>}
      {change && <div className="sc-stat-sub" style={{ color:change.startsWith("+")?  "#10B981":"#EF4444" }}>{change}</div>}
    </div>
  );
}
