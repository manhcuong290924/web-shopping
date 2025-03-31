// client/src/services/tabletService.js
import axios from "axios";

const API_URL = "http://localhost:8080/api/products";

// Hàm lấy danh sách sản phẩm thuộc category "Điện tử" và subCategory "Máy tính bảng"
export const fetchTabletProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}/category/Điện tử`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Thêm token nếu cần
      },
    });
    const products = response.data || [];

    // Lọc sản phẩm thuộc subCategory "Máy tính bảng"
    const tabletProducts = products.filter(
      (product) => product.subCategory === "Máy tính bảng"
    );
    return tabletProducts;
  } catch (error) {
    throw new Error(error.response?.data || "Failed to fetch tablet products");
  }
};