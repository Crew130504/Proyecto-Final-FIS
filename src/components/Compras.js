// Compras.js
import React, { useState } from 'react';
import './Compras.css';
//Basicamente muestra las compras realizadas, las compras ya realizadas no se pueden borrar, claramente.

const Compras = () => {
  // Ejemplo de compras simuladas
  const [compras, setCompras] = useState([
    {
      color: 'blanco',
      talla: 'M',
      material: 'algodon',
      ubicacion: 'central',
      tamañoEstampa: 'mediano',
      cantidad: 2,
      diseño: 'predeterminado',
      descripcionPersonalizada: '',
      precioTotal: 5000,
    },
    {
      color: 'negro',
      talla: 'L',
      material: 'poliester',
      ubicacion: 'superior',
      tamañoEstampa: 'grande',
      cantidad: 1,
      diseño: 'otro',
      descripcionPersonalizada: 'Estampa personalizada con logo',
      precioTotal: 8000,
    },
    {
      color: 'azul',
      talla: 'S',
      material: 'rayon',
      ubicacion: 'inferior',
      tamañoEstampa: 'pequeño',
      cantidad: 1,
      diseño: 'predeterminado',
      descripcionPersonalizada: '',
      precioTotal: 3500,
    },
  ]);

  return (
    <div className="compras-container">
      <h2>Mis Compras</h2>
      {compras.length === 0 ? (
        <p>No has realizado ninguna compra aún.</p>
      ) : (
        <div className="compras-list">
          {compras.map((compra, index) => (
            <div key={index} className="compra-item">
              <h3>Compra {index + 1}</h3>
              <p><strong>Color:</strong> {compra.color}</p>
              <p><strong>Talla:</strong> {compra.talla}</p>
              <p><strong>Material:</strong> {compra.material}</p>
              <p><strong>Ubicación de la estampa:</strong> {compra.ubicacion}</p>
              <p><strong>Tamaño de la estampa:</strong> {compra.tamañoEstampa}</p>
              <p><strong>Cantidad:</strong> {compra.cantidad}</p>
              <p><strong>Diseño:</strong> {compra.diseño === 'otro' ? compra.descripcionPersonalizada : compra.diseño}</p>
              <p><strong>Precio Total:</strong> ${compra.precioTotal.toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Compras;

