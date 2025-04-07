import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchCurrentUser, updateUserProfile } from "../services/authService";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import Footer from "../components/Footer";
import Breadcrumb from "../components/Breadcrumb";
import ChatBotIcon from "../components/ChatBotIcon";
import "../styles/custom-layout.scss";

const ProfilePage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    birthDay: "",
    phone: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const loadUser = async () => {
      try {
        const userData = await fetchCurrentUser();
        setUser(userData);
        setFormData({
          firstName: userData.firstName || "",
          lastName: userData.lastName || "",
          birthDay: userData.birthDay || "",
          phone: userData.phone || "",
        });
      } catch (err) {
        setError(err.message);
        navigate("/dang-nhap"); // Nếu không lấy được user, chuyển về đăng nhập
      }
    };
    loadUser();

    document.body.classList.add("show-dialogflow");
    return () => {
      document.body.classList.remove("show-dialogflow");
    };
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError("");
    setSuccess("");
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    if (!formData.firstName.trim() || !formData.lastName.trim()) {
      setError("Vui lòng nhập đầy đủ họ và tên.");
      return;
    }

    try {
      const updatedUser = await updateUserProfile(formData);
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser)); // Cập nhật localStorage
      setSuccess("Cập nhật thông tin thành công!");
    } catch (err) {
      setError(err.message);
    }
  };

  const breadcrumbItems = [
    { title: "Trang chủ", path: "/", icon: "🏠" },
    { title: "Thông tin cá nhân", path: "/profile" },
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
            <div className="max-w-md mx-auto">
              <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px" }}>
                THÔNG TIN CÁ NHÂN
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
              {user && (
                <form onSubmit={handleUpdateProfile}>
                  <div style={{ marginBottom: "15px" }}>
                    <label
                      style={{
                        display: "block",
                        fontSize: "14px",
                        color: "#333",
                        marginBottom: "5px",
                      }}
                    >
                      Họ <span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="Nhập họ của bạn"
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
                      Tên <span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Nhập tên của bạn"
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
                      Ngày sinh
                    </label>
                    <input
                      type="date"
                      name="birthDay"
                      value={formData.birthDay}
                      onChange={handleInputChange}
                      style={{
                        width: "100%",
                        padding: "10px",
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                        fontSize: "14px",
                      }}
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
                      Số điện thoại
                    </label>
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Nhập số điện thoại"
                      style={{
                        width: "100%",
                        padding: "10px",
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                        fontSize: "14px",
                      }}
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
                    CẬP NHẬT THÔNG TIN
                  </button>
                </form>
              )}
            </div>
          </main>
        </div>
      </div>
      <Footer />
      <ChatBotIcon />
    </div>
  );
};

export default ProfilePage;