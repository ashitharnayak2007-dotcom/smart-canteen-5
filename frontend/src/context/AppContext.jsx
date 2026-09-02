import React, { createContext, useContext, useState } from 'react';
import { 
  INITIAL_MENU, 
  INITIAL_ORDERS, 
  INITIAL_INVENTORY, 
  INITIAL_WASTAGE, 
  ML_FORECAST_DATA, 
  PICKUP_SLOTS, 
  COUPONS, 
  GENIE_KNOWLEDGE_BASE 
} from '../data/initialData.js';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [activeRole, setActiveRole] = useState('staff'); // 'student' | 'staff' | 'admin' | 'overview'
  const [menu, setMenu] = useState(INITIAL_MENU);
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [inventory, setInventory] = useState(INITIAL_INVENTORY);
  const [wastageLogs, setWastageLogs] = useState(INITIAL_WASTAGE);
  const [forecastDay, setForecastDay] = useState('Monday');
  
  const [cart, setCart] = useState([
    { id: 'food_1', name: 'Masala Dosa', price: 45, qty: 1, image: '🥞', prepTime: '6 mins' },
    { id: 'food_3', name: 'Veg Hakka Noodles', price: 60, qty: 1, image: '🍜', prepTime: '8 mins' }
  ]);
  const [selectedSlot, setSelectedSlot] = useState(PICKUP_SLOTS[2]); // '12:45 PM - 01:00 PM'
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [activeStudentTab, setActiveStudentTab] = useState('menu'); // 'menu' | 'tracking'
  const [selectedFoodDetail, setSelectedFoodDetail] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [lastPlacedOrder, setLastPlacedOrder] = useState(null);
  
  // Real-time In-app Notifications
  const [notifications, setNotifications] = useState([
    {
      id: 'notif_1',
      title: 'Order Ready for Pickup! 🍽️',
      message: 'Your order SC-1024 is ready at Counter 2. Show Token #24 to collect.',
      type: 'success',
      time: 'Just now',
      unread: true
    },
    {
      id: 'notif_2',
      title: 'Low Stock Warning ⚠️',
      message: 'Cooking Oil is below minimum threshold (2.5 L remaining). Restock needed.',
      type: 'warning',
      time: '15m ago',
      unread: true
    },
    {
      id: 'notif_3',
      title: 'ML Prep Target Generated 🤖',
      message: 'Projected demand for Monday lunch: 352 total meals. Check prep targets.',
      type: 'info',
      time: '30m ago',
      unread: false
    }
  ]);

  // Databricks Genie Chat History
  const [genieHistory, setGenieHistory] = useState([
    {
      id: 'genie_1',
      sender: 'user',
      text: 'How many masala dosas should we prepare tomorrow?'
    },
    {
      id: 'genie_2',
      sender: 'genie',
      text: 'Based on Databricks Lakehouse temporal forecasting, you should prepare **78 to 83 Masala Dosas** tomorrow. Peak demand occurs in the 12:45 PM – 1:15 PM slot.',
      sql: 'SELECT food_item, COUNT(*) * 1.15 AS projected_target FROM orders WHERE DAYOFWEEK(order_time) = 2 GROUP BY food_item HAVING food_item = "Masala Dosa"',
      confidence: '94.2% ML Confidence • Lakehouse Live Query',
      time: '12:30 PM'
    }
  ]);

  // Cart operations
  const addToCart = (item) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) => (i.id === item.id ? { ...i, qty: i.qty + 1 } : i));
      }
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const updateCartQty = (id, delta) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = Math.max(0, item.qty + delta);
            return { ...item, qty: newQty };
          }
          return item;
        })
        .filter((item) => item.qty > 0)
    );
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  // Coupon handling
  const applyCoupon = (code) => {
    const clean = code.trim().toUpperCase();
    if (COUPONS[clean]) {
      setAppliedCoupon({ code: clean, ...COUPONS[clean] });
      return { success: true, message: `Coupon ${clean} applied successfully!` };
    }
    return { success: false, message: 'Invalid coupon code. Try CAMPUSFRESH or FIRSTBITE' };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  // Cart calculation
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  let discountAmount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.type === 'flat') {
      discountAmount = appliedCoupon.discount;
    } else if (appliedCoupon.type === 'percentage') {
      discountAmount = Math.round((subtotal * appliedCoupon.discount) / 100);
    }
  }
  const finalTotal = Math.max(0, subtotal - discountAmount);
  const cartItemCount = cart.reduce((sum, item) => sum + item.qty, 0);

  // Order Placement
  const placeOrder = ({ instructions = '' } = {}) => {
    if (cart.length === 0) return null;

    const newId = `SC-${1024 + orders.length + 1}`;
    const token = 24 + orders.length + 1;
    const counter = orders.length % 2 === 0 ? 'Counter 1' : 'Counter 2';
    
    const maxPrep = cart.reduce((max, i) => {
      const p = parseInt(i.prepTime) || 5;
      return p > max ? p : max;
    }, 4);

    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newOrder = {
      id: newId,
      studentName: 'Ashitha R',
      studentId: 'CS402',
      items: [...cart],
      totalAmount: finalTotal,
      pickupSlot: selectedSlot,
      status: 'PLACED',
      orderTime: timeStr,
      estimatedWait: `${maxPrep + 2} mins`,
      tokenNumber: token,
      counter: counter,
      instructions: instructions
    };

    setOrders((prev) => [newOrder, ...prev]);
    setLastPlacedOrder(newOrder);
    clearCart();
    setIsCartOpen(false);

    // Notification
    const newNotif = {
      id: `notif_${Date.now()}`,
      title: `Order ${newId} Placed! 🎉`,
      message: `Pickup scheduled for ${selectedSlot} at ${counter}. Token #${token}.`,
      type: 'success',
      time: 'Just now',
      unread: true
    };
    setNotifications((prev) => [newNotif, ...prev]);
    setActiveStudentTab('tracking');

    return newOrder;
  };

  // Order Status Advancement
  const advanceOrderStatus = (orderId, targetStatus = null) => {
    const sequence = ['PLACED', 'COOKING', 'READY', 'PICKED UP'];
    
    setOrders((prev) =>
      prev.map((order) => {
        if (order.id === orderId) {
          let nextStatus;
          if (targetStatus) {
            nextStatus = targetStatus;
          } else {
            const currentIdx = sequence.indexOf(order.status);
            nextStatus = sequence[(currentIdx + 1) % sequence.length];
          }
          
          let wait = order.estimatedWait;
          if (nextStatus === 'COOKING') wait = '3 mins';
          if (nextStatus === 'READY') wait = '0 mins (Ready)';
          if (nextStatus === 'PICKED UP') wait = 'Fulfilled';

          // Trigger notification when order turns READY
          if (nextStatus === 'READY' && order.status !== 'READY') {
            const readyNotif = {
              id: `notif_${Date.now()}`,
              title: `Order ${order.id} is READY! 🔔`,
              message: `Your order is hot & ready for pickup at ${order.counter}. Show Token #${order.tokenNumber}.`,
              type: 'success',
              time: 'Just now',
              unread: true
            };
            setNotifications((n) => [readyNotif, ...n]);
          }

          return { ...order, status: nextStatus, estimatedWait: wait };
        }
        return order;
      })
    );
  };

  // Inventory Management
  const restockInventoryItem = (id, addAmount = 10.0) => {
    setInventory((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newStock = parseFloat((item.stock + addAmount).toFixed(1));
          return {
            ...item,
            stock: newStock,
            status: newStock <= item.minThreshold ? 'LOW' : 'OK'
          };
        }
        return item;
      })
    );

    const found = inventory.find((i) => i.id === id);
    if (found) {
      const restockNotif = {
        id: `notif_${Date.now()}`,
        title: `Inventory Restocked: ${found.name} 📦`,
        message: `Added +${addAmount} ${found.unit}. New stock level: ${(found.stock + addAmount).toFixed(1)} ${found.unit}.`,
        type: 'success',
        time: 'Just now',
        unread: true
      };
      setNotifications((n) => [restockNotif, ...n]);
    }
  };

  // Food Wastage Logging
  const recordWastage = ({ item, quantity, reason, unit = 'kg' }) => {
    const qtyNum = parseFloat(quantity);
    if (!item || isNaN(qtyNum) || qtyNum <= 0) return false;

    const costEstimate = Math.round(qtyNum * 95); // approximate ₹95/kg cost
    const now = new Date();
    const dateStr = now.toISOString().split('T')[0];

    const newLog = {
      id: `w_${Date.now()}`,
      item,
      quantity: qtyNum,
      unit,
      reason: reason || 'End of service excess',
      date: dateStr,
      costLost: costEstimate
    };

    setWastageLogs((prev) => [newLog, ...prev]);

    const wasteNotif = {
      id: `notif_${Date.now()}`,
      title: `Food Wastage Recorded: ${item} 🗑️`,
      message: `Logged ${qtyNum} ${unit} (${reason}). Databricks Lakehouse table updated.`,
      type: 'warning',
      time: 'Just now',
      unread: true
    };
    setNotifications((n) => [wasteNotif, ...n]);

    return true;
  };

  // Databricks Genie Ask
  const askGenie = (queryText) => {
    if (!queryText || !queryText.trim()) return;

    const userMsg = {
      id: `g_${Date.now()}_user`,
      sender: 'user',
      text: queryText
    };

    // Find best match in knowledge base
    const lower = queryText.toLowerCase();
    let matchedAnswer = null;
    let sqlQuery = 'SELECT * FROM orders JOIN wastage ON orders.food_id = wastage.food_item LIMIT 10;';

    for (const entry of GENIE_KNOWLEDGE_BASE) {
      if (entry.keywords.some((k) => lower.includes(k))) {
        matchedAnswer = entry.answer;
        if (lower.includes('dosa')) {
          sqlQuery = 'SELECT food_item, COUNT(*) * 1.15 AS projected_target FROM orders WHERE DAYOFWEEK(order_time) = 2 GROUP BY food_item HAVING food_item = "Masala Dosa"';
        } else if (lower.includes('waste')) {
          sqlQuery = 'SELECT food_item, SUM(quantity_wasted) AS total_kg, SUM(cost_lost) AS total_loss FROM wastage GROUP BY food_item ORDER BY total_kg DESC';
        } else if (lower.includes('peak') || lower.includes('busy')) {
          sqlQuery = 'SELECT pickup_slot, COUNT(order_id) AS total_orders FROM orders GROUP BY pickup_slot ORDER BY total_orders DESC';
        } else if (lower.includes('friday')) {
          sqlQuery = 'SELECT food_items.name, SUM(order_items.quantity) FROM order_items JOIN orders ON order_items.order_id = orders.order_id WHERE DAYOFWEEK(orders.order_time) = 6 GROUP BY food_items.name';
        } else if (lower.includes('rice')) {
          sqlQuery = 'SELECT ingredient, quantity, min_threshold FROM inventory WHERE ingredient = "Basmati Rice"';
        }
        break;
      }
    }

    if (!matchedAnswer) {
      matchedAnswer = `Databricks Genie analyzed your query against the Lakehouse tables (**orders**, **inventory**, **wastage**). Current kitchen throughput is running at **94.8% efficiency** with 4.8 min average wait time.`;
      sqlQuery = 'SELECT AVG(wait_time_minutes) AS avg_wait, COUNT(DISTINCT order_id) AS total_orders FROM orders;';
    }

    const genieMsg = {
      id: `g_${Date.now()}_genie`,
      sender: 'genie',
      text: matchedAnswer,
      sql: sqlQuery,
      confidence: '95.4% Confidence • Databricks Lakehouse SQL Query Executed',
      time: 'Just now'
    };

    setGenieHistory((prev) => [...prev, userMsg, genieMsg]);
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  return (
    <AppContext.Provider
      value={{
        activeRole,
        setActiveRole,
        menu,
        setMenu,
        cart,
        addToCart,
        updateCartQty,
        removeFromCart,
        clearCart,
        subtotal,
        discountAmount,
        finalTotal,
        cartItemCount,
        selectedSlot,
        setSelectedSlot,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        orders,
        placeOrder,
        advanceOrderStatus,
        activeStudentTab,
        setActiveStudentTab,
        selectedFoodDetail,
        setSelectedFoodDetail,
        isCartOpen,
        setIsCartOpen,
        lastPlacedOrder,
        setLastPlacedOrder,
        notifications,
        markAllNotificationsRead,
        inventory,
        restockInventoryItem,
        wastageLogs,
        recordWastage,
        forecastDay,
        setForecastDay,
        forecastData: ML_FORECAST_DATA[forecastDay] || ML_FORECAST_DATA['Monday'],
        genieHistory,
        askGenie
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
