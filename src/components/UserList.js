import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import './Dashboard.css';

function UserList() {
  const navigate = useNavigate();
  const { logout } = useAuth();  
  const iframeRef = useRef(null);
  

return (
    <div className="dashboard-container">
      {/* Botón de volver */}
      <button 
        onClick={() => navigate('/dashboard')}
        className="floating-btn back"
        title="Volver"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
        </svg>
      </button>

      {/* Botón de cerrar sesión */}
      <button 
        onClick={logout}
        className="floating-btn logout"
        title="Cerrar sesión"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M10.09 15.59L11.5 17l5-5-5-5-1.41 1.41L12.67 11H3v2h9.67l-2.58 2.59zM19 3H5c-1.11 0-2 .9-2 2v4h2V5h14v14H5v-4H3v4c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/>
        </svg>
      </button>

      <div className="powerbi-embed-container">
        <iframe 
          ref={iframeRef}
          title="APS NACIONAL RED SALUD 1499" 
          src="https://app.powerbi.com/view?r=eyJrIjoiZTVlOTI3ZTQtMmZmNy00MThkLTljZjItYzZmNTBkNDc5ZjdjIiwidCI6ImE2NjdiNTIwLTBjZmMtNDViOC1hNTkwLWFiZjNmMjJkNWI3YSJ9&pageName=90e5b7e0ed800c4dd396"
          allowFullScreen="true"
        ></iframe>
      </div>
    </div>
  );
}

export default UserList;