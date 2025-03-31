// client/src/services/appliancesService.js
import axios from "axios";

const API_URL = "http://localhost:8080/api/products";

// Hàm lấy danh sách sản phẩm thuộc category "Gia dụng và Nội thất" và subCategory "Đồ gia dụng"
export const fetchAppliancesProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}/category/Gia dụng và Nội thất`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Thêm token nếu cần
      },
    });
    const products = response.data || [];

    // Lọc sản phẩm thuộc subCategory "Đồ gia dụng"
    const appliancesProducts = products.filter(
      (product) => product.subCategory === "Đồ gia dụng"
    );
    return appliancesProducts;
  } catch (error) {
    throw new Error(error.response?.data || "Failed to fetch appliances products");
  }
};