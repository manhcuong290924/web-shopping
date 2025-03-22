// client/src/components/FashionSection.jsx
import React from "react";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import mockProducts from "../data/mockProducts";
import "../styles/custom-layout.scss";

const FashionSection = () => {
  const fashionProducts = mockProducts["Thời Trang"] || [];
  const displayedFashionProducts = fashionProducts.slice(0, 6); // Giới hạn tối đa 6 sản phẩm

  return (
    <div className="fashion-section max-w-[80rem] mx-auto py-2">
      <div className="fashion-frame bg-white border border-gray-200 rounded-lg shadow-md">
        <div className="flex justify-between items-center p-1.5 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-orange-500">THỜI TRANG</h2>
          <Link to="/products" className="text-orange-500 hover:underline flex items-center gap-0.25">
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
          <div className="fashion-banner w-full md:w-1/4 p-1">
            <div className="banner-content relative">
              <img
                src="https://picsum.photos/300/600?random=7"
                alt="Fashion Banner"
                className="banner-image w-full h-auto object-cover rounded-lg"
              />
              <div className="banner-overlay absolute top-0 left-0 w-full h-full flex flex-col justify-between p-1">
                <div className="banner-text text-white">
                  <p className="text-xl font-bold">EVERY WEEKLY SALE</p>
                  <p className="text-sm">WENESDAY | 12AM - MIDNIGHT</p>
                </div>
              </div>
            </div>
          </div>

          <div className="fashion-products w-full md:w-3/4 p-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-1">
              {displayedFashionProducts.length > 0 ? (
                displayedFashionProducts.map((product, index) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    showRightBorder={(index + 1) % 3 !== 0}
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

export default FashionSection;