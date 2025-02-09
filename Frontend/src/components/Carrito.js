// src/components/Carrito.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Carrito.css';
import DragonImg from '../Imagenes/Dragon.jpg';
import TigreImg from '../Imagenes/Tigre.jpg';
import LoboImg from '../Imagenes/Lobo.jpg';

//Este componente es el carrito de compras, donde se muestran las estampas agregadas al carrito y se pueden eliminar
// Ejemplo de artículos en el carrito
const ejemploArticulos = [
  {
    id: 1,
    estampa: 'Estampa Dragón',
    descripcion: 'Camiseta con diseño de dragón.',
    color: 'Negro',
    talla: 'L',
    material: 'Algodón',
    ubicacion: 'Frontal',
    tamañoEstampa: 'Grande',
    cantidad: 1,
    diseño: 'Impresión digital',
    precio: 19.99,
    imagen: DragonImg,
  },
  {
    id: 2,
    estampa: 'Estampa Tigre',
    descripcion: 'Camiseta con diseño de tigre.',
    color: 'Blanco',
    talla: 'M',
    material: 'Poliéster',
    ubicacion: 'Frontal',
    tamañoEstampa: 'Mediano',
    cantidad: 2,
    diseño: 'Serigrafía',
    precio: 24.99,
    imagen: TigreImg,
  },
  {
    id: 3,
    estampa: 'Estampa Lobo',
    descripcion: 'Camiseta con diseño de lobo.',
    color: 'Gris',
    talla: 'S',
    material: 'Algodón orgánico',
    ubicacion: 'Espalda',
    tamañoEstampa: 'Pequeño',
    cantidad: 1,
    diseño: 'Bordado',
    precio: 29.99,
    imagen: LoboImg,
  },
];

const Carrito = () => {
  const [articulos, setArticulos] = useState(ejemploArticulos);
  const navigate = useNavigate();

  // Función para eliminar un artículo del carrito
  const eliminarArticulo = (index) => {
    setArticulos((prevArticulos) => prevArticulos.filter((_, i) => i !== index));
  };

  const handleComprarTodo = () => {
    navigate('/ProcesoCompra');
  };

  return (
    <div className="carrito-container">
      <h2>Tu Carrito</h2>
      {articulos.length === 0 ? (
        <p>El carrito está vacío.</p>
      ) : (
        <div className="carrito-grid">
          {articulos.map((articulo, index) => (
            <div key={index} className="carrito-item">
              <img src={articulo.imagen} alt={articulo.estampa} className="carrito-imagen" />
              <div className="carrito-info">
                <h3>{articulo.estampa}</h3>
                <p><strong>Descripción:</strong> {articulo.descripcion}</p>
                <p><strong>Color:</strong> {articulo.color}</p>
                <p><strong>Talla:</strong> {articulo.talla}</p>
                <p><strong>Material:</strong> {articulo.material}</p>
                <p><strong>Ubicación:</strong> {articulo.ubicacion}</p>
                <p><strong>Tamaño de Estampa:</strong> {articulo.tamañoEstampa}</p>
                <p><strong>Cantidad:</strong> {articulo.cantidad}</p>
                <p><strong>Diseño:</strong> {articulo.diseño}</p>
                <p><strong>Precio:</strong> ${articulo.precio.toFixed(2)}</p>
                <div className="carrito-buttons">
                  <button onClick={() => eliminarArticulo(index)} className="carrito-btn eliminar">Eliminar</button>
                  <button onClick={() => navigate('/ProcesoCompra')} className="carrito-btn comprar">Comprar</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {articulos.length > 0 && (
        <button onClick={handleComprarTodo} className="carrito-btn comprar-todo">Comprar Todo</button>
      )}
    </div>
  );
};

export default Carrito;
