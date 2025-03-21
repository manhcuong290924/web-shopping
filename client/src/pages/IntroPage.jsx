import { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import IntroContent from "../components/IntroContent"; // Giả sử đây là nội dung chính của IntroPage
import Footer from "../components/Footer";
import "../styles/custom-layout.scss";

const IntroPage = () => {
  const [isOpen, setIsOpen] = useState(false);

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
            <IntroContent />
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default IntroPage;