import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import Breadcrumb from "../components/Breadcrumb";
import CheckoutForm from "../components/CheckoutForm";
import ChatBotIcon from "../components/ChatBotIcon"; // Thêm ChatBotIcon
import "../styles/custom-layout.scss";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false); // Thêm trạng thái cho Sidebar
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    document.body.classList.add("show-dialogflow");

    return () => {
      document.body.classList.remove("show-dialogflow");
    };
  }, []);

  const breadcrumbItems = [
    { title: "Trang chủ", path: "/", icon: "🏠" },
    { title: "Thanh toán", path: "/thanh-toan" },
  ];

  const handleCheckout = (data) => {
    const orderId = Math.floor(Math.random() * 1000) + 400;
    const order = {
      customerInfo: data,
      cartItems,
      orderId,
    };

    localStorage.removeItem("cart");
    setCartItems([]);

    navigate("/xac-nhan-don-hang", { state: { order } });
  };

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
            <CheckoutForm cartItems={cartItems} onCheckout={handleCheckout} />
          </main>
        </div>
      </div>
      <Footer />
      <ChatBotIcon />
    </div>
  );
};

export default CheckoutPage;