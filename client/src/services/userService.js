import axios from "axios";

const API_URL = "http://localhost:8080/api/auth";

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
    console.log("User data:", response.data); // Debug dữ liệu trả về
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.error || // Nếu backend trả { error: "message" }
      error.response?.data?.message || // Nếu backend trả { message: "text" }
      (typeof error.response?.data === "string" ? error.response?.data : null) || // Nếu là chuỗi
      error.message || // Lỗi từ axios
      "Failed to fetch user info";
    throw new Error(errorMessage);
  }
};