import React from 'react';
import './EquipoDev.css';
import miembro1 from '../../Imagenes/miembro1.png';
import miembro2 from '../../Imagenes/miembro2.png';
import miembro3 from '../../Imagenes/miembro3.png';
import miembro4 from '../../Imagenes/miembro4.png';
import miembro5 from '../../Imagenes/miembro5.png';

function EquipoDev() {
  return (
    <div className="equipo-dev">
      <h1>Conoce a Nuestro Equipo de Desarrollo</h1>
      <p>Nos enorgullece contar con un equipo altamente capacitado y apasionado por la tecnología. Cada miembro aporta su experiencia única para crear productos innovadores y de alta calidad.</p>

      <div className="miembros">
        <div className="miembro">
          <img src={miembro1} alt="Miembro 1" className="miembro-imagen" />
          <h2>Juan Pérez</h2>
          <p>Frontend Developer - Especialista en React y diseño web moderno.</p>
        </div>

        <div className="miembro">
          <img src={miembro2} alt="Miembro 2" className="miembro-imagen" />
          <h2>Juan Pérez</h2>
          <p>Backend Developer - Experto en Node.js y bases de datos SQL.</p>
        </div>

        <div className="miembro">
          <img src={miembro3} alt="Miembro 3" className="miembro-imagen" />
          <h2>Juan Pérez</h2>
          <p>Full Stack Developer - Con experiencia en el desarrollo de aplicaciones completas.</p>
        </div>

        <div className="miembro">
            <img src={miembro4} alt="Miembro 4" className="miembro-imagen" />
            <h2>Juan Pérezz</h2>
            <p>Full Stack Developer - Con experiencia en el desarrollo de aplicaciones completas.</p>
        </div>

            <div className="miembro">
                <img src={miembro5} alt="Miembro 5" className="miembro-imagen" />
                <h2>Juan Pérez</h2>
                <p>Full Stack Developer - Con experiencia en el desarrollo de aplicaciones completas.</p>
                </div>
        </div>
      <div className="mensaje">
        <h2>***o el que lo lea</h2>
      </div>
    </div>
  );
}

export default EquipoDev;
