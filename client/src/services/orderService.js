// client/src/services/orderService.js
import axios from "axios";

const API_URL = "http://localhost:8080/api/orders";

// Tạo đơn hàng mới với danh sách sản phẩm
export const createOrder = async (orderData) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No token found. Please log in.");
    }

    const response = await axios.post(API_URL, orderData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data || "Failed to create order");
  }
};