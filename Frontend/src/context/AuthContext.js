// src/context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { login } from '../services/authService';
//Esto probablemente ayude en el backend pero no creo, si quieren borrenlo que no se usa.

// Crear el contexto
const AuthContext = createContext();

export const useAuthLogIn = (context) => {
  // const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado con el AuthProvider');
  }
  return context;
};

// Componente AuthProvider
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Función para manejar el inicio de sesión
  const loginUser = async (username, password) => {
    console.log(username)
    console.log(password)
    // try {
    //   const userData = await login(username, password);
    //   setUser(userData); // Guarda la información del usuario
    // } catch (error) {
    //   console.error('Error al iniciar sesión:', error);
    // }
  };

  // Función para manejar el cierre de sesión
  const logoutUser = () => {
    setUser(null); // Elimina la información del usuario
  };

  // Verifica si ya hay un usuario autenticado cuando se carga la app
  useEffect(() => {
    const checkAuthStatus = () => {
      // Aquí podrías verificar el estado del usuario, como por ejemplo un token en localStorage
      const storedUser = localStorage.getItem('user'); // Esto es solo un ejemplo
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      setLoading(false);
    };

    checkAuthStatus();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
