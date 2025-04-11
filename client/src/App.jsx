import './styles/index.scss';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
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
import TabletPage from './pages/TabletPage';
import HouseholdPage from './pages/HouseholdPage';
import AppliancesPage from './pages/AppliancesPage';
import FurniturePage from './pages/FurniturePage';
import FootwearPage from './pages/FootwearPage';
import BabyPage from './pages/BabyPage';
import FashionPage from './pages/FashionPage';
import MensClothingPage from './pages/MensClothingPage';
import WomensClothingPage from './pages/WomensClothingPage';
import StationeryPage from './pages/StationeryPage';
import CosmeticsPage from './pages/CosmeticsPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ProfilePage from './pages/ProfilePage';
import PurchaseHistoryPage from './pages/PurchaseHistoryPage';

function App() {
  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return (
    <Router>
      <div style={{ position: 'relative', minHeight: '100vh' }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/gioi-thieu" element={<IntroPage />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/tat-ca-san-pham" element={<ProductPage />} />
          <Route path="/lien-he" element={<ContactPage />} />
          <Route path="/tin-tuc-khuyen-mai" element={<PromotionNewsPage />} />
          <Route path="/tin-tuc-khuyen-mai/:id" element={<PromotionNewsDetailPage />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/dien-tu" element={<ElectronicsPage />} />
          <Route path="/dien-tu/:subCategory" element={<ElectronicsPage />} />
          <Route path="/dien-tu/dien-thoai" element={<PhonePage />} />
          <Route path="/dien-tu/lap-top" element={<LapTopPage />} />
          <Route path="/dien-tu/may-tinh-bang" element={<TabletPage />} />
          <Route path="/gia-dung-va-noi-that" element={<HouseholdPage />} />
          <Route path="/gia-dung-va-noi-that/do-gia-dung" element={<AppliancesPage />} />
          <Route path="/gia-dung-va-noi-that/noi-that" element={<FurniturePage />} />
          <Route path="/giay-dep" element={<FootwearPage />} />
          <Route path="/me-va-be" element={<BabyPage />} />
          <Route path="/thoi-trang" element={<FashionPage />} />
          <Route path="/thoi-trang/quan-ao-nam" element={<MensClothingPage />} />
          <Route path="/thoi-trang/quan-ao-nu" element={<WomensClothingPage />} />
          <Route path="/van-phong-pham" element={<StationeryPage />} />
          <Route path="/my-pham" element={<CosmeticsPage />} />
          <Route path="/gio-hang" element={<CartPage />} />
          <Route path="/thanh-toan" element={<CheckoutPage />} />
          <Route path="/xac-nhan-don-hang" element={<OrderConfirmationPage />} />
          <Route path="/dang-nhap" element={<LoginPage />} />
          <Route path="/dang-ky" element={<RegisterPage />} />
          <Route path="/quen-mat-khau" element={<ForgotPasswordPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/lich-su-mua-hang" element={<PurchaseHistoryPage />} />
          <Route path="*" element={<div>404 - Trang không tồn tại</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;