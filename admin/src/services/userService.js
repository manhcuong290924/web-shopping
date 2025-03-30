// src/services/userService.js

// Hàm lấy danh sách người dùng từ API
export const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/users");
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      return await response.json();
    } catch (err) {
      throw new Error(err.message);
    }
  };
  
  // Hàm xóa người dùng
  export const deleteUser = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/api/users/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete user");
      }
      return true;
    } catch (err) {
      throw new Error(err.message);
    }
  };
  
  // Hàm chỉnh sửa người dùng
  export const updateUser = async (id, userData) => {
    try {
      const response = await fetch(`http://localhost:8080/api/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      if (!response.ok) {
        throw new Error("Failed to update user");
      }
      return await response.json();
    } catch (err) {
      throw new Error(err.message);
    }
  };