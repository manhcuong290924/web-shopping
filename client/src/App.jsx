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

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/gioi-thieu" element={<IntroPage />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/tat-ca-san-pham" element={<ProductPage />} />
        <Route path="/lien-he" element={<ContactPage />} />
        <Route path="/tin-tuc-khuyen-mai" element={<PromotionNewsPage />} />
        <Route path="/tin-tuc-khuyen-mai/:id" element={<PromotionNewsDetailPage />} />
        <Route path="/products/:id" element={<ProductDetail />} />
      </Routes>
    </Router>
  );
}

export default App;