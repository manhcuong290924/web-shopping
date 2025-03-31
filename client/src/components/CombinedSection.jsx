// client/src/components/CombinedSection.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import { fetchHouseholdProducts } from "../services/householdService";
import { fetchStationeryProducts } from "../services/stationeryService";
import { fetchFootwearProducts } from "../services/footwearService";
import "../styles/custom-layout.scss";

const CombinedSection = () => {
  const [householdProducts, setHouseholdProducts] = useState([]); // Sản phẩm Gia dụng và Nội thất
  const [stationeryProducts, setStationeryProducts] = useState([]); // Sản phẩm Văn phòng phẩm
  const [footwearProducts, setFootwearProducts] = useState([]); // Sản phẩm Giày dép
  const [loading, setLoading] = useState(true); // Trạng thái loading
  const [error, setError] = useState(null); // Trạng thái lỗi

  // Hàm lấy ngẫu nhiên 3 sản phẩm từ danh sách
  const getRandomProducts = (products, count) => {
    const shuffled = [...products].sort(() => 0.5 - Math.random()); // Xáo trộn mảng
    return shuffled.slice(0, count); // Lấy count sản phẩm đầu tiên
  };

  // Lấy danh sách sản phẩm từ backend
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);

        // Lấy sản phẩm Gia dụng và Nội thất
        const householdData = await fetchHouseholdProducts();
        setHouseholdProducts(getRandomProducts(householdData, 3));

        // Lấy sản phẩm Văn phòng phẩm
        const stationeryData = await fetchStationeryProducts();
        setStationeryProducts(getRandomProducts(stationeryData, 3));

        // Lấy sản phẩm Giày dép
        const footwearData = await fetchFootwearProducts();
        setFootwearProducts(getRandomProducts(footwearData, 3));
      } catch (error) {
        console.error("Error loading combined products:", error);
        setError(error.message || "Không thể tải danh sách sản phẩm.");
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []); // Chỉ gọi API một lần khi component được mount

  return (
    <div className="combined-section max-w-[80rem] mx-auto py-2">
      <div className="combined-frame bg-white border border-gray-200 rounded-lg shadow-md">
        {/* Hiển thị ba danh mục cạnh nhau */}
        <div className="flex flex-col md:flex-row gap-4 p-1">
          {/* Gia dụng và Nội thất */}
          <div className="flex-1 flex flex-col">
            <h3 className="text-xl font-bold text-orange-500 mb-2 text-center">
              GIA DỤNG VÀ NỘI THẤT
            </h3>
            <div className="flex flex-col gap-1 flex-1">
              {loading ? (
                <div className="p-1.5 text-gray-500">Đang tải...</div>
              ) : error ? (
                <div className="p-1.5 text-red-500">{error}</div>
              ) : householdProducts.length > 0 ? (
                householdProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    showRightBorder={false}
                  />
                ))
              ) : (
                <div className="p-1.5 text-gray-500">Không có sản phẩm</div>
              )}
            </div>
          </div>

          {/* Văn phòng phẩm */}
          <div className="flex-1 flex flex-col">
            <h3 className="text-xl font-bold text-orange-500 mb-2 text-center">
              VĂN PHÒNG PHẨM
            </h3>
            <div className="flex flex-col gap-1 flex-1">
              {loading ? (
                <div className="p-1.5 text-gray-500">Đang tải...</div>
              ) : error ? (
                <div className="p-1.5 text-red-500">{error}</div>
              ) : stationeryProducts.length > 0 ? (
                stationeryProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    showRightBorder={false}
                  />
                ))
              ) : (
                <div className="p-1.5 text-gray-500">Không có sản phẩm</div>
              )}
            </div>
          </div>

          {/* Giày dép */}
          <div className="flex-1 flex flex-col relative">
            <h3 className="text-xl font-bold text-orange-500 mb-2 text-center">
              GIÀY DÉP
            </h3>
            <div className="view-all-container">
              <Link
                to="/products"
                className="text-orange-500 hover:underline text-sm"
              >
                Xem tất cả >
              </Link>
            </div>
            <div className="flex flex-col gap-1 flex-1">
              {loading ? (
                <div className="p-1.5 text-gray-500">Đang tải...</div>
              ) : error ? (
                <div className="p-1.5 text-red-500">{error}</div>
              ) : footwearProducts.length > 0 ? (
                footwearProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    showRightBorder={false}
                  />
                ))
              ) : (
                <div className="p-1.5 text-gray-500">Không có sản phẩm</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CombinedSection;