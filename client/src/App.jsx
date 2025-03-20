// client/src/App.jsx
import './styles/index.scss';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<div>Trang danh sách sản phẩm đầy đủ</div>} />
      </Routes>
    </Router>
  );
}

export default App;