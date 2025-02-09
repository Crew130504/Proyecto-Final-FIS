// src/components/ProcesoCompra.js
import React, { useState } from 'react';
import './ProcesoCompra.css';
import DragonImg from '../Imagenes/Dragon.jpg';
import TigreImg from '../Imagenes/Tigre.jpg';
import LoboImg from '../Imagenes/Lobo.jpg';

//Este componente muestra la etapa final para comprar camisetas
//Este componente es el que se muestra luego del carrito de compras o cuando el usuario quiere comprar directamente una camiseta personalizada

// Ejemplo de artículos en la lista de compra
const ejemploArticulos = [
  {
    id: 1,
    estampa: 'Estampa Dragón',
    descripcion: 'Camiseta con diseño de dragón.',
    precio: 19.99,
    imagen: DragonImg,
  },
  {
    id: 2,
    estampa: 'Estampa Tigre',
    descripcion: 'Camiseta con diseño de tigre.',
    precio: 24.99,
    imagen: TigreImg,
  },
  {
    id: 3,
    estampa: 'Estampa Lobo',
    descripcion: 'Camiseta con diseño de lobo.',
    precio: 29.99,
    imagen: LoboImg,
  },
];

const ProcesoCompra = () => {
  const [articulos, setArticulos] = useState(ejemploArticulos);

  // Función para eliminar un artículo
  const eliminarArticulo = (id) => {
    setArticulos(articulos.filter((articulo) => articulo.id !== id));
  };

  // Calcular el precio total
  const calcularTotal = () => {
    return articulos.reduce((total, articulo) => total + articulo.precio, 0).toFixed(2);
  };

  return (
    <div className="proceso-compra-container">
      <h2>Proceso de Compra</h2>
      {articulos.length === 0 ? (
        <p>No hay artículos en el carrito.</p>
      ) : (
        <ul className="proceso-compra-lista">
          {articulos.map((articulo) => (
            <li key={articulo.id} className="proceso-compra-item">
              <img src={articulo.imagen} alt={articulo.estampa} className="proceso-compra-imagen" />
              <div className="proceso-compra-info">
                <h3>{articulo.estampa}</h3>
                <p>{articulo.descripcion}</p>
                <p><strong>Precio:</strong> ${articulo.precio.toFixed(2)}</p>
                <button onClick={() => eliminarArticulo(articulo.id)} className="proceso-compra-btn eliminar">Eliminar</button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <div className="proceso-compra-total">
        <h3>Total: ${calcularTotal()}</h3>
        <button className="proceso-compra-btn comprar">Comprar Todo</button>
      </div>
    </div>
  );
};

export default ProcesoCompra;
