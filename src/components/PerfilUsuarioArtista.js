// src/components/PerfilUsuarioArtista.js
import React, { useState, useEffect } from 'react'; 
import { useAuth } from './Autenticacion'; // Asegúrate de que useAuth esté bien importado
import './PerfilUsuarioArtista.css';

//Muestra el perfil del usuario artista

const PerfilUsuarioArtista = () => {
    const { isAuthenticated, userRole } = useAuth();
    const [artista, setArtista] = useState(null);

    useEffect(() => {
        console.log('Autenticación:', isAuthenticated);
        console.log('Rol de usuario:', userRole);
        // Verificar si el usuario está autenticado y es un artista
        if (isAuthenticated && userRole === 'artista') {
            // Simulación de obtención de datos del artista (esto puede ser una API)
            setArtista({
                nombre: "Ana Gómez",
                celular: "0987654321",
                correo: "anaartista@mail.com",
                direccion: "Avenida Artística 456",
                estampas: [
                    { id: 1, nombre: "Estampa A", fecha: "2024-09-15" },
                    { id: 2, nombre: "Estampa B", fecha: "2024-10-02" }
                ]
            });
        }
    }, [isAuthenticated, userRole]);

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
                <p><strong>Correo:</strong> {artista.correo}</p>
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

