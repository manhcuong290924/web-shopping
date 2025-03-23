// client/src/pages/AppliancesPage.jsx
import { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import Breadcrumb from "../components/Breadcrumb";
import ChatBotIcon from "../components/ChatBotIcon";
import AppliancesSection from "../components/AppliancesSection"; // Sử dụng AppliancesSection
import Pagination from "../components/Pagination";
import mockProducts from "../data/mockProducts";
import "../styles/custom-layout.scss";

const AppliancesPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12; // 12 sản phẩm mỗi trang

  // Lấy sản phẩm thuộc danh mục "Gia dụng và Nội thất"
  const householdProducts = mockProducts["Gia dụng và Nội thất"] || [];

  // Lọc sản phẩm chỉ thuộc danh mục con "Đồ gia dụng"
  const appliancesProducts = householdProducts.filter(product => product.subCategory === "Đồ gia dụng");

  // Tính toán số trang và sản phẩm hiển thị trên trang hiện tại
  const totalPages = Math.ceil(appliancesProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = appliancesProducts.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0); // Cuộn lên đầu trang khi chuyển trang
  };

  // Dữ liệu đường dẫn cho Breadcrumb
  const breadcrumbItems = [
    { title: "Trang chủ", path: "/", icon: "🏠" },
    { title: "Gia dụng và nội thất", path: "/gia-dung-va-noi-that" },
    { title: "Đồ gia dụng", path: "/gia-dung-va-noi-that/do-gia-dung" },
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

            {/* Danh sách sản phẩm */}
            <AppliancesSection products={currentProducts} />

            {/* Phân trang */}
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
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

export default AppliancesPage;