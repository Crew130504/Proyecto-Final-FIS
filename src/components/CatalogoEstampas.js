// src\components\CatalogoEstampas.js
import React, { useState } from 'react';
import EstampaDetalle from './EstampaDetalle'; 
import { useAuth } from './Autenticacion'; // Importa el hook de autenticación
import { useNavigate } from 'react-router-dom'; // Para la navegación
import DragonImg from '../Imagenes/Dragon.jpg';
import TigreImg from '../Imagenes/Tigre.jpg';
import LoboImg from '../Imagenes/Lobo.jpg';
import './CatalogoEstampas.css';

//Bueno, este es el Catalogo de Estampas, solo muestra las estampas.

const CatalogoEstampas = () => {
  const [estampas] = useState([
    { 
      id: 1, 
      nombre: 'Estampa Dragón', 
      precio: 50000, 
      imagen: DragonImg, 
      descripcion: 'Descripción de la estampa dragón.',
      disponibilidad: 500,
      rating: 4.5,
      popularidad: 90,
      autor: 'Juan Pérez'
    },
    { 
      id: 2, 
      nombre: 'Estampa Tigre', 
      precio: 60000, 
      imagen: TigreImg, 
      descripcion: 'Descripción de la estampa tigre.',
      disponibilidad: 300,
      rating: 4.7,
      popularidad: 80,
      autor: 'Ana García'
    },
    { 
      id: 3, 
      nombre: 'Estampa Lobo', 
      precio: 48000, 
      imagen: LoboImg, 
      descripcion: 'Descripción de la estampa lobo.',
      disponibilidad: 800,
      rating: 4.3,
      popularidad: 70,
      autor: 'Juan Pérez'
    },
  ]);


  const [estampaSeleccionada, setEstampaSeleccionada] = useState(null);
  const { isAuthenticated, userRole } = useAuth(); // Obtener estado de autenticación y rol
  const navigate = useNavigate();
  const [orden, setOrden] = useState(''); // Estado para manejar el tipo de clasificación

   // Función para ordenar por el criterio seleccionado
   const ordenarEstampas = (criterio) => {
    let ordenadas = [...estampas];
    switch (criterio) {
      case 'tema':
        ordenadas.sort((a, b) => a.nombre.localeCompare(b.nombre)); // Ordenar por nombre (tema)
        break;
      case 'popularidad':
        ordenadas.sort((a, b) => b.popularidad - a.popularidad); // Ordenar por popularidad
        break;
      case 'rating':
        ordenadas.sort((a, b) => b.rating - a.rating); // Ordenar por rating (más comprado)
        break;
      case 'autor':
        ordenadas.sort((a, b) => a.autor.localeCompare(b.autor)); // Ordenar por autor
        break;
      case 'precio':
        ordenadas.sort((a, b) => a.precio - b.precio); // Ordenar por precio (menor a mayor)
        break;
      default:
        break;
    }
    return ordenadas;
  };

  const handleSeleccionarEstampa = (estampa) => {
    if (!isAuthenticated) {
      // Mensaje para usuarios no autenticados
      if (window.confirm("Debes iniciar sesión como cliente para comprar. ¿Deseas ir a la página de inicio de sesión?")) {
        navigate('/Iniciar-sesion');
      }
    } else if (userRole === 'artista' || userRole === 'admin') {
      // Mensaje para roles no permitidos
      alert("No puedes realizar compras con este usuario. Solo los clientes pueden comprar.");
    } else {
      // Si está autenticado como cliente, permite la selección de la estampa
      setEstampaSeleccionada(estampa);
    }
  };

  const handleCerrarDetalle = () => {
    setEstampaSeleccionada(null);
  };

  return (
    <div>
      {estampaSeleccionada ? (
        <EstampaDetalle estampa={estampaSeleccionada} onClose={handleCerrarDetalle} />
      ) : (
        <div>
          <h1>Catalógo de Estampas</h1>
          <div className="ordenar">
            <label htmlFor="orden">Ordenar por:</label>
            <select id="orden" value={orden} onChange={(e) => setOrden(e.target.value)}>
              <option value="">Seleccione una opción</option>
              <option value="tema">Tema</option>
              <option value="popularidad">Popularidad</option>
              <option value="rating">Rating</option>
              <option value="autor">Autor</option>
              <option value="precio">Precio</option>
            </select>
          </div>
          <div className="catalogo">
            {ordenarEstampas(orden).map((estampa) => (
              <div className="catalogo-item" key={estampa.id} onClick={() => handleSeleccionarEstampa(estampa)}>
                <img src={estampa.imagen} alt={estampa.nombre} className="catalogo-imagen" />
                <h2 className="catalogo-titulo">{estampa.nombre}</h2>
                <p className="catalogo-precio">Precio: ${estampa.precio.toLocaleString()}</p>
                <p className="catalogo-rating">Rating: {estampa.rating}</p>
                <p className="catalogo-popularidad">Popularidad: {estampa.popularidad}</p>
                <p className="catalogo-autor">Autor: {estampa.autor}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CatalogoEstampas;