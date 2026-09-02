import { createContext, useContext, useState, useCallback } from "react";
const NotificationContext = createContext(null);
export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([]);
  const removeNotification = useCallback((id) => setNotifications(p => p.filter(n => n.id!==id)), []);
  const addNotification = useCallback(({ type="info", message, duration=4000 }) => {
    const id = Date.now() + Math.random();
    setNotifications(p => [...p, { id, type, message }]);
    if (duration > 0) setTimeout(() => removeNotification(id), duration);
    return id;
  }, [removeNotification]);
  return <NotificationContext.Provider value={{ notifications, addNotification, removeNotification }}>{children}</NotificationContext.Provider>;
}
export function useNotification() { const c = useContext(NotificationContext); if (!c) throw new Error("useNotification outside NotificationProvider"); return c; }
