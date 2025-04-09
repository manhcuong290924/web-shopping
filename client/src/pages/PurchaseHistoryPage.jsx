// src/pages/PurchaseHistoryPage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getUserFromStorage } from "../services/authCartService";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import Footer from "../components/Footer";
import Breadcrumb from "../components/Breadcrumb";
import "../styles/custom-layout.scss";

const PurchaseHistoryPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(""); // Thêm state để hiển thị thông báo thành công
  const navigate = useNavigate();

  useEffect(() => {
    const loadOrders = async () => {
      const user = getUserFromStorage();
      if (!user) {
        setError("Vui lòng đăng nhập để xem lịch sử mua hàng.");
        setLoading(false);
        navigate("/dang-nhap");
        return;
      }

      try {
        const response = await axios.get(`http://localhost:8080/api/orders`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          params: {
            page: 0,
            size: 10,
            search: user.email,
          },
        });
        setOrders(response.data.content || []);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError("Không thể tải lịch sử mua hàng.");
      } finally {
        setLoading(false);
      }
    };

    loadOrders();

    document.body.classList.add("show-dialogflow");
    return () => {
      document.body.classList.remove("show-dialogflow");
    };
  }, [navigate]);

  const handleCancelOrder = async (orderId) => {
    if (!window.confirm("Bạn có chắc chắn muốn hủy đơn hàng này?")) return;

    try {
      await axios.put(
        `http://localhost:8080/api/orders/${orderId}`,
        { ...orders.find(o => o.id === orderId), orderStatus: "Đơn hàng bị hủy" },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setOrders(orders.map(order => 
        order.id === orderId ? { ...order, orderStatus: "Đơn hàng bị hủy" } : order
      ));
      setSuccess("Hủy đơn hàng thành công!");
      setError("");
    } catch (err) {
      console.error("Error cancelling order:", err);
      setError("Không thể hủy đơn hàng.");
      setSuccess("");
    }
  };

  const breadcrumbItems = [
    { title: "Trang chủ", path: "/", icon: "🏠" },
    { title: "Lịch sử mua hàng", path: "/lich-su-mua-hang" },
  ];

  return (
    <div className="flex flex-col min-h-screen font-sans">
      <Header />
      <div className="flex flex-1" style={{ paddingTop: "120px" }}>
        <div className="content-wrapper flex flex-col md:flex-row">
          <div className="SideBar-wrapper">
            <SideBar isOpen={isOpen} setIsOpen={setIsOpen} />
          </div>
          <main className="flex-1 p-4 md:p-6">
            <Breadcrumb items={breadcrumbItems} />
            <div className="max-w-4xl mx-auto">
              <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px" }}>
                LỊCH SỬ MUA HÀNG
              </h1>
              {error && (
                <div
                  style={{
                    backgroundColor: "#ffe6e6",
                    padding: "10px",
                    marginBottom: "20px",
                    border: "1px solid #ff9999",
                    borderRadius: "4px",
                    color: "#ff3333",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <span>⚠</span>
                  <span>{error}</span>
                </div>
              )}
              {success && (
                <div
                  style={{
                    backgroundColor: "#e6ffe6",
                    padding: "10px",
                    marginBottom: "20px",
                    border: "1px solid #99ff99",
                    borderRadius: "4px",
                    color: "#006600",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <span>✔</span>
                  <span>{success}</span>
                </div>
              )}
              {loading ? (
                <div className="text-center p-4">Đang tải...</div>
              ) : orders.length === 0 ? (
                <p className="text-gray-500 text-center">Bạn chưa có đơn hàng nào.</p>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div key={order.id} className="border p-4 rounded-lg shadow-sm">
                      <p><strong>Mã đơn hàng:</strong> {order.id}</p>
                      <p><strong>Ngày đặt:</strong> {new Date(order.orderDate).toLocaleString()}</p>
                      <p><strong>Trạng thái:</strong> {order.orderStatus}</p>
                      <p><strong>Tổng tiền:</strong> {order.products.reduce((sum, p) => sum + p.discountedPrice * p.quantity, 0).toLocaleString('vi-VN')} đ</p>
                      <div>
                        <strong>Sản phẩm:</strong>
                        <ul className="list-disc pl-5">
                          {order.products.map((product) => (
                            <li key={product.id}>
                              {product.productName} (x{product.quantity}) - {product.discountedPrice.toLocaleString('vi-VN')} đ
                            </li>
                          ))}
                        </ul>
                      </div>
                      {order.orderStatus === "Chờ xử lý" && (
                        <button
                          onClick={() => handleCancelOrder(order.id)}
                          style={{
                            backgroundColor: "#ff3333",
                            color: "white",
                            padding: "8px 16px",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer",
                            fontWeight: "bold",
                            marginTop: "10px",
                          }}
                        >
                          Hủy đơn hàng
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PurchaseHistoryPage;