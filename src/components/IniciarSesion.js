// src\components\IniciarSesion.js
import React, { useState } from 'react';
import { useAuth } from './Autenticacion';
import './IniciarSesion.css';
import axios from 'axios';
import { Apiurl } from '../services/apirest';

//Este es el componente más extenso, de eso estoy seguro
//El inicio de sesión tiene su propio test, es necesario que lo tenga.
//Este componente tiene una organización dinámica entre el formulario de login y signup
//Aquí hay validaciones y se muestran errores, sin embargo esto es solo un filtro en el Frontend, el Backend también las debe tener

const IniciarSesion = () => {
  const [cedula, setCedula] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [toggleForm, setToggleForm] = useState(false);
  const [rol, setRol] = useState("");
  const [nombre, setNombre] = useState('');
  const [nickname, setNickname] = useState('');
  const [numCelular, setNumCelular] = useState('');
  const [direccionResidencia, setDireccionResidencia] = useState('');
  const { login } = useAuth();

  // Expresiones regulares para validaciones
  const nombreRegex = /^[A-Za-záéíóúÁÉÍÓÚüÜñÑ\s]{3,20}$/; 
  const nicknameRegex = /^[A-Za-z0-9]{3,15}$/; 
  const passwordRegex = /^(?=.*[A-Z].*[A-Z])(?=.*\d.*\d)(?=.*[A-Za-z\d@$!%*?&.])[A-Za-z\d@$!%*?&.]{7,30}$/; 

  // Control de límites de caracteres
  const [nombreLimitReached, setNombreLimitReached] = useState(false);
  const [nicknameLimitReached, setNicknameLimitReached] = useState(false);
  const [passwordLimitReached, setPasswordLimitReached] = useState(false);
  const [cedulaLimitReached, setCedulaLimitReached] = useState(false);
  

  const handleSignInSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Limpia el mensaje de error
    try {
      await login(nickname, password, rol);
    } catch (error) {
      // Maneja el error y define el mensaje al usuario
      if (error.message.includes("HTTP Error: 500")) {
        setError("Usuario NO encontrado, Registrese");
      } else {
        setError(error.message || "Ocurrió un error inesperado. Inténtelo de nuevo.");
      }
    }
  };
  
  

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (!nombre || !nombreRegex.test(nombre)) {
      setError('Nombre inválido. Debe tener entre 3 y 20 caracteres y solo contener letras y espacios, sin caracteres especiales.');
      return;
    }
    if (!nickname || !nicknameRegex.test(nickname)) {
      setError('Nickname inválido. Debe tener entre 3 y 15 caracteres y solo contener letras y números, sin caracteres especiales.');
      return;
    }
    if (!password || !passwordRegex.test(password)) {
      setError('Contraseña inválida. Debe contener al menos 7 caracteres, 4 números, 2 mayúsculas y caracteres especiales.');
      return;
    }
    if (password !== confirmPassword) {  // Validación de las contraseñas coincidentes
      setError('Las contraseñas no coinciden.');
      return;
    }
    if (!cedula || cedula.length<8 || cedula.length>10) {
      setError('Cedula inválida. Debe tener entre 8 y 10 caracteres.');
      return;
    }
    if (!rol) {
      setError('Debe seleccionar un tipo de usuario.');
      return;
    }
    if (!numCelular || numCelular.length < 10) {
      setError('El número de celular es inválido.');
      return;
    }
    if (!direccionResidencia) {
      setError('La dirección de residencia no puede estar vacía.');
      return;
    }

    login(rol);
  };

  const handleToggle = () => {
    setToggleForm((prev) => !prev);
    setError(''); // Limpiar errores
    setCedula('');
    setPassword('');
    setConfirmPassword('');
    setRol('cliente');
    setNombre('');
    setNickname('');
    setNumCelular('');
    setDireccionResidencia('');
  };

  const handleInputChange = (setter, setLimitReached, maxLength) => (e) => {
    const value = e.target.value;
    setter(value);
    setLimitReached(value.length >= maxLength);
  };

  return (
    <div className={`container ${toggleForm ? 'toggle' : ''}`}>
      <div className="container-form">
        <form className="log-in" data-testid="login-form" onSubmit={handleSignInSubmit}>
          <h2>Iniciar Sesión</h2>
          <span><strong>Use su Usuario y contraseña</strong></span>
          <div className="container-input">
            <ion-icon name="mail-outline" aria-hidden="true"></ion-icon>
            <input
              type="text"
              placeholder="Usuario (Iniciar sesión)"
              value={nickname}
              onChange={handleInputChange(setNickname, setNicknameLimitReached, 20)}
              maxLength={20}
              required
              id="nickname-log-in"
              aria-label="Nickname"
            />
            {cedulaLimitReached && <p className="limit-message">Se ha alcanzado el límite de caracteres</p>}
          </div>
          <div className="container-input">
            <ion-icon name="lock-closed-outline" aria-hidden="true"></ion-icon>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={handleInputChange(setPassword, setPasswordLimitReached, 30)}
              maxLength={30}
              required
              aria-label="Contraseña"
              data-testid="password-input-login"
            />
            {passwordLimitReached && <p className="limit-message">Se ha alcanzado el límite de caracteres</p>}
          </div>
          <div className="container-input">
            <label>
              <select
                value={rol}
                onChange={(e) => setRol(e.target.value)}
                data-testid="role-select-login"
                aria-label="Rol de usuario"
              >
                <option value="" disabled hidden>
                  Selecciona tu rol
                </option>
                <option value="cliente">Cliente</option>
                <option value="artista">Artista</option>
                <option value="admin">Admin</option>
              </select>
            </label>
          </div>
          {error && <p data-testid="login-error-message" className="error">{error}</p>}
          <button type="submit" className="button" data-testid="login-button">Iniciar Sesión</button>
        </form>
      </div>
  
      <div className="container-form">
        <form className="sign-up" onSubmit={handleRegisterSubmit}>
          <h2>Registrarse</h2>
          <span><strong>Use su cedula para registrarse</strong></span>
          <div className="container-input">
            <ion-icon name="person-outline" aria-hidden="true"></ion-icon>
            <input
              type="text"
              placeholder="Nombre"
              value={nombre}
              onChange={handleInputChange(setNombre, setNombreLimitReached, 40)}
              maxLength={40}
              required
              aria-label="Nombre"
              data-testid="name-input-signup"
            />
            {nombreLimitReached && <p className="limit-message">Se ha alcanzado el límite de caracteres</p>}
          </div>
          <div className="container-input">
            <ion-icon name="person-outline" aria-hidden="true"></ion-icon>
            <input
              type="text"
              placeholder="Nickname"
              value={nickname}
              onChange={handleInputChange(setNickname, setNicknameLimitReached, 15)}
              maxLength={15}
              required
              aria-label="Nickname"
              data-testid="nickname-input-signup"
            />
            {nicknameLimitReached && <p className="limit-message">Se ha alcanzado el límite de caracteres</p>}
          </div>
          <div className="container-input">
            <ion-icon name="mail-outline" aria-hidden="true"></ion-icon>
            <input
              type="text"
              placeholder="Cedula (Registrarse)"
              value={cedula}
              onChange={handleInputChange(setCedula, setCedulaLimitReached, 35)}
              maxLength={35}
              required
              aria-label="Cedula"
            />
            {cedulaLimitReached && <p className="limit-message">Se ha alcanzado el límite de caracteres</p>}
          </div>
          <div className="container-input">
            <ion-icon name="lock-closed-outline" aria-hidden="true"></ion-icon>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={handleInputChange(setPassword, setPasswordLimitReached, 30)}
              maxLength={30}
              required
              aria-label="Contraseña"
              data-testid="password-input-signup"
            />
            {passwordLimitReached && <p className="limit-message">Se ha alcanzado el límite de caracteres</p>}
          </div>
          <div className="container-input">
            <ion-icon name="lock-closed-outline" aria-hidden="true"></ion-icon>
            <input
              type="password"
              placeholder="Confirmar Contraseña"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              maxLength={30}
              required
              aria-label="Confirmar contraseña"
              data-testid="confirm-password-input-signup"
            />
          </div>
          <div className="container-input">
            <ion-icon name="call-outline" aria-hidden="true"></ion-icon>
            <input
              type="tel"
              placeholder="Celular"
              value={numCelular}
              onChange={(e) => setNumCelular(e.target.value)}
              required
              minLength={9}
              maxLength={15}
              pattern="\d*"
              title="Por favor ingrese solo números"
              aria-label="Número de celular"
              data-testid="phone-input-signup"
            />
          </div>
          <div className="container-input">
            <ion-icon name="location-outline" aria-hidden="true"></ion-icon>
            <input
              type="text"
              placeholder="Dirección de Residencia"
              value={direccionResidencia}
              onChange={(e) => setDireccionResidencia(e.target.value)}
              required
              minLength={10}
              maxLength={100}
              aria-label="Dirección de residencia"
              data-testid="address-input-signup"
            />
          </div>
          <label>
            Rol:
            <select
              value={rol}
              onChange={(e) => setRol(e.target.value)}
              data-testid="role-select-signup"
              aria-label="Rol de usuario"
            >
              <option value="cliente">Cliente</option>
              <option value="artista">Artista</option>
            </select>
          </label>
          {error && <p data-testid="sign-error-message" className="error">{error}</p>}
          <button type="submit" className="button" data-testid="register-button">Registrarse</button>
        </form>
      </div>
  
      <div className="container-welcome">
        <div className="welcome-sign-up welcome">
          <h3>Bienvenido</h3>
          <span className="mensaje-registro">Si aún no tiene una cuenta, regístrese para acceder a todas las funciones del sitio</span>
          <button className="button" data-testid="registro-button" type="button" onClick={() => { 
            handleToggle();
            setCedula('');  // Limpia el campo de cedula
            setPassword('');  // Limpia el campo de contraseña
            setRol('cliente');  // Limpia el campo del rol
        }}>Regístrese Aquí
        </button>
        </div>
        <div className="welcome-sign-in welcome">
          <h3>Bienvenido</h3>
          <span className="mensaje-login">Si ya tiene una cuenta, inicie sesión para acceder a todas las funciones del sitio</span>
          <button className="button" data-testid="inicio-button" type="button" onClick={() => {
              handleToggle();
              setCedula('');  // Limpia el campo de cedula
              setPassword('');  // Limpia el campo de contraseña
              setRol('cliente');  // Limpia el campo del rol
          }}>Inicie Sesión Aquí
          </button>
        </div>
      </div>
    </div>
  );    
};

export default IniciarSesion;
