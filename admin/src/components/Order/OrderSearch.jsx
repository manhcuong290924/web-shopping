// client/src/components/Order/OrderSearch.js
import React, { useState } from "react";

const OrderSearch = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    onSearch(""); // Gọi onSearch khi xóa từ khóa tìm kiếm
  };

  const handleSearch = () => {
    onSearch(searchTerm); // Gọi onSearch khi nhấn nút "Tìm kiếm"
  };

  return (
    <div className="mb-4 flex items-center gap-3">
      <div className="relative flex-1">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Tìm kiếm theo email hoặc số điện thoại..."
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        {searchTerm && (
          <button
            onClick={handleClearSearch}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        )}
      </div>
      <button
        onClick={handleSearch}
        className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors duration-200"
      >
        Tìm kiếm
      </button>
    </div>
  );
};

export default OrderSearch;