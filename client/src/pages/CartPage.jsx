import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import Breadcrumb from '../components/Breadcrumb';
import CartItem from '../components/CartItem';
import '../styles/custom-layout.scss';

const CartPage = () => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const location = useLocation();
  const [notification, setNotification] = useState(location.state?.notification || "");

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'cart') {
        const updatedCart = e.newValue ? JSON.parse(e.newValue) : [];
        setCartItems(updatedCart);
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Thêm logic hiển thị Dialogflow Messenger
  useEffect(() => {
    document.body.classList.add("show-dialogflow");
    return () => {
      document.body.classList.remove("show-dialogflow");
    };
  }, []);

  const breadcrumbItems = [
    { title: 'Trang chủ', path: '/', icon: '🏠' },
    { title: 'Giỏ hàng', path: '/gio-hang' },
  ];

  const handleRemove = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const handleUpdateQuantity = (id, quantity) => {
    if (quantity < 1) return;
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const refreshCart = () => {
    const savedCart = localStorage.getItem('cart');
    setCartItems(savedCart ? JSON.parse(savedCart) : []);
  };

  return (
    <div className="flex flex-col min-h-screen font-sans">
      <Header />
      <div className="flex flex-1" style={{ paddingTop: '120px' }}>
        <div className="content-wrapper flex flex-col md:flex-row">
          <Sidebar />
          <main className="flex-1 p-4 md:p-6">
            <Breadcrumb items={breadcrumbItems} />
            <h1 style={{ color: '#ff6200', fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>
              GIỎ HÀNG
            </h1>
            <CartItem
              cartItems={cartItems}
              onRemove={handleRemove}
              onUpdateQuantity={handleUpdateQuantity}
              onRefreshCart={refreshCart}
              notification={notification}
            />
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CartPage;