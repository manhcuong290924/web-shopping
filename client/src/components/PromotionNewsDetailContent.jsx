import React from "react";
import "../styles/PromotionNewsDetailPage.scss";

const PromotionNewsDetailContent = ({ article }) => {
  if (!article) {
    return <div className="promotion-news-detail">Không có dữ liệu bài viết.</div>;
  }

  return (
    <div className="promotion-news-detail">
      {/* Tiêu đề */}
      <h2>{article.title.toUpperCase()}</h2>
      <hr />

      {/* Hình ảnh chính */}
      {article.image && (
        <img src={article.image} alt={article.title} className="detail-image" />
      )}

      {/* Nội dung bài viết */}
      {article.content && article.content.length > 0 ? (
        article.content.map((paragraph, index) => (
          <div
            key={index}
            className="content-paragraph"
            dangerouslySetInnerHTML={{ __html: paragraph }}
          />
        ))
      ) : (
        <p>Không có nội dung bài viết.</p>
      )}
    </div>
  );
};

export default PromotionNewsDetailContent;