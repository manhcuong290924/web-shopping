import { useState } from "react";
import { ShoppingCart, Menu, X, ChevronDown } from "lucide-react";

const menuData = [
  { name: "Trang Chủ", link: "/" },
  { name: "Giới Thiệu", link: "/gioi-thieu" },
  {
    name: "Sản Phẩm",
    subMenu: ["Mẹ và Bé", "Quần Áo", "Giày Dép"],
  },
  {
    name: "Tin Tức",
    subMenu: ["Tin Tức Khuyến Mãi"],
  },
];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <a href="#" className="text-2xl font-bold text-blue-600">
          MyShop
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6">
          {menuData.map((item, index) => (
            <div
              key={index}
              className="relative"
              onMouseEnter={() => setDropdownOpen(index)}
              onMouseLeave={() => setDropdownOpen(index)}
            >
              {item.subMenu ? (
                <div className="flex items-center cursor-pointer text-gray-600 hover:text-blue-600">
                  {item.name}
                  <ChevronDown className="w-4 h-4 ml-1" />
                </div>
              ) : (
                <a href={item.link} className="text-gray-600 hover:text-blue-600">
                  {item.name}
                </a>
              )}

              {/* Dropdown Menu */}
              {item.subMenu && dropdownOpen === index && (
                <div 
                  className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md z-10"
                  onMouseEnter={() => setDropdownOpen(index)}  // Keeps dropdown open
                  onMouseLeave={() => setDropdownOpen(null)}    // Closes when leaving dropdown
                >
                  {item.subMenu.map((subItem, subIndex) => (
                    <a
                      key={subIndex}
                      href="#"
                      className="block px-4 py-2 text-gray-600 hover:bg-gray-100"
                    >
                      {subItem}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Cart Icon */}
        <div className="relative cursor-pointer">
          <ShoppingCart className="w-6 h-6 text-gray-700" />
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
            3
          </span>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <nav className="md:hidden bg-white border-t">
          {menuData.map((item, index) => (
            <div key={index} className="border-b">
              {item.subMenu ? (
                <div
                  className="flex justify-between px-4 py-2 text-gray-600 hover:bg-gray-100 cursor-pointer"
                  onClick={() =>
                    setDropdownOpen(dropdownOpen === index ? null : index)
                  }
                >
                  {item.name}
                  <ChevronDown className="w-4 h-4" />
                </div>
              ) : (
                <a href={item.link} className="block px-4 py-2 text-gray-600 hover:bg-gray-100">
                  {item.name}
                </a>
              )}

              {/* Mobile Dropdown Menu */}
              {item.subMenu && dropdownOpen === index && (
                <div className="bg-gray-50">
                  {item.subMenu.map((subItem, subIndex) => (
                    <a
                      key={subIndex}
                      href="#"
                      className="block px-6 py-2 text-gray-600 hover:bg-gray-200"
                    >
                      {subItem}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      )}
    </header>
  );
};

export default Header;
