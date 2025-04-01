// client/src/components/Order/OrderEditForm.js
import React, { useState } from "react";

const OrderEditForm = ({ order, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    email: order.email || "",
    phone: order.phone || "",
    firstName: order.firstName || "",
    lastName: order.lastName || "",
    address: order.address || "", // Thêm address
    note: order.note || "", // Thêm note
    paymentMethod: order.paymentMethod || "",
    orderStatus: order.orderStatus || "Chờ xử lý",
  });
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Kiểm tra các trường bắt buộc
    if (
      !formData.email.trim() ||
      !formData.phone.trim() ||
      !formData.firstName.trim() ||
      !formData.lastName.trim() ||
      !formData.address.trim() || // Kiểm tra address
      !formData.paymentMethod.trim() ||
      !formData.orderStatus.trim()
    ) {
      setError("Vui lòng nhập đầy đủ các trường thông tin.");
      return;
    }

    // Kiểm tra định dạng email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Email không hợp lệ.");
      return;
    }

    // Kiểm tra định dạng số điện thoại (10 chữ số)
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(formData.phone)) {
      setError("Số điện thoại phải là 10 chữ số.");
      return;
    }

    // Gửi dữ liệu chỉnh sửa
    onSave({
      ...formData,
      products: order.products, // Giữ nguyên danh sách sản phẩm
      orderDate: order.orderDate, // Giữ nguyên ngày đặt hàng
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Chỉnh sửa đơn hàng</h2>

        {/* Thông báo lỗi */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded flex items-center gap-2 mb-4">
            <span>⚠</span>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-sm text-gray-700 mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>

          {/* Số điện thoại */}
          <div>
            <label className="block text-sm text-gray-700 mb-1">
              Số điện thoại <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>

          {/* Họ */}
          <div>
            <label className="block text-sm text-gray-700 mb-1">
              Họ <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>

          {/* Tên */}
          <div>
            <label className="block text-sm text-gray-700 mb-1">
              Tên <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>

          {/* Địa chỉ */}
          <div>
            <label className="block text-sm text-gray-700 mb-1">
              Địa chỉ <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>

          {/* Thông tin bổ sung */}
          <div>
            <label className="block text-sm text-gray-700 mb-1">
              Thông tin bổ sung
            </label>
            <textarea
              name="note"
              value={formData.note}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
              rows="3"
            />
          </div>

          {/* Phương thức thanh toán */}
          <div>
            <label className="block text-sm text-gray-700 mb-1">
              Phương thức thanh toán <span className="text-red-500">*</span>
            </label>
            <select
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            >
              <option value="Thanh toán khi nhận hàng">Thanh toán khi nhận hàng</option>
              <option value="Chuyển khoản">Chuyển khoản</option>
            </select>
          </div>

          {/* Trạng thái đơn hàng */}
          <div>
            <label className="block text-sm text-gray-700 mb-1">
              Trạng thái đơn hàng <span className="text-red-500">*</span>
            </label>
            <select
              name="orderStatus"
              value={formData.orderStatus}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            >
              <option value="Chờ xử lý">Chờ xử lý</option>
              <option value="Đang giao">Đang giao</option>
              <option value="Hoàn thành">Hoàn thành</option>
            </select>
          </div>

          {/* Nút hành động */}
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors duration-200"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors duration-200"
            >
              Lưu
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OrderEditForm;