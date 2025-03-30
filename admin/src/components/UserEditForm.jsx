// src/components/UserEditForm.js
import React, { useState } from "react";

const UserEditForm = ({ user, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    email: user.email || "",
    phone: user.phone || "",
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    birthDay: user.birthDay || "",
    active: user.active || false,
  });
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
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
      !formData.birthDay.trim()
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

    // Kiểm tra định dạng ngày sinh (YYYY-MM-DD)
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(formData.birthDay)) {
      setError("Ngày sinh phải có định dạng YYYY-MM-DD (ví dụ: 1990-01-01).");
      return;
    }

    // Kiểm tra ngày sinh không được là ngày trong tương lai
    const today = new Date();
    const birthDate = new Date(formData.birthDay);
    if (birthDate > today) {
      setError("Ngày sinh không được là ngày trong tương lai.");
      return;
    }

    // Gửi dữ liệu chỉnh sửa
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Chỉnh sửa người dùng</h2>

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

          {/* Ngày sinh */}
          <div>
            <label className="block text-sm text-gray-700 mb-1">
              Ngày sinh <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="birthDay"
              value={formData.birthDay}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>

          {/* Trạng thái Active */}
          <div className="flex items-center">
            <input
              type="checkbox"
              name="active"
              checked={formData.active}
              onChange={handleInputChange}
              className="mr-2"
            />
            <label className="text-sm text-gray-700">Active</label>
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

export default UserEditForm;