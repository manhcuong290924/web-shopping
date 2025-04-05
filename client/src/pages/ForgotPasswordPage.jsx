import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { forgotPassword, resetPassword } from "../services/authService";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import Breadcrumb from "../components/Breadcrumb";
import ChatBotIcon from "../components/ChatBotIcon";
import "../styles/custom-layout.scss";

const ForgotPasswordPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: "",
    code: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.add("show-dialogflow");
    return () => {
      document.body.classList.remove("show-dialogflow");
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError("");
    setSuccess("");
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if (!formData.email.trim()) {
      setError("Vui lòng nhập email.");
      return;
    }

    try {
      await forgotPassword(formData.email);
      setSuccess(`Mã xác nhận đã được gửi đến ${formData.email}. Vui lòng kiểm tra email!`);
      setStep(2);
    } catch (err) {
      // Đảm bảo err.message là chuỗi
      const errorMessage = typeof err.message === "string" ? err.message : "Có lỗi xảy ra.";
      setError(errorMessage);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!formData.code.trim() || !formData.newPassword.trim() || !formData.confirmPassword.trim()) {
      setError("Vui lòng nhập đầy đủ mã xác nhận và mật khẩu mới.");
      return;
    }
    if (formData.newPassword !== formData.confirmPassword) {
      setError("Mật khẩu mới và xác nhận mật khẩu không khớp.");
      return;
    }

    try {
      const resetData = {
        email: formData.email,
        code: formData.code,
        newPassword: formData.newPassword,
      };
      await resetPassword(resetData);
      setSuccess("Đặt lại mật khẩu thành công! Đang chuyển hướng về trang đăng nhập...");
      setTimeout(() => navigate("/dang-nhap"), 2000);
    } catch (err) {
      // Đảm bảo err.message là chuỗi
      const errorMessage = typeof err.message === "string" ? err.message : "Có lỗi xảy ra.";
      setError(errorMessage);
    }
  };

  const breadcrumbItems = [
    { title: "Trang chủ", path: "/", icon: "🏠" },
    { title: "Quên mật khẩu", path: "/quen-mat-khau" },
  ];

  return (
    <div className="flex flex-col min-h-screen font-sans">
      <Header />
      <div className="flex flex-1" style={{ paddingTop: "120px" }}>
        <div className="content-wrapper flex flex-col md:flex-row">
          <div className="sidebar-wrapper">
            <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
          </div>
          <main className="flex-1 p-4 md:p-6">
            <Breadcrumb items={breadcrumbItems} />
            <div className="max-w-md mx-auto">
              <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px" }}>
                QUÊN MẬT KHẨU
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
              {step === 1 ? (
                <form onSubmit={handleForgotPassword}>
                  <div style={{ marginBottom: "15px" }}>
                    <label
                      style={{
                        display: "block",
                        fontSize: "14px",
                        color: "#333",
                        marginBottom: "5px",
                      }}
                    >
                      Email <span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Nhập email của bạn"
                      style={{
                        width: "100%",
                        padding: "10px",
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                        fontSize: "14px",
                      }}
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    style={{
                      backgroundColor: "#ff6200",
                      color: "white",
                      padding: "10px 20px",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                      fontWeight: "bold",
                      width: "100%",
                      marginTop: "10px",
                    }}
                  >
                    GỬI MÃ XÁC NHẬN
                  </button>
                </form>
              ) : (
                <form onSubmit={handleResetPassword}>
                  <div style={{ marginBottom: "15px" }}>
                    <label
                      style={{
                        display: "block",
                        fontSize: "14px",
                        color: "#333",
                        marginBottom: "5px",
                      }}
                    >
                      Mã xác nhận <span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="text"
                      name="code"
                      value={formData.code}
                      onChange={handleInputChange}
                      placeholder="Nhập mã xác nhận"
                      style={{
                        width: "100%",
                        padding: "10px",
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                        fontSize: "14px",
                      }}
                      required
                    />
                  </div>
                  <div style={{ marginBottom: "15px" }}>
                    <label
                      style={{
                        display: "block",
                        fontSize: "14px",
                        color: "#333",
                        marginBottom: "5px",
                      }}
                    >
                      Mật khẩu mới <span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="password"
                      name="newPassword"
                      value={formData.newPassword}
                      onChange={handleInputChange}
                      placeholder="Nhập mật khẩu mới"
                      style={{
                        width: "100%",
                        padding: "10px",
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                        fontSize: "14px",
                      }}
                      required
                    />
                  </div>
                  <div style={{ marginBottom: "15px" }}>
                    <label
                      style={{
                        display: "block",
                        fontSize: "14px",
                        color: "#333",
                        marginBottom: "5px",
                      }}
                    >
                      Xác nhận mật khẩu <span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      placeholder="Nhập lại mật khẩu mới"
                      style={{
                        width: "100%",
                        padding: "10px",
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                        fontSize: "14px",
                      }}
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    style={{
                      backgroundColor: "#ff6200",
                      color: "white",
                      padding: "10px 20px",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                      fontWeight: "bold",
                      width: "100%",
                      marginTop: "10px",
                    }}
                  >
                    ĐẶT LẠI MẬT KHẨU
                  </button>
                </form>
              )}
              <p
                style={{
                  marginTop: "15px",
                  textAlign: "center",
                  fontSize: "14px",
                  color: "#666",
                }}
              >
                Quay lại{" "}
                <Link to="/dang-nhap" className="text-orange-500 hover:underline">
                  Đăng nhập
                </Link>
              </p>
            </div>
          </main>
        </div>
      </div>
      <Footer />
      <ChatBotIcon />
    </div>
  );
};

export default ForgotPasswordPage;