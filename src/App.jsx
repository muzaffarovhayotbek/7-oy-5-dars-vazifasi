import React, { createContext, useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Products from './pages/Products';
import MainLayouts from './layouts/MainLayouts';
import ErrorPage from './pages/ErrorPage';
import About from './pages/About';
import Register from './pages/Register';

export const ThemeContext = createContext();

function PrivateRoute({ isAuth, children }) {
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuth) {
      navigate('/login');
    }
  }, [isAuth, navigate]);

  return isAuth ? children : null;
}

function App() {
  const [theme, setTheme] = useState('light');
  const [token, setToken] = useState(localStorage.getItem('token'));
  const navigate = useNavigate();

  useEffect(() => {
    // Tema o'zgarishini kuzatish
    if (theme === 'dark') {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    // Token mavjud bo'lmasa, login sahifasiga yo'naltirish
    if (!token && window.location.pathname !== '/register') {
      navigate('/login');
    }
  }, [token, navigate]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <Routes>
        <Route
          index
          element={
            <PrivateRoute isAuth={!!token}>
              <MainLayouts>
                <Home />
              </MainLayouts>
            </PrivateRoute>
          }
        />
        <Route
          path="/products"
          element={
            <MainLayouts>
              <Products />
            </MainLayouts>
          }
        />
        <Route
          path="/about"
          element={
            <PrivateRoute isAuth={!!token}>
              <MainLayouts>
                <About />
              </MainLayouts>
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </ThemeContext.Provider>
  );
}

export default App;
