// src\components\secondaryComponents\SoporteTecnico.js
import React from 'react';
import './SoporteTecnico.css';
import sugerenciasImg from '../../Imagenes/sugerencias.png';
import fallosImg from '../../Imagenes/fallos.png';
import felicitacionesImg from '../../Imagenes/felicitaciones.png';

function SoporteTecnico() {
  return (
    <div className="soporte-tecnico">
      <h1>Soporte Técnico - "El último grupo"</h1>
      <p>¡Bienvenido a nuestra sección de Soporte Técnico! Estamos aquí para ayudarte. Puedes contactarnos por cualquiera de las siguientes opciones:</p>
      
      <div className="soporte-seccion">
        <img src={sugerenciasImg} alt="Sugerencias" className="soporte-imagen" />
        <h2>Sugerencias</h2>
        <p>Nos encanta recibir tus ideas para mejorar nuestro servicio. Si tienes alguna sugerencia, no dudes en hacérnosla saber.</p>
      </div>

      <div className="soporte-seccion">
        <img src={fallosImg} alt="Reportar Fallos" className="soporte-imagen" />
        <h2>Reportar Fallos</h2>
        <p>¿Has encontrado algún problema? Estamos comprometidos a solucionarlo rápidamente. Por favor, infórmanos de cualquier fallo que experimentes.</p>
      </div>

      <div className="soporte-seccion">
        <img src={felicitacionesImg} alt="Felicitaciones" className="soporte-imagen" />
        <h2>Felicitaciones</h2>
        <p>¿Te ha gustado nuestro servicio? Apreciamos mucho tus palabras y estamos felices de saber que te hemos ayudado.</p>
      </div>

      <div className="soporte-contacto">
        <h3>Contacto</h3>
        <p>Teléfono: 000-123-4567</p>
        <p>Email: soporte@elultimogrupo.com</p>
      </div>
    </div>
  );
}

export default SoporteTecnico;
