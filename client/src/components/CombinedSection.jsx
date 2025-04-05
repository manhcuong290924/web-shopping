import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import { fetchHouseholdProducts } from "../services/householdService";
import { fetchStationeryProducts } from "../services/stationeryService";
import { fetchFootwearProducts } from "../services/footwearService";
import "../styles/custom-layout.scss";

const CombinedSection = () => {
  const [householdProducts, setHouseholdProducts] = useState([]); // Sản phẩm Gia dụng và Nội thất
  const [stationeryProducts, setStationeryProducts] = useState([]); // Sản phẩm Văn phòng phẩm
  const [footwearProducts, setFootwearProducts] = useState([]); // Sản phẩm Giày dép
  const [loading, setLoading] = useState(true); // Trạng thái loading
  const [error, setError] = useState(null); // Trạng thái lỗi
  const [currentIndexHousehold, setCurrentIndexHousehold] = useState(0); // Theo dõi sản phẩm hiện tại (Gia dụng và Nội thất)
  const [currentIndexStationery, setCurrentIndexStationery] = useState(0); // Theo dõi sản phẩm hiện tại (Văn phòng phẩm)
  const [currentIndexFootwear, setCurrentIndexFootwear] = useState(0); // Theo dõi sản phẩm hiện tại (Giày dép)
  const householdRef = useRef(null); // Ref cho carousel Gia dụng và Nội thất
  const stationeryRef = useRef(null); // Ref cho carousel Văn phòng phẩm
  const footwearRef = useRef(null); // Ref cho carousel Giày dép

  // Hàm lấy ngẫu nhiên 3 sản phẩm từ danh sách
  const getRandomProducts = (products, count) => {
    const shuffled = [...products].sort(() => 0.5 - Math.random()); // Xáo trộn mảng
    return shuffled.slice(0, count); // Lấy count sản phẩm đầu tiên
  };

  // Lấy danh sách sản phẩm từ backend
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);

        // Lấy sản phẩm Gia dụng và Nội thất
        const householdData = await fetchHouseholdProducts();
        setHouseholdProducts(getRandomProducts(householdData, 3));

        // Lấy sản phẩm Văn phòng phẩm
        const stationeryData = await fetchStationeryProducts();
        setStationeryProducts(getRandomProducts(stationeryData, 3));

        // Lấy sản phẩm Giày dép
        const footwearData = await fetchFootwearProducts();
        setFootwearProducts(getRandomProducts(footwearData, 3));
      } catch (error) {
        console.error("Error loading combined products:", error);
        setError(error.message || "Không thể tải danh sách sản phẩm.");
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []); // Chỉ gọi API một lần khi component được mount

  // Theo dõi vị trí sản phẩm hiện tại khi vuốt (Gia dụng và Nội thất)
  useEffect(() => {
    const carousel = householdRef.current;
    if (!carousel) return;

    const handleScroll = () => {
      const scrollLeft = carousel.scrollLeft;
      const itemWidth = carousel.offsetWidth;
      const newIndex = Math.round(scrollLeft / itemWidth);
      setCurrentIndexHousehold(newIndex);
    };

    carousel.addEventListener("scroll", handleScroll);
    return () => carousel.removeEventListener("scroll", handleScroll);
  }, [householdProducts]);

  // Theo dõi vị trí sản phẩm hiện tại khi vuốt (Văn phòng phẩm)
  useEffect(() => {
    const carousel = stationeryRef.current;
    if (!carousel) return;

    const handleScroll = () => {
      const scrollLeft = carousel.scrollLeft;
      const itemWidth = carousel.offsetWidth;
      const newIndex = Math.round(scrollLeft / itemWidth);
      setCurrentIndexStationery(newIndex);
    };

    carousel.addEventListener("scroll", handleScroll);
    return () => carousel.removeEventListener("scroll", handleScroll);
  }, [stationeryProducts]);

  // Theo dõi vị trí sản phẩm hiện tại khi vuốt (Giày dép)
  useEffect(() => {
    const carousel = footwearRef.current;
    if (!carousel) return;

    const handleScroll = () => {
      const scrollLeft = carousel.scrollLeft;
      const itemWidth = carousel.offsetWidth;
      const newIndex = Math.round(scrollLeft / itemWidth);
      setCurrentIndexFootwear(newIndex);
    };

    carousel.addEventListener("scroll", handleScroll);
    return () => carousel.removeEventListener("scroll", handleScroll);
  }, [footwearProducts]);

  return (
    <div className="combined-section max-w-[80rem] mx-auto py-2">
      <div className="combined-frame bg-white border border-gray-200 rounded-lg shadow-md">
        {/* Hiển thị ba danh mục cạnh nhau */}
        <div className="flex flex-col md:flex-row gap-4 p-1">
          {/* Gia dụng và Nội thất */}
          <div className="flex-1 flex flex-col">
            <h3 className="text-xl font-bold text-orange-500 mb-2 text-center">
              GIA DỤNG VÀ NỘI THẤT
            </h3>
            <div className="carousel-container">
              <div ref={householdRef} className="carousel-wrapper">
                {loading ? (
                  <div className="p-1.5 text-gray-500">Đang tải...</div>
                ) : error ? (
                  <div className="p-1.5 text-red-500">{error}</div>
                ) : householdProducts.length > 0 ? (
                  <div className="carousel">
                    {householdProducts.map((product) => (
                      <div className="carousel-item" key={product.id}>
                        <ProductCard
                          product={product}
                          showRightBorder={false}
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-1.5 text-gray-500">Không có sản phẩm</div>
                )}
              </div>
              {/* Chấm tròn pagination (chỉ hiển thị trên mobile) */}
              {householdProducts.length > 0 && (
                <div className="carousel-dots">
                  {householdProducts.map((_, index) => (
                    <span
                      key={index}
                      className={`dot ${currentIndexHousehold === index ? 'active' : ''}`}
                    ></span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Văn phòng phẩm */}
          <div className="flex-1 flex flex-col">
            <h3 className="text-xl font-bold text-orange-500 mb-2 text-center">
              VĂN PHÒNG PHẨM
            </h3>
            <div className="carousel-container">
              <div ref={stationeryRef} className="carousel-wrapper">
                {loading ? (
                  <div className="p-1.5 text-gray-500">Đang tải...</div>
                ) : error ? (
                  <div className="p-1.5 text-red-500">{error}</div>
                ) : stationeryProducts.length > 0 ? (
                  <div className="carousel">
                    {stationeryProducts.map((product) => (
                      <div className="carousel-item" key={product.id}>
                        <ProductCard
                          product={product}
                          showRightBorder={false}
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-1.5 text-gray-500">Không có sản phẩm</div>
                )}
              </div>
              {/* Chấm tròn pagination (chỉ hiển thị trên mobile) */}
              {stationeryProducts.length > 0 && (
                <div className="carousel-dots">
                  {stationeryProducts.map((_, index) => (
                    <span
                      key={index}
                      className={`dot ${currentIndexStationery === index ? 'active' : ''}`}
                    ></span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Giày dép */}
          <div className="flex-1 flex flex-col relative">
            <h3 className="text-xl font-bold text-orange-500 mb-2 text-center">
              GIÀY DÉP
            </h3>
            <div className="view-all-container">
              <Link
                to="/products"
                className="text-orange-500 hover:underline text-sm"
              >
                Xem tất cả >
              </Link>
            </div>
            <div className="carousel-container">
              <div ref={footwearRef} className="carousel-wrapper">
                {loading ? (
                  <div className="p-1.5 text-gray-500">Đang tải...</div>
                ) : error ? (
                  <div className="p-1.5 text-red-500">{error}</div>
                ) : footwearProducts.length > 0 ? (
                  <div className="carousel">
                    {footwearProducts.map((product) => (
                      <div className="carousel-item" key={product.id}>
                        <ProductCard
                          product={product}
                          showRightBorder={false}
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-1.5 text-gray-500">Không có sản phẩm</div>
                )}
              </div>
              {/* Chấm tròn pagination (chỉ hiển thị trên mobile) */}
              {footwearProducts.length > 0 && (
                <div className="carousel-dots">
                  {footwearProducts.map((_, index) => (
                    <span
                      key={index}
                      className={`dot ${currentIndexFootwear === index ? 'active' : ''}`}
                    ></span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CombinedSection;