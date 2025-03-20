import React from "react";
import { ShoppingCart } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="bg-blue-500 text-white p-4 flex justify-between">
      <h1 className="text-xl font-bold">Shop</h1>
      <div className="flex items-center">
        <ShoppingCart size={24} />
      </div>
    </nav>
  );
}