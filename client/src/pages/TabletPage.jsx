import { useState, useEffect } from "react";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import Footer from "../components/Footer";
import Breadcrumb from "../components/Breadcrumb";
import TabletSection from "../components/TabletSection";
import Pagination from "../components/Pagination";
import ChatBotIcon from "../components/ChatBotIcon"; // Import ChatBotIcon
import { fetchTabletProducts } from "../services/tabletService";
import "../styles/custom-layout.scss";

const TabletPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [tabletProducts, setTabletProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const productsPerPage = 12;

  useEffect(() => {
    const loadTabletProducts = async () => {
      try {
        setLoading(true);
        const products = await fetchTabletProducts();
        setTabletProducts(products);
      } catch (error) {
        console.error("Error loading tablet products:", error);
        setError(error.message || "Không thể tải danh sách sản phẩm.");
      } finally {
        setLoading(false);
      }
    };

    loadTabletProducts();

    // Hiện Dialogflow Messenger trên TabletPage
    document.body.classList.add("show-dialogflow");

    // Ẩn khi rời trang
    return () => {
      document.body.classList.remove("show-dialogflow");
    };
  }, []);

  const totalPages = Math.ceil(tabletProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = tabletProducts.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const breadcrumbItems = [
    { title: "Trang chủ", path: "/", icon: "🏠" },
    { title: "Điện tử", path: "/dien-tu" },
    { title: "Máy tính bảng", path: "/dien-tu/may-tinh-bang" },
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
            {loading ? (
              <div className="p-1.5 text-gray-500">Đang tải sản phẩm...</div>
            ) : error ? (
              <div className="p-1.5 text-red-500">{error}</div>
            ) : (
              <>
                <TabletSection products={currentProducts} />
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
      <Footer />
      <ChatBotIcon /> {/* Thêm ChatBotIcon vào đây */}
    </div>
  );
};

export default TabletPage;