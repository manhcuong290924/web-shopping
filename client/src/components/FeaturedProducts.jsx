// client/src/components/FeaturedProducts.jsx
import React, { useRef, useEffect } from 'react';
import ProductCard from './ProductCard';

const FeaturedProducts = ({ products = [] }) => {
  const scrollRef = useRef(null);
  const isProgrammaticScroll = useRef(false);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  const scrollToProduct = (index) => {
    if (scrollRef.current) {
      const productWidth = scrollRef.current.children[0].offsetWidth;
      const containerWidth = scrollRef.current.offsetWidth;
      const scrollPosition = index * productWidth - (containerWidth - productWidth) / 2;
      scrollRef.current.scrollTo({ left: scrollPosition, behavior: 'smooth' });
    }
  };

  const scrollToStart = () => {
    if (scrollRef.current) {
      isProgrammaticScroll.current = true;
      scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
    }
  };

  const scrollToEnd = () => {
    if (scrollRef.current) {
      isProgrammaticScroll.current = true;
      const productWidth = scrollRef.current.children[0].offsetWidth;
      const scrollPosition = (products.length - 1) * productWidth;
      scrollRef.current.scrollTo({ left: scrollPosition, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current && !isProgrammaticScroll.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;

        if (scrollLeft + clientWidth >= scrollWidth - 1) {
          scrollToStart();
        } else if (scrollLeft <= 0) {
          scrollToEnd();
        }
      }
      isProgrammaticScroll.current = false;
    };

    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', handleScroll);
      }
    };
  }, [products]);

  return (
    <div className="featured-products max-w-7xl mx-auto py-8">
      <div className="product-frame bg-white border border-gray-200 rounded-lg shadow-md">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-orange-500">SẢN PHẨM NỔI BẬT</h2>
          <div className="flex gap-2">
            <button
              onClick={scrollLeft}
              className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              onClick={scrollRight}
              className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
        <div
          ref={scrollRef}
          className="flex overflow-x-auto scroll-smooth scrollbar-hide"
        >
          {products.length > 0 ? (
            products.map((product, index) => (
              <div
                key={product.id}
                className={`flex-shrink-0 w-1/4 border-t border-gray-200 ${
                  index < products.length - 1 ? 'border-r border-gray-200' : ''
                } cursor-pointer`}
                onClick={() => scrollToProduct(index)}
              >
                <ProductCard product={product} showRightBorder={false} />
              </div>
            ))
          ) : (
            <div className="p-6 text-gray-500">Không có sản phẩm nổi bật</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeaturedProducts;