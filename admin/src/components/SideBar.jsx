import { useNavigate } from "react-router-dom";
import { FaUsers, FaSignOutAlt, FaThLarge, FaEnvelope, FaNewspaper, FaBox, FaShoppingCart } from "react-icons/fa";

const SideBar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const admin = JSON.parse(sessionStorage.getItem("admin"));
      const token = admin?.token;

      const response = await fetch("http://localhost:8080/api/admins/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token && { "Authorization": `Bearer ${token}` }), // Gửi token nếu có
        },
      });

      if (response.ok) {
        console.log("Logged out successfully");
        sessionStorage.removeItem("admin"); // Xóa sessionStorage khi logout
        navigate("/admin/login"); // Chuyển hướng về trang đăng nhập
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error during logout:", error);
      sessionStorage.removeItem("admin"); // Xóa session ngay cả khi API lỗi
      navigate("/admin/login"); // Chuyển hướng về trang đăng nhập
    }
  };

  return (
    <aside className="w-64 bg-white shadow-md h-screen p-4">
     <div className="flex items-center space-x-2 p-3">
  <div className="bg-blue-600 text-white p-2 rounded-full w-8 h-8 flex items-center justify-center">
    <img src="./src/admin.jpg" alt="Logo" className="w-full h-full object-cover rounded-full" /> 
  </div>
  <span className="font-semibold text-lg">Admin Function</span>
</div>

      <nav className="mt-4">
        <ul className="space-y-2">
          <li>
            <a href="/dashboard" className="flex items-center space-x-2 p-2 hover:bg-gray-200 rounded-md">
              <FaThLarge />
              <span>Dashboard</span>
            </a>
          </li>
          <li>
            <a href="/users" className="flex items-center space-x-2 p-2 hover:bg-gray-200 rounded-md">
              <FaUsers />
              <span>Users</span>
            </a>
          </li>
          <li>
            <a href="/contacts" className="flex items-center space-x-2 p-2 hover:bg-gray-200 rounded-md">
              <FaEnvelope />
              <span>Contacts</span>
            </a>
          </li>
          <li>
            <a href="/news" className="flex items-center space-x-2 p-2 hover:bg-gray-200 rounded-md">
              <FaNewspaper />
              <span>News</span>
            </a>
          </li>
          <li>
            <a href="/products" className="flex items-center space-x-2 p-2 hover:bg-gray-200 rounded-md">
              <FaBox />
              <span>Products</span>
            </a>
          </li>
          <li>
            <a href="/orders" className="flex items-center space-x-2 p-2 hover:bg-gray-200 rounded-md">
              <FaShoppingCart />
              <span>Orders</span>
            </a>
          </li>
          <li>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 p-2 hover:bg-gray-200 rounded-md text-red-600 w-full text-left"
            >
              <FaSignOutAlt />
              <span>Logout</span>
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default SideBar;