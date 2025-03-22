// client/src/pages/PromotionNewsDetailPage.jsx
import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import Breadcrumb from "../components/Breadcrumb";
import ChatBotIcon from "../components/ChatBotIcon";
import PromotionNewsDetailContent from "../components/PromotionNewsDetailContent";
import newsDetails from "../data/promotionNewsData"; // Import newsDetails
import "../styles/custom-layout.scss";

const PromotionNewsDetailPage = () => {
  const { id } = useParams(); // Lấy ID từ URL
  const [isOpen, setIsOpen] = useState(false);

  // Lấy dữ liệu bài viết dựa trên ID
  const article = newsDetails[id] || {
    title: "Bài viết không tồn tại",
    image: "",
    content: ["Không tìm thấy nội dung bài viết."],
  };

  // Dữ liệu đường dẫn cho Breadcrumb
  const breadcrumbItems = [
    { title: "Trang chủ", path: "/", icon: "🏠" },
    { title: "Tin tức Khuyến Mãi", path: "/tin-tuc-khuyen-mai" },
    { title: "Chi tiết", path: `/tin-tuc-khuyen-mai/${id}` },
  ];

  return (
    <div className="flex flex-col min-h-screen font-sans">
      {/* Header */}
      <Header />

      <div className="flex flex-1">
        {/* Container chính để chứa Sidebar và nội dung, căn giữa */}
        <div className="content-wrapper flex flex-col md:flex-row">
          {/* Sidebar */}
          <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

          {/* Nội dung chính */}
          <main className="flex-1 p-4 md:p-6">
            {/* Breadcrumb */}
            <Breadcrumb items={breadcrumbItems} />

            {/* Nội dung chi tiết tin tức khuyến mãi */}
            <PromotionNewsDetailContent article={article} />
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

export default PromotionNewsDetailPage;