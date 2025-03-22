// client/src/components/Header.jsx
import React, { useState } from 'react';
import { ShoppingCart, Menu, X, ChevronDown, Search, User } from 'lucide-react';

const menuData = [
  { name: "TRANG CHỦ", link: "/" },
  { name: "GIỚI THIỆU", link: "/gioi-thieu" },
  { name: "SẢN PHẨM", link: "/tat-ca-san-pham" },
  {
    name: "TIN TỨC",
    link: "/tin-tuc-khuyen-mai", // Thêm link cho mục "Tin Tức"
    subMenu: [
      { name: "Tin Tức Khuyến Mãi", link: "/tin-tuc-khuyen-mai" }, // Thêm link cho mục con
    ],
  },
  { name: "LIÊN HỆ", link: "/lien-he" },
];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Tìm kiếm:', searchQuery);
    // Thêm logic tìm kiếm ở đây (gọi API hoặc chuyển hướng)
  };

  return (
    <header className="shadow-md">
      {/* Sub-Header (Logo, Search, User, Cart) */}
      <div className="bg-white p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo */}
          <a href="/" className="text-2xl font-bold text-orange-500">
            TOPDEAL
          </a>

          {/* Search Bar */}
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

          {/* Icons (User and Cart) */}
          <div className="flex items-center gap-4">
            {/* User Icon */}
            <div className="cursor-pointer">
              <User className="w-6 h-6 text-gray-700" />
            </div>

            {/* Cart Icon */}
            <div className="relative cursor-pointer">
              <ShoppingCart className="w-6 h-6 text-gray-700" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                0
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header (Navigation Menu) */}
      <div className="bg-orange-500 text-white">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6" style={{ marginLeft: '180px' }}>
            {menuData.map((item, index) => (
              <div
                key={index}
                className="relative group"
              >
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

                {/* Dropdown Menu */}
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

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <nav className="md:hidden bg-orange-500 text-white border-t">
            {menuData.map((item, index) => (
              <div key={index} className="border-b border-orange-400">
                {item.subMenu ? (
                  <div
                    className="flex justify-between px-4 py-2 hover:bg-orange-600 cursor-pointer"
                    style={{ paddingRight: '180px' }}
                    onClick={() =>
                      setDropdownOpen(dropdownOpen === index ? null : index)
                    }
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

                {/* Mobile Dropdown Menu */}
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