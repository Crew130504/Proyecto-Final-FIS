import React, { useState, useEffect } from 'react';
import EstampaDetalle from './EstampaDetalle'; 
import { useAuth } from './Autenticacion';
import { useNavigate } from 'react-router-dom';
import { Apiurl } from '../services/apirest';
import './CatalogoEstampas.css';

const CatalogoEstampas = () => {
  const [estampas, setEstampas] = useState([]);
  const [estampaSeleccionada, setEstampaSeleccionada] = useState(null);
  const { isAuthenticated, userRole } = useAuth();
  const navigate = useNavigate();
  const [orden, setOrden] = useState('');
  const Url =Apiurl+"/estampas";
  
  useEffect(() => {
    fetch(Url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (!data.body || !Array.isArray(data.body)) {
          throw new Error('La respuesta no contiene un array en el campo body.');
        }
  
        // Mapear las estampas desde el body
        setEstampas(
          data.body.map((estampa) => ({
            id: estampa.codigoEstampa || null,
            nombre: estampa.nombreEstampa || 'Sin nombre',
            descripcion: estampa.descripcionEstampa || 'Sin descripción',
            precio: estampa.precio || '0.00',
            stock: estampa.stock || 0,
            imagen: estampa.imagen || '',
            autor: estampa.cedula || 'Desconocido',
          }))
        );
      })
      .catch((error) => console.error('Error al obtener las estampas:', error.message));
  }, [Url]); // Incluye Url en las dependencias para manejar cambios dinámicos
  

  const ordenarEstampas = (criterio) => {
    let ordenadas = [...estampas];
    switch (criterio) {
      case 'autor':
        ordenadas.sort((a, b) => a.autor.localeCompare(b.autor));
        break;
      case 'precio':
        ordenadas.sort((a, b) => a.precio - b.precio);
        break;
      default:
        break;
    }
    return ordenadas;
  };

  const handleSeleccionarEstampa = (estampa) => {
    if (!isAuthenticated) {
      if (window.confirm("Debes iniciar sesión como cliente para comprar. ¿Deseas ir a la página de inicio de sesión?")) {
        navigate('/Iniciar-sesion');
      }
    } else if (userRole === 'artista' || userRole === 'admin') {
      alert("No puedes realizar compras con este usuario. Solo los clientes pueden comprar.");
    } else {
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
              <option value="autor">Autor</option>
              <option value="precio">Precio</option>
            </select>
          </div>
          <div className="catalogo">
            {ordenarEstampas(orden).map((estampa) => (
              <div
                className="catalogo-item"
                key={estampa.id}
                onClick={() => handleSeleccionarEstampa(estampa)}
              >
                <img src={estampa.imagen} alt={estampa.nombre} className="catalogo-imagen" />
                <h2 className="catalogo-titulo">{estampa.nombre}</h2>
                <p className="catalogo-precio">Precio: ${estampa.precio.toLocaleString()}</p>
                <p className="catalogo-stock">
                  Disponibles: {estampa.stock > 0 ? estampa.stock : 'Agotado'}
                </p>
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