import React from 'react';
import './Header.css';
import productsLogo from '../assets/products-logo.png';
import { NavLink } from 'react-router-dom';
function Header() {
  return (
    <div>
      <header className="header">
        <div className="container header__container">
          <div className="header-logo">
            <img src={productsLogo} width={70} alt="" />
          </div>
          <div className="header-list">
            <NavLink to="/" activeClassName="active">
              Home
            </NavLink>
            <NavLink to="/about" activeClassName="active">
              About
            </NavLink>
            <NavLink to="/products" activeClassName="active">
              Products
            </NavLink>
          </div>
          <div className="darkMore">
            <button className="dark-btn">🌙 Dark More</button>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Header;
