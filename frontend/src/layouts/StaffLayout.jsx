import { NavLink, useNavigate, Outlet } from "react-router-dom";
import { LayoutDashboard, ClipboardList, Package, TrendingUp, Trash2, MessageSquare, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import NotificationToast from "../components/NotificationToast";
const NAV = [
  { to:"/staff/dashboard", icon:<LayoutDashboard size={16}/>, label:"Dashboard"   },
  { to:"/staff/orders",    icon:<ClipboardList size={16}/>,   label:"Live Orders" },
  { to:"/staff/inventory", icon:<Package size={16}/>,          label:"Inventory"   },
  { to:"/staff/demand",    icon:<TrendingUp size={16}/>,       label:"AI Demand"   },
  { to:"/staff/wastage",   icon:<Trash2 size={16}/>,           label:"Wastage"     },
  { to:"/staff/genie",     icon:<MessageSquare size={16}/>,    label:"Genie Q&A"  },
];
export default function StaffLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const initials = user?.name?.split(" ").map(n=>n[0]).join("").slice(0,2)||"ST";
  return (
    <div className="sc-app">
      <aside className="sc-sidebar">
        <div className="sc-sidebar-logo">
          <div className="logo-title">🍽️ SMART CANTEEN</div>
          <div className="logo-team">AURIX NEXUS</div>
        </div>
        <nav className="sc-sidebar-nav">
          <div className="sc-nav-label">Staff Portal</div>
          {NAV.map(n => (
            <NavLink key={n.to} to={n.to} className={({isActive})=>`sc-nav-item ${isActive?"active":""}`}>
              {n.icon} {n.label}
            </NavLink>
          ))}
        </nav>
        <div className="sc-sidebar-footer">
          <div className="sc-user-chip">
            <div className="sc-avatar" style={{ background:"linear-gradient(135deg,#D97706,#F59E0B)" }}>{initials}</div>
            <div style={{ flex:1, overflow:"hidden" }}>
              <div className="sc-user-name" style={{ overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{user?.name}</div>
              <div className="sc-user-role">Canteen Staff</div>
            </div>
            <button className="sc-btn sc-btn-ghost sc-btn-icon" onClick={()=>{logout();navigate("/login");}} title="Logout"><LogOut size={16}/></button>
          </div>
        </div>
      </aside>
      <main className="sc-main-content"><NotificationToast/><Outlet/></main>
    </div>
  );
}
