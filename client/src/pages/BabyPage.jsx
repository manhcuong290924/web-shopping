import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import Breadcrumb from "../components/Breadcrumb";
import BabyPageSection from "../components/BabyPageSection";
import Pagination from "../components/Pagination";
import ChatBotIcon from "../components/ChatBotIcon";
import { fetchBabyProducts } from "../services/babyService";
import "../styles/custom-layout.scss";

const BabyPage = () => {
  const { subCategory } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [babyProducts, setBabyProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const productsPerPage = 12;

  useEffect(() => {
    const loadBabyProducts = async () => {
      try {
        setLoading(true);
        const products = await fetchBabyProducts();
        setBabyProducts(products);

        const filtered = subCategory
          ? products.filter(
              (product) => product.subCategory === subCategory.replace(/-/g, " ")
            )
          : products;
        setFilteredProducts(filtered);
      } catch (error) {
        console.error("Error loading baby products:", error);
        setError(error.message || "Không thể tải danh sách sản phẩm.");
      } finally {
        setLoading(false);
      }
    };

    loadBabyProducts();

    document.body.classList.add("show-dialogflow");

    return () => {
      document.body.classList.remove("show-dialogflow");
    };
  }, [subCategory]);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const breadcrumbItems = [
    { title: "Trang chủ", path: "/", icon: "🏠" },
    { title: "Mẹ & bé", path: "/me-va-be" },
    ...(subCategory
      ? [
          {
            title: subCategory.replace(/-/g, " "),
            path: `/me-va-be/${subCategory}`,
          },
        ]
      : []),
  ];

  return (
    <div className="flex flex-col min-h-screen font-sans">
      <Header />
      <div className="flex flex-1" style={{ paddingTop: "120px" }}>
        <div className="content-wrapper flex flex-col md:flex-row">
          <div className="sidebar-wrapper">
            <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
          </div>
          <main className="flex-1 p-4 md:p-6">
            <Breadcrumb items={breadcrumbItems} />
            {loading ? (
              <div className="p-1.5 text-gray-500">Đang tải sản phẩm...</div>
            ) : error ? (
              <div className="p-1.5 text-red-500">{error}</div>
            ) : (
              <>
                <BabyPageSection
                  category={
                    subCategory ? subCategory.replace(/-/g, " ") : "Mẹ & bé"
                  }
                  products={currentProducts}
                />
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
      <ChatBotIcon />
    </div>
  );
};

export default BabyPage;