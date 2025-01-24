// src/components/Inicio.js
import React from 'react';
import './Inicio.css';

//Muestra la página principal, no hay más que decir.

const Inicio = () => {
  return (
    <div className="inicio">
      <h1>Bienvenido a la Tienda de Camisetas</h1>
      
      <div className="card quienes-somos">
        <img src="https://gafascolors.com/wp-content/uploads/2022/03/tienda-de-estampados-personalizados-bogota-colombia-medellin-online-24-horas-1024x768.jpg" alt="Quiénes Somos" />
        <div className="content">
          <h2>¿Quiénes Somos?</h2>
          <p>
            Somos una tienda apasionada por el diseño y la moda, especializada en camisetas únicas y personalizables. 
            Nuestra misión es ofrecer a cada cliente una experiencia de compra que se adapte a sus gustos y preferencias, 
            brindando productos de alta calidad y servicio excepcional.
          </p>
        </div>
      </div>
      
      <div className="card vision">
        <img src="https://gafascolors.com/wp-content/uploads/2021/07/Estampado-de-Camisetas-personalizadas-Sublimadas-bordadas-marcadas-bogota-medellin-33.jpg" alt="Nuestra Visión y Trayectoria" />
        <div className="content">
          <h2>Nuestra Visión y Trayectoria</h2>
          <p>
            Desde nuestros inicios, hemos trabajado para ser un referente en el mercado de camisetas personalizadas. 
            Nos esforzamos por innovar constantemente en nuestros diseños y procesos, con la visión de llevar nuestra marca 
            a ser líder en el sector, sin perder el enfoque en la satisfacción del cliente.
          </p>
        </div>
      </div>
      
      <div className="card calidad">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGjFxCFLEBnDJZdwI0ugzss4fjEHgjTQk1lw&s" alt="Calidad de Nuestros Productos" />
        <div className="content">
          <h2>Calidad de Nuestros Productos</h2>
          <p>
            Utilizamos materiales de primera calidad y procesos de impresión de última tecnología para asegurar que cada 
            camiseta cumpla con los más altos estándares. Cada prenda es cuidadosamente revisada para asegurar que cumpla 
            con nuestras expectativas y, sobre todo, con las tuyas.
          </p>
        </div>
      </div>
      
      <div className="card servicios">
        <img src="https://www.cuteshop.mx/wp-content/uploads/2019/04/animalitos-kawaii-600x776.jpg" alt="Nuestros Servicios" />
        <div className="content">
          <h2>Nuestros Servicios</h2>
          <p>
            Además de una gran variedad de diseños, ofrecemos la posibilidad de personalizar tus camisetas al detalle, 
            con opciones que incluyen selección de colores, estampas y tallas especiales. Nuestro equipo de atención al 
            cliente está siempre dispuesto a ayudarte y responder cualquier pregunta para que tu experiencia sea la mejor.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Inicio;

