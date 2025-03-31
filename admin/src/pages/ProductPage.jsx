// src/pages/ProductPage.js
import React, { useState, useEffect } from "react";
import { fetchProducts, deleteProduct, updateProduct, createProduct, searchProducts } from "../services/productService";
import ProductTable from "../components/Product/ProductTable";
import ProductSearch from "../components/Product/ProductSearch";
import ProductForm from "../components/Product/ProductForm";
import Pagination from "../components/Product/Pagination";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [pageSize] = useState(10);

  // Gọi API khi component được mount hoặc khi trang thay đổi
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts(currentPage, pageSize);
        setProducts(data.content);
        setFilteredProducts(data.content);
        setTotalPages(data.totalPages);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    loadProducts();
  }, [currentPage, pageSize]);

  // Hàm xóa sản phẩm
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct(id);
        const updatedProducts = products.filter((product) => product.id !== id);
        setProducts(updatedProducts);
        setFilteredProducts(updatedProducts);
      } catch (err) {
        setError(err.message);
      }
    }
  };

  // Hàm mở form chỉnh sửa
  const handleEdit = (product) => {
    setEditingProduct(product);
    setIsAdding(false);
  };

  // Hàm mở form thêm mới
  const handleAdd = () => {
    setEditingProduct(null);
    setIsAdding(true);
  };

  // Hàm lưu dữ liệu (thêm hoặc sửa)
  const handleSave = async (formData) => {
    try {
      if (isAdding) {
        const newProduct = await createProduct(formData);
        setProducts([...products, newProduct]);
        setFilteredProducts([...products, newProduct]);
      } else {
        const updatedProduct = await updateProduct(editingProduct.id, formData);
        const updatedProducts = products.map((product) =>
          product.id === editingProduct.id ? updatedProduct : product
        );
        setProducts(updatedProducts);
        setFilteredProducts(updatedProducts);
      }
      setEditingProduct(null);
      setIsAdding(false);
    } catch (err) {
      setError(err.message);
    }
  };

  // Hàm hủy thêm/sửa
  const handleCancel = () => {
    setEditingProduct(null);
    setIsAdding(false);
  };

  // Hàm xử lý tìm kiếm
  const handleSearch = async (searchTerm) => {
    try {
      if (!searchTerm) {
        setFilteredProducts(products);
        return;
      }
      const data = await searchProducts(searchTerm);
      setFilteredProducts(data);
    } catch (err) {
      setError(err.message);
    }
  };

  // Hàm xử lý thay đổi trang
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (loading) {
    return <div className="flex-1 p-6 bg-gray-50">Loading...</div>;
  }

  if (error) {
    return <div className="flex-1 p-6 bg-gray-50">Error: {error}</div>;
  }

  return (
    <div className="flex-1 p-6 bg-gray-50">
      <h1 className="text-2xl font-bold mb-6">Product Page</h1>
      <div className="flex justify-between mb-4">
        <ProductSearch onSearch={handleSearch} />
        <button
          onClick={handleAdd}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors duration-200"
        >
          Thêm sản phẩm
        </button>
      </div>
      <ProductTable products={filteredProducts} onDelete={handleDelete} onEdit={handleEdit} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      {(editingProduct || isAdding) && (
        <ProductForm
          product={editingProduct || {}}
          onSave={handleSave}
          onCancel={handleCancel}
          isEdit={!!editingProduct}
        />
      )}
    </div>
  );
};

export default ProductPage;