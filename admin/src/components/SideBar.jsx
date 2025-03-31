// src/components/SideBar.js
import { Link } from "react-router-dom";
import { FaUsers, FaSignOutAlt, FaThLarge, FaEnvelope, FaNewspaper, FaBox } from "react-icons/fa";

const SideBar = () => {
  return (
    <aside className="w-64 bg-white shadow-md h-screen p-4">
      <div className="flex items-center space-x-2 p-3">
        <div className="bg-blue-600 text-white p-2 rounded-full w-8 h-8 flex items-center justify-center text-lg font-bold">
          A
        </div>
        <span className="font-semibold text-lg">Admin Panel</span>
      </div>

      <nav className="mt-4">
        <ul className="space-y-2">
          <li>
            <Link to="/" className="flex items-center space-x-2 p-2 hover:bg-gray-200 rounded-md">
              <FaThLarge />
              <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link to="/users" className="flex items-center space-x-2 p-2 hover:bg-gray-200 rounded-md">
              <FaUsers />
              <span>Users</span>
            </Link>
          </li>
          <li>
            <Link to="/contacts" className="flex items-center space-x-2 p-2 hover:bg-gray-200 rounded-md">
              <FaEnvelope />
              <span>Contacts</span>
            </Link>
          </li>
          <li>
            <Link to="/news" className="flex items-center space-x-2 p-2 hover:bg-gray-200 rounded-md">
              <FaNewspaper />
              <span>News</span>
            </Link>
          </li>
          <li>
            <Link to="/products" className="flex items-center space-x-2 p-2 hover:bg-gray-200 rounded-md">
              <FaBox />
              <span>Products</span>
            </Link>
          </li>
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