import React from 'react';
import ProductCard from './ProductCard';

const LapTopSection = ({ products = [] }) => {
  return (
    <div className="product-list max-w-[80rem] mx-auto py-2">
      <div className="product-frame bg-white border border-gray-200 rounded-lg shadow-md">
        <div className="flex justify-between items-center p-1.5 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-orange-500">LAPTOP</h2>
          {/* Không có nút "Xem tất cả >" */}
        </div>
        <div
          className="grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)', // 2 sản phẩm mỗi hàng trên mobile
            gap: '1rem',
            '@media (minWidth: 768px)': {
              gridTemplateColumns: 'repeat(4, 1fr)', // 4 sản phẩm mỗi hàng trên desktop
            },
          }}
        >
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

export default LapTopSection;