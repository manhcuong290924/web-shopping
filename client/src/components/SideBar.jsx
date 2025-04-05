import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ChevronRight, ChevronDown } from "lucide-react";
import sidebarData from "../data/sidebarData";
import "../styles/Sidebar.scss";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const [activeMenu, setActiveMenu] = useState(null);

  return (
    <>
      <aside
        className={`sidebar-container bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 z-40`}
      >
        {/* Nút toggle cho mobile */}
        <button
          className="toggle-button fixed top-4 left-4 z-50 p-2 bg-orange-500 text-white rounded-md md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Header Sidebar */}
        <div className="p-4 bg-orange-500 text-white flex items-center justify-between">
          <h2 className="text-lg font-bold tracking-wide">DANH MỤC SẢN PHẨM</h2>
          <button className="md:hidden" onClick={() => setIsOpen(false)}>
            <X className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Menu Sidebar */}
        <nav className="sidebar-content mt-2">
          {sidebarData.map((item, index) => (
            <div key={index} className="relative">
              {item.subMenu ? (
                <>
                  <div
                    className="flex items-center justify-between px-4 py-3 text-gray-800 hover:bg-gray-100 cursor-pointer transition-colors duration-200"
                    onClick={() => setActiveMenu(activeMenu === index ? null : index)}
                  >
                    <div className="flex items-center">
                      {item.icon && <item.icon className="w-5 h-5 mr-3" />}
                      <span className="font-medium text-base">{item.name}</span>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
                        activeMenu === index ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                  {activeMenu === index && (
                    <div className="pl-8 space-y-1 bg-gray-50">
                      {item.subMenu.map((subItem, subIndex) => (
                        <Link
                          key={subIndex}
                          to={subItem.link}
                          className="block px-4 py-2 text-gray-600 hover:bg-gray-200 hover:text-gray-800 rounded-md transition-colors duration-200"
                          onClick={() => setIsOpen(false)} // Đóng khi chọn trên mobile
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  to={item.link}
                  className="flex items-center px-4 py-3 text-gray-800 hover:bg-gray-100 transition-colors duration-200"
                  onClick={() => setIsOpen(false)} // Đóng khi chọn trên mobile
                >
                  {item.icon && <item.icon className="w-5 h-5 mr-3" />}
                  <span className="font-medium text-base">{item.name}</span>
                  <ChevronRight className="w-5 h-5 ml-auto text-gray-400" />
                </Link>
              )}
            </div>
          ))}
        </nav>
      </aside>

      {/* Overlay khi sidebar mở trên mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-30"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Sidebar;