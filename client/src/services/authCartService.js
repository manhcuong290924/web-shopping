import axios from 'axios';

// API URL (nếu cần gọi API trong tương lai)
const API_URL = 'http://localhost:8080/api';

// Lấy thông tin user từ localStorage
export const getUserFromStorage = () => {
  const savedUser = localStorage.getItem('user');
  return savedUser ? JSON.parse(savedUser) : null;
};

// Lấy giỏ hàng từ localStorage
export const getCartFromStorage = () => {
  const savedCart = localStorage.getItem('cart');
  return savedCart ? JSON.parse(savedCart) : [];
};

// Đăng xuất: Xóa token và user khỏi localStorage
export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

// Xóa sản phẩm khỏi giỏ hàng
export const removeFromCart = (id, currentCart) => {
  const updatedCart = currentCart.filter((item) => item.id !== id);
  localStorage.setItem('cart', JSON.stringify(updatedCart));
  return updatedCart;
};

// Tăng số lượng sản phẩm trong giỏ hàng
export const increaseCartQuantity = (id, currentCart) => {
  const updatedCart = currentCart.map((item) =>
    item.id === id ? { ...item, quantity: item.quantity + 1 } : item
  );
  localStorage.setItem('cart', JSON.stringify(updatedCart));
  return updatedCart;
};

// Giảm số lượng sản phẩm trong giỏ hàng
export const decreaseCartQuantity = (id, currentCart) => {
  const updatedCart = currentCart.map((item) =>
    item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
  );
  localStorage.setItem('cart', JSON.stringify(updatedCart));
  return updatedCart;
};