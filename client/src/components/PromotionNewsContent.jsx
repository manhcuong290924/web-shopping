// client/src/components/PromotionNewsContent.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchNews } from "../services/newsService"; // Import API từ service
import "../styles/PromotionNewsPage.scss";

const PromotionNewsContent = () => {
  const [newsItems, setNewsItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Lấy danh sách tin tức từ API khi component được mount
  useEffect(() => {
    const loadNews = async () => {
      try {
        const data = await fetchNews();
        setNewsItems(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    loadNews();
  }, []);

  if (loading) {
    return <div className="promotion-news-content">Đang tải...</div>;
  }

  if (error) {
    return <div className="promotion-news-content">Lỗi: {error}</div>;
  }

  return (
    <div className="promotion-news-content">
      <h2>TIN TỨC KHUYẾN MÃI</h2>
      <hr />
      {newsItems.length === 0 ? (
        <p>Không có tin tức nào.</p>
      ) : (
        newsItems.map((item, index) => (
          <React.Fragment key={item.id}>
            <Link to={`/tin-tuc-khuyen-mai/${item.id}`} className="news-item">
              <img src={item.image} alt={item.title} className="news-image" />
              <div className="news-details">
                <h3>{item.title}</h3>
                <span className="view-details">Xem chi tiết &gt;</span>
              </div>
            </Link>
            {index < newsItems.length - 1 && <hr className="news-divider" />}
          </React.Fragment>
        ))
      )}
    </div>
  );
};

export default PromotionNewsContent;