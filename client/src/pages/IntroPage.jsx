import { useState, useEffect } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import IntroContent from "../components/IntroContent";
import Footer from "../components/Footer";
import Breadcrumb from "../components/Breadcrumb";
import "../styles/custom-layout.scss";

const IntroPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Hiện Dialogflow Messenger trên IntroPage
    document.body.classList.add("show-dialogflow");

    // Ẩn khi rời trang
    return () => {
      document.body.classList.remove("show-dialogflow");
    };
  }, []);

  const breadcrumbItems = [
    { title: "Trang chủ", path: "/", icon: "🏠" },
    { title: "Giới thiệu", path: "/gioi-thieu" },
  ];

  return (
    <div className="flex flex-col min-h-screen font-sans">
      <Header />
      <div className="flex flex-1" style={{ paddingTop: '120px' }}>
        <div className="content-wrapper flex flex-col md:flex-row">
          <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
          <main className="flex-1 p-4 md:p-6">
            <Breadcrumb items={breadcrumbItems} />
            <IntroContent />
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default IntroPage;