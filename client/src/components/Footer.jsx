// client/src/components/Footer.jsx
import React from 'react';
import '../styles/footer.scss'; // Import file SCSS cho Footer

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-column">
          <h3>WEBSHOPINGTEC</h3>
          <a href="/" className="logo-link">
            <img 
              src="/src/logo.jpg" // Giả sử logo nằm trong thư mục public
              alt="Logo Công ty" 
              className="footer-logo" 
              style={{ maxWidth: '50px', height: 'auto' }} // Thu nhỏ logo trực tiếp
            />  
          </a>
          <p>Mô tả ngắn: Chúng tôi là trang web bán hàng đơn giản.</p>
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
          <p>Email: duongbtbh00626@fpt.edu.vn</p>
          <p>Điện thoại: 0389617500</p>
          <p>Địa chỉ: Tòa D, 13 P. Trịnh Văn Bô, Xuân Phương, Nam Từ Liêm, Hà Nội</p>
        </div>
        <div className="footer-column">
          <h3>Mạng xã hội</h3>
          <a href="https://facebook.com"><i className="fab fa-facebook"></i> Facebook</a><br />
          <a href="https://instagram.com"><i className="fab fa-instagram"></i> Instagram</a><br />
          <a href="https://twitter.com"><i className="fab fa-twitter"></i> Twitter</a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2025 Công ty của bạn. Mọi quyền được bảo lưu.</p>
      </div>
    </footer>
  );
};

export default Footer;