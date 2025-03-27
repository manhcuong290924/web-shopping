import { useState } from "react";
import { Link } from "react-router-dom";
import { FaUsers, FaBox, FaShoppingCart, FaUser, FaBell, FaCog, FaQuestionCircle, FaSignOutAlt, FaThLarge } from "react-icons/fa";

const SideBar = () => {
  const [openMenu, setOpenMenu] = useState(null);

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  return (
    <aside className="w-64 bg-white shadow-md h-screen p-4">
      {/* Logo */}
      <div className="flex items-center space-x-2 p-3">
        <div className="bg-blue-600 text-white p-2 rounded-full w-8 h-8 flex items-center justify-center text-lg font-bold">A</div>
        <span className="font-semibold text-lg">Admin Panel</span>
      </div>

      {/* Sidebar Menu */}
      <nav className="mt-4">
        <ul className="space-y-2">
          {/* Dashboard */}
          <li>
            <Link to="/" className="flex items-center space-x-2 p-2 hover:bg-gray-200 rounded-md">
              <FaThLarge />
              <span>Dashboard</span>
            </Link>
          </li>

          {/* Users - Collapsible Menu */}
          <li>
            <button
              onClick={() => toggleMenu("users")}
              className="flex items-center justify-between w-full p-2 hover:bg-gray-200 rounded-md"
            >
              <div className="flex items-center space-x-2">
                <FaUsers />
                <span>Users</span>
              </div>
              <span>{openMenu === "users" ? "▲" : "▼"}</span>
            </button>
            {openMenu === "users" && (
              <ul className="ml-6 space-y-1">
                <li><Link to="/users/list" className="block p-2 hover:bg-gray-100 rounded-md">User List</Link></li>
                <li><Link to="/users/add" className="block p-2 hover:bg-gray-100 rounded-md">Add User</Link></li>
                <li><Link to="/users/roles" className="block p-2 hover:bg-gray-100 rounded-md">User Roles</Link></li>
              </ul>
            )}
          </li>

          {/* Products - Collapsible Menu */}
          <li>
            <button
              onClick={() => toggleMenu("products")}
              className="flex items-center justify-between w-full p-2 hover:bg-gray-200 rounded-md"
            >
              <div className="flex items-center space-x-2">
                <FaBox />
                <span>Products</span>
              </div>
              <span>{openMenu === "products" ? "▲" : "▼"}</span>
            </button>
            {openMenu === "products" && (
              <ul className="ml-6 space-y-1">
                <li><Link to="/products/list" className="block p-2 hover:bg-gray-100 rounded-md">Product List</Link></li>
                <li><Link to="/products/add" className="block p-2 hover:bg-gray-100 rounded-md">Add Product</Link></li>
                <li><Link to="/products/categories" className="block p-2 hover:bg-gray-100 rounded-md">Categories</Link></li>
              </ul>
            )}
          </li>

          {/* Other Menu Items
          <li>
            <Link to="/orders" className="flex items-center space-x-2 p-2 hover:bg-gray-200 rounded-md">
              <FaShoppingCart />
              <span>Orders</span>
            </Link>
          </li>
          <li>
            <Link to="/customers" className="flex items-center space-x-2 p-2 hover:bg-gray-200 rounded-md">
              <FaUser />
              <span>Customers</span>
            </Link>
          </li>
          <li>
            <Link to="/notifications" className="flex items-center space-x-2 p-2 hover:bg-gray-200 rounded-md">
              <FaBell />
              <span>Notifications</span>
            </Link>
          </li>
          <li>
            <Link to="/settings" className="flex items-center space-x-2 p-2 hover:bg-gray-200 rounded-md">
              <FaCog />
              <span>Settings</span>
            </Link>
          </li>
          <li>
            <Link to="/help" className="flex items-center space-x-2 p-2 hover:bg-gray-200 rounded-md">
              <FaQuestionCircle />
              <span>Help & Support</span>
            </Link>
          </li> */}
          <li>
            <Link to="/logout" className="flex items-center space-x-2 p-2 hover:bg-gray-200 rounded-md text-red-600">
              <FaSignOutAlt />
              <span>Logout</span>
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default SideBar;