// src/components/PerfilUsuarioArtista.js
import React, { useState, useEffect } from 'react'; 
import { useAuth } from './Autenticacion'; // Asegúrate de que useAuth esté bien importado
import './PerfilUsuarioArtista.css';
import { Apiurl } from '../services/apirest';

//Muestra el perfil del usuario artista

const PerfilUsuarioArtista = () => {
    const { isAuthenticated, userRole, oficialNickname } = useAuth();
    const [artista, setArtista] = useState(null);

    useEffect(() => {
            // Cargar los datos directamente sin retraso
            const fetchArtistaData = async () => {
              try {
                
                if (isAuthenticated && userRole === "artista") {
                  console.log("Nickname oficial:", oficialNickname);
                  console.log("Rol de usuario:", userRole);
                  let urlCedula = `${Apiurl}/usuarios/username/${oficialNickname}`;
                  // Llamada al primer endpoint para obtener la cédula
                  const responseCedula = await fetch(urlCedula);
          
                  if (!responseCedula.ok) {
                    throw new Error(`Error en la primera solicitud: ${responseCedula.status}`);
                  }
          
                  const dataCedula = await responseCedula.json();
                  console.log(dataCedula)
                  const cedula = dataCedula.body?.[0]?.cedula;
                  console.log(cedula)
                  if (!cedula) {
                    throw new Error("No se encontró la cédula para el usuario.");
                  }
          
                  console.log("Cédula obtenida:", cedula);
                  let urlUsuario = `${Apiurl}/usuarios/${cedula}`;
                  // Llamada al segundo endpoint para obtener los datos del artista
                  const responseUsuario = await fetch(urlUsuario);
          
                  if (!responseUsuario.ok) {
                    throw new Error(`Error en la segunda solicitud: ${responseUsuario.status}`);
                  }
          
                  const dataUsuario = await responseUsuario.json();
                  const usuario = dataUsuario.body?.[0];
          
                  if (!usuario) {
                    throw new Error("No se encontraron datos del usuario.");
                  }
          
                  console.log("Datos del usuario obtenidos:", usuario);
          
                  // Actualiza el estado del artista con los datos obtenidos
                  setArtista({
                    nombre: usuario.nombre,
                    celular: usuario.telefono,
                    nickname: usuario.username,
                    direccion: usuario.direccion,
                    estampas: [], // Puedes actualizar este campo si tienes datos de compras
                  });
                }
              } catch (error) {
                console.error("Error al obtener los datos del artista:", error.message);
              }
            };
          
            fetchArtistaData();
          }, [isAuthenticated, userRole, oficialNickname]); // Dependencias
          

    // Verificar si no está autenticado o no es un artista
    if (!isAuthenticated || userRole !== 'artista') {
        return <p>Acceso denegado. Debes iniciar sesión como artista.</p>;
    }

    // Verificar si los datos del artista no están disponibles aún
    if (!artista) {
        return <p>Cargando datos del artista...</p>;
    }

    return (
        <div className="perfil-artista">
            <h1>Perfil de Artista</h1>
            <div className="info-artista">
                <p><strong>Nombre:</strong> {artista.nombre}</p>
                <p><strong>Celular:</strong> {artista.celular}</p>
                <p><strong>Nickname:</strong> {artista.nickname}</p>
                <p><strong>Dirección:</strong> {artista.direccion}</p>
            </div>

            <div className="estampas">
                <h2>Estampas Subidas</h2>
                <ul>
                    {artista.estampas.map(estampa => (
                        <li key={estampa.id}>
                            {estampa.nombre} - Fecha: {estampa.fecha}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default PerfilUsuarioArtista;

