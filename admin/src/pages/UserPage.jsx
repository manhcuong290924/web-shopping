// src/pages/UserPage.js
import React, { useState, useEffect } from "react";
import { fetchUsers, deleteUser, updateUser } from "../services/userService";
import UserTable from "../components/UserTable";
import UserSearch from "../components/UserSearch";
import UserEditForm from "../components/UserEditForm"; // Import form chỉnh sửa

const UserPage = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingUser, setEditingUser] = useState(null); // State để lưu user đang chỉnh sửa

  // Gọi API khi component được mount
  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await fetchUsers();
        setUsers(data);
        setFilteredUsers(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    loadUsers();
  }, []);

  // Hàm xóa người dùng
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteUser(id);
        const updatedUsers = users.filter((user) => user.id !== id);
        setUsers(updatedUsers);
        setFilteredUsers(updatedUsers);
      } catch (err) {
        setError(err.message);
      }
    }
  };

  // Hàm xử lý tìm kiếm
  const handleSearch = (searchTerm) => {
    if (!searchTerm) {
      setFilteredUsers(users);
      return;
    }

    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const filtered = users.filter(
      (user) =>
        user.email.toLowerCase().includes(lowerCaseSearchTerm) ||
        user.firstName.toLowerCase().includes(lowerCaseSearchTerm) ||
        user.lastName.toLowerCase().includes(lowerCaseSearchTerm)
    );
    setFilteredUsers(filtered);
  };

  // Hàm mở form chỉnh sửa
  const handleEdit = (user) => {
    setEditingUser(user);
  };

  // Hàm lưu dữ liệu chỉnh sửa
  const handleSaveEdit = async (updatedData) => {
    try {
      const updatedUser = await updateUser(editingUser.id, updatedData);
      // Cập nhật danh sách user
      const updatedUsers = users.map((user) =>
        user.id === editingUser.id ? updatedUser : user
      );
      setUsers(updatedUsers);
      setFilteredUsers(updatedUsers);
      setEditingUser(null); // Đóng form
    } catch (err) {
      setError(err.message);
    }
  };

  // Hàm hủy chỉnh sửa
  const handleCancelEdit = () => {
    setEditingUser(null);
  };

  if (loading) {
    return <div className="flex-1 p-6 bg-gray-50">Loading...</div>;
  }

  if (error) {
    return <div className="flex-1 p-6 bg-gray-50">Error: {error}</div>;
  }

  return (
    <div className="flex-1 p-6 bg-gray-50">
      <h1 className="text-2xl font-bold mb-6">User Page</h1>
      <UserSearch onSearch={handleSearch} />
      <UserTable users={filteredUsers} onDelete={handleDelete} onEdit={handleEdit} />
      {editingUser && (
        <UserEditForm
          user={editingUser}
          onSave={handleSaveEdit}
          onCancel={handleCancelEdit}
        />
      )}
    </div>
  );
};

export default UserPage;