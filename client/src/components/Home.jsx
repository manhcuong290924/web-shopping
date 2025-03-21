// client/src/pages/Home.jsx
import React from 'react';
import FeaturedProducts from './FeaturedProducts';
import ProductList from './ProductList';
import mockProducts from '../data/mockProducts';

const Home = () => {
  return (
    <div>
      <FeaturedProducts />
      <ProductList
        category="Điện tử"
        products={mockProducts['Điện tử']}
      />
    </div>
  );
};

export default Home;