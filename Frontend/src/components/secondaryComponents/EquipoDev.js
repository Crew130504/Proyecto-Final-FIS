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
          <h2>Camilo Rodríguez Gutierrez </h2>
          <p>Scrum  Master - Backend Developer</p>
        </div>

        <div className="miembro">
          <img src={miembro2} alt="Miembro 2" className="miembro-imagen" />
          <h2>Juan Sebastián López Bogotá</h2>
          <p>Product Owner - Frontend Developer</p>
        </div>

        <div className="miembro">
          <img src={miembro3} alt="Miembro 3" className="miembro-imagen" />
          <h2>Juan Pablo Angulo</h2>
          <p>Dev.Team - Full Stack Developer </p>
        </div>

        <div className="miembro">
            <img src={miembro4} alt="Miembro 4" className="miembro-imagen" />
            <h2>Jefferson David Ortiz Buitrago </h2>
            <p>Dev.team - Frontend Developer</p>
        </div>

            <div className="miembro">
                <img src={miembro5} alt="Miembro 5" className="miembro-imagen" />
                <h2>Andrés Jose Acevedo </h2>
                <p>Dev.team - Frontend Developer</p>
                </div>
        </div>
      <div className="mensaje">
      </div>
    </div>
  );
}

export default EquipoDev;
