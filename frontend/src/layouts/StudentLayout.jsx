import { NavLink, useNavigate, Outlet } from "react-router-dom";
import { UtensilsCrossed, ShoppingCart, ClipboardList, Home, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import NotificationToast from "../components/NotificationToast";
const NAV = [
  { to:"/student/dashboard", icon:<Home size={16}/>,          label:"Dashboard"  },
  { to:"/student/menu",      icon:<UtensilsCrossed size={16}/>, label:"Menu"       },
  { to:"/student/cart",      icon:<ShoppingCart size={16}/>,   label:"Cart"       },
  { to:"/student/orders",    icon:<ClipboardList size={16}/>,  label:"My Orders"  },
];
export default function StudentLayout() {
  const { user, logout } = useAuth();
  const { itemCount } = useCart();
  const navigate = useNavigate();
  const initials = user?.name?.split(" ").map(n=>n[0]).join("").slice(0,2)||"S";
  return (
    <div className="sc-app">
      <aside className="sc-sidebar">
        <div className="sc-sidebar-logo">
          <div className="logo-title">🍽️ SMART CANTEEN</div>
          <div className="logo-team">AURIX NEXUS</div>
        </div>
        <nav className="sc-sidebar-nav">
          <div className="sc-nav-label">Student Portal</div>
          {NAV.map(n => (
            <NavLink key={n.to} to={n.to} className={({isActive})=>`sc-nav-item ${isActive?"active":""}`}>
              {n.icon} {n.label}
              {n.label==="Cart" && itemCount>0 && (
                <span style={{ marginLeft:"auto", background:"var(--color-accent)", color:"#1a1100", borderRadius:"50%", width:20, height:20, display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:700 }}>{itemCount}</span>
              )}
            </NavLink>
          ))}
        </nav>
        <div className="sc-sidebar-footer">
          <div className="sc-user-chip">
            <div className="sc-avatar">{initials}</div>
            <div style={{ flex:1, overflow:"hidden" }}>
              <div className="sc-user-name" style={{ overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{user?.name}</div>
              <div className="sc-user-role">Student · {user?.rollNo}</div>
            </div>
            <button className="sc-btn sc-btn-ghost sc-btn-icon" onClick={()=>{logout();navigate("/login");}} title="Logout"><LogOut size={16}/></button>
          </div>
        </div>
      </aside>
      <main className="sc-main-content"><NotificationToast/><Outlet/></main>
    </div>
  );
}
