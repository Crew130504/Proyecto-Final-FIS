//src/components/ProductDetails.css
import React from 'react';
import './ProductDetails.css';

//En realidad creo que no use este componente, lo pueden borrar si quieren, en realidad lo use al principio pero luego me olvide que existia.

const ProductDetails = () => {
  return (
    <div className="product-container">
      {/* Imagen del producto */}
      <div className="product-image">
        <img src="ruta/a/tu-imagen.png" alt="Camiseta con diseño de dragón" />
      </div>
      
      {/* Detalles del producto */}
      <div className="product-details">
        <h2>El dragón ardiente</h2>
        <span className="product-tag">Estampa Dragon</span>
        <h3>$50.000</h3>

        <label htmlFor="material">Material</label>
        <select id="material">
          <option>Algodón</option>
          {/* Agrega más opciones si es necesario */}
        </select>

        <label htmlFor="position">Posición</label>
        <select id="position">
          <option>Central</option>
          {/* Agrega más opciones si es necesario */}
        </select>

        <div className="button-container">
          <button className="buy-button">Comprar</button>
          <button className="cart-button">Agregar al carrito</button>
        </div>

        <div className="description">
          <h4>Diseño dragón</h4>
          <p>
            Este diseño combina la simplicidad de una camiseta con la
            magnificencia de una estampa de dragón, haciéndola sumamente
            llamativa y atractiva.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
