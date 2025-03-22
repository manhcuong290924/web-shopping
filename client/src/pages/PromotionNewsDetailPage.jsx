// client/src/pages/PromotionNewsDetailPage.jsx
import { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import Breadcrumb from "../components/Breadcrumb";
import ChatBotIcon from "../components/ChatBotIcon";
import "../styles/custom-layout.scss";
import "../styles/PromotionNewsDetailPage.scss";

const PromotionNewsDetailPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Dữ liệu đường dẫn cho Breadcrumb
  const breadcrumbItems = [
    { title: "Trang chủ", path: "/", icon: "🏠" },
    { title: "Tin tức Khuyến Mãi", path: "/tin-tuc-khuyen-mai" },
    { title: "Chi tiết", path: "/tin-tuc-khuyen-mai/chi-tiet" },
  ];

  return (
    <div className="flex flex-col min-h-screen font-sans">
      {/* Header */}
      <Header />

      <div className="flex flex-1">
        {/* Container chính để chứa Sidebar và nội dung, căn giữa */}
        <div className="content-wrapper flex flex-col md:flex-row">
          {/* Sidebar */}
          <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

          {/* Nội dung chính */}
          <main className="flex-1 p-4 md:p-6">
            {/* Breadcrumb */}
            <Breadcrumb items={breadcrumbItems} />

            {/* Nội dung chi tiết tin tức khuyến mãi */}
            <div className="promotion-news-detail">
              <h2>BA LỰA CHỌN MÁY SẤY QUẦN ÁO DƯỚI 2 TRIỆU ĐỒNG</h2>
              <hr />
              <img
                src="https://cdn.pixabay.com/photo/2016/11/29/09/16/laundry-1869646_1280.jpg"
                alt="Máy sấy quần áo"
                className="detail-image"
              />
              <p>
                Máy sấy quần áo là một thiết bị tiện ích giúp tiết kiệm thời gian và công sức trong việc làm khô quần áo, đặc biệt vào mùa mưa. Dưới đây là ba lựa chọn máy sấy quần áo giá dưới 2 triệu đồng mà bạn có thể cân nhắc:
              </p>
              <ul>
                <li>
                  <strong>Máy sấy quần áo Sunhouse SHD-1234</strong>: Giá khoảng 1.8 triệu đồng, công suất 1000W, phù hợp cho gia đình nhỏ.
                </li>
                <li>
                  <strong>Máy sấy quần áo Kangaroo KG-567</strong>: Giá khoảng 1.9 triệu đồng, có chế độ sấy nhanh, tiết kiệm điện.
                </li>
                <li>
                  <strong>Máy sấy quần áo Nonan ND-789</strong>: Giá khoảng 1.7 triệu đồng, thiết kế nhỏ gọn, dễ di chuyển.
                </li>
              </ul>
              <p>
                Những mẫu máy sấy này đều có giá cả phải chăng, phù hợp với ngân sách hạn chế mà vẫn đảm bảo hiệu quả sử dụng.
              </p>
            </div>
          </main>
        </div>
      </div>

      {/* ChatBotIcon */}
      <ChatBotIcon />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default PromotionNewsDetailPage;