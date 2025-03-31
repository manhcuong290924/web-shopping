// src/components/Product/ProductForm.js
import React, { useState, useEffect } from "react";

const ProductForm = ({ product, onSave, onCancel, isEdit = false }) => {
  const [formData, setFormData] = useState({
    name: product?.name || "",
    category: product?.category || "",
    subCategory: product?.subCategory || "",
    imageUrl: product?.imageUrl || "",
    originalPrice: product?.originalPrice || 0,
    discountedPrice: product?.discountedPrice || 0,
    discountPercentage: product?.discountPercentage || 0,
    desc: product?.desc || "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(product?.imageUrl || "");
  const [error, setError] = useState("");
  const [categories] = useState([
    "Điện tử",
    "Sản phẩm nổi bật",
    "Thời Trang",
    "Mẹ và Bé",
    "Gia dụng và Nội thất",
    "Văn phòng phẩm",
    "Giày dép",
    "Mỹ Phẩm",
  ]);
  const [subCategories, setSubCategories] = useState([]);

  // Định nghĩa danh sách subCategory tương ứng với từng category
  const subCategoryMap = {
    "Điện tử": ["Điện thoại", "Laptop", "Máy tính bảng"],
    "Thời Trang": ["Quần áo nữ", "Quần áo nam"],
    "Gia dụng và Nội thất": ["Đồ gia dụng", "Nội thất"],
    "Sản phẩm nổi bật": [],
    "Mẹ và Bé": [],
    "Văn phòng phẩm": [],
    "Giày dép": [],
    "Mỹ Phẩm": [],
  };

  // Cập nhật subCategory khi có product (trường hợp chỉnh sửa)
  useEffect(() => {
    if (product && product.category) {
      const subCats = subCategoryMap[product.category] || [];
      setSubCategories(subCats);
    }
  }, [product]);

  // Xử lý khi thay đổi category
  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setFormData({ ...formData, category: selectedCategory, subCategory: "" });

    // Cập nhật danh sách subCategory
    const subCats = subCategoryMap[selectedCategory] || [];
    setSubCategories(subCats);
  };

  // Xử lý thay đổi các trường trong form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError("");
  };

  // Xử lý upload file
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
    } else {
      setImageFile(null);
      setImagePreview(formData.imageUrl || "");
    }
  };

  // Xử lý preview hình ảnh
  useEffect(() => {
    if (imageFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(imageFile);
    } else {
      setImagePreview(formData.imageUrl || "");
    }
  }, [imageFile, formData.imageUrl]);

  // Xử lý submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Kiểm tra các trường bắt buộc
    if (!formData.name.trim()) {
      setError("Tên sản phẩm là bắt buộc.");
      return;
    }
    if (!formData.category.trim()) {
      setError("Danh mục là bắt buộc.");
      return;
    }
    if (formData.originalPrice < 0) {
      setError("Giá gốc phải lớn hơn hoặc bằng 0.");
      return;
    }
    if (formData.discountedPrice < 0) {
      setError("Giá đã giảm phải lớn hơn hoặc bằng 0.");
      return;
    }
    if (formData.discountPercentage < 0) {
      setError("Phần trăm giảm giá phải lớn hơn hoặc bằng 0.");
      return;
    }
    if (!formData.desc.trim()) {
      setError("Mô tả là bắt buộc.");
      return;
    }

    const dataToSend = new FormData();
    dataToSend.append("name", formData.name);
    dataToSend.append("category", formData.category);
    dataToSend.append("subCategory", formData.subCategory);
    dataToSend.append("originalPrice", formData.originalPrice);
    dataToSend.append("discountedPrice", formData.discountedPrice);
    dataToSend.append("discountPercentage", formData.discountPercentage);
    dataToSend.append("desc", formData.desc);
    if (imageFile) {
      dataToSend.append("image", imageFile);
    } else if (formData.imageUrl) {
      dataToSend.append("imageUrl", formData.imageUrl);
    }

    try {
      await onSave(dataToSend);
      onCancel(); // Đóng form sau khi lưu thành công
    } catch (error) {
      setError(error.message || "Không thể lưu sản phẩm.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">{isEdit ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm mới"}</h2>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded flex items-center gap-2 mb-4">
            <span>⚠</span>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Tên sản phẩm */}
          <div>
            <label className="block text-sm text-gray-700 mb-1">
              Tên sản phẩm <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>

          {/* Danh mục */}
          <div>
            <label className="block text-sm text-gray-700 mb-1">
              Danh mục <span className="text-red-500">*</span>
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleCategoryChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            >
              <option value="">Chọn danh mục</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Danh mục con */}
          <div>
            <label className="block text-sm text-gray-700 mb-1">Danh mục con</label>
            <select
              name="subCategory"
              value={formData.subCategory}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
              disabled={!formData.category}
            >
              <option value="">Chọn danh mục con</option>
              {subCategories.map((subCat) => (
                <option key={subCat} value={subCat}>
                  {subCat}
                </option>
              ))}
            </select>
          </div>

          {/* Hình ảnh */}
          <div>
            <label className="block text-sm text-gray-700 mb-1">Hình ảnh</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            {imagePreview && (
              <div className="mt-2">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-32 h-32 object-cover rounded"
                />
              </div>
            )}
          </div>

          {/* URL hình ảnh */}
          <div>
            <label className="block text-sm text-gray-700 mb-1">URL hình ảnh (nếu không upload file)</label>
            <input
              type="text"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* Giá gốc */}
          <div>
            <label className="block text-sm text-gray-700 mb-1">
              Giá gốc (VNĐ) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="originalPrice"
              value={formData.originalPrice}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
              min="0"
            />
          </div>

          {/* Giá đã giảm */}
          <div>
            <label className="block text-sm text-gray-700 mb-1">
              Giá đã giảm (VNĐ) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="discountedPrice"
              value={formData.discountedPrice}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
              min="0"
            />
          </div>

          {/* Phần trăm giảm giá */}
          <div>
            <label className="block text-sm text-gray-700 mb-1">
              Phần trăm giảm giá (%) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="discountPercentage"
              value={formData.discountPercentage}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
              min="0"
            />
          </div>

          {/* Mô tả */}
          <div>
            <label className="block text-sm text-gray-700 mb-1">
              Mô tả <span className="text-red-500">*</span>
            </label>
            <textarea
              name="desc"
              value={formData.desc}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
              rows="4"
              required
            />
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

export default ProductForm;