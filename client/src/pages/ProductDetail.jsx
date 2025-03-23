// client/src/pages/ProductDetail.jsx
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import Breadcrumb from "../components/Breadcrumb";
import ChatBotIcon from "../components/ChatBotIcon";
import ProductDescriptionAndRelated from "../components/ProductDescriptionAndRelated"; // Import ProductDescriptionAndRelated
import mockProducts from "../data/mockProducts";
import "../styles/custom-layout.scss";

const ProductDetail = () => {
  const { id } = useParams(); // Lấy id từ URL
  const [isOpen, setIsOpen] = useState(false);
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  // Tìm sản phẩm dựa trên id
  useEffect(() => {
    const allProducts = Object.values(mockProducts).flat(); // Gộp tất cả sản phẩm từ mockProducts
    const foundProduct = allProducts.find(p => p.id === parseInt(id));
    setProduct(foundProduct);
  }, [id]);

  // Tăng/giảm số lượng
  const handleIncrease = () => setQuantity(quantity + 1);
  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  // Dữ liệu đường dẫn cho Breadcrumb
  const breadcrumbItems = [
    { title: "Trang chủ", path: "/", icon: "🏠" },
    { title: product?.category || "Sản phẩm", path: `/${product?.category?.toLowerCase().replace(/\s+/g, '-')}` },
    { title: product?.name || "Chi tiết sản phẩm", path: `/products/${id}` },
  ];

  if (!product) {
    return <div className="text-center p-4">Không tìm thấy sản phẩm</div>;
  }

  return (
    <div className="flex flex-col min-h-screen font-sans">
      {/* Header */}
      <Header />

      <div className="flex flex-1">
        {/* Container chính để chứa Sidebar và nội dung, căn giữa */}
        <div className="content-wrapper flex flex-col md:flex-row">
          {/* Sidebar */}
          <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

          {/* Nội dung chính */}
          <main className="flex-1 p-4 md:p-6">
            {/* Breadcrumb */}
            <Breadcrumb items={breadcrumbItems} />

            {/* Chi tiết sản phẩm */}
            <div className="flex flex-col md:flex-row gap-6 mt-4">
              {/* Hình ảnh sản phẩm */}
              <div className="md:w-1/2">
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="w-full h-auto object-cover rounded-lg"
                />
              </div>

              {/* Thông tin sản phẩm */}
              <div className="md:w-1/2">
                <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>
                <div className="flex items-center gap-2 mt-2">
                  {product.discount_percentage > 0 ? (
                    <>
                      <p className="text-xl font-bold text-orange-500">
                        {product.discounted_price.toLocaleString('vi-VN')}đ
                      </p>
                      <p className="text-sm text-gray-500 line-through">
                        {product.original_price.toLocaleString('vi-VN')}đ
                      </p>
                      <p className="text-sm text-orange-500">
                        -{product.discount_percentage}%
                      </p>
                    </>
                  ) : (
                    <p className="text-xl font-bold text-orange-500">
                      {product.original_price === 0 ? "Liên hệ" : `${product.original_price.toLocaleString('vi-VN')}đ`}
                    </p>
                  )}
                </div>

                {/* Số lượng */}
                <div className="mt-4">
                  <p className="text-sm text-gray-600">Số lượng</p>
                  <div className="flex items-center gap-2 mt-1">
                    <button
                      onClick={handleDecrease}
                      className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded"
                      disabled={quantity <= 1}
                    >
                      -
                    </button>
                    <span className="w-12 text-center">{quantity}</span>
                    <button
                      onClick={handleIncrease}
                      className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Nút hành động */}
                <div className="mt-6 flex gap-4">
                  <button className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600">
                    Mua ngay
                  </button>
                  <button className="border border-orange-500 text-orange-500 px-6 py-2 rounded-lg hover:bg-orange-100">
                    Thêm vào giỏ hàng
                  </button>
                </div>
              </div>
            </div>

            {/* Phần mô tả và sản phẩm tương tự */}
            <ProductDescriptionAndRelated product={product} />
          </main>
        </div>
      </div>

      {/* ChatBotIcon */}
      <ChatBotIcon />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ProductDetail;