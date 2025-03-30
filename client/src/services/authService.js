// src/services/authService.js
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/auth'; // Sửa thành /api/auth

export const signUp = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/sign-up`, userData);
    return response.data;
  } catch (error) {
    console.error('Sign-up error:', error.response); // Log chi tiết lỗi
    // Lấy message từ error.response.data (backend trả về string)
    const errorMessage = error.response?.data || 'Đăng ký thất bại';
    throw new Error(errorMessage);
  }
};

export const signIn = async (loginData) => {
  try {
    const response = await axios.post(`${API_URL}/sign-in`, loginData);
    return response.data;
  } catch (error) {
    console.error('Sign-in error:', error.response);
    const errorMessage = error.response?.data || 'Đăng nhập thất bại';
    throw new Error(errorMessage);
  }
};