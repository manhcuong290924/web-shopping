// client/src/components/NewsTable.js
import React from "react";

const NewsTable = ({ newsItems, onDelete, onEdit }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-gray-600 mb-4">News List</h2>
      {newsItems.length === 0 ? (
        <p>No news found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="p-3 text-left text-sm font-semibold text-gray-600">ID</th>
                <th className="p-3 text-left text-sm font-semibold text-gray-600">Title</th>
                <th className="p-3 text-left text-sm font-semibold text-gray-600">Image</th>
                <th className="p-3 text-left text-sm font-semibold text-gray-600">Created At</th>
                <th className="p-3 text-left text-sm font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {newsItems.map((news, index) => (
                <tr key={news.id} className="border-b hover:bg-gray-50">
                  <td className="p-3 text-sm text-gray-700">{index + 1}</td>
                  <td className="p-3 text-sm text-gray-700">{news.title}</td>
                  <td className="p-3 text-sm text-gray-700">
                    {news.image ? (
                      <img
                        src={news.image}
                        alt={news.title}
                        className="w-20 h-20 object-cover rounded"
                      />
                    ) : (
                      "N/A"
                    )}
                  </td>
                  <td className="p-3 text-sm text-gray-700">
                    {new Date(news.createdAt).toLocaleString()}
                  </td>
                  <td className="p-3 text-sm text-gray-700 space-x-2">
                    <button
                      className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                      onClick={() => onEdit(news)}
                    >
                      Edit
                    </button>
                    <button
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                      onClick={() => onDelete(news.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default NewsTable;