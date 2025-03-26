import React, { useState, useEffect } from 'react';
import { ShoppingCart, Menu, X, ChevronDown, Search, User, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
  getUserFromStorage,
  getCartFromStorage,
  logout,
  removeFromCart,
  increaseCartQuantity,
  decreaseCartQuantity,
} from '../services/authCartService'; // Import từ dịch vụ

const menuData = [
  { name: "TRANG CHỦ", link: "/" },
  { name: "GIỚI THIỆU", link: "/gioi-thieu" },
  { name: "SẢN PHẨM", link: "/tat-ca-san-pham" },
  {
    name: "TIN TỨC",
    link: "/tin-tuc-khuyen-mai",
    subMenu: [
      { name: "Tin Tức Khuyến Mãi", link: "/tin-tuc-khuyen-mai" },
    ],
  },
  { name: "LIÊN HỆ", link: "/lien-he" },
];

const Header = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const [cartPopupOpen, setCartPopupOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    setCartItems(getCartFromStorage()); // Lấy giỏ hàng từ dịch vụ
    setUser(getUserFromStorage()); // Lấy user từ dịch vụ

    const handleStorageChange = (e) => {
      if (e.key === 'cart') {
        setCartItems(getCartFromStorage());
      }
      if (e.key === 'user') {
        setUser(getUserFromStorage());
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Tìm kiếm:', searchQuery);
  };

  const handleRemoveFromCart = (id) => {
    const updatedCart = removeFromCart(id, cartItems); // Gọi từ dịch vụ
    setCartItems(updatedCart);
  };

  const handleIncreaseQuantity = (id) => {
    const updatedCart = increaseCartQuantity(id, cartItems); // Gọi từ dịch vụ
    setCartItems(updatedCart);
  };

  const handleDecreaseQuantity = (id) => {
    const updatedCart = decreaseCartQuantity(id, cartItems); // Gọi từ dịch vụ
    setCartItems(updatedCart);
  };

  const handleCheckout = () => {
    setCartPopupOpen(false);
    navigate('/thanh-toan');
  };

  const handleViewCart = () => {
    setCartPopupOpen(false);
    navigate('/gio-hang');
  };

  const handleUserClick = () => {
    if (!user) {
      navigate('/dang-nhap');
    }
  };

  const handleLogout = () => {
    logout(); // Gọi từ dịch vụ
    setUser(null);
    navigate('/');
  };

  return (
    <header
      className="shadow-md"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
      }}
    >
      <div className="bg-white p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <a href="/" className="text-2xl font-bold text-orange-500">
            TOPDEAL
          </a>

          <form onSubmit={handleSearch} className="flex-1 mx-4 max-w-xl">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Bạn muốn tìm gì"
                className="w-full py-2 px-4 rounded-full border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-300"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                <Search className="w-5 h-5" />
              </button>
            </div>
          </form>

          <div className="flex items-center gap-8">
            {/* User Icon, Tên và Icon Đăng xuất */}
            <div className="flex items-center gap-2">
              <div className="flex items-center cursor-pointer" onClick={handleUserClick}>
                <User className="w-6 h-6 text-gray-700" />
                {user && (
                  <span className="ml-2 text-gray-700 font-medium">
                    {user.firstName} {user.lastName}
                  </span>
                )}
              </div>
              {user && (
                <div
                  className="cursor-pointer"
                  onClick={handleLogout}
                  title="Đăng xuất"
                >
                  <LogOut className="w-6 h-6 text-red-500 hover:text-red-700" />
                </div>
              )}
            </div>

            {/* Cart Icon */}
            <div className="relative cursor-pointer" onClick={() => setCartPopupOpen(!cartPopupOpen)}>
              <ShoppingCart className="w-6 h-6 text-gray-700" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                {cartItemCount}
              </span>
            </div>

            {/* Cart Popup */}
            {cartPopupOpen && (
              <div
                className="absolute right-0 top-16 w-80 bg-white shadow-lg rounded-lg z-50 p-4"
                style={{ border: '1px solid #e5e5e5' }}
              >
                <h3 className="text-lg font-bold mb-2">
                  Giỏ hàng ({cartItemCount} sản phẩm)
                </h3>
                {cartItems.length === 0 ? (
                  <p className="text-gray-500">Giỏ hàng của bạn đang trống.</p>
                ) : (
                  <>
                    {cartItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-3 mb-3 border-b pb-2"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                        <div className="flex-1">
                          <p className="text-sm font-medium">{item.name}</p>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleDecreaseQuantity(item.id)}
                              className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded"
                              disabled={item.quantity <= 1}
                            >
                              -
                            </button>
                            <span className="text-sm text-gray-500">{item.quantity}</span>
                            <button
                              onClick={() => handleIncreaseQuantity(item.id)}
                              className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded"
                            >
                              +
                            </button>
                            <span className="text-sm text-gray-500">
                              x {item.price.toLocaleString('vi-VN')} đ
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={() => handleRemoveFromCart(item.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                    <div className="flex justify-between font-bold mb-3">
                      <span>Tổng:</span>
                      <span>{total.toLocaleString('vi-VN')} đ</span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={handleCheckout}
                        className="flex-1 bg-orange-500 text-white py-2 rounded hover:bg-orange-600"
                      >
                        Thanh toán
                      </button>
                      <button
                        onClick={handleViewCart}
                        className="flex-1 bg-gray-200 text-gray-700 py-2 rounded hover:bg-gray-300"
                      >
                        Giỏ hàng
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Header (Navigation Menu) */}
      <div className="bg-orange-500 text-white">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <nav className="hidden md:flex space-x-6" style={{ marginLeft: '180px' }}>
            {menuData.map((item, index) => (
              <div key={index} className="relative group">
                {item.subMenu ? (
                  <div
                    className="flex items-center cursor-pointer hover:text-gray-200"
                    onMouseEnter={() => setDropdownOpen(index)}
                  >
                    <a href={item.link}>{item.name}</a>
                    <ChevronDown className="w-4 h-4 ml-1" />
                  </div>
                ) : (
                  <a href={item.link} className="hover:text-gray-200">
                    {item.name}
                  </a>
                )}
                {item.subMenu && dropdownOpen === index && (
                  <div
                    className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md z-10"
                    onMouseEnter={() => setDropdownOpen(index)}
                    onMouseLeave={() => setDropdownOpen(null)}
                  >
                    {item.subMenu.map((subItem, subIndex) => (
                      <a
                        key={subIndex}
                        href={subItem.link}
                        className="block px-4 py-2 text-gray-600 hover:bg-gray-100"
                      >
                        {subItem.name}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        {menuOpen && (
          <nav className="md:hidden bg-orange-500 text-white border-t">
            {menuData.map((item, index) => (
              <div key={index} className="border-b border-orange-400">
                {item.subMenu ? (
                  <div
                    className="flex justify-between px-4 py-2 hover:bg-orange-600 cursor-pointer"
                    style={{ paddingRight: '180px' }}
                    onClick={() => setDropdownOpen(dropdownOpen === index ? null : index)}
                  >
                    <a href={item.link}>{item.name}</a>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                ) : (
                  <a
                    href={item.link}
                    className="block px-4 py-2 hover:bg-orange-600"
                    style={{ paddingRight: '180px' }}
                  >
                    {item.name}
                  </a>
                )}
                {item.subMenu && dropdownOpen === index && (
                  <div className="bg-orange-400">
                    {item.subMenu.map((subItem, subIndex) => (
                      <a
                        key={subIndex}
                        href={subItem.link}
                        className="block px-6 py-2 text-white hover:bg-orange-500"
                        style={{ paddingRight: '100px' }}
                      >
                        {subItem.name}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
