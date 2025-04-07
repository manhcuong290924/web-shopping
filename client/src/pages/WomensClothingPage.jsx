import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import Footer from "../components/Footer";
import Breadcrumb from "../components/Breadcrumb";
import WomensClothingSection from "../components/WomensClothingSection";
import Pagination from "../components/Pagination";
import { fetchFashionProducts } from "../services/fashionService"; // Thêm fetchFashionProducts


const WomensClothingPage = () => {
  const { subCategory } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [womensClothingProducts, setWomensClothingProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const productsPerPage = 12;

  useEffect(() => {
    const loadWomensClothingProducts = async () => {
      try {
        setLoading(true);
        const products = await fetchFashionProducts();
        const womensProducts = products.filter(
          (product) => product.subCategory === "Quần áo nữ"
        );
        setWomensClothingProducts(womensProducts);

        const filtered = subCategory
          ? womensProducts.filter(
              (product) => product.subCategory === subCategory.replace(/-/g, " ")
            )
          : womensProducts;
        setFilteredProducts(filtered);
      } catch (error) {
        console.error("Error loading women's clothing products:", error);
        setError(error.message || "Không thể tải danh sách sản phẩm.");
      } finally {
        setLoading(false);
      }
    };

    loadWomensClothingProducts();

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
    { title: "Thời trang", path: "/thoi-trang" },
    ...(subCategory
      ? [
          {
            title: subCategory.replace(/-/g, " "),
            path: `/thoi-trang/${subCategory}`,
          },
        ]
      : [{ title: "Quần áo nữ", path: "/thoi-trang/quan-ao-nu" }]),
  ];

  return (
    <div className="flex flex-col min-h-screen font-sans">
      <Header />
      <div className="flex flex-1" style={{ paddingTop: "120px" }}>
        <div className="content-wrapper flex flex-col md:flex-row">
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
                <WomensClothingSection
                  category={
                    subCategory ? subCategory.replace(/-/g, " ") : "Quần áo nữ"
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
    </div>
  );
};

export default WomensClothingPage;