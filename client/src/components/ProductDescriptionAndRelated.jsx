import React, { useState, useEffect, useRef } from "react";
import ProductCard from "./ProductCard";
import { fetchProducts } from "../services/productService";
import "../styles/custom-layout.scss";

const ProductDescriptionAndRelated = ({ product }) => {
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);

  // Hàm lấy ngẫu nhiên 3 sản phẩm từ danh sách
  const getRandomProducts = (products, count) => {
    const shuffled = [...products].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  // Lấy danh sách sản phẩm từ backend
  useEffect(() => {
    const loadRelatedProducts = async () => {
      try {
        setLoading(true);
        const data = await fetchProducts(0, 1000);
        const products = data.content || [];
        const randomProducts = getRandomProducts(products, 3);
        setRelatedProducts(randomProducts);
      } catch (error) {
        console.error("Error loading related products:", error);
        setError(error.message || "Không thể tải danh sách sản phẩm tương tự.");
      } finally {
        setLoading(false);
      }
    };

    loadRelatedProducts();
  }, []);

  // Theo dõi vị trí sản phẩm hiện tại khi vuốt
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const handleScroll = () => {
      const scrollLeft = carousel.scrollLeft;
      const itemWidth = carousel.offsetWidth;
      const newIndex = Math.round(scrollLeft / itemWidth);
      setCurrentIndex(newIndex);
    };

    carousel.addEventListener("scroll", handleScroll);
    return () => carousel.removeEventListener("scroll", handleScroll);
  }, [relatedProducts]);

  return (
    <div className="mt-8">
      {/* Phần mô tả sản phẩm */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-orange-500 mb-4">MÔ TẢ</h2>
        <p className="text-gray-600">
          {product?.desc || "Không có mô tả cho sản phẩm này."}
        </p>
      </div>

      {/* Phần sản phẩm tương tự */}
      <div className="related-products">
        <h2 className="text-2xl font-bold text-orange-500 mb-4">
          SẢN PHẨM TƯƠNG TỰ
        </h2>
        <div className="carousel-container">
          <div ref={carouselRef} className="carousel-wrapper">
            {loading ? (
              <div className="p-1.5 text-gray-500">Đang tải sản phẩm...</div>
            ) : error ? (
              <div className="p-1.5 text-red-500">{error}</div>
            ) : relatedProducts.length > 0 ? (
              <div className="carousel">
                {relatedProducts.map((relatedProduct, index) => (
                  <div className="carousel-item" key={relatedProduct.id}>
                    <ProductCard
                      product={relatedProduct}
                      showRightBorder={false}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-1.5 text-gray-500">Không có sản phẩm tương tự</div>
            )}
          </div>
          {/* Chấm tròn pagination (chỉ hiển thị trên mobile) */}
          {relatedProducts.length > 0 && (
            <div className="carousel-dots md:hidden">
              {relatedProducts.map((_, index) => (
                <span
                  key={index}
                  className={`dot ${currentIndex === index ? "active" : ""}`}
                ></span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDescriptionAndRelated;