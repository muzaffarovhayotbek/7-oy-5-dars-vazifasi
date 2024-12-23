import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ErrorPage.css';

function ErrorPage() {
  const navigate = useNavigate();

  function handleHome() {
    navigate('/');
  }

  return (
    <div className="error-container">
      <h1 className="error-title">404</h1>
      <p className="error-text">Page not found</p>
      <button className="error-button" onClick={handleHome}>
        Go Back Home
      </button>
    </div>
  );
}

export default ErrorPage;
