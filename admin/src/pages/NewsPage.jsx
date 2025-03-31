// src/pages/NewsPage.js
import React, { useState, useEffect } from "react";
import { fetchNews, deleteNews, updateNews, createNews, searchNews, uploadImage } from "../services/newsService";
import NewsTable from "../components/News/NewsTable"; 
import NewsSearch from "../components/News/NewsSearch"; 
import NewsForm from "../components/News/NewsForm"; 

const NewsPage = () => {
  const [newsItems, setNewsItems] = useState([]);
  const [filteredNews, setFilteredNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingNews, setEditingNews] = useState(null);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    const loadNews = async () => {
      try {
        const data = await fetchNews();
        setNewsItems(data);
        setFilteredNews(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    loadNews();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this news?")) {
      try {
        await deleteNews(id);
        const updatedNews = newsItems.filter((news) => news.id !== id);
        setNewsItems(updatedNews);
        setFilteredNews(updatedNews);
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const handleEdit = (news) => {
    setEditingNews(news);
    setIsAdding(false);
  };

  const handleAdd = () => {
    setEditingNews(null);
    setIsAdding(true);
  };

  const handleSave = async (formData) => {
    try {
      if (isAdding) {
        const newNews = await createNews(formData);
        setNewsItems([...newsItems, newNews]);
        setFilteredNews([...newsItems, newNews]);
      } else {
        const updatedNews = await updateNews(editingNews.id, formData);
        const updatedNewsItems = newsItems.map((news) =>
          news.id === editingNews.id ? updatedNews : news
        );
        setNewsItems(updatedNewsItems);
        setFilteredNews(updatedNewsItems);
      }
      setEditingNews(null);
      setIsAdding(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleCancel = () => {
    setEditingNews(null);
    setIsAdding(false);
  };

  const handleSearch = async (searchTerm) => {
    try {
      if (!searchTerm) {
        setFilteredNews(newsItems);
        return;
      }
      const data = await searchNews(searchTerm);
      setFilteredNews(data);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return <div className="flex-1 p-6 bg-gray-50">Loading...</div>;
  }

  if (error) {
    return <div className="flex-1 p-6 bg-gray-50">Error: {error}</div>;
  }

  return (
    <div className="flex-1 p-6 bg-gray-50">
      <h1 className="text-2xl font-bold mb-6">News Page</h1>
      <div className="flex justify-between mb-4">
        <NewsSearch onSearch={handleSearch} />
        <button
          onClick={handleAdd}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors duration-200"
        >
          Thêm tin tức
        </button>
      </div>
      <NewsTable newsItems={filteredNews} onDelete={handleDelete} onEdit={handleEdit} />
      {(editingNews || isAdding) && (
        <NewsForm
          news={editingNews || {}}
          onSave={handleSave}
          onCancel={handleCancel}
          isEdit={!!editingNews}
        />
      )}
    </div>
  );
};

export default NewsPage;