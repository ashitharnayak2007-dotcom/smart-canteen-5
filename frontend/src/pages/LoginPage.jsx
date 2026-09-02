import { useState, useEffect } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
const DEFAULTS = {
  student:{ email:"student@aurix.edu", password:"student123" },
  staff:  { email:"staff@aurix.edu",   password:"staff123"   },
  admin:  { email:"admin@aurix.edu",   password:"admin123"   },
};
const ROUTES = { student:"/student/dashboard", staff:"/staff/dashboard", admin:"/admin/dashboard" };
export default function LoginPage() {
  const { login, isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const defRole = params.get("role")||"student";
  const [role, setRole] = useState(defRole);
  const [email, setEmail] = useState(DEFAULTS[defRole].email);
  const [password, setPassword] = useState(DEFAULTS[defRole].password);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => { if (isAuthenticated && user) navigate(ROUTES[user.role]||"/"); }, [isAuthenticated, user, navigate]);
  const switchRole = r => { setRole(r); setEmail(DEFAULTS[r].email); setPassword(DEFAULTS[r].password); setError(""); };
  const handleSubmit = async e => {
    e.preventDefault(); setError(""); setLoading(true);
    await new Promise(r=>setTimeout(r,600));
    const res = login(email, password); setLoading(false);
    if (res.success) navigate(ROUTES[res.user.role]||"/"); else setError(res.error);
  };
  return (
    <div className="sc-login-bg">
      <div className="sc-login-card">
        <div className="sc-login-logo">
          <div style={{ fontSize:44, marginBottom:8 }}>🍽️</div>
          <div className="login-title">SMART CANTEEN</div>
          <div className="login-team">AURIX NEXUS</div>
        </div>
        <div className="sc-role-selector">
          {["student","staff","admin"].map(r=>(
            <button key={r} className={`sc-role-tab ${role===r?"active":""}`} onClick={()=>switchRole(r)}>
              {r==="student"?"🎓 Student":r==="staff"?"👨‍🍳 Staff":"📊 Admin"}
            </button>
          ))}
        </div>
        <form onSubmit={handleSubmit}>
          {error && <div className="sc-login-error">⚠️ {error}</div>}
          <div className="sc-form-group">
            <label className="sc-label">Email</label>
            <input className="sc-input" type="email" value={email} onChange={e=>setEmail(e.target.value)} required placeholder="your@email.com"/>
          </div>
          <div className="sc-form-group">
            <label className="sc-label">Password</label>
            <input className="sc-input" type="password" value={password} onChange={e=>setPassword(e.target.value)} required placeholder="••••••••"/>
          </div>
          <button className="sc-btn sc-btn-primary sc-btn-full sc-btn-lg" type="submit" disabled={loading} style={{ marginTop:8 }}>
            {loading?"Signing in...":`Sign in as ${role.charAt(0).toUpperCase()+role.slice(1)}`}
          </button>
        </form>
        <div className="sc-login-demo">
          <div className="demo-title">🧪 Demo Credentials</div>
          {Object.entries(DEFAULTS).map(([r,c])=>(
            <div key={r} className="demo-cred">
              <span style={{ textTransform:"capitalize", fontWeight:500 }}>{r}:</span>
              <span style={{ fontFamily:"monospace", fontSize:11 }}>{c.email} / {c.password}</span>
            </div>
          ))}
        </div>
        <div style={{ textAlign:"center", marginTop:16 }}>
          <Link to="/" style={{ color:"var(--text-muted)", fontSize:13 }}>← Back to Home</Link>
        </div>
      </div>
    </div>
  );
}
