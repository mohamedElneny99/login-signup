import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import pic from '../login/pic.png';

const VerifyResetCode: React.FC = () => {
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [resetCode, setResetCode] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state?.email) {
      setEmail(location.state.email);
    }
  }, [location]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('https://chat-app-two-silk-82.vercel.app/api/v1/auth/verifyResetToken', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ email, resetCode })
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Code verified successfully.');
        navigate('/reset-password', { state: { email, resetCode } });
      } else {
        setError(data.message || 'Invalid reset code.');
      }
    } catch (err) {
      setError('Failed to verify reset code. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container-fluid vh-100 d-flex align-items-center justify-content-center">
      <div className="row g-0 rounded-4 overflow-hidden shadow-lg" style={{ width: '1400px', height: '970px' }}>
        {/* Image Section */}
        <div className="col-md-6 h-100 p-0">
          <img
            src={pic}
            alt="verify-reset-code"
            className="img-fluid h-100 w-100"
            style={{ objectFit: 'cover' }}
          />
        </div>

        {/* Form Section */}
        <div className="col-md-6 h-100 d-flex align-items-center justify-content-center bg-white p-5">
          <form onSubmit={handleSubmit} className="w-100" style={{ height: '90%' }}>
            <h1 className="text-center mb-4 fw-bold">Verify Reset Code</h1>
            <p className="text-center mb-4">Enter the reset code sent to your email.</p>

            <div className="mb-3 text-start">
              <input
                type="email"
                className="form-control rounded-3"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                readOnly
              />
            </div>

            <div className="mb-3 text-start">
              <input
                type="text"
                className="form-control rounded-3"
                placeholder="Reset Code"
                value={resetCode}
                onChange={(e) => setResetCode(e.target.value)}
                required
              />
            </div>

            {message && <div className="alert alert-success">{message}</div>}
            {error && <div className="alert alert-danger">{error}</div>}

            <button 
              type="submit" 
              className="btn btn-primary w-100 fw-bold py-2 rounded-3 text-white"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Verifying...
                </>
              ) : 'Verify Code'}
            </button>

            <div className="text-center mt-3">
              <button 
                type="button" 
                className="btn btn-link text-decoration-none small"
                onClick={() => navigate('/forgot-password', { state: { email } })}
              >
                Resend Code
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VerifyResetCode;