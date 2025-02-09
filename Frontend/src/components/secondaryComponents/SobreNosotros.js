import React from 'react';
import './SobreNosotros.css';
import logoTienda from '../../Imagenes/imagen-tienda.png';
import equipoTienda from '../../Imagenes/Imagen-Equipo.png';

function SobreNosotros() {
  return (
    <div className="sobre-nosotros">
      <h1>Sobre Nosotros</h1>
      <p>Bienvenidos a nuestra tienda internacional de camisetas y estampas. Con presencia global, ofrecemos productos únicos y personalizados para todos los gustos.</p>

      <div className="historia">
        <h2>Nuestra Historia</h2>
        <p>Fundada en 2015, nuestra tienda nació con el objetivo de ofrecer camisetas y estampas de alta calidad con diseños exclusivos. Hoy en día, tenemos presencia en múltiples países, llevando nuestro amor por el diseño y la moda a todas partes del mundo.</p>
      </div>

      <div className="mision">
        <h2>Nuestra Misión</h2>
        <p>Nos apasiona crear productos que no solo te hagan sentir cómodo, sino que también te permitan expresar tu estilo único. Trabajamos con los mejores materiales para asegurarnos de que cada camiseta y estampa sea de la más alta calidad.</p>
      </div>

      <div className="vision">
        <h2>Nuestra Visión</h2>
        <p>Queremos ser la tienda líder en camisetas y estampas a nivel mundial, ofreciendo productos personalizados y de diseño exclusivo para todos aquellos que buscan un estilo único y diferente.</p>
      </div>

      <div className="equipo">
        <h2>Conoce a Nuestro Equipo</h2>
        <p>Somos un equipo de diseñadores, creativos y apasionados de la moda que trabajamos arduamente para ofrecerte los mejores productos. ¡Nos encanta lo que hacemos!</p>
        <img src={equipoTienda} alt="Equipo de Tienda" className="equipo-imagen" />
      </div>

      <div className="contacto">
        <h2>Contacto</h2>
        <p>Si tienes alguna pregunta o necesitas más información sobre nuestros productos, no dudes en contactarnos.</p>
        <p>Email: contacto@tiendacamisetas.com</p>
        <p>Teléfono: +1 800-123-4567</p>
      </div>

      <div className="logo-tienda">
        <img src={logoTienda} alt="Logo de la tienda" className="logo-imagen" />
      </div>
    </div>
  );
}

export default SobreNosotros;
