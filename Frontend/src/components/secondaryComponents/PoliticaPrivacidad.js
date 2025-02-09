import React from 'react';
import './PoliticaPrivacidad.css';

function PoliticaPrivacidad() {
  return (
    <div className="politica-privacidad">
      <h1>Política de Privacidad</h1>
      <p>En nuestra empresa, valoramos tu privacidad y estamos comprometidos a proteger tus datos personales. Esta política describe cómo recopilamos, usamos y protegemos tu información.</p>
      
      <section className="politica-seccion">
        <h2>1. Recopilación de Datos</h2>
        <p>Recopilamos información personal que nos proporcionas al registrarte en nuestro sitio, realizar una compra o ponerte en contacto con nuestro equipo de soporte. Esta información puede incluir tu nombre, dirección de correo electrónico, y detalles de pago.</p>
      </section>

      <section className="politica-seccion">
        <h2>2. Uso de la Información</h2>
        <p>Utilizamos tus datos personales únicamente para procesar tus pedidos, mejorar nuestra experiencia de usuario y comunicarte actualizaciones de nuestros servicios. No compartimos tu información con terceros sin tu consentimiento.</p>
      </section>

      <section className="politica-seccion">
        <h2>3. Seguridad de los Datos</h2>
        <p>Implementamos medidas de seguridad para proteger tu información personal contra accesos no autorizados. Sin embargo, recuerda que ninguna transmisión de datos por Internet es completamente segura.</p>
      </section>

      <section className="politica-seccion">
        <h2>4. Derechos de los Usuarios</h2>
        <p>Como usuario, tienes el derecho de acceder, corregir o solicitar la eliminación de tus datos personales. Si deseas ejercer estos derechos, contáctanos a través de nuestro equipo de soporte.</p>
      </section>

      <section className="politica-seccion">
        <h2>5. Cambios en la Política</h2>
        <p>Nos reservamos el derecho de modificar esta política de privacidad en cualquier momento. Cualquier cambio será notificado en esta página.</p>
      </section>

      <div className="politica-contacto">
        <p>Para cualquier consulta sobre nuestra política de privacidad, contáctanos en: privacidad@tuempresa.com</p>
      </div>
    </div>
  );
}

export default PoliticaPrivacidad;
