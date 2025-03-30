import Header from "../components/Header";
import SideBar from "../components/SideBar";
import Dashboard from "../components/Dashboard";

const DashboardPage = () => {
  return (
    <div className="flex h-screen">
      {/* Main Content */}
      <div className="flex-1">
        <Header />
        <main className="p-6">
          <Dashboard />
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;
