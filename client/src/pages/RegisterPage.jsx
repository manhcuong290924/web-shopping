import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signUp } from '../services/authService';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import Breadcrumb from '../components/Breadcrumb';
import ChatBotIcon from '../components/ChatBotIcon';
import '../styles/custom-layout.scss';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '', // Xác nhận mật khẩu
    firstName: '',
    lastName: '',
    birthDay: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Kiểm tra các trường bắt buộc
    if (
      !formData.email.trim() ||
      !formData.phoneNumber.trim() ||
      !formData.password.trim() ||
      !formData.confirmPassword.trim() ||
      !formData.firstName.trim() ||
      !formData.lastName.trim() ||
      !formData.birthDay.trim()
    ) {
      setError('Vui lòng nhập đầy đủ các trường thông tin.');
      return;
    }

    // Kiểm tra mật khẩu và xác nhận mật khẩu có khớp không
    if (formData.password !== formData.confirmPassword) {
      setError('Mật khẩu và xác nhận mật khẩu không khớp.');
      return;
    }

    // Kiểm tra định dạng số điện thoại (10 chữ số)
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(formData.phoneNumber)) {
      setError('Số điện thoại phải là 10 chữ số.');
      return;
    }

    // Kiểm tra định dạng ngày sinh (giả sử YYYY-MM-DD)
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(formData.birthDay)) {
      setError('Ngày sinh phải có định dạng YYYY-MM-DD (ví dụ: 1990-01-01).');
      return;
    }

    try {
      // Gửi dữ liệu đăng ký (không gửi confirmPassword)
      const userData = {
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        birthDay: formData.birthDay,
      };
      await signUp(userData);
      console.log('Đăng ký thành công');
      navigate('/dang-nhap');
    } catch (err) {
      setError(err || 'Đăng ký thất bại. Email có thể đã được sử dụng.');
    }
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
                    Số điện thoại <span style={{ color: 'red' }}>*</span>
                  </label>
                  <input
                    type="text"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    placeholder="Nhập số điện thoại (10 số)"
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
                    Họ <span style={{ color: 'red' }}>*</span>
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="Nhập họ của bạn"
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
                    Tên <span style={{ color: 'red' }}>*</span>
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Nhập tên của bạn"
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
                    Ngày sinh <span style={{ color: 'red' }}>*</span>
                  </label>
                  <input
                    type="date" // Sử dụng type="date" cho ngày sinh
                    name="birthDay"
                    value={formData.birthDay}
                    onChange={handleInputChange}
                    placeholder="YYYY-MM-DD"
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
                    placeholder="Nhập lại mật khẩu"
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
                Đã có tài khoản?{' '}
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