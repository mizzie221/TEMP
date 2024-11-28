import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/LoginSignups.css';
import Home from './Home';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false); // State for success modal visibility
  const [showErrorModal, setShowErrorModal] = useState(false); // State for error modal visibility
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Mock authentication
    if (email === 'test@test.com' && password === 'password') {
      setShowSuccessModal(true); // Show success modal on valid login
    } else {
      setShowErrorModal(true); // Show error modal on invalid login
    }
  };

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false); // Close success modal
    navigate('/dashboard'); // Navigate to Dashboard
  };

  const handleErrorModalClose = () => {
    setShowErrorModal(false); // Close error modal
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <Link to="/signup">Sign up</Link>
      </p>
      <p>
        <Link to="/" className="back-home-link">Back to Home</Link>
      </p>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Login Successful!</h3>
            <p>Welcome back! Redirecting to your dashboard...</p>
            <button onClick={handleSuccessModalClose}>OK</button>
          </div>
        </div>
      )}

      {/* Error Modal */}
      {showErrorModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Login Failed</h3>
            <p>The email or password you entered is incorrect. Please try again.</p>
            <button onClick={handleErrorModalClose}>OK</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
