// client/src/components/MensClothingSection.jsx
import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import { fetchFashionProducts } from "../services/fashionService"; // Import fetchFashionProducts

const MensClothingSection = () => {
  const [displayedProducts, setDisplayedProducts] = useState([]); // Lưu danh sách sản phẩm hiển thị
  const [loading, setLoading] = useState(true); // Trạng thái loading
  const [error, setError] = useState(null); // Trạng thái lỗi

  // Lấy danh sách sản phẩm từ backend
  useEffect(() => {
    const loadMensClothingProducts = async () => {
      try {
        setLoading(true);
        const products = await fetchFashionProducts(); // Gọi API từ fashionService

        // Lọc sản phẩm thuộc subCategory "Quần áo nam"
        const mensClothingProducts = products.filter(
          (product) => product.subCategory === "Quần áo nam"
        );
        setDisplayedProducts(mensClothingProducts);
      } catch (error) {
        console.error("Error loading men's clothing products:", error);
        setError(error.message || "Không thể tải danh sách sản phẩm.");
      } finally {
        setLoading(false);
      }
    };

    loadMensClothingProducts();
  }, []); // Chỉ gọi API một lần khi component được mount

  return (
    <div className="product-list max-w-[80rem] mx-auto py-2">
      <div className="product-frame bg-white border border-gray-200 rounded-lg shadow-md">
        <div className="flex justify-between items-center p-1.5 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-orange-500">QUẦN ÁO NAM</h2>
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

export default MensClothingSection;