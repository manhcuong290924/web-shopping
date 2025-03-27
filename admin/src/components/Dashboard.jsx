import React from "react";

const Dashboard = () => {
  // Sample statistics data
  const stats = [
    { title: "Total Users", value: "1,234" },
    { title: "Revenue", value: "$12,345" },
    { title: "Active Products", value: "42" },
  ];

  // Sample recent activity data
  const recentActivity = [
    { user: "U1", action: "User 1 completed an action", time: "1 hour ago" },
    { user: "U2", action: "User 2 completed an action", time: "2 hours ago" },
    { user: "U3", action: "User 3 completed an action", time: "3 hours ago" },
    { user: "U4", action: "User 4 completed an action", time: "4 hours ago" },
    { user: "U5", action: "User 5 completed an action", time: "5 hours ago" },
  ];

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