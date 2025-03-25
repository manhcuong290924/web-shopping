import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import Breadcrumb from '../components/Breadcrumb';
import ChatBotIcon from '../components/ChatBotIcon';
import '../styles/custom-layout.scss';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.password.trim() || !formData.confirmPassword.trim()) {
      setError('Vui lòng nhập đầy đủ thông tin.');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Mật khẩu và xác nhận mật khẩu không khớp.');
      return;
    }
    console.log('Đăng ký:', formData);
  };

  const breadcrumbItems = [
    { title: 'Trang chủ', path: '/', icon: '🏠' },
    { title: 'Đăng ký', path: '/dang-ky' },
  ];

  return (
    <div className="flex flex-col min-h-screen font-sans">
      <Header />
      <div className="flex flex-1" style={{ paddingTop: '120px' }}>
        <div className="content-wrapper flex flex-col md:flex-row">
          <Sidebar />
          <main className="flex-1 p-4 md:p-6">
            <Breadcrumb items={breadcrumbItems} />
            <div className="max-w-md mx-auto">
              <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>
                ĐĂNG KÝ
              </h1>
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
                    Họ và Tên <span style={{ color: 'red' }}>*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Nhập họ và tên của bạn"
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
                <div style={{ marginBottom: '15px' }}>
                  <label style={{ display: 'block', fontSize: '14px', color: '#333', marginBottom: '5px' }}>
                    Xác nhận mật khẩu <span style={{ color: 'red' }}>*</span>
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Xác nhận mật khẩu của bạn"
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
                  ĐĂNG KÝ
                </button>
              </form>
              <p style={{ marginTop: '15px', textAlign: 'center', fontSize: '14px', color: '#666' }}>
                Bạn đã có tài khoản?{' '}
                <Link to="/dang-nhap" className="text-orange-500 hover:underline">
                  Đăng nhập ngay
                </Link>
              </p>
            </div>
          </main>
        </div>
      </div>
      <ChatBotIcon />
      <Footer />
    </div>
  );
};

export default RegisterPage;