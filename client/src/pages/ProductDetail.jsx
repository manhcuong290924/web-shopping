import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import Breadcrumb from "../components/Breadcrumb";
import ProductDescriptionAndRelated from "../components/ProductDescriptionAndRelated";
import ChatBotIcon from "../components/ChatBotIcon"; // Thêm ChatBotIcon
import { fetchProductById } from "../services/productService";
import "../styles/custom-layout.scss";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

    const loadProduct = async () => {
      try {
        setLoading(true);
        const foundProduct = await fetchProductById(id);
        setProduct(foundProduct);
      } catch (error) {
        console.error("Error loading product:", error);
        setError(error.message || "Không thể tải thông tin sản phẩm.");
      } finally {
        setLoading(false);
      }
    };

    loadProduct();

    document.body.classList.add("show-dialogflow");

    return () => {
      document.body.classList.remove("show-dialogflow");
    };
  }, [id]);

  const handleIncrease = () => setQuantity(quantity + 1);
  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const addToCartAndRedirect = () => {
    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.discountedPrice || product.originalPrice,
      quantity: quantity,
      image: product.imageUrl,
      category: product.category,
      subCategory: product.subCategory || "",
      discountPercentage: product.discountPercentage || 0,
    };

    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItem = existingCart.find((item) => item.id === cartItem.id);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      existingCart.push(cartItem);
    }

    localStorage.setItem("cart", JSON.stringify(existingCart));
    navigate("/gio-hang", {
      state: { notification: `"${product.name}" đã được thêm vào giỏ hàng.` },
    });
  };

  const checkLoginAndExecute = (action) => {
    if (!user) {
      alert("Vui lòng đăng nhập để thực hiện hành động này!");
      navigate("/dang-nhap");
    } else {
      action();
    }
  };

  const handleAddToCart = () => {
    checkLoginAndExecute(addToCartAndRedirect);
  };

  const handleBuyNow = () => {
    checkLoginAndExecute(addToCartAndRedirect);
  };

  const breadcrumbItems = [
    { title: "Trang chủ", path: "/", icon: "🏠" },
    {
      title: product?.category || "Sản phẩm",
      path: `/${product?.category?.toLowerCase().replace(/\s+/g, "-")}`,
    },
    { title: product?.name || "Chi tiết sản phẩm", path: `/products/${id}` },
  ];

  if (loading) {
    return <div className="text-center p-4">Đang tải sản phẩm...</div>;
  }

  if (error) {
    return <div className="text-center p-4 text-red-500">{error}</div>;
  }

  if (!product) {
    return <div className="text-center p-4">Không tìm thấy sản phẩm</div>;
  }

  return (
    <div className="flex flex-col min-h-screen font-sans">
      <Header />
      <div className="flex flex-1" style={{ paddingTop: "120px" }}>
        <div className="content-wrapper flex flex-col md:flex-row">
          <div className="sidebar-wrapper">
            <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
          </div>
          <main className="flex-1 p-4 md:p-6">
            <Breadcrumb items={breadcrumbItems} />
            <div className="flex flex-col md:flex-row gap-6 mt-4">
              <div className="md:w-1/2">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-auto object-cover rounded-lg"
                />
              </div>
              <div className="md:w-1/2">
                <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>
                <div className="flex items-center gap-2 mt-2">
                  {product.discountPercentage > 0 ? (
                    <>
                      <p className="text-xl font-bold text-orange-500">
                        {product.discountedPrice.toLocaleString("vi-VN")}đ
                      </p>
                      <p className="text-sm text-gray-500 line-through">
                        {product.originalPrice.toLocaleString("vi-VN")}đ
                      </p>
                      <p className="text-sm text-orange-500">
                        -{product.discountPercentage}%
                      </p>
                    </>
                  ) : (
                    <p className="text-xl font-bold text-orange-500">
                      {product.originalPrice === 0
                        ? "Liên hệ"
                        : `${product.originalPrice.toLocaleString("vi-VN")}đ`}
                    </p>
                  )}
                </div>
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
                <div className="mt-6 flex gap-4">
                  <button
                    onClick={handleBuyNow}
                    className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600"
                  >
                    Mua ngay
                  </button>
                  <button
                    onClick={handleAddToCart}
                    className="border border-orange-500 text-orange-500 px-6 py-2 rounded-lg hover:bg-orange-100"
                  >
                    Thêm vào giỏ hàng
                  </button>
                </div>
              </div>
            </div>
            <ProductDescriptionAndRelated product={product} />
          </main>
        </div>
      </div>
      <Footer />
      <ChatBotIcon />
    </div>
  );
};

export default ProductDetail;