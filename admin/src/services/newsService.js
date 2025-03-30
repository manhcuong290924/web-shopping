// client/src/services/newsService.js
import axios from "axios";

const API_URL = "http://localhost:8080/api/news";

// Upload hình ảnh và lấy URL
export const uploadImage = async (file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    const response = await axios.post(`${API_URL}/upload-image`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data || "Failed to upload image");
  }
};

// Lấy danh sách tất cả tin tức
export const fetchNews = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data || "Failed to fetch news");
  }
};

// Lấy tin tức theo ID
export const fetchNewsById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data || "Failed to fetch news detail");
  }
};

// Tạo tin tức mới
export const createNews = async (newsData) => {
  try {
    const response = await axios.post(API_URL, newsData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data || "Failed to create news");
  }
};

// Cập nhật tin tức
export const updateNews = async (id, newsData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, newsData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data || "Failed to update news");
  }
};

// Xóa tin tức
export const deleteNews = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data || "Failed to delete news");
  }
};

// Tìm kiếm tin tức theo tiêu đề
export const searchNews = async (searchTerm) => {
  try {
    const response = await axios.get(`${API_URL}/search?search=${searchTerm}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data || "Failed to search news");
  }
};