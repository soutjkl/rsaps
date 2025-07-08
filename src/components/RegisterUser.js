import React, { useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import './RegisterUser.css';

export default function RegisterUser() {
  const { register, isAdmin } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    lastName: '',
    role: 'user'
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    
    try {
      console.log('[RegisterUser] Datos del formulario:', formData);
      
      // Validación exhaustiva
      if (!formData.email || !formData.password || !formData.name || !formData.lastName) {
        throw new Error("Todos los campos son obligatorios");
      }

      if (formData.name.length > 50 || formData.lastName.length > 50) {
        throw new Error("Nombre y apellido no pueden exceder 50 caracteres");
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        throw new Error("Ingrese un email válido");
      }

      if (formData.password.length < 6) {
        throw new Error("La contraseña debe tener al menos 6 caracteres");
      }

      const result = await register(
        formData.email.trim(),
        formData.password,
        {
          name: formData.name.trim(),
          lastName: formData.lastName.trim(),
          role: formData.role
        }
      );

      if (result.success) {
        console.log('[RegisterUser] Registro exitoso:', result.user);
        setSuccess(true);
        setFormData({ 
          email: '', 
          password: '', 
          name: '', 
          lastName: '', 
          role: 'user' 
        });
      } else {
        throw new Error(result.error || "Error desconocido durante el registro");
      }
    } catch (error) {
      console.error('[RegisterUser] Error en registro:', error);
      setError(error.message);
    }
  };

  if (!isAdmin) {
    return (
      <div className="register-form">
        <div className="error-message">No tienes permisos para registrar usuarios</div>
      </div>
    );
  }

  return (
    <div className="register-form">
      <h2>Registrar Nuevo Usuario</h2>
      {error && <div className="error-message">{error}</div>}
      {success && (
        <div className="success-message">
          ¡Usuario registrado exitosamente!<br />
          Nombre: {formData.name} {formData.lastName}<br />
          Email: {formData.email}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Contraseña (mínimo 6 caracteres):</label>
          <input
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            required
            minLength="6"
          />
        </div>
        
        <div className="form-group">
          <label>Nombre:</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            required
            maxLength="50"
          />
        </div>
        
        <div className="form-group">
          <label>Apellido:</label>
          <input
            type="text"
            value={formData.lastName}
            onChange={(e) => setFormData({...formData, lastName: e.target.value})}
            required
            maxLength="50"
          />
        </div>
        
        <div className="form-group">
          <label>Rol:</label>
          <select
            value={formData.role}
            onChange={(e) => setFormData({...formData, role: e.target.value})}
          >
            <option value="user">Usuario</option>
            <option value="admin">Administrador</option>
          </select>
        </div>
        
        <button type="submit" className="submit-btn">
          Registrar Usuario
        </button>
      </form>
    </div>
  );
}