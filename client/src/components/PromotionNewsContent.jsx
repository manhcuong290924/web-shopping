// client/src/components/PromotionNewsContent.jsx
import React from 'react'; // Thêm import React
import { Link } from 'react-router-dom';
import '../styles/PromotionNewsPage.scss';

const PromotionNewsContent = () => {
  // Mảng dữ liệu các tin tức khuyến mãi
  const newsItems = [
    {
      id: 1,
      title: "Ba lựa chọn máy sấy quần áo dưới 2 triệu đồng",
      image: "https://cdn.pixabay.com/photo/2016/11/29/09/16/laundry-1869646_1280.jpg",
      detailLink: "/tin-tuc-khuyen-mai/chi-tiet",
    },
    {
      id: 2,
      title: "Top 5 mẫu tai nghe giá rẻ dưới 500 nghìn",
      image: "https://cdn.pixabay.com/photo/2018/09/17/14/27/headphones-3683983_1280.jpg",
      detailLink: "/tin-tuc-khuyen-mai/chi-tiet-tai-nghe",
    },
    {
      id: 3,
      title: "Giảm giá 20% cho các sản phẩm gia dụng cuối tuần",
      image: "https://cdn.pixabay.com/photo/2017/03/28/12/11/pancakes-2181860_1280.jpg",
      detailLink: "/tin-tuc-khuyen-mai/chi-tiet-gia-dung",
    },
  ];

  return (
    <div className="promotion-news-content">
      <h2>TIN TỨC KHUYẾN MÃI</h2>
      <hr />
      {newsItems.map((item, index) => (
        <React.Fragment key={item.id}>
          <Link to={item.detailLink} className="news-item">
            <img src={item.image} alt={item.title} className="news-image" />
            <div className="news-details">
              <h3>{item.title}</h3>
              <span className="view-details">Xem chi tiết ></span>
            </div>
          </Link>
          {index < newsItems.length - 1 && <hr className="news-divider" />}
        </React.Fragment>
      ))}
    </div>
  );
};

export default PromotionNewsContent;