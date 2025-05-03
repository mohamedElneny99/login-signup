import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import pic from './pic.png';
import g from'./g.png.webp';
import qr from './qr.png'

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email) ? "" : "Please enter a valid email address";
  };

  const validatePassword = (password: string) => {
    if (password.length < 6) return "Password must be at least 6 characters";
    return "";
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    setErrors({
      email: emailError,
      password: passwordError
    });

    if (emailError || passwordError) {
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
          "email" : email,
          "password": password
        })
      });
    
      const data = await response.json();
    
      if (!response.ok) {
        const errorMessage = data?.message || 'Login failed. Please try again.';
        setMessage(errorMessage);
        throw new Error(errorMessage);
      }
    
      localStorage.setItem('user-info', JSON.stringify(data));
      localStorage.setItem('token', data.token);
      console.log("Login successful", { email, password });
      navigate('/home');
    
    } catch (error) {
      if (error instanceof Error) {
        setMessage(error.message || 'Login failed. Please try again.');
      } else {
        setMessage('An unexpected error occurred');
      }
      console.error("Login error:", error);
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
            alt="login-pic"
            className="img-fluid h-100 w-100"
            style={{ objectFit: 'cover' }}
          />
        </div>

        {/* Form Section */}
        <div className="col-md-6 h-100 d-flex align-items-center justify-content-center bg-white p-5">
          <form onSubmit={handleLogin} className="w-100" style={{ height: '90%' }}>
            <h1 className="text-center mb-4 fw-bold">Login to</h1>
            <h5 className="text-center mb-4"> your account</h5>

            {message && (
              <div className={`alert ${message.includes('success') ? 'alert-success' : 'alert-danger'} text-center`}>
                {message}
              </div>
            )}

            <div className="mb-3 text-start">
              <input
                className={`form-control rounded-3 ${errors.email ? 'is-invalid' : ''}`}
                style={{ height: '45px', width: '550px' }}

                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors({ ...errors, email: '' });
                }}
                required
              />
              {errors.email && <div className="invalid-feedback">{errors.email}</div>}
            </div>

            <div className="mb-3 text-start">
              <input
                className={`form-control rounded-3 ${errors.password ? 'is-invalid' : ''}`}
                style={{ height: '45px', width: '550px' }}

                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) setErrors({ ...errors, password: '' });
                }}
                required
              />
              {errors.password && <div className="invalid-feedback">{errors.password}</div>}
            </div>

           

            <div className="form-check mb-4 text-start">
              <input type="checkbox" className="form-check-input" id="remember" />
              <label className="form-check-label" htmlFor="remember">
                Remember me
              </label>

              <div className="text-end"
              style={{ marginTop: '-30px', marginBottom: '20px'  }}>
              <Link to="/forgot-password" className="text-decoration-none small">
                Forgot your password?
              </Link>
              </div>
            </div>

            <button 
              type="submit" 
              className="btn btn-primary  fw-bold py-2 rounded-3 text-white"
              style={{ height: '45px', width: '550px' }}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Logging in...
                </>
              ) : 'Login'}
            </button>

            <div className="d-flex justify-content-center mt-3 mb-3">

              <img src={qr} alt='qr code' 
                style={{ width: '80px', marginRight: '70px' }} />
              <button 
                type="button" 
                className="btn btn-outline-primary d-flex justify-content-center fw-bold"
                style={{ height: '45px', width: '250px', border: '1px solid #0d6efd' }}
              >
                <img src={g} alt='google logo'
                 style={{ width: '30px', marginRight: '10px' }} /> 
                Login with Google
              </button>


            </div>
            
           
            
            <div className="text-center mt-3" >
              <Link to="/signup" className="text-decoration-none small" style={{ color: 'rgb(2, 3, 6)' }}>
                Don't have an account? <span style={{color: ' #0d6efd'}}>Sign up</span>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
