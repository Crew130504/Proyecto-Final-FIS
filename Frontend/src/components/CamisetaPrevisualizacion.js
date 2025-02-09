import React, { useState, useEffect } from 'react';
import './CamisetaPrevisualizacion.css';
import CamisetaBlanca from '../Imagenes/camiseta_blanca.png'; //Estas imagenes son los colores base de la camiseta
import CamisetaNegra from '../Imagenes/camiseta_negra.png'; //Todas las imagenes estan el la carpeta "Imagenes" por lo que si da errores importenla correctamente
import CamisetaAzul from '../Imagenes/camiseta_azul.png'; 
import CamisetaRoja from '../Imagenes/camiseta_roja.png'; 

//Este componente permite la previsualización de la camiseta.
//Digamos que cuando el usuario elige algún color cambia la imagen por la que tenga ese color.
//Lo mismo pasa cuando elige la posición.

const CamisetaPrevisualizacion = ({ imagenEstampa, color, ubicacion }) => {
  const [camisetaColor, setCamisetaColor] = useState(CamisetaBlanca); // Default color

  // Cambia el color de la camiseta según la selección
  useEffect(() => {
    switch (color) {
      case 'negro':
        setCamisetaColor(CamisetaNegra);
        break;
      case 'azul':
        setCamisetaColor(CamisetaAzul);
        break;
      case 'rojo':
        setCamisetaColor(CamisetaRoja);
        break;
      default:
        setCamisetaColor(CamisetaBlanca);
    }
  }, [color]);

  // Función para determinar la posición de la estampa
  const getEstampaPosition = () => {
    switch (ubicacion) {
      case 'izquierda':
        return { top: '40%', left: '10%' }; // Posición a la izquierda
      case 'derecha':
        return { top: '40%', right: '10%' }; // Posición a la derecha
      default:
        return { top: '40%', left: '50%', transform: 'translateX(-50%)' }; // Centrado
    }
  };

  return (
    <div className="camiseta-previsualizacion">
      <div className="camiseta">
        {/* Imagen de la camiseta */}
        <img src={camisetaColor} alt="Camiseta" className="imagen-camiseta" />
        {/* Imagen de la estampa, con posición dinámica */}
        <div
          className="estampa"
          style={{
            backgroundImage: `url(${imagenEstampa})`,
            ...getEstampaPosition(),
          }}
        ></div>
      </div>
    </div>
  );
};

export default CamisetaPrevisualizacion;
