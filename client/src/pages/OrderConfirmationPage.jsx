import React, { useEffect, useState } from "react"; // Thêm useState vào import
import { useLocation } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/SideBar";
import Footer from "../components/Footer";
import Breadcrumb from "../components/Breadcrumb";
import OrderConfirmation from "../components/OrderConfirmation";
import "../styles/custom-layout.scss";

const OrderConfirmationPage = () => {
  const [isOpen, setIsOpen] = useState(false); // Thêm trạng thái cho Sidebar
  const location = useLocation();
  const order = location.state?.order || { customerInfo: {}, cartItems: [], orderId: "N/A" };

  useEffect(() => {
    document.body.classList.add("show-dialogflow");

    return () => {
      document.body.classList.remove("show-dialogflow");
    };
  }, []);

  const breadcrumbItems = [
    { title: "Trang chủ", path: "/", icon: "🏠" },
    { title: "Xác nhận đơn hàng", path: "/xac-nhan-don-hang" },
  ];

  return (
    <div className="flex flex-col min-h-screen font-sans">
      <Header />
      <div className="flex flex-1" style={{ paddingTop: "120px" }}>
        <div className="content-wrapper flex flex-col md:flex-row">
          <div className="sidebar-wrapper">
            <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
          </div>
          <main className="flex-1 p-4 md:p-6">
            <Breadcrumb items={breadcrumbItems} />
            <OrderConfirmation order={order} />
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default OrderConfirmationPage;