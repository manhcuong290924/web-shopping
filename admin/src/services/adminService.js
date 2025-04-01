// client/src/services/adminService.js
import axios from "axios";

const API_URL = "http://localhost:8080/api/admins";

// Lấy thông tin admin theo email
export const getAdminByEmail = async (email) => {
  try {
    const response = await axios.get(`${API_URL}/${email}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data || "Failed to fetch admin info");
  }
};