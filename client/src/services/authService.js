import axios from "axios";

const API_URL = "http://localhost:8080/api/auth";

export const signUp = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/sign-up`, userData);
    return response.data;
  } catch (error) {
    console.error("Sign-up error:", error.response);
    const errorMessage = error.response?.data || "Đăng ký thất bại";
    throw new Error(errorMessage);
  }
};

export const signIn = async (loginData) => {
  try {
    const response = await axios.post(`${API_URL}/sign-in`, loginData);
    return response.data;
  } catch (error) {
    console.error("Sign-in error:", error.response);
    const errorMessage = error.response?.data || "Đăng nhập thất bại";
    throw new Error(errorMessage);
  }
};

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
    console.log("User data:", response.data);
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.error ||
      error.response?.data?.message ||
      (typeof error.response?.data === "string" ? error.response?.data : null) ||
      error.message ||
      "Failed to fetch user info";
    throw new Error(errorMessage);
  }
};

export const forgotPassword = async (email) => {
  try {
    const response = await axios.post(`${API_URL}/forgot-password`, { email });
    return response.data;
  } catch (error) {
    console.error("Forgot password error:", error.response);
    const errorMessage =
      typeof error.response?.data === "string"
        ? error.response.data
        : error.response?.data?.message ||
          error.response?.data?.error ||
          "Gửi mã xác nhận thất bại.";
    throw new Error(errorMessage);
  }
};

export const resetPassword = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/reset-password`, data);
    return response.data;
  } catch (error) {
    console.error("Reset password error:", error.response);
    const errorMessage =
      typeof error.response?.data === "string"
        ? error.response.data
        : error.response?.data?.message ||
          error.response?.data?.error ||
          "Đặt lại mật khẩu thất bại.";
    throw new Error(errorMessage);
  }
};

// Thêm hàm cập nhật thông tin người dùng
export const updateUserProfile = async (userData) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No token found. Please log in.");
    }
    const response = await axios.put(`${API_URL}/update-profile`, userData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Update profile error:", error.response);
    const errorMessage =
      typeof error.response?.data === "string"
        ? error.response.data
        : error.response?.data?.message ||
          error.response?.data?.error ||
          "Cập nhật thông tin thất bại.";
    throw new Error(errorMessage);
  }
};

// Thêm hàm đổi mật khẩu
export const changePassword = async (passwordData) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No token found. Please log in.");
    }
    const response = await axios.put(`${API_URL}/change-password`, passwordData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Change password error:", error.response);
    const errorMessage =
      typeof error.response?.data === "string"
        ? error.response.data
        : error.response?.data?.message ||
          error.response?.data?.error ||
          "Đổi mật khẩu thất bại.";
    throw new Error(errorMessage);
  }
};