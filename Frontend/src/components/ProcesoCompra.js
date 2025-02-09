// src/components/ProcesoCompra.js
import React, { useState, useEffect } from 'react';
import './ProcesoCompra.css';
import { Apiurl } from '../services/apirest';

const ProcesoCompra = () => {
  const [articulos, setArticulos] = useState([]);

  // Cargar artículos desde localStorage al iniciar el componente
  useEffect(() => {
    const carritoGuardado = JSON.parse(localStorage.getItem('carrito')) || [];
    setArticulos(carritoGuardado);
  }, []);

  // Función para eliminar completamente un artículo de la compra
  const eliminarArticulo = (index) => {
    const nuevosArticulos = articulos.filter((_, i) => i !== index);
    setArticulos(nuevosArticulos);
    localStorage.setItem('carrito', JSON.stringify(nuevosArticulos));
  };

  // Función para eliminar solo una unidad del artículo
  const eliminarUnaUnidad = (index) => {
    const nuevosArticulos = articulos.map((articulo, i) => {
      if (i === index) {
        return {
          ...articulo,
          cantidad: articulo.cantidad - 1,
        };
      }
      return articulo;
    }).filter(articulo => articulo.cantidad > 0);

    setArticulos(nuevosArticulos);
    localStorage.setItem('carrito', JSON.stringify(nuevosArticulos));
  };

  // Calcular el precio total
  const calcularTotal = () => {
    return articulos.reduce((total, articulo) => total + (articulo.precio * articulo.cantidad), 0).toFixed(2);
  };

  // Función para completar la compra
  const completarCompra = async () => {
    try {
      alert('Compra realizada con éxito');
      setArticulos([]);
      localStorage.removeItem('carrito');
    } catch (error) {
      console.error('Error al completar la compra:', error);
    }
  };

  return (
    <div className="proceso-compra-container">
      <h2>Proceso de Compra</h2>
      {articulos.length === 0 ? (
        <p>No hay artículos en el carrito.</p>
      ) : (
        <ul className="proceso-compra-lista">
          {articulos.map((articulo, index) => (
            <li key={index} className="proceso-compra-item">
              <img src={articulo.imagen} alt={articulo.nombreEstampa} className="proceso-compra-imagen" />
              <div className="proceso-compra-info">
                <h3>{articulo.nombreEstampa}</h3>
                <p><strong>Descripción:</strong> {articulo.descripcionEstampa}</p>
                <p><strong>Color:</strong> {articulo.color}</p>
                <p><strong>Talla:</strong> {articulo.talla}</p>
                <p><strong>Material:</strong> {articulo.material}</p>
                <p><strong>Ubicación de la estampa:</strong> {articulo.ubicacion || articulo.ubicacionEstampa}</p>
                <p><strong>Tamaño de la estampa:</strong> {articulo.tamañoEstampa}</p>
                <p><strong>Cantidad:</strong> {articulo.cantidad}</p>
                <p><strong>Diseño:</strong> {articulo.diseño === 'otro' ? articulo.descripcionPersonalizada : articulo.diseño}</p>
                <p><strong>Precio:</strong> ${(articulo.precio * articulo.cantidad).toFixed(2)}</p>
                <button onClick={() => eliminarUnaUnidad(index)} className="proceso-compra-btn reducir">Eliminar 1 Unidad</button>
                <button onClick={() => eliminarArticulo(index)} className="proceso-compra-btn eliminar">Eliminar Todo</button>
              </div>
            </li>
          ))}
        </ul>
      )}
      {articulos.length > 0 && (
        <div className="proceso-compra-total">
          <h3>Total: ${calcularTotal()}</h3>
          <button onClick={completarCompra} className="proceso-compra-btn comprar">Comprar Todo</button>
        </div>
      )}
    </div>
  );
};

export default ProcesoCompra;
