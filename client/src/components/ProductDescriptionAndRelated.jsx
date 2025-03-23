// client/src/components/ProductDescriptionAndRelated.jsx
import React from "react";
import ProductCard from "./ProductCard";
import mockProducts from "../data/mockProducts";

const ProductDescriptionAndRelated = ({ product }) => {
  // Lấy danh sách sản phẩm tương tự (cùng danh mục, trừ sản phẩm hiện tại)
  const relatedProducts = Object.values(mockProducts)
    .flat()
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 3); // Giới hạn tối đa 3 sản phẩm

  return (
    <div className="mt-8">
      {/* Phần mô tả sản phẩm */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-orange-500 mb-4">MÔ TẢ</h2>
        <p className="text-gray-600">{product.description || "Không có mô tả cho sản phẩm này."}</p>
      </div>

      {/* Phần sản phẩm tương tự */}
      <div>
        <h2 className="text-2xl font-bold text-orange-500 mb-4">SẢN PHẨM TƯƠNG TỰ</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {relatedProducts.length > 0 ? (
            relatedProducts.map((relatedProduct, index) => (
              <ProductCard
                key={relatedProduct.id}
                product={relatedProduct}
                showRightBorder={(index + 1) % 3 !== 0}
              />
            ))
          ) : (
            <div className="p-1.5 text-gray-500">Không có sản phẩm tương tự</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDescriptionAndRelated;