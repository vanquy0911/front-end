import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header>
      <nav>
        <Link to="/products">Products</Link>
        <Link to="/register">Register</Link>
        <Link to="/login">Login</Link>
        <Link to="/cart">Cart</Link>
        <Link to="/profile">Profile</Link>
      </nav>
    </header>
  );
}

export default Header;
