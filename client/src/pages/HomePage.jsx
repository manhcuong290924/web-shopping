import { useState } from "react";
import FeaturedProducts from "../components/FeaturedProducts";
import ElectronicSection from "../components/ElectronicSection";
import FashionSection from "../components/FashionSection";
import BabySection from "../components/BabySection";
import CombinedSection from "../components/CombinedSection";
import mockProducts from "../data/mockProducts";
import Header from "../components/Header";
import Slide from "../components/Slide";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import "../styles/custom-layout.scss";

const HomePage = () => {
  const [isOpen, setIsOpen] = useState(false);

  const featuredProducts = mockProducts["Sản phẩm nổi bật"] || [];
  const electronicsProducts = mockProducts["Điện tử"] || [];

  return (
    <div className="flex flex-col min-h-screen font-sans">
      <Header />
      <div className="flex flex-1" style={{ paddingTop: '120px' }}>
        <div className="content-wrapper flex flex-col md:flex-row">
          <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
          <main className="flex-1 p-4 md:p-6">
            <Slide />
            <FeaturedProducts products={featuredProducts} />
            <FashionSection />
            <ElectronicSection category="Điện tử" products={electronicsProducts} />
            <BabySection />
            <CombinedSection />
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;