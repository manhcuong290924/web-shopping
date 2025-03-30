// client/src/components/PromotionNewsDetailContent.jsx
import React from "react";
import "../styles/PromotionNewsDetailPage.scss";

const PromotionNewsDetailContent = ({ article }) => {
  return (
    <div className="promotion-news-detail">
      <h2>{article.title.toUpperCase()}</h2>
      <hr />
      {article.image && (
        <img src={article.image} alt={article.title} className="detail-image" />
      )}
      {article.content && article.content.length > 0 ? (
        article.content.map((paragraph, index) => (
          <React.Fragment key={index}>
            {typeof paragraph === "object" && paragraph.type === "list" ? (
              <ul>
                {paragraph.items.map((item, subIndex) => (
                  <li key={subIndex} dangerouslySetInnerHTML={{ __html: item }} />
                ))}
              </ul>
            ) : (
              <p>{paragraph}</p>
            )}
          </React.Fragment>
        ))
      ) : (
        <p>Không có nội dung bài viết.</p>
      )}
    </div>
  );
};

export default PromotionNewsDetailContent;