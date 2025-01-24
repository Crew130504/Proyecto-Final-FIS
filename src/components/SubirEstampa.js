// src\components\SubirEstampa.js
import React, { useState } from 'react';
import './SubirEstampa.css';

//Como lo dice el nombre,  permite subir las estampas para el usuario artista.
//También tiene validaciones.

const SubirEstampa = () => {
  // Estado para el título, descripción y archivo de la imagen
  const [titulo, setTitulo] = useState('');
  const [precio, setPrecio] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [imagen, setImagen] = useState(null);
  const [error, setError] = useState('');

  // Función para manejar el cambio en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'titulo') {
      setTitulo(value.slice(0, 17)); // Limita el título a 17 caracteres
    }
    if (name === 'precio') {
      // Elimina caracteres no numéricos y luego formatea el precio con comas
      const numericValue = value.replace(/[^0-9]/g, ''); // Elimina cualquier cosa que no sea un número
      if (numericValue) {
        setPrecio(formatPrice(numericValue));
      } else {
        setPrecio('');
      }
    }
    if (name === 'descripcion') {
      setDescripcion(value.slice(0, 50)); // Limita la descripción a 50 caracteres
    }
  };

 // Función para manejar el cambio de la imagen
const handleImageChange = (e) => {
    const file = e.target.files[0];
  
    // Validación de tipo de archivo y tamaño
    if (file) {
      const validFormats = ['image/jpeg', 'image/png', 'image/gif']; // Tipos válidos
      const maxSize = 5 * 1024 * 1024; // 5MB
  
      // Validar el nombre del archivo (máximo 25 caracteres)
      if (file.name.length > 25) {
        setError('El nombre de la imagen debe tener menos de 25 caracteres.');
        setImagen(null);
        return; // No continuar si el nombre es demasiado largo
      }
  
      if (!validFormats.includes(file.type)) {
        setError('Formato de imagen no válido. Solo se permiten JPEG, PNG o GIF.');
        setImagen(null);
      } else if (file.size > maxSize) {
        setError('La imagen excede el tamaño máximo de 5MB.');
        setImagen(null);
      } else {
        setError('');
        setImagen(file);
      }
    }
  };
  

  // Función para formatear el precio con comas (por ejemplo: 10000 -> 10,000)
  const formatPrice = (value) => {
    return new Intl.NumberFormat().format(value);
  };

  // Función para manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar que todos los campos estén completos
    if (!titulo || !descripcion || !imagen || !precio) {
      setError('Por favor, completa todos los campos.');
      return;
    }

    // Validar el rango del precio
    const priceValue = parseInt(precio.replace(/,/g, '')); // Elimina comas para validación
    if (priceValue < 10000 || priceValue > 500000) {
      setError('El precio debe estar entre 10,000 y 500,000.');
      return;
    }

    // Aquí es donde enviarías la información al backend
    const formData = new FormData();
    formData.append('titulo', titulo);
    formData.append('precio', precio);
    formData.append('descripcion', descripcion);
    formData.append('imagen', imagen);

    // Ejemplo de envío con fetch (ajustar según tu backend)
    fetch('/api/subir-estampa', {
      method: 'POST',
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          alert('¡Estampa subida con éxito!');
        } else {
          alert('Error al subir la estampa.');
        }
      })
      .catch(error => {
        alert('Error de conexión: ' + error);
      });
  };

  return (
    <div>
      <h1>Subir Estampa</h1>
      <form className="form-container" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="titulo">Título:</label>
          <input
            type="text"
            id="titulo"
            name="titulo"
            value={titulo}
            onChange={handleChange}
            required
            minLength="4"
            maxLength="17"
            style={{ textAlign: 'center' }} // Estilo inline para centrar el texto
          />
        </div>
        <div>
          <label htmlFor="precio">Precio:</label>
          <input
            type="text" // Cambio aquí de "number" a "text"
            id="precio"
            name="precio"
            value={precio}
            onChange={handleChange}
            required
            minLength="5"
            maxLength="9" // Para permitir hasta 500,000
          />
        </div>
        <div>
          <label htmlFor="descripcion">Descripción:</label>
          <textarea
            id="descripcion"
            name="descripcion"
            value={descripcion}
            onChange={handleChange}
            required
            minLength="5"
            maxLength="50"
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
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
        <button type="submit">Subir Estampa</button>
      </form>
    </div>
  );
};

export default SubirEstampa;
