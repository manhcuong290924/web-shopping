import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import { fetchFashionProducts } from "../services/fashionService"; // Import fetchFashionProducts
import "../styles/custom-layout.scss";
import thoitrang from "../styles/image/thoitrang.jpg"

const FashionSection = () => {
  const [displayedFashionProducts, setDisplayedFashionProducts] = useState([]); // Lưu danh sách sản phẩm hiển thị
  const [loading, setLoading] = useState(true); // Trạng thái loading
  const [error, setError] = useState(null); // Trạng thái lỗi
  const [currentIndex, setCurrentIndex] = useState(0); // Theo dõi sản phẩm hiện tại
  const carouselRef = useRef(null); // Ref để tham chiếu carousel

  // Hàm lấy ngẫu nhiên 6 sản phẩm từ danh sách
  const getRandomProducts = (products, count) => {
    const shuffled = [...products].sort(() => 0.5 - Math.random()); // Xáo trộn mảng
    return shuffled.slice(0, count); // Lấy count sản phẩm đầu tiên
  };

  // Lấy danh sách sản phẩm từ backend
  useEffect(() => {
    const loadFashionProducts = async () => {
      try {
        setLoading(true);
        const products = await fetchFashionProducts(); // Gọi API từ fashionService
        const randomProducts = getRandomProducts(products, 6); // Lấy ngẫu nhiên 6 sản phẩm
        setDisplayedFashionProducts(randomProducts);
      } catch (error) {
        console.error("Error loading fashion products:", error);
        setError(error.message || "Không thể tải danh sách sản phẩm.");
      } finally {
        setLoading(false);
      }
    };

    loadFashionProducts();
  }, []); // Chỉ gọi API một lần khi component được mount

  // Theo dõi vị trí sản phẩm hiện tại khi vuốt (chỉ áp dụng trên mobile)
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
  }, [displayedFashionProducts]);

  return (
    <div className="fashion-section max-w-[80rem] mx-auto py-2">
      <div className="fashion-frame bg-white border border-gray-200 rounded-lg shadow-md">
        <div className="flex justify-between items-center p-1.5 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-orange-500">THỜI TRANG</h2>
          <Link to="/thoi-trang" className="text-orange-500 hover:underline flex items-center gap-0.25">
            Xem tất cả >
            <svg
              className="w-1 h-1"
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
          </Link>
        </div>

        <div className="flex flex-col md:flex-row">
          {/* Ẩn banner trên mobile */}
          <div className="fashion-banner w-full md:w-1/4 p-1 hidden md:block">
            <div className="banner-content relative">
              <img
                src={thoitrang}
                alt="Fashion Banner"
                className="banner-image w-full h-auto object-cover rounded-lg"
              />
            </div>
          </div>

          <div className="fashion-products w-full p-1">
            <div className="carousel-container">
              <div ref={carouselRef} className="carousel-wrapper">
                {loading ? (
                  <div className="p-1.5 text-gray-500">Đang tải sản phẩm...</div>
                ) : error ? (
                  <div className="p-1.5 text-red-500">{error}</div>
                ) : displayedFashionProducts.length > 0 ? (
                  <div className="carousel">
                    {displayedFashionProducts.map((product, index) => (
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
              {displayedFashionProducts.length > 0 && (
                <div className="carousel-dots">
                  {displayedFashionProducts.map((_, index) => (
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
      </div>
    </div>
  );
};

export default FashionSection;