import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import sidebarData from "../data/sidebarData";

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);

  return (
    <>
      {/* Sidebar Toggle Button (Mobile) */}
      <button
        className="fixed top-4 left-4 z-50 p-2 bg-blue-600 text-white rounded-md md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-64"
        } md:translate-x-0 md:w-56 md:static`}
      >
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-semibold">Danh Mục</h2>
          <button className="md:hidden" onClick={() => setIsOpen(false)}>
            <X className="w-6 h-6 text-gray-700" />
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="mt-4">
          {sidebarData.map((item, index) => (
            <div key={index} className="relative">
              {item.subMenu ? (
                <>
                  {/* Expandable Parent Menu */}
                  <div
                    className="flex items-center justify-between px-6 py-3 text-gray-700 hover:bg-gray-100 cursor-pointer"
                    onClick={() =>
                      setActiveMenu(activeMenu === index ? null : index)
                    }
                  >
                    <div className="flex items-center">
                      <item.icon className="w-5 h-5 mr-3" />
                      {item.name}
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 transition-transform ${
                        activeMenu === index ? "rotate-180" : ""
                      }`}
                    />
                  </div>

                  {/* Dropdown Submenu */}
                  {activeMenu === index && (
                    <div className="pl-10 space-y-1 bg-gray-50">
                      {item.subMenu.map((subItem, subIndex) => (
                        <a
                          key={subIndex}
                          href="#"
                          className="block px-4 py-2 text-gray-600 hover:bg-gray-200 rounded-md"
                        >
                          {subItem}
                        </a>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                // Normal Menu Item
                <a
                  href={item.link}
                  className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100"
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.name}
                </a>
              )}
            </div>
          ))}
        </nav>
      </aside>

      {/* Overlay for Mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};

export default SideBar;
