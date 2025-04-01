// client/src/pages/AdminOrders.js
import React, { useState, useEffect } from "react";
import OrderTable from "../components/Order/OrderTable";
import OrderEditForm from "../components/Order/OrderEditForm";
import OrderSearch from "../components/Order/OrderSearch"; // Import OrderSearch
import OrderPagination from "../components/Order/OrderPagination"; // Import OrderPagination
import axios from "axios";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingOrder, setEditingOrder] = useState(null);
  const [currentPage, setCurrentPage] = useState(0); // Trang hiện tại
  const [totalPages, setTotalPages] = useState(0); // Tổng số trang
  const [searchTerm, setSearchTerm] = useState(""); // Từ khóa tìm kiếm
  const pageSize = 10; // Số đơn hàng mỗi trang

  // Lấy danh sách đơn hàng từ API với phân trang và tìm kiếm
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:8080/api/orders", {
          params: {
            page: currentPage,
            size: pageSize,
            search: searchTerm, // Thêm tham số tìm kiếm
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setOrders(response.data.content || []);
        setTotalPages(response.data.totalPages || 0);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setError("Không thể tải danh sách đơn hàng.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [currentPage, searchTerm]); // Gọi lại API khi currentPage hoặc searchTerm thay đổi

  // Xử lý xóa đơn hàng
  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa đơn hàng này?")) {
      try {
        await axios.delete(`http://localhost:8080/api/orders/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setOrders(orders.filter((order) => order.id !== id));
      } catch (error) {
        console.error("Error deleting order:", error);
        setError("Không thể xóa đơn hàng.");
      }
    }
  };

  // Xử lý chỉnh sửa đơn hàng
  const handleEdit = (order) => {
    setEditingOrder(order);
  };

  // Xử lý lưu đơn hàng sau khi chỉnh sửa
  const handleSave = async (updatedOrder) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/api/orders/${editingOrder.id}`,
        updatedOrder,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      setOrders(
        orders.map((order) =>
          order.id === editingOrder.id ? response.data : order
        )
      );
      setEditingOrder(null);
    } catch (error) {
      console.error("Error updating order:", error);
      setError("Không thể cập nhật đơn hàng.");
    }
  };

  // Xử lý hủy chỉnh sửa
  const handleCancel = () => {
    setEditingOrder(null);
  };

  // Xử lý tìm kiếm
  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(0); // Reset về trang đầu tiên khi tìm kiếm
  };

  // Xử lý thay đổi trang
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  if (loading) {
    return <div className="text-center p-4">Đang tải...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Quản lý đơn hàng</h1>

      {/* Thông báo lỗi */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded flex items-center gap-2 mb-4">
          <span>⚠</span>
          <span>{error}</span>
        </div>
      )}

      {/* Ô tìm kiếm */}
      <OrderSearch onSearch={handleSearch} />

      {/* Bảng danh sách đơn hàng */}
      <OrderTable orders={orders} onDelete={handleDelete} onEdit={handleEdit} />

      {/* Phân trang */}
      {totalPages > 1 && (
        <OrderPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}

      {/* Form chỉnh sửa đơn hàng */}
      {editingOrder && (
        <OrderEditForm
          order={editingOrder}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
};

export default AdminOrders;