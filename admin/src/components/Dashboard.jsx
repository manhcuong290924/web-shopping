import React, { useState, useEffect } from "react";
import axios from "axios";

const Dashboard = () => {
  const [stats, setStats] = useState([
    { title: "Total Users", value: "Loading..." },
    { title: "Revenue", value: "Loading..." },
    { title: "Active Products", value: "Loading..." },
  ]);

  const recentActivity = [
    { user: "U1", action: "User 1 completed an action", time: "1 hour ago" },
    { user: "U2", action: "User 2 completed an action", time: "2 hours ago" },
    { user: "U3", action: "User 3 completed an action", time: "3 hours ago" },
    { user: "U4", action: "User 4 completed an action", time: "4 hours ago" },
    { user: "U5", action: "User 5 completed an action", time: "5 hours ago" },
  ];

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const admin = JSON.parse(sessionStorage.getItem("admin"));
        const token = admin?.token;

        // Lấy tổng số người dùng
        const usersResponse = await axios.get("http://localhost:8080/api/users/total-users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const totalUsers = usersResponse.data.totalUsers;

        // Lấy tổng doanh thu từ các đơn hàng hoàn thành
        const revenueResponse = await axios.get("http://localhost:8080/api/orders/total-revenue", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const totalRevenue = revenueResponse.data.totalRevenue;

        // Lấy tổng số sản phẩm
        const productsResponse = await axios.get("http://localhost:8080/api/products/total-products", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const totalProducts = productsResponse.data.totalProducts;

        // Cập nhật stats
        setStats((prevStats) =>
          prevStats.map((stat) =>
            stat.title === "Total Users"
              ? { ...stat, value: totalUsers.toString() }
              : stat.title === "Revenue"
              ? { ...stat, value: `${totalRevenue.toLocaleString("vi-VN")} VNĐ` }
              : stat.title === "Active Products"
              ? { ...stat, value: totalProducts.toString() }
              : stat
          )
        );
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        setStats((prevStats) =>
          prevStats.map((stat) => ({ ...stat, value: "Error" }))
        );
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-gray-600">{stat.title}</h2>
            <p className="text-2xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <ul>
          {recentActivity.map((activity, index) => (
            <li key={index} className="flex items-center space-x-4 py-3 border-b last:border-b-0">
              <div className="w-10 h-10 flex items-center justify-center bg-gray-200 text-gray-700 rounded-full">
                {activity.user}
              </div>
              <div>
                <p className="text-gray-800">{activity.action}</p>
                <p className="text-gray-500 text-sm">{activity.time}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;