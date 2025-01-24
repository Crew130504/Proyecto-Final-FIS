// src/components/PerfilUsuarioCliente.js
import React, { useState, useEffect } from 'react'; // Asegúrate de importar useState y useEffect
import { useAuth } from './Autenticacion'; // Asegúrate de que useAuth esté bien importado
import './PerfilUsuarioCliente.css';

// Este componente muestra el perfil del cliente

const PerfilUsuarioCliente = () => {
    const { isAuthenticated, userRole } = useAuth();
    const [cliente, setCliente] = useState(null);

    useEffect(() => {
        // Cargar los datos directamente sin retraso
        if (isAuthenticated && userRole === 'cliente') {
            setCliente({
                nombre: "Juan Pérez",
                celular: "1234567890",
                nickname: "Juancho",
                correo: "juanperez@mail.com",
                direccion: "Calle Ficticia 123",
                compras: [
                    { id: 1, producto: "Camiseta A", fecha: "2024-10-01" },
                    { id: 2, producto: "Camiseta B", fecha: "2024-10-15" }
                ],
                carrito: [
                    { id: 1, producto: "Camiseta C", cantidad: 2 },
                    { id: 2, producto: "Camiseta D", cantidad: 1 }
                ]
            });
        }
    }, [isAuthenticated, userRole]);

    // Verificar si el cliente es null, o si el usuario no está autenticado
    if (!isAuthenticated || userRole !== 'cliente' || cliente === null) {
        return <p>Acceso denegado o datos no disponibles.</p>;
    }

    return (
        <div className="perfil-cliente">
            <h1>Perfil de Cliente</h1>
            <div className="info-cliente">
                <p><strong>Nombre:</strong> {cliente.nombre}</p>
                <p><strong>Celular:</strong> {cliente.celular}</p>
                <p><strong>Nickname:</strong> {cliente.nickname}</p>
                <p><strong>Correo:</strong> {cliente.correo}</p>
                <p><strong>Dirección:</strong> {cliente.direccion}</p>
            </div>

            <div className="compras">
                <h2>Compras Realizadas</h2>
                <ul>
                    {cliente.compras.map(compra => (
                        <li key={compra.id}>
                            {compra.producto} - Fecha: {compra.fecha}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="carrito">
                <h2>Carrito de Compras</h2>
                <ul>
                    {cliente.carrito.map(item => (
                        <li key={item.id}>
                            {item.producto} - Cantidad: {item.cantidad}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default PerfilUsuarioCliente;

