import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./components/Register"; // Đảm bảo đúng tên thư mục và tệp
import Login from "./components/Login"; // Đảm bảo rằng bạn đã tạo component Login
import ProductList from "./components/ProductList"; // Đảm bảo rằng bạn đã tạo component ProductList
import Cart from "./components/Cart"; // Đảm bảo rằng bạn đã tạo component Cart
import UserProfile from "./components/UserProfile"; // Đảm bảo rằng bạn đã tạo component UserProfile

// Đoạn mã App.js dưới đây sẽ sử dụng React Router để định tuyến các trang trong ứng dụng.

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Welcome to My E-commerce App</h1>
        </header>

        <main>
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/profile" element={<UserProfile />} />
          </Routes>
        </main>

        <footer>
          <p>© 2025 My E-commerce App</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
