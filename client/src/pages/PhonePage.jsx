import { useState, useEffect } from "react";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import Footer from "../components/Footer";
import Breadcrumb from "../components/Breadcrumb";
import PhoneSection from "../components/PhoneSection";
import Pagination from "../components/Pagination";
import ChatBotIcon from "../components/ChatBotIcon"; // Import ChatBotIcon
import { fetchPhoneProducts } from "../services/phoneService";
import "../styles/custom-layout.scss";

const PhonePage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [phoneProducts, setPhoneProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const productsPerPage = 12;

  useEffect(() => {
    const loadPhoneProducts = async () => {
      try {
        setLoading(true);
        const products = await fetchPhoneProducts();
        setPhoneProducts(products);
      } catch (error) {
        console.error("Error loading phone products:", error);
        setError(error.message || "Không thể tải danh sách sản phẩm.");
      } finally {
        setLoading(false);
      }
    };

    loadPhoneProducts();

    // Hiện Dialogflow Messenger trên PhonePage
    document.body.classList.add("show-dialogflow");

    // Ẩn khi rời trang
    return () => {
      document.body.classList.remove("show-dialogflow");
    };
  }, []);

  const totalPages = Math.ceil(phoneProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = phoneProducts.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const breadcrumbItems = [
    { title: "Trang chủ", path: "/", icon: "🏠" },
    { title: "Điện tử", path: "/dien-tu" },
    { title: "Điện thoại", path: "/dien-tu/dien-thoai" },
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
                <PhoneSection products={currentProducts} />
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

export default PhonePage;