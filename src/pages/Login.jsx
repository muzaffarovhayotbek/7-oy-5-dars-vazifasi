import React, { useState } from 'react';
import { backend } from '../axios';
import { NavLink, useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  const navigate = useNavigate();

  function validate() {
    if (username.length < 6) {
      alert('Username kamida 6 ta belgidan iborat bo‘lishi kerak');
      return false;
    }

    if (password.length < 4) {
      alert('Parol kamida 8 ta belgidan iborat bo‘lishi kerak');
      return false;
    }

    return true;
  }

  function handleLogin(event) {
    event.preventDefault();
    if (!validate()) return;

    const user = { username, password };

    setLoading(true);

    backend
      .post('auth/signin', user, {
        headers: { 'Content-Type': 'application/json' },
      })
      .then((response) => {
        if (response.status === 200) {
          localStorage.setItem('user', JSON.stringify(response.data));
          localStorage.setItem('token', response.data.accessToken);

          navigate('/', { state: { token: response.data.accessToken } });
        }
      })
      .catch((error) => {
        const message = error.response?.data?.message || 'Noma’lum xatolik';
        if (error.response?.status === 404 || error.response?.status === 401) {
          alert(message);
        } else {
          alert('Tizimda xatolik yuz berdi. Qaytadan urinib ko‘ring!');
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <div>
      <form className="form-container" onSubmit={handleLogin}>
        <input
          className="input-field"
          type="text"
          value={username}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="Enter username"
          required
        />

        <div className="password-container">
          <input
            className="input-field"
            type={show ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            required
          />
          <span
            className="show-hide-btn"
            onClick={() => setShow((prev) => !prev)}
          >
            {show ? 'Hide' : 'Show'}
          </span>
        </div>

        <button className="submit-btn" disabled={loading}>
          {loading ? 'LOADING...' : 'Login'}
        </button>

        <NavLink className="nav-link" to="/register">
          Registerga o‘tish
        </NavLink>
      </form>
    </div>
  );
}

export default Login;
