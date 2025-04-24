import React from 'react';
import { Navigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { app } from '../firebase';

const auth = getAuth(app);

const ProtectedRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const user = auth.currentUser;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
