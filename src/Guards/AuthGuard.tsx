import React from 'react';
import { Navigate } from 'react-router-dom';

interface Props {
  children: React.ReactNode;
}

const AuthGuard: React.FC<Props> = ({ children }) => {
    const isAuthenticated = !!localStorage.getItem('user-info');
    return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
  };

export default AuthGuard;
