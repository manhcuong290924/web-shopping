// client/src/services/productService.js
import axios from "axios";

const API_URL = "http://localhost:8080/api/products";

// Lấy danh sách sản phẩm với phân trang
export const fetchProducts = async (page = 0, size = 10) => {
  try {
    const response = await axios.get(`${API_URL}?page=${page}&size=${size}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Thêm token nếu cần
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data || "Failed to fetch products");
  }
};

// Lấy thông tin chi tiết sản phẩm theo id
export const fetchProductById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Thêm token nếu cần
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data || "Failed to fetch product by id");
  }
};

// Tìm kiếm sản phẩm theo tên
export const searchProducts = async (name) => {
  try {
    const response = await axios.get(`${API_URL}/search/${encodeURIComponent(name)}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Thêm token nếu cần
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data || "Failed to search products");
  }
};