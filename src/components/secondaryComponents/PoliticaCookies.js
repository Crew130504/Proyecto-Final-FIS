import React from 'react';
import './PoliticaCookies.css';

function PoliticaCookies() {
  return (
    <div className="politica-cookies">
      <h1>Política de Cookies</h1>
      <p>En "El último grupo" usamos cookies para mejorar tu experiencia en nuestro sitio web. A continuación, te explicamos qué son las cookies y cómo las utilizamos.</p>

      <section className="politica-seccion">
        <h2>¿Qué son las Cookies?</h2>
        <p>Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo cuando visitas un sitio web. Estas cookies nos permiten mejorar tu experiencia, guardar tus preferencias y realizar análisis del uso del sitio.</p>
      </section>

      <section className="politica-seccion">
        <h2>Tipos de Cookies que Usamos</h2>
        <p>Utilizamos dos tipos principales de cookies:</p>
        <ul>
          <li><strong>Cookies necesarias:</strong> Son esenciales para que puedas navegar por nuestro sitio web y utilizar sus características.</li>
          <li><strong>Cookies de análisis:</strong> Nos ayudan a entender cómo los usuarios interactúan con nuestro sitio, lo que nos permite mejorar su experiencia.</li>
        </ul>
      </section>

      <section className="politica-seccion">
        <h2>Cómo Controlar las Cookies</h2>
        <p>Si prefieres no recibir cookies, puedes ajustar la configuración de tu navegador para bloquearlas. Sin embargo, ten en cuenta que esto podría afectar algunas funcionalidades de nuestro sitio.</p>
      </section>

      <section className="politica-seccion">
        <h2>Consentimiento</h2>
        <p>Al continuar navegando por nuestro sitio web, aceptas el uso de cookies conforme a esta política. Si no estás de acuerdo, puedes cambiar tu configuración de cookies en cualquier momento.</p>
      </section>

      <section className="politica-seccion">
        <h2>Modificaciones</h2>
        <p>Podemos actualizar nuestra política de cookies en cualquier momento. Te recomendamos revisar esta página periódicamente para mantenerte informado sobre los cambios.</p>
      </section>
    </div>
  );
}

export default PoliticaCookies;
