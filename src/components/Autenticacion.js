// src\components\Autenticacion.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginBack } from '../services/authService';

//Este fue uno de los componentes más hardcore, el sistema de autenticación por roles
//Basicamente toda la aplicación esta envuelta por el AuthContext, 
//lo que permite agarrar cualquier link, protegerlo o permitirlo de acuerdo al rol.
//Me ayude con Chatgpt aquí porque sino no lo sacaba.
const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado con el AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();

  // useEffect para verificar el estado inicial de autenticación
  useEffect(() => {
    const storedAuth = localStorage.getItem('isAuthenticated') === 'true'; // Asegura que sea un booleano
    const storedRole = localStorage.getItem('userRole');
    
    if (storedAuth && storedRole) {
      setIsAuthenticated(true);
      setUserRole(storedRole);
    }
  }, []);

  // Función para iniciar sesión
  const login = async (username, password, role) => {
    try {
      // Validación para el usuario administrador
      if (username === "Admin" && password === "123" && role === "admin") {
        actualizarEstadoYRedirigir(role);
        return;
      }
  
      // Llama al backend para obtener el rol
      const RolID = await loginBack(username, password);
      if (!RolID || RolID.error) {
        throw new Error("Error al obtener el rol del usuario");
      }
  
      // Asignar rol según el ID
      const miRol = RolID === 1 ? "cliente" : RolID === 2 ? "artista" : null;
  
      // Validación del rol
      if (!['admin', 'cliente', 'artista'].includes(miRol)) {
        console.error("Rol de usuario inválido");
        return;
      }
  
      // Actualizar el estado y redirigir
      actualizarEstadoYRedirigir(miRol);
    } catch (error) {
      throw error; // Propaga el error al nivel superior
    }
  };
  
  // Función auxiliar para actualizar estado y redirigir
  const actualizarEstadoYRedirigir = (role) => {
    setIsAuthenticated(true);
    setUserRole(role);
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("userRole", role);
    console.log(role);
    navigateToRole(role);
  };
  

  // Función para cerrar sesión
  const logout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userRole');
    
    // Redirigir a la página principal
    navigate('/');
  };

  // Función para redirigir al usuario según su rol
  const navigateToRole = (role) => {
    if (role === 'admin') {
      navigate('/Admin');
    } else if (role === 'cliente') {
      navigate('/PerfilUsuarioCliente');
    } else if (role === 'artista') {
      navigate('/PerfilUsuarioArtista');
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userRole, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};