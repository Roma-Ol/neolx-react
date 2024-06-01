import { Navigate } from 'react-router-dom';
import React, { ReactNode } from 'react';
import { IProtectedRouteProps } from './types.ts';

const ProtectedRoute: React.FC<IProtectedRouteProps> = ({
  user,
  children,
  adminOnly = false,
}): ReactNode => {
  if (!user || (user && adminOnly && user.role !== 'admin')) {
    return <Navigate to='/' replace />;
  }

  return children;
};

export default ProtectedRoute;
