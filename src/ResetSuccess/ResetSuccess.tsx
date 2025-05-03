import React from 'react';
import { Link } from 'react-router-dom';
import pic from '../login/pic.png';

const ResetSuccess: React.FC = () => {
  return (
    <div className="container-fluid vh-100 d-flex align-items-center justify-content-center">
      <div className="row g-0 rounded-4 overflow-hidden shadow-lg" style={{ width: '1400px', height: '970px' }}>
        <div className="col-md-6 h-100 p-0">
          <img
            src={pic}
            alt="reset-success"
            className="img-fluid h-100 w-100"
            style={{ objectFit: 'cover' }}
          />
        </div>

        <div className="col-md-6 h-100 d-flex align-items-center justify-content-center bg-white p-5">
          <div className="text-center w-100" style={{ height: '90%' }}>
            <h1 className="text-center mb-4 fw-bold">Password Reset Successful!</h1>
            <div className="alert alert-success mb-4">
              Your password has been successfully reset. You can now log in with your new password.
            </div>
            
            <div className="d-flex justify-content-center mb-4">
              <div className="checkmark-circle">
                <div className="checkmark"></div>
              </div>
            </div>

            <Link to="/login" className="btn btn-primary w-100 fw-bold py-2 rounded-3 text-white">
              Go to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetSuccess;