//EstampaDetalle.js
import React, { useState, useEffect } from 'react';
import './EstampaDetalle.css';

//Este componente permite personalizar las estampas luego de seleccionarlas.
//

// Imágenes de camisetas en diferentes colores
import camisetaBlanca from '../Imagenes/camiseta_blanca.png';
import camisetaNegra from '../Imagenes/camiseta_negra.png';
import camisetaAzul from '../Imagenes/camiseta_azul.png';
import camisetaRoja from '../Imagenes/camiseta_roja.png';

const EstampaDetalle = ({ estampa, onClose }) => {
  const [color, setColor] = useState('blanco'); // Color inicial: blanco
  const [talla, setTalla] = useState('M');
  const [material, setMaterial] = useState('algodon');
  const [ubicacion, setUbicacion] = useState('central');
  const [tamañoEstampa, setTamañoEstampa] = useState('mediano');
  const [cantidad, setCantidad] = useState(1);
  const [diseño, setDiseño] = useState('predeterminado');
  const [descripcionPersonalizada, setDescripcionPersonalizada] = useState('');
  const [mensajeError, setMensajeError] = useState(''); // Estado para el mensaje de error
  const [precioTotal, setPrecioTotal] = useState(estampa.precio); // Estado para el precio total

   // Actualiza el precio total cada vez que cambia la cantidad
   useEffect(() => {
    setPrecioTotal(estampa.precio * cantidad);
  }, [cantidad, estampa.precio]);

  const handleCantidadChange = (e) => {
    let value = parseInt(e.target.value, 10);
  
    if (value > estampa.disponibilidad) {
      setMensajeError(`Solo hay ${estampa.disponibilidad} unidades disponibles.`);
      value = estampa.disponibilidad;  // Limita la cantidad a la disponibilidad
    } else if (value < 1) {
      value = 1;  // Limita la cantidad a 1 como mínimo
    } else {
      setMensajeError('');
    }
    setCantidad(value);
  };
  

  const handleCantidadBlur = () => {
    setCantidad((prevCantidad) => Math.min(estampa.disponibilidad, Math.max(1, prevCantidad)));
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
        return { left: '50%', top: '10%' }; // Estampa a nivel superior
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

  const handleCompra = () => {

    alert(`Comprando camiseta:
      Color: ${color}
      Talla: ${talla}
      Material: ${material}
      Ubicación: ${ubicacion}
      Cantidad: ${cantidad}
      Diseño: ${diseño === 'otro' ? descripcionPersonalizada : diseño}
      Precio Total: $${precioTotal.toLocaleString()}`);

  };

  const handleAñadirAlCarrito = () => {
    alert(`Añadiendo camiseta al carrito:
      Color: ${color}
      Talla: ${talla}
      Material: ${material}
      Ubicación: ${ubicacion}
      Cantidad: ${cantidad}
      Diseño: ${diseño === 'otro' ? descripcionPersonalizada : diseño}
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
            src={estampa.imagen}
            alt={estampa.nombre}
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
        <h2>{estampa.nombre}</h2>
        <span className="detalle-precio">Precio: ${estampa.precio.toLocaleString()}</span>
        <span className="detalle-disponibilidad">Disponibilidad: {estampa.disponibilidad}</span>

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
            max={estampa.disponibilidad}
            value={cantidad}
            onChange={handleCantidadChange}
            onBlur={handleCantidadBlur}
          />
          {mensajeError && <p className="error-mensaje">{mensajeError}</p>} {/* Muestra el mensaje de error */}
        </label>

        <label>
        Diseño:
        <select value={diseño} onChange={(e) => setDiseño(e.target.value)}>
          <option value="predeterminado">Predeterminado</option>
          <option value="otro">Otro diseño</option>
        </select>
      </label>

      {/* Muestra el campo de descripción solo si elige "Otro diseño" */}
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

export default EstampaDetalle;

