// client/src/pages/HomePage.jsx
import { useState } from "react";
import FeaturedProducts from "../components/FeaturedProducts";
import ProductList from "../components/ProductList";
import FashionSection from "../components/FashionSection";
import BabySection from "../components/BabySection";
import CombinedSection from "../components/CombinedSection";
import mockProducts from "../data/mockProducts";
import Header from "../components/Header";
import Slide from "../components/Slide";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import ChatBotIcon from "../components/ChatBotIcon"; // Đảm bảo đã import
import "../styles/custom-layout.scss";

const HomePage = () => {
  const [isOpen, setIsOpen] = useState(false);

  const featuredProducts = mockProducts["Sản phẩm nổi bật"] || [];
  const electronicsProducts = mockProducts["Điện tử"] || [];

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
            {/* Slide (Banner chính và quảng cáo) */}
            <Slide />

            {/* Featured Products */}
            <FeaturedProducts products={featuredProducts} />

            {/* Fashion Section */}
            <FashionSection />

            {/* Product List cho Điện tử */}
            <ProductList category="Điện tử" products={electronicsProducts} />

            {/* Baby Section */}
            <BabySection />

            {/* Combined Section (Gộp Gia dụng và Nội thất, Văn phòng phẩm, Giày dép) */}
            <CombinedSection />
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

export default HomePage;