import { useState, useEffect } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import Breadcrumb from "../components/Breadcrumb";
import AppliancesSection from "../components/AppliancesSection";
import Pagination from "../components/Pagination";
import { fetchAppliancesProducts } from "../services/appliancesService";
import "../styles/custom-layout.scss";

const AppliancesPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [appliancesProducts, setAppliancesProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const productsPerPage = 12;

  useEffect(() => {
    const loadAppliancesProducts = async () => {
      try {
        setLoading(true);
        const products = await fetchAppliancesProducts();
        setAppliancesProducts(products);
      } catch (error) {
        console.error("Error loading appliances products:", error);
        setError(error.message || "Không thể tải danh sách sản phẩm.");
      } finally {
        setLoading(false);
      }
    };

    loadAppliancesProducts();

    // Hiện Dialogflow Messenger trên AppliancesPage
    document.body.classList.add("show-dialogflow");

    // Ẩn khi rời trang
    return () => {
      document.body.classList.remove("show-dialogflow");
    };
  }, []);

  const totalPages = Math.ceil(appliancesProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = appliancesProducts.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const breadcrumbItems = [
    { title: "Trang chủ", path: "/", icon: "🏠" },
    { title: "Gia dụng và nội thất", path: "/gia-dung-va-noi-that" },
    { title: "Đồ gia dụng", path: "/gia-dung-va-noi-that/do-gia-dung" },
  ];

  return (
    <div className="flex flex-col min-h-screen font-sans">
      <Header />
      <div className="flex flex-1" style={{ paddingTop: "120px" }}>
        <div className="content-wrapper flex flex-col md:flex-row">
          <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
          <main className="flex-1 p-4 md:p-6">
            <Breadcrumb items={breadcrumbItems} />
            {loading ? (
              <div className="p-1.5 text-gray-500">Đang tải sản phẩm...</div>
            ) : error ? (
              <div className="p-1.5 text-red-500">{error}</div>
            ) : (
              <>
                <AppliancesSection products={currentProducts} />
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
    </div>
  );
};

export default AppliancesPage;