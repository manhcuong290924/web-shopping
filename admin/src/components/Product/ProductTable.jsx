import React from "react";

const ProductTable = ({ products, onDelete, onEdit }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-gray-600 mb-4">Product List</h2>
      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="max-h-[500px] overflow-y-auto">
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border">
              <thead>
                <tr className="bg-gray-100 border-b">
                  <th className="p-3 text-left text-sm font-semibold text-gray-600">ID</th>
                  <th className="p-3 text-left text-sm font-semibold text-gray-600">Name</th>
                  <th className="p-3 text-left text-sm font-semibold text-gray-600">Category</th>
                  <th className="p-3 text-left text-sm font-semibold text-gray-600">SubCategory</th>
                  <th className="p-3 text-left text-sm font-semibold text-gray-600">Image</th>
                  <th className="p-3 text-left text-sm font-semibold text-gray-600">Original Price</th>
                  <th className="p-3 text-left text-sm font-semibold text-gray-600">Discounted Price</th>
                  <th className="p-3 text-left text-sm font-semibold text-gray-600">Discount %</th>
                  <th className="p-3 text-left text-sm font-semibold text-gray-600">Quantity</th>
                  <th className="p-3 text-left text-sm font-semibold text-gray-600">Description</th>
                  <th className="p-3 text-left text-sm font-semibold text-gray-600">Created At</th>
                  <th className="p-3 text-left text-sm font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr key={product.id} className="border-b hover:bg-gray-50">
                    <td className="p-3 text-sm text-gray-700">{index + 1}</ td>
                    <td className="p-3 text-sm text-gray-700">{product.name}</td>
                    <td className="p-3 text-sm text-gray-700">{product.category}</td>
                    <td className="p-3 text-sm text-gray-700">{product.subCategory || "N/A"}</td>
                    <td className="p-3 text-sm text-gray-700">
                      {product.imageUrl ? (
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="w-20 h-20 object-cover rounded"
                          onError={(e) => (e.target.src = "https://via.placeholder.com/80?text=No+Image")}
                        />
                      ) : (
                        "N/A"
                      )}
                    </td>
                    <td className="p-3 text-sm text-gray-700">{product.originalPrice.toLocaleString()} VNĐ</td>
                    <td className="p-3 text-sm text-gray-700">{product.discountedPrice.toLocaleString()} VNĐ</td>
                    <td className="p-3 text-sm text-gray-700">{product.discountPercentage}%</td>
                    <td className="p-3 text-sm text-gray-700">{product.quantity.toLocaleString()}</td>
                    <td className="p-3 text-sm text-gray-700">{product.desc}</td>
                    <td className="p-3 text-sm text-gray-700">
                      {new Date(product.createdDate).toLocaleString()}
                    </td>
                    <td className="p-3 text-sm text-gray-700 space-x-2">
                      <button
                        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                        onClick={() => onEdit(product)}
                      >
                        Edit
                      </button>
                      <button
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                        onClick={() => onDelete(product.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductTable;