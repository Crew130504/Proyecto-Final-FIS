// src/components/Proteccion_rutas.js
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './Autenticacion';

//Estas son las rutas protegidas, digamos que previene que cualquier redirección de un usuario no autenticado a partes de la página que no debería ver

const ProtectedRoute = ({ children, allowedRole }) => {
  const { isAuthenticated, userRole } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Esperar un momento para obtener los valores de autenticación del contexto
    if (isAuthenticated !== null && userRole !== null) {
      setLoading(false);
    }
  }, [isAuthenticated, userRole]);

  // Mientras el estado de autenticación esté cargando, no renderizar nada
  if (loading) {
    return null; // O un spinner de carga, según el diseño de tu aplicación
  }

  if (!isAuthenticated || (allowedRole && userRole !== allowedRole)) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
