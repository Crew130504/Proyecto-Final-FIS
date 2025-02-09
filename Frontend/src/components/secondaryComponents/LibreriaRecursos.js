import React from 'react';
import './LibreriaRecursos.css';

function LibreriaRecursos() {
  return (
    <div className="libreria-recursos">
      <h1>Librería de Recursos</h1>
      <p>En esta sección se muestran las dependencias utilizadas en el proyecto.</p>
      
      <div className="dependencias">
        <h2>Dependencias Instaladas:</h2>
        <ul>
          <li><strong>Jest y Testing Library</strong>:
            <code>npm install --save-dev jest @testing-library/react</code>
          </li>
          <li><strong>React Social Icons</strong>:
            <code>npm install react-social-icons</code>
          </li>
          <li><strong>React Toastify</strong>:
            <code>npm install react-toastify</code>
          </li>
          <li><strong>Testing Library adicional</strong>:
            <code>npm install @testing-library/react @testing-library/jest-dom</code>
          </li>
        </ul>
      </div>

      <div className="uso-ejemplo">
        <h2>Ejemplo de uso:</h2>
        <pre>
          <code>
            {`import { render } from '@testing-library/react';\nimport { ToastContainer } from 'react-toastify';\nimport { SocialIcon } from 'react-social-icons';`}
          </code>
        </pre>
        <p>Estas dependencias mejoran el proceso de pruebas, la integración con redes sociales y las notificaciones en la interfaz.</p>
      </div>
    </div>
  );
}

export default LibreriaRecursos;
