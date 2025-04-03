import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import Breadcrumb from '../components/Breadcrumb';
import CheckoutForm from '../components/CheckoutForm';
import '../styles/custom-layout.scss';

const CheckoutPage = () => {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    // Hiện Dialogflow Messenger trên CheckoutPage
    document.body.classList.add("show-dialogflow");

    // Ẩn khi rời trang
    return () => {
      document.body.classList.remove("show-dialogflow");
    };
  }, []);

  const breadcrumbItems = [
    { title: 'Trang chủ', path: '/', icon: '🏠' },
    { title: 'Thanh toán', path: '/thanh-toan' },
  ];

  const handleCheckout = (data) => {
    const orderId = Math.floor(Math.random() * 1000) + 400;
    const order = {
      customerInfo: data,
      cartItems,
      orderId,
    };

    localStorage.removeItem('cart');
    setCartItems([]);

    navigate('/xac-nhan-don-hang', { state: { order } });
  };

  return (
    <div className="flex flex-col min-h-screen font-sans">
      <Header />
      <div className="flex flex-1" style={{ paddingTop: '120px' }}>
        <div className="content-wrapper flex flex-col md:flex-row">
          <Sidebar />
          <main className="flex-1 p-4 md:p-6">
            <Breadcrumb items={breadcrumbItems} />
            <CheckoutForm cartItems={cartItems} onCheckout={handleCheckout} />
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CheckoutPage;