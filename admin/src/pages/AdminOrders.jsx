import React, { useState, useEffect } from "react";
import OrderTable from "../components/Order/OrderTable";
import OrderEditForm from "../components/Order/OrderEditForm";
import OrderSearch from "../components/Order/OrderSearch";
import OrderPagination from "../components/Order/OrderPagination";
import axios from "axios";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingOrder, setEditingOrder] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const pageSize = 10;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:8080/api/orders", {
          params: {
            page: currentPage,
            size: pageSize,
            search: searchTerm,
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
  }, [currentPage, searchTerm]);

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

  const handleEdit = (order) => {
    setEditingOrder(order);
  };

  const handleSave = async (updatedOrder) => {
    try {
      if (
        !updatedOrder.email ||
        !updatedOrder.firstName ||
        !updatedOrder.lastName ||
        !updatedOrder.phone ||
        !updatedOrder.address ||
        !updatedOrder.paymentMethod ||
        !updatedOrder.orderStatus
      ) {
        setError("Vui lòng điền đầy đủ các trường bắt buộc.");
        return;
      }
      if (!editingOrder.products || editingOrder.products.length === 0) {
        setError("Danh sách sản phẩm không được để trống.");
        return;
      }

      // Kiểm tra và log nếu sản phẩm thiếu id
      const validatedProducts = editingOrder.products.map((product) => {
        if (!product.id) {
          console.warn(`Sản phẩm "${product.productName}" thiếu ID, dữ liệu từ server có thể không đầy đủ.`);
        }
        return {
          id: product.id || "", // Nếu thiếu id, gửi chuỗi rỗng và để backend xử lý
          productName: product.productName,
          category: product.category,
          subCategory: product.subCategory || "",
          imageUrl: product.imageUrl || "",
          discountedPrice: product.discountedPrice,
          discountPercentage: product.discountPercentage,
          quantity: product.quantity,
        };
      });

      const orderToSend = {
        id: editingOrder.id,
        email: updatedOrder.email,
        firstName: updatedOrder.firstName,
        lastName: updatedOrder.lastName,
        phone: updatedOrder.phone,
        address: updatedOrder.address,
        note: updatedOrder.note || "",
        products: validatedProducts,
        paymentMethod: updatedOrder.paymentMethod,
        orderStatus: updatedOrder.orderStatus,
        orderDate: editingOrder.orderDate,
      };

      console.log("Order to send:", orderToSend);

      const response = await axios.put(
        `http://localhost:8080/api/orders/${editingOrder.id}`,
        orderToSend,
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
      setError("");
    } catch (error) {
      console.error("Error updating order:", error);
      if (error.response) {
        setError(
          error.response.data.error || "Không thể cập nhật đơn hàng."
        );
      } else if (error.message) {
        setError(error.message);
      } else {
        setError("Lỗi kết nối đến server.");
      }
    }
  };

  const handleCancel = () => {
    setEditingOrder(null);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(0);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  if (loading) {
    return <div className="text-center p-4">Đang tải...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Quản lý đơn hàng</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded flex items-center gap-2 mb-4">
          <span>⚠</span>
          <span>{error}</span>
        </div>
      )}

      <OrderSearch onSearch={handleSearch} />
      <OrderTable orders={orders} onDelete={handleDelete} onEdit={handleEdit} />
      {totalPages > 1 && (
        <OrderPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
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