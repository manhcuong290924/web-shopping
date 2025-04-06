import React from "react";
import { Link } from "react-router-dom";

// Import hình ảnh mặc định từ thư mục assets
import noImage from "../styles/image/thoitrang.jpg"; // Đảm bảo bạn đã thêm file no-image.jpg vào thư mục src/assets

const ProductCard = ({ product, showRightBorder }) => {
  // Kiểm tra nếu product không tồn tại
  if (!product) {
    return (
      <div className="product-card p-4 border-t border-gray-200 text-gray-500">
        Sản phẩm không tồn tại
      </div>
    );
  }

  // Chuyển đổi tên thuộc tính từ mock data sang tên thuộc tính từ backend
  const {
    id,
    imageUrl,
    name,
    originalPrice = 0, // Giá trị mặc định nếu không có
    discountedPrice = 0, // Giá trị mặc định nếu không có
    discountPercentage = 0, // Giá trị mặc định nếu không có
  } = product;

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
            src={imageUrl || noImage} // Sử dụng hình ảnh cục bộ nếu imageUrl không tồn tại
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
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;