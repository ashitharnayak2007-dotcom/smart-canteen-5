import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import StudentLayout from "./layouts/StudentLayout";
import StaffLayout   from "./layouts/StaffLayout";
import AdminLayout   from "./layouts/AdminLayout";
import LandingPage   from "./pages/LandingPage";
import LoginPage     from "./pages/LoginPage";
import StudentDashboard  from "./pages/student/StudentDashboard";
import MenuPage          from "./pages/student/MenuPage";
import CartPage          from "./pages/student/CartPage";
import CheckoutPage      from "./pages/student/CheckoutPage";
import OrderConfirmation from "./pages/student/OrderConfirmation";
import MyOrders          from "./pages/student/MyOrders";
import OrderTracking     from "./pages/student/OrderTracking";
import StaffDashboard    from "./pages/staff/StaffDashboard";
import LiveOrders        from "./pages/staff/LiveOrders";
import InventoryPage     from "./pages/staff/InventoryPage";
import DemandPrediction  from "./pages/staff/DemandPrediction";
import WastageEntry      from "./pages/staff/WastageEntry";
import GenieQA           from "./pages/staff/GenieQA";
import AdminDashboard    from "./pages/admin/AdminDashboard";
import AnalyticsPage     from "./pages/admin/AnalyticsPage";
import SalesReport       from "./pages/admin/SalesReport";
import WastageReport     from "./pages/admin/WastageReport";
import AdminGenie        from "./pages/admin/AdminGenie";

function ProtectedRoute({ children, role }) {
  const { isAuthenticated, user } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace/>;
  if (role && user?.role!==role) return <Navigate to="/login" replace/>;
  return children;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"     element={<LandingPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>

        <Route path="/student" element={<ProtectedRoute role="student"><StudentLayout/></ProtectedRoute>}>
          <Route index element={<Navigate to="/student/dashboard" replace/>}/>
          <Route path="dashboard"              element={<StudentDashboard/>}/>
          <Route path="menu"                   element={<MenuPage/>}/>
          <Route path="cart"                   element={<CartPage/>}/>
          <Route path="checkout"               element={<CheckoutPage/>}/>
          <Route path="confirmation/:orderId"  element={<OrderConfirmation/>}/>
          <Route path="orders"                 element={<MyOrders/>}/>
          <Route path="orders/:id"             element={<OrderTracking/>}/>
        </Route>

        <Route path="/staff" element={<ProtectedRoute role="staff"><StaffLayout/></ProtectedRoute>}>
          <Route index element={<Navigate to="/staff/dashboard" replace/>}/>
          <Route path="dashboard" element={<StaffDashboard/>}/>
          <Route path="orders"    element={<LiveOrders/>}/>
          <Route path="inventory" element={<InventoryPage/>}/>
          <Route path="demand"    element={<DemandPrediction/>}/>
          <Route path="wastage"   element={<WastageEntry/>}/>
          <Route path="genie"     element={<GenieQA/>}/>
        </Route>

        <Route path="/admin" element={<ProtectedRoute role="admin"><AdminLayout/></ProtectedRoute>}>
          <Route index element={<Navigate to="/admin/dashboard" replace/>}/>
          <Route path="dashboard" element={<AdminDashboard/>}/>
          <Route path="analytics" element={<AnalyticsPage/>}/>
          <Route path="sales"     element={<SalesReport/>}/>
          <Route path="wastage"   element={<WastageReport/>}/>
          <Route path="genie"     element={<AdminGenie/>}/>
        </Route>

        <Route path="*" element={<Navigate to="/" replace/>}/>
      </Routes>
    </BrowserRouter>
  );
}
