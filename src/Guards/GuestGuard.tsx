import React from 'react';
import { Navigate } from 'react-router-dom';

const GuestGuard = ({ children }: { children: React.ReactNode }) => {
  const userInfo = localStorage.getItem('user-info');
  return userInfo ? <Navigate to="/home" replace /> : <>{children}</>;
};

export default GuestGuard;
