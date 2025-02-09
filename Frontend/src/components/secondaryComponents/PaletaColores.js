import React from 'react';
import './PaletaColores.css';

function PaletaColores() {
  return (
    <div className="paleta-colores">
      <h1>Paleta de Colores</h1>
      <p>Esta es la paleta de colores qque se uso en el diseño de esta página. Aquí están los colores con sus valores hexadecimales.</p>
      
      <div className="colores">
        <div className="color" style={{ backgroundColor: '#f8f9fa' }}>
          <p>#f8f9fa</p>
        </div>
        <div className="color" style={{ backgroundColor: '#e9ecef' }}>
          <p>#e9ecef</p>
        </div>
        <div className="color" style={{ backgroundColor: '#dee2e6' }}>
          <p>#dee2e6</p>
        </div>
        <div className="color" style={{ backgroundColor: '#ced4da' }}>
          <p>#ced4da</p>
        </div>
        <div className="color" style={{ backgroundColor: '#adb5bd' }}>
          <p>#adb5bd</p>
        </div>
        <div className="color" style={{ backgroundColor: '#6c757d' }}>
          <p>#6c757d</p>
        </div>
        <div className="color" style={{ backgroundColor: '#495057' }}>
          <p>#495057</p>
        </div>
        <div className="color" style={{ backgroundColor: '#343a40' }}>
          <p>#343a40</p>
        </div>
        <div className="color" style={{ backgroundColor: '#212529' }}>
          <p>#212529</p>
        </div>
      </div>
    </div>
  );
}

export default PaletaColores;
