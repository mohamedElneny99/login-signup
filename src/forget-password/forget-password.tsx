
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import pic from '../login/pic.png';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setMessage('');
    setError('');

    try {
      const response = await fetch('https://chat-app-two-silk-82.vercel.app/api/v1/auth/forgetPassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ email })
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Reset instructions sent to your email.');
      } else if (response.status === 404) {
        setError('Email not found.');
      } else {
        setError(data.message || 'Server error. Please try again later.');
      }
      
    } catch (err) {
      setError('Failed to send request.');
    }
  };

  return (
    <div className="container-fluid vh-100 d-flex align-items-center justify-content-center">
      <div className="row g-0 rounded-4 overflow-hidden shadow-lg" style={{ width: '1400px', height: '970px' }}>
        {/* Image Section */}
        <div className="col-md-6 h-100 p-0">
          <img
            src={pic}
            alt="reset-password"
            className="img-fluid h-100 w-100"
            style={{ objectFit: 'cover' }}
          />
        </div>

        {/* Form Section */}
        <div className="col-md-6 h-100 d-flex align-items-center justify-content-center bg-white p-5">
          <form onSubmit={handleSubmit} className="w-100" style={{ height: '90%' }}>
            <h1 className="text-center mt-5 fw-bold">Forgot your password?</h1>
            <p className="text-center mb-4">Enter your email and we'll send you a reset link.</p>

            <div className="mb-3 text-start">
              <input
                type="email"
                className="form-control rounded-3"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {message && <div className="alert alert-success">{message}</div>}
            {error && <div className="alert alert-danger">{error}</div>}

            <button type="submit" className="btn btn-primary w-100 fw-bold py-2 rounded-3 text-white">
              Send Reset Link
            </button>

            <div className="text-center mt-3">
              <Link to="/login" className="text-decoration-none small">
                Back to Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
