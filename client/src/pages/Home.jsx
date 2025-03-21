// client/src/pages/Home.jsx
import React, { useState, useEffect } from 'react';
import FeaturedProducts from '../components/FeaturedProducts';
import ProductList from '../components/ProductList';
import mockProducts from '../data/mockProducts';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [electronicsProducts, setElectronicsProducts] = useState([]);

  useEffect(() => {
    setFeaturedProducts(mockProducts['Sản phẩm nổi bật'] || []);
    setElectronicsProducts(mockProducts['Điện tử'] || []);

    // Sau này sẽ gọi API
    /*
    const fetchData = async () => {
      try {
        const featuredResponse = await fetch(`${import.meta.env.VITE_API_URL}/api/products?category=featured`);
        const electronicsResponse = await fetch(`${import.meta.env.VITE_API_URL}/api/products?category=electronics`);
        const featuredData = await featuredResponse.json();
        const electronicsData = await electronicsResponse.json();
        setFeaturedProducts(featuredData);
        setElectronicsProducts(electronicsData);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchData();
    */
  }, []);

  return (
    <div>
      <FeaturedProducts products={featuredProducts} />
      <ProductList category="Điện tử" products={electronicsProducts} />
    </div>
  );
};

export default Home;