// client/src/components/PromotionNewsContent.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/PromotionNewsPage.scss';

const PromotionNewsContent = () => {
  return (
    <div className="promotion-news-content">
      <h2>TIN TỨC KHUYẾN MÃI</h2>
      <hr />
      <div className="news-item">
        <img
          src="https://cdn.pixabay.com/photo/2016/11/29/09/16/laundry-1869646_1280.jpg"
          alt="Máy sấy quần áo"
          className="news-image"
        />
        <div className="news-details">
          <h3>Ba lựa chọn máy sấy quần áo dưới 2 triệu đồng</h3>
          <Link to="/tin-tuc-khuyen-mai/chi-tiet" className="view-details">
            Xem chi tiết >
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PromotionNewsContent;