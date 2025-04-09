import React from "react";

const OrderTable = ({ orders, onDelete, onEdit }) => {
  const calculateTotal = (products) => {
    return products.reduce((sum, product) => {
      return sum + (product.discountedPrice * product.quantity);
    }, 0);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-gray-600 mb-4">Order List</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="p-3 text-left text-sm font-semibold text-gray-600">ID</th>
                <th className="p-3 text-left text-sm font-semibold text-gray-600">Email</th>
                <th className="p-3 text-left text-sm font-semibold text-gray-600">Full Name</th>
                <th className="p-3 text-left text-sm font-semibold text-gray-600">Phone</th>
                <th className="p-3 text-left text-sm font-semibold text-gray-600">Address</th>
                <th className="p-3 text-left text-sm font-semibold text-gray-600">Note</th>
                <th className="p-3 text-left text-sm font-semibold text-gray-600">Products</th>
                <th className="p-3 text-left text-sm font-semibold text-gray-600">Payment Method</th>
                <th className="p-3 text-left text-sm font-semibold text-gray-600">Order Status</th>
                <th className="p-3 text-left text-sm font-semibold text-gray-600">Order Date</th>
                <th className="p-3 text-left text-sm font-semibold text-gray-600">Total Amount</th>
                <th className="p-3 text-left text-sm font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={order.id} className="border-b hover:bg-gray-50">
                  <td className="p-3 text-sm text-gray-700">{index + 1}</td>
                  <td className="p-3 text-sm text-gray-700">{order.email}</td>
                  <td className="p-3 text-sm text-gray-700">{`${order.firstName} ${order.lastName}`}</td>
                  <td className="p-3 text-sm text-gray-700">{order.phone}</td>
                  <td className="p-3 text-sm text-gray-700">{order.address}</td>
                  <td className="p-3 text-sm text-gray-700">{order.note || "N/A"}</td>
                  <td className="p-3 text-sm text-gray-700">
                    {order.products.map((product, idx) => (
                      <div key={idx}>
                        {product.productName} (x{product.quantity})
                      </div>
                    ))}
                  </td>
                  <td className="p-3 text-sm text-gray-700">{order.paymentMethod}</td>
                  <td className="p-3 text-sm text-gray-700">
                    <span
                      className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                        order.orderStatus === "Chờ xử lý"
                          ? "bg-yellow-100 text-yellow-800"
                          : order.orderStatus === "Đang giao"
                          ? "bg-blue-100 text-blue-800"
                          : order.orderStatus === "Hoàn thành"
                          ? "bg-green-100 text-green-800"
                          : order.orderStatus === "Đơn hàng bị hủy"
                          ? "bg-red-100 text-red-800" // Thêm màu cho trạng thái "Đơn hàng bị hủy"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {order.orderStatus}
                    </span>
                  </td>
                  <td className="p-3 text-sm text-gray-700">{new Date(order.orderDate).toLocaleString()}</td>
                  <td className="p-3 text-sm text-gray-700">
                    {calculateTotal(order.products).toLocaleString("vi-VN")} đ
                  </td>
                  <td className="p-3 text-sm text-gray-700 space-x-2">
                    <button
                      className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                      onClick={() => onEdit(order)}
                    >
                      Edit
                    </button>
                    <button
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                      onClick={() => onDelete(order.id)}
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

export default OrderTable;