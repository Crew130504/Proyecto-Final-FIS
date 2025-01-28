import React, { useState } from 'react';
import { useAuth } from './Autenticacion';
import { Apiurl } from '../services/apirest';
import './SubirEstampa.css';

const SubirEstampa = () => {
  // Hooks de useState para manejar los inputs del formulario y mensajes de retroalimentación
  const [nombreEstampa, setNombreEstampa] = useState('');
  const [descripcionEstampa, setDescripcionEstampa] = useState('');
  const [precioEstampa, setPrecioEstampa] = useState('');
  const [stockEstampa, setStockEstampa] = useState('');
  const [imagenEstampa, setImagenEstampa] = useState(null);
  const [error, setError] = useState('');
  const [mensaje, setMensaje] = useState('');
  // Almacena el nickname del usuario autenticado
  const { oficialNickname } = useAuth();

  // Actualiza el estado dinámicamente según los cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case 'nombreEstampa':
        setNombreEstampa(value.slice(0, 17)); // Máximo 17 caracteres
        break;
      case 'descripcionEstampa':
        setDescripcionEstampa(value.slice(0, 50)); // Máximo 50 caracteres
        break;
      case 'precioEstampa':
        const numericValue = value.replace(/[^0-9]/g, ''); // Solo números
        setPrecioEstampa(numericValue ? formatPrice(numericValue) : '');
        break;
      case 'stockEstampa':
        const stockValue = parseInt(value, 10);
        setStockEstampa(stockValue > 0 || value === '' ? value : stockEstampa); // Solo valores mayores a 0
        break;
      default:
        break;
    }
  };

  // Valida y procesa el archivo de imagen cargado
  const handleImageChange = (e) => {
    setError("");
    const file = e.target.files[0];

    if (file) {
      const validFormats = ['image/jpeg', 'image/png', 'image/gif'];
      const maxSize = 5 * 1024 * 1024; // 5MB

      if (!validFormats.includes(file.type)) {
        setError('Formato de imagen no válido. Solo JPEG, PNG o GIF.');
        setImagenEstampa(null);
        return;
      }

      if (file.size > maxSize) {
        setError('La imagen excede el tamaño máximo de 5MB.');
        setImagenEstampa(null);
        return;
      }

      setError('');
      setImagenEstampa(file);
    }
  };

  // Formatea un valor numérico en un string con formato de precio
  const formatPrice = (value) => {
    return new Intl.NumberFormat().format(value);
  };
  // Elimina el formato de un string de precio para extraer el valor numérico
  const unformatPrice = (value) => {
    return value.replace(/[,.]/g, ''); // Elimina comas y puntos
  };

  // Maneja el envío del formulario y se comunica con la API del backend
const handleSubmit = async (e) => {
  e.preventDefault();
  setError(""); // Limpia el mensaje de error
  setMensaje(""); // Limpia el mensaje de éxito

  try {
    if (!nombreEstampa || !descripcionEstampa || !precioEstampa || !stockEstampa || !imagenEstampa) {
      setError("Por favor, completa todos los campos.");
      return;
    }

    const priceValue = unformatPrice(precioEstampa);
    if (priceValue < 10000 || priceValue > 500000) {
      setError("El precio debe estar entre 10,000 y 500,000.");
      return;
    }

    // Obtiene la cédula del usuario autenticado usando su nickname
    const urlCedula = `${Apiurl}/usuarios/username/${oficialNickname}`;
    const responseCedula = await fetch(urlCedula);

    if (!responseCedula.ok) {
      throw new Error(`Error en la solicitud al obtener la cédula: ${responseCedula.status}`);
    }

    const dataCedula = await responseCedula.json();
    const cedula = dataCedula.body?.[0]?.cedula;

    if (!cedula) {
      throw new Error("No se encontró la cédula para el usuario.");
    }

    // Prepara y agrega los datos del formulario para su envío a la API
    const formData = new FormData();
    formData.append("nombreEstampa", nombreEstampa);
    formData.append("descripcionEstampa", descripcionEstampa);
    formData.append("precio", priceValue);
    formData.append("stock", stockEstampa);
    formData.append("imagen", imagenEstampa);
    formData.append("cedula", cedula);

    // Envío del formulario al backend
    const Url = `${Apiurl}/estampas/crearEstampa`;
    const response = await fetch(Url, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (!data.error && data.status === 201) {
      setMensaje("¡Estampa subida con éxito!");
    } else {
      setError(data.message || "Error al subir la estampa.");
    }
  } catch (error) {
    setError("Error de conexión: " + error.message);
  }
};


  return (
    <div>
      <h1>Subir Estampa</h1>
      <form className="form-container" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nombreEstampa">Nombre:</label>
          <input
            type="text"
            id="nombreEstampa"
            name="nombreEstampa"
            value={nombreEstampa}
            onChange={handleChange}
            required
            minLength="4"
            maxLength="17"
          />
        </div>
        <div>
          <label htmlFor="descripcionEstampa">Descripción:</label>
          <textarea
            id="descripcionEstampa"
            name="descripcionEstampa"
            value={descripcionEstampa}
            onChange={handleChange}
            required
            minLength="5"
            maxLength="50"
          />
        </div>
        <div>
          <label htmlFor="precioEstampa">Precio:</label>
          <input
            type="text"
            id="precioEstampa"
            name="precioEstampa"
            value={precioEstampa}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="stockEstampa">Stock:</label>
          <input
            type="number"
            id="stockEstampa"
            name="stockEstampa"
            value={stockEstampa}
            onChange={handleChange}
            required
            min="1"
          />
        </div>
        <div>
          <label htmlFor="imagen">Imagen:</label>
          <input
            type="file"
            id="imagen"
            name="imagen"
            accept="image/*"
            onChange={handleImageChange}
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {mensaje && <p className="success">{mensaje}</p>}
        <button type="submit">Subir Estampa</button>
      </form>
    </div>
  );
};

export default SubirEstampa;