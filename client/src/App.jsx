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
import ForgotPasswordPage from './pages/ForgotPasswordPage'; // Import ForgotPasswordPage

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

        {/* Route cho danh mục "Gia dụng và Nội thất" */}
        <Route path="/gia-dung-va-noi-that" element={<HouseholdPage />} />

        {/* Route cho danh mục con "Đồ gia dụng" */}
        <Route path="/gia-dung-va-noi-that/do-gia-dung" element={<AppliancesPage />} />

        {/* Route cho danh mục con "Nội thất" */}
        <Route path="/gia-dung-va-noi-that/noi-that" element={<FurniturePage />} />

        {/* Route cho danh mục "Giày dép" */}
        <Route path="/giay-dep" element={<FootwearPage />} />

        {/* Route cho danh mục "Mẹ & bé" */}
        <Route path="/me-va-be" element={<BabyPage />} />

        {/* Route cho danh mục "Thời trang" */}
        <Route path="/thoi-trang" element={<FashionPage />} />

        {/* Route cho danh mục con "Quần áo nam" */}
        <Route path="/thoi-trang/quan-ao-nam" element={<MensClothingPage />} />

        {/* Route cho danh mục con "Quần áo nữ" */}
        <Route path="/thoi-trang/quan-ao-nu" element={<WomensClothingPage />} />

        {/* Route cho danh mục "Văn phòng phẩm" */}
        <Route path="/van-phong-pham" element={<StationeryPage />} />

        {/* Route cho danh mục "Mỹ Phẩm" */}
        <Route path="/my-pham" element={<CosmeticsPage />} />

        {/* Route cho trang giỏ hàng */}
        <Route path="/gio-hang" element={<CartPage />} />

        {/* Route cho trang thanh toán */}
        <Route path="/thanh-toan" element={<CheckoutPage />} />

        {/* Route cho trang xác nhận đơn hàng */}
        <Route path="/xac-nhan-don-hang" element={<OrderConfirmationPage />} />

        {/* Route cho trang đăng nhập */}
        <Route path="/dang-nhap" element={<LoginPage />} />

        {/* Route cho trang đăng ký */}
        <Route path="/dang-ky" element={<RegisterPage />} />

        {/* Route cho trang quên mật khẩu */}
        <Route path="/quen-mat-khau" element={<ForgotPasswordPage />} />

        {/* Route mặc định cho các đường link không tồn tại */}
        <Route path="*" element={<div>404 - Trang không tồn tại</div>} />
      </Routes>
    </Router>
  );
}

export default App;