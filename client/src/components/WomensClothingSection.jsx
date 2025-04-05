import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import { fetchFashionProducts } from "../services/fashionService";

const WomensClothingSection = ({ category = "QUẦN ÁO NỮ", products = [] }) => {
  const [displayedProducts, setDisplayedProducts] = useState(products);
  const [loading, setLoading] = useState(!products.length);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!products.length) {
      const loadWomensClothingProducts = async () => {
        try {
          setLoading(true);
          const fetchedProducts = await fetchFashionProducts();
          const womensClothingProducts = fetchedProducts.filter(
            (product) => product.subCategory === "Quần áo nữ"
          );
          setDisplayedProducts(womensClothingProducts);
        } catch (error) {
          console.error("Error loading women's clothing products:", error);
          setError(error.message || "Không thể tải danh sách sản phẩm.");
        } finally {
          setLoading(false);
        }
      };

      loadWomensClothingProducts();
    } else {
      setDisplayedProducts(products);
      setLoading(false);
    }
  }, [products]);

  return (
    <div className="product-list max-w-[80rem] mx-auto py-2">
      <div className="product-frame bg-white border border-gray-200 rounded-lg shadow-md">
        <div className="flex justify-between items-center p-1.5 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-orange-500">
            {category.toUpperCase()}
          </h2>
        </div>
        <div
          className="grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "1rem",
            "@media (minWidth: 768px)": {
              gridTemplateColumns: "repeat(4, 1fr)",
            },
          }}
        >
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

export default WomensClothingSection;