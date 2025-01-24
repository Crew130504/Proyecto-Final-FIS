// src\components\SubirDiseñoPersonalizado.js
import React, { useState } from 'react';
import './SubirDiseñoPersonalizado.css';

//Permite subir diseños de camisetas personalizadas y con estampas por el usuario artista, también tiene validaciones.

const SubirDiseñoPersonalizado = () => {
  const [diseño, setDiseño] = useState('');
  const [diseñoCamisetaPersonalizado, setDiseñoCamisetaPersonalizado] = useState('');
  const [precioCamisetaPersonalizada, setPrecioCamisetaPersonalizada] = useState('');
  const [descripcionCamisetaPersonalizada, setDescripcionCamisetaPersonalizada] = useState('');
  const [imagenCamisetaPersonalizada, setImagenCamisetaPersonalizada] = useState(null);
  const [estampa, setEstampa] = useState('');
  const [precioEstampa, setPrecioEstampa] = useState('');
  const [descripcionEstampa, setDescripcionEstampa] = useState('');
  const [imagenEstampa, setImagenEstampa] = useState(null);
  const [talla, setTalla] = useState('M');
  const [materialCamiseta, setMaterialCamiseta] = useState('algodon');
  const [materialEstampa, setMaterialEstampa] = useState('algodon');
  const [ubicacion, setUbicacion] = useState('central');
  const [tamañoEstampa, setTamañoEstampa] = useState('mediano');
  const [disponibilidad, setDisponibilidad] = useState(1);
  const [descripcionGeneralDiseño, setDescripcionGeneralDiseño] = useState('');
  const [mensajeErrorCamiseta, setMensajeErrorCamiseta] = useState('');
  const [mensajeErrorEstampa, setMensajeErrorEstampa] = useState('')
  const [mensajeError, setMensajeError] = useState('');
  const [mostrarEstampa, setMostrarEstampa] = useState(false);
  

  const handleChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case 'diseño':
        setDiseño(value.slice(0, 25));
        break;
      case 'diseñoCamisetaPersonalizado':
        setDiseñoCamisetaPersonalizado(value.slice(0, 25));
        break;
      case 'disponibilidad':
      const disponibilidadValue = value.replace(/[^0-9]/g, ''); // Eliminar caracteres no numéricos
      setDisponibilidad(disponibilidadValue.slice(0, 5)); // Limitar a 5 dígitos
      break;
      case 'precioCamisetaPersonalizada':
        case 'precioEstampa':
          const numericValue = value.replace(/[^0-9]/g, ''); // Solo números
          const priceValue = parseInt(numericValue,6 );
          
          // Validar el precio
          if (name === 'precioCamisetaPersonalizada') {
            if (priceValue < 5000 || priceValue > 500000) {
              setMensajeErrorCamiseta('El precio debe estar entre 5,000 y 500,000.');
            } else {
              setMensajeErrorCamiseta('');
            }
            setPrecioCamisetaPersonalizada(numericValue ? numericValue : '');
          } else if (name === 'precioEstampa') {
            if (priceValue < 5000 || priceValue > 500000) {
              setMensajeErrorEstampa('El precio debe estar entre 5,000 y 500,000.');
            } else {
              setMensajeErrorEstampa('');
            }
            setPrecioEstampa(numericValue ? numericValue : '');
          }
        break;

      case 'materialCamiseta':
        setMaterialCamiseta(value);
        break;          
      case 'descripcionCamisetaPersonalizada':
        setDescripcionCamisetaPersonalizada(value.slice(0, 50));
        break;
      case 'estampa':
        setEstampa(value.slice(0, 25));
        break;
      case 'descripcionEstampa':
        setDescripcionEstampa(value.slice(0, 50));
        break;
      case 'talla':
        setTalla(value);
        break;
      case 'materialEstampa':
        setMaterialEstampa(value);
        break;
      case 'ubicacion':
        setUbicacion(value);
        break;
      case 'tamañoEstampa':
        setTamañoEstampa(value);
        break;
      case 'descripcionGeneralDiseño':
        setDescripcionGeneralDiseño(value.slice(0, 100));
        break;
      default:
        setOtherStates(name, value);
        break;
    }
  };
  // Manejo genérico para el cambio de estados que no necesitan tratamiento especial
const setOtherStates = (name, value) => {
  const setters = {
    materialCamiseta: setMaterialCamiseta,
    talla: setTalla,
    disponibilidad: setDisponibilidad,
    materialEstampa: setMaterialEstampa,
    ubicacion: setUbicacion,
    tamañoEstampa: setTamañoEstampa,
  };
  if (setters[name]) setters[name](value);
};
// Formatear números con comas
const formatNumber = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const { name } = e.target; // El nombre del input, puede ser "imagenCamisetaPersonalizada" o "imagenEstampa"
    
    if (file) {
      const validFormats = ['image/jpeg', 'image/png', 'image/gif'];
      const maxSize = 5 * 1024 * 1024; // 5 MB
  
      let mensajeError = '';
      let setImagen;
  
      // Identificar qué estado actualizar según el nombre del campo
      if (name === 'imagenCamisetaPersonalizada') {
        setImagen = setImagenCamisetaPersonalizada;
      } else if (name === 'imagenEstampa') {
        setImagen = setImagenEstampa;
      }
  
      // Validar el archivo subido
      if (file.name.length > 25) {
        mensajeError = 'El nombre de la imagen debe tener menos de 25 caracteres.';
      } else if (!validFormats.includes(file.type)) {
        mensajeError = 'Formato de imagen no válido. Solo se permiten JPEG, PNG y GIF.';
      } else if (file.size > maxSize) {
        mensajeError = 'La imagen excede el tamaño máximo de 5MB.';
      }
  
      // Actualizar los estados según el resultado de la validación
      if (mensajeError) {
        if (name === 'imagenCamisetaPersonalizada') {
          setMensajeErrorCamiseta(mensajeError);
        } else if (name === 'imagenEstampa') {
          setMensajeErrorEstampa(mensajeError);
        }
        setImagen(null);
      } else {
        if (name === 'imagenCamisetaPersonalizada') {
          setMensajeErrorCamiseta('');
        } else if (name === 'imagenEstampa') {
          setMensajeErrorEstampa('');
        }
        setImagen(URL.createObjectURL(file));
        setImagen(file);
      }
    }
  };

  //Esto es para hacer la visualización
  const obtenerEstampaEstilo = () => {
    let tamaño;
    switch (tamañoEstampa) {
      case 'grande':
        tamaño = { width: '60px', height: '60px' };
        break;
      case 'mediano':
        tamaño = { width: '40px', height: '40px' };
        break;
      case 'pequeño':
        tamaño = { width: '30px', height: '30px' };
        break;
      default:
        tamaño = { width: '30px', height: '30px' };
    }

    const posiciones = {
      superior: { left: '50%', top: '35%' },
      inferior: { left: '50%', top: '80%' },
      izquierda: { left: '40%', top: '50%' },
      derecha: { left: '60%', top: '50%' },
      central: { left: '50%', top: '50%' },
    };

    return {
      position: 'absolute',
      transform: 'translate(-50%, -50%)',
      ...tamaño,
      ...posiciones[ubicacion],
    };
  };  

  const handleDisponibilidadChange = (e) => {
    const disponibilidadValue = Math.max(1, Math.min(25000, Number(e.target.value))); // Limitar entre 1 y 25000
    setDisponibilidad(disponibilidadValue);
  
    if (disponibilidadValue > 25000) {
      setMensajeError('La disponibilidad debe estar entre 1 y 25,000.');
    } else {
      setMensajeError(''); // Limpiar mensaje de error si la disponibilidad es válida
    }
  };

  //Aquí estan las verificaciones que se hacen antes de poder subir el diseño
  const handleSubmit = (e) => {
    e.preventDefault();
    
  
    // Validar campos principales
    if (!diseñoCamisetaPersonalizado || !descripcionCamisetaPersonalizada || !imagenCamisetaPersonalizada || !precioCamisetaPersonalizada) {
      setMensajeError('Por favor, completa todos los campos obligatorios.');
      return;
    }

    const disponibilidadValue = Number(disponibilidad); // Convertir a número
    if (!Number.isFinite(disponibilidadValue) || disponibilidadValue < 1 || disponibilidadValue > 25000) {
    setMensajeError('La disponibilidad de los diseños debe estar entre 1 y 25,000.');
    return;
    }

    const priceValue = parseInt(precioCamisetaPersonalizada.replace(/,/g, ''));
    if (priceValue < 5000 || priceValue > 500000) {
      setMensajeError('El precio de la camiseta personalizada debe estar entre 5,000 y 500,000.');
      return;
    }
  
    // Validar campos de estampa solo si está activa
    if (mostrarEstampa) {
      if (!estampa || !precioEstampa || !descripcionEstampa || !imagenEstampa) {
        setMensajeError('Por favor, completa todos los campos relacionados con la estampa.');
        return;
      }
  
      const estampaPriceValue = parseInt(precioEstampa.replace(/,/g, ''));
      if (estampaPriceValue < 5000 || estampaPriceValue > 500000) {
        setMensajeError('El precio de la estampa debe estar entre 5,000 y 200,000.');
        return;
      }
    }
    
    
    // Si todo está correcto, preparar los datos
    const formData = new FormData();
    formData.append('diseño', diseño);
    formData.append('diseñoCamisetaPersonalizado', diseñoCamisetaPersonalizado);
    formData.append('precioCamisetaPersonalizada', precioCamisetaPersonalizada);
    formData.append('descripcionCamisetaPersonalizada', descripcionCamisetaPersonalizada);
    formData.append('imagenCamisetaPersonalizada', imagenCamisetaPersonalizada);
    formData.append('materialCamiseta', materialCamiseta);
  
    if (mostrarEstampa) {
      formData.append('estampa', estampa);
      formData.append('precioEstampa', precioEstampa);
      formData.append('descripcionEstampa', descripcionEstampa);
      formData.append('imagenEstampa', imagenEstampa);
      formData.append('ubicacion', ubicacion);
      formData.append('tamañoEstampa', tamañoEstampa);
    }
  
    formData.append('talla', talla);
    formData.append('materialEstampa', materialEstampa);
    formData.append('disponibilidad', disponibilidad);
    formData.append('descripcionGeneralDiseño', descripcionGeneralDiseño);

    handleSubiendoDiseño();

    // Enviar datos
    fetch('/api/subir-diseñoCamisetaPersonalizado', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert('¡Diseño subido con éxito!');
        } else {
          alert('Error al subir el diseño.');
        }
      })
      .catch((mensajeError) => {
        alert('Error de conexión: ' + mensajeError);
      });
  };
  

  const toggleEstampa = () => {
    setMostrarEstampa((prev) => !prev);
  };
  
  const handleSubiendoDiseño = () => {
    let parametros = `
    Subiendo Diseño:
    - Título Diseño: ${diseño || 'No especificado'}
    - Nombre Camiseta: ${diseñoCamisetaPersonalizado || 'No especificado'}
    - Disponibilidad diseño: ${disponibilidad || 'No especificado'}
    - Precio Camiseta: ${precioCamisetaPersonalizada || 'No especificado'}
    - Descripción Camiseta: ${descripcionCamisetaPersonalizada || 'No especificado'}
    - Imagen Camiseta: ${imagenCamisetaPersonalizada ? imagenCamisetaPersonalizada.name : 'No especificado'}
    - Talla: ${talla || 'No especificado'}
    - Material: ${materialCamiseta || 'No especificado'}
    - Disponibilidad: ${disponibilidad || 'No especificado'}
    - Descripción General: ${descripcionGeneralDiseño || 'No especificado'}
    `;
  
    if (mostrarEstampa) {
      parametros += `
      **Detalles de Estampa**
      - Nombre Estampa: ${estampa || 'No especificado'}
      - Precio Estampa: ${precioEstampa || 'No especificado'}
      - Descripción Estampa: ${descripcionEstampa || 'No especificado'}
      - Imagen Estampa: ${imagenEstampa ? imagenEstampa.name : 'No especificado'}
      - Material: ${materialEstampa || 'No especificado'}
      - Ubicación: ${ubicacion || 'No especificado'}
      - Tamaño: ${tamañoEstampa || 'No especificado'}
      `;
    }
  
    alert(parametros);
  };
  
  return (
    <div>
      <h1>Subir Diseño Personalizado</h1>
      {imagenCamisetaPersonalizada && (
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <p>Vista previa de la camiseta:</p>
          <img
            src={URL.createObjectURL(imagenCamisetaPersonalizada)}
            alt="Vista previa camiseta"
            style={{ maxWidth: '200px', maxHeight: '200px' }}
          />
          {imagenEstampa && (
            <img
              src={URL.createObjectURL(imagenEstampa)}
              alt="Vista previa estampa"
              style={obtenerEstampaEstilo()}
            />
          )}
        </div>
      )}
   
      <form className="form-container" onSubmit={handleSubmit}>
        {/* Opciones principales */}
        <div>
          <label htmlFor="diseño">Título Diseño:</label>
          <input type="text" id="diseño" name="diseño" value={diseño} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="diseñoCamisetaPersonalizado">Nombre Camiseta Personalizada:</label>
          <input
            type="text"
            id="diseñoCamisetaPersonalizado"
            name="diseñoCamisetaPersonalizado"
            value={diseñoCamisetaPersonalizado}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="disponibilidad">Disponibilidad:</label>
          <input
            type="number"
            name="disponibilidad"
            value={disponibilidad}
            onChange={handleDisponibilidadChange}
            placeholder="Ingrese cantidad (1-25000)"
            min="1"
            max="25000"
            step="1"
            required
          />
        </div>

        <div>
          <label htmlFor="precioCamisetaPersonalizada">Precio Camiseta Personalizada:</label>
          <input
            type="text"
            id="precioCamisetaPersonalizada"
            name="precioCamisetaPersonalizada"
            value={precioCamisetaPersonalizada ? formatNumber(precioCamisetaPersonalizada) : ''}
            onChange={handleChange}
            maxLength="7"
            required
          />
        </div>
        <div>
              <label htmlFor="descripcionGeneralDiseño">Descripción General del Diseño:</label>
              <textarea
                id="descripcionGeneralDiseño"
                name="descripcionGeneralDiseño"
                value={descripcionGeneralDiseño}
                onChange={handleChange}
                maxLength="60"
                required
              />
              <p>{descripcionGeneralDiseño.length}/60 caracteres</p>
            </div>
        <div>
          <label htmlFor="imagenCamisetaPersonalizada">Imagen Camiseta Personalizada:</label>
          <input
            type="file"
            id="imagenCamisetaPersonalizada"
            name="imagenCamisetaPersonalizada"
            accept="image/*"
            onChange={handleImageChange}
            required
          />
        </div>
        <label>
          Material Camiseta:
          <select value={materialCamiseta} onChange={(e) => setMaterialCamiseta(e.target.value)}>
            <option value="algodon">Algodón</option>
            <option value="poliester">Poliéster</option>
            <option value="seda">Seda</option>
            <option value="rayon">Rayón</option>
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
        <div>
          <label htmlFor="descripcionCamisetaPersonalizada">Descripción Camiseta Personalizada:</label>
          <textarea
            id="descripcionCamisetaPersonalizada"
            name="descripcionCamisetaPersonalizada"
            value={descripcionCamisetaPersonalizada}
            onChange={handleChange}
            maxLength="60"
            required
          />
          <p>{descripcionCamisetaPersonalizada.length}/60 caracteres</p>
          {mensajeErrorCamiseta && <p style={{ color: "red" }}>{mensajeErrorCamiseta}</p>}
        </div>

        {/* Botón dinámico */}
        <button type="button" onClick={toggleEstampa}>
          {mostrarEstampa ? "Remover Estampa" : "Agregar Estampa"}
        </button>

        {/* Opciones de estampa */}
        {mostrarEstampa && (
          <div>
            <div>
              <label htmlFor="estampa">Nombre Estampa:</label>
              <input type="text" id="estampa" name="estampa" value={estampa} onChange={handleChange} required />
            </div>
            <div>
              <label htmlFor="precioEstampa">Precio Estampa:</label>
              <input type="text" id="precioEstampa" name="precioEstampa" value={precioEstampa ? formatNumber(precioEstampa) : ''} onChange={handleChange} maxLength="7" required />
            </div>
            <div>
              <label htmlFor="descripcionEstampa">Descripción Estampa:</label>
              <textarea
                id="descripcionEstampa"
                name="descripcionEstampa"
                value={descripcionEstampa}
                onChange={handleChange}
                maxLength="60"
                required
              />
              <p>{descripcionEstampa.length}/60 caracteres</p>
            </div>
            <div>
              <label htmlFor="imagenEstampa">Imagen Estampa:</label>
              <input
                type="file"
                id="imagenEstampa"
                name="imagenEstampa"
                accept="image/*"
                onChange={handleImageChange}
                required
              />
              {mensajeErrorEstampa && <p style={{ color: "red" }}>{mensajeErrorEstampa}</p>}
            </div>
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
            {/* Opciones de personalización */}
        <label>
          Material Estampa:
          <select value={materialEstampa} onChange={(e) => setMaterialEstampa(e.target.value)}>
            <option value="algodon">Algodón</option>
            <option value="poliester">Poliéster</option>
            <option value="seda">Seda</option>
            <option value="rayon">Rayón</option>
          </select>
        </label>
          </div>
        )}

        <button type="submit">Subir Diseño Personalizado</button>
      </form>
    </div>
  );
};

export default SubirDiseñoPersonalizado;
