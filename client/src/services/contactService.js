import axios from 'axios';

const API_URL = 'http://localhost:8080/api/contacts';

// Gửi thông tin liên hệ
export const sendContact = async (contactData) => {
  try {
    const response = await axios.post(API_URL, contactData);
    return response.data;
  } catch (error) {
    throw error.response?.data || 'Có lỗi xảy ra khi gửi thông tin liên hệ.';
  }
};

// Lấy tất cả thông tin liên hệ (nếu cần trong tương lai)
export const getAllContacts = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    throw error.response?.data || 'Có lỗi xảy ra khi lấy danh sách liên hệ.';
  }
};