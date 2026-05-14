// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './auth/AuthContext';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import AdminPanel from './components/AdminPanel';
import DashboardSelector from './components/DashboardSelector'; // Nuevo componente
import UserList from './components/UserList';
import UserList from './components/1893';
import PrivateRoute from './components/PrivateRoute';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route 
            path="/dashboard" 
            element={
              <PrivateRoute>
                <DashboardSelector /> {/* Nueva ruta principal */}
              </PrivateRoute>
            } 
          />
          <Route 
            path="/dashboard/powerbi" 
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/dashboard/admin" 
            element={
              <PrivateRoute>
                <AdminPanel />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/dashboard/user" 
            element={
              <PrivateRoute>
                <UserList />
              </PrivateRoute>
            } 
          />
            <Route 
            path="/dashboard/1893" 
            element={
              <PrivateRoute>
                <UserList />
              </PrivateRoute>
            } 
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
