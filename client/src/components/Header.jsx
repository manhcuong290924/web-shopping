import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Menu, X, ChevronRight, ChevronDown, Search, User, LogOut } from 'lucide-react';
import {
  getUserFromStorage,
  getCartFromStorage,
  logout,
  removeFromCart,
  increaseCartQuantity,
  decreaseCartQuantity,
} from '../services/authCartService';
import { searchProducts } from '../services/productService';
import debounce from 'lodash/debounce';
import '../styles/Header.scss';
import { Monitor, Home, Footprints, Baby, Shirt, Briefcase, Scissors } from 'lucide-react';

const Header = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [activeSubMenu, setActiveSubMenu] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const [cartPopupOpen, setCartPopupOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [searchPopupOpen, setSearchPopupOpen] = useState(false);
  const searchPopupRef = useRef(null); // Thêm ref để tham chiếu popup tìm kiếm

  useEffect(() => {
    const storedUser = getUserFromStorage();
    console.log("Stored user on mount:", storedUser); // Debug giá trị user
    setCartItems(getCartFromStorage());
    setUser(storedUser);

    const handleStorageChange = (e) => {
      if (e.key === 'cart') setCartItems(getCartFromStorage());
      if (e.key === 'user') setUser(getUserFromStorage());
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Thêm useEffect để xử lý nhấp chuột bên ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchPopupRef.current && !searchPopupRef.current.contains(event.target)) {
        setSearchPopupOpen(false);
      }
    };

    if (searchPopupOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [searchPopupOpen]);

  const debouncedSearch = debounce(async (query) => {
    if (query.trim() === '') {
      setSearchResults([]);
      setSearchPopupOpen(false);
      return;
    }
    try {
      const results = await searchProducts(query);
      setSearchResults(results);
      setSearchPopupOpen(true);
    } catch (error) {
      console.error('Lỗi tìm kiếm:', error.message);
      setSearchResults([]);
      setSearchPopupOpen(false);
    }
  }, 300);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    debouncedSearch(query);
  };

  const handleRemoveFromCart = (id) => {
    const updatedCart = removeFromCart(id, cartItems);
    setCartItems(updatedCart);
  };

  const handleIncreaseQuantity = (id) => {
    const updatedCart = increaseCartQuantity(id, cartItems);
    setCartItems(updatedCart);
  };

  const handleDecreaseQuantity = (id) => {
    const updatedCart = decreaseCartQuantity(id, cartItems);
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
    console.log("User clicked, user state:", user); // Debug sự kiện click
    if (!user) {
      navigate('/dang-nhap');
    } else {
      navigate('/profile');
    }
  };

  const handleLogout = () => {
    logout();
    setUser(null);
    navigate('/');
  };

  const handleProductClick = (id) => {
    setSearchPopupOpen(false);
    navigate(`/products/${id}`);
  };

  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const menuData = [
    { name: "TRANG CHỦ", link: "/" },
    { name: "GIỚI THIỆU", link: "/gioi-thieu" },
    { name: "SẢN PHẨM", link: "/tat-ca-san-pham" },
    { name: "TIN TỨC", link: "/tin-tuc-khuyen-mai", subMenu: [{ name: "Tin Tức Khuyến Mãi", link: "/tin-tuc-khuyen-mai" }] },
    { name: "LIÊN HỆ", link: "/lien-he" },
    { name: "DANH MỤC", isDropdown: true, className: "hide-on-desktop" },
  ];

  const sidebarData = [
    {
      name: "Điện tử",
      icon: Monitor,
      subMenu: [
        { name: "Tất cả sản phẩm", link: "/dien-tu" },
        { name: "Điện thoại", link: "/dien-tu/dien-thoai" },
        { name: "Laptop", link: "/dien-tu/lap-top" },
        { name: "Máy tính bảng", link: "/dien-tu/may-tinh-bang" },
      ],
    },
    {
      name: "Gia dụng và nội thất",
      icon: Home,
      subMenu: [
        { name: "Tất cả sản phẩm", link: "/gia-dung-va-noi-that" },
        { name: "Đồ gia dụng", link: "/gia-dung-va-noi-that/do-gia-dung" },
        { name: "Nội thất", link: "/gia-dung-va-noi-that/noi-that" },
      ],
    },
    { name: "Giày dép", icon: Footprints, link: "/giay-dep" },
    { name: "Mẹ & bé", icon: Baby, link: "/me-va-be" },
    {
      name: "Thời trang",
      icon: Shirt,
      subMenu: [
        { name: "Tất cả sản phẩm", link: "/thoi-trang" },
        { name: "Quần áo nam", link: "/thoi-trang/quan-ao-nam" },
        { name: "Quần áo nữ", link: "/thoi-trang/quan-ao-nu" },
      ],
    },
    { name: "Văn phòng phẩm", icon: Briefcase, link: "/van-phong-pham" },
    { name: "Mỹ Phẩm", icon: Scissors, link: "/my-pham" },
  ];

  return (
    <header className="shadow-md" style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000 }}>
      <div className="bg-white p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <a href="/">
            <img src="/src/logo.jpg" alt="Your Logo" className="h-10 w-auto" />
          </a>

          <form className="flex-1 mx-4 max-w-xl relative">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Bạn muốn tìm gì"
                className="w-full py-2 px-4 rounded-full border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-300"
              />
              <button type="button" className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700">
                <Search className="w-5 h-5" />
              </button>
            </div>
            {searchPopupOpen && (
              <div
                ref={searchPopupRef} // Gắn ref vào popup tìm kiếm
                className="absolute top-12 left-0 w-full max-w-xl bg-white shadow-lg rounded-lg z-50 p-4 max-h-80 overflow-y-auto"
                style={{ border: '1px solid #e5e5e5' }}
              >
                {searchResults.length > 0 ? (
                  <>
                    <h3 className="text-lg font-bold mb-2">Sản phẩm tìm thấy</h3>
                    {searchResults.map((product) => (
                      <div key={product.id} className="flex items-center gap-3 mb-3 border-b pb-2 cursor-pointer hover:bg-gray-100" onClick={() => handleProductClick(product.id)}>
                        {product.imageUrl && <img src={product.imageUrl} alt={product.name} className="w-12 h-12 object-cover rounded" />}
                        <div>
                          <p className="text-sm font-medium">{product.name}</p>
                          <p className="text-xs text-gray-500">
                            {product.discountedPrice.toLocaleString('vi-VN')} đ{' '}
                            {product.discountPercentage > 0 && <span className="text-red-500">(-{product.discountPercentage}%)</span>}
                          </p>
                        </div>
                      </div>
                    ))}
                  </>
                ) : <p className="text-gray-500">Không tìm thấy sản phẩm nào.</p>}
              </div>
            )}
          </form>

          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <div
                className="flex items-center cursor-pointer"
                onClick={handleUserClick}
                style={{ pointerEvents: "auto" }}
              >
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
                  style={{ pointerEvents: "auto" }}
                >
                  <LogOut className="w-6 h-6 text-red-500 hover:text-red-700" />
                </div>
              )}
            </div>

            <div className="relative cursor-pointer" onClick={() => setCartPopupOpen(!cartPopupOpen)}>
              <ShoppingCart className="w-6 h-6 text-gray-700" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">{cartItemCount}</span>
            </div>
            {cartPopupOpen && (
              <div className="absolute right-0 top-12 w-80 bg-white shadow-lg rounded-lg z-50 p-4" style={{ border: '1px solid #e5e5e5' }}>
                <h3 className="text-lg font-bold mb-2">Giỏ hàng ({cartItemCount} sản phẩm)</h3>
                {cartItems.length === 0 ? (
                  <p className="text-gray-500">Giỏ hàng của bạn đang trống.</p>
                ) : (
                  <>
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex items-center gap-3 mb-3 border-b pb-2">
                        <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />
                        <div className="flex-1">
                          <p className="text-sm font-medium">{item.name}</p>
                          <div className="flex items-center gap-2">
                            <button onClick={() => handleDecreaseQuantity(item.id)} className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded" disabled={item.quantity <= 1}>-</button>
                            <span className="text-sm text-gray-500">{item.quantity}</span>
                            <button onClick={() => handleIncreaseQuantity(item.id)} className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded">+</button>
                            <span className="text-sm text-gray-500">x {item.price.toLocaleString('vi-VN')} đ</span>
                          </div>
                        </div>
                        <button onClick={() => handleRemoveFromCart(item.id)} className="text-red-500 hover:text-red-700">✕</button>
                      </div>
                    ))}
                    <div className="flex justify-between font-bold mb-3">
                      <span>Tổng:</span>
                      <span>{total.toLocaleString('vi-VN')} đ</span>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={handleCheckout} className="flex-1 bg-orange-500 text-white py-2 rounded hover:bg-orange-600">Thanh toán</button>
                      <button onClick={handleViewCart} className="flex-1 bg-gray-200 text-gray-700 py-2 rounded hover:bg-gray-300">Giỏ hàng</button>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-orange-500 text-white hidden md:block">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <nav className="flex space-x-6" style={{ marginLeft: '180px' }}>
            {menuData.map((item, index) => (
              <div key={index} className={`relative group ${item.className || ''}`}>
                {item.subMenu || item.isDropdown ? (
                  <div
                    className="flex items-center cursor-pointer hover:text-gray-200"
                    onMouseEnter={() => setDropdownOpen(item.isDropdown ? 'sidebar' : index)}
                  >
                    {item.link ? <Link to={item.link}>{item.name}</Link> : <span>{item.name}</span>}
                    <ChevronDown className="w-4 h-4 ml-1" />
                  </div>
                ) : (
                  <Link to={item.link} className="hover:text-gray-200">{item.name}</Link>
                )}
                {(item.subMenu && dropdownOpen === index) && (
                  <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md z-10" onMouseEnter={() => setDropdownOpen(index)} onMouseLeave={() => setDropdownOpen(null)}>
                    {item.subMenu.map((subItem, subIndex) => (
                      <Link
                        key={subIndex}
                        to={subItem.link}
                        className="block px-4 py-2 text-gray-600 hover:bg-gray-100"
                        onClick={() => setDropdownOpen(null)}
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                )}
                {item.isDropdown && dropdownOpen === 'sidebar' && (
                  <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md z-10" onMouseEnter={() => setDropdownOpen('sidebar')} onMouseLeave={() => setDropdownOpen(null)}>
                    {sidebarData.map((sidebarItem, sidebarIndex) => (
                      <div key={sidebarIndex} className="relative">
                        {sidebarItem.subMenu ? (
                          <>
                            <div
                              className="flex items-center cursor-pointer hover:bg-gray-100 px-4 py-2"
                              onClick={() => {
                                setActiveSubMenu(activeSubMenu === sidebarIndex ? null : sidebarIndex);
                              }}
                            >
                              {sidebarItem.icon && <sidebarItem.icon className="w-5 h-5 mr-2" />}
                              <span className="font-medium">{sidebarItem.name}</span>
                              <ChevronDown className={`w-5 h-5 ml-auto transition-transform duration-200 ${activeSubMenu === sidebarIndex ? 'rotate-180' : ''}`} />
                            </div>
                            {activeSubMenu === sidebarIndex && (
                              <div className="pl-4 bg-gray-50">
                                {sidebarItem.subMenu.map((subItem, subSubIndex) => (
                                  <Link
                                    key={subSubIndex}
                                    to={subItem.link}
                                    className="block px-4 py-2 text-gray-600 hover:bg-gray-200"
                                    onClick={() => {
                                      setDropdownOpen(null);
                                      setActiveSubMenu(null);
                                    }}
                                  >
                                    {subItem.name}
                                  </Link>
                                ))}
                              </div>
                            )}
                          </>
                        ) : (
                          <Link
                            to={sidebarItem.link}
                            className="flex items-center hover:bg-gray-100 px-4 py-2"
                            onClick={() => setDropdownOpen(null)}
                          >
                            {sidebarItem.icon && <sidebarItem.icon className="w-5 h-5 mr-2" />}
                            <span className="font-medium">{sidebarItem.name}</span>
                          </Link>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
      </div>

      <div className="md:hidden">
        <div className="bg-orange-500 text-white">
          <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
            <button className="md:hidden" onClick={() => {
              setMenuOpen(!menuOpen);
              if (!menuOpen) {
                setDropdownOpen(null);
                setActiveSubMenu(null);
              }
            }}>
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
          {menuOpen && (
            <nav className="bg-orange-500 text-white">
              {menuData.map((item, index) => (
                <div key={index} className={`border-b border-orange-400 ${item.className || ''}`}>
                  {item.subMenu || item.isDropdown ? (
                    <div
                      className="flex justify-between px-4 py-2 hover:bg-orange-600 cursor-pointer"
                      onClick={() => setDropdownOpen(dropdownOpen === (item.isDropdown ? 'sidebar' : index) ? null : (item.isDropdown ? 'sidebar' : index))}
                    >
                      {item.link ? (
                        <Link to={item.link} className="text-white font-medium">{item.name}</Link>
                      ) : (
                        <span className="text-white font-medium">{item.name}</span>
                      )}
                      <ChevronDown className={`w-5 h-5 text-white transition-transform duration-200 ${dropdownOpen === (item.isDropdown ? 'sidebar' : index) ? 'rotate-180' : ''}`} />
                    </div>
                  ) : (
                    <Link
                      to={item.link}
                      className="block px-4 py-2 text-white hover:bg-orange-600"
                      onClick={() => setMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )}
                  {item.subMenu && dropdownOpen === index && (
                    <div className="bg-orange-400">
                      {item.subMenu.map((subItem, subIndex) => (
                        <Link
                          key={subIndex}
                          to={subItem.link}
                          className="block px-6 py-2 text-white hover:bg-orange-500"
                          onClick={() => {
                            setMenuOpen(false);
                            setDropdownOpen(null);
                          }}
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                  {item.isDropdown && dropdownOpen === 'sidebar' && (
                    <div className="bg-orange-400">
                      {sidebarData.map((sidebarItem, sidebarIndex) => (
                        <div key={sidebarIndex} className="relative border-b border-orange-400">
                          {sidebarItem.subMenu ? (
                            <>
                              <div className="flex items-center px-4 py-2 hover:bg-orange-600 cursor-pointer">
                                <div
                                  className="flex items-center flex-1"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    console.log('Trước khi nhấn:', activeSubMenu);
                                    const newActiveSubMenu = activeSubMenu === sidebarIndex ? null : sidebarIndex;
                                    setActiveSubMenu(newActiveSubMenu);
                                    console.log('Sau khi nhấn:', newActiveSubMenu);
                                  }}
                                >
                                  {sidebarItem.icon && <sidebarItem.icon className="w-5 h-5 mr-2 text-white" />}
                                  <span className="font-medium text-white">{sidebarItem.name}</span>
                                </div>
                                <ChevronDown
                                  className={`w-5 h-5 text-white transition-transform duration-200 ${activeSubMenu === sidebarIndex ? 'rotate-180' : ''}`}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    console.log('Trước khi nhấn ChevronDown:', activeSubMenu);
                                    const newActiveSubMenu = activeSubMenu === sidebarIndex ? null : sidebarIndex;
                                    setActiveSubMenu(newActiveSubMenu);
                                    console.log('Sau khi nhấn ChevronDown:', newActiveSubMenu);
                                  }}
                                />
                              </div>
                              {activeSubMenu === sidebarIndex && (
                                <div className="bg-orange-500">
                                  {sidebarItem.subMenu.map((subItem, subSubIndex) => (
                                    <Link
                                      key={subSubIndex}
                                      to={subItem.link}
                                      className="block px-6 py-2 text-white hover:bg-orange-600 border-t border-orange-400"
                                      onClick={() => {
                                        setMenuOpen(false);
                                        setDropdownOpen(null);
                                        setActiveSubMenu(null);
                                      }}
                                    >
                                      {subItem.name}
                                    </Link>
                                  ))}
                                </div>
                              )}
                            </>
                          ) : (
                            <Link
                              to={sidebarItem.link}
                              className="flex items-center hover:bg-orange-500 px-4 py-2"
                              onClick={() => {
                                setMenuOpen(false);
                                setDropdownOpen(null);
                                setActiveSubMenu(null);
                              }}
                            >
                              {sidebarItem.icon && <sidebarItem.icon className="w-5 h-5 mr-2 text-white" />}
                              <span className="font-medium text-white">{sidebarItem.name}</span>
                            </Link>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;