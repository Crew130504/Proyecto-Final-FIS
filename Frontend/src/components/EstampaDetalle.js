//EstampaDetalle.js
import React, { useState, useEffect } from 'react';
import './EstampaDetalle.css';
import { Apiurl } from '../services/apirest';
import { useAuth } from './Autenticacion';

//Este componente permite personalizar las estampas luego de seleccionarlas.

import camisetaBlanca from '../Imagenes/camiseta_blanca.png';
import camisetaNegra from '../Imagenes/camiseta_negra.png';
import camisetaAzul from '../Imagenes/camiseta_azul.png';
import camisetaRoja from '../Imagenes/camiseta_roja.png';

const EstampaDetalle = ({ estampa, onClose }) => {
  const [color, setColor] = useState('blanco'); 
  const [talla, setTalla] = useState('M');
  const [material, setMaterial] = useState('algodon');
  const [ubicacion, setUbicacion] = useState('central');
  const [tamañoEstampa, setTamañoEstampa] = useState('mediano');
  const [cantidad, setCantidad] = useState(1);
  const [diseño, setDiseño] = useState('predeterminado');
  const [descripcionPersonalizada, setDescripcionPersonalizada] = useState('');
  const [mensajeError, setMensajeError] = useState(''); 
  const [precioTotal, setPrecioTotal] = useState(estampa.precio); 
  const { isAuthenticated, userRole, oficialNickname } = useAuth();

  useEffect(() => {
    const cantidadValida = isNaN(cantidad) || cantidad === "" ? 0 : cantidad;
    setPrecioTotal(estampa.precio * cantidadValida);
  }, [cantidad, estampa.precio]);


  const handleCantidadChange = (e) => {
    const value = e.target.value;

    if (value === "" || /^[0-9]*$/.test(value)) {
      setCantidad(value); 
      setMensajeError("");
    }
  };
  
  

  const handleCantidadBlur = () => {
    setCantidad((prevCantidad) => {
      const numericValue = parseInt(prevCantidad, 10);
  
      if (isNaN(numericValue) || numericValue < 1) {
        setMensajeError("La cantidad mínima es 1."); 
        return 1;
      }
      if (numericValue > estampa.stock) {
        setMensajeError(`Solo hay ${estampa.stock} unidades disponibles.`); 
        return estampa.stock;
      }
  
      setMensajeError(""); 
      return numericValue; 
    });
  };
  
  


  
  const obtenerCamiseta = () => {
    switch (color) {
      case 'negro':
        return camisetaNegra;
      case 'azul':
        return camisetaAzul;
      case 'rojo':
        return camisetaRoja;
      default:
        return camisetaBlanca; 
    }
  };


  const obtenerEstampaEstilo = () => {
    switch (ubicacion) {
      case 'superior':
        return { left: '50%', top: '10%' }; 
      case 'inferior':
        return { left: '50%', top: '70%' }; 
      case 'izquierda':
        return { left: '30%', top: '50%' }; 
      case 'derecha':
        return { left: '70%', top: '50%' }; 
      case 'central':
      default:
        return { left: '50%', top: '50%' };
    }
  };

  const handleCompra = async () => {
    if (!isAuthenticated || userRole !== 'cliente') {
        alert('Debes iniciar sesión como cliente para realizar una compra.');
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

        const ventaData = {
            cedula: cedula,
            totalCompra: precioTotal,
            detalles: [
                {
                    codigoEstampa: estampa.id,
                    cantidad: cantidad,
                    precioUnitario: estampa.precio,
                    color: color,
                    talla: talla,
                    material: material,
                    ubicacion: ubicacion,
                    tamañoEstampa: tamañoEstampa,
                    diseño: diseño,
                    descripcionPersonalizada: diseño === 'otro' ? descripcionPersonalizada : null,
                }
            ]
        };

        const responseVenta = await fetch(`${Apiurl}/ventas`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(ventaData)
        });

        const result = await responseVenta.json();

        if (responseVenta.ok) {
            const nuevoStock = estampa.stock - cantidad;
            await actualizarEstampaEnBD(estampa, nuevoStock);

            alert('¡Compra realizada exitosamente y stock actualizado!');
            window.location.reload();
        } else {
            throw new Error(result.error || 'Error al registrar la compra.');
        }
    } catch (error) {
        console.error('Error al realizar la compra:', error);
        alert('Hubo un error al realizar la compra. Intenta nuevamente.');
    }
};

const handleAñadirAlCarrito = () => {
  if (cantidad > estampa.stock) {
    setMensajeError(`Solo hay ${estampa.stock} unidades disponibles.`);
    return;
  }

  const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

  const productoExistente = carrito.find((item) =>
    item.id === estampa.codigoEstampa &&
    item.color === color &&
    item.talla === talla &&
    item.material === material &&
    item.ubicacion === ubicacion &&
    item.tamañoEstampa === tamañoEstampa &&
    item.diseño === diseño &&
    item.descripcionPersonalizada === descripcionPersonalizada
  );

  if (productoExistente) {
    productoExistente.cantidad += cantidad;
  } else {
    carrito.push({
      id: estampa.id,
      nombreEstampa: estampa.nombreEstampa,
      descripcionEstampa: estampa.descripcionEstampa,
      cantidad: cantidad,
      precio: estampa.precio,
      color: color,
      talla: talla,
      material: material,
      ubicacion: ubicacion,
      tamañoEstampa: tamañoEstampa,
      diseño: diseño,
      descripcionPersonalizada: descripcionPersonalizada,
      imagen: estampa.imagen,
    });
  }

  localStorage.setItem('carrito', JSON.stringify(carrito));

  alert(`Producto agregado al carrito`);
};

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




  return (
    <div className="detalle-contenedor">
      <button className="boton-devolver" onClick={onClose}>
        <span className="flecha">&#8592;</span>
      </button>

      <div className="detalle-imagen">
        <div className="camiseta-previsualizacion" style={{ position: 'relative' }}>
          <img src={obtenerCamiseta()} alt="Camiseta" className="camiseta-imagen" />
          <img
            src={estampa.imagen}
            alt={estampa.nombre}
            className={`estampa-previsualizacion ${tamañoEstampa === 'grande'
                ? 'estampa-grande'
                : tamañoEstampa === 'mediano'
                  ? 'estampa-mediano'
                  : 'estampa-pequeno'
              }`}
            style={obtenerEstampaEstilo()}
          />
        </div>
      </div>

      <div className="detalle-info">
        <h2>{estampa.nombre}</h2>
        <span className="detalle-precio">Precio: ${estampa.precio.toLocaleString()}</span>
        <span className="detalle-disponibilidad">Disponibilidad: {estampa.stock}</span>

        <label>
          Color:
          <select value={color} onChange={(e) => setColor(e.target.value)}>
            <option value="blanco">Blanco</option>
            <option value="negro">Negro</option>
            <option value="rojo">Rojo</option>
            <option value="azul">Azul</option>
          </select>
        </label>

        <label>
          Talla:
          <select value={talla} onChange={(e) => setTalla(e.target.value)}>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
          </select>

        </label>

        <label>
          Material:
          <select value={material} onChange={(e) => setMaterial(e.target.value)}>
            <option value="algodon">Algodon</option>
            <option value="poliester">Poliester</option>
            <option value="seda">Seda</option>
            <option value="rayon">Rayon</option>
          </select>
        </label>

        <label>
          Ubicación de la estampa:
          <select value={ubicacion} onChange={(e) => setUbicacion(e.target.value)}>
            <option value="superior">Superior</option>
            <option value="inferior">Inferior</option>
            <option value="central">Central</option>
            <option value="izquierda">Izquierda</option>
            <option value="derecha">Derecha</option>
          </select>
        </label>

        <label>
          Tamaño de la estampa:
          <select value={tamañoEstampa} onChange={(e) => setTamañoEstampa(e.target.value)}>
            <option value="grande">Grande</option>
            <option value="mediano">Mediano</option>
            <option value="pequeño">Pequeño</option>
          </select>
        </label>

        <label>
          Cantidad:
          <input
            type="number"
            min="1"
            max={estampa.stock}
            value={cantidad === "" ? "" : cantidad} 
            onChange={handleCantidadChange}
            onBlur={handleCantidadBlur}
            className="input-cantidad"
          />
          {mensajeError && <p className="error-mensaje">{mensajeError}</p>}
        </label>

        <label>
          Diseño:
          <select value={diseño} onChange={(e) => setDiseño(e.target.value)}>
            <option value="predeterminado">Predeterminado</option>
            <option value="otro">Otro diseño</option>
          </select>
        </label>

        {diseño === 'otro' && (
          <label>
            Descripción del diseño:
            <textarea
              placeholder="Escribe las especificaciones de tu diseño"
              maxLength={30}
              value={descripcionPersonalizada}
              onChange={(e) => setDescripcionPersonalizada(e.target.value)}
            />
            <p className="caracteres-restantes">
              {30 - descripcionPersonalizada.length} caracteres restantes
            </p>
          </label>
        )}

 
        <p className="precio-total">Precio total: ${isNaN(precioTotal) || precioTotal == null ? 0 : precioTotal.toLocaleString()}</p>

        <div className="detalle-botones">
          <button className="boton-comprar" onClick={handleCompra}>Comprar</button>
          <button className="boton-carrito" onClick={handleAñadirAlCarrito}>Agregar al carrito</button>
        </div>

        <div className="detalle-descripcion">
          <h4>Descripción</h4>
          <p>{estampa.descripcion}</p>
        </div>
      </div>
    </div>
  );
};

export default EstampaDetalle;

