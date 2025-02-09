import React, { useState } from 'react';
import './PQRS.css';

function PQRS() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    tipo: 'peticion',
    mensaje: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Formulario enviado. ¡Gracias por tu mensaje!');
    // Aquí podrías agregar la lógica para enviar los datos a un servidor.
  };

  return (
    <div className="pqrs">
      <h1>Formulario PQRS</h1>
      <p>Queremos saber tu opinión. Por favor, completa el siguiente formulario para enviarnos tus peticiones, quejas, reclamos o sugerencias.</p>

      <form className="pqrs-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nombre">Nombre:</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            placeholder="Tu nombre completo"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Correo Electrónico:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Tu correo electrónico"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="tipo">Tipo de consulta:</label>
          <select
            id="tipo"
            name="tipo"
            value={formData.tipo}
            onChange={handleChange}
          >
            <option value="peticion">Petición</option>
            <option value="queja">Queja</option>
            <option value="reclamo">Reclamo</option>
            <option value="sugerencia">Sugerencia</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="mensaje">Mensaje:</label>
          <textarea
            id="mensaje"
            name="mensaje"
            value={formData.mensaje}
            onChange={handleChange}
            placeholder="Escribe tu mensaje aquí"
            required
          />
        </div>

        <button type="submit" className="btn-submit">Enviar</button>
      </form>
    </div>
  );
}

export default PQRS;
