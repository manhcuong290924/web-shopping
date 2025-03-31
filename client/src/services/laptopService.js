// client/src/services/laptopService.js
import axios from "axios";

const API_URL = "http://localhost:8080/api/products";

// Hàm lấy danh sách sản phẩm thuộc category "Điện tử" và subCategory "Laptop"
export const fetchLaptopProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}/category/Điện tử`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Thêm token nếu cần
      },
    });
    const products = response.data || [];

    // Lọc sản phẩm thuộc subCategory "Laptop"
    const laptopProducts = products.filter(
      (product) => product.subCategory === "Laptop"
    );
    return laptopProducts;
  } catch (error) {
    throw new Error(error.response?.data || "Failed to fetch laptop products");
  }
};