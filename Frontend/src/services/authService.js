// src/services/authService.js
import { Apiurl } from '../services/apirest';
//Esto es para el backend, por si acaso, aunque no lo use en el frontend
 export const loginBack = async (username, password) => {
  try {
    const response = await fetch(Apiurl + "/usuarios/login", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: username, contraseña: password })
    });

    // Verifica si el estado HTTP no es exitoso
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    // Convierte la respuesta a JSON
    const data = await response.json();

    // Verifica si el backend indica un error
    if (data.error) {
      throw new Error(data.body || 'Error desconocido del backend');
    }

    return data.body.RolId; // Devuelve el rol si todo es exitoso
  } catch (error) {
    // Propaga el error sin modificarlo
    throw error;
  }
};
