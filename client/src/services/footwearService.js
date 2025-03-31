// client/src/services/footwearService.js
import axios from "axios";

const API_URL = "http://localhost:8080/api/products";

// Hàm lấy danh sách sản phẩm thuộc category "Giày dép"
export const fetchFootwearProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}/category/Giày dép`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Thêm token nếu cần
      },
    });
    return response.data || [];
  } catch (error) {
    throw new Error(error.response?.data || "Failed to fetch footwear products");
  }
};