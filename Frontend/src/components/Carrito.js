// src/components/Carrito.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProcesoCompra.css';  // Usamos el mismo CSS que ProcesoCompra
import { Apiurl } from '../services/apirest';

const Carrito = () => {
  const [articulos, setArticulos] = useState([]);
  const navigate = useNavigate();

  // Cargar artículos desde localStorage al iniciar el componente
  useEffect(() => {
    const carritoGuardado = JSON.parse(localStorage.getItem('carrito')) || [];
    setArticulos(carritoGuardado);
  }, []);

  const obtenerStockActual = async (codigoEstampa) => {
    try {
      const response = await fetch(`${Apiurl}/estampas/${codigoEstampa}`);
      if (!response.ok) {
        throw new Error(`Error al obtener el stock actual: ${response.statusText}`);
      }
      const data = await response.json();
      return data.body[0]?.stock;  // Asegúrate de que la API devuelve el stock en esta estructura
    } catch (error) {
      console.error('Error al obtener el stock actual:', error);
      return null;  // Devuelve null si hay un error
    }
  };

  const eliminarArticulo = async (index) => {
    const articuloAEliminar = articulos[index];

    try {
      // Obtiene el stock actual de la base de datos antes de actualizar
      const stockActual = await obtenerStockActual(articuloAEliminar.id);

      if (stockActual === null) {
        console.error('No se pudo obtener el stock actual.');
        return;
      }

      // Actualiza el stock sumando la cantidad eliminada al stock actual de la base de datos
      await fetch(`${Apiurl}/estampas/modificarEstampa`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          codigoEstampa: articuloAEliminar.id,
          stock: stockActual + articuloAEliminar.cantidad,
        }),
      });

      // Elimina el artículo del carrito
      const nuevosArticulos = articulos.filter((_, i) => i !== index);
      setArticulos(nuevosArticulos);
      localStorage.setItem('carrito', JSON.stringify(nuevosArticulos));
    } catch (error) {
      console.error('Error al devolver el stock:', error);
    }
  };



  // Función para eliminar solo una unidad del artículo
  const eliminarUnaUnidad = async (index) => {
    const articuloAEliminar = articulos[index];

    try {
      // Obtiene el stock actual de la base de datos
      const stockActual = await obtenerStockActual(articuloAEliminar.id);

      if (stockActual === null) {
        console.error('No se pudo obtener el stock actual.');
        return;
      }

      // Devuelve solo una unidad al stock
      await fetch(`${Apiurl}/estampas/modificarEstampa`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          codigoEstampa: articuloAEliminar.id,
          stock: stockActual + 1,
        }),
      });

      // Actualiza el carrito local
      const nuevosArticulos = articulos.map((articulo, i) => {
        if (i === index) {
          return { ...articulo, cantidad: articulo.cantidad - 1 };
        }
        return articulo;
      }).filter(articulo => articulo.cantidad > 0);

      setArticulos(nuevosArticulos);
      localStorage.setItem('carrito', JSON.stringify(nuevosArticulos));
    } catch (error) {
      console.error('Error al devolver una unidad del stock:', error);
    }
  };



  // Función para vaciar el carrito y devolver el stock de todos los artículos
  const vaciarCarrito = async () => {
    try {
      await Promise.all(articulos.map(async (articulo) => {
        const stockActual = await obtenerStockActual(articulo.id);
  
        if (stockActual !== null) {
          await fetch(`${Apiurl}/estampas/modificarEstampa`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              codigoEstampa: articulo.id,
              stock: stockActual + articulo.cantidad,
            }),
          });
        }
      }));
  
      setArticulos([]);
      localStorage.removeItem('carrito');
    } catch (error) {
      console.error('Error al vaciar el carrito:', error);
    }
  };
  


  // Calcular el precio total
  const calcularTotal = () => {
    return articulos.reduce((total, articulo) => total + (articulo.precio * articulo.cantidad), 0).toFixed(2);
  };

  // Función para redirigir al proceso de compra
  const irAProcesoCompra = () => {
    navigate('/ProcesoCompra');
  };

  return (
    <div className="proceso-compra-container">
      <h2>Tu Carrito</h2>
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
                <div className="botones-container">
                  <button onClick={() => eliminarUnaUnidad(index)} className="proceso-compra-btn eliminar">Eliminar 1 Unidad</button>
                  <button onClick={() => eliminarArticulo(index)} className="proceso-compra-btn eliminar">Eliminar Todo</button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
      {articulos.length > 0 && (
        <div className="proceso-compra-total">
          <h3>Total: ${calcularTotal()}</h3>
          <div className="botones-container">
            <button onClick={irAProcesoCompra} className="proceso-compra-btn comprar">Comprar Todo</button>
            <button onClick={vaciarCarrito} className="proceso-compra-btn eliminar">Vaciar Carrito</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Carrito;
