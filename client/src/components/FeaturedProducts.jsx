// client/src/components/FeaturedProducts.jsx
import React, { useRef, useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import { fetchProducts } from "../services/productService"; // Import fetchProducts

const FeaturedProducts = () => {
  const scrollRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0); // Theo dõi sản phẩm đầu tiên trong khung nhìn
  const [displayedProducts, setDisplayedProducts] = useState([]); // Lưu danh sách sản phẩm hiển thị
  const [loading, setLoading] = useState(true); // Trạng thái loading
  const [error, setError] = useState(null); // Trạng thái lỗi

  // Hàm lấy ngẫu nhiên 6 sản phẩm từ danh sách
  const getRandomProducts = (products, count) => {
    const shuffled = [...products].sort(() => 0.5 - Math.random()); // Xáo trộn mảng
    return shuffled.slice(0, count); // Lấy count sản phẩm đầu tiên
  };

  // Lấy danh sách sản phẩm từ backend
  useEffect(() => {
    const loadFeaturedProducts = async () => {
      try {
        setLoading(true);
        const data = await fetchProducts(0, 1000); // Lấy tất cả sản phẩm (có thể điều chỉnh size)
        const products = data.content || [];
        const randomProducts = getRandomProducts(products, 6); // Lấy ngẫu nhiên 6 sản phẩm
        setDisplayedProducts(randomProducts);
      } catch (error) {
        console.error("Error loading featured products:", error);
        setError(error.message || "Không thể tải danh sách sản phẩm.");
      } finally {
        setLoading(false);
      }
    };

    loadFeaturedProducts();
  }, []); // Chỉ gọi API một lần khi component được mount

  const scrollToIndex = (index) => {
    if (scrollRef.current) {
      const productWidth = scrollRef.current.children[0].offsetWidth;
      const scrollPosition = index * productWidth;
      scrollRef.current.scrollTo({ left: scrollPosition, behavior: "smooth" });
      setCurrentIndex(index);
    }
  };

  const scrollLeft = () => {
    if (displayedProducts.length === 0) return;
    const newIndex = currentIndex === 0 ? displayedProducts.length - 4 : currentIndex - 1; // Cuộn 1 sản phẩm sang trái
    scrollToIndex(Math.max(0, newIndex)); // Đảm bảo không cuộn quá giới hạn
  };

  const scrollRight = () => {
    if (displayedProducts.length === 0) return;
    const newIndex = currentIndex === displayedProducts.length - 4 ? 0 : currentIndex + 1; // Cuộn 1 sản phẩm sang phải
    scrollToIndex(Math.min(displayedProducts.length - 4, newIndex)); // Đảm bảo không cuộn quá giới hạn
  };

  const scrollToProduct = (index) => {
    // Cuộn để sản phẩm được nhấn nằm trong khung nhìn
    const newIndex = Math.max(0, Math.min(index, displayedProducts.length - 4));
    scrollToIndex(newIndex);
  };

  return (
    <div className="featured-products max-w-[1350px] mx-auto py-8">
      <div className="product-frame bg-white border border-gray-200 rounded-lg shadow-md">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-orange-500">SẢN PHẨM NỔI BẬT</h2>
          <div className="flex gap-2">
            <button
              onClick={scrollLeft}
              className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              onClick={scrollRight}
              className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="relative overflow-hidden">
          <div
            ref={scrollRef}
            className="flex overflow-x-hidden scroll-smooth"
            style={{ width: "100%" }}
          >
            {loading ? (
              <div className="p-6 text-gray-500">Đang tải sản phẩm...</div>
            ) : error ? (
              <div className="p-6 text-red-500">{error}</div>
            ) : displayedProducts.length > 0 ? (
              displayedProducts.map((product, index) => (
                <div
                  key={product.id}
                  className={`flex-shrink-0 w-1/4 border-t border-gray-200 ${
                    index < displayedProducts.length - 1 ? "border-r border-gray-200" : ""
                  } cursor-pointer`}
                  onClick={() => scrollToProduct(index)}
                >
                  <ProductCard product={product} showRightBorder={false} />
                </div>
              ))
            ) : (
              <div className="p-6 text-gray-500">Không có sản phẩm nổi bật</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProducts;