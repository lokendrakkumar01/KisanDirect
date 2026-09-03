import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { UserRole } from '../types';
import { LoadingPage } from '../components/ui/LoadingSpinner';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const { isAuthenticated, user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <LoadingPage />;
  }

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Redirect based on actual role
    const rootPaths: Record<UserRole, string> = {
      farmer: '/farmer/dashboard',
      consumer: '/consumer/dashboard',
      bulk_buyer: '/buyer/dashboard',
      fpo: '/fpo/dashboard',
      logistics: '/logistics/dashboard',
      admin: '/admin/dashboard'
    };
    return <Navigate to={rootPaths[user.role]} replace />;
  }

  return <>{children}</>;
};
