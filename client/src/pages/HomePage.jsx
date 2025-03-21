import Header from "../components/Header";
import Home from "../components/Home";
import SideBar from "../components/SideBar";


const HomePage = () => {
  return (
    <div className="flex flex-col h-screen">
      {/* Header at the Top */}
      <Header />

      <div className="flex flex-1">
        {/* Sidebar on the Left */}
        <SideBar />

        {/* Main Content in the Center */}
        <main className="flex-1 p-6 bg-gray-100 overflow-auto">
          <Home />
        </main>
      </div>
    </div>
  );
};

export default HomePage;
