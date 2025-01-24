// src/components/Footer.js
import React from 'react';
import './Footer.css';
import logo from '../Imagenes/Logo_2.png';
import { SocialIcon } from 'react-social-icons'; //Si les da error esto revisen el archivo de texto con dependencias para que las instalen
//Este es el pie de página, aquí no hay mucho que hablar.

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-logo">
        <img src={logo} alt="Logo" />
      </div>
      <div className="footer-links">
        <div className="footer-column">
          <h4>Más información</h4>
          <ul>
            <li><a href="/SobreNosotros">Sobre nosotros</a></li>
            <li><a href="/EquipoDev">Equipo dev</a></li>
            <li><a href="/Vision">Visión y trayecto</a></li>
            <li><a href="/Afiliados">Afiliados</a></li>
            <li><a href="/Opiniones">Opiniones</a></li>
            <li><a href="/Contacto">Contacto</a></li>
            <li><a href="/PQRS">PQRS</a></li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>Explora</h4>
          <ul>
            <li><a href="/AvisoLegal">Aviso legal</a></li>
            <li><a href="/PoliticaUso">Términos de uso</a></li>
            <li><a href="/PoliticaPrivacidad">Política de privacidad</a></li>
            <li><a href="/PoliticaCookies">Política de cookies</a></li>
            <li><a href="/NuestrasSucursales">Nuestras sucursales</a></li>
            <li><a href="/SoporteTecnico">Soporte técnico</a></li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>Recursos</h4>
          <ul>
          <li><a href="https://youtu.be/dQw4w9WgXcQ" target="_blank" rel="noopener noreferrer">Blog</a></li>
            <li><a href="/PaletaColores">Colores</a></li>
            <li><a href="/LibreriaRecursos">Librería de recursos</a></li>
          </ul>
        </div>
      </div>
      <div className="social-icons">
        <SocialIcon url="https://www.instagram.com" target="_blank" style={{ height: 35, width: 35 }} />
        <SocialIcon url="https://www.youtube.com" target="_blank" style={{ height: 35, width: 35 }} />
        <SocialIcon url="https://www.linkedin.com" target="_blank" style={{ height: 35, width: 35 }} />
      </div>
    </footer>
  );
};

export default Footer;

