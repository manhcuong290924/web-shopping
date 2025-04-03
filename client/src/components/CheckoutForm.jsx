import React, { useState } from "react";
import { createOrder } from "../services/orderService";

const CheckoutForm = ({ cartItems, onCheckout }) => {
  // Tính tổng tiền
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // State để quản lý thông tin khách hàng
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
    note: "",
  });

  // State để quản lý thông báo lỗi
  const [error, setError] = useState("");

  // State để quản lý phương thức thanh toán
  const [paymentMethod, setPaymentMethod] = useState("cod"); // Mặc định là "Thanh toán khi nhận hàng"

  // Xử lý thay đổi input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Xóa thông báo lỗi khi người dùng bắt đầu nhập
    setError("");
  };

  // Xử lý thay đổi phương thức thanh toán
  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  // Kiểm tra các trường bắt buộc
  const validateForm = () => {
    if (!formData.name.trim()) {
      return "Vui lòng nhập họ và tên.";
    }
    if (!formData.address.trim()) {
      return "Vui lòng nhập địa chỉ.";
    }
    if (!formData.phone.trim()) {
      return "Vui lòng nhập số điện thoại.";
    }
    return ""; // Không có lỗi
  };

  // Xử lý khi nhấn "Đặt hàng"
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Kiểm tra các trường bắt buộc
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      // Gộp các sản phẩm trùng nhau trong cartItems
      const productMap = new Map();
      cartItems.forEach((item) => {
        const key = item.id; // Sử dụng id để xác định sản phẩm trùng nhau
        if (productMap.has(key)) {
          // Nếu sản phẩm đã tồn tại, tăng quantity
          const existingProduct = productMap.get(key);
          existingProduct.quantity += item.quantity;
        } else {
          // Nếu sản phẩm chưa tồn tại, thêm vào map
          productMap.set(key, {
            productName: item.name,
            category: item.category || "Không xác định",
            subCategory: item.subCategory || "",
            imageUrl: item.image,
            discountedPrice: item.price,
            discountPercentage: item.discountPercentage || 0,
            quantity: item.quantity,
          });
        }
      });

      // Chuyển productMap thành danh sách products
      const products = Array.from(productMap.values());

      // Tạo dữ liệu đơn hàng
      const orderData = {
        email: formData.email,
        firstName: formData.name.split(" ")[0], // Lấy firstName từ name
        lastName: formData.name.split(" ").slice(1).join(" "), // Lấy lastName từ name
        phone: formData.phone,
        address: formData.address,
        note: formData.note,
        products: products,
        paymentMethod: paymentMethod === "cod" ? "Thanh toán khi nhận hàng" : "Chuyển khoản",
        orderStatus: "Chờ xử lý",
      };

      // Gửi yêu cầu tạo đơn hàng
      await createOrder(orderData);

      // Xóa giỏ hàng sau khi đặt hàng thành công
      localStorage.removeItem("cart");

      // Gọi hàm onCheckout để thông báo đặt hàng thành công
      onCheckout({ ...formData, paymentMethod });
    } catch (error) {
      console.error("Error creating order:", error);
      setError(error.message || "Không thể tạo đơn hàng. Vui lòng thử lại!");
    }
  };

  return (
    <div>
      <h1 style={{ color: "#ff6200", fontSize: "24px", fontWeight: "bold", marginBottom: "20px" }}>
        THANH TOÁN
      </h1>

      {/* Thông báo lỗi (nếu có) */}
      {error && (
        <div
          style={{
            backgroundColor: "#ffe6e6",
            padding: "10px",
            marginBottom: "20px",
            border: "1px solid #ff9999",
            borderRadius: "4px",
            color: "#ff3333",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <span>⚠</span>
          <span>{error}</span>
        </div>
      )}

      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        {/* Thông tin thanh toán */}
        <div style={{ flex: "1", minWidth: "300px" }}>
          <h2 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "10px" }}>
            Thông tin thanh toán
          </h2>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: "15px" }}>
              <label style={{ display: "block", fontSize: "14px", color: "#333", marginBottom: "5px" }}>
                Họ và Tên * <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Nhập họ và tên của bạn"
                style={{
                  width: "100%",
                  padding: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  fontSize: "14px",
                }}
                required
              />
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label style={{ display: "block", fontSize: "14px", color: "#333", marginBottom: "5px" }}>
                Địa chỉ * <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Nhập địa chỉ của bạn"
                style={{
                  width: "100%",
                  padding: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  fontSize: "14px",
                }}
                required
              />
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label style={{ display: "block", fontSize: "14px", color: "#333", marginBottom: "5px" }}>
                Số điện thoại * <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Nhập số điện thoại của bạn"
                style={{
                  width: "100%",
                  padding: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  fontSize: "14px",
                }}
                required
              />
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label style={{ display: "block", fontSize: "14px", color: "#333", marginBottom: "5px" }}>
                Địa Chỉ Email (tùy chọn)
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Nhập địa chỉ email của bạn (tùy chọn)"
                style={{
                  width: "100%",
                  padding: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  fontSize: "14px",
                }}
              />
            </div>

            <div style={{ marginBottom: "15px" }}>
              <h2 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "10px" }}>
                Thông tin bổ sung
              </h2>
              <label style={{ display: "block", fontSize: "14px", color: "#333", marginBottom: "5px" }}>
                Yêu cầu thêm của bạn về giao hàng...
              </label>
              <textarea
                name="note"
                value={formData.note}
                onChange={handleInputChange}
                placeholder="Nhập yêu cầu thêm của bạn (nếu có)"
                style={{
                  width: "100%",
                  padding: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  fontSize: "14px",
                  minHeight: "100px",
                }}
              />
            </div>
          </form>
        </div>

        {/* Đơn hàng của bạn */}
        <div style={{ flex: "1", minWidth: "300px" }}>
          <h2 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "10px" }}>
            Đơn hàng của bạn
          </h2>
          <div style={{ border: "1px solid #e5e5e5", padding: "15px", borderRadius: "4px" }}>
            {cartItems.map((item) => (
              <div
                key={item.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "10px",
                  borderBottom: "1px solid #e5e5e5",
                  paddingBottom: "10px",
                }}
              >
                <span>{item.name}</span>
                <span>
                  {item.price.toLocaleString("vi-VN")} đ x {item.quantity}
                </span>
              </div>
            ))}
            <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "bold", marginTop: "10px" }}>
              <span>Tổng</span>
              <span style={{ color: "#ff6200" }}>{total.toLocaleString("vi-VN")} đ</span>
            </div>
          </div>

          {/* Thanh toán khi nhận hàng (dạng lựa chọn với nút radio) */}
          <div style={{ marginTop: "20px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
              <input
                type="radio"
                id="cod"
                name="paymentMethod"
                value="cod"
                checked={paymentMethod === "cod"}
                onChange={handlePaymentMethodChange}
                style={{ cursor: "pointer" }}
              />
              <label htmlFor="cod" style={{ fontSize: "14px", color: "#333", fontWeight: "bold", cursor: "pointer" }}>
                Thanh toán khi nhận hàng
              </label>
            </div>
            <div style={{ backgroundColor: "#f5f5f5", padding: "15px", borderRadius: "4px" }}>
              <p style={{ fontSize: "14px", color: "#666" }}>
                Thông tin cá nhân của bạn sẽ được sử dụng để xử lý đơn hàng, tăng trải nghiệm sử dụng website, và cho các mục đích cụ thể khác đã được mô tả trong chính sách riêng tư.
              </p>
            </div>
          </div>

          {/* Nút "Đặt hàng" */}
          <button
            onClick={handleSubmit}
            style={{
              backgroundColor: "#ff6200",
              color: "white",
              padding: "10px 20px",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontWeight: "bold",
              width: "100%",
              marginTop: "20px",
            }}
          >
            ĐẶT HÀNG
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;