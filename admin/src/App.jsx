import DashboardPage from "./pages/DashboardPage";


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<DashboardPage />}/>
       
    </Routes>
  </BrowserRouter>
  );
}

export default App;