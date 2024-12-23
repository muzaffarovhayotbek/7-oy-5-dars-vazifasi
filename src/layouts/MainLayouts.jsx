import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import productsLogo from '../assets/products-logo.png';
import './MainLayouts.css';
import { ThemeContext } from '../App';

function MainLayouts({ children }) {
  const { theme, setTheme } = useContext(ThemeContext);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className={theme === 'dark' ? 'dark' : ''}>
      <header className={`header flex items-center justify-between p-4 ${theme === 'light' ? 'bg-slate-400' : 'bg-gray-800'}`}>
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
            <button
              onClick={toggleTheme}
              className="dark-btn bg-gray-800 text-white px-6 py-3 rounded-md hover:bg-gray-600 transition duration-300"
            >
              {theme === 'light' ? '🌙 Dark Mode' : '🌞 Light Mode'}
            </button>
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
