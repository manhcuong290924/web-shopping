import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import Breadcrumb from '../components/Breadcrumb';
import OrderConfirmation from '../components/OrderConfirmation';
import '../styles/custom-layout.scss';

const OrderConfirmationPage = () => {
  const location = useLocation();
  const order = location.state?.order || { customerInfo: {}, cartItems: [], orderId: 'N/A' };

  useEffect(() => {
    // Hiện Dialogflow Messenger trên OrderConfirmationPage
    document.body.classList.add("show-dialogflow");

    // Ẩn khi rời trang
    return () => {
      document.body.classList.remove("show-dialogflow");
    };
  }, []);

  const breadcrumbItems = [
    { title: 'Trang chủ', path: '/', icon: '🏠' },
    { title: 'Xác nhận đơn hàng', path: '/xac-nhan-don-hang' },
  ];

  return (
    <div className="flex flex-col min-h-screen font-sans">
      <Header />
      <div className="flex flex-1" style={{ paddingTop: '120px' }}>
        <div className="content-wrapper flex flex-col md:flex-row">
          <Sidebar />
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