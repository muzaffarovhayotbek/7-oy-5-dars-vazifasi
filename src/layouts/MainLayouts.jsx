import React from 'react';
import { NavLink } from 'react-router-dom';
import productsLogo from '../assets/products-logo.png';
import './MainLayouts.css';

function MainLayouts({ children }) {
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
      {children}
      <footer>
        <h2>footer</h2>
      </footer>
    </div>
  );
}

export default MainLayouts;
