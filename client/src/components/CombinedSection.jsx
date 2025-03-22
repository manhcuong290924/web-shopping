// client/src/components/CombinedSection.jsx
import React from "react";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import mockProducts from "../data/mockProducts";
import "../styles/custom-layout.scss";

const CombinedSection = () => {
  const householdProducts = mockProducts["Gia dụng và Nội thất"] || [];
  const stationeryProducts = mockProducts["Văn phòng phẩm"] || [];
  const footwearProducts = mockProducts["Giày dép"] || [];

  // Giới hạn tối đa 3 sản phẩm cho mỗi danh mục
  const displayedHouseholdProducts = householdProducts.slice(0, 3);
  const displayedStationeryProducts = stationeryProducts.slice(0, 3);
  const displayedFootwearProducts = footwearProducts.slice(0, 3);

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
              {displayedHouseholdProducts.length > 0 ? (
                displayedHouseholdProducts.map((product, index) => (
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
              {displayedStationeryProducts.length > 0 ? (
                displayedStationeryProducts.map((product, index) => (
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
              {displayedFootwearProducts.length > 0 ? (
                displayedFootwearProducts.map((product, index) => (
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