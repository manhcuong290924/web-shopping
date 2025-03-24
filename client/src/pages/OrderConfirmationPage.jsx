import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import Breadcrumb from '../components/Breadcrumb';
import ChatBotIcon from '../components/ChatBotIcon';
import OrderConfirmation from '../components/OrderConfirmation';
import '../styles/custom-layout.scss';

const OrderConfirmationPage = () => {
  const location = useLocation();
  const order = location.state?.order || { customerInfo: {}, cartItems: [], orderId: 'N/A' };

  // Dữ liệu đường dẫn cho Breadcrumb
  const breadcrumbItems = [
    { title: 'Trang chủ', path: '/', icon: '🏠' },
    { title: 'Xác nhận đơn hàng', path: '/xac-nhan-don-hang' },
  ];

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

            {/* Component OrderConfirmation chứa toàn bộ giao diện xác nhận đơn hàng */}
            <OrderConfirmation order={order} />
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

export default OrderConfirmationPage;