import React from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import SideBar from "./components/SideBar";
import UserPage from "./pages/UserPage";
import ContactPage from "./pages/ContactPage";
import NewsPage from "./pages/NewsPage";
import ProductPage from "./pages/ProductPage";
import AdminOrders from "./pages/AdminOrders";
import AdminLoginPage from "./pages/AdminLoginPage";
import DashboardPage from "./pages/DashboardPage";

// Component để kiểm tra trạng thái đăng nhập admin
const ProtectedAdminRoutes = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    const admin = JSON.parse(sessionStorage.getItem("admin"));

    // Kiểm tra trạng thái đăng nhập
    if (!admin) {
      // Nếu không có admin trong sessionStorage, chuyển hướng về login
      navigate("/admin/login", { state: { from: location.pathname } });
    }
  }, [navigate, location]); // Giữ dependency để kiểm tra khi location thay đổi

  // Không xóa sessionStorage khi reload hoặc đóng tab nữa
  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AdminLoginPage />} />
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route
          path="/*"
          element={
            <ProtectedAdminRoutes>
              <div className="flex">
                <SideBar />
                <Routes>
                  <Route path="/dashboard" element={<DashboardPage />} />
                  <Route path="/users" element={<UserPage />} />
                  <Route path="/contacts" element={<ContactPage />} />
                  <Route path="/news" element={<NewsPage />} />
                  <Route path="/products" element={<ProductPage />} />
                  <Route path="/orders" element={<AdminOrders />} />
                </Routes>
              </div>
            </ProtectedAdminRoutes>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;