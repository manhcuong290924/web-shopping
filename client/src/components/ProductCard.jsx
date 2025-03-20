// client/src/components/ProductCard.jsx
import React from 'react';

const ProductCard = ({ product, showRightBorder }) => {
  const { image_url, name, original_price, discounted_price, discount_percentage } = product;

  return (
    <div
      className={`product-card p-6 border-t border-gray-200 ${
        showRightBorder ? 'border-r border-gray-200' : ''
      }`}
    >
      <div className="relative">
        <img src={image_url} alt={name} className="w-full h-48 object-contain" />
        {discount_percentage > 0 && (
          <span className="discount-badge">
            -{discount_percentage}%
          </span>
        )}
      </div>
      <div className="mt-2">
        <h3 className="text-base font-medium text-gray-800 leading-tight">{name}</h3>
        <div className="price mt-1">
          {discount_percentage > 0 ? (
            <>
              <span className="original text-gray-500">
                {original_price.toLocaleString()} đ
              </span>
              <span className="discounted text-red-500 font-bold">
                {discounted_price.toLocaleString()} đ
              </span>
            </>
          ) : (
            <span className="discounted text-red-500 font-bold">
              {original_price.toLocaleString()} đ
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;