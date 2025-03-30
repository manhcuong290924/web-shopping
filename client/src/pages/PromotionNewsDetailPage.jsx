// client/src/pages/PromotionNewsDetailPage.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import Breadcrumb from "../components/Breadcrumb";
import ChatBotIcon from "../components/ChatBotIcon";
import PromotionNewsDetailContent from "../components/PromotionNewsDetailContent";
import { fetchNewsById } from "../services/newsService"; // Import API từ service
import "../styles/custom-layout.scss";

const PromotionNewsDetailPage = () => {
  const { id } = useParams(); // Lấy ID từ URL
  const [isOpen, setIsOpen] = useState(false);
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Lấy dữ liệu bài viết từ API dựa trên ID
  useEffect(() => {
    const loadNewsDetail = async () => {
      try {
        const data = await fetchNewsById(id);
        setArticle(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    loadNewsDetail();
  }, [id]);

  // Dữ liệu đường dẫn cho Breadcrumb
  const breadcrumbItems = [
    { title: "Trang chủ", path: "/", icon: "🏠" },
    { title: "Tin tức Khuyến Mãi", path: "/tin-tuc-khuyen-mai" },
    { title: "Chi tiết", path: `/tin-tuc-khuyen-mai/${id}` },
  ];

  if (loading) {
    return <div className="flex flex-col min-h-screen font-sans">Đang tải...</div>;
  }

  if (error) {
    return (
      <div className="flex flex-col min-h-screen font-sans">
        <Header />
        <div className="flex flex-1" style={{ paddingTop: "120px" }}>
          <div className="content-wrapper flex flex-col md:flex-row">
            <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
            <main className="flex-1 p-4 md:p-6">
              <Breadcrumb items={breadcrumbItems} />
              <div>Lỗi: {error}</div>
            </main>
          </div>
        </div>
        <ChatBotIcon />
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen font-sans">
      {/* Header */}
      <Header />

      <div className="flex flex-1" style={{ paddingTop: "120px" }}>
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