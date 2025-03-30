// src/components/UserTable.js
import React from "react";

const UserTable = ({ users, onDelete, onEdit }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-gray-600 mb-4">User List</h2>
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="p-3 text-left text-sm font-semibold text-gray-600">ID</th>
                <th className="p-3 text-left text-sm font-semibold text-gray-600">Email</th>
                <th className="p-3 text-left text-sm font-semibold text-gray-600">First Name</th>
                <th className="p-3 text-left text-sm font-semibold text-gray-600">Last Name</th>
                <th className="p-3 text-left text-sm font-semibold text-gray-600">Birthday</th>
                <th className="p-3 text-left text-sm font-semibold text-gray-600">Phone</th>
                <th className="p-3 text-left text-sm font-semibold text-gray-600">Active</th>
                <th className="p-3 text-left text-sm font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user.id} className="border-b hover:bg-gray-50">
                  <td className="p-3 text-sm text-gray-700">{index + 1}</td>
                  <td className="p-3 text-sm text-gray-700">{user.email}</td>
                  <td className="p-3 text-sm text-gray-700">{user.firstName}</td>
                  <td className="p-3 text-sm text-gray-700">{user.lastName}</td>
                  <td className="p-3 text-sm text-gray-700">{user.birthDay}</td>
                  <td className="p-3 text-sm text-gray-700">{user.phone}</td>
                  <td className="p-3 text-sm text-gray-700">
                    <span
                      className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                        user.active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                      }`}
                    >
                      {user.active ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="p-3 text-sm text-gray-700 space-x-2">
                    <button
                      className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                      onClick={() => onEdit(user)} // Gọi hàm onEdit khi nhấn nút Edit
                    >
                      Edit
                    </button>
                    <button
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                      onClick={() => onDelete(user.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserTable;