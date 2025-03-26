import axios from 'axios';

const API_URL = 'http://localhost:8080/api/auth';

export const signUp = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/sign-up`, userData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const signIn = async (loginData) => {
  try {
    const response = await axios.post(`${API_URL}/sign-in`, loginData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};