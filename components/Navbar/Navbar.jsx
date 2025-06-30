import React, { useContext, useState } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const { cartItems, token, setToken } = useContext(StoreContext);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  const quantity = Object.values(cartItems || {}).reduce((sum, qty) => sum + qty, 0);

  return (
    <div className="navbar">
      <Link to="/" className="logo-text">QuickEats</Link>

      <form className="navbar-search-form" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search QuickEats..."
          className="navbar-search-input"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <button type="submit" className="navbar-search-button">Search</button>
      </form>

      <ul className="navbar-menu">
        <Link to="/" onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>Home</Link>
        <a href="#explore-menu" onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""}>Menu</a>
        <Link to="/myorders" onClick={() => setMenu("orders")} className={menu === "orders" ? "active" : ""}>Orders</Link>
      </ul>

      <div className="navbar-right">
        <div className="navbar-cart-icon">
          <Link to="/cart">
            <img src={assets.basket_icon} alt="Cart" />
            {quantity > 0 && (
              <div className="cart-count">{quantity}</div>
            )}
          </Link>
        </div>

        {token ? (
          <button onClick={logout} className="logout-button">Logout</button>
        ) : (
          <button onClick={() => setShowLogin(true)} className="signin-button">Login</button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
