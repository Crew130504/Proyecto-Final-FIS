// src/components/Registrarse.js
import React, { useState } from 'react';
import './Registrarse.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; 
import { useNavigate } from 'react-router-dom'; 
import { Apiurl } from '../services/apirest';
import axios from 'axios';

const Registrarse = () => {
  // Hooks de useState para manejar los valores de los campos del formulario
  const [nombre, setNombre] = useState('');
  const [nickname, setNickname] = useState(''); 
  const [cedula, setCedula] = useState(''); 
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); 
  const [numCelular, setNumCelular] = useState('');
  const [direccionResidencia, setDireccionResidencia] = useState('');
  const [rol, setRol] = useState('cliente');
  const [error, setError] = useState('');
  const [mensaje, setMensaje] = useState('');

  // Estados para manejar la validación de caracteres máximos en cada campo
  const [nombreMaxReached, setNombreMaxReached] = useState(false);
  const [cedulaMaxReached, setCedulaMaxReached] = useState(false);
  const [passwordMaxReached, setPasswordMaxReached] = useState(false);
  const [celularMaxReached, setCelularMaxReached] = useState(false);
  const [direccionMaxReached, setDireccionMaxReached] = useState(false);
  const [nicknameMaxReached, setNicknameMaxReached] = useState(false);
  const navigate = useNavigate();

  // Estados para alternar la visibilidad de los campos de contraseña
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Alterna la visibilidad del campo de contraseña principal
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  // Alterna la visibilidad del campo de confirmación de contraseña
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);
  // Maneja el evento de envío del formulario
  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    navigate('/Iniciar-sesion');
  };
  // Maneja la lógica de validación y envío de datos al backend
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
   // Objeto que contiene los datos del formulario para ser enviado en la solicitud
   const datosFormulario = {
    cedula: parseInt(cedula),           
    nombre: nombre,                     
    username: nickname,                 
    contraseña: password,               
    direccion: direccionResidencia,     
    telefono: parseInt(numCelular),     
    idRol: rol === 'cliente' ? 1 : 2    
  };

  // URL del endpoint de la API para registrar usuarios
  let url = Apiurl + "/usuarios/crearUsuario"; 

  axios.post(url, datosFormulario)
  .then((response) => {
    setMensaje('¡Registro exitoso!');
  })
  .catch((error) => {
    if (error.response) {
      // El servidor respondió con un código de error
      setError(`Error: ${error.response.data.message || 'Usuario Ya Registrado'}`);
    } else if (error.request) {
      // No se recibió respuesta del servidor
      setError('No se pudo conectar con el servidor.');
    } else {
      // Otro tipo de error
      setError('Error inesperado al registrar usuario.');
    }
  });


  };

  // Manejo de los caracteres restantes para el Nombre
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

  // Manejo de los caracteres restantes para la cedula
  const handleCedulaChange = (e) => {
    const value = e.target.value;
    if (value.length <= 20) {
      setCedula(value);
      setCedulaMaxReached(value.length === 20);
    }
  };
  // Manejo de los caracteres restantes para la password
  const handlePasswordChange = (e) => {
    const value = e.target.value;
    if (value.length <= 30) {
      setPassword(value);
      setPasswordMaxReached(value.length === 30);
    }
  };
  // Manejo de los caracteres restantes para el Celular
  const handleCelularChange = (e) => {
    const value = e.target.value;
    if (value.length <= 15) {
      setNumCelular(value);
      setCelularMaxReached(value.length === 15);
    }
  };
  // Manejo de los caracteres restantes para la Direccion
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

