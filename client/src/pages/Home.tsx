import React from "react";
import ProductCard from "../components/ProductCard";
import { products } from "../data/products";

export default function Home() {
  return (
    <div className="grid grid-cols-3 gap-4 p-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}