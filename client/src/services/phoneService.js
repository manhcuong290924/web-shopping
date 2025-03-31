// client/src/services/phoneService.js
import axios from "axios";

const API_URL = "http://localhost:8080/api/products";

// Hàm lấy danh sách sản phẩm thuộc category "Điện tử" và subCategory "Điện thoại"
export const fetchPhoneProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}/category/Điện tử`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Thêm token nếu cần
      },
    });
    const products = response.data || [];

    // Lọc sản phẩm thuộc subCategory "Điện thoại"
    const phoneProducts = products.filter(
      (product) => product.subCategory === "Điện thoại"
    );
    return phoneProducts;
  } catch (error) {
    throw new Error(error.response?.data || "Failed to fetch phone products");
  }
};