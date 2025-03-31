// client/src/components/BabySection.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import { fetchBabyProducts } from "../services/babyService"; // Import fetchBabyProducts
import "../styles/custom-layout.scss";

const BabySection = () => {
  const [displayedProducts, setDisplayedProducts] = useState([]); // Lưu danh sách sản phẩm hiển thị
  const [loading, setLoading] = useState(true); // Trạng thái loading
  const [error, setError] = useState(null); // Trạng thái lỗi

  // Hàm lấy ngẫu nhiên 4 sản phẩm từ danh sách
  const getRandomProducts = (products, count) => {
    const shuffled = [...products].sort(() => 0.5 - Math.random()); // Xáo trộn mảng
    return shuffled.slice(0, count); // Lấy count sản phẩm đầu tiên
  };

  // Lấy danh sách sản phẩm từ backend
  useEffect(() => {
    const loadBabyProducts = async () => {
      try {
        setLoading(true);
        const products = await fetchBabyProducts(); // Gọi API từ babyService
        const randomProducts = getRandomProducts(products, 4); // Lấy ngẫu nhiên 4 sản phẩm
        setDisplayedProducts(randomProducts);
      } catch (error) {
        console.error("Error loading baby products:", error);
        setError(error.message || "Không thể tải danh sách sản phẩm.");
      } finally {
        setLoading(false);
      }
    };

    loadBabyProducts();
  }, []); // Chỉ gọi API một lần khi component được mount

  return (
    <div className="baby-section max-w-[80rem] mx-auto py-2">
      <div className="baby-frame bg-white border border-gray-200 rounded-lg shadow-md">
        <div className="flex justify-between items-center p-1.5 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-orange-500">MẸ VÀ BÉ</h2>
          <Link to="/me-va-be" className="text-orange-500 hover:underline flex items-center gap-0.25">
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

        <div className="p-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-1">
            {loading ? (
              <div className="p-1.5 text-gray-500">Đang tải sản phẩm...</div>
            ) : error ? (
              <div className="p-1.5 text-red-500">{error}</div>
            ) : displayedProducts.length > 0 ? (
              displayedProducts.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  showRightBorder={(index + 1) % 4 !== 0}
                />
              ))
            ) : (
              <div className="p-1.5 text-gray-500">Không có sản phẩm</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BabySection;