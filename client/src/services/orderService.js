import axios from "axios";

const API_URL = "http://localhost:8080/api/orders";

export const createOrder = async (orderData) => {
  try {
    const response = await axios.post(API_URL, orderData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("Order created:", response.data);
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.error ||
      error.response?.data?.message ||
      (typeof error.response?.data === "string" ? error.response?.data : null) ||
      error.message ||
      "Failed to create order";
    throw new Error(errorMessage);
  }
};