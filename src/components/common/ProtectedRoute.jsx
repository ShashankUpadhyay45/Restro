import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function ProtectedRoute({ children, allowedRoles }) {
  const { user, isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-charcoal-950">
        <div className="w-10 h-10 border-4 border-ember-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // If not authorized for this specific portal, redirect to appropriate default
    if (user.role === 'customer') {
      return <Navigate to="/customer/home" replace />;
    } else if (user.role === 'owner') {
      return <Navigate to="/owner/dashboard" replace />;
    } else if (user.role === 'staff') {
      return <Navigate to="/staff/dashboard" replace />;
    }
    return <Navigate to="/403" replace />;
  }

  return children;
}
