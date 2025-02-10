// src/components/Carrito.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Carrito.css';
import { Apiurl } from '../services/apirest';
import { useAuth } from './Autenticacion';



const Carrito = () => {
  const [articulos, setArticulos] = useState([]);
  const { oficialNickname } = useAuth();

  useEffect(() => {
    const carritoGuardado = JSON.parse(localStorage.getItem('carrito')) || [];
    setArticulos(carritoGuardado);
  }, []);

  const actualizarEstampaEnBD = async (estampa, nuevoStock) => {
    try {
      const response = await fetch(`${Apiurl}/estampas/modificarEstampa`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          codigoEstampa: estampa.id,
          stock: nuevoStock,
        }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(`Error al modificar la estampa: ${data.error || response.statusText}`);
      }
  
    } catch (error) {
      console.error('Error al actualizar la estampa:', error);
    }
  };

  const obtenerStockActual = async (codigoEstampa) => {
    try {
      const response = await fetch(`${Apiurl}/estampas/${codigoEstampa}`);
      if (!response.ok) {
        throw new Error(`Error al obtener el stock actual: ${response.statusText}`);
      }
      const data = await response.json();
      return data.body[0]?.stock;
    } catch (error) {
      console.error('Error al obtener el stock actual:', error);
      return null;  
    }
  };

  const eliminarArticulo = async (index) => {
    try {
      const nuevosArticulos = articulos.filter((_, i) => i !== index);
      setArticulos(nuevosArticulos);
      localStorage.setItem('carrito', JSON.stringify(nuevosArticulos));
    } catch (error) {
      console.error('Error al devolver el stock:', error);
    }
  };

  const eliminarUnaUnidad = async (index) => {
    try {
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

  const vaciarCarrito = async () => {
    try {
      setArticulos([]);
      localStorage.removeItem('carrito');
    } catch (error) {
      console.error('Error al vaciar el carrito:', error);
    }
  };
  
  const calcularTotal = () => {
    return articulos.reduce((total, articulo) => total + (articulo.precio * articulo.cantidad), 0).toFixed(2);
  };

  const comprarTodo = async () => { 
    if (articulos.length === 0) {
        alert("No hay artículos en el carrito para comprar.");
        return;
    }
    try {
        const urlCedula = `${Apiurl}/usuarios/username/${oficialNickname}`;
        const responseCedula = await fetch(urlCedula);

        if (!responseCedula.ok) {
            throw new Error(`Error al obtener la cédula: ${responseCedula.status}`);
        }

        const dataCedula = await responseCedula.json();
        const cedula = dataCedula.body?.[0]?.cedula;

        if (!cedula) {
            throw new Error('No se pudo encontrar la cédula del usuario.');
        }

        const detallesVenta = [];

        for (const articulo of articulos) {
            const stockActual = await obtenerStockActual(articulo.id);

            if (stockActual === null) {
                throw new Error(`No se pudo obtener el stock de ${articulo.nombreEstampa}.`);
            }

            if (stockActual < articulo.cantidad) {
                throw new Error(`Stock insuficiente para ${articulo.nombreEstampa}.`);
            }

            const nuevoStock = stockActual - articulo.cantidad;
            await actualizarEstampaEnBD(articulo, nuevoStock);

            detallesVenta.push({
                codigoEstampa: articulo.id,
                cantidad: articulo.cantidad,
                precioUnitario: articulo.precio,
                color: articulo.color,
                talla: articulo.talla,
                material: articulo.material,
                ubicacion: articulo.ubicacion,
                tamañoEstampa: articulo.tamañoEstampa,
                diseño: articulo.diseño,
                descripcionPersonalizada: articulo.diseño === 'otro' ? articulo.descripcionPersonalizada : null,
            });

        }

        const totalCompra = calcularTotal();

        const ventaData = {
            cedula: cedula,
            totalCompra: totalCompra,
            detalles: detallesVenta,
        };
 
        const responseVenta = await fetch(`${Apiurl}/ventas`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(ventaData)
        });

        if (!responseVenta.ok) {
            throw new Error('Error al registrar la compra.');
        }
              
        setArticulos([]);
        localStorage.removeItem("carrito");

        alert('¡Compra realizada exitosamente y stock actualizado!');

    } catch (error) {
        console.error('Error al realizar la compra:', error);
        alert(`Error en la compra: ${error.message}`);
    }
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
            <button onClick={comprarTodo} className="proceso-compra-btn comprar">Comprar Todo</button>
            <button onClick={vaciarCarrito} className="proceso-compra-btn eliminar">Vaciar Carrito</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Carrito;
