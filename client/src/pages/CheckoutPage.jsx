import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import Breadcrumb from '../components/Breadcrumb';
import ChatBotIcon from '../components/ChatBotIcon';
import CheckoutForm from '../components/CheckoutForm';
import '../styles/custom-layout.scss';

const CheckoutPage = () => {
  const navigate = useNavigate();

  // Lấy giỏ hàng từ localStorage
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Dữ liệu đường dẫn cho Breadcrumb
  const breadcrumbItems = [
    { title: 'Trang chủ', path: '/', icon: '🏠' },
    { title: 'Thanh toán', path: '/thanh-toan' },
  ];

  // Xử lý khi nhấn "Đặt hàng"
  const handleCheckout = (data) => {
    // Tạo mã đơn hàng ngẫu nhiên (có thể thay bằng logic từ backend)
    const orderId = Math.floor(Math.random() * 1000) + 400;

    // Dữ liệu đơn hàng
    const order = {
      customerInfo: data,
      cartItems,
      orderId,
    };

    // Xóa giỏ hàng sau khi đặt hàng
    localStorage.removeItem('cart');
    setCartItems([]);

    // Chuyển hướng đến trang xác nhận đơn hàng
    navigate('/xac-nhan-don-hang', { state: { order } });
  };

  return (
    <div className="flex flex-col min-h-screen font-sans">
      {/* Header */}
      <Header />

      <div className="flex flex-1">
        {/* Container chính để chứa Sidebar và nội dung, căn giữa */}
        <div className="content-wrapper flex flex-col md:flex-row">
          {/* Sidebar */}
          <Sidebar />

          {/* Nội dung chính */}
          <main className="flex-1 p-4 md:p-6">
            {/* Breadcrumb */}
            <Breadcrumb items={breadcrumbItems} />

            {/* Component CheckoutForm chứa toàn bộ giao diện thanh toán */}
            <CheckoutForm cartItems={cartItems} onCheckout={handleCheckout} />
          </main>
        </div>
      </div>

      {/* ChatBotIcon */}
      <ChatBotIcon />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default CheckoutPage;