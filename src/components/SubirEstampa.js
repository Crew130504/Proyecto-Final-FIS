import React, { useState } from 'react';
import './SubirEstampa.css';

const SubirEstampa = () => {
  // Estados para los inputs
  const [nombreEstampa, setNombreEstampa] = useState('');
  const [descripcionEstampa, setDescripcionEstampa] = useState('');
  const [precioEstampa, setPrecioEstampa] = useState('');
  const [stockEstampa, setStockEstampa] = useState('');
  const [imagenEstampa, setImagenEstampa] = useState(null);
  const [cedulaEstampa, setCedulaEstampa] = useState('');
  const [error, setError] = useState('');

  // Manejo dinámico de cambios en los inputs
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
      case 'cedulaEstampa':
        setCedulaEstampa(value.slice(0, 15)); // Máximo 15 caracteres
        break;
      default:
        break;
    }
  };

  // Manejo del cambio de imagen
  const handleImageChange = (e) => {
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

  // Formatear precio con comas
  const formatPrice = (value) => {
    return new Intl.NumberFormat().format(value);
  };

  // Manejo del envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nombreEstampa || !descripcionEstampa || !precioEstampa || !stockEstampa || !imagenEstampa || !cedulaEstampa) {
      setError('Por favor, completa todos los campos.');
      return;
    }

    const priceValue = parseInt(precioEstampa.replace(/,/g, ''), 10);
    if (priceValue < 10000 || priceValue > 500000) {
      setError('El precio debe estar entre 10,000 y 500,000.');
      return;
    }

    const formData = new FormData();
    formData.append('nombre', nombreEstampa);
    formData.append('descripcion', descripcionEstampa);
    formData.append('precio', priceValue);
    formData.append('stock', stockEstampa);
    formData.append('imagen', imagenEstampa);
    formData.append('cedula', cedulaEstampa);

    fetch('/api/subir-estampa', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert('¡Estampa subida con éxito!');
        } else {
          setError('Error al subir la estampa.');
        }
      })
      .catch((error) => {
        setError('Error de conexión: ' + error.message);
      });
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
          <label htmlFor="cedulaEstampa">Cédula:</label>
          <input
            type="number"
            id="cedulaEstampa"
            name="cedulaEstampa"
            value={cedulaEstampa}
            onChange={handleChange}
            required
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
        <button type="submit">Subir Estampa</button>
      </form>
    </div>
  );
};

export default SubirEstampa;