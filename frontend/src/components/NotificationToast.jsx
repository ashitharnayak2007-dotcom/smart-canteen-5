import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react";
import { useNotification } from "../context/NotificationContext";
const ICONS = {
  success: <CheckCircle size={18} color="#10B981" />,
  error:   <AlertCircle size={18} color="#EF4444" />,
  warning: <AlertTriangle size={18} color="#F59E0B" />,
  info:    <Info size={18} color="#3B82F6" />,
};
export default function NotificationToast() {
  const { notifications, removeNotification } = useNotification();
  return (
    <div className="sc-toast-container">
      {notifications.map(n => (
        <div key={n.id} className={`sc-toast sc-toast-${n.type}`}>
          {ICONS[n.type]}
          <span className="sc-toast-msg">{n.message}</span>
          <button className="sc-toast-close" onClick={() => removeNotification(n.id)}><X size={14}/></button>
        </div>
      ))}
    </div>
  );
}
