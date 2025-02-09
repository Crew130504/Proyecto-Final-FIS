// src/components/PerfilUsuarioCliente.js
import React, { useState, useEffect } from 'react'; // Asegúrate de importar useState y useEffect
import { useAuth } from './Autenticacion'; // Asegúrate de que useAuth esté bien importado
import './PerfilUsuarioCliente.css';
import { Apiurl } from '../services/apirest';

// Este componente muestra el perfil del cliente

const PerfilUsuarioCliente = () => {
    const { isAuthenticated, userRole, oficialNickname } = useAuth();
    const [cliente, setCliente] = useState(null);

    useEffect(() => {
        // Cargar los datos directamente sin retraso
        const fetchClienteData = async () => {
          try {
            
            if (isAuthenticated && userRole === "cliente") {
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
              // Llamada al segundo endpoint para obtener los datos del cliente
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
      
              // Actualiza el estado del cliente con los datos obtenidos
              setCliente({
                nombre: usuario.nombre,
                celular: usuario.telefono,
                nickname: usuario.username,
                direccion: usuario.direccion,
                compras: [], // Puedes actualizar este campo si tienes datos de compras
                carrito: [] // Puedes actualizar este campo si tienes datos del carrito
              });
            }
          } catch (error) {
            console.error("Error al obtener los datos del cliente:", error.message);
          }
        };
      
        fetchClienteData();
      }, [isAuthenticated, userRole, oficialNickname]); // Dependencias
      

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

