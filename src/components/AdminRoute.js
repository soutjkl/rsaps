import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) return <div>Cargando...</div>;
  if (!user) return <Navigate to="/" replace />;
  if (user.email !== 'admin@example.com') return <Navigate to="/dashboard" replace />;
  
  return children;
};

export default AdminRoute;