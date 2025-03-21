// client/src/components/Footer.jsx
import React from 'react';
import '../styles/footer.scss'; // Import file SCSS cho Footer (nếu có)

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-column">
          <h3>Công ty của bạn</h3>
          <p>Logo hoặc slogan</p>
          <p>Mô tả ngắn: Chúng tôi là công ty chuyên nghiệp cung cấp giải pháp tuyệt vời.</p>
        </div>
        <div className="footer-column">
          <h3>Liên kết</h3>
          <ul>
            <li><a href="/">Trang chủ</a></li>
            <li><a href="/gioi-thieu">Giới thiệu</a></li>
            <li><a href="/lien-he">Liên hệ</a></li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>Liên hệ</h3>
          <p>Email: info@congtyban.com</p>
          <p>Điện thoại: 0123 456 789</p>
          <p>Địa chỉ: 123 Đường ABC, TP. XYZ</p>
        </div>
        <div className="footer-column">
          <h3>Mạng xã hội</h3>
          <a href="https://facebook.com"><i className="fab fa-facebook"></i> Facebook</a><br />
          <a href="https://instagram.com"><i className="fab fa-instagram"></i> Instagram</a><br />
          <a href="https://twitter.com"><i className="fab fa-twitter"></i> Twitter</a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2023 Công ty của bạn. Mọi quyền được bảo lưu.</p>
      </div>
    </footer>
  );
};

export default Footer;