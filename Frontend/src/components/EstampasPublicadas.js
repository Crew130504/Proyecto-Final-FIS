// src/components/EstampasPublicadas.js
import React, { useState, useEffect } from 'react';
import './EstampasPublicadas.css';
import { useAuth } from './Autenticacion'; // Asegúrate de que useAuth esté bien importado
import { Apiurl } from '../services/apirest';

//Este componente es para mostrarle al artista las estampas que ha publicado y permitirle borrarlas 

const EstampasPublicadas = () => {
  const [estampas, setEstampas] = useState([]);
  const { oficialNickname } = useAuth();

  useEffect(() => {
    const fetchEstampas = async () => {
      try {
        // 1. Obtener la cédula del artista activo a partir del username (oficialNickname)
        const urlCedula = `${Apiurl}/usuarios/username/${oficialNickname}`;
        const responseCedula = await fetch(urlCedula);
  
        if (!responseCedula.ok) {
          throw new Error(`Error al obtener la cédula: ${responseCedula.status}`);
        }
  
        const dataCedula = await responseCedula.json();
        const cedula = dataCedula.body?.[0]?.cedula;
  
        if (!cedula) {
          throw new Error("No se encontró la cédula para el usuario activo.");
        }
  
        console.log("Cédula obtenida:", cedula);
  
        // 2. Obtener las estampas asociadas a la cédula del artista
        const urlEstampas = `${Apiurl}/estampas/artista/${cedula}`;
        const responseEstampas = await fetch(urlEstampas);
  
        if (!responseEstampas.ok) {
          throw new Error(`Error al obtener estampas: ${responseEstampas.status}`);
        }
  
        const dataEstampas = await responseEstampas.json();
  
        if (!dataEstampas.body || !Array.isArray(dataEstampas.body)) {
          throw new Error("La respuesta no contiene un array en el campo body.");
        }
  
        // 3. Mapear las estampas directamente
        const estampas = dataEstampas.body.map((estampa) => ({
          id: estampa.codigoEstampa || null,
          nombre: estampa.nombreEstampa || "Sin nombre",
          descripcion: estampa.descripcionEstampa || "Sin descripción",
          precio: estampa.precio || "0.00",
          stock: estampa.stock || 0,
          imagen: estampa.imagen || "",
          autor: oficialNickname || "Desconocido", // Se usa el artista activo
        }));
  
        setEstampas(estampas);
      } catch (error) {
        console.error("Error al obtener las estampas:", error.message);
      }
    };
  
    fetchEstampas();
  }, [Apiurl, oficialNickname]); // Agrega oficialNickname como dependencia
  

  const borrarEstampa = async (id) => {
    try {
      const response = await fetch(`${Apiurl}/estampas/${id}`, {
        method: 'DELETE',
      });
  
      if (!response.ok) {
        throw new Error(`Error al borrar la estampa con ID ${id}`);
      }
  
      const nuevasEstampas = estampas.filter((estampa) => estampa.id !== id);
      setEstampas(nuevasEstampas);
      localStorage.setItem('estampas', JSON.stringify(nuevasEstampas));
    } catch (error) {
      console.error('Error eliminando la estampa:', error);
    }
  };
  

  return (
    <div className="estampas-container">
      <h2>Estampas Publicadas</h2>
      <div className="estampas-list">
        {estampas.length === 0 ? (
          <p>No hay estampas publicadas.</p>
        ) : (
          estampas.map((estampa) => (
            <div key={estampa.id} className="estampa-card">
              <img src={estampa.imagen} alt={estampa.nombre} className="estampa-img" />
              <div className="estampa-info">
                <h3>{estampa.nombre}</h3>
                <button className="borrar-btn" onClick={() => borrarEstampa(estampa.id)}>
                  Borrar
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default EstampasPublicadas;
