import { Link } from "react-router-dom";
import { UtensilsCrossed, ClipboardList, Bell, ShoppingCart, Clock, TrendingUp, Tag, Sparkles, Flame } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import { useNotification } from "../../context/NotificationContext";
import { COUPONS, MENU_ITEMS } from "../../data/menuData";
import Badge from "../../components/Badge";

const RECENT = [
  { id: "SC1001", items: "Masala Dosa x2, Filter Coffee x1", total: 85, status: "READY", slot: "8:30 AM – 9:00 AM" },
  { id: "SC0998", items: "Veg Pulao (no veggies), Sambar x1", total: 60, status: "PICKED_UP", slot: "12:30 PM – 1:00 PM" },
  { id: "SC0985", items: "Steamed Idli x2, Filter Coffee x1", total: 65, status: "PICKED_UP", slot: "8:00 AM – 8:30 AM" },
];

export default function StudentDashboard() {
  const { user } = useAuth();
  const { applyCoupon } = useCart();
  const { addNotification } = useNotification();

  const handleCopyCoupon = (code) => {
    applyCoupon(code);
    addNotification({ type: "success", message: `Coupon "${code}" activated for your next order!` });
  };

  return (
    <div>
      <div className="sc-topbar">
        <div className="sc-topbar-left">
          <h1>Good morning, {user?.name?.split(" ")[0]}! 👋</h1>
          <p>Welcome to Smart Canteen · Order ahead, customize & skip queues</p>
        </div>
        <div className="sc-topbar-right">
          <span className="sc-demo-tag">🧪 STUDENT PORTAL</span>
        </div>
      </div>

      <div className="sc-page-content">
        {/* Active Order Alert */}
        <div className="sc-alert sc-alert-success" style={{ marginBottom: 24 }}>
          <Bell size={18} />
          <div>
            <strong>Order SC1001 is READY for pickup!</strong> Please collect at the canteen counter by 9:00 AM.
          </div>
        </div>

        {/* Offers & Coupons Carousel */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
            <h2 style={{ fontSize: 16, fontWeight: 700, color: "var(--text-primary)", display: "flex", alignItems: "center", gap: 6 }}>
              <Sparkles size={16} color="#F59E0B" /> Today&apos;s Coupons & Offers
            </h2>
            <Link to="/student/menu" style={{ fontSize: 13, color: "var(--color-primary-light)" }}>
              Explore Menu →
            </Link>
          </div>
          <div className="sc-coupons-grid" style={{ marginBottom: 0 }}>
            {COUPONS.map(c => (
              <div key={c.code} className="sc-coupon-card" style={{ background: "rgba(30, 41, 59, 0.7)" }}>
                <div className="sc-coupon-top">
                  <span
                    className="sc-coupon-tag"
                    style={{ background: `${c.color}22`, color: c.color }}
                  >
                    {c.tag}
                  </span>
                  <span style={{ fontFamily: "monospace", fontWeight: 800, color: "var(--color-primary-light)", fontSize: 14 }}>
                    {c.code}
                  </span>
                </div>
                <div className="sc-coupon-title">{c.title}</div>
                <div className="sc-coupon-desc">{c.description}</div>
                <div className="sc-coupon-footer">
                  <span style={{ fontSize: 11, color: "var(--text-muted)" }}>Min ₹{c.minOrder}</span>
                  <button
                    className="sc-btn sc-btn-outline sc-btn-sm"
                    onClick={() => handleCopyCoupon(c.code)}
                    style={{ padding: "4px 10px", fontSize: 12 }}
                  >
                    <Tag size={12} /> Claim Offer
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div style={{ marginBottom: 28 }}>
          <h2 style={{ fontSize: 15, fontWeight: 600, marginBottom: 14, color: "var(--text-secondary)" }}>Quick Actions</h2>
          <div className="sc-grid-2" style={{ gap: 14 }}>
            <Link to="/student/menu" className="sc-card" style={{ padding: 20, display: "flex", alignItems: "center", gap: 14, textDecoration: "none" }}>
              <div style={{ width: 48, height: 48, background: "rgba(15,118,110,0.15)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <UtensilsCrossed size={24} color="var(--color-primary-light)" />
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 2 }}>Browse Today&apos;s Menu</div>
                <div style={{ fontSize: 13, color: "var(--text-muted)" }}>View photos, ratings & custom preparation</div>
              </div>
            </Link>
            <Link to="/student/orders" className="sc-card" style={{ padding: 20, display: "flex", alignItems: "center", gap: 14, textDecoration: "none" }}>
              <div style={{ width: 48, height: 48, background: "rgba(245,158,11,0.15)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <ClipboardList size={24} color="var(--color-accent)" />
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 2 }}>Track Active Orders</div>
                <div style={{ fontSize: 13, color: "var(--text-muted)" }}>Live kitchen status & pickup timings</div>
              </div>
            </Link>
          </div>
        </div>

        {/* Popular Dishes Preview */}
        <div style={{ marginBottom: 28 }}>
          <h2 style={{ fontSize: 15, fontWeight: 600, marginBottom: 14, color: "var(--text-secondary)", display: "flex", alignItems: "center", gap: 6 }}>
            <Flame size={16} color="#EF4444" /> Campus Bestsellers
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 14 }}>
            {MENU_ITEMS.filter(m => m.isBestseller).slice(0, 4).map(item => (
              <Link key={item.id} to="/student/menu" className="sc-card" style={{ overflow: "hidden", textDecoration: "none" }}>
                <img
                  src={item.image}
                  alt={item.name}
                  style={{ width: "100%", height: 110, objectFit: "cover" }}
                />
                <div style={{ padding: 12 }}>
                  <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{item.name}</div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ color: "var(--color-accent)", fontWeight: 700 }}>₹{item.price}</span>
                    <span style={{ fontSize: 12, color: "var(--text-muted)" }}>★ {item.rating}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="sc-stat-grid" style={{ gridTemplateColumns: "repeat(3,1fr)", marginBottom: 28 }}>
          <div className="sc-stat-card">
            <div className="sc-stat-icon" style={{ background: "rgba(15,118,110,0.12)" }}>
              <ShoppingCart size={20} color="var(--color-primary-light)" />
            </div>
            <div className="sc-stat-value">24</div>
            <div className="sc-stat-title">Total Orders</div>
            <div className="sc-stat-sub">This semester</div>
          </div>
          <div className="sc-stat-card">
            <div className="sc-stat-icon" style={{ background: "rgba(245,158,11,0.12)" }}>
              <Clock size={20} color="var(--color-accent)" />
            </div>
            <div className="sc-stat-value">4 min</div>
            <div className="sc-stat-title">Avg Wait Time</div>
            <div className="sc-stat-sub">Pre-ordered meals</div>
          </div>
          <div className="sc-stat-card">
            <div className="sc-stat-icon" style={{ background: "rgba(59,130,246,0.12)" }}>
              <TrendingUp size={20} color="var(--color-info)" />
            </div>
            <div className="sc-stat-value">₹1,840</div>
            <div className="sc-stat-title">Total Spent</div>
            <div className="sc-stat-sub">Saved ₹320 with coupons</div>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="sc-card">
          <div className="sc-card-header">
            <span className="sc-card-title">Recent Orders</span>
            <Link to="/student/orders" style={{ color: "var(--color-primary-light)", fontSize: 13 }}>View all →</Link>
          </div>
          {RECENT.map(o => (
            <div key={o.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 20px", borderBottom: "1px solid rgba(51,65,85,0.4)", flexWrap: "wrap", gap: 8 }}>
              <div>
                <div style={{ fontWeight: 600, marginBottom: 3 }}>{o.id}</div>
                <div style={{ fontSize: 13, color: "var(--text-muted)" }}>{o.items}</div>
                <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 2 }}>⏰ {o.slot}</div>
              </div>
              <div style={{ textAlign: "right", display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6 }}>
                <Badge status={o.status} />
                <span style={{ fontWeight: 700, color: "var(--color-accent)" }}>₹{o.total}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}