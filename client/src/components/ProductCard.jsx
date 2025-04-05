import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product, showRightBorder }) => {
  // Kiểm tra nếu product không tồn tại
  if (!product) {
    return <div className="product-card p-4 border-t border-gray-200">Sản phẩm không tồn tại</div>;
  }

  // Chuyển đổi tên thuộc tính từ mock data sang tên thuộc tính từ backend
  const { id, imageUrl, name, originalPrice, discountedPrice, discountPercentage } = product;

  // Hàm cuộn lên trên cùng khi nhấn vào sản phẩm
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Link to={`/products/${id}`} className="block" onClick={handleClick}>
      <div
        className={`product-card p-4 border-t border-gray-200 ${
          showRightBorder ? "border-r border-gray-200 md:border-r" : ""
        }`} // Chỉ hiển thị border trên desktop nếu showRightBorder là true
      >
        <div className="relative">
          <img
            src={imageUrl || "https://via.placeholder.com/150?text=No+Image"}
            alt={name || "Sản phẩm"}
            className="w-full h-48 object-contain"
            onError={(e) => (e.target.src = "https://via.placeholder.com/150?text=No+Image")}
          />
          {discountPercentage > 0 && (
            <span className="discount-badge">-{discountPercentage}%</span>
          )}
        </div>
        <div className="mt-2">
          <h3 className="text-base font-medium text-gray-800 leading-tight">
            {name || "Không có tên"}
          </h3>
          <div className="price mt-1">
            {discountPercentage > 0 ? (
              <>
                <span className="original text-gray-500">
                  {(originalPrice || 0).toLocaleString()} đ
                </span>
                <span className="discounted text-red-500 font-bold">
                  {(discountedPrice || 0).toLocaleString()} đ
                </span>
              </>
            ) : (
              <span className="discounted text-red-500 font-bold">
                {(originalPrice || 0).toLocaleString()} đ
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;