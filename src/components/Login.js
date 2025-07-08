import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import loginImage from '../img/redsaludlogo.png';
import './Login.css';

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  const [message, setMessage] = useState({
    text: '',
    isError: false
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);
  
  const result = await login(formData.email, formData.password);
  
  if (result.success) {
    navigate('/dashboard'); // Cambiar a la nueva ruta del selector
  } else {
    setMessage({
      text: result.error || 'Credenciales incorrectas',
      isError: true
    });
  }
  
  setIsSubmitting(false);
};

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-image-container">
          <img 
            src={loginImage} 
            alt="Ilustración de inicio de sesión" 
            className="login-image"
          />
        </div>

        <h1>Iniciar Sesión</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
              autoComplete="username"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Contraseña:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required
              autoComplete="current-password"
            />
          </div>
          <button 
            type="submit" 
            className="login-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Iniciando...' : 'Ingresar'}
          </button>
        </form>
        {message.text && (
          <div className={`message ${message.isError ? 'error' : 'success'}`}>
            {message.text}
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;