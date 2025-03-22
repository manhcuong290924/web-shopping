// client/src/components/ContactForm.jsx
import React from 'react';
import '../styles/ContactPage.scss';

const ContactForm = () => {
  return (
    <div className="contact-page">
      <div className="contact-info">
        <h2>LIÊN HỆ</h2>
        <hr />
        <h3>THÔNG TIN LIÊN HỆ</h3>
        <p>Công ty thiết kế website sáng tạo tại Việt Nam</p>
        <ul>
          <li>
            <strong>Địa chỉ:</strong> Số 10, Đường Sáng Tạo, Khu Công nghệ, TP. Đà Nẵng
          </li>
          <li>
            <strong>Email:</strong> contact@innovatevn.com
          </li>
          <li>
            <strong>Hotline:</strong> 0987.654.321
          </li>
          <li>
            <strong>Website:</strong> innovatevn.com
          </li>
        </ul>
      </div>
      <div className="contact-form">
        <form>
          <div className="form-group">
            <label>Họ và tên</label>
            <input type="text" placeholder="Nhập họ và tên" />
          </div>
          <div className="form-group">
            <label>Địa chỉ email</label>
            <input type="email" placeholder="Nhập địa chỉ email" />
          </div>
          <div className="form-group">
            <label>Tiêu đề</label>
            <input type="text" placeholder="Nhập tiêu đề" />
          </div>
          <div className="form-group">
            <label>Nội dung</label>
            <textarea placeholder="Nhập nội dung" rows="5"></textarea>
          </div>
          <button type="submit" className="submit-button">
            GỬI ĐI
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;