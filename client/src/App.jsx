// client/src/App.jsx
import './styles/index.scss';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import IntroPage from './pages/IntroPage';
import ProductPage from './pages/ProductPage';
import ContactPage from './pages/ContactPage';
import PromotionNewsPage from './pages/PromotionNewsPage';
import PromotionNewsDetailPage from './pages/PromotionNewsDetailPage';
import ProductDetail from './pages/ProductDetail';
import ElectronicsPage from './pages/ElectronicsPage';
import PhonePage from './pages/PhonePage';
import LapTopPage from './pages/LapTopPage';
import TabletPage from './pages/TabletPage'; // Import TabletPage

function App() {
  return (
    <Router>
      <Routes>
        {/* Các route hiện có */}
        <Route path="/" element={<HomePage />} />
        <Route path="/gioi-thieu" element={<IntroPage />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/tat-ca-san-pham" element={<ProductPage />} />
        <Route path="/lien-he" element={<ContactPage />} />
        <Route path="/tin-tuc-khuyen-mai" element={<PromotionNewsPage />} />
        <Route path="/tin-tuc-khuyen-mai/:id" element={<PromotionNewsDetailPage />} />
        <Route path="/products/:id" element={<ProductDetail />} />

        {/* Route cho danh mục "Điện tử" */}
        <Route path="/dien-tu" element={<ElectronicsPage />} />
        <Route path="/dien-tu/:subCategory" element={<ElectronicsPage />} />

        {/* Route cho danh mục con "Điện thoại" */}
        <Route path="/dien-tu/dien-thoai" element={<PhonePage />} />

        {/* Route cho danh mục con "Laptop" */}
        <Route path="/dien-tu/lap-top" element={<LapTopPage />} />

        {/* Route cho danh mục con "Máy tính bảng" */}
        <Route path="/dien-tu/may-tinh-bang" element={<TabletPage />} />

        {/* Route mặc định cho các đường link không tồn tại */}
        <Route path="*" element={<div>404 - Trang không tồn tại</div>} />
      </Routes>
    </Router>
  );
}

export default App;