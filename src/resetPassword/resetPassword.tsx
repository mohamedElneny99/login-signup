import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import pic from '../login/pic.png';

const ResetPassword: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [resetCode, setResetCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [passwordRequirements, setPasswordRequirements] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    specialChar: false
  });

  useEffect(() => {
    if (location.state) {
      setEmail(location.state.email || '');
      setResetCode(location.state.resetCode || '');
    }
  }, [location]);

  useEffect(() => {
    setPasswordRequirements({
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      specialChar: /[^A-Za-z0-9]/.test(password)
    });
  }, [password]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (!Object.values(passwordRequirements).every(Boolean)) {
      setError('Password does not meet all requirements.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('https://chat-app-two-silk-82.vercel.app/api/v1/auth/resetPassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          email,
          resetCode,
          newPassword: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Password has been reset successfully.');
        navigate('/reset-success');
      } else {
        setError(data.message || 'Failed to reset password.');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container-fluid vh-100 d-flex align-items-center justify-content-center">
      <div className="row g-0 rounded-4 overflow-hidden shadow-lg" style={{ width: '1400px', height: '970px' }}>
        <div className="col-md-6 h-100 p-0">
          <img
            src={pic}
            alt="reset-password"
            className="img-fluid h-100 w-100"
            style={{ objectFit: 'cover' }}
          />
        </div>

        <div className="col-md-6 h-100 d-flex align-items-center justify-content-center bg-white p-5">
          <form onSubmit={handleSubmit} className="w-100" style={{ height: '90%' }}>
            <h1 className="text-center mb-4 fw-bold">Reset your password</h1>
            <p className="text-center mb-4">Enter a new password to regain access.</p>

            <input type="hidden" value={email} />
            <input type="hidden" value={resetCode} />

            <div className="mb-3 text-start">
              <input
                type="password"
                className="form-control rounded-3"
                placeholder="New password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div className="form-text small">
                Password must contain:
                <ul className="list-unstyled ms-3">
                  <li className={passwordRequirements.length ? 'text-success' : 'text-danger'}>
                    • At least 8 characters
                  </li>
                  <li className={passwordRequirements.uppercase ? 'text-success' : 'text-danger'}>
                    • At least one uppercase letter
                  </li>
                  <li className={passwordRequirements.lowercase ? 'text-success' : 'text-danger'}>
                    • At least one lowercase letter
                  </li>
                  <li className={passwordRequirements.number ? 'text-success' : 'text-danger'}>
                    • At least one number
                  </li>
                  <li className={passwordRequirements.specialChar ? 'text-success' : 'text-danger'}>
                    • At least one special character
                  </li>
                </ul>
              </div>
            </div>

            <div className="mb-3 text-start">
              <input
                type="password"
                className="form-control rounded-3"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            {message && <div className="alert alert-success">{message}</div>}
            {error && <div className="alert alert-danger">{error}</div>}

            <button 
              type="submit" 
              className="btn btn-success w-100 fw-bold py-2 rounded-3 text-white"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Resetting...
                </>
              ) : 'Reset Password'}
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

export default ResetPassword;