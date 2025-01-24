// src/components/DiseñosPersonalizadosDetalle.js
import React, { useState, useEffect } from 'react';
import './DiseñosPersonalizadosDetalle.css';
import './CatalogoEstampas';

//Este componente muestra la interfaz para personalizar los diseños personalizados luego de elegirlos en "CatalogoDiseñosPersonalizados"

// Imágenes de camisetas en diferentes colores
import camisetaBlanca from '../Imagenes/camiseta_blanca.png';
import camisetaNegra from '../Imagenes/camiseta_negra.png';
import camisetaAzul from '../Imagenes/camiseta_azul.png';
import camisetaRoja from '../Imagenes/camiseta_roja.png';

const DiseñosPersonalizadosDetalle = ({ diseño, onClose }) => {
    // Inicializa los estados con los valores del diseño
    const [estampa, setEstampa] = useState(diseño.estampa);
    const [color, setColor] = useState(diseño.color);
    const [talla, setTalla] = useState(diseño.talla);
    const [material, setMaterial] = useState(diseño.material);
    const [ubicacion, setUbicacion] = useState(diseño.ubicacion);
    const [tamañoEstampa, setTamañoEstampa] = useState(diseño.tamañoEstampa);
    const [cantidad, setCantidad] = useState(diseño.cantidad);
    const [precioTotal, setPrecioTotal] = useState(diseño.precio);
    const [mensajeError, setMensajeError] = useState('');
  

   // Actualiza el precio total cada vez que cambia la cantidad
   useEffect(() => {
    setPrecioTotal(diseño.precio * cantidad);
  }, [cantidad, diseño.precio]);

  const handleCantidadChange = (e) => {
    let value = parseInt(e.target.value, 10);
  
    if (value > diseño.disponibilidad) {
      setMensajeError(`Solo hay ${diseño.disponibilidad} unidades disponibles.`);
      value = diseño.disponibilidad;  // Limita la cantidad a la disponibilidad
    } else if (value < 1) {
      value = 1;  // Limita la cantidad a 1 como mínimo
    } else {
      setMensajeError('');
    }
    setCantidad(value);
  };
  

  const handleCantidadBlur = () => {
    setCantidad((prevCantidad) => Math.min(diseño.disponibilidad, Math.max(1, prevCantidad)));
    setMensajeError(''); // Limpia el mensaje de error cuando el usuario termina de editar
  };

  // Seleccionar la imagen de la camiseta según el color
  const obtenerCamiseta = () => {
    switch (color) {
      case 'negro':
        return camisetaNegra;
      case 'azul':
        return camisetaAzul;
      case 'rojo':
        return camisetaRoja;
      default:
        return camisetaBlanca; // Predeterminado a camiseta blanca
    }
  };

  // Establecer la posición de la estampa
  const obtenerEstampaEstilo = () => {
    switch (ubicacion) {
      case 'superior':
        return { left: '50%', top: '30%' }; // Estampa a nivel superior
      case 'inferior':
        return { left: '50%', top: '70%' }; // Estampa a nivel inferior
      case 'izquierda':
        return { left: '30%', top: '50%' }; // Estampa a la izquierda
      case 'derecha':
        return { left: '70%', top: '50%' }; // Estampa a la derecha
      case 'central':
      default:
        return { left: '50%', top: '50%' }; // Estampa centrada
    }
  };

  //Mensajes al completar la compra o agregar al carrito.
  const handleCompra = () => {

    alert(`Comprando camiseta:
      Estampa: ${estampa}
      Color: ${color}
      Talla: ${talla}
      Material: ${material}
      Ubicación: ${ubicacion}
      Cantidad: ${cantidad}
      Precio Total: $${precioTotal.toLocaleString()}`);

  };

  const handleAñadirAlCarrito = () => {
    alert(`Añadiendo camiseta al carrito:
      Estampa: ${estampa}
      Color: ${color}
      Talla: ${talla}
      Material: ${material}
      Ubicación: ${ubicacion}
      Cantidad: ${cantidad}
      Precio Total: $${precioTotal.toLocaleString()}`);
      
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
            src={diseño.estampaimg}
            alt={diseño.nombreDiseño}
            className={`estampa-previsualizacion ${
              tamañoEstampa === 'grande'
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
        <h2>{diseño.nombre}</h2>
        <span className="detalle-precio">Precio: ${diseño.precio.toLocaleString()}</span>
        <span className="detalle-disponibilidad">Disponibilidad: {diseño.disponibilidad}</span>

        {/* Opciones de personalización */}
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
            max={diseño.disponibilidad}
            value={cantidad}
            onChange={handleCantidadChange}
            onBlur={handleCantidadBlur}
          />
          {mensajeError && <p className="error-mensaje">{mensajeError}</p>} {/* Muestra el mensaje de error */}
        </label>

        <label>
        Estampa:
        <select value={estampa} onChange={(e) => setEstampa(e.target.value)}>
          <option value="diseño.estampa">Seleccionada(este diseño)</option>
          <option value="Estampa Lobo">Estampa Lobo</option>
          <option value="Estampa Tigre">Estampa Tigre</option>
        </select>
      </label>
        
         {/* Muestra el precio total con separadores de miles */}
        <p className="precio-total">Precio total: ${precioTotal.toLocaleString()}</p>


        {/* Botones */}
        <div className="detalle-botones">
          <button className="boton-comprar" onClick={handleCompra}>Comprar</button>
          <button className="boton-carrito" onClick={handleAñadirAlCarrito}>Agregar al carrito</button>
        </div>

        {/* Descripción */}
        <div className="detalle-descripcion">
          <h4>Descripción</h4>
          <p>{estampa.descripcion}</p>
        </div>
      </div>
    </div>
  );
};


export default DiseñosPersonalizadosDetalle;
