// src/components/DashboardSelector.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import loginImage from '../img/icon1.svg';
import './DashboardSelector.css';

function DashboardSelector() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleDashboardSelect = (dashboardType) => {
    navigate(`/dashboard/${dashboardType}`);
  };

  return (
    <div className="dashboard-selector-container">
      <div className="welcome-card">
        <h1>¡Bienvenido, {user?.email}!</h1>
        <p>Selecciona el dashboard que deseas visualizar</p>
        
        <div className="dashboard-options">
          <button 
            className="dashboard-option"
            onClick={() => handleDashboardSelect('powerbi')}
          >
            <div className="option-icon">
                     <img 
                            src={loginImage} 
                            alt="Ilustración de inicio de sesión" 
                            className="option-icon-image"
                          />
            </div>
            <h3>Resolución 1499</h3>
            <p>Avance de la estrategia APS</p>
          </button>
          
          <button 
            className="dashboard-option"
            onClick={() => handleDashboardSelect('admin')}
          >
            <div className="option-icon">
                <img 
                            src={loginImage} 
                            alt="Ilustración de inicio de sesión" 
                            className="option-icon-image"
                          />
            </div>
            <h3>Resolución 2225</h3>
            <p>Avance de la estrategia APS</p>
          </button>
          
          <button 
            className="dashboard-option"
            onClick={() => handleDashboardSelect('user')}
          >
            <div className="option-icon">
                     <img 
                            src={loginImage} 
                            alt="Ilustración de inicio de sesión" 
                            className="option-icon-image"
                          />
            </div>
            <h3>Resolución 2290</h3>
            <p>Avance de la estrategia APS</p>
          </button>
        </div>
      </div>
      
      <button className="logout-btn" onClick={logout}>
        Cerrar Sesión
      </button>
    </div>
  );
}

export default DashboardSelector;