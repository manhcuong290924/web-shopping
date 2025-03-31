// client/src/services/householdService.js
import axios from "axios";

const API_URL = "http://localhost:8080/api/products";

// Hàm lấy danh sách sản phẩm thuộc category "Gia dụng và Nội thất"
export const fetchHouseholdProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}/category/Gia dụng và Nội thất`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Thêm token nếu cần
      },
    });
    return response.data || [];
  } catch (error) {
    throw new Error(error.response?.data || "Failed to fetch household products");
  }
};