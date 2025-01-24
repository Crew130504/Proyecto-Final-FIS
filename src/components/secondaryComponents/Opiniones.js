import React from 'react';
import './Opiniones.css';

function Opiniones() {
  return (
    <div className="opiniones">
      <h1>Opiniones de nuestros clientes</h1>
      <div className="testimonios">
        <div className="testimonio">
          <p className="texto">
            "Me encantó la calidad de las camisetas y los estampados son simplemente increíbles. Definitivamente compraré más."
          </p>
          <h3>- Juan Pérez</h3>
          <p className="calificacion">⭐⭐⭐⭐⭐</p>
        </div>

        <div className="testimonio">
          <p className="texto">
            "Excelente servicio y entrega rápida. Las camisetas son cómodas y la personalización es perfecta."
          </p>
          <h3>- María Gómez</h3>
          <p className="calificacion">⭐⭐⭐⭐⭐</p>
        </div>

        <div className="testimonio">
          <p className="texto">
            "Gran experiencia de compra. ¡Muy recomendable! Me encanta cómo me quedan las camisetas y la variedad de estampas."
          </p>
          <h3>- Carlos Martínez</h3>
          <p className="calificacion">⭐⭐⭐⭐⭐</p>
        </div>

        <div className="testimonio">
          <p className="texto">
            "Una tienda excepcional con un excelente trato al cliente. El diseño personalizado de mi camiseta quedó perfecto."
          </p>
          <h3>- Laura Rodríguez</h3>
          <p className="calificacion">⭐⭐⭐⭐⭐</p>
        </div>
      </div>
    </div>
  );
}

export default Opiniones;
