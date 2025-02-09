// src/components/Contacto.js
import React from 'react';
import './Contacto.css';

//No tiene mucha importancia, solo la opción de contacto en el Header.
const Contacto = () => {
  return (
    <div className="Contacto">
      <h1>Contáctanos</h1>
      <p>Nombre de la Empresa: International Express</p>
      <p>Número de contacto: 000003572937</p>
      <p>Correo electrónico: <a href="mailto:Interexpress@excomp.com">Interexpress@excomp.com</a></p>{/*Pense que este podía ser un buen correo*/}
    </div>
  );
};

export default Contacto;
