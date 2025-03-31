// client/src/components/ElectronicSection.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import { fetchElectronicsProducts } from "../services/electronicsService"; // Import fetchElectronicsProducts

const ElectronicSection = ({ category }) => {
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

  return (
    <div className="product-list max-w-[80rem] mx-auto py-2">
      <div className="product-frame bg-white border border-gray-200 rounded-lg shadow-md">
        <div className="flex justify-between items-center p-1.5 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-orange-500">{category.toUpperCase()}</h2>
          <Link to="/dien-tu" className="text-orange-500 hover:underline text-sm">
            Xem tất cả >
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
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
  );
};

export default ElectronicSection;