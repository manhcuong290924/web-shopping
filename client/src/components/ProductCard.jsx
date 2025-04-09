import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import noImage from "../styles/image/thoitrang.jpg";

const ProductCard = ({ product, showRightBorder }) => {
  const [soldQuantity, setSoldQuantity] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSoldQuantity = async () => {
      if (!product || !product.id) return;

      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:8080/api/orders/sold-quantity/${product.id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setSoldQuantity(response.data.soldQuantity || 0);
      } catch (err) {
        console.error(`Error fetching sold quantity for product ${product.id}:`, err);
        setError("Không thể tải số lượng đã bán.");
        setSoldQuantity(0); // Mặc định là 0 nếu lỗi
      } finally {
        setLoading(false);
      }
    };

    fetchSoldQuantity();
  }, [product?.id]); // Gọi lại khi product.id thay đổi

  if (!product) {
    return (
      <div className="product-card p-4 border-t border-gray-200 text-gray-500">
        Sản phẩm không tồn tại
      </div>
    );
  }

  const {
    id,
    imageUrl,
    name,
    originalPrice = 0,
    discountedPrice = 0,
    discountPercentage = 0,
    quantity = 0,
  } = product;

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Link to={`/products/${id}`} className="block" onClick={handleClick}>
      <div
        className={`product-card p-4 border-t border-gray-200 ${
          showRightBorder ? "border-r border-gray-200 md:border-r" : ""
        }`}
      >
        <div className="relative">
          <img
            src={imageUrl || noImage}
            alt={name || "Sản phẩm"}
            className="w-full h-48 object-contain"
          />
          {discountPercentage > 0 && (
            <span className="discount-badge absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
              -{discountPercentage}%
            </span>
          )}
        </div>
        <div className="mt-2">
          <h3 className="text-base font-medium text-gray-800 leading-tight line-clamp-2">
            {name || "Không có tên"}
          </h3>
          <div className="price mt-1 flex items-center gap-2">
            {discountPercentage > 0 ? (
              <>
                <span className="original text-gray-500 line-through text-sm">
                  {originalPrice.toLocaleString("vi-VN")} đ
                </span>
                <span className="discounted text-red-500 font-bold">
                  {discountedPrice.toLocaleString("vi-VN")} đ
                </span>
              </>
            ) : (
              <span className="discounted text-red-500 font-bold">
                {originalPrice.toLocaleString("vi-VN")} đ
              </span>
            )}
          </div>
          <div className="quantity mt-1 text-sm text-gray-600">
            Số lượng trong kho: {quantity.toLocaleString("vi-VN")}
          </div>
          <div className="sold-quantity mt-1 text-sm text-gray-600">
            Đã bán: {loading ? "Đang tải..." : soldQuantity.toLocaleString("vi-VN")}
            {error && <span className="text-red-500 ml-2">{error}</span>}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;