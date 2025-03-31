// client/src/components/ProductDescriptionAndRelated.jsx
import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import { fetchProducts } from "../services/productService"; // Import fetchProducts

const ProductDescriptionAndRelated = ({ product }) => {
  const [relatedProducts, setRelatedProducts] = useState([]); // Lưu danh sách sản phẩm tương tự
  const [loading, setLoading] = useState(true); // Trạng thái loading
  const [error, setError] = useState(null); // Trạng thái lỗi

  // Hàm lấy ngẫu nhiên 3 sản phẩm từ danh sách
  const getRandomProducts = (products, count) => {
    const shuffled = [...products].sort(() => 0.5 - Math.random()); // Xáo trộn mảng
    return shuffled.slice(0, count); // Lấy count sản phẩm đầu tiên
  };

  // Lấy danh sách sản phẩm từ backend
  useEffect(() => {
    const loadRelatedProducts = async () => {
      try {
        setLoading(true);
        const data = await fetchProducts(0, 1000); // Lấy tất cả sản phẩm (có thể điều chỉnh size)
        const products = data.content || [];
        const randomProducts = getRandomProducts(products, 3); // Lấy ngẫu nhiên 3 sản phẩm
        setRelatedProducts(randomProducts);
      } catch (error) {
        console.error("Error loading related products:", error);
        setError(error.message || "Không thể tải danh sách sản phẩm tương tự.");
      } finally {
        setLoading(false);
      }
    };

    loadRelatedProducts();
  }, []); // Chỉ gọi API một lần khi component được mount

  return (
    <div className="mt-8">
      {/* Phần mô tả sản phẩm */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-orange-500 mb-4">MÔ TẢ</h2>
        <p className="text-gray-600">{product?.desc || "Không có mô tả cho sản phẩm này."}</p>
      </div>

      {/* Phần sản phẩm tương tự */}
      <div>
        <h2 className="text-2xl font-bold text-orange-500 mb-4">SẢN PHẨM TƯƠNG TỰ</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {loading ? (
            <div className="p-1.5 text-gray-500">Đang tải sản phẩm...</div>
          ) : error ? (
            <div className="p-1.5 text-red-500">{error}</div>
          ) : relatedProducts.length > 0 ? (
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