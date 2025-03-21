// client/src/components/Slide.jsx
import React, { useState, useEffect } from "react";
import "../styles/custom-layout.scss";

const Slide = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Danh sách 4 ảnh cho banner chính
  const bannerImages = [
    "https://picsum.photos/800/400?random=1",
    "https://picsum.photos/800/400?random=2",
    "https://picsum.photos/800/400?random=3",
    "https://picsum.photos/800/400?random=4",
  ];

  // Tự động nháy ảnh sau mỗi 2 giây
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === bannerImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 2000);

    return () => clearInterval(interval);
  }, [bannerImages.length]);

  return (
    <div className="slide-wrapper">
      <div className="slide-container">
        {/* Banner chính */}
        <div className="main-banner">
          <div className="banner-slides">
            {bannerImages.map((image, index) => (
              <div
                key={index}
                className={`banner-slide ${index === currentIndex ? "active" : ""}`}
              >
                <img
                  src={image}
                  alt={`Banner ${index + 1}`}
                  className="banner-image"
                  onError={(e) => {
                    console.error(`Failed to load image: ${image}`);
                    e.target.src = "https://via.placeholder.com/800x400?text=Image+Not+Found";
                  }}
                />
              </div>
            ))}
          </div>
          <div className="banner-text">
            <p>AMERICA'S #1 FRIES SINCE 1981</p>
          </div>
          <div className="discount-circle">
            <p>75% OFF</p>
          </div>
        </div>

        {/* Quảng cáo phía dưới */}
        <div className="ad-banners">
          {/* Quảng cáo trái (Fashion Sale) */}
          <div className="ad-banner fashion-sale">
            <img
              src="https://picsum.photos/400/200?random=5"
              alt="Fashion Sale"
              className="ad-image"
              onError={(e) => {
                console.error(`Failed to load image: https://picsum.photos/400/200?random=5`);
                e.target.src = "https://via.placeholder.com/400x200?text=Image+Not+Found";
              }}
            />
            <div className="ad-content">
              <div className="discount-circle">
                <p>70% OFF</p>
              </div>
              <p className="ad-title">SALE</p>
            </div>
          </div>
          {/* Quảng cáo phải (Electronics Sale) */}
          <div className="ad-banner electronics-sale">
            <img
              src="https://picsum.photos/400/200?random=6"
              alt="Electronics Sale"
              className="ad-image"
              onError={(e) => {
                console.error(`Failed to load image: https://picsum.photos/400/200?random=6`);
                e.target.src = "https://via.placeholder.com/400x200?text=Image+Not+Found";
              }}
            />
            <div className="ad-content">
              <div className="discount-circle">
                <p>40% OFF</p>
              </div>
              <p className="ad-title">EVERY THING</p>
              <p className="ad-subtitle">ONLINE ONLY</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slide;