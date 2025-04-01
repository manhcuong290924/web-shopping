// client/src/services/userService.js
import axios from "axios";

const API_URL = "http://localhost:8080/api/auth";

// Lấy thông tin người dùng đã đăng nhập
export const fetchCurrentUser = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No token found. Please log in.");
    }

    const response = await axios.get(`${API_URL}/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data || "Failed to fetch user info");
  }
};