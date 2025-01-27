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
  const [oficialNickname,setOficialNickname]=useState(null);
  const navigate = useNavigate();

  // useEffect para verificar el estado inicial de autenticación
  useEffect(() => {
    const storedAuth = localStorage.getItem('isAuthenticated') === 'true'; // Asegura que sea un booleano
    const storedRole = localStorage.getItem('userRole');
    const storedNickname = localStorage.getItem('oficialNickname');
    console.log('Recuperando nickname:', storedNickname);
    
    if (storedAuth && storedRole && storedNickname) {
      setIsAuthenticated(true);
      setUserRole(storedRole);
      setOficialNickname(storedNickname);
    }
  }, []);

  // Función para iniciar sesión
  const login = async (username, password, role) => {
    try {
      // Validación para el usuario administrador
      if (username === "Admin" && password === "123" && role === '3') {
        actualizarEstadoYRedirigir("admin");
        return;
      }
  
      // Llama al backend para obtener el rol
      const RolID = await loginBack(username, password);
      if (!RolID || RolID.error) {
        throw new Error("Error al obtener el rol del usuario");
      }

      if(RolID==role){
        // Asignar rol según el ID
      const miRol = RolID === 1 ? "cliente" : RolID === 2 ? "artista" : null;
  
      // Validación del rol
      if (!['cliente', 'artista'].includes(miRol)) {
        console.error("Rol de usuario inválido");
        return;
      }
      console.log(username)
      // Actualizar el estado y redirigir
      actualizarEstadoYRedirigir(miRol,username);
      }else{
        throw new Error("Usuario, Contraseña o Rol Incorrecto");
      }
  
      
    } catch (error) {
      console.log(error)
      throw error; // Propaga el error al nivel superior
    }
  };
  
  // Función auxiliar para actualizar estado y redirigir
  const actualizarEstadoYRedirigir = (role,nickname) => {
    setIsAuthenticated(true);
    setUserRole(role);
    setOficialNickname(nickname);
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem('userRole', role);
    console.log('Guardando nickname:', nickname);
    localStorage.setItem('oficialNickname', nickname);
    navigateToRole(role);
  };
  

  // Función para cerrar sesión
  const logout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
    setOficialNickname(null);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userRole');
    localStorage.removeItem('oficialNickname');
    
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
    <AuthContext.Provider value={{ isAuthenticated, userRole, oficialNickname, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};