// client/src/components/MensClothingSection.jsx
import React from 'react';
import ProductCard from './ProductCard';

const MensClothingSection = ({ products = [] }) => {
  return (
    <div className="product-list max-w-[80rem] mx-auto py-2">
      <div className="product-frame bg-white border border-gray-200 rounded-lg shadow-md">
        <div className="flex justify-between items-center p-1.5 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-orange-500">QUẦN ÁO NAM</h2>
          {/* Không có nút "Xem tất cả >" */}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
          {products.length > 0 ? (
            products.map((product, index) => (
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