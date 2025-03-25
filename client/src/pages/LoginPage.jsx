import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import Breadcrumb from '../components/Breadcrumb';
import ChatBotIcon from '../components/ChatBotIcon';
import '../styles/custom-layout.scss';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');

  // Xử lý thay đổi input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError('');
  };

  // Xử lý đăng nhập
  const handleSubmit = (e) => {
    e.preventDefault();

    // Kiểm tra các trường bắt buộc
    if (!formData.email.trim() || !formData.password.trim()) {
      setError('Vui lòng nhập đầy đủ email và mật khẩu.');
      return;
    }

    // Gửi dữ liệu đăng nhập (giả lập, bạn có thể gọi API)
    console.log('Đăng nhập:', formData);

    // Sau khi đăng nhập thành công, bạn có thể chuyển hướng hoặc lưu token
    // Ví dụ: navigate('/'); hoặc lưu token vào localStorage
  };

  // Dữ liệu đường dẫn cho Breadcrumb
  const breadcrumbItems = [
    { title: 'Trang chủ', path: '/', icon: '🏠' },
    { title: 'Đăng nhập', path: '/dang-nhap' },
  ];

  return (
    <div className="flex flex-col min-h-screen font-sans">
      {/* Header */}
      <Header />

      <div className="flex flex-1" style={{ paddingTop: '120px' }}>
        {/* Container chính để chứa Sidebar và nội dung, căn giữa */}
        <div className="content-wrapper flex flex-col md:flex-row">
          {/* Sidebar */}
          <Sidebar />

          {/* Nội dung chính */}
          <main className="flex-1 p-4 md:p-6">
            {/* Breadcrumb */}
            <Breadcrumb items={breadcrumbItems} />

            {/* Form đăng nhập */}
            <div className="max-w-md mx-auto">
              <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>
                ĐĂNG NHẬP
              </h1>

              {/* Thông báo lỗi (nếu có) */}
              {error && (
                <div
                  style={{
                    backgroundColor: '#ffe6e6',
                    padding: '10px',
                    marginBottom: '20px',
                    border: '1px solid #ff9999',
                    borderRadius: '4px',
                    color: '#ff3333',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  <span>⚠</span>
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '15px' }}>
                  <label style={{ display: 'block', fontSize: '14px', color: '#333', marginBottom: '5px' }}>
                    Email <span style={{ color: 'red' }}>*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Nhập email của bạn"
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '1px solid #ccc',
                      borderRadius: '4px',
                      fontSize: '14px',
                    }}
                    required
                  />
                </div>

                <div style={{ marginBottom: '15px' }}>
                  <label style={{ display: 'block', fontSize: '14px', color: '#333', marginBottom: '5px' }}>
                    Mật khẩu <span style={{ color: 'red' }}>*</span>
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Nhập mật khẩu của bạn"
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '1px solid #ccc',
                      borderRadius: '4px',
                      fontSize: '14px',
                    }}
                    required
                  />
                </div>

                <button
                  type="submit"
                  style={{
                    backgroundColor: '#ff6200',
                    color: 'white',
                    padding: '10px 20px',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    width: '100%',
                    marginTop: '10px',
                  }}
                >
                  ĐĂNG NHẬP
                </button>
              </form>

              <p style={{ marginTop: '15px', textAlign: 'center', fontSize: '14px', color: '#666' }}>
                Bạn chưa có tài khoản?{' '}
                <Link to="/dang-ky" className="text-orange-500 hover:underline">
                  Đăng ký ngay
                </Link>
              </p>
            </div>
          </main>
        </div>
      </div>

      {/* ChatBotIcon */}
      <ChatBotIcon />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LoginPage;