// src/components/Header.js
import React from 'react';
import './Header.css';
import LogoImg from '../Imagenes/Logo.png';
import AvatarAdminImg from '../Imagenes/Avatar_Admin_img.png';
import AvatarUsuarioImg from '../Imagenes/Avatar_Usuario_img.png';
import AvatarArtistaImg from '../Imagenes/Avatar_Artista_img.png';
import { useAuth } from './Autenticacion'; // Suponiendo que tienes un hook para autenticación
import { useNavigate } from 'react-router-dom'; // Importar useNavigate
//El Header es dinámico, de acuerdo al usuario muestra una opción u otra.
//Por ejemplo, al artista no le muestra el Catalogo.
//Por esa razón esta esa importación de autenticación.
//El navigate es para que redirija a los link ya esta.

function Header() {
  const { isAuthenticated, userRole, logout } = useAuth(); // Obtén la autenticación
  const navigate = useNavigate(); // Navegación de React Router

  // Manejo de cierre de sesión
  const handleLogout = () => {
    logout();
    navigate('/'); // Redirigir al inicio después de hacer logout
  };

  // Seleccionar la imagen del avatar en función del rol del usuario
  const getAvatarImage = () => {
    if (userRole === 'admin') return AvatarAdminImg;
    if (userRole === 'cliente') return AvatarUsuarioImg;
    if (userRole === 'artista') return AvatarArtistaImg;
    return null;
  };

  return (
    <header className="Header">
      <div className="Header-logo">
        <img src={LogoImg} alt="Logo" className="logo-img" />
      </div>

      <nav className="Header-nav">
        <ul>
          <li><a href="/">Inicio</a></li>

          {/* Mostrar Catálogo solo si el usuario no es admin */}
          {userRole !== 'admin' && (
            <>
              <li><a href="/CatalogoEstampas">Catálogo Estampas</a></li>
            </>
          )}

          {/* Opciones para usuarios no autenticados */}
          {!isAuthenticated && (
            <>
              <li><a href="/Iniciar-sesion">Sign in/ Login</a></li>              
            </>
          )}

          <li><a href="/Contacto">Contáctanos</a></li>

          {/* Opciones para usuarios autenticados */}
          {isAuthenticated && (
            <li className="avatar-container">
              <img
                src={getAvatarImage()}
                alt="Avatar del usuario"
                className="user-avatar"
              />
              <div className="dropdown-menu">
                <ul>
                  <li>
                    <a href={`/PerfilUsuario${userRole.charAt(0).toUpperCase() + userRole.slice(1)}`}>
                      Perfil
                    </a>
                  </li>
                  {userRole === 'cliente' && (
                    <>
                      <li><a href="/Compras">Compras</a></li>
                      <li><a href="/Carrito">Su carrito</a></li>
                    </>
                  )}
                  {userRole === 'artista' && (
                    <>
                      <li><a href="/SubirEstampa">Subir Estampas</a></li>
                      <li><a href="/EstampasPublicadas">Estampas Publicadas</a></li>
                    </>
                  )}
                  {userRole === 'admin' && (
                    <li><a href="/Estadisticas">Estadísticas</a></li>
                  )}
                  <li><button onClick={handleLogout}>Log Out</button></li>
                </ul>
              </div>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
