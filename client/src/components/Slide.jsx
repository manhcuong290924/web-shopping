import React, { useState, useEffect } from "react";
import "../styles/custom-layout.scss";
import slide1 from "../styles/image/slide1.png";
import slide2 from "../styles/image/slide2.jpg";
import slide3 from "../styles/image/slide3.png";
import slide4 from "../styles/image/slide4.png";
import slide5 from "../styles/image/slide5.webp";
import slide6 from "../styles/image/slide6.jpg";

const Slide = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Danh sách 4 ảnh cho banner chính
  const bannerImages = [slide1, slide2, slide3, slide4];

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
        </div>

        {/* Quảng cáo phía dưới */}
        <div className="ad-banners">
          {/* Quảng cáo trái (Fashion Sale) */}
          <div className="ad-banner slide5">
            <img
              src={slide5}
              alt="slide5"
              className="ad-image"
              onError={(e) => {
                console.error(`Failed to load image: slide5.webp`);
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
          <div className="ad-banner slide6">
            <img
              src={slide6}
              alt="slide6"
              className="ad-image"
              onError={(e) => {
                console.error(`Failed to load image: slide6.jpg`);
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