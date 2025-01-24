// src\components\CatalogoDiseñosPersonalizados.js
import React, { useState } from 'react';
import './CatalogoDiseñosPersonalizados.css';
import { useAuth } from './Autenticacion'; // Hook de autenticación
import DiseñosPersonalizadosDetalle from './DiseñosPersonalizadosDetalle';
import { useNavigate } from 'react-router-dom';
import DragonImg from '../Imagenes/Dragon.jpg';
import TigreImg from '../Imagenes/Tigre.jpg';
import LoboImg from '../Imagenes/Lobo.jpg';
import camisetaBlanca from '../Imagenes/camiseta_blanca.png';
import camisetaNegra from '../Imagenes/camiseta_negra.png';
import camisetaAzul from '../Imagenes/camiseta_azul.png';
import camisetaRoja from '../Imagenes/camiseta_roja.png';

//Catalogo hecho para diseños personalizados, las camisetas se muestran de acuerdo a la posición y tamaño

// Datos del catálogo
const catalogo = [
  {
    id: 1,
    nombreDiseño: 'Diseño Dragón',
    estampa: "Dragón",
    estampaimg: DragonImg,
    color: 'blanco',
    talla: "M",
    material: "poliester",
    cantidad: 1,
    tamañoEstampa: 'grande',
    ubicacion: 'central',
    precio: 50000,
    rating: 4.5,
    popularidad: 90, 
    autor: 'Juan Pérez',
  },
  {
    id: 2,
    nombreDiseño: 'Diseño Lobo',
    estampa: "Lobo",
    estampaimg: LoboImg,
    color: 'negro',
    talla: "L",
    material: "seda",
    cantidad: 1,
    tamañoEstampa: 'mediano',
    ubicacion: 'superior',
    precio: 60000,
    rating: 4.8,
    popularidad: 120,
    autor: 'María López',
  },
  {
    id: 3,
    nombreDiseño: 'Diseño Tigre',
    estampa: "Tigre",
    estampaimg: TigreImg,
    color: 'rojo',
    talla: "XL",
    material: "rayon",
    cantidad: 1,
    tamañoEstampa: 'pequeño',
    ubicacion: 'inferior',
    precio: 48000,
    rating: 4.2,
    popularidad: 75,
    autor: 'Carlos Ruiz',
  },
];

const CatalogoDiseñosPersonalizados = () => {
  const { isAuthenticated, userRole } = useAuth();
  const navigate = useNavigate();
  const [estampaSeleccionada, setEstampaSeleccionada] = useState(null);
  const [criterio, setCriterio] = useState('precio');

  const handleSeleccionarDiseñoPersonalizado = (diseñoPersonalizado) => {
    if (!isAuthenticated) {
      if (
        window.confirm(
          'Debes iniciar sesión como cliente para comprar. ¿Deseas ir a la página de inicio de sesión?'
        )
      ) {
        navigate('/Iniciar-sesion');
      }
    } else if (userRole === 'artista' || userRole === 'admin') {
      alert(
        'No puedes realizar compras con este usuario. Solo los clientes pueden comprar.'
      );
    } else {
      setEstampaSeleccionada(diseñoPersonalizado);
    }
  };

  const obtenerCamiseta = (color) => {
    switch (color) {
      case 'negro':
        return camisetaNegra;
      case 'azul':
        return camisetaAzul;
      case 'rojo':
        return camisetaRoja;
      default:
        return camisetaBlanca;
    }
  };

  const obtenerEstampaEstilo = (ubicacion) => {
    switch (ubicacion) {
      case 'superior':
        return { left: '50%', top: '30%' };
      case 'inferior':
        return { left: '50%', top: '70%' };
      case 'izquierda':
        return { left: '30%', top: '50%' };
      case 'derecha':
        return { left: '70%', top: '50%' };
      case 'central':
      default:
        return { left: '50%', top: '50%' };
    }
  };
  //Clasificación del catálogo
  const diseñosOrdenados = [...catalogo].sort((a, b) => {
    if (criterio === 'precio') return a.precio - b.precio;
    if (criterio === 'popularidad') return b.popularidad - a.popularidad;
    if (criterio === 'rating') return b.rating - a.rating;
    if (criterio === 'autor') return a.autor.localeCompare(b.autor);
    return 0;
  });

  // Si hay un diseño seleccionado, mostrar `DiseñosPersonalizadosDetalle`
  if (estampaSeleccionada) {
    return <DiseñosPersonalizadosDetalle diseño={estampaSeleccionada} onClose={() => setEstampaSeleccionada(null)} />;
  }

  return (
    <div className="catalogo-contenedor">
      <h1>Catálogo de Diseños Personalizados</h1>
      <label htmlFor="criterio">Clasificar por:</label>
      <select id="criterio" value={criterio} onChange={(e) => setCriterio(e.target.value)}>
        <option value="precio">Precio</option>
        <option value="popularidad">Popularidad</option>
        <option value="rating">Rating</option>
        <option value="autor">Autor</option>
      </select>
      <div className="catalogo-grid">
        {diseñosOrdenados.map((diseño) => (
          <div
            key={diseño.id}
            className="catalogo-diseño"
            onClick={() => handleSeleccionarDiseñoPersonalizado(diseño)}
          >
            <div className="camiseta-previsualizacion" style={{ position: 'relative' }}>
              <img
                src={obtenerCamiseta(diseño.color)}
                alt={`Camiseta ${diseño.color}`}
                className="camiseta-imagen"
              />
              <img
                src={diseño.estampaimg}
                alt={diseño.estampa}
                className={`estampa-previsualizacion ${
                  diseño.tamañoEstampa === 'grande'
                    ? 'estampa-grande'
                    : diseño.tamañoEstampa === 'mediano'
                    ? 'estampa-mediano'
                    : 'estampa-pequeño'
                }`}
                style={obtenerEstampaEstilo(diseño.ubicacion)}
              />
            </div>
            <h3>{diseño.nombreDiseño}</h3>
            <p className="catalogo-precio">Precio: ${diseño.precio.toLocaleString()}</p>
            <p className="autor">Autor: {diseño.autor}</p>
            <button className="boton-comprar-diseño">
             🛒 Comprar Diseño
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CatalogoDiseñosPersonalizados;
