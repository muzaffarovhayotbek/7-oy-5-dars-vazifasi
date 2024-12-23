import React, { useState } from 'react';
import { backend } from '../axios';
import { useNavigate, Link } from 'react-router-dom';
import './Register.css';

function Register() {
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);

  const navigate = useNavigate();

  function validate() {
    if (username.length < 6) {
      alert('Username eng kamida 6 ta harfdan iborat bo‘lishi kerak');
      return false;
    }

    if (email.length < 6 || !email.endsWith('@gmail.com')) {
      alert(
        'Email eng kamida 6 ta harfli bo‘lishi va oxiri @gmail.com bilan tugashi kerak'
      );
      return false;
    }

    if (password.length < 6) {
      alert(
        'Parol kamida 8 belgidan iborat, harf va raqamlarni o‘z ichiga olishi kerak.'
      );
      return false;
    }

    if (password !== rePassword) {
      alert('Parollar mos kelmadi!');
      return false;
    }

    return true;
  }

  function handleRegister(e) {
    e.preventDefault();

    if (!validate()) return;

    const user = {
      username,
      email,
      password,
    };

    setLoading(true);

    backend
      .post('auth/signup', user, {
        headers: {
          'Content-type': 'application/json',
        },
      })
      .then((response) => {
        if (response.status === 200) {
          alert('Ro‘yxatdan o‘tish muvaffaqiyatli!');
          navigate('/login');
        }
      })
      .catch((error) => {
        const message =
          error.response?.data?.message || 'Server bilan muammo mavjud';
        alert(message);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleRegister}>
        <input
          className="form-input"
          type="text"
          value={username}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="Enter username"
        />
        <input
          className="form-input"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email"
        />
        <div className="password-container">
          <input
            className="form-input password-input"
            type={show ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
          />
          <span className="toggle-password" onClick={() => setShow(!show)}>
            {show ? 'Hide' : 'Show'}
          </span>
        </div>
        <div className="password-container">
          <input
            className="form-input password-input"
            type={showRePassword ? 'text' : 'password'}
            value={rePassword}
            onChange={(e) => setRePassword(e.target.value)}
            placeholder="Re-enter password"
          />
          <span
            className="toggle-password"
            onClick={() => setShowRePassword(!showRePassword)}
          >
            {showRePassword ? 'Hide' : 'Show'}
          </span>
        </div>
        <button
          type="submit"
          className={`submit-button ${loading ? 'loading' : ''}`}
          disabled={loading}
        >
          {loading ? 'LOADING...' : 'REGISTER'}
        </button>
        <Link to="/login" className="login-link">
          LOGINGA O'TISH
        </Link>
      </form>
    </div>
  );
}

export default Register;
