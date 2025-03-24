import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import Breadcrumb from '../components/Breadcrumb';
import ChatBotIcon from '../components/ChatBotIcon';
import CartItem from '../components/CartItem';
import '../styles/custom-layout.scss';

const CartPage = () => {
  // Lấy giỏ hàng từ localStorage
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Lấy thông báo từ state của location
  const location = useLocation();
  const [notification, setNotification] = useState(location.state?.notification || "");

  // Ẩn thông báo sau 3 giây
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  // Cập nhật localStorage khi giỏ hàng thay đổi
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Dữ liệu đường dẫn cho Breadcrumb
  const breadcrumbItems = [
    { title: 'Trang chủ', path: '/', icon: '🏠' },
    { title: 'Giỏ hàng', path: '/gio-hang' },
  ];

  // Xử lý xóa sản phẩm
  const handleRemove = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  // Xử lý cập nhật số lượng
  const handleUpdateQuantity = (id, quantity) => {
    if (quantity < 1) return; // Không cho phép số lượng nhỏ hơn 1
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
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

            {/* Tiêu đề */}
            <h1 style={{ color: '#ff6200', fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>
              GIỎ HÀNG
            </h1>

            {/* Component CartItem chứa toàn bộ giao diện giỏ hàng */}
            <CartItem
              cartItems={cartItems}
              onRemove={handleRemove}
              onUpdateQuantity={handleUpdateQuantity}
              notification={notification}
            />
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

export default CartPage;