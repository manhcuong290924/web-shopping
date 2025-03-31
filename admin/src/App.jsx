// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SideBar from "./components/SideBar";
import Dashboard from "./components/Dashboard";
import UserPage from "./pages/UserPage";
import ContactPage from "./pages/ContactPage";
import NewsPage from "./pages/NewsPage";
import ProductPage from "./pages/ProductPage"; // Import ProductPage
import DashboardPage from "./pages/DashboardPage";

function App() {
  return (
    <Router>
      <div className="flex">
        <SideBar />
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/users" element={<UserPage />} />
          <Route path="/contacts" element={<ContactPage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/products" element={<ProductPage />} /> {/* Route cho ProductPage */}
          <Route path="/logout" element={<div>Logout Page</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;