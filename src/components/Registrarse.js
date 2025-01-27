// src/components/Registrarse.js
import React, { useState } from 'react';
import './Registrarse.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Iconos de Font Awesome para el ojo
//Servicios
import { Apiurl } from '../services/apirest';
//librerias back
import axios from 'axios';
//Este componente podrían pensar que es redundante pero no lo es.
//Ofrece otra interfaz para poderse registrar directamente.
//Además que incorpora una interfaz más amigable
//Y aquí también hay validaciones.

const Registrarse = () => {
  const [nombre, setNombre] = useState('');
  const [nickname, setNickname] = useState(''); // Estado para el nickname
  const [cedula, setCedula] = useState(''); // Estado para el nickname
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); // Segundo campo de contraseña
  const [numCelular, setNumCelular] = useState('');
  const [direccionResidencia, setDireccionResidencia] = useState('');
  const [rol, setRol] = useState('cliente');
  const [error, setError] = useState('');
  const [mensaje, setMensaje] = useState('');

  // Estados para controlar los caracteres restantes
  const [nombreMaxReached, setNombreMaxReached] = useState(false);
  const [cedulaMaxReached, setCedulaMaxReached] = useState(false);
  const [passwordMaxReached, setPasswordMaxReached] = useState(false);
  const [celularMaxReached, setCelularMaxReached] = useState(false);
  const [direccionMaxReached, setDireccionMaxReached] = useState(false);
  const [nicknameMaxReached, setNicknameMaxReached] = useState(false); // Estado para el límite del nickname

  // Estados para controlar la visibilidad de las contraseñas
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Función para alternar la visibilidad de la contraseña
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  // Función para alternar la visibilidad de la confirmación de la contraseña
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
  };
  const manejadorBoton = () =>{
    setError("");
    
    // Validación de campos vacíos
    if (!nombre || !cedula ||!nickname|| !password || !numCelular || !direccionResidencia) {
      setError('Por favor, completa todos los campos');
      return;
    }

    // Validación de que las contraseñas coincidan
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    // Validación de longitud de nombre
    if (nombre.length < 3 || nombre.length > 40) {
      setError('El nombre debe tener entre 3 y 40 caracteres');
      return;
    }
    //Validadación de longitud de DNI
    if (cedula.length < 8 || cedula.length > 150) {
      setError('El DNI debe tener entre 8 y 10 digitos');
      return;
    }

    // Validación de nickname
    if (nickname.length < 3 || nickname.length > 15) {
      setError('El nickname debe tener entre 3 y 15 caracteres');
      return;
    }

    // Validación de contraseña (números, letras, caracteres especiales)
    const passwordRegex = /^(?=.*[A-Z].*[A-Z])(?=.*\d.*\d)(?=.*[A-Za-z\d@$!%*?&.])(?=.*[!@$%^&*()_+=[\]{}|;:'",.<>/?\\/-]).{7,30}$/;
    if (!passwordRegex.test(password) || password.length > 30) {
      
      setError('La contraseña debe tener al menos 4 letras, 4 números,1 caracter especial, 2 mayúsculas y no puede exceder los 30 caracteres');
      return;
    }

    // Validación de celular (número entre 9 y 15 dígitos)
    if (numCelular.length !== 10) {
      setError('El número de celular debe tener 10 dígitos');
      return;
    }
    

    // Validación de longitud de la dirección
    if (direccionResidencia.length < 10 || direccionResidencia.length > 100) {
      setError('La dirección debe tener entre 10 y 100 caracteres');
      return;
    }
   // Construir el objeto de datos que se enviará en el POST
   const datosFormulario = {
    cedula: parseInt(cedula),           // Convertir la cedula a integer
    nombre: nombre,                     // El nombre tal como está
    username: nickname,                 // El nickname es el campo 'username' en la API
    contraseña: password,               // La contraseña tal como está
    direccion: direccionResidencia,     // Dirección tal como está
    telefono: parseInt(numCelular),     // El teléfono se convierte en integer
    idRol: rol === 'cliente' ? 1 : 2    // Asumimos que 'cliente' es 1 y 'artista' es 2, mapea según sea necesario
  };

  // URL de la API
  let url = Apiurl + "/usuarios/crearUsuario"; 

  // Hacer el POST con axios
  axios.post(url, datosFormulario)
  .then((response) => {
    console.log('Registro exitoso:', response.data);
    setMensaje('¡Registro exitoso!');
  })
  .catch((error) => {
    if (error.response) {
      // El servidor respondió con un código de error
      console.error('Error en el servidor:', error.response.data);
      setError(`Error: ${error.response.data.message || 'Usuario Ya Registrado'}`);
    } else if (error.request) {
      // No se recibió respuesta del servidor
      console.error('Sin respuesta del servidor:', error.request);
      setError('No se pudo conectar con el servidor.');
    } else {
      // Otro tipo de error
      console.error('Error al enviar la solicitud:', error.message);
      setError('Error inesperado al registrar usuario.');
    }
  });


  };

  // Manejo de los caracteres restantes
  const handleNombreChange = (e) => {
    const value = e.target.value;
    if (value.length <= 40) {
      setNombre(value);
      setNombreMaxReached(value.length === 40);
    }
  };

  // Manejo de los caracteres restantes para el nickname
  const handleNicknameChange = (e) => {
    const value = e.target.value;
    if (value.length <= 15) {
      setNickname(value);
      setNicknameMaxReached(value.length === 15);
    }
  };

  // Manejo de los caracteres restantes
  const handleCedulaChange = (e) => {
    const value = e.target.value;
    if (value.length <= 20) {
      setCedula(value);
      setCedulaMaxReached(value.length === 20);
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    if (value.length <= 30) {
      setPassword(value);
      setPasswordMaxReached(value.length === 30);
    }
  };

  const handleCelularChange = (e) => {
    const value = e.target.value;
    if (value.length <= 15) {
      setNumCelular(value);
      setCelularMaxReached(value.length === 15);
    }
  };

  const handleDireccionChange = (e) => {
    const value = e.target.value;
    if (value.length <= 100) {
      setDireccionResidencia(value);
      setDireccionMaxReached(value.length === 100);
    }
  };
  
  return (
    <div className="registro-container">
      <h1>Registrarse</h1>
      <form onSubmit={handleRegisterSubmit}>
        <div>
          <label>Nombre</label>
          <input
            type="text"
            placeholder="Nombre"
            value={nombre}
            onChange={handleNombreChange}
            minLength="3" // Requiere un mínimo de 3 caracteres
            maxLength="40" // Limita el máximo a 20 caracteres
            required
          />
          {nombreMaxReached && <p className="limit-warning">Se ha alcanzado el límite de caracteres (40).</p>}
        </div>

        <div>
          <label>Cedula</label>
          <input
            type="number" // Cambié a texto para que pueda contener el formato adecuado
            placeholder="Cedula (8-10 dígitos)"
            value={cedula}
            min={0} 
            onChange={handleCedulaChange}
            onKeyDown={(e) => {
              if (e.key === "ArrowUp" || e.key === "ArrowDown") {
                e.preventDefault(); // Evita subir/bajar el número con las flechas
              }
            }}
            onWheel={(e) => e.target.blur()}
            minLength="8" // Requiere un mínimo de 8 dígitos
            maxLength="10" // Limita el máximo a 10 dígitos
            required
          />
          {cedulaMaxReached && <p className="limit-warning">Se ha alcanzado el límite de caracteres (10).</p>}
        </div>

        <div>
          <label>Nickname</label>
          <input
            type="text"
            placeholder="Nickname (3-15 caracteres)"
            value={nickname}
            onChange={handleNicknameChange}
            minLength="3" // Requiere un mínimo de 3 caracteres
            maxLength="15" // Limita el máximo a 15 caracteres
            required
          />
          {nicknameMaxReached && <p className="limit-warning">Se ha alcanzado el límite de caracteres (15).</p>}
        </div>

        <div>
          <label>Contraseña</label>
          <div className="password-container">
          <input
            type={showPassword ? "text" : "password"} // Alterna entre texto y contraseña
            placeholder="Contraseña"
            value={password}
            onChange={handlePasswordChange}
            minLength="7" // Requiere un mínimo de 7 caracteres
            maxLength="30" // Limita el máximo a 30 caracteres
            required
          />
          <button type="button" onClick={togglePasswordVisibility} className="eye-icon">
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
            </div>
            {passwordMaxReached && <p className="limit-warning">Se ha alcanzado el límite de caracteres (30).</p>}
        </div>

        <div>
          <label>Confirmar Contraseña</label>
          <div className="password-container">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Confirmar Contraseña"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              maxLength="30"
              required
            />
            <button type="button" onClick={toggleConfirmPasswordVisibility} className="eye-icon">
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        <div>
          <label>Celular</label>
          <input
            type="text" // Cambié a texto para que pueda contener el formato adecuado
            placeholder="Celular (9-15 dígitos)"
            value={numCelular}
            onChange={handleCelularChange}
            minLength="9" // Requiere un mínimo de 9 dígitos
            maxLength="15" // Limita el máximo a 15 dígitos
            required
          />
          {celularMaxReached && <p className="limit-warning">Se ha alcanzado el límite de caracteres (15).</p>}
        </div>

        <div>
          <label>Dirección de Residencia</label>
          <input
            type="text"
            placeholder="Dirección de Residencia"
            value={direccionResidencia}
            onChange={handleDireccionChange}
            minLength="10" // Requiere un mínimo de 10 caracteres
            maxLength="100" // Limita el máximo a 100 caracteres
            required
          />
          {direccionMaxReached && <p className="limit-warning">Se ha alcanzado el límite de caracteres (100).</p>}
        </div>

        <div>
          <label>
            Rol:
            <select value={rol} onChange={(e) => setRol(e.target.value)}>
              <option value="cliente">Cliente</option>
              <option value="artista">Artista</option>
            </select>
          </label>
        </div>

        {error && <p className="error">{error}</p>}
        {mensaje && <p className="success">{mensaje}</p>}

        <button type="submit" onClick={manejadorBoton}>Registrarse</button>
        
      </form>
    </div>
  );
};

export default Registrarse;

