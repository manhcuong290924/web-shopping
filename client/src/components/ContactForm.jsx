import React, { useState } from 'react';
import { sendContact } from '../services/contactService'; // Import API từ service
import '../styles/ContactPage.scss';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    title: '',
    message: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Kiểm tra các trường bắt buộc
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setError('Vui lòng nhập đầy đủ họ tên, email và nội dung.');
      return;
    }

    try {
      await sendContact(formData); // Gọi API từ service
      setSuccess('Gửi thông tin liên hệ thành công!');
      setFormData({ name: '', email: '', title: '', message: '' }); // Reset form
    } catch (err) {
      setError(err);
    }
  };

  return (
    <div className="contact-page">
      <div className="contact-info">
        <h2>LIÊN HỆ</h2>
        <hr />
        <h3>THÔNG TIN LIÊN HỆ</h3>
        <p>Công ty bán hàng tại Việt Nam</p>
        <ul>
          <li>
            <strong>Địa chỉ:</strong> Tòa D, 13 P. Trịnh Văn Bô, Xuân Phương, Nam Từ Liêm, Hà Nội, Việt Nam
          </li>
          <li>
            <strong>Email:</strong> ledoanduong9@gmail.com
          </li>
          <li>
            <strong>Hotline:</strong> 0559099024
          </li>
          <li>
            <strong>Website:</strong> webshoppingtec.io.vn
          </li>
        </ul>
      </div>
      <div className="contact-form">
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Họ và tên</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Nhập họ và tên"
              required
            />
          </div>
          <div className="form-group">
            <label>Địa chỉ email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Nhập địa chỉ email"
              required
            />
          </div>
          <div className="form-group">
            <label>Tiêu đề</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Nhập tiêu đề"
            />
          </div>
          <div className="form-group">
            <label>Nội dung</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Nhập nội dung"
              rows="5"
              required
            ></textarea>
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