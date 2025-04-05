import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import { fetchElectronicsProducts } from "../services/electronicsService"; // Import fetchElectronicsProducts

const ElectronicSection = ({ category }) => {
  const [displayedProducts, setDisplayedProducts] = useState([]); // Lưu danh sách sản phẩm hiển thị
  const [loading, setLoading] = useState(true); // Trạng thái loading
  const [error, setError] = useState(null); // Trạng thái lỗi
  const [currentIndex, setCurrentIndex] = useState(0); // Theo dõi sản phẩm hiện tại
  const carouselRef = useRef(null); // Ref để tham chiếu carousel

  // Hàm lấy ngẫu nhiên 4 sản phẩm từ danh sách
  const getRandomProducts = (products, count) => {
    const shuffled = [...products].sort(() => 0.5 - Math.random()); // Xáo trộn mảng
    return shuffled.slice(0, count); // Lấy count sản phẩm đầu tiên
  };

  // Lấy danh sách sản phẩm từ backend
  useEffect(() => {
    const loadElectronicsProducts = async () => {
      try {
        setLoading(true);
        const products = await fetchElectronicsProducts(); // Gọi API từ electronicsService
        const randomProducts = getRandomProducts(products, 4); // Lấy ngẫu nhiên 4 sản phẩm
        setDisplayedProducts(randomProducts);
      } catch (error) {
        console.error("Error loading electronics products:", error);
        setError(error.message || "Không thể tải danh sách sản phẩm.");
      } finally {
        setLoading(false);
      }
    };

    loadElectronicsProducts();
  }, []); // Chỉ gọi API một lần khi component được mount

  // Theo dõi vị trí sản phẩm hiện tại khi vuốt
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const handleScroll = () => {
      const scrollLeft = carousel.scrollLeft;
      const itemWidth = carousel.offsetWidth; // Chiều rộng của 1 item
      const newIndex = Math.round(scrollLeft / itemWidth); // Tính index dựa trên vị trí cuộn
      setCurrentIndex(newIndex);
    };

    carousel.addEventListener("scroll", handleScroll);
    return () => carousel.removeEventListener("scroll", handleScroll);
  }, [displayedProducts]);

  return (
    <div className="product-list max-w-[80rem] mx-auto py-2">
      <div className="product-frame bg-white border border-gray-200 rounded-lg shadow-md">
        <div className="flex justify-between items-center p-1.5 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-orange-500">{category.toUpperCase()}</h2>
          <Link to="/dien-tu" className="text-orange-500 hover:underline text-sm">
            Xem tất cả >
          </Link>
        </div>
        <div className="carousel-container">
          <div className="carousel-wrapper" ref={carouselRef}>
            {loading ? (
              <div className="p-1.5 text-gray-500">Đang tải sản phẩm...</div>
            ) : error ? (
              <div className="p-1.5 text-red-500">{error}</div>
            ) : displayedProducts.length > 0 ? (
              <div className="carousel">
                {displayedProducts.map((product, index) => (
                  <div className="carousel-item" key={product.id}>
                    <ProductCard
                      product={product}
                      showRightBorder={false} // Không cần border trên carousel
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-1.5 text-gray-500">Không có sản phẩm</div>
            )}
          </div>
          {/* Chấm tròn pagination (chỉ hiển thị trên mobile) */}
          {displayedProducts.length > 0 && (
            <div className="carousel-dots">
              {displayedProducts.map((_, index) => (
                <span
                  key={index}
                  className={`dot ${currentIndex === index ? 'active' : ''}`}
                ></span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ElectronicSection;