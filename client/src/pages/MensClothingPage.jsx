import { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import Breadcrumb from "../components/Breadcrumb";
import ChatBotIcon from "../components/ChatBotIcon";
import MensClothingSection from "../components/MensClothingSection";
import Pagination from "../components/Pagination";
import mockProducts from "../data/mockProducts";
import "../styles/custom-layout.scss";

const MensClothingPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12; // 12 sản phẩm mỗi trang

  // Lấy sản phẩm thuộc danh mục "Thời Trang"
  const fashionProducts = mockProducts["Thời Trang"] || [];

  // Lọc sản phẩm chỉ thuộc danh mục con "Quần áo nam"
  const mensClothingProducts = fashionProducts.filter(product => product.subCategory === "Quần áo nam");

  // Tính toán số trang và sản phẩm hiển thị trên trang hiện tại
  const totalPages = Math.ceil(mensClothingProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = mensClothingProducts.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0); // Cuộn lên đầu trang khi chuyển trang
  };

  // Dữ liệu đường dẫn cho Breadcrumb
  const breadcrumbItems = [
    { title: "Trang chủ", path: "/", icon: "🏠" },
    { title: "Thời trang", path: "/thoi-trang" },
    { title: "Quần áo nam", path: "/thoi-trang/quan-ao-nam" },
  ];

  return (
    <div className="flex flex-col min-h-screen font-sans">
      {/* Header */}
      <Header />

      <div className="flex flex-1" style={{ paddingTop: '120px' }}>
        {/* Container chính để chứa Sidebar và nội dung, căn giữa */}
        <div className="content-wrapper flex flex-col md:flex-row">
          {/* Sidebar */}
          <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

          {/* Nội dung chính */}
          <main className="flex-1 p-4 md:p-6">
            {/* Breadcrumb */}
            <Breadcrumb items={breadcrumbItems} />

            {/* Danh sách sản phẩm */}
            <MensClothingSection products={currentProducts} />

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

export default MensClothingPage;