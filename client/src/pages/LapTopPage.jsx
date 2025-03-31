// client/src/pages/LapTopPage.jsx
import { useState, useEffect } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import Breadcrumb from "../components/Breadcrumb";
import ChatBotIcon from "../components/ChatBotIcon";
import LapTopSection from "../components/LapTopSection";
import Pagination from "../components/Pagination";
import { fetchLaptopProducts } from "../services/laptopService"; // Import fetchLaptopProducts
import "../styles/custom-layout.scss";

const LapTopPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [laptopProducts, setLaptopProducts] = useState([]); // Lưu danh sách sản phẩm laptop
  const [loading, setLoading] = useState(true); // Trạng thái loading
  const [error, setError] = useState(null); // Trạng thái lỗi
  const productsPerPage = 12; // 12 sản phẩm mỗi trang

  // Lấy danh sách sản phẩm laptop từ backend
  useEffect(() => {
    const loadLaptopProducts = async () => {
      try {
        setLoading(true);
        const products = await fetchLaptopProducts(); // Gọi API từ laptopService
        setLaptopProducts(products);
      } catch (error) {
        console.error("Error loading laptop products:", error);
        setError(error.message || "Không thể tải danh sách sản phẩm.");
      } finally {
        setLoading(false);
      }
    };

    loadLaptopProducts();
  }, []);

  // Tính toán số trang và sản phẩm hiển thị trên trang hiện tại
  const totalPages = Math.ceil(laptopProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = laptopProducts.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0); // Cuộn lên đầu trang khi chuyển trang
  };

  // Dữ liệu đường dẫn cho Breadcrumb
  const breadcrumbItems = [
    { title: "Trang chủ", path: "/", icon: "🏠" },
    { title: "Điện tử", path: "/dien-tu" },
    { title: "Laptop", path: "/dien-tu/lap-top" },
  ];

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

            {/* Hiển thị trạng thái loading hoặc lỗi */}
            {loading ? (
              <div className="p-1.5 text-gray-500">Đang tải sản phẩm...</div>
            ) : error ? (
              <div className="p-1.5 text-red-500">{error}</div>
            ) : (
              <>
                {/* Danh sách sản phẩm */}
                <LapTopSection products={currentProducts} />

                {/* Phân trang */}
                {totalPages > 1 && (
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                )}
              </>
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

export default LapTopPage;