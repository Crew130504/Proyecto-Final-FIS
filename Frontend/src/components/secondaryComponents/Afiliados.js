import React from 'react';
import './Afiliados.css';

//Todos los componentes dentro de secondarycomponents pertenecen al footer, no tengo que explicarlos.

//Si quieren en el componente EquipoDev.js pueden poner sus nombres y un mensaje.

function Afiliados() {
  return (
    <div className="afiliados">
      <h1>Programa de Afiliados</h1>
      <div className="contenido">
        <div className="texto">
          <h2>¿Qué es el programa de afiliados?</h2>
          <p>
            Nuestro programa de afiliados permite a cualquier persona ganar dinero refiriendo nuestros productos. Al unirte a nuestro programa, podrás obtener comisiones por cada venta realizada a través de tus recomendaciones. Es una forma fácil y efectiva de generar ingresos mientras ayudas a otros a descubrir nuestra tienda de camisetas y estampas.
          </p>
        </div>

        <div className="beneficios">
          <h2>Beneficios de ser afiliado</h2>
          <ul>
            <li>Comisión por cada venta generada.</li>
            <li>Acceso a herramientas promocionales.</li>
            <li>Pagos mensuales directos a tu cuenta.</li>
            <li>Apoyo continuo por parte de nuestro equipo.</li>
          </ul>
        </div>
      </div>

      <div className="como-unirse">
        <h2>¿Cómo unirse?</h2>
        <p>
          Unirte a nuestro programa de afiliados es muy sencillo. Solo tienes que registrarte a través de nuestro formulario en línea, obtener tu enlace personalizado y comenzar a compartirlo en tus redes sociales, blogs o cualquier otro medio. ¡Cuantas más ventas generes, más dinero ganarás!
        </p>
      </div>

      <div className="contacto">
        <h3>Contacto</h3>
        <p>Si tienes alguna pregunta, no dudes en contactarnos:</p>
        <p>Email: afiliados@tiendacamisetas.com</p>
      </div>
    </div>
  );
}

export default Afiliados;
