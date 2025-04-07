import { useState, useEffect } from "react";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import Footer from "../components/Footer";
import Breadcrumb from "../components/Breadcrumb";
import PromotionNewsContent from "../components/PromotionNewsContent";


const PromotionNewsPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Hiện Dialogflow Messenger trên PromotionNewsPage
    document.body.classList.add("show-dialogflow");

    // Ẩn khi rời trang
    return () => {
      document.body.classList.remove("show-dialogflow");
    };
  }, []);

  const breadcrumbItems = [
    { title: "Trang chủ", path: "/", icon: "🏠" },
    { title: "Tin tức Khuyến Mãi", path: "/tin-tuc-khuyen-mai" },
  ];

  return (
    <div className="flex flex-col min-h-screen font-sans">
      <Header />
      <div className="flex flex-1" style={{ paddingTop: "120px" }}>
        <div className="content-wrapper flex flex-col md:flex-row">
          {/* Thêm class SideBar-wrapper để điều khiển hiển thị SideBar */}
          <div className="SideBar-wrapper">
            <SideBar isOpen={isOpen} setIsOpen={setIsOpen} />
          </div>
          <main className="flex-1 p-4 md:p-6">
            <Breadcrumb items={breadcrumbItems} />
            <PromotionNewsContent />
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PromotionNewsPage;