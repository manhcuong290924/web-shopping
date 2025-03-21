// client/src/pages/ProductDetail.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import mockProducts from '../data/mockProducts';

const ProductDetail = () => {
  const { id } = useParams(); // Lấy id từ URL
  const allProducts = Object.values(mockProducts).flat(); // Lấy tất cả sản phẩm từ mockProducts
  const product = allProducts.find((p) => p.id === parseInt(id)); // Tìm sản phẩm theo id

  if (!product) {
    return <div className="p-6 text-gray-500">Sản phẩm không tồn tại</div>;
  }

  return (
    <div className="product-detail max-w-[1285px] mx-auto py-8">
      <div className="bg-white border border-gray-200 rounded-lg shadow-md p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/2">
            <img src={product.image_url} alt={product.name} className="w-full h-96 object-contain" />
          </div>
          <div className="w-full md:w-1/2">
            <h1 className="text-2xl font-bold text-gray-800">{product.name}</h1>
            <div className="mt-4">
              {product.discount_percentage > 0 ? (
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold text-red-500">
                    {product.discounted_price.toLocaleString()} đ
                  </span>
                  <span className="text-sm text-gray-500 line-through">
                    {product.original_price.toLocaleString()} đ
                  </span>
                  <span className="text-sm text-green-500">
                    -{product.discount_percentage}%
                  </span>
                </div>
              ) : (
                <span className="text-xl font-bold text-red-500">
                  {product.original_price.toLocaleString()} đ
                </span>
              )}
            </div>
            <button className="mt-6 bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600">
              Mua ngay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;