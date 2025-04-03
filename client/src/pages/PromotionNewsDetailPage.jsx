import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import Breadcrumb from "../components/Breadcrumb";
import PromotionNewsDetailContent from "../components/PromotionNewsDetailContent";
import { fetchNewsById } from "../services/newsService";
import "../styles/custom-layout.scss";

const PromotionNewsDetailPage = () => {
  const { id } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

    // Hiện Dialogflow Messenger trên PromotionNewsDetailPage
    document.body.classList.add("show-dialogflow");

    // Ẩn khi rời trang
    return () => {
      document.body.classList.remove("show-dialogflow");
    };
  }, [id]);

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
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen font-sans">
      <Header />
      <div className="flex flex-1" style={{ paddingTop: "120px" }}>
        <div className="content-wrapper flex flex-col md:flex-row">
          <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
          <main className="flex-1 p-4 md:p-6">
            <Breadcrumb items={breadcrumbItems} />
            <PromotionNewsDetailContent article={article} />
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PromotionNewsDetailPage;