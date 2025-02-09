import React from 'react';
import './NuestrasSucursales.css';
import sucursalNY from '../../Imagenes/sucursal-ny.png';
import sucursalLondres from '../../Imagenes/sucursal-londres.png';
import sucursalTokio from '../../Imagenes/sucursal-tokio.png';

function NuestrasSucursales() {
  return (
    <div className="nuestras-sucursales">
      <h1>Nuestras Sucursales a Nivel Global</h1>
      <p>Estamos orgullosos de tener presencia internacional. A continuación, te presentamos nuestras sucursales en diversas ciudades del mundo, donde nuestro equipo está siempre listo para ofrecerte el mejor servicio.</p>

      <div className="sucursal">
        <img src={sucursalNY} alt="Sucursal en Nueva York" className="sucursal-imagen" />
        <div className="sucursal-info">
          <h2>Nueva York, USA</h2>
          <p>Dirección: 123 5th Ave, Nueva York, NY 10001</p>
          <p>Teléfono: +1 212-555-1234</p>
          <p>Email: ny@sucursales.com</p>
          <p>¡Visítanos en el corazón de la Gran Manzana! Nuestra sucursal en Nueva York ofrece atención personalizada y productos exclusivos.</p>
        </div>
      </div>

      <div className="sucursal">
        <img src={sucursalLondres} alt="Sucursal en Londres" className="sucursal-imagen" />
        <div className="sucursal-info">
          <h2>Londres, Reino Unido</h2>
          <p>Dirección: 45 Oxford St, Londres W1D 1AN, Reino Unido</p>
          <p>Teléfono: +44 20 7946 1234</p>
          <p>Email: london@sucursales.com</p>
          <p>Descubre nuestra tienda en Londres, donde la elegancia y la innovación se encuentran para ofrecerte lo mejor en productos y servicios.</p>
        </div>
      </div>

      <div className="sucursal">
        <img src={sucursalTokio} alt="Sucursal en Tokio" className="sucursal-imagen" />
        <div className="sucursal-info">
          <h2>Tokio, Japón</h2>
          <p>Dirección: 1-1-2 Marunouchi, Chiyoda, Tokio 100-0005</p>
          <p>Teléfono: +81 3-1234-5678</p>
          <p>Email: tokyo@sucursales.com</p>
          <p>Visita nuestra sucursal en Tokio, donde ofrecemos un ambiente único con tecnología de vanguardia y un equipo altamente capacitado para servirte.</p>
        </div>
      </div>

    </div>
  );
}

export default NuestrasSucursales;
