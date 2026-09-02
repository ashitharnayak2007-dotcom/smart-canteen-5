import { NavLink, useNavigate, Outlet } from "react-router-dom";
import { LayoutDashboard, BarChart2, DollarSign, Trash2, MessageSquare, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import NotificationToast from "../components/NotificationToast";
const NAV = [
  { to:"/admin/dashboard", icon:<LayoutDashboard size={16}/>, label:"Dashboard"    },
  { to:"/admin/analytics", icon:<BarChart2 size={16}/>,        label:"Analytics"    },
  { to:"/admin/sales",     icon:<DollarSign size={16}/>,       label:"Sales Report" },
  { to:"/admin/wastage",   icon:<Trash2 size={16}/>,           label:"Wastage"      },
  { to:"/admin/genie",     icon:<MessageSquare size={16}/>,    label:"Genie Q&A"   },
];
export default function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const initials = user?.name?.split(" ").map(n=>n[0]).join("").slice(0,2)||"AD";
  return (
    <div className="sc-app">
      <aside className="sc-sidebar">
        <div className="sc-sidebar-logo">
          <div className="logo-title">🍽️ SMART CANTEEN</div>
          <div className="logo-team">AURIX NEXUS</div>
        </div>
        <nav className="sc-sidebar-nav">
          <div className="sc-nav-label">Admin Portal</div>
          {NAV.map(n => (
            <NavLink key={n.to} to={n.to} className={({isActive})=>`sc-nav-item ${isActive?"active":""}`}>
              {n.icon} {n.label}
            </NavLink>
          ))}
        </nav>
        <div className="sc-sidebar-footer">
          <div className="sc-user-chip">
            <div className="sc-avatar" style={{ background:"linear-gradient(135deg,#7C3AED,#A78BFA)" }}>{initials}</div>
            <div style={{ flex:1, overflow:"hidden" }}>
              <div className="sc-user-name" style={{ overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{user?.name}</div>
              <div className="sc-user-role">Administrator</div>
            </div>
            <button className="sc-btn sc-btn-ghost sc-btn-icon" onClick={()=>{logout();navigate("/login");}} title="Logout"><LogOut size={16}/></button>
          </div>
        </div>
      </aside>
      <main className="sc-main-content"><NotificationToast/><Outlet/></main>
    </div>
  );
}
