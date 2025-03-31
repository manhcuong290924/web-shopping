// client/src/services/furnitureService.js
import axios from "axios";

const API_URL = "http://localhost:8080/api/products";

// Hàm lấy danh sách sản phẩm thuộc category "Gia dụng và Nội thất" và subCategory "Nội thất"
export const fetchFurnitureProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}/category/Gia dụng và Nội thất`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Thêm token nếu cần
      },
    });
    const products = response.data || [];

    // Lọc sản phẩm thuộc subCategory "Nội thất"
    const furnitureProducts = products.filter(
      (product) => product.subCategory === "Nội thất"
    );
    return furnitureProducts;
  } catch (error) {
    throw new Error(error.response?.data || "Failed to fetch furniture products");
  }
};