import React from 'react';
import './Vision.css';
import visionImg from '../../Imagenes/vision.png'; // Asegúrate de tener la imagen en el directorio correcto

function Vision() {
  return (
    <div className="vision">
      <h1>Nuestra Visión</h1>
      <div className="contenido">
        <div className="texto">
          <h2>Visión</h2>
          <p>
            En nuestra tienda de camisetas y estampas, nos dedicamos a ofrecer productos de calidad que reflejan el estilo único de cada persona. Nuestra visión es ser la tienda líder en personalización de prendas a nivel internacional, ofreciendo una experiencia de compra innovadora y accesible para todos. Creemos en la creatividad sin límites y en hacer que nuestros clientes se sientan especiales con cada diseño.
          </p>
        </div>
        <div className="imagen">
          <img src={visionImg} alt="Visión de la tienda" />
        </div>
      </div>

      <div className="trayecto">
        <h2>Nuestro Trayecto</h2>
        <p>
          Desde nuestra humilde fundación en 2015, hemos crecido gracias a la pasión por la moda y la personalización. Empezamos ofreciendo solo un par de diseños básicos y hoy contamos con miles de opciones para que nuestros clientes puedan personalizar. Hemos establecido alianzas con artistas de todo el mundo y seguimos innovando para brindar productos que hablen por sí mismos.
        </p>
        <p>
          A medida que continuamos creciendo, nuestro objetivo es seguir acercando el arte de la personalización a todos los rincones del mundo, manteniendo un compromiso firme con la calidad y la satisfacción de nuestros clientes.
        </p>
      </div>
    </div>
  );
}

export default Vision;
