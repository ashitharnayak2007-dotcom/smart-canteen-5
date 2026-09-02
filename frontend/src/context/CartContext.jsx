import { createContext, useContext, useState, useCallback, useMemo } from "react";
import { COUPONS } from "../data/menuData";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  const addItem = useCallback((menuItem, qty = 1, customization = "") => {
    setItems(prev => {
      const existing = prev.find(i => i.id === menuItem.id && i.customization === customization);
      if (existing) {
        return prev.map(i =>
          (i.id === menuItem.id && i.customization === customization)
            ? { ...i, quantity: Math.min(i.quantity + qty, menuItem.maxQty || 10) }
            : i
        );
      }
      return [...prev, { ...menuItem, quantity: qty, customization }];
    });
  }, []);

  const removeItem = useCallback((cartKey) => {
    setItems(prev => prev.filter(i => (i.id + i.customization) !== cartKey));
  }, []);

  const updateQuantity = useCallback((cartKey, qty) => {
    if (qty <= 0) {
      setItems(prev => prev.filter(i => (i.id + i.customization) !== cartKey));
    } else {
      setItems(prev => prev.map(i => (i.id + i.customization) === cartKey ? { ...i, quantity: qty } : i));
    }
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
    setAppliedCoupon(null);
  }, []);

  const subtotal = useMemo(() => {
    return items.reduce((s, i) => s + i.price * i.quantity, 0);
  }, [items]);

  const discount = useMemo(() => {
    if (!appliedCoupon) return 0;
    if (subtotal < (appliedCoupon.minOrder || 0)) return 0;

    let d = 0;
    if (appliedCoupon.discountType === "percentage") {
      d = Math.round((subtotal * appliedCoupon.discountValue) / 100);
      if (appliedCoupon.maxDiscount) {
        d = Math.min(d, appliedCoupon.maxDiscount);
      }
    } else if (appliedCoupon.discountType === "flat") {
      d = appliedCoupon.discountValue;
    }
    return Math.min(d, subtotal);
  }, [appliedCoupon, subtotal]);

  const total = useMemo(() => {
    return Math.max(0, subtotal - discount);
  }, [subtotal, discount]);

  const applyCoupon = useCallback((code) => {
    const trimmed = (code || "").trim().toUpperCase();
    const found = COUPONS.find(c => c.code.toUpperCase() === trimmed);
    if (!found) {
      return { success: false, message: `Invalid coupon code "${code}"` };
    }
    if (subtotal < found.minOrder) {
      return { success: false, message: `Minimum order of ₹${found.minOrder} required for ${found.code}` };
    }
    setAppliedCoupon(found);
    return { success: true, message: `Coupon "${found.code}" applied! You save ₹${found.discountType === 'flat' ? found.discountValue : Math.min(Math.round((subtotal * found.discountValue) / 100), found.maxDiscount)}` };
  }, [subtotal]);

  const removeCoupon = useCallback(() => {
    setAppliedCoupon(null);
  }, []);

  const itemCount = useMemo(() => {
    return items.reduce((s, i) => s + i.quantity, 0);
  }, [items]);

  return (
    <CartContext.Provider value={{
      items,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      subtotal,
      discount,
      total,
      itemCount,
      appliedCoupon,
      applyCoupon,
      removeCoupon,
      availableCoupons: COUPONS
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const c = useContext(CartContext);
  if (!c) throw new Error("useCart outside CartProvider");
  return c;
}