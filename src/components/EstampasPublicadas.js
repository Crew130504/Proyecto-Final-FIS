// src/components/EstampasPublicadas.js
import React, { useState, useEffect } from 'react';
import './EstampasPublicadas.css';

//Este componente es para mostrarle al artista las estampas que ha publicado y permitirle borrarlas 

const EstampasPublicadas = () => {
  const [estampas, setEstampas] = useState([]);

  // Simulamos la carga de estampas (se simula si no hay estampas en el localStorage)
  useEffect(() => {
    const storedEstampas = JSON.parse(localStorage.getItem('estampas')) || [];

    // Si no hay estampas en localStorage, agregamos algunas simuladas
    if (storedEstampas.length === 0) {
      const estampasSimuladas = [
        {
          id: 1,
          nombre: 'Estampa Aventura',
          imagen: 'https://via.placeholder.com/250x250?text=Estampa+Aventura',
        },
        {
          id: 2,
          nombre: 'Estampa Mariposa',
          imagen: 'https://via.placeholder.com/250x250?text=Estampa+Mariposa',
        },
        {
          id: 3,
          nombre: 'Estampa Paisaje',
          imagen: 'https://via.placeholder.com/250x250?text=Estampa+Paisaje',
        },
      ];

      // Guardamos las estampas simuladas en localStorage
      localStorage.setItem('estampas', JSON.stringify(estampasSimuladas));
      setEstampas(estampasSimuladas);
    } else {
      setEstampas(storedEstampas);
    }
  }, []);

  const borrarEstampa = (id) => {
    const nuevasEstampas = estampas.filter((estampa) => estampa.id !== id);
    setEstampas(nuevasEstampas);
    localStorage.setItem('estampas', JSON.stringify(nuevasEstampas));
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
