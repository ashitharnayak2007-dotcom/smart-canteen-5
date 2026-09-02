import { useState } from "react";
import { Search, Clock, Plus, ShoppingCart, SlidersHorizontal, X, Tag, Star, Flame, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { MENU_ITEMS, CATEGORIES, CUSTOMIZATION_OPTIONS, COUPONS } from "../../data/menuData";
import { useCart } from "../../context/CartContext";
import { useNotification } from "../../context/NotificationContext";

function CustomizeModal({ item, onAdd, onClose }) {
  const [spice, setSpice] = useState("Medium");
  const [remove, setRemove] = useState([]);
  const [extras, setExtras] = useState([]);
  const [freeNote, setFreeNote] = useState("");
  const [qty, setQty] = useState(1);

  const toggleArr = (arr, setArr, val) => setArr(prev => prev.includes(val) ? prev.filter(x => x !== val) : [...prev, val]);

  const buildNote = () => {
    const parts = [];
    if (spice !== "Medium") parts.push(`Spice: ${spice}`);
    if (remove.length) parts.push(`Remove: ${remove.join(", ")}`);
    if (extras.length) parts.push(extras.join(", "));
    if (freeNote.trim()) parts.push(freeNote.trim());
    return parts.join(" | ");
  };

  return (
    <div className="sc-modal-overlay" onClick={onClose}>
      <div className="sc-modal" style={{ maxWidth: 520 }} onClick={e => e.stopPropagation()}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <img
              src={item.image}
              alt={item.name}
              style={{ width: 48, height: 48, borderRadius: 10, objectFit: "cover" }}
              onError={(e) => { e.target.style.display = 'none'; }}
            />
            <div>
              <div className="sc-modal-title" style={{ marginBottom: 2 }}>{item.name}</div>
              <div style={{ fontSize: 13, color: "var(--text-muted)" }}>Customize ingredients & preparation</div>
            </div>
          </div>
          <button className="sc-btn sc-btn-ghost sc-btn-icon" onClick={onClose}><X size={18} /></button>
        </div>

        <div className="sc-form-group">
          <label className="sc-label">🌶️ Spice Level</label>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {CUSTOMIZATION_OPTIONS.spiceLevel.map(s => (
              <button
                key={s}
                onClick={() => setSpice(s)}
                style={{
                  padding: "6px 14px",
                  borderRadius: 20,
                  border: `1px solid ${spice === s ? "var(--color-primary-light)" : "var(--border-color)"}`,
                  background: spice === s ? "rgba(20,184,166,0.12)" : "transparent",
                  color: spice === s ? "var(--color-primary-light)" : "var(--text-secondary)",
                  cursor: "pointer",
                  fontSize: 13,
                  fontWeight: spice === s ? 600 : 400,
                  transition: "all 0.15s"
                }}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="sc-form-group">
          <label className="sc-label">❌ Remove Ingredients (e.g. No Veggies / No Onion)</label>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {CUSTOMIZATION_OPTIONS.remove.map(r => (
              <button
                key={r}
                onClick={() => toggleArr(remove, setRemove, r)}
                style={{
                  padding: "6px 14px",
                  borderRadius: 20,
                  border: `1px solid ${remove.includes(r) ? "var(--color-danger)" : "var(--border-color)"}`,
                  background: remove.includes(r) ? "rgba(239,68,68,0.1)" : "transparent",
                  color: remove.includes(r) ? "#FCA5A5" : "var(--text-secondary)",
                  cursor: "pointer",
                  fontSize: 13,
                  transition: "all 0.15s"
                }}
              >
                {remove.includes(r) ? "✕ " : ""}{r}
              </button>
            ))}
          </div>
        </div>

        <div className="sc-form-group">
          <label className="sc-label">➕ Add Extras</label>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {CUSTOMIZATION_OPTIONS.extras.map(e => (
              <button
                key={e}
                onClick={() => toggleArr(extras, setExtras, e)}
                style={{
                  padding: "6px 14px",
                  borderRadius: 20,
                  border: `1px solid ${extras.includes(e) ? "var(--color-success)" : "var(--border-color)"}`,
                  background: extras.includes(e) ? "rgba(16,185,129,0.1)" : "transparent",
                  color: extras.includes(e) ? "#6EE7B7" : "var(--text-secondary)",
                  cursor: "pointer",
                  fontSize: 13,
                  transition: "all 0.15s"
                }}
              >
                {extras.includes(e) ? "✓ " : ""}{e}
              </button>
            ))}
          </div>
        </div>

        <div className="sc-form-group">
          <label className="sc-label">📝 Custom Note</label>
          <textarea
            className="sc-textarea"
            placeholder="e.g. Please make pulao without veggies, less oil, extra crispy..."
            value={freeNote}
            onChange={e => setFreeNote(e.target.value)}
            rows={2}
          />
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 8 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <button className="sc-qty-btn" onClick={() => setQty(q => Math.max(1, q - 1))}>-</button>
            <span style={{ fontWeight: 700, fontSize: 16, minWidth: 24, textAlign: "center" }}>{qty}</span>
            <button className="sc-qty-btn" onClick={() => setQty(q => Math.min(10, q + 1))}>+</button>
          </div>
          <button className="sc-btn sc-btn-accent" onClick={() => onAdd(item, qty, buildNote())}>
            <Plus size={16} /> Add to Cart — ₹{item.price * qty}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function MenuPage() {
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [quantities, setQuantities] = useState({});
  const [customizing, setCustomizing] = useState(null);
  const { addItem, itemCount, applyCoupon } = useCart();
  const { addNotification } = useNotification();

  const filtered = MENU_ITEMS.filter(item => {
    const matchCat = category === "All" || item.category === category;
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase()) ||
                        item.description.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const getQty = id => quantities[id] || 1;
  const setQty = (id, v) => setQuantities(p => ({ ...p, [id]: Math.max(1, Math.min(v, 10)) }));

  const handleAdd = (item, qty = getQty(item.id), customization = "") => {
    addItem(item, qty, customization);
    addNotification({
      type: "success",
      message: `${item.name} added to cart!${customization ? " (Customized)" : ""}`
    });
    setCustomizing(null);
  };

  const handleQuickCoupon = (c) => {
    const res = applyCoupon(c.code);
    if (res.success) {
      addNotification({ type: "success", message: res.message });
    } else {
      addNotification({ type: "info", message: `Coupon copied! ${res.message}` });
    }
  };

  return (
    <div>
      <div className="sc-topbar">
        <div className="sc-topbar-left">
          <h1>Today&apos;s Live Menu</h1>
          <p>Freshly prepared campus meals · Click 🎨 to customize</p>
        </div>
        <div className="sc-topbar-right">
          <Link to="/student/cart" className="sc-btn sc-btn-primary">
            <ShoppingCart size={16} /> View Cart {itemCount > 0 && `(${itemCount})`}
          </Link>
        </div>
      </div>

      <div className="sc-page-content">
        {/* Promotional Coupon Banner */}
        <div className="sc-coupon-banner">
          <div className="sc-coupon-banner-left">
            <div className="sc-coupon-icon-box">🏷️</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 15, color: "var(--text-primary)" }}>
                Active Offers & Student Discounts
              </div>
              <div style={{ fontSize: 12, color: "var(--text-secondary)", marginTop: 2 }}>
                Use code <strong style={{ color: "#FCD34D" }}>FIRST50</strong> for 50% off or <strong style={{ color: "var(--color-primary-light)" }}>AURIX20</strong> for 20% off at checkout!
              </div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {COUPONS.slice(0, 3).map(c => (
              <button
                key={c.code}
                className="sc-coupon-code-pill"
                onClick={() => handleQuickCoupon(c)}
                title="Click to apply"
              >
                <Tag size={12} /> {c.code} ({c.discountType === 'flat' ? `₹${c.discountValue} OFF` : `${c.discountValue}% OFF`})
              </button>
            ))}
          </div>
        </div>

        {/* Search & Category Filter */}
        <div className="sc-search-bar">
          <Search size={18} color="var(--text-muted)" />
          <input
            placeholder="Search items, ingredients, or meals (e.g. Masala Dosa, Pulao)..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        <div className="sc-category-tabs">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              className={`sc-cat-btn ${category === cat ? "active" : ""}`}
              onClick={() => setCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Menu Grid with Photos */}
        {filtered.length === 0 ? (
          <div className="sc-empty">
            <div className="sc-empty-icon">🔍</div>
            <h3>No food items found</h3>
            <p>Try searching for something else or switch category</p>
          </div>
        ) : (
          <div className="sc-menu-grid">
            {filtered.map(item => (
              <div key={item.id} className={`sc-menu-card ${!item.available ? "unavailable" : ""}`}>
                {/* Photo Container */}
                <div className="sc-food-img-container">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="sc-food-img"
                    loading="lazy"
                    onError={(e) => {
                      // Fallback if image fails to load
                      e.target.style.display = 'none';
                    }}
                  />
                  <div className="sc-food-overlay-tag">
                    <Star size={12} fill="#FCD34D" color="#FCD34D" /> {item.rating} ({item.reviews})
                  </div>
                  {item.isBestseller && (
                    <div className="sc-food-bestseller-tag">
                      <Flame size={10} style={{ display: 'inline', marginRight: 2 }} /> Bestseller
                    </div>
                  )}
                </div>

                {/* Card Body */}
                <div className="sc-menu-card-body">
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
                    <div className="sc-food-name">{item.name}</div>
                    <span className="sc-food-price">₹{item.price}</span>
                  </div>

                  <div className="sc-food-desc">{item.description}</div>

                  <div className="sc-food-meta">
                    <span className="sc-food-prep"><Clock size={12} /> {item.prepTime} min</span>
                    {item.customizable && (
                      <span style={{ fontSize: 11, color: "var(--color-primary-light)", display: "flex", alignItems: "center", gap: 3, fontWeight: 600 }}>
                        <Sparkles size={12} /> Customizable
                      </span>
                    )}
                  </div>

                  {!item.available ? (
                    <div className="sc-unavail-tag">⛔ Sold Out Today</div>
                  ) : (
                    <div className="sc-qty-row">
                      <div className="sc-qty-ctrl">
                        <button className="sc-qty-btn" onClick={() => setQty(item.id, getQty(item.id) - 1)}>-</button>
                        <span className="sc-qty-val">{getQty(item.id)}</span>
                        <button className="sc-qty-btn" onClick={() => setQty(item.id, getQty(item.id) + 1)}>+</button>
                      </div>

                      <div style={{ display: "flex", gap: 6 }}>
                        {item.customizable && (
                          <button
                            className="sc-btn sc-btn-outline sc-btn-sm"
                            onClick={() => setCustomizing(item)}
                            title="Customize ingredients & preparation"
                          >
                            <SlidersHorizontal size={14} /> Customize
                          </button>
                        )}
                        <button
                          className="sc-btn sc-btn-primary sc-btn-sm"
                          onClick={() => handleAdd(item)}
                        >
                          <Plus size={14} /> Add
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {customizing && (
        <CustomizeModal
          item={customizing}
          onAdd={handleAdd}
          onClose={() => setCustomizing(null)}
        />
      )}
    </div>
  );
}