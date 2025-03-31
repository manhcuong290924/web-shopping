// client/src/pages/CosmeticsPage.jsx
import { useState, useEffect } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import Breadcrumb from "../components/Breadcrumb";
import ChatBotIcon from "../components/ChatBotIcon";
import CosmeticsSection from "../components/CosmeticsSection";
import Pagination from "../components/Pagination";
import { fetchCosmeticsProducts } from "../services/cosmeticsService"; // Import fetchCosmeticsProducts
import "../styles/custom-layout.scss";

const CosmeticsPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [cosmeticsProducts, setCosmeticsProducts] = useState([]); // Lưu danh sách sản phẩm mỹ phẩm
  const [loading, setLoading] = useState(true); // Trạng thái loading
  const [error, setError] = useState(null); // Trạng thái lỗi
  const productsPerPage = 12; // 12 sản phẩm mỗi trang

  // Lấy danh sách sản phẩm mỹ phẩm từ backend
  useEffect(() => {
    const loadCosmeticsProducts = async () => {
      try {
        setLoading(true);
        const products = await fetchCosmeticsProducts(); // Gọi API từ cosmeticsService
        setCosmeticsProducts(products);
      } catch (error) {
        console.error("Error loading cosmetics products:", error);
        setError(error.message || "Không thể tải danh sách sản phẩm.");
      } finally {
        setLoading(false);
      }
    };

    loadCosmeticsProducts();
  }, []);

  // Tính toán số trang và sản phẩm hiển thị trên trang hiện tại
  const totalPages = Math.ceil(cosmeticsProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = cosmeticsProducts.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0); // Cuộn lên đầu trang khi chuyển trang
  };

  // Dữ liệu đường dẫn cho Breadcrumb
  const breadcrumbItems = [
    { title: "Trang chủ", path: "/", icon: "🏠" },
    { title: "Mỹ Phẩm", path: "/my-pham" },
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
                <CosmeticsSection products={currentProducts} />

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

export default CosmeticsPage;